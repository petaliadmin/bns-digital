<template>
  <div>
    <section class="container head">
      <div class="head__title">
        <div class="eyebrow">{{ t.eyebrow }}</div>
        <h1 class="head__h1">{{ hasWork ? t.h1 : t.emptyH1 }}</h1>
      </div>
      <p class="head__p">{{ hasWork ? t.lead : t.emptyLead }}</p>
    </section>

    <section v-if="hasWork && t.stats.length" class="container">
      <dl class="stats">
        <div v-for="s in t.stats" :key="s.v" class="stats__item"><dt class="sr-only">{{ s.l }}</dt><dd class="stats__v">{{ s.v }}</dd><dd class="stats__l">{{ s.l }}</dd></div>
      </dl>
    </section>

    <section v-if="hasWork" class="container work">
      <div class="work__bar">
        <div v-if="filters.length > 2" class="filters" role="group" :aria-label="t.filterLabel">
          <button v-for="f in filters" :key="f.id" type="button" :aria-pressed="filter === f.id" :class="{ 'is-on': filter === f.id }" @click="filter = f.id">{{ f.label }}</button>
        </div>
        <span class="work__count" aria-live="polite">{{ list.length }} {{ t.projects }}</span>
      </div>
      <div class="grid grid-3">
        <ProjectCard v-for="p in list" :key="p.slug" :project="p" bordered />
      </div>
    </section>

    <!-- Portfolio en cours de constitution : on oriente vers les expertises et la prise de contact -->
    <section v-else class="container work">
      <div class="empty">
        <p class="empty__p">{{ t.emptyP }}</p>
        <div class="empty__ctas">
          <NuxtLink :to="link.booking()" class="btn btn--primary">{{ t.emptyCall }} <IconArrow /></NuxtLink>
          <NuxtLink :to="link.services()" class="btn btn--ghost">{{ t.emptyServices }}</NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand :title="t.ctaTitle" :label="t.ctaLabel" />
  </div>
</template>

