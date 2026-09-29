<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__grid">
        <div class="footer__brand">
          <SiteLogo light />
          <p class="footer__desc">{{ t.desc }}</p>
          <address class="footer__contact">{{ CONTACT.address }}<br><template v-if="!CONTACT.phone.startsWith('[')">{{ CONTACT.phone }}<br></template><a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a></address>
        </div>
        <div v-for="c in footerCols" :key="c.title" class="footer__col">
          <div class="footer__title">{{ c.title }}</div>
          <NuxtLink v-for="[label, to] in c.links" :key="label" :to="to">{{ label }}</NuxtLink>
        </div>
      </div>
      <div class="footer__local">
        <span class="footer__local-title">{{ t.local }}</span>
        <NuxtLink v-for="([label, to], i) in footerLocal" :key="i" :to="to" class="footer__pill">{{ label }}</NuxtLink>
      </div>
      <div class="footer__bottom">
        <span>{{ t.rights }}</span>
        <div class="footer__legal"><NuxtLink :to="link.terms()">{{ t.terms }}</NuxtLink><NuxtLink :to="link.legal()">{{ t.legal }}</NuxtLink><NuxtLink :to="link.legal('#article-7')">{{ t.privacy }}</NuxtLink></div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { CONTACT } from '~/data/content'
const { link, footerCols, footerLocal } = useSite()
const t = useLocaleText({
  fr: { desc: 'Agence digitale basée à Dakar : création de sites, applications sur mesure, référencement SEO & GEO et marketing digital pour les entreprises en France, en Europe et au Canada.', local: 'Nos marchés :', rights: '© 2026 BNS Digital. Tous droits réservés.', terms: 'Conditions Générales', legal: 'Mentions légales', privacy: 'Confidentialité' },
  en: { desc: 'Dakar-based digital agency: website design, custom software, SEO & GEO and digital marketing for companies in Canada, France and Europe.', local: 'Our markets:', rights: '© 2026 BNS Digital. All rights reserved.', terms: 'Terms & conditions', legal: 'Legal notice', privacy: 'Privacy' }
})
</script>

<style scoped>
.footer { background: var(--ink); color: var(--dark-muted); }
.footer__inner { min-height: 500px; display: flex; flex-direction: column; gap: 44px; padding-top: 72px; padding-bottom: 36px; }
.footer__grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 32px; }
.footer__brand { grid-column: span 2; display: flex; flex-direction: column; gap: 16px; padding-right: 40px; }
.footer__desc { font-size: 15px; line-height: 1.6; color: var(--dark-muted-2); }
.footer__contact { font-style: normal; font-size: 15px; line-height: 1.7; }
.footer__contact a { color: var(--white); }
.footer__col { display: flex; flex-direction: column; gap: 11px; font-size: 14px; }
.footer__col a { color: var(--dark-muted-2); }
.footer__col a:hover, .footer__legal a:hover, .footer__pill:hover { color: var(--white); }
.footer__title { font-weight: 600; color: var(--white); font-size: 15px; margin-bottom: 4px; }
.footer__local { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; font-size: 13px; padding-top: 28px; border-top: 1px solid var(--dark-line); }
.footer__local-title { color: var(--white); font-weight: 600; margin-right: 8px; }
.footer__pill { color: var(--dark-muted-2); padding: 5px 10px; border: 1px solid var(--dark-line); border-radius: 999px; }
.footer__bottom { display: flex; justify-content: space-between; gap: 16px; font-size: 13px; color: var(--dark-muted-3); margin-top: auto; }
.footer__legal { display: flex; gap: 24px; }
.footer__legal a { color: var(--dark-muted-3); }

@media (max-width: 1180px) {
  .footer__grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .footer__brand { grid-column: span 4; padding-right: 0; }
}
@media (max-width: 720px) {
  .footer__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .footer__brand { grid-column: span 2; }
  .footer__bottom { flex-direction: column; }
}
</style>
