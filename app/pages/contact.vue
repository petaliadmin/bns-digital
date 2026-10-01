<template>
  <section class="container contact">
    <div class="contact__intro">
      <div class="eyebrow">{{ t.eyebrow }}</div>
      <h1 class="contact__h1">{{ t.h1 }}</h1>
      <p class="contact__lead">{{ t.lead }}</p>
      <dl class="contact__info">
        <div><dt>{{ t.email }}</dt><dd><a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a></dd></div>
        <div v-if="!CONTACT.phone.startsWith('[')"><dt>{{ t.phone }}</dt><dd>{{ CONTACT.phone }}</dd></div>
        <div><dt>{{ t.address }}</dt><dd>{{ CONTACT.address }}</dd></div>
      </dl>
    </div>

    <form class="wizard" novalidate @submit.prevent="onNext">
      <div class="wizard__bars" aria-hidden="true"><i v-for="i in 3" :key="i" :class="{ 'is-on': i <= step }" /></div>
      <span class="wizard__step" aria-live="polite">{{ step < 4 ? `${t.step} ${step} ${t.of} 3` : t.sentShort }}</span>

      <!-- Étape 1 -->
      <fieldset v-if="step === 1" class="wizard__panel">
        <legend class="wizard__h">{{ t.s1 }}</legend>
        <span class="wizard__hint">{{ t.s1hint }}</span>
        <div class="svc-grid">
          <button v-for="s in t.services" :key="s.id" type="button" class="svc" :class="{ 'is-on': data.services.includes(s.id) }" :aria-pressed="data.services.includes(s.id)" @click="toggle(s.id)">
            <span class="svc__t">{{ s.t }}</span><span class="svc__d">{{ s.d }}</span>
          </button>
        </div>
        <p v-if="error" class="wizard__error" role="alert">{{ error }}</p>
      </fieldset>

      <!-- Étape 2 -->
      <div v-else-if="step === 2" class="wizard__panel">
        <h2 class="wizard__h">{{ t.s2 }}</h2>
        <fieldset class="chips"><legend>{{ t.budget }}</legend>
          <div><button v-for="b in t.budgets" :key="b" type="button" :class="{ 'is-on': data.budget === b }" :aria-pressed="data.budget === b" @click="data.budget = b">{{ b }}</button></div>
        </fieldset>
        <fieldset class="chips"><legend>{{ t.timing }}</legend>
          <div><button v-for="tm in t.timings" :key="tm" type="button" :class="{ 'is-on': data.timing === tm }" :aria-pressed="data.timing === tm" @click="data.timing = tm">{{ tm }}</button></div>
        </fieldset>
        <label class="field">{{ t.msg }}<textarea v-model="data.message" rows="5" :placeholder="t.msgPh" /></label>
      </div>

      <!-- Étape 3 -->
      <div v-else-if="step === 3" class="wizard__panel">
        <h2 class="wizard__h">{{ t.s3 }}</h2>
        <div class="fields">
          <label class="field">{{ t.name }}<input v-model="data.name" type="text" autocomplete="name" required></label>
          <label class="field">{{ t.company }}<input v-model="data.company" type="text" autocomplete="organization"></label>
          <label class="field">{{ t.email }}<input v-model="data.email" type="email" autocomplete="email" required></label>
          <label class="field">{{ t.phone }}<input v-model="data.phone" type="tel" autocomplete="tel"></label>
        </div>
        <label class="field">{{ t.website }}<input v-model="data.website" type="url" placeholder="https://"></label>
        <!-- Champ piège : invisible pour les humains -->
        <label class="hp" aria-hidden="true">Fax<input v-model="data.hp" type="text" tabindex="-1" autocomplete="off"></label>
        <label class="consent"><input v-model="data.consent" type="checkbox"><span>{{ t.consent }} <NuxtLink :to="link.legal('#article-7')" target="_blank">{{ t.privacy }}</NuxtLink>.</span></label>
        <p v-if="error" class="wizard__error" role="alert">{{ error }}</p>
      </div>

      <!-- Confirmation -->
      <div v-else class="wizard__panel wizard__done">
        <span class="done__icon"><IconCheck :size="30" /></span>
        <h2 class="wizard__h wizard__h--38">{{ t.doneH }}</h2>
        <p class="done__p">{{ t.doneP }}</p>
        <NuxtLink :to="hasWork ? link.work() : link.services()" class="btn btn--ghost btn--sm">{{ hasWork ? t.doneCta : t.doneSvc }}</NuxtLink>
      </div>

      <div v-if="step < 4" class="wizard__nav">
        <button type="button" class="wizard__back" :disabled="step === 1" @click="step--">← {{ t.back }}</button>
        <button type="submit" class="btn btn--primary wizard__next" :disabled="sending">{{ step === 3 ? (sending ? t.sending : t.send) : `${t.next} →` }}</button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { CONTACT, organizationSchema } from '~/data/content'

