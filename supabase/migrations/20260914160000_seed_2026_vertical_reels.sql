-- The rest of the 2026 archive: 95 vertical reels.
--
-- The export holds 242 posts. Only the 7 distinct categories present are
-- imported, and only rows that carry one at all: 104 posts arrived with the
-- Category column blank and are deliberately left out rather than filed by
-- guesswork. Of the 138 that do carry a category, 43 were already in the
-- table — 22 from the landscape import and 21 from the original archive — so
-- 95 rows are new here.
--
-- Endorse becomes Sponsored and flags the row sponsored, as in both earlier
-- imports. One post is filed "Community", which is not in the editorial
-- taxonomy; publishing it would open a tenth shelf on /reels, so it goes in as
-- a draft for an editor to decide on.
--
-- Covers came from instagram.com/p/<shortcode>/media/?size=l, resized to 640px
-- wide and written to public/reels/<shortcode>.webp. 1 could not be
-- fetched — Instagram answers 404 for it, so the post is gone or private — and
-- that row keeps a null cover and falls back to its category colour.
--
-- permalink is unique, so this is safe to run twice.

insert into public.reels (
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
select * from (values
  ('wendersteyt_', '📍PANTAI OLUHUTA KEC, BONE PANTAI🌊', '2026-08-08 02:08:00+08'::timestamptz, 'https://www.instagram.com/reel/Dbxf9LJs_2o/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 5076, 2900, 67, 16, 0, 0, 0),
  ('lecka_smenkqiuw', 'Main Jetski Dengan View Terbaik Di Gorontalo,,
.
.
#gorontalo #jetskigorontalo #aryanbykadena #pesonaindonesia #exploregorontalo', '2026-08-05 05:51:00+08'::timestamptz, 'https://www.instagram.com/reel/DbqLH95PTbk/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6019, 3076, 98, 55, 2, 67, 0),
  ('eky_santuy', 'Berenang bersama sherly gays😅

Keindahan Gorontalo adalah anugerah yang patut dibanggakan. Dari pantai berpasir putih, laut yang memukau, hingga kekayaan budaya yang penuh pesona, semuanya menjadi alasan untuk datang dan jatuh cinta pada Gorontalo.

Semoga semangat dalam memajukan sektor pariwisata yang terus digaungkan, termasuk oleh Sherly Paus, mampu membawa Gorontalo semakin dikenal, menggerakkan ekonomi masyarakat, dan menjadi destinasi wisata unggulan di Indonesia.

📍 Ayo jelajahi Gorontalo, nikmati keindahannya, dan dukung pariwisata lokal!
 
📸 @tripbarengisal 

#VisitGorontalo #PariwisataGorontalo #SherlyPaus #WonderfulGorontalo #banggajadianakgorontalo', '2026-08-03 18:13:00+08'::timestamptz, 'https://www.instagram.com/reel/DbmWDbvPd97/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6778, 3607, 81, 6, 0, 9, 0),
  ('wafiqarsyad_', 'Definisi ''tenang'' yang sebenarnya ada di sini.', '2026-08-03 05:19:00+08'::timestamptz, 'https://www.instagram.com/reel/Dbk-L7BRjNK/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 19247, 11069, 980, 375, 4, 56, 0),
  ('wafiqarsyad_', 'Matahari terbit di Danau Limboto selalu punya cerita yang bikin tenang.', '2026-08-02 02:26:00+08'::timestamptz, 'https://www.instagram.com/reel/DbiFUTWx-Ax/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 5059, 2950, 145, 38, 2, 7, 0),
  ('fira_djou', 'Kebahagiaan sederhana di longalo
#longalo #tapa #gorontalo', '2026-08-01 01:15:00+08'::timestamptz, 'https://www.instagram.com/reel/DbfWyn0tkS3/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 5576, 3140, 62, 1, 0, 0, 0),
  ('devii_permatasari', '💙🩵🤍

📽️: @undafaundra 
#wonderfullindonesia', '2026-07-31 22:47:00+08'::timestamptz, 'https://www.instagram.com/reel/DbfGnYFTfKc/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6955, 4090, 129, 6, 2, 17, 0),
  ('srydunggio__', 'Ketemu Dolphin 🐬😍🌊
Masya Allah tabarakallah 
.
.
#fyp #gorontalo #pulaugorontalo #dolpins', '2026-07-27 06:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DbTEBFySyz9/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6285, 3299, 100, 4, 0, 1, 0),
  ('maykel_', 'sesaat sebelum adzan Maghrib
📍Masjid Terapung Nurul Bahri

#masjid #pohuwato #gorontalo', '2026-07-24 08:42:00+08'::timestamptz, 'https://www.instagram.com/reel/DbLlMzozlam/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 5520, 3376, 138, 5, 2, 3, 0),
  ('gorontalo.unite', 'Yuk, liburan ke Gorontalo. Beragam destinasi menarik, murah meriah, bahkan bikin susah move on, banyak ditemukan di Gorontalo. 

Bukan hanya keindahan wisatanya juga yang menarik, tetapi juga kuliner khasnya yang selalu meninggalkan rasa dan cerita.

Meskipun Gorontalo menempati urutan ke-3 sebagai provinsi dengan garis kemiskinan perkotaan terendah tapi biaya hidup di Gorontalo itu relatif sangat terjangkau. 

Terima kasih buat alm. Bapak Rachmat Gobel.', '2026-07-17 04:09:00+08'::timestamptz, 'https://www.instagram.com/reel/Da5EpZATvsP/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6482, 3934, 297, 31, 3, 9, 16),
  ('gorontalo.unite', 'Mengenang kembali ungkapan alm. Bpk Rachmat Gobel: “membangun Gorontalo bukan hanya soal infrastruktur atau angka pertumbuhan. Tapi juga tentang menghadirkan ruang-ruang hidup yang bisa dinikmati masyarakat”

Weekend nanti, Danau Perintis di Suwawa ini cocok for healing, atau sekedar menikmati waktu bersama orang-orang terdekat.', '2026-07-17 01:42:00+08'::timestamptz, 'https://www.instagram.com/reel/Da4zZdDTGvy/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 11043, 6655, 604, 28, 9, 4, 10),
  ('armand_imban', 'Green Gorontalo 🌿🌾
Baik laut dan hijau alamnya, selalu ada tempat menarik untuk ditemukan, apalagi senjanya 🌄👌🏻

#gorontalo #nature #sunset #goldenhour #cinematography @wonderfulindonesia', '2026-07-16 00:57:00+08'::timestamptz, 'https://www.instagram.com/reel/Da2Il2dyeqc/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6688, 4588, 278, 17, 0, 7, 0),
  ('qrisgto', '📌Cara Klaim Tiket Konser Toton Caribo 

Masih bingung gimana caranya claim tiket konser Toton Caribo? Nih Min-Qris kasih PAHAM 🤚🏻. Simak videonya sampai akhir yaaa… biar kamu bisa kebagain tiketnya! 

#BahagiaQRISFest2026 #QRISJelajahIndonesia #QRISJelajahKulinerIndonesia #totoncaribo', '2026-07-13 03:55:00+08'::timestamptz, 'https://www.instagram.com/reel/Dauv99eBUFx/', 'Reel', 'Event', false, 'portrait', 'published', 0, false, 13284, 7467, 94, 97, 0, 1, 0),
  ('armand_imban', 'Blue Sea Vibes 
Gorontalo Paradise 🌴🌿

Just the beach and your smile fix everything 😇✨🌿

#gorontalo #oluhuta #cinematography #wayhome #moodoftheday @dji @wonderfulindonesia', '2026-07-08 02:09:00+08'::timestamptz, 'https://www.instagram.com/reel/DahrfqoS8B5/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6631, 5139, 232, 28, 2, 0, 0),
  ('sea_ntuary', '#gorontalo', '2026-07-07 20:10:00+08'::timestamptz, 'https://www.instagram.com/reel/DahCsD3vcyZ/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 13895, 7339, 311, 33, 5, 7, 0),
  ('travelarchel', 'Hi Gengs, aku ajak kalian mengunjungi Koral  Salvador Dali di Taman Laut Olele Gorontalo, 
Ini adalah kekayaan indahnya Laut Gorontalo. Dinamai Salvador Dali karena bentuk dan motif bunga karang (sponge coral)memiliki ukiran alami berongga dan berkelok menyerupai karya sang pelukis. Selamat datang di Indahnya laut Gorontalo
Bersama @dive_operator_gorontalo 
#olele 
#olelegorontalo 
#gorontalo
#gorontalodive
#salvadordali', '2026-07-07 12:10:00+08'::timestamptz, 'https://www.instagram.com/reel/DagLStMTPKh/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 7223, 4165, 108, 1, 3, 20, 0),
  ('briantiarno', 'Take me home, country roads... 🚲🛣️🏞️', '2026-07-05 22:08:00+08'::timestamptz, 'https://www.instagram.com/reel/DacGl5SBa4x/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 7733, 4578, 179, 14, 2, 8, 0),
  ('lecka_smenkqiuw', 'Gorontalo dengan Keindahanya 
.
.
#gorontalo #hiupaus #pesonaindonesia #instagram #exploregorontalo', '2026-07-03 05:15:00+08'::timestamptz, 'https://www.instagram.com/reel/DaVIbV8PhfK/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 8487, 5472, 251, 19, 5, 10, 0),
  ('aldi.inaku', '🌊🍃🌴

#wonderfulindonesia #gorontalo', '2026-06-29 17:15:00+08'::timestamptz, 'https://www.instagram.com/reel/DaMHKp4y5ZH/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 5358, 2980, 116, 3, 2, 2, 0),
  ('sthenlyefraldo', 'Obat penasaran tidak dijual di apotik
#paragliding #wisatamanado #paradise #paraglidingmanado', '2026-06-29 00:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DaKVBsTPtKI/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 4022, 2434, 65, 6, 1, 3, 0),
  ('rifqisadewa', 'Dua minggu terakhir saya menikmati ritme kehidupan di Bumi Serambi Madinah, Gorontalo. Hamparan alam yang indah, keramahan masyarakat, dan suasana yang begitu menenangkan menjadi jeda yang sempurna dari padatnya aktivitas serta hiruk-pikuk dunia KRL. Sesekali, kita memang perlu berhenti sejenak untuk kembali mengisi energi. 🙌 #gorontalo #gorontalounite #krl #dramakrlcommuterline', '2026-06-25 01:57:00+08'::timestamptz, 'https://www.instagram.com/reel/DaAKzdyimk4/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 18958, 12476, 486, 7, 9, 12, 0),
  ('gorontalo.unite', 'Tracce Summer Deals menghadirkan penawaran terbaik untuk melengkapi koleksi gaya Anda. Dengan program Add 100K for 2nd Item, Anda cukup membeli satu item dengan harga reguler, lalu tambahkan Rp100.000 untuk mendapatkan item kedua. Ini adalah kesempatan nyata untuk mendapatkan dua produk favorit dengan nilai yang jauh lebih hemat.
Baik Anda mencari sepatu, tas, atau aksesori yang mendukung keseharian, Tracce menyediakan pilihan desain modern dan serbaguna. Setiap produk dirancang untuk memberikan kenyamanan dan gaya tanpa kompromi.
Promosi ini berlaku di seluruh gerai Tracce di Indonesia, termasuk di dalam Everbest Studio, hingga 6 Juli 2026. Untuk Anda yang tidak sempat datang ke toko, penawaran spesial juga tersedia melalui situs resmi Tracce.
Jangan tunda, karena pilihan model dan ukuran terbaik akan cepat habis. Datang sekarang dan manfaatkan Tracce Summer Deals di Tracce Citimall Gorontalo. Satu langkah kecil, hasil besar untuk koleksi Anda.', '2026-06-25 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DaAFo6UzD_W/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 2373, 1454, 15, 5, 0, 0, 1),
  ('gorontalo.unite', 'EVERBEST, Everything on Sale menghadirkan momen terbaik untuk mendapatkan koleksi tas dan sepatu favorit dengan nilai lebih. Dengan program double savings, Anda bisa menikmati diskon hingga 30% plus tambahan potongan hingga Rp1.000.000 untuk item pilihan.

Ini adalah kesempatan nyata untuk memiliki produk Everbest yang dikenal dengan desain timeless, kenyamanan premium, dan kualitas tahan lama. Mulai dari kebutuhan harian hingga acara spesial, setiap koleksi dirancang untuk mendukung gaya Anda dengan sempurna.

Promo ini berlaku di seluruh gerai Everbest di Indonesia serta melalui situs resmi Everbest, mulai 11 Juni hingga 13 Juli 2026. Jangan menunda, karena pilihan model dan ukuran terbaik akan cepat habis.

Datang sekarang ke Everbest Citimall Gorontalo atau kunjungi situs Everbest untuk berbelanja online. Belanja lebih hemat, gaya tetap timeless.

#Everbest #EOS #EndOfSeasonSale #EverythingOnSale', '2026-06-22 02:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DZ4hQp-Tpmg/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 7141, 4150, 70, 40, 2, 0, 5),
  ('donikadir', 'Hanya ingin Lebih Tenang, Lebih Taat, Lebih Baik & Lebih Sehat ✍🏻😇

#gorontalo #bonebolango #hiddenparadise #masyaallahtabarakallah', '2026-06-20 18:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DZ1CStzpFCH/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 18537, 10346, 342, 7, 2, 20, 0),
  ('miar.91', '#diving #gorontalo #freedive', '2026-06-20 01:45:00+08'::timestamptz, 'https://www.instagram.com/reel/DZzR8taJVBP/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 15851, 8063, 322, 2, 3, 10, 0),
  ('iis_paneo', 'Obat penasaran gak dijual di apotik 🥰🪂

#paraglidingindonesia🇲🇨 #gorontalohits #exploregorontalo #healingtrip #reelsindonesia', '2026-06-13 17:11:00+08'::timestamptz, 'https://www.instagram.com/reel/DZi6rRyvjk8/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 17390, 10243, 381, 72, 3, 20, 0),
  ('skrabss', 'Di tengah keadaan yang sulit, masih banyak pedagang kecil yang setiap hari membuka lapak dengan harapan sederhana, dagangannya laku dan keluarga kecilnya bisa tersenyum.

Mari dukung UMKM dan pedagang kecil di sekitar kita. Karena dari langkah sederhana untuk membeli, ada banyak mimpi yang ikut kita bantu tumbuhkan.

#supportumkm #borongberbagi #belanjalokal #pedagangkecil', '2026-06-12 23:08:00+08'::timestamptz, 'https://www.instagram.com/reel/DZg-4vPuXgK/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 5318, 2976, 86, 5, 0, 0, 0),
  ('dee_piknikin', 'Gorontalo selalu punya alasan untuk membuat siapapun kembali..🌊🌞

Dari kedalaman laut yang spekta,ketemu teman baru, dan pengalaman yang nggak terlupakan

🏝️ Menjelajahi pulau-pulau eksotis Lahe, Bogisa, Monggihito, Lito Lamp
🤿 Nyelem di Olele, Biluhu
🐋 Ketemu hiu paus & schooling fish
🌅 Liet senja dari ketinggian
💆‍♀️Nginep di pinggir laut
📸 Hal2 random selama trip

Dan tanpa sadar, perjalanan ini bukan hanya tentang destinasi yang dikunjungi, tetapi juga tentang karya Tuhan yang luar

Kalau kamu, aktivitas apa yang paling ingin dicoba di Gorontalo? 👇

#Gorontalo #visitgorontalo #freediveindonesia #travelindonesia #ExploreSulawesi', '2026-06-04 16:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DZLtQHqSfLD/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 7459, 4032, 139, 5, 1, 10, 0),
  ('gorontalo.unite', 'Beginilah keseruan setiap kedatangan tim Royco TokTokWuoww di rumah-rumah warga Gorontalo.

So, for warga Gorontalo, jang lupa slalu stock royco, sapa tau besok-besok, tim royco toktokwow mo ba singgah, terus ngajak chalenge deng dapa kesempatan hadiah uang tunai 300 ribu rupiah', '2026-06-04 03:33:00+08'::timestamptz, 'https://www.instagram.com/reel/DZKST1Gz2K1/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 5312, 3085, 32, 8, 0, 0, 2),
  ('devii_permatasari', 'Bicara soal pariwisata yang tiada duanya, Gorontalo sebenarnya memegang kartu as yang sangat kuat.
.
.
#wonderfullindonesia', '2026-06-02 02:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DZE-Zc5TYTS/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6452, 3887, 134, 8, 1, 12, 0),
  ('lecka_smenkqiuw', 'Main Jet Ski Yukk
.
.
#gorontalo #aryanbykadena #jetski #jetskigorontalo #dji', '2026-06-01 20:35:00+08'::timestamptz, 'https://www.instagram.com/reel/DZEYvwvPmSL/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 11089, 6243, 165, 22, 1, 2, 0),
  ('iis_paneo', 'Trip kali ini benar2 definisi pergi sendiri pulang punya teman baru ✨ awalnya awkward takut gak sefrekuensi, tapi ternyata mereka seruu dan bisa diajak bikin trend tiktok padahal kita umurnya beda jauh 😂 pulang gak cuma bawa foto tapi juga cerita, kenalan baru, dan mungkin perspektif baru tentang hidup.. travel bukan cuma soal tempat tapi soal siapa yang kamu temui dijalan 🫶

big thanks buat tuan rumah @ryangorut dan pilot drone kita kak @undafaundra yang sudah melayani dengan sangat baik 🙌

Buat yang pengen ikut trip langsung ke @wisata_dunu aja murah bangettttttttt 🔥', '2026-05-31 21:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DZB7EA-xWNK/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 10659, 6086, 179, 24, 1, 29, 0),
  ('skrabss', 'Fosil Kayu 23 juta tahun yang lalu.
Berlokasi di kec. Bongomeme Kab. Gorontalo diperkirakan terbentuk sekitar 23 juta tahun lalu melalui proses vulkanik yang mengubah kayu menjadi fosil.
Warisan geologi seperti ini menyimpan cerita panjang tentang bumi, dan setiap cerita berharga layak mendapat perhatian serta perlindungan.
tapi sayang saat ini tidak terawat.', '2026-05-30 19:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DY_KMPOzGzX/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 12249, 7029, 297, 4, 4, 7, 0),
  ('dee_piknikin', 'Location : Bogisa Island, North Gorontalo, Indonesia 😍

#bogisaisland #gorontalo #traveling #pesonaindonesia #visualworld📸🌏', '2026-05-23 02:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DYrPcqGST-C/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6970, 3968, 131, 6, 0, 11, 0),
  ('blue.gto', 'Datang dan lihat atau duduk dan nonton.
Visibiliti sangat sangat buruk. Tpi bukan halangan untuk bermain dengan si raksasa satu ini. 

Rushguard @bottomhead_ 

In action : saya aja.

#freedive #whaleshark #hiupaus #whalesharkgorontalo', '2026-05-21 03:18:00+08'::timestamptz, 'https://www.instagram.com/reel/DYmNNSXuElp/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 9634, 5372, 198, 4, 1, 22, 0),
  ('donikadir', 'One of my Bucket List 🧗🏻💦✅

#masyaallahtabarakallah #gorontalo_inframe #airterjuntaludaa #bonebolango #wisataalam', '2026-05-18 01:48:00+08'::timestamptz, 'https://www.instagram.com/reel/DYeUWInJqBs/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 11295, 6482, 317, 32, 0, 32, 0),
  ('dee_piknikin', 'Lito Lamp, North Gorontalo, Indonesia 😍

#freedive #gorontalo #visualworld📸🌏 #xyzbca #healing', '2026-05-17 16:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DYdRZETystg/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 4699, 2681, 81, 0, 1, 11, 0),
  ('scooterland.gto', 'Recap Mods May Day 2026 

@sog.gorontalo.official ❌ @scooterland.gto 

#moodsmayday #gorontalo #soggorontalo #scooterland #scooterlandgorontalo', '2026-05-16 21:51:00+08'::timestamptz, 'https://www.instagram.com/reel/DYbUNOypxwL/', 'Reel', 'Event', false, 'portrait', 'published', 0, false, 6184, 3240, 131, 10, 0, 10, 0),
  ('dee_piknikin', 'Cakep banget pulau ini.. 😍
Location : Lahe Island, Marisa, Gorontalo, Indonesia

#drone #holiday #sweetescape #visualworld📸🌏', '2026-05-13 15:24:00+08'::timestamptz, 'https://www.instagram.com/reel/DYS6BvrS3FD/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 13582, 6937, 318, 38, 4, 48, 0),
  ('undafaundra', 'Jauh dari rutinitas, dekat dengan kedamaian 🏝️🗿

#litolampu #gorontalo #dji #djiglobal #djiera', '2026-05-11 17:44:00+08'::timestamptz, 'https://www.instagram.com/reel/DYOAa5yzDzO/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 6149, 3515, 153, 27, 0, 5, 0),
  ('undafaundra', 'Scream from mountain tops 🪂

#bukitdunu #gorontalo #pesonagorontalo #paralayanggorontalo #djiera', '2026-05-10 02:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DYJ0JQKR7Uy/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 9891, 5545, 200, 26, 3, 12, 0),
  ('deddy_iteneps', 'Ikut ramai di event Gorontalo Mods May Day 2026 yg di selenggarakan @sog.gorontalo.official .. Pengalaman pertama saya di Event Vespa dan bertemu teman lama. Mods Mayday adalah ajang silahturahmi, perayaan, dan solidaritas budaya subkultur Mods serta pecinta skuter klasik yang diadakan rutin di seluruh dunia, termasuk Indonesia, setiap bulan Mei. Di Gorontalo, acara ini biasanya diisi dengan sunmori (Rolling City), Konser musik, bazar, dan silaturahmi antar komunitas Vespa & komunitas motor klasik lainnya.. #modsmayday #modsmayday2026 #gorontalo #gorontalounite', '2026-05-09 22:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DYJXI99uALJ/', 'Reel', 'Event', false, 'portrait', 'published', 0, false, 11686, 6187, 358, 15, 5, 16, 0),
  ('langkahnya.dean', 'Menghampiri Lito Bogisa yang terletak di Gorontalo Utara. Pulau yang unik nan indah.

Pilot drone @azh_vf 

#gorontalo #pulaubogisa', '2026-05-07 20:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DYEAojTzOXW/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 9806, 5646, 309, 95, 2, 18, 0),
  ('skrabss', 'Seorang lansia berusia 64 tahun menggantungkan hidup dari mengumpulkan kopra.
Setiap hari ia harus mengejar target, demi sekadar memenuhi kebutuhan dasar. 
Harga kopra yang ia kumpulkan hanya bernilai sekitar Rp200/kg. 
Dalam sehari, rata-rata ia mampu mengumpulkan 60 kg yang berarti penghasilannya hanya sekitar Rp12.000.
Bahkan ketika mencapai 100 kg, penghasilannya hanya Rp20.000. 
Sementara harga beras telah mencapai Rp13.000/kg.
Ketimpangan ini menjadi potret nyata betapa beratnya perjuangan mereka untuk bertahan hidup.
Kondisi ini bukan hanya dialami satu orang, tetapi masih banyak lansia dhuafa di pelosok yang menghadapi realita serupa bekerja keras di usia senja, tanpa jaminan hidup yang layak.
#lansia #pelosoknegeri #gorontalo #luaskanmanfaat', '2026-05-06 07:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DYACTisz8OL/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 11973, 7583, 284, 5, 1, 14, 0),
  ('wafiqarsyad_', 'Rehat sejenak 🌊🌅🏝️', '2026-05-06 06:17:00+08'::timestamptz, 'https://www.instagram.com/reel/DX_6DcExfa6/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 7462, 4068, 103, 11, 0, 5, 0),
  ('tripbarengisal', 'find me in underwater 
.
.
.
.
#gorontalo #pesonaindonesia #whaleshark #freedive #underwater', '2026-05-05 05:03:00+08'::timestamptz, 'https://www.instagram.com/reel/DX9MnJ-JGGu/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 7632, 5854, 133, 12, 0, 0, 0),
  ('skrabss', 'Bantu lanjutkan pembangunan Rumah Allah 🤲
Masjid ini dibangun dari perjuangan.
Para pemuda berjalan dari rumah ke rumah, membawa niat baik untuk menghadirkan tempat sujud di pelosok Gorontalo.
Hari ini, masjid itu sudah berdiri.
Meski masih sangat sederhana.
dinding GRC yang belum merata,
lantai yang masih berupa cor.
Namun perjuangan ini belum selesai.
Masjid ini masih membutuhkan lantai yang layak, plafon, dan penyempurnaan agar bisa digunakan dengan nyaman.

Semoga sedikit rezeki yang kamu berikan hari ini, menjadi amal jariyah yang terus mengalir.
dari setiap sujud, doa, dan ayat yang dilantunkan di dalamnya🤍 #mesjidpelosok #gorontalo #desaterpencil #luaskanmanfaat', '2026-05-04 17:13:00+08'::timestamptz, 'https://www.instagram.com/reel/DX769oxTNJ7/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 5257, 3225, 100, 1, 2, 3, 0),
  ('skrabss', 'Tahun ini, mereka hanya punya satu harapan…
Akan adakah hewan kurban yang hadir di desa mereka?

Mari jadikan kurban kita bukan sekadar ibadah, tapi juga jawaban atas doa-doa yang mereka panjatkan.🤍
#kurbanpelosok #bahagiaitusederhana😊 #gorontalo #bahagiakansesama #luaskanmanfaat', '2026-05-02 05:51:00+08'::timestamptz, 'https://www.instagram.com/reel/DX1jmUZPkS2/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 3617, 1977, 47, 0, 0, 0, 0),
  ('gorontalo.unite', 'Pygmalion Effect. Maknanya begini: 

ketika orang lain memiliki harapan tinggi terhadap kita, otak kita cenderung “menyesuaikan diri” untuk memenuhi ekspektasi itu. Harapan tersebut bisa bertindak seperti semacam cetakan halus yang membentuk perilaku, motivasi, bahkan rasa percaya diri.', '2026-05-02 02:45:00+08'::timestamptz, 'https://www.instagram.com/reel/DX1OUPIOrPY/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 3844, 2216, 90, 2, 0, 0, 3),
  ('skrabss', 'PART 2 :
Saya datang lagi ke pulau ini dengan sesuatu yang ingin saya sampaikan.

Bukan hanya sekadar bertemu, tapi juga membawa permohonan maaf, paket sembako, dan titipan rezeki dari orang-orang baik.

Saya tidak menyangka, respon bapak ini begitu tulus…
di tengah keterbatasannya, beliau tetap menerima dengan hati yang lapang dan penuh syukur.

Momen ini mengingatkan saya, bahwa "bersyukur tidak menunggu lebih".

Semoga apa yang dibawa hari ini bisa bermanfaat 🙏

Terimaksih banyak yg sdh menitipkan amanahnya😇
#gorontalo #pelosoknegeri #berbagiituindah #luaskanmanfaat #lansiabahagia', '2026-04-26 04:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DXl6wnQE1vX/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 10227, 5442, 236, 9, 7, 30, 0),
  ('skrabss', '(jum''at Mubaroq) Di sebuah pulau terpencil yang jauh dari keramaian Gorontalo, tanpa akses listrik dan jaringan komunikasi, seorang pria lansia yang diperkirakan berusia sekitar 60-an tahun menjalani kehidupannya seorang diri.

Di tempat yang serba terbatas itu, ia mengurus seluruh kebutuhan hidupnya secara mandiri. Mulai dari memasak, membersihkan tempat tinggal, hingga memenuhi kebutuhan sehari-hari, semua dilakukan sendiri tanpa bantuan orang lain, hidup dengan  kesederhanan tapi beliau selalu bersyukur.

#gorontalo #pelosokdesa #lansiabahagia #luaskanmanfaat', '2026-04-23 17:49:00+08'::timestamptz, 'https://www.instagram.com/reel/DXfqxmIj5kh/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 28765, 15352, 1019, 18, 0, 45, 0),
  ('canyoneering_manado', 'GORONTALO!
SO SIAP NGONI ????

Goes To Gorontalo vol 4 🤩
Booking segera!', '2026-04-23 00:23:00+08'::timestamptz, 'https://www.instagram.com/reel/DXdzUJlEfN4/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 14432, 8354, 356, 45, 8, 26, 0),
  ('gorontalo.unite', 'Mau masuk tapi takut
Gak masuk, tapi penasaran 😭❗️

Kereta Hantu Pertama Di Kota Gorontalo 👻🚂

“Stasiun Angker Gorontalo”
03 April - 17 Mei 2026

BUKA SETIAP HARI
Senin - Minggu : 14.00 - 23.00 WITA
ISTIRAHAT
Senin - Minggu : 18.00 - 19.00 WITA

HARGA TIKET
Senin - Minggu : 25.000 / Orang

📍LOKASI
Ex. Gudang/Bioskop - Gorontalo
(Depan Lapangan Taruna Remaja)

Follow dan tag
@rumahhantuindonesia

Tag orang terdekat yang mau kamu ajak masuk wahana ini 👻✨

#keretahantugorontalo
#stasiunangkergorontalo
#rumahhantugorontalo
#rumahhantuindonesia', '2026-04-23 00:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DXdwm-XjgEd/', 'Reel', 'Event', false, 'portrait', 'published', 0, false, 14614, 8697, 89, 22, 3, 1, 5),
  ('gorontalo.unite', 'Perjalanan tidak selalu berjalan sesuai rencana, namun di saat tak terduga, yang paling berarti adalah tahu bahwa bantuan selalu ada.

Ke mana pun perjalanan membawa Anda, Honda selalu siap membantu, kapan pun dan di mana pun Anda berada, dengan jaringan dealer yang hadir di berbagai daerah.

Butuh bantuan di perjalanan? Hubungi Honda Emergency Service terdekat:
Honda Nengga Mobilindo – 08114333474 
Honda Nengga Mobilindo in Pohuwato – 08114333474 / (0443) 2216146 

📌 Simpan video ini untuk berjaga di perjalanan Anda

#Honda #HondaOutsideJava #HondaEmergencyService #HondaGorontalo', '2026-04-22 23:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DXdtEjADlUC/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 3031, 1768, 33, 2, 2, 5, 4),
  ('imigrasi.gorontalo', 'Kantor Imigrasi Kelas I TPI Gorontalo melalui Seksi Intelijen dan Penindakan Keimigrasian melaksanakan Tindakan Administratif Keimigrasian (TAK) berupa deportasi terhadap 4 (empat) Warga Negara Asing asal Republik Rakyat Tiongkok pada 21 April 2026. Tindakan ini merupakan hasil dari Operasi Wirawaspada 2026.

Langkah ini dilakukan sebagai bentuk komitmen dalam menjaga kedaulatan negara, menegakkan hukum keimigrasian, serta melindungi keamanan dan ketertiban masyarakat.

Pelaksanaan tugas ini sejalan dengan arahan Dirjen Imigrasi, Hendarsam Marantoko, dalam memperkuat pengawasan orang asing di wilayah Indonesia.', '2026-04-21 07:18:00+08'::timestamptz, 'https://www.instagram.com/reel/DXZY8cXCcJ9/', 'Reel', 'News', false, 'portrait', 'published', 0, false, 10141, 5867, 127, 9, 0, 9, 0),
  ('meylan_phutry', 'Warga limboto mana yg so pernah kasini? #masyaallah so gaga sx e😍

Yg mo kesini jangan lupa mampir ke @_skyfallcoffee yaw

#limboto #nongkrong #gorontalo #pasmolimlimboto', '2026-04-18 00:46:00+08'::timestamptz, 'https://www.instagram.com/reel/DXQ9vickSFq/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 10593, 6330, 107, 20, 1, 2, 0),
  ('xxyovitaaa', 'Healing mode: ON 🏝️

#pantaigorontalo #pesonagorontalo', '2026-04-16 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DXL1ZeCAdui/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 7539, 3907, 118, 14, 2, 0, 0),
  ('udangmerah40', 'UNTIL NEXT TIME, OCEAN ✨
📹 master @billy_kohler 
.
#freedive #freediving #underwater #exploregorontalo #gorontalounite', '2026-04-14 01:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DXGtVt3E0_U/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 5286, 3006, 188, 8, 1, 22, 0),
  ('sidhani', 'Tanjung Keramat di Gorontalo bukan sekadar tempat yang indah, tapi juga surga bagi para nelayan. Dari lautnya yang biru, lahir hasil tangkapan tuna berkualitas tinggi yang menjadi kebanggaan daerah 

Kerja keras para nelayan setiap hari menghadirkan rezeki dari samudera, menjadikan Tanjung Keramat dikenal sebagai salah satu penghasil tuna terbaik. Di balik setiap tangkapan, ada semangat, harapan, dan cerita kehidupan yang menginspirasi.

Bangga dengan kekayaan laut Indonesia, bangga dengan Tanjung Keramat

📍 Tanjung Keramat, Gorontalo', '2026-04-11 07:02:00+08'::timestamptz, 'https://www.instagram.com/reel/DW_nDEDEVmv/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 18120, 12132, 792, 50, 5, 31, 0),
  ('leoomist', 'Not all giants are scary. Some just swim beside you 🐋

The team:
@_anami93 
@whgg19 
@choicekaunang
@daisytinangon
@livni_mand', '2026-03-27 22:40:00+08'::timestamptz, 'https://www.instagram.com/reel/DWaq2r0gafA/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 18275, 11022, 553, 20, 2, 18, 0),
  ('gorontalo.unite', 'Untuk tahun ini, semoga semua hal baik diterimaNya. Untuk berikutnya, semoga kita terbiasa dengan hal-hal baik yang sama ini kita jalankan. 

📍@bindawood_', '2026-03-16 07:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DV8rJsVk8te/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 9172, 5672, 367, 26, 0, 2, 5),
  ('gorontalo.unite', 'Baju yang sekarang torang bisa beli sendiri, rasanya beda ya sama baju lebaran dulu, yang ti mama beli, satu tahun sekali. 

Sekarang? Torang so bisa beli sendiri. mungkin lebe mahal, lebih gaga, lebih pas depe ukuran dan selera macam di 3SECOND

Mar tetap depe rasa beda. Karena dulu, yang bekeng “spesial” itu bukan cuma bajunya.

Berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-03-15 07:42:00+08'::timestamptz, 'https://www.instagram.com/reel/DV6KVNUk8K2/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 12810, 9482, 59, 9, 1, 0, 2),
  ('gorontalo.unite', 'Buat para pejuang LDR, ini kesempatan bagus dekat lebaran. @panuapohuwato_airport terus meningkatkan konektivitas melalui penerbangan perintis, buat menuntaskan rasa rindu. 

Pada periode Angkutan Lebaran 2026, transportasi udara menjadi salah satu pilihan perjalanan yang cepat, aman, dan efisien untuk menuju berbagai daerah, termasuk dalam rangka bersilaturahmi bersama keluarga di momen lebaran.', '2026-03-12 18:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DVziiLYE5L5/', 'Reel', 'News', false, 'portrait', 'published', 0, false, 19893, 10467, 451, 30, 0, 4, 9),
  ('gorontalo.unite', 'Panggilan kepada Sahabat iBox! 

iBox akan hadir lebih dekat di beberapa lokasi tanggal 13 Maret 2026.

Dapatkan berbagai penawaran dan promo spesial untuk perangkat Apple terbaru kamu! Hemat hingga Rp 4.000.000*, 
Tambahan diskon Bank hingga Rp 1.000.000, potongan tambahan hingga Rp 500.000 dan Voucher MyEraspace hingga Rp 1.000.000* serta promo-promo menarik lainnya.

Periode promo 13 - 15 Maret 2026.

*Syarat dan ketentuan berlaku. 
Promo dapat berubah sewaktu-waktu.
#iBoxIndonesia', '2026-03-12 04:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DVyCk6dE4Mr/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 14081, 8676, 300, 27, 9, 2, 10),
  ('lyn_lynaa29', 'Spot terbilang baru untuk nyelam, kurang lebih 4 jam perjalanan dari pusat kota Gorontalo. Schooling fish atau kumpulan ikan ini terdapat di kabupaten Pohuwato. Ikan kembung dengan nama lain oci/tude ini Habitatnya di perairan laut tropis, terutama di zona pelagis dangkal hingga sedang (neritik) dekat pantai, di mana mereka hidup berkelompok mencari makan plankton (fitoplankton dan zooplankton) di sekitar terumbu karang, pelabuhan, dan perairan kaya nutrisi.
Kumpulang ikannya sangat banyak, sampai kami lupa nyelam seharian disini🫶🏻😍

🎥 @israwandis  @kokodimanamana 
📍 Pohuwato, Gorontalo-Indonesia
⛓ Weight Belt @dgpittt 
✍️ Edited by Me

#freediving #freedivegorontalo #fundive 
#schoolongfishgorontalo #pesonaindonesiagorontalo', '2026-01-08 22:46:00+08'::timestamptz, 'https://www.instagram.com/reel/DTR6G18CW1C/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 5524, 2937, 119, 5, 1, 8, 0),
  ('gorontalo.unite', 'Sempat ragu stok marshmallow Chomp Chomp buat si kecil? 

Sekarang nggak perlu khawatir lagi karena camilan ini sudah terjamin 100% halal. Status halalnya sudah ditegaskan resmi oleh Komisi Fatwa MUI dan BPJPH setelah melalui uji lab mandiri serta audit pabrik dengan hasil yang sangat memuaskan, jadi pastinya aman dan tenang untuk konsumsi anak-anak.

Buat para orang tua di Gorontalo, snack ini gampang banget ditemukan di seluruh minimarket terdekat, biasanya ada di rak bagian depan dengan berbagai varian rasa. 

Yuk, stok sekarang buat camilan di rumah, teksturnya yang kenyal dan manis pasti bikin anak-anak suka!', '2026-01-09 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DTPLeOskhSz/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 8632, 4664, 67, 3, 0, 1, 3),
  ('timbangtimba', 'Fakta singkat #boalemo, keindahan alamnya dan pesona Pulau Mandoli di Teluk Tomini.

#reels
#gorontalo', '2026-01-12 19:03:00+08'::timestamptz, 'https://www.instagram.com/reel/DTb1xQTEjIo/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 14951, 8747, 392, 31, 5, 5, 0),
  ('gorontalo.unite', 'Kini Kiddoland resmi membuka cabang ke-3 di Gorontalo. Taman hiburan keluarga yang menghadirkan pengalaman bermain seru, aman, dan nyaman untuk anak-anak.

Dalam rangka Grand Opening, Kiddoland Gorontalo menawarkan beragam promo menariknya. Paket Bermain 3 Jam (3 Anak), Weekday: Rp200.000 dan Weekend: Rp275.000

Kemudian juga ada Paket Bermain Per Anak, weekday: Rp50.000 untuk 1 jam atau Rp75.000 selama 3 jam dan pas weekend: Rp75.000/1 jam atau Rp100.000 untuk 3 jam

Dan juga, setiap pengunjung yang telah melakukan 6 kali kunjungan berhak menjadi member Kiddoland atau mendapatkan gratis bermain selama 1 jam.

Ajak si kecil bermain dan ciptakan momen kebersamaan yang menyenangkan di Kiddoland Gorontalo, tepatnya di Toko Bintang lantai 3, Jl. Prof. Dr. H. B. Jassin, Limba U Dua', '2026-01-14 21:18:00+08'::timestamptz, 'https://www.instagram.com/reel/DThO2JlkmYI/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 8250, 4859, 99, 39, 2, 1, 9),
  ('oceanala.id', 'Apa yang dianggap usang, bisa jadi harapan baru.
Pulau Lahe membuktikannya—kendaraan bekas yang ditenggelamkan dari tahun 2017 kini menjadi ekosistem bagi kehidupan laut 🌊🐟

ONE DAY TRIP
Explore Pulau Lahe
24 Januari 2026 / 31 Januari 2026 
Booked your trip now! 

#KelanaKemana bersama @oceanala.id 
#WanderDiveProtect', '2026-01-16 04:18:00+08'::timestamptz, 'https://www.instagram.com/reel/DTkhpO7EXt4/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 4860, 2389, 76, 7, 1, 1, 0),
  ('syakbanarief', 'Jin Caves Olele just hit my dopamine 🌊
📍Jin Caves, Olele 
📽️ @aldi.inaku 

#diving #freediving #gorontalo #bonebolango #olele', '2026-01-17 03:28:00+08'::timestamptz, 'https://www.instagram.com/reel/DTnCaSYD_6w/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 5086, 2835, 113, 5, 0, 10, 0),
  ('annjuliana', 'Mt. Ile ile cantik sekaliiiii
.
.
Falling feels familiar', '2026-01-17 19:57:00+08'::timestamptz, 'https://www.instagram.com/reel/DTo0Byuk0E0/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 7450, 3989, 157, 17, 2, 7, 0),
  ('anslths', 'Whale Shark wanted to reach for stars. He didn''t yet know he carried so many on himself
.
.
.
.
.
.
🏝 #whalesharkgorontalo🐳
👭 @arumoktaviyani @novawarow
👙 @4dive.indonesia
🎥📸 @blue.gto', '2026-01-18 23:36:00+08'::timestamptz, 'https://www.instagram.com/reel/DTrxT5WkrDx/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 5857, 2925, 149, 3, 1, 32, 0),
  ('gorontalo.unite', 'Annyeonghaseyo (안녕하세요)

mana nih tamang-tamang di Kota Cinta, Marisa deng sekitarnya, dari Paguat sampe Popayato🤩

Lucky Cheese dengan produk unggulannya jajanan pancake coin viral, so buka outlet di Marisa. Ndak tertarik mo ba coba?

Pilihan rasanya banyak, harganya masih pas di kantong for mo cobain yang keju mozzarella-nya yang melimpah pas mo tarik.

Informasi kemitraan:
📲 WA: 0851-7318-8517', '2026-01-21 01:15:00+08'::timestamptz, 'https://www.instagram.com/reel/DTxG0JgEidj/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 5248, 3122, 45, 8, 0, 2, 6),
  ('tintasuntung_', 'I’m the queen of my own little world✨
.
.
📍Cathedral Point, GORONTALO
🎥🪄 @billy_kohler 
#freedive #freediving #underwater #wonderful_places #gorontalo', '2026-01-22 21:33:00+08'::timestamptz, 'https://www.instagram.com/reel/DT12-r2k9fC/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 11017, 6034, 296, 5, 7, 7, 0),
  ('ikraditt', 'When the avatar happens to you in real life 

🎥 : @tripbarengisal 

#freediving #whaleshark #ocean #gorontalo #whalesharks', '2026-01-23 03:46:00+08'::timestamptz, 'https://www.instagram.com/reel/DT2hWB_kZjF/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 12634, 4635, 386, 56, 1, 10, 0),
  ('galeryboalemo', 'Tilamuta kini punya Wajah baru , KM Nol Atau Kuliner,Musik Dan Nostalgia,yang terletak tepat di jantung ibu kota Kabupaten Boalemo, kini menjelma menjadi pusat kuliner malam paling hits yang mempertemukan kawula muda hingga orang dewasa dalam suasana penuh kehangatan.

Meski tergolong baru, magnet KM Nol sukses memicu antusiasme luar biasa. Setiap sudutnya kini dipenuhi obrolan warga yang bersantai menikmati udara malam, ditemani kepulan aroma lezat dari berbagai tenda kuliner yang terus bertambah setiap minggunya.

Video @yowan_ahmad

#KMNOLtilamuta #tilamuta 
#boalemo #galeryboalemo', '2026-02-01 05:55:00+08'::timestamptz, 'https://www.instagram.com/reel/DUN7iFSEoXm/', 'Reel', 'Lifestyle', false, 'portrait', 'published', 0, false, 11535, 5913, 183, 8, 3, 7, 0),
  ('blue.gto', 'always felt like a dream to play with giant sam

On action @flowerindyy 

#whaleshark #whalesharks #hiupaus #whalesharkgorontalo #whalesharkgorontalo🐳 #hiupausgorontalo #freedive #freediver #freediveindonesia', '2026-02-04 01:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DUVN1SoESaB/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 13726, 9340, 210, 31, 2, 0, 0),
  ('bagiro.am', 'Kalau ke Gorontalo jangan hanya liat hiu paus sherly, ternyata ada ini juga loh, dan tidak kalah keren.. Thanks tim @blue.gto 

#gorontalo #olele #freedive', '2026-02-16 02:34:00+08'::timestamptz, 'https://www.instagram.com/reel/DU0MvlyCZEU/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 14218, 8976, 569, 36, 5, 27, 0),
  ('nwhpoetri', 'Tuhan menciptakan tempat yang indah, tapi kamu malah lebih milih rebahan, kalo aku sih ayo gasskeunn🏝️🌊🪨

Pilot drone @undafaundra', '2026-02-16 04:27:00+08'::timestamptz, 'https://www.instagram.com/reel/DU0ZUD2ATRg/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 5978, 3527, 96, 7, 4, 13, 0),
  ('galeryboalemo', 'Fajar Ramadan telah menghampiri kita, mari kita sambut dengan hati gembira 
Marhaban ya Ramadan.. 

Selamat menunaikan ibadah puasa untuk kita semua, semoga diberikan kelancaran dan juga keberkahan. 

Video li kakak @mitro_nanto 

#ramadan #ramadan2026 
#tilamuta #boalemo #galeryboalemo', '2026-02-18 22:35:00+08'::timestamptz, 'https://www.instagram.com/reel/DU7fck0kY23/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 7176, 4046, 250, 4, 8, 5, 0),
  ('lecka_smenkqiuw', 'Pulau Di Gorontalo Bagian Premium 🌴🌴🌴 
.
.
#gorontalo #pulaumohinggito #pesonaindonesia #tripgorontalo #dji', '2026-02-21 01:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DVA63h5j6h3/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 4800, 2929, 122, 15, 1, 1, 0),
  ('gorontalo.unite', 'Ngabuburit itu bukan sekadar jalan-jalan tanpa tujuan. Mungkin itu kenapa, di bulan Ramadan kita nggak cuma belajar puasa, tapi juga belajar menunggu dengan cara yang lebih ringan.

Hari ke-4 berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-02-22 02:36:00+08'::timestamptz, 'https://www.instagram.com/reel/DVDpY4SE3sO/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 6630, 4913, 56, 1, 2, 1, 0),
  ('gorontalo.unite', 'Ngabuburit sambil jalan-jalan ke Citimall Gorontalo? 

eh, ada FORTRESS yang lagi buka boothnya di lantai dasar mall. Catat tanggalnya jangan sampai kelewatan, 20 Februari sampai 5 Maret 2026 nanti FORTRESS bagi-bagi voucher sampe 500ribu, dan juga layanan gratis ongkir se-Gorontalo setiap pembelian pintu rumah baja TAHAN LAMA ANTI DRAMA yang cocok buat rumah modern sampai minimalis.

Selengkapnya bisa cek di akun @pintubajafortress #PintuBaja #PintuBajaFortress', '2026-02-23 04:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DVGd3O2EhGT/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 6716, 4324, 31, 8, 0, 0, 4),
  ('gorontalo.unite', 'Ramadan masa lalu itu cuma pengen dikenang sebagai pengingat kalau kita itu sebenarnya pernah hidup tanpa banyak mikir. Kita pernah jadi manusia yang cuma ‘ada’ di sana, tanpa merasa harus jadi ‘siapa-siapa’.

Jadi buat kalian yang sekarang lagi ngerasa Ramadan-nya hambar karena terlalu banyak mikirin masa depan, coba deh sesekali jadi anak kecil lagi.

Hari ke-5 berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-02-23 05:02:00+08'::timestamptz, 'https://www.instagram.com/reel/DVGfIWFku0o/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 10343, 7645, 74, 6, 1, 1, 2),
  ('gorontalo.unite', 'Romantisme masa lalu memang menyenangkan, makanya move on terasa berat. Ramadan tidak pernah berubah, kitanya aja yang terus bertumbuh.', '2026-02-23 07:28:00+08'::timestamptz, 'https://www.instagram.com/reel/DVGvrtjkiev/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 14427, 8502, 413, 17, 2, 1, 21),
  ('annaurahh_', 'trip pertama di 2026 membawaku melihat pesona salah satu kota di semenanjung minahasa 

📍gorontalo 

#pesonaindonesia #travelling #explorepage✨ #gorontalo', '2026-02-24 17:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DVKbi-zAYnc/', 'Reel', 'Tourism', false, 'portrait', 'published', 0, false, 13424, 8227, 508, 34, 6, 24, 0),
  ('gorontalo.unite', 'Jalan pagi setelah subuh di bulan Ramadan itu masih jadi satu-satunya momen yang seru, saat kita beranjak remaja dulu.

Tapi sekarang? Subuh jadi checkpoint sebelum tidur lagi. Hidup sudah punya jadwal. Punya tanggung jawab. Langkah kita tidak lagi tanpa tujuan. Tapi entah kenapa, ingatan itu datang. 

Hari ke-7 berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-02-25 04:37:00+08'::timestamptz, 'https://www.instagram.com/reel/DVLlz8pEs5S/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 9573, 5810, 140, 7, 1, 0, 7),
  ('gorontalo.unite', 'Menyemarakan Ramadan kali ini, saatnya berburu perlengkapan rumah tangga lengkap dari A–Z di AZKO, yang kebetulan lagi ngadain promo Berbagi Rezeki Ramadan 26 Februari–1 Maret 2026, dan dapat rezeki nomplok berupa cashback hingga Rp500.000.

Mumpung momennya sangat terbatas, yuk kunjungi AZKO sekarang juga. 

#AZKO #AZKOBerbagiRezekiRamadan', '2026-02-26 23:57:00+08'::timestamptz, 'https://www.instagram.com/reel/DVQO85Zkv8_/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 2484, 1531, 9, 2, 0, 1, 1),
  ('gorontalo.unite', 'Bukber jadi satu-satunya momen di mana kita benar-benar saling menatap, bukan cuma lihat nama di layar. Bukan soal makanannya. 

Tapi soal rasa yang bilang pelan-pelan: “Kita masih ada, ya.”

Hari ke-8 berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-02-27 05:08:00+08'::timestamptz, 'https://www.instagram.com/reel/DVQy1b6ktDm/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 12694, 9941, 44, 6, 0, 0, 0),
  ('gorontalo.unite', 'Siang ke sore menjelang Magrib adalah jam-jam yang sungguh terasa. Daripada rebahan terus, bagaimana kalo kita jalan-jalan, mutar-mutar, cari takjil? Mumpung cuaca di Gorontalo sekarang lagi adem-ademnya.', '2026-03-02 00:36:00+08'::timestamptz, 'https://www.instagram.com/reel/DVYCHalkiav/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 5164, 2741, 72, 0, 0, 0, 1),
  ('gorontalo.unite', 'Ramadan yang penuh cinta ala @wargaamal yang dimulai dari berbagi takjil hingga taraweh bareng.', '2026-03-06 05:34:00+08'::timestamptz, 'https://www.instagram.com/reel/DVi3qZ7k1ny/', 'Reel', 'Community', false, 'portrait', 'draft', 0, false, 11729, 6272, 100, 3, 0, 0, 1),
  ('gorontalo.unite', 'BUCCHERI menghadirkan Ramadan Collection dengan desain elegan dan material kulit asli berkualitas. Pilihannya lengkap, mulai dari sepatu, sandal, hingga tas yang cocok untuk melengkapi tampilan saat silaturahmi maupun acara keluarga di Hari Raya.

Menariknya lagi, saat ini sedang ada promo Ramadan dengan berbagai penawaran spesial seperti diskon, cashback, dan double points. Pembayaran juga bisa lebih fleksibel dengan cicilan 0% menggunakan Indodana, Kredivo, dan Kartu Kredit Mandiri.

Koleksi ini bisa kamu temukan langsung di toko dan juga di booth bazaar BUCCHERI Gorontalo, dan temukan koleksi favoritmu sebelum kehabisan.', '2026-03-07 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DVk9FGGT2pg/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 12410, 8358, 58, 4, 18, 0, 2),
  ('gorontalo.unite', 'Selalu ada tiap Ramadan, saat peringatan malam Nuzulul Quran, remamuda dan warga Molosifat W bikin pawai obor. Sesuatu yang selalu membuat macet jalan saat lalu lintas juga sedang padat-padatnya di wilayah Kota Gorontalo menjelang lebaran. Tapi yaaa begitu, seru', '2026-03-08 08:54:00+08'::timestamptz, 'https://www.instagram.com/reel/DVoQxO4ExAZ/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 13164, 6831, 292, 22, 1, 2, 4),
  ('bellasyafiraa_', 'PANADA Tore Tinelo merupakan satu di antara produk uaaha pasangan Amrin Ikhsan dan Aty Tumayahu. kerja keras dan doa pasangan suami- istri membuahkan hasil. Mulai dari membangun rumah, tercukupi kehidupan sehari-hari, menyekolahkan anak hingga sarjana, kendaraan roda empat, ibadah haji serta lain-lain dapat dipenuhinya.

Usaha yang dimulai sejak 2005 dengan bermodal Rp 500.000 dari hari ke hari terus berkembang.  Panada tore hasil produksinya yang diberi nama Tinelo semakin dikenal oleh masyarakat luas. Tak hanya di Kabupaten Gorontalo saja melainkan juga dari seluruh kabupaten dan kota yang ada di Gorontalo dan Manado bahkan sampai Pulau Jawa. “

Pasanga tersebut berterima kasih dengan kehadiran Alfamart di Gorontalo membantu mempromosikan Panada Tore miliknya hingga seperti sekarang ini, produknya tersebar di jaringan Alfamart Cabang Gorontalo.

 Dengan mengikuti prosedur dan konsultasi dari Alfamart.
Akhirnya produk panada tore yang sebelumnya berukuran besar, dikecilkan lagi, sehingga berbentuk mini. sehingga diharapkan konsumen lebih tertarik. Begitu juga dengan kemasan, sesuai persyaratan untuk masuk ke minimarket.

Hal ini terbukti banyaknya pelanggan yang meneloponnya untuk memesan panada tore dalam jumlah besar, karena untuk stok di Alfamart terbatas. Saat dirinya tanya tahu dari mana untuk penada tore, banyak pelanggan yang memgatakan dari produk yang dijual di Alfamart. 

#alfamart #alfamartForAll #umkmgorontalo #umkmkabgor #umkm TumbuhBersama', '2026-03-09 05:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DVqa7dGD1pB/', 'Reel', 'Sponsored', true, 'portrait', 'published', 0, false, 16238, 9548, 241, 10, 4, 5, 0),
  ('gorontalo.unite', '', '2026-03-10 00:01:00+08'::timestamptz, 'https://www.instagram.com/reel/DVsdsxZjuEn/', 'Reel', 'Culture', false, 'portrait', 'published', 0, false, 5302, 2776, 43, 8, 1, 0, 1)
) as v(
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
on conflict (permalink) do nothing;

-- Point the newly imported rows at their covers.
update public.reels
   set thumbnail_url = '/reels/' || substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') || '.webp'
 where thumbnail_url is null
   and substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') in (
     'DT12-r2k9fC',
     'DT2hWB_kZjF',
     'DTPLeOskhSz',
     'DTR6G18CW1C',
     'DTb1xQTEjIo',
     'DThO2JlkmYI',
     'DTkhpO7EXt4',
     'DTnCaSYD_6w',
     'DTo0Byuk0E0',
     'DTrxT5WkrDx',
     'DTxG0JgEidj',
     'DU0MvlyCZEU',
     'DU0ZUD2ATRg',
     'DU7fck0kY23',
     'DUN7iFSEoXm',
     'DUVN1SoESaB',
     'DV6KVNUk8K2',
     'DV8rJsVk8te',
     'DVA63h5j6h3',
     'DVDpY4SE3sO',
     'DVGd3O2EhGT',
     'DVGfIWFku0o',
     'DVGvrtjkiev',
     'DVKbi-zAYnc',
     'DVLlz8pEs5S',
     'DVQO85Zkv8_',
     'DVQy1b6ktDm',
     'DVYCHalkiav',
     'DVi3qZ7k1ny',
     'DVk9FGGT2pg',
     'DVoQxO4ExAZ',
     'DVqa7dGD1pB',
     'DVsdsxZjuEn',
     'DVyCk6dE4Mr',
     'DVziiLYE5L5',
     'DW_nDEDEVmv',
     'DWaq2r0gafA',
     'DX1OUPIOrPY',
     'DX1jmUZPkS2',
     'DX769oxTNJ7',
     'DX9MnJ-JGGu',
     'DXGtVt3E0_U',
     'DXL1ZeCAdui',
     'DXQ9vickSFq',
     'DXZY8cXCcJ9',
     'DX_6DcExfa6',
     'DXdtEjADlUC',
     'DXdwm-XjgEd',
     'DXdzUJlEfN4',
     'DXfqxmIj5kh',
     'DXl6wnQE1vX',
     'DYACTisz8OL',
     'DYEAojTzOXW',
     'DYJ0JQKR7Uy',
     'DYJXI99uALJ',
     'DYOAa5yzDzO',
     'DYS6BvrS3FD',
     'DY_KMPOzGzX',
     'DYbUNOypxwL',
     'DYdRZETystg',
     'DYeUWInJqBs',
     'DYmNNSXuElp',
     'DYrPcqGST-C',
     'DZ1CStzpFCH',
     'DZ4hQp-Tpmg',
     'DZB7EA-xWNK',
     'DZE-Zc5TYTS',
     'DZEYvwvPmSL',
     'DZKST1Gz2K1',
     'DZLtQHqSfLD',
     'DZg-4vPuXgK',
     'DZi6rRyvjk8',
     'DZzR8taJVBP',
     'Da2Il2dyeqc',
     'Da4zZdDTGvy',
     'Da5EpZATvsP',
     'DaAFo6UzD_W',
     'DaAKzdyimk4',
     'DaKVBsTPtKI',
     'DaMHKp4y5ZH',
     'DaVIbV8PhfK',
     'DacGl5SBa4x',
     'DagLStMTPKh',
     'DahCsD3vcyZ',
     'DahrfqoS8B5',
     'Dauv99eBUFx',
     'DbLlMzozlam',
     'DbTEBFySyz9',
     'DbfGnYFTfKc',
     'DbfWyn0tkS3',
     'DbiFUTWx-Ax',
     'Dbk-L7BRjNK',
     'DbqLH95PTbk',
     'Dbxf9LJs_2o'
   );
