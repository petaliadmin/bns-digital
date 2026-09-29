<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// lang="fr"/"en", canonical, hreflang (fr, en, x-default), og:url et og:locale sont posés automatiquement
// par @nuxtjs/i18n (experimental.strictSeo) à partir des URL traduites et de baseUrl.
useSeoMeta({ ogSiteName: 'BNS Digital' })
</script>
