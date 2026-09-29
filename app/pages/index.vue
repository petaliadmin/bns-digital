<template>
  <div class="home">
    <!-- TOP BAR -->
    <div class="topbar">
      <template v-for="(b, i) in t.topbar" :key="b"><span v-if="i" class="topbar__dot">·</span><span>{{ b }}</span></template>
    </div>

    <SiteHeader />

    <main id="contenu">
      <!-- HERO -->
      <section class="container hero">
        <div class="hero__text">
          <h1 class="hero__badge"><span class="hero__badge-dot" aria-hidden="true" />{{ t.hero.badge }}</h1>
          <p class="h1 hero__title">{{ t.hero.title }}</p>
          <p class="lead hero__lead">{{ t.hero.lead }}</p>
          <div class="hero__ctas">
            <NuxtLink :to="link.contact()" class="btn btn--primary">{{ t.hero.cta }} <IconArrow /></NuxtLink>
            <NuxtLink v-if="hasWork" :to="link.work()" class="btn btn--ghost">{{ t.hero.cta2 }}</NuxtLink>
            <NuxtLink v-else :to="link.booking()" class="btn btn--ghost">{{ t.hero.cta2Call }}</NuxtLink>
          </div>
          <ul class="hero__trust">
            <li v-for="x in t.hero.trust" :key="x"><IconCheck />{{ x }}</li>
          </ul>
        </div>
        <HeroShowcase class="hero__visual" />
      </section>

      <!-- LOGOS -->
      <TrustBar />

      <!-- SERVICES -->
      <section id="services" class="bg-white section--96">
        <div class="container">
          <div class="sec-head">
            <div class="sec-head__title">
              <div class="eyebrow">{{ t.services.eyebrow }}</div>
              <h2 class="h2">{{ t.services.h2 }}</h2>
            </div>
            <p class="text-18 sec-head__p">{{ t.services.p }}</p>
          </div>
          <div class="grid grid-3 svc-grid m-swipe">
            <NuxtLink v-for="sv in t.services.items" :key="sv.num" :to="sv.slug ? link.service(sv.slug) : link.contact()" class="svc" :class="`svc--${sv.theme}`">
              <div class="svc__top"><span class="svc__num">{{ sv.num }}</span><span class="svc__tag">{{ sv.tag }}</span></div>
              <h3 class="svc__title">{{ sv.title }}</h3>
              <p class="svc__desc">{{ sv.desc }}</p>
              <div class="svc__pills"><span v-for="i in sv.items" :key="i">{{ i }}</span></div>
              <span class="svc__cta">{{ sv.cta }} <IconArrow :size="16" /></span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- POURQUOI BNS DIGITAL : Dakar → France, Europe, Canada -->
      <section id="pourquoi" class="container section">
        <div class="sec-head">
          <div class="sec-head__title">
            <div class="eyebrow">{{ t.dakar.eyebrow }}</div>
            <h2 class="h2">{{ t.dakar.h2 }}</h2>
          </div>
          <p class="text-18 sec-head__p">{{ t.dakar.p }}</p>
        </div>
        <div class="grid grid-4 m-swipe">
          <div v-for="(it, i) in t.dakar.items" :key="it.t" class="card why">
            <span class="why__i"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="WHY_ICONS[i]" /></svg></span>
            <h3 class="why__t">{{ it.t }}</h3>
            <p class="why__d">{{ it.d }}</p>
          </div>
        </div>
        <dl class="clocks" :aria-label="t.dakar.clocksLabel">
          <div v-for="c in t.dakar.clocks" :key="c.tz" class="clock" :class="{ 'clock--us': c.tz === 'Africa/Dakar' }">
            <dt class="clock__city">{{ c.city }}</dt>
            <dd class="clock__time">{{ clock(c.tz) }}</dd>
            <dd class="clock__note">{{ c.note }}</dd>
          </div>
        </dl>
      </section>

      <!-- METHODE -->
      <section id="methode" class="bg-white section--96"><div class="container">
        <div class="center-head">
          <div class="eyebrow">{{ t.method.eyebrow }}</div>
          <h2 class="h2">{{ t.method.h2 }}</h2>
          <p class="text-18">{{ t.method.p }}</p>
        </div>
        <ol class="grid grid-4 steps m-swipe">
          <li v-for="st in t.method.steps" :key="st.n" class="card step">
            <div class="step__top"><span class="step__n">{{ st.n }}</span><span class="step__time">{{ st.time }}</span></div>
            <h3 class="step__title">{{ st.title }}</h3>
            <p class="step__desc">{{ st.desc }}</p>
          </li>
        </ol>
      </div></section>

      <!-- REALISATIONS -->
      <section v-if="hasWork" id="realisations" class="bg-dark section">
        <div class="container">
          <div class="sec-head">
            <div class="sec-head__title">
              <div class="eyebrow">{{ t.work.eyebrow }}</div>
              <h2 class="h2">{{ t.work.h2a }}<br>{{ t.work.h2b }}</h2>
            </div>
            <div v-if="workFilters.length > 2" class="filters" role="group" :aria-label="t.work.filterLabel">
              <button v-for="f in workFilters" :key="f.id" type="button" :aria-pressed="filter === f.id" :class="{ 'is-on': filter === f.id }" @click="filter = f.id">{{ f.label }}</button>
            </div>
          </div>
          <div class="grid grid-3 work m-swipe">
            <NuxtLink v-for="pr in shown" :key="pr.slug" :to="link.project(pr.slug)" class="work__card">
              <div class="work__visual" :style="{ background: pr.bg }">
                <img :src="thumb(pr.img)" :srcset="`${thumb(pr.img)} 800w, ${pr.img} 1600w`" sizes="(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 420px" :alt="`${t.work.alt} ${pr.client} — ${pr.title}`" class="work__img" loading="lazy" decoding="async" width="800" height="450">
                <span class="work__cat">{{ pr.cat }}</span>
              </div>
              <div class="work__body">
                <div class="work__sector">{{ pr.client }} · {{ pr.sector }}</div>
                <div class="work__title">{{ pr.title }}</div>
                <div class="work__foot"><span class="work__metric">{{ pr.metric }}</span><span class="work__more">{{ t.work.more }} →</span></div>
              </div>
            </NuxtLink>
          </div>
          <div class="work__all"><NuxtLink :to="link.work()" class="btn btn--outline-dark">{{ t.work.all }}</NuxtLink></div>
        </div>
      </section>

      <!-- COMPARATIF -->
      <section class="container section">
        <div class="center-head">
          <div class="eyebrow">{{ t.compare.eyebrow }}</div>
          <h2 class="h2 compare__h">{{ t.compare.h2 }}</h2>
        </div>
        <p class="compare__hint" aria-hidden="true">{{ t.compare.hint }} →</p>
        <div class="compare-wrap">
          <table class="compare">
            <caption class="sr-only">{{ t.compare.caption }}</caption>
            <thead>
              <tr>
                <td />
                <th scope="col" class="compare__us"><img src="/icon-192.png" alt="" width="28" height="28" class="compare__k">BNS Digital</th>
                <th v-for="h in t.compare.cols" :key="h" scope="col">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in t.compare.rows" :key="r.label">
                <th scope="row">{{ r.label }}</th>
                <td v-for="(c, i) in r.cells" :key="i" :class="{ 'compare__hi': i === 0 }">
                  <span class="compare__cell">
                    <IconCheck v-if="c[0] === 'y'" :size="18" />
                    <svg v-else-if="c[0] === 'n'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B42318" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                    <span v-if="c[0] === 'y' && !c[1]" class="sr-only">{{ t.compare.yes }}</span>
                    <span v-if="c[0] === 'n' && !c[1]" class="sr-only">{{ t.compare.no }}</span>
                    <span>{{ c[1] }}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- TEMOIGNAGES -->
      <section v-if="hasReviews" id="avis" class="bg-white section--96">
        <div class="container">
          <div class="sec-head">
            <div class="sec-head__title">
              <div class="eyebrow">{{ t.reviews.eyebrow }}</div>
              <h2 class="h2">{{ t.reviews.h2 }}</h2>
            </div>
            <a :href="GOOGLE_REVIEWS_URL || undefined" target="_blank" rel="noopener" class="rating">
              <svg class="rating__g" width="28" height="28" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2.1 5.1-4.4 6.7v5.6h7.1c4.2-3.8 6.6-9.5 6.6-16.3z" /><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.3-9H4.4v5.7C8 41.1 15.4 46 24 46z" /><path fill="#FBBC05" d="M11.7 28.3c-.4-1.3-.7-2.8-.7-4.3s.3-3 .7-4.3V14H4.4C2.9 17 2 20.4 2 24s.9 7 2.4 10z" /><path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8 6.9 4.4 14l7.3 5.7c1.8-5.2 6.6-9 12.3-9z" /></svg>
              <span class="rating__v">{{ en ? REVIEWS_AVG.toFixed(1) : REVIEWS_AVG.toFixed(1).replace('.', ',') }}</span>
              <span class="rating__t">
                <span class="review__stars" :aria-label="`${REVIEWS_AVG} ${t.reviews.stars}`"><svg v-for="n in 5" :key="n" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="STAR" /></svg></span>
                <span>{{ REVIEWS.length }} {{ t.reviews.count }} · <u>{{ t.reviews.see }}</u></span>
              </span>
            </a>
          </div>
          <ReviewCarousel :reviews="REVIEWS" />
        </div>
      </section>

      <!-- RESERVER UN APPEL -->
      <section id="rendez-vous" class="container section book">
        <div class="book__intro">
          <div class="eyebrow">{{ t.booking.eyebrow }}</div>
          <h2 class="h2">{{ t.booking.h2 }}</h2>
          <p class="text-18">{{ t.booking.lead }}</p>
          <ul class="book__facts">
            <li v-for="(f, i) in t.booking.facts" :key="f.t">
              <span class="book__fi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="BOOK_ICONS[i]" /></svg></span>
              <span><strong>{{ f.t }}</strong>{{ f.d }}</span>
            </li>
          </ul>
        </div>
        <BookingCalendar />
      </section>

      <!-- FAQ -->
      <section id="ressources" class="container section faq-sec">
        <div class="faq-sec__head">
          <div class="eyebrow">FAQ</div>
          <h2 class="h2">{{ t.faq.h2 }}</h2>
          <p class="faq-sec__p">{{ t.faq.p }}</p>
          <NuxtLink :to="link.contact()" class="btn btn--ghost btn--sm">{{ t.faq.cta }}</NuxtLink>
        </div>
        <FaqList :items="t.faq.items" numbered class="faq-sec__list" />
      </section>

      <!-- CTA + FORM -->
      <section id="contact" class="container final">
        <div class="final__box">
          <div class="final__text">
            <h2 class="final__h">{{ t.final.h2 }}</h2>
            <p class="final__p">{{ t.final.p }}</p>
            <ul class="final__list">
              <li v-for="x in t.final.list" :key="x"><IconCheck :size="18" color="#FFFFFF" />{{ x }}</li>
            </ul>
            <NuxtLink to="#rendez-vous" class="final__call">{{ t.final.call }} →</NuxtLink>
          </div>
          <form class="final__form" @submit.prevent="submit">
            <div class="final__row">
              <label>{{ t.form.name }}<input v-model="form.name" type="text" autocomplete="name" :placeholder="t.form.namePh" required></label>
              <label>{{ t.form.company }}<input v-model="form.company" type="text" autocomplete="organization" :placeholder="t.form.companyPh"></label>
            </div>
            <label>{{ t.form.email }}<input v-model="form.email" type="email" autocomplete="email" :placeholder="t.form.emailPh" required></label>
            <fieldset class="final__needs">
              <legend>{{ t.form.need }}</legend>
              <div><button v-for="(n, i) in t.form.needs" :key="n" type="button" :aria-pressed="need === i" :class="{ 'is-on': need === i }" @click="need = i">{{ n }}</button></div>
            </fieldset>
            <label>{{ t.form.msg }}<textarea v-model="form.msg" rows="3" :placeholder="t.form.msgPh" /></label>
            <button type="submit" class="final__submit">{{ sent ? t.form.sent : sending ? t.form.sending : t.form.submit }}</button>
            <span class="final__note">{{ t.form.note }}</span>
          </form>
        </div>
      </section>
    </main>

    <!-- FOOTER (version accueil) -->
    <footer class="hfoot">
      <div class="container hfoot__inner">
        <div class="hfoot__grid">
          <div class="hfoot__brand">
            <SiteLogo light />
            <p>{{ t.footer.desc }}</p>
            <address>{{ CONTACT.address }}<br><a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a></address>
          </div>
          <div v-for="col in footerCols" :key="col.title" class="hfoot__col">
            <div class="hfoot__title">{{ col.title }}</div>
            <NuxtLink v-for="[l, to] in col.links" :key="l" :to="to">{{ l }}</NuxtLink>
          </div>
        </div>
        <div class="hfoot__tags">
          <div><span>{{ t.footer.local }}</span><NuxtLink v-for="[label, to] in footerLocal" :key="label" :to="to" class="hfoot__pill">{{ label }}</NuxtLink></div>
        </div>
        <div class="hfoot__bottom">
          <span>© 2026 BNS Digital · Dakar, Sénégal</span>
          <div><NuxtLink :to="link.legal()">{{ t.footer.legal }}</NuxtLink><NuxtLink :to="link.legal('#article-7')">{{ t.footer.privacy }}</NuxtLink><NuxtLink :to="link.terms()">{{ t.footer.terms }}</NuxtLink></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { CONTACT, REVIEWS, REVIEWS_AVG, GOOGLE_REVIEWS_URL, PROJECTS, organizationSchema, thumb } from '~/data/content'
