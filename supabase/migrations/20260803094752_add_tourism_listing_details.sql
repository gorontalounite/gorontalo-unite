-- Flexible, category-specific details for City Guide listings.
-- Keeps canonical fields (address, opening_hours, contact) relational while
-- allowing different listing types to retain their own useful attributes.
alter table public.tourism_places
  add column if not exists listing_details jsonb not null default '{}'::jsonb;
