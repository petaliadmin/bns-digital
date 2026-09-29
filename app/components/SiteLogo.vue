<template>
  <NuxtLink :to="link.home()" class="logo" :class="{ 'logo--light': light }" :aria-label="en ? 'BNS Digital — home' : 'BNS Digital — accueil'">
    <img src="/logo-bns.webp" alt="BNS Digital" width="518" height="206" class="logo__img">
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ light?: boolean }>()
const { en, link } = useSite()
</script>

<style scoped>
.logo { display: inline-flex; align-items: center; flex: none; }
.logo__img { height: 52px; width: auto; }
/* Sur fond sombre, le logo passe en blanc monochrome pour rester lisible */
.logo--light .logo__img { filter: brightness(0) invert(1); }
@media (max-width: 720px) { .logo__img { height: 42px; } }
</style>
