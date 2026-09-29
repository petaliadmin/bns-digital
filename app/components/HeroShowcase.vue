<template>
  <div
    class="hs"
    role="region"
    :aria-roledescription="t.carousel"
    :aria-label="t.region"
    :class="{ 'is-paused': paused }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @focusin="focus = true"
    @focusout="focus = false"
  >
    <!-- Fenêtre de navigateur : l'écran change à chaque service -->
    <div class="hs__browser" aria-hidden="true">
      <div class="hs__bar">
        <span /><span /><span />
        <Transition name="hs-fade" mode="out-in"><em :key="slide.key">{{ slide.url }}</em></Transition>
      </div>
      <div class="hs__screen">
        <Transition name="hs-screen" mode="out-in">
          <!-- Création de site web -->
          <div v-if="slide.key === 'web'" key="web" class="scr scr--web">
            <div class="web__nav"><b /><i /><i /><i /><u /></div>
            <div class="web__hero"><i class="w70" /><i class="w50" /><i class="w40 soft" /><span class="web__cta" /></div>
            <div class="web__cards"><span v-for="n in 3" :key="n" :style="{ animationDelay: `${300 + n * 120}ms` }" /></div>
          </div>
          <!-- Application métier -->
          <div v-else-if="slide.key === 'app'" key="app" class="scr scr--app">
            <div v-for="(col, ci) in slide.columns" :key="col" class="kb">
              <span class="kb__h">{{ col }}</span>
              <span v-for="n in 3 - ci" :key="n" class="kb__card" :style="{ animationDelay: `${200 + ci * 160 + n * 90}ms` }"><i /><i /></span>
            </div>
          </div>
          <!-- Application mobile -->
          <div v-else-if="slide.key === 'mobile'" key="mobile" class="scr scr--mobile">
            <div class="phone">
              <div class="phone__notch" />
              <div class="phone__head"><i /><i class="w40" /></div>
              <div class="phone__card" />
              <div class="phone__row" v-for="n in 3" :key="n" :style="{ animationDelay: `${250 + n * 110}ms` }"><b /><i /></div>
              <div class="phone__tab"><i v-for="n in 4" :key="n" /></div>
            </div>
          </div>
          <!-- SEO & GEO -->
          <div v-else-if="slide.key === 'seo'" key="seo" class="scr scr--seo">
            <div class="serp__search"><span>{{ slide.query }}</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" /></svg></div>
            <div v-for="n in 3" :key="n" class="serp__res" :class="{ 'is-you': n === 1 }" :style="{ animationDelay: `${200 + n * 130}ms` }">
              <span class="serp__pos">{{ n }}</span>
              <div><em>{{ n === 1 ? slide.domain : '' }}</em><i /><i class="w70" /></div>
            </div>
          </div>
          <!-- Marketing digital & ADS -->
          <div v-else-if="slide.key === 'ads'" key="ads" class="scr scr--ads">
            <div class="ads__kpis"><span v-for="k in slide.kpis" :key="k"><small>{{ k }}</small><i /></span></div>
            <svg class="ads__chart" viewBox="0 0 300 110" preserveAspectRatio="none">
              <path class="ads__area" d="M0 100 L0 88 C40 84 60 70 90 66 S150 52 180 40 S250 18 300 8 L300 100Z" />
              <path class="ads__line" d="M0 88 C40 84 60 70 90 66 S150 52 180 40 S250 18 300 8" />
            </svg>
          </div>
          <!-- Social media -->
          <div v-else key="social" class="scr scr--social">
            <div class="ig__head"><span class="ig__avatar" /><div><i /><i class="w50" /></div></div>
            <div class="ig__grid"><span v-for="n in 6" :key="n" :style="{ animationDelay: `${150 + n * 80}ms`, background: IG[n - 1] }" /></div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Carte flottante claire -->
    <!-- type="transition" : ignore l'animation de flottement infinie pour détecter la fin de sortie -->
    <Transition name="hs-float" mode="out-in" type="transition">
      <div :key="`a-${slide.key}`" class="hs__float hs__float--light" aria-hidden="true">
        <div class="hs__label">{{ slide.a.label }}</div>
        <div class="hs__row"><span class="hs__big">{{ slide.a.big }}</span><span class="hs__kw">{{ slide.a.kw }}</span></div>
        <div v-if="slide.a.chips" class="hs__chips"><span v-for="c in slide.a.chips" :key="c"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4 10-10" /></svg>{{ c }}</span></div>
        <div v-else class="hs__bars"><i v-for="(h, i) in BARS" :key="i" :style="{ height: `${h}%`, animationDelay: `${250 + i * 70}ms` }" /></div>
      </div>
    </Transition>

    <!-- Carte flottante sombre (résultat) -->
    <Transition name="hs-float2" mode="out-in" type="transition">
      <div :key="`b-${slide.key}`" class="hs__float hs__float--dark" aria-hidden="true">
        <div class="hs__label">{{ slide.b.label }}</div>
        <div class="hs__big hs__big--40">{{ slide.b.big }}</div>
        <div class="hs__sub">{{ slide.b.sub }}</div>
      </div>
    </Transition>

    <!-- Navigation entre services -->
    <div class="hs__nav">
      <div class="hs__tabs" role="tablist" :aria-label="t.region">
        <button
          v-for="(s, i) in slides"
          :key="s.key"
          type="button"
          role="tab"
          class="hs__tab"
          :class="{ 'is-on': i === index }"
          :aria-selected="i === index"
          :aria-label="s.name"
          @click="go(i)"
        >
          <span class="hs__tab-name">{{ s.short }}</span>
          <span class="hs__tab-bar"><span :key="`${i}-${index}-${cycle}`" class="hs__tab-fill" :style="{ animationDuration: `${INTERVAL}ms` }" /></span>
        </button>
      </div>
      <button type="button" class="hs__pause" :aria-label="userPaused ? t.play : t.pause" @click="userPaused = !userPaused">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path v-if="!userPaused" d="M7 5h3v14H7zM14 5h3v14h-3z" /><path v-else d="M8 5v14l11-7z" /></svg>
      </button>
    </div>
    <p class="sr-only" aria-live="polite">{{ slide.name }}</p>
  </div>
