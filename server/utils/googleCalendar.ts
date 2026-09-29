import { createSign } from 'node:crypto'
import { BOOKING } from '#shared/booking'

// Client Google Agenda minimal (compte de service, JWT RS256) — sans dépendance externe.
// Configuration : NUXT_GOOGLE_SERVICE_ACCOUNT_EMAIL, NUXT_GOOGLE_PRIVATE_KEY, NUXT_GOOGLE_CALENDAR_ID,
// et optionnellement NUXT_GOOGLE_IMPERSONATE (Google Workspace + délégation : invitations et lien Meet).

interface GoogleConfig { email: string; privateKey: string; calendarId: string; impersonate?: string }

export function googleConfig(): GoogleConfig | null {
  const c = useRuntimeConfig()
  const email = c.googleServiceAccountEmail as string
  const privateKey = (c.googlePrivateKey as string || '').replace(/\\n/g, '\n')
  const calendarId = c.googleCalendarId as string
  if (!email || !privateKey || !calendarId) return null
  return { email, privateKey, calendarId, impersonate: (c.googleImpersonate as string) || undefined }
}

let cached: { token: string; exp: number; key: string } | null = null
const b64url = (s: string | Buffer) => Buffer.from(s).toString('base64url')

async function accessToken(cfg: GoogleConfig) {
  const key = `${cfg.email}|${cfg.impersonate ?? ''}`
  if (cached && cached.key === key && cached.exp > Date.now() + 60_000) return cached.token
  const iat = Math.floor(Date.now() / 1000)
  const claims = {
    iss: cfg.email, scope: 'https://www.googleapis.com/auth/calendar', aud: 'https://oauth2.googleapis.com/token',
    iat, exp: iat + 3600, ...(cfg.impersonate ? { sub: cfg.impersonate } : {})
  }
  const unsigned = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(JSON.stringify(claims))}`
  const signature = createSign('RSA-SHA256').update(unsigned).sign(cfg.privateKey).toString('base64url')
  const res = await $fetch<{ access_token: string; expires_in: number }>('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${signature}` }).toString()
  })
  cached = { token: res.access_token, exp: Date.now() + res.expires_in * 1000, key }
  return res.access_token
}

const api = 'https://www.googleapis.com/calendar/v3'

/** Périodes occupées de l'agenda entre deux instants */
export async function busyPeriods(cfg: GoogleConfig, timeMin: string, timeMax: string) {
  const token = await accessToken(cfg)
  const res = await $fetch<{ calendars: Record<string, { busy: { start: string; end: string }[]; errors?: unknown[] }> }>(`${api}/freeBusy`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
    body: { timeMin, timeMax, timeZone: BOOKING.timeZone, items: [{ id: cfg.calendarId }] }
  })
  const cal = res.calendars[cfg.calendarId]
  if (!cal || cal.errors?.length) throw new Error(`freeBusy: agenda inaccessible (${JSON.stringify(cal?.errors ?? 'absent')})`)
  return cal.busy.map(b => ({ start: Date.parse(b.start), end: Date.parse(b.end) }))
}

export interface NewEvent {
  start: string; end: string; summary: string; description: string
  attendee?: { email: string; name: string }; meet?: boolean
}

/** Crée l'événement ; avec délégation Workspace, invite le client et génère un lien Google Meet */
export async function createEvent(cfg: GoogleConfig, ev: NewEvent) {
  const token = await accessToken(cfg)
  const delegated = !!cfg.impersonate
  const body = {
    summary: ev.summary,
    description: ev.description,
    start: { dateTime: ev.start, timeZone: BOOKING.timeZone },
    end: { dateTime: ev.end, timeZone: BOOKING.timeZone },
    ...(delegated && ev.attendee ? { attendees: [{ email: ev.attendee.email, displayName: ev.attendee.name }] } : {}),
    ...(delegated && ev.meet ? { conferenceData: { createRequest: { requestId: `bns-${Date.now()}`, conferenceSolutionKey: { type: 'hangoutsMeet' } } } } : {}),
    reminders: { useDefault: true },
    extendedProperties: { private: { source: 'bns-website' } }
  }
  const qs = new URLSearchParams({ conferenceDataVersion: '1', sendUpdates: delegated ? 'all' : 'none' })
  return await $fetch<{ id: string; htmlLink: string; hangoutLink?: string }>(`${api}/calendars/${encodeURIComponent(cfg.calendarId)}/events?${qs}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
    body
  })
}
