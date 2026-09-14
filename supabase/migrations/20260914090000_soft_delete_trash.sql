-- A recycle bin for the four content tables.
--
-- Until now every admin "Hapus" ran a real DELETE: the row left Postgres and
-- the only way back was a Supabase point-in-time restore. An article also took
-- its comments with it, through `comments.article_id ... on delete cascade`.
--
-- The bin is one nullable timestamp per table rather than a boolean or a
-- separate table. `deleted_at is null` means live; a timestamp means binned,
-- and it records *when*, which a boolean cannot — that is what an age-based
-- purge (30 days, say) will read later.
--
-- `archived` on tourism_places / events is deliberately left alone. Archiving
-- is a choice an editor makes and never expects to undo; the bin is for
-- accidents. Folding one into the other would make "Pulihkan" ambiguous.
--
--
-- Keeping binned rows off the public site
-- ---------------------------------------
-- Two independent guards, because a single forgotten `deleted_at is null` in
-- one public query would otherwise put deleted content back on the site.
--
--   1. RLS. The public select policies now require `deleted_at is null` for
--      anyone who is not staff. No query written by anon can return a binned
--      row, whatever its WHERE clause says.
--
--   2. A check constraint. Binning a row also unpublishes it, and the database
--      refuses any other combination. Every public query already filters on
--      `published` / `status`, so they all exclude binned rows without being
--      touched at all — including a staff member browsing the public site
--      while signed in, whom guard 1 alone would not cover.
--
-- Staff keep read access to binned rows (that is what the Sampah tab shows);
-- the admin screens filter them out of the normal views themselves.

-- 1 ------------------------------------------------------------------ column

alter table public.articles        add column if not exists deleted_at timestamptz;
alter table public.tourism_places  add column if not exists deleted_at timestamptz;
alter table public.events          add column if not exists deleted_at timestamptz;
alter table public.reels           add column if not exists deleted_at timestamptz;

comment on column public.articles.deleted_at is
  'Null = live. A timestamp means the row is in the admin recycle bin: hidden from the public site, restorable, and deleted for real only from the Sampah tab.';
comment on column public.tourism_places.deleted_at is 'See public.articles.deleted_at.';
comment on column public.events.deleted_at is 'See public.articles.deleted_at.';
comment on column public.reels.deleted_at is 'See public.articles.deleted_at.';

-- 2 -------------------------------------------------------- binned = unpublished

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'articles_binned_is_unpublished') then
    alter table public.articles add constraint articles_binned_is_unpublished
      check (deleted_at is null or not published);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'tourism_places_binned_is_unpublished') then
    alter table public.tourism_places add constraint tourism_places_binned_is_unpublished
      check (deleted_at is null or not published);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'events_binned_is_unpublished') then
    alter table public.events add constraint events_binned_is_unpublished
      check (deleted_at is null or not published);
  end if;

  -- Reels model the same state as text rather than a boolean.
  if not exists (select 1 from pg_constraint where conname = 'reels_binned_is_draft') then
    alter table public.reels add constraint reels_binned_is_draft
      check (deleted_at is null or status = 'draft');
  end if;
end $$;

-- 3 ------------------------------------------------------------------ indexes
-- Only the bin needs its own index: the live listings already sort on
-- (published, …) and a binned row is never published.

create index if not exists articles_trash_idx       on public.articles       (deleted_at desc) where deleted_at is not null;
create index if not exists tourism_places_trash_idx on public.tourism_places (deleted_at desc) where deleted_at is not null;
create index if not exists events_trash_idx         on public.events         (deleted_at desc) where deleted_at is not null;
create index if not exists reels_trash_idx          on public.reels          (deleted_at desc) where deleted_at is not null;

-- 4 --------------------------------------------------------------------- RLS

drop policy if exists "published articles are public"       on public.articles;
drop policy if exists "published tourism places are public" on public.tourism_places;
drop policy if exists "published events are public"         on public.events;
drop policy if exists "published reels are public"          on public.reels;

create policy "published articles are public"
  on public.articles for select to anon, authenticated
  using ((published and deleted_at is null) or (select private.is_staff()));

create policy "published tourism places are public"
  on public.tourism_places for select to anon, authenticated
  using ((published and deleted_at is null) or (select private.is_staff()));

create policy "published events are public"
  on public.events for select to anon, authenticated
  using ((published and deleted_at is null) or (select private.is_staff()));

create policy "published reels are public"
  on public.reels for select to anon, authenticated
  using ((status = 'published' and deleted_at is null) or (select private.is_staff()));