const { en, locale, link, hasWork } = useSite()
const t = useLocaleText({
  fr: {
    title: 'Contact & devis gratuit sous 48 h', desc: 'Contactez BNS Digital, agence digitale basée à Dakar pour la France, l’Europe et le Canada : site web, application, SEO ou publicité. Devis gratuit sous 48 h.',
    eyebrow: 'Contact & devis', h1: 'Parlons de votre prochain projet.', lead: 'Décrivez-nous votre besoin en quelques étapes : nous revenons vers vous avec une recommandation claire et un devis personnalisé.',
    email: 'E-mail', phone: 'Téléphone', address: 'Adresse', step: 'Étape', of: 'sur', sentShort: 'Demande envoyée',
    s1: 'De quoi avez-vous besoin ?', s1hint: 'Plusieurs choix possibles.',
    services: [
      { id: 'web', t: 'Site web', d: 'Vitrine, blog, landing, e-commerce' }, { id: 'app', t: 'Application métier', d: 'CRM, back-office, portail' },
      { id: 'seo', t: 'SEO & GEO', d: 'Google et IA génératives' }, { id: 'mobile', t: 'Application mobile', d: 'iOS et Android' },
      { id: 'ads', t: 'Marketing & ADS', d: 'Campagnes d’acquisition' }, { id: 'social', t: 'Social media', d: 'Visuel et vidéo' }
    ],
    s2: 'Parlez-nous de votre projet.', budget: 'Budget indicatif', budgets: ['< 5 k€', '5 – 15 k€', '15 – 50 k€', '> 50 k€', 'À définir'],
    timing: 'Échéance souhaitée', timings: ['Dès que possible', 'Sous 3 mois', 'Sous 6 mois', 'Pas de contrainte'],
    msg: 'Votre projet en quelques mots', msgPh: 'Objectifs, contexte, site actuel…',
    s3: 'Comment vous joindre ?', name: 'Prénom et nom', company: 'Entreprise', website: 'Site web actuel (facultatif)',
    consent: 'J’accepte que mes données soient utilisées pour traiter ma demande, conformément à la', privacy: 'politique de confidentialité',
    doneH: 'Merci, votre demande est envoyée.', doneP: 'Notre équipe étudie votre projet et revient vers vous sous 48 h ouvrées avec une recommandation et un devis personnalisé.', doneCta: 'Découvrir nos réalisations', doneSvc: 'Découvrir nos expertises',
    back: 'Retour', next: 'Continuer', send: 'Envoyer ma demande', sending: 'Envoi…',
    errNeed: 'Sélectionnez au moins un besoin.', errId: 'Merci d’indiquer votre nom et une adresse e-mail valide.', errConsent: 'Merci d’accepter l’utilisation de vos données pour traiter votre demande.', errSend: 'L’envoi a échoué. Vous pouvez nous écrire directement à'
  },
  en: {
    title: 'Contact us: free quote within 48 hours', desc: 'Contact BNS Digital, a Dakar-based digital agency serving Canada and Europe: websites, software, SEO or paid ads. Free quote within 48 hours.',
    eyebrow: 'Contact & quote', h1: 'Let’s talk about your next project.', lead: 'Describe what you need in a few steps: we’ll come back to you with a clear recommendation and a tailored quote.',
    email: 'Email', phone: 'Phone', address: 'Address', step: 'Step', of: 'of', sentShort: 'Request sent',
    s1: 'What do you need?', s1hint: 'You can select several options.',
    services: [
      { id: 'web', t: 'Website', d: 'Showcase, blog, landing page, e-commerce' }, { id: 'app', t: 'Business software', d: 'CRM, back office, portal' },
      { id: 'seo', t: 'SEO & GEO', d: 'Google and generative AI' }, { id: 'mobile', t: 'Mobile app', d: 'iOS and Android' },
      { id: 'ads', t: 'Marketing & ads', d: 'Acquisition campaigns' }, { id: 'social', t: 'Social media', d: 'Visuals and video' }
    ],
    s2: 'Tell us about your project.', budget: 'Indicative budget', budgets: ['< €5k', '€5k – 15k', '€15k – 50k', '> €50k', 'To be defined'],
    timing: 'Desired timeline', timings: ['As soon as possible', 'Within 3 months', 'Within 6 months', 'No constraint'],
    msg: 'Your project in a few words', msgPh: 'Goals, context, current website…',
    s3: 'How can we reach you?', name: 'Full name', company: 'Company', website: 'Current website (optional)',
    consent: 'I agree that my data may be used to process my request, in accordance with the', privacy: 'privacy policy',
    doneH: 'Thank you, your request has been sent.', doneP: 'Our team is reviewing your project and will come back to you within 48 business hours with a recommendation and a tailored quote.', doneCta: 'Discover our work', doneSvc: 'Discover our services',
    back: 'Back', next: 'Continue', send: 'Send my request', sending: 'Sending…',
    errNeed: 'Please select at least one option.', errId: 'Please enter your name and a valid email address.', errConsent: 'Please agree to the use of your data to process your request.', errSend: 'Sending failed. You can email us directly at'
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
        { '@type': 'ContactPage', '@id': `${site}${link.contact()}#webpage`, url: `${site}${link.contact()}`, name: t.value.title, inLanguage: en.value ? 'en' : 'fr', about: { '@id': `${site}/#organization` } }
      ]
    })
  }]
})

