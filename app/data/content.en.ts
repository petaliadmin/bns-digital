// English content — same shapes as content.ts (French is the source of truth for structure, slugs and media).
import type { Benefit, CatInfo, LocalPage, Offer, ProjectCat, Service, Step } from './content'

const o = (n: string, t: string, d: string, tags: string[]): Offer => ({ n, t, d, tags })
const s = (n: string, t: string, d: string): Step => ({ n, t, d })
const b = (t: string, d: string): Benefit => ({ t, d })

/** English URL slugs, keyed by French slug */
export const SERVICE_SLUG_EN: Record<string, string> = {
  'creation-site-web': 'website-design',
  'application-metier': 'custom-business-software',
  'application-mobile': 'mobile-app-development',
  'referencement-seo-geo': 'seo-geo',
  'marketing-digital-ads': 'digital-marketing-ads',
  'social-media': 'social-media'
}
export const LOCAL_SLUG_EN: Record<string, string> = { france: 'france', paris: 'paris', belgique: 'belgium', suisse: 'switzerland', canada: 'canada', dakar: 'dakar' }

const COMMON_STEPS = [
  s('1', 'Scoping', 'We analyse your market, competitors and goals to set clear priorities.'),
  s('2', 'Design', 'User journeys, mock-ups, action plan: you sign off before anything is built.'),
  s('3', 'Production', 'Our team delivers to a high standard and involves you at every milestone.'),
  s('4', 'Launch & follow-up', 'Go-live, performance tracking and continuous optimisation.')
]

