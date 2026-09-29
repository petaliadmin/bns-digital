import { BOOKING, candidateSlots } from '#shared/booking'

// Créneaux disponibles : règles (lun–sam, 9 h–18 h Dakar, jours fériés, délai 2 h, 30 jours) moins les périodes occupées de l'agenda (kSuite ou Google).
export default defineEventHandler(async (event) => {
  if (bookingCors(event)) return
  setHeader(event, 'cache-control', 'no-store')

  const days = candidateSlots()
  const base = { timeZone: BOOKING.timeZone, duration: BOOKING.duration }
  const provider = calendarProvider()
  // Sans agenda configuré (développement), on renvoie les créneaux théoriques
  if (!provider) return { ...base, configured: false, days }

  const all = days.flatMap(d => d.slots)
  if (!all.length) return { ...base, configured: true, days: [] }

  let busy: { start: number; end: number }[]
  try {
    busy = await provider.busy(all[0]!.start, all[all.length - 1]!.end)
  } catch (err) {
    console.error(`[booking] ${provider.name} busy`, err)
    throw createError({ statusCode: 502, statusMessage: 'Agenda indisponible' })
  }

  const free = days
    .map(d => ({ date: d.date, slots: d.slots.filter(s => !busy.some(b => Date.parse(s.start) < b.end && Date.parse(s.end) > b.start)) }))
    .filter(d => d.slots.length)
  return { ...base, configured: true, days: free }
})
