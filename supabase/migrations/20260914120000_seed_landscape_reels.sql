-- The 2026 landscape reels: 23 posts the archive did not have.
--
-- Taken from the supplied 2026 export, which holds 242 posts in all. Only the
-- rows marked Format = Landscape are imported here — they are what the new
-- "Choices for You" shelf is built from, and all 23 were new to the table.
-- The 219 Vertikal rows are left alone: 40 of them are already in the archive
-- and 103 of the rest carry no category at all, so importing them would mean
-- filing them by guesswork.
--
-- Categories map onto the editorial taxonomy the same way as the first
-- archive: Endorse becomes Sponsored and flags the row sponsored; the rest
-- carry across unchanged. One post arrived with no category and goes in as a
-- draft rather than being filed by guess — it will not show on the site until
-- an editor picks one.
--
-- Covers were fetched from instagram.com/p/<shortcode>/media/?size=l. Ten of
-- the twenty-three came back as the portrait feed crop rather than the wide
-- frame, so those were centred on a 16:9 canvas over a blurred copy of
-- themselves: nothing is cut off and every file is the same shape.
--
-- permalink is unique, so this is safe to run twice.

insert into public.reels (
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
select * from (values
  ('gorontalo.unite', 'Recap event 3SECOND SPACE. Your Space, Your Move.', '2026-06-03 03:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DZHsl_ZTQGI/', 'Reel', 'Event', false, 'landscape', 'published', 0, false, 3958, 2113, 31, 2, 0, 0, 2),
  ('fathirmohi23', 'Between us and the Horizon creating a peaceful moments.

Not everything fits in the story, but when we create it, it will never be disappointed.

Shot with @sonyalpha_id Cinema Line FX30

#gorontalo #sonyfx30 #videography #colorgrading #nature', '2026-08-09 05:00:00+08'::timestamptz, 'https://www.instagram.com/reel/Db0Y6oTTcEW/', 'Reel', 'Tourism', false, 'landscape', 'draft', 0, false, 10164, 5612, 332, 24, 0, 5, 0),
  ('fathirmohi23', 'Have you find your 𝐏𝐞𝐚𝐜𝐞 𝐨𝐟 𝐌𝐢𝐧𝐝?

Shoot with Sony Cinema Line FX30 + Sony 55-210mm f5.6

#motocross #sunset #gorontalo #sonyfx30 #colorgrading', '2026-08-06 08:11:00+08'::timestamptz, 'https://www.instagram.com/reel/Dbs_pJUB9yJ/', 'Reel', 'Lifestyle', false, 'landscape', 'published', 0, false, 7244, 3386, 168, 1, 1, 3, 0),
  ('fathirmohi23', 'Just a moments that will never be forgotten.

In Frame : @danislman @dewaaa_404 @sanndyy______ 

#gorontalo #videography #sonyfx30 #nature #colorgrading', '2026-08-05 07:49:00+08'::timestamptz, 'https://www.instagram.com/reel/DbqYUyZB5FN/', 'Reel', 'Tourism', false, 'landscape', 'published', 0, false, 39640, 23555, 2217, 368, 7, 37, 0),
  ('fathirmohi23', 'No Caption, just view.

#sunset #videography #gorontalo', '2026-08-03 05:20:00+08'::timestamptz, 'https://www.instagram.com/reel/Dbk-J81BGet/', 'Reel', 'Lifestyle', false, 'landscape', 'published', 0, false, 13644, 7583, 445, 15, 2, 10, 0),
  ('kkilantu', 'Jika pagi mengajarkan harapan, maka senja mengajarkan keikhlasan - fiersa besari

.
.

📍Danau Perintis, Gorontalo

#djiindonesia #djiavata #pesonaindonesia', '2026-07-20 16:09:00+08'::timestamptz, 'https://www.instagram.com/reel/DbCEiNryFIf/', 'Reel', 'Tourism', false, 'landscape', 'published', 0, false, 6077, 2993, 78, 0, 0, 0, 0),
  ('gorontalo.unite', 'Bukan sekadar film. Ini cerita tentang kita.

FREE WIFI hadir membawa kisah yang dekat dengan kehidupan sehari-hari: tentang mimpi, cinta, keluarga, dan realita di era gadget yang tak pernah lepas dari tangan.

Dibungkus drama komedi yang menghibur, film ini mengingatkan bahwa jangan pernah meremehkan siapa pun, karena hidup selalu berputar. Hari ini di bawah, besok bisa di atas.

Yang membuatnya semakin istimewa, FREE WIFI mengambil lokasi di Sulawesi Utara dan menampilkan keindahan Sulawesi utara yang kita banggakan. Didukung para pelawak legendaris SulutGo yang pernah mewarnai dunia hiburan, film ini juga menjadi ajakan bagi generasi muda untuk terus melestarikan bakat komedi daerah.

Mari tertawa, terharu, dan bangga bersama.

#FreeWifiMovie  #CeritaKita
#pemainGorontalo
#amoyshow
#kale', '2026-07-08 02:00:00+08'::timestamptz, 'https://www.instagram.com/reel/Dahq2YHTEnF/', 'Reel', 'Sponsored', true, 'landscape', 'published', 0, false, 13651, 7880, 298, 5, 2, 3, 7),
  ('rin.dumpies', '📹🍃🤸🏻‍♀️#adventure #nature', '2026-06-21 07:34:00+08'::timestamptz, 'https://www.instagram.com/reel/DZ2fWG8Ph8V/', 'Reel', 'Lifestyle', false, 'landscape', 'published', 0, false, 15757, 8040, 232, 17, 1, 12, 0),
  ('akbardama', 'Gorontalo Bagian Premium🏝️✨😍
📍Lito Lampu
📍Lito Bogisa
#gorontalo #aesthetic #wonderfullindonesia #gorontaloutara', '2026-06-07 04:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DZSFO4uR1oe/', 'Reel', 'Tourism', false, 'landscape', 'published', 0, false, 1157, 639, 14, 1, 2, 2, 0),
  ('gorontalo.unite', 'mall-mall akan menghadapi malam-malam panjang menjelang malam-malam terakhir, Toyota bikin gebrakan baru. mereka menjual semua koleksi mobilnya.', '2026-03-10 02:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DVssWjKDs7J/', 'Reel', 'Sponsored', true, 'landscape', 'published', 0, false, 25231, 12428, 513, 13, 1, 0, 12),
  ('polresgorontaloofficial', 'Jika Melihat Atau Mengalami Sendiri Tindak Pidana Gunakan Layanan Call Center Polri 110 Polres Gorontalo Layanan Bebas Pulsa 1X24 JAM
Kami Ada Untuk Masyarakat

Layanan Polri Dalam Genggaman 

#LayananCallcenterPolri110
#Astamaopspolri
#BiroOpsPoldaGorontalo
#SPKTPolresGorontalo
#SahabatPolri
@divisihumaspolri
@lensa_polri_indo
PolriUntukMasyarakat
SemangatPresisiPolresGorontalo', '2026-06-02 19:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DZGwaszTECT/', 'Reel', 'Sponsored', true, 'landscape', 'published', 0, false, 39149, 20666, 926, 66, 15, 32, 0),
  ('maykel_', 'udara pagi di dataran tinggi selalu punya cara sederhana untuk menenangkan hati. 
dingin yang menyapa, kabut yang menari dan sunyi yang terasa begitu damai..

#dji #travel #djimini5pro', '2026-05-30 02:47:00+08'::timestamptz, 'https://www.instagram.com/reel/DY9UjcVTyoO/', 'Reel', 'Tourism', false, 'landscape', 'published', 0, false, 9794, 5340, 196, 2, 3, 9, 0),
  ('sog.gorontalo.official', '🎬 PERSEMBAHAN TERAKHIR 🎬

Sebuah perjalanan mungkin telah usai, namun setiap tawa, kebersamaan, dan cerita di Mods May Day Gorontalo 2026 akan selalu hidup dalam kenangan. 🛵🔥
Video ini menjadi persembahan terakhir untuk mengenang setiap momen luar biasa yang telah kita lewati bersama. 

Terima kasih untuk seluruh keluarga besar skuteris, komunitas, panitia, dan semua sponsor. 🤝
Sampai bertemu kembali di Modals May Day berikutnya, dengan semangat persaudaraan yang tak pernah padam. 

SOG Hareudang 🔥🔥🔥
Gorontalo Bisa olo ✊✊✊ 

#sogfornation🚀 
#hareudang🔥🔥🔥 
#SOGindonesia_official
#scooteristindonesia 
#gorontalobisaolo', '2026-05-16 23:31:00+08'::timestamptz, 'https://www.instagram.com/reel/DYbgQeBJsoW/', 'Reel', 'Event', false, 'landscape', 'published', 0, false, 12435, 6468, 310, 24, 2, 27, 0),
  ('akbardama', '“Captured in motion, felt in silence.” 
📍Air Terjun Huila 
VG : @larry_photografer 
#gorontalo #aesthetic #wonderfullindonesia', '2026-05-11 20:28:00+08'::timestamptz, 'https://www.instagram.com/reel/DYOS88LRckr/', 'Reel', 'Tourism', false, 'landscape', 'published', 0, false, 7728, 4382, 234, 9, 0, 2, 0),
  ('akbardama', '📍Karang Tajam Bintalahe 🌊
.
Pilot Drone @larry_photografer 
#gorontalo #wonderfullindonesia', '2026-05-01 03:16:00+08'::timestamptz, 'https://www.instagram.com/reel/DXytKUkRyJH/', 'Reel', 'Tourism', false, 'landscape', 'published', 0, false, 12279, 6372, 288, 36, 2, 2, 0),
  ('fakelenssss', 'Gorontalo mode sunset

@gorontalo.unite', '2026-04-22 23:11:00+08'::timestamptz, 'https://www.instagram.com/reel/DXdrBYdj-CW/', 'Reel', 'Lifestyle', false, 'landscape', 'published', 0, false, 687, 448, 21, 2, 0, 2, 0),
  ('gorontalo.unite', 'Happy Eid Mubarak everyone. 

Semoga Allah SWT menerima segala amal kebaikan dari kita semua. Maafin lahir dan batin. 🤍', '2026-03-20 14:38:00+08'::timestamptz, 'https://www.instagram.com/reel/DWHxkPmE1uw/', 'Reel', 'Culture', false, 'landscape', 'published', 0, false, 5466, 2780, 148, 1, 0, 2, 2),
  ('p3nabi', 'Suara malam dari Gorontalo…
Koko’o.

directed @p3nabi 
dop @p3nabi @fathirmohi23 @fdlldauna_ @apieeek 
drone @fdlldauna_ @apieeek 
edited @p3nabi @devliver.id 
vo @devliver.id 

#kokoo #gorontalo #ramadhan', '2026-03-20 10:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DWHSIJSE8JD/', 'Reel', 'Culture', false, 'landscape', 'published', 0, false, 29485, 13840, 1102, 38, 9, 15, 0),
  ('disparekrafpora_gorontaloprov', 'Cahaya Ramadan kembali menyinari Gorontalo✨

Mari sukseskan Festival Tumbilotohe Hulonthalo Mulolo 2026 / 1447 H, tradisi menyalakan ribuan lampu botol yang menjadi simbol kebersamaan dan keindahan malam-malam akhir Ramadan. 🏮🌙

📅 16–18 Maret 2026
⏰ 18.30 WITA – selesai
📍 Kompleks Perkantoran Provinsi Gorontalo

Dimeriahkan dengan Tumbilotohe Underwater, Pawai Obor, Fun Run, lomba beduk takbiran, lomba bunggo, demo masak kue tradisional, serta bazar Ramadan.

Ayo datang dan rasakan hangatnya tradisi Tumbilotohe di Gorontalo! ✨', '2026-03-11 20:29:00+08'::timestamptz, 'https://www.instagram.com/reel/DVxOirHEve-/', 'Reel', 'Culture', false, 'landscape', 'published', 0, false, 9454, 5534, 162, 38, 1, 0, 0),
  ('gorontalo.unite', 'Jl. Prof. Jhon Aryo Katili, semalam.', '2026-01-01 01:43:00+08'::timestamptz, 'https://www.instagram.com/reel/DS9qIXtktHA/', 'Reel', 'Lifestyle', false, 'landscape', 'published', 0, false, 18210, 9028, 788, 13, 1, 9, 20),
  ('deddy_iteneps', 'BBC Gorontalo "Ride And Camp" 📍Dionumo Island (Aroomi Glamping) #rideandcamp #bbc #bribikerscommunity #dionumoisland #gorontalounite', '2026-01-12 07:52:00+08'::timestamptz, 'https://www.instagram.com/reel/DTao2GQEyel/', 'Reel', 'Tourism', false, 'landscape', 'published', 0, false, 13406, 7165, 366, 45, 5, 11, 0),
  ('deddy_iteneps', '📍Pasambaya Modelidu Kab. Gorontalo 
Camping "Fort Otanaha Tactical Airsoft Legion Gorontalo.
@yandrimaksum @abgalery @lenon_k77 @moomonn09 @willygobel96 
#gorontalounite #kabupatengorontalo #pasambaya #camping #camping⛺️', '2026-01-18 04:07:00+08'::timestamptz, 'https://www.instagram.com/reel/DTprlyYE9zw/', 'Reel', 'Tourism', false, 'landscape', 'published', 0, false, 9267, 5170, 172, 2, 0, 0, 0),
  ('gorontalo.unite', 'Kenapa kita susah move on dari hal-hal indah?

Kita sulit move on dari hal-hal indah bukan karena kita lemah, tetapi karena hati dan otak kita memang diciptakan untuk menghargai dan merindukan kebahagiaan.', '2026-03-07 05:55:00+08'::timestamptz, 'https://www.instagram.com/reel/DVleb5UExVH/', 'Reel', 'Culture', false, 'landscape', 'published', 0, false, 14250, 7879, 532, 29, 1, 0, 17)
) as v(
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
on conflict (permalink) do nothing;

-- Point them at the covers written to public/reels/<shortcode>.webp.
update public.reels
   set thumbnail_url = '/reels/' || substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') || '.webp'
 where thumbnail_url is null
   and orientation = 'landscape'
   and substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') is not null;
