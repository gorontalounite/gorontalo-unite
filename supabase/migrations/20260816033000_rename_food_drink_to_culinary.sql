update public.articles
set category = 'Culinary'
where lower(category) in ('food & drink', 'food-drink');

update public.articles
set categories = array_replace(
  array_replace(categories, 'Food & Drink', 'Culinary'),
  'food-drink',
  'Culinary'
)
where categories && array['Food & Drink', 'food-drink'];
