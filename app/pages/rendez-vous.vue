<template>
  <div>
    <section class="container book">
      <div class="book__intro">
        <Breadcrumb :items="[{ label: t.home, to: link.home() }, { label: t.crumb }]" />
        <div class="eyebrow">{{ t.eyebrow }}</div>
        <h1 class="book__h1">{{ t.h1 }}</h1>
        <p class="lead book__lead">{{ t.lead }}</p>
        <ul class="book__facts">
          <li v-for="f in t.facts" :key="f.t">
            <span class="book__fi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="f.icon" /></svg></span>
            <span><strong>{{ f.t }}</strong>{{ f.d }}</span>
          </li>
        </ul>
        <p class="book__alt">{{ t.alt }} <NuxtLink :to="link.contact()">{{ t.altLink }}</NuxtLink></p>
      </div>
      <BookingCalendar class="book__cal" :heading-level="2" />
    </section>
  </div>
</template>

<script setup lang="ts">
const { en, link } = useSite()
const I = {
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  video: 'M3 7h12v10H3zM15 10l6-3v10l-6-3',
  gift: 'M9 12l2 2 4-4M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z'
}
const t = useLocaleText({
  fr: {
    title: 'Réserver un appel découverte gratuit (30 min)', desc: 'Réservez en ligne un appel découverte gratuit de 30 minutes avec BNS Digital : visio ou téléphone, du lundi au samedi, horaires affichés dans votre fuseau.',
    home: 'Accueil', crumb: 'Réserver un appel', eyebrow: 'Réserver un appel', h1: 'Parlons de votre projet, en 30 minutes.',
    lead: 'Choisissez un créneau qui vous convient : nous faisons le point sur vos objectifs et vous repartez avec des premières recommandations concrètes.',
    facts: [
      { icon: I.clock, t: '30 minutes', d: ' pour comprendre votre activité et vos priorités' },
      { icon: I.cal, t: 'Du lundi au samedi', d: ', de 9 h à 18 h à Dakar (GMT), horaires affichés dans votre fuseau' },
      { icon: I.video, t: 'Visio (kMeet) ou téléphone', d: ', selon votre préférence' },
      { icon: I.gift, t: 'Gratuit et sans engagement', d: ', devis sous 48 h si besoin' }
    ],
    alt: 'Vous préférez écrire ?', altLink: 'Envoyer une demande de devis →'
  },
  en: {
    title: 'Book a free 30-minute discovery call', desc: 'Book a free 30-minute discovery call online with BNS Digital, a Dakar-based digital agency: video or phone, Monday to Saturday, with times shown in your own time zone.',
    home: 'Home', crumb: 'Book a call', eyebrow: 'Book a call', h1: 'Let’s talk about your project in 30 minutes.',
    lead: 'Pick a time that suits you: we’ll review your goals together and you’ll leave with first concrete recommendations.',
    facts: [
      { icon: I.clock, t: '30 minutes', d: ' to understand your business and priorities' },
      { icon: I.cal, t: 'Monday to Saturday', d: ', 9 am to 6 pm Dakar time (GMT), shown in your own time zone' },
      { icon: I.video, t: 'Video (kMeet) or phone', d: ', whichever you prefer' },
      { icon: I.gift, t: 'Free, no commitment', d: ', quote within 48 hours if needed' }
    ],
    alt: 'Prefer to write?', altLink: 'Send a quote request →'
  }
})

usePageSeo({ title: () => t.value.title, description: () => t.value.desc })
const site = useRuntimeConfig().public.siteUrl as string
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${site}${link.booking()}#webpage`, url: `${site}${link.booking()}`,
      name: t.value.title, description: t.value.desc, inLanguage: en.value ? 'en' : 'fr', about: { '@id': `${site}/#organization` },
      potentialAction: { '@type': 'ReserveAction', target: `${site}${link.booking()}`, name: t.value.crumb }
    })
  }]
})
</script>

<style scoped>
.book { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 56px; align-items: start; padding-top: 40px; padding-bottom: 112px; }
.book__intro { display: flex; flex-direction: column; gap: 22px; position: sticky; top: 110px; }
.book__h1 { font-size: 56px; line-height: 1.02; letter-spacing: -1.8px; font-weight: 800; margin-top: 16px; }
.book__lead { font-size: 18px; }
.book__facts { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
.book__facts li { display: flex; align-items: center; gap: 14px; font-size: 16px; color: var(--muted); }
.book__facts strong { color: var(--ink); font-weight: 600; }
.book__fi { flex: none; width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; background: var(--accent-soft); color: var(--accent); }
.book__alt { font-size: 15px; color: var(--muted-2); }
.book__alt a { color: var(--accent); font-weight: 600; }
@media (max-width: 1100px) {
  .book { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .book__intro { position: static; }
  .book__h1 { font-size: 40px; letter-spacing: -1.2px; }
}
</style>
