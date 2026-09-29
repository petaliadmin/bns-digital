// Contenus du site BNS Digital — agence digitale basée à Dakar, au service des entreprises européennes et canadiennes.
// Les valeurs entre crochets [ ... ] sont des emplacements à compléter.

export const CONTACT = {
  email: 'contact@bns-digital.com',
  phone: '[Téléphone]',
  // Ajouter la rue devant la ville quand elle sera connue (voir COMPANY.street)
  address: 'Dakar, Sénégal'
}

/* ---------------- Identité légale & données structurées ---------------- */
export const COMPANY = {
  name: 'BNS Digital',
  legalName: '[Raison sociale]',
  legalForm: '[Forme juridique et capital]',
  rccm: '[RCCM]',
  ninea: '[NINEA]',
  street: '[Adresse]',
  city: 'Dakar',
  country: 'SN',
  // Profils officiels (Google Business Profile, LinkedIn, Instagram…) : à compléter pour relier la marque (schema sameAs)
  sameAs: [] as string[]
}
/** true si la valeur est renseignée (pas un emplacement entre crochets) */
export const filled = (v: string) => !!v && !v.startsWith('[')

/** Marchés servis : France, Belgique, Suisse, Canada (+ Sénégal, où l'équipe est basée) */
export const AREA_SERVED = [
  { '@type': 'Country', name: 'France' },
  { '@type': 'Country', name: 'Belgique' },
  { '@type': 'Country', name: 'Suisse' },
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Country', name: 'Sénégal' }
]

/** Entité ProfessionalService de référence, réutilisée par toutes les pages (même @id) */
export const organizationSchema = (site: string, lang: 'fr' | 'en' = 'fr') => ({
  '@type': ['ProfessionalService', 'Organization'],
  '@id': `${site}/#organization`,
  name: COMPANY.name,
  ...(filled(COMPANY.legalName) ? { legalName: COMPANY.legalName } : {}),
  url: `${site}/`,
  logo: { '@type': 'ImageObject', url: `${site}/logo-bns.webp`, width: 518, height: 206 },
  image: `${site}/og-image.jpg`,
  description: lang === 'en'
    ? 'Dakar-based digital agency serving companies in France, Europe and Canada: website design, custom software, SEO & GEO, paid advertising and social media.'
    : 'Agence digitale basée à Dakar au service des entreprises françaises, européennes et canadiennes : sites web, applications sur mesure, SEO & GEO, publicité en ligne et social media.',
  email: CONTACT.email,
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: CONTACT.email, availableLanguage: ['French', 'English'], areaServed: ['FR', 'BE', 'CH', 'CA', 'SN'] },
  ...(filled(CONTACT.phone) ? { telephone: CONTACT.phone } : {}),
  ...(filled(COMPANY.ninea) ? { identifier: { '@type': 'PropertyValue', propertyID: 'NINEA', value: COMPANY.ninea } } : {}),
  address: { '@type': 'PostalAddress', ...(filled(COMPANY.street) ? { streetAddress: COMPANY.street } : {}), addressLocality: COMPANY.city, addressCountry: COMPANY.country },
  areaServed: AREA_SERVED,
  priceRange: lang === 'en' ? 'On quote' : 'Sur devis',
  knowsAbout: ['Création de site web', 'E-commerce', 'Application métier', 'Application mobile', 'Référencement SEO', 'GEO (Generative Engine Optimization)', 'Google Ads', 'Meta Ads', 'Social media'],
  ...(COMPANY.sameAs.length ? { sameAs: COMPANY.sameAs } : {})
})

/* ---------------- Avis Google (textes verbatim, à copier depuis la fiche Google de BNS Digital) ---------------- */
export interface Review { name: string; /** AAAA-MM */ date: string; text: string; rating: number; truncated?: boolean; translated?: boolean }
/** Lien vers la fiche Google de l'agence (vide tant qu'elle n'existe pas) */
export const GOOGLE_REVIEWS_URL = ''
// Tant que la liste est vide, les sections « Avis » sont masquées sur le site.
export const REVIEWS: Review[] = []
export const REVIEWS_AVG = REVIEWS.length ? REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length : 0

export type ProjectCat = 'Web' | 'Social' | 'ADS'
export interface Project {
  slug: string
  cat: ProjectCat
  client: string
  label: string
  desc: string
  metric: string
  bg: string
  fg: string
  img: string
  alt: string
  url?: string
}

// Visuels : public/images/realisations/<slug>.webp (1600 px) + <slug>-800.webp (vignette)
const IMG = '/images/realisations/'
/** Construit une réalisation (visuel et texte alternatif déduits du slug) */
export const project = (slug: string, cat: ProjectCat, client: string, label: string, desc: string, metric: string, bg: string, fg: string, url?: string): Project =>
  ({ slug, cat, client, label, desc, metric, bg, fg, img: `${IMG}${slug}.webp`, alt: `Réalisation ${client} — ${label}`, url })

