<template>
  <LegalPage
    :title="t.title"
    :eyebrow="t.eyebrow"
    :lead="t.lead"
    :articles="t.articles"
  />
</template>

<script setup lang="ts">
import type { LegalArticle } from '~/components/LegalPage.vue'
import { COMPANY, CONTACT } from '~/data/content'
import { LEGAL_EN } from '~/data/legal.en'


const mail: [string, string, string] = ['Contact', CONTACT.email, `mailto:${CONTACT.email}`]

const articlesFr: LegalArticle[] = [
  { t: 'Éditeur du site', blocks: [
    'Le présent site web bns-digital.com est édité par l’agence BNS Digital, basée à Dakar (Sénégal).',
    { kv: [
      ['Raison sociale', COMPANY.legalName],
      ['Forme juridique', COMPANY.legalForm],
      ['Siège social', `${COMPANY.street}, Dakar, Sénégal`],
      ['RCCM', COMPANY.rccm],
      ['NINEA', COMPANY.ninea],
      ['Directeur de la publication', '[Nom du directeur de la publication]'],
      mail
    ] }
  ] },
  { t: 'Hébergement', blocks: [
    'L’hébergement du site est assuré par la société suivante :',
    { kv: [
      ['Hébergeur', '[Hébergeur]'],
      ['Adresse', '[Adresse de l’hébergeur]'],
      ['Site web', '[Site de l’hébergeur]']
    ] }
  ] },
  { t: 'Propriété intellectuelle et contrefaçons', blocks: [
    'L’ensemble du contenu de ce site (textes, images, vidéos, logos, design, code source) est la propriété exclusive de BNS Digital, sauf mention contraire expresse.',
    'Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de BNS Digital.',
    'Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux lois applicables en matière de propriété intellectuelle.'
  ] },
  { t: 'Conditions générales d’utilisation (CGU)', blocks: [
    'L’utilisation du site bns-digital.com implique l’acceptation pleine et entière des conditions générales d’utilisation. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment.',
    'Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut toutefois être décidée par BNS Digital, qui s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention.'
  ] },
  { t: 'Limitations de responsabilité', blocks: [
    'BNS Digital agit en tant qu’éditeur du site et s’efforce de fournir des informations aussi précises que possible. Toutefois, l’agence ne pourra être tenue responsable des oublis, inexactitudes et carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.',
    'BNS Digital décline toute responsabilité quant aux éventuels dysfonctionnements pouvant survenir sur le site et entraîner une perte de données ou une indisponibilité de l’accès aux informations produites sur celui-ci.'
  ] },
  { t: 'Gestion des données personnelles', blocks: [
    'BNS Digital traite les données personnelles dans le respect de la loi sénégalaise n° 2008-12 du 25 janvier 2008 sur la protection des données à caractère personnel et, pour les utilisateurs situés dans l’Union européenne, du Règlement général sur la protection des données (RGPD, n° 2016/679). Pour les utilisateurs situés au Canada, nous tenons compte de la LPRPDE et, au Québec, de la Loi 25.',
    'Pour les données personnelles collectées dans le cadre de la navigation de l’Utilisateur ou via nos formulaires, le responsable du traitement est BNS Digital.',
    'BNS Digital s’engage à respecter le cadre des dispositions légales en vigueur. Aucune information personnelle de l’utilisateur du site n’est publiée à son insu, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers.'
  ] },
  { t: 'Politique de confidentialité et exercice des droits', blocks: [
    'Conformément à la réglementation applicable, les utilisateurs de bns-digital.com disposent des droits suivants :',
    ['droit d’accès, de rectification, de mise à jour et de complétude des données ;', 'droit de verrouillage ou d’effacement des données ;', 'droit de retirer à tout moment un consentement ;', 'droit à la limitation du traitement.'],
    'Pour exercer ces droits, vous pouvez contacter BNS Digital par e-mail en joignant une copie d’une pièce d’identité valide :',
    { kv: [mail] }
  ] },
  { t: 'Liens hypertextes et cookies', blocks: [
    'Le site bns-digital.com contient un certain nombre de liens hypertextes vers d’autres sites. Cependant, BNS Digital n’a pas la possibilité de vérifier le contenu des sites ainsi visités et n’assumera en conséquence aucune responsabilité de ce fait.',
    { h: 'Cookies' },
    'La navigation sur le site est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Un cookie est un fichier de petite taille, qui ne permet pas l’identification de l’utilisateur, mais qui enregistre des informations relatives à la navigation d’un ordinateur sur un site.',
    'Le refus d’installation d’un cookie peut entraîner l’impossibilité d’accéder à certains services. L’utilisateur peut toutefois configurer son ordinateur pour refuser l’installation des cookies.'
  ] },
  { t: 'Droit applicable et attribution de juridiction', blocks: [
    'Tout litige en relation avec l’utilisation du site bns-digital.com est soumis au [droit applicable à confirmer]. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents du siège social de BNS Digital.'
  ] },
  { t: 'Contact et réclamations', blocks: [
    'Pour tout signalement de contenu ou d’activités illicites, ou pour toute question concernant les présentes mentions légales, l’Utilisateur peut contacter l’Éditeur par courrier électronique :',
    { kv: [mail] }
  ] }
]

const t = useLocaleText({
  fr: {
    title: 'Mentions légales', eyebrow: 'Informations légales', lead: 'Informations réglementaires concernant le site, nos engagements et l’activité de BNS Digital.', articles: articlesFr,
    seoTitle: 'Mentions légales', seoDesc: 'Mentions légales du site bns-digital.com : éditeur, hébergement, propriété intellectuelle, données personnelles et cookies.'
  },
  en: LEGAL_EN
})
usePageSeo({ title: () => t.value.seoTitle, description: () => t.value.seoDesc, noindex: true })
</script>
