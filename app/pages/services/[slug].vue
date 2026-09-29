<template>
  <div v-if="svc">
    <!-- HERO -->
    <section class="container hero">
      <Breadcrumb :items="[{ label: t.home, to: link.home() }, { label: t.crumb, to: link.services() }, { label: svc.crumb }]" class="hero__crumb" />
      <div class="hero__main">
        <div class="hero__eyebrow"><span class="hero__num" aria-hidden="true">{{ svc.num }}</span><h1 class="eyebrow hero__kw">{{ seo.h1 }}</h1></div>
        <p class="hero__h1">{{ svc.h1 }}</p>
        <p class="lead hero__sub">{{ svc.sub }}</p>
        <div class="hero__ctas">
          <NuxtLink :to="link.contact()" class="btn btn--primary">{{ t.talk }} →</NuxtLink>
          <NuxtLink v-if="hasWork" :to="link.work()" class="btn btn--ghost">{{ t.seeWork }}</NuxtLink>
          <NuxtLink v-else :to="link.booking()" class="btn btn--ghost">{{ t.call }}</NuxtLink>
        </div>
      </div>
      <div class="hero__offers card">
        <div class="hero__offers-title">{{ t.offers }}</div>
        <a v-for="of in svc.offers" :key="of.n" :href="`#offre-${of.n}`" class="hero__offer">{{ of.t }}<span>→</span></a>
      </div>
    </section>

    <!-- OFFRES -->
    <section id="offres" class="bg-white section--96">
      <div class="container">
        <div class="sec-head">
          <h2 class="h2 h2--52 sec-head__h">{{ svc.offersTitle }}</h2>
          <p class="text-18 sec-head__p">{{ svc.offersSub }}</p>
        </div>
        <div class="grid grid-2 m-swipe">
          <article v-for="of in svc.offers" :id="`offre-${of.n}`" :key="of.n" class="offer">
            <span class="offer__n">{{ of.n }}</span>
            <h3 class="offer__t">{{ of.t }}</h3>
            <p class="offer__d">{{ of.d }}</p>
            <div class="offer__tags"><span v-for="t in of.tags" :key="t">{{ t }}</span></div>
          </article>
        </div>
      </div>
    </section>

    <!-- APPROCHE -->
    <section class="container section split">
      <div class="split__head">
        <div class="eyebrow">{{ t.approach }}</div>
        <h2 class="h2 h2--48">{{ svc.benTitle }}</h2>
      </div>
      <div class="split__body">
        <div v-for="b in svc.benefits" :key="b.t" class="benefit">
          <h3>{{ b.t }}</h3>
          <p>{{ b.d }}</p>
        </div>
      </div>
    </section>

    <!-- METHODE -->
    <section class="bg-dark section--96">
      <div class="container">
        <div class="meth-head">
          <div class="eyebrow">{{ t.method }}</div>
          <h2 class="h2 h2--52">{{ svc.methTitle }}</h2>
        </div>
        <ol class="grid grid-4 msteps m-swipe">
          <li v-for="st in svc.steps" :key="st.n" class="mstep">
            <span class="mstep__n">{{ st.n }}</span>
            <h3>{{ st.t }}</h3>
            <p>{{ st.d }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- REALISATIONS LIEES -->
    <section v-if="related.length" class="container section">
      <div class="rel-head">
        <h2 class="h2 h2--52">{{ t.trusted }}</h2>
        <NuxtLink :to="link.work()" class="btn btn--ghost btn--sm">{{ t.allWork }}</NuxtLink>
      </div>
      <div class="grid grid-3 m-swipe">
        <ProjectCard v-for="p in related" :key="p.slug" :project="p" compact bordered />
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-white faq-wrap">
      <div class="container section--96 split">
        <h2 class="h2 h2--48">{{ t.faq }}</h2>
        <FaqList :items="serviceFaq" class="split__body split__body--block" />
      </div>
    </section>

    <CtaBand :title="svc.cta" :text="t.ctaText" white />
  </div>
</template>

<script setup lang="ts">
import { AREA_SERVED } from '~/data/content'
import type { Project } from '~/data/content'

const route = useRoute()
const { en, link, services, projects, hasWork, serviceFaq, serviceSeo, serviceSlug } = useSite()

// Le slug doit correspondre à la langue de l'URL (/services/creation-site-web ↔ /en/services/website-design)
const svc = computed(() => services.value.find(s => serviceSlug(s.slug) === String(route.params.slug)))
if (!svc.value) throw createError({ statusCode: 404, statusMessage: 'Page introuvable', fatal: true })
useSetI18nParams()({ fr: { slug: svc.value.slug }, en: { slug: serviceSlug(svc.value.slug, 'en') } })

const t = useLocaleText({
  fr: { home: 'Accueil', crumb: 'Expertises', talk: 'Parler de votre projet', seeWork: 'Voir les réalisations', call: 'Réserver un appel', offers: 'Nos offres', approach: 'L’approche BNS Digital', method: 'Méthode', trusted: 'Ils nous ont fait confiance', allWork: 'Toutes les réalisations', faq: 'Questions fréquentes', ctaText: 'Décrivez-nous votre besoin : nous revenons vers vous avec une recommandation claire et un devis personnalisé.' },
  en: { home: 'Home', crumb: 'Services', talk: 'Discuss your project', seeWork: 'See our work', call: 'Book a call', offers: 'What we offer', approach: 'The BNS Digital approach', method: 'Method', trusted: 'They trusted us', allWork: 'All our work', faq: 'Frequently asked questions', ctaText: 'Tell us what you need: we’ll come back to you with a clear recommendation and a tailored quote.' }
})

// Projets liés au service ; à défaut, les réalisations les plus récentes (jamais de carte vide)
const related = computed(() => {
  const own = (svc.value?.related ?? []).map(slug => projects.value.find(p => p.slug === slug)).filter(Boolean) as Project[]
  return own.length ? own : projects.value.slice(0, 3)
})

const seo = computed(() => serviceSeo.value[svc.value!.slug]!)
usePageSeo({ title: () => seo.value.title, description: () => seo.value.desc })
const site = useRuntimeConfig().public.siteUrl as string
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: () => {
      const url = `${site}${link.service(svc.value!.slug)}`
      const lang = en.value ? 'en' : 'fr'
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service', '@id': `${url}#service`,
            name: seo.value.h1, serviceType: svc.value!.crumb, description: seo.value.desc, url, inLanguage: lang,
            provider: { '@id': `${site}/#organization` },
            areaServed: AREA_SERVED,
            hasOfferCatalog: {
              '@type': 'OfferCatalog', name: svc.value!.offersTitle,
              itemListElement: svc.value!.offers.map(of => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: of.t, description: of.d } }))
            }
          },
          {
            '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: lang,
            mainEntity: serviceFaq.value.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
          }
        ]
      })
    }
  }]
})
</script>

