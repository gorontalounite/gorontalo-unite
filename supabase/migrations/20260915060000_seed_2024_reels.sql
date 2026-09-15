-- The 2024 archive: 299 reels from two spreadsheets.
--
-- "Landscape.csv" holds 14 wide posts and "Vertikal.csv" holds 306. Of the 320
-- rows, 21 were already in the table and are skipped; the files hold no
-- duplicates of their own. Every row carries a category.
--
-- Same layout as the 2025 export and the same trap: the category sits under a
-- header reading "Data comment" and the format under an unnamed column after
-- it. Read positionally.
--
-- 166 of these rows arrive with the Views column empty, all but one of them
-- posted between January and June 2024 — Instagram's export simply does not
-- carry a view count for reels of that vintage. They are stored as 0 rather
-- than guessed at, which means they cannot surface anywhere the page ranks by
-- views: the hero picks its five covers that way, and "Most watched" is the
-- fallback when nothing is ticked Featured. Everything else about them works.
--
-- The Reach figures in this export are not trustworthy either — likes exceed
-- reach on a third of the rows, in both the rows that have a view count and
-- the rows that do not. They are imported exactly as given rather than
-- corrected, since nothing here knows the real numbers. Nothing on the public
-- page reads reach.
--
-- Endorse becomes Sponsored and flags the row, as in every earlier import.
-- The landscape rows are ticked editor_choice, which is cosmetic — a wide reel
-- is on the Choices for You shelf either way.
--
-- Covers: 298 of 299 were fetched. C8dWH5NBXcO answers 404 on Instagram,
-- so that reel keeps a null cover and falls back to its category colour.
--
-- permalink is unique, so this is safe to run twice.

