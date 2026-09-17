-- What the newsroom has already done with a lead from the radar.
--
-- The radar itself is not stored. Feeds are re-read every few minutes and
-- thrown away; keeping copies of other outlets' headlines would be a database
-- of somebody else's work for no benefit. What persists is only the editor's
-- own decision: covered, being written, or skipped.
--
-- Without that, the panel shows the same hundred headlines every morning and
-- stops being opened within a fortnight. The marks are the feature.
--
-- Keyed by fingerprint rather than URL: the same story reaches the radar from
-- several outlets and through Google News redirects, so the URL is not stable
-- while the story is.

create table if not exists public.news_leads (
  fingerprint  text primary key,
  url          text not null,
  title        text not null,
  source       text,
  published_at timestamptz,
  status       text not null default 'digarap'
                 check (status in ('digarap', 'ditulis', 'lewati')),
  -- Set when a lead turns into an article, so the panel can show what came of it.
  article_id   uuid references public.articles(id) on delete set null,
  marked_by    uuid references public.user_profiles(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.news_leads is
  'Editor decisions on items surfaced by the news radar. Only marked items are stored; the feed itself is never persisted.';
comment on column public.news_leads.fingerprint is
  'Stable identity for a story across outlets: normalised title words. The URL is not stable, the story is.';

create index if not exists news_leads_status_idx on public.news_leads (status, updated_at desc);

alter table public.news_leads enable row level security;

-- Staff only, in both directions. Nothing here is public: it reveals what the
-- newsroom is working on before it publishes.
create policy "staff manages news leads" on public.news_leads
  for all to authenticated
  using ((select private.is_staff()))
  with check ((select private.is_staff()));
