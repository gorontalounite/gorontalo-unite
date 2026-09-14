-- Three reels the 2026 import left for an editor to decide on.
--
-- Db0Y6oTTcEW  arrived with the Category column blank. It is filed to
--              "Choices for You" and published. That name now belongs to the
--              taxonomy as well as to the wide shelf: it replaced
--              "Destination", which never had a reel in it.
--
-- DbmWDbvPd97  has no cover. Instagram answers 404 for its shortcode, so the
--              post is deleted or private and nothing can be fetched for it.
--              It goes to draft rather than showing a bare category colour on
--              a shelf.
--
-- DVi3qZ7k1ny  is filed "Community", which is outside the taxonomy, and stays
--              a draft. Nothing to do here; recorded so the three are in one
--              place.
--
-- Matched on permalink because that is the unique column; the id is a uuid
-- generated at insert and carries no meaning.

update public.reels
   set category = 'Choices for You',
       status   = 'published'
 where permalink = 'https://www.instagram.com/reel/Db0Y6oTTcEW/'
   and deleted_at is null;

update public.reels
   set status = 'draft'
 where permalink = 'https://www.instagram.com/reel/DbmWDbvPd97/';