import { HOME } from '~/data/home'
definePageMeta({ layout: false })

const { en, locale, link, hasWork, hasReviews, footerCols, footerLocal } = useSite()
const site = useRuntimeConfig().public.siteUrl as string
const STAR = 'M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z'
const BOOK_ICONS = [
  'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  'M3 7h12v10H3zM15 10l6-3v10l-6-3',
  'M9 12l2 2 4-4M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z'
]
const WHY_ICONS = [
  'M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z',
  'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  'M4 5h16v11H8l-4 4zM8 9h8M8 12h5',
  'M16 11a4 4 0 1 0-8 0M12 3a4 4 0 1 1 0 8M4 21c0-4 3.6-6 8-6s8 2 8 6'
]
const t = useLocaleText(HOME)

// Horloges des marchés : calculées côté client uniquement (pas d'écart d'hydratation), rafraîchies toutes les 30 s
const now = ref<Date | null>(null)
let tick: ReturnType<typeof setInterval> | undefined
onMounted(() => { now.value = new Date(); tick = setInterval(() => { now.value = new Date() }, 30000) })
onBeforeUnmount(() => clearInterval(tick))
const clock = (timeZone: string) => (now.value
  ? new Intl.DateTimeFormat(en.value ? 'en-GB' : 'fr-FR', { hour: '2-digit', minute: '2-digit', timeZone }).format(now.value)
  : '--:--')

