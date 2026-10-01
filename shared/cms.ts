// Contenus lus dans Supabase au build (modules/cms.ts), exposés au site et au serveur via l'alias « #cms ».
// cms vaut null quand Supabase n'est pas configuré : le site utilise alors les données locales (app/data, content/blog).
import type { BlogMeta } from './blog'

export interface CmsProject {
  slug: string; cat: string; client: string; label: string; desc: string; metric: string
  bg: string; fg: string; img: string | null; url: string | null
  en: { label: string; desc?: string; metric?: string } | null
}
export interface CmsReview { name: string; date: string; text: string; rating: number; truncated: boolean; translated: boolean }
export interface CmsPost { meta: BlogMeta; body: string }
export interface CmsData { projects: CmsProject[]; reviews: CmsReview[]; posts: CmsPost[] }