</template>

<script setup lang="ts">
const INTERVAL = 4800
const BARS = [22, 36, 48, 64, 82, 100]
const IG = ['#A9D2FB', '#22B8F5', '#3A8FF0', '#D3E5FD', '#0A56D8', '#22B8F5']

interface Slide {
  key: 'web' | 'app' | 'mobile' | 'seo' | 'ads' | 'social'
  name: string; short: string; url: string
  a: { label: string; big: string; kw: string; chips?: string[] }
  b: { label: string; big: string; sub: string }
  columns?: string[]; query?: string; domain?: string; kpis?: string[]
}

// Cartes flottantes : engagements de l'agence (délais, maintenance) et marchés servis — aucun chiffre client inventé
const t = useLocaleText({
  fr: {
    carousel: 'carrousel', region: 'Aperçu de nos services', pause: 'Mettre en pause le défilement', play: 'Reprendre le défilement',
    slides: [
      { key: 'web', name: 'Création de site web', short: 'Site web', url: 'votre-entreprise.fr',
        a: { label: 'Core Web Vitals', big: 'Rapide', kw: 'sur mobile', chips: ['LCP', 'INP', 'CLS'] },
        b: { label: 'Création de site web', big: '48 h', sub: 'pour recevoir votre devis détaillé' } },
      { key: 'app', name: 'Application métier', short: 'App métier', url: 'app.votre-entreprise.fr/crm', columns: ['Prospects', 'Devis', 'Signés'],
        a: { label: 'Automatisations', big: 'Relances', kw: 'automatiques', chips: ['CRM', 'Back-office', 'Portail'] },
        b: { label: 'Application métier', big: '12 mois', sub: 'de maintenance technique inclus' } },
      { key: 'mobile', name: 'Application mobile', short: 'App mobile', url: 'votre-app.fr',
        a: { label: 'Expérience mobile', big: 'UX / UI', kw: 'prototypée', chips: ['Maquettes', 'Prototype', 'Tests'] },
        b: { label: 'Application mobile', big: '2 stores', sub: 'App Store et Google Play, de la maquette à la publication' } },
      { key: 'seo', name: 'Référencement SEO & GEO', short: 'SEO & GEO', url: 'google.fr/search', query: 'votre métier + votre ville', domain: 'votre-entreprise.fr',
        a: { label: 'Référencement Google', big: 'Top 3', kw: 'sur votre mot-clé' },
        b: { label: 'GEO · IA génératives', big: 'Cité', sub: 'par ChatGPT, Gemini et Perplexity' } },
      { key: 'ads', name: 'Marketing digital & ADS', short: 'Publicité', url: 'ads.dashboard', kpis: ['Portée', 'Clics', 'Leads'],
        a: { label: 'Campagnes Google & Meta', big: 'KPIs', kw: 'suivis en continu', chips: ['Portée', 'Leads', 'ROAS'] },
        b: { label: 'Ciblage multi-pays', big: 'FR · CA', sub: 'des campagnes calibrées pour chaque marché' } },
      { key: 'social', name: 'Social media & contenus', short: 'Social', url: 'instagram.com/votre-marque',
        a: { label: 'Formats courts', big: 'Reels', kw: '& TikTok', chips: ['Visuels', 'Vidéo', 'Stories'] },
        b: { label: 'Social media & contenus', big: 'FR · EN', sub: 'des contenus écrits pour chaque audience' } }
    ] as Slide[]
  },
  en: {
    carousel: 'carousel', region: 'Overview of our services', pause: 'Pause autoplay', play: 'Resume autoplay',
    slides: [
      { key: 'web', name: 'Website design', short: 'Websites', url: 'your-company.ca',
        a: { label: 'Core Web Vitals', big: 'Fast', kw: 'on mobile', chips: ['LCP', 'INP', 'CLS'] },
        b: { label: 'Website design', big: '48 h', sub: 'to receive your detailed quote' } },
      { key: 'app', name: 'Custom business software', short: 'Software', url: 'app.your-company.com/crm', columns: ['Leads', 'Quotes', 'Won'],
        a: { label: 'Automation', big: 'Automatic', kw: 'follow-ups', chips: ['CRM', 'Back office', 'Portal'] },
        b: { label: 'Business software', big: '12 months', sub: 'of technical maintenance included' } },
      { key: 'mobile', name: 'Mobile app development', short: 'Mobile', url: 'your-app.com',
        a: { label: 'Mobile experience', big: 'UX / UI', kw: 'prototyped', chips: ['Mock-ups', 'Prototype', 'Testing'] },
        b: { label: 'Mobile apps', big: '2 stores', sub: 'App Store and Google Play, from mock-up to release' } },
      { key: 'seo', name: 'SEO & GEO', short: 'SEO & GEO', url: 'google.com/search', query: 'your trade + your city', domain: 'your-company.ca',
        a: { label: 'Google rankings', big: 'Top 3', kw: 'for your keyword' },
        b: { label: 'GEO · generative AI', big: 'Cited', sub: 'by ChatGPT, Gemini and Perplexity' } },
      { key: 'ads', name: 'Digital marketing & ads', short: 'Paid ads', url: 'ads.dashboard', kpis: ['Reach', 'Clicks', 'Leads'],
        a: { label: 'Google & Meta campaigns', big: 'KPIs', kw: 'tracked continuously', chips: ['Reach', 'Leads', 'ROAS'] },
        b: { label: 'Multi-country targeting', big: 'CA · FR', sub: 'campaigns calibrated for each market' } },
      { key: 'social', name: 'Social media & content', short: 'Social', url: 'instagram.com/your-brand',
        a: { label: 'Short-form video', big: 'Reels', kw: '& TikTok', chips: ['Visuals', 'Video', 'Stories'] },
        b: { label: 'Social media & content', big: 'EN · FR', sub: 'content written for each audience' } }
    ] as Slide[]
  }
})

