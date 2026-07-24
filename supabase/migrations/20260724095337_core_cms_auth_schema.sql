-- Core production schema for Gorontalo Unite.
-- Scraped editorial material deliberately remains local until an explicit import.

create extension if not exists pgcrypto;
create schema private;
revoke all on schema private from public;

create type public.app_role as enum ('user', 'editor', 'admin');
create type public.rag_upload_status as enum ('pending', 'embedding', 'done', 'failed');

create table public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 300),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text,
  content text,
  blocks jsonb not null default '[]'::jsonb,
  image_url text,
  image_prompt text,
  category text not null default 'Umum',
  categories text[] not null default '{}',
  tags text[] not null default '{}',
  source_name text,
  source_url text,
  source_published_at timestamptz,
  project_url text,
  extra_images text[] not null default '{}',
  seo_title text,
  seo_description text,
  author_id uuid references public.user_profiles(id) on delete set null,
  published boolean not null default false,
  published_at timestamptz,
  is_trending boolean not null default false,
  allow_comments boolean not null default true,
  view_count bigint not null default 0 check (view_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_articles_need_date check (not published or published_at is not null)
);

create index articles_public_listing_idx on public.articles (published, published_at desc);
create index articles_category_idx on public.articles (category);
create index articles_categories_gin_idx on public.articles using gin (categories);
create index articles_tags_gin_idx on public.articles using gin (tags);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid references public.user_profiles(id) on delete set null,
  user_name text not null,
  user_email text,
  content text not null check (char_length(content) between 3 and 2000),
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index comments_article_created_idx on public.comments (article_id, created_at);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.user_profiles(id) on delete set null,
  user_message text not null check (char_length(user_message) <= 2000),
  ai_response text not null,
  sources jsonb not null default '[]'::jsonb,
  feedback text check (feedback in ('up', 'down')),
  created_at timestamptz not null default now()
);
create index conversations_user_created_idx on public.conversations (user_id, created_at desc);

create table public.knowledge_base (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text not null default 'RAG',
  tags text[] not null default '{}',
  source_url text,
  author_id uuid references public.user_profiles(id) on delete set null,
  source_upload_id uuid,
  embedding jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index knowledge_base_active_idx on public.knowledge_base (is_active, updated_at desc);

create table public.rag_uploads (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  file_type text,
  file_size bigint not null check (file_size >= 0),
  chunks_created integer not null default 0 check (chunks_created >= 0),
  elements_processed integer not null default 0 check (elements_processed >= 0),
  status public.rag_upload_status not null default 'pending',
  error_message text,
  uploaded_by uuid references public.user_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.knowledge_base
  add constraint knowledge_base_source_upload_id_fkey
  foreign key (source_upload_id) references public.rag_uploads(id) on delete set null;

create table public.affiliate_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  price numeric,
  price_label text,
  marketplace_url text not null,
  marketplace_name text,
  tags text[] not null default '{}',
  category text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  affiliate_item_id uuid not null references public.affiliate_items(id) on delete cascade,
  clicked_at timestamptz not null default now(),
  user_agent text
);
create index affiliate_clicks_item_id_idx on public.affiliate_clicks (affiliate_item_id);
create index affiliate_clicks_clicked_at_idx on public.affiliate_clicks (clicked_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    case when lower(new.email) = 'gorontalounitemediahub@gmail.com' then 'admin'::public.app_role else 'user'::public.app_role end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace function private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_profiles
    where id = (select auth.uid()) and role in ('admin', 'editor')
  );
$$;

create or replace function public.increment_view_count(article_slug text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.articles
  set view_count = view_count + 1
  where slug = article_slug and published = true;
$$;

revoke all on function public.increment_view_count(text) from public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure private.handle_new_user();

create trigger user_profiles_updated_at before update on public.user_profiles for each row execute procedure public.set_updated_at();
create trigger articles_updated_at before update on public.articles for each row execute procedure public.set_updated_at();
create trigger comments_updated_at before update on public.comments for each row execute procedure public.set_updated_at();
create trigger knowledge_base_updated_at before update on public.knowledge_base for each row execute procedure public.set_updated_at();
create trigger rag_uploads_updated_at before update on public.rag_uploads for each row execute procedure public.set_updated_at();
create trigger affiliate_items_updated_at before update on public.affiliate_items for each row execute procedure public.set_updated_at();

alter table public.user_profiles enable row level security;
alter table public.articles enable row level security;
alter table public.comments enable row level security;
alter table public.conversations enable row level security;
alter table public.knowledge_base enable row level security;
alter table public.rag_uploads enable row level security;
alter table public.affiliate_items enable row level security;
alter table public.affiliate_clicks enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.articles, public.comments, public.affiliate_items to anon, authenticated;
grant select, insert, update, delete on public.user_profiles, public.articles, public.comments, public.conversations, public.knowledge_base, public.rag_uploads, public.affiliate_items, public.affiliate_clicks to authenticated;

create policy "published articles are public" on public.articles for select to anon, authenticated using (published or (select private.is_staff()));
create policy "staff manages articles" on public.articles for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "users read own profile" on public.user_profiles for select to authenticated using (id = (select auth.uid()) or (select private.is_staff()));
create policy "users update own profile" on public.user_profiles for update to authenticated using (id = (select auth.uid()) or (select private.is_staff())) with check (id = (select auth.uid()) or (select private.is_staff()));
create policy "staff reads profiles" on public.user_profiles for select to authenticated using ((select private.is_staff()));
create policy "approved comments are public" on public.comments for select to anon, authenticated using (approved or (select private.is_staff()));
create policy "users create their comments" on public.comments for insert to authenticated with check (user_id = (select auth.uid()));
create policy "staff manages comments" on public.comments for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "users read own conversations" on public.conversations for select to authenticated using (user_id = (select auth.uid()) or (select private.is_staff()));
create policy "users create own conversations" on public.conversations for insert to authenticated with check (user_id = (select auth.uid()));
create policy "users update own conversations" on public.conversations for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "staff manages knowledge base" on public.knowledge_base for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff manages rag uploads" on public.rag_uploads for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "published affiliate items are public" on public.affiliate_items for select to anon, authenticated using (published or (select private.is_staff()));
create policy "staff manages affiliate items" on public.affiliate_items for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff reads affiliate clicks" on public.affiliate_clicks for select to authenticated using ((select private.is_staff()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "staff uploads media" on storage.objects for insert to authenticated with check (bucket_id = 'media' and (select private.is_staff()));
create policy "staff updates media" on storage.objects for update to authenticated using (bucket_id = 'media' and (select private.is_staff())) with check (bucket_id = 'media' and (select private.is_staff()));
create policy "staff deletes media" on storage.objects for delete to authenticated using (bucket_id = 'media' and (select private.is_staff()));
