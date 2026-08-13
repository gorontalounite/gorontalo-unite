-- Separate City Guide resources from editorial news.
create table public.tourism_places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text,
  gallery text[] not null default '{}',
  category text,
  location text,
  address text,
  maps_url text,
  opening_hours text,
  contact text,
  website_url text,
  seo_title text,
  seo_description text,
  featured boolean not null default false,
  published boolean not null default false,
  author_id uuid references public.user_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  image_url text,
  gallery text[] not null default '{}',
  category text,
  venue text,
  address text,
  maps_url text,
  organizer text,
  registration_url text,
  contact text,
  price_label text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  seo_title text,
  seo_description text,
  featured boolean not null default false,
  published boolean not null default false,
  author_id uuid references public.user_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_ends_after_starts check (ends_at is null or ends_at >= starts_at)
);

create index tourism_places_public_idx on public.tourism_places (featured desc, updated_at desc) where published;
create index events_public_idx on public.events (starts_at asc) where published;
create index tourism_places_author_id_idx on public.tourism_places (author_id);
create index events_author_id_idx on public.events (author_id);

create trigger tourism_places_updated_at before update on public.tourism_places
  for each row execute procedure public.set_updated_at();
create trigger events_updated_at before update on public.events
  for each row execute procedure public.set_updated_at();

alter table public.tourism_places enable row level security;
alter table public.events enable row level security;

grant select on public.tourism_places, public.events to anon, authenticated;
grant insert, update, delete on public.tourism_places, public.events to authenticated;

create policy "published tourism places are public" on public.tourism_places
  for select to anon, authenticated using (published or (select private.is_staff()));
create policy "staff manages tourism places" on public.tourism_places
  for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));

create policy "published events are public" on public.events
  for select to anon, authenticated using (published or (select private.is_staff()));
create policy "staff manages events" on public.events
  for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
