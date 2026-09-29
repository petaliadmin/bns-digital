<template>
  <div class="bk">
    <!-- Étape 1 : jour + créneau -->
    <div v-if="step === 'pick'" class="bk__pick">
      <div class="bk__cal">
        <div class="bk__month">
          <button type="button" class="bk__nav" :disabled="monthIndex === 0" :aria-label="t.prevMonth" @click="monthIndex--">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <h3 class="bk__month-t" aria-live="polite">{{ monthLabel }}</h3>
          <button type="button" class="bk__nav" :disabled="monthIndex >= months.length - 1" :aria-label="t.nextMonth" @click="monthIndex++">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        <div class="bk__grid" role="grid" :aria-label="t.calendar">
          <span v-for="w in weekdays" :key="w" class="bk__wd" aria-hidden="true">{{ w }}</span>
          <template v-for="(c, i) in cells" :key="i">
            <span v-if="!c" class="bk__day bk__day--empty" />
            <button
              v-else
              type="button"
              class="bk__day"
              :class="{ 'is-open': c.available, 'is-selected': c.date === selectedDate, 'is-today': c.date === today }"
              :disabled="!c.available"
              :aria-pressed="c.date === selectedDate"
              :aria-label="dayAria(c)"
              @click="selectDate(c.date)"
            >{{ c.day }}</button>
          </template>
        </div>
        <p class="bk__legend"><span class="bk__dot" aria-hidden="true" />{{ t.legend }}</p>
      </div>

      <div class="bk__slots">
        <template v-if="loading">
          <p class="bk__muted">{{ t.loading }}</p>
          <div class="bk__skeleton"><i v-for="n in 8" :key="n" /></div>
        </template>
        <div v-else-if="loadError" class="bk__alert" role="alert">
          <p>{{ t.loadError }}</p>
          <a :href="`mailto:${CONTACT.email}?subject=${encodeURIComponent(t.mailSubject)}`" class="btn btn--ghost btn--sm">{{ t.mailUs }}</a>
          <button type="button" class="bk__retry" @click="load">{{ t.retry }}</button>
        </div>
        <template v-else-if="selectedDay">
          <h3 class="bk__slots-t">{{ longDate(selectedDay.date) }}</h3>
          <p class="bk__muted">{{ t.duration }} · {{ tzNote }}</p>
          <div class="bk__slot-list">
            <button
              v-for="s in selectedDay.slots"
              :key="s.start"
              type="button"
              class="bk__slot"
              :class="{ 'is-selected': selectedSlot?.start === s.start }"
              :aria-pressed="selectedSlot?.start === s.start"
              @click="selectedSlot = s"
            >
              <span>{{ time(s.start) }}</span>
              <small v-if="showAgency">{{ t.agency }} {{ time(s.start, BOOKING.timeZone) }}</small>
            </button>
          </div>
          <button type="button" class="btn btn--primary bk__next" :disabled="!selectedSlot" @click="step = 'form'">{{ t.continue }} →</button>
        </template>
        <p v-else class="bk__muted">{{ t.noSlots }}</p>
      </div>
    </div>

    <!-- Étape 2 : coordonnées -->
    <form v-else-if="step === 'form'" class="bk__form" novalidate @submit.prevent="book">
      <div class="bk__recap">
        <div>
          <span class="bk__recap-k">{{ t.yourSlot }}</span>
          <strong>{{ longDate(selectedDay!.date) }} · {{ time(selectedSlot!.start) }} – {{ time(selectedSlot!.end) }}</strong>
          <span v-if="showAgency" class="bk__muted">{{ t.agency }} {{ time(selectedSlot!.start, BOOKING.timeZone) }}</span>
        </div>
        <button type="button" class="bk__change" @click="step = 'pick'">{{ t.change }}</button>
      </div>

      <fieldset class="bk__modes">
        <legend>{{ t.mode }}</legend>
        <label :class="{ 'is-on': form.mode === 'visio' }"><input v-model="form.mode" type="radio" value="visio"><span><strong>{{ t.visio }}</strong><small>{{ t.visioD }}</small></span></label>
        <label :class="{ 'is-on': form.mode === 'phone' }"><input v-model="form.mode" type="radio" value="phone"><span><strong>{{ t.phoneMode }}</strong><small>{{ t.phoneD }}</small></span></label>
      </fieldset>

      <div class="bk__fields">
        <label>{{ t.name }} *<input v-model="form.name" type="text" autocomplete="name" required></label>
        <label>{{ t.company }}<input v-model="form.company" type="text" autocomplete="organization"></label>
        <label>{{ t.email }} *<input v-model="form.email" type="email" autocomplete="email" required></label>
        <label>{{ t.phone }}{{ form.mode === 'phone' ? ' *' : '' }}<input v-model="form.phone" type="tel" autocomplete="tel" :required="form.mode === 'phone'"></label>
      </div>
      <label class="bk__full">{{ t.message }}<textarea v-model="form.message" rows="3" :placeholder="t.messagePh" /></label>
      <!-- Champ piège : invisible pour les humains -->
      <label class="bk__hp" aria-hidden="true">Website<input v-model="form.website" type="text" tabindex="-1" autocomplete="off"></label>
      <label class="bk__consent"><input v-model="form.consent" type="checkbox"><span>{{ t.consent }} <NuxtLink :to="link.legal('#article-7')" target="_blank">{{ t.privacy }}</NuxtLink>.</span></label>

      <p v-if="error" class="bk__error" role="alert">{{ error }}</p>
      <div class="bk__actions">
        <button type="button" class="bk__back" @click="step = 'pick'">← {{ t.back }}</button>
        <button type="submit" class="btn btn--primary" :disabled="sending">{{ sending ? t.sending : t.confirm }}</button>
      </div>
    </form>

    <!-- Étape 3 : confirmation -->
    <div v-else class="bk__done" role="status">
      <span class="bk__done-i"><IconCheck :size="30" /></span>
      <h3 class="bk__done-h">{{ t.doneH }}</h3>
      <p class="bk__done-when">{{ longDate(selectedDay!.date) }} · {{ time(selectedSlot!.start) }} – {{ time(selectedSlot!.end) }}<template v-if="showAgency"> ({{ t.agency }} {{ time(selectedSlot!.start, BOOKING.timeZone) }})</template></p>
      <p class="bk__muted">{{ form.mode === 'phone' ? t.donePhone : result?.meetLink ? t.doneMeet : t.doneVisio }}<template v-if="result?.emailed"> {{ t.doneMail }}</template></p>
      <a v-if="result?.meetLink" :href="result.meetLink" target="_blank" rel="noopener" class="btn btn--primary btn--sm">{{ t.joinMeet }}</a>
      <div class="bk__add">
        <a :href="googleLink" target="_blank" rel="noopener" class="btn btn--ghost btn--sm">{{ t.addGoogle }}</a>
        <a :href="icsHref" download="rendez-vous-bns-digital.ics" class="btn btn--ghost btn--sm">{{ t.addIcs }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BOOKING, agencyDate, type DaySlots, type Slot } from '#shared/booking'