const slides = computed(() => t.value.slides)
const index = ref(0)
const slide = computed(() => slides.value[index.value]!)

// Défilement automatique : pause au survol, au clavier, sur demande ou si l'utilisateur préfère moins d'animations
const hover = ref(false)
const focus = ref(false)
const userPaused = ref(false)
const reducedMotion = ref(false)
const paused = computed(() => hover.value || focus.value || userPaused.value || reducedMotion.value)
const cycle = ref(0) // relance l'animation de la barre de progression
let timer: ReturnType<typeof setTimeout> | undefined

function schedule() {
  clearTimeout(timer)
  if (paused.value) return
  timer = setTimeout(() => go((index.value + 1) % slides.value.length), INTERVAL)
}
function go(i: number) {
  index.value = i
  cycle.value++
  schedule()
}
watch(paused, (p) => { if (p) clearTimeout(timer); else { cycle.value++; schedule() } })

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = mq.matches
  mq.addEventListener?.('change', e => { reducedMotion.value = e.matches })
  schedule()
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.hs { position: relative; height: 600px; --ease: cubic-bezier(.22, 1, .36, 1); }

/* Navigateur */
.hs__browser { position: absolute; top: 0; left: 40px; right: 0; height: 400px; background: var(--white); border: 1px solid var(--line); border-radius: 20px; box-shadow: 0 30px 60px -30px rgba(10, 26, 71, .25); display: flex; flex-direction: column; overflow: hidden; }
.hs__bar { display: flex; align-items: center; gap: 6px; padding: 14px 16px; border-bottom: 1px solid var(--line-soft); }
.hs__bar > span { width: 10px; height: 10px; border-radius: 99px; background: var(--line); }
.hs__bar em { margin-left: 16px; padding: 2px 12px; background: var(--surface-hover); border-radius: 6px; font-size: 12px; color: var(--muted-2); font-style: normal; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hs__screen { position: relative; flex-grow: 1; background: var(--accent-soft); overflow: hidden; }
.scr { position: absolute; inset: 0; padding: 30px 34px; }
.scr i, .scr b, .scr u { display: block; border-radius: 6px; }
.w70 { width: 70%; } .w50 { width: 50%; } .w40 { width: 40%; }

/* Écran : site web */
.web__nav { display: flex; align-items: center; gap: 12px; margin-bottom: 26px; }
.web__nav b { width: 70px; height: 14px; background: var(--ink); }
.web__nav i { width: 42px; height: 8px; background: var(--accent-tint-2); }
.web__nav u { margin-left: auto; width: 70px; height: 22px; border-radius: 99px; background: var(--accent); }
.web__hero { display: flex; flex-direction: column; gap: 10px; }
.web__hero i { height: 20px; background: var(--ink); animation: hs-grow-x .7s var(--ease) both; }
.web__hero i.w50 { animation-delay: .1s; }
.web__hero i.soft { height: 9px; background: var(--accent-tint-2); animation-delay: .2s; }
.web__cta { width: 120px; height: 32px; border-radius: 99px; background: var(--accent); margin-top: 6px; animation: hs-pop .5s var(--ease) .3s both; }
.web__cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 26px; }
.web__cards span { height: 66px; border-radius: 12px; background: var(--white); box-shadow: 0 8px 18px -12px rgba(10, 26, 71, .35); animation: hs-up .5s var(--ease) both; }

