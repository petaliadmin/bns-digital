import { addTemplate, addTypeTemplate, defineNuxtModule, useLogger } from 'nuxt/kit'
import { createClient } from '@supabase/supabase-js'
import { readingMinutes, type BlogLang } from '../shared/blog'
import type { CmsData } from '../shared/cms'

// Contenus dynamiques : réalisations, avis et articles lus dans Supabase au démarrage du build (clé publishable, lecture du seul contenu publié).
// Les pages restent prérendues (SEO) : après une modification dans Supabase, relancer la génération du site (voir supabase/README.md).
async function loadCms(url: string, key: string): Promise<CmsData> {
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  const [projects, reviews, posts] = await Promise.all([
    db.from('projects').select('*').order('position').order('slug'),
    db.from('reviews').select('*').order('position').order('date', { ascending: false }),
    db.from('blog_posts').select('*')
  ])
  const failed = [projects, reviews, posts].find(r => r.error)
  if (failed) throw new Error(`Supabase : ${failed.error!.message}`)

  return {
    projects: projects.data!.map(p => ({
      slug: p.slug, cat: p.cat, client: p.client, label: p.label_fr, desc: p.desc_fr, metric: p.metric_fr,
      bg: p.bg, fg: p.fg, img: p.img, url: p.url,
      en: p.label_en ? { label: p.label_en, desc: p.desc_en ?? undefined, metric: p.metric_en ?? undefined } : null
    })),
    reviews: reviews.data!.map(r => ({ name: r.name, date: r.date, text: r.text, rating: r.rating, truncated: r.truncated, translated: r.translated })),
    posts: posts.data!.map(a => ({
      meta: {
        lang: a.lang as BlogLang, slug: a.slug, title: a.title, seoTitle: a.seo_title || a.title, description: a.description,
        date: a.date, updated: a.updated ?? undefined, sector: a.sector, service: a.service ?? undefined, tags: a.tags ?? [],
        author: a.author, cover: a.cover ?? undefined, coverAlt: a.cover_alt ?? undefined, translation: a.translation ?? undefined,
        draft: a.draft, readingMinutes: readingMinutes(a.body)
      },
      body: a.body
    }))
  }
}

export default defineNuxtModule({
  meta: { name: 'cms' },
  async setup(_, nuxt) {
    const logger = useLogger('cms')
    const url = process.env.NUXT_SUPABASE_URL
    const key = process.env.NUXT_SUPABASE_KEY
    // Supabase configuré mais injoignable : on arrête le build plutôt que de publier un site sans portfolio
    const data = url && key ? await loadCms(url, key) : null
    if (data) logger.info(`Supabase : ${data.projects.length} réalisations, ${data.reviews.length} avis, ${data.posts.length} articles`)
    else logger.info('Supabase non configuré : données locales (app/data, content/blog)')

    const tpl = addTemplate({ filename: 'cms.mjs', write: true, getContents: () => `export default ${JSON.stringify(data)}\n` })
    nuxt.options.alias['#cms'] = tpl.dst
    addTypeTemplate({
      filename: 'types/cms.d.ts',
      getContents: () => `declare module '#cms' {\n  const cms: import('../../shared/cms').CmsData | null\n  export default cms\n}\n`
    }, { nuxt: true, nitro: true, shared: true })
  }
})
