<template>
  <section class="container trust" :aria-labelledby="titleId">
    <div class="trust__head">
      <h2 :id="titleId" class="trust__title">{{ t.title }}</h2>
      <ul class="trust__countries" :aria-label="t.countriesLabel">
        <li v-for="c in t.countries" :key="c"><span aria-hidden="true" class="trust__pin" />{{ c }}</li>
      </ul>
    </div>

    <!-- Défilé continu des clients (liste doublée pour une boucle sans à-coup ; la copie est masquée aux lecteurs d'écran) -->
    <div v-if="hasWork" class="marquee" :class="{ 'is-static': reducedMotion }">
      <div class="marquee__track">
        <ul v-for="copy in (reducedMotion ? 1 : 2)" :key="copy" class="marquee__list" :aria-hidden="copy === 2 ? 'true' : undefined">
          <li v-for="c in clients" :key="`${copy}-${c.slug}`">
            <NuxtLink :to="link.project(c.slug)" class="client" :tabindex="copy === 2 ? -1 : undefined">
              <span class="client__dot" :style="{ background: DOT[c.cat] }" aria-hidden="true" />
              <span class="client__txt">
                <span class="client__name">{{ c.client }}</span>
                <span class="client__sector">{{ c.label }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <dl class="trust__stats">
      <div v-for="s in stats" :key="s.l" class="stat">
        <dt class="sr-only">{{ s.l }}</dt>
        <dd class="stat__v">{{ s.v }}<span v-if="s.star" class="stat__star" aria-hidden="true">★</span></dd>
        <dd class="stat__l">{{ s.l }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { REVIEWS, REVIEWS_AVG } from '~/data/content'

const { en, link, projects, hasWork, hasReviews } = useSite()
const titleId = useId()
const DOT = { Plateforme: 'var(--accent)', Vitrine: 'var(--accent-light)', Ecommerce: 'var(--accent-mid)', ADS: 'var(--accent-mid)', Social: 'var(--accent-light)' } as const

// Marques clientes, dans l'ordre éditorial des réalisations (défilé masqué tant qu'il n'y en a pas)
const clients = computed(() => projects.value)

const t = useLocaleText({
  fr: {
    title: 'Prix abordables, projets livrés vite grâce à l’IA, pour les entreprises en France, en Europe et au Canada',
    countriesLabel: 'Nos marchés',
    countries: ['France', 'Belgique', 'Suisse', 'Canada', 'Sénégal'],
    projects: 'réalisations en ligne', rating: 'sur Google', ratingCount: 'avis', expertise: 'expertises réunies', countriesStat: 'marchés servis',
    tz: 'fuseau de Dakar, 1 à 2 h de Paris', langsL: 'langues de travail'
  },
  en: {
    title: 'Affordable prices and fast, AI-powered delivery for companies in Canada, France and Europe',
    countriesLabel: 'Our markets',
    countries: ['Canada', 'France', 'Belgium', 'Switzerland', 'Senegal'],
    projects: 'projects showcased', rating: 'on Google', ratingCount: 'reviews', expertise: 'areas of expertise', countriesStat: 'markets served',
    tz: 'Dakar time, 4–5 h ahead of Toronto', langsL: 'working languages'
  }
})

const stats = computed(() => [
  ...(hasWork ? [{ v: String(projects.value.length), l: t.value.projects }] : []),
  ...(hasReviews ? [{ v: en.value ? REVIEWS_AVG.toFixed(1) : REVIEWS_AVG.toFixed(1).replace('.', ','), star: true, l: `${t.value.rating} · ${REVIEWS.length} ${t.value.ratingCount}` }] : []),
  { v: '6', l: t.value.expertise },
  { v: String(t.value.countries.length), l: t.value.countriesStat },
  ...(!hasWork || !hasReviews ? [{ v: 'GMT', l: t.value.tz }] : []),
  ...(!hasWork && !hasReviews ? [{ v: 'FR · EN', l: t.value.langsL }] : [])
])

const reducedMotion = ref(false)
onMounted(() => { reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches })
</script>

<style scoped>
.trust { display: flex; flex-direction: column; gap: 28px; padding-top: 48px; padding-bottom: 72px; }
.trust__head { display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }
.trust__title { font-family: var(--font-body); font-size: 15px; font-weight: 600; color: var(--muted); letter-spacing: .2px; }
.trust__countries { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.trust__countries li { display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; border: 1px solid var(--line); border-radius: 999px; background: var(--white); font-size: 13px; font-weight: 500; color: var(--ink); }
.trust__pin { width: 7px; height: 7px; border-radius: 99px; background: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }

/* Défilé */
.marquee { position: relative; overflow: hidden; padding: 6px 0; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.marquee__track { display: flex; width: max-content; animation: trust-scroll 60s linear infinite; }
.marquee:hover .marquee__track, .marquee:focus-within .marquee__track { animation-play-state: paused; }
.marquee__list { list-style: none; margin: 0; padding: 0 12px 0 0; display: flex; gap: 12px; }
.client { display: flex; align-items: center; gap: 12px; padding: 14px 20px 14px 16px; border: 1px solid var(--line); border-radius: 16px; background: var(--white); color: var(--ink); white-space: nowrap; transition: border-color .2s, box-shadow .2s, transform .2s; }
.client:hover { color: var(--ink); border-color: var(--accent-tint-2); box-shadow: 0 14px 28px -20px rgba(10, 86, 216, .55); transform: translateY(-2px); }
.client__dot { flex: none; width: 10px; height: 10px; border-radius: 99px; }
.client__txt { display: flex; flex-direction: column; gap: 1px; }
.client__name { font-family: var(--font-display); font-size: 19px; font-weight: 800; letter-spacing: -.3px; line-height: 1.15; }
.client__sector { font-size: 12px; color: var(--muted-2); font-weight: 500; }
.client:hover .client__name { color: var(--accent); }
@keyframes trust-scroll { to { transform: translateX(-50%); } }
/* Mouvement réduit : liste statique sur plusieurs lignes */
.marquee.is-static { overflow-x: auto; scrollbar-width: none; -webkit-mask-image: none; mask-image: none; }
.marquee.is-static::-webkit-scrollbar { display: none; }
.marquee.is-static .marquee__track { animation: none; }
.marquee.is-static .marquee__list { padding: 0; }

/* Chiffres clés */
.trust__stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin: 0; border: 1px solid var(--line); border-radius: 20px; background: var(--white); overflow: hidden; }
.stat { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 20px 16px; text-align: center; border-right: 1px solid var(--line-soft); }
.stat:last-child { border-right: none; }
.stat dd { margin: 0; }
.stat__v { font-family: var(--font-display); font-size: 32px; font-weight: 800; letter-spacing: -.8px; color: var(--ink); line-height: 1.1; }
.stat__star { margin-left: 4px; font-size: 22px; color: #C27803; vertical-align: 3px; }
.stat__l { font-size: 13px; color: var(--muted-2); }

@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
@media (max-width: 720px) {
  .trust { padding-top: 32px; padding-bottom: 48px; }
  .trust__stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stat:nth-child(2) { border-right: none; }
  .stat:nth-child(-n + 2) { border-bottom: 1px solid var(--line-soft); }
  .client__name { font-size: 17px; }
  .marquee__track { animation-duration: 45s; }
}
</style>