/* Écran : application métier (pipeline) */
.scr--app { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.kb { display: flex; flex-direction: column; gap: 8px; padding: 10px; border-radius: 12px; background: rgba(255, 255, 255, .55); }
.kb__h { font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: .6px; }
.kb__card { display: flex; flex-direction: column; gap: 6px; padding: 10px; border-radius: 10px; background: var(--white); box-shadow: 0 6px 14px -10px rgba(10, 26, 71, .4); animation: hs-drop .5s var(--ease) both; }
.kb__card i:first-child { height: 8px; width: 80%; background: var(--ink); }
.kb__card i:last-child { height: 6px; width: 55%; background: var(--accent-tint-2); }

/* Écran : application mobile */
.scr--mobile { display: flex; justify-content: center; padding-top: 22px; }
.phone { width: 150px; height: 300px; padding: 22px 12px 12px; border-radius: 26px; background: var(--white); border: 6px solid var(--ink); display: flex; flex-direction: column; gap: 9px; position: relative; animation: hs-up .6s var(--ease) both; }
.phone__notch { position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 46px; height: 7px; border-radius: 99px; background: var(--ink); }
.phone__head { display: flex; flex-direction: column; gap: 5px; }
.phone__head i { height: 8px; width: 70%; background: var(--ink); }
.phone__head i.w40 { height: 6px; width: 45%; background: var(--accent-tint-2); }
.phone__card { height: 62px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), var(--accent-mid)); }
.phone__row { display: flex; align-items: center; gap: 8px; animation: hs-up .45s var(--ease) both; }
.phone__row b { width: 22px; height: 22px; border-radius: 7px; background: var(--accent-tint); }
.phone__row i { flex: 1; height: 7px; background: var(--line-2); }
.phone__tab { margin-top: auto; display: flex; justify-content: space-around; padding-top: 8px; border-top: 1px solid var(--line-soft); }
.phone__tab i { width: 14px; height: 14px; border-radius: 5px; background: var(--accent-tint-2); }
.phone__tab i:first-child { background: var(--accent); }