// Réalisations de BNS Digital : à compléter. Tant que la liste est vide, le portfolio est masqué
// (accueil, menu, pages services) et la page Réalisations affiche un message d'attente.
// Exemple : project('mon-client', 'Web', 'Mon client', 'Secteur', 'Description du projet', 'Résultat chiffré', '#DDE3FF', '#1A2A8A', 'https://…')
export const PROJECTS: Project[] = []

export const CAT_LABEL: Record<ProjectCat, string> = { Web: 'Site web', ADS: 'ADS', Social: 'Social/Médias' }
/** Vignette 800 px générée à côté de chaque visuel (cartes, listes) */
export const thumb = (img: string) => img.replace(/\.webp$/, '-800.webp')

/* ---------------- Services ---------------- */
export interface Offer { n: string; t: string; d: string; tags: string[] }
export interface Step { n: string; t: string; d: string }
export interface Benefit { t: string; d: string }
export interface Service {
  slug: string; key: string; num: string; crumb: string; eyebrow: string; h1: string; sub: string
  offersTitle: string; offersSub: string; offers: Offer[]
  benTitle: string; benefits: Benefit[]; methTitle: string; steps: Step[]
  related: string[]; cta: string
}

const o = (n: string, t: string, d: string, tags: string[]): Offer => ({ n, t, d, tags })
const s = (n: string, t: string, d: string): Step => ({ n, t, d })
const b = (t: string, d: string): Benefit => ({ t, d })

const COMMON_STEPS = [
  s('1', 'Cadrage', 'Analyse de votre marché, de vos concurrents et de vos objectifs pour fixer les priorités.'),
  s('2', 'Conception', 'Parcours, maquettes, plan d’action : vous validez avant toute production.'),
  s('3', 'Production', 'Nos équipes produisent avec exigence et vous associent à chaque jalon.'),
  s('4', 'Lancement & suivi', 'Mise en ligne, mesure des performances et optimisation continue.')
]

