<template>
  <div>
    <section class="container head">
      <Breadcrumb :items="[{ label: t.home, to: link.home() }, { label: t.crumb }]" />
      <div class="eyebrow">{{ t.crumb }}</div>
      <h1 class="head__h1">{{ t.h1 }}</h1>
      <p class="lead head__p">{{ t.lead }}</p>
    </section>
    <section class="container list">
      <div class="grid grid-4 m-swipe">
        <NuxtLink v-for="(sv, i) in services" :key="sv.slug" :to="link.service(sv.slug)" class="item" :class="{ 'item--dark': i === 0 }">
          <span class="item__num">{{ sv.num }}</span>
          <h2 class="item__t">{{ sv.crumb }}</h2>
          <p class="item__d">{{ sv.sub }}</p>
          <div class="item__pills"><span v-for="of in sv.offers" :key="of.n">{{ of.t }}</span></div>
          <span class="item__cta">{{ t.more }} →</span>
        </NuxtLink>
        <NuxtLink :to="link.contact()" class="item item--soft">
          <span class="item__num">+</span>
          <h2 class="item__t">{{ t.customT }}</h2>
          <p class="item__d">{{ t.customD }}</p>
          <span class="item__cta">{{ t.customCta }} →</span>
        </NuxtLink>
      </div>
    </section>
    <CtaBand :title="t.ctaTitle" :text="t.ctaText" />
  </div>
</template>

<script setup lang="ts">
const { en, link, services, serviceSeo } = useSite()
const t = useLocaleText({
  fr: {
    home: 'Accueil', crumb: 'Expertises', h1: 'Sept expertises. Une seule équipe. Un objectif : votre croissance.',
    lead: 'Chaque expertise se mobilise seule ou en synergie. C’est dans leur articulation — un site bien référencé, nourri par des campagnes rentables et des contenus engageants — que naît la performance durable.',
    more: 'Découvrir', customT: 'Un besoin sur mesure ?', customD: 'Plusieurs expertises à combiner, ou un projet qui ne rentre dans aucune case ? Décrivez-le-nous : nous vous proposons la bonne équipe.', customCta: 'Parler de votre projet', ctaTitle: 'Un projet en tête ?', ctaText: 'Décrivez-nous votre besoin : nous revenons vers vous avec une recommandation claire et un devis personnalisé.',
    title: 'Nos expertises : web, IA & marketing digital', desc: 'Sites web, applications, IA & automatisation, SEO, publicité et social media : sept expertises à prix abordables, pour la France, l’Europe et le Canada.'
  },
  en: {
    home: 'Home', crumb: 'Services', h1: 'Seven areas of expertise. One team. One goal: your growth.',
    lead: 'Each service works on its own or in synergy with the others. Lasting performance comes from how they fit together — a well-ranked website, fuelled by profitable campaigns and engaging content.',
    more: 'Discover', customT: 'Something tailor-made?', customD: 'Several areas of expertise to combine, or a project that doesn’t fit any box? Tell us about it and we’ll put the right team together.', customCta: 'Discuss your project', ctaTitle: 'Got a project in mind?', ctaText: 'Tell us what you need: we’ll come back to you with a clear recommendation and a tailored quote.',
    title: 'Web & digital marketing agency: our services', desc: 'Websites, software, AI & automation, SEO, paid ads and social media: seven areas of expertise at affordable prices, for Canada, France and Europe.'
  }
})
usePageSeo({ title: () => t.value.title, description: () => t.value.desc })
const site = useRuntimeConfig().public.siteUrl as string
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage', '@id': `${site}${link.services()}#webpage`, url: `${site}${link.services()}`, name: t.value.title, inLanguage: en.value ? 'en' : 'fr',
      mainEntity: { '@type': 'ItemList', itemListElement: services.value.map((sv, i) => ({ '@type': 'ListItem', position: i + 1, url: `${site}${link.service(sv.slug)}`, name: serviceSeo.value[sv.slug]?.h1 ?? sv.crumb })) }
    })
  }]
})
</script>

<style scoped>
.head { display: flex; flex-direction: column; gap: 24px; padding-top: 40px; padding-bottom: 64px; }
.head .eyebrow { margin-top: 32px; }
.head__h1 { font-size: 72px; line-height: 1.02; letter-spacing: -2.4px; font-weight: 800; max-width: 1100px; }
.head__p { max-width: 760px; }
.list { padding-bottom: 112px; }
.item { display: flex; flex-direction: column; gap: 16px; padding: 28px; min-height: 360px; background: var(--white); border: 1px solid var(--line); border-radius: 20px; color: var(--ink); transition: transform .2s ease; }
.item:hover { transform: translateY(-3px); color: var(--ink); }
.item--dark { background: var(--ink); color: var(--white); } .item--dark:hover { color: var(--white); }
.item__num { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 14px; background: var(--bg); font-family: var(--font-display); font-weight: 800; font-size: 18px; }
.item--dark .item__num { background: var(--accent); }
.item__t { font-size: 24px; line-height: 1.15; letter-spacing: -.5px; font-weight: 700; }
.item--soft { background: var(--accent-soft); border-color: var(--accent-tint); }
.item--soft .item__num { background: var(--accent); color: var(--white); }
.item__d { font-size: 16px; line-height: 1.55; color: var(--muted); }
.item--dark .item__d { color: var(--dark-muted); }
.item__pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
.item__pills span { font-size: 13px; padding: 6px 10px; border-radius: 8px; background: var(--bg); }
.item--dark .item__pills span { background: var(--dark-2); }
.item__cta { font-size: 15px; font-weight: 600; }
@media (max-width: 1180px) { .head__h1 { font-size: 52px; letter-spacing: -1.6px; } }
@media (max-width: 720px) { .head__h1 { font-size: 38px; letter-spacing: -1px; } .list { padding-bottom: 64px; } }
</style>