import { CONTACT } from '~/data/content'

const { en, locale, link } = useSite()
const config = useRuntimeConfig()
const api = (config.public.bookingApi as string || '').replace(/\/$/, '')

const t = useLocaleText({
  fr: {
    calendar: 'Choisir une date', prevMonth: 'Mois précédent', nextMonth: 'Mois suivant', legend: 'Jours avec des créneaux libres (du lundi au samedi, 9 h – 18 h, heure de Dakar, GMT)',
    loading: 'Chargement des disponibilités…', loadError: 'Impossible de charger les disponibilités pour le moment.', retry: 'Réessayer', mailUs: 'Nous écrire', mailSubject: 'Demande de rendez-vous',
    duration: 'Appel de 30 min', agency: 'Dakar :', continue: 'Continuer', noSlots: 'Aucun créneau disponible pour le moment. Écrivez-nous, nous trouverons un moment.',
    yourSlot: 'Votre créneau', change: 'Modifier', mode: 'Format de l’appel', visio: 'Visio', visioD: 'Lien kMeet envoyé par e-mail', phoneMode: 'Téléphone', phoneD: 'Nous vous appelons',
    name: 'Prénom et nom', company: 'Entreprise', email: 'E-mail', phone: 'Téléphone', message: 'Votre projet en quelques mots (facultatif)', messagePh: 'Objectifs, site actuel, échéance…',
    consent: 'J’accepte que mes données soient utilisées pour organiser ce rendez-vous, conformément à la', privacy: 'politique de confidentialité',
    back: 'Retour', confirm: 'Confirmer le rendez-vous', sending: 'Réservation…',
    errId: 'Merci d’indiquer votre nom et une adresse e-mail valide.', errPhone: 'Merci d’indiquer un numéro de téléphone pour être rappelé.', errConsent: 'Merci d’accepter l’utilisation de vos données.',
    errTaken: 'Ce créneau vient d’être réservé. Choisissez-en un autre, les disponibilités ont été mises à jour.', errSetup: 'La réservation en ligne n’est pas encore active. Écrivez-nous à', errGeneric: 'La réservation a échoué. Réessayez ou écrivez-nous à',
    doneH: 'C’est réservé, à bientôt !', doneMeet: 'Voici votre lien de visio : il suffit de l’ouvrir à l’heure du rendez-vous.', doneVisio: 'Nous vous envoyons le lien de la visio par e-mail avant le rendez-vous.', donePhone: 'Nous vous appellerons au numéro indiqué, à l’heure prévue.', doneMail: 'Un e-mail de confirmation vient de vous être envoyé.',
    joinMeet: 'Ouvrir le lien de la visio', addGoogle: 'Ajouter à Google Agenda', addIcs: 'Ajouter à mon agenda (.ics)',
    eventTitle: 'Appel découverte avec BNS Digital', tz: 'heure de Dakar (GMT)', tzLocal: 'heures affichées dans votre fuseau'
  },
  en: {
    calendar: 'Choose a date', prevMonth: 'Previous month', nextMonth: 'Next month', legend: 'Days with available slots (Monday to Saturday, 9 am – 6 pm Dakar time, GMT)',
    loading: 'Loading availability…', loadError: 'We can’t load availability right now.', retry: 'Try again', mailUs: 'Email us', mailSubject: 'Call request',
    duration: '30-minute call', agency: 'Dakar:', continue: 'Continue', noSlots: 'No slots available right now. Email us and we’ll find a time.',
    yourSlot: 'Your slot', change: 'Change', mode: 'Call format', visio: 'Video call', visioD: 'kMeet link sent by email', phoneMode: 'Phone', phoneD: 'We call you',
    name: 'Full name', company: 'Company', email: 'Email', phone: 'Phone', message: 'Your project in a few words (optional)', messagePh: 'Goals, current website, timeline…',
    consent: 'I agree that my data may be used to arrange this call, in accordance with the', privacy: 'privacy policy',
    back: 'Back', confirm: 'Confirm booking', sending: 'Booking…',
    errId: 'Please enter your name and a valid email address.', errPhone: 'Please enter a phone number so we can call you.', errConsent: 'Please agree to the use of your data.',
    errTaken: 'This slot has just been booked. Please choose another one — availability has been refreshed.', errSetup: 'Online booking isn’t active yet. Email us at', errGeneric: 'Booking failed. Please try again or email us at',
    doneH: 'You’re booked — talk soon!', doneMeet: 'Here is your video call link — just open it at the time of the meeting.', doneVisio: 'We’ll email you the video call link before the meeting.', donePhone: 'We’ll call you on the number you provided at the scheduled time.', doneMail: 'A confirmation email is on its way.',
    joinMeet: 'Open the video call link', addGoogle: 'Add to Google Calendar', addIcs: 'Add to my calendar (.ics)',
    eventTitle: 'Discovery call with BNS Digital', tz: 'Dakar time (GMT)', tzLocal: 'times shown in your time zone'
  }
})

