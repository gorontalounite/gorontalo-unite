-- "Choices for You" stops being a category and becomes a placement.
--
-- It was two things at once and neither worked properly: a shelf drawn from
-- whatever happened to be filmed landscape, and a category an editor could
-- file to. Neither is an editorial decision. It is now a tick, like Featured —
-- a reel is on that shelf because somebody put it there.
--
-- The shelf keeps what it is showing today. Every landscape reel is ticked,
-- because those are exactly the reels on that shelf right now; this preserves
-- the live page rather than inventing a set of picks. Untick freely.
--
-- Landscape reels go back to their own category shelves at the same time, so
-- nothing disappears from the page when an editor unticks one.

alter table public.reels
  add column if not exists editor_choice boolean not null default false;

comment on column public.reels.editor_choice is
  'Ticked by an editor to place the reel on the "Choices for You" shelf. A placement, not a category — independent of orientation and of featured.';

create index if not exists reels_editor_choice_idx
  on public.reels (publish_time desc) where editor_choice;

update public.reels
   set editor_choice = true
 where orientation = 'landscape'
   and deleted_at is null;

-- One reel was filed to "Choices for You" while it was still a category. That
-- value no longer names anything, and the source spreadsheet left its Category
-- column blank, so there is nothing to file it to. It goes back to draft for
-- an editor to classify rather than being guessed at.
update public.reels
   set status = 'draft'
 where permalink = 'https://www.instagram.com/reel/Db0Y6oTTcEW/'
   and category = 'Choices for You';
