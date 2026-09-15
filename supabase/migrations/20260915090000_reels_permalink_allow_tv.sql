-- Let the permalink check accept the shapes Instagram actually used.
--
-- The original check allowed /reel/ and /p/ only. The 2022 and 2023 archive
-- carries six /tv/ links from when IGTV was a separate surface, and two /p/
-- ones; all eight still resolve. Rewriting them to /reel/ would have been
-- altering the record to fit the constraint rather than fixing the constraint,
-- so the constraint is widened instead. /reels/ (plural) is added for the same
-- reason: it is a live form and nothing here should reject it later.

alter table public.reels drop constraint if exists reels_permalink_check;

alter table public.reels
  add constraint reels_permalink_check
  check (permalink ~ '^https://(www\.)?instagram\.com/(reels|reel|p|tv)/[A-Za-z0-9_-]+/?');
