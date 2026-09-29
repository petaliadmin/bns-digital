import { randomUUID } from 'node:crypto'
import { BOOKING, isValidSlotStart } from '#shared/booking'

interface BookingBody {
  start?: string; name?: string; email?: string; phone?: string; company?: string; tz?: string
  mode?: 'visio' | 'phone'; message?: string; locale?: 'fr' | 'en'; website?: string // website = champ piège anti-spam
}

const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max)
const validTz = (tz: string) => { try { new Intl.DateTimeFormat('en', { timeZone: tz }); return tz } catch { return BOOKING.timeZone } }

// Réservation : valide le créneau, revérifie la disponibilité (anti double réservation), crée l'événement puis envoie les e-mails.
export default defineEventHandler(async (event) => {
  if (bookingCors(event)) return // requête de pré-vérification CORS (OPTIONS) traitée
  assertMethod(event, 'POST')
  if (rateLimited(event)) throw createError({ statusCode: 429, statusMessage: 'Trop de tentatives, réessayez plus tard' })

  const body = await readBody<BookingBody>(event)
  if (body?.website) return { ok: true } // robot : on ne crée rien, sans le signaler

  const name = clean(body?.name, 120)
  const email = clean(body?.email, 160)
  const phone = clean(body?.phone, 40)
  const company = clean(body?.company, 120)
  const message = clean(body?.message, 1500)
  const mode = body?.mode === 'phone' ? 'phone' : 'visio'
  const locale = body?.locale === 'en' ? 'en' : 'fr'
  const visitorTz = validTz(clean(body?.tz, 60) || BOOKING.timeZone)
  const start = clean(body?.start, 40)

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw createError({ statusCode: 400, statusMessage: 'Nom ou e-mail invalide' })
  if (mode === 'phone' && phone.replace(/\D/g, '').length < 8) throw createError({ statusCode: 400, statusMessage: 'Téléphone requis pour un appel téléphonique' })
  if (!isValidSlotStart(start)) throw createError({ statusCode: 409, statusMessage: 'Créneau indisponible' })

  const provider = calendarProvider()
  if (!provider) throw createError({ statusCode: 503, statusMessage: 'Réservation en ligne non configurée' })

  const startIso = new Date(start).toISOString()
  const end = new Date(Date.parse(startIso) + BOOKING.duration * 60000).toISOString()

  // Revérification juste avant la création : le créneau a pu être pris entre-temps
  const busy = await provider.busy(startIso, end).catch((err) => {
    console.error(`[booking] ${provider.name} busy`, err)
    throw createError({ statusCode: 502, statusMessage: 'Agenda indisponible' })
  })
  if (busy.some(b => Date.parse(startIso) < b.end && Date.parse(end) > b.start)) throw createError({ statusCode: 409, statusMessage: 'Créneau déjà réservé' })

  const description = [
    `Appel découverte réservé depuis bns-digital.com (${locale.toUpperCase()})`,
    '',
    `Nom : ${name}`,
    company && `Entreprise : ${company}`,
    `E-mail : ${email}`,
    phone && `Téléphone : ${phone}`,
    `Format : ${mode === 'phone' ? `téléphone (${phone})` : 'visio'}`,
    message && `\nProjet :\n${message}`
  ].filter(Boolean).join('\n')

  let created: { meetLink: string | null; invited: boolean }
  try {
    created = await provider.create({
      start: startIso, end, description,
      summary: `Appel découverte — ${name}${company ? ` (${company})` : ''}`,
      attendee: { email, name }, visio: mode === 'visio'
    })
  } catch (err) {
    console.error(`[booking] ${provider.name} create`, err)
    throw createError({ statusCode: 502, statusMessage: 'Impossible de créer le rendez-vous' })
  }

  // Confirmation au client (avec invitation .ics) + notification à l'équipe, si SMTP configuré
  const ics = buildIcs({
    uid: `${randomUUID()}@bns-digital.com`, method: 'PUBLISH', start: startIso, end,
    summary: locale === 'en' ? 'Discovery call with BNS Digital' : 'Appel découverte avec BNS Digital',
    description: mode === 'phone' ? `${locale === 'en' ? 'Phone call' : 'Appel téléphonique'} : ${phone}` : (created.meetLink ?? 'Visio'),
    location: created.meetLink ?? undefined
  })
  const mail = await sendBookingMails({ locale, name, email, phone, company, message, mode, start: startIso, end, meetLink: created.meetLink, visitorTz, ics })

  return { ok: true, start: startIso, end, meetLink: created.meetLink, invited: created.invited, emailed: mail.sent }
})