export const SERVICES: Service[] = [
  {
    slug: 'creation-site-web', key: 'web', num: '01', crumb: 'Création de site web', eyebrow: 'Création de site web',
    h1: 'Des sites qui travaillent pour votre croissance.',
    sub: 'Vitrine, blog, landing page ou e-commerce : nous concevons des sites rapides, élégants et pensés pour convertir, du premier écran jusqu’à la prise de contact ou l’achat.',
    offersTitle: 'Un format pour chaque ambition.', offersSub: 'Chaque site est une réponse sur-mesure aux enjeux stratégiques de nos clients.',
    offers: [
      o('01', 'Site vitrine', 'Présentez votre entreprise, vos expertises et vos références avec un site qui inspire confiance dès la première visite.', ['Identité', 'Pages services', 'Formulaire de contact']),
      o('02', 'Blog', 'Publiez des contenus experts qui nourrissent votre référencement et installent votre légitimité sur votre marché.', ['Stratégie éditoriale', 'SEO', 'Catégories']),
      o('03', 'Landing page', 'Une page, un objectif : transformer le trafic de vos campagnes en demandes de devis ou en inscriptions.', ['Campagnes ADS', 'Conversion', 'A/B test']),
      o('04', 'E-commerce', 'Une boutique en ligne pensée pour la vente : fiches produits soignées, tunnel d’achat fluide, paiement sécurisé.', ['Catalogue', 'Paiement', 'Tunnel d’achat'])
    ],
    benTitle: 'Un site n’est pas une vitrine. C’est un outil de vente.',
    benefits: [
      b('Performance', 'Des pages légères et rapides, parce qu’un visiteur qui attend est un visiteur qui part.'),
      b('Conversion', 'Chaque section est pensée pour guider le visiteur vers l’action : contact, devis ou achat.'),
      b('Référencement natif', 'Structure, balisage et contenus optimisés dès la conception, pas après la mise en ligne.'),
      b('Cohérence de marque', 'Un design fidèle à votre identité, décliné avec rigueur sur chaque écran.')
    ],
    methTitle: 'De l’idée à la mise en ligne.', steps: COMMON_STEPS,
    related: [], cta: 'Un site à créer ou à refondre ?'
  },
  {
    slug: 'application-metier', key: 'app', num: '02', crumb: 'Application métier', eyebrow: 'Application métier sur mesure',
    h1: 'Vos processus, enfin à la hauteur de votre activité.',
    sub: 'Nous concevons des outils métier taillés pour vos équipes : moins de tâches manuelles, moins de fichiers dispersés, plus de temps pour votre cœur de métier.',
    offersTitle: 'Des outils conçus autour de vos équipes.', offersSub: 'Chaque application part de vos usages réels, pas d’un logiciel standard à adapter.',
    offers: [
      o('01', 'CRM sur mesure', 'Centralisez vos contacts, vos opportunités et votre suivi commercial dans un outil qui vous ressemble.', ['Pipeline', 'Relances', 'Tableaux de bord']),
      o('02', 'Back-office', 'Pilotez vos opérations, vos stocks ou vos commandes depuis une interface claire et sécurisée.', ['Gestion', 'Droits d’accès', 'Exports']),
      o('03', 'Portail client', 'Offrez à vos clients un espace dédié pour suivre leurs dossiers, documents et échanges.', ['Espace sécurisé', 'Documents', 'Notifications']),
      o('04', 'Automatisation', 'Connectez vos outils existants et supprimez les tâches répétitives qui ralentissent vos équipes.', ['Intégrations', 'Workflows', 'API'])
    ],
    benTitle: 'Un outil adopté est un outil utile.',
    benefits: [
      b('Sur mesure', 'Conçu à partir de vos processus, sans fonctionnalités superflues.'),
      b('Adoption', 'Des interfaces pensées pour vos équipes, simples à prendre en main.'),
      b('Évolutivité', 'Une architecture qui grandit avec votre entreprise.'),
      b('Sécurité', 'Gestion des accès et protection de vos données au cœur de la conception.')
    ],
    methTitle: 'Du besoin métier à l’outil déployé.', steps: COMMON_STEPS, related: [], cta: 'Un processus à digitaliser ?'
  },
  {
    slug: 'referencement-seo-geo', key: 'seo', num: '03', crumb: 'Référencement SEO & GEO', eyebrow: 'Référencement SEO & GEO',
    h1: 'Soyez trouvé sur Google. Soyez cité par les IA.',
    sub: 'Vos clients cherchent sur Google, mais aussi auprès de ChatGPT, Gemini ou Perplexity. Nous optimisons votre visibilité sur ces deux terrains pour capter une demande qualifiée et durable.',
    offersTitle: 'Une visibilité qui se construit dans la durée.', offersSub: 'Le SEO construit un actif durable ; le GEO prépare votre marque aux nouveaux usages de recherche.',
    offers: [
      o('01', 'Audit & stratégie', 'Un état des lieux technique, sémantique et concurrentiel pour prioriser les actions à fort impact.', ['Audit technique', 'Mots-clés', 'Concurrence']),
      o('02', 'SEO technique', 'Vitesse, indexation, structure, données structurées : les fondations indispensables à votre visibilité.', ['Indexation', 'Performance', 'Balisage']),
      o('03', 'Contenus optimisés', 'Des pages et articles qui répondent précisément aux questions de vos clients et aux attentes des moteurs.', ['Rédaction', 'Maillage', 'SEO local']),
      o('04', 'GEO', 'Rendez votre marque visible et citée dans les réponses des IA génératives.', ['ChatGPT', 'Gemini', 'Perplexity'])
    ],
    benTitle: 'Le trafic qui ne s’arrête pas quand le budget s’arrête.',
    benefits: [
      b('Durabilité', 'Contrairement à la publicité, une position acquise continue de générer du trafic.'),
      b('Qualification', 'Vous captez des internautes qui cherchent précisément ce que vous proposez.'),
      b('Anticipation', 'Le GEO positionne votre marque sur les usages de recherche de demain.'),
      b('Mesure', 'Positions, trafic et conversions suivis et partagés avec vous.')
    ],
    methTitle: 'De l’audit à la croissance organique.',
    steps: [s('1', 'Audit', 'État des lieux technique, sémantique et concurrentiel.'), s('2', 'Stratégie', 'Priorisation des mots-clés et des chantiers à fort impact.'), s('3', 'Optimisation', 'Corrections techniques, contenus et maillage interne.'), s('4', 'Suivi', 'Mesure des positions et ajustements continus.')],
    related: [], cta: 'Envie de gagner en visibilité ?'
  },
  {
    slug: 'application-mobile', key: 'mobile', num: '04', crumb: 'Application mobile', eyebrow: 'Application mobile',
    h1: 'Votre marque, dans la poche de vos clients.',
    sub: 'Des applications iOS et Android fluides et intuitives, de la conception UX à la publication sur les stores, pensées pour l’usage réel de vos utilisateurs.',
    offersTitle: 'De la maquette aux stores.', offersSub: 'Une application réussie commence par une expérience utilisateur irréprochable.',
    offers: [
      o('01', 'Conception UX / UI', 'Parcours, maquettes et prototypes interactifs pour valider l’expérience avant le développement.', ['Parcours', 'Maquettes', 'Prototype']),
      o('02', 'Application iOS', 'Une application pensée pour l’écosystème Apple et ses standards d’exigence.', ['iPhone', 'iPad', 'App Store']),
      o('03', 'Application Android', 'Une application performante sur la diversité des appareils Android.', ['Smartphones', 'Tablettes', 'Google Play']),
      o('04', 'Publication & évolutions', 'Mise en ligne sur les stores, suivi et nouvelles fonctionnalités au fil des besoins.', ['Stores', 'Mises à jour', 'Évolutions'])
    ],
    benTitle: 'Une application doit se rendre indispensable.',
    benefits: [
      b('Expérience', 'Des parcours simples et fluides qui donnent envie de revenir.'),
      b('Fidélisation', 'Un canal direct avec vos clients, disponible à tout moment.'),
      b('Performance', 'Une application rapide et stable, quel que soit l’appareil.'),
      b('Évolutivité', 'Une base technique pensée pour accueillir de nouvelles fonctionnalités.')
    ],
    methTitle: 'De l’idée à l’App Store.', steps: COMMON_STEPS, related: [], cta: 'Un projet d’application ?'
  },
  {
    slug: 'marketing-digital-ads', key: 'ads', num: '05', crumb: 'Marketing digital & ADS', eyebrow: 'Marketing digital & ADS',
    h1: 'Chaque euro, chaque dollar investi doit travailler.',
    sub: 'Campagnes et dispositifs d’acquisition conçus pour améliorer la visibilité, structurer la diffusion et soutenir la performance marketing de nos clients, en France, en Europe et au Canada.',
    offersTitle: 'Des campagnes pilotées par la donnée.', offersSub: 'Ciblage, création, diffusion, optimisation : nous prenons en charge toute la chaîne.',
    offers: [
      o('01', 'Stratégie d’acquisition', 'Choix des plateformes, des audiences et des objectifs en fonction de votre marché.', ['Audiences', 'Plateformes', 'Objectifs']),
      o('02', 'Création publicitaire', 'Visuels et messages calibrés pour capter l’attention et déclencher l’action.', ['Visuels', 'Vidéo', 'Messages']),
      o('03', 'Diffusion multi-plateforme', 'Des campagnes orchestrées sur Facebook, Instagram et les plateformes où se trouve votre audience.', ['Facebook', 'Instagram', 'Multi-plateforme']),
      o('04', 'Analyse & optimisation', 'Suivi des KPIs, identification des contenus performants et benchmark concurrentiel.', ['Dashboards', 'KPIs', 'Benchmark'])
    ],
    benTitle: 'Des résultats rapides, mesurés en continu.',
    benefits: [
      b('Rapidité', 'Des campagnes qui génèrent de la visibilité dès leur lancement.'),
      b('Précision', 'Chaque campagne est calibrée pour votre audience cible.'),
      b('Transparence', 'Des dashboards clairs pour suivre la performance de chaque euro ou dollar investi.'),
      b('Optimisation', 'Analyse des posts top-performing et ajustements continus.')
    ],
    methTitle: 'Du ciblage au retour sur investissement.',
    steps: [s('1', 'Analyse', 'Audience, concurrence et objectifs de la campagne.'), s('2', 'Création', 'Visuels et messages adaptés à chaque plateforme.'), s('3', 'Diffusion', 'Lancement et pilotage des campagnes.'), s('4', 'Optimisation', 'Analyse des résultats et ajustements continus.')],
    related: [], cta: 'Prêt à accélérer votre acquisition ?'
  },
  {
    slug: 'social-media', key: 'social', num: '06', crumb: 'Social media & contenus', eyebrow: 'Social media & contenus',
    h1: 'Des contenus qui renforcent votre image et créent l’engagement.',
    sub: 'Contenus, concepts visuels et dispositifs de communication pensés pour renforcer l’image, la présence et l’impact digital de votre marque sur TikTok et Instagram.',
    offersTitle: 'Visuel. Vidéo. Stratégie.', offersSub: 'Nous combinons créativité et analyse d’audience pour des contenus qui performent.',
    offers: [
      o('01', 'Stratégie éditoriale', 'Ligne éditoriale, calendrier et formats adaptés à vos objectifs et à votre audience.', ['Ligne éditoriale', 'Calendrier', 'Formats']),
      o('02', 'Création visuelle', 'Visuels premium et concepts créatifs fidèles à votre identité de marque.', ['Visuels', 'Carrousels', 'Branding']),
      o('03', 'Vidéo courte', 'Des formats courts pensés pour TikTok et Instagram, là où se joue l’attention.', ['TikTok', 'Reels', 'Stories']),
      o('04', 'Analyse d’audience', 'Couverture organique vs payante, performance des contenus, engagement : des insights pour progresser.', ['Rapports', 'Insights', 'Benchmark'])
    ],
    benTitle: 'Exister sur les réseaux, c’est exister tout court.',
    benefits: [
      b('Visibilité', 'Une présence régulière et maîtrisée là où se trouve votre audience.'),
      b('Image', 'Des contenus premium qui valorisent votre marque.'),
      b('Engagement', 'Des formats qui suscitent réactions, partages et conversations.'),
      b('Pilotage', 'Des analyses d’audience pour affiner la stratégie en continu.')
    ],
    methTitle: 'De la stratégie au contenu publié.',
    steps: [s('1', 'Le Choix', 'Définition de vos objectifs et des formats : visuel, vidéo ou les deux.'), s('2', 'Le Brief', 'Vous nous transmettez votre vision et vos assets.'), s('3', 'La Stratégie', 'Nous analysons, créons et optimisons.'), s('4', 'Le Décollage', 'Livraison des contenus prêts à publier.')],
    related: [], cta: 'Envie de faire rayonner votre marque ?'
  }
]

