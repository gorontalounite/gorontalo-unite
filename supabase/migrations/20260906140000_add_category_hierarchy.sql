-- Real category hierarchy: categories can now have official sub-categories
-- (parent_id), managed from the news editor. This is additive — it does not
-- change how articles are classified into the 6 homepage desks today
-- (articles.categories text[] + the term-matching in berita/categories.ts
-- keep working exactly as before). The 7 desks become the root nodes here
-- (desk_key), so a sub-category created under "Culture" is resolvable back
-- to the Culture desk via its ancestor chain, without touching the existing
-- classification engine's default behaviour when no hierarchy match exists.

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  slug text not null unique,
  parent_id uuid references public.categories(id) on delete cascade,
  desk_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_no_self_parent check (parent_id is distinct from id)
);

create index categories_parent_id_idx on public.categories (parent_id);
create unique index categories_root_desk_key_idx on public.categories (desk_key) where parent_id is null;

create trigger categories_updated_at before update on public.categories
  for each row execute procedure public.set_updated_at();

alter table public.categories enable row level security;

grant select on public.categories to anon, authenticated;
grant insert, update, delete on public.categories to authenticated;

create policy "categories are public" on public.categories
  for select to anon, authenticated using (true);
create policy "staff manages categories" on public.categories
  for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));

insert into public.categories (name, slug, desk_key) values
  ('Culture', 'culture', 'culture'),
  ('Tourism', 'tourism', 'travel'),
  ('Culinary', 'culinary', 'culinary'),
  ('Lifestyle', 'lifestyle', 'life'),
  ('People', 'people', 'people'),
  ('Regional', 'regional', 'news'),
  ('What''s On', 'whats-on', 'whats-on');
