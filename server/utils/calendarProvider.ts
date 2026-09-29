import { randomBytes } from 'node:crypto'

// Fournisseur d'agenda pour la prise de rendez-vous : kSuite (CalDAV, par défaut) ou Google Agenda.
// NUXT_CALENDAR_PROVIDER=ksuite | google

export interface BookingEvent {
  start: string; end: string; summary: string; description: string
  attendee: { email: string; name: string }; visio: boolean
}
export interface CalendarProvider {
  name: 'ksuite' | 'google'
  busy: (timeMin: string, timeMax: string) => Promise<{ start: number; end: number }[]>
  /** Crée l'événement ; renvoie le lien de visio éventuel et si l'agenda a lui-même invité le client */
  create: (ev: BookingEvent) => Promise<{ meetLink: string | null; invited: boolean }>
}

/** Lien kMeet (visio Infomaniak) : salle au nom aléatoire, créée à la première connexion */
function kmeetLink() {
  const base = String(useRuntimeConfig().kmeetBase || '').trim()
  if (!base) return null
  const room = `bns-${randomBytes(6).toString('hex')}`
  return `${base.endsWith('/') ? base : `${base}/`}${room}`
}

export function calendarProvider(): CalendarProvider | null {
  const which = String(useRuntimeConfig().calendarProvider || 'ksuite').toLowerCase()

  if (which === 'google') {
    const cfg = googleConfig()
    if (!cfg) return null
    return {
      name: 'google',
      busy: (min, max) => busyPeriods(cfg, min, max),
      create: async (ev) => {
        const res = await createEvent(cfg, { start: ev.start, end: ev.end, summary: ev.summary, description: ev.description, attendee: ev.attendee, meet: ev.visio })
        return { meetLink: res.hangoutLink ?? null, invited: !!cfg.impersonate }
      }
    }
  }

  const cfg = caldavConfig()
  if (!cfg) return null
  const organizer = String(useRuntimeConfig().mailFrom || '').replace(/^.*<([^>]+)>.*$/, '$1') || undefined
  return {
    name: 'ksuite',
    busy: (min, max) => caldavBusy(cfg, min, max),
    create: async (ev) => {
      const meetLink = ev.visio ? kmeetLink() : null
      // Le client n'est pas ajouté en participant : sa confirmation part par e-mail (évite les doubles invitations serveur)
      await caldavCreate(cfg, {
        start: ev.start, end: ev.end, summary: ev.summary,
        description: meetLink ? `${ev.description}\n\nVisio : ${meetLink}` : ev.description,
        location: meetLink ?? undefined, organizerEmail: organizer
      })
      return { meetLink, invited: false }
    }
  }
}
