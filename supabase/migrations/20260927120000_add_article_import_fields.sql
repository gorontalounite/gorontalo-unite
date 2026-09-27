-- Additive fields for the "meja review berita" export pipeline: separate
-- thumbnail (illustration) vs overlay (real photo) images, plus editorial
-- metadata not previously tracked on public.articles.
alter table public.articles
  add column if not exists image_thumb_url text,
  add column if not exists image_overlay_url text,
  add column if not exists image_alt text,
  add column if not exists image_credit text,
  add column if not exists image_width integer,
  add column if not exists image_height integer,
  add column if not exists secondary_keyword text,
  add column if not exists status_review text,
  add column if not exists word_count integer,
  add column if not exists embeds jsonb not null default '[]'::jsonb,
  add column if not exists content_with_embeds text;

notify pgrst, 'reload schema';
