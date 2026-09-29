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

// Balises SEO et réseaux sociaux d'une page. Canonical, og:url, og:site_name et og:locale sont posés globalement dans app.vue.
export function usePageSeo(o: PageSeo) {
  const site = useRuntimeConfig().public.siteUrl as string
  const abs = (u: string) => (u.startsWith('http') ? u : site + u)
  const image = () => abs(toValue(o.image) || DEFAULT_IMAGE)
  const isDefault = () => !toValue(o.image)

  useSeoMeta({
    title: () => toValue(o.title),
    description: () => toValue(o.description),
    ogTitle: () => `${toValue(o.title)} · BNS Digital`,
    ogDescription: () => toValue(o.description),
    ogType: o.type ?? 'website',
    ogImage: image,
    ogImageWidth: () => (isDefault() ? 1200 : undefined),
    ogImageHeight: () => (isDefault() ? 630 : undefined),
    ogImageAlt: () => toValue(o.title),
    twitterCard: 'summary_large_image',
    twitterTitle: () => `${toValue(o.title)} · BNS Digital`,
    twitterDescription: () => toValue(o.description),
    twitterImage: image,
    robots: () => (toValue(o.noindex) ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1')
  })
}
