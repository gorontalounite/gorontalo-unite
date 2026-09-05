alter table public.reels
  add column if not exists sponsored boolean not null default false;

alter table public.reels
  drop constraint if exists reels_category_check;

alter table public.reels
  alter column category set default 'Wisata';

alter table public.reels
  add constraint reels_category_length_check
  check (char_length(btrim(category)) between 2 and 50);

update public.reels
set category = 'Brand', sponsored = true
where category = 'Endorse';