/** Balises SEO des services : titre ciblé (≤ 60 car. avec la marque) et description 120–160 car. */
export const SERVICE_SEO: Record<string, { title: string; h1: string; desc: string }> = {
  'creation-site-web': { title: 'Création de site web : vitrine & e-commerce', h1: 'Création de site web pour les entreprises', desc: 'Création de sites vitrines, e-commerce et landing pages rapides et optimisés pour Google, pour les entreprises en France, en Europe et au Canada. Devis sous 48 h.' },
  'application-metier': { title: 'Développement d’application métier sur mesure', h1: 'Application métier sur mesure', desc: 'Développement d’applications métier sur mesure : CRM, back-office, portail client et automatisations. Équipe basée à Dakar, clients en France et au Canada.' },
  'application-mobile': { title: 'Création d’application mobile iOS & Android', h1: 'Création d’application mobile iOS & Android', desc: 'Conception et développement d’applications mobiles iOS et Android, de la maquette UX à la publication sur les stores. Pour la France, l’Europe et le Canada.' },
  'referencement-seo-geo': { title: 'Agence SEO & GEO : Google et IA génératives', h1: 'Agence SEO & GEO', desc: 'Référencement naturel SEO et GEO : audit, SEO technique, contenus et visibilité dans ChatGPT, Gemini et Perplexity, sur le marché français, belge, suisse ou canadien.' },
  'marketing-digital-ads': { title: 'Agence Google Ads, Meta Ads & TikTok Ads', h1: 'Agence marketing digital & publicité en ligne', desc: 'Campagnes Google Ads, Meta Ads et TikTok Ads pilotées par la donnée, en France, en Europe et au Canada : stratégie, création, diffusion et optimisation continue.' },
  'social-media': { title: 'Agence social media : contenus TikTok & Instagram', h1: 'Agence social media & création de contenus', desc: 'Stratégie social media, création visuelle et vidéos courtes pour TikTok et Instagram : des contenus qui renforcent votre image et créent l’engagement.' }
}