// ---------- Disponibilités ----------
const days = ref<DaySlots[]>([])
const loading = ref(true)
const loadError = ref(false)
const selectedDate = ref('')
const selectedSlot = ref<Slot | null>(null)
const today = agencyDate()

async function load() {
  loading.value = true
  loadError.value = false
  try {
    const res = await $fetch<{ days: DaySlots[] }>(`${api}/api/booking/slots`)
    days.value = res.days
    if (!days.value.some(d => d.date === selectedDate.value)) {
      selectedDate.value = days.value[0]?.date ?? ''
      selectedSlot.value = null
    }
    const first = days.value[0]?.date
    if (first) monthIndex.value = Math.max(0, months.value.findIndex(m => first.startsWith(m)))
  } catch {
    loadError.value = true
  } finally {
    loading.value = false
  }
}
onMounted(load)

const byDate = computed(() => new Map(days.value.map(d => [d.date, d])))
const selectedDay = computed(() => byDate.value.get(selectedDate.value))
function selectDate(date: string) {
  selectedDate.value = date
  selectedSlot.value = null
}

// ---------- Grille du mois (semaines du lundi au dimanche, dates de Dakar) ----------
const months = computed(() => {
  const last = days.value.at(-1)?.date ?? today
  const list: string[] = []
  let [y, m] = today.split('-').map(Number) as [number, number]
  const [ly, lm] = last.split('-').map(Number) as [number, number]
  while (y < ly || (y === ly && m <= lm)) {
    list.push(`${y}-${String(m).padStart(2, '0')}`)
    m++
    if (m > 12) { m = 1; y++ }
  }
  return list
})
const monthIndex = ref(0)
const intlLocale = computed(() => (en.value ? 'en-GB' : 'fr-FR'))
const monthLabel = computed(() => {
  const [y, m] = (months.value[monthIndex.value] ?? today).split('-').map(Number) as [number, number]
  const s = new Intl.DateTimeFormat(intlLocale.value, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, 15)))
  return s.charAt(0).toUpperCase() + s.slice(1)
})
const weekdays = computed(() => Array.from({ length: 7 }, (_, i) =>
  new Intl.DateTimeFormat(intlLocale.value, { weekday: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(2024, 0, 1 + i))).replace('.', '')))