usePageSeo({ title: () => t.value.seo.title, description: () => t.value.seo.desc })
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: () => {
      const url = en.value ? `${site}/en` : `${site}/`
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          organizationSchema(site, en.value ? 'en' : 'fr'),
          { '@type': 'WebSite', '@id': `${site}/#website`, url: `${site}/`, name: 'BNS Digital', inLanguage: ['fr', 'en'], publisher: { '@id': `${site}/#organization` } },
          { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: t.value.seo.title, isPartOf: { '@id': `${site}/#website` }, about: { '@id': `${site}/#organization` }, inLanguage: en.value ? 'en' : 'fr' }
        ]
      })
    }
  }]
})

// Réalisations mises en avant : les 12 premières de content.ts ; textes courts propres à l'accueil si définis dans home.ts
const catShort = computed(() => (en.value ? { Web: 'Web', ADS: 'Ads', Social: 'Social' } : { Web: 'Web', ADS: 'ADS', Social: 'Social' }))
const filter = ref('all')
const workFilters = computed(() => t.value.work.filters.filter(f => f.id === 'all' || PROJECTS.some(p => p.cat === f.id)))
const shown = computed(() => PROJECTS.slice(0, 12)
  .map((pr) => {
    const txt = t.value.work.items[pr.slug] ?? { client: pr.client, sector: pr.label, title: pr.label, metric: pr.metric.startsWith('[') ? '' : pr.metric }
    return { ...txt, slug: pr.slug, img: pr.img, bg: pr.bg, cat: catShort.value[pr.cat], type: pr.cat }
  })
  .filter(x => filter.value === 'all' || x.type === filter.value)
  .slice(0, 6))