export const SERVICE_FAQ: [string, string][] = [
  ['Combien coûte ce service ?', 'Chaque projet est unique : son budget dépend de la complexité, des technologies et des délais demandés. Après un premier échange, nous vous remettons un devis détaillé, valable 30 jours. Le paiement se fait en deux temps : 50 % à la commande, 50 % à la livraison.'],
  ['Quels sont les délais ?', 'Ils dépendent de la nature et de l’envergure du projet, ainsi que de la transmission de vos contenus. Un planning indicatif, jalonné d’étapes de validation, est établi dès le cadrage.'],
  ['Combien de révisions sont incluses ?', 'Deux cycles de révision sont inclus dans chaque prestation. Les demandes supplémentaires font l’objet d’un complément de devis.'],
  ['Que se passe-t-il après la livraison ?', 'Pour un site, une application ou un agent IA, 12 mois de maintenance technique sont inclus. Un abonnement de suivi peut ensuite prendre le relais. Les créations vous appartiennent dès le paiement intégral.'],
  ['Peut-on combiner plusieurs expertises ?', 'Oui, et c’est souvent là que naît la performance : un site bien référencé, nourri par des campagnes et des contenus cohérents.']
]

/* ---------------- Landing pages locales ---------------- */
export interface LocalPage {
  slug: string; crumbParent: string; crumb: string; eyebrow: string; h1: string; sub: string
  svcTitle: string; whyTitle: string; why: Benefit[]; refTitle: string; refs: string[]
  faq: [string, string][]; cta: string; title: string; description: string
}

