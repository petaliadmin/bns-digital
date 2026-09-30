<template>
  <!-- Illustration d'un service : doit se comprendre sans lire (navigateur, résultats Google, téléphone…) -->
  <svg class="sa" :class="{ 'sa--dark': dark }" viewBox="0 0 240 120" role="img" :aria-label="label" preserveAspectRatio="xMidYMid meet">
    <!-- Site web : fenêtre de navigateur avec une page -->
    <g v-if="kind === 'web'">
      <rect class="p" x="20" y="8" width="200" height="104" rx="10" />
      <rect class="s" x="20" y="8" width="200" height="18" rx="10" />
      <circle class="l" cx="32" cy="17" r="3" /><circle class="l" cx="42" cy="17" r="3" /><circle class="l" cx="52" cy="17" r="3" />
      <rect class="p2" x="64" y="12" width="100" height="10" rx="5" />
      <g class="move">
        <rect class="k" x="34" y="38" width="90" height="8" rx="4" />
        <rect class="l" x="34" y="52" width="70" height="6" rx="3" />
        <rect class="a" x="34" y="66" width="44" height="12" rx="6" />
        <rect class="t" x="140" y="36" width="66" height="44" rx="8" />
        <circle class="c" cx="160" cy="52" r="7" />
        <path class="a" d="M146 74l18-14 12 9 10-7 14 12z" />
      </g>
      <rect class="s" x="34" y="88" width="52" height="16" rx="5" /><rect class="s" x="94" y="88" width="52" height="16" rx="5" /><rect class="s" x="154" y="88" width="52" height="16" rx="5" />
    </g>

    <!-- Application métier : tableau de bord en colonnes (CRM) -->
    <g v-else-if="kind === 'app'">
      <rect class="p" x="16" y="8" width="208" height="104" rx="10" />
      <rect class="k" x="16" y="8" width="38" height="104" rx="10" />
      <rect class="k" x="44" y="8" width="10" height="104" />
      <rect class="a" x="26" y="22" width="18" height="6" rx="3" /><rect class="dl" x="26" y="36" width="18" height="4" rx="2" /><rect class="dl" x="26" y="46" width="18" height="4" rx="2" /><rect class="dl" x="26" y="56" width="18" height="4" rx="2" />
      <g v-for="(n, i) in [3, 2, 1]" :key="i">
        <rect class="l" :x="64 + i * 54" y="20" width="30" height="5" rx="2.5" />
        <rect v-for="j in n" :key="j" class="card move" :class="{ hi: i === 2 }" :x="64 + i * 54" :y="30 + (j - 1) * 26" width="46" height="20" rx="5" />
      </g>
      <rect class="c" x="172" y="36" width="20" height="4" rx="2" />
    </g>

    <!-- Référencement : barre de recherche et 1er résultat -->
    <g v-else-if="kind === 'seo'">
      <rect class="p" x="24" y="10" width="192" height="22" rx="11" />
      <rect class="l" x="38" y="19" width="90" height="5" rx="2.5" />
      <circle class="stroke-a" cx="198" cy="21" r="5" /><path class="stroke-a" d="M202 25l4 4" />
      <g class="move">
        <rect class="p hi-b" x="24" y="40" width="192" height="30" rx="8" />
        <circle class="a" cx="40" cy="55" r="9" /><text class="num" x="40" y="59">1</text>
        <rect class="a" x="56" y="47" width="80" height="6" rx="3" /><rect class="l" x="56" y="58" width="120" height="5" rx="2.5" />
        <path class="stroke-c" d="M190 62l8-10 8 10" /><path class="stroke-c" d="M198 52v14" />
      </g>
      <rect class="p" x="24" y="76" width="192" height="16" rx="6" /><rect class="l" x="36" y="82" width="100" height="4" rx="2" />
      <rect class="p" x="24" y="96" width="192" height="16" rx="6" /><rect class="l" x="36" y="102" width="80" height="4" rx="2" />
    </g>

    <!-- Application mobile : deux téléphones -->
    <g v-else-if="kind === 'mobile'">
      <rect class="s" x="118" y="18" width="54" height="96" rx="10" transform="rotate(8 145 66)" />
      <g class="move">
        <rect class="k" x="78" y="6" width="60" height="110" rx="12" />
        <rect class="p" x="82" y="12" width="52" height="98" rx="9" />
        <rect class="k" x="100" y="15" width="16" height="4" rx="2" />
        <rect class="a" x="88" y="26" width="40" height="26" rx="6" />
        <circle class="c" cx="98" cy="36" r="4" />
        <g v-for="j in 3" :key="j"><circle class="t" cx="93" :cy="60 + (j - 1) * 13" r="4" /><rect class="l" x="101" :y="58 + (j - 1) * 13" width="26" height="4" rx="2" /></g>
        <rect class="s" x="88" y="98" width="40" height="6" rx="3" />
      </g>
      <rect class="p" x="176" y="30" width="36" height="18" rx="9" /><path class="stroke-a" d="M184 39l4 4 8-8" />
      <rect class="p" x="28" y="70" width="40" height="18" rx="9" /><rect class="c" x="36" y="77" width="24" height="4" rx="2" />
    </g>

    <!-- Publicité : courbe de performance en hausse -->
    <g v-else-if="kind === 'ads'">
      <rect class="p" x="16" y="8" width="208" height="104" rx="10" />
      <rect v-for="(h, i) in [18, 28, 24, 40, 52, 70]" :key="i" class="t" :x="32 + i * 28" :y="100 - h" width="16" :height="h" rx="3" />
      <path class="line-a move" d="M40 86 L68 74 L96 78 L124 60 L152 48 L180 30" />
      <circle class="a" cx="180" cy="30" r="5" />
      <rect class="k" x="30" y="16" width="60" height="14" rx="7" />
      <path class="stroke-c" d="M40 26l5-5 5 5" /><rect class="c" x="54" y="21" width="28" height="4" rx="2" />
    </g>

    <!-- Social media : publication Instagram -->
    <g v-else-if="kind === 'social'">
      <rect class="p" x="60" y="6" width="120" height="108" rx="10" />
      <circle class="a" cx="74" cy="18" r="6" /><rect class="l" x="84" y="15" width="40" height="5" rx="2.5" />
      <rect class="t" x="66" y="28" width="108" height="58" rx="4" />
      <circle class="c" cx="92" cy="48" r="9" /><path class="a" d="M70 84l30-22 20 14 16-10 34 18z" />
      <path class="heart move" d="M78 96c-3-4-9-2-7 3 1 3 7 7 7 7s6-4 7-7c2-5-4-7-7-3z" />
      <path class="stroke-l" d="M94 100a5 5 0 1 1 1 0l-3 3z" /><path class="stroke-l" d="M110 95l8 4-8 4z" />
      <rect class="p" x="186" y="34" width="44" height="18" rx="9" /><path class="heart" d="M196 40c-2-3-6-1-5 2 1 2 5 5 5 5s4-3 5-5c1-3-3-5-5-2z" /><rect class="l" x="204" y="41" width="18" height="4" rx="2" />
      <rect class="p" x="10" y="64" width="44" height="18" rx="9" /><circle class="c" cx="21" cy="73" r="4" /><rect class="l" x="28" y="71" width="18" height="4" rx="2" />
    </g>

    <!-- IA & automatisation : conversation avec un assistant -->
    <g v-else-if="kind === 'ai'">
      <rect class="p" x="28" y="8" width="184" height="104" rx="10" />
      <rect class="t" x="116" y="18" width="84" height="20" rx="10" /><rect class="k-soft" x="126" y="26" width="60" height="4" rx="2" />
      <g class="move">
        <circle class="a" cx="46" cy="58" r="10" />
        <path class="spark" d="M46 51l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
        <rect class="s" x="62" y="46" width="110" height="36" rx="10" />
        <rect class="l" x="72" y="54" width="86" height="4" rx="2" /><rect class="l" x="72" y="62" width="70" height="4" rx="2" /><rect class="l" x="72" y="70" width="50" height="4" rx="2" />
      </g>
      <rect class="s" x="40" y="92" width="140" height="12" rx="6" /><circle class="a" cx="192" cy="98" r="7" /><path class="stroke-w" d="M189 98h6M193 95l3 3-3 3" />
    </g>

    <!-- Audit : loupe sur une page avec liste de contrôle -->
    <g v-else>
      <rect class="p" x="46" y="8" width="96" height="104" rx="10" />
      <g v-for="j in 4" :key="j">
        <rect class="a" x="58" :y="22 + (j - 1) * 20" width="10" height="10" rx="3" />
        <path class="stroke-w" :d="`M60 ${27 + (j - 1) * 20}l2 2 4-4`" />
        <rect class="l" x="74" :y="25 + (j - 1) * 20" :width="54 - j * 6" height="4" rx="2" />
      </g>
      <g class="move">
        <circle class="lens" cx="156" cy="62" r="28" />
        <path class="handle" d="M176 82l22 22" />
        <path class="line-a" d="M142 66l8-10 8 6 10-12" />
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ kind: 'web' | 'app' | 'seo' | 'mobile' | 'ads' | 'social' | 'ai' | 'audit'; label: string; dark?: boolean }>()
</script>

