-- The Instagram post an article grew out of.
--
-- Some articles are written from the archive: a post from 2015-2026 is taken
-- as the source and written up properly, with its own headline, category and
-- SEO. The post is not the article — it becomes one element inside it — but
-- knowing where the article came from is what keeps the two in step.
--
-- Unique is the point of the column, not a detail of it. Without it the same
-- post can be written up twice, by two people or by the same person months
-- apart, and nothing would say so until both are live. Null is excluded from
-- the constraint, so the great majority of articles -- which have no Instagram
-- source at all -- are unaffected.

alter table public.articles
  add column if not exists source_permalink text;

comment on column public.articles.source_permalink is
  'Instagram post this article was written from. Null for articles with no such source, which is most of them. Unique so one post cannot be written up twice.';

create unique index if not exists articles_source_permalink_key
  on public.articles (source_permalink)
  where source_permalink is not null;
