<template>
  <section class="container legal">
    <Breadcrumb :items="[{ label: t.home, to: link.home() }, { label: title }]" />
    <div class="legal__head">
      <div v-if="eyebrow" class="eyebrow">{{ eyebrow }}</div>
      <h1 class="legal__h1">{{ title }}</h1>
      <p v-if="lead" class="lead legal__lead">{{ lead }}</p>
    </div>

    <slot />

    <div v-if="articles" class="terms">
      <nav class="toc" :aria-label="`${t.toc} — ${title}`">
        <div class="toc__title">{{ t.toc }}</div>
        <ol class="toc__list">
          <li v-for="(a, i) in articles" :key="a.t"><a :href="`#article-${i + 1}`"><span>{{ num(i) }}</span>{{ a.t }}</a></li>
        </ol>
      </nav>

      <div class="articles">
        <h2 v-if="articlesTitle" class="articles__h">{{ articlesTitle }}</h2>
        <article v-for="(a, i) in articles" :id="`article-${i + 1}`" :key="a.t" class="art">
          <div class="art__n">{{ num(i) }}.</div>
          <div class="art__body">
            <component :is="articlesTitle ? 'h3' : 'h2'" class="art__t">{{ a.t }}</component>
            <template v-for="(b, j) in a.blocks" :key="j">
              <ul v-if="Array.isArray(b)" class="art__list"><li v-for="li in b" :key="li">{{ li }}</li></ul>
              <p v-else-if="typeof b === 'string'" class="art__p">{{ b }}</p>
              <component :is="articlesTitle ? 'h4' : 'h3'" v-else-if="'h' in b" class="art__sub">{{ b.h }}</component>
              <dl v-else class="art__kv">
                <div v-for="[k, v, href] in b.kv" :key="k" class="art__kv-row">
                  <dt>{{ k }}</dt>
                  <dd><a v-if="href" :href="href" :target="href.startsWith('http') ? '_blank' : undefined" :rel="href.startsWith('http') ? 'noopener' : undefined">{{ v }}</a><template v-else>{{ v }}</template></dd>
                </div>
              </dl>
            </template>
          </div>
        </article>
        <p v-if="footnote" class="terms__date">{{ footnote }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Bloc d'article : paragraphe, liste à puces, sous-titre ou tableau libellé / valeur (lien optionnel)
export type LegalBlock = string | string[] | { h: string } | { kv: [string, string, string?][] }
export interface LegalArticle { t: string; blocks: LegalBlock[] }

defineProps<{ title: string; eyebrow?: string; lead?: string; articles?: LegalArticle[]; articlesTitle?: string; footnote?: string }>()
const num = (i: number) => String(i + 1).padStart(2, '0')
const { link } = useSite()
const t = useLocaleText({ fr: { home: 'Accueil', toc: 'Sommaire' }, en: { home: 'Home', toc: 'Contents' } })
</script>

<style scoped>
.legal { display: flex; flex-direction: column; gap: 32px; padding-top: 40px; padding-bottom: 112px; min-height: 50vh; }
.legal__head { display: flex; flex-direction: column; gap: 20px; margin-top: 32px; }
.legal__h1 { font-size: 56px; letter-spacing: -1.8px; font-weight: 800; }
.legal__lead { max-width: 720px; }
.legal__p { font-size: 18px; color: var(--muted); }

.terms { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 64px; align-items: start; margin-top: 48px; }
.toc { position: sticky; top: 112px; max-height: calc(100vh - 136px); overflow-y: auto; padding: 24px; background: var(--white); border: 1px solid var(--line); border-radius: 20px; }
.toc__title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted-2); margin-bottom: 12px; }
.toc__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.toc__list a { display: flex; gap: 10px; padding: 6px 8px; border-radius: 8px; font-size: 14px; line-height: 1.35; color: var(--muted); }
.toc__list a span { flex: none; width: 22px; font-weight: 600; color: var(--muted-3); font-variant-numeric: tabular-nums; }
.toc__list a:hover { background: var(--bg); color: var(--accent); }

.articles__h { font-size: 36px; letter-spacing: -1px; font-weight: 800; margin-bottom: 8px; }
.art { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 16px; padding: 32px 0; border-top: 1px solid var(--line); scroll-margin-top: 112px; }
.art:first-of-type { border-top: none; padding-top: 0; }
.articles__h + .art { border-top: 1px solid var(--line); padding-top: 32px; }
.art__n { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--accent); }
.art__body { display: flex; flex-direction: column; gap: 14px; max-width: 760px; }
.art__t { font-size: 24px; font-weight: 700; letter-spacing: -.4px; }
.art__sub { margin: 8px 0 0; font-size: 17px; font-weight: 700; }
.art__p { font-size: 17px; line-height: 1.7; color: var(--muted); }
.art__list { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; font-size: 17px; line-height: 1.6; color: var(--muted); }
.art__list li::marker { color: var(--accent); }
.art__kv { margin: 0; background: var(--white); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
.art__kv-row { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 16px; padding: 14px 20px; border-top: 1px solid var(--line-soft); font-size: 16px; line-height: 1.5; }
.art__kv-row:first-child { border-top: none; }
.art__kv dt { color: var(--muted-2); font-weight: 500; }
.art__kv dd { margin: 0; font-weight: 600; }
.art__kv a { color: var(--accent); }
.art__kv a:hover { text-decoration: underline; }
.terms__date { margin-top: 16px; padding: 24px 28px; background: var(--accent-soft); border-radius: 16px; font-size: 15px; line-height: 1.6; color: var(--ink); }

@media (max-width: 1180px) {
  .terms { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .toc { position: static; max-height: none; }
  .toc__list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px 16px; }
}
@media (max-width: 720px) {
  .legal__h1 { font-size: 36px; }
  .toc__list { grid-template-columns: minmax(0, 1fr); }
  .art { grid-template-columns: minmax(0, 1fr); gap: 6px; padding: 24px 0; }
  .art__t { font-size: 21px; }
  .articles__h { font-size: 28px; }
  .art__kv-row { grid-template-columns: minmax(0, 1fr); gap: 2px; }
}
</style>
