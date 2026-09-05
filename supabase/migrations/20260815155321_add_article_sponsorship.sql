alter table public.articles
  add column if not exists is_sponsored boolean not null default false,
  add column if not exists sponsor_name text,
  add column if not exists sponsor_logo_url text;

comment on column public.articles.is_sponsored is
  'Whether the article displays paid-partnership disclosure.';
comment on column public.articles.sponsor_name is
  'Public name of the article sponsor.';
comment on column public.articles.sponsor_logo_url is
  'Publicly accessible sponsor logo shown with the disclosure.';
