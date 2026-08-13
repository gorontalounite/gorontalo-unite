create schema if not exists private;
revoke all on schema private from public;

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
  ) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure private.handle_new_user();

drop policy if exists "published articles are public" on public.articles;
drop policy if exists "staff manages articles" on public.articles;
drop policy if exists "users read own profile" on public.user_profiles;
drop policy if exists "users update own profile" on public.user_profiles;
drop policy if exists "staff reads profiles" on public.user_profiles;
drop policy if exists "approved comments are public" on public.comments;
drop policy if exists "staff manages comments" on public.comments;
drop policy if exists "users read own conversations" on public.conversations;
drop policy if exists "staff manages knowledge base" on public.knowledge_base;
drop policy if exists "staff manages rag uploads" on public.rag_uploads;
drop policy if exists "published affiliate items are public" on public.affiliate_items;
drop policy if exists "staff manages affiliate items" on public.affiliate_items;
drop policy if exists "staff reads affiliate clicks" on public.affiliate_clicks;
drop policy if exists "public can read media" on storage.objects;
drop policy if exists "staff uploads media" on storage.objects;
drop policy if exists "staff updates media" on storage.objects;
drop policy if exists "staff deletes media" on storage.objects;

create policy "published articles are public" on public.articles for select to anon, authenticated using (published or (select private.is_staff()));
create policy "staff manages articles" on public.articles for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "users read own profile" on public.user_profiles for select to authenticated using (id = (select auth.uid()) or (select private.is_staff()));
create policy "users update own profile" on public.user_profiles for update to authenticated using (id = (select auth.uid()) or (select private.is_staff())) with check (id = (select auth.uid()) or (select private.is_staff()));
create policy "staff reads profiles" on public.user_profiles for select to authenticated using ((select private.is_staff()));
create policy "approved comments are public" on public.comments for select to anon, authenticated using (approved or (select private.is_staff()));
create policy "staff manages comments" on public.comments for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "users read own conversations" on public.conversations for select to authenticated using (user_id = (select auth.uid()) or (select private.is_staff()));
create policy "staff manages knowledge base" on public.knowledge_base for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff manages rag uploads" on public.rag_uploads for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "published affiliate items are public" on public.affiliate_items for select to anon, authenticated using (published or (select private.is_staff()));
create policy "staff manages affiliate items" on public.affiliate_items for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy "staff reads affiliate clicks" on public.affiliate_clicks for select to authenticated using ((select private.is_staff()));
create policy "staff uploads media" on storage.objects for insert to authenticated with check (bucket_id = 'media' and (select private.is_staff()));
create policy "staff updates media" on storage.objects for update to authenticated using (bucket_id = 'media' and (select private.is_staff())) with check (bucket_id = 'media' and (select private.is_staff()));
create policy "staff deletes media" on storage.objects for delete to authenticated using (bucket_id = 'media' and (select private.is_staff()));

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.is_staff() from public, anon, authenticated;
revoke all on function public.increment_view_count(text) from public, anon, authenticated;
drop function public.handle_new_user();
drop function public.is_staff();

create index if not exists articles_author_id_idx on public.articles (author_id);
create index if not exists comments_user_id_idx on public.comments (user_id);
create index if not exists knowledge_base_author_id_idx on public.knowledge_base (author_id);
create index if not exists knowledge_base_source_upload_id_idx on public.knowledge_base (source_upload_id);
create index if not exists rag_uploads_uploaded_by_idx on public.rag_uploads (uploaded_by);
