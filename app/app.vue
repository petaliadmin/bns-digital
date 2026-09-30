<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Polices latines préchargées : le titre du hero (élément LCP) s'affiche sans attendre la découverte du CSS
import bricolage from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url'
import geist from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url'

// lang="fr"/"en", canonical, hreflang (fr, en, x-default), og:url et og:locale sont posés automatiquement
// par @nuxtjs/i18n (experimental.strictSeo) à partir des URL traduites et de baseUrl.
useSeoMeta({ ogSiteName: 'BNS Digital' })
useHead({
  link: [bricolage, geist].map(href => ({ rel: 'preload', as: 'font', type: 'font/woff2', href, crossorigin: '' }))
})

// og:locale au format Open Graph (langue_PAYS) ; les balises hreflang restent génériques (fr / en)
const { locale } = useI18n()
// Priorité haute : remplace les valeurs génériques posées par @nuxtjs/i18n
useSeoMeta({ ogLocale: () => (locale.value === 'en' ? 'en_US' : 'fr_FR'), ogLocaleAlternate: () => [locale.value === 'en' ? 'fr_FR' : 'en_US'] }, { tagPriority: 'high' })
</script>
