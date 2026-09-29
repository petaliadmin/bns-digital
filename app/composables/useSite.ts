import { CAT_LABEL, LOCAL_PAGES, PROJECTS, REVIEWS, SERVICES, SERVICE_FAQ, SERVICE_SEO, type LocalPage, type Project, type Service } from '~/data/content'
import { CAT_LABEL_EN, LOCAL_PAGES_EN, LOCAL_SLUG_EN, PROJECT_TEXT_EN, SERVICES_EN, SERVICE_FAQ_EN, SERVICE_SEO_EN, SERVICE_SLUG_EN } from '~/data/content.en'

export type Lang = 'fr' | 'en'

/** Textes d'une page dans les deux langues ; l'anglais doit avoir exactement la forme du français */
export function useLocaleText<T>(dict: { fr: T; en: NoInfer<T> }) {
  const { locale } = useI18n()
  return computed(() => dict[locale.value as Lang])
}

/** Données du site dans la langue courante + liens localisés (slugs traduits en anglais) */
export function useSite() {
  const { locale } = useI18n()
  const lp = useLocalePath()
  const en = computed(() => locale.value === 'en')

  const services = computed<Service[]>(() => SERVICES.map(s => (en.value ? { ...s, ...SERVICES_EN[s.slug]! } : s)))
  const projects = computed<Project[]>(() => PROJECTS.map((p) => {
    if (!en.value) return p
    const t = PROJECT_TEXT_EN[p.slug]!
    return { ...p, label: t.label, desc: t.desc ?? p.desc, metric: t.metric ?? p.metric, alt: `Project for ${p.client} — ${t.label}` }
  }))
  const localPages = computed<LocalPage[]>(() => LOCAL_PAGES.map(l => (en.value ? { ...l, ...LOCAL_PAGES_EN[l.slug]! } : l)))
  const serviceFaq = computed(() => (en.value ? SERVICE_FAQ_EN : SERVICE_FAQ))
  const serviceSeo = computed(() => (en.value ? SERVICE_SEO_EN : SERVICE_SEO))
  const catLabel = computed(() => (en.value ? CAT_LABEL_EN : CAT_LABEL))
  /** Portfolio et avis : sections masquées tant que les listes sont vides (content.ts) */
  const hasWork = PROJECTS.length > 0
  const hasReviews = REVIEWS.length > 0

  const serviceSlug = (frSlug: string, lang: Lang = locale.value as Lang) => (lang === 'en' ? SERVICE_SLUG_EN[frSlug]! : frSlug)
  const localSlug = (frSlug: string, lang: Lang = locale.value as Lang) => (lang === 'en' ? LOCAL_SLUG_EN[frSlug]! : frSlug)

  const link = {
    home: () => lp('index'),
    services: () => lp('services'),
    service: (frSlug: string, hash = '') => lp({ name: 'services-slug', params: { slug: serviceSlug(frSlug) }, hash }),
    work: () => lp('realisations'),
    project: (slug: string) => lp({ name: 'realisations-slug', params: { slug } }),
    about: () => lp('agence'),
    contact: () => lp('contact'),
    booking: () => lp('rendez-vous'),
    blog: () => lp('blog'),
    article: (slug: string) => lp({ name: 'blog-slug', params: { slug } }),
    local: (frSlug: string) => lp({ name: 'agence-digitale-slug', params: { slug: localSlug(frSlug) } }),
    terms: () => lp('cgv'),
    legal: (hash = '') => lp({ name: 'mentions-legales', hash }),
    method: () => lp({ name: 'index', hash: '#methode' }),
    reviews: () => lp({ name: 'index', hash: '#avis' })
  }

  const agencyLinks = (links: [string, string][]) => links.filter(([, to]) => (hasWork || to !== link.work()) && (hasReviews || to !== link.reviews()))

  // Pied de page commun (accueil + autres pages) : chaque libellé mène à une page qui traite du sujet
  const footerCols = computed(() => en.value
    ? [
        { title: 'Websites', links: [['Showcase website', link.service('creation-site-web', '#offre-01')], ['Blog', link.service('creation-site-web', '#offre-02')], ['Landing page', link.service('creation-site-web', '#offre-03')], ['E-commerce', link.service('creation-site-web', '#offre-04')]] },
        { title: 'Apps & SEO', links: [['Business software', link.service('application-metier')], ['Mobile apps', link.service('application-mobile')], ['SEO & GEO', link.service('referencement-seo-geo')]] },
        { title: 'Marketing', links: [['Digital marketing & ads', link.service('marketing-digital-ads')], ['Social media & content', link.service('social-media')]] },
        { title: 'Agency', links: agencyLinks([['About us', link.about()], ['Our work', link.work()], ['Client reviews', link.reviews()], ['Blog', link.blog()], ['Book a call', link.booking()], ['Contact & quote', link.contact()]]) }
      ]
    : [
        { title: 'Sites web', links: [['Site vitrine', link.service('creation-site-web', '#offre-01')], ['Blog', link.service('creation-site-web', '#offre-02')], ['Landing page', link.service('creation-site-web', '#offre-03')], ['E-commerce', link.service('creation-site-web', '#offre-04')]] },
        { title: 'Apps & SEO', links: [['Application métier', link.service('application-metier')], ['Application mobile', link.service('application-mobile')], ['SEO & GEO', link.service('referencement-seo-geo')]] },
        { title: 'Marketing', links: [['Marketing digital & ADS', link.service('marketing-digital-ads')], ['Social media & contenus', link.service('social-media')]] },
        { title: 'L’agence', links: agencyLinks([['À propos', link.about()], ['Réalisations', link.work()], ['Avis clients', link.reviews()], ['Blog', link.blog()], ['Réserver un appel', link.booking()], ['Contact & devis', link.contact()]]) }
      ])
  // Pages marchés (pays et villes servis depuis Dakar)
  const footerLocal = computed(() => LOCAL_PAGES.map(l => [en.value ? LOCAL_PAGES_EN[l.slug]!.crumb : l.crumb, link.local(l.slug)] as [string, string]))

  return { en, locale, services, projects, hasWork, hasReviews, localPages, serviceFaq, serviceSeo, catLabel, serviceSlug, localSlug, link, footerCols, footerLocal }
}