interface Cell { date: string; day: number; available: boolean }
const cells = computed<(Cell | null)[]>(() => {
  const [y, m] = (months.value[monthIndex.value] ?? today).split('-').map(Number) as [number, number]
  const first = new Date(Date.UTC(y, m - 1, 1))
  const offset = (first.getUTCDay() + 6) % 7 // lundi = 0
  const count = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const out: (Cell | null)[] = Array(offset).fill(null)
  for (let d = 1; d <= count; d++) {
    const date = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    out.push({ date, day: d, available: byDate.value.has(date) })
  }
  return out
})

// ---------- Affichage des heures (fuseau du visiteur, + heure de Dakar si différente) ----------
const visitorTz = ref(BOOKING.timeZone)
onMounted(() => { visitorTz.value = Intl.DateTimeFormat().resolvedOptions().timeZone || BOOKING.timeZone })
const time = (iso: string, timeZone = visitorTz.value) =>
  new Intl.DateTimeFormat(intlLocale.value, { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date(iso))
const showAgency = computed(() => {
  const probe = days.value[0]?.slots[0]?.start
  return !!probe && time(probe) !== time(probe, BOOKING.timeZone)
})
const tzNote = computed(() => (showAgency.value ? t.value.tzLocal : t.value.tz))
const longDate = (date: string) => {
  const [y, m, d] = date.split('-').map(Number) as [number, number, number]
  const s = new Intl.DateTimeFormat(intlLocale.value, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)))
  return s.charAt(0).toUpperCase() + s.slice(1)
}
const dayAria = (c: Cell) => `${longDate(c.date)}${c.available ? '' : en.value ? ' — unavailable' : ' — indisponible'}`

