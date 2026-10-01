-- Site BNS Digital : contenus dynamiques (réalisations, avis, blog) et données reçues (demandes de devis, rendez-vous).
-- Lecture publique (clé publishable/anon) limitée au contenu publié ; demandes et rendez-vous accessibles au seul serveur (clé secrète).

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

/* ---------------- Réalisations ---------------- */
create table public.projects (
  slug text primary key check (slug ~ '^[a-z0-9-]+$'),
  cat text not null check (cat in ('Plateforme', 'Vitrine', 'Ecommerce', 'Social', 'ADS')),
  client text not null,
  label_fr text not null,
  label_en text,
  desc_fr text not null,
  desc_en text,
  -- « [Résultat] » n'est jamais affiché : à remplacer par un vrai chiffre
  metric_fr text not null default '[Résultat]',
  metric_en text,
  bg text not null default '#E6ECF5',
  fg text not null default '#0B3A75',
  -- Chemin (/images/realisations/<slug>.webp, par défaut) ou URL complète d'un visuel 1600 px
  img text,
  url text,
  -- Ordre éditorial au sein de la catégorie
  position int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();

/* ---------------- Avis Google (textes verbatim) ---------------- */
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  -- AAAA-MM
  date text not null check (date ~ '^\d{4}-\d{2}$'),
  text text not null,
  rating int not null check (rating between 1 and 5),
  truncated boolean not null default false,
  translated boolean not null default false,
  position int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger reviews_updated_at before update on public.reviews for each row execute function public.set_updated_at();

/* ---------------- Blog (s'ajoute aux fichiers Markdown de content/blog ; même slug = l'article Supabase remplace le fichier) ---------------- */
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  lang text not null check (lang in ('fr', 'en')),
  slug text not null check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  seo_title text,
  description text not null default '',
  date date not null default current_date,
  updated date,
  -- Clé de BLOG_SECTORS (shared/blog.ts)
  sector text not null default 'pme',
  -- Slug FR du service lié
  service text,
  tags text[] not null default '{}',
  author text not null default 'BNS Digital',
  cover text,
  cover_alt text,
  -- Slug de la version dans l'autre langue
  translation text,
  -- Contenu en Markdown
  body text not null,
  draft boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lang, slug)
);
create trigger blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();

/* ---------------- Demandes de contact / devis ---------------- */
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text not null default 'fr',
  services text[] not null default '{}',
  budget text,
  timing text,
  message text,
  name text not null,
  company text,
  email text not null,
  phone text,
  website text,
  consent_at timestamptz not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost', 'spam'))
);
create index leads_created_at on public.leads (created_at desc);

/* ---------------- Rendez-vous (copie des appels créés dans l'agenda) ---------------- */
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  start_at timestamptz not null,
  end_at timestamptz not null,
  name text not null,
  email text not null,
  phone text,
  company text,
  mode text not null check (mode in ('visio', 'phone')),
  message text,
  locale text not null default 'fr',
  visitor_tz text,
  meet_link text,
  provider text,
  status text not null default 'booked' check (status in ('booked', 'done', 'no_show', 'cancelled'))
);
create index bookings_start_at on public.bookings (start_at);

/* ---------------- Accès ---------------- */
alter table public.projects enable row level security;
alter table public.reviews enable row level security;
alter table public.blog_posts enable row level security;
alter table public.leads enable row level security;
alter table public.bookings enable row level security;

create policy "Réalisations publiées lisibles" on public.projects for select to anon, authenticated using (published);
create policy "Avis publiés lisibles" on public.reviews for select to anon, authenticated using (published);
create policy "Articles publiés lisibles" on public.blog_posts for select to anon, authenticated using (not draft and date <= current_date);
-- leads et bookings : aucune politique, donc aucun accès avec la clé publique ; le serveur écrit avec la clé secrète.