<style scoped>
.hero { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px; padding-top: 40px; padding-bottom: 96px; }
.hero__crumb { grid-column: 1 / -1; margin-bottom: 56px; }
.hero__main { grid-column: span 7; display: flex; flex-direction: column; gap: 28px; }
.hero__eyebrow { display: flex; align-items: center; gap: 12px; }
.hero__kw { font-family: var(--font-body); }
.hero__num { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 10px; background: var(--accent); color: var(--white); font-family: var(--font-display); font-size: 14px; letter-spacing: 0; }
.hero__h1 { font-family: var(--font-display); font-size: 72px; line-height: 1.02; letter-spacing: -2.4px; font-weight: 800; }
.hero__sub { max-width: 640px; }
.hero__ctas { display: flex; gap: 14px; flex-wrap: wrap; }
.hero__offers { grid-column: 9 / span 4; align-self: end; display: flex; flex-direction: column; gap: 10px; padding: 28px; }
.hero__offers-title { font-size: 13px; font-weight: 600; color: var(--muted-2); text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 6px; }
.hero__offer { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--line-soft); font-size: 17px; font-weight: 600; }
.hero__offer span { color: var(--accent); }

.sec-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 48px; margin-bottom: 48px; }
.sec-head__h { max-width: 760px; }
.sec-head__p { max-width: 420px; }
.offer { display: flex; flex-direction: column; gap: 16px; padding: 36px; min-height: 250px; background: var(--bg); border: 1px solid var(--line); border-radius: 20px; scroll-margin-top: 110px; }
.offer__n { font-family: var(--font-display); font-size: 15px; font-weight: 800; color: var(--accent); }
.offer__t { font-size: 30px; letter-spacing: -.6px; font-weight: 700; }
.offer__d { font-size: 17px; line-height: 1.6; color: var(--muted); }
.offer__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
.offer__tags span { font-size: 13px; padding: 6px 10px; border-radius: 8px; background: var(--white); border: 1px solid var(--line); }

.split { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 64px; }
.split__head { display: flex; flex-direction: column; gap: 16px; }
.split__body { grid-column: span 2; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 48px; }
.split__body--block { display: flex; }
.benefit { display: flex; flex-direction: column; gap: 12px; padding-top: 24px; border-top: 2px solid var(--ink); }
.benefit h3 { font-size: 24px; letter-spacing: -.4px; font-weight: 700; }
.benefit p { font-size: 16px; line-height: 1.6; color: var(--muted); }

.meth-head { display: flex; flex-direction: column; gap: 16px; margin-bottom: 48px; }
.msteps { list-style: none; margin: 0; padding: 0; }
.mstep { display: flex; flex-direction: column; gap: 14px; padding: 32px 28px; min-height: 240px; background: var(--dark-2); border-radius: 20px; }
.mstep__n { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 99px; background: var(--accent); font-weight: 600; }
.mstep h3 { font-size: 23px; font-weight: 700; }
.mstep p { font-size: 15px; line-height: 1.6; color: var(--dark-muted); }

.rel-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 40px; flex-wrap: wrap; }
.faq-wrap { border-bottom: none; }

@media (max-width: 1180px) {
  .hero__h1 { font-size: 56px; letter-spacing: -1.8px; }
  .hero__main { grid-column: 1 / -1; }
  .hero__offers { grid-column: 1 / -1; margin-top: 48px; }
  .sec-head { flex-direction: column; align-items: flex-start; }
  .split { grid-template-columns: minmax(0, 1fr); gap: 40px; }
  .split__body { grid-column: auto; }
}
@media (max-width: 720px) {
  .hero { padding-bottom: 64px; }
  .hero__crumb { margin-bottom: 32px; }
  .hero__h1 { font-size: 40px; letter-spacing: -1.2px; }
  .split__body { grid-template-columns: minmax(0, 1fr); }
  .offer { padding: 28px; }
  .offer__t { font-size: 24px; }
}
</style>