const route = useRoute()
const config = useRuntimeConfig()
const step = ref(1)
const error = ref('')
const sending = ref(false)
const data = reactive({
  services: [typeof route.query.service === 'string' ? route.query.service : 'web'] as string[],
  budget: '', timing: '', message: '', name: '', company: '', email: '', phone: '', website: '', consent: false, hp: ''
})
const toggle = (id: string) => {
  data.services = data.services.includes(id) ? data.services.filter(x => x !== id) : [...data.services, id]
}

async function onNext() {
  error.value = ''
  if (step.value === 1 && !data.services.length) { error.value = t.value.errNeed; return }
  if (step.value < 3) { step.value++; return }
  if (!data.name.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) { error.value = t.value.errId; return }
  if (!data.consent) { error.value = t.value.errConsent; return }
  sending.value = true
  try {
    // API du site (Supabase + e-mail, server/api/contact.ts) ; NUXT_PUBLIC_FORM_ENDPOINT permet de la remplacer (Formspree, Brevo…).
    const api = (config.public.bookingApi as string || '').replace(/\/$/, '')
    const endpoint = (config.public.formEndpoint as string) || `${api}/api/contact`
    await $fetch(endpoint, { method: 'POST', body: { ...data, locale: locale.value } })
    step.value = 4
  } catch {
    error.value = `${t.value.errSend} ${CONTACT.email}.`
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px; padding-top: 88px; padding-bottom: 112px; }
.contact__intro { grid-column: span 5; display: flex; flex-direction: column; gap: 28px; padding-right: 32px; }
.contact__h1 { font-size: 68px; line-height: 1.02; letter-spacing: -2.2px; font-weight: 800; }
.contact__lead { font-size: 19px; line-height: 1.55; color: var(--muted); }
.contact__info { margin: 16px 0 0; border-top: 1px solid var(--line-2); }
.contact__info > div { display: flex; flex-direction: column; gap: 4px; padding: 20px 0; border-bottom: 1px solid var(--line-2); }
.contact__info dt { font-size: 13px; color: var(--muted-2); }
.contact__info dd { margin: 0; font-size: 19px; font-weight: 600; }
.wizard { grid-column: 7 / span 6; align-self: start; display: flex; flex-direction: column; gap: 28px; padding: 44px; background: var(--white); border: 1px solid var(--line); border-radius: 28px; box-shadow: 0 30px 60px -40px rgba(10, 26, 71, .3); }
.wizard__bars { display: flex; gap: 8px; }
.wizard__bars i { flex-grow: 1; height: 6px; border-radius: 99px; background: var(--line); display: block; transition: background .2s; }
.wizard__bars i.is-on { background: var(--accent); }
.wizard__step { font-size: 14px; font-weight: 600; color: var(--muted-2); margin-top: -8px; }
.wizard__panel { display: flex; flex-direction: column; gap: 20px; border: none; margin: 0; padding: 0; min-width: 0; }
.wizard__h { font-family: var(--font-display); font-size: 34px; letter-spacing: -.8px; font-weight: 700; padding: 0; }
.wizard__h--38 { font-size: 38px; }
.wizard__hint { font-size: 15px; color: var(--muted); }
legend.wizard__h { margin-bottom: 12px; }
.wizard__error { color: var(--red); font-size: 14px; font-weight: 500; }
.svc-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.svc { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 18px 20px; text-align: left; border-radius: 16px; background: var(--white); color: var(--ink); border: 2px solid var(--line); }
.svc.is-on { background: var(--accent-soft); border-color: var(--accent); }
.svc__t { font-weight: 600; font-size: 16px; }
.svc__d { font-size: 13px; opacity: .75; }
.chips { border: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.chips legend { font-size: 14px; font-weight: 600; margin-bottom: 10px; padding: 0; }
.chips div { display: flex; flex-wrap: wrap; gap: 8px; }
.chips button { padding: 10px 16px; border-radius: 999px; font-size: 14px; font-weight: 500; background: var(--white); color: var(--ink); border: 1px solid var(--line-2); }
.chips button.is-on { background: var(--ink); color: var(--white); border-color: var(--ink); }
.fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.field { display: flex; flex-direction: column; gap: 8px; font-size: 14px; font-weight: 600; }
.field input, .field textarea { padding: 14px; border: 1px solid var(--line-2); border-radius: 12px; font-size: 15px; font-family: inherit; font-weight: 400; resize: none; color: var(--ink); }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.consent { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--muted); line-height: 1.5; }
.consent input { width: 18px; height: 18px; margin-top: 1px; flex-shrink: 0; }
.wizard__done { align-items: flex-start; gap: 18px; padding: 24px 0; }
.done__icon { display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 99px; background: #E6F4EC; }
.done__p { font-size: 17px; line-height: 1.6; color: var(--muted); }
.wizard__nav { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid var(--line-soft); }
.wizard__back { padding: 16px 8px; background: none; border: none; font-size: 15px; font-weight: 600; color: var(--ink); }
.wizard__back:disabled { color: var(--line-3); cursor: default; }
.wizard__next { font-size: 16px; padding: 16px 28px; border: none; }
@media (max-width: 1180px) {
  .contact__intro { grid-column: 1 / -1; padding-right: 0; margin-bottom: 48px; }
  .wizard { grid-column: 1 / -1; }
  .contact__h1 { font-size: 54px; letter-spacing: -1.6px; }
}
@media (max-width: 720px) {
  .contact { padding-top: 48px; padding-bottom: 64px; }
  .contact__h1 { font-size: 40px; letter-spacing: -1.2px; }
  .wizard { padding: 28px 20px; }
  .svc-grid, .fields { grid-template-columns: minmax(0, 1fr); }
  .wizard__h { font-size: 28px; }
}
</style>
