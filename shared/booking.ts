// Règles de prise de rendez-vous, partagées par le calendrier (app) et l'API (server).
// Tous les horaires sont exprimés en heure de Dakar (GMT, sans heure d'été), quel que soit le fuseau du visiteur ou du serveur.

export const BOOKING = {
  timeZone: 'Africa/Dakar',
  /** Durée d'un appel (minutes) */
  duration: 30,
  /** Premier et dernier horaire de fin : appels entre 9 h et 18 h à Dakar (10/11 h – 19/20 h à Paris, matinée à Montréal) */
  openHour: 9,
  closeHour: 18,
  /** Jours ouvrés (0 = dimanche … 6 = samedi) : lundi → samedi */
  workingDays: [1, 2, 3, 4, 5, 6],
  /** Délai minimum avant un rendez-vous (minutes) */
  minNoticeMinutes: 120,
  /** Horizon de réservation (jours) */
  horizonDays: 30,
  /** Fermetures exceptionnelles (AAAA-MM-JJ), en plus des jours fériés fixes.
   *  À compléter chaque année avec les fêtes religieuses à date mobile (Korité, Tabaski, Tamkharit, Maouloud, Magal de Touba). */
  closedDates: [] as string[]
}

export interface Slot { start: string; end: string }
export interface DaySlots { date: string; slots: Slot[] }

const pad = (n: number) => String(n).padStart(2, '0')
export const ymd = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`

/** Décalage (ms) du fuseau `timeZone` par rapport à UTC à l'instant `date` */
function tzOffset(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).formatToParts(date)
  const get = (t: string) => Number(parts.find(p => p.type === t)!.value)
  return Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second')) - date.getTime()
}

/** Instant UTC correspondant à une heure locale de l'agence (Dakar) */
export function agencyToUtc(y: number, m: number, d: number, hh: number, mm: number): Date {
  const guess = Date.UTC(y, m - 1, d, hh, mm)
  let utc = guess - tzOffset(new Date(guess), BOOKING.timeZone)
  utc = guess - tzOffset(new Date(utc), BOOKING.timeZone)
  return new Date(utc)
}

/** Date du jour à Dakar (AAAA-MM-JJ) */
export function agencyDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: BOOKING.timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}

/** Jours fériés au Sénégal pour une année : dates fixes + fêtes chrétiennes calculées depuis Pâques
 *  (les fêtes musulmanes, à date lunaire, sont à ajouter dans BOOKING.closedDates) */
export function holidays(year: number): Set<string> {
  // Algorithme de Meeus/Jones/Butcher pour le dimanche de Pâques
  const a = year % 19, b = Math.floor(year / 100), c = year % 100, d = Math.floor(b / 4), e = b % 4
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1
  const easter = Date.UTC(year, month - 1, day)
  const plus = (n: number) => { const x = new Date(easter + n * 86400000); return ymd(x.getUTCFullYear(), x.getUTCMonth() + 1, x.getUTCDate()) }
  return new Set([
    ymd(year, 1, 1), plus(1), ymd(year, 4, 4), ymd(year, 5, 1), plus(39), plus(50),
    ymd(year, 8, 15), ymd(year, 11, 1), ymd(year, 12, 25)
  ])
}

/** true si le jour (AAAA-MM-JJ, calendrier de Dakar) est ouvert aux rendez-vous */
export function isOpenDay(date: string) {
  const [y, m, d] = date.split('-').map(Number) as [number, number, number]
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  return BOOKING.workingDays.includes(weekday) && !holidays(y).has(date) && !BOOKING.closedDates.includes(date)
}

/** Tous les créneaux théoriques (règles seules, sans agenda) de `from` sur l'horizon, groupés par jour de Dakar */
export function candidateSlots(now = new Date()): DaySlots[] {
  const earliest = now.getTime() + BOOKING.minNoticeMinutes * 60000
  const [y0, m0, d0] = agencyDate(now).split('-').map(Number) as [number, number, number]
  const days: DaySlots[] = []
  for (let i = 0; i <= BOOKING.horizonDays; i++) {
    const day = new Date(Date.UTC(y0, m0 - 1, d0 + i))
    const [y, m, d] = [day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate()]
    const date = ymd(y, m, d)
    if (!isOpenDay(date)) continue
    const slots: Slot[] = []
    for (let min = BOOKING.openHour * 60; min + BOOKING.duration <= BOOKING.closeHour * 60; min += BOOKING.duration) {
      const start = agencyToUtc(y, m, d, Math.floor(min / 60), min % 60)
      if (start.getTime() < earliest) continue
      slots.push({ start: start.toISOString(), end: new Date(start.getTime() + BOOKING.duration * 60000).toISOString() })
    }
    if (slots.length) days.push({ date, slots })
  }
  return days
}

/** Vérifie qu'un début de créneau (ISO) respecte les règles : jour ouvert, horaire aligné, délai et horizon */
export function isValidSlotStart(startIso: string, now = new Date()) {
  const start = new Date(startIso)
  if (Number.isNaN(start.getTime())) return false
  return candidateSlots(now).some(d => d.slots.some(s => s.start === start.toISOString()))
}
