<template>
  <NuxtLink :to="link.project(project.slug)" class="pcard" :class="{ 'pcard--bordered': bordered }">
    <div class="pcard__visual" :style="{ background: project.bg }">
      <img :src="thumb(project.img)" :srcset="`${thumb(project.img)} 800w, ${project.img} 1600w`" sizes="(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 420px" :alt="project.alt" class="pcard__img" loading="lazy" decoding="async" width="800" height="450">
      <span class="pcard__cat">{{ catLabel[project.cat] }}</span>
    </div>
    <div v-if="compact" class="pcard__body pcard__body--compact">
      <span class="pcard__client">{{ project.client }}</span>
      <span class="pcard__label">{{ project.label }}</span>
      <span v-if="!project.metric.startsWith('[')" class="pcard__metric">{{ project.metric }}</span>
    </div>
    <div v-else class="pcard__body">
      <div class="pcard__label">{{ project.label }}</div>
      <div class="pcard__client">{{ project.client }}</div>
      <div v-if="!project.desc.startsWith('[')" class="pcard__desc">{{ project.desc }}</div>
      <div class="pcard__foot">
        <span class="pcard__metric">{{ project.metric.startsWith('[') ? '' : project.metric }}</span>
        <span class="pcard__more">{{ moreLabel ?? (en ? 'Discover' : 'Découvrir') }} →</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { thumb, type Project } from '~/data/content'
defineProps<{ project: Project; compact?: boolean; bordered?: boolean; moreLabel?: string }>()
const { en, link, catLabel } = useSite()
</script>

<style scoped>
/* Visuel en haut, bas de carte sur fond sombre (indigo de la palette) */
.pcard { display: flex; flex-direction: column; background: var(--dark-2); border-radius: 20px; overflow: hidden; color: var(--white); transition: transform .2s ease, box-shadow .2s ease; }
.pcard:hover { color: var(--white); transform: translateY(-3px); box-shadow: 0 24px 48px -28px rgba(10, 26, 71, .35); }
.pcard--bordered { border: 1px solid var(--dark-line); }
.pcard__visual { position: relative; aspect-ratio: 16 / 9; overflow: hidden; }
.pcard__img { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform .4s ease; }
.pcard:hover .pcard__img { transform: scale(1.04); }
.pcard__client { font-family: var(--font-display); font-size: 22px; font-weight: 800; letter-spacing: -0.4px; line-height: 1.2; }
.pcard__desc { color: var(--dark-muted); font-size: 15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.pcard__cat { position: absolute; left: 16px; top: 16px; font-size: 12px; font-weight: 600; padding: 5px 10px; border-radius: 999px; background: var(--white); color: var(--ink); box-shadow: 0 4px 12px -4px rgba(10, 26, 71, .3); }
.pcard__body { display: flex; flex-direction: column; gap: 8px; padding: 22px 24px 24px; flex-grow: 1; }
.pcard__body--compact { gap: 8px; padding: 22px 24px; }
.pcard__label { font-size: 13px; color: var(--dark-muted-2); font-weight: 500; }
.pcard__foot { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--dark-line-2); margin-top: auto; }
.pcard__metric { font-family: var(--font-display); font-size: 20px; font-weight: 800; color: var(--accent-light); }
.pcard__more { font-size: 14px; font-weight: 600; color: var(--white); }
.pcard:hover .pcard__more { color: var(--accent-light); }
</style>
