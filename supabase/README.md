# Supabase — contenus et données du site

Le site reste **prégénéré en statique** (SEO) : Supabase sert de back-office.

| Donnée | Table | Quand elle est lue ou écrite |
| --- | --- | --- |
| Réalisations | `projects` | Lue **au build** (`modules/cms.ts`) → pages prérendues, sitemap |
| Avis Google | `reviews` | Lue au build |
| Articles du blog | `blog_posts` | Lue au build, **en plus** des fichiers `content/blog/*.md` (même langue + slug : l'article Supabase remplace le fichier) |
| Demandes de devis | `leads` | Écrite à l'exécution par `POST /api/contact` |
| Rendez-vous | `bookings` | Écrite à l'exécution par `POST /api/booking/book` (en plus de l'agenda) |

Sans variables Supabase, rien ne change : le site utilise `app/data/content.ts` et les fichiers Markdown.
Dès que `NUXT_SUPABASE_URL` et `NUXT_SUPABASE_KEY` sont renseignés, **Supabase fait foi** pour les réalisations et les avis.

## Mise en place

1. Créer un projet sur supabase.com (région Europe, ex. Paris `eu-west-3`, pour le RGPD).
2. SQL Editor → exécuter `migrations/20260930000000_init.sql`, puis `seed.sql` (les 9 réalisations actuelles, FR + EN).
   Avec la CLI : `npx supabase link --project-ref <ref>` puis `npx supabase db push --include-seed`.
3. Renseigner dans `.env` (voir `.env.example`) :
   - `NUXT_SUPABASE_URL`, `NUXT_SUPABASE_KEY` (publishable) : environnement qui **génère** le site ;
   - `NUXT_SUPABASE_URL`, `NUXT_SUPABASE_SECRET_KEY` (secrète) : serveur qui fait tourner **l'API** (Node, le même que pour les rendez-vous).
4. `npm run generate` : le journal affiche `Supabase : 9 réalisations, 0 avis, 0 articles`.

La clé secrète ne doit jamais être préfixée `NUXT_PUBLIC_` ni utilisée côté navigateur.

## Publier un contenu

- **Réalisation** : ligne dans `projects`. Visuel : laisser `img` vide et déposer `public/images/realisations/<slug>.webp` (1600 px) et `<slug>-800.webp`, ou mettre l'URL complète d'une image (Supabase Storage par ex.). `metric_fr = [Résultat]` n'est jamais affiché ; une description qui commence par `[` rend la page projet `noindex`.
- **Avis** : ligne dans `reviews`, texte verbatim de la fiche Google, `date` au format `AAAA-MM`.
- **Article** : ligne dans `blog_posts`, corps en Markdown dans `body`. Il n'est publié que si `draft = false` et `date` ≤ aujourd'hui. `translation` = slug de la version dans l'autre langue.
- `published = false` masque une réalisation ou un avis sans le supprimer.

Puis **régénérer le site** : les pages sont figées au build. Pour l'automatiser, créer dans Supabase un *Database Webhook* (Database → Webhooks) sur `projects`, `reviews` et `blog_posts` (insert / update / delete) qui appelle le *deploy hook* de l'hébergeur (Vercel, Netlify, GitHub Actions…). En local, redémarrer `npm run dev`.

## Demandes et rendez-vous

Consultables dans Table Editor (`leads`, `bookings`) ; la colonne `status` sert au suivi (`new` → `contacted` → `quoted` → `won` / `lost`).
Elles contiennent des données personnelles : accès au projet Supabase limité à l'équipe, et durée de conservation à indiquer dans la politique de confidentialité (mentions légales, article 7).
