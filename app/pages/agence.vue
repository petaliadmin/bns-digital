<template>
  <div>
    <section class="container intro">
      <div class="eyebrow">{{ t.eyebrow }}</div>
      <h1 class="intro__h1">{{ t.h1 }}</h1>
      <div class="intro__cols">
        <p class="intro__lead">{{ t.lead }}</p>
        <p class="intro__p">{{ t.intro }}</p>
      </div>
    </section>

    <section class="bg-white section--96">
      <div class="container">
        <div class="head">
          <div class="eyebrow">{{ t.adnEyebrow }}</div>
          <h2 class="h2 h2--52">{{ t.adnH2 }}</h2>
        </div>
        <div class="grid grid-3 m-swipe">
          <div v-for="a in t.adn" :key="a.n" class="adn">
            <span class="adn__n">{{ a.n }}</span>
            <h3 class="adn__t">{{ a.t }}</h3>
            <p class="adn__d">{{ a.d }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container section">
      <div class="head head--row">
        <div class="head__col">
          <div class="eyebrow">{{ t.methodEyebrow }}</div>
          <h2 class="h2 h2--52">{{ t.methodH2 }}</h2>
        </div>
        <p class="text-18 head__p">{{ t.methodP }}</p>
      </div>
      <ol class="method">
        <li v-for="s in t.steps" :key="s.n" class="method__row">
          <span class="method__n">{{ s.n }}</span>
          <h3 class="method__t">{{ s.t }}</h3>
          <p class="method__d">{{ s.d }}</p>
        </li>
      </ol>
    </section>

    <section class="bg-dark section--96">
      <div class="container">
        <div class="head">
          <div class="eyebrow">{{ t.whyEyebrow }}</div>
          <h2 class="h2 h2--52">{{ t.whyH2 }}</h2>
        </div>
        <div class="grid grid-4 m-swipe">
          <div v-for="w in t.why" :key="w.tag" class="why">
            <span class="why__tag">{{ w.tag }}</span>
            <h3 class="why__t">{{ w.t }}</h3>
            <p class="why__d">{{ w.d }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="hasReviews" class="container section">
      <div class="eyebrow">{{ t.reviewsEyebrow }}</div>
      <h2 class="h2 h2--52 team__h">{{ t.reviewsH2 }}</h2>
      <ReviewCarousel :reviews="REVIEWS" />
    </section>

    <CtaBand :title="t.ctaTitle" :label="t.ctaLabel" />
  </div>
</template>

<script setup lang="ts">
import { REVIEWS, organizationSchema } from '~/data/content'

const { en, link, hasReviews } = useSite()
const t = useLocaleText({
  fr: {
    title: 'L’agence BNS Digital : une équipe digitale à Dakar', desc: 'BNS Digital, agence digitale basée à Dakar : six expertises (web, apps, SEO & GEO, Ads, social media) au service des entreprises en France, en Europe et au Canada.',
    eyebrow: 'L’agence', h1: 'Plus qu’une agence, votre co-pilote digital.',
    lead: 'Depuis Dakar, nous accompagnons les entreprises françaises, européennes et canadiennes avec les standards d’une grande agence et un budget maîtrisé.',
    intro: 'Basée à Dakar, BNS Digital réunit au sein d’une même équipe six expertises complémentaires : création de sites, applications métier, applications mobiles, référencement SEO & GEO, marketing digital et social media. Une équipe francophone et anglophone, à l’heure GMT, qui travaille à distance avec ses clients comme une extension de leurs propres équipes.',
    adnEyebrow: 'Notre ADN', adnH2: 'Trois convictions guident chacun de nos projets.',
    adn: [
      { n: '01', t: 'Vision stratégique', d: 'Nous ne nous contentons pas d’exécuter. Nous construisons une feuille de route précise pour vous aider à gagner des parts de marché.' },
      { n: '02', t: 'Une équipe engagée', d: 'Une équipe de passionnés qui devient l’extension directe de votre marque et s’engage sur vos objectifs, quel que soit le fuseau horaire.' },
      { n: '03', t: 'Une croissance mesurable', d: 'Plus de visibilité, plus d’engagement, plus de conversions : des objectifs définis ensemble et suivis dans la durée.' }
    ],
    methodEyebrow: 'Méthode', methodH2: 'Une méthode claire, du brief au décollage.', methodP: 'Un cadre précis, des étapes validées ensemble, aucune zone d’ombre, même à distance.',
    steps: [
      { n: '01', t: 'Cadrage', d: 'Nous analysons votre marché, vos concurrents et vos objectifs pour définir ensemble les priorités et le périmètre du projet.' },
      { n: '02', t: 'Stratégie & conception', d: 'Parcours utilisateurs, maquettes, plan média : la stratégie prend forme et vous la validez avant toute production.' },
      { n: '03', t: 'Production', d: 'Design, développement, contenus ou campagnes : nos équipes produisent avec exigence et vous associent à chaque jalon, lors de points réguliers en visio.' },
      { n: '04', t: 'Lancement & croissance', d: 'Mise en ligne, mesure des performances, optimisation continue. Un projet digital ne s’arrête pas le jour de sa livraison.' }
    ],
    whyEyebrow: 'Pourquoi BNS Digital', whyH2: 'La qualité d’une agence européenne, depuis Dakar.',
    why: [
      { tag: '# QUALITÉ', t: 'Coût maîtrisé, exigence intacte', d: 'Les méthodes d’une agence européenne avec une structure de coûts plus légère : votre budget va davantage à la production.' },
      { tag: '# GMT', t: 'Un fuseau horaire proche', d: '1 à 2 h de décalage avec Paris, Bruxelles et Genève ; une matinée de travail en commun avec Montréal et Toronto.' },
      { tag: '# FR · EN', t: 'Une équipe francophone', d: 'Des échanges fluides en français comme en anglais, sans intermédiaire.' },
      { tag: '# SUIVI', t: 'Un chef de projet dédié', d: 'Un interlocuteur unique, des points réguliers en visio et un suivi transparent de l’avancement.' }
    ],
    reviewsEyebrow: 'Avis Google', reviewsH2: 'Ce que nos clients disent de nous.', ctaTitle: 'Envie de travailler avec nous ?', ctaLabel: 'Parler de votre projet'
  },
  en: {
    title: 'About BNS Digital: a digital team in Dakar', desc: 'BNS Digital, a Dakar-based digital agency: six areas of expertise (web, apps, SEO & GEO, ads, social media) serving companies in Canada, France and Europe.',
    eyebrow: 'About us', h1: 'More than an agency, your digital co-pilot.',
    lead: 'From Dakar, we support Canadian, French and European companies with the standards of a large agency and a controlled budget.',
    intro: 'Based in Dakar, BNS Digital brings six complementary areas of expertise together in one team: website design, business software, mobile apps, SEO & GEO, digital marketing and social media. A bilingual English- and French-speaking team on GMT, working remotely with clients as an extension of their own teams.',
    adnEyebrow: 'Our DNA', adnH2: 'Three convictions guide every project we take on.',
    adn: [
      { n: '01', t: 'Strategic vision', d: 'We don’t just execute. We build a precise roadmap to help you win market share.' },
      { n: '02', t: 'A committed team', d: 'A passionate team that becomes a direct extension of your brand and commits to your goals, whatever the time zone.' },
      { n: '03', t: 'Measurable growth', d: 'More visibility, more engagement, more conversions: goals agreed together and tracked over time.' }
    ],
    methodEyebrow: 'Method', methodH2: 'A clear method, from brief to take-off.', methodP: 'A precise framework, steps agreed together, no grey areas — even remotely.',
    steps: [
      { n: '01', t: 'Scoping', d: 'We analyse your market, competitors and goals to agree on priorities and project scope together.' },
      { n: '02', t: 'Strategy & design', d: 'User journeys, mock-ups, media plan: the strategy takes shape and you approve it before anything is produced.' },
      { n: '03', t: 'Production', d: 'Design, development, content or campaigns: our team delivers to a high standard and involves you at every milestone through regular video calls.' },
      { n: '04', t: 'Launch & growth', d: 'Go-live, performance tracking, continuous optimisation. A digital project doesn’t end on delivery day.' }
    ],
    whyEyebrow: 'Why BNS Digital', whyH2: 'European agency quality, from Dakar.',
    why: [
      { tag: '# QUALITY', t: 'Controlled cost, same standards', d: 'European agency methods with a lighter cost structure: more of your budget goes into production.' },
      { tag: '# GMT', t: 'A convenient time zone', d: 'A shared working morning with Toronto and Montreal; only 1 to 2 hours from Paris, Brussels and Geneva.' },
      { tag: '# EN · FR', t: 'A bilingual team', d: 'Smooth communication in English and French, with no middleman.' },
      { tag: '# FOLLOW-UP', t: 'A dedicated project manager', d: 'A single point of contact, regular video calls and transparent progress tracking.' }
    ],
    reviewsEyebrow: 'Google reviews', reviewsH2: 'What our clients say about us.', ctaTitle: 'Want to work with us?', ctaLabel: 'Discuss your project'
  }
})

usePageSeo({ title: () => t.value.title, description: () => t.value.desc })
const site = useRuntimeConfig().public.siteUrl as string
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema(site, en.value ? 'en' : 'fr'),
        { '@type': 'AboutPage', '@id': `${site}${link.about()}#webpage`, url: `${site}${link.about()}`, name: t.value.title, inLanguage: en.value ? 'en' : 'fr', about: { '@id': `${site}/#organization` }, mainEntity: { '@id': `${site}/#organization` } }
      ]
    })
  }]
})
</script>

