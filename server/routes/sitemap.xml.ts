import { PROJECTS, SERVICES, LOCAL_PAGES } from '../../app/data/content'
import { LOCAL_SLUG_EN, SERVICE_SLUG_EN } from '../../app/data/content.en'

// Sitemap bilingue des seules pages indexables (les pages en noindex en sont exclues).
// Chaque URL déclare ses alternatives fr / en / x-default (hreflang). Prérendu en fichier statique.
export default defineEventHandler(async (event) => {
  const site = useRuntimeConfig(event).public.siteUrl as string
  const today = new Date().toISOString().slice(0, 10)

  // [chemin FR, chemin EN, priorité, fréquence]
  const pages: [string, string, string, string][] = [
    ['/', '/en', '1.0', 'weekly'],
    ['/services', '/en/services', '0.9', 'monthly'],
    ...SERVICES.map(s => [`/services/${s.slug}`, `/en/services/${SERVICE_SLUG_EN[s.slug]}`, '0.9', 'monthly'] as [string, string, string, string]),
    ...LOCAL_PAGES.map(l => [`/agence-digitale/${l.slug}`, `/en/digital-agency/${LOCAL_SLUG_EN[l.slug]}`, '0.8', 'monthly'] as [string, string, string, string]),
    ['/realisations', '/en/work', '0.8', 'monthly'],
    // Même règle que la page projet : indexée seulement si l'étude de cas a un vrai contenu
    ...PROJECTS.filter(p => !p.desc.startsWith('[')).map(p => [`/realisations/${p.slug}`, `/en/work/${p.slug}`, '0.6', 'yearly'] as [string, string, string, string]),
    ['/agence', '/en/about', '0.7', 'yearly'],
    ['/rendez-vous', '/en/book-a-call', '0.8', 'monthly'],
    ['/blog', '/en/blog', '0.8', 'weekly'],
    ['/contact', '/en/contact', '0.7', 'yearly']
  ]

  const url = (loc: string, fr: string, en: string, priority: string, changefreq: string) => [
    '  <url>',
    `    <loc>${site}${loc}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="fr-FR" href="${site}${fr}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${site}${en}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${fr}"/>`,
    `    <lastmod>${today}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>'
  ].join('\n')

  // Articles : hreflang seulement si la traduction existe ; lastmod = date de mise à jour
  const articles = await serverArticles()
  const has = (lang: string, slug?: string) => !!slug && articles.some(a => a.lang === lang && a.slug === slug)
  const articleUrls = articles.map((a) => {
    const self = a.lang === 'en' ? `/en/blog/${a.slug}` : `/blog/${a.slug}`
    const other = has(a.lang === 'en' ? 'fr' : 'en', a.translation) ? (a.lang === 'en' ? `/blog/${a.translation}` : `/en/blog/${a.translation}`) : ''
    const fr = a.lang === 'fr' ? self : other
    const en = a.lang === 'en' ? self : other
    return [
      '  <url>',
      `    <loc>${site}${self}</loc>`,
      ...(fr ? [`    <xhtml:link rel="alternate" hreflang="fr-FR" href="${site}${fr}"/>`] : []),
      ...(en ? [`    <xhtml:link rel="alternate" hreflang="en" href="${site}${en}"/>`] : []),
      ...(fr && en ? [`    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${fr}"/>`] : []),
      `    <lastmod>${a.updated ?? a.date}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      '    <priority>0.7</priority>',
      '  </url>'
    ].join('\n')
  })

  const body = [...pages.flatMap(([fr, en, pr, cf]) => [url(fr, fr, en, pr, cf), url(en, fr, en, pr, cf)]), ...articleUrls].join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`
})