/* Écran : SERP */
.serp__search { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-radius: 99px; background: var(--white); font-size: 13px; color: var(--muted); box-shadow: 0 6px 16px -12px rgba(10, 26, 71, .4); margin-bottom: 16px; }
.serp__search svg { color: var(--accent); }
.serp__res { display: flex; gap: 12px; align-items: flex-start; padding: 10px 12px; border-radius: 12px; margin-bottom: 8px; animation: hs-up .45s var(--ease) both; }
.serp__res > div { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.serp__res em { font-style: normal; font-size: 11px; font-weight: 600; color: var(--green); min-height: 13px; }
.serp__res i { height: 9px; width: 90%; background: var(--line-2); }
.serp__res i.w70 { height: 7px; width: 70%; }
.serp__pos { flex: none; width: 24px; height: 24px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; background: var(--white); color: var(--muted-2); }
.serp__res.is-you { background: var(--white); box-shadow: 0 10px 22px -14px rgba(10, 86, 216, .55); outline: 2px solid var(--accent); }
.serp__res.is-you .serp__pos { background: var(--accent); color: var(--white); }
.serp__res.is-you i:first-of-type { background: var(--accent); }

/* Écran : publicité */
.ads__kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; }
.ads__kpis span { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 12px; background: var(--white); animation: hs-up .45s var(--ease) both; }
.ads__kpis span:nth-child(2) { animation-delay: .1s; } .ads__kpis span:nth-child(3) { animation-delay: .2s; }
.ads__kpis small { font-size: 11px; font-weight: 600; color: var(--muted-2); }
.ads__kpis i { height: 12px; width: 70%; background: var(--ink); }
.ads__chart { width: 100%; height: 150px; }
.ads__line { fill: none; stroke: var(--accent); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 420; stroke-dashoffset: 420; animation: hs-draw 1.4s var(--ease) .2s forwards; vector-effect: non-scaling-stroke; }
.ads__area { fill: var(--accent-tint); opacity: 0; animation: hs-fade-in .8s ease .9s forwards; }

