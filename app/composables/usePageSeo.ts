import type { MaybeRefOrGetter } from 'vue'

interface PageSeo {
  /** Titre de page, sans la marque (ajoutée par le titleTemplate) */
  title: MaybeRefOrGetter<string>
  /** Meta description : viser 120–160 caractères */
  description: MaybeRefOrGetter<string>
  /** Image de partage (chemin local ou URL absolue). Par défaut : /og-image.jpg */
  image?: MaybeRefOrGetter<string | undefined>
  /** true = noindex, follow (page provisoire, légale, erreur…) */
  noindex?: MaybeRefOrGetter<boolean>
  type?: 'website' | 'article'
}

const DEFAULT_IMAGE = '/og-image.jpg'
/** Longueur maximale d'une meta description avant troncature par Google */
const DESC_MAX = 160

/** Coupe une description trop longue au dernier mot entier, avec des points de suspension */
export function clampDescription(text: string, max = DESC_MAX) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.–—-]+$/, '')}…`
}

// Balises SEO et réseaux sociaux d'une page. Canonical, og:url, og:site_name et og:locale sont posés globalement dans app.vue.
export function usePageSeo(o: PageSeo) {
  const site = useRuntimeConfig().public.siteUrl as string
  const abs = (u: string) => (u.startsWith('http') ? u : site + u)
  const image = () => abs(toValue(o.image) || DEFAULT_IMAGE)
  const isDefault = () => !toValue(o.image)
  const description = () => clampDescription(toValue(o.description))

  useSeoMeta({
    title: () => toValue(o.title),
    description,
    ogTitle: () => `${toValue(o.title)} · BNS Digital`,
    ogDescription: description,
    ogType: o.type ?? 'website',
    ogImage: image,
    ogImageWidth: () => (isDefault() ? 1200 : undefined),
    ogImageHeight: () => (isDefault() ? 630 : undefined),
    ogImageAlt: () => toValue(o.title),
    twitterCard: 'summary_large_image',
    twitterTitle: () => `${toValue(o.title)} · BNS Digital`,
    twitterDescription: description,
    twitterImage: image,
    robots: () => (toValue(o.noindex) ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1')
  })
}
