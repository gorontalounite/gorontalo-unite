-- Two columns the redesigned admin grids need and the schema did not have.
--
-- articles.video_url  — the News grid shows a "Video URL" column (YouTube or
--                       similar) next to each story. Nothing on the public site
--                       reads it yet; it is editorial metadata for now.
-- reels.title         — the Reels grid leads with a title. Reels were captured
--                       from Instagram, where the caption is the only text, so
--                       existing rows are backfilled from the caption's first
--                       line rather than left blank. Nothing is invented.
--
-- Both are nullable and additive: existing reads and RLS policies are untouched.

alter table public.articles
  add column if not exists video_url text;

alter table public.reels
  add column if not exists title text;

comment on column public.articles.video_url is 'Optional video companion (YouTube etc.) shown in the admin News grid.';
comment on column public.reels.title is 'Short admin-facing label; backfilled from the first line of the Instagram caption.';

update public.reels
   set title = left(btrim(split_part(description, E'\n', 1)), 90)
 where title is null
   and btrim(description) <> '';