// Pages marchés : une équipe à Dakar, des clients en France, en Belgique, en Suisse et au Canada.
// Arguments communs : qualité agence à coût maîtrisé, fuseau horaire proche, équipe francophone, suivi dédié.
export const LOCAL_PAGES: LocalPage[] = [
  {
    slug: 'france', crumbParent: 'Agence digitale', crumb: 'France', eyebrow: 'Agence digitale pour les entreprises françaises',
    title: 'Agence digitale pour les entreprises françaises', description: 'Sites web, applications, SEO & GEO et publicité en ligne pour les PME françaises : une équipe francophone basée à Dakar, à 1 ou 2 h de Paris, à coût maîtrisé.',
    h1: 'L’agence digitale des PME françaises, basée à Dakar.',
    sub: 'Création de sites, applications sur mesure, référencement SEO & GEO et marketing digital : BNS Digital accompagne les entreprises françaises avec les standards d’une agence parisienne et un budget maîtrisé.',
    svcTitle: 'Toutes nos expertises, au service des entreprises françaises.', whyTitle: 'Pourquoi confier votre digital à une équipe basée à Dakar ?',
    why: [
      b('Qualité agence, coût maîtrisé', 'Les mêmes méthodes et exigences qu’une agence européenne, avec une structure de coûts plus légère : votre budget va davantage à la production.'),
      b('Un décalage horaire minime', 'Dakar vit à l’heure GMT : une heure de décalage avec Paris en hiver, deux en été. Vos journées de travail et les nôtres se recouvrent presque entièrement.'),
      b('Une équipe francophone', 'Des échanges fluides en français, des contenus rédigés pour le marché français et une bonne connaissance de ses usages.'),
      b('Un chef de projet dédié', 'Un interlocuteur unique, des points réguliers en visio et un suivi transparent à chaque étape.')
    ],
    refTitle: 'Quelques-unes de nos références', refs: [],
    faq: [
      ['Comment travaillez-vous à distance avec des entreprises françaises ?', 'Tout se fait en visio, par e-mail et sur des outils de suivi partagés. Un chef de projet dédié organise des points réguliers et vous validez chaque étape avant la suite.'],
      ['Quel est le décalage horaire entre Dakar et Paris ?', 'Dakar est à l’heure GMT toute l’année, sans heure d’été : quand il est 9 h à Dakar, il est 10 h à Paris en hiver et 11 h en été. Nos journées de travail se recouvrent largement.'],
      ['Vos sites respectent-ils le RGPD ?', 'Oui. Nous intégrons dès la conception les exigences du RGPD : consentement aux cookies, formulaires, mentions légales et politique de confidentialité.'],
      ['Intervenez-vous partout en France ?', 'Oui. Comme tout se fait à distance, nous accompagnons des entreprises de toutes les régions, de Paris à Lyon, Marseille, Bordeaux ou Lille.']
    ],
    cta: 'Un projet digital en France ?'
  },
  {
    slug: 'paris', crumbParent: 'Agence digitale', crumb: 'Paris', eyebrow: 'Agence web pour les entreprises parisiennes',
    title: 'Agence web pour les entreprises de Paris', description: 'Sites web, applications, SEO & GEO et publicité en ligne pour les entreprises parisiennes et franciliennes, par une équipe basée à Dakar, à 1 h de décalage.',
    h1: 'Les standards d’une agence parisienne, sans le coût d’une agence parisienne.',
    sub: 'Création de sites, applications sur mesure, référencement SEO & GEO et marketing digital : BNS Digital accompagne les entreprises de Paris et d’Île-de-France depuis Dakar, en français et au même rythme que vous.',
    svcTitle: 'Toutes nos expertises, au service des entreprises parisiennes.', whyTitle: 'Pourquoi travailler avec BNS Digital depuis Paris ?',
    why: [
      b('Un budget mieux investi', 'Une structure de coûts plus légère qu’une agence parisienne : à budget égal, davantage de temps consacré à votre projet.'),
      b('Les mêmes horaires, ou presque', 'Une à deux heures de décalage seulement : réunions, validations et ajustements se font dans la journée.'),
      b('Le SEO local parisien', 'Fiche Google, pages locales et données structurées pour être visible sur les recherches géolocalisées à Paris et en Île-de-France.'),
      b('Une équipe complète', 'Six expertises réunies pour mener votre projet de bout en bout, avec un seul interlocuteur.')
    ],
    refTitle: 'Quelques-unes de nos références', refs: [],
    faq: [
      ['Peut-on se rencontrer ?', 'Nos échanges se font en visio, ce qui permet de caler un point rapidement. Réservez un appel découverte de 30 minutes directement en ligne.'],
      ['Travaillez-vous le SEO local pour Paris ?', 'Oui : optimisation de votre fiche Google, pages dédiées à vos zones d’intervention et données structurées pour les recherches du type « votre métier + Paris ».'],
      ['Intervenez-vous dans toute l’Île-de-France ?', 'Oui. Nous accompagnons les entreprises de Paris et de toute l’Île-de-France, et plus largement de toute la France.']
    ],
    cta: 'Un projet digital à Paris ?'
  },
  {
    slug: 'belgique', crumbParent: 'Agence digitale', crumb: 'Belgique', eyebrow: 'Agence digitale pour les entreprises belges',
    title: 'Agence digitale pour les entreprises belges', description: 'Sites web multilingues, applications, SEO & GEO et publicité en ligne pour les entreprises belges : une équipe francophone basée à Dakar, à coût maîtrisé.',
    h1: 'Votre partenaire digital en Belgique, depuis Dakar.',
    sub: 'Sites multilingues, applications sur mesure, référencement et campagnes : BNS Digital accompagne les entreprises de Bruxelles et de Wallonie avec une équipe francophone et un suivi dédié.',
    svcTitle: 'Toutes nos expertises, au service des entreprises belges.', whyTitle: 'Une agence pensée pour le marché belge.',
    why: [
      b('Des sites multilingues', 'Une architecture pensée pour plusieurs langues et des balises hreflang correctes, pour un référencement propre sur chaque version.'),
      b('Une heure de décalage', 'Bruxelles et Dakar ont une à deux heures d’écart : nous travaillons sur les mêmes plages horaires que vous.'),
      b('Qualité agence, coût maîtrisé', 'Les standards d’une agence européenne avec une structure de coûts plus légère.'),
      b('Conformité RGPD', 'Cookies, formulaires et mentions légales conformes au cadre européen dès la conception.')
    ],
    refTitle: 'Quelques-unes de nos références', refs: [],
    faq: [
      ['Pouvez-vous créer un site en français et en néerlandais ?', 'Oui, nous concevons des sites multilingues. Les traductions peuvent être fournies par vos soins ou par un traducteur partenaire ; nous nous chargeons de l’intégration et du référencement de chaque langue.'],
      ['Comment se déroule un projet à distance ?', 'Un chef de projet dédié organise des points réguliers en visio ; vous suivez l’avancement et validez chaque étape.'],
      ['Travaillez-vous aussi au Luxembourg ?', 'Oui, nous accompagnons les entreprises francophones de toute l’Europe.']
    ],
    cta: 'Un projet digital en Belgique ?'
  },
  {
    slug: 'suisse', crumbParent: 'Agence digitale', crumb: 'Suisse', eyebrow: 'Agence digitale pour les entreprises suisses',
    title: 'Agence digitale pour les entreprises suisses', description: 'Sites web, applications, SEO & GEO et publicité en ligne pour les entreprises de Suisse romande : une équipe francophone basée à Dakar, à coût maîtrisé.',
    h1: 'Des projets digitaux à la hauteur des exigences suisses.',
    sub: 'Sites web, applications sur mesure, référencement et campagnes : BNS Digital accompagne les entreprises de Genève, Lausanne et de toute la Suisse romande avec rigueur, en français et à coût maîtrisé.',
    svcTitle: 'Toutes nos expertises, au service des entreprises suisses.', whyTitle: 'Rigueur, réactivité et budget maîtrisé.',
    why: [
      b('Un rapport qualité-prix solide', 'Face aux tarifs pratiqués en Suisse, une équipe basée à Dakar vous apporte les mêmes standards pour un budget plus contenu.'),
      b('Des horaires en commun', 'Une à deux heures de décalage avec Genève et Zurich : vos interlocuteurs sont disponibles pendant vos heures de bureau.'),
      b('Protection des données', 'Nous intégrons les exigences de la nLPD et du RGPD dans la conception de vos sites et applications.'),
      b('Une équipe francophone', 'Des échanges et des contenus en français, avec une version anglaise si votre activité l’exige.')
    ],
    refTitle: 'Quelques-unes de nos références', refs: [],
    faq: [
      ['Travaillez-vous avec toute la Suisse ?', 'Nous travaillons en français et en anglais, avec les entreprises de Suisse romande et celles de toute la Suisse qui communiquent dans ces langues.'],
      ['Vos sites respectent-ils la nLPD ?', 'Oui. Politique de confidentialité, gestion des cookies et formulaires sont conçus pour respecter la nouvelle loi fédérale sur la protection des données et le RGPD.'],
      ['Comment suivez-vous le projet ?', 'Un chef de projet dédié, des points réguliers en visio et des étapes de validation définies dès le cadrage.']
    ],
    cta: 'Un projet digital en Suisse ?'
  },
  {
    slug: 'canada', crumbParent: 'Agence digitale', crumb: 'Canada & Québec', eyebrow: 'Agence digitale pour les entreprises québécoises et canadiennes',
    title: 'Agence digitale pour le Québec et le Canada', description: 'Sites bilingues, applications, SEO & GEO et publicité en ligne pour les entreprises du Québec et du Canada : équipe francophone et anglophone basée à Dakar.',
    h1: 'Votre agence digitale au Québec et au Canada, basée à Dakar.',
    sub: 'Sites bilingues, applications sur mesure, référencement et campagnes : BNS Digital accompagne les entreprises de Montréal, de Québec et de tout le Canada, en français comme en anglais, à coût maîtrisé.',
    svcTitle: 'Toutes nos expertises, au service des entreprises canadiennes.', whyTitle: 'Pourquoi une équipe basée à Dakar pour votre projet canadien ?',
    why: [
      b('Des sites bilingues', 'Français et anglais sur un même site, avec un référencement propre pour chaque langue et la place du français assurée pour le marché québécois.'),
      b('De l’avance sur votre journée', 'Dakar a 4 à 5 heures d’avance sur Montréal : une demande envoyée en fin de journée peut être traitée avant votre réveil, et nos matinées communes servent aux échanges.'),
      b('Qualité agence, coût maîtrisé', 'Les standards d’une agence nord-américaine avec une structure de coûts plus légère.'),
      b('Renseignements personnels', 'Nous intégrons les exigences de la Loi 25 et de la LPRPDE : consentement, politique de confidentialité, formulaires.')
    ],
    refTitle: 'Quelques-unes de nos références', refs: [],
    faq: [
      ['Quel est le décalage horaire avec Montréal ?', 'Dakar est à l’heure GMT toute l’année : il y a 4 heures d’écart avec Montréal et Toronto en été, 5 heures en hiver. Nos appels ont lieu le matin, heure de l’Est.'],
      ['Pouvez-vous créer un site en français et en anglais ?', 'Oui. Nous concevons des sites bilingues français-anglais, avec des URL et des balises hreflang propres à chaque langue.'],
      ['Vos sites respectent-ils la Loi 25 du Québec ?', 'Oui. Consentement aux témoins (cookies), politique de confidentialité et formulaires sont conçus pour répondre à la Loi 25 et à la LPRPDE.'],
      ['Travaillez-vous hors du Québec ?', 'Oui, avec les entreprises de tout le Canada, en français comme en anglais.']
    ],
    cta: 'Un projet digital au Québec ou au Canada ?'
  },
  {
    slug: 'dakar', crumbParent: 'Agence digitale', crumb: 'Dakar', eyebrow: 'Agence digitale à Dakar',
    title: 'Agence digitale à Dakar, Sénégal', description: 'BNS Digital, agence digitale basée à Dakar : sites web, applications, SEO & GEO, publicité et social media pour les entreprises en Europe, au Canada et au Sénégal.',
    h1: 'Une agence digitale à Dakar, tournée vers l’Europe et le Canada.',
    sub: 'Depuis Dakar, BNS Digital conçoit sites web, applications, stratégies de référencement et campagnes pour des entreprises françaises, européennes et canadiennes, comme pour les entreprises sénégalaises.',
    svcTitle: 'Six expertises réunies à Dakar.', whyTitle: 'Pourquoi Dakar ?',
    why: [
      b('Un hub digital francophone', 'Dakar réunit des talents du web, du design et du marketing digital qui travaillent en français et en anglais.'),
      b('Au centre des fuseaux', 'À l’heure GMT, Dakar est à une ou deux heures de l’Europe et à quatre ou cinq heures de l’Est du Canada.'),
      b('Qualité agence, coût maîtrisé', 'Des méthodes d’agence internationale avec une structure de coûts plus légère.'),
      b('Un suivi dédié', 'Un chef de projet unique, des points réguliers en visio et une communication transparente.')
    ],
    refTitle: 'Quelques-unes de nos références', refs: [],
    faq: [
      ['Accompagnez-vous aussi les entreprises sénégalaises ?', 'Oui. Nous accompagnons les entreprises de Dakar et du Sénégal, en plus de nos clients européens et canadiens.'],
      ['Peut-on vous rencontrer à Dakar ?', 'Oui, sur rendez-vous. Écrivez-nous à contact@bns-digital.com pour convenir d’un créneau.'],
      ['Dans quelles langues travaillez-vous ?', 'En français et en anglais, à l’écrit comme à l’oral.']
    ],
    cta: 'Un projet digital ?'
  }
]
