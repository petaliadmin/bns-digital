<template>
  <LegalPage
    :title="t.title"
    :eyebrow="t.eyebrow"
    :lead="t.lead"
    :articles="t.articles"
    :articles-title="t.articlesTitle"
    :footnote="t.footnote"
  >
    <div class="keys">
      <div v-for="(k, i) in t.keys" :key="k.t" class="keys__item">
        <span class="keys__i"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="KEY_ICONS[i]" /></svg></span>
        <h2 class="keys__t">{{ k.t }}</h2>
        <p class="keys__d">{{ k.d }}</p>
      </div>
    </div>
  </LegalPage>
</template>

<script setup lang="ts">
import type { LegalArticle } from '~/components/LegalPage.vue'
import { TERMS_EN } from '~/data/legal.en'


const keysFr = [
  { t: 'Des prestations cadrées', d: 'Chaque prestation fait l’objet d’un devis détaillé et de votre validation préalable. Vous gardez la maîtrise du périmètre de votre projet.', icon: 'M9 12l2 2 4-4M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z' },
  { t: 'Modalités de paiement', d: 'Une structure claire : 50 % à la commande, 50 % à la livraison. Les conditions spécifiques sont toujours précisées dans votre devis.', icon: 'M2 7h20v12H2zM2 11h20M6 15h4' },
  { t: 'Délais de réalisation', d: 'Les délais sont estimés avec soin et donnés à titre indicatif. Nous nous engageons à une communication transparente sur l’avancement.', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2' },
  { t: 'Responsabilité encadrée', d: 'Notre engagement porte sur les moyens mis en œuvre. La performance dépend aussi de facteurs externes (algorithmes, marché…).', icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z' }
]

const articlesFr: LegalArticle[] = [
  { t: 'Présentation de la société', blocks: [
    'Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre BNS Digital, agence digitale spécialisée dans la conception, la gestion et le déploiement de solutions digitales, ci-après « BNS Digital », et toute personne physique ou morale souhaitant bénéficier de ses services, ci-après « le Client ».',
    'La validation d’un devis, d’une commande ou d’une prestation implique l’acceptation pleine et entière des présentes CGV.'
  ] },
  { t: 'Objet', blocks: [
    'Les présentes CGV ont pour objet de définir les conditions dans lesquelles BNS Digital fournit ses services digitaux. Les services proposés peuvent notamment comprendre :',
    ['la création de contenus pour les réseaux sociaux (posts, vidéos courtes) ;', 'la gestion et la stratégie des réseaux sociaux ;', 'la création de sites web ;', 'le développement de sites e-commerce ;', 'le développement d’applications ;', 'la conception et le déploiement d’agents d’intelligence artificielle ;', 'l’automatisation digitale ;', 'le design graphique ;', 'le marketing digital ;', 'le conseil en stratégie digitale.'],
    'Chaque prestation fait l’objet d’un devis ou d’une proposition commerciale.'
  ] },
  { t: 'Commande', blocks: [
    'Toute commande devient ferme et définitive après :',
    ['la validation du devis par le Client ;', 'le paiement de l’acompte prévu.'],
    'BNS Digital se réserve le droit de refuser une commande en cas de litige antérieur avec le Client.'
  ] },
  { t: 'Prix', blocks: [
    'Les prix sont exprimés dans la devise indiquée sur le devis, hors taxes ou toutes taxes comprises selon la situation fiscale. Les tarifs peuvent varier en fonction :',
    ['de la complexité du projet ;', 'de la charge de travail ;', 'des technologies utilisées ;', 'des délais demandés.'],
    'Sauf mention contraire, les devis sont valables 30 jours.'
  ] },
  { t: 'Modalités de paiement', blocks: [
    'Le paiement des prestations s’effectue selon les modalités suivantes :',
    ['50 % du montant total à la commande ;', '50 % à la livraison ou à la mise à disposition du projet.'],
    'La livraison finale ou la mise en production peut être conditionnée au paiement intégral du solde. Les paiements peuvent être effectués par :',
    ['virement bancaire ;', 'carte bancaire ;', 'tout autre moyen accepté par BNS Digital.'],
    'Tout retard de paiement peut entraîner l’application de pénalités conformément à la réglementation en vigueur.'
  ] },
  { t: 'Délais de réalisation', blocks: [
    'Les délais de réalisation sont donnés à titre indicatif. Ils peuvent varier en fonction :',
    ['de la complexité du projet ;', 'de la disponibilité des ressources ;', 'de la réactivité du Client ;', 'de la transmission des contenus nécessaires.'],
    'BNS Digital ne saurait être tenue responsable des retards causés par un défaut de validation ou d’information de la part du Client.'
  ] },
  { t: 'Révisions et modifications', blocks: [
    'Chaque prestation comprend deux cycles de révision inclus dans le prix initial. Une révision correspond à une demande de modification raisonnable portant sur le travail livré.',
    'Toute modification supplémentaire peut faire l’objet :',
    ['d’une facturation complémentaire ;', 'ou d’un nouveau devis.'],
    'Les modifications majeures peuvent être considérées comme un nouveau projet.'
  ] },
  { t: 'Livraison des prestations', blocks: [
    'Les prestations peuvent être livrées sous forme de :',
    ['fichiers numériques ;', 'publication de contenus ;', 'mise en ligne d’un site web ;', 'mise en ligne d’une application ;', 'accès à une solution ou à un agent IA.'],
    'La livraison est réputée effectuée dès la mise à disposition du livrable au Client.'
  ] },
  { t: 'Maintenance des solutions digitales', blocks: [
    'À la livraison d’un site web, d’une plateforme e-commerce, d’une application ou d’un agent IA, BNS Digital inclut une maintenance technique initiale de 12 mois à compter de la mise en production. Cette maintenance comprend :',
    ['la correction des bugs liés au développement initial ;', 'le maintien du bon fonctionnement général de la solution ;', 'la compatibilité technique de base avec les technologies utilisées.'],
    'Cette maintenance ne couvre pas :',
    ['les évolutions fonctionnelles ;', 'l’ajout de nouvelles fonctionnalités ;', 'les modifications demandées par le Client ;', 'les modifications effectuées par un tiers ;', 'les changements liés à des services externes.'],
    { h: 'Maintenance après la première année' },
    'À l’issue de cette période, la maintenance peut être prolongée dans le cadre d’un abonnement proposé par BNS Digital. Cet abonnement peut inclure :',
    ['la maintenance technique continue ;', 'les mises à jour de sécurité ;', 'le suivi des performances ;', 'l’optimisation technique ;', 'l’ajustement des agents IA.'],
    'En l’absence de contrat de maintenance actif, BNS Digital ne saurait être tenue responsable de l’évolution technique des solutions.'
  ] },
  { t: 'Intervention de prestataires externes', blocks: [
    'Dans le cadre de ses prestations, BNS Digital agit en qualité d’intermédiaire et de coordinateur de services digitaux. Pour certains projets, BNS Digital peut faire appel à des prestataires externes indépendants, qui peuvent intervenir en :',
    ['développement web ;', 'production de contenus ;', 'design ;', 'marketing digital ;', 'développement d’applications ;', 'développement d’agents IA.']
  ] },
  { t: 'Responsabilité des prestataires', blocks: [
    'Les prestataires externes interviennent en tant que professionnels indépendants et sont pleinement responsables de leurs prestations.',
    'BNS Digital ne saurait être tenue responsable des défauts, retards ou dysfonctionnements imputables à ces prestataires.'
  ] },
  { t: 'Interlocuteur unique', blocks: [
    'Dans le cadre de l’organisation du projet, BNS Digital demeure l’interlocuteur unique du Client et assure la coordination des intervenants.',
    'Toutefois, la responsabilité technique de l’exécution des prestations incombe aux prestataires qui ont réalisé les travaux.'
  ] },
  { t: 'Limitation de responsabilité', blocks: [
    'La responsabilité de BNS Digital ne peut être engagée qu’en cas de faute prouvée. En tout état de cause, la responsabilité totale de BNS Digital est limitée au montant payé par le Client pour la prestation concernée.',
    'BNS Digital ne saurait être tenue responsable des dommages indirects, tels que :',
    ['la perte de chiffre d’affaires ;', 'la perte de données ;', 'la perte d’exploitation ;', 'la perte d’opportunités commerciales.']
  ] },
  { t: 'Dépendance aux services externes', blocks: [
    'Certaines prestations reposent sur l’utilisation de services tiers, tels que :',
    ['les réseaux sociaux ;', 'les hébergeurs web ;', 'les CMS ;', 'les solutions e-commerce ;', 'les API ;', 'les services d’intelligence artificielle.'],
    'BNS Digital ne saurait être tenue responsable des interruptions, modifications ou suppressions de services liées à ces plateformes.'
  ] },
  { t: 'Hébergement et sécurité', blocks: [
    'Sauf mention contraire, l’hébergement des solutions développées est assuré par des prestataires spécialisés. BNS Digital ne saurait être tenue responsable :',
    ['d’une défaillance de l’hébergeur ;', 'd’une faille de sécurité externe ;', 'd’une perte de données causée par un tiers.']
  ] },
  { t: 'Utilisation de solutions d’intelligence artificielle', blocks: [
    'Les solutions d’intelligence artificielle peuvent produire des résultats variables. Le Client reconnaît que :',
    ['les résultats peuvent nécessiter une validation humaine ;', 'les performances peuvent évoluer selon les technologies utilisées.'],
    'BNS Digital ne peut garantir un résultat spécifique lié à l’utilisation d’un agent IA.'
  ] },
  { t: 'Prestations récurrentes', blocks: [
    'Certaines prestations peuvent être proposées sous forme d’abonnement mensuel. Sauf mention contraire, elles sont conclues pour une durée minimale de 3 mois, puis reconduites tacitement de mois en mois.',
    'La résiliation doit être notifiée en respectant un préavis de 30 jours.'
  ] },
  { t: 'Retard ou absence de collaboration du Client', blocks: [
    'L’exécution des prestations nécessite la collaboration active du Client. En l’absence de réponse pendant plus de 15 jours, le planning du projet peut être ajusté.',
    'Au-delà de 30 jours, le projet peut être suspendu. Sa reprise peut entraîner des frais supplémentaires.'
  ] },
  { t: 'Propriété intellectuelle', blocks: [
    'Les créations deviennent la propriété du Client après paiement intégral. BNS Digital reste propriétaire :',
    ['de ses méthodes ;', 'de ses outils internes ;', 'de ses frameworks ;', 'de ses composants techniques réutilisables.'],
    'BNS Digital peut présenter les travaux réalisés dans son portfolio.'
  ] },
  { t: 'Confidentialité', blocks: [
    'BNS Digital s’engage à respecter la confidentialité des informations communiquées par le Client.'
  ] },
  { t: 'Résiliation', blocks: [
    'En cas d’annulation du projet après son démarrage :',
    ['l’acompte versé reste acquis à BNS Digital ;', 'les travaux réalisés peuvent être facturés.']
  ] },
  { t: 'Absence de remboursement', blocks: [
    'Les prestations étant personnalisées, aucun remboursement ne peut être exigé une fois la prestation commencée, sauf faute grave imputable à BNS Digital.'
  ] },
  { t: 'Validation des livrables', blocks: [
    'Le Client dispose d’un délai de 7 jours après la livraison pour demander une révision ou signaler un problème.',
    'Sans retour dans ce délai, le livrable est considéré comme accepté et validé.'
  ] },
  { t: 'Délai de réclamation', blocks: [
    'Toute réclamation doit être formulée dans un délai maximal de 7 jours après la livraison. Passé ce délai, la prestation est réputée conforme.'
  ] },
  { t: 'Droit applicable', blocks: [
    'Les présentes CGV sont soumises au [droit applicable à confirmer]. En cas de litige, les parties s’efforceront de trouver une solution amiable.',
    'À défaut, le litige sera porté devant les tribunaux compétents du siège social de BNS Digital.'
  ] }
]

const KEY_ICONS = keysFr.map(k => k.icon)
const t = useLocaleText({
  fr: {
    title: 'Conditions Générales de Vente', eyebrow: 'Conditions générales', lead: 'Parce que des engagements clairs font les meilleurs partenariats.',
    articlesTitle: 'Conditions détaillées', articles: articlesFr, keys: keysFr.map(({ t, d }) => ({ t, d })),
    footnote: 'Les présentes conditions générales sont applicables à compter du 1er janvier 2026. BNS Digital se réserve le droit de les modifier à tout moment. Les modifications s’appliquent uniquement aux commandes et devis émis après la date de mise à jour.',
    seoTitle: 'Conditions Générales de Vente', seoDesc: 'Conditions générales de vente de BNS Digital : devis, paiement, délais, maintenance, propriété intellectuelle et responsabilités.'
  },
  en: TERMS_EN
})
usePageSeo({ title: () => t.value.seoTitle, description: () => t.value.seoDesc, noindex: true })
</script>

<style scoped>
.keys { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; margin-top: 16px; }
.keys__item { display: flex; flex-direction: column; gap: 12px; padding: 28px; background: var(--white); border: 1px solid var(--line); border-radius: 20px; }
.keys__i { width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; background: var(--accent-soft); color: var(--accent); }
.keys__t { font-size: 20px; font-weight: 700; letter-spacing: -.3px; }
.keys__d { font-size: 15px; line-height: 1.55; color: var(--muted); }

@media (max-width: 1180px) {
  .keys { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 720px) {
  .keys { grid-template-columns: minmax(0, 1fr); }
}
</style>
