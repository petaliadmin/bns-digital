import { createTransport, type Transporter } from 'nodemailer'
import { BOOKING } from '#shared/booking'

// E-mails de rendez-vous via SMTP (kMail Infomaniak : mail.infomaniak.com, port 465, SSL).
// Optionnel : sans NUXT_SMTP_USER / NUXT_SMTP_PASSWORD, aucun e-mail n'est envoyé.

let transporter: Transporter | null = null
function smtp() {
  const c = useRuntimeConfig()
  if (!c.smtpUser || !c.smtpPassword) return null
  transporter ??= createTransport({
    host: String(c.smtpHost || 'mail.infomaniak.com'),
    port: Number(c.smtpPort || 465),
    secure: Number(c.smtpPort || 465) === 465,
    auth: { user: String(c.smtpUser), pass: String(c.smtpPassword) }
  })
  return transporter
}

export interface BookingMail {
  locale: 'fr' | 'en'; name: string; email: string; phone: string; company: string; message: string
  mode: 'visio' | 'phone'; start: string; end: string; meetLink: string | null; visitorTz: string; ics: string
}

const fmt = (iso: string, locale: 'fr' | 'en', timeZone: string, withDate = true) => new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'fr-FR', {
  ...(withDate ? { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } : {}), hour: '2-digit', minute: '2-digit', timeZone
}).format(new Date(iso))

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))

/** Envoie la confirmation au client et la notification à l'équipe. Ne lève jamais : l'e-mail ne doit pas annuler une réservation créée. */
export async function sendBookingMails(b: BookingMail) {
  const tx = smtp()
  if (!tx) return { sent: false }
  const c = useRuntimeConfig()
  const from = String(c.mailFrom || c.smtpUser)
  const notify = String(c.bookingNotifyEmail || c.smtpUser)
  const en = b.locale === 'en'

  const agencyTime = `${fmt(b.start, b.locale, BOOKING.timeZone)} – ${fmt(b.end, b.locale, BOOKING.timeZone, false)} (${en ? 'Dakar time, GMT' : 'heure de Dakar, GMT'})`
  const local = b.visitorTz && b.visitorTz !== BOOKING.timeZone && fmt(b.start, b.locale, b.visitorTz) !== fmt(b.start, b.locale, BOOKING.timeZone)
    ? `${fmt(b.start, b.locale, b.visitorTz)} (${b.visitorTz})` : ''
  const how = b.mode === 'phone'
    ? (en ? `We will call you on ${b.phone}.` : `Nous vous appellerons au ${b.phone}.`)
    : b.meetLink
      ? (en ? `Video call link (kMeet): ${b.meetLink}` : `Lien de la visio (kMeet) : ${b.meetLink}`)
      : (en ? 'We will send you the video call link before the meeting.' : 'Nous vous enverrons le lien de la visio avant le rendez-vous.')

  const subject = en ? `Your discovery call with BNS Digital — ${fmt(b.start, 'en', BOOKING.timeZone)}` : `Votre appel découverte avec BNS Digital — ${fmt(b.start, 'fr', BOOKING.timeZone)}`
  const text = en
    ? `Hello ${b.name},\n\nYour 30-minute discovery call with BNS Digital is confirmed:\n\n${agencyTime}${local ? `\nYour local time: ${local}` : ''}\n\n${how}\n\nNeed to reschedule? Simply reply to this email.\n\nSpeak soon,\nThe BNS Digital team\nhttps://bns-digital.com`
    : `Bonjour ${b.name},\n\nVotre appel découverte de 30 minutes avec BNS Digital est confirmé :\n\n${agencyTime}${local ? `\nVotre heure locale : ${local}` : ''}\n\n${how}\n\nUn empêchement ? Répondez simplement à cet e-mail.\n\nÀ très bientôt,\nL’équipe BNS Digital\nhttps://bns-digital.com`
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#0A1A47">${esc(text).replace(/\n/g, '<br>').replace(/(https:\/\/[^\s<]+)/g, '<a href="$1" style="color:#0A56D8">$1</a>')}</div>`

  const results = await Promise.allSettled([
    tx.sendMail({
      from, to: `"${b.name.replace(/"/g, '')}" <${b.email}>`, replyTo: notify, subject, text, html,
      icalEvent: { method: 'PUBLISH', filename: 'rendez-vous-bns-digital.ics', content: b.ics }
    }),
    tx.sendMail({
      from, to: notify, replyTo: b.email,
      subject: `Nouveau rendez-vous — ${b.name}${b.company ? ` (${b.company})` : ''} — ${fmt(b.start, 'fr', BOOKING.timeZone)}`,
      text: [
        `Rendez-vous réservé sur le site (${b.locale.toUpperCase()}) :`, '', `${fmt(b.start, 'fr', BOOKING.timeZone)} (heure de Dakar)`, '',
        `Nom : ${b.name}`, b.company && `Entreprise : ${b.company}`, `E-mail : ${b.email}`, b.phone && `Téléphone : ${b.phone}`,
        `Format : ${b.mode === 'phone' ? 'téléphone' : `visio${b.meetLink ? ` — ${b.meetLink}` : ''}`}`, b.message && `\nProjet :\n${b.message}`
      ].filter(Boolean).join('\n')
    })
  ])
  results.forEach(r => r.status === 'rejected' && console.error('[booking] mail', r.reason))
  return { sent: results[0].status === 'fulfilled' }
}