const need = ref(0)
const form = reactive({ name: '', company: '', email: '', msg: '' })
const sent = ref(false)
const sending = ref(false)
const config = useRuntimeConfig()
async function submit() {
  const endpoint = config.public.formEndpoint as string
  if (!endpoint) { await navigateTo(link.contact()); return } // aucun service branché : on redirige vers le formulaire complet
  sending.value = true
  try { await $fetch(endpoint, { method: 'POST', body: { ...form, need: t.value.form.needs[need.value], locale: locale.value } }); sent.value = true }
  catch { await navigateTo(link.contact()) }
  finally { sending.value = false }
}
</script>

<style scoped>
/* Top bar */
.topbar { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px 32px; padding: 10px 20px; background: var(--ink); color: var(--dark-muted); font-size: 13px; }
.topbar__dot { color: var(--muted-2); }

/* Hero */
.hero { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 64px; padding-top: 96px; padding-bottom: 88px; align-items: center; }
.hero__text { display: flex; flex-direction: column; gap: 28px; }
.hero__badge { display: inline-flex; align-items: center; gap: 10px; align-self: flex-start; padding: 8px 14px; background: var(--white); border: 1px solid var(--line); border-radius: 999px; font-family: var(--font-body); font-size: 14px; font-weight: 500; letter-spacing: 0; line-height: 1.4; }
.hero__title { font-family: var(--font-display); }
.hero__badge-dot { width: 8px; height: 8px; border-radius: 99px; background: var(--accent); }
.hero__lead { max-width: 560px; }
.hero__ctas { display: flex; gap: 14px; flex-wrap: wrap; }
.hero__trust { list-style: none; padding: 8px 0 0; margin: 0; display: flex; flex-wrap: wrap; gap: 12px 28px; font-size: 14px; color: var(--muted); }
.hero__trust li { display: flex; align-items: center; gap: 8px; }
.hero__visual { position: relative; }