<style scoped>
/* Couleurs du logo, déclinées pour carte claire et carte sombre */
.sa { --p: var(--white); --p2: var(--bg); --l: var(--line-2); --s: var(--accent-soft); --k: var(--ink); --a: var(--accent); --c: var(--accent-light); --t: var(--accent-tint); width: 100%; height: auto; display: block; }
.sa--dark { --p: var(--dark-2); --p2: var(--ink); --l: var(--dark-line-2); --s: var(--dark-line); --k: var(--white); --t: var(--dark-line-2); }
.p { fill: var(--p); } .p2 { fill: var(--p2); } .l { fill: var(--l); } .s { fill: var(--s); } .k { fill: var(--k); } .a { fill: var(--a); } .c { fill: var(--c); } .t { fill: var(--t); }
.k-soft { fill: var(--k); opacity: .45; }
.dl { fill: var(--white); opacity: .35; }
.card { fill: var(--p2); stroke: var(--l); stroke-width: 1; }
.card.hi { fill: var(--s); stroke: var(--a); }
.hi-b { stroke: var(--a); stroke-width: 2; }
.num { fill: var(--white); font: 700 11px var(--font-body); text-anchor: middle; }
.stroke-a, .stroke-c, .stroke-w, .stroke-l { fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.stroke-a { stroke: var(--a); } .stroke-c { stroke: var(--c); } .stroke-w { stroke: var(--white); } .stroke-l { stroke: var(--l); stroke-width: 2; }
.line-a { fill: none; stroke: var(--a); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.heart { fill: #E0245E; }
.spark { fill: var(--white); }
.lens { fill: var(--s); fill-opacity: .8; stroke: var(--k); stroke-width: 6; }
.handle { stroke: var(--k); stroke-width: 9; stroke-linecap: round; }
.move { transition: transform .35s ease; }
</style>
