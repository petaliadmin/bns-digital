// Blog : lecture des articles Markdown (content/blog/{fr,en}/*.md), partagée par le site (app) et le serveur (sitemap, RSS).

export type BlogLang = 'fr' | 'en'

/** Secteurs (clé = valeur du champ « sector » de l'article) */
export const BLOG_SECTORS: Record<string, { fr: string; en: string }> = {
  energie: { fr: 'Énergie', en: 'Energy' },
  immobilier: { fr: 'Immobilier', en: 'Real estate' },
  saas: { fr: 'SaaS & tech B2B', en: 'SaaS & B2B tech' },
  'beaute-sante': { fr: 'Beauté & santé', en: 'Beauty & health' },
  finance: { fr: 'Finance & conseil', en: 'Finance & consulting' },
  evenementiel: { fr: 'Événementiel', en: 'Events' },
  commerce: { fr: 'Commerce & e-commerce', en: 'Retail & e-commerce' },
  pme: { fr: 'PME & TPE', en: 'SMEs' }
}

export interface BlogMeta {
  lang: BlogLang
  slug: string
  title: string
  /** Titre court pour Google (balise <title>), si le titre affiché est long */
  seoTitle: string
  description: string
  date: string
  updated?: string
  sector: string
  /** Slug FR du service lié (encart d'appel à l'action et maillage interne) */
  service?: string
  tags: string[]
  author: string
  cover?: string
  coverAlt?: string
  /** Slug de la version dans l'autre langue */
  translation?: string
  draft: boolean
  readingMinutes: number
}

/** En-tête YAML simple : `clé: valeur`, `clé: [a, b]`, listes `- a`, chaînes entre guillemets */
export function parseFrontmatter(raw: string): { data: Record<string, string | string[] | boolean>; body: string } {
  const m = raw.replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, body: raw }
  const data: Record<string, string | string[] | boolean> = {}
  let listKey = ''
  const unquote = (v: string) => v.trim().replace(/^(['"])([\s\S]*)\1$/, '$2')
  for (const line of m[1]!.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const item = line.match(/^\s*-\s+(.*)$/)
    if (item && listKey) { (data[listKey] as string[]).push(unquote(item[1]!)); continue }
    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/)
    if (!kv) continue
    const [, key, value] = kv as unknown as [string, string, string]
    listKey = ''
    if (value === '') { data[key] = []; listKey = key; continue }
    if (/^\[.*\]$/.test(value.trim())) { data[key] = value.trim().slice(1, -1).split(',').map(unquote).filter(Boolean); continue }
    if (value.trim() === 'true' || value.trim() === 'false') { data[key] = value.trim() === 'true'; continue }
    data[key] = unquote(value)
  }
  return { data, body: m[2]! }
}

/** Temps de lecture (≈ 220 mots / minute), minimum 1 min */
export const readingMinutes = (text: string) => Math.max(1, Math.round(text.replace(/[#>*_`[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length / 220))

/** Construit les métadonnées d'un article à partir de son chemin (…/blog/fr/mon-article.md) et de son contenu */
export function toMeta(path: string, raw: string): { meta: BlogMeta; body: string } | null {
  const m = path.replace(/\\/g, '/').match(/\/(fr|en)\/([^/]+)\.md$/)
  if (!m || m[2]!.startsWith('_')) return null // fichiers « _modele.md » ignorés
  const { data, body } = parseFrontmatter(raw)
  const str = (k: string) => (typeof data[k] === 'string' ? (data[k] as string) : '')
  const arr = (k: string) => (Array.isArray(data[k]) ? (data[k] as string[]) : str(k) ? [str(k)] : [])
  if (!str('title') || !str('date')) return null
  return {
    meta: {
      lang: m[1] as BlogLang,
      slug: m[2]!,
      title: str('title'),
      seoTitle: str('seoTitle') || str('title'),
      description: str('description'),
      date: str('date'),
      updated: str('updated') || undefined,
      sector: str('sector') || 'pme',
      service: str('service') || undefined,
      tags: arr('tags'),
      author: str('author') || 'BNS Digital',
      cover: str('cover') || undefined,
      coverAlt: str('coverAlt') || undefined,
      translation: str('translation') || undefined,
      draft: data.draft === true,
      readingMinutes: readingMinutes(body)
    },
    body
  }
}

/** Articles publiés (hors brouillons et dates futures), du plus récent au plus ancien */
export function publishedOnly<T extends { meta: BlogMeta }>(list: T[], now = new Date()) {
  const today = now.toISOString().slice(0, 10)
  return list.filter(a => !a.meta.draft && a.meta.date <= today).sort((a, b) => b.meta.date.localeCompare(a.meta.date))
}
