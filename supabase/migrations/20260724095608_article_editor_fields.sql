-- Keep the already-applied core migration compatible with the existing block editor.
alter table public.articles
  add column if not exists blocks jsonb not null default '[]'::jsonb,
  add column if not exists project_url text,
  add column if not exists extra_images text[] not null default '{}',
  add column if not exists seo_title text,
  add column if not exists seo_description text;