/* Section heads */
.sec-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 48px; margin-bottom: 48px; }
.sec-head__title { display: flex; flex-direction: column; gap: 16px; max-width: 720px; }
.sec-head__p { max-width: 420px; }
.center-head { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; margin-bottom: 56px; }
.center-head .text-18 { max-width: 620px; }

/* Services */
.svc { display: flex; flex-direction: column; gap: 18px; padding: 32px; min-height: 330px; border: 1px solid var(--line); border-radius: 20px; transition: transform .2s ease; }
.svc:hover { transform: translateY(-3px); }
.svc--dark { background: var(--ink); color: var(--white); } .svc--dark:hover { color: var(--white); }
.svc--light { background: var(--bg); color: var(--ink); } .svc--light:hover { color: var(--ink); }
.svc--soft { background: var(--accent-soft); color: var(--ink); } .svc--soft:hover { color: var(--ink); }
.svc__top { display: flex; justify-content: space-between; align-items: center; }
.svc__num { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 14px; font-family: var(--font-display); font-weight: 800; font-size: 18px; background: var(--white); color: var(--ink); }
.svc--dark .svc__num, .svc--soft .svc__num { background: var(--accent); color: var(--white); }
.svc__tag { font-size: 13px; font-weight: 600; padding: 6px 12px; border-radius: 999px; border: 1px solid var(--line-2); }
.svc--dark .svc__tag { border-color: var(--dark-line-2); }
.svc--soft .svc__tag { border-color: var(--accent-tint-2); }
.svc__title { font-size: 28px; line-height: 1.15; letter-spacing: -.6px; font-weight: 700; }
.svc__desc { font-size: 16px; line-height: 1.55; color: var(--muted); }
.svc--dark .svc__desc { color: var(--dark-muted); }
.svc__pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
.svc__pills span { font-size: 13px; padding: 6px 10px; border-radius: 8px; background: var(--white); }
.svc--dark .svc__pills span { background: var(--dark-2); }
.svc__cta { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; }

