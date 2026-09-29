import { publishedOnly, toMeta, type BlogLang, type BlogMeta } from '#shared/blog'

// Articles du blog lus côté serveur (sitemap, flux RSS) depuis content/blog, embarqué via nitro.serverAssets
export async function serverArticles(lang?: BlogLang): Promise<BlogMeta[]> {
  const storage = useStorage('assets:blog')
  const keys = (await storage.getKeys()).filter(k => k.endsWith('.md')) // ex. « fr:mon-article.md »
  const list = await Promise.all(keys.map(async (key) => {
    const raw = await storage.getItem(key)
    const text = typeof raw === 'string' ? raw : raw instanceof Uint8Array ? new TextDecoder().decode(raw) : String(raw ?? '')
    return toMeta(`/${key.replace(/:/g, '/')}`, text)
  }))
  const published = publishedOnly(list.filter(Boolean) as { meta: BlogMeta; body: string }[]).map(a => a.meta)
  return lang ? published.filter(a => a.lang === lang) : published
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Flux RSS 2.0 d'une langue */
export async function blogRss(lang: BlogLang) {
  const site = useRuntimeConfig().public.siteUrl as string
  const base = lang === 'en' ? `${site}/en/blog` : `${site}/blog`
  const items = (await serverArticles(lang)).slice(0, 30).map(a => [
    '    <item>',
    `      <title>${esc(a.title)}</title>`,
    `      <link>${base}/${a.slug}</link>`,
    `      <guid isPermaLink="true">${base}/${a.slug}</guid>`,
    `      <description>${esc(a.description)}</description>`,
    `      <pubDate>${new Date(`${a.date}T08:00:00Z`).toUTCString()}</pubDate>`,
    ...a.tags.map(tag => `      <category>${esc(tag)}</category>`),
    '    </item>'
  ].join('\n')).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${lang === 'en' ? 'KPS Agency — Blog' : 'KPS Agency — Blog'}</title>
    <link>${base}</link>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${lang === 'en' ? 'Digital marketing advice by industry: websites, SEO & GEO, paid ads and social media.' : 'Conseils digitaux par secteur : sites web, SEO & GEO, publicité en ligne et social media.'}</description>
    <language>${lang === 'en' ? 'en-GB' : 'fr-FR'}</language>
${items}
  </channel>
</rss>
`
}
