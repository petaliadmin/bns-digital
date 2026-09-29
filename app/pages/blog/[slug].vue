<template>
  <article v-if="post" class="art">
    <header class="container art__head">
      <Breadcrumb :items="[{ label: t.home, to: link.home() }, { label: 'Blog', to: link.blog() }, { label: post.meta.title }]" />
      <div class="art__meta">
        <span class="art__sector">{{ sectorLabel(post.meta.sector) }}</span>
        <span><time :datetime="post.meta.date">{{ formatDate(post.meta.date) }}</time><template v-if="post.meta.updated"> · {{ t.updated }} <time :datetime="post.meta.updated">{{ formatDate(post.meta.updated) }}</time></template></span>
        <span>{{ post.meta.readingMinutes }} {{ t.minutes }}</span>
      </div>
      <h1 class="art__h1">{{ post.meta.title }}</h1>
      <p class="lead art__lead">{{ post.meta.description }}</p>
      <p class="art__author">{{ t.by }} <strong>{{ post.meta.author }}</strong></p>
    </header>

    <figure v-if="post.meta.cover" class="container art__cover">
      <img :src="post.meta.cover" :alt="post.meta.coverAlt || post.meta.title" width="1600" height="900" fetchpriority="high">
    </figure>

    <div class="container art__layout">
      <nav v-if="rendered.toc.length > 2" class="art__toc" :aria-label="t.toc">
        <div class="art__toc-t">{{ t.toc }}</div>
        <ul><li v-for="h in rendered.toc" :key="h.id"><a :href="`#${h.id}`">{{ h.text }}</a></li></ul>
      </nav>
      <div class="art__main">
        <!-- Contenu rédigé par l'équipe (Markdown du dépôt), rendu au build -->
        <div class="prose" v-html="rendered.html" />

        <aside v-if="service" class="art__cta">
          <div>
            <span class="art__cta-k">{{ t.ctaKicker }}</span>
            <strong class="art__cta-t">{{ service.crumb }}</strong>
            <p>{{ service.sub }}</p>
          </div>
          <div class="art__cta-actions">
            <NuxtLink :to="link.service(service.slug)" class="btn btn--light btn--sm">{{ t.ctaService }} →</NuxtLink>
            <NuxtLink :to="link.booking()" class="btn btn--outline-dark btn--sm">{{ t.ctaCall }}</NuxtLink>
          </div>
        </aside>

        <p v-if="post.meta.tags.length" class="art__tags"><span v-for="tag in post.meta.tags" :key="tag">#{{ tag }}</span></p>
      </div>
    </div>

    <section v-if="related.length" class="bg-white related">
      <div class="container">
        <h2 class="h2 h2--48 related__h">{{ t.related }}</h2>
        <div class="grid grid-3 m-swipe">
          <NuxtLink v-for="a in related" :key="a.slug" :to="link.article(a.slug)" class="rel">
            <span class="rel__sector">{{ sectorLabel(a.sector) }}</span>
            <span class="rel__t">{{ a.title }}</span>
            <span class="rel__meta">{{ formatDate(a.date) }} · {{ a.readingMinutes }} min</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { BLOG_SECTORS } from '#shared/blog'
import { blogArticle, blogArticles, renderArticle } from '~/data/blog'

const route = useRoute()
const { en, locale, link, services } = useSite()
const lang = computed(() => locale.value as 'fr' | 'en')
const post = computed(() => blogArticle(lang.value, String(route.params.slug)))
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Article introuvable', fatal: true })

// Version dans l'autre langue : hreflang et sélecteur de langue uniquement si la traduction existe
const other = lang.value === 'fr' ? 'en' : 'fr'
const translated = post.value.meta.translation && blogArticle(other, post.value.meta.translation) ? post.value.meta.translation : undefined
useSetI18nParams()({ [lang.value]: { slug: post.value.meta.slug }, ...(translated ? { [other]: { slug: translated } } : {}) })