/** Service texts, keyed by French slug (slug, key, num and related projects come from content.ts) */
export const SERVICES_EN: Record<string, Omit<Service, 'slug' | 'key' | 'num' | 'related'>> = {
  'creation-site-web': {
    crumb: 'Website design', eyebrow: 'Website design',
    h1: 'Websites that work for your growth.',
    sub: 'Showcase sites, blogs, landing pages or online stores: we build fast, elegant websites designed to convert, from the first screen to the enquiry or the sale.',
    offersTitle: 'The right format for every ambition.', offersSub: 'Every website is a tailored answer to our clients’ business goals.',
    offers: [
      o('01', 'Showcase website', 'Present your company, expertise and references with a website that builds trust from the very first visit.', ['Brand identity', 'Service pages', 'Contact form']),
      o('02', 'Blog', 'Publish expert content that feeds your SEO and establishes your authority in your market.', ['Editorial strategy', 'SEO', 'Categories']),
      o('03', 'Landing page', 'One page, one goal: turn your campaign traffic into quote requests or sign-ups.', ['Ad campaigns', 'Conversion', 'A/B testing']),
      o('04', 'E-commerce', 'An online store built to sell: polished product pages, a smooth checkout and secure payment.', ['Catalogue', 'Payments', 'Checkout'])
    ],
    benTitle: 'A website isn’t a shop window. It’s a sales tool.',
    benefits: [
      b('Performance', 'Light, fast pages — because a visitor who waits is a visitor who leaves.'),
      b('Conversion', 'Every section is designed to guide visitors towards action: contact, quote or purchase.'),
      b('Built-in SEO', 'Structure, markup and content optimised from day one, not after launch.'),
      b('Brand consistency', 'A design true to your identity, applied rigorously across every screen.')
    ],
    methTitle: 'From idea to launch.', steps: COMMON_STEPS, cta: 'A website to build or redesign?'
  },
  'application-metier': {
    crumb: 'Custom business software', eyebrow: 'Custom business software',
    h1: 'Your processes, finally as good as your business.',
    sub: 'We design business tools tailored to your teams: fewer manual tasks, fewer scattered files and more time for your core business.',
    offersTitle: 'Tools designed around your teams.', offersSub: 'Every application starts from how you actually work, not from off-the-shelf software you have to adapt to.',
    offers: [
      o('01', 'Custom CRM', 'Centralise your contacts, opportunities and sales follow-up in a tool that fits the way you work.', ['Pipeline', 'Reminders', 'Dashboards']),
      o('02', 'Back office', 'Run your operations, stock or orders from a clear, secure interface.', ['Management', 'Access rights', 'Exports']),
      o('03', 'Client portal', 'Give your clients a dedicated space to follow their files, documents and conversations.', ['Secure area', 'Documents', 'Notifications']),
      o('04', 'Automation', 'Connect your existing tools and remove the repetitive tasks that slow your teams down.', ['Integrations', 'Workflows', 'API'])
    ],
    benTitle: 'A tool people use is a tool that pays off.',
    benefits: [
      b('Tailor-made', 'Built from your processes, with no unnecessary features.'),
      b('Adoption', 'Interfaces designed for your teams and easy to pick up.'),
      b('Scalability', 'An architecture that grows with your company.'),
      b('Security', 'Access management and data protection at the heart of the design.')
    ],
    methTitle: 'From business need to deployed tool.', steps: COMMON_STEPS, cta: 'A process to digitise?'
  },
  'referencement-seo-geo': {
    crumb: 'SEO & GEO', eyebrow: 'SEO & GEO',
    h1: 'Get found on Google. Get cited by AI.',
    sub: 'Your customers search on Google, but also ask ChatGPT, Gemini or Perplexity. We optimise your visibility on both fronts to capture qualified, lasting demand.',
    offersTitle: 'Visibility that builds over time.', offersSub: 'SEO builds a lasting asset; GEO prepares your brand for new ways of searching.',
    offers: [
      o('01', 'Audit & strategy', 'A technical, semantic and competitive review to prioritise high-impact actions.', ['Technical audit', 'Keywords', 'Competition']),
      o('02', 'Technical SEO', 'Speed, indexing, structure, structured data: the essential foundations of your visibility.', ['Indexing', 'Performance', 'Markup']),
      o('03', 'Optimised content', 'Pages and articles that precisely answer your customers’ questions and search engines’ expectations.', ['Copywriting', 'Internal linking', 'Local SEO']),
      o('04', 'GEO', 'Make your brand visible and cited in the answers of generative AI.', ['ChatGPT', 'Gemini', 'Perplexity'])
    ],
    benTitle: 'Traffic that doesn’t stop when the budget does.',
    benefits: [
      b('Longevity', 'Unlike advertising, a ranking you earn keeps generating traffic.'),
      b('Qualified leads', 'You capture people searching for exactly what you offer.'),
      b('Future-proofing', 'GEO positions your brand for tomorrow’s search habits.'),
      b('Measurement', 'Rankings, traffic and conversions tracked and shared with you.')
    ],
    methTitle: 'From audit to organic growth.',
    steps: [s('1', 'Audit', 'Technical, semantic and competitive review.'), s('2', 'Strategy', 'Prioritised keywords and high-impact workstreams.'), s('3', 'Optimisation', 'Technical fixes, content and internal linking.'), s('4', 'Tracking', 'Ranking monitoring and continuous adjustments.')],
    cta: 'Ready to become more visible?'
  },
  'application-mobile': {
    crumb: 'Mobile app development', eyebrow: 'Mobile app development',
    h1: 'Your brand, in your customers’ pocket.',
    sub: 'Smooth, intuitive iOS and Android apps — from UX design to store publication — built around how your users really behave.',
    offersTitle: 'From mock-up to the app stores.', offersSub: 'A successful app starts with a flawless user experience.',
    offers: [
      o('01', 'UX / UI design', 'User journeys, mock-ups and interactive prototypes to validate the experience before development.', ['Journeys', 'Mock-ups', 'Prototype']),
      o('02', 'iOS app', 'An app designed for the Apple ecosystem and its high standards.', ['iPhone', 'iPad', 'App Store']),
      o('03', 'Android app', 'An app that performs across the wide range of Android devices.', ['Smartphones', 'Tablets', 'Google Play']),
      o('04', 'Publication & updates', 'Store release, monitoring and new features as your needs evolve.', ['Stores', 'Updates', 'New features'])
    ],
    benTitle: 'An app has to become indispensable.',
    benefits: [
      b('Experience', 'Simple, smooth journeys that make people come back.'),
      b('Loyalty', 'A direct channel to your customers, available at any time.'),
      b('Performance', 'A fast, stable app on every device.'),
      b('Scalability', 'A technical foundation ready for new features.')
    ],
    methTitle: 'From idea to the App Store.', steps: COMMON_STEPS, cta: 'Planning an app?'
  },
  'marketing-digital-ads': {
    crumb: 'Digital marketing & ads', eyebrow: 'Digital marketing & ads',
    h1: 'Every dollar and every euro invested has to work.',
    sub: 'Campaigns and acquisition set-ups designed to increase visibility, structure distribution and drive our clients’ marketing performance in Canada, France and across Europe.',
    offersTitle: 'Data-driven campaigns.', offersSub: 'Targeting, creative, distribution, optimisation: we handle the whole chain.',
    offers: [
      o('01', 'Acquisition strategy', 'The right platforms, audiences and objectives for your market.', ['Audiences', 'Platforms', 'Objectives']),
      o('02', 'Ad creative', 'Visuals and messages crafted to grab attention and trigger action.', ['Visuals', 'Video', 'Messaging']),
      o('03', 'Multi-platform delivery', 'Campaigns orchestrated on Facebook, Instagram and wherever your audience spends its time.', ['Facebook', 'Instagram', 'Multi-platform']),
      o('04', 'Analysis & optimisation', 'KPI tracking, top-performing content identification and competitive benchmarking.', ['Dashboards', 'KPIs', 'Benchmark'])
    ],
    benTitle: 'Fast results, measured continuously.',
    benefits: [
      b('Speed', 'Campaigns that generate visibility from day one.'),
      b('Precision', 'Every campaign is calibrated for your target audience.'),
      b('Transparency', 'Clear dashboards to track the performance of every dollar or euro invested.'),
      b('Optimisation', 'Analysis of top-performing posts and continuous adjustments.')
    ],
    methTitle: 'From targeting to return on investment.',
    steps: [s('1', 'Analysis', 'Audience, competition and campaign objectives.'), s('2', 'Creative', 'Visuals and messages tailored to each platform.'), s('3', 'Delivery', 'Campaign launch and management.'), s('4', 'Optimisation', 'Results analysis and continuous adjustments.')],
    cta: 'Ready to accelerate your growth?'
  },
  'social-media': {
    crumb: 'Social media & content', eyebrow: 'Social media & content',
    h1: 'Content that strengthens your brand and drives engagement.',
    sub: 'Content, visual concepts and communication set-ups designed to strengthen your brand’s image, presence and digital impact on TikTok and Instagram.',
    offersTitle: 'Visuals. Video. Strategy.', offersSub: 'We combine creativity and audience analysis to produce content that performs.',
    offers: [
      o('01', 'Editorial strategy', 'Editorial line, content calendar and formats tailored to your goals and audience.', ['Editorial line', 'Calendar', 'Formats']),
      o('02', 'Visual design', 'Premium visuals and creative concepts true to your brand identity.', ['Visuals', 'Carousels', 'Branding']),
      o('03', 'Short-form video', 'Short formats designed for TikTok and Instagram, where attention is won.', ['TikTok', 'Reels', 'Stories']),
      o('04', 'Audience analysis', 'Organic vs paid reach, content performance, engagement: insights to keep improving.', ['Reports', 'Insights', 'Benchmark'])
    ],
    benTitle: 'If you’re not on social media, you barely exist.',
    benefits: [
      b('Visibility', 'A regular, well-managed presence where your audience is.'),
      b('Image', 'Premium content that elevates your brand.'),
      b('Engagement', 'Formats that spark reactions, shares and conversations.'),
      b('Management', 'Audience analysis to keep refining the strategy.')
    ],
    methTitle: 'From strategy to published content.',
    steps: [s('1', 'The choice', 'Defining your goals and formats: visuals, video or both.'), s('2', 'The brief', 'You share your vision and your assets.'), s('3', 'The strategy', 'We analyse, create and optimise.'), s('4', 'Take-off', 'Delivery of ready-to-publish content.')],
    cta: 'Ready to make your brand shine?'
  }
}

