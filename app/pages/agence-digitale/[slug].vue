<template>
  <div v-if="page">
    <section class="container hero">
      <Breadcrumb :items="[{ label: t.home, to: link.home() }, { label: page.crumbParent }, { label: page.crumb }]" class="hero__crumb" />
      <div class="eyebrow">{{ page.eyebrow }}</div>
      <h1 class="hero__h1">{{ page.h1 }}</h1>
      <p class="lead hero__sub">{{ page.sub }}</p>
      <div class="hero__ctas">
        <NuxtLink :to="link.contact()" class="btn btn--primary">{{ t.talk }} →</NuxtLink>
        <NuxtLink v-if="hasWork" :to="link.work()" class="btn btn--ghost">{{ t.seeWork }}</NuxtLink>
        <NuxtLink v-else :to="link.booking()" class="btn btn--ghost">{{ t.call }}</NuxtLink>
      </div>
    </section>

    <section class="bg-white section--96">
      <div class="container">
        <h2 class="h2 h2--52 svc-h">{{ page.svcTitle }}</h2>
        <div class="grid grid-3 m-swipe">
          <NuxtLink v-for="s in services" :key="s.slug" :to="link.service(s.slug)" class="svc">
            <span class="svc__n">{{ s.num }}</span>
            <h3 class="svc__t">{{ s.crumb }}</h3>
            <p class="svc__d">{{ t.short[s.key] }}</p>
            <span class="svc__more">{{ t.more }} →</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="container section split">
      <h2 class="h2 h2--48">{{ page.whyTitle }}</h2>
      <div class="split__body">
        <div v-for="w in page.why" :key="w.t" class="benefit"><h3>{{ w.t }}</h3><p>{{ w.d }}</p></div>
      </div>
    </section>

    <section v-if="refs.length" class="bg-dark section--96">
      <div class="container">
        <h2 class="h2 h2--52 refs-h">{{ page.refTitle }}</h2>
        <div class="grid grid-3 m-swipe">
          <ProjectCard v-for="p in refs" :key="p.slug" :project="p" compact />
        </div>
      </div>
    </section>

    <section class="container section split">
      <h2 class="h2 h2--48">{{ t.faq }}</h2>
      <FaqList :items="page.faq" class="split__faq" />
    </section>

    <CtaBand :title="page.cta" />
  </div>
</template>

<script setup lang="ts">
import { organizationSchema, type Project } from '~/data/content'

const route = useRoute()
const { en, link, services, projects, hasWork, localPages, localSlug } = useSite()
// Le slug doit correspondre à la langue de l'URL (/agence-digitale/belgique ↔ /en/digital-agency/belgium)
const page = computed(() => localPages.value.find(l => localSlug(l.slug) === String(route.params.slug)))
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page introuvable', fatal: true })
useSetI18nParams()({ fr: { slug: page.value.slug }, en: { slug: localSlug(page.value.slug, 'en') } })
const refs = computed(() => (page.value?.refs ?? []).map(slug => projects.value.find(p => p.slug === slug)).filter(Boolean) as Project[])

const t = useLocaleText({
  fr: {
    home: 'Accueil', talk: 'Parler de votre projet', seeWork: 'Voir les réalisations', call: 'Réserver un appel', more: 'En savoir plus', faq: 'Questions fréquentes',
    short: { web: 'Vitrine, blog, landing page, e-commerce.', app: 'Des outils sur mesure pour vos équipes.', seo: 'Visibilité sur Google et les IA génératives.', mobile: 'iOS et Android, de l’UX aux stores.', ads: 'Des campagnes pilotées par la donnée.', social: 'Visuel, vidéo et stratégie éditoriale.' } as Record<string, string>
  },
  en: {
    home: 'Home', talk: 'Discuss your project', seeWork: 'See our work', call: 'Book a call', more: 'Learn more', faq: 'Frequently asked questions',
    short: { web: 'Showcase sites, blogs, landing pages, e-commerce.', app: 'Tailor-made tools for your teams.', seo: 'Visibility on Google and generative AI.', mobile: 'iOS and Android, from UX to the stores.', ads: 'Data-driven campaigns.', social: 'Visuals, video and editorial strategy.' } as Record<string, string>
  }
})

usePageSeo({ title: () => page.value?.title ?? '', description: () => page.value?.description ?? '' })

const site = useRuntimeConfig().public.siteUrl as string
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema(site, en.value ? 'en' : 'fr'),
        {
          '@type': 'WebPage', '@id': `${site}${route.path}#webpage`, url: `${site}${route.path}`, name: page.value?.title, description: page.value?.description,
          inLanguage: en.value ? 'en' : 'fr', about: { '@id': `${site}/#organization` }, isPartOf: { '@id': `${site}/#website` }
        },
        {
          '@type': 'FAQPage', '@id': `${site}${route.path}#faq`,
          mainEntity: (page.value?.faq ?? []).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
        }
      ]
    })
  }]
})
</script>

<style scoped>
.hero { display: flex; flex-direction: column; gap: 28px; padding-top: 40px; padding-bottom: 96px; }
.hero__crumb { margin-bottom: 40px; }
.hero__h1 { font-size: 84px; line-height: 1; letter-spacing: -2.8px; font-weight: 800; max-width: 1100px; }
.hero__sub { max-width: 760px; }
.hero__ctas { display: flex; gap: 14px; flex-wrap: wrap; }
.svc-h { max-width: 900px; margin-bottom: 40px; }
.svc { display: flex; flex-direction: column; gap: 12px; padding: 28px; min-height: 200px; background: var(--bg); border: 1px solid var(--line); border-radius: 20px; color: var(--ink); transition: transform .2s ease; }
.svc:hover { color: var(--ink); transform: translateY(-3px); }
.svc__n { font-family: var(--font-display); font-size: 15px; font-weight: 800; color: var(--accent); }
.svc__t { font-size: 24px; font-weight: 700; letter-spacing: -.4px; }
.svc__d { font-size: 15px; line-height: 1.55; color: var(--muted); }
.svc__more { margin-top: auto; font-size: 14px; font-weight: 600; }
.split { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 64px; }
.split__body { grid-column: span 2; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 48px; }
.split__faq { grid-column: span 2; }
.benefit { display: flex; flex-direction: column; gap: 12px; padding-top: 24px; border-top: 2px solid var(--ink); }
.benefit h3 { font-size: 24px; font-weight: 700; }
.benefit p { font-size: 16px; line-height: 1.6; color: var(--muted); }
.refs-h { margin-bottom: 40px; }
@media (max-width: 1180px) {
  .hero__h1 { font-size: 60px; letter-spacing: -2px; }
  .split { grid-template-columns: minmax(0, 1fr); gap: 40px; }
  .split__body, .split__faq { grid-column: auto; }
}
@media (max-width: 720px) {
  .hero { padding-bottom: 64px; }
  .hero__crumb { margin-bottom: 24px; }
  .hero__h1 { font-size: 42px; letter-spacing: -1.2px; }
  .split__body { grid-template-columns: minmax(0, 1fr); }
}
</style>
