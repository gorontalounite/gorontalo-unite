-- Points every seeded reel at its recovered cover.
--
-- The covers came back from Instagram's still-working media endpoint
-- (instagram.com/p/<shortcode>/media/?size=l) rather than the embed page,
-- which now answers with a login wall. All 146 were fetched, resized to 640px
-- and written to public/reels/<shortcode>.webp, so the path is derivable from
-- the permalink and needs no lookup table.
--
-- Only rows without a cover are touched, so anything set by hand survives.

update public.reels
   set thumbnail_url = '/reels/' || substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') || '.webp'
 where thumbnail_url is null
   and substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') is not null;