/** SEO tags for services (title ≤ 60 chars incl. brand, description 120–160 chars) */
export const SERVICE_SEO_EN: Record<string, { title: string; h1: string; desc: string }> = {
  'creation-site-web': { title: 'Website design agency: websites & e-commerce', h1: 'Website design for businesses', desc: 'Fast showcase websites, online stores and landing pages, optimised for Google and built to convert, for companies in Canada, France and Europe. Quote within 48 hours.' },
  'application-metier': { title: 'Custom business software development', h1: 'Custom business software', desc: 'Custom business software development: CRM, back office, client portals and automation tailored to your processes. Dakar-based team serving Canada and Europe.' },
  'application-mobile': { title: 'iOS & Android mobile app development', h1: 'iOS & Android mobile app development', desc: 'Design and development of iOS and Android mobile apps, from UX mock-ups to App Store and Google Play release, for companies in Canada, France and Europe.' },
  'referencement-seo-geo': { title: 'SEO & GEO agency: Google and generative AI', h1: 'SEO & GEO agency', desc: 'SEO and GEO: audits, technical SEO, content and visibility in ChatGPT, Gemini and Perplexity, for the Canadian, French, Belgian or Swiss market, in English and French.' },
  'marketing-digital-ads': { title: 'Google Ads, Meta Ads & TikTok Ads agency', h1: 'Digital marketing & paid ads agency', desc: 'Data-driven Google Ads, Meta Ads and TikTok Ads campaigns in Canada, France and Europe: strategy, creative, delivery and continuous optimisation.' },
  'social-media': { title: 'Social media agency: TikTok & Instagram content', h1: 'Social media & content agency', desc: 'Social media strategy, visual design and short-form video for TikTok and Instagram: content that strengthens your brand image and drives real engagement.' }
}

