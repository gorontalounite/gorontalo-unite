-- An editor's pick for News, alongside the existing Featured tick.
--
-- Featured already exists as `is_trending`, but it does one job: what leads
-- the page. This is the second, quieter shelf — the pieces an editor wants
-- surfaced without displacing the lead. Reels has had the same tick since
-- 20260914200000; this gives articles the matching column.
--
-- Nothing on the public site reads it yet. The column and the admin tick come
-- first so editors can start marking; the section that shows them is a
-- separate decision and a separate change.
--
-- Defaults to false, so no existing article is silently promoted.

alter table public.articles
  add column if not exists editor_choice boolean not null default false;

comment on column public.articles.editor_choice is
  'Ticked by an editor to mark the article as an editor''s pick. Independent of is_trending (Featured) — an article can be both, either, or neither. No public surface reads it yet.';

-- Partial index: the picks are a small slice of the table and are always read
-- newest-first, so this stays tiny and covers the only query shape planned.
create index if not exists articles_editor_choice_idx
  on public.articles (published_at desc) where editor_choice;
