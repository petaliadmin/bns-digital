<template>
  <div>
    <section class="container head">
      <Breadcrumb :items="[{ label: t.home, to: link.home() }, { label: 'Blog' }]" />
      <div class="eyebrow">Blog</div>
      <h1 class="head__h1">{{ t.h1 }}</h1>
      <p class="lead head__lead">{{ t.lead }}</p>
    </section>

    <section class="container list">
      <div v-if="sectors.length > 1" class="filters" role="group" :aria-label="t.filterLabel">
        <button type="button" :aria-pressed="sector === 'all'" :class="{ 'is-on': sector === 'all' }" @click="sector = 'all'">{{ t.all }}</button>
        <button v-for="s in sectors" :key="s" type="button" :aria-pressed="sector === s" :class="{ 'is-on': sector === s }" @click="sector = s">{{ sectorLabel(s) }}</button>
      </div>

      <div v-if="shown.length" class="posts">
        <article v-for="(a, i) in shown" :key="a.slug" class="post" :class="{ 'post--featured': i === 0 && sector === 'all' }">
          <NuxtLink :to="link.article(a.slug)" class="post__link">
            <div class="post__visual">
              <img v-if="a.cover" :src="a.cover" :alt="a.coverAlt || ''" loading="lazy" decoding="async" width="1600" height="900">
              <span v-else class="post__placeholder" aria-hidden="true">{{ sectorLabel(a.sector) }}</span>
            </div>
            <div class="post__body">
              <div class="post__meta"><span class="post__sector">{{ sectorLabel(a.sector) }}</span><span>{{ formatDate(a.date) }} · {{ a.readingMinutes }} min</span></div>
              <h2 class="post__title">{{ a.title }}</h2>
              <p class="post__desc">{{ a.description }}</p>
              <span class="post__more">{{ t.read }} →</span>
            </div>
          </NuxtLink>
        </article>
      </div>
      <p v-else class="empty">{{ t.empty }}</p>
    </section>

    <CtaBand :title="t.ctaTitle" :text="t.ctaText" :label="t.ctaLabel" :to="link.booking()" />
  </div>
</template>

<script setup lang="ts">
import { BLOG_SECTORS } from '#shared/blog'
import { blogArticles } from '~/data/blog'

const { en, locale, link } = useSite()
const t = useLocaleText({
  fr: {
    home: 'Accueil', h1: 'Conseils digitaux, secteur par secteur.',
    lead: 'Site web, référencement, publicité, réseaux sociaux : nos conseils concrets pour développer votre activité en ligne, adaptés aux enjeux de votre secteur.',
    filterLabel: 'Filtrer par secteur', all: 'Tous les articles', read: 'Lire l’article', empty: 'Les premiers articles arrivent bientôt.',
    ctaTitle: 'Une question sur votre projet ?', ctaText: '30 minutes pour faire le point sur vos priorités digitales, gratuitement et sans engagement.', ctaLabel: 'Réserver un appel',
    title: 'Blog : conseils digitaux par secteur', desc: 'Conseils concrets en création de site web, SEO & GEO, publicité en ligne et social media, adaptés à votre secteur : énergie, immobilier, santé, B2B…'
  },
  en: {
    home: 'Home', h1: 'Digital advice, industry by industry.',
    lead: 'Websites, SEO, paid ads, social media: practical advice to grow your business online, tailored to the challenges of your industry.',
    filterLabel: 'Filter by industry', all: 'All articles', read: 'Read the article', empty: 'Our first articles are coming soon.',
    ctaTitle: 'A question about your project?', ctaText: '30 minutes to review your digital priorities, free and with no commitment.', ctaLabel: 'Book a call',
    title: 'Blog: digital marketing advice by industry', desc: 'Practical advice on website design, SEO & GEO, paid advertising and social media, tailored to your industry: energy, real estate, healthcare, B2B…'
  }
})