/* Écran : social */
.ig__head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.ig__avatar { width: 44px; height: 44px; border-radius: 99px; background: linear-gradient(135deg, var(--accent), #C27803); box-shadow: 0 0 0 3px var(--white); }
.ig__head div { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.ig__head i { height: 9px; width: 45%; background: var(--ink); }
.ig__head i.w50 { height: 7px; width: 30%; background: var(--accent-tint-2); }
.ig__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.ig__grid span { aspect-ratio: 1.9; border-radius: 10px; animation: hs-pop .45s var(--ease) both; }

/* Cartes flottantes */
.hs__float { position: absolute; padding: 22px; border-radius: 18px; display: flex; flex-direction: column; }
.hs__float--light { left: 0; bottom: 64px; width: 290px; gap: 10px; background: var(--white); border: 1px solid var(--line); box-shadow: 0 24px 48px -24px rgba(10, 26, 71, .3); animation: hs-bob 6s ease-in-out infinite; }
.hs__float--dark { right: 24px; bottom: 48px; width: 270px; gap: 6px; background: var(--ink); color: var(--white); animation: hs-bob 6s ease-in-out 1.5s infinite; }
.hs__label { font-size: 13px; color: var(--muted-2); font-weight: 500; }
.hs__float--dark .hs__label { color: var(--dark-muted-2); }
.hs__row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.hs__big { font-family: var(--font-display); font-size: 34px; font-weight: 800; line-height: 1.1; }
.hs__big--40 { font-size: 40px; letter-spacing: -1px; }
.hs__kw { font-size: 14px; color: var(--green); font-weight: 600; }
.hs__sub { font-size: 14px; color: var(--dark-muted); }
.hs__bars { display: flex; align-items: flex-end; gap: 6px; height: 48px; }
.hs__bars i { flex-grow: 1; border-radius: 4px; transform-origin: bottom; animation: hs-grow-y .6s var(--ease) both; }
.hs__bars i:nth-child(1), .hs__bars i:nth-child(2) { background: var(--accent-tint); }
.hs__bars i:nth-child(3) { background: var(--accent-tint-2); }
.hs__bars i:nth-child(4) { background: var(--accent-light); }
.hs__bars i:nth-child(5) { background: var(--accent-mid); }
.hs__bars i:nth-child(6) { background: var(--accent); }
.hs__chips { display: flex; flex-wrap: wrap; gap: 6px; }
.hs__chips span { display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 99px; background: #E6F4EC; color: var(--green); font-size: 12px; font-weight: 600; animation: hs-pop .4s var(--ease) both; }
.hs__chips span:nth-child(2) { animation-delay: .1s; } .hs__chips span:nth-child(3) { animation-delay: .2s; }

/* Navigation */
.hs__nav { position: absolute; left: 40px; right: 0; bottom: 0; display: flex; align-items: center; gap: 12px; }
.hs__tabs { flex: 1; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; }
.hs__tab { display: flex; flex-direction: column; gap: 6px; padding: 0; border: none; background: none; text-align: left; color: var(--muted-2); }
.hs__tab-name { font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .2s; }
.hs__tab:hover .hs__tab-name, .hs__tab.is-on .hs__tab-name { color: var(--ink); }
.hs__tab-bar { position: relative; height: 4px; border-radius: 99px; background: var(--line); overflow: hidden; }
.hs__tab-fill { position: absolute; inset: 0; transform-origin: left; transform: scaleX(0); background: var(--accent); border-radius: inherit; }
.hs__tab.is-on .hs__tab-fill { animation: hs-progress linear forwards; }
.is-paused .hs__tab.is-on .hs__tab-fill { animation-play-state: paused; }
.hs__pause { flex: none; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--line-3); border-radius: 99px; background: var(--white); color: var(--ink); }
.hs__pause:hover { background: var(--ink); color: var(--white); border-color: var(--ink); }

/* Transitions entre services */
.hs-screen-enter-active, .hs-screen-leave-active { transition: opacity .45s var(--ease), transform .45s var(--ease); }
.hs-screen-enter-from { opacity: 0; transform: translateX(36px); }
.hs-screen-leave-to { opacity: 0; transform: translateX(-36px); }
.hs-float-enter-active, .hs-float2-enter-active { transition: opacity .5s var(--ease) .12s, transform .5s var(--ease) .12s; }
.hs-float2-enter-active { transition-delay: .24s; }
.hs-float-leave-active, .hs-float2-leave-active { transition: opacity .25s ease, transform .25s ease; }
.hs-float-enter-from, .hs-float2-enter-from { opacity: 0; transform: translateY(18px) scale(.96); }
.hs-float-leave-to, .hs-float2-leave-to { opacity: 0; transform: translateY(-10px) scale(.98); }
.hs-fade-enter-active, .hs-fade-leave-active { transition: opacity .25s ease; }
.hs-fade-enter-from, .hs-fade-leave-to { opacity: 0; }

@keyframes hs-up { from { opacity: 0; transform: translateY(14px); } }
@keyframes hs-drop { from { opacity: 0; transform: translateY(-12px); } }
@keyframes hs-pop { from { opacity: 0; transform: scale(.85); } }
@keyframes hs-grow-x { from { transform: scaleX(0); transform-origin: left; } to { transform-origin: left; } }
@keyframes hs-grow-y { from { transform: scaleY(0); } }
@keyframes hs-draw { to { stroke-dashoffset: 0; } }
@keyframes hs-fade-in { to { opacity: .8; } }
@keyframes hs-bob { 50% { translate: 0 -6px; } } /* translate : n'interfère pas avec la transition d'entrée (transform) */
@keyframes hs-progress { to { transform: scaleX(1); } }

@media (prefers-reduced-motion: reduce) {
  .hs *, .hs *::before, .hs *::after { animation: none !important; transition: none !important; }
  .ads__line { stroke-dashoffset: 0; }
  .ads__area { opacity: .8; }
}
/* Mobile : navigateur compact, cartes côte à côte en dessous (sans chevauchement) */
@media (max-width: 720px) {
  .hs { height: 468px; }
  .hs__browser { left: 0; height: 262px; border-radius: 16px; }
  .hs__bar { padding: 10px 12px; }
  .scr { padding: 16px 18px; }
  .web__nav { margin-bottom: 16px; } .web__cards { margin-top: 16px; } .web__cards span { height: 44px; }
  .web__hero i { height: 14px; } .web__cta { width: 96px; height: 26px; }
  .scr--app { gap: 8px; } .kb { padding: 8px; gap: 6px; } .kb__card { padding: 7px; } .kb__h { font-size: 10px; }
  .scr--mobile { padding-top: 10px; } .phone { transform: scale(.72); transform-origin: top center; }
  .serp__search { margin-bottom: 10px; padding: 8px 14px; font-size: 12px; } .serp__res { padding: 7px 10px; margin-bottom: 4px; }
  .ads__kpis { margin-bottom: 8px; } .ads__kpis span { padding: 9px; } .ads__chart { height: 96px; }
  .ig__head { margin-bottom: 10px; } .ig__grid { gap: 6px; } .ig__grid span { aspect-ratio: 2.3; }
  .hs__float { padding: 14px; border-radius: 14px; bottom: 46px; }
  .hs__float--light { left: 0; width: calc(52% - 5px); gap: 8px; }
  .hs__float--dark { right: 0; width: calc(48% - 5px); }
  .hs__label { font-size: 11px; }
  .hs__big { font-size: 22px; } .hs__big--40 { font-size: 26px; letter-spacing: -.5px; }
  .hs__kw { font-size: 12px; } .hs__sub { font-size: 12px; line-height: 1.35; }
  .hs__bars { height: 30px; gap: 4px; }
  .hs__chips { gap: 4px; } .hs__chips span { padding: 3px 7px; font-size: 10px; }
  .hs__nav { left: 0; }
  .hs__tab-name { display: none; }
}
</style>
