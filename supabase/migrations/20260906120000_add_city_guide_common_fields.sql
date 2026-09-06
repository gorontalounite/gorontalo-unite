-- Common City Guide fields for tourism_places and events, so the shared
-- admin dashboard (formerly "Wisata") can manage Explore/Eat/Stay/Shop/
-- Services listings with the same field set.
--
-- rating/review_count are added as schema-ready columns only — no admin
-- input is exposed for them yet, since there is no real review system to
-- source them from (see project data-quality rule: never fabricate ratings).
--
-- status stays modelled as published + archived (not a new enum) so the
-- existing RLS policies (`using (published or is_staff())`) keep working
-- unchanged: archived rows are always published = false.

alter table public.tourism_places
  add column if not exists subcategory text,
  add column if not exists latitude numeric(9, 6),
  add column if not exists longitude numeric(9, 6),
  add column if not exists tags text[] not null default '{}',
  add column if not exists price_range text,
  add column if not exists rating numeric(2, 1),
  add column if not exists review_count integer not null default 0,
  add column if not exists archived boolean not null default false;

alter table public.events
  add column if not exists subcategory text,
  add column if not exists latitude numeric(9, 6),
  add column if not exists longitude numeric(9, 6),
  add column if not exists tags text[] not null default '{}',
  add column if not exists rating numeric(2, 1),
  add column if not exists review_count integer not null default 0,
  add column if not exists archived boolean not null default false,
  add column if not exists listing_details jsonb not null default '{}'::jsonb;

comment on column public.tourism_places.rating is 'Aggregate rating from a real review source only — never admin-entered.';
comment on column public.tourism_places.review_count is 'Count backing the rating column — never admin-entered.';
comment on column public.events.rating is 'Aggregate rating from a real review source only — never admin-entered.';
comment on column public.events.review_count is 'Count backing the rating column — never admin-entered.';
