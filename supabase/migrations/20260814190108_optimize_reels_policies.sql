create index reels_author_id_idx on public.reels (author_id);

drop policy "staff manages reels" on public.reels;

create policy "staff creates reels"
  on public.reels for insert
  to authenticated
  with check ((select private.is_staff()));

create policy "staff updates reels"
  on public.reels for update
  to authenticated
  using ((select private.is_staff()))
  with check ((select private.is_staff()));

create policy "staff deletes reels"
  on public.reels for delete
  to authenticated
  using ((select private.is_staff()));