/* Pourquoi BNS Digital */
.why { display: flex; flex-direction: column; gap: 14px; padding: 28px; min-height: 260px; }
.why__i { width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; background: var(--accent-soft); color: var(--accent); }
.why__t { font-size: 21px; line-height: 1.2; letter-spacing: -.3px; font-weight: 700; }
.why__d { font-size: 15px; line-height: 1.6; color: var(--muted); }
.clocks { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 24px 0 0; }
.clock { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 4px 16px; padding: 20px 24px; border: 1px solid var(--line); border-radius: 16px; background: var(--white); }
.clock--us { background: var(--ink); border-color: var(--ink); color: var(--white); }
.clock__city { font-size: 14px; font-weight: 600; }
.clock__time { grid-row: span 2; grid-column: 2; grid-row-start: 1; margin: 0; font-family: var(--font-display); font-size: 34px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--accent); }
.clock--us .clock__time { color: var(--accent-light); }
.clock__note { margin: 0; font-size: 13px; color: var(--muted-2); }
.clock--us .clock__note { color: var(--dark-muted-2); }

/* Steps */
.steps { list-style: none; margin: 0; padding: 0; }
.step { display: flex; flex-direction: column; gap: 16px; padding: 32px 28px; min-height: 280px; background: var(--bg); }
.step__top { display: flex; align-items: center; gap: 12px; }
.step__n { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 99px; background: var(--ink); color: var(--white); font-weight: 600; }
.step__time { font-size: 13px; font-weight: 600; color: var(--muted-2); }
.step__title { font-size: 24px; letter-spacing: -.4px; font-weight: 700; }
.step__desc { font-size: 16px; line-height: 1.55; color: var(--muted); }

/* Work */
.filters { display: flex; gap: 8px; padding: 6px; background: var(--dark-2); border-radius: 999px; flex-wrap: wrap; }
.filters button { padding: 10px 18px; border: none; border-radius: 999px; font-size: 14px; font-weight: 600; background: transparent; color: var(--dark-muted); }
.filters button.is-on { background: var(--white); color: var(--ink); }
.work { margin-top: 40px; }
/* Visuel en haut, bas de carte sur fond sombre, détaché de la section par une bordure */
.work__card { display: flex; flex-direction: column; background: var(--dark-2); color: var(--white); border: 1px solid var(--dark-line); border-radius: 20px; overflow: hidden; transition: transform .2s ease, border-color .2s ease; }
.work__card:hover { color: var(--white); transform: translateY(-3px); border-color: var(--dark-line-2); }
.work__visual { position: relative; aspect-ratio: 16 / 9; overflow: hidden; }
.work__img { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform .4s ease; }
.work__card:hover .work__img { transform: scale(1.04); }
.work__cat { position: absolute; left: 16px; top: 16px; font-size: 12px; font-weight: 600; padding: 5px 10px; border-radius: 999px; background: var(--white); color: var(--ink); box-shadow: 0 4px 12px -4px rgba(10, 26, 71, .3); }
.work__body { display: flex; flex-direction: column; flex-grow: 1; gap: 8px; padding: 22px 24px 24px; }
.work__sector { font-size: 13px; color: var(--dark-muted-2); font-weight: 500; }
.work__title { font-size: 18px; font-weight: 600; line-height: 1.35; }
.work__foot { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--dark-line-2); margin-top: auto; }
.work__metric { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--accent-light); }
.work__more { font-size: 14px; font-weight: 600; }
.work__card:hover .work__more { color: var(--accent-light); }
.work__all { display: flex; justify-content: center; margin-top: 40px; }