const rendered = computed(() => renderArticle(post.value!.body))
const service = computed(() => services.value.find(s => s.slug === post.value!.meta.service))
// Articles liés : même secteur d'abord, puis les plus récents
const related = computed(() => {
  const list = blogArticles(lang.value).filter(a => a.slug !== post.value!.meta.slug)
  return [...list.filter(a => a.sector === post.value!.meta.sector), ...list.filter(a => a.sector !== post.value!.meta.sector)].slice(0, 3)
})

const t = useLocaleText({
  fr: { home: 'Accueil', updated: 'mis à jour le', minutes: 'min de lecture', by: 'Par', toc: 'Sommaire', ctaKicker: 'Notre expertise', ctaService: 'Découvrir l’offre', ctaCall: 'Réserver un appel', related: 'À lire aussi' },
  en: { home: 'Home', updated: 'updated', minutes: 'min read', by: 'By', toc: 'Contents', ctaKicker: 'Our expertise', ctaService: 'Discover the service', ctaCall: 'Book a call', related: 'Keep reading' }
})
const sectorLabel = (s: string) => BLOG_SECTORS[s]?.[en.value ? 'en' : 'fr'] ?? s
const formatDate = (d: string) => new Intl.DateTimeFormat(en.value ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${d}T12:00:00Z`))

const site = useRuntimeConfig().public.siteUrl as string
const m = post.value.meta
usePageSeo({ title: m.seoTitle, description: m.description, image: m.cover, type: 'article' })
useSeoMeta({
  articlePublishedTime: `${m.date}T08:00:00+02:00`,
  articleModifiedTime: `${m.updated ?? m.date}T08:00:00+02:00`,
  articleSection: BLOG_SECTORS[m.sector]?.[lang.value] ?? m.sector,
  articleTag: m.tags
})
useHead({
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'KPS Agency — Blog', href: `${site}${lang.value === 'en' ? '/en' : ''}/blog/rss.xml` }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${site}${link.article(m.slug)}#article`,
      headline: m.title, description: m.description, url: `${site}${link.article(m.slug)}`, mainEntityOfPage: `${site}${link.article(m.slug)}`,
      datePublished: m.date, dateModified: m.updated ?? m.date, inLanguage: lang.value === 'en' ? 'en-GB' : 'fr-FR',
      ...(m.cover ? { image: `${site}${m.cover}` } : {}),
      author: { '@type': 'Organization', name: m.author, url: `${site}/` },
      publisher: { '@id': `${site}/#organization` },
      articleSection: BLOG_SECTORS[m.sector]?.[lang.value] ?? m.sector, keywords: m.tags.join(', '),
      wordCount: post.value.body.split(/\s+/).filter(Boolean).length,
      isPartOf: { '@type': 'Blog', '@id': `${site}${link.blog()}#blog` }
    })
  }]
})
</script>

<style scoped>
/* En-tête, couverture et contenu alignés sur la même largeur de lecture */
.art__head, .art__cover, .art__layout { max-width: 1120px; }
.art__head { display: flex; flex-direction: column; gap: 18px; padding-top: 40px; padding-bottom: 40px; }
.art__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; margin-top: 24px; font-size: 14px; color: var(--muted-2); }
.art__sector { padding: 5px 12px; border-radius: 99px; background: var(--accent-soft); color: var(--accent); font-weight: 600; }
.art__h1 { font-size: 56px; line-height: 1.05; letter-spacing: -1.8px; font-weight: 800; }
.art__lead { max-width: 820px; }
.art__author { font-size: 15px; color: var(--muted); }
.art__cover { margin-top: 0; margin-bottom: 56px; }
.art__cover img { width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; object-position: top center; border-radius: 24px; border: 1px solid var(--line); }
.art__layout { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 64px; align-items: start; padding-bottom: 96px; }
.art__toc { position: sticky; top: 112px; padding: 20px; background: var(--white); border: 1px solid var(--line); border-radius: 18px; }
.art__toc-t { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted-2); margin-bottom: 10px; }
.art__toc ul { margin: 0; padding-left: 16px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; line-height: 1.4; }
.art__toc a { color: var(--muted); }
.art__toc a:hover { color: var(--accent); }
.art__toc li::marker { color: var(--accent); }
.art__main { max-width: 760px; display: flex; flex-direction: column; gap: 40px; }