// ---------- Réservation ----------
const step = ref<'pick' | 'form' | 'done'>('pick')
const form = reactive({ mode: 'visio' as 'visio' | 'phone', name: '', company: '', email: '', phone: '', message: '', website: '', consent: false })
const error = ref('')
const sending = ref(false)
const result = ref<{ meetLink: string | null; emailed?: boolean } | null>(null)

async function book() {
  error.value = ''
  if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { error.value = t.value.errId; return }
  if (form.mode === 'phone' && form.phone.replace(/\D/g, '').length < 8) { error.value = t.value.errPhone; return }
  if (!form.consent) { error.value = t.value.errConsent; return }
  sending.value = true
  try {
    const { consent: _consent, ...payload } = form
    const res = await $fetch<{ meetLink: string | null; emailed?: boolean }>(`${api}/api/booking/book`, {
      method: 'POST', body: { ...payload, start: selectedSlot.value!.start, locale: locale.value, tz: visitorTz.value }
    })
    result.value = res
    step.value = 'done'
  } catch (e: unknown) {
    const status = (e as { statusCode?: number })?.statusCode
    if (status === 409) {
      error.value = t.value.errTaken
      step.value = 'pick'
      await load()
    } else if (status === 503) {
      error.value = `${t.value.errSetup} ${CONTACT.email}.`
    } else {
      error.value = `${t.value.errGeneric} ${CONTACT.email}.`
    }
  } finally {
    sending.value = false
  }
}

// ---------- Ajout à l'agenda du visiteur ----------
const stamp = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const eventDetails = computed(() => (form.mode === 'phone' ? `${t.value.phoneMode} : ${form.phone}` : result.value?.meetLink ?? t.value.visio) + ` — ${CONTACT.email}`)
const googleLink = computed(() => {
  if (!selectedSlot.value) return '#'
  const q = new URLSearchParams({ action: 'TEMPLATE', text: t.value.eventTitle, dates: `${stamp(selectedSlot.value.start)}/${stamp(selectedSlot.value.end)}`, details: eventDetails.value, ctz: BOOKING.timeZone })
  return `https://calendar.google.com/calendar/render?${q}`
})
const icsHref = computed(() => {
  if (!selectedSlot.value) return '#'
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//BNS Digital//Booking//FR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    `UID:${stamp(selectedSlot.value.start)}-${form.email}@bns-digital.com`, `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(selectedSlot.value.start)}`, `DTEND:${stamp(selectedSlot.value.end)}`,
    `SUMMARY:${t.value.eventTitle}`, `DESCRIPTION:${eventDetails.value.replace(/[,;]/g, '\\$&')}`, `ORGANIZER;CN=BNS Digital:mailto:${CONTACT.email}`,
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n')
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
})
</script>