/* Compare */
.compare__h { max-width: 900px; }
.compare-wrap { position: relative; overflow-x: auto; background: var(--white); border: 1px solid var(--line); border-radius: 24px; }
.compare { width: 100%; min-width: 900px; border-collapse: collapse; table-layout: fixed; font-size: 15px; }
.compare thead th, .compare thead td { padding: 22px 28px; font-weight: 600; text-align: left; border-bottom: 1px solid var(--line); }
.compare__us { background: var(--ink); color: var(--white); }
.compare__k { display: inline-block; width: 28px; height: 28px; margin-right: 10px; vertical-align: middle; }
.compare tbody th { padding: 20px 28px; font-weight: 500; text-align: left; }
.compare tbody td { padding: 20px 28px; color: var(--muted); }
.compare tbody tr { border-bottom: 1px solid var(--line-soft); }
.compare tbody tr:last-child { border-bottom: none; }
.compare__hi { background: var(--accent-soft); color: var(--ink) !important; font-weight: 600; }
.compare__cell { display: flex; align-items: center; gap: 10px; }
.compare__hint { display: none; }

/* Reviews */
.rating { display: flex; align-items: center; gap: 14px; padding: 14px 20px; border: 1px solid var(--line); border-radius: 16px; background: var(--white); color: var(--ink); transition: border-color .15s, box-shadow .15s; }
.rating:hover { color: var(--ink); border-color: var(--line-3); box-shadow: 0 12px 24px -16px rgba(10, 26, 71, .3); }
.rating__v { font-family: var(--font-display); font-size: 32px; font-weight: 800; }
.rating__t { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--muted); }
.rating__t u { text-underline-offset: 2px; }
.review__stars { display: flex; gap: 4px; color: #C27803; }

/* Booking */
.book { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 56px; align-items: start; }
.book__intro { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 110px; }
.book__facts { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
.book__facts li { display: flex; align-items: center; gap: 14px; font-size: 16px; color: var(--muted); }
.book__facts strong { color: var(--ink); font-weight: 600; }
.book__fi { flex: none; width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; background: var(--accent-soft); color: var(--accent); }

/* FAQ */
.faq-sec { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 64px; }
.faq-sec__head { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
.faq-sec__p { font-size: 17px; line-height: 1.55; color: var(--muted); }
.faq-sec__head .btn { margin-top: 8px; }
.faq-sec__list { grid-column: span 2; }

/* Final CTA */
.final { padding-bottom: 112px; }
.final__box { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 64px; padding: 72px; border-radius: 32px; background: var(--accent); color: var(--white); }
.final__text { display: flex; flex-direction: column; gap: 24px; }
.final__h { font-size: 60px; line-height: 1.02; letter-spacing: -2px; font-weight: 800; }
.final__p { font-size: 19px; line-height: 1.55; color: var(--accent-soft); max-width: 480px; }
.final__list { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px; font-size: 16px; }
.final__list li { display: flex; align-items: center; gap: 10px; }
.final__call { align-self: flex-start; margin-top: 12px; padding: 16px 24px; border: 1px solid rgba(255,255,255,.5); border-radius: 999px; color: var(--white); font-weight: 600; }
.final__call:hover { color: var(--white); background: rgba(255,255,255,.1); }
.final__form { display: flex; flex-direction: column; gap: 16px; padding: 32px; background: var(--white); color: var(--ink); border-radius: 20px; }
.final__row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.final__form label, .final__needs legend { display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 500; }
.final__form input, .final__form textarea { padding: 14px; border: 1px solid var(--line-2); border-radius: 10px; font-size: 15px; font-family: inherit; resize: none; color: var(--ink); }
.final__needs { border: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.final__needs legend { margin-bottom: 8px; }
.final__needs div { display: flex; flex-wrap: wrap; gap: 8px; }
.final__needs button { padding: 9px 14px; border-radius: 999px; font-size: 14px; font-weight: 500; background: var(--white); color: var(--ink); border: 1px solid var(--line-2); }
.final__needs button.is-on { background: var(--ink); color: var(--white); border-color: var(--ink); }
.final__submit { padding: 18px; background: var(--ink); color: var(--white); border: none; border-radius: 999px; font-size: 16px; font-weight: 600; }
.final__submit:hover { background: var(--ink-hover); }
.final__note { font-size: 12px; color: var(--muted-2); text-align: center; }

/* Footer home */
.hfoot { background: var(--ink); color: var(--dark-muted); }
.hfoot__inner { display: flex; flex-direction: column; gap: 56px; padding-top: 80px; padding-bottom: 40px; }
.hfoot__grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 32px; }
.hfoot__brand { grid-column: span 2; display: flex; flex-direction: column; gap: 18px; padding-right: 40px; }
.hfoot__brand p { font-size: 15px; line-height: 1.6; color: var(--dark-muted-2); }
.hfoot__brand address { font-style: normal; font-size: 15px; line-height: 1.7; }
.hfoot__brand address a { color: var(--white); }
.hfoot__col { display: flex; flex-direction: column; gap: 12px; font-size: 14px; }
.hfoot__col a, .hfoot__pill { color: var(--dark-muted-2); }
.hfoot__col a:hover, .hfoot__pill:hover, .hfoot__bottom a:hover { color: var(--white); }
.hfoot__title { font-weight: 600; color: var(--white); font-size: 15px; margin-bottom: 4px; }
.hfoot__tags { display: flex; flex-direction: column; gap: 14px; padding-top: 32px; border-top: 1px solid var(--dark-line); }
.hfoot__tags > div { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; font-size: 13px; }
.hfoot__tags > div > span { color: var(--white); font-weight: 600; width: 190px; }
.hfoot__pill { padding: 5px 10px; border: 1px solid var(--dark-line); border-radius: 999px; }
.hfoot__bottom { display: flex; justify-content: space-between; gap: 16px; font-size: 13px; color: var(--dark-muted-3); padding-top: 24px; border-top: 1px solid var(--dark-line); }
.hfoot__bottom > div { display: flex; gap: 24px; flex-wrap: wrap; }
.hfoot__bottom a { color: var(--dark-muted-3); }

/* Responsive */
@media (max-width: 1180px) {
  .hero { grid-template-columns: minmax(0, 1fr); padding-top: 64px; }
  .hero__visual { max-width: 640px; width: 100%; }
  .sec-head { flex-direction: column; align-items: flex-start; }
  .book { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .book__intro { position: static; }
  .faq-sec { grid-template-columns: minmax(0, 1fr); gap: 40px; }
  .clocks { grid-template-columns: minmax(0, 1fr); }
  .faq-sec__list { grid-column: auto; }
  .final__box { grid-template-columns: minmax(0, 1fr); padding: 56px 40px; }
  .hfoot__grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .hfoot__brand { grid-column: span 4; padding-right: 0; }
}
/* Mobile */
@media (max-width: 720px) {
  /* Barre du haut sur une ligne : on garde les deux arguments principaux */
  .topbar { flex-wrap: nowrap; gap: 10px; font-size: 12px; padding: 9px 12px; }
  .topbar > span:nth-last-child(-n + 2) { display: none; }
  /* Filtres : une rangée qui se fait glisser */
  .filters { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; max-width: 100%; }
  .filters::-webkit-scrollbar { display: none; }
  .filters button { flex: none; white-space: nowrap; padding: 9px 14px; }
  /* Tableau comparatif : colonne des critères figée, indication de défilement */
  .compare__hint { display: block; margin: -8px 0 10px; font-size: 13px; font-weight: 600; color: var(--accent); text-align: right; }
  .compare { min-width: 620px; font-size: 14px; }
  .compare thead th, .compare thead td, .compare tbody th, .compare tbody td { padding: 14px 14px; }
  .compare tbody th, .compare thead td { position: sticky; left: 0; z-index: 1; width: 132px; background: var(--white); box-shadow: 1px 0 0 var(--line-soft); }
}
@media (max-width: 720px) {
  .final__h { font-size: 40px; }
  .final__box { padding: 40px 22px; }
  .final__row { grid-template-columns: minmax(0, 1fr); }
  .hfoot__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hfoot__brand { grid-column: span 2; }
  .hfoot__tags > div > span { width: 100%; }
  .hfoot__bottom { flex-direction: column; }
}
</style>