/* Mise en forme du contenu Markdown */
.prose { font-size: 18px; line-height: 1.75; color: var(--ink); }
.prose :deep(p) { margin: 0 0 1.1em; color: var(--muted); }
.prose :deep(h2) { font-size: 32px; line-height: 1.2; letter-spacing: -.8px; font-weight: 800; margin: 1.8em 0 .6em; scroll-margin-top: 110px; }
.prose :deep(h3) { font-size: 22px; line-height: 1.3; font-weight: 700; margin: 1.5em 0 .5em; scroll-margin-top: 110px; }
.prose :deep(h2:first-child) { margin-top: 0; }
.prose :deep(strong) { color: var(--ink); font-weight: 700; }
.prose :deep(a) { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
.prose :deep(a:hover) { color: var(--accent-hover); }
.prose :deep(ul), .prose :deep(ol) { margin: 0 0 1.2em; padding-left: 1.3em; color: var(--muted); }
.prose :deep(li) { margin-bottom: .4em; }
.prose :deep(li::marker) { color: var(--accent); }
.prose :deep(blockquote) { margin: 1.5em 0; padding: 18px 24px; border-left: 4px solid var(--accent); background: var(--accent-soft); border-radius: 0 14px 14px 0; font-size: 19px; }
.prose :deep(blockquote p) { margin: 0; color: var(--ink); }
.prose :deep(code) { padding: 2px 6px; border-radius: 6px; background: var(--surface-hover); font-size: .88em; }
.prose :deep(img) { width: 100%; height: auto; border-radius: 16px; margin: 1em 0; }
.prose :deep(table) { width: 100%; border-collapse: collapse; margin: 1.2em 0; font-size: 16px; display: block; overflow-x: auto; }
.prose :deep(th), .prose :deep(td) { padding: 10px 14px; border-bottom: 1px solid var(--line); text-align: left; }
.prose :deep(hr) { border: none; border-top: 1px solid var(--line); margin: 2em 0; }

.art__cta { display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 32px; border-radius: 24px; background: var(--ink); color: var(--white); }
.art__cta-k { display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--accent-light); margin-bottom: 6px; }
.art__cta-t { display: block; font-family: var(--font-display); font-size: 26px; letter-spacing: -.4px; }
.art__cta p { margin-top: 8px; font-size: 15px; line-height: 1.55; color: var(--dark-muted); }
.art__cta-actions { display: flex; flex-direction: column; gap: 10px; flex: none; }
.art__tags { display: flex; flex-wrap: wrap; gap: 8px; }
.art__tags span { padding: 5px 12px; border-radius: 99px; border: 1px solid var(--line); font-size: 13px; color: var(--muted-2); }

.related { padding-block: 88px; }
.related__h { margin-bottom: 32px; }
.rel { display: flex; flex-direction: column; gap: 12px; padding: 28px; border: 1px solid var(--line); border-radius: 20px; background: var(--bg); color: var(--ink); transition: transform .2s, border-color .2s; }
.rel:hover { color: var(--ink); transform: translateY(-3px); border-color: var(--accent-tint-2); }
.rel__sector { align-self: flex-start; padding: 4px 10px; border-radius: 99px; background: var(--accent-soft); color: var(--accent); font-size: 12px; font-weight: 600; }
.rel__t { font-size: 20px; line-height: 1.3; font-weight: 700; }
.rel__meta { margin-top: auto; font-size: 13px; color: var(--muted-2); }

@media (max-width: 1180px) {
  .art__layout { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .art__toc { position: static; }
  .art__h1 { font-size: 44px; letter-spacing: -1.4px; }
}
@media (max-width: 720px) {
  .art__h1 { font-size: 34px; letter-spacing: -1px; }
  .art__cover { margin-bottom: 32px; }
  .art__cover img { border-radius: 16px; }
  .prose { font-size: 17px; }
  .prose :deep(h2) { font-size: 26px; }
  .art__cta { flex-direction: column; align-items: flex-start; padding: 24px; }
  .art__cta-actions { width: 100%; }
  .art__cta-actions .btn { justify-content: center; }
  .related { padding-block: 56px; }
}
</style>