<style scoped>
.bk { background: var(--white); border: 1px solid var(--line); border-radius: 24px; padding: 32px; box-shadow: 0 30px 60px -40px rgba(10, 26, 71, .3); }
.bk__pick { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 40px; }
.bk__month { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.bk__month-t { font-size: 20px; font-weight: 700; }
.bk__nav { width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--line-3); border-radius: 99px; background: var(--white); color: var(--ink); }
.bk__nav:disabled { opacity: .35; cursor: not-allowed; }
.bk__nav:not(:disabled):hover { background: var(--ink); color: var(--white); border-color: var(--ink); }
.bk__grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; }
.bk__wd { text-align: center; font-size: 12px; font-weight: 600; color: var(--muted-2); text-transform: uppercase; letter-spacing: .5px; padding-bottom: 6px; }
.bk__day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border: none; border-radius: 12px; background: transparent; font-size: 15px; font-weight: 500; color: var(--muted-3); }
.bk__day:disabled { cursor: default; }
.bk__day.is-open { background: var(--accent-soft); color: var(--accent); font-weight: 700; }
.bk__day.is-open:hover { background: var(--accent-tint); }
.bk__day.is-today { box-shadow: inset 0 0 0 1px var(--line-3); }
.bk__day.is-selected { background: var(--accent); color: var(--white); }
.bk__legend { display: flex; align-items: center; gap: 8px; margin-top: 16px; font-size: 13px; color: var(--muted-2); }
.bk__dot { width: 12px; height: 12px; border-radius: 4px; background: var(--accent-soft); box-shadow: inset 0 0 0 1px var(--accent-tint); flex: none; }
.bk__slots { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.bk__slots-t { font-size: 20px; font-weight: 700; }
.bk__muted { font-size: 14px; color: var(--muted-2); }
.bk__slot-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 8px; max-height: 340px; overflow-y: auto; padding: 2px; }
.bk__slot { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 12px 8px; border: 1px solid var(--line-3); border-radius: 12px; background: var(--white); font-size: 16px; font-weight: 600; color: var(--ink); }
.bk__slot small { font-size: 11px; font-weight: 500; color: var(--muted-2); }
.bk__slot:hover { border-color: var(--accent); color: var(--accent); }
.bk__slot.is-selected { background: var(--accent); border-color: var(--accent); color: var(--white); }
.bk__slot.is-selected small { color: var(--accent-tint); }
.bk__next { align-self: flex-start; margin-top: 8px; }
.bk__next:disabled { opacity: .45; cursor: not-allowed; transform: none; }
.bk__skeleton { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 8px; }
.bk__skeleton i { height: 48px; border-radius: 12px; background: var(--line-soft); animation: bk-pulse 1.2s ease-in-out infinite; }
@keyframes bk-pulse { 50% { opacity: .5; } }
.bk__alert { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; padding: 20px; border-radius: 16px; background: var(--accent-soft); font-size: 15px; }
.bk__retry { padding: 0; border: none; background: none; color: var(--accent); font-weight: 600; text-decoration: underline; }

.bk__form { display: flex; flex-direction: column; gap: 20px; }
.bk__recap { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 20px; border-radius: 16px; background: var(--accent-soft); }
.bk__recap > div { display: flex; flex-direction: column; gap: 2px; }
.bk__recap-k { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); }
.bk__recap strong { font-size: 17px; }
.bk__change { border: none; background: none; color: var(--accent); font-weight: 600; text-decoration: underline; padding: 0; }
.bk__modes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; border: none; margin: 0; padding: 0; }
.bk__modes legend { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
.bk__modes label { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border: 1px solid var(--line-3); border-radius: 14px; cursor: pointer; }
.bk__modes label.is-on { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.bk__modes input { accent-color: var(--accent); }
.bk__modes span { display: flex; flex-direction: column; }
.bk__modes small { font-size: 13px; color: var(--muted-2); }
.bk__fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.bk__fields label, .bk__full { display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600; }
.bk__fields input, .bk__full textarea { padding: 13px 14px; border: 1px solid var(--line-3); border-radius: 12px; font: inherit; font-weight: 400; font-size: 16px; background: var(--white); color: var(--ink); }
.bk__fields input:focus, .bk__full textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; border-color: var(--accent); }
.bk__hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.bk__consent { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: var(--muted); }
.bk__consent input { margin-top: 3px; accent-color: var(--accent); }
.bk__consent a { color: var(--accent); text-decoration: underline; }
.bk__error { padding: 12px 16px; border-radius: 12px; background: #FDECEA; color: var(--red); font-size: 14px; }
.bk__actions { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.bk__back { border: none; background: none; font-weight: 600; color: var(--muted); padding: 0; }

.bk__done { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; padding: 24px 8px; }
.bk__done-i { width: 64px; height: 64px; display: inline-flex; align-items: center; justify-content: center; border-radius: 99px; background: #E6F4EC; }
.bk__done-h { font-size: 30px; font-weight: 800; letter-spacing: -.6px; }
.bk__done-when { font-size: 18px; font-weight: 600; }
.bk__add { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 6px; }

@media (max-width: 900px) {
  .bk { padding: 22px; }
  .bk__pick { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .bk__fields, .bk__modes { grid-template-columns: minmax(0, 1fr); }
  .bk__recap { flex-direction: column; align-items: flex-start; }
}
</style>