export const SERVICE_FAQ_EN: [string, string][] = [
  ['How much does this service cost?', 'Every project is unique: its budget depends on complexity, technologies and requested deadlines. After a first conversation, we send you a detailed quote, valid for 30 days. Payment is made in two instalments: 50% on order and 50% on delivery.'],
  ['What are the timelines?', 'They depend on the nature and scope of the project, and on when we receive your content. An indicative schedule with sign-off milestones is set during scoping.'],
  ['How many revisions are included?', 'Two revision cycles are included in every service. Further requests are covered by an additional quote.'],
  ['What happens after delivery?', 'For websites, apps and AI agents, 12 months of technical maintenance are included. An ongoing support subscription can then take over. You own the deliverables once they are paid in full.'],
  ['Can we combine several services?', 'Yes — and that’s often where performance comes from: a well-ranked website, fuelled by consistent campaigns and content.']
]

/** Market landing pages, keyed by French slug */
export const LOCAL_PAGES_EN: Record<string, Omit<LocalPage, 'slug' | 'refs'>> = {
  france: {
    crumbParent: 'Digital agency', crumb: 'France', eyebrow: 'Digital agency for French companies',
    title: 'Digital agency for French companies', description: 'Websites, software, SEO & GEO and paid ads for French SMEs: a French-speaking team based in Dakar, one or two hours from Paris, at a controlled cost.',
    h1: 'The digital agency for French SMEs, based in Dakar.',
    sub: 'Website design, custom software, SEO & GEO and digital marketing: BNS Digital supports French companies with the standards of a Paris agency and a controlled budget.',
    svcTitle: 'All our services, working for French businesses.', whyTitle: 'Why work with a Dakar-based team?',
    why: [
      b('Agency quality, controlled cost', 'The same methods and standards as a European agency, with a lighter cost structure: more of your budget goes into production.'),
      b('Minimal time difference', 'Dakar runs on GMT: one hour behind Paris in winter, two in summer. Our working days overlap almost entirely.'),
      b('A French-speaking team', 'Smooth communication in French, content written for the French market and a good understanding of how it works.'),
      b('A dedicated project manager', 'A single point of contact, regular video calls and transparent follow-up at every stage.')
    ],
    refTitle: 'Some of our references',
    faq: [
      ['How do you work remotely with French companies?', 'Everything happens over video calls, email and shared tracking tools. A dedicated project manager runs regular check-ins and you approve each stage before we move on.'],
      ['What is the time difference between Dakar and Paris?', 'Dakar is on GMT all year round, with no daylight saving: when it is 9 am in Dakar, it is 10 am in Paris in winter and 11 am in summer. Our working days overlap widely.'],
      ['Are your websites GDPR-compliant?', 'Yes. GDPR requirements are built in from the design stage: cookie consent, forms, legal notice and privacy policy.'],
      ['Do you work across France?', 'Yes. Since everything is done remotely, we support companies in every region, from Paris to Lyon, Marseille, Bordeaux or Lille.']
    ],
    cta: 'A digital project in France?'
  },
  paris: {
    crumbParent: 'Digital agency', crumb: 'Paris', eyebrow: 'Web agency for Paris-based companies',
    title: 'Web agency for companies in Paris', description: 'Websites, software, SEO & GEO and paid ads for companies in Paris and Île-de-France, delivered by a Dakar-based team just one hour behind.',
    h1: 'The standards of a Paris agency, without the Paris price tag.',
    sub: 'Website design, custom software, SEO & GEO and digital marketing: BNS Digital supports companies in Paris and Île-de-France from Dakar, in French and at your pace.',
    svcTitle: 'All our services, working for Paris-based businesses.', whyTitle: 'Why work with BNS Digital from Paris?',
    why: [
      b('A better-invested budget', 'A lighter cost structure than a Paris agency: for the same budget, more time spent on your project.'),
      b('Nearly the same hours', 'Only one to two hours’ difference: meetings, approvals and adjustments happen within the day.'),
      b('Paris local SEO', 'Google Business Profile, local pages and structured data to rank in location-based searches in Paris and Île-de-France.'),
      b('A full team', 'Six areas of expertise to run your project end to end, with a single point of contact.')
    ],
    refTitle: 'Some of our references',
    faq: [
      ['Can we meet?', 'We work over video calls, which makes it easy to set up a meeting quickly. Book a free 30-minute discovery call online.'],
      ['Do you handle local SEO for Paris?', 'Yes: Google Business Profile optimisation, pages for the areas you serve and structured data for “your trade + Paris” searches.'],
      ['Do you work across Île-de-France?', 'Yes. We support companies in Paris and throughout Île-de-France, and across France more broadly.']
    ],
    cta: 'A digital project in Paris?'
  },
  belgique: {
    crumbParent: 'Digital agency', crumb: 'Belgium', eyebrow: 'Digital agency for Belgian companies',
    title: 'Digital agency for Belgian companies', description: 'Multilingual websites, software, SEO & GEO and paid ads for Belgian companies: a French- and English-speaking team based in Dakar, at a controlled cost.',
    h1: 'Your digital partner in Belgium, from Dakar.',
    sub: 'Multilingual websites, custom software, SEO and campaigns: BNS Digital supports companies in Brussels and Wallonia with a French-speaking team and dedicated follow-up.',
    svcTitle: 'All our services, working for Belgian businesses.', whyTitle: 'An agency built for the Belgian market.',
    why: [
      b('Multilingual websites', 'An architecture designed for several languages with correct hreflang tags, so every version ranks properly.'),
      b('One hour’s difference', 'Brussels and Dakar are one to two hours apart: we work the same hours as you.'),
      b('Agency quality, controlled cost', 'European agency standards with a lighter cost structure.'),
      b('GDPR compliance', 'Cookies, forms and legal notices that meet the European framework from day one.')
    ],
    refTitle: 'Some of our references',
    faq: [
      ['Can you build a website in French and Dutch?', 'Yes, we build multilingual websites. Translations can be supplied by you or by a partner translator; we handle the integration and SEO of each language.'],
      ['How does a remote project work?', 'A dedicated project manager runs regular video check-ins; you follow progress and approve each stage.'],
      ['Do you also work in Luxembourg?', 'Yes, we support French- and English-speaking companies across Europe.']
    ],
    cta: 'A digital project in Belgium?'
  },
  suisse: {
    crumbParent: 'Digital agency', crumb: 'Switzerland', eyebrow: 'Digital agency for Swiss companies',
    title: 'Digital agency for Swiss companies', description: 'Websites, software, SEO & GEO and paid ads for companies in Switzerland: a French- and English-speaking team based in Dakar, at a controlled cost.',
    h1: 'Digital projects that meet Swiss standards.',
    sub: 'Websites, custom software, SEO and campaigns: BNS Digital supports companies in Geneva, Lausanne and across Switzerland with rigour, in French or English, at a controlled cost.',
    svcTitle: 'All our services, working for Swiss businesses.', whyTitle: 'Rigour, responsiveness and a controlled budget.',
    why: [
      b('Strong value for money', 'Compared with Swiss rates, a Dakar-based team brings the same standards for a more contained budget.'),
      b('Shared hours', 'One to two hours’ difference with Geneva and Zurich: your contacts are available during your office hours.'),
      b('Data protection', 'We build the requirements of the revised FADP (nFADP) and the GDPR into your websites and apps.'),
      b('French and English', 'Communication and content in French or English, as your business requires.')
    ],
    refTitle: 'Some of our references',
    faq: [
      ['Do you work with all of Switzerland?', 'We work in French and English, with companies in French-speaking Switzerland and across the country when they communicate in those languages.'],
      ['Are your websites nFADP-compliant?', 'Yes. Privacy policy, cookie management and forms are designed to meet the revised Federal Act on Data Protection and the GDPR.'],
      ['How do you manage the project?', 'A dedicated project manager, regular video calls and approval milestones set during scoping.']
    ],
    cta: 'A digital project in Switzerland?'
  },
  canada: {
    crumbParent: 'Digital agency', crumb: 'Canada & Quebec', eyebrow: 'Digital agency for Canadian companies',
    title: 'Digital agency for Canadian companies', description: 'Bilingual websites, software, SEO & GEO and paid ads for companies in Canada and Quebec: an English- and French-speaking team based in Dakar.',
    h1: 'Your digital agency for Canada, based in Dakar.',
    sub: 'Bilingual websites, custom software, SEO and campaigns: BNS Digital supports companies in Toronto, Montreal, Quebec City and across Canada, in English and French, at a controlled cost.',
    svcTitle: 'All our services, working for Canadian businesses.', whyTitle: 'Why a Dakar-based team for your Canadian project?',
    why: [
      b('Bilingual websites', 'English and French on one website, with proper SEO for each language and French given its rightful place for the Quebec market.'),
      b('A head start on your day', 'Dakar is 4 to 5 hours ahead of Toronto and Montreal: a request sent at the end of your day can be handled before you wake up, and our shared mornings are for meetings.'),
      b('Agency quality, controlled cost', 'North American agency standards with a lighter cost structure.'),
      b('Privacy compliance', 'We build in the requirements of PIPEDA and Quebec’s Law 25: consent, privacy policy and forms.')
    ],
    refTitle: 'Some of our references',
    faq: [
      ['What is the time difference with Eastern Canada?', 'Dakar is on GMT all year round: 4 hours ahead of Toronto and Montreal in summer, 5 hours in winter. Our calls take place in the morning, Eastern time.'],
      ['Can you build a website in English and French?', 'Yes. We build bilingual English-French websites, with dedicated URLs and hreflang tags for each language.'],
      ['Are your websites compliant with PIPEDA and Law 25?', 'Yes. Cookie consent, privacy policy and forms are designed to meet PIPEDA and Quebec’s Law 25.'],
      ['Do you work outside Quebec?', 'Yes, with companies across Canada, in English and French.']
    ],
    cta: 'A digital project in Canada?'
  },
  dakar: {
    crumbParent: 'Digital agency', crumb: 'Dakar', eyebrow: 'Digital agency in Dakar',
    title: 'Digital agency in Dakar, Senegal', description: 'BNS Digital, a Dakar-based digital agency: websites, software, SEO & GEO, paid ads and social media for companies in Europe, Canada and Senegal.',
    h1: 'A digital agency in Dakar, working for Europe and Canada.',
    sub: 'From Dakar, BNS Digital designs websites, software, SEO strategies and campaigns for French, European and Canadian companies, as well as for businesses in Senegal.',
    svcTitle: 'Six areas of expertise, based in Dakar.', whyTitle: 'Why Dakar?',
    why: [
      b('A French-speaking digital hub', 'Dakar is home to web, design and digital marketing talent working in French and English.'),
      b('Between time zones', 'On GMT, Dakar is one or two hours from Europe and four or five hours from Eastern Canada.'),
      b('Agency quality, controlled cost', 'International agency methods with a lighter cost structure.'),
      b('Dedicated follow-up', 'A single project manager, regular video calls and transparent communication.')
    ],
    refTitle: 'Some of our references',
    faq: [
      ['Do you also work with Senegalese companies?', 'Yes. We support companies in Dakar and across Senegal, alongside our European and Canadian clients.'],
      ['Can we meet you in Dakar?', 'Yes, by appointment. Email us at contact@bns-digital.com to arrange a time.'],
      ['Which languages do you work in?', 'French and English, both written and spoken.']
    ],
    cta: 'A digital project?'
  }
}

