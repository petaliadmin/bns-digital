// Textes de la page d'accueil (FR / EN) — l'anglais a exactement la même forme que le français.
type Cell = [string, string]
type WorkItem = { client: string; sector: string; title: string; metric: string }

const fr = {
  seo: { title: 'Agence digitale pour la France et le Canada', desc: 'Sites web, applications, SEO et publicité à prix abordables, livrés vite grâce à l’IA : agence basée à Dakar pour les PME en France, en Europe et au Canada.' },
  topbar: ['Prix abordables', 'Projets livrés vite grâce à l’IA', 'Devis gratuit sous 48 h'],
  hero: {
    badge: 'Agence digitale à Dakar pour la France, l’Europe et le Canada', title: 'Des projets digitaux abordables, livrés vite.',
    lead: 'Site web, application sur mesure, référencement, publicité en ligne : notre équipe basée à Dakar travaille avec les meilleurs outils d’IA pour livrer des projets de qualité plus vite, à des prix accessibles aux PME.',
    cta: 'Demander un devis gratuit', cta2: 'Voir nos réalisations', cta2Call: 'Réserver un appel', trust: ['Prix abordables', 'Équipe augmentée par l’IA', 'Réponse sous 48 h']
  },
  services: {
    eyebrow: 'Nos services', h2: 'Tout ce qu’il faut pour exister et vendre en ligne.', p: 'Choisissez un service ou combinez-les. Chaque projet est piloté par un chef de projet unique, du brief au lancement.',
    items: [
      { num: '01', slug: 'creation-site-web', tag: 'Le plus demandé', title: 'Création de site web', desc: 'Des sites rapides, beaux et pensés pour convertir vos visiteurs en clients.', items: ['Site vitrine', 'E-commerce', 'Landing page', 'Blog'], cta: 'Découvrir', theme: 'dark' },
      { num: '02', slug: 'application-metier', tag: 'Sur mesure', title: 'Application métier', desc: 'Automatisez vos process avec un outil taillé pour votre activité : CRM, back-office, portail client.', items: ['CRM', 'Back-office', 'Portail client', 'SaaS'], cta: 'Découvrir', theme: 'light' },
      { num: '03', slug: 'referencement-seo-geo', tag: 'Google + IA', title: 'Référencement SEO & GEO', desc: 'Soyez trouvé sur Google et cité par ChatGPT, Gemini et Perplexity.', items: ['Audit SEO', 'SEO local', 'Contenu', 'GEO / IA'], cta: 'Découvrir', theme: 'light' },
      { num: '04', slug: 'application-mobile', tag: 'iOS & Android', title: 'Application mobile', desc: 'Des apps natives ou cross-platform, de la maquette à la publication sur les stores.', items: ['iOS', 'Android', 'Flutter', 'React Native'], cta: 'Découvrir', theme: 'light' },
      { num: '05', slug: 'marketing-digital-ads', tag: 'Acquisition', title: 'Marketing digital & ADS', desc: 'Des campagnes rentables sur Google, Meta et TikTok, pilotées par la donnée.', items: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Social media'], cta: 'Découvrir', theme: 'light' },
      { num: '?', slug: '', tag: 'Gratuit', title: 'Pas sûr de ce qu’il vous faut ?', desc: 'On analyse votre présence en ligne et on vous dit exactement par où commencer.', items: ['Audit offert', '30 min', 'Sans engagement'], cta: 'Demander mon audit', theme: 'soft' }
    ]
  },
  dakar: {
    eyebrow: 'Pourquoi BNS Digital', h2: 'Une équipe à Dakar. Des clients en France, en Europe et au Canada.',
    p: 'Des prix abordables, des délais courts grâce à l’IA, et une équipe qui parle votre langue à vos horaires : c’est ce que nous apportons aux entreprises françaises, belges, suisses et canadiennes.',
    items: [
      { t: 'Des prix abordables', d: 'Les standards d’une agence européenne à des tarifs accessibles aux PME et TPE : une structure légère à Dakar et une production accélérée par l’IA.' },
      { t: 'Livré plus vite grâce à l’IA', d: 'Nos équipes utilisent l’IA pour le design, le code, les contenus et les tests : moins de tâches répétitives, des délais raccourcis et plus de temps pour la qualité.' },
      { t: 'Un fuseau horaire proche', d: 'Dakar vit à l’heure GMT : 1 à 2 h de décalage avec Paris, Bruxelles ou Genève, et une matinée de travail en commun avec l’Est canadien.' },
      { t: 'Une équipe francophone', d: 'Des échanges fluides en français, et en anglais pour vos marchés anglophones. Pas d’intermédiaire, pas de perte d’information.' },
    ],
    clocksLabel: 'Heure actuelle', markets: 'Nos marchés',
    clocks: [
      { city: 'Dakar', tz: 'Africa/Dakar', note: 'GMT · notre équipe' },
      { city: 'Paris · Bruxelles · Genève', tz: 'Europe/Paris', note: '+1 h en hiver, +2 h en été' },
      { city: 'Montréal · Toronto', tz: 'America/Toronto', note: '−5 h en hiver, −4 h en été' }
    ]
  },
  method: {
    eyebrow: 'Comment ça marche', h2: 'Simple, rapide, transparent.', p: 'Pas de jargon, pas de réunion inutile. Un process en 4 étapes, accéléré par l’IA et entièrement à distance : vous validez tout avant la mise en ligne.',
    steps: [
      { n: '1', time: 'Jour 1', title: 'Le brief', desc: 'Un appel de 30 min en visio pour comprendre votre activité, vos objectifs et votre budget.' },
      { n: '2', time: 'Sous 48 h', title: 'La proposition', desc: 'Un devis clair, un planning et une maquette de principe. Vous validez, on démarre.' },
      { n: '3', time: 'Production', title: 'La création', desc: 'Design, développement ou campagne, accélérés par l’IA : vous suivez l’avancement et validez chaque étape.' },
      { n: '4', time: 'Lancement', title: 'La croissance', desc: 'Mise en ligne, suivi des résultats et optimisation continue. On reste à vos côtés.' }
    ]
  },
  work: {
    eyebrow: 'Réalisations', h2a: 'Des projets concrets,', h2b: 'des résultats mesurés.', filterLabel: 'Filtrer les réalisations', alt: 'Réalisation', more: 'Voir le cas', all: 'Voir toutes les réalisations',
    allLabel: 'Tous',
    // Textes courts des réalisations mises en avant (clé = slug du projet dans content.ts)
    items: {} as Record<string, WorkItem>
  },
  compare: {
    eyebrow: 'Le comparatif', h2: 'La qualité d’une agence, des prix abordables, des délais raccourcis par l’IA.',
    caption: 'Comparatif BNS Digital, freelance, agence classique et recrutement interne', cols: ['Freelance', 'Agence classique', 'Recrutement interne'], yes: 'Oui', no: 'Non', hint: 'Faites glisser le tableau pour comparer',
    rows: [
      { label: 'Tous les services digitaux au même endroit', cells: [['y', ''], ['n', ''], ['y', ''], ['n', 'Plusieurs profils']] as Cell[] },
      { label: 'Interlocuteur unique et dédié', cells: [['y', ''], ['y', ''], ['n', 'Commercial + équipe'], ['y', '']] as Cell[] },
      { label: 'Délai de démarrage', cells: [['y', 'Sous 1 semaine'], ['-', 'Variable'], ['n', '3 à 6 semaines'], ['n', '2 à 3 mois']] as Cell[] },
      { label: 'Continuité si absence', cells: [['y', 'Équipe'], ['n', ''], ['y', ''], ['n', '']] as Cell[] },
      { label: 'Prix abordables', cells: [['y', 'Tarifs adaptés aux PME'], ['y', ''], ['n', 'Élevé'], ['n', 'Salaire + charges']] as Cell[] },
      { label: 'Production accélérée par l’IA', cells: [['y', 'Design, code, contenus'], ['-', 'Variable'], ['-', 'Variable'], ['-', 'Variable']] as Cell[] },
      { label: 'Vous restez propriétaire de tout', cells: [['y', ''], ['-', 'Selon contrat'], ['-', 'Selon contrat'], ['y', '']] as Cell[] }
    ]
  },
  reviews: { eyebrow: 'Avis clients', h2: 'Ils en parlent mieux que nous.', stars: 'étoiles sur 5', count: 'avis Google', see: 'Voir la fiche' },
  booking: {
    eyebrow: 'Réserver un appel', h2: 'Parlons de votre projet, en 30 minutes.',
    lead: 'Choisissez un créneau qui vous convient : les horaires s’affichent dans votre fuseau. Nous faisons le point sur vos objectifs et vous repartez avec des premières recommandations concrètes.',
    facts: [
      { t: '30 minutes', d: ' pour comprendre votre activité et vos priorités' },
      { t: 'Du lundi au samedi', d: ', de 9 h à 18 h à Dakar (à partir de 10 h ou 11 h à Paris, le matin à Montréal)' },
      { t: 'Visio (kMeet) ou téléphone', d: ', selon votre préférence' },
      { t: 'Gratuit et sans engagement', d: ', devis sous 48 h si besoin' }
    ]
  },
  faq: {
    h2: 'Vos questions, nos réponses.', p: 'Une autre question ? Écrivez-nous, on répond sous 24 h ouvrées.', cta: 'Poser une question',
    items: [
      ['Pourquoi vos prix sont-ils plus abordables ?', 'Pour deux raisons : une équipe basée à Dakar, avec des coûts de structure plus légers qu’en Europe ou au Canada, et une production accélérée par l’IA. Vous payez le travail utile, sans renoncer à la qualité.'],
      ['Comment l’IA accélère-t-elle vos projets ?', 'Nos équipes utilisent des outils d’IA à chaque étape : maquettes et variantes de design, écriture et relecture du code, rédaction et traduction des contenus, tests. L’IA prend en charge les tâches répétitives ; nos experts gardent la main sur la stratégie, la qualité et la validation. Résultat : des délais plus courts.'],
      ['Comment travaillez-vous depuis Dakar avec des entreprises françaises et canadiennes ?', 'Entièrement à distance : appels en visio, échanges par e-mail et outils de suivi partagés. Un chef de projet dédié organise des points réguliers et vous validez chaque étape avant la suite.'],
      ['Quel est le décalage horaire ?', 'Dakar est à l’heure GMT toute l’année. Il y a 1 h de décalage avec Paris, Bruxelles et Genève en hiver, 2 h en été ; et 4 à 5 h d’avance sur Montréal et Toronto. Nos appels ont lieu entre 9 h et 18 h, heure de Dakar.'],
      ['Combien coûte un site internet ?', 'Chaque projet est différent : nous établissons un devis gratuit et détaillé sous 48 h, après un appel pour comprendre vos besoins. Aucun frais caché, et le devis reste valable 30 jours.'],
      ['Comment se passe le paiement ?', '50 % à la commande, 50 % à la livraison, par virement ou carte bancaire. Les conditions précises figurent toujours dans votre devis.'],
      ['En combien de temps mon site sera-t-il en ligne ?', 'Cela dépend de la complexité du projet et de la transmission de vos contenus. Un planning indicatif, jalonné d’étapes de validation, figure dans votre devis, et nous vous tenons informé de l’avancement.'],
      ['Combien de modifications sont incluses ?', 'Chaque prestation comprend deux cycles de révision. Au-delà, les modifications font l’objet d’un complément de devis.'],
      ['Qu’est-ce que le GEO ?', 'Le Generative Engine Optimization consiste à optimiser votre contenu pour être cité par les IA comme ChatGPT, Gemini ou Perplexity, en complément du SEO classique.'],
      ['Suis-je propriétaire de mon site et de mes comptes publicitaires ?', 'Oui. Les créations vous appartiennent dès le paiement intégral, et le nom de domaine, les contenus et les comptes ADS sont à votre nom.'],
      ['Proposez-vous un suivi après la mise en ligne ?', 'Oui. 12 mois de maintenance technique sont inclus pour chaque site, e-commerce, application ou agent IA. Ensuite, un abonnement optionnel couvre les mises à jour de sécurité, le suivi des performances et l’optimisation SEO ou ADS.']
    ] as [string, string][]
  },
  final: {
    h2: 'Parlons de votre projet.', p: '30 minutes pour comprendre vos besoins et vous proposer la bonne solution. Sans jargon, sans pression, sans engagement.',
    list: ['Des prix abordables, sans frais cachés', 'Des délais courts grâce à l’IA', 'Devis détaillé et gratuit sous 48 h', 'Un chef de projet dédié du début à la fin'], call: 'Ou réserver un appel directement'
  },
  form: {
    name: 'Nom', namePh: 'Jean Dupont', company: 'Entreprise', companyPh: 'Votre société', email: 'E-mail professionnel', emailPh: 'vous@entreprise.fr',
    need: 'Votre besoin', needs: ['Site web', 'Application', 'SEO / GEO', 'App mobile', 'Publicité'], msg: 'Votre projet en quelques mots', msgPh: 'Objectifs, délais, budget indicatif…',
    submit: 'Recevoir mon devis gratuit', sending: 'Envoi…', sent: 'Merci, demande envoyée', note: 'Vos données restent confidentielles. Réponse sous 48 h ouvrées.'
  },
  footer: { desc: 'Agence digitale basée à Dakar : sites web, applications, SEO & GEO et publicité en ligne à prix abordables, livrés vite grâce à l’IA, pour la France, l’Europe et le Canada.', local: 'Nos marchés :', legal: 'Mentions légales', privacy: 'Confidentialité', terms: 'CGV' }
}

const en: typeof fr = {
  seo: { title: 'Digital agency for Canada, France & Europe', desc: 'Websites, software, SEO and paid ads at affordable prices, delivered fast thanks to AI: a Dakar-based agency for SMEs in Canada, France and Europe.' },
  topbar: ['Affordable prices', 'Fast, AI-powered delivery', 'Free quote within 48 hours'],
  hero: {
    badge: 'Dakar-based digital agency for Canada, France and Europe', title: 'Affordable digital projects, delivered fast.',
    lead: 'Websites, custom software, SEO, paid ads: our Dakar-based team works with the best AI tools to deliver quality projects faster, at prices small businesses can afford.',
    cta: 'Get a free quote', cta2: 'See our work', cta2Call: 'Book a call', trust: ['Affordable prices', 'AI-powered team', 'Reply within 48 hours']
  },
  services: {
    eyebrow: 'Our services', h2: 'Everything you need to exist and sell online.', p: 'Choose one service or combine them. Every project is run by a single project manager, from brief to launch.',
    items: [
      { num: '01', slug: 'creation-site-web', tag: 'Most popular', title: 'Website design', desc: 'Fast, beautiful websites designed to turn your visitors into customers.', items: ['Showcase site', 'E-commerce', 'Landing page', 'Blog'], cta: 'Discover', theme: 'dark' },
      { num: '02', slug: 'application-metier', tag: 'Tailor-made', title: 'Business software', desc: 'Automate your processes with a tool built for your business: CRM, back office, client portal.', items: ['CRM', 'Back office', 'Client portal', 'SaaS'], cta: 'Discover', theme: 'light' },
      { num: '03', slug: 'referencement-seo-geo', tag: 'Google + AI', title: 'SEO & GEO', desc: 'Get found on Google and cited by ChatGPT, Gemini and Perplexity.', items: ['SEO audit', 'Local SEO', 'Content', 'GEO / AI'], cta: 'Discover', theme: 'light' },
      { num: '04', slug: 'application-mobile', tag: 'iOS & Android', title: 'Mobile apps', desc: 'Native or cross-platform apps, from mock-up to App Store release.', items: ['iOS', 'Android', 'Flutter', 'React Native'], cta: 'Discover', theme: 'light' },
      { num: '05', slug: 'marketing-digital-ads', tag: 'Acquisition', title: 'Digital marketing & ads', desc: 'Profitable, data-driven campaigns on Google, Meta and TikTok.', items: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Social media'], cta: 'Discover', theme: 'light' },
      { num: '?', slug: '', tag: 'Free', title: 'Not sure what you need?', desc: 'We review your online presence and tell you exactly where to start.', items: ['Free audit', '30 min', 'No commitment'], cta: 'Request my audit', theme: 'soft' }
    ]
  },
  dakar: {
    eyebrow: 'Why BNS Digital', h2: 'A team in Dakar. Clients in Canada, France and Europe.',
    p: 'Affordable prices, short timelines thanks to AI, and a team that speaks your language during your hours: that’s what we bring to Canadian, French, Belgian and Swiss companies.',
    items: [
      { t: 'Affordable prices', d: 'Agency standards at prices small businesses can afford: a lean team in Dakar and AI-accelerated production.' },
      { t: 'Delivered faster with AI', d: 'Our team uses AI for design, code, content and testing: fewer repetitive tasks, shorter timelines and more time for quality.' },
      { t: 'A convenient time zone', d: 'Dakar runs on GMT: 1 to 2 hours from Paris, Brussels or Geneva, and a shared working morning with Eastern Canada.' },
      { t: 'A bilingual team', d: 'Smooth communication in English and French. No middleman, nothing lost in translation.' },
    ],
    clocksLabel: 'Current time', markets: 'Our markets',
    clocks: [
      { city: 'Dakar', tz: 'Africa/Dakar', note: 'GMT · our team' },
      { city: 'Paris · Brussels · Geneva', tz: 'Europe/Paris', note: '+1 h in winter, +2 h in summer' },
      { city: 'Montreal · Toronto', tz: 'America/Toronto', note: '−5 h in winter, −4 h in summer' }
    ]
  },
  method: {
    eyebrow: 'How it works', h2: 'Simple, fast, transparent.', p: 'No jargon, no pointless meetings. A 4-step, AI-accelerated, fully remote process: you sign off on everything before go-live.',
    steps: [
      { n: '1', time: 'Day 1', title: 'The brief', desc: 'A 30-minute video call to understand your business, goals and budget.' },
      { n: '2', time: 'Within 48 h', title: 'The proposal', desc: 'A clear quote, a schedule and an initial mock-up. You approve, we start.' },
      { n: '3', time: 'Production', title: 'The build', desc: 'Design, development or campaign, accelerated by AI: you follow progress and approve each step.' },
      { n: '4', time: 'Launch', title: 'Growth', desc: 'Go-live, results tracking and continuous optimisation. We stay by your side.' }
    ]
  },
  work: {
    eyebrow: 'Our work', h2a: 'Real projects,', h2b: 'measurable results.', filterLabel: 'Filter projects', alt: 'Project for', more: 'View project', all: 'See all our work',
    allLabel: 'All',
    items: {}
  },
  compare: {
    eyebrow: 'How we compare', h2: 'Agency quality, affordable prices, timelines cut short by AI.',
    caption: 'Comparison of BNS Digital, freelancers, traditional agencies and in-house hiring', cols: ['Freelancer', 'Traditional agency', 'In-house hire'], yes: 'Yes', no: 'No', hint: 'Swipe the table to compare',
    rows: [
      { label: 'All digital services in one place', cells: [['y', ''], ['n', ''], ['y', ''], ['n', 'Several profiles']] },
      { label: 'Single, dedicated contact', cells: [['y', ''], ['y', ''], ['n', 'Sales rep + team'], ['y', '']] },
      { label: 'Time to start', cells: [['y', 'Within 1 week'], ['-', 'Varies'], ['n', '3 to 6 weeks'], ['n', '2 to 3 months']] },
      { label: 'Continuity during absences', cells: [['y', 'Team'], ['n', ''], ['y', ''], ['n', '']] },
      { label: 'Affordable prices', cells: [['y', 'SME-friendly rates'], ['y', ''], ['n', 'High'], ['n', 'Salary + overheads']] },
      { label: 'AI-accelerated production', cells: [['y', 'Design, code, content'], ['-', 'Varies'], ['-', 'Varies'], ['-', 'Varies']] },
      { label: 'You own everything', cells: [['y', ''], ['-', 'Depends on contract'], ['-', 'Depends on contract'], ['y', '']] }
    ]
  },
  reviews: { eyebrow: 'Client reviews', h2: 'They say it better than we do.', stars: 'stars out of 5', count: 'Google reviews', see: 'See our profile' },
  booking: {
    eyebrow: 'Book a call', h2: 'Let’s talk about your project in 30 minutes.',
    lead: 'Pick a time that suits you — slots are shown in your own time zone. We’ll review your goals together and you’ll leave with first concrete recommendations.',
    facts: [
      { t: '30 minutes', d: ' to understand your business and priorities' },
      { t: 'Monday to Saturday', d: ', 9 am to 6 pm Dakar time (mornings in Toronto and Montreal)' },
      { t: 'Video (kMeet) or phone', d: ', whichever you prefer' },
      { t: 'Free, no commitment', d: ', quote within 48 hours if needed' }
    ]
  },
  faq: {
    h2: 'Your questions, answered.', p: 'Another question? Write to us — we reply within one business day.', cta: 'Ask a question',
    items: [
      ['Why are your prices more affordable?', 'Two reasons: a team based in Dakar, with lower overheads than in Europe or Canada, and AI-accelerated production. You pay for useful work, without compromising on quality.'],
      ['How does AI speed up your projects?', 'Our team uses AI tools at every stage: design mock-ups and variants, writing and reviewing code, drafting and translating content, testing. AI handles the repetitive tasks; our experts stay in charge of strategy, quality and sign-off. The result: shorter timelines.'],
      ['How do you work from Dakar with Canadian and European companies?', 'Fully remotely: video calls, email and shared tracking tools. A dedicated project manager runs regular check-ins and you approve each stage before we move on.'],
      ['What is the time difference?', 'Dakar is on GMT all year round. It is 4 to 5 hours ahead of Toronto and Montreal, and 1 to 2 hours behind Paris, Brussels and Geneva. Our calls take place between 9 am and 6 pm Dakar time.'],
      ['How much does a website cost?', 'Every project is different: after a call to understand your needs, we send a free, detailed quote within 48 hours. No hidden fees, and the quote remains valid for 30 days.'],
      ['How does payment work?', '50% on order and 50% on delivery, by bank transfer or card. The exact terms are always set out in your quote.'],
      ['How long until my website is live?', 'It depends on the project’s complexity and when we receive your content. An indicative schedule with sign-off milestones is included in your quote, and we keep you updated on progress.'],
      ['How many revisions are included?', 'Every service includes two revision cycles. Further changes are covered by an additional quote.'],
      ['What is GEO?', 'Generative Engine Optimization means optimising your content so that AI tools such as ChatGPT, Gemini and Perplexity cite it, alongside traditional SEO.'],
      ['Do I own my website and ad accounts?', 'Yes. You own the deliverables once they are paid in full, and your domain name, content and ad accounts are in your name.'],
      ['Do you offer support after launch?', 'Yes. 12 months of technical maintenance are included for every website, online store, app or AI agent. After that, an optional subscription covers security updates, performance monitoring and SEO or ads optimisation.']
    ]
  },
  final: {
    h2: 'Let’s talk about your project.', p: '30 minutes to understand your needs and suggest the right solution. No jargon, no pressure, no commitment.',
    list: ['Affordable prices, no hidden fees', 'Short timelines thanks to AI', 'Free, detailed quote within 48 hours', 'A dedicated project manager from start to finish'], call: 'Or book a call directly'
  },
  form: {
    name: 'Name', namePh: 'Jane Smith', company: 'Company', companyPh: 'Your company', email: 'Business email', emailPh: 'you@company.com',
    need: 'What you need', needs: ['Website', 'Software', 'SEO / GEO', 'Mobile app', 'Paid ads'], msg: 'Your project in a few words', msgPh: 'Goals, timeline, indicative budget…',
    submit: 'Get my free quote', sending: 'Sending…', sent: 'Thank you, request sent', note: 'Your data stays confidential. Reply within 48 business hours.'
  },
  footer: { desc: 'Dakar-based digital agency: websites, software, SEO & GEO and paid ads at affordable prices, delivered fast with AI, for Canada, France and Europe.', local: 'Our markets:', legal: 'Legal notice', privacy: 'Privacy', terms: 'Terms' }
}

export const HOME = { fr, en }
