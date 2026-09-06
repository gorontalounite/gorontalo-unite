-- The generic "Umum" category is retired in favor of "Regional", which is
-- now a real web category (see berita/categories.ts) that also acts as the
-- catch-all for articles that don't match any other desk. This only changes
-- the column default for future inserts that omit category — it does not
-- touch existing rows, since the app-level classification logic already
-- treats any unmatched category (including historical "Umum" rows) as
-- belonging to Regional.

alter table public.articles alter column category set default 'Regional';
