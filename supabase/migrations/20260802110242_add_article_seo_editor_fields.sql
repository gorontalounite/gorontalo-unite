-- Fields used by the article SEO panel in the admin editor.
-- Kept additive to preserve existing articles and the current publishing flow.
alter table public.articles
  add column if not exists focus_keyword text,
  add column if not exists schema_type text not null default 'NewsArticle';

notify pgrst, 'reload schema';
