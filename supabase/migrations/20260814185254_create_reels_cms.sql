create table public.reels (
  id uuid primary key default gen_random_uuid(),
  account_username text not null check (char_length(account_username) between 1 and 100),
  description text not null default '',
  publish_time timestamptz not null,
  permalink text not null unique check (permalink ~ '^https://(www\.)?instagram\.com/(reel|p)/[A-Za-z0-9_-]+/?'),
  post_type text not null default 'Reel',
  category text not null check (category in ('Wisata', 'Food', 'Event', 'Endorse')),
  thumbnail_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  display_order integer not null default 0 check (display_order >= 0),
  featured boolean not null default false,
  views bigint not null default 0 check (views >= 0),
  reach bigint not null default 0 check (reach >= 0),
  likes bigint not null default 0 check (likes >= 0),
  shares bigint not null default 0 check (shares >= 0),
  follows bigint not null default 0 check (follows >= 0),
  comments bigint not null default 0 check (comments >= 0),
  saves bigint not null default 0 check (saves >= 0),
  author_id uuid references public.user_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index reels_public_listing_idx
  on public.reels (status, featured desc, display_order asc, publish_time desc);
create index reels_category_publish_time_idx
  on public.reels (category, publish_time desc);
create index reels_author_id_idx on public.reels (author_id);

create trigger reels_updated_at
  before update on public.reels
  for each row execute procedure public.set_updated_at();

alter table public.reels enable row level security;

grant select on public.reels to anon, authenticated;
grant insert, update, delete on public.reels to authenticated;

create policy "published reels are public"
  on public.reels for select
  to anon, authenticated
  using (status = 'published' or (select private.is_staff()));

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

insert into public.reels (
  account_username, description, publish_time, permalink, post_type, category,
  thumbnail_url, status, display_order, featured, views, reach, likes
)
values
  ('rachmatgobel_rg', 'Melihat perkembangan revitalisasi Menara Pakaya, salah satu wajah dan simbol kebanggaan Gorontalo.', '2026-06-16T03:34:00+08:00', 'https://www.instagram.com/reel/DZpL7hZBRBu/', 'Reel', 'Wisata', '/reels/DZpL7hZBRBu.jpg', 'published', 1, true, 436777, 72118, 7068),
  ('rachmatgobel_rg', 'Taman Limboto mulai direvitalisasi sebagai ruang publik untuk kenangan, kebanggaan, dan harapan baru.', '2026-06-18T08:24:00+08:00', 'https://www.instagram.com/reel/DZu2aNEhvkr/', 'Reel', 'Wisata', '/reels/DZu2aNEhvkr.jpg', 'published', 2, false, 200007, 119093, 12631),
  ('rachmatgobel_rg', 'Energi baru Pentadio Resort dengan revitalisasi kawasan dan wahana yang semakin menarik untuk dikunjungi.', '2026-06-15T23:53:00+08:00', 'https://www.instagram.com/reel/DZoyaZMhRLO/', 'Reel', 'Wisata', '/reels/DZoyaZMhRLO.jpg', 'published', 3, false, 142577, 89580, 8702),
  ('fadelmuhammadofficial', 'Milu Pulo dan Ilabulo khas Gorontalo di Rumah Makan Bumela—rasa autentik yang selalu bikin rindu.', '2026-03-19T00:13:00+08:00', 'https://www.instagram.com/reel/DWDp6ggE872/', 'Reel', 'Food', '/reels/DWDp6ggE872.jpg', 'published', 4, false, 30047, 18268, 1007),
  ('bellasyafiraa_', 'Cerita Panada Tore Tinelo dan perjalanan usaha keluarga yang tumbuh dari kerja keras serta doa.', '2026-03-09T05:00:00+08:00', 'https://www.instagram.com/reel/DVqa7dGD1pB/', 'Reel', 'Food', '/reels/DVqa7dGD1pB.jpg', 'published', 5, false, 16238, 9548, 241),
  ('gorontalo.unite', 'Tradisi sahur pertama keluarga Gorontalo dan makna ayam sebagai hidangan penyambutan Ramadan.', '2026-02-20T11:30:00+08:00', 'https://www.instagram.com/reel/DU_c97ck4bX/', 'Reel', 'Food', '/reels/DU_c97ck4bX.jpg', 'published', 6, false, 12577, 9070, 95),
  ('disparekrafpora_gorontaloprov', 'Festival Tumbilotohe Hulonthalo Mulolo dengan ribuan lampu, pawai obor, dan tradisi Ramadan Gorontalo.', '2026-03-17T02:41:00+08:00', 'https://www.instagram.com/reel/DV-v77ega42/', 'Reel', 'Event', '/reels/DV-v77ega42.jpg', 'published', 7, true, 14239, 9199, 314),
  ('qrisgto', 'Cara klaim tiket konser Toton Caribo dalam rangkaian Bahagia QRIS Fest 2026.', '2026-07-13T03:55:00+08:00', 'https://www.instagram.com/reel/Dauv99eBUFx/', 'Reel', 'Event', '/reels/Dauv99eBUFx.jpg', 'published', 8, false, 13284, 7467, 94),
  ('deddy_iteneps', 'Suasana Gorontalo Mods May Day 2026, ruang silaturahmi bagi budaya Mods dan pencinta skuter klasik.', '2026-05-09T22:30:00+08:00', 'https://www.instagram.com/reel/DYJXI99uALJ/', 'Reel', 'Event', '/reels/DYJXI99uALJ.jpg', 'published', 9, false, 11686, 6187, 358),
  ('gorontalo.unite', 'iBox hadir lebih dekat dengan penawaran dan promo spesial untuk perangkat Apple terbaru.', '2026-03-12T04:00:00+08:00', 'https://www.instagram.com/reel/DVyCk6dE4Mr/', 'Reel', 'Endorse', '/reels/DVyCk6dE4Mr.jpg', 'published', 10, true, 14081, 8676, 300),
  ('gorontalo.unite', 'Grand opening Point Coffee di Indomaret Sultan Botutihe dengan promo spesial untuk pengunjung.', '2026-07-30T06:03:00+08:00', 'https://www.instagram.com/reel/Dbav5taTC8j/', 'Reel', 'Endorse', '/reels/Dbav5taTC8j.jpg', 'published', 11, false, 12416, 6709, 112),
  ('gorontalo.unite', 'Ramadan Collection dari BUCCHERI dengan pilihan sepatu, sandal, dan tas berbahan kulit.', '2026-03-07T01:00:00+08:00', 'https://www.instagram.com/reel/DVk9FGGT2pg/', 'Reel', 'Endorse', '/reels/DVk9FGGT2pg.jpg', 'published', 12, false, 12410, 8358, 58)
on conflict (permalink) do nothing;
