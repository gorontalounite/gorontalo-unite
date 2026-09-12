-- Reels categories get editorial names and room to grow.
--
-- Three existing categories are renamed rather than replaced, so every reel
-- keeps its classification:
--   Wisata -> Tourism, Food -> Culinary, Brand -> Sponsored
-- Event is unchanged. Culture, Destination, Lifestyle, News and Untold Story
-- are new and start empty; nothing is written for them here.
--
-- The column has no enum constraint (only a 2–50 character length check), so
-- the full list lives in the application — src/app/reels/data.ts.

update public.reels set category = 'Tourism'   where category = 'Wisata';
update public.reels set category = 'Culinary'  where category = 'Food';
update public.reels set category = 'Sponsored' where category = 'Brand';

-- The old default would have written 'Wisata' into any row inserted outside
-- the admin form.
alter table public.reels alter column category set default 'Tourism';
