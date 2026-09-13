-- Reels are shot portrait, but some of the archive is landscape and needs a
-- 16:9 frame rather than a 9:16 one that would crop two thirds of it away.
--
-- Marked explicitly rather than guessed from the cover, because a cover can be
-- cropped independently of the video it stands for.

alter table public.reels
  add column if not exists orientation text not null default 'portrait';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'reels_orientation_check'
  ) then
    alter table public.reels
      add constraint reels_orientation_check
      check (orientation in ('portrait', 'landscape'));
  end if;
end $$;

comment on column public.reels.orientation is
  'portrait (9:16, the default) or landscape (16:9). Drives which shelf and frame the reel gets.';