const articles = computed(() => blogArticles(locale.value as 'fr' | 'en'))
const sectors = computed(() => [...new Set(articles.value.map(a => a.sector))])
const sector = ref('all')
const shown = computed(() => (sector.value === 'all' ? articles.value : articles.value.filter(a => a.sector === sector.value)))
const sectorLabel = (s: string) => BLOG_SECTORS[s]?.[en.value ? 'en' : 'fr'] ?? s
const formatDate = (d: string) => new Intl.DateTimeFormat(en.value ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${d}T12:00:00Z`))

usePageSeo({ title: () => t.value.title, description: () => t.value.desc })
const site = useRuntimeConfig().public.siteUrl as string
useHead({
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'KPS Agency — Blog', href: () => `${site}${en.value ? '/en' : ''}/blog/rss.xml` }],
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Blog', '@id': `${site}${link.blog()}#blog`, url: `${site}${link.blog()}`,
      name: t.value.title, description: t.value.desc, inLanguage: en.value ? 'en-GB' : 'fr-FR', publisher: { '@id': `${site}/#organization` },
      blogPost: articles.value.map(a => ({ '@type': 'BlogPosting', headline: a.title, url: `${site}${link.article(a.slug)}`, datePublished: a.date }))
    })
  }]
})
</script>

<style scoped>
.head { display: flex; flex-direction: column; gap: 20px; padding-top: 40px; padding-bottom: 48px; }
.head__h1 { font-size: 72px; line-height: 1.02; letter-spacing: -2.4px; font-weight: 800; max-width: 980px; margin-top: 16px; }
.head__lead { max-width: 760px; }
.list { padding-bottom: 96px; }
.filters { display: flex; flex-wrap: wrap; gap: 8px; padding: 6px; margin-bottom: 32px; width: fit-content; max-width: 100%; background: var(--white); border: 1px solid var(--line); border-radius: 999px; }
.filters button { padding: 10px 18px; border: none; border-radius: 999px; font-size: 14px; font-weight: 600; background: transparent; color: var(--muted); white-space: nowrap; }
.filters button.is-on { background: var(--ink); color: var(--white); }
.posts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.post { display: flex; }
.post__link { display: flex; flex-direction: column; width: 100%; background: var(--white); border: 1px solid var(--line); border-radius: 20px; overflow: hidden; color: var(--ink); transition: transform .2s, box-shadow .2s; }
.post__link:hover { color: var(--ink); transform: translateY(-3px); box-shadow: 0 24px 48px -28px rgba(23, 18, 61, .35); }
.post__visual { aspect-ratio: 16 / 9; overflow: hidden; background: var(--accent-soft); }
.post__visual img { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform .4s; }
.post__link:hover .post__visual img { transform: scale(1.04); }
.post__placeholder { display: flex; align-items: center; justify-content: center; height: 100%; font-family: var(--font-display); font-size: 26px; font-weight: 800; color: var(--accent); background: linear-gradient(135deg, var(--accent-soft), var(--accent-tint)); }
.post__body { display: flex; flex-direction: column; gap: 10px; padding: 24px; flex-grow: 1; }
.post__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; font-size: 13px; color: var(--muted-2); }
.post__sector { padding: 4px 10px; border-radius: 99px; background: var(--accent-soft); color: var(--accent); font-weight: 600; }
.post__title { font-size: 22px; line-height: 1.25; letter-spacing: -.4px; font-weight: 700; }
.post__desc { font-size: 15px; line-height: 1.55; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.post__more { margin-top: auto; padding-top: 8px; font-size: 14px; font-weight: 600; color: var(--accent); }
/* Article le plus récent mis en avant */
.post--featured { grid-column: 1 / -1; }
.post--featured .post__link { flex-direction: row; }
.post--featured .post__visual { flex: 0 0 55%; aspect-ratio: auto; min-height: 340px; }
.post--featured .post__body { padding: 40px; justify-content: center; }
.post--featured .post__title { font-size: 34px; letter-spacing: -.8px; }
.empty { padding: 48px; text-align: center; color: var(--muted); background: var(--white); border: 1px dashed var(--line-3); border-radius: 20px; }
@media (max-width: 1180px) {
  .head__h1 { font-size: 56px; letter-spacing: -1.8px; }
  .posts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .post--featured .post__link { flex-direction: column; }
  .post--featured .post__visual { flex: none; aspect-ratio: 16 / 9; min-height: 0; }
  .post--featured .post__body { padding: 28px; }
  .post--featured .post__title { font-size: 28px; }
}
@media (max-width: 720px) {
  .head__h1 { font-size: 40px; letter-spacing: -1.2px; }
  .posts { grid-template-columns: minmax(0, 1fr); }
  .filters { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; }
  .filters::-webkit-scrollbar { display: none; }
  .post__title, .post--featured .post__title { font-size: 21px; }
  .post__body, .post--featured .post__body { padding: 20px; }
}
</style>