<script setup lang="ts">
const { en, link, projects, hasWork } = useSite()
// Chiffres clés du portfolio : à renseigner avec les résultats réels des projets BNS Digital
const t = useLocaleText({
  fr: {
    eyebrow: 'Réalisations', h1: 'Des projets concrets. Des résultats mesurables.', lead: 'Sites corporate, plateformes SaaS, e-commerce : découvrez les projets que nous avons conçus pour des entreprises au Sénégal, en Afrique de l’Ouest et en France.',
    emptyH1: 'Nos études de cas arrivent bientôt.', emptyLead: 'Nous préparons la présentation détaillée de nos projets pour des entreprises en France, en Europe et au Canada.',
    emptyP: 'En attendant, parlons de votre projet : en 30 minutes, nous vous présentons notre approche et des exemples adaptés à votre secteur.', emptyCall: 'Réserver un appel', emptyServices: 'Voir nos expertises',
    filterLabel: 'Filtrer les réalisations', filters: [{ id: 'all', label: 'Tous' }, { id: 'Web', label: 'Sites Web' }, { id: 'Social', label: 'Social/Médias' }, { id: 'ADS', label: 'ADS' }],
    projects: 'projets', ctaTitle: 'Votre projet sera notre prochaine référence.', ctaLabel: 'Parler de votre projet',
    stats: [] as { v: string; l: string }[],
    title: 'Réalisations : sites web & campagnes digitales', desc: 'Sites corporate, plateformes SaaS et e-commerce : les projets web de BNS Digital pour des entreprises au Sénégal, en Afrique de l’Ouest et en France.'
  },
  en: {
    eyebrow: 'Our work', h1: 'Real projects. Measurable results.', lead: 'Corporate websites, SaaS platforms, e-commerce: explore the projects we have built for companies in Senegal, West Africa and France.',
    emptyH1: 'Our case studies are coming soon.', emptyLead: 'We are preparing detailed write-ups of our projects for companies in Canada, France and Europe.',
    emptyP: 'In the meantime, let’s talk about your project: in 30 minutes, we’ll walk you through our approach and examples relevant to your industry.', emptyCall: 'Book a call', emptyServices: 'See our services',
    filterLabel: 'Filter projects', filters: [{ id: 'all', label: 'All' }, { id: 'Web', label: 'Websites' }, { id: 'Social', label: 'Social media' }, { id: 'ADS', label: 'Paid ads' }],
    projects: 'projects', ctaTitle: 'Your project could be our next reference.', ctaLabel: 'Discuss your project',
    stats: [],
    title: 'Our work: websites & digital campaigns', desc: 'Corporate websites, SaaS platforms and e-commerce: BNS Digital web projects for companies in Senegal, West Africa and France.'
  }
})
// Page vide tant que le portfolio n'est pas rempli : hors index
usePageSeo({ title: () => t.value.title, description: () => t.value.desc, noindex: !hasWork })
const site = useRuntimeConfig().public.siteUrl as string
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage', '@id': `${site}${link.work()}#webpage`, url: `${site}${link.work()}`, name: t.value.title, inLanguage: en.value ? 'en' : 'fr',
      mainEntity: { '@type': 'ItemList', numberOfItems: projects.value.length, itemListElement: projects.value.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${site}${link.project(p.slug)}`, name: `${p.client} — ${p.label}` })) }
    })
  }]
})

const filter = ref('all')
const filters = computed(() => t.value.filters.filter(f => f.id === 'all' || projects.value.some(p => p.cat === f.id)))
const list = computed(() => filter.value === 'all' ? projects.value : projects.value.filter(p => p.cat === filter.value))
</script>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-end; gap: 64px; padding-top: 96px; padding-bottom: 64px; }
.head__title { display: flex; flex-direction: column; gap: 24px; max-width: 820px; }
.head__h1 { font-size: 80px; line-height: 1; letter-spacing: -2.6px; font-weight: 800; }
.head__p { font-size: 19px; line-height: 1.55; color: var(--muted); max-width: 400px; }
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin: 0 0 72px; background: var(--ink); color: var(--white); border-radius: 24px; overflow: hidden; }
.stats__item { display: flex; flex-direction: column; gap: 8px; padding: 36px 32px; border-right: 1px solid var(--dark-line); }
.stats__item:last-child { border-right: none; }
.stats dd { margin: 0; }
.stats__v { font-family: var(--font-display); font-size: 52px; font-weight: 800; letter-spacing: -1.5px; }
.stats__l { font-size: 15px; color: var(--dark-muted); }
.work { padding-bottom: 112px; }
.empty { display: flex; flex-direction: column; gap: 28px; padding: 56px; border: 1px dashed var(--line-3); border-radius: 28px; background: var(--white); }
.empty__p { font-size: 20px; line-height: 1.55; max-width: 720px; }
.empty__ctas { display: flex; gap: 14px; flex-wrap: wrap; }
.work__bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
.filters { display: flex; gap: 8px; padding: 6px; background: var(--white); border: 1px solid var(--line); border-radius: 999px; flex-wrap: wrap; }
.filters button { padding: 10px 18px; border: none; border-radius: 999px; font-size: 14px; font-weight: 600; background: transparent; color: var(--muted); }
.filters button.is-on { background: var(--ink); color: var(--white); }
.work__count { font-size: 15px; color: var(--muted-2); }
@media (max-width: 1180px) {
  .head { flex-direction: column; align-items: flex-start; gap: 24px; }
  .head__h1 { font-size: 56px; letter-spacing: -1.8px; }
  .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stats__item:nth-child(2) { border-right: none; }
}
@media (max-width: 720px) {
  .filters { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; max-width: 100%; }
  .filters::-webkit-scrollbar { display: none; }
  .filters button { flex: none; white-space: nowrap; }
  .work__bar { flex-wrap: nowrap; }
  .head { padding-top: 56px; }
  .head__h1 { font-size: 40px; letter-spacing: -1.2px; }
  .stats__v { font-size: 38px; }
  .stats__item { padding: 24px 20px; }
  .work { padding-bottom: 64px; }
  .empty { padding: 32px 22px; }
}
</style>
