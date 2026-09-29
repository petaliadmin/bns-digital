# BNS Digital — site vitrine

Site de BNS Digital, agence digitale basée à Dakar (Sénégal) au service des entreprises en France, en Europe et au Canada. Développé avec **Nuxt 4 / Vue 3** (reprise du site KPS Agency, rebrandé en septembre 2026).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # site statique dans .output/public (hébergement type Netlify, Vercel, OVH…)
npm run build      # build serveur (Node) si besoin de SSR
```

Node 20 ou plus récent requis.

## Pages

| Route | Page |
| --- | --- |
| `/` | Accueil (design v1) |
| `/services` | Liste des expertises |
| `/services/:slug` | Pages service : `creation-site-web`, `application-metier`, `referencement-seo-geo`, `application-mobile`, `marketing-digital-ads`, `social-media` |
| `/realisations` | Portfolio filtrable ; message d'attente (noindex) tant que `PROJECTS` est vide |
| `/realisations/:slug` | Fiche projet |
| `/agence` | L'agence : ADN, méthode, équipe |
| `/contact` | Demande de devis en 3 étapes |
| `/agence-digitale/:slug` | Pages marchés : `france`, `paris`, `belgique`, `suisse`, `canada`, `dakar` |
| `/rendez-vous` | Réservation d'un appel (créneaux en heure de Dakar, affichés dans le fuseau du visiteur) |
| `/cgv`, `/mentions-legales` | Pages légales (contenu à fournir) |

## Où modifier les contenus

- `app/data/content.ts` : coordonnées et identité légale (`CONTACT`, `COMPANY`), avis, projets, services, pages marchés. Les sections Réalisations et Avis s'affichent automatiquement dès que `PROJECTS` / `REVIEWS` sont remplis.
- `app/data/content.en.ts` : versions anglaises.
- `app/data/home.ts` : textes de la page d'accueil.
- `shared/booking.ts` : horaires et jours fériés des rendez-vous (fêtes musulmanes à ajouter chaque année dans `closedDates`).
- `app/assets/css/main.css` : couleurs, typographie, boutons (design tokens).

Les textes entre crochets `[...]` sont des emplacements à compléter (témoignages, résultats, adresse, téléphone, visuels…).

## Formulaires

Les formulaires (accueil et `/contact`) n'envoient rien tant qu'aucun service n'est branché. Définissez la variable
`NUXT_PUBLIC_FORM_ENDPOINT` (URL d'un service comme Formspree, Brevo ou d'une API interne acceptant un POST JSON) pour activer l'envoi depuis `/contact`.

## Notes techniques

- Polices auto-hébergées (`@fontsource-variable`) : pas d'appel à Google Fonts, conforme RGPD.
- SEO : balises title/description par page, données structurées (fil d'Ariane, FAQ, ProfessionalService), `robots.txt`.
- Responsive : maquettes desktop 1440 px, adaptations tablette (≤ 1180 px) et mobile (≤ 720 px).
