-- increment_view_count() updates public.articles, so the generic
-- set_updated_at() trigger stamped a fresh updated_at on every page view.
-- updated_at feeds the NewsArticle dateModified and the sitemap <lastmod>,
-- which made every read story look freshly revised to search engines.
--
-- Articles get their own trigger function. A write that changes only the view
-- counter or the search snippet (seo_title, seo_description) keeps the
-- previous updated_at; any change to the story itself still refreshes it.
create or replace function public.set_article_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if (to_jsonb(new) - array['view_count', 'seo_title', 'seo_description', 'updated_at'])
     is distinct from (to_jsonb(old) - array['view_count', 'seo_title', 'seo_description', 'updated_at']) then
    new.updated_at = now();
  else
    new.updated_at = old.updated_at;
  end if;
  return new;
end;
$$;

drop trigger if exists articles_updated_at on public.articles;
create trigger articles_updated_at
  before update on public.articles
  for each row execute procedure public.set_article_updated_at();

-- The stored values are already polluted by views and cannot be told apart
-- from real edits, so every article goes back to its own publication date.
alter table public.articles disable trigger articles_updated_at;
update public.articles
  set updated_at = coalesce(published_at, created_at);
alter table public.articles enable trigger articles_updated_at;