<style scoped>
.intro { display: flex; flex-direction: column; gap: 32px; padding-top: 112px; padding-bottom: 80px; }
.intro__h1 { font-size: 96px; line-height: .98; letter-spacing: -3.2px; font-weight: 800; max-width: 1180px; }
.intro__cols { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 64px; margin-top: 24px; }
.intro__lead { font-size: 22px; line-height: 1.5; }
.intro__p { font-size: 18px; line-height: 1.65; color: var(--muted); }
.head { display: flex; flex-direction: column; gap: 16px; margin-bottom: 48px; }
.head--row { flex-direction: row; justify-content: space-between; align-items: flex-end; gap: 48px; }
.head__col { display: flex; flex-direction: column; gap: 16px; }
.head__p { max-width: 440px; }
.adn { display: flex; flex-direction: column; gap: 16px; padding: 40px 36px; min-height: 280px; background: var(--bg); border: 1px solid var(--line); border-radius: 20px; }
.adn__n { font-family: var(--font-display); font-size: 44px; font-weight: 800; color: var(--accent); }
.adn__t { font-size: 28px; letter-spacing: -.6px; font-weight: 700; }
.adn__d { font-size: 17px; line-height: 1.6; color: var(--muted); }
.method { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line-2); }
.method__row { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px; padding: 32px 0; border-bottom: 1px solid var(--line-2); align-items: baseline; }
.method__n { grid-column: span 1; font-family: var(--font-display); font-size: 28px; font-weight: 800; color: var(--accent); }
.method__t { grid-column: span 4; font-size: 30px; letter-spacing: -.6px; font-weight: 700; }
.method__d { grid-column: span 7; font-size: 17px; line-height: 1.6; color: var(--muted); }
.why { display: flex; flex-direction: column; gap: 14px; padding: 32px 28px; min-height: 230px; background: var(--dark-2); border-radius: 20px; }
.why__tag { align-self: flex-start; font-size: 12px; font-weight: 700; letter-spacing: 1.2px; padding: 6px 10px; border-radius: 999px; background: var(--dark-line); color: var(--accent-tint-2); }
.why__t { font-size: 23px; font-weight: 700; }
.why__d { font-size: 15px; line-height: 1.6; color: var(--dark-muted); }
.team__h { margin-bottom: 40px; }
@media (max-width: 1180px) {
  .intro__h1 { font-size: 64px; letter-spacing: -2px; }
  .intro__cols { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  .head--row { flex-direction: column; align-items: flex-start; }
  .method__n { grid-column: span 2; }
  .method__t { grid-column: span 10; }
  .method__d { grid-column: 3 / -1; margin-top: 10px; }
}
@media (max-width: 720px) {
  .intro { padding-top: 64px; }
  .intro__h1 { font-size: 42px; letter-spacing: -1.2px; }
  .method__t { font-size: 24px; }
  .method__d { grid-column: 1 / -1; }
}
</style>
