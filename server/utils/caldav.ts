import { randomUUID } from 'node:crypto'
import { agencyToUtc } from '#shared/booking'

// Connecteur CalDAV (calendrier Infomaniak kSuite, ou tout serveur CalDAV) — sans dépendance.
// Configuration : NUXT_CALDAV_URL (adresse de l'agenda), NUXT_CALDAV_USERNAME, NUXT_CALDAV_PASSWORD (mot de passe d'application).

export interface CaldavConfig { url: string; username: string; password: string }

export function caldavConfig(): CaldavConfig | null {
  const c = useRuntimeConfig()
  const url = String(c.caldavUrl || '').trim()
  const username = String(c.caldavUsername || '').trim()
  const password = String(c.caldavPassword || '')
  if (!url || !username || !password) return null
  return { url: url.endsWith('/') ? url : `${url}/`, username, password }
}

const auth = (cfg: CaldavConfig) => `Basic ${Buffer.from(`${cfg.username}:${cfg.password}`).toString('base64')}`

/** Format date iCalendar UTC : 20261003T080000Z */
const icsUtc = (d: Date | string) => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

/** Échappement des valeurs texte iCalendar (RFC 5545 §3.3.11) */
const icsText = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

/** Pliage des lignes à 75 octets (RFC 5545 §3.1) */
function fold(line: string) {
  const out: string[] = []
  let cur = ''
  for (const ch of line) {
    if (Buffer.byteLength(cur + ch) > 73) { out.push(cur); cur = ' ' + ch } else cur += ch
  }
  out.push(cur)
  return out.join('\r\n')
}

/** Lit une date iCalendar (UTC « Z », heure locale avec TZID — traitée en heure de Dakar — ou journée entière) */
function parseIcsDate(value: string, params: string): { time: number; allDay: boolean } {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/)
  if (!m) return { time: Number.NaN, allDay: false }
  const [, y, mo, d, hh, mi, ss, z] = m
  if (!hh || /VALUE=DATE(?!-)/.test(params)) return { time: agencyToUtc(+y!, +mo!, +d!, 0, 0).getTime(), allDay: true }
  if (z) return { time: Date.UTC(+y!, +mo! - 1, +d!, +hh, +mi!, +ss!), allDay: false }
  // Heure « flottante » ou avec TZID : l'agenda de l'agence est à Dakar
  return { time: agencyToUtc(+y!, +mo!, +d!, +hh, +mi!).getTime() + +ss! * 1000, allDay: false }
}

/** Durée iCalendar (P1D, PT30M, PT1H30M…) en ms */
function parseDuration(v: string) {
  const m = v.match(/^([+-])?P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/)
  if (!m) return 0
  const [, sign, w, d, h, mi, s] = m
  const ms = ((+(w || 0) * 7 + +(d || 0)) * 86400 + +(h || 0) * 3600 + +(mi || 0) * 60 + +(s || 0)) * 1000
  return sign === '-' ? -ms : ms
}

/** Extrait les périodes occupées des VEVENT d'un ou plusieurs VCALENDAR */
export function busyFromIcs(ics: string) {
  const lines = ics.replace(/\r?\n[ \t]/g, '').split(/\r?\n/)
  const periods: { start: number; end: number }[] = []
  let ev: Record<string, { value: string; params: string }> | null = null
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') { ev = {}; continue }
    if (line === 'END:VEVENT' && ev) {
      const transparent = ev.TRANSP?.value === 'TRANSPARENT'
      const cancelled = ev.STATUS?.value === 'CANCELLED'
      if (ev.DTSTART && !transparent && !cancelled) {
        const s = parseIcsDate(ev.DTSTART.value, ev.DTSTART.params)
        let end: number
        if (ev.DTEND) end = parseIcsDate(ev.DTEND.value, ev.DTEND.params).time
        else if (ev.DURATION) end = s.time + parseDuration(ev.DURATION.value)
        else end = s.time + (s.allDay ? 86400000 : 0)
        if (Number.isFinite(s.time) && Number.isFinite(end) && end > s.time) periods.push({ start: s.time, end })
      }
      ev = null
      continue
    }
    if (!ev) continue
    const m = line.match(/^([A-Z-]+)((?:;[^:]*)?):(.*)$/)
    if (m && !ev[m[1]!]) ev[m[1]!] = { params: m[2] ?? '', value: m[3] ?? '' }
  }
  return periods
}