insert into public.reels (
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, editor_choice, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
select * from (values
  ('gorontalo.unite', 'Lebaran bisa dirayakan dimana saja, oleh siapa saja. Mulai dari anak-anak hingga orang tua, dipelosok desa bahkan hingga di pusat kota sekalipun. Dihari kemenangan ini, mari kita saling berbagi maaf dan cinta sekaligus, setelah sebulan kemarin berpuasa dan menjalankan berbagai amaliah lainnya. 

Met Lebaran, ala @bubalus_depressicornis di Desa Longalo, Bulango Utara, Bone Bolango #GorontaloUnite', '2024-04-10 02:03:00+08'::timestamptz, 'https://www.instagram.com/reel/C5kzSJ9hO-_/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 0, 24, 181, 0, 0, 2, 3),
  ('m.r.lagata', 'Marhaban yaa Ramadhan 1445 Hijriah', '2024-03-12 04:41:00+08'::timestamptz, 'https://www.instagram.com/reel/C4aX63YhDA_/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 0, 35, 1030, 0, 0, 2, 0),
  ('bank_indonesia_gorontalo', '[Rayakan Natal dan Tahun Baru dengan Belanja Bijak Sesuai Kebutuhan]

Hai #SobatRupiah, #Nouutigorontalo

Tidak terasa sebentar lagi kita akan merayakan Natal dan Tahun Baru 2025
Rayakan kasih natal dengan berbagi dengan sesama namun tetap bersama menjaga kestabilan harga dengan sikap Belanja Bijak sesuai kebutuhan yaaa

#belanjabijak
#pengendalianinflasi
#nataldantahunbaru', '2024-12-20 19:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DD02h17ScFT/', 'Reel', 'Sponsored', true, 'landscape', true, 'published', 0, false, 25111, 12768, 241, 79, 1, 22, 0),
  ('gorontalo.unite', 'Hanya kota kecil saja, tapi bikin kangen. karena pulang itu bukan kemana, tapi kepada siapa. Dan kota ini bisa dikatakan sebagai rumah ketika ada orang-orang yang membuatmu merasa aman di dalamnya.

Sejauh apapun captionnya, footage video & lagunya anggap ala-ala ada yang mau nikahan. 😀

video @ekhy.rp', '2024-07-27 01:52:00+08'::timestamptz, 'https://www.instagram.com/reel/C963tdVPM7s/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 23291, 346, 1003, 16, 0, 23, 42),
  ('gorontalo.unite', 'Alex Ipilo - Anak Kompleks Ipilo
Kembali mempersembahkan *Festival Tumbilotohe 1445 Hijriah*

Dimeriahkan oleh:
- @thesoulband 
- @officialjabreak 
- @musicmates_official 

Siapkan diri Anda. Ajak orang tersayang. Biar jomblo boleh datang

Tahun ini
Torang bekeng rame
Torang bekeng asyik
Torang kase manyala

Supported by
Gorontalo Unite', '2024-04-05 06:09:00+08'::timestamptz, 'https://www.instagram.com/reel/C5YYPJxhn0j/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 0, 42, 529, 0, 0, 8, 11),
  ('maykel_', 'makin banyak pilihan nongkrong di gorontalo

#dji #djio3system #betafpv #pavopico #fpvlife #gorontalo', '2024-12-08 05:55:00+08'::timestamptz, 'https://www.instagram.com/reel/DDUc75FzlSc/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 53633, 25558, 1408, 558, 19, 105, 0),
  ('brillikids.journey', 'I AM A LEADER

Learning in nature not only expands students’ understanding of the world around them, but also creates deep and memorable learning experiences.

#brillikids #leadership #elementary #school #leaderinme #gorontalo #Grade2 #sekolahparaleader #excellentprogram #bestschool', '2024-02-24 15:31:00+08'::timestamptz, 'https://www.instagram.com/reel/C3v5ck_hH4I/', 'Reel', 'News', false, 'landscape', true, 'published', 0, false, 0, 62, 164, 0, 1, 0, 0),
  ('gorontalo.unite', 'Pasangan Calon Gubernur Provinsi Gorontalo dan Calon Wakil Gubernur Provinsi Gorontalo yang sudah mendaftarkan diri pada Pemilihan Kepala Daerah Serentak. 

Putra Putri terbaik Gorontalo, bakalan hadir dengan gagasan, cita-cita, mimpi dan harapan yang hendak diwujudkan. 

Urutan nama sesuai abjad Calon Gubernur. sumber footage video: KPU Provinsi Gorontalo.', '2024-08-30 03:46:00+08'::timestamptz, 'https://www.instagram.com/reel/C_SoiVYvjNv/', 'Reel', 'News', false, 'landscape', true, 'published', 0, false, 26990, 1390, 522, 0, 0, 9, 12),
  ('gorontalo.unite', 'Kebaikan itu beresonansi. Semua yang baik darimu akan kembali padamu, bahkan lebih. 

Sahabat frekuensi juga bisa berbagi kebaikan. Pada momentum bulan Ramadhan, bulan penuh kebaikan, kami kembali mengajak sahabat untuk rewind hashtag #B2SP dalam penggunaan sumber daya strategis spektrum frekuensi radio;

#B2SP:
- Berizin frekuensinya
- Bersertifikat Perangkatnya
- Sesuai Peruntukan
- Sesuai Parameter Teknis

Banyak kebaikan dari kepatuhan sahabat, check di scene akhir video, temukan penjelasannya di sana. Kunjungi laman @loka_gorontalo ada quiz berhadiah THR di sana terkait postingan ini.

... dan pastikan makin semangat meningkatkan kualitas ibadah serta memperbanyak kebaikan di race akhir Ramadhan 💪💪

🤝🤝

#teamLG
#ramadhankareem
#lokamonitorSFRGorontalo
#SDPPI
#FrekuensiSatukanNegeri', '2024-04-05 19:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C5ZwlpPhzzZ/', 'Reel', 'News', false, 'landscape', true, 'published', 0, false, 0, 32, 43, 0, 0, 0, 2),
  ('japesda', 'Kenapa Gorontalo Dihantam Banjir? 
 
Video ini bisa membuka mata kita. Secara topografi, Gorontalo berbentuk cekungan. Sementara di kawasan hulu terjadi kerusakan. Ini diperparah oleh kehadiran konsesi perusahaan ekstraktif: pertambangan dan juga perkebunan. Pun praktek pertanian yang tidak ramah lingkungan ikut memberi andil. 

Di saat bersamaan, dari 520 Daerah Aliran Sungai (DAS) di Provinsi Gorontalo, hanya 27 DAS dalam kondisi baik. Sisanya, sekitar 94 persen sedang dalam kondisi kritis. Deforestasi atau hilangnya kawasan hutan di Gorontalo berkontribusi terhadap pemanasan global yang menyebabkan perubahan iklim.

Sementara pembangunan kota abai terhadap kualitas lingkungan. Perencanaan tidak matang dan dilakukan serampangan. Maka saat musim hujan, banjir dan longsor akan menjadi ritual. Saat musim panas, kekeringan melanda. Peristiwa ini bisa datang silih berganti. 

Ini bukan salah hujan. Ini bukan bencana alam. Tapi bencana yang disebabkan oleh manusia, akibat salah urus. 

Jika tidak diantisipasi, krisis ekologis dan krisis iklim ini akan membawa Gorontalo kita menjadi kota bencana. Sudah saatnya Pemerintah meninjau kembali izin-izin konsesi perusahaan esktraktif yang berkontribusi terhadap laju kerusakan hutan Gorontalo. 

Pray For Gorontalo..
Semoga saudara-saudara kita yang menjadi korban bencana diberikan ketabahan, kesabaran, kesehatan dan keselamatan untuk mengahadapi musibah yang saat ini sedang terjadi.

Sumber data:
BPBD Gorontalo 
Forest Watch Indonesia
#japesda #bencanaekologis #banjirgorontalo2024 #prayforgorontalo', '2024-07-17 18:04:00+08'::timestamptz, 'https://www.instagram.com/reel/C9i3fhQyAQX/', 'Reel', 'News', false, 'landscape', true, 'published', 0, false, 52898, 910, 1789, 1, 3, 63, 0),
  ('disparekrafpora_gorontaloprov', 'Festival Maleo Gorontalo 2024 sukses disenggarakan!', '2024-11-19 03:54:00+08'::timestamptz, 'https://www.instagram.com/reel/DCjUI4hzhvA/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 7339, 0, 104, 0, 2, 2, 0),
  ('galeryboalemo', 'Satu lagi tempat pemandian terbaru yang ada di desa sosial , kec Paguyaman . Cukup Hanya dengan bayar tiket masuk 5k perorang/ so boleh main main aer disini. 

Bukan hanya itu pemandangan kiri kanan di kolam ini langsung menyatu dengan alam alias ada di tengah tengah sawah dan perkebunan warga. 

Drone @uchi_said 
#paguyaman
#boalemo #galeryboalemo', '2024-09-29 22:03:00+08'::timestamptz, 'https://www.instagram.com/reel/DAh1nkjunls/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 7186, 3654, 94, 7, 0, 5, 0),
  ('gorontalo.unite', 'Berasa lagi di kolam pribadi, tapi versi besar. karena bisa ditemanin ikan yang memiliki panjang tubuh hampir 40 kaki. Cobain deh, seru buat seru-seruan. 

@jennaasy', '2024-05-10 00:02:00+08'::timestamptz, 'https://www.instagram.com/reel/C6x1qI9SDUp/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 105, 353, 0, 0, 1, 3),
  ('gorontalo.unite', 'Lito HuHa. Tomilito, Gorontalo Utara.

Bagi yang mau lebih dekat dengan suasana alam yang masih terjaga seperti Lito HuHa ini, bisalah bikin buka bareng disini. 😀

📸 @anvxn__ #GorontaloUnite', '2024-03-28 23:02:00+08'::timestamptz, 'https://www.instagram.com/reel/C5Fl0euBHYM/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 108, 238, 2, 0, 1, 9),
  ('arabmaklum88', 'Pas banget lagi makan siang skalian ngonten🤣 #gorontalo #fyp #kulinergorontalo #reviewmakanan #rekomendasimakanan #enak #sate #foodie #foodlover #gorontalohits #gorontalounite #gorontalocity #likegorontalo #sulawesi #fbreels #instagood #reelsinstagram #reels', '2024-03-03 01:10:00+08'::timestamptz, 'https://www.instagram.com/reel/C4C-FyhhcTm/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 270, 1883, 5, 1, 81, 0),
  ('arabmaklum88', 'Kue pancong lumer, yang choco crunchy favorite!🤤 #fyp #gorontalo #fypシ #kulinergorontalo #pancong #panconglumer #gorontalohits #gorontalounite #gorontalocity #likegorontalo #rekomendasimakanan #reviewmakanan #enak #jajanankekinian #instagram #instagood #reels #reelsinstagram #fbreels #sulawesi #manado #foodie #foodvlogger', '2024-05-10 02:23:00+08'::timestamptz, 'https://www.instagram.com/reel/C6yEkUBhFS2/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 331, 1701, 1, 0, 46, 0),
  ('arabmaklum88', 'Lagi rame2 bakso tusuk di Gorontalo, tetap favorite sejak dulu bakso tusuk ini gais. Kedua kalinya direview😍🥰 #fyp #gorontalo #fypシ #kulinergorontalo #bakso #baksourat #buol #buolpunya #gorontalohits #gorontalounite #gorontaloolshop #gorontalocity #likegorontalo #reviewmakanan #rekomendasimakanan #enak #foodreview #jajanan #foodvlogger #sulawesi #manado #instagood #instagram #reels', '2024-06-15 01:45:00+08'::timestamptz, 'https://www.instagram.com/reel/C8Otm2HhxMU/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 983, 1586, 9, 3, 22, 0),
  ('arabmaklum88', 'Masih jadi mie ayam terenak posisi pertama🤤🥰🫶🏻 #fyp #gorontalo #kulinergorontalo #gorontalohits #gorontalounite #gorontalocity #likegorontalo #mieayam #mieayambakso #maknyos #foodreview #reviewmakanan #mieayamenak #mieayamceker #rekomendasimakanan #enak #foodie #foodvlogger #jajanan #takjil #instagood #instagram #reels #fbreels #reelsinstagram', '2024-03-27 00:22:00+08'::timestamptz, 'https://www.instagram.com/reel/C5AkmXDhrG4/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 534, 1570, 11, 0, 67, 0),
  ('arabmaklum88', 'Makan dimana? Coba disini. Tore tore kong sadap depe rampa, uuugh🤤 #fyp #gorontalo #kulinergorontalo #gorontalounite #gorontalohits #gorontalocity #likegorontalo #foodreview #rekomendasimakanan #reviewmakanan #prasmanan #enak #foodie #foodlover #foodvlogger #manado #sulawesi #instagood #instagram #fbreels #reels #reelsinstagram', '2024-05-05 01:52:00+08'::timestamptz, 'https://www.instagram.com/reel/C6lJiI4BnLG/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 379, 1056, 4, 2, 29, 0),
  ('arabmaklum88', 'Nih Mie Ayam Brutal yang didepan Bank Muamalat pindah disini🥰 #fyp #gorontalo #kulinergorontalo #fypシ #gorontalounite #gorontalohits #gorontalocity #likegorontalo #mieayam #enak #rekomendasimakanan #reviewmakanan #foodreview #mieayambakso #mieayamenak #instagood #instafood #foodvlogger #reels #reelsinstagram #fbreels #manado #sulawesi', '2024-04-19 01:33:00+08'::timestamptz, 'https://www.instagram.com/reel/C577CwGhBVH/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 1015, 2, 0, 31, 0),
  ('arabmaklum88', 'Bikin cemilan enak dan simple yuk! Nemu produk frozen food yang enak, teksturnya lembut dan rasa dagingnya berasa😍🤤 

Nonton sampai habis yaa🥰 @sorin.maharasa ✨ #fyp #gorontalo #frozenfood #sorinmaharasa #reviewmakanan #rekomendasimakanan #enak #gorontalohits #gorontalounite #gorontaloshop #gorontalocity #likegorontalo #foodvlogger #sulawesi #manado #reels #instagood #instagram #reelsinstagram', '2024-06-27 00:02:00+08'::timestamptz, 'https://www.instagram.com/reel/C8tbzqMhjUN/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 3434, 1012, 3, 0, 86, 0),
  ('arabmaklum88', 'Enak juga, tapi kurang promosi. Hanya disekitaran Tilango, Telaga dan sekitarnya yg pada tahu😋🥰 #fyp #kulinergorontalo #enak #gorontalo #gorontalohits #gorontalounite #gorontalocity #reviewmakanan #rekomendasimakanan #ayamgeprek #ayamlalapan #instagram #instagood #instafood #foodvlogger #foodlover #foodie #likegorontalo #fbreels #reelsinstagram #fypシ', '2024-02-25 04:11:00+08'::timestamptz, 'https://www.instagram.com/reel/C3xRZ_jhY0A/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 87, 477, 0, 0, 3, 0),
  ('arabmaklum88', 'Ada loh kebab enak dgn harga terjangkau🤤 #fyp #gorontalo #kebab #kebabs #kebabenak #gorontalohits #gorontalounite #gorontalocity #likegorontalo #kulinergorontalo #reelsinstagram #rekomendasimakanan #reviewmakanan #foodvlogger #instagram #arabmaklum #instagood #reels', '2024-11-28 22:56:00+08'::timestamptz, 'https://www.instagram.com/reel/DC8iJ44TEHz/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 8846, 5476, 132, 15, 0, 3, 0),
  ('arabmaklum88', 'WAAAHH AKHIRNYA NEMU NASI PADANG YANG REKOM DI GORONTALO😍😋 #fyp #gorontalo #kulinergorontalo #nasipadang  #reviewmakanan #rekomendasimakanan #enak #gorontalohits #gorontalounite #gorontalocity #instagood #instafood #instakuliner  #instagramreels #instagram #foodvlogger #foodlover', '2024-02-22 05:20:00+08'::timestamptz, 'https://www.instagram.com/reel/C3ppc0OBIT8/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 250, 1779, 3, 1, 49, 0),
  ('cekelin.gorontalo', 'Hallo selamat pagiiii❗ Gimana weekend nya? Semoga menyenangkan yaaah.

 Biar tambah seru, sambil pesan cemilan yang pass buat kumpul keluarga, sahabat atau buat bekal ke tempat liburan yuk.. 

pemesanan bisa langsung DM yaah📩
#cekelingorontalo', '2024-08-02 18:57:00+08'::timestamptz, 'https://www.instagram.com/reel/C-MKYhsqPUH/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 2580, 15, 18, 0, 0, 0, 0),
  ('deadegobel_', 'La beauté réside dans la simplicité.
(Beauty lies in simplicity)', '2024-11-24 02:41:00+08'::timestamptz, 'https://www.instagram.com/reel/DCwEjThzuH5/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 6388, 3259, 117, 0, 4, 7, 0),
  ('dki.coffee', 'Se syahdu itu 😌

#BukitRanjau #DkiCoffee #EverythingGetsBetterWithCoffee', '2024-09-15 05:34:00+08'::timestamptz, 'https://www.instagram.com/reel/C_8BusjhIpu/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 7707, 3927, 214, 8, 3, 0, 0),
  ('gorontalo.unite', 'PUKIS ANDALAN = @pukiskotabaru ‼️
.
📍Jl. Nani Wartabone (Patokan: Sebelah Martabak Bang Awal - Deretan Yopie Salon)
.
Pukis TERJUMBO yang toppingnya BARBAR! Teksturnya super fluffy & LEGIT. Manisnya pas & gurih banget! Dengan varian Original (Polos), Cokelat, Keju & Cokelat Keju. Kamu bisa pilih mau yang adonan klasik atau yang pandan!
.
BANYAK MENU BARU JUGA 👇
Nanas, Srikaya, Pandan Srikaya, Selai Kacang, Kismis & Choco Crunchy!!! Auto KALAP 🥹🙏
.
Pembelian via Grabfood, Gofood, Shopeefood:
✅Beli 10 Gratis 2‼️
✅Beli 6 Gratis 1‼️
✅Paket Pasti Puas‼️
✅Paket Arisan (DISKON 60.500)‼️
✅Paket Meeting (DISKON 138.500)‼️
.
Info selengkapnya check:
📌IG: @pukiskotabaru
📌Tiktok: @pukiskotabaru_asli
📌GoFood / GrabFood / ShopeeFood:
Pukis & Martabak Kota Baru', '2024-12-13 00:11:00+08'::timestamptz, 'https://www.instagram.com/reel/DDgtJ_-Sb--/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 11898, 6834, 252, 42, 1, 3, 18),
  ('gorontalo.unite', 'Hati-hati ketagihan @pukiskotabaru ‼️
.
📍Jl. Nani Wartabone (Patokan: Sebelah Martabak Bang Awal - Deretan Yopie Salon)
.
Pukis TERJUMBO yang toppingnya BARBAR! Teksturnya super fluffy & LEGIT. Manisnya pas & gurih banget! Dengan varian Original (Polos), Cokelat, Keju & Cokelat Keju. Kamu bisa pilih mau yang adonan klasik atau yang pandan!
.
BANYAK MENU BARU JUGA 👇
Nanas, Srikaya, Pandan Srikaya, Selai Kacang, Kismis & Choco Crunchy
+ SEGERA LAUNCHING PUKIS DUBAI KUNAFA PISTACHIO! 😱🥹🙏
.
Info selengkapnya check:
📌IG: @pukiskotabaru
📌Tiktok: @pukiskotabaru_asli
📌GoFood / GrabFood / ShopeeFood / Maxim:
Pukis & Martabak Kota Baru', '2024-11-24 20:20:00+08'::timestamptz, 'https://www.instagram.com/reel/DCx9uASypuA/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 14561, 8436, 192, 53, 0, 1, 14),
  ('gorontalo.unite', '3 menu ini favorit banget deh, kalian kalo ke Fore, nanti dicoba. Oh iyaa, download Aplikasi Fore di AppStore atau PlayStore, dapatkan diskon 50%. 

Masukan kode referral 002AF2 saat registrasi.', '2024-11-21 02:29:00+08'::timestamptz, 'https://www.instagram.com/reel/DCoUXfuzZyI/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 7114, 4025, 82, 2, 0, 5, 5),
  ('gorontalo.unite', 'PUKIS YANG GAK BIASA~ AUTO NAGIH‼️ @pukiskotabaru 
.
📍Jl. Nani Wartabone (Patokan: Sebelah Martabak Bang Awal - Deretan Yopie Salon)
.
Pukis TERJUMBO yang toppingnya BARBAR banget! Teksturnya super fluffy mirip bolu, berasa LEGIT dan GURIH dari santennya. 🥹🙏 Harganya start 7ribuan per piece-nya!!! Dan lagi ada promo menarik‼️
.
PROMO PEMBELIAN ONLINE:
📌Beli 10 dapat 12
📌Beli 6 dapat 7
.
📌PROMO PEMBELIAN OFFLINE:
Pukis Kismis, Pukis Choco Crunchy & Pukis Selai Kacang - 7 Ribu (Dari harga 9 Ribu)
.
Info selengkapnya check IG @pukiskotabaru', '2024-10-24 21:49:00+08'::timestamptz, 'https://www.instagram.com/reel/DBiMUJgBFCs/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 5221, 2904, 69, 20, 0, 2, 6),
  ('gorontalo.unite', 'Orang Gorontalo kalo soal makan, harus yang pidis-pidis. Makanya rasa aneh saja kalo makan, tapi tidak pidis, tidak sampe pica-pica suar. Nikmatnya beda. 

Gopo tuna + gopo daging khas @piringlibibi ini cocok buat dicoba deh, campur nasi apasaja. Rasa juga bisa custom, ada yang pidis skali sampe yang pidis mar manis. 

Mau pesan lewat GrabFood atau GoFood bisa, alamatnya cek di Gmaps: Piring Li Bibi (pas di Belakang SMA 1 Telaga, Jl. Husin Bilondatu, Ds. Mongolato/Bulila, Telaga, Kabupaten Gorontalo)', '2024-05-02 23:23:00+08'::timestamptz, 'https://www.instagram.com/reel/C6fv4ctyoBB/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 551, 57, 0, 0, 0, 4),
  ('gorontalo.unite', 'Kenapa nasi kuning dapa rasa enak pas setelah lebaran? Karena ada rasa rindu, setelah sebulan penuh berpuasa. 

Mari temani @luthfihinelo sarapan nasi kuning khas Gorontalo, pagi ini. 😀', '2024-04-13 17:27:00+08'::timestamptz, 'https://www.instagram.com/reel/C5uK6QShCIE/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 125, 895, 0, 0, 18, 20),
  ('gorontalo.unite', 'Memasuki minggu-minggu agenda bukber mulai bertebaran. Di Gorontalo banyak kok tampa bukber. 

Kalo di @everydaycoffeeid , ada menu spesial lebaran. Belum cobain sih, tapi nanti saja. Berikut menu spesialnya

- Nasi Lemak (Uduk) Mamak
- ⁠Nasi Sop Ayam Nenek
- ⁠Cococream Americano: Punchy, Lembut & Manis
- ⁠Cocopandan Aren Latte: Kopi Hidangan Penutup & Memanjakan Diri
- ⁠Cocopandan Cloud: Susu, Lembut & Nyaman
- ⁠Srikaya Eggwaffles Ramadhan Burntcheesecake

Alamatnya: Jl. HB Jassin (eks. Jl. Agus Salim) depan Bank Sinarmas Kota Gorontalo', '2024-03-14 06:39:00+08'::timestamptz, 'https://www.instagram.com/reel/C4fxqKRhMQp/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 51, 29, 0, 0, 0, 2),
  ('gorontalo.unite', 'Ngopi yang sedap malam hari itu saat ditemani kesepian. Kopi kan enak, tambah dinikmati pulak. Buat teman-teman yang lagi khatam Quran juga bisa dicoba tips ini, sedia kopi, sedikit saja. 

📍@sampingkampus ~ karena lokasinya juga disamping kampus UNG (Jl. Dewi Sartika, No. 13) #SampingKampus #GorontaloUnite', '2024-03-14 06:04:00+08'::timestamptz, 'https://www.instagram.com/reel/C4ftd39h-4V/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 81, 66, 0, 1, 0, 2),
  ('gorontalo.unite', 'Ada kejutan ke LuvYue di Gorontalo nih 🤩

Yeay!! ada Xiyue tepatnya di Talaga Gorontalo, jadi bisa langsung aja ke Xiyue Talaga Gorontalo (jl Ahmad A. Wahab No 1, Luhu, Telaga - Gorontalo).
Banyak varian es krim dan minuman yang pastinya segar, yang bikin kamu bahagia terus LuvYue!!

Jadi tunggu apalagi??!! langsung xerbu yaa sekarang juga 🥰

#xiyue #xiyueindonesia #xiyuehappyterusss #mbventura #gorontalo #mbvgroup', '2024-01-01 00:03:00+08'::timestamptz, 'https://www.instagram.com/reel/C1jNZttyI0l/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 9, 170, 0, 0, 0, 6),
  ('sampingkampus', '', '2024-05-21 03:52:00+08'::timestamptz, 'https://www.instagram.com/reel/C7OlGR9yxDv/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 2859, 17, 2, 0, 0, 0),
  ('tanjungperintisgorontalo', 'Feel the new experience with tropical ambience and New Design 

TANJUNG PERINTIS CAFE & EATERY
Komp. Danau Perintis, Kec. Suwawa Kab. Bonebolango

more information ☎️ 0823-2569-3870

#tanjungperintis #tanjungperintiscoffee&eatery #tanjungperintiscafe #tanjungperintisprasogo', '2024-11-04 19:58:00+08'::timestamptz, 'https://www.instagram.com/reel/DB-a9Jautn_/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 4722, 3235, 87, 51, 10, 1, 0),
  ('yudhaabdullah_', 'kata kata mandatory #insta360 #insta360onex2', '2024-02-13 05:43:00+08'::timestamptz, 'https://www.instagram.com/reel/C3SiVJIrZ8_/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 495, 106, 1, 0, 2, 0),
  ('ahmadmanangin', 'Gunakan gerakkan ini pada video yang ingin kalian ambil, agar video kalian lebih menarik. #tipsvideopakehp 

DICLAIMER !!
Shoot video dikonten ini saya menggunakan perangkat Iphone 11. Sehingga sangat terbantu akan stabilisasi yang dimiliki oleh iphone. Jika menggunakan Hp lainnyapun bisa, nanti jika kurang mulus bisa di atasi pada saat pengeditan untuk di stabilisasi.

#iphone #shootfromiphone #kotamobagu #cinema #film #cinematic #gorontalo #likegorontalo #limboto #masjid #muslim #kontenkreator #ahmadmanangin', '2024-05-24 00:35:00+08'::timestamptz, 'https://www.instagram.com/reel/C7V80FgSfBg/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 68, 151, 0, 0, 2, 0),
  ('disparekrafpora_gorontaloprov', 'Sobat Dispar!

Kalian udah pada tau belum, kalo Di Gorontalo terdapat pasar tradisional yang sudah dikemas sedemikian rupa untuk membantu meningkatkan perekonomian UMKM lokal dan warga sekitar Kabupaten Bone Bolango.

Yuk Kenalan Sama Pasar Ambuwa di Desa Huntu Selatan Kabupaten Bone Bolango!', '2024-12-15 18:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DDn2_qPTQKT/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 9935, 5809, 223, 57, 9, 10, 0),
  ('galeryboalemo', 'Yuk yang belum datang kesini ayo ramaikan lagi festival Tumbilotohe oleh anak muda GERAKA 6000 lampu botol . Di Malam Terakhir Tumbilotohe 

Lokasi berada di jalan kadir bin karama perbatasan antara Desa modelomo dan desa pentadu barat .

#tumbilotohe
#gorontalo
#boalemo 
#galeryboalemo', '2024-04-08 05:24:00+08'::timestamptz, 'https://www.instagram.com/reel/C5gA9cbhiTY/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 928, 1930, 1, 1, 37, 0),
  ('gorontalo.unite', 'Prosesi adat Mopotolungo Marten Taha dan Ryan Kono, yang telah mengakhiri masa jabatannya sebagai Wali Kota dan Wakil Wali Kota Gorontalo. 

Adat Mopotolungo sendiri merupakan prosesi mengantarkan pejabat yang telah berakhir masa tugasnya dari rumah jabatan ke kediaman pribadi. 

Selain mengucapkan terima kasih atas kepercayaan masyarakat Kota Gorontalo, Marten Taha dan Ryan Kono juga memohonkan permintaan maaf sedalam-dalamnya.

Dari lubuk hati kami yang terdalam, ingin juga mengucapkan terima kasih dan maaf kepada Bpk. @marten_taha & Bpk. @ryanfkono untuk segalanya, semuanya, selamanya.', '2024-06-03 03:11:00+08'::timestamptz, 'https://www.instagram.com/reel/C7v-nXayH1B/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 525, 1265, 0, 1, 30, 16),
  ('gorontalo.unite', 'Mungkin selama ini ada salah ucap, atau salah postingan, ataupun beberapa hal yang terlewatkan. Kami memohonkan maaf sedalam-dalamnya. 

Selamat Idulfitri, teman-teman tersayang semuanya. Taqabbalallahu minna wa minkum. 

Dengan rasa cinta yang mendalam, tertanda #GorontaloUnite', '2024-04-09 14:09:00+08'::timestamptz, 'https://www.instagram.com/reel/C5jiDmiBi5C/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 59, 153, 0, 0, 0, 4),
  ('gorontalo.unite', 'Salah satu agenda Ramadan Camp yang berlangsung di Pasambaya Riverside, Modelidu, Solat Subuh berjamaah, menyatu dengan suasana alam sekitar. 

@mohisnandar #GorontaloUnite', '2024-03-31 14:33:00+08'::timestamptz, 'https://www.instagram.com/reel/C5MZ9qbBK5V/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 114, 347, 0, 0, 1, 5),
  ('gorontalo.unite', 'Vibes Gorontalo era 90-an, ti pakunimu donggo dumodupo ma lahu-lahu lo gambusi; ti makuni to depula. 

The best music aransement by legend. Alm. Risno Ahaya. Al-fatihah @koremusamad #GorontaloUnite', '2024-02-22 16:53:00+08'::timestamptz, 'https://www.instagram.com/reel/C3q5srNh_5P/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 162, 1259, 0, 0, 8, 79),
  ('lyn_lynaa29', 'Yang nanya kemaren mesjid ini dimana..
Letaknya di Desa Pontolo, kwandang Gorontalo utara

Mesjid yang baru saja didirikan dengan bangunan megah dengan beberapa ornamennya diadopsi dari mesjid Nabawi, dilengkapi dengan pendingin ruangan serta tempat wudhu yang memudahkan untuk lansia karena bisa duduk sembari melalukan wudhu. 

Imamnya juga adalah Hafidz yang tengah menempu pendidikan di beberapa pesantren di Luar Daerah.', '2024-03-20 16:09:00+08'::timestamptz, 'https://www.instagram.com/reel/C4wQInkhFcz/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 29, 155, 0, 0, 6, 0),
  ('m.r.lagata', 'Tradisi Malam Tumbilotohe (Malam Pasang Lampu) pada 3 malam Terakhir Bulan Ramadhan Di Gorontalo', '2024-04-08 09:20:00+08'::timestamptz, 'https://www.instagram.com/reel/C5gcRWVB8QL/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 267, 1267, 8, 0, 5, 0),
  ('pemerintahgorontaloprov', 'Hari ini!

Saksikan acara terbesar di Gorontalo tahun ini;
GORONTALO KARNAVAL KARAWO (GKK) 2024

Mengusung tema “Kreatifitas Gorontalo Untuk Pariwisata Global”, GKK 2024 diharapkan bisa meningkatkan pariwisata dan ekonomi kreatif di daerah.

Berbagai keseruan GKK 2024;
👯‍♂️ Karnaval Karawo
🧆 Festival kuliner nusantara
💃🏼 Karawo anak dan fashion show remaja
🪘 Festival musik kreatif
🏦 Expo produk ekonomi kreatif 
🔊 Diskusi pariwisata berkelanjutan

Catat tempat dan waktunya;
🏟️ Gelanggang Olahraga (GOR) Nani Wartabone, Kota Gorontalo
🗓️ 21-23 Juni 2024

Datang dan saksikan ya! 🎉🌟

Narahubung:
📱 Ivone Larekeng, S.Hut. M. Kes - 082189555770
📱 Altian Wahyumi - 081299514930
📱 Anggie Anggriani S. - 081342625829', '2024-06-20 18:02:00+08'::timestamptz, 'https://www.instagram.com/reel/C8dWH5NBXcO/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 703, 219, 0, 0, 0, 0),
  ('gorontalo.unite', 'Hadir dengan misi untuk menyebarkan cinta terhadap kopi kepada semua orang, akhirnya Fore Coffee hadir juga di Gorontalo. 

Fore yang terkenal dengan sajian seduhan kopi Indonesia yang berkualitas dan beragam pilihan sandwich & pastry. 

Fore Coffee di Gorontalo terletak di Jl. Nani Wartabone, teman-teman bisa dapat diskon 50% maksimal 35K tanpa minimum pembelian. Ini untuk pengguna baru melalui aplikasi Fore Coffee dan untuk 3x transaksi pertama kali

@fore.coffee 
#ForeCoffee', '2024-11-21 01:13:00+08'::timestamptz, 'https://www.instagram.com/reel/DCoLL-OzVgR/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 17079, 9544, 221, 51, 8, 14, 5),
  ('gorontalo.unite', 'Eh, taman-taman so tau ndak? Buccheri sekarang lagi ada diskon sampe 50%, baru ada tambahan depe diskon sampe deng 20% lagi. 

Manjo, gabung deng BUCCHERI PRIVILEGE CLUB, langsung dapa keuntungan 75K, baru dapa cashback setiap kali belanja. 

Depe pelayanan ramah, belanja di Buccheri jadi menyenangkan. Langsung jo ke Buccheri Gorontalo, Jl. Cokroaminoto No. 10, pas depan Citimall Gorontalo.', '2024-11-05 01:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DB-587yyN0Q/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 10750, 6966, 80, 2, 1, 5, 4),
  ('gorontalo.unite', 'eh, udah pada tau belum, ACE lagi ngadain program Tonight Sale x Payday Surprise nih. Berlaku mulai hari ini, 25 Oktober sampai 27 Oktober saja. 

Hemat sampai 70% untuk produk tertentu, trus juga hemat 10% untuk produk pilihan harga normal. 

Buruan deh, mulai dari jam 6 sore sampai toko tutup. 

#TIMSimpleACE #TimDetailACE #SerbaSerbiSolusidiACE', '2024-10-25 04:54:00+08'::timestamptz, 'https://www.instagram.com/reel/DBi85jbBKtc/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 15473, 11455, 58, 6, 1, 0, 1),
  ('gorontalo.unite', 'Setiap hari terasa lebih mudah dan menyenangkan dengan All New Honda HR-V! 

Dari jogging untuk menjaga kebugaran, hingga #WorkFromCafe yang nyaman, Honda HR-V selalu jadi teman setia di setiap aktivitas. Dengan desain yang stylish dan fitur-fitur canggih, perjalanan jadi lebih lancar dan penuh gaya. 

Apapun yang kamu lakukan, All New Honda HR-V selalu siap menemani dan membuat hari-harimu lebih produktif dan menyenangkan! ⁣
⁣
Jadikan setiap hari lebih berkesan dengan partner terbaik di segala momen! ⁣

Honda⁣,
The Power of Dreams

#AllNewHondaHRV #Hondaisme #Hondaoutsidejava', '2024-10-24 23:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DBiYCbIzSKM/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 5680, 3122, 60, 5, 0, 0, 2),
  ('gorontalo.unite', 'Rayakan Hari Batik Nasional dengan Cashback hingga Rp3 Juta dan Syal Anne Avantie, GRATIS!*

Promo berlaku selama periode 2-6 Oktober 2024. Kesempatan terbatas, yuk kunjungi gerai @thepalace_id di kotamu! 🤗❤️

*S&K berlaku

#ThePalaceBanggaBernusantara #ThePalaceBanggaBerbatik #TherlengkapTherjangkauTherjamin', '2024-10-02 03:53:00+08'::timestamptz, 'https://www.instagram.com/reel/DAnnyXBhceR/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 3253, 1782, 32, 0, 0, 0, 2),
  ('gorontalo.unite', 'Pulang dari tempat wisata Hiu Paus di Botubarani, cuaca tadi memang panas. Yang kemudian turun hujan juga. Kita lanjut mau lihat mobil yang sementara di service di Wuling Gorontalo.

Untuk mobil listrik sendiri, seperti Wuling AirEv ini berlaku garansi seumur hidup loh, yang cakupannya power battery, drive motor (termasuk integrated motor assembly), dan motor control unit untuk seluruh unit EV Wuling. 

Selain itu juga ada layanan garansi umum kendeeaan, garansi komponen utama mesin dan juga gratis jasa service berkala.', '2024-09-20 01:03:00+08'::timestamptz, 'https://www.instagram.com/reel/DAIYSunBD6U/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 12814, 7321, 156, 11, 0, 3, 4),
  ('gorontalo.unite', 'Pengalaman menggunakan Mobil Listrik, Wuling AirEV ke destinasi wisata Hiu Paus di Botubarani, Bone Bolango. 

Overall, pengalaman menggunakan mobil listrik kali ini menyenangkan, karena beberapa keunggulannya itu. Seperti tidak perlu repot-repot lagi mengisi bahan bakar. Hanya saja, perlu ekstra waktu untuk mengisi dayanya. 

Ada yang pernah berenang bareng Sherly dan kawan-kawannya? Cobain deh, seru loh.', '2024-09-17 22:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DAC-pP2B12H/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 11538, 7089, 151, 15, 0, 5, 4),
  ('gorontalo.unite', 'a day in my life, pengalaman treatment di ERHA Skin Gorontalo. 

Karena akhir-akhir ini cuaca di Gorontalo lagi tidak menentu, terus dengan banyaknya aktivitas diluar ruangan, kita bisa terpapar dengan berbagai debu, akhirnya timbul juga jerawat. 

Nah, kali ini mimin mau treatment terkait perawatan kulit wajah sekaligus mau review tempat perawatan kulit yang ditangani oleh ahlinya di Gorontalo. Namanya ERHA. 

FYI aja yaa teman-teman. @erha.dermatology ini punya cabang diseluruh Indonesia dan berdiri lebih dari 25 tahun yang didukung oleh expert dermatologist, so terpercaya.Bukan hanya perawatan tapi ERHA juga menyembuhkan segala permasalahan kulit. 

Di ERHA, sebelum kita memulai treatment, bisa konsultasi dulu dengan dokternya mengenai perawatan kulit apa yang bagus dan direkomendasikan untuk kulit kita. Misalnya dengan Active Acne Therapy by IPL ini.

Jadi treatment ini menggunakan tekonologi Intensed Pulsed Light yang dikombinasikan dengan pengaplikasikan serum yang bermanfaat untuk meredakan peradangan pada jerawat aktif, juga membunuh bakteri yang menyebabkan jerawat, dan menormalkan kondisi kulit berminyak.

Btw, blm pada tau kan ERHA itu GRATIS Konsultasi Kulit & Rambut ya!*
Sk berlaku. 

Untuk info lebih lanjut, bisa kunjungi
ERHA Skin Gorontalo
Jl. H. Nani Wartabone, No. 71 Kota Gorontalo
Whatsapp: 081241307749

#ERHAUltimate
#ERHASkinGorontalo', '2024-09-04 22:55:00+08'::timestamptz, 'https://www.instagram.com/reel/C_hj_SmB6c4/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 9891, 5257, 71, 39, 6, 8, 2),
  ('gorontalo.unite', 'berhubung masih dalam suasana hari kemerdekaan, semoga juga bisa tetap merdeka dalam bidang lain. 

eh, btw @hondanenggamobilindo_ selama sebulan kedepan lagi bekeng pameran di Limboto, pas di muka Agung Supermarket Situ. 

Deng kabarnya juga, Honda BR-V N7X ini bisa didapatkan dengan UM mulai dari 10% aja jo, modal ekonomis tapi mewah fiturnya. 

Paling bagus sih datang liat langsung, kong langsung coba di tampa. Info lebih lanjut, bisa WA ke nomor Official 0811-4333-474 atau bisa langsung Sales Sales Consultant Consultant Honda Nengga Mobilindo

#HondaIsMe #HondaOutsideJava
#NewHondaBRVN7X #HondaN7X #HondaOutsideJava #HondaGorontalo', '2024-08-19 19:27:00+08'::timestamptz, 'https://www.instagram.com/reel/C-3-KWRPbbK/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 7304, 344, 107, 0, 0, 13, 1),
  ('gorontalo.unite', 'Digiplus kini telah hadir di Gorontalo.

Salah satu gadget store terbesar di Indonesia, Digiplus hadir menawarkan beragam gadget dari berbagai brand smartphone mulai dari Apple, Huawei, Oppo, Samsung, vivo, hingga Xiaomi. 

Bukan cuma itu, Digiplus juga menyediakan berbagai aksesories handphone seperti casing, tempered glass, earphone, powerbank, dan lain sebagainya. Lengkap deh pokoknya!

Dalam rangka Grand Opening Digiplus di Citimall Gorontalo, kalian bisa mendapatkan diskon spesial. Kunjungi sekarang juga, Digiplus di Lt. GF Citimall Gorontalo.

Digiplus, your trusted tech-lifestyle retail.

@digiplus_id
#iChooseDigiplus', '2024-08-01 04:12:00+08'::timestamptz, 'https://www.instagram.com/reel/C-IAQ8kPjVN/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 10144, 1595, 82, 0, 7, 0, 3),
  ('gorontalo.unite', 'Teman-teman, udah pada tau belum kalo di 3second gak nyangka banget lagi ada promo gede-gedean yang bikin kalap!

Oh iya, FYI juga yaa promo ini cuma berlaku sampai 30 Juni 2024 loh. Dan masih banyak lagi produk cakep yang diskonnya 30% sampai 70%

Buruan deh, jangan sampe ketinggalan. Tau kan lokasi 3second Store Gorontalo tepatnya di Citimall Gorontalo (Lantai Dasar)

#3secondHolidaySale', '2024-06-15 04:18:00+08'::timestamptz, 'https://www.instagram.com/reel/C8O-5Wpv9fL/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 384, 49, 0, 0, 1, 2),
  ('gorontalo.unite', 'Kemitraan mana lagi yang kasih Cashback sampai 100 JUTA?! Potongan kemitraan terbesar yang pernah kalian tau berapa juta guys ?', '2024-05-03 05:05:00+08'::timestamptz, 'https://www.instagram.com/reel/C6gXQ87SwMT/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 15, 30, 0, 0, 1, 2),
  ('gorontalo.unite', 'Panggilan kepada Sahabat iBox! iBox akan hadir lebih dekat di Citimall Gorontalo tanggal 3 Mei 2024.

Dapatkan berbagai penawaran dan promo spesial untuk perangkat Apple terbaru kamu! Hemat hingga Rp 5.200.000,* Tambahan diskon Bank hingga Rp 1.000.000, Mystery package senilai 1.1 Juta* dan Voucher MyEraspace hingga Rp 1.000.000*.

Periode promo 3 - 5 Mei 2024.

Syarat dan ketentuan berlaku. Promo dapat berubah sewaktu-waktu. Mystery package berlaku untuk 10 orang pembeli pertama di tanggall 3 Mei 2024.

#iBoxIndonesia', '2024-05-02 06:01:00+08'::timestamptz, 'https://www.instagram.com/reel/C6d4tzHSl7M/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 30695, 522, 2, 14, 5, 14),
  ('gorontalo.unite', 'Udah kelar Lebaran nih, tentunya kamu masih bisa melengkapi produk pilihan seusai hari raya yang hematnya hingga 70%. Pokoknya deh #AdaDiACE semuanya. 

Buat kamu pengguna ruparupa, bisa juga dapatkan rewards dan cashback hingga Rp.350rb loh.

Promonya berlaku sampai tanggal 30 April 2024.

#AdadiACE #ACEIndonesia #BisaKejadian #HariRayaBersamaACE', '2024-04-20 04:58:00+08'::timestamptz, 'https://www.instagram.com/reel/C5-2xfehD-W/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 14, 40, 0, 0, 0, 1),
  ('gorontalo.unite', 'Sekarang kalo ngabuburit sambil berburu takjil, semacam ada depe tantangan nih. Jang sampe habis takjil dorang yang lain capat borong. 

Apalagi masih sering terjebak sibuk di kantor, atau lupa beli takjil, bisa dong pakai promo Diskon Kilat Ngabuburit sampai 40% di GrabFood setiap hari jumat, dari jam 12 siang sampe jam 4 sore. 

Lebe hemat, kong banyak potongan diskon lagi. Selaij itu ada diskon potongan sampe 150rb, gratis pengiriman pake GrabUnlimited, kong ndak pake galau lagi kalo pake fitur pesanan terjadwal. 

Oh iyo, promo Diskon Kilat Ngabuburit berlaku hari Jum’at, 22 maret, 25-26 maret, 28-31 maret, 5 april. Selengkapnya bisa follow @GrabSulawesiID biar ndak ketinggalan info promo lainnya. 

#GrabFood #DiskonKilatNgabuburit #DiskonKilatGajian #GrabUnlimited #GratisOngkir #Ngabuburit', '2024-03-21 21:40:00+08'::timestamptz, 'https://www.instagram.com/reel/C4zayF2B1YI/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 672, 215, 2, 0, 23, 4),
  ('gorontalo.unite', 'A day in my life bareng ERHA Ultimate 

Teman-teman, minggu lalu nemu booth ERHA di citimall gorontalo kebetulan kita pengen ke kliniknya. Sebelum itu, samper aja ke booth dulu deh ternyata tersedia skin age detector, teknologi yang digunakan untuk menganalisis tanda-tanda penuaan kulit dengan cara yang praktis. Seperti permasalahan kemerahan pada kulit, hiperpigmentasi, garis-garis halus, atau kadar minyak. 

Usai konsultasi dengan dokter, langsung jalanin treatment Acne Peeling Face di klinik ERHA Skin Gorontalo.

Treatment ini bertujuan untuk untuk mengurangi minyak berlebihan, melepaskan lapisan-lapisan kulit mati, mengobati dan mencegah timbulnya jerawat, mengurangi peradangan, mengatasi penyumbatan pada pori-pori kulit.

Ternyata ERHA Gratis Konsultasi Kulit & Rambut loh, siapa yang belum tau? Cus langsung ke ERHA Ya. s&k berlaku. 

Untuk info lebih lanjut, bisa kunjungi
ERHA Skin Gorontalo
Jl. H. Nani Wartabone, No. 71 Kota Gorontalo
Whatsapp: 081241307749

#ERHAUltimate
#erhaskingorontalo', '2024-02-26 00:59:00+08'::timestamptz, 'https://www.instagram.com/reel/C3zf0KAhm-B/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 171, 153, 3, 6, 9, 8),
  ('gorontalo.unite', 'Ruangan rapi dengan Stora #BisaKejadian 

Cari kebutuhan rumah dan gaya hidup kamu di @aceindonesia karena semua #AdadiACE. 

Dapatkan harga hemat hingga 60% + Cashback hingga Rp300ribu* khusus pembelian di ruparupa. 

Promo berlaku hanya pada 7 Februari - 5 Maret 2024.

#ACEIndonesia 
#BisaRapiPakaiStora
#bisakejadian', '2024-02-21 17:35:00+08'::timestamptz, 'https://www.instagram.com/reel/C3oXPjDBPxP/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 4, 33, 0, 0, 0, 1),
  ('gorontalo.unite', 'Diskon Kilat GRABjian hadir lagi nih, catat tanggalnya. 27 dan 28 Januari 2024. Ada banyak diskon yang bisa digabungin juga nih. 

Mulai dari diskon sampai dengan 90% di jam 2 siang sampai jam 4 sore, diskon sampai 40% dan 50% untuk pengguna paket GRABUnlimited di jam 10 pagi, jam 12 siang, jam 2 siang dan jam 5 sore sampai jam 7 malam. 

Buruan deh, buka aplikasi GRAB, jangan sampai lupa. Banyak paket diskon di GRABFOOD. 

Oh iyaa, kalo gak mau ketinggalan info promo dari GRAB, follow juga akun instagram @GrabSulawesiID 

#DiskonKilatGrabjian #DiskonKilat #GrabFood #GrabUnlimited', '2024-01-26 20:03:00+08'::timestamptz, 'https://www.instagram.com/reel/C2luyP1y2tw/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 443, 52, 0, 0, 0, 3),
  ('gorontalo.unite', '#CariSuasanaBarudiACE jadi pilihan yang tepat deh buat belanja segala keperluan rumah tangga, perlengkapan olahraga, alat memasak dan masih banyak lagi. 

Berhubung masih suasana tahun baru, #CariSuasanaBarudiACE juga masih ada promo Cashback hingga Rp240ribu khusus pembelian di ruparupa

Jadi, buruan share postingan ini ke teman, kerabat dan keluarga kalian ya.

#BisaKejadian #ACEIndonesia #AdadiACE #CariACEdiruparupa 
#CariSuasanaBarudiACE #AdsGUACE', '2024-01-17 19:54:00+08'::timestamptz, 'https://www.instagram.com/reel/C2OiZ1RS_9T/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 18, 36, 0, 0, 1, 2),
  ('gorontalo.unite', 'ADA INFO MENARIK NIH BUAT WARGA GORONTALO. HARGA PERHIASAN MULAI DARI 888.000.

Di Citimall Gorontalo, tepatnya di THE PALACE yang baru saja dibuka secara resmi akhir pekan kemarin. Oh iya, ada berbagai koleksi perhiasan emas dan berlian yang Therlengkap, Therjangkau, Therjamin di @thepalace_id

Buruan guys, jalan-jalan ke The Palace Jeweler, cocok buat kalian yang ingin tambah koleksi atau dijadikan hadiah untuk orang terdekat.

@thepalace_id

ThePalaceJeweler #NationalJeweler #Therlengkap #Therjangkau #Therjamin #PerhiasanIndonesia #AdsGUThePalace', '2024-01-17 00:10:00+08'::timestamptz, 'https://www.instagram.com/reel/C2MUdPLyWzy/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 52, 52, 1, 0, 11, 2),
  ('gorontalo.unite', 'Hai Mom’s,

Adik Kidzilla Gorontalo sudah Hadir nih 🥳

Kidzilla New Concept Gorontalo 🎉🎉🎉
📍 Citimall Gorontalo, Lt. LG

Semakin Seru ✅
Semakin Fresh ✅
Semakin Atraktif ✅
Semakin Edukatif ✅

Yuk, ajak Kakak, Adik, dan Teman-teman, untuk main seru-seruan bersama di Kidzilla 🤩

Kidzilla Let’s Play All Day 💫

#kidzilla #kidzillaindonesia #playground #playland #indoorplaypark #fun #educative #attractive #parenting #parents #bondingtime #nowopen #newconcept #citymallgorontalo #gorontalo #AdsGUKidzilla', '2024-01-08 01:34:00+08'::timestamptz, 'https://www.instagram.com/reel/C11Zl90yBJ5/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 50, 121, 0, 0, 0, 2),
  ('annjuliana', 'Preparing for 10k run! Dress up dulu biar semangat 🥰 #gohm2024 #gorontalohalfmarathon2024 #berlaridipesonabaharidanbudayagorontalo', '2024-10-27 19:01:00+08'::timestamptz, 'https://www.instagram.com/reel/DBpnTygOJEX/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 17414, 9388, 267, 15, 9, 37, 0),
  ('deal_konser', 'Karena galau itu butuh tenaga, kita udah siapin nih tenant F&B pilihan yang siap nemenin sesi galau kamu! Yukk amunisi galaunya distok banyak-banyakk 😉❤️

Sampai jumpa di HOLIMOON 2024 ya ❤️', '2024-12-23 01:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DD6kiKgTtkm/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 19053, 9251, 144, 18, 2, 0, 0),
  ('deal_konser', 'Ada gak sih yang masih suka linglung pas nyampek venue? Tenang ajaa — pokoknya kamu gak boleh kebingungan! Ikuti guide berikut ya 🌸

Sampai jumpa di HOLIMOON 2024 ❤️', '2024-12-23 00:42:00+08'::timestamptz, 'https://www.instagram.com/reel/DD6hqWWzbaf/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 18525, 7787, 251, 4, 1, 0, 0),
  ('pemerintahgorontaloprov', 'Runners, ini bonus dari Mimin 🎉🥳

Keseruan dan serba serbi Gorontalo Half Marathon 2024. 

Sampai jumpa lagi di event event selanjutnya ya. Semoga sehat dan sukses selalu untuk kita semua 🥹🤲🏼

#gorontalohalfmarathon
#ghm2024
#thegorontalorunners
#runners', '2024-10-27 17:48:00+08'::timestamptz, 'https://www.instagram.com/reel/DBpeepsh47f/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 21086, 11505, 806, 30, 14, 35, 0),
  ('yuliahotelgorontalo', 'Siapkan diri Anda untuk kembali ke era penuh warna dan nostalgia! Nikmati malam seru dengan tema yang membawa Anda ke dekade 80-an yang ikonik.

🌟 Pesta Tahun Baru bertema Back to the 80s.
🎶 Music hits 80s yang bikin Anda bernostalgia.
🕺 Dance Performance bertema Back to the 80s.
🎸 Kompetisi kostum terbaik dengan gaya retro
🍹 Minuman dan hidangan spesial bertema 80s
🍽️ Dinner Package 250.000/pax
🏨 Staycation nyaman dengan Room Package spesial Tahun Baru.
📸 Photobooth seru untuk mengabadikan momen nostalgia
🎁 Doorprize dan kejutan spesial di malam pergantian tahun!

Jangan lewatkan kesempatan untuk bersenang-senang sambil bernostalgia!

For more information
Yulia Hotel Gorontalo
Jl. Nani Wartabone No. 26, Ipilo, Kec. Kota Timur. Gorontalo, Sulawesi 96133
Tlp. +62 821-9682-8881
W. yuliahotelgorontalo.com

#ChristmasStartsWithYou #NewYearStartsWithYou #JoyfulMomentsWithUs #MelayaniSepenuhHati #yuliahotelgorontalo #hotelindonesiagroup #highotels #room #staycation #visitgorontalo #gorontalounite', '2024-12-23 17:26:00+08'::timestamptz, 'https://www.instagram.com/reel/DD8Ur7pTMJ-/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 13703, 7296, 92, 14, 0, 0, 0),
  ('deddy_iteneps', 'MESIN WAKTU - Deddy Iteneps (cover) 
Izin abangku @budid0remi 🙏….
-
-
#poppunk #musikpoppunk #punkrock #poppunksnotdead #punks #punkstyle #mesinwaktu #mesinwaktucover #music #musica #musically #itenepspunkrock #iteneps #gorontalounite', '2024-04-03 09:20:00+08'::timestamptz, 'https://www.instagram.com/reel/C5TjzYThjlC/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 56, 193, 0, 0, 26, 0),
  ('donikadir', 'Kalau mau hasil yang serius usahanya pun harus serius, dan tetaplah meminta kepada Allah untuk segela ketidakmungkinan itu 🏹🐎🤲😇

#MasyaAllahTabarakallah
#PersiapanSeleksiPON2024
#berkudamemanah 
#perwakilanprovinsigorontalo
#dreamcometrue', '2024-05-07 22:33:00+08'::timestamptz, 'https://www.instagram.com/reel/C6siPGuBCem/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 371, 62, 0, 0, 0, 0),
  ('donikadir', 'Apa Bedanya Gorontalo sama Kamu ???
Kalau Gorontalo itu Tujuannya Wisata & Kuliner…
Kalau Kamu itu Tujuan Hidup ku… 

Eeeeaaaa 😉🚴🏻

#gowesgorontalo #ringroadgorontalo #niceview #udarasegar #hijau #kakipegunungan', '2024-04-12 14:14:00+08'::timestamptz, 'https://www.instagram.com/reel/C5rQ1kpBKtM/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 449, 85, 0, 0, 5, 0),
  ('ezadityaeza', 'Program : Sport Activity 
Category : Best Video 
.
Weekly routine!
.
Amaris Hotel Gorontalo team.
.
#santikafit2024', '2024-07-27 23:32:00+08'::timestamptz, 'https://www.instagram.com/reel/C99M_2hBcAV/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 14353, 466, 341, 0, 0, 2, 0),
  ('fhirmanohihiya', 'Welcome july, ku tunggu cerita indahmu be nice ya :)

#july #benice #gorontalo #gorontalounite #pesonagorontalo #gorontaloouterringroad', '2024-06-30 20:34:00+08'::timestamptz, 'https://www.instagram.com/reel/C83XMVWhAn4/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 83, 1039, 0, 0, 41, 0),
  ('galeryboalemo', 'Kalau ada waktu libur sekali sekali coba kesini, kalau mo kesini Jangan lupa bawa bekal makanan dengan minuman soalnya disini tidak warong yang b jual.

Oh iya gais aliran air yang mengalir ke tempat pemandian ini langsung dari air terjun ayuhulalo. 

Video : @angkigzl

#boalemo 
#airterjunayuhulalo 
#galeryboalemo', '2024-08-31 22:27:00+08'::timestamptz, 'https://www.instagram.com/reel/C_XNToMhF0P/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 10534, 5968, 241, 36, 3, 10, 0),
  ('galeryboalemo', 'Terkadang, janji hanyalah obat penenang berbalut kata-kata manis. Namun, setelah pengkhianatan ini, tak perlu lagi kamu menangis. Kamu masih punya esok hari Kamis, jangan biarkan energimu habis. 

Selamat menikmati malam kamis semua. 

Vibes Tilamuta malam hari yang di ambil dari drone oleh @duniadronegorontalo 

#tilamuta #boalemo 
#gorontalo
#galeryboalemo', '2024-05-22 07:01:00+08'::timestamptz, 'https://www.instagram.com/reel/C7Rd9G8hIgM/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 635, 393, 1, 0, 1, 0),
  ('galeryboalemo', 'Selamat Bermalam Minggu kaulah muda maupun Kaun jomblo . 

Video @coolturnesia 

#tilamuta #boalemo
#galeryboalemo', '2024-04-13 05:35:00+08'::timestamptz, 'https://www.instagram.com/reel/C5s6jTvhxco/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 333, 2, 0, 0, 0),
  ('galeryboalemo', 'Rasa letih di jalanan akan terbayarkan dengan hangatnya pelukan keluarga di kampung halaman. 

 cpat pulang kmri di tilamuta besok so hari raya .

Video @duniadronegorontalo 

#tilamuta
#boalemo 
#galeryboalemo', '2024-04-07 20:41:00+08'::timestamptz, 'https://www.instagram.com/reel/C5e6yl5hTd5/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 397, 499, 0, 1, 1, 0),
  ('gorontalo.unite', 'Recap 2024 versi #GorontaloUnite. teruntuk semua yang tampil di video ini, mimin ucapin terima kasih banget udah bantuin buat konten.', '2024-12-29 03:05:00+08'::timestamptz, 'https://www.instagram.com/reel/DEKPNA2yz7D/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 17934, 0, 358, 2, 4, 11, 6),
  ('gorontalo.unite', 'Tempat ngopi yang beralaskan tanah, beratapkan langit. yang buka nanti sore, tutup menjelang malam, tapi tetap menyajikan view matahari yang sebentar lagi terbenam. 

Kalo jalan-jalan sekitaran Ring Road, terus arah Tibawa, nanti bisa ketemu ini. kalo lupa, tanya saja dimana Bukit Ranjau @dki.coffee @rully3_', '2024-12-28 01:24:00+08'::timestamptz, 'https://www.instagram.com/reel/DEHeeV3y9IN/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 8827, 5427, 260, 21, 7, 1, 6),
  ('gorontalo.unite', 'Bukan sekedar saran, tapi membagikan pengalaman. Malam tahun baru, pasti dalam Kota itu macet. Belum lagi kalo ada petasan sana sini, buat yang kagetan, tentunya ini ndak bikin nyaman. 

Cobalah sekali-sekali menepi, dari keramaian. Dalam kamar bisa, tepi pantai bisa, camping di hutan bisa, nanjak gunung bisa. Bagi mereka yang introvert, cocok sih. Gak butuh energi banyak menghadapi keramaian. 

Misalnya di beberapa tempat ini. Cobain deh. 
- Danau Perintis, Suwawa
- ⁠Karang Indah, Oluhuta
- ⁠Oceana Resto
- ⁠Kurenai Beach Resort
- ⁠Puncak Dumbo
- ⁠dll

📷 @raflypiaggio 
"Wisata Botu Mo Toli''oluwo" 🏕️
📍 Desa Longalo, Kec.Bulango Utara, Bone Bolango', '2024-12-26 23:20:00+08'::timestamptz, 'https://www.instagram.com/reel/DEEtjwRSIva/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 8391, 4645, 176, 33, 2, 1, 11),
  ('gorontalo.unite', 'Menyala Gorontalo-ku. Kalo tetap masih berlanjut pemadaman ini, adebo so pasrah kami. Tetap semangat bapak-bapak yang jaga SPBU, bapak-bapak Damkar yang standby, driver ojek online, owner coffeeshop yang menyediakan colokan listrik beserta wifi.', '2024-12-12 07:23:00+08'::timestamptz, 'https://www.instagram.com/reel/DDe6VFXycQv/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 19945, 10416, 749, 9, 4, 3, 17),
  ('gorontalo.unite', 'Menyambut Desember yang tentunya harus penuh keceriaan, Natal dan Tahun Baru 2025. (Perasaan baru kemarin 2024, pe capat skali ini waktu berlalu),

@yuliahotelgorontalo managed by HIG punya beragam event dan penawaran menarik. Nanti tunggu-tunggu saja, mulai dari Christmas Dinner start from 200K/pax, Back to 80s Party, etc. 

Gak sengaja juga ketemu dengan salah satu content creator from North Celebes, @oviraloe_ salam kenal kk.', '2024-12-02 05:27:00+08'::timestamptz, 'https://www.instagram.com/reel/DDE957wSbEh/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 6313, 3572, 74, 1, 0, 2, 2),
  ('gorontalo.unite', 'matahari pagi muncul perlahan dibalik bukit botubarani, sebelah sedikit botutonuo. nah sebelahnya botupingge, kalo tere-tere kamari sadiki, botudaa pantai

so hari rabu, rabu depan torang ba coblos. 
masih ragu-ragu? anggu bo rabu-rabu.', '2024-11-19 15:43:00+08'::timestamptz, 'https://www.instagram.com/reel/DCkmASOB4nc/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 11475, 6499, 299, 13, 0, 0, 20),
  ('gorontalo.unite', 'Jadi tadi malam dang, beberapa runners yang akan meramaikan Gorontalo Half Marathon 2024 makan malam di kawasan Danau Perintis. 

Pj. Gubernur Gorontalo sempat hadir, Bpk. @rudybun dan juga Bpk. @rachmatgobel_rg, Anggota DPR RI yang juga Chairman dan Shareholder Gobel Group.

Bagimana? So siap besok subuh? Siap dongs.', '2024-10-26 00:18:00+08'::timestamptz, 'https://www.instagram.com/reel/DBlBpdJSPaX/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 9078, 5377, 295, 9, 1, 0, 2),
  ('gorontalo.unite', 'Salah satu rute termewah di Gorontalo. Kenapa mewah, karena bagi sebagian orang, yang misal setahun sekali lewat sini untuk pulang kampung, jadi rasanya mewah. 

Setiap jalan deh pokoknya, semuanya. Jalan pulang ke rumah, itu mewah. @ry_karin', '2024-10-18 22:10:00+08'::timestamptz, 'https://www.instagram.com/reel/DBSyKwkzKMi/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 9704, 6307, 326, 5, 7, 7, 10),
  ('gorontalo.unite', 'Kopi Bentor Goes To You. Jadi ceritanya, @kopiolami buat gebrakan baru, ngopi ndak lagi harus di Cafenya langsung, tapi ngopi bisa lebih dekat lagi. ah, bagimana redaksinya. pokoknya bagitu. 

Kopi Bentor pertama di Gorontalo? Hhmmm. Jang sampe lupa, besok pagi dorang di kawasan Taruna Remaja.', '2024-09-21 04:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DALWJnkhyt6/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 21027, 11138, 443, 85, 1, 10, 8),
  ('gorontalo.unite', 'Tau gak apa hal yang termewah saat pulang kerja? Bisa mampir solat Magrib, dan disambut dengan penuh rasa cinta oleh orang di rumah. 

So, tetap hati-hati di jalan dan patuhi peraturan lalu lintas. Apalagi di Ring Road, ma bolo hi layu-layuhe 😅 

📹 @fhirmanohihiya', '2024-09-05 03:12:00+08'::timestamptz, 'https://www.instagram.com/reel/C_iBhZRhsm7/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 7474, 4283, 415, 12, 1, 11, 24),
  ('gorontalo.unite', 'Kota tapi dengan view sawahnya yang subur. 

Namanya kota, dari tahun ke tahun luas sawahnya mengalami penyusutan yang signifikan, karena dibangunnya infrastruktur. 

Entah itu perkantoran ataupun pemukiman cluster alias perumahan.', '2024-08-08 22:09:00+08'::timestamptz, 'https://www.instagram.com/reel/C-b9ZlfPy67/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 5589, 87, 133, 0, 0, 3, 1),
  ('gorontalo.unite', 'Sore-sore emang paling cocok menikmati suasana sekitar. kalo menikmatinya ditemani sajian kopi atau pisang goreng, cocokmi itu. 

Misal di Oceana Resto & Resort di Leato Selatan ini, viewnya itu loh. kalo mau buat event atau anniversary ke-8 hari, kontak saja ke: 
@oceana.resto.resort // @debby_latief #GorontaloUnite', '2024-07-21 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C9rWGKhOdA-/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 9833, 413, 153, 1, 4, 2, 24),
  ('gorontalo.unite', 'Jika kita menyayangi alam sekitar, maka alam sekitar juga akan menyayangi kita.

Semua makhluk hidup punya tempatnya masing-masing. Begitupun alam. We never know kapan dia kembali mengambil haknya.

📸 @deadegobel_', '2024-07-18 02:55:00+08'::timestamptz, 'https://www.instagram.com/reel/C9j0p1ZhiTR/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 5730, 51, 218, 1, 0, 2, 4),
  ('gorontalo.unite', 'Liat video tillshift by @rezkymattara ini mengingatkan satu quote film kalo ndak salah. Hi, masalah besar. Aku punya Allah Maha Besar. 

Sebesar apapun itu, liat saja truk2 besar ini. Lagi bangun Bendungan Bulango Ulu yang punya daya tampung air 84,10 juta meter kubik.

Salah satu solusinya itu mengurangi dampak banjir yang menggenangi Kota Gorontalo.', '2024-06-27 22:14:00+08'::timestamptz, 'https://www.instagram.com/reel/C8v0SyoPyJQ/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 369, 516, 0, 0, 10, 13),
  ('gorontalo.unite', 'Suasana sore-sore di Gorontalo itu apa yaa, ngajakable. Meneduhkan.

@fitriadiarti', '2024-06-25 02:35:00+08'::timestamptz, 'https://www.instagram.com/reel/C8ojzuAPRTq/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 593, 3103, 0, 1, 52, 165),
  ('gorontalo.unite', 'rasakan sensasinya, nikmati suasananya. hujan yang kemarin deras, reda juga kan? 

Desa Longalo, Wisata Botu Motoli''oluwo. Kawasan sekitar sini masih terjaga dengan baik, sungainya juga jernih. Cocok buat yang suka dengan kesendirian. 

@wfqars_ #GorontaloUnite', '2024-06-18 22:39:00+08'::timestamptz, 'https://www.instagram.com/reel/C8Yr7k7vTlp/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 92, 82, 0, 0, 0, 1),
  ('gorontalo.unite', 'Ini wajah Ibukota Provinsi Gorontalo. Tidak banyak bangunan bertingkat ditemui, layaknya ibukota pada umumnya. Yang paling mudah dikenali adalah Masjid Agung Baiturrahim. Berdiri sejak abad ke-17 saat Gorontalo dikuasai oleh Kesultanan Gorontalo.', '2024-05-11 00:38:00+08'::timestamptz, 'https://www.instagram.com/reel/C60erzDOwDK/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 101, 1757, 1, 0, 43, 92),
  ('gorontalo.unite', 'Rekomendasi lagi buat teman teman yang ingin camping di pinggir pantai di Gorontalo, bisa jalan-jalan kesini, tepatnya di Pantai Tihu, Bone Pantai, Gorontalo

Long weekend kali ini bakalan terasa menyenangkan. 

📸 @tukangbajalan14', '2024-05-09 01:45:00+08'::timestamptz, 'https://www.instagram.com/reel/C6vcD7TOa9j/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 83, 149, 0, 0, 0, 6),
  ('gorontalo.unite', 'lihat, dengar, rasakan. 

masa anak-anak masa yg tanpa beban, menyenangkan, bermain tidak kenal lelah. beranjak remaja nanti, beda lagi nuansanya. selagi masih ada waktu, nikmati saja. 

📸 @fathirmohi23', '2024-05-09 00:32:00+08'::timestamptz, 'https://www.instagram.com/reel/C6vUXDSOUGw/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 30, 168, 0, 0, 0, 9),
  ('gorontalo.unite', 'Gorontalo siang ini lagi teduh-teduhnya, biasanya siang panas, sore ujan, malamnya kangen. 

Sebagian orang mungkin tengah terlelap, seusai melambungkan euforia harapan, yang masih saja kandas dari 11 pria semenanjung balkan. Sebagian lagi tengah bekerja, karena pada hakikatnya, kita bisa bekerja lebih baik ketika orang memiliki harapan yang tinggi terhadap kita.

Mari terus melambungkan harap, karena ada doa dibalik harapan itu.', '2024-04-29 19:29:00+08'::timestamptz, 'https://www.instagram.com/reel/C6XmKRzyS3h/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 32, 308, 0, 0, 2, 14),
  ('gorontalo.unite', 'Gegap gempita Gorontalo di bulan Ramadan itu memang tiada duanya kesannya. Dikatakan macet, tidak juga. Dikatakan sepi, malah ada banyak yang bikin ramai. Semoga kita dipertemukan lagi dengan Ramadan di tahun berikutnya yaa. 🥰

Kadang, berdamai meski sejenak, melupakan hal semacam ego dan gengsi sungguh menenangkan hati. Terima kasih, teman.', '2024-04-17 17:39:00+08'::timestamptz, 'https://www.instagram.com/reel/C54gOS7BaCO/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 150, 4068, 1, 1, 24, 243),
  ('gorontalo.unite', 'Cocok nih dicoba. Ready mulai jam 4 sore sampe jam 10 malam. Abis subuh juga buka kata. Skuteran suka-suka di area Center Point Bone Bolango. 

kalo mo sewa, langsung saja kesini. Nanti so mo dapa lia depe tampa yang se sewa dang di @skuteranyuk.gtlo #GorontaloUnite', '2024-04-03 23:43:00+08'::timestamptz, 'https://www.instagram.com/reel/C5VHPcVBBsc/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 5293, 963, 8, 0, 148, 31),
  ('gorontalo.unite', 'jika mampu dan sempat, mudiklah. rayakan lebaran bersama orang tua selagi sempat. orang di rumah ataupun orang di kampung, sudah menantikan dengan senyuman. hati-hati dijalan.', '2024-04-03 17:38:00+08'::timestamptz, 'https://www.instagram.com/reel/C5UddBgBwxd/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 200, 3797, 0, 0, 38, 123),
  ('gorontalo.unite', 'mondalengo, pokoknya jalan-jalan. semacam ngabuburit. 

dalam Bahasa Gorontalo, ngabuburit bisa saja dimaknai dengan ungkapan “mohundude dulahu” atau mendorong matahari (biar cepat terbenam for mo buka puasa) 😃😃

@sukronrachman_ #GorontaloUnite', '2024-03-31 00:46:00+08'::timestamptz, 'https://www.instagram.com/reel/C5K7YZGB4wM/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 1209, 6532, 4, 3, 42, 616),
  ('gorontalo.unite', 'tempat nongkrong asyik, vibesnya benar-benar pas buat charge iman & ilmu, sekalian beramal bisa kalo traktir teman kesini. 

kalo menurut @fera.umar, ini tempat yang bisa di jadikan rekomendasi untuk me time, atau bisa hangout bareng teman sambil belajar untuk menambah wawasan.

📍Rumah Literasi Gorontalo, Kel. Huangobotu, Gorontalo. #GorontaloUnite', '2024-03-18 06:28:00+08'::timestamptz, 'https://www.instagram.com/reel/C4qD-SKBqqX/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 176, 2816, 3, 1, 58, 242),
  ('gorontalo.unite', 'Jalan meskipun belum teraspal, dibikin seperti ini lumayan juga. Biasanya ini partisipasi pemerintah desa dan masyarakatnya. Dibanding nunggu pemerintah daerah bergerak menyelesaikannya. 

Bayangkan jika anggaran Dana Desa dapat 5M/desa/tahun. Lebih keren lagi itu. Keren tapi rawan. 😅

📸 @dinagyzdiv jalan-jalan di bagian barat Gorontalo, Pohuwato. #GorontaloUnite', '2024-03-09 21:31:00+08'::timestamptz, 'https://www.instagram.com/reel/C4Umyt4hVQU/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 19, 358, 1, 0, 3, 10),
  ('gorontalo.unite', 'Bikin suasana sekitarmu jadi lebih tambah berkesan, mungkin bisa dicoba nih, ajak dan bikin suasana dekor ala @partylogygorontalo. Jadi selain berkesan, tentunya juga instagramable. Buat kenang-kenangan apalagi.', '2024-02-17 23:45:00+08'::timestamptz, 'https://www.instagram.com/reel/C3ex2vvBMF9/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 25, 192, 0, 0, 2, 10),
  ('gorontalo.unite', 'Selain Pilpres, Pilwako adalah salah satu momen yang ditunggu. Lahirnya Walikota baru. Nah, so ada beberapa nama yang mencuat mo maju. 

Sapa yang ngoni suka? Dengan apa ngoni pe harapan pa dia kalau dia jadi Walikota?', '2024-01-09 21:20:00+08'::timestamptz, 'https://www.instagram.com/reel/C16GNzty65M/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 40, 1540, 0, 0, 115, 103),
  ('gorontalo.unite', 'Hujan malam minggu yg bikin suasana tambah teduh. yang baru kelar malam mingguan, cepat tidor jo. lanjut lagi besok. yang lagi diluar, jaga kesehatan. jang pulang basah-basah. 

Eh, tapi hujannya sudah reda. 😀

📸 @dwi_anggelita #GorontaloUnite', '2024-01-06 08:35:00+08'::timestamptz, 'https://www.instagram.com/reel/C1xAJV3SHjw/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 3702, 5936, 6, 3, 56, 846),
  ('gorontalo.unite', 'Berharap untuk hal-hal terbaik dimulai dari diri sendiri, bukan dari tahun yang baru. Sekarang pun bisa, besok juga bisa. Terserah. 

Semoga di tahun-tahun berikutnya semua yang terbaik selalu datang. 

📸 @dani_malasai dari keramaian Limboto dengan suasananya yang khas.', '2023-12-31 08:17:00+08'::timestamptz, 'https://www.instagram.com/reel/C1hhCdpSkcV/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 249, 1161, 1, 0, 3, 41),
  ('johan_neeskens_mandey', 'Terima kasih sudah berkunjung dan bersepeda bersama rekan rekan Cyclist @gorontaloroadbikecommunity di Gorontalo nte @eci8 Pacer @gtlo_hm2024 
Next ajak teman² Cyclist SE Indonesia Raya untuk gowes di sini ya🙏.
Terima kasih mau mempromosikan Gorontalo sebagai salah satu destinasi wisata
Jersey #wondrbybni @triplleeightcycling', '2024-10-28 02:49:00+08'::timestamptz, 'https://www.instagram.com/reel/DBqcJbTSbZG/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 10662, 6166, 286, 4, 0, 8, 0),
  ('maykel_', 'menikmati matahari pagi tanpa melihat nike, adidas, garmin, x, oc dst…

#gopro #gorontalo', '2024-11-15 19:42:00+08'::timestamptz, 'https://www.instagram.com/reel/DCardN6o4Mo/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 4813, 2761, 100, 0, 0, 5, 0),
  ('meylan_phutry', '', '2024-06-21 19:59:00+08'::timestamptz, 'https://www.instagram.com/reel/C8gE64JSPO7/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 3648, 4657, 15, 6, 84, 0),
  ('ns.zuki', 'Strolling around Gorontalo’s Arc de Triomphe', '2024-06-08 04:22:00+08'::timestamptz, 'https://www.instagram.com/reel/C78-Ub7BSXP/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 1430, 303, 11, 0, 4, 0),
  ('ns.zuki', 'Akhir-akhir ini Gorontalo lagi sering diguyur hujan, jaga kesehatan yaa', '2024-03-28 00:14:00+08'::timestamptz, 'https://www.instagram.com/reel/C5DJRL5hdYW/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 146, 247, 0, 0, 2, 0),
  ('rully.ahaya', 'Calm and peace.

#rodaduasampetua #rodaduanusantara #rodaduaberkelana #rodaduabercerita #scramblers #scramblerid #scrambleride #scramblerstrackers #scrambler #scramblerindonesia #japstylecustom #japstyleindonesia #japstylebratstyleindonesia #japstyle #kustomindonesia #gudangkustom #like_gorontalo #gorontalolife #gorontalo #gorontalounite #gorontalohits #akucintagorontalo #wisatagorontalo #eskploreindonesia #eksploresulawesi #potretwisataindonesia #traveling #travelingindonesia #travelingkelasekonomi #pesonaindonesia', '2024-05-26 04:39:00+08'::timestamptz, 'https://www.instagram.com/reel/C7bh0Z1BzBQ/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 103, 93, 0, 0, 0, 0),
  ('srydunggio__', 'yelow mode Jalan 🔥
.
.
.
.

#jalanjalan #dkijalanjalan #hijabtraveller #gorongalo_inframe #gorontalounite #pesonaindonesia #sulawesiutara #moment #senja #dagelangorontalo @gorontalo.life @gorontalo.unite @like_gorontalo #travelphotography #hijabstyle #fotoğraf', '2024-10-12 21:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DBDPp3dyI5U/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 8905, 5209, 297, 3, 0, 3, 0),
  ('wafiqarsyad_', 'Jika rasa tenang bisa digambarkan ☕🌧️🍃', '2024-07-05 17:08:00+08'::timestamptz, 'https://www.instagram.com/reel/C9D39VWhGoY/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 8742, 105, 207, 0, 0, 2, 0),
  ('wafiqarsyad_', 'Tenang atau Kesepian?

📍Puncak Dumbo

#gorontalolife', '2024-03-26 03:40:00+08'::timestamptz, 'https://www.instagram.com/reel/C4-XTdkhA_g/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 56, 1512, 0, 0, 12, 0),
  ('ahmadmanangin', 'Gorontalo dan segala cerita yang pernah ada. 

Daerah tempat saya kuliah kurang lebih 5 tahun menjadikan tempat ini adalah rumah yang selalu di rindukan. Walaupun kini sudah terasa beda karena sudah tak ada lagi kawan-kawan semasa kuliah dulu, tempat ini masih banyak cerita yang tak akan pernah habis dibicarakan.

Shoot with Sony a7iii + 18-105mm f.4

#gorontalo #likegorontalo #kotamobagu #reel #instagram #content #ambience #cinematic #reelsinstagram #sonyalpha #sonyindonesia #sonya7iii', '2024-05-25 04:22:00+08'::timestamptz, 'https://www.instagram.com/reel/C7Y654TSUPY/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 100, 1274, 0, 0, 2, 0),
  ('akbardama', 'Hari ini kita lihat Gorontalo begitu kuat dalam menghadapi musibah. Dalam keadaan begini masih bisa tersenyum dan mencoba menerima semua yang telah menimpa daerah ini

Tugas kita masih terus berlanjut, mari kita saling tolong menolong karena masih banyak yang membutuhkan bantuan.

Jangan pernah menyerah, bergeraklah walau lambat.

Lensa Apexel sewa di👉 @sewaapexel_gtlo 

#gorontalo #banjir #banjirgorontalo #kotagorontalo #apexel #lensaapexel #reelsinstagram', '2024-07-12 05:09:00+08'::timestamptz, 'https://www.instagram.com/reel/C9UmCP7yc5-/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 158871, 2025, 5756, 0, 1, 97, 0),
  ('galeryboalemo', 'Selamat Datang Di Boalemo pak @jokowi 

Rencananya hari ini Presiden RI akan melakukan kunjungan kerja ke beberapa titik di kabupaten Boalemo . 

#presidenjokowi
#boalemo #galeryboalemo', '2024-04-21 18:48:00+08'::timestamptz, 'https://www.instagram.com/reel/C6C70h6hWeJ/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 901, 2408, 0, 0, 16, 0),
  ('galeryboalemo', 'Peninjauan Lokasi Pendaratan Presiden RI Dalam Kunjungan Kerja Ke Boalemo Di Stadion Pemuda .

Rencana nya Presiden RI akan melakukan kunjungan kerja ke Boalemo pada Senin tanggal 22 April 2024 

Berikut beberapa agenda kunjungan Presiden RI ke Boalemo.

- Panen Raya Jagung di Desa kotaraja , Kec Dulupi
- Peresmian IJD Desa polohungo, Kec Dulupi
- Peresmian Upg Bulog , Desa Bongo nol , kec paguyaman .
- Peresmian Pelabuhan Tilamuta, Desa pentadu timur , Kec Tilamuta.

Lokasi pendaratan Helikopter Presiden RI Ke Boalemo, Stadion Pemuda , Desa piloliyanga, Kec Tilamuta.

#kunjunganpresiden
#tilamuta
#boalemo 
#galeryboaelmo', '2024-04-20 03:37:00+08'::timestamptz, 'https://www.instagram.com/reel/C5-uYaeBrF8/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 1185, 0, 0, 24, 0),
  ('gorontalo.unite', 'Mau liat bagaimana suasana Kota Gorontalo pas malam tahun baru? Dari atas @puncak.dumbo kayaknya seru, dapat city view night yang lumayan. Semoga cuaca cerah.', '2024-12-28 06:49:00+08'::timestamptz, 'https://www.instagram.com/reel/DEID2Ffy5nk/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 281349, 0, 14812, 705, 232, 43, 889),
  ('gorontalo.unite', 'Pak @presidenrepublikindonesia, terima kasih udah wujudkan sambutannya. Harga tiket pesawat turun, iya. Tapi, 3 hari lagi bakalan naik? Menyesuaikan kenaikan PPN 12%? 🤔

Lihat detik terakhir, momen Ramadan nanti, harga tiket kembali normal, kembali mahal. 😛', '2024-12-27 16:33:00+08'::timestamptz, 'https://www.instagram.com/reel/DEGhoVUTMK4/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 40747, 18765, 520, 85, 0, 32, 12),
  ('gorontalo.unite', 'Anti peluru? Iya. Di caption sudah diuraikan tahan terhadap terhadap munisi kaliber 7,62 x 51 mm NATO ball & kaliber 5,56 x 45 mm M193.

Ini berarti senapan tempur atau senapan serbu yang menggunakan munisi ini, seperti FN FAL, HK G3, M14, M16, M4 Carbine, AKM, Beryl M762, DP-28, Kar98K, M24, Mk47 Mutant, R1895, SLR, SKS, Groza, ama MK14 dan sejenisnya, tidak dapat menembus perlindungan kendaraan.

Kecuali Kaliber .50 BMG (12,7 x 99 mm) yang digunakan dalam senapan anti-material seperti Barrett M82.

Semua penjelasan dari ChatGPT4o.', '2024-10-20 18:49:00+08'::timestamptz, 'https://www.instagram.com/reel/DBXjNomBBi2/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 19162, 9920, 487, 1, 0, 7, 3),
  ('gorontalo.unite', 'Selamat Bekerja, Pak @prabowo dan Mas @gibran_rakabuming !', '2024-10-19 21:10:00+08'::timestamptz, 'https://www.instagram.com/reel/DBVP6rbBsf_/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 15313, 8929, 889, 35, 0, 5, 9),
  ('gorontalo.unite', 'Setidaknya ada 450 prajurit dari Batalyon Infanteri Raider (Yonif) 715/Motuliato sebagai Pasukan Satuan dari Gorontalo Utara yg bertugas mengamankan Perbatasan RI-Papua New Guinea (Satgas Pamtas Kewilayahan RI-PNG) untuk melaksanakan operasi pengamanan di wilayah Papua. 

Bukan sekedar bertugas menjaga kedaulatan NKRI, tapi mereka juga menjalankan kegiatan-kegiatan lain bersama elemen masyarakat Papua. 

Dari video 2 menit ini, adalah sebagian dari cerita mereka, selama 9 bulan sampai 1 tahun di area Satgas Pamtas Kewilayahan Sektor Mulia, Puncak Jaya Papua

@Kodamxiii @puspentni @tni_angkatan_darat @yonif_raider_715_motuliato', '2024-09-05 00:10:00+08'::timestamptz, 'https://www.instagram.com/reel/C_hsGdjBxh9/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 6030, 3090, 172, 1, 0, 2, 0),
  ('gorontalo.unite', 'Dari Gorontalo, salah satu surga kecil yang tersembunyi di Indonesia. 

Dirgahayu Republik Indonesia. 

-- 

Video by: 
@pemerintahgorontaloprov 
@maykel_
@ezadityaeza
@tripbarengisal
@helmihongi
@adi.ilahude
@adhyy.s 
@fhirmanohihiya 
@rully3_ 
@gledysputi 
@windittt 
@laila_kaluku 
@lyn_lynaa29 
@rdcwalenta 
@venscaveronica 
@aldi.inaku', '2024-08-16 23:58:00+08'::timestamptz, 'https://www.instagram.com/reel/C-wvmA_vQBd/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 16514, 214, 669, 0, 0, 21, 9),
  ('gorontalo.unite', 'Lion Air dengan nomor penerbangan JT792 tujuan Ujung Pandang - Gorontalo gagal mendarat di Bandara Djalaludin Gorontalo, pesawat Boeing 737 tersebut langsung mendaki ke ketinggian hingga 10.000 kaki dan langsung menuju Bandara International Sam Ratulangi di Manado. 

Video: Kapolsek Bandara Djalaludin, Ismet Ishak', '2024-07-17 21:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C9jK2H8B9st/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 76798, 507, 1754, 0, 1, 128, 58),
  ('gorontalo.unite', 'Salah satu akses yang jadi penghubung Gorontalo Outer Ring Road yakni jalan berbentuk terowongan. Kawasan sekitar sini memang keren sih, apalagi kalo sore. 

Yaa, tapi itu. Masih saja banyak pengunjung yang buang sampah sembarangan. Rusak deh keestetikan kawasannya. Padahal, ada tempat sampah. 

Buang sampahnya sembarangan, tapi paling cerewet menyalahkan pemerintah kalo ada banjir. Capek deh. 

video: @rully3_
foto: @nurfamajid', '2024-07-16 01:59:00+08'::timestamptz, 'https://www.instagram.com/reel/C9ekRpLhD2Q/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 51584, 128, 1473, 0, 0, 222, 38),
  ('gorontalo.unite', 'Izinkan mimin mau mengapresiasi dua komunitas kerelawanan di Gorontalo, yang sudah merelakan suka dan dukanya hari ini, @pemudarelawangtlo & @1000_guru_gorontalo. 

Terima kasih yaa. 🌹', '2024-07-12 05:31:00+08'::timestamptz, 'https://www.instagram.com/reel/C9UpqGlynlc/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 31461, 479, 1113, 1, 1, 28, 8),
  ('gorontalo.unite', 'Evakuasi terhadap warga yang terjebak banjir masih terus dilakukan oleh Basarnas Gorontalo di Jl. Mohammad Yamin, Kelurahan Limba B, yang tembus dekat perempatan Jl. Raja Eyato sedikit simetris. 

Untuk warga lainnya, semoga secepatnya tertangani, baik itu evakuasi maupun ketersediaan tempat pengungsian sementara dan kebutuhan akan makanan. 

dikirim @haltelaundry', '2024-07-10 19:52:00+08'::timestamptz, 'https://www.instagram.com/reel/C9RCsntBBqJ/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 81733, 199, 1938, 0, 1, 27, 31),
  ('gorontalo.unite', 'Proses evakuasi korban longsor di Suwawa oleh Polda Gorontalo.', '2024-07-09 00:01:00+08'::timestamptz, 'https://www.instagram.com/reel/C9MU08CBLru/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 36849, 90, 1718, 0, 0, 17, 30),
  ('gorontalo.unite', 'Sebagian wilayah di Kota Gorontalo terendam banjir (lagi)', '2024-06-19 19:43:00+08'::timestamptz, 'https://www.instagram.com/reel/C8a8XYvPP9f/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 215, 1275, 0, 3, 15, 27),
  ('gorontalo.unite', 'Gorontalo sudah punya 2 bandara dan 2 pelabuhan besar. Sesuatu yang tidak pernah terbayangkan, kota kecil nan tertinggal ini terus bergeliat membangun. 

Resmi sudah diresmikan oleh Presiden RI, @jokowi pagi tadi.', '2024-04-21 20:26:00+08'::timestamptz, 'https://www.instagram.com/reel/C6DG-SUyjo1/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 136, 4750, 0, 0, 78, 107),
  ('gorontalo.unite', 'Mohengu da’a lapangan ju.', '2024-04-21 02:39:00+08'::timestamptz, 'https://www.instagram.com/reel/C6BM0f_hYVk/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 59, 3485, 0, 0, 91, 91),
  ('gorontalo.unite', 'Beberapa agenda Presiden RI, Jokowi yang direncanakan di Gorontalo. Agenda utamanya saja yaa. Kalo jam-per jam dimana saja, ada sih. 

Siapa tau to, teman-teman bisa ketemu Presiden diantara sini: 
- Pasar Bendungan, Bone Bolango
- Menuju RSUD Toto di Bone Bolango
- Peresmian Bandara Panua di Pohuwato
- Peresmian IJD di Boalemo
- Bulog UPG Bongo Nol, Boalemo

📍Lapangan Bulango Utara, Bone Bolango.
video @febriankarim #GorontaloUnite', '2024-04-20 02:52:00+08'::timestamptz, 'https://www.instagram.com/reel/C5-opNVBUbS/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 57, 1975, 0, 0, 61, 55),
  ('gorontalo.unite', 'Banyak hal yang berubah sejak orang yang kita tuakan, dalam hal ini bapak @pouhamim menjabat sebagai Bupati Bone Bolango. Banyak pembangunan yang sudah dirintis di Kabupaten yang lahirnya barengan Pohuwato 21 tahun silam. 

Tanpa harus menafikan, jujurly sih Bone Bolango yang dulunya bagian dari Kabupaten Gorontalo ini, bisa jadi daerah berkembang bagus. Bagimana orang Bonebol? atau orang yang punya gebetan di Bonbol, Setuju kan?

Lagu: @lalaamriofficial', '2024-04-18 01:04:00+08'::timestamptz, 'https://www.instagram.com/reel/C55S1ONhhjx/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 82, 3314, 0, 0, 41, 114),
  ('gorontalo.unite', 'Gorontalo Unite berkesempatan ngobrol sama Ko'' Jhon dan Cece Riana di warkop amal. 2 aktor yang mungkin sudah kita kenal di @jajago.keliling.indonesia

Sambil menikmati secangkir kopi susu walet, ko Jhon bercerita kalau Gorontalo itu panas, lucu banyak bentornya, dan yang paling utama ramah sekali masyarakatnya.

Selamat menikmati Gorontalo Ko Jhon dan Cece Riana. Sehat selalu dan lancar jayanya journeynya. ❤️', '2024-04-16 03:31:00+08'::timestamptz, 'https://www.instagram.com/reel/C50aCP5SOeg/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 75, 993, 0, 0, 23, 18),
  ('gorontalo.unite', 'Begitu cepat waktu berlalu, pembangunan juga berjalan dengan pesat. Mungkin beberapa tahun sebelum tidak pernah terbayangkan, kalo mudik Lebaran 2024 ke Pohuwato sudah bisa pakai pesawat. Perintis tapi hadirnya sangat bermanfaat.

@pohuwato_airport #GorontaloUnite', '2024-04-03 07:46:00+08'::timestamptz, 'https://www.instagram.com/reel/C5TZra7htFU/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 26, 635, 0, 0, 9, 19),
  ('gorontalo.unite', 'Berbagi takjil ala jajaran Polsek Tilamuta yang dipimpin langsung oleh Kapolsek Tilamuta, Iptu Dolvi Heru Supratno, S.H, yang hari ini berulang tahun, ayahanda @hygloyyy98 @intanchristyyy 

Berbagi takjil di bulan Ramadan di Gorontalo semacam jadi agenda rutin tersendiri. Bukan saja dilakukan oleh Muslim, tapi juga oleh umat beragama lainnya. Contohnya Kapolsek di video ini.', '2024-03-22 06:08:00+08'::timestamptz, 'https://www.instagram.com/reel/C40UcqghLF0/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 431, 275, 1, 0, 6, 6),
  ('gorontalo.unite', 'Aksi heroik Direktur Narkoba Polda Gorontalo Kombes Pol Witarsa Aji untuk mengevakuasi anggota Polri yang sakit  setelah berjalan 16 Jam mengamankan TPS. Salut untuk beliau!

Warga Gorontalo Unite mengucapkan terima kasih kepada bapak atas dedikasinya. Oduolo pak @witarsaaji ❤️

#polisiindonesia #polisigorontalo', '2024-02-15 09:01:00+08'::timestamptz, 'https://www.instagram.com/reel/C3YCw5uSY-F/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 1118, 0, 0, 39, 17),
  ('gorontalo.unite', 'Jika Bandara di Pohuwato rampung dan beroperasi, maka rute pelayanannya hanya jadi penghubung beberapa kota di Sulawesi. Bandara perintis gitulah. 

Jadi, ini (bukan) alternatif rute, jika (sekali lagi, jika) Bandara Djalaludin, GTO dipaksa untuk dikosongkan. #GorontaloUnite', '2024-01-25 23:43:00+08'::timestamptz, 'https://www.instagram.com/reel/C2ji5HayEr6/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 2957, 0, 2, 182, 197),
  ('japesda', '⚠️ Gorontalo Darurat Ekologis Krisis Iklim ‼️
Mengapa ini terjadi? simak videonya sampai akhir.
Tag siapapun yang harus liat video ini!

Saling Jaga, Saling Bantu, Saling Menguatkan

#pulihkangorontalo
#banjirgorontalo #banjirgorontalo2024
#prayforgorontalo #prayforsuwawatimur #longso4 #banjir #bencanagorontalo #basarnas', '2024-07-11 17:36:00+08'::timestamptz, 'https://www.instagram.com/reel/C9TXRRRh7Of/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 73005, 284, 2068, 0, 0, 77, 0),
  ('japesda', 'Beberapa hari terakhir cuaca ekstrem di Gorontalo, telah mengakibatkan bencana longsor yang memakan korban jiwa. Data sementara 123 korban becana longsor yang di update berita infopublik.id pada hari Rabu 10 Juli 2024 dan data korban akan terus bertambah. Banjir menggenang beberapa wilayah di Provinsi Gorontalo. Untuk melindungi diri dan mengurangi risiko bencana diharapkan bagi warga yang berada dilokasi rawan banjir untuk terus siaga!

Video longsor by video doc. SPN Polda Gorontalo 
Video banjir by @didy_akuba

#banjir #banjirgorontalo #telagajaya #longsor #longsorsuwawatimur #longsortambangsuwawa #suwawatimur #bencanagorontalo #japesda', '2024-07-10 00:52:00+08'::timestamptz, 'https://www.instagram.com/reel/C9O_8pIhYTj/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 419836, 1382, 4827, 0, 0, 77, 0),
  ('kemenkumgorontalo', 'Hai Sahabat Pengayoman! Pernah denger soal dana bantuan buat masyarakat miskin? Mau tahu gimana caranya biar dana ini sampai ke yang bener-bener butuh?🤔

Yuk, gabung di Diskusi Strategi Kebijakan tanggal 9 Oktober 2024, pukul 10 WITA. Kita bakal bahas sama-sama tentang strategi penerapan Permenkumham Nomor 63 Tahun 2016 buat penyaluran dana bantuan Hukum! 

Ada free sertifikat dan hadiah menariknya juga lohhh 😉

So, daftar sekarang melalui link: https://forms.gle/iY36AGiP6dPbfvng9

jangan sampai ketinggalan!
Bersama kita bantu masyarakat yang membutuhkan 🤗', '2024-10-07 19:04:00+08'::timestamptz, 'https://www.instagram.com/reel/DA2IBaMSQnp/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 4585, 2528, 170, 4, 0, 0, 0),
  ('m.r.lagata', 'Terima Kasih atas kunjungan serta perhatiannya di Provinsi Gorontalo Bapak Presiden RI @jokowi', '2024-04-22 22:56:00+08'::timestamptz, 'https://www.instagram.com/reel/C6F6kKjhrO0/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 50, 1991, 0, 0, 14, 0),
  ('pemerintahgorontaloprov', 'Bicara soal tempat wisata, kurang lengkap tanpa kuliner lezat! Selain serunya aktivitas air, anda juga bisa nongkrong di resto/cafe yang menyajikan pemandangan Danau Perintis seperti ini😍
#danauperintis #pariwisatagorontalo #panada', '2024-12-29 23:34:00+08'::timestamptz, 'https://www.instagram.com/reel/DEMa5div-jo/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 4631, 2741, 79, 1, 0, 2, 0),
  ('pemerintahgorontaloprov', 'Ingin merasakan serunya mengarungi Danau Perintis? Wahana sepeda air dan perahu karet siap membawa anda untuk petualangan seru yang tak terlupakan! 🌊✨ 
#danauperintis #pariwisatagorontalo #panada', '2024-12-24 03:24:00+08'::timestamptz, 'https://www.instagram.com/reel/DD9Y8vlvR_Y/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 4036, 2566, 75, 7, 1, 0, 0),
  ('pemerintahgorontaloprov', 'Siapa yang belum pernah ke Danau Perintis? Salah satu wisata hits di Gorontalo yang tidak hanya menawarkan pemandangan alam memukau, tapi juga banyak fasilitas seru untuk dinikmati! Wajib banget masuk daftar liburan! 😍 
#danauperintis #pariwisatagorontalo #panada', '2024-12-17 21:46:00+08'::timestamptz, 'https://www.instagram.com/reel/DDtVIbZP37l/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 8213, 5216, 236, 5, 6, 2, 0),
  ('pemerintahgorontaloprov', 'Kalau pengen dodol ini guys sebenarnya tidak perlu menunggu hari besar keagamaan karena dodol ini ada industrinya juga loh ! Misalnya dodol Matuari Desa Reksonegoro yang satu ini !

#panada #part3 #dodol #panganankhasjaton', '2024-10-17 20:08:00+08'::timestamptz, 'https://www.instagram.com/reel/DBP_JBqJnth/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 2171, 1267, 33, 0, 2, 0, 0),
  ('pemerintahgorontaloprov', 'Duh jangan cuma tau nikmatin dodolnya ya tapi harus tau prosesnya yang unik juga nih ! Yuk bisa yuk belajar bikin dodol🤭

#dodol 
#oleolegorontalo 
#panganankhasjaton 
#panada', '2024-10-11 18:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DBATx83J9ra/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 930, 617, 25, 0, 0, 0, 0),
  ('pemerintahgorontaloprov', 'Siapa sih yang ga doyan panganan spesial warga Jaton satu ini? Dari tekstur dan rasanya yang menggiurkan ini bikin dodol khas Gorontalo beda dari yang lainnya😍

#panada 
#dodol 
#oleolegorontalo', '2024-10-09 17:29:00+08'::timestamptz, 'https://www.instagram.com/reel/DA7Ge73Ja_m/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 4890, 3182, 86, 2, 1, 1, 0),
  ('pemerintahgorontaloprov', 'Halo Sahabat, edisi kali ini torang mo bahas salah salah satu hidden gems di Gorontalo, yakni Desa Wisata Bihe dengan pesona alamnya. Langsung cek ygy 🤩

#panada
#desabihe
#adwi2024
#gorontalo', '2024-10-03 02:01:00+08'::timestamptz, 'https://www.instagram.com/reel/DAp_N-IJpoa/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 2087, 1240, 35, 0, 0, 6, 0),
  ('pemerintahgorontaloprov', 'Tradisi walima di Gorontalo identik dengan tolangga dan toyopo. Apa itu? Simak ya di part II berikut ini 🙏🏾

#panada
#paketnarasidaerah
#walima', '2024-09-27 18:27:00+08'::timestamptz, 'https://www.instagram.com/reel/DAcTpo1J4pl/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 4746, 3028, 114, 2, 2, 5, 0),
  ('pemerintahgorontaloprov', 'Halo Sahabat Gorontalo. Paket Narasi Daerah - PANADA edisi kali ini mau bahas keunikan suku Bajo di Desa Torosiaje, Kec. Popayato, Kab. Pohuwato.

Seperti apa suku yang bermukim di atas laut ini? Langsung aja cus ygy 😅

#panada
#paketnarasidaerah
#sukubajo
#torosiaje', '2024-09-18 18:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DAFIM_VJbAX/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 3573, 2101, 69, 3, 1, 0, 0),
  ('pemerintahgorontaloprov', 'Halo sahabat Gorontalo. Kembali lagi di PANADA - paket Narasi daerah. Konten non-pemerintah untuk edukasi dan promosi budaya, kuliner, wisata dan sejarah Gorontalo.

Edisi kali ini torang mo bahas soal kain Karawo, kain sulaman tangan khas Gorontalo. Seperti apa? Langsung cus ygy 😁

Jangan lupa ikuti, sukai, dan bagikan jika kamu suka konten ini. Oduolo 🙏🏾

#karawo
#kainkarawo
#panada
#paketnarasidaerah', '2024-09-11 17:45:00+08'::timestamptz, 'https://www.instagram.com/reel/C_zBu4ap9mb/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 1513, 959, 50, 0, 2, 0, 0),
  ('pemerintahgorontaloprov', 'Pesona hiu paus Botubarani mendorong Pemerintah Provinsi Gorontalo untuk menggelar Festival Hiu Paus Gorontalo Tahun 2024. Festival yang baru pertama kali digelar ini bertepatan dengan peringatan Hari Hiu Paus Internasional yang diperingati setiap tanggal 30 Agustus 2024.

#panada
#pakernarasidaerah
#hiupaus
#hiupausgorontalo
#harihiupausinternasional2023', '2024-09-09 18:06:00+08'::timestamptz, 'https://www.instagram.com/reel/C_t6mq9pjag/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 2415, 1462, 45, 0, 0, 0, 0),
  ('pemerintahgorontaloprov', 'Buat kamu yang masih penasaran berapa sih biaya untuk menikmati fasilitas yang ada di hiu paus Botubarani? Langsung cus nonton ygy.

Jangan lupa like, comment and share sebanyak banyak 🐋🥳

#panada
#paketnarasidaerah
#hiupausgorontalo
#hiupausbotubarani
#botubarani
#whaleshark', '2024-09-06 19:14:00+08'::timestamptz, 'https://www.instagram.com/reel/C_mUDdQBIGw/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 8623, 5276, 189, 35, 4, 5, 0),
  ('pemerintahgorontaloprov', 'Halo Sahabat Gorontalo, kembali lagi di PANADA - Paket Narasi Daerah.

So ini konten yang klean tunggu-tunggu kan? Hehe 😁 

Hari ini torang bahas soal hiu paus Gorontalo. Langsung cus ygy 🐋🎉

#panada
#paketnarasidaerah
#hiupaus
#hiupausgorontalo
#whaleshark
#botubarani', '2024-09-04 17:11:00+08'::timestamptz, 'https://www.instagram.com/reel/C_g8WS5Bu4_/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 11282, 7971, 277, 9, 72, 13, 0),
  ('pemerintahgorontaloprov', 'Proses pembuatan upia karanji tidak mudah loh sahabat. Tulisan di upia juga tidak dicat tapi disulam dari belukar mintu yang warnanya berbeda secara alami. Seperti apa? Langsung cus aja ya 😁

#panada

#paketnarasidaerah
#upiakaranji', '2024-09-02 18:17:00+08'::timestamptz, 'https://www.instagram.com/reel/C_b6DWvh7kv/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 2424, 1448, 47, 0, 0, 3, 0),
  ('pemerintahgorontaloprov', 'Halo Sababat Gorontalo, Inilah alasan Upiah Karanji menjadi populer di semua kalangan baik oran tua maupun anak muda. Simak baik baik ya sahabat!

#upiakaranji 
#panada 
#Gorontalo', '2024-08-31 00:52:00+08'::timestamptz, 'https://www.instagram.com/reel/C_U39CCBR9v/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 2080, 1018, 45, 0, 0, 1, 0),
  ('pemerintahgorontaloprov', 'Halo Sahabat Gorontalo, kembali lagi di PANADA, Paket Narasi Daerah. Konten non-pemerintah untuk promosi dan edukasi wisata, budaya, kuliner serta sejarah Gorontalo.

Edisi kali ini torang mo bahas soal upia karanji. Yuk langsung cus. Jangan lupa like, comment dan subreker ygy 😅🙏🏾

#panada
#paketnarasidaerah
#upiakaranji', '2024-08-28 17:18:00+08'::timestamptz, 'https://www.instagram.com/reel/C_O8C96BHJs/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 2872, 476, 66, 0, 0, 5, 0),
  ('pemerintahgorontaloprov', 'Halo sahabat Gorontalo baku dapa poli di PANADA, Paket Narasi Daerah. Seperti janji Mimin di part sebelumnya, kali ini Mimin mau ajak kalian mengenal profil pahlawan nasional asal Gorontalo: Nani Wartabone. 🇮🇩

#naniwartabone
#pahlawan
#hut79ri
#Panada', '2024-08-19 16:42:00+08'::timestamptz, 'https://www.instagram.com/reel/C-3snDfhfqK/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 35185, 23764, 324, 11, 6, 7, 0),
  ('pemerintahgorontaloprov', 'Dirgahayu ke-79 Negeriku !
Mari kita lihat kilas balik kisah pahlawan Nani Wartabone dalam memperjuangkan kemerdekaan di PANADA kali ini. Yuk yak yuk !

#panada
#paketnarasidaerah
#dirgahayuindonesia
#17agustus2024
#pahlawannasional
#naniwartabone', '2024-08-16 16:29:00+08'::timestamptz, 'https://www.instagram.com/reel/C-v8r6hh4WM/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 2688, 100, 59, 0, 0, 1, 0),
  ('pemerintahgorontaloprov', 'Menyambut HUT ke-79 RI, PANADA hadir dengan gaya berbeda. Torang mo tes kalo siswa siswi Gorontalo mongorti soal sojarah waa. Cekidot 😁

#panada
#paketnarasidaerah', '2024-08-14 16:42:00+08'::timestamptz, 'https://www.instagram.com/reel/C-q0t5gJ5DD/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 18871, 344, 612, 0, 0, 18, 0),
  ('pemerintahgorontaloprov', 'Bagi sebagian warga Gorontalo, Apangi bukan sekedar kue. Di sejumlah desa, kue ini identik dengan hari Asyura atau 10 Muharram tahun Islam. Seperti apa? Langsung cus ygy 😁

#panada
#paketnarasidaerah
#apangi
#apangcolo', '2024-08-12 16:42:00+08'::timestamptz, 'https://www.instagram.com/reel/C-lrJkEJ1mY/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 6715, 120, 183, 0, 0, 17, 0),
  ('pemerintahgorontaloprov', 'Halo gaes, baku dapa poli di PANADA - Paket Narasi Daerah edisi Apangi Part II. Cekidot yak!

#panada
#paketnarasidaerah
#apangi', '2024-08-09 18:13:00+08'::timestamptz, 'https://www.instagram.com/reel/C-eGzzfBn9m/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 4235, 149, 121, 0, 0, 8, 0),
  ('pemerintahgorontaloprov', 'PANADA kembali hadir ya gaes yaa. Konten non pemerintah untuk edukasi serta promosi budaya, kuliner, destinasi wisata dan sejarah Gorontalo.

Kali ini kita akan membahas tentang kuliner Gorontalo, apangi atau apang colo.  Langsung aja cus ke TKP 😁🙏🏼

Jangan lupa share, like dan comment ya 🎉💃🏼', '2024-08-07 19:52:00+08'::timestamptz, 'https://www.instagram.com/reel/C-ZI4nFhms7/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 13629, 5761, 332, 0, 0, 14, 0),
  ('pemerintahgorontaloprov', 'Halo Sahabat Gorontalo. Jumpa lagi di Panada Part III. Kalau kemarin torang so bahas cara buat Polopalo, sekarang Mimin mau ajak kalian cara bermain alat musik yang satu ini🤩

Ingat ya, yang bisa dimainkan itu alat musik, bukan perasaan. Haha. Cekidot!

#Panada
#Polopalo
#Pemprov Gorontalo', '2024-08-05 18:07:00+08'::timestamptz, 'https://www.instagram.com/reel/C-TzTWpBgTy/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 7957, 100, 183, 0, 0, 15, 0),
  ('pemerintahgorontaloprov', 'Halo sahabat Gorontalo. PANADA hadir lagi. Masih bahas soal polopalo, part II. Cekidot yak 😁

#panada
#polopalo', '2024-08-02 18:15:00+08'::timestamptz, 'https://www.instagram.com/reel/C-MF5wwhmD8/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 8185, 65, 208, 0, 0, 29, 0),
  ('pemerintahgorontaloprov', 'Halo Sahabat Gorontalo!
Ini loh yang Mimin janji beberapa hari lalu, PANADA - Paket Narasi Daerah. Episode perdana ini Mimin mau mengangkat soal Polopalo.

Selamat menyaksikan 🤗

#panada
#paketnarasidaerah
#polopalo', '2024-07-31 17:59:00+08'::timestamptz, 'https://www.instagram.com/reel/C-G57eBBwmL/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 4973, 85, 134, 0, 0, 38, 0),
  ('adhyy.s', 'On this 79th Independence Day, we dive deep into the waters of Gorontalo, where the spirit of freedom flows with every wave. Celebrating the power of breath and the beauty of our nation. 🌊🇮🇩 

#freedivinggorontalo #indonesiamerdeka #gorontalo 

Videographer: @adhyy.s @akbarhiola @pngmnan_ko 
Location: Oluhuta, Bone Bolango - Gorontalo 🇮🇩', '2024-08-17 06:20:00+08'::timestamptz, 'https://www.instagram.com/reel/C-xbjZqhzEN/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10477, 1815, 327, 5, 0, 37, 0),
  ('adhyy.s', 'DIONUMO ISLAND- GORONTALO 🏝️🌴

Located about 76 km from Gorontalo city, Dionumo Island is a must-visit tourist destination when you are in Gorontalo. This island offers beautiful landscapes of grasslands, white sandy beaches, and crystal-clear underwater scenes where you can see clownfish (Nemo) while snorkeling or freediving. You should go there and enjoy the experience.

Pilot drone: @hestirianata 

#dionumoisland #gorontalo #wonderful_places #indonesia', '2024-07-17 02:05:00+08'::timestamptz, 'https://www.instagram.com/reel/C9hJzezB8VL/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10063, 473, 249, 1, 0, 17, 0),
  ('adhyy.s', 'Exploring the ocean''s tranquility, freediving with whale sharks—where every dive brings a wave of peace. 🌊🦈 #freediving #whaleshark #seaserenity #gorontalo #indonesia 

Buddy: @akbarhiola 
Mask by: @hippocampusindonesia', '2024-07-07 00:57:00+08'::timestamptz, 'https://www.instagram.com/reel/C9HR3TKh8Rr/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 13108, 762, 308, 1, 0, 32, 0),
  ('adhyy.s', 'Welcome back 🐋

Sometimes we need to feel blue to understand hurt and to know who cares about us!

📍Gorontalo, Indonesia 
🤳 @goproid 

#whaleshark  #freedivinglife #freedivinggirls #gorontalo #sulawesi', '2024-06-11 00:10:00+08'::timestamptz, 'https://www.instagram.com/reel/C8EQC5pBgvN/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1551, 0, 0, 67, 0),
  ('adhyy.s', 'Mohinggito Island 🏝️✅

The combination of soft corals and a calm sea creates a tranquil underwater ecosystem, showcasing the delicate beauty of these organisms. 

Model Underwater @vidheacantika 
Camera by @goproid 
📍Mohinggito Island, North Gorontalo - Indonesia

#softcoral #mohinggitoisland #sea #sealife #calmness #gorontalo #northgorontalo #freediving #exploreindonesia', '2024-01-21 02:55:00+08'::timestamptz, 'https://www.instagram.com/reel/C2XApEBB9-l/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 483, 237, 0, 0, 2, 0),
  ('adhyy.s', 'Another aspect of the breathtaking view of Huha island 🌴

Do you wanna explore more?

🎥 @gopro 
Underwater model : @annjuliana 
📍Huha Island, North Gorontalo - Indonesia', '2024-01-13 21:05:00+08'::timestamptz, 'https://www.instagram.com/reel/C2EXbprBljn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 867, 171, 3, 0, 3, 0),
  ('adhyy.s', 'Kenny & The Enormous Shark 🤿

Can u imagine if you dive with it is?

Camera; @gopro 
Model Underwater; @putriniken__ 
Location : Tomini bay - Gorontalo, Indonesia 

#whaleshark #gorontalo #freedive #beautifuldestinations #sea #wonderful_places #underwater #marinelife #onebreath #apnea', '2024-01-11 02:32:00+08'::timestamptz, 'https://www.instagram.com/reel/C19NMPEh9Za/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 538, 294, 3, 0, 14, 0),
  ('adhyy.s', 'Crystal Clear Water - Dionumo Island, Gorontalo 🍃

Kalau explore bagian Gorontalo utara jangan lupa visit Pulau Dionumo,. Bukan cuma pantai dan bukitny yang keren tapi bawah lautnya juga,. You can try it 

Videographer andalan @billy_kohler 
📍Crystal Clear Water, Dionumo Island -Gorontalo Utara

#crystalclearwater #holdbreath #freediving #cressi #sea #gorontalo #dionumoisland #wonderful_places #indonesiaku', '2024-01-08 03:02:00+08'::timestamptz, 'https://www.instagram.com/reel/C11haLFh8Ue/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 277, 342, 1, 0, 63, 0),
  ('adhyy.s', 'Big hug from Bima (the Giant of whale shark in Gorontalo) 🐳🐋

buddy @akbarhiola 
📍 Whale shark, Botubarani - Gorontalo

#whaleshark #freedive #gorontalo #sulawesi #indonesiaku', '2024-01-06 05:32:00+08'::timestamptz, 'https://www.instagram.com/reel/C1wqkduBqam/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 533, 235, 1, 0, 14, 0),
  ('andreastaeexx', 'Whale Shark reels Versions🦈🌊
#weekendvibes #gorontalo #whaleshark #beachlife', '2024-12-20 23:38:00+08'::timestamptz, 'https://www.instagram.com/reel/DD1PsjkxTLv/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 13558, 0, 521, 10, 0, 1, 0),
  ('aryawiznu', 'Whale Shark Botubarani Gorontalo.

#whaleshark #gorontalo #pesonaindonesia #wonderfulindonesia #exploreindonesia #earthpix #drone #djiglobal #djimavic #gopro', '2024-04-01 07:04:00+08'::timestamptz, 'https://www.instagram.com/reel/C5OLW_VS8q7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 58, 127, 0, 0, 1, 0),
  ('btmb.c', 'Kami menunggu kabar baik mu miss you SHERLY🥹
.
.
.
#wisatahiupausgorontalo #whalesharks #sherly #gorontalo', '2024-05-29 18:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C7ksbmGPwXJ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 529, 3873, 0, 0, 125, 0),
  ('chrislashon_', 'Gorontalo''s waters hold the kind of peace you can''t find on land.

#worldtourismday #scubadiving #padi #gorontalo #diving', '2024-09-27 03:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DAaoH4nP-em/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4405, 3504, 109, 3, 0, 7, 0),
  ('cicirizkika', 'Beautiful Olele , Gorontalo ✨', '2024-09-19 05:47:00+08'::timestamptz, 'https://www.instagram.com/reel/DAGWPDWyqEp/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10973, 6597, 258, 7, 2, 8, 0),
  ('deadegobel_', 'Ketika surya menampakkan cahayanya, semua hal yang indah makin terlihat dengan jelas … 🧚🏻‍♂️

___________
#fairytale #dreamyaesthetic #ａｅｓｔｈｅｔｉｃ #aestheticposts #gorontalo_inframe #exploreeverything #personalbranding #brandyourself #punyacerita #destinasiwisata', '2024-05-19 02:57:00+08'::timestamptz, 'https://www.instagram.com/reel/C7JUnnXBSEI/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 148, 516, 3, 0, 11, 0),
  ('deddy_iteneps', 'Nikmati & terus bersyukur…tetap semangat..
#zonapekerja #pekerja #gorontalounite #gorontalo #danauperintis', '2024-02-28 18:30:00+08'::timestamptz, 'https://www.instagram.com/reel/C36ieTIhnMy/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 201, 0, 0, 3, 0),
  ('dinajanidya', 'Awalnya takut tapi kok candu 👀✨
Seru banget trip ke Gorontalo kemarin highlightnya selain main sama Whaleshark, harus berani turun juga main di Cave. 
Banyak spot-spotnyaa dari yang general sampai yang tau tau aja 🤫
-
📍Omma Cave 
📷 : @pngmnan_ko 
Trip Explore Gorontalo w/ @travelgets
Learn How To Freediving w/ @koa.freediving 
- 
#exploregorontalo #Gorontalo  #indounderwater #indonesiaunderwater #freediveindonesia #freediving #freedive #freedivingart #freediver #uwphotography #girlsthatfreedive #underwater #freedivejakarta #underwaterphotography #photooftheday #tropicaldiving #indtravel #diving #exploreindonesia.', '2024-05-20 01:02:00+08'::timestamptz, 'https://www.instagram.com/reel/C7LsSMrSFlJ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 449, 6, 0, 35, 0),
  ('dinajanidya', 'Gelap dikit gak ngaruh! Divee teruus 🪸🧜🏽‍♀️💙
-
In frame : 
The Giant Seafan
Genus: Gorgonians
Gorgonians Annella Mollis
-
📍Gorontalo
📷 : @dionpramanareal 
Trip Explore Gorontalo w/ @travelgets
Learn How To Freediving w/ @koa.freediving 
- 
#exploregorontalo #Gorontalo  #indounderwater #indonesiaunderwater #freediveindonesia #freediving #freedive #freedivingart #freediver #uwphotography #girlsthatfreedive #underwater #freedivejakarta #underwaterphotography #photooftheday #tropicaldiving #indtravel #diving #exploreindonesia', '2024-05-17 05:01:00+08'::timestamptz, 'https://www.instagram.com/reel/C7EZemzS_5X/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 126, 225, 0, 0, 21, 0),
  ('dinajanidya', 'We dive not to escape life,
but for life not to escape us 💙
-
📍Jin Cave, Gorontalo
📷 : @pngmnan_ko 
Trip Explore Gorontalo w/ @travelgets
Learn How To Freediving w/ @koa.freediving 
- 
#exploregorontalo #Gorontalo  #indounderwater #indonesiaunderwater #freediveindonesia #freediving #freedive #freedivingart #freediver #uwphotography #girlsthatfreedive #underwater #freedivejakarta #underwaterphotography #photooftheday #tropicaldiving #indtravel #diving #exploreindonesia', '2024-05-13 17:28:00+08'::timestamptz, 'https://www.instagram.com/reel/C67bYMdyNOB/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 232, 276, 0, 0, 45, 0),
  ('ditelvin', 'Ga semua yang kita cari itu ketemu, terkadang kita ga sengaja menemukan hal baik di setiap pencariannya.

#gorontalo #exploregorontalo #gorontaloutara #gorontaloexplore #traveling #traveller #travelphotography #pesonaindonesia #exploresulawesi #sulawesi #sulawesiutara #indonesia #beach #island #pulau #explorepulau #explore', '2024-06-02 16:14:00+08'::timestamptz, 'https://www.instagram.com/reel/C7uzJftSvIm/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 150, 293, 0, 0, 9, 0),
  ('ditelvin', 'ENJOY YOUR LIFE 🙌🏻🤟🏻

📍Lito Huha, Gorontalo Utara 

#explore #exploregorontalo #gorontalounite #gorontalo #gorontaloexplore #exploregorontalo #explores #travel #traveling #traveller #travelgram #pesonagorontalo #pesonaindonesia #pesgo #backpacker', '2024-05-27 01:23:00+08'::timestamptz, 'https://www.instagram.com/reel/C7dvM7qxixK/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 1085, 308, 4, 0, 41, 0),
  ('dkijalanjalan_', 'Kalau panas minum es, kalau penasaran boleh kita tes! 

Info, adakah? 😜

#Dkijalanjalan', '2024-09-05 22:09:00+08'::timestamptz, 'https://www.instagram.com/reel/C_kDUePhPgU/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10782, 6056, 268, 13, 5, 27, 0),
  ('dokrifki', 'Qtime bersama anak2 asuh Panti Asuhan Yatim Marhamah Kota Gorontalo☺️', '2024-05-17 23:59:00+08'::timestamptz, 'https://www.instagram.com/reel/C7GcFper2-n/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 184, 209, 0, 0, 2, 0),
  ('dokrifki', 'Healing langsung di belakang Rumah Sakit .
Ada yg tahu ini rumah sakit apa?', '2024-03-11 01:19:00+08'::timestamptz, 'https://www.instagram.com/reel/C4XfBiCLRqm/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 2294, 648, 0, 0, 24, 0),
  ('dokrifki', 'Keindahan tak harus datang lebih awal 
- Senja', '2024-02-18 03:50:00+08'::timestamptz, 'https://www.instagram.com/reel/C3fNwDpRWjf/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 49, 502, 0, 0, 30, 0),
  ('donikadir', 'Guys Kalo Ke Gorontalo jangan lupa juga Healing ke @villa.kencana ya. Villanya Keren, Tenang & Bersih ☕️👌

Sukses selalu ya Owner @alhamprasogo @mirandandryana 🤝

#kabupatenboalemo 
#provinsigorontalo', '2024-01-19 15:17:00+08'::timestamptz, 'https://www.instagram.com/reel/C2TL10UBrhB/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 344, 127, 1, 0, 7, 0),
  ('ezadityaeza', '🍀', '2024-08-01 03:42:00+08'::timestamptz, 'https://www.instagram.com/reel/C-H88I2BWu0/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 14401, 408, 552, 2, 0, 7, 0),
  ('ezadityaeza', 'REUNI lagi yok with Sherly! 
.
In frame @filannovagobel @riane_rompas @ezadityaeza 
.
#latepost', '2024-05-27 22:49:00+08'::timestamptz, 'https://www.instagram.com/reel/C7gD_TYN-5m/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 1450, 1029, 2, 0, 36, 0),
  ('fhirmanohihiya', 'Gaji 3 jutaan pengeluaran 4 juta
Trus yg 1 juta dari mana :)
Dari Tuhan yang maha kaya😇
Bukan utang poli😆

📍Lito Popaya🏝️💦

.

.

.

#gorontalo #gorontalolife #gorontalounite #pesonagorontalo #miminpesgo #akucintagorontalo #likegorontalo #bogisaisland #gorontaloutara #garagarasenja #sunset #beach #pantai #pulau #sulawesiutara', '2024-09-29 21:34:00+08'::timestamptz, 'https://www.instagram.com/reel/DAhydQMRu_c/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4300, 2369, 118, 4, 1, 5, 0),
  ('fhirmanohihiya', 'Juara satu seabis doi kong percaya nanti dia mo datang ulang walau ngna tda tau dpe datang dari arah mana :)

📍Bogisa Island 🏝️💦

.

.

.

#gorontalo #gorontalolife #gorontalounite #pesonagorontalo #miminpesgo #akucintagorontalo #likegorontalo #bogisaisland #gorontaloutara #garagarasenja #sunset #beach #pantai #pulau #sulawesiutara #disparprovinsigorontalo', '2024-09-05 22:01:00+08'::timestamptz, 'https://www.instagram.com/reel/C_kCiAHB3hC/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 9637, 5135, 242, 38, 2, 5, 0),
  ('fhirmanohihiya', 'So selesai pemilu puasa leh so dekat tda ada niat mo kmna gituh ?!😄
Atau ksni olo boleh Depe nama Pulau Huha🏝️😃

.

.

.

#gorontalo #gorontaloutara #gorontalolife #gorontalounite #pesonagorontalo #miminpesgo #akucintagorontalo #likegorontalo #litohuha #pulauhuha #garagarasenja #sunset #beach #pantai #pulau #sulawesiutara', '2024-02-18 01:28:00+08'::timestamptz, 'https://www.instagram.com/reel/C3e8yiChuqn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 228, 323, 0, 0, 20, 0),
  ('fhirmanohihiya', 'Suasana malam Villa Desaku🍃💦
Kopi + Gorengan pas skli☕️

.

.

.

.

#gorontalo #gorontalounite #gorontalolife #miminpesgo #likegorontalo #villadesaku', '2024-02-15 05:26:00+08'::timestamptz, 'https://www.instagram.com/reel/C3XpqkqBA2J/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 128, 740, 0, 0, 43, 0),
  ('fhirmanohihiya', 'Pirates of the caribbean Danau perintis⛵️😃🍃

.

.

.
#danauperintis #poratesofthecaribbean #gorontalo #gorontalounite #likegorontalo #miminpesgo #gorontalolife #pesonagorontalo #danau', '2024-01-24 03:20:00+08'::timestamptz, 'https://www.instagram.com/reel/C2eyRzwBr2d/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 412, 1779, 4, 1, 67, 0),
  ('fhirmanohihiya', 'Pulau Huha 05:41 wita🌅🏝️✨

.

.

.

.

.

.

.

.

.

.
#pantai #senja #senjasore #senjabercerita #sunset #sunrise #pulau #beach #beautiful #gorontalo #sulawesiutara #likegorontalo #miminpesgo #pesonagorontalo #gorontalolife #gorontalounite #garagarasenja', '2024-01-09 01:53:00+08'::timestamptz, 'https://www.instagram.com/reel/C14ANTkhQKc/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 616, 3799, 3, 0, 76, 0),
  ('fhirmanohihiya', 'Huha again🏝️💦

.

.

.

.

.

.

.

.

.

.
#pantai #senja #senjasore #senjabercerita #sunset #sunrise #pulau #beach #beautiful #gorontalo #sulawesiutara #likegorontalo #miminpesgo #pesonagorontalo #gorontalolife #gorontalounite #garagarasenja', '2024-01-06 05:43:00+08'::timestamptz, 'https://www.instagram.com/reel/C1wrwnjhRx3/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 28, 216, 0, 0, 0, 0),
  ('filmarianick', 'Kalau ke Gorontalo wajib mampir kesini ya,,🐋 bertemu dengan Sherly Hiu Paus yang cantik ini 🥰

📍pantai botubarani gorontalo 

@update_hiu_paus_gorontalo 
@like_gorontalo 
@gorontalo.unite 

Terimakasih @nick_wd11 sudah bantu editing videonya 😍❤️ 

.

.

.
#gorontalo #sulawesiisland #whaleshark #sea #beautifuldestinations #wonderfulindonesia #wisatagorontalo #wisataindonesia #indonesiatraveler #girlstrip #beautifulindonesia #beautifulview #beautifulsea #hiupausgorontalo #botubarani #wisatalaut #gorontalohits #sealovers #viral #fyp #bestvacations #happyholidays #love #autumn #❤️', '2024-06-18 02:21:00+08'::timestamptz, 'https://www.instagram.com/reel/C8Wg68TPTTg/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 2074, 731, 45, 0, 33, 0),
  ('franciscayayan', 'Salah satu experience yg gk bisa terlupakan, meet beautiful sherly 🥰🐋🐳
#gorontalo #whaleshark #hiupausgorontalo', '2024-05-01 07:34:00+08'::timestamptz, 'https://www.instagram.com/reel/C6bemxPxpET/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 466, 1621, 0, 0, 30, 0),
  ('galeryboalemo', 'Pulau Monduli merupakan pulau yang terletak di kecamatan Botumoito, dulu pulau ini tak per penghuni dan merupakan salah satu pulau dengan spot dive terbaik di Boalemo. 

Total ada 12 rumah suku bajo yang berdiri di pulau ini. 

Footage : @jajago.keliling.indonesia 

#boalemo #gorontalo 
#galeryboalemo', '2024-11-01 21:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DB2yp9zt7ji/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 12049, 6226, 205, 13, 3, 5, 0),
  ('galeryboalemo', 'Lari menjadi salah satu olah raga terfavorit saat ini, apalagi lari sore trus ketemu pemandangan cantik bgni. 

Macam ti kak @nelvakmmu  dengan ti kak @gilbertho_tongotongo abis lari sore menikmati senja di pantai dulupi 

#boalemo #dulupi
#galeryboalemo', '2024-10-27 02:48:00+08'::timestamptz, 'https://www.instagram.com/reel/DBn3vAYsESH/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 3215, 2082, 83, 2, 0, 3, 0),
  ('galeryboalemo', 'Pulau Mohupomba atau pulau yang sempat di kenal dengan nama pulau idaman pada masanya ini, merupakan salah satu pulau besar tak berpenghuni di Boalemo. 

Oh yah gais beberapa waktu lalu pulau ini kembali menyita perhatian warga net setelah di kemunculan hiu paus di sekitar pulau ini. 

#tilamuta #boalemo 
#galeryboalemo #gorontalo', '2024-07-18 19:43:00+08'::timestamptz, 'https://www.instagram.com/reel/C9lnmOnB-FJ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 8542, 571, 288, 3, 0, 8, 0),
  ('galeryboalemo', 'Libur lebaran telah usai waktunya kita menjalani aktivitas seperti biasa nya . 

Untuk sesaat, hening, lebih ribut daripada air terjun.
Yah salah satu nya air terjun yang berada di ayuhulalo ini misalnya disini kamu dapat merasakan ketenangan dan kenyamanan apalagi bersama si dia .

Video @sabriisaa_ 

#airterjunayuhulalo 
#tilamuta #boalemo 
#galeryboalemo', '2024-04-14 21:17:00+08'::timestamptz, 'https://www.instagram.com/reel/C5xLDfDBGZp/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 390, 185, 3, 0, 1, 0),
  ('gledysputi', 'Bagian dari hidup 🧡⁺₊☼☼⋆ 🌊 🌅✨

FYI : Salah satu Tempat favorit liat sunset di karang” yg sudah hits di gorontalo (HAYAGEL BEACH)📍

#foryou #lensaapexel #karang #sunset #callofsilence #gorontalo #gorontalo_inframe', '2024-08-04 22:37:00+08'::timestamptz, 'https://www.instagram.com/reel/C-RsNKKtTQM/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 9419, 918, 260, 0, 0, 27, 0),
  ('gledysputi', 'See you Huha ˖°🌊🎐𓇼⋆🦪₊ #beach #pulauhuha #liburan #trip', '2024-05-25 22:33:00+08'::timestamptz, 'https://www.instagram.com/reel/C7a4TDtuUcH/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 478, 753, 0, 0, 33, 0),
  ('gorontalo.unite', 'Senja yang jingga dari depan Villa Kencana di Pantai Bolihutuo, Boalemo. kalo kata @aldi.inaku, untuk dapatkan warna sejingga ini, turunin sedikit eksposyure dan ekspetasi, kemudian tekan rekam.', '2024-12-29 01:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DEKDIdlyODB/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 5839, 3648, 294, 2, 2, 4, 9),
  ('gorontalo.unite', 'Pilihan tempat menikmati liburan akhir tahun, bisa dicobain ke Rumah Alam Dunggala di Tapa, Bone Bolango. 

Dengan tiket masuk 15rb/orang, nanti bisa ketemu beragam satwa disini. Konsepnya mini zoo (solusi paling pas ketika Gorontalo tidak memiliki zoo).

Oh iya, bukanya setiap hari, jam 9 pagi sampe jam 8 malam. Suasananya juga nyaman, aman buat anak-anak.', '2024-12-28 17:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DEJJ6UATsXd/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4926, 3014, 106, 13, 2, 0, 3),
  ('gorontalo.unite', 'Jernih, cerah, ceria. 

semoga banjir dibeberapa tempat cepat surut lagi yaa. banyak yg kerepotan membersihkan lumpur yg masuk dalam rumah. 🥹

📷 @delvina05', '2024-06-26 20:04:00+08'::timestamptz, 'https://www.instagram.com/reel/C8tAy_cvRhI/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 32, 100, 0, 0, 1, 1),
  ('gorontalo.unite', 'menikmati perjalanan setiap orang, kayaknya seru. pergi ke tempar-tempat yang menenangkan dan menyenangkan dang. Olele misalnya. @bubalus_depressicornis', '2024-06-19 02:09:00+08'::timestamptz, 'https://www.instagram.com/reel/C8ZECAJvaEo/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 34, 174, 0, 0, 1, 6),
  ('gorontalo.unite', 'yang lagi cari tempat camping seru, murah meriah paket komplit, berikut review @tukangbajalan14 di Pantai Tihu, Bone Pantai, Bone Bolango

Salah satu tempat camping di gorontalo yang wajib banget masuk booklist kalian nih. Perjalanan kesini itu butuh effort, karena waktu tempuh kesini memerlukan waktu berjam jam diperjalanan kalo dari Popayato kamari. 

Tapi tenang, pemandangan sepanjang perjalanan dan di lokasi yang di suguhkan terbayarkan kok. 

Jadi, kapan rencana jalan-jalan lagi?', '2024-06-08 02:24:00+08'::timestamptz, 'https://www.instagram.com/reel/C78wgzxSFVR/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 390, 261, 11, 1, 8, 35),
  ('gorontalo.unite', '20 tahun ke depan, bakalan jadi kawasan ramai ini. Apalagi dekat dengan kampus, perkantoran, sarana prasarana juga mulai lengkap. 

Tidak ada kan yang menyangka, 20 tahun lalu kawasan ini masih berupa perkebunan. Ada hunian, tapi tidak seramai saat ini. 

@helmihongi', '2024-06-07 23:48:00+08'::timestamptz, 'https://www.instagram.com/reel/C78dgfeSufh/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 589, 3983, 1, 1, 120, 186),
  ('gorontalo.unite', 'Butuh effort lebih untuk bisa menikmati sunset di Minanga Beach ini, secara kalo dari arah Kota Gorontalo, perjalanan untuk tiba di pantainya sekitar 3-4 jam perjalanan. 

Bagusnya juga kalo kesini sekalian nginap, suasana paginya tidak kalah seru. #GorontaloUnite', '2024-06-03 02:33:00+08'::timestamptz, 'https://www.instagram.com/reel/C7v6cJ-uvu7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 67, 295, 1, 0, 2, 8),
  ('gorontalo.unite', 'Bagi Ichthyophobia (fobia terhadap ikan), yang begini pasti menyeramkan. Tapi tenang saja, ini ikan yang ramah kok. Ajak nari dan berenang bareng saja.', '2024-05-02 23:36:00+08'::timestamptz, 'https://www.instagram.com/reel/C6fxS04y50L/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 83, 537, 1, 1, 6, 7),
  ('gorontalo.unite', 'Destinasi bahari di Gorontalo itu terdebest-nya ada di bagian utara. Seru buat seru-seruan. 

@ditelvin #GorontaloUnite', '2024-05-01 02:06:00+08'::timestamptz, 'https://www.instagram.com/reel/C6a4yHGOnGy/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 26, 22, 0, 0, 0, 1),
  ('gorontalo.unite', 'Dari video ini, anggaplah kita ikut merasakan keseruan berenang bersama sherly. Salah satu pengalaman menarik kalo jalan-jalan ke Gorontalo, ketemu Hiu Paus ini. 

@unclejoen', '2024-04-24 02:15:00+08'::timestamptz, 'https://www.instagram.com/reel/C6I4VErS0E-/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 51, 100, 1, 1, 0, 5),
  ('gorontalo.unite', 'Apapun itu, dibikin asyik, dibikin bahagia saja. Cuacanya pas nih, apalagi dekat koala macam di Longalo, Bulango Utara. Dikenal dengan area wisata Botu Motoli''oluwo, lebe pas lagi kalo camping disini.', '2024-04-24 00:12:00+08'::timestamptz, 'https://www.instagram.com/reel/C6IqcNnuENz/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 49, 219, 0, 0, 0, 7),
  ('gorontalo.unite', 'Selamat berbuka puasa teman-teman semua, selamat menyambut hari kemenangan Idulfitri. ❤️🌙', '2024-04-09 03:38:00+08'::timestamptz, 'https://www.instagram.com/reel/C5iZ9InhUEj/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 25, 206, 0, 0, 2, 9),
  ('gorontalo.unite', 'Welcome to Eifell-nya Limboto. Akhir-akhir ini kombinasi lampunya berbeda lagi, tidak full RGB. harus sih, biar ada warna warninya', '2024-04-01 06:01:00+08'::timestamptz, 'https://www.instagram.com/reel/C5OEDjoh32y/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 54, 521, 0, 1, 1, 73),
  ('gorontalo.unite', 'Kawasan Pantai Pohon Cinta, Marisa menuju arah Masjid Nurul Bahri (masjid terapung). Marisa ini di desain jadi seperti kota yang ramah untuk ditempati. Tenang, hening, tapi banyak fasum yang tersedia. 

@tagpohuwato @ayuthlb #GorontaloUnite', '2024-03-29 01:34:00+08'::timestamptz, 'https://www.instagram.com/reel/C5F3NemBiS8/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 3108, 2194, 7, 1, 47, 134),
  ('gorontalo.unite', 'Mari selalu berbahagia saat hujan turun. Suasana disekitar jadi adem. Allahumma Shoyyiban Nafi’an. 

📍Labanu, Tibawa (arah Gorut kalo dari Isimu kamari)', '2024-03-26 22:58:00+08'::timestamptz, 'https://www.instagram.com/reel/C5Abk_WBd7F/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1036, 0, 0, 14, 112),
  ('gorontalo.unite', 'Desa Haya-Haya di Limboto Barat ini punya 2 POV yang menarik, bukan cuma sunrise tapi juga sunset. Bukan di pantai, tapi karena di lahan persawahan. Nah ini pas pagi-pagi. 

Kalo mo bilang haya-haya, banyak yang tidak tau. Kalo bilang kampung jawa, pasti semua tau. Kan?

📸 @meggingiu #GorontaloUnite', '2024-03-24 16:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C46iavqhb43/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 93, 343, 0, 0, 2, 16),
  ('gorontalo.unite', 'Bagi warga Bajo di Torosiaje, laut adalah teman sehari-hari, tempat tinggal, tempat bermain, dll. Bagi kita, ini menjadi tempat menarik dikunjungi, dijaga dan dilestarikan. 

Menikmati suasana di Torosiaje di bulan Ramadan, bisa jadi pengalaman tersendiri. Ada kok masjid diatas laut disini, warga Torosiaje sendiri mayoritas juga beragama Islam. 

remix @tagpohuwato #GorontaloUnite', '2024-03-20 02:16:00+08'::timestamptz, 'https://www.instagram.com/reel/C4uvtPeBzyB/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 31, 86, 0, 1, 1, 4),
  ('gorontalo.unite', 'Tenang, hening, ah, suasana yang sangat diidam-idamkan orang yang ingin menikmati kesepian. Apalagi suasana sekitar teduh, tidak panas deng matahari. 

Mooi Lake di Desa Huntu, Batudaa ini pas banget sih. Resto dengan view Danau Limboto. Camping disekitar sini juga kayaknya seru, atau ngabuburit pas bulan Ramadan. 

@rully.ahaya #GorontaloUnite', '2024-03-08 17:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C4RjIeFBE1X/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 45, 208, 1, 0, 4, 17),
  ('gorontalo.unite', 'Lombongo. Salah satu tempat bertamasya ria saat liburan sekolah tiba. Carter 2 sampai 3 angkot, muat siswa sekelas dengan guru-guru pendamping. 

Ibarat OS, sekarang Lombongo sudah upgrade ke OS terbaru, beberapa sarana dan prasarana dibenahi. Tentunya untuk kenyamanan pengunjung yaa. 

Nah, salah satu yg legendaris di zaman itu juga lagunya alm. Om Benny Panjaitan (PANBERS), Senja di Lombongo. 

@rachmatgobel_rg #GorontaloUnite', '2024-03-03 23:15:00+08'::timestamptz, 'https://www.instagram.com/reel/C4FWOozB6z9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 60, 1499, 2, 1, 26, 61),
  ('gorontalo.unite', 'Tempat yang pas buat ngabuburit sambil bikin diskusi kajian kecil-kecilan. Suasananya dapat, adem juga, view sunsetnya apalagi. 

Soal jajanan buka puasa kalo di Gorontalo, tidak ada yg perlu dikhawatirkan. Hampir disemua sudut jalan ada, beragam waw murah meriah. 

📍Benteng Otanaha, Dembe 1
📸 @yan_dmpds #GorontaloUnite', '2024-03-01 23:59:00+08'::timestamptz, 'https://www.instagram.com/reel/C4ARubfh5GL/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 23, 354, 0, 0, 0, 20),
  ('gorontalo.unite', 'Kalo pengen menikmati pantai dan pulau eksotik di Gorontalo, bisa berlayar ke bagian utara Gorontalo. Tinggal pilih mau suasana pantai atau pulau seperti apa. Dari yang komersil, berpenghuni ataupun pulau tak berpenghuni. 

Hanya saja yang patut digaris bawahi adalah suasana di pulau tak berpenghuni fasilitasnya sih tidak seperti yang sudah dikelola secara pro, seperti ketersediaan toilet hingga tempat menginap. 

Kalo pengen jelajahi semua pulau di Gorut secara gratis bisa juga. setiap hari Sabtu dan Ahadi, ada kapal yang melayani rute. 

#AldinasyahInaku #GorontaloUnite', '2024-03-01 20:17:00+08'::timestamptz, 'https://www.instagram.com/reel/C3_3zn5hy_q/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 42, 742, 0, 0, 16, 52),
  ('gorontalo.unite', 'Mooi Lake di Ds. Huntu, Batudaa. Salah satu tempat terbaik buat menikmati akhir pekan bersama orang terdekat, tempat yang ramah buat quality time bagi keluarga dan juga anak-anak dengan suasana teduh plus view Danau Limboto.

Aksesnya juga bagus, meskipun agak masuk ke arah danau melewati pekarangan dan kebun warga. 

@nissamoh #GorontaloUnite', '2024-02-17 18:18:00+08'::timestamptz, 'https://www.instagram.com/reel/C3eMBZhBQ5j/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 122, 571, 2, 2, 19, 46),
  ('gorontalo.unite', 'Tepian Danau Perintis, jadi tempat yang pas buat sekedar bersantai, atau tempat ngopi sambil menikmati alam sekitar. Suasana nyaman bisa diciptakan sendiri, jika kenyamanan itu tidak ditemukan. Cara orang-orang juga beda. 

Jadi terasa pas suasana, sambil camping, ada bacaan bagus, ditemani kopi, dengan suasana tepian danau seperti ini. Complete. 
@lyn_chan29 #GorontaloUnite', '2024-02-06 21:42:00+08'::timestamptz, 'https://www.instagram.com/reel/C3COzHshDyG/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 21, 249, 0, 0, 0, 4),
  ('gorontalo.unite', 'Wajah baru Danau Perintis di Suwawa, Bone Bolango.

Teman-teman pasti udah pada tau kan, kalo ada wahana baru berupa kapal tembaga yang bisa kamu kunjungi di Danau Perintis, lho. 

Fasilitas yang dicetuskan dan dibangun oleh @rachmatgobel_rg ini diresmikan pada 23 Januari 2024, dimana momentum ini masih dalam suasana peringatan Hari Patriotik 23 Januari. 

Danau Perintis memiliki sejarah tersendiri bagi Gorontalo, disini menjadi salah satu tempat pertemuan dalam membahas persiapan kemerdekaan Gorontalo, 81 tahun silam.

Siapa yang sudah berkunjung ke sini?', '2024-01-25 00:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C2hAeewywdk/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 85759, 4389, 4, 6, 70, 140),
  ('gorontalo.unite', 'Campiknik ~ Camping & Piknik.

Di Gorontalo, banyak Bumdes yang memilih mengembangkan potensi wisata disekitarnya. Selain berdampak pada ekonomi sekitar, juga terbukanya akses-akses wisata. 

Misal di Tanjung Tihu di Bone Pantai ini. Sekitar 40km dari arah pusat Kota Gorontalo. Selain menawarkan tempat yang pas dan cocok buat bersantai, bakar-bakar ikan atau menikmati sunset, camping juga cocoklah disini. 

📸 @maykel_ #TanjungTihu #BoneBolango #gorontalounite', '2024-01-21 21:31:00+08'::timestamptz, 'https://www.instagram.com/reel/C2ZAYWDSB8p/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 214, 302, 1, 0, 7, 10),
  ('gorontalo.unite', 'Banyak sungai seperti ini ditemukan di Gorontalo, tapi kalo paket komplit, misal ada air terjun mini, bisa main tubing dan suasana yang masih adem juga, nah disini salah satunya. 

Air Terjun Bondula di Kecamatan Asparaga, lumayan jauh jaraknya kalo dari arah pusat Kota Gorontalo. Ini Asparaga kawasan Boliyohuto cs.

📸 @zainudinmahmud #GorontaloUnite', '2024-01-18 22:08:00+08'::timestamptz, 'https://www.instagram.com/reel/C2RS1Q-yoUt/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 31, 150, 0, 0, 1, 7),
  ('gorontalo.unite', '@rachmatgobel_rg mengundang warga Gorontalo untuk hadir di peresmian kedua Danau Perintis! 

Danau Perintis sendiri merupakan sebuah danau yang berlokasi di Kabupaten Bone Bolango, Gorontalo. Pada era penjajahan, danau ini juga pernah dijadikan lokasi perundingan pejuang terahulu dalam menyusun strategi penyerangan yang dipimpin langsung oleh Pahlawan Nasional Gorontalo, Nani Wartabone. 

Seiring berjalannya waktu, tempat ini pun banyak dikunjungi oleh warga. Tak hanya punya pemandangan sekitar yang memukau, suasana Danau Perintis ini membuat warga betah.

Dengan adanya fasilitas baru, diharapkan tempat ini bisa menarik banyak wisatawan dan membantu menggerakan roda perekonomian masyarakat setempat. 

Jadi, siapa yang udah gak sabar buat mampir ke Danau Perintis tanggal 23 Januari nanti?

Sumber: IG @rachmatgobel_rg', '2024-01-17 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C2MhHI6Sska/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 4, 268, 0, 0, 1, 3),
  ('gorontalo.unite', 'Dulu sempat ada kan Zoo di Gorontalo, talpi hanya untuk kepentingan seremoni saja, yang pada akhirnya kini jadi sirkuit balap motor. sebelumnya jadi kawasan perkemahan juga. tanda kutip, masih se-area. tepatnya di Kelurahan Bionga, Limboto. 

Hadirnya zoo ala Rumah Alam Dunggala ini menarik, karena jarang ditemui di Gorontalo. Jadi tempat hiburan dan edukasi juga tentunya. 

📸 @kimiiiiiiii__ #GorontaloUnite', '2024-01-09 21:31:00+08'::timestamptz, 'https://www.instagram.com/reel/C16HVplSj6s/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 90, 763, 0, 0, 19, 43),
  ('gorontalo.unite', 'Jalan-jalan ke kawasan Santorini, di Talumolo, Kota Gorontalo. Santorini ini pas berada ditepi Sungai Bone sampai di Jembatan Talumolo. 

Jika Santorini di Yunani berada dikawasan pegunungan, maka di Kota Gorontalo lokasinya di tepian sungai. Bolehlah, 11-14. Tinggal bangunan-bangunan saja sih, yg macam di Santorini bagitu. 

video @ilham_choy lagi JJS (berhubung nuansa warnanya Japanese banget, maka pakein lagu Yoasobi - Moshimo Inochi Ga Egaketara 「もしも命が描けたら) #GorontaloUnite', '2024-01-06 00:25:00+08'::timestamptz, 'https://www.instagram.com/reel/C1wIBoNS5Ee/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 76, 1102, 0, 0, 28, 86),
  ('ifrinlalusu', 'Masyaallah...
Sherly my bucket list✅ 
Aku balik lagi kita berenang bareng yaa..
Thankyouuu for Trip @update_hiu_paus_gorontalo puas bgt bgt bgtttt 🙌🏻🫶🏻', '2024-05-08 22:02:00+08'::timestamptz, 'https://www.instagram.com/reel/C6vDAHYr2x7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 1173, 1772, 0, 0, 50, 0),
  ('isal_gorontalo', 'Make your dreams come true

inframe 🧜🏻‍♀️ @_anami93 

Swimsuit @4dive.indonesia 

#gorontalo #wonderfulword #travelers #hiupaus #hiupausgorontalo #freedive #freediver #freedivegirls #ocean #pesonaindonesia #wonderfulindonesia #privatetrip #whaleshark #whalesharkgorontalo #trip #tripgorontalo', '2024-01-04 04:02:00+08'::timestamptz, 'https://www.instagram.com/reel/C1rW8oTBe68/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 408, 5, 0, 35, 0),
  ('jelajahnailah', 'They (Sherly and friends 🐋) looking 👀 at me 🏄‍♀️', '2024-09-14 19:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C_7AQohz1i8/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6263, 3197, 428, 14, 0, 41, 0),
  ('jenlantu', 'Semoga bisa ketemu Sherly lagi 😍❤
#whaleshark #hiupausgorontalo #wonderfulindonesia', '2024-05-30 08:30:00+08'::timestamptz, 'https://www.instagram.com/reel/C7mPNKUPCzF/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 1229, 2064, 6, 0, 31, 0),
  ('laila_kaluku', 'Opening schooling nike 🐟🐟🐟 

Yg pengen snorkling tapi olele kejauhan, karang indah Oluhuta juga punya spot diving yang indah banget.

📍: karang Indah Oluhuta, Bone Bolango
📹 : @12ano_ 

#Laut #Gorontalo #Diving #divespot #ocean #freedive #freediving #freediver #Summer', '2024-11-26 19:17:00+08'::timestamptz, 'https://www.instagram.com/reel/DC2_zQFz9ny/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 5809, 4578, 98, 3, 1, 3, 0),
  ('laila_kaluku', 'Gorontalo Dive season ☀️🐋 

📍Olele Marine National Park, Kec. Kabila Bone, Kab. Bone Bolango 

#Gorontalo #Laut #Diving #Freediving #Summer #trip', '2024-11-17 19:59:00+08'::timestamptz, 'https://www.instagram.com/reel/DCf5bvEvTvq/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10838, 6519, 237, 11, 3, 5, 0),
  ('maykel_', 'peralatan terpenting yang kamu butuhkan untuk melakukan yoga adalah tubuh dan pikiran..
🧘‍♀️🧘‍♀️

#yoga #yogainspiration #yogapose #yogachallenge #fpv #fpvlife #fpvmagazine #dji #djiglobal #freewellpro #river #nature #liforme #yogapractice #yogaeverywhere #namaste', '2024-09-14 00:39:00+08'::timestamptz, 'https://www.instagram.com/reel/C_45rs2IvQU/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 15870, 9013, 457, 28, 5, 21, 0),
  ('maykel_', 'orang-orang yang bisa bersantai, menikmati matahari terbenam, berpegangan tangan di penghujung hari...merekalah orang-orang yang bahagia…

#sunset #djineo #gorontalo', '2024-09-10 00:13:00+08'::timestamptz, 'https://www.instagram.com/reel/C_uj0iaIaou/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4601, 2851, 120, 8, 1, 0, 0),
  ('maykel_', 'have a nice dream..
😴💤

#sunset #beach #apexevo #fpvlife #dji #djio3airunit #tmotorfpv', '2024-08-04 07:15:00+08'::timestamptz, 'https://www.instagram.com/reel/C-QDvM0ouyF/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11048, 371, 317, 3, 0, 8, 0),
  ('maykel_', 'downhill dari salah satu dataran tinggi, kalo beruntung bisa dapat awan.
cuacanya sejuk, kapan kemping disini mas @anton_buheli?

#gopro #gopro11mini #fpvlife #fpvdownhill #djio3system #gorontalo #dulamayo', '2024-06-10 01:30:00+08'::timestamptz, 'https://www.instagram.com/reel/C8Bz3LFPJFE/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 160, 183, 0, 0, 3, 0),
  ('maykel_', 'sunset disini asiik..
angin 45 knots mencoba bertahan dan menikmati 

#fpvlife #ethixltd #sunset @gopro @goproid #goprohero12 #knfilters #tbsfpv #tmotorfpv #impulserc # #theofficialcameraoffun', '2024-02-17 04:39:00+08'::timestamptz, 'https://www.instagram.com/reel/C3ctRs_vXor/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 78, 210, 0, 0, 5, 0),
  ('maykel_', 'Beautiful Landscape Danau Perintis Bone Bolango 😍

#beautifuldestinations #danauperintis #gorontalo #bonebolango #fpvlife #djifpvsystem #tmotorfpv', '2024-02-04 19:22:00+08'::timestamptz, 'https://www.instagram.com/reel/C281U_1veG0/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 92, 195, 0, 0, 1, 0),
  ('mikhalomp', 'yes, i did🥹

📹 : @tripbarengisal', '2024-10-09 01:44:00+08'::timestamptz, 'https://www.instagram.com/reel/DA5aYGSt9-Q/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11151, 7184, 188, 9, 2, 30, 0),
  ('mikhalomp', 'be a mermaid in real life😆🙌🧜🏻‍♀️

📹 : @tripbarengisal 
#freedive', '2024-10-06 23:24:00+08'::timestamptz, 'https://www.instagram.com/reel/DA0As7lNMSr/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11153, 6297, 222, 4, 3, 32, 0),
  ('nataliaastriaa', 'Don’t be afraid of your fears cause they’re not there to scare you but to let you know that something is worth it🐬💎💦

#whalesharkswimming #gorontalo #sealife #travelgram #thalasophile🌊', '2024-04-12 16:45:00+08'::timestamptz, 'https://www.instagram.com/reel/C5riFJ6yoKo/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 583, 709, 9, 0, 23, 0),
  ('ns.zuki', 'Minimal sekali seumur hidup rasain naik jetski 🚀', '2024-12-22 04:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DD4WAnQzu0m/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 3678, 2135, 43, 1, 0, 0, 0),
  ('putriwnd', '✨Main sama Hiu Paus di Gorontalo✨

Another wishlist tercapai buat main dan renang bareng lele jumbo ini! walaupun pas renang videonya ga layak tayang huhuhu😩

Kalau mau kesini, kamu bisa ke Pangkalan 4 yaaa! Letaknya gak jauh dari pusat Kota Gorontalo dan worth it banget apalagi kalau kamu diving disini.

Tapi katanya untung-untungan ya gesss, kadang whale shark nya ngga muncul, tapi kadang bisa sampe 4 ekor 😱', '2024-04-25 01:45:00+08'::timestamptz, 'https://www.instagram.com/reel/C6LZ-77yhie/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 116, 515, 1, 0, 28, 0),
  ('queenofjourneys', 'Once in a lifetime you need to see sherly and his partner unforgettable memories 🐳💙💘
Finally released setelah 2 bulan bersembunyi di draft haha
.
.
.
.
.
.
.
.
.
.
#gorontalo #whaleshark #botubarani #apnea #freedive', '2024-03-28 01:22:00+08'::timestamptz, 'https://www.instagram.com/reel/C5DREKpBd8f/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 2859, 3298, 7, 0, 58, 0),
  ('rdcwalenta', 'Ocean sunset, magical. ✨🌝

#ayokegorontalo #indonesia #sunset', '2024-07-23 04:41:00+08'::timestamptz, 'https://www.instagram.com/reel/C9w4Tpxycs9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6126, 612, 204, 0, 0, 0, 0),
  ('rdcwalenta', 'Paradise on earth.

#ayokegorontalo #litolampu', '2024-06-04 05:56:00+08'::timestamptz, 'https://www.instagram.com/reel/C7y2DMsSZ3g/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 840, 364, 12, 0, 4, 0),
  ('rezkymattara', '7 of 100 #WonderfullGorontalo

London ❌
Londoun ✅

Desa yang indah ini terbentuk dengan didiami oleh masyarakat Kepulauan Sangihe yaitu dari Kerajaan Tamako Manganitu dan Kerajaan Siau yang pada tahun 1939 melalui program kolonisasi secara bertahap menuju ke tempat ini.

📍Desa Londoun, Kec. Popayato
Kab. Pohuwato, Gorontalo

#wonderfullindonesia #pesonaindonesia #visitindonsia #visitgorontalo #pesonagorontalo #wisatagorontalo #drone #dji #camerarebel #sewadronegorontalo #sewadronepohuwato #rentaldronegorontali #rentaldronepohuwato', '2024-09-22 05:28:00+08'::timestamptz, 'https://www.instagram.com/reel/DAOB8h_P6qZ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 13259, 8196, 561, 21, 6, 21, 0),
  ('rezkymattara', '6 of 100 #WonderfullGorontalo

Konon pengandali air Gorontalo pada kumpul disini 🥶💦

Di desa yang berada di atas air ini terdapat sebuah kisah mengenai seorang pria yang menjadi ikon bahkan legenda, Sengkang itulah namanya.

Alkisah, di Torosiaje pernah lahir seorang bayi laki-laki yang kononnya kelahiran bayi tersebut bertepatan dengan atraksi akrobat di air laut. Setelah bayi tersebut berusia lebih dari empat tahun, ia sering mandi di laut dalam waktu yang cukup lama. [ lanjut kolom dikomentar ]

📍Desa Torosiaje, Pohuwato, Gorontalo

#wondefullindonesia #wonderfullgorontalo #visitgorontalo #torosiaje #pohuwato #gorontalo #drone #dji #djimini4pro #camerarebel #pesonaindonesia #hiupaus #whaleshark', '2024-08-11 04:38:00+08'::timestamptz, 'https://www.instagram.com/reel/C-hyEoMvRkZ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 18429, 998, 842, 3, 1, 14, 0),
  ('rifaldius', 'wonderful gorontalo peninsula 🩵
•
•
#gorontalo', '2024-11-03 18:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DB7ooqhvIbM/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 3867, 2264, 118, 2, 0, 1, 0),
  ('rifaldius', 'majestic hungayono 
•
•
#dji #djimavic3pro #lightroom #premiere #gorontalo', '2024-09-18 02:26:00+08'::timestamptz, 'https://www.instagram.com/reel/DADaTKuPsEq/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7285, 4219, 190, 8, 1, 6, 0),
  ('rifaldius', 'lito popaya, surga kecil di ujung utara serambi madinah 
•
•
#visitgorontalo #gorontalo #dji #djimavic3pro', '2024-02-12 19:51:00+08'::timestamptz, 'https://www.instagram.com/reel/C3ReUNWyHGg/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 961, 743, 7, 0, 60, 0),
  ('rully3_', 'Habis kuota atau habis perasaan?', '2024-12-23 16:26:00+08'::timestamptz, 'https://www.instagram.com/reel/DD8N8crTi1n/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 12504, 7339, 403, 47, 2, 4, 0),
  ('rully3_', '78km dari isimu, Sumalata Is calling 🌊🥽

📍Belakang Pulau Dynumo

#Gorontalo', '2024-05-28 04:50:00+08'::timestamptz, 'https://www.instagram.com/reel/C7gtHuPh8uM/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 123, 675, 0, 0, 30, 0),
  ('sebelahkamar', 'Jadiin tempat ini wishlist kalau kalian ke gorontalo 🥺❤️
.
Bisa lihat dan berenang sedekat ini bareng Whale Sharks 🐋✨, ini adalah salah satu lokasi rekomendasi untuk melihat Whale Shark di Indonesia ada di Botubarani, Gorontalo. dan Jangan lupa singgah juga ke Olele Marine National Park
.
#gorontalo #whaleshark #gorontalodive #hiupausgorontalo #olele #freedive #gorontalohits #whalesharkgorontalo #gopro #whale #ocean #indonesia @pesona.indonesia @wonderfulindonesia', '2024-02-17 17:21:00+08'::timestamptz, 'https://www.instagram.com/reel/C3eFCkty44L/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 1242, 1212, 10, 0, 100, 0),
  ('sharon.mewengkang', 'gorontalo was fun 🤗🫧🧜‍♀️ 
.
.
🎥 @tripbarengisal 
📍Taman Laut Olele, Kab Bone Bolango, Gorontalo
#freedive #gorontalo', '2024-10-12 23:46:00+08'::timestamptz, 'https://www.instagram.com/reel/DBDf6RgKr82/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7475, 711, 144, 5, 0, 5, 0),
  ('srydunggio__', 'Udah lama ngak lari-lari sama view laut kaya gini 🌊⛅️
Happy wekeend..
.
.

#jalanjalan #dkijalanjalan #hijabtraveller #gorongalo_inframe #gorontalounite #pesonaindonesia #sulawesiutara #moment #senja #dagelangorontalo @gorontalo.life @gorontalo.unite @like_gorontalo #travelphotography #hijabstyle #fotoğraf', '2024-09-28 03:04:00+08'::timestamptz, 'https://www.instagram.com/reel/DAdO8dnSGIl/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10230, 5194, 297, 17, 3, 20, 0),
  ('srydunggio__', 'Tempat yang nyaman buat 
Family Time ☑️
Bestiew Time ☑️
.
.
Privat Vila @paradise_swimming_pool_ 
.
.

 #dkijalanjalan #hijabtraveller #gorongalo_inframe #gorontalounite #pesonaindonesia #sulawesiutara #moment #senja #dagelangorontalo @gorontalo.life @gorontalo.unite @like_gorontalo @like_luwuk @tripbanggai #danau #snorkling #freedive #bangai #airterjunpiala #airterjunpialaluwuk #danau #jalanbarengbestie #luwuk #banggai #air #alam', '2024-04-20 22:09:00+08'::timestamptz, 'https://www.instagram.com/reel/C6At8tRyQ8s/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 451, 16, 1, 13, 0),
  ('srydunggio__', '🌊
.
.
.

.
.
.
.

#jalanjalan #dkijalanjalan #hijabtraveller #gorongalo_inframe #gorontalounite #pesonaindonesia #sulawesiutara #moment #senja #dagelangorontalo @gorontalo.life @gorontalo.unite @like_gorontalo #travelphotography #hijabstyle #fotoğraf', '2024-02-17 02:39:00+08'::timestamptz, 'https://www.instagram.com/reel/C3cgzn0yaMX/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 87, 244, 0, 0, 0, 0),
  ('tripbarengisal', 'Come join Trip with us.

inframe @luthfi.png_ 

#gorontalo #freediverlife #freedivinggirls #explore #pesona #instagood #insta360', '2024-12-28 00:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DEHZKqqJif_/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 15469, 8856, 355, 7, 3, 1, 0),
  ('tripbarengisal', 'Mermaid life in island..

inframe: @_leidhie_ 

#gorontalo #mermaid #putriduyung #pesonaindonesia #wonderful_places #exploregorontalo #islandlife #islandgirl #private #mermaidlife #privatetrip #ocean #dji', '2024-12-22 17:21:00+08'::timestamptz, 'https://www.instagram.com/reel/DD5vH68zLdY/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11589, 0, 245, 17, 1, 11, 0),
  ('tripbarengisal', 'Let''s dive with gentle whale sharks..

#gorontalo #whaleshark #freediving #wonderfulindonesia #ocean #instagood #freeedive #ocean #insta360', '2024-12-01 03:19:00+08'::timestamptz, 'https://www.instagram.com/reel/DDCJNQTTBWf/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6660, 4165, 124, 10, 2, 7, 0),
  ('tripbarengisal', 'Let''s dance with the gentle whale shark..

#whaleshark #hiupaus #gorontalo #privatetrip #pesonaindonesia #wonderfulindonesia #exploregorontalo #freediving #tripgorontalo', '2024-11-14 03:42:00+08'::timestamptz, 'https://www.instagram.com/reel/DCWbPlgAoFj/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6576, 0, 100, 3, 1, 2, 0),
  ('tripbarengisal', 'One breath

#whaleshark #whalesharkgorontalo #freediving #freedivers #explore #underwater #gorontalo #pesonaindonesia #wonderfulindonesia #privatetrip #ocean', '2024-10-03 03:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DAqKjBZAuiW/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 12478, 6608, 286, 40, 5, 17, 0),
  ('tripbarengisal', 'Dive into the blue sea..

#gorontalo #bluesea #ocean #freedive #freedivinggirls #wonderful_places #beautifuldestinations #pesonaindonesia #freedivers', '2024-07-01 03:58:00+08'::timestamptz, 'https://www.instagram.com/reel/C84KFOlSXzH/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 723, 221, 2, 1, 2, 0),
  ('tripbarengisal', 'one of the beautiful islands in gorontalo 

.
.
inframe: @srinovia 
#gorontalo #islandhopping #islandgirl #islandvibes #wonderful #wonderful_places #wonderfulindonesia #pesonaindonesia #pesonagorontalo #beach #beachlife #beachvibes #traveling #dji #djiindonesia #explore', '2024-06-02 19:32:00+08'::timestamptz, 'https://www.instagram.com/reel/C7vJLOLPPu9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 804, 1587, 4, 2, 38, 0),
  ('tripbarengisal', 'a mermaid

#freediving #gorontalo #exploregorontalo #privatetrip #whaleshark #hiupaus #sea #gopro #freedivers #pureapnea #pesonaindonesia #wonderfulindonesia #ocean #mermaid', '2024-05-31 20:43:00+08'::timestamptz, 'https://www.instagram.com/reel/C7qI2CnPREo/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 572, 529, 2, 0, 7, 0),
  ('tripbarengisal', 'Let''s come join Freediving Trip Gorontalo With Us..

#freediving #gorontalo #exploregorontalo #privatetrip #whaleshark #hiupaus #sea #gopro #freedivers', '2024-04-20 05:48:00+08'::timestamptz, 'https://www.instagram.com/reel/C5-87LuBdUA/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 489, 342, 1, 0, 4, 0),
  ('tripbarengisal', 'come join trip with us

#gorontalo #whaleshark #djidrone #hiupaus #tranding #wonderful #wonderful_places #wonderfulindonesia #pesonagorontalo #pesonaindonesia #privatetrip #tripgorontalo', '2024-04-19 02:21:00+08'::timestamptz, 'https://www.instagram.com/reel/C58A5fMheEj/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 947, 259, 1, 0, 18, 0),
  ('tripbarengisal', 'come join trip with us..

#gorontalo #gorontalohits #wonderful_places #wonderfulindonesia #pesonaindonesia_id #pesonagorontalo #exploregorontalo #djidrone #djiindonesia', '2024-03-17 04:25:00+08'::timestamptz, 'https://www.instagram.com/reel/C4nQ3kISBsy/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 717, 128, 3, 1, 4, 0),
  ('wafiqarsyad_', 'Puncak adalah bonus, tujuan utama adalah Pulang dengan selamat. 

📍Puncak Ile - Ile, Pegunungan Boliyohuto.

Terima Kasih kalian Team Hebat🔥🔥🔥
@fardi_bilantua
@ilhamsalehhh_
@mr_dunggio @darmangusasi @cadas016 @yunusmuller25 @nplmdjd_ @ninkatili @melankolis_46 @gimindjamil @riiscry @hidayatpahabu 
#topileile2065mdpl #atapgorontalo #puncak #gorontalo', '2024-01-12 17:07:00+08'::timestamptz, 'https://www.instagram.com/reel/C2BV7KdhaGF/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 51, 451, 1, 0, 59, 0),
  ('wisatapuncakmeranti', 'Yang masih bingung mau liburan akhir tahun kemana, ke Wisata Puncak Meranti aja yuk🤩, Ada spesial live music show dari Gunawan & 90''s Radio Band juga loh‼️🥳, Jadi siap-siap bernostalgia ditahun baru ygy
📍Desa meranti, Kec. Tapa, Kab. Bone Bolango', '2024-12-24 05:23:00+08'::timestamptz, 'https://www.instagram.com/reel/DD9m7YDS0qT/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11389, 6741, 87, 44, 4, 1, 0),
  ('wulan_arrafif', 'Never thought in my life I would dive with a giant whale shark 🥰🥰 
Ohh I really made it happen 💫💫
.
Liburan berkesan selama tahun 2024 saya adalah bisa explore ke Gorontalo sebuah provinsi di Indonesia yang terletak di Semenanjung Minahasa, di bagian utara Pulau Sulawesi dengan ibu kota di Kota Gorontalo. Di tempat wisata hiu paus qt bisa freedive bersama Sherly WhaleShark 🙌🏻🙌🏻 
.
Let’s come Dance with gentle whale sharks..
.
.
#exploregorontalo #HelloFrom #instagood #livefolk #livefolkindonesia #artofvisual #instadaily #nature #exploreindonesia #beutifuldestinations #wonderful_places #liveofadventure #travelgram #freedivephotography #freedivegirls #freediveindonesia #foryoupage #island #indotravellers #hijabtraveller #photography #photooftheday #diindonesiaaja #grateful #underwater #gorontalo #whaleshark #sherlywhaleshark', '2024-10-02 21:17:00+08'::timestamptz, 'https://www.instagram.com/reel/DApd9XnBHJ9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 15905, 9805, 357, 45, 4, 45, 0),
  ('yan_dmpds', 'Wisata Hiu Paus 🐋
.
.
.
.
.
📍Botubarani, Kabila bone, Bone Bolango, Gorontalo
#hiupaus #whaleshark #gorontalo #botubarani #pantai #laut #wisata #traveling #botubarani #pesonaindonesia #wonderfullindonesia #drone #dronedji #dji #djiera #djiglobal #vlog #reels #Instagram', '2024-08-22 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/C-9vNfUpw8T/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6052, 572, 160, 1, 0, 2, 0),
  ('yan_dmpds', 'Pulau Dionumo, Gorontalo 🏝️
.
.
.
.
.
@gorontalo.life #pulaudionumo #dionumoisland #gorontalo #pesonagorontalo #gorontalolife #pantai #pulau #pesonaindonesia #wonderfullindonesia #dji #djiglobal #djiera #reels #instagram', '2024-02-28 00:56:00+08'::timestamptz, 'https://www.instagram.com/reel/C34pRxmrrXX/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 149, 260, 1, 0, 6, 0),
  ('yan_dmpds', 'Wisata Hiu Paus Botubarani Gorontalo
.
.
.
.
#hiupaus #whaleshark #gorontalo #pantai #laut #wisata #traveling #botubarani #pesonaindonesia #wonderfullindonesia #drone #dronedji #dji #djiera #djiglobal #vlog #cinematic', '2024-02-15 04:04:00+08'::timestamptz, 'https://www.instagram.com/reel/C3Xgyw_PXbn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 195, 367, 0, 0, 3, 0),
  ('zhrsaf', 'It''s really really nice to see u, sherly🥺😍💙

📹 : @fahri_amar9', '2024-10-16 05:32:00+08'::timestamptz, 'https://www.instagram.com/reel/DBL1Xxfh47R/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11558, 5901, 309, 10, 1, 57, 0)
) as v(
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, editor_choice, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
on conflict (permalink) do nothing;

update public.reels
   set thumbnail_url = '/reels/' || substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') || '.webp'
 where thumbnail_url is null
   and substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') in (
     'C-3-KWRPbbK',
     'C-3snDfhfqK',
     'C-9vNfUpw8T',
     'C-G57eBBwmL',
     'C-H88I2BWu0',
     'C-IAQ8kPjVN',
     'C-MF5wwhmD8',
     'C-MKYhsqPUH',
     'C-QDvM0ouyF',
     'C-RsNKKtTQM',
     'C-TzTWpBgTy',
     'C-ZI4nFhms7',
     'C-b9ZlfPy67',
     'C-eGzzfBn9m',
     'C-hyEoMvRkZ',
     'C-lrJkEJ1mY',
     'C-q0t5gJ5DD',
     'C-v8r6hh4WM',
     'C-wvmA_vQBd',
     'C-xbjZqhzEN',
     'C11Zl90yBJ5',
     'C11haLFh8Ue',
     'C14ANTkhQKc',
     'C16GNzty65M',
     'C16HVplSj6s',
     'C19NMPEh9Za',
     'C1hhCdpSkcV',
     'C1jNZttyI0l',
     'C1rW8oTBe68',
     'C1wIBoNS5Ee',
     'C1wqkduBqam',
     'C1wrwnjhRx3',
     'C1xAJV3SHjw',
     'C281U_1veG0',
     'C2BV7KdhaGF',
     'C2EXbprBljn',
     'C2MUdPLyWzy',
     'C2MhHI6Sska',
     'C2OiZ1RS_9T',
     'C2RS1Q-yoUt',
     'C2TL10UBrhB',
     'C2XApEBB9-l',
     'C2ZAYWDSB8p',
     'C2eyRzwBr2d',
     'C2hAeewywdk',
     'C2ji5HayEr6',
     'C2luyP1y2tw',
     'C34pRxmrrXX',
     'C36ieTIhnMy',
     'C3COzHshDyG',
     'C3ReUNWyHGg',
     'C3SiVJIrZ8_',
     'C3Xgyw_PXbn',
     'C3XpqkqBA2J',
     'C3YCw5uSY-F',
     'C3_3zn5hy_q',
     'C3cgzn0yaMX',
     'C3ctRs_vXor',
     'C3e8yiChuqn',
     'C3eFCkty44L',
     'C3eMBZhBQ5j',
     'C3ex2vvBMF9',
     'C3fNwDpRWjf',
     'C3oXPjDBPxP',
     'C3ppc0OBIT8',
     'C3q5srNh_5P',
     'C3v5ck_hH4I',
     'C3xRZ_jhY0A',
     'C3zf0KAhm-B',
     'C4-XTdkhA_g',
     'C40UcqghLF0',
     'C46iavqhb43',
     'C4ARubfh5GL',
     'C4C-FyhhcTm',
     'C4FWOozB6z9',
     'C4RjIeFBE1X',
     'C4Umyt4hVQU',
     'C4XfBiCLRqm',
     'C4aX63YhDA_',
     'C4ftd39h-4V',
     'C4fxqKRhMQp',
     'C4nQ3kISBsy',
     'C4qD-SKBqqX',
     'C4uvtPeBzyB',
     'C4wQInkhFcz',
     'C4zayF2B1YI',
     'C5-2xfehD-W',
     'C5-87LuBdUA',
     'C5-opNVBUbS',
     'C5-uYaeBrF8',
     'C50aCP5SOeg',
     'C54gOS7BaCO',
     'C55S1ONhhjx',
     'C577CwGhBVH',
     'C58A5fMheEj',
     'C5Abk_WBd7F',
     'C5AkmXDhrG4',
     'C5DJRL5hdYW',
     'C5DREKpBd8f',
     'C5F3NemBiS8',
     'C5Fl0euBHYM',
     'C5K7YZGB4wM',
     'C5MZ9qbBK5V',
     'C5OEDjoh32y',
     'C5OLW_VS8q7',
     'C5TZra7htFU',
     'C5TjzYThjlC',
     'C5UddBgBwxd',
     'C5VHPcVBBsc',
     'C5YYPJxhn0j',
     'C5ZwlpPhzzZ',
     'C5e6yl5hTd5',
     'C5gA9cbhiTY',
     'C5gcRWVB8QL',
     'C5iZ9InhUEj',
     'C5jiDmiBi5C',
     'C5kzSJ9hO-_',
     'C5rQ1kpBKtM',
     'C5riFJ6yoKo',
     'C5s6jTvhxco',
     'C5uK6QShCIE',
     'C5xLDfDBGZp',
     'C60erzDOwDK',
     'C67bYMdyNOB',
     'C6At8tRyQ8s',
     'C6BM0f_hYVk',
     'C6C70h6hWeJ',
     'C6DG-SUyjo1',
     'C6F6kKjhrO0',
     'C6I4VErS0E-',
     'C6IqcNnuENz',
     'C6LZ-77yhie',
     'C6XmKRzyS3h',
     'C6a4yHGOnGy',
     'C6bemxPxpET',
     'C6d4tzHSl7M',
     'C6fv4ctyoBB',
     'C6fxS04y50L',
     'C6gXQ87SwMT',
     'C6lJiI4BnLG',
     'C6siPGuBCem',
     'C6vDAHYr2x7',
     'C6vUXDSOUGw',
     'C6vcD7TOa9j',
     'C6x1qI9SDUp',
     'C6yEkUBhFS2',
     'C78-Ub7BSXP',
     'C78dgfeSufh',
     'C78wgzxSFVR',
     'C7EZemzS_5X',
     'C7GcFper2-n',
     'C7JUnnXBSEI',
     'C7LsSMrSFlJ',
     'C7OlGR9yxDv',
     'C7Rd9G8hIgM',
     'C7V80FgSfBg',
     'C7Y654TSUPY',
     'C7a4TDtuUcH',
     'C7bh0Z1BzBQ',
     'C7dvM7qxixK',
     'C7gD_TYN-5m',
     'C7gtHuPh8uM',
     'C7ksbmGPwXJ',
     'C7mPNKUPCzF',
     'C7qI2CnPREo',
     'C7uzJftSvIm',
     'C7v-nXayH1B',
     'C7v6cJ-uvu7',
     'C7vJLOLPPu9',
     'C7y2DMsSZ3g',
     'C83XMVWhAn4',
     'C84KFOlSXzH',
     'C8Bz3LFPJFE',
     'C8EQC5pBgvN',
     'C8O-5Wpv9fL',
     'C8Otm2HhxMU',
     'C8Wg68TPTTg',
     'C8Yr7k7vTlp',
     'C8ZECAJvaEo',
     'C8a8XYvPP9f',
     'C8gE64JSPO7',
     'C8ojzuAPRTq',
     'C8tAy_cvRhI',
     'C8tbzqMhjUN',
     'C8v0SyoPyJQ',
     'C963tdVPM7s',
     'C99M_2hBcAV',
     'C9D39VWhGoY',
     'C9HR3TKh8Rr',
     'C9MU08CBLru',
     'C9O_8pIhYTj',
     'C9RCsntBBqJ',
     'C9TXRRRh7Of',
     'C9UmCP7yc5-',
     'C9UpqGlynlc',
     'C9ekRpLhD2Q',
     'C9hJzezB8VL',
     'C9i3fhQyAQX',
     'C9j0p1ZhiTR',
     'C9jK2H8B9st',
     'C9lnmOnB-FJ',
     'C9rWGKhOdA-',
     'C9w4Tpxycs9',
     'C_45rs2IvQU',
     'C_7AQohz1i8',
     'C_8BusjhIpu',
     'C_O8C96BHJs',
     'C_SoiVYvjNv',
     'C_U39CCBR9v',
     'C_XNToMhF0P',
     'C_b6DWvh7kv',
     'C_g8WS5Bu4_',
     'C_hj_SmB6c4',
     'C_hsGdjBxh9',
     'C_iBhZRhsm7',
     'C_kCiAHB3hC',
     'C_kDUePhPgU',
     'C_mUDdQBIGw',
     'C_t6mq9pjag',
     'C_uj0iaIaou',
     'C_zBu4ap9mb',
     'DA0As7lNMSr',
     'DA2IBaMSQnp',
     'DA5aYGSt9-Q',
     'DA7Ge73Ja_m',
     'DAC-pP2B12H',
     'DADaTKuPsEq',
     'DAFIM_VJbAX',
     'DAGWPDWyqEp',
     'DAIYSunBD6U',
     'DALWJnkhyt6',
     'DAOB8h_P6qZ',
     'DAaoH4nP-em',
     'DAcTpo1J4pl',
     'DAdO8dnSGIl',
     'DAh1nkjunls',
     'DAhydQMRu_c',
     'DAnnyXBhceR',
     'DAp_N-IJpoa',
     'DApd9XnBHJ9',
     'DAqKjBZAuiW',
     'DB-587yyN0Q',
     'DB-a9Jautn_',
     'DB2yp9zt7ji',
     'DB7ooqhvIbM',
     'DBATx83J9ra',
     'DBDPp3dyI5U',
     'DBDf6RgKr82',
     'DBL1Xxfh47R',
     'DBP_JBqJnth',
     'DBSyKwkzKMi',
     'DBVP6rbBsf_',
     'DBXjNomBBi2',
     'DBi85jbBKtc',
     'DBiMUJgBFCs',
     'DBiYCbIzSKM',
     'DBlBpdJSPaX',
     'DBn3vAYsESH',
     'DBpeepsh47f',
     'DBpnTygOJEX',
     'DBqcJbTSbZG',
     'DC2_zQFz9ny',
     'DC8iJ44TEHz',
     'DCWbPlgAoFj',
     'DCardN6o4Mo',
     'DCf5bvEvTvq',
     'DCjUI4hzhvA',
     'DCkmASOB4nc',
     'DCoLL-OzVgR',
     'DCoUXfuzZyI',
     'DCwEjThzuH5',
     'DCx9uASypuA',
     'DD02h17ScFT',
     'DD1PsjkxTLv',
     'DD4WAnQzu0m',
     'DD5vH68zLdY',
     'DD6hqWWzbaf',
     'DD6kiKgTtkm',
     'DD8N8crTi1n',
     'DD8Ur7pTMJ-',
     'DD9Y8vlvR_Y',
     'DD9m7YDS0qT',
     'DDCJNQTTBWf',
     'DDE957wSbEh',
     'DDUc75FzlSc',
     'DDe6VFXycQv',
     'DDgtJ_-Sb--',
     'DDn2_qPTQKT',
     'DDtVIbZP37l',
     'DEEtjwRSIva',
     'DEGhoVUTMK4',
     'DEHZKqqJif_',
     'DEHeeV3y9IN',
     'DEID2Ffy5nk',
     'DEJJ6UATsXd',
     'DEKDIdlyODB',
     'DEKPNA2yz7D',
     'DEMa5div-jo'
   );