export const CAT_INFO_EN: Record<ProjectCat, CatInfo> = {
  Plateforme: { tag: 'Platform', filter: 'Platforms & SaaS', title: 'Platforms & SaaS', desc: 'Web applications with user accounts, dashboards, interactive maps and marketplaces.' },
  Vitrine: { tag: 'Website', filter: 'Websites', title: 'Corporate & showcase websites', desc: 'Websites for companies, startups and consulting firms: brand image, offers and lead generation.' },
  Ecommerce: { tag: 'E-commerce', filter: 'E-commerce', title: 'E-commerce', desc: 'Online stores: catalogue, product pages, cart and checkout.' },
  Social: { tag: 'Social media', filter: 'Social media', title: 'Social media & content', desc: 'Editorial strategies, visuals and short-form video for social networks.' },
  ADS: { tag: 'Paid ads', filter: 'Paid ads', title: 'Ad campaigns', desc: 'Data-driven Google Ads, Meta Ads and TikTok Ads campaigns.' }
}
export const CAT_LABEL_EN = Object.fromEntries(Object.entries(CAT_INFO_EN).map(([c, i]) => [c, i.tag])) as Record<ProjectCat, string>

/** Project texts, keyed by slug (client names, images and links come from content.ts) */
export const PROJECT_TEXT_EN: Record<string, { label: string; desc?: string; metric?: string }> = {
  petalia: { label: 'Agritech · IoT & AI', desc: 'Website for Petalia, a smart farming platform in Africa: IoT sensors, artificial intelligence and drones to run farms, with solutions, plans and a demo request.' },
  nagaw: { label: 'SaaS · Business management', desc: 'Nagaw, a platform that connects an SME’s data and tools (ERP, CRM, accounting, Excel, APIs) and runs analyses, reports and dashboards requested in plain language.' },
  permis2: { label: 'EdTech · Driving licence', desc: 'PERMIS 2.0, a driving licence platform for Senegal: highway code revision, mock exams, a driving school comparison tool and management software for driving schools.' },
  'power-energy-solutions': { label: 'Energy & engineering', desc: 'Corporate website for Power Energy Solutions, an African energy engineering company: design, delivery and maintenance of energy systems and supply of industrial equipment.' },
  vianego: { label: 'Consulting · Business development', desc: 'Bilingual website for VIANEGO, a business development firm connecting companies, investors and partners to deliver projects in West Africa (agriculture, energy, oil and gas).' },
  'le-jardin-d-enfants': { label: 'E-commerce · Education', desc: 'Online store of teaching resources for preschool: printable worksheets by level, tools for teachers and parents, and multilingual resources (Wolof, Bambara, Lingala…).' },
  techub: { label: 'Platform · Tech ecosystem', desc: 'TechHub Africa, a platform bringing together Africa’s tech ecosystem: startup directory, innovation map, events, job listings and a developer community.' },
  'petalia-soil': { label: 'Agritech · Marketplace', desc: 'Petalia Soil, a farmland marketplace: map-based plot search, soil parameter analysis, recommended crops and direct contact with landowners.' },
  'kps-agency': { label: 'Creative agency · Paris', desc: 'Website for KPS Agency, a Paris-based creative agency specialising in social media, websites and paid advertising on TikTok and Instagram.' }
}
