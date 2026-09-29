Contexte projet — Site BNS Digital (ex-refonte KPS Agency)
Document de passation pour reprendre le projet dans une autre session, un autre outil ou avec un autre développeur. Dernière mise à jour : 29 septembre 2026.


0. Repositionnement BNS Digital (29 septembre 2026) — prévaut sur les sections suivantes
Le site KPS Agency a été repris pour BNS Digital : agence digitale basée à Dakar (Sénégal) qui propose ses services aux entreprises européennes (France en priorité, Belgique, Suisse) et canadiennes (Québec et reste du Canada).
Décisions du client :
Marque et logo : BNS Digital, logo public/bns_digital_logo.png (recadré en public/logo-bns.webp). Palette tirée du logo : bleu marine #0A1A47 (--ink), bleu roi #0A56D8 (--accent), cyan #22B8F5 (--accent-light, sur fond sombre).
Domaine : https://bns-digital.com — e-mail contact@bns-digital.com.
Portfolio et avis KPS retirés (ce n'étaient pas des projets BNS) : PROJECTS et REVIEWS sont vides, les sections correspondantes sont masquées automatiquement ; la page /realisations affiche un message d'attente en noindex.
Pages marchés : france, paris, belgique, suisse, canada (Québec + Canada ; slug EN identique), dakar.
Arguments : qualité agence à coût maîtrisé, fuseau horaire proche (GMT : 1–2 h de Paris, 4–5 h d'avance sur Montréal), équipe francophone (et anglophone), chef de projet dédié / réactivité.
Rendez-vous : fuseau Africa/Dakar, lundi–samedi 9 h–18 h (choix par défaut, à valider), jours fériés sénégalais fixes ; fêtes musulmanes à ajouter dans BOOKING.closedDates.
Langues : hreflang « fr » et « en » génériques (au lieu de fr-FR / en-GB) pour couvrir France, Belgique, Suisse, Québec et Canada anglophone.
À compléter : raison sociale, forme juridique, RCCM, NINEA, adresse à Dakar, téléphone, directeur de la publication, hébergeur, droit applicable des CGV et mentions légales (emplacements [ ... ] dans content.ts, mentions-legales.vue, cgv.vue, legal.en.ts), profils sociaux (COMPANY.sameAs), fiche Google et avis, réalisations BNS.
Les sections 1 à 8 ci-dessous décrivent l'historique KPS Agency ; les données clients KPS qui y figurent ne doivent plus être utilisées sur le site.


1. Le client et l'objectif
Client : KPS Agency, agence digitale basée à Paris (site actuel : https://kps-agency.com).
Services (liste donnée par le client) :
Création de site (vitrine, blog, landing page, e-commerce)
Application métier sur mesure
Référencement SEO & GEO
Application mobile
Marketing digital (ADS)
Social / Médias (visuel & vidéo), repris du site actuel
Objectif : réorganiser et redesigner entièrement le site en s'inspirant de l'architecture de https://www.feedbird.com (hero + preuve sociale, services, « comment ça marche », portfolio filtrable, comparatif, avis, FAQ, CTA final, méga-footer avec pages villes/secteurs pour le SEO).
Rôle attendu de l'IA : designer UI/UX senior, expert des sites d'agences digitales et du marché français/européen.
2. Décisions validées par le client
Sujet
Décision
Prix
Pas de prix affichés, devis uniquement
Direction visuelle
Clair, premium, B2B
Cible prioritaire
PME / TPE françaises
Page d'accueil retenue
Design v1 (première maquette)
Pages internes
Style du design v1 + ton éditorial « grande agence »
Stack
Nuxt (Vue 3), pour le SEO. Nuxt 4 utilisé, c'est la version actuelle
Dépôt
https://github.com/petaliadmin/kps-agency, branche main

3. Règle de contenu (importante)
Le client a demandé : « utiliser les données de kps-agency.com, n'invente rien, les données seront complétées après ».

Aucun chiffre, avis, témoignage, délai ou promesse inventé.
Tout ce qui manque va dans un emplacement entre crochets : [Résultat], [Témoignage client], [Adresse], [Téléphone], [Visuel du projet], etc.
Exception connue : la home v1 (retenue par le client) contient des promesses à faire valider par KPS : « Devis gratuit sous 48 h », « Sans engagement », « Chef de projet dédié », « Audit offert », les délais du tableau comparatif (« Sous 1 semaine », « 3 à 6 semaines »…), les réponses de la FAQ, la liste des villes et secteurs du footer.
Formulations des pages internes aussi à valider : « Un devis détaillé, poste par poste », « Nous livrons vite », « Des sites simples à administrer », tag « A/B test » sur les landing pages, fourchettes de budget du formulaire de devis.
Données réelles disponibles (issues du site actuel)
Contact : contact@kps-agency.com
Clients / projets Web : PowerCell Group (Énergie renouvelable), Fibbl (SaaS B2B), Coaching und Therapie Foscolo (Services professionnels), Cushman & Wakefield Veritas (Immobilier), Dunstan (Animaliers), Copenhagen Energy (Énergie), Radiumhemmets Forskningsfonder (Recherche).
Social/Médias : KPMG (audit & analyse audience), ZAYN (308.8K couverture, 6.5K interactions), BR Finanzen, Campagnes Beauté & Santé, Laboratoire Jardins de Carthage.
ADS : LORE & HEART, YASSIR (3.9M reach Facebook, 1.4M Instagram, 5M paid reach), groupado PRO (1.7M paid reach, 6.4M impressions), Galeries LIVE, Founa.com by SMG, Brasileia Cosmetics (1.8M views, 996K coverage), ProstarSEO, Tunisia Franchise Show (2.2M reach, 2.9K interactions).
Textes repris : « Agence Créative Next-Gen », « Plus qu'une agence, votre co-pilote digital », ADN (Vision stratégique, Le Crew KPS, Croissance accélérée), workflow en 4 étapes (Le Choix, Le Brief, La Stratégie, Le Décollage), « Pourquoi choisir la Team KPS » (Rapide, Ciblé, Malin, Top Tier).
Les sous-pages /sites-web, /ads et /social-medias du site actuel n'ont pas pu être lues : à récupérer si elles contiennent d'autres textes.
4. Ligne éditoriale (pages internes)
Ton de grande agence française : sobre, assuré, orienté résultat client. Phrases courtes, vocabulaire business (croissance, performance, résultats), pas de jargon créatif.
Positionnement : « Six expertises. Une seule équipe. Un objectif : votre croissance. » On vend la synergie des expertises plutôt que chaque service isolé.
L'angle GEO / IA générative (ChatGPT, Gemini, Perplexity) est un argument différenciant.
Le ton « surf / renard » du site actuel est abandonné.
5. Design system
Tokens définis dans app/assets/css/main.css :

Token
Valeur
Usage
--bg
#F7F6F2
Fond principal (ivoire chaud)
--ink
#0E1726
Texte, sections sombres, footer
--accent
#1F3FE0
Bleu cobalt : CTA, eyebrows, chiffres
--accent-soft
#EEF1FF
Fonds d'accent légers
--muted
#4A5363
Texte secondaire
--line
#E3E1DA
Bordures
--dark-2
#1A2538
Cartes sur fond sombre


Typographies : Bricolage Grotesque (titres, 700–800) + Geist (texte, 400–600). Auto-hébergées via @fontsource-variable (pas de Google Fonts, pour le RGPD).
Grille : desktop 1440 px, marges latérales 80 px ; tablette ≤ 1180 px (marges 40 px) ; mobile ≤ 720 px (marges 20 px).
Échelle : H1 76–96 px, H2 48–56 px, texte 16–20 px ; rayons 20 px (cartes), 28–32 px (grands blocs), boutons en pilule.
Couleurs des cartes projets : fond pastel + couleur de texte par projet (dans app/data/content.ts).
6. Maquettes (canevas Design)
Canevas : https://claude.ai/artifact/XvNMcv57TZC4Jqp82vL7LE (privé, à partager depuis le menu Share si besoin).
4 rangées :
Accueil : Home Design v1 (retenue), Arborescence du site, Home version éditoriale (archive).
Pages Services : Création de site web, Application métier, SEO & GEO, Application mobile, Marketing digital & ADS, Social media & contenus (un seul gabarit Service.dc.html décliné par une option svc).
Réalisations (portfolio filtrable), Fiche projet YASSIR, L'agence, Contact & devis (3 étapes), Ville — Paris, Secteur — Énergie.
Composants partagés : en-tête, pied de page.
7. Code (Nuxt 4)
État du dépôt
Tout le code est committé en local sur la branche main (commit 775b6dd et suivants).
Le push vers GitHub a échoué : la session d'origine n'avait pas l'autorisation d'écrire sur petaliadmin/kps-agency. Le dépôt distant est encore vide.
Le code a été livré en kps-agency-site.zip et kps-agency.bundle. Pour pousser :

git clone kps-agency.bundle kps-agency && cd kps-agency

git remote set-url origin https://github.com/petaliadmin/kps-agency.git

git push -u origin main
Structure
app/

  app.vue, error.vue

  layouts/default.vue          # SiteHeader + page + SiteFooter

  assets/css/main.css          # tokens, boutons, grilles, responsive

  data/content.ts              # TOUS les contenus : projets, services, pages locales, footer, contact

  components/                  # SiteHeader, SiteFooter, SiteLogo, Breadcrumb (+ JSON-LD),

                               # FaqList (accordéon accessible), ProjectCard, CtaBand, LegalPage, IconCheck, IconArrow

  pages/

    index.vue                  # Home v1 (layout: false, avec sa propre barre du haut, sa nav et son footer, comme la maquette)

    services/index.vue         # liste des 6 expertises (page ajoutée, absente des maquettes)

    services/[slug].vue        # creation-site-web | application-metier | referencement-seo-geo | application-mobile | marketing-digital-ads | social-media

    realisations/index.vue     # portfolio filtrable + bandeau de chiffres réels

    realisations/[slug].vue    # étude de cas complète pour yassir, gabarit générique pour les autres

    agence.vue, contact.vue    # contact = assistant de devis en 3 étapes

    agence-digitale/[slug].vue # paris | energie (landing pages SEO)

    cgv.vue, mentions-legales.vue

public/  favicon.svg, robots.txt
Commandes
npm install

npm run dev        # http://localhost:3000

npm run generate   # site statique dans .output/public
Vérifications faites
nuxt generate génère les 38 pages sans erreur.
Captures en 1440 px comparées aux maquettes : home 8 075 px de haut pour 8 000 sur la maquette.
Aucun débordement horizontal à 390 px (mobile) sur les pages testées.
Points techniques en suspens
Formulaires : aucun envoi réel. Brancher un service via la variable NUXT_PUBLIC_FORM_ENDPOINT (Formspree, Brevo, API…). Sans elle, /contact affiche la confirmation sans rien envoyer, et le formulaire de la home redirige vers /contact.
Pas de sitemap.xml (ajouter @nuxtjs/sitemap), pas d'images Open Graph, pas d'analytics ni de bannière cookies (obligatoire en France/CNIL si traceurs).
Visuels des projets : blocs de couleur à remplacer par de vraies images (optimiser avec @nuxt/image).
Pages villes/secteurs : seules paris et energie existent ; en ajouter d'autres dans LOCAL_PAGES (app/data/content.ts).
Le menu « Secteurs » et le fil d'Ariane « Agence digitale / Secteurs » n'ont pas de page index.
8. Prochaines étapes proposées
Pousser le code sur main (voir ci-dessus).
Faire valider par KPS les promesses et formulations listées en section 3.
Remplir les emplacements [...] : témoignages, note Google, résultats projets Web, adresse, téléphone, équipe, photos, textes légaux.
Brancher le formulaire, ajouter sitemap, OG images, bannière cookies, analytics.
Maquettes mobiles dédiées (le code est déjà responsive), puis déploiement (Vercel, Netlify ou OVH en statique).
Éventuellement : aligner le texte de la home v1 sur le ton éditorial des pages internes.