/** Périodes occupées entre deux instants (REPORT calendar-query, occurrences récurrentes développées par le serveur) */
export async function caldavBusy(cfg: CaldavConfig, timeMin: string, timeMax: string) {
  const range = `start="${icsUtc(timeMin)}" end="${icsUtc(timeMax)}"`
  const body = `<?xml version="1.0" encoding="utf-8"?>
<c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:prop><c:calendar-data><c:expand ${range}/></c:calendar-data></d:prop>
  <c:filter><c:comp-filter name="VCALENDAR"><c:comp-filter name="VEVENT"><c:time-range ${range}/></c:comp-filter></c:comp-filter></c:filter>
</c:calendar-query>`
  const res = await fetch(cfg.url, {
    method: 'REPORT',
    headers: { authorization: auth(cfg), depth: '1', 'content-type': 'application/xml; charset=utf-8' },
    body
  })
  if (res.status !== 207) throw new Error(`CalDAV REPORT ${res.status} ${res.statusText}`)
  const xml = await res.text()
  // Contenu des balises calendar-data (préfixe d'espace de noms variable selon le serveur)
  const decode = (s: string) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#13;/g, '\r').replace(/&amp;/g, '&')
  const blocks = [...xml.matchAll(/<(?:[\w-]+:)?calendar-data[^>]*>([\s\S]*?)<\/(?:[\w-]+:)?calendar-data>/g)].map(m => decode(m[1]!.replace(/^<!\[CDATA\[|\]\]>$/g, '')))
  return busyFromIcs(blocks.join('\n'))
}

export interface CaldavEvent {
  start: string; end: string; summary: string; description: string; location?: string
  attendee?: { email: string; name: string }; organizerEmail?: string
}

/** Construit le VCALENDAR d'un rendez-vous (réutilisé pour la pièce jointe de l'e-mail) */
export function buildIcs(ev: CaldavEvent & { uid: string; method?: 'PUBLISH' | 'REQUEST' }) {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//BNS Digital//Booking//FR', 'CALSCALE:GREGORIAN',
    ...(ev.method ? [`METHOD:${ev.method}`] : []),
    'BEGIN:VEVENT',
    `UID:${ev.uid}`, `DTSTAMP:${icsUtc(new Date())}`, `DTSTART:${icsUtc(ev.start)}`, `DTEND:${icsUtc(ev.end)}`,
    `SUMMARY:${icsText(ev.summary)}`, `DESCRIPTION:${icsText(ev.description)}`,
    ...(ev.location ? [`LOCATION:${icsText(ev.location)}`] : []),
    ...(ev.organizerEmail ? [`ORGANIZER;CN=BNS Digital:mailto:${ev.organizerEmail}`] : []),
    ...(ev.attendee ? [`ATTENDEE;CN=${icsText(ev.attendee.name)};ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED:mailto:${ev.attendee.email}`] : []),
    'STATUS:CONFIRMED', 'TRANSP:OPAQUE',
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Rendez-vous', 'TRIGGER:-PT15M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'
  ]
  return lines.map(fold).join('\r\n') + '\r\n'
}

/** Crée l'événement dans l'agenda (PUT d'une nouvelle ressource .ics, sans écraser l'existant) */
export async function caldavCreate(cfg: CaldavConfig, ev: CaldavEvent) {
  const uid = `${randomUUID()}@bns-digital.com`
  const res = await fetch(`${cfg.url}${encodeURIComponent(uid)}.ics`, {
    method: 'PUT',
    headers: { 'authorization': auth(cfg), 'content-type': 'text/calendar; charset=utf-8', 'if-none-match': '*' },
    body: buildIcs({ ...ev, uid })
  })
  if (res.status !== 201 && res.status !== 204) throw new Error(`CalDAV PUT ${res.status} ${res.statusText}`)
  return { uid }
}
