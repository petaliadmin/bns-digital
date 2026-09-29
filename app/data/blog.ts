import { Marked, type Tokens } from 'marked'
import { publishedOnly, toMeta, type BlogLang, type BlogMeta } from '#shared/blog'

// Articles : un fichier Markdown par article dans content/blog/{fr,en}/ (inclus au build, pages prérendues).
const files = import.meta.glob('../../content/blog/*/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const all = Object.entries(files).map(([path, raw]) => toMeta(path, raw)).filter(Boolean) as { meta: BlogMeta; body: string }[]
const published = publishedOnly(all)

export const blogArticles = (lang: BlogLang) => published.filter(a => a.meta.lang === lang).map(a => a.meta)
export const blogArticle = (lang: BlogLang, slug: string) => published.find(a => a.meta.lang === lang && a.meta.slug === slug)

/** Texte brut du sommaire : entités HTML décodées (apostrophes, guillemets…) */
const decode = (s: string) => s.replace(/&#39;/g, '’').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Markdown → HTML : ancres sur les intertitres (sommaire), liens externes sécurisés, images différées */
export function renderArticle(body: string) {
  const toc: { id: string; text: string; level: number }[] = []
  const used = new Set<string>()
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth, text }: Tokens.Heading) {
        const html = this.parser.parseInline(tokens)
        if (depth === 1) depth = 2 // un seul H1 par page : celui du titre de l'article
        let id = slugify(text) || 'section'
        while (used.has(id)) id += '-2'
        used.add(id)
        if (depth <= 3) toc.push({ id, text: decode(html.replace(/<[^>]+>/g, '')), level: depth })
        return `<h${depth} id="${id}">${html}</h${depth}>\n`
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
        const external = /^https?:\/\//.test(href) && !href.startsWith('https://bns-digital.com')
        return `<a href="${href}"${title ? ` title="${title}"` : ''}${external ? ' target="_blank" rel="noopener"' : ''}>${this.parser.parseInline(tokens)}</a>`
      },
      image({ href, title, text }: Tokens.Image) {
        return `<img src="${href}" alt="${text}"${title ? ` title="${title}"` : ''} loading="lazy" decoding="async">`
      }
    }
  })
  const html = marked.parse(body, { async: false }) as string
  return { html, toc: toc.filter(h => h.level === 2) }
}
