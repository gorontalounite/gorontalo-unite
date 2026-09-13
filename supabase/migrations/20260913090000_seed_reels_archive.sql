-- Seeds the Reels archive from the supplied spreadsheet: 146 posts captured
-- between July 2024 and July 2026. The table was emptied beforehand.
--
-- Two readings of the source worth recording:
--
--   * `Kategori` maps onto the editorial taxonomy — Wisata to Tourism,
--     Endorse to Sponsored, Cullinary to Culinary; the rest carry across.
--   * `Brand` is NOT a sponsorship marker. Most of its values are themes
--     ("Ramadan", "Sejarah", "Idulfitri", "Suasana Kota"), so only the 32 rows
--     filed under Endorse are flagged sponsored. Brand itself has no column on
--     this table and is not imported.
--
-- thumbnail_url is left null on purpose. Instagram's embed endpoint now
-- answers with a login wall and no cover image, so nothing can be fetched for
-- these automatically; the images have to be supplied.
--
-- permalink is unique, so this is safe to run twice.

insert into public.reels (
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
select * from (values
  ('armand_imban', 'Bucer Gorontalo 🏕️

Just a hidden gem 🍁🌿

#gorontalo #bulotalangi #nature #nightvibes #cinematography @wonderfulindonesia 🇮🇩', '2026-07-21 04:08:00+08'::timestamptz, 'https://www.instagram.com/reel/DbDXZ_iSb98/', 'Reel', 'Tourism', false, 'published', 0, false, 30059, 21994, 913, 456, 7, 41, 0),
  ('akbardama', 'morning run with a view✨😍 
#running #gorontalo #bonebolango', '2026-07-18 18:00:00+08', 'https://www.instagram.com/reel/Da9IfJyTIF5/', 'Reel', 'Tourism', false, 'published', 0, false, 20142, 10920, 779, 82, 6, 32, 0),
  ('qrisgto', 'Udah denger langsung kan pesannya? 👀

Kak Toton aja udah gak sabar buat seru-seruan bareng kamu di Bahagia QRIS Fest! Masa kamu masih mikir-mikir mau datang atau enggak? 🤪

Siapkan outfit terbaik kamu, hafalin lagu-lagunya, dan ajak seluruh circle kamu buat merapat. Jangan sampai nyesel karena kehabisan tiket ya!

🎟️ Klik link berikut untuk amankan tiketmu sekarang!
[qris-gorontalo.com]

#BahagiaQRISFest #QRIS #DuloItoMomakeQRIS #BankIndonesia # QRISGorontalo', '2026-07-17 01:18:00+08', 'https://www.instagram.com/reel/Da4g8ahyrVR/', 'Reel', 'Sponsored', true, 'published', 0, false, 36588, 21631, 763, 332, 6, 1, 0),
  ('gorontalo.unite', 'Mengenang kembali prinsip Pak Rachmat Gobel, politisi santun kesayangan banyak orang di Gorontalo. 

Odu olo Pak Rachmat, paripurna sudah persiapanmu, tunai sudah janji baktimu. Gorontalo ikhlas dan ridho atas segala kebaikannya. 🥀', '2026-07-09 18:20:00+08', 'https://www.instagram.com/reel/Dal_pSyTdMO/', 'Reel', 'News', false, 'published', 0, false, 140016, 74908, 8374, 628, 129, 214, 245),
  ('emzydinata', 'Justru di situlah cerita paling berharga seringkali dimulai. 

📍Gorontalo

#gorontalo #travel #gorontalounite', '2026-06-26 07:10:00+08', 'https://www.instagram.com/reel/DaDUSqzp1ek/', 'Reel', 'Untold Story', false, 'published', 0, false, 27979, 18107, 1368, 37, 29, 36, 0),
  ('rifqisadewa', 'Karena ada oleh-oleh yang habis dimakan, ada juga oleh-oleh yang akan selalu dikenang. Saya sudah kena demam ibu @s_tjo 🤝✨', '2026-06-26 17:18:00+08', 'https://www.instagram.com/reel/DaEZ2Koz4jc/', 'Reel', 'News', false, 'published', 0, false, 83711, 45296, 2672, 41, 30, 59, 0),
  ('akbardama', 'Menikmati Limboto dari sudut yang berbeda ✨

📍Menara Pakaya Limboto

#gorontalo #wonderfullindonesia #menaralimboto', '2026-06-25 01:13:00+08', 'https://www.instagram.com/reel/DaAHDeMR_0r/', 'Reel', 'Tourism', false, 'published', 0, false, 29143, 19148, 1776, 78, 6, 3, 0),
  ('rbenawan', 'Menghabiskan waktu bersama anak adalah investasi berharga untuk masa depan ❤️❤️❤️
.
.
.

📍Bukit Ranjau, 24 Juni 2026', '2026-06-24 06:22:00+08', 'https://www.instagram.com/reel/DZ-FG1eP-xO/', 'Reel', 'Tourism', false, 'published', 0, false, 22239, 12019, 308, 4, 0, 5, 0),
  ('emzydinata', 'Tempatnya boleh sederhana, tapi ambience-nya 10/10..

Tertarik buat ngopi disini, guys?

#gorontalo #menarapakaya #gorontalounite', '2026-06-24 05:40:00+08', 'https://www.instagram.com/reel/DZ9_iapJ3BU/', 'Reel', 'Untold Story', false, 'published', 0, false, 67467, 49507, 3760, 185, 37, 43, 0),
  ('armand_imban', 'Menara Eiffel Limboto | Pakaya Tower 🗼

Lampu menara dan taman limboto makin cakep aja dengan adanya gelaran PENAS Petani Nelayan XVII 👌🏻

Terima kasih untuk bpk @rachmatgobel_rg 🫰🏻
#gorontalo #limboto #menaralimboto #pakayatower #penasgorontalo2026 @wonderfulindonesia', '2026-06-20 05:25:00+08', 'https://www.instagram.com/reel/DZzrwscS50S/', 'Reel', 'Tourism', false, 'published', 0, false, 61674, 34960, 2300, 208, 6, 27, 0),
  ('emzydinata', 'Bersenja gurau di tepian pantai Gorontalo. 

#gorontalo #gorontalounite #kurenai #travel', '2026-06-18 04:07:00+08', 'https://www.instagram.com/reel/DZuYp-Rp7i2/', 'Reel', 'Untold Story', false, 'published', 0, false, 35517, 25229, 1970, 226, 10, 28, 0),
  ('rachmatgobel_rg', 'Setelah Pentadio Resort dan Menara Pakaya, kini saatnya giliran Taman Limboto. 

Saya selalu percaya, sebuah ruang publik bukan hanya tentang tempat, tetapi tentang kenangan, kebanggaan, dan harapan yang tumbuh di dalamnya.

Karena itu, pelan-pelan kita mulai merevitalisasi Taman Limboto. Sebagai bagian dari ikhtiar ini, saya menghadirkan sesuatu yang spesial: videotron bundar pertama di Indonesia. Bukan sekadar untuk tampil berbeda, tetapi untuk menghadirkan ruang yang lebih hidup, modern, dan bisa dinikmati seluruh masyarakat.

Bagi saya pribadi, ini adalah persembahan untuk Gorontalo: tanah leluhur yang selalu punya tempat istimewa di hati. 

Tahun ini juga menjadi momen 70 tahun ‘Gobel Group Mengabdi Untuk Negeri’. Dan saya ingin perjalanan panjang itu meninggalkan jejak yang bisa dirasakan langsung oleh masyarakat.

Prosesnya masih terus berjalan. Sedikit demi sedikit akan kita sempurnakan, agar Taman Limboto hadir dengan wajah baru dan menjadi ikon baru Gorontalo yang membanggakan.

Mohon doa dan dukungannya. Kita bangun bersama, untuk hari ini dan untuk generasi yang akan datang.

#rachmatgobel #gorontalo #tamanlimboto #menarapakaya', '2026-06-18 08:24:00+08', 'https://www.instagram.com/reel/DZu2aNEhvkr/', 'Reel', 'Sponsored', true, 'published', 0, false, 200007, 119093, 12631, 1818, 197, 193, 0),
  ('rachmatgobel_rg', 'Hari ini saya kembali melihat perkembangan revitalisasi Menara Pakaya.

Bagi banyak orang, ini mungkin hanya sebuah menara. Tapi bagi masyarakat Gorontalo, Menara Pakaya adalah simbol kebanggaan, simbol keagungan, dan salah satu wajah yang selalu membawa cerita tentang daerah ini.

Karena itu, yang kita lakukan bukan mengubah identitasnya, tetapi mempercantik, menata kembali, dan menghadirkan suasana yang lebih hidup agar tetap relevan dan semakin membanggakan untuk generasi berikutnya.

Dengan sentuhan baru dan pembenahan di sekitar menara, harapannya tempat ini bukan hanya jadi ruang publik yang nyaman, tapi juga destinasi yang membuat orang ingin datang, menikmati, dan kembali lagi. 

Yang lama tetap kita jaga, yang baru kita hadirkan.
Tunggu wajah baru Menara Pakaya ya..

#rachmatgobel #gorontalo #menarapakaya', '2026-06-16 03:34:00+08', 'https://www.instagram.com/reel/DZpL7hZBRBu/', 'Reel', 'Sponsored', true, 'published', 0, false, 436777, 72118, 7068, 337, 157, 127, 0),
  ('rachmatgobel_rg', 'Pentadio punya cerita dan kenangan buat banyak orang. Sekarang saatnya menghadirkan energi baru.

Kawasan ini sedang kita revitalisasi dan kita tambah dengan wahana-wahana baru supaya jadi lebih hidup, lebih modern, dan makin menarik untuk dikunjungi. Terutama dalam menyambut PENAS XVII di Gorontalo. 

Harapannya sederhana: semakin banyak orang datang, semakin besar juga peluang yang tercipta untuk masyarakat dan pelaku usaha di sekitarnya.

Pelan-pelan kita benahi, supaya nanti saat re-opening tiba, Pentadio bisa hadir dengan pengalaman yang lebih seru dan jadi kebanggaan bersama.

Ditunggu ya… Pentadio dengan wajah barunya. 

#rachmatgobel #gorontalo #pentadioresort', '2026-06-15 23:53:00+08', 'https://www.instagram.com/reel/DZoyaZMhRLO/', 'Reel', 'Sponsored', true, 'published', 0, false, 142577, 89580, 8702, 1930, 139, 175, 0),
  ('armand_imban', 'Makin cakep aja nih pemandangan malam kota Gorontalo sama lagu kanda dinda 😄

My Little Bolu Ketan Bossanova 🎵

#gorontalo #saturdaynight #mylittleboluketan #bahlil #mbg', '2026-05-30 09:53:00+08', 'https://www.instagram.com/reel/DY-Fj9ayELw/', 'Reel', 'Lifestyle', false, 'published', 0, false, 42454, 22473, 854, 37, 6, 22, 0),
  ('3secondstoregorontalo', 'Ngopi santai, ngobrol tanpa batas, ditemani lampu lampu dan suasana yang bikin betah ✨

Rabu-Rabu Ngopi di 3Second Space kemarin sukses bikin parkiran berubah jadi tempat paling cozy buat kumpul bareng 🔥

Mulai dari kopi favorit, mobil kece, sampai cerita seru bareng teman-teman jadi satu malam yang susah dilupain 😎

Terima kasih buat semua yang sudah datang dan meramaikan malam ini 🙌

Siap buat nongkrong lebih rame lagi di event berikutnya? 👀☕🎶

#RabuRabuNgopi #3SecondSpace #NgopiBareng #CoffeeNight #GorontaloHits', '2026-05-21 04:03:00+08', 'https://www.instagram.com/reel/DYmSrLsJBSc/', 'Reel', 'Sponsored', true, 'published', 0, false, 56492, 33132, 828, 39, 17, 6, 0),
  ('gorontalo.unite', 'Ujan-ujanan pake aerox, beda yaa rasanya ujan-ujanan pake Ferrari di Gorontalo. Mungkin ini pertama kali liat ada Ferrari melintas di Gorontalo. 

Wilkomen to Hulonthalo, @papipcelebes', '2026-05-19 01:30:00+08', 'https://www.instagram.com/reel/DYg2-lWuSOD/', 'Reel', 'Lifestyle', false, 'published', 0, false, 95896, 49693, 2403, 599, 19, 144, 81),
  ('gorontalo.unite', 'Ritme kota tak harus selalu bising mesin. Kadang, ia berdetak dari kayuhan pedal yang konsisten.

Aparatur Negara Bersepeda hadir sebagai ajakan sederhana dengan dampak luas: lebih sehat, lebih hemat, dan lebih ramah lingkungan.

Nikmati paket bersepeda spesial untuk ASN, TNI, dan POLRI, di Global Sepeda, Jl. HB Jassin, Kel. Limba U2, Kota Gorontalo dan juga di Toko Cahaya Anugrah Tamalate & Cahaya Anugrah Telaga untuk pilihan sepeda favoritmu. Periode terbatas sampai 31 Mei 2026.

Setiap kayuhan bukan sekadar perjalanan, tapi langkah menuju gaya hidup yang lebih baik.

Sudah siap beralih ke dua roda?', '2026-05-03 17:04:00+08', 'https://www.instagram.com/reel/DX5VaCQTfvm/', 'Reel', 'Sponsored', true, 'published', 0, false, 38250, 20587, 908, 239, 9, 96, 34),
  ('gorontalo.unite', '📢 SEGERA DIBUKA❗️
Persiapkan nyalimu warga Gorontalo

Kereta Hantu Pertama di Gorontalo telah tiba ❗️🚂👻

“Stasiun Angker Gorontalo”
03 April - 17 Mei 2026

BUKA SETIAP HARI
Senin - Minggu : 13.00 - 22.00 WITA
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
#rumahhantuindonesia', '2026-03-31 02:02:00+08', 'https://www.instagram.com/reel/DWiwLXOji70/', 'Reel', 'Sponsored', true, 'published', 0, false, 45017, 22527, 889, 1110, 14, 61, 60),
  ('yourkyutgel', 'panas, sepi, tapi somehow nyaman 🌿☀️🌊 Kabila Bone #gorontalo', '2026-03-22 02:16:00+08', 'https://www.instagram.com/reel/DWLl5Umk67m/', 'Reel', 'Tourism', false, 'published', 0, false, 28440, 3145, 72, 3, 0, 0, 0),
  ('fadelmuhammadofficial', 'Mampir sejenak di Rumah Makan Bumela setelah perjalanan dari Boalemo. Menikmati Milu Pulo (Jagung Ketan) yang kenyal dan Ilabulo khas Gorontalo yang gurih rempah. Perpaduan rasa autentik yang selalu bikin rindu. Jangan sampai terlewat kalau melintas di jalur ini! 🌽✨', '2026-03-19 00:13:00+08', 'https://www.instagram.com/reel/DWDp6ggE872/', 'Reel', 'Culinary', false, 'published', 0, false, 30047, 18268, 1007, 16, 37, 15, 0),
  ('donikadir', 'Malam pasang lampu (Tumbilotohe) adalah tradisi Turun temurun Masyarakat Gorontalo yang di lakukan di malam ke 27 Ramadhan sampai malam Takbiran nanti 😍✨

#hulondalolipuu #gorontalo #tradisi #tumbilotohe #ramadhan2026🕌☪️', '2026-03-17 08:32:00+08', 'https://www.instagram.com/reel/DV_ZdP-iV2q/', 'Reel', 'Culture', false, 'published', 0, false, 36785, 19836, 1005, 54, 3, 6, 0),
  ('galeryboalemo', 'Historia Malam tumbilotohe di alun alun Tilamuta. 

Video @yowan_ahmad @sai.alan 

#tumbilotohe #tilamuta 
#boalemo #galeryboalemo', '2026-03-17 04:26:00+08', 'https://www.instagram.com/reel/DV-9TpGkndG/', 'Reel', 'Culture', false, 'published', 0, false, 28342, 14008, 630, 19, 4, 3, 0),
  ('gorontalo.unite', 'Sedikit refleksi atas diri sendiri, yaa karena adminnya juga manusia, memiliki perasaan, memiliki rasa bersalah. Bagaimana dalam menjalani Ramadan secara sungguh-sungguh, tapi tetap saja merasa ada yang kurang. 

Oh iya, ini suasana Tumbilotohe di Masjid Bambu.', '2026-03-17 10:24:00+08', 'https://www.instagram.com/reel/DV_mduWEyET/', 'Reel', 'Culture', false, 'published', 0, false, 20683, 10185, 702, 1, 0, 1, 16),
  ('gorontalo.unite', 'Tumbilotohe adalah cara masyarakat Gorontalo merawat kebersamaan; menyalakan lampu secara sukarela tanpa meminta subsidi, karena mereka tahu bahwa cahaya paling tulus lahir dari ketulusan jiwa.

Berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-03-16 14:06:00+08', 'https://www.instagram.com/reel/DV9bK8QEzC9/', 'Reel', 'Untold Story', false, 'published', 0, false, 76310, 50062, 2530, 594, 55, 24, 84),
  ('gorontalo.unite', 'Kalo kemaren torang cerita tentang Sultan Amay yang effortnya sampe masuk Islam demi melamar pujaan hatinya, Boki Owutango, trus sampe bangun masjid sebagai bukti cintanya, Nah kali ini giliran cerita tentang Pak Darda Daraba mantan Sekda Provinsi Gorontalo yang membangunkan masjid untuk istrinya, yang seorang mualaf.

Dari kisah ini, ada pesan sederhana, kalo cinta yang tulus itu, selalu menemukan jalannya sendiri.

Berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-03-16 00:20:00+08', 'https://www.instagram.com/reel/DV76d13zspq/', 'Reel', 'Untold Story', false, 'published', 0, false, 15834, 10458, 888, 37, 48, 5, 36),
  ('gorontalo.unite', 'Sesuai namanya, keunikan masjid tersebut karena konstruksinya banyak menggunakan bambu, yang menciptakan nuansa berbeda. Tapi tahukah kamu, kalo dulunya lahan ini jadi tempat orang-orang bermain judi.

Sekarang, bangunannya terus berkembang, jadi lebih rapi dan menarik minat setiap orang yang mampir.

Berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-03-16 02:30:00+08', 'https://www.instagram.com/reel/DV8LqKlzP6-/', 'Reel', 'Untold Story', false, 'published', 0, false, 9046, 6082, 360, 16, 10, 8, 20),
  ('gorontalo.unite', 'Ada semacam ritual tak tertulis yang selalu terulang setiap Ramadan menjelang selesai: Lebaran rasanya kurang lengkap kalau nggak ada amplop berisi uang baru.

Padahal kalau dipikir-pikir, uang itu tetap uang. Mau baru atau lusuh, nilainya sama.

Berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-03-13 00:30:00+08', 'https://www.instagram.com/reel/DV0Pi0HTsys/', 'Reel', 'Untold Story', false, 'published', 0, false, 5582, 3182, 70, 0, 0, 0, 2),
  ('gorontalo.unite', 'Masjid ini berdiri bukan karena nazar, tapi karena satu laki-laki yang ingin menikahi satu perempuan. Jadi begini ceritanya. Namanya Sultan Amay. Pada abad ke-14 akhir, Beliau naksir berat sama Putri Boki Antungo dari Kerajaan Palasa. Tapi, tunggu dulu, Putri ini cuma kasih satu syarat. Sultan Amai harus masuk Islam terus bangun masjid sebagai mahar.

long story short, dibangunlah Masjid Hunto ini. Sultan tidak cuma menjanjikan cinta, tapi janji yang manfaatnya buat banyak orang. Dan 500 tahun kemudian, bangunannya masih tegak berdiri. 

Berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-03-05 05:11:00+08', 'https://www.instagram.com/reel/DVgPikLE7N4/', 'Reel', 'Untold Story', false, 'published', 0, false, 37025, 23527, 2194, 143, 73, 16, 147),
  ('gorontalo.unite', 'Buka puasa di pasar ini rasanya beda. Ini bukan sekadar pasar; ini adalah ruang rindu, karena hampir semua sajiannya mendisplay banyak hal. tentang kampung, tentang kebersamaan, tentang cara sederhana untuk tetap merasa pulang.

Nanti kapan-kapan, coba ajak orang-orang terdekatmu cobain jajanan disini. Rasanya bikin gak bisa move on. 

Hari ke-9 berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-02-28 07:17:00+08', 'https://www.instagram.com/reel/DVTmcHiktC-/', 'Reel', 'Untold Story', false, 'published', 0, false, 6684, 4180, 71, 13, 0, 2, 1),
  ('matalangit_gorontalo', 'Tempat  Nongrong baru di Kota Gorontalo yang aman,tentram dan asik', '2026-02-28 03:01:00+08', 'https://www.instagram.com/reel/DVTJOB0koAD/', 'Reel', 'Lifestyle', false, 'published', 0, false, 44705, 23063, 1060, 115, 9, 15, 0),
  ('gorontalo.unite', 'Karena pada akhirnya, buka puasa di masjid bukan cuma soal makan gratis, tapi rasa ditemani. Buka puasa di masjid bikin beban terasa lebih ringan, karena ternyata kita nggak sendirian jalaninnya. 

Hari ke-6 berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-02-24 04:28:00+08', 'https://www.instagram.com/reel/DVJAHUvEn2J/', 'Reel', 'Untold Story', false, 'published', 0, false, 15167, 12019, 45, 7, 1, 1, 2),
  ('bagiro.am', 'Kota Gorontalo dijuluki sebagai kota serambi Madinah, warga Gorontalo absen dulu.. waktunya singkat jadi cuman punya footage ini.. 

#gorontalo #kotagorontalo', '2026-02-21 01:56:00+08', 'https://www.instagram.com/reel/DVBACGaiTpC/', 'Reel', 'Lifestyle', false, 'published', 0, false, 289505, 196466, 17495, 1479, 81, 251, 0),
  ('gorontalo.unite', 'Sahur pertama di Gorontalo menunya hampir selalu ayam. Seolah-olah Ramadan tidak benar-benar dimulai tanpa aroma itu.

Orang tua dulu menyebutnya “huwi lo yimelu” yang maknanya kurang lebih malam penyambutan. 

Jadi, sahur dengan ayam itu salah satu bentuk ekspresi kegembiaraan menyambut Ramadan, yang dirayakan keluarga-keluarga di Gorontalo.

Hari ke-3 berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-02-20 11:30:00+08', 'https://www.instagram.com/reel/DU_c97ck4bX/', 'Reel', 'Untold Story', false, 'published', 0, false, 12577, 9070, 95, 17, 1, 15, 3),
  ('gorontalo.unite', 'Setiap awal Ramadan atau sebelum Ramadan, di Gorontalo pasti ada yang namanya tradisi Mongaruwa. 

Mongaruwa adalah cermin orang Gorontalo, bahwa ibadah yang sejati berawal dari hati yang damai dan jiwa yang telah saling memaafkan. Dari sinilah, Ramadhan disambut dengan tangan terbuka dan batin yang telah bersiap. 

Hari ke-2 berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-02-19 11:34:00+08', 'https://www.instagram.com/reel/DU84yTdk_-O/', 'Reel', 'Untold Story', false, 'published', 0, false, 7826, 4597, 129, 4, 0, 0, 5),
  ('gorontalo.unite', 'Koko’o itu bukan cuma buat bangunin sahur. Tapi wujud kebahagiaan warga Gorontalo karena dipertemukan lagi dengan Ramadan. 😍

Hari Pertama berbagi #CeritaRamadandiGorontalo bersama @papipcelebes', '2026-02-18 13:14:00+08', 'https://www.instagram.com/reel/DU6fPjzEzP1/', 'Reel', 'Untold Story', false, 'published', 0, false, 13508, 8428, 79, 24, 3, 0, 4),
  ('bagiro.am', 'akhirnya salah satu wishlist tahun ini main bareng hiu paus tercapai di gorontalo.. thanks buat tim dari @blue.gto 🦈

#whaleshark #gorontalo', '2026-02-14 03:13:00+08', 'https://www.instagram.com/reel/DUvHW_pCQSR/', 'Reel', 'Tourism', false, 'published', 0, false, 48513, 33737, 3074, 110, 13, 119, 0),
  ('gorontalo.unite', 'Kita selalu mengira umroh hanyalah soal jarak dan biaya. Tentang angka yang tak ramah bagi dompet, tentang mimpi yang terasa terlalu jauh bagi mereka yang hidupnya akrab dengan hitung-hitungan harian.

Bagi sebagian orang, niat saja belum cukup. Doa terus dipanjatkan, tapi langkah sering tertahan keadaan. Bekerja setiap hari, menabung sedikit demi sedikit, lalu kembali mengalah pada kebutuhan yang lebih mendesak. Umroh menjadi kata yang indah, namun kerap hanya berani disebut pelan-pelan, agar tak terdengar seperti harapan yang terlalu tinggi.

Hingga suatu hari, @papipcelebes datang. Tanpa janji besar, tanpa sorotan. Hadir tanpa ingin disebut, memberi tanpa hitung-hitungan. Tangannya terbuka, hatinya lebih dulu sampai. 

Di titik itu kita sadar, kesempatan tak selalu lahir dari kekuatan sendiri, tapi dari keikhlasan orang lain.', '2026-02-06 05:11:00+08', 'https://www.instagram.com/reel/DUauW0KkiON/', 'Reel', 'Lifestyle', false, 'published', 0, false, 35915, 24884, 247, 6, 6, 8, 5),
  ('gorontalo.unite', 'Daftar nama-nama Pasukan Rela Mati yang jalan kaki dari Suwawa bersama ti Pak Nani Wartabone, tepat 84 tahun lalu. 

Bayangkan, mereka bukan sekedar menghadiri seremoni, tapi bertaruh nyawa demi satu tujuan. Gak usah tanya lagi effortnya bagaimana. Bahkan Jenderal AH Nasution kagum dan bangga bersahabat dengan Nani Wartabone, seorang petani, seorang panglima perang, bersama pasukannya. 

Arsip: keluarga H. Nani Wartabone', '2026-01-22 18:29:00+08', 'https://www.instagram.com/reel/DT1hvcokv5S/', 'Reel', 'Culture', false, 'published', 0, false, 28992, 15259, 1094, 31, 12, 21, 60),
  ('lecka_smenkqiuw', 'Destinasi di Gorontalo Yang Wajib Kalian Kunjungi di 2026, Yuk Book Trip sekarang di 085255625323
.
.
#gorontalo #tripgorontalo #hiupaus #pesonaindonesia #aryanbykadena', '2026-01-08 18:05:00+08', 'https://www.instagram.com/reel/DTRcPyDDy8K/', 'Reel', 'Tourism', false, 'published', 0, false, 71255, 48306, 3047, 970, 35, 75, 0),
  ('juliorumansi', 'sunset yang indah karna tidak ada mantan disana. pokoknya bgt.

rushguard yang selalu melindungi kekecean @bottomhead_ 

#sunset🌅 #sunset_hub #freedive', '2025-12-28 00:17:00+08', 'https://www.instagram.com/reel/DSzNOO8CUL-/', 'Reel', 'Tourism', false, 'published', 0, false, 25403, 12602, 1131, 30, 5, 45, 0),
  ('connextion.25', 'Looking for entertainment that’s both fun and relatable? 🤔Here’s the answer! ✨', '2025-12-17 05:47:00+08', 'https://www.instagram.com/reel/DSXeRcuktMW/', 'Reel', 'Event', false, 'published', 0, false, 20892, 11049, 140, 32, 1, 8, 0),
  ('gorontalo.unite', 'Everbest lagi ada promo terbesar sepanjang tahun, guys! 

End of Season Sale dengan special offer PAY 1 GET 2 yang bikin kamu bisa dapetin dua item premium hanya bayar satu aja. 

Cocok banget buat persiapan gifting season, entah buat Hari Ibu, Natal, atau Tahun Baru, bisa sekalian beli untuk diri sendiri plus kado orang tersayang tanpa bikin dompet nangis!

Kualitas Everbest emang nggak pernah mengecewakan, ya. Dari desainnya yang timeless dan elegan, sampai kenyamanan yang juara.

Cek langsung ke store Everbest di Citimall Gorontalo atau langsung cek online di id.everbestshoes.com, karena promo Pay 1 Get 2 ini hanya sampai 11 Januari 2026! 

@everbestofficial
#EverbestIndonesia #EverbestEndOfSeasonSale', '2025-12-17 19:18:00+08', 'https://www.instagram.com/reel/DSY658lEuzN/', 'Reel', 'Sponsored', true, 'published', 0, false, 21202, 14814, 80, 18, 49, 0, 5),
  ('riche.indonesia', 'Akhirnya selangkah lagi ketemu Sherly di Gorontalo!

Jangan lupa, event kuliner terbesar menghadirkan makanan viral, unik, dan beda by @gebyarkuliner.id 
hadir untuk pertama kalinya di Gorontalo!

Ada pastry kalkun by @riche.indonesia dan burger kalkun by @briche.indonesia
📍 Citimall Gorontalo (Area Parkir Timur)
🗓 17-21 Desember 2025

@citimall_gorontalo 
#letsberiche #pastrykalkun #gorontalo', '2025-12-16 02:07:00+08', 'https://www.instagram.com/reel/DSUfB4QD3sG/', 'Reel', 'Event', false, 'published', 0, false, 120255, 51173, 536, 258, 7, 32, 0),
  ('gorontalo.unite', 'Dirintis sejak tahun 2017, kemungkinan terealisasi Insya Allah sebentar lagi. And here we go, Gorontalo akan punya masjid raya sendiri. 

Pemerintah Provinsi Gorontalo meletakan pondasi batu pertama pembangunan Gorontalo Islamic Center, Jum’at 12 Desember 2025 di Desa Talulobutu Selatan, Kecamatan Tapa, Kabupaten Bone Bolango.', '2025-12-11 17:53:00+08', 'https://www.instagram.com/reel/DSJUoL-koiK/', 'Reel', 'Culture', false, 'published', 0, false, 24163, 11604, 817, 44, 6, 30, 15),
  ('gorontalo.unite', 'Kemarin ada yang cerita. Kota yang baik harusnya berlandaskan keramahan, keadilan, dan keberlanjutan (seperti konsep Liveable City). Bukan berdasarkan arogansi apalagi semau gue. Ini kita lagi bicarakan kota yang ramah bagi siapa saja. Bukan kota yang marah-marah ke siapa saja. 

Jadi, malam ini kita bersuka-suka kemana? 
@berliannhiola', '2025-11-15 03:36:00+08', 'https://www.instagram.com/reel/DRE1S5qkgjn/', 'Reel', 'Lifestyle', false, 'published', 0, false, 26451, 12407, 637, 52, 8, 93, 6),
  ('arabmaklum88', 'GORONTALO RASA BANGKOK🥳
Festival Kuliner Terbesar dalam sejarah Gorontalo😍
Merupakan Thailand Streetfood Event Kuliner terbesar No. 1 di Indinesia dari @roadshowkulinerviralindonesia ada 200 tenant dan 1000 variant menu🥰

📍Citimall Gorontalo || @citimall_gorontalo 
🗓️ 22 Oktober - 02 November 2025
⏰ 10:00 - 22:00 WITA
#fyp #gorontalo #roadshowkulinerviralindonesia #gorontalorasabangkok #likegorontalo #gorontalohits #gorontalounite #gorontalocity #instagood #instafood #reels #sulawesi #kulinerthailand #streetfoodthailand #streetfood #instagram #foodvlogger #reviewmakanan #rekomendasimakanan #enak #arabmaklum', '2025-10-23 01:56:00+08', 'https://www.instagram.com/reel/DQJUKEGkYD-/', 'Reel', 'Sponsored', true, 'published', 0, false, 28118, 14162, 442, 98, 4, 6, 0),
  ('gorontalo.unite', 'EVENT KULINER NO.1 TERBESAR DI INDONESIA🔥

📍Citimall Gorontalo
22 Oktober - 2 November 2025
Pukul 10.00 - 22.00 WITA

Jangan lupa datang untuk rasakan jajan dengan vibes streetfood Bangkok ya warga Gorontalo‼️

Ada lebih dari 200 tenant dengan 1000 varian menu yang WAJIB kalian cobain😍

See you warga Gorontalo👋🏻👋🏻

@roadshowkulinerviralindonesia
@citimall_gorontalo

#gorontaloasabangkok #gsfoodmanagement #roadshowkulinerviralindonesia #kulinergorontalo #kulinerviral #citimallgorontalo', '2025-10-19 21:37:00+08', 'https://www.instagram.com/reel/DQBPW9jjlm_/', 'Reel', 'Sponsored', true, 'published', 0, false, 20301, 11826, 370, 443, 6, 22, 25),
  ('joshberlari', 'Pelari adalah orang-orang luar biasa. Kita sering memberi tekanan besar pada diri sendiri — dan itu ada alasannya. Lari adalah salah satu dari sedikit olahraga di mana kamu tidak bisa bergantung pada siapa pun, dan tidak bisa menyalahkan siapa pun. Waktu finismu adalah cerminan langsung dari kerja kerasmu — setiap pagi buta, setiap sesi berat, setiap langkah yang kamu ambil 🔥 #Lari #Cepat #Motivasi #Running #KerjaKeras #Semangat #LariTerus #BuleLariGila #RaceDay #NoExcuses', '2025-10-15 02:00:00+08', 'https://www.instagram.com/reel/DP0vZSdkvG1/', 'Reel', 'Event', false, 'published', 0, false, 76952, 47527, 1404, 37, 11, 47, 0),
  ('oceanala.id', 'Kejutannya suka ada ajaa ✨🥹😭 SPEECHLESS! Gak nyangka bisa lihat lumba-lumba sedekat ini. Laut, kamu selalu punya cara bikin jatuh cinta lagi. 💙 
-
#KelanaKemana lagi kita berikutnya? 👀🌴
Tag geng kamu di kolom komentar dan siapin jadwal buat explore bareng #Oceanala dan jadi #GengNala berikutnya! 💙💖

 #WanderDiveProtect', '2025-10-14 04:54:00+08', 'https://www.instagram.com/reel/DPydug3kYa4/', 'Reel', 'Tourism', false, 'published', 0, false, 26897, 12133, 1160, 123, 0, 96, 0),
  ('elproduction_id', 'Gorontalo menggemaa!!!

Walau sempat tertunda tetapi tidak membuat euforia X-Friends Gorontalo meredup! Malah semakin menyalaa!

Kita mengucapkan terimakasih sebanyak-banyaknya untuk seluruh masyarakat yang sudah meramaikan acara kita dengan tertib, dan juga untuk para sponsor, panitia pelaksana & semua pihak terkait!

Sampai bakudapa Gorontalo!

#TroyProject
#TipeXdiGorontalo #TipeXorcheska #Orcheska #TipeX #3DekadeTipeX #TipeXday #Ska #Xelebration #IndoneSka', '2025-10-05 00:10:00+08', 'https://www.instagram.com/reel/DPaywwCE3qk/', 'Reel', 'Event', false, 'published', 0, false, 60331, 33840, 1064, 30, 7, 12, 0),
  ('ayhuismail', 'Di Gorontalo ada apa?
Ada Karnaval Karawo yg digelar setiap tahunnya selalu meriah dan petcaaahhh 😍✨
@karnaval_by_ariezjamil team @bank_indonesia_gorontalo 🦅', '2025-09-28 17:11:00+08', 'https://www.instagram.com/reel/DPKl2WCknzy/', 'Reel', 'Culture', false, 'published', 0, false, 79692, 33512, 1594, 12, 27, 25, 0),
  ('ayhuismail', 'Tabobale bale gak tuh 🤣 bersama pasukan burung kutilang sayap 35kg ini. Wkwkwk
@karnaval_by_ariezjamil #fyp #gtlo #karnaval #karnavalkarawo #gorontalokarnavalkarawo #gkk2025 #parade #carnival #karawo', '2025-09-27 02:04:00+08', 'https://www.instagram.com/reel/DPGZLsTkRtC/', 'Reel', 'Culture', false, 'published', 0, false, 90729, 36397, 2017, 36, 15, 54, 0),
  ('gorontalo.unite', 'Sebelum ke konser, jangan lupa makan, jangan lupa mandi, jaga stamina, jangan bawa barang berharga, kita orcheSKA bareng di Stadion Merdeka. 

Banyak area parkir sepanjang Jl. Achmad Nadjamudin, tapi direkomendasikan yang tidak merepotkan. 

Jangan ragu bertanya ke @elproduction_id untuk hal-hal yang bikin nyaman. Polisi akan berjaga dibarikade dan dibeberapa titik untuk kenyamanan juga.', '2025-09-26 23:02:00+08', 'https://www.instagram.com/reel/DPGEm4zkgyn/', 'Reel', 'Sponsored', true, 'published', 0, false, 22779, 11735, 373, 22, 2, 6, 4),
  ('gorontalo.unite', 'Jalan kita sebenarnya searah, seperti melewati Jl. Nani Wartabone ini malam hari, hanya tujuannya aja yg berbeda.

Tanpa kita sadari kita punya persamaan, kita sama-sama mengagumi seseorang. aku mengagumimu dan kamu mengagumi dia, yang juga mengagumi orang lain. Dahlah, jangan masukin di hati.', '2025-09-22 05:27:00+08', 'https://www.instagram.com/reel/DO54dItErrz/', 'Reel', 'Lifestyle', false, 'published', 0, false, 25515, 13433, 649, 17, 3, 26, 24),
  ('hndnclarista_', 'semua cerita seru ini makin lengkap karena stay di Yulia Hotel 🏨💫.
Tempatnya nyaman, strategis, bikin perjalanan explore Gorontalo jadi makin effortless & memorable 🫶🏻🤍

So, kalau next trip ke Gorontalo ➡️ jangan lupa, Explore More, Stay at Yulia Hotel! 🌟

#exploregorontalo #fyp #reels', '2025-09-11 08:14:00+08', 'https://www.instagram.com/reel/DOd3AjOgTvD/', 'Reel', 'Tourism', false, 'published', 0, false, 21547, 11194, 382, 6, 5, 15, 0),
  ('elproduction_id', '~Oh, jang lanjut chat nanti laba 
Shareloc saja ko di mana,bakudapa (bakudapa)~

Siapa nih yg bacanya bernada juga??

Gorontalo kita ada yang spesial nih sebagai pengganti, karena udah pada setia nungguin Troy Project OrcheSKA di Gorontalo! Toton Caribo @totoncaribo bakal jadi Additional line up kita buat meriahin tour Tipe-X kali ini!

Jangan sampai kehabisan tiketnya! Segera amankan dengan cara klik link yang ada di bio ig @elproduction_id , atau scan barcode yang tertera!

See you Gorontalo!

#TroyProject
#TipeXdiGorontalo #TipeXorcheska #Orcheska #TipeX #3DekadeTipeX #TipeXday #Ska #Xelebration #IndoneSka', '2025-09-11 22:47:00+08', 'https://www.instagram.com/reel/DOfa-ITk6qo/', 'Reel', 'Sponsored', true, 'published', 0, false, 38625, 24994, 478, 120, 6, 25, 0),
  ('rachmatgobel_rg', 'Terima kasih masyarakat Boalemo, jajaran pemerintah setempat, dan para pelaku UMKM serta pelaku kreatif yang sudah mendukung suksesnya gelaran hari pertama Festival Balon Udara Gorontalo 2025. 

Kehadiran festival ini bukan hanya sekedar hiburan, tapi juga untuk mengangkat pariwisata dan memberi ruang bagi UMKM agar terus berkembang. 

Mari bersama kita jadikan Gorontalo semakin dikenal & dicintai. 

#rachmatgobel #gorontalo #festivalbalonudaragorontalo', '2025-09-06 01:12:00+08', 'https://www.instagram.com/reel/DOQOPEHAdc3/', 'Reel', 'Sponsored', true, 'published', 0, false, 60853, 30931, 1497, 61, 12, 21, 0),
  ('rachmatgobel_rg', 'Alhamdulillah, hari kedua gelaran Festival Balon Udara Gorontalo 2025 berjalan dengan lancar. 

Terima kasih untuk kaka semua yang sudah datang dan meramaikan. Mari kita buat festival tahunan ini menjadi magnet pariwisata pariwisata Gorontalo semakin dikenal luas, juga ruang bagi UMKM semakin berkembang. 

Dari Gorontalo, untuk dunia! 

#rachmatgobel #gorontalo #festivalbalonudaragorontalo', '2025-09-06 22:10:00+08', 'https://www.instagram.com/reel/DOSekzPgZiE/', 'Reel', 'Sponsored', true, 'published', 0, false, 36607, 20734, 1178, 52, 6, 16, 0),
  ('rachmatgobel_rg', 'Bismillahirrahmanirrahim. 

Wololo habari, Gorontalo? 

Alhamdulillah setelah sukses di tahun lalu, sesuai komitmen saya dalam memajukan pariwisata & UMKM Gorontalo, tahun ini Festival Balon Udara Gorontalo hadir kembali. 

Catat waktu & tempatnya, jangan lupa ajak keluarga dan teman-teman datang ya. Salam pariwisata! 

#rachmatgobel #gorontalo #festivalbalongorontalo', '2025-08-30 05:11:00+08', 'https://www.instagram.com/reel/DN-oWAGAY0S/', 'Reel', 'Sponsored', true, 'published', 0, false, 52869, 29155, 1028, 177, 11, 15, 0),
  ('elproduction_id', 'Final Line Up GORONTALO!

Mana suaranya nih para X-friends Gorontalo!

Di event #troyproject kali ini, bakal di meriahkan juga sama @officialjabreak @djdesaofficial & @pacenenong199x !!

Tiket bisa kamu dapatkan melalui link yang tertera di bio ig @elproduction_id , melalui situs yesplis atau langsung scan barcode di akhir video!

Buletin tanggal di kalendermu biar ga kelewatan dan amankan tiketnya!

#TroyProject
#TipeXdiGorontalo #TipeXorcheska #Orcheska #TipeX #3DekadeTipeX #TipeXday #Ska #Xelebration #IndoneSka', '2025-08-28 22:19:00+08', 'https://www.instagram.com/reel/DN7Up93k9Jv/', 'Reel', 'Sponsored', true, 'published', 0, false, 63861, 37004, 806, 80, 13, 18, 0),
  ('emzydinata', '“Yang ku tunggu-tunggu akhirnya dateng lagi! Save & share, jangan lupa ramaikan ya guys!” - 👋🏻

#gorontalo #festivalbalonudaragorontalo #gorontalohits #gorontalounite', '2025-08-27 05:51:00+08', 'https://www.instagram.com/reel/DN2-S5dUp1U/', 'Reel', 'Untold Story', false, 'published', 0, false, 41783, 22474, 1124, 444, 10, 30, 0),
  ('emzydinata', '“Gorontalo cakep banget!” - 

#gorontalo #indonesatravel #gorontalounite #gorontalohits', '2025-08-03 04:06:00+08', 'https://www.instagram.com/reel/DM4_JQIxpxW/', 'Reel', 'Untold Story', false, 'published', 0, false, 37647, 21417, 1694, 171, 30, 76, 0),
  ('dki.coffee', 'Mo pulang atau mo ulang? 

#BukitRanjau #Gorontalo #DkiCoffee', '2025-07-21 05:28:00+08', 'https://www.instagram.com/reel/DMXquyjzlVc/', 'Reel', 'Lifestyle', false, 'published', 0, false, 20106, 11028, 284, 29, 7, 15, 0),
  ('gorontalo.unite', 'Bukan di JAKARTA tapi di GORONTALO ✅😎

Karena cuma disini yang jual kaos polos 40ribuan dan bisa sablon satuan mulai dari 10ribu aja ✌️😍

📣 SUPER LENGKAP & BANYAK PILIHAN SELAIN KAOS.
Yuk kepoin aja IG mereka di @cititex.gorontaloo ✨

📲 WA Medan : 0811 6482 307
——————————————————
🏠 Cititex Gorontalo
📍 Jl. Prof Dr. HB Jasin No.179, Limba U Dua, Kota Sel., Kota Gorontalo, Gorontalo 96136 (Samping Toko Istana Fashion)
📲 WA : 0811 6482 307

#PROMOBUY1GET1 #PromoGrandOpening #kaospolos #kaosmurah #kaospolosmurah #kaosgorontalo #sablonsatuan #sabloncustom #customsablon #kaosmurah #sablonmurah #kaosmurah #gorontalo #cititexgorontalo #gorontalohits #sablongorontalo', '2025-07-17 18:49:00+08', 'https://www.instagram.com/reel/DMOzOVhy1TZ/', 'Reel', 'Sponsored', true, 'published', 0, false, 30037, 15686, 447, 56, 2, 3, 40),
  ('berliannhiola', 'The best hidden gem ever in Gorontalo Waterfall 📍Desa Ilohuuwa kec,Bone Kab,bone bolango provinsi gorontalo .
Terima kasih banyak untuk @canyoneering_manado untuk kesempatannya membuka trip dan permainan extreme ini, sampai ketemu di trip selanjutnya 🙌🏻
#gorontalo #canyenooring #wisatagorontalo', '2025-07-06 10:53:00+08', 'https://www.instagram.com/reel/DLxnPFGzoCr/', 'Reel', 'Tourism', false, 'published', 0, false, 22009, 12318, 596, 91, 6, 19, 0),
  ('blue.gto', 'a moment that I still can''t believe until now. I can''t believe it because this moment is too beautiful for me.

GORONTALO WITH BLUE GTO

@goproid 
@gopro 
@gorontalo.unite 

#gorontalo #freedive #turtles #gopro', '2025-07-04 00:05:00+08', 'https://www.instagram.com/reel/DLrUUH2P5Lf/', 'Reel', 'Tourism', false, 'published', 0, false, 42874, 23498, 1398, 88, 128, 98, 0),
  ('deaind_', 'Pretty big baby "Whaleshark" ❤️

#gorontalo #whaleshark #whalesharkgorontalo #traveling #travelling #sulawesiutara #exploresulawesiutara', '2025-06-30 03:01:00+08', 'https://www.instagram.com/reel/DLhVR2azO9U/', 'Reel', 'Tourism', false, 'published', 0, false, 24876, 13304, 673, 19, 2, 47, 0),
  ('gorontalo.unite', 'Ada momen-momen di mana menemukan sepatu dan tas yang nyaman sekaligus anggun, terasa seperti hadiah.

And guess what? @everbestofficial is offering a little surprise: Pay 1, Get 2! Yes, really.

This offer runs only until July 23rd, 2025, in all Everbest stores across Indonesia and online. Jadi kalau kamu sedang menunggu waktu yang tepat untuk upgrade gaya, mungkin ini saatnya.

#EverbestIndonesia #EndOfSeasonSale', '2025-06-27 21:54:00+08', 'https://www.instagram.com/reel/DLboIuZu7he/', 'Reel', 'Sponsored', true, 'published', 0, false, 21638, 15320, 114, 18, 31, 0, 3),
  ('chendy_rey', 'disukai cowok❌
disukai hiu✅', '2025-06-24 03:11:00+08', 'https://www.instagram.com/reel/DLR5qd7Tlka/', 'Reel', 'Tourism', false, 'published', 0, false, 26384, 14177, 443, 26, 3, 1, 0),
  ('laila_kaluku', 'Tiap weekend ijin ke laut sama mamak be like. Kalo orang Gorontalo bilang “Jalo-jalo” atau ngomel2. 

Kalo kalian siapa yang suka marahin? 😂

📍Pulau Diyonumo, Kabupaten Gorontalo Utara
📹: @12ano_ 

#freedive #freediving #freediver #Indonesia #Gorontalo #nyelam #ocean', '2025-06-23 04:02:00+08', 'https://www.instagram.com/reel/DLPal1HTq10/', 'Reel', 'Tourism', false, 'published', 0, false, 37016, 20102, 492, 55, 6, 30, 0),
  ('exploreroncey', 'Jinak sangat , geram.. rasa macam nak bela sekor 🐳 
— kalau dia gigit fins pun takapa, dimaafkan sebab cute sangat🥰 

#explorewithoncey 
🤍👉🏻 Follow @exploreroncey & @explorewithoncey for more adventure | explore | outdoor & travel sharing ! 

Travel ebook di website www.exploreroncey.com atau boleh tekan link di bio .', '2025-06-18 07:32:00+08', 'https://www.instagram.com/reel/DLC6NGaT1I_/', 'Reel', 'Tourism', false, 'published', 0, false, 35069, 19032, 701, 29, 1, 22, 0),
  ('tripbarengisal', 'Each dive is a story captured forever.” 
.
.
.
.
.
#gorontalo #freedive #explore #underwater #instamood #tranding #sea', '2025-06-07 04:36:00+08', 'https://www.instagram.com/reel/DKmRQ38z0KK/', 'Reel', 'Tourism', false, 'published', 0, false, 21966, 13360, 473, 6, 1, 6, 0),
  ('emzydinata', '“Ada yang tau lokasinya dimana aja?” 👋🏻

#gorontalo #gorontalohits #travel #happyoceanday #hiupaus', '2025-06-07 18:05:00+08', 'https://www.instagram.com/reel/DKnuaRIzc1K/', 'Reel', 'Untold Story', false, 'published', 0, false, 56058, 32582, 2931, 336, 23, 79, 0),
  ('gorontalo.unite', 'Hiu paus datang tak pernah mengganggu kita. Tapi aktivitas kita di hulu bisa mengganggu mereka.

Penambangan di hulu mencemari laut di hilir. Limbah dan lumpur mengaburkan air, membunuh plankton, dan perlahan mengusir hiu paus dari rumah mereka.

Kalau laut adalah hidup, maka hulu adalah napasnya. Jaga hulumu, agar hilir tak mati pelan-pelan.

Mari kita mengurbankan ego yang ada dalam diri kita sejenak saja, karena dampaknya juga akan kita wariskan ke anak cucu kita nanti.', '2025-06-06 02:16:00+08', 'https://www.instagram.com/reel/DKjc4pST10Q/', 'Reel', 'Tourism', false, 'published', 0, false, 28129, 13268, 923, 32, 3, 3, 22),
  ('deadegobel_', 'Gorontalo dan alamnya tidak bercerita, tapi … LOOK AT THE VIEW! 

📍 @oluhuta.paradise 

#oluhutaparadise #wisatagorontalo', '2025-05-31 03:46:00+08', 'https://www.instagram.com/reel/DKUKgV3TKpM/', 'Reel', 'Tourism', false, 'published', 0, false, 26572, 12637, 715, 28, 11, 24, 0),
  ('blue.gto', 'terima kasih banyak teman teman sudah meramaikan laut gorontalo. sampai bertemu di fun dive vol.III nanti.

@asyrafalamri_official 
@arumoktaviyani 
@taufik.tuna 
@petty_fetri 
@reskazs_ 
@firmansyahhsn 
@mhmmadfaisalmuin 
@papa_br_03 
@tiarashrn16_ 
@fairel.athiz 
@idrus_imam 
@hendra_sude 
@o.hinta 
@syukron_cakra 
@alexsdrobina 
@rayalcantara50 
@van_akase 
@mul.ibrahim 
@stipodungge 
@dokrifki 
@rizalkops 
@israwandis 
@ainunbantali 
@arafwn 
@ir_rnda 
@rizalrazakk 
@deemayang 
@efrom
@andravito
@saktyyyyy 
@ed.sptra
@sf_gayabebas
@hendra_netral', '2025-05-31 23:19:00+08', 'https://www.instagram.com/reel/DKWQzEttJpw/', 'Reel', 'Tourism', false, 'published', 0, false, 25389, 12730, 221, 49, 14, 51, 0),
  ('monggaaa', '5 bulan full belajar, hari ini tong healing tipis” dulu uti nou ba velocity 🤤🔥🤘

Wearing @fleur_clothing.mdc 
#lccempatpilarmprri #lccempatpilar2025 #gorontalo #liveperformance', '2025-05-31 04:20:00+08', 'https://www.instagram.com/reel/DKUNwsqTss4/', 'Reel', 'Sponsored', true, 'published', 0, false, 53031, 29975, 699, 28, 12, 10, 0),
  ('gorontalo.unite', 'Tidak ada perjalanan yang lebih menguras isi hati selain perjalanan menuju Baitullah. Dan ketika suatu saat kamu kembali lagi, selamanya hatimu akan tertinggal disana. 

Selamat menunaikan Ibadah Haji, 987 warga Gorontalo yang tergabung dalam kloter UPG 28, 30, dan 32.

video @lisa_purawinata', '2025-05-21 14:34:00+08', 'https://www.instagram.com/reel/DJ7kq_jzH3j/', 'Reel', 'Culture', false, 'published', 0, false, 39247, 20949, 2243, 215, 10, 30, 25),
  ('alhamhabibie', 'Aktifitas minggu pagi warga kota gorontalo yang diawali dengan lari pagi di sepanjang jalan Panjaitan. Semoga budaya lari ini semakin banyak peminatnya dan memberikan dampak positif bagi kesehatan warga.', '2025-05-17 18:37:00+08', 'https://www.instagram.com/reel/DJxtbrnTSPW/', 'Reel', 'Lifestyle', false, 'published', 0, false, 26068, 13598, 952, 27, 5, 25, 0),
  ('gorontalo.unite', 'Bisa lari pagi dengan pemandangan seperti ini, pemandangan sawahnya yang bagaikan hamparan permadani di lahan yang luas sekaligus bisa menghirup udara tanpa polusi, adalah salah satu bentuk kemewahan tersendiri.

Jika sempat, sesekali cobain deh. Ini di Desa Bubeya, tidak jauh dari makam pahlawan nasional, H. Nani Wartabone. 

@raflypiaggio', '2025-05-04 16:15:00+08', 'https://www.instagram.com/reel/DJP-4aGzbl4/', 'Reel', 'Lifestyle', false, 'published', 0, false, 26130, 14757, 1437, 220, 16, 53, 71),
  ('gorontalo.unite', 'Rekayasa Jalan dengan Sistem Satu Arah akan diberlakukan di Jl. Nani Wartabone (eks Jl. Panjaitan) dan juga Jl. Jend. Sudirman.

Jalan Satu Arah mulai dari Tugu Saronde (Jl. Nani Wartabone) sampai depan Kampus UNG. Yang kedua, Jl. Jend. Sudirman (depan Kampus UNG) sampai di simpang tiga RRI. 

Uji coba Rekayasa Jalan dengan Sistem Satu Arah mulai tanggal 1 Mei 2025. Wololo?', '2025-04-26 03:21:00+08', 'https://www.instagram.com/reel/DI5_xTKSnfA/', 'Reel', 'Lifestyle', false, 'published', 0, false, 101869, 60855, 2080, 525, 184, 100, 90),
  ('pyurforyou_gto', 'Ngoni mangaku anak keren sulawesi bagian atas? So pernah Ba Velocity? Kalo ba velocity deng taman-taman sambil nongki di Pyur For You Gorontalo? Ngoni Rasa Dulu Depe Sensasi Boss!!!

Karna Samua Samua 
Hanya Untuk Ngoni Guys 🫶🏻

#alwaysforyou
#onlyforyou
#temanpyur', '2025-04-22 02:24:00+08', 'https://www.instagram.com/reel/DIvmOd_ywUK/', 'Reel', 'Sponsored', true, 'published', 0, false, 65236, 31644, 702, 90, 35, 27, 0),
  ('papipcelebes', 'Bismillah! sampai baku dapa wa!
Undangan akan sy japri ke dm masing2 🥳

See u gaiss, ODU’OLO 👋', '2025-04-16 00:47:00+08', 'https://www.instagram.com/reel/DIf78ART9zP/', 'Reel', 'Event', false, 'published', 0, false, 58395, 35314, 467, 83, 25, 60, 0),
  ('vinaluciabanua', 'Fall in love with Gorontalo ✨', '2025-04-09 00:42:00+08', 'https://www.instagram.com/reel/DIN8IC2vS4E/', 'Reel', 'Tourism', false, 'published', 0, false, 29040, 14054, 376, 5, 6, 12, 0),
  ('gorontalo.unite', 'Masih dalam rangkaian mudik lebaran tahun 2025, Bang @fadlypadi13 menikmati suasana Lebaran kampung halaman sang Ibu di Suwawa, Gorontalo. 

Bahkan tadi malam sempat bikin galau pengunjung PYUR dengan lantunan lagu SOBAT, lagu ini semacam lagu harus ditongkrongan. 

Meskipun lagu ini dirilis 26 tahun lalu di album “Lain Dunia” tapi liriknya masih relate dengan kondisi saat ini yg penuh kalcer. ya yaa iyaa lagi. 😅', '2025-04-05 18:40:00+08', 'https://www.instagram.com/reel/DIFkfM5yD28/', 'Reel', 'Lifestyle', false, 'published', 0, false, 31565, 16090, 914, 67, 4, 33, 18),
  ('gorontalo.unite', 'Lari dulu disini - di @pohuwato.halfmarathon 2025 

Siap untuk berlari sambil menjelajahi keindahan Bumi Panua, Pohuwato? Dapat salam dari bintang tamu spesial kita @momo_moriska nih

Segera daftar di https://bit.ly/PohuwatoHM untuk mendapatkan slot early bird terbatas! Juga dapatkan Diskon untuk pendaftar Komunitas minimal 5 orang ya.

Yuk, jadikan setiap langkahmu bagian dari perjalanan yang tak terlupakan.

Ayo ke Pohuwato, Gorontalo 🙏

#PohuwatoHalfMarathon
#BumiPanua
#HIPMIPohuwato 
#TheGorontaloRunners
#LariDuluDisini 
#BumiMaleo 
#ExplorePohuwato', '2025-04-04 00:07:00+08', 'https://www.instagram.com/reel/DIA_9QkStW5/', 'Reel', 'Sponsored', true, 'published', 0, false, 21702, 11289, 200, 74, 3, 11, 8),
  ('djmimyshasy', 'TUMBILOTOHE 2025

Tumbilotohe berasal dari Gorontalo. Tumbilotohe adalah tradisi masyarakat Gorontalo untuk memasang lampu di malam ke-27 Ramadan atau menjelang malam Idul Fitri. 
Kata "tumbilotohe" berasal dari bahasa Gorontalo, yaitu "tumbilo" yang berarti "memasang" dan "tohe" yang berarti "lampu".

🔈 : Hulondalo Lipu''u by @hulontalo.ethnic.official', '2025-03-29 09:19:00+08', 'https://www.instagram.com/reel/DHyitkxt0wO/', 'Reel', 'Culture', false, 'published', 0, false, 26733, 16275, 1185, 107, 10, 15, 0),
  ('ayhuismail', 'Tumbilotohe ✨
merupakan tradisi masyarakat Gorontalo yang dilakukan pada malam ke-27 Ramadan sampai akhir bulan Ramadan. Tradisi ini juga dikenal sebagai malam pasang lampu. 

Vibes nya dah kayak Diwali di India ya 😍

#tumbilotohe #tumbilotohegorontalo #gorontalo #malampasanglampu #lampu #menaralimboto #fyp', '2025-03-26 09:01:00+08', 'https://www.instagram.com/reel/DHqxzfDyFpy/', 'Reel', 'Culture', false, 'published', 0, false, 28904, 15434, 495, 37, 6, 3, 0),
  ('gorontalo.unite', '“Hi, Spongebob. aku tidak merasakan bahaya di sini… hanya aroma kemenangan yang manis!” Patrick said to Spongobeb SquarePants. 

How about you, Patrick Kluivert? ekspetasi torang di daerah tinggi nih. sampe bela-belain nonton di trotoar untuk pejalan. 😍', '2025-03-25 08:50:00+08', 'https://www.instagram.com/reel/DHoLzViSBLh/', 'Reel', 'Lifestyle', false, 'published', 0, false, 20768, 10622, 657, 17, 0, 2, 9),
  ('gorontalo.unite', 'Lari dulu disini - di @pohuwato.halfmarathon 2025 

Siap untuk berlari sambil menjelajahi keindahan Bumi Panua, Pohuwato? Dapat salam dari bintang tamu spesial kita @gisel_la nih

Segera daftar di https://bit.ly/PohuwatoHM untuk mendapatkan slot early bird terbatas! Juga dapatkan Diskon untuk pendaftar Komunitas minimal 5 orang ya.

Yuk, jadikan setiap langkahmu bagian dari perjalanan yang tak terlupakan.

Ayo ke Pohuwato, Gorontalo 🙏

#PohuwatoHalfMarathon
#BumiPanua
#HIPMIPohuwato 
#TheGorontaloRunners
#LariDuluDisini 
#BumiMaleo 
#ExplorePohuwato', '2025-03-24 04:06:00+08', 'https://www.instagram.com/reel/DHlGtT8yP7h/', 'Reel', 'Sponsored', true, 'published', 0, false, 60762, 31075, 712, 414, 12, 30, 21),
  ('gorontalo.unite', 'Berbagi takjil, banyak ditemui di jalan. selain karena jalanan rame, juga banyak juga yang jualan takjil. Kalo ini beda lagi. Berbagi makanan sahur, bagi mereka yang belum sempat mampir pulang ke rumah karena masih ada kerjaan, atau siapa saja yang ditemui di jalan. 

Dari belanja bahan makanan, masak-masak, bungkus, dan antar, semua dilakukan bareng-bareng ala tongkrongan @huahuamalkis. 

Btw dorang ini patungan dan donasi dari beberapa teman lainnya.', '2025-03-09 22:20:00+08', 'https://www.instagram.com/reel/DHAcJqczsh1/', 'Reel', 'Culture', false, 'published', 0, false, 28520, 16514, 1163, 153, 11, 21, 13),
  ('gorontalo.unite', 'Karena selera setiap orang berbeda-beda, maka nikmatilah setiap apa yang sedang dinikmati sekarang, layaknya ngopi di Historie Coffee, sebelum lanjutin tadarusan rutin lagi. 

drone by @maykel_ 
voice by abc.cuaks', '2025-03-06 05:06:00+08', 'https://www.instagram.com/reel/DG3AgYYyyAI/', 'Reel', 'Lifestyle', false, 'published', 0, false, 49499, 30058, 1379, 329, 12, 19, 78),
  ('gorontalo.unite', 'Mohundude Dulahu jika diterjemahkan langsung ke dalam Bahasa Indonesia, artinya mendorong matahari. 

Tapi konteks mohundude dulahu ini lebih kasual dan imajinatif, seolah benar-benar mendorong matahari ke bawah dan terbenam. biar apa? biar segera berbuka puasa. 

Maka orang-orang beraktivitas seakan-akan waktu berjalan seperti biasa. Misalnya jalan-jalan, hunting takjil, bersih-bersih rumah, tadarusan biar cuma 1 juz doang. macam-macam. 

Kalo urang Sunda menyebutnya ngabuburit, di Gorontalo dikenal dengan istilah “Pushing the Sun Down” atau Mendorong Matahari sampai terbenam. 😅', '2025-03-06 23:38:00+08', 'https://www.instagram.com/reel/DG49SLsyOn8/', 'Reel', 'Lifestyle', false, 'published', 0, false, 48110, 32736, 1929, 116, 98, 29, 104),
  ('galeryboalemo', 'Untuk yang puasa kali ini jauh dari keluarga 
Tetap semangat , jangan lupa kesehatan dalam menjalankan ibadah puasa walau jauh dari keluarga. 

Salah satu moment jamaah masjid di dulupi pulang sholat tarwih .. 
Video li kakak @gilbertho_tongotongo 

#galeryboalemo', '2025-03-04 05:21:00+08', 'https://www.instagram.com/reel/DGx1OhLSo_r/', 'Reel', 'Culture', false, 'published', 0, false, 28085, 15818, 945, 63, 4, 5, 0),
  ('gorontalo.unite', 'Di balik setiap ketukan lo koko’o, ada rasa peduli, ada harapan agar tak ada yang menjalani puasa dalam keadaan lemas karena telat bangun. 

Kita bisa saja mengandalkan alarm, tapi suara manusia yang mengetuk pintu akan selalu terasa lebih hangat.

Ala kadarnya, karena sesuatu itu jika berlebihan, jatuhnya malah mengganggu. seperti ngeremix lagu tema Ramadan jadi jedag-jedug.', '2025-03-02 11:02:00+08', 'https://www.instagram.com/reel/DGtTu51Tmyt/', 'Reel', 'Culture', false, 'published', 0, false, 19913, 10275, 763, 11, 7, 7, 11),
  ('aprilliamauranii', 'Tag or share ke bestie kamu untuk kesini🫵🏻😋

#explore #cafe #gorontalo #shavabeachresort 
#gorontalohits #gorontalopunya #fyp #resort 
#review #contentcreator #reels', '2025-02-28 04:17:00+08', 'https://www.instagram.com/reel/DGnbf2lSv3X/', 'Reel', 'Tourism', false, 'published', 0, false, 32177, 23817, 315, 119, 1, 11, 0),
  ('aprilliamauranii', 'Kalian kapan utii mau ketemu Sherly??😍🐋

yang pengen hasil vidio/fotonya keren bareng Sherly kaya gini, pakai jasa kak @farhanmohamad413 / wa : 082194883378 ya💌🤩

#explore #gorontalo #sherly #hiupausgorontalo 
#gorontalohits #gorontalopunya #contentcreator
#traveling #wonderfulindonesia #fyp #reels', '2025-02-26 03:34:00+08', 'https://www.instagram.com/reel/DGiNZ-lShCb/', 'Reel', 'Tourism', false, 'published', 0, false, 5544776, 3530280, 446724, 8089, 6715, 608, 0),
  ('ezadityaeza', 'Documentary of Tiba-tiba KASTI 🎾 jilid ✌🏻', '2025-02-25 06:36:00+08', 'https://www.instagram.com/reel/DGf8l3rziWr/', 'Reel', 'Lifestyle', false, 'published', 0, false, 28235, 13943, 545, 57, 5, 50, 0),
  ('erwinismaill', 'Alhamdulillah.. Alhamdulillah.. 
teringat perjuangan sejak ngurus rekomendasi, hitung biaya, bolak balik gorontalo-jakarta, bertempur di lapangan, hingga dinyatakan menang.. dan hari ini di lantik sebagai Gubernur Gorontalo.. selamat bertugas papa @gusnarismail 
.
tugas saya benar benar selesai. 
#gubernurgorontalo #gubernurgusnar #erwinismail #demokrat', '2025-02-19 16:41:00+08', 'https://www.instagram.com/reel/DGRldwuyr4E/', 'Reel', 'News', false, 'published', 0, false, 65364, 31159, 2340, 84, 57, 114, 0),
  ('gorontalo.unite', 'Ibu Idah Syahidah Rusli Habibie akan mencatatkan namanya sebagai perempuan pertama yang menjadi Wakil Gubernur Gorontalo. 

Popularitas Idah Syahidah di Gorontalo sudah tidak diragukan lagi. Sebagai istri Rusli Habibie, Gubernur Gorontalo dua periode, Idah sudah banyak berkiprah di organisasi sosial dan perempuan seperti Tim Penggerak PKK, Dekranasda, Ketua Kwarda Pramuka, Bunda PAUD, Bunda Baca, Bunda Disabilitas, Ketua Forikan dan mash banyak lagi.', '2025-02-19 20:27:00+08', 'https://www.instagram.com/reel/DGR-a11yger/', 'Reel', 'News', false, 'published', 0, false, 42052, 21655, 2153, 48, 5, 23, 28),
  ('gorontalo.unite', 'Ini dia, Gubernur Gorontalo, Bpk. Gusnar Ismail. 

Nama Gusnar Ismail tidak asing bagi publik Gorontalo. la menjadi wakil gubernur pertama berpasangan dengan Gubernur Fadel Muhammad pada periode 2001 - 2006. 

Fadel - Gusnar terpilih lagi di periode kedua pada 2007-2012. Pada 26 Oktober 2009, Gusnar Ismail promosi menjadi gubernur sisa masa jabatan menggantikan Fadel Muhammad yang dilantik sebagai Menteri Perikanan di era Presiden Susilo Bambang Yudhoyono.', '2025-02-19 20:15:00+08', 'https://www.instagram.com/reel/DGR9rqqyoPQ/', 'Reel', 'News', false, 'published', 0, false, 20483, 10792, 1012, 15, 4, 2, 9),
  ('gorontalo.unite', 'INDOGROSIR akhirnya buka outlet ke-30 di Gorontalo. 

Indogrosir sendiri merupakan pusat perkulakan yang tersebar di kota-kota besar di Indonesia, yang menyediakan barang dagangan untuk para UMKM atau Pedagang eceran seperti warung, toko kelontong, minimarket (retail) 

Dan juga, Indogrosir menyediakan barang untuk kebutuhan sehari-hari bagi semua masyarakat umum (End user). 

#IndoGrosir #IndogrosirGorontalo 
@officialindogrosir @indogrosir_gorontalo_gto', '2025-02-19 23:21:00+08', 'https://www.instagram.com/reel/DGSTV2VSUDf/', 'Reel', 'Sponsored', true, 'published', 0, false, 27396, 17577, 471, 22, 8, 18, 12),
  ('gorontalo.unite', 'Berhubung Ramadan bentar lagi, trus Indogrosir baru aja opening di Gorontalo, tentunya ini jadi harapan sebagian besar masyarakat cari berbagai kebutuhan bahan pokok, dll.

Bukan cuma itu aja sih. Indogrosir turut mengajak seluruh masyarakat jadi member langsung. Baik sebagai konsumen hingga pelaku usaha, pedagang everan maupun UMKM. 

#IndoGrosir #IndoGrosirGorontalo 
@officialindogrosir @indogrosir_gorontalo_gto', '2025-02-19 23:17:00+08', 'https://www.instagram.com/reel/DGSTBv8S7s9/', 'Reel', 'Sponsored', true, 'published', 0, false, 27361, 16120, 514, 22, 2, 7, 16),
  ('gracealp', 'Terimakasih, Sherlyy! 🐋🩵😋🤙🏻', '2025-02-15 18:22:00+08', 'https://www.instagram.com/reel/DGHeCxuTmIv/', 'Reel', 'Tourism', false, 'published', 0, false, 6807511, 4446270, 525255, 26091, 652, 682, 0),
  ('gorontalo.unite', 'Dulo ito mo lipu, artinya: “Ayo Kita Memetik”

Harusnya, “Dulo Ito Mopolayio Lipu” (tolong menolong, gotong royong membangun/memajukan daerah. 

Memetik bisa dimaknai mengambil atau memetik atau mem-pete buah-buahan yang siap di panen. Secara tidak kebetulan juga, Kepala Dinas PUPR disalah satu daerah, terloku karena telah memetik atau memanen atau to the point jo, korupsi Dana PEN.🗿

Berdasarkan audit BPK RI, negara mengalami kerugian sebanyak 100 juta juta atau lebih dari 1 M rupiah. Secara tidak langsung, atiolo rakyati, yang kerja siang ke malam, malam ke pagi, trus pajaknya hanya untuk memperkaya orang yang secara ekonomi sudah lebih dari cukup.', '2025-02-08 10:55:00+08', 'https://www.instagram.com/reel/DF0of0tTkWL/', 'Reel', 'Lifestyle', false, 'published', 0, false, 102121, 52873, 3332, 99, 202, 48, 138),
  ('leoniciouss', 'Hello Sherly 👋
.
.
.
📍Wisata Hiu Paus Gorontalo
👙swimsuit design by @orin.yi.san 
🎥 video taken by @falsafisme and @jenlantu', '2025-02-06 04:22:00+08', 'https://www.instagram.com/reel/DFuxo2eTkTj/', 'Reel', 'Tourism', false, 'published', 0, false, 49685, 24603, 870, 44, 19, 45, 0),
  ('gorontalo.unite', 'SUDAH DIBUKA!🥳

Wahana Dinosaurus terbesar di Gorontalo buka mulai 31 Januari 2025.

Menghadirkan banyak keseruan mulai dari Dino show, Dino riding, Dino walk, Aneka wahana bermain, aneka satwa dan masih banyak lagi.

Buka Setiap Hari!
(31 Januari - 02 Maret 2025)
⏰Jam Buka 11.00 - 22.00 
💸Harga Tiket 
•Weekday 40.000
•Weekend 45.000
👶🏻Tinggi badan di bawah 80cm gratis
⏳Durasi main sepuasnya

📍Citimall Gorontalo
Jl. Sultan Botutihe No.68, Heledulaa Sel., Kec. Kota Tim., Kota Gorontalo, Gorontalo 96134

#dinoandfriends #viral #fyp #dinosaurus #dino #funderlandindonesia #infogorontalo #gorontalo', '2025-01-30 23:45:00+08', 'https://www.instagram.com/reel/DFe2UbWSGCb/', 'Reel', 'Sponsored', true, 'published', 0, false, 36560, 22063, 957, 411, 15, 19, 53),
  ('gorontalo.unite', 'Departure to the Front Lines. 

Berangkat tengah malam dari Suwawa menuju Gorontalo, pejuang patriotik sudah siap lahir batin merebut kemerdekaan dari Jepang dan Belanda sekaligus. Dan andaikan mereka menunggu pejuang Gorontalo menyerah, mungkin mereka akan menunggu selamanya.

… dan sisanya, adalah sejarah. 

Jum’at, 23 Januari 1942, bertempat di halaman Kantor Pos Gorontalo (saat ini), bendera Belanda di robek bagian biru, merah putih berkibar dengan megah.', '2025-01-22 04:38:00+08', 'https://www.instagram.com/reel/DFIMbncyQFq/', 'Reel', 'News', false, 'published', 0, false, 29932, 17341, 1090, 87, 6, 7, 31),
  ('gorontalo.unite', 'Cocok buat kalian yang suka suasana pantai dan camping suasana hutan, Pantai Karang Oluhuta di Kabila Bone ini cocok. Medannya yang menantang tapi terbayarkan dengan view yang adem. 

Ini ada sedikit cerita dari @oistira_payu', '2025-01-18 04:04:00+08', 'https://www.instagram.com/reel/DE91hLYyCQ_/', 'Reel', 'Tourism', false, 'published', 0, false, 20862, 11732, 710, 119, 12, 9, 43),
  ('gorontalo.unite', 'Yang awalnya sering jadi tempat langganan banjir, dibuatkan saluran dan bendungan tersendiri, akhirnya jadi tempat bagus buat bersantai sore-sore sambil menikmati pemandangan Danau Limboto. 

Pintu Air Tapodu di Desa Tabumela, Tilangoo, mepet sedikit ke Dembe 1 Kota Barat by @nurlailaishak', '2025-01-13 01:05:00+08', 'https://www.instagram.com/reel/DEwpb4PSzRu/', 'Reel', 'Tourism', false, 'published', 0, false, 35066, 23481, 1430, 293, 58, 31, 70),
  ('gorontalo.unite', 'dan hujan pun reda sudah.', '2025-01-09 01:50:00+08', 'https://www.instagram.com/reel/DEmbLC-ynKO/', 'Reel', 'Lifestyle', false, 'published', 0, false, 24104, 14800, 1389, 47, 15, 13, 83),
  ('tripbarengisal', 'Let''s come Dance with gentle whale sharks..

.
.
.
#freediving #gorontalo #exploregorontalo #privatetrip #whaleshark #hiupaus #sea #gopro #freedivers #pesonaindonesia #pesonagorontalo #wonderfulindonesia #wondeful_places #girlsfreediving', '2024-07-26 03:58:00+08', 'https://www.instagram.com/reel/C94h_p2yoM1/', 'Reel', 'Tourism', false, 'published', 0, false, 26500, 1951, 1352, 9, 1, 8, 0),
  ('ezadityaeza', 'Lipu''u ilo ponu''u, Dilata olipata''u...

📍 Pakaya Tower / Menara Keagungan Limboto', '2024-07-05 04:27:00+08', 'https://www.instagram.com/reel/C9Cgq4VBJ6z/', 'Reel', 'Tourism', false, 'published', 0, false, 23499, 1117, 1021, 19, 0, 24, 0),
  ('ezadityaeza', '📍CENTER POINT BONEBOLANGO', '2024-07-04 05:04:00+08', 'https://www.instagram.com/reel/C9AAOSSBH-B/', 'Reel', 'Tourism', false, 'published', 0, false, 28897, 518, 1524, 1, 0, 42, 0),
  ('gorontalo.unite', 'Ada yang sama? paling tako skali deng petasan eh. Tidak ada kata-kata, intinya hari ini masih sama deng kemarin. Mar, kalo kata Moody, mari jadi orang baik saja, besok-besok. 

Hepi Nu Year, everyone. 🎈🎉🎊', '2024-12-31 08:35:00+08', 'https://www.instagram.com/reel/DEP9vq7SkWV/', 'Reel', 'Lifestyle', false, 'published', 0, false, 31868, 14946, 799, 21, 4, 17, 12),
  ('gorontalo.unite', '30 Detik Keindahan Spot Wisata di Gorontalo

📍Dermaga Museum Pendaratan Soekarno
📍Benteng Otanaha
📍Patung Nani Wartabone
📍Benteng Ulantha
📍Danau Perintis
📍Taman Laut Olele
📍Mesjid Kubah Mas
📍Desa Wisata Religi
📍Pulau Bogisa
📍Pulau Mohinggito
📍Hiupaus Botubarani

Konsultasi Liburan Bahagiamu be bersama @liburanjo', '2024-12-29 19:07:00+08', 'https://www.instagram.com/reel/DEL8f00z-W-/', 'Reel', 'Tourism', false, 'published', 0, false, 26540, 15018, 613, 101, 10, 7, 64),
  ('gorontalo.unite', 'Rute yang teradem. Kalo panas matahari, ada banyak pohon yang rindang. Kalo kehujanan, jao tampa ba sombar akang. Gorontalo lagi hujan, yang lagi di jalan hati-hati di jalan, yang lagi rebahan, lanjutkan aktivitasnya. 

📷 @muzayyinfikriramadhan', '2024-12-28 20:00:00+08', 'https://www.instagram.com/reel/DEJehUaS-ok/', 'Reel', 'Lifestyle', false, 'published', 0, false, 24433, 15859, 1065, 53, 42, 22, 55),
  ('gorontalo.unite', 'Tugu Tani pas di sentral-nya Gorontalo. kalo belok kiri ke Manado, lurus ke depan Kota Gorontalo, ke belakang terus sampe Palu. 

📷 @srydunggio__', '2024-12-28 22:00:00+08', 'https://www.instagram.com/reel/DEJsTQdyYk5/', 'Reel', 'Lifestyle', false, 'published', 0, false, 22157, 11694, 1135, 14, 16, 6, 22),
  ('briantiarno', '𝐁𝐮𝐧𝐠𝐚 𝐌𝐚𝐚𝐟', '2024-12-23 21:05:00+08', 'https://www.instagram.com/reel/DD8tpgMTNL-/', 'Reel', 'Tourism', false, 'published', 0, false, 25846, 13322, 489, 114, 2, 13, 0),
  ('maykel_', 'fun chasing in full speed jetski..
if: @herrykarundeng 
🎥: dji osmo action 5 pro @osmo_global 

#dji #DJIosmo #osmoaction5pro #djio3system #fpv #fpvlife #tmotorfpv #tbs #gorontalo', '2024-12-16 20:05:00+08', 'https://www.instagram.com/reel/DDqkmAVzsf7/', 'Reel', 'Tourism', false, 'published', 0, false, 20732, 13196, 385, 49, 5, 24, 0),
  ('makanyubeb', 'TERBANG KE GORONTALO DEMI INI?!!

Awas aja sampe ga enak, soalnya warga Gorontalo suka banget sama pastry disini. Kemarin aku cobain:

-Silverqueen rock and croissant
-Lava Toast Matcha
-Ultimate Tiramisu
-Ice cream cake in jar
-Cromboloni Vanilla Almond
-Cromboloni Belgian Chocolate

Unik, enak & bikin mau lagiii!! Fix aku nobatin sebagai pastry & dessert cake terenak di Gorontalo.

🔎 : @kinsfactory
📌 Kin''s Factory 📍 Jl. Prof. Dr. H.B. Jassin, Limba U Dua, Kota Sel., Kota Gorontalo, Gorontalo
✅ HALAL', '2024-12-08 01:04:00+08', 'https://www.instagram.com/reel/DDT8c9nyF3t/', 'Reel', 'Culinary', false, 'published', 0, false, 51208, 17180, 919, 333, 31, 93, 0),
  ('makanyubeb', 'DONUT PANGGANG DI GORONTALO

Cantik & glowing,  variannya banyak kemarin aku cobain:

-Choco Wafer Caramel
-Vanilla Marie Cookies
-Black & White
-Avocado Flakes
-Matcha
-Abon
-Vanilla Goodtime
-Tiramisu
-Cappucino

1 boxnya isi 6 harganya cuma Rp.50.000- Rp.52.000. Terus aku juga civaib minuman Rich Choco & Thaitea. Enak banget, kalau ke Gorontalo wajib sih kesini 😍

🔎 : @sachidonuts
📌 Sachi Donuts, Gorontalo 📍 JL. HB Jassin Ex Agus Salim, di depan @kinsfactory
✅ HALAL', '2024-12-06 18:03:00+08', 'https://www.instagram.com/reel/DDQnXjySX6d/', 'Reel', 'Culinary', false, 'published', 0, false, 70433, 7135, 139, 53, 7, 25, 0),
  ('deal_konser', 'OMG OMG~ udah bulan depan banget nih?! Gercep yuk gengs! Bentar lagi Presale 1 untuk Festival dan VIP Standing bakalan segera berakhir 🔥

Grab your ticket fast sebelum kehabisan dan harga naikkkk 😉🫵🏼

GET YOUR TICKET HERE:
s.id/Ticket_Holimoon2024
s.id/Ticket_Holimoon2024', '2024-11-25 17:53:00+08', 'https://www.instagram.com/reel/DC0Q9hBTnG4/', 'Reel', 'Sponsored', true, 'published', 0, false, 323385, 79724, 758, 122, 42, 17, 0),
  ('rachmatgobel_rg', 'Kakak-kakak, mari kita ramaikan lagi pariwisata Gorontalo dan juga dorong ekonomi masyarakat melalui Festival Layang-Layang Gorontalo 2024. 

Festival ini akan berlangsung selama 3 hari dan 3 tempat. Datang dan saksikan kemeriahannya ya! Ajak keluarga dan teman-teman!

#rachmatgobel #gorontalo #festivallayanglayanggorontalo', '2024-11-19 04:53:00+08', 'https://www.instagram.com/reel/DCjbqOLMUGW/', 'Reel', 'Sponsored', true, 'published', 0, false, 38036, 20668, 1368, 619, 27, 42, 0),
  ('annjuliana', 'Gorontalo Half Marathon 2024 terbaik 🥰 
seru banget cheeringnya bestt di sepanjang area race. 

Saatnya apresiasi diri, speedy recovery supaya bisa lari lagi 💜
#gohm2024 #gorontalohalfmarathon2024 #berlaridipesonabaharidanbudayagorontalo #runner #womanrunner #runningmotivation 
.
.
📷 @kikyadiko', '2024-10-30 00:11:00+08', 'https://www.instagram.com/reel/DBvUcmbuVGG/', 'Reel', 'Event', false, 'published', 0, false, 37391, 17293, 855, 31, 27, 46, 0),
  ('gorontalo.unite', 'Siapa nih teman-teman yang ikutan Gorontalo Half Marathon 2024 kemarin. Acaranya itu loh. pecaaah banget. Seru buat seru-seruan. 

Berhubung juga area Half Marathon pasti padat banget, kita jadinya naik Gojek ke lokasi acaranya dari jam 3 pagi loh. Syukurlah Gojek ada promo diskon sampai Rp. 35.000 dengan menggunakan kode promo GOGHM2024. 

Gimana? Pengen adalagi berikutnya event seru begini? 

@gojekindonesia
#BerjuangUntukIndonesia', '2024-10-28 02:03:00+08', 'https://www.instagram.com/reel/DBqXH9EBW2s/', 'Reel', 'Sponsored', true, 'published', 0, false, 20874, 11282, 701, 16, 7, 5, 12),
  ('pemerintahgorontaloprov', 'Halo Runners!

Sudah cukup istirahat? Sekarang waktunya nonton Gorontalo Half Marathon 2024 pagi tadi.

Jangan lupa follow, komen, like dan subreker ygy, biar Mimin tambah semangat 🥰🥳

#gorontalohalfmarathon
#ghm2024
#thegorontalorunners
#runners', '2024-10-27 04:56:00+08', 'https://www.instagram.com/reel/DBoGOqmPeP-/', 'Reel', 'Sponsored', true, 'published', 0, false, 56390, 24033, 2180, 87, 48, 67, 0),
  ('emzydinata', '“Little Paris in Indonesia.

Salah satu ikon Gorontalo yang berdiri sejak tahun 2003. Redup, hidup. Redup, hidup. Kisah Menara Keagungan ini kerapkali mati suri dari aktivitas wisata meski jadi salah satu ‘keajaiban dari Indonesia Timur’. 

Namun kini, dengan adanya hiasan lampu-lampu yang cantik, keindahan menara ini kembali hidup. Dan yang paling penting bisa meramaikan pariwisata sekaligus mendorong pendapatan UMKM di sekitar. 

Semoga, cahaya dari Menara Pakaya ini terus terpancar dan tak lagi padam. 

Save & share buat bucket list kamu klo ke Gorontalo guys.” -

#pakayatower #menarapakaya #gorontalo #gorontalounite', '2024-10-26 08:01:00+08', 'https://www.instagram.com/reel/DBl2paHpd1-/', 'Reel', 'Untold Story', false, 'published', 0, false, 38518, 24571, 1544, 188, 9, 18, 0),
  ('novanadrian', 'Manado - Gorontalo 400K | @sarioloop x @gorontaloroadbikecommunity 

Makase for samua sponsor & donatur yang nda bisa sebutkan 1/1🥰', '2024-10-16 21:33:00+08', 'https://www.instagram.com/reel/DBNjJbBoQVI/', 'Reel', 'Lifestyle', false, 'published', 0, false, 48934, 26281, 1939, 142, 25, 217, 0),
  ('ayhuismail', 'Baru mood ✨
#festivalbalonudaragorontalo', '2024-10-14 18:04:00+08', 'https://www.instagram.com/reel/DBICoSYS6CO/', 'Reel', 'Event', false, 'published', 0, false, 29341, 15484, 471, 1, 3, 4, 0),
  ('maykel_', 'lots of fun flying in a lots of balloons yang rupa2 warnanya..
🚀🎈🎈🎈

#baloon #airballoon #gorontalo #fpvlife', '2024-10-14 22:26:00+08', 'https://www.instagram.com/reel/DBIfLcnI92g/', 'Reel', 'Event', false, 'published', 0, false, 20536, 11884, 469, 7, 5, 13, 0),
  ('emzydinata', '“Wonosobo pindah sementara ke Gorontalo ✅

Emang sebagus dan sekeren itu sih! Ditambah landscape Gorontalo yang indah, bener-bener perpaduan view yang luar biasa. 

Nambah satu lagi nih wisata andalan Gorontalo. Gak sabar buat liat lagi Festival Balon Udara Gorontalo tahun depan! 

Gimana menurutmu guys?! 
Save sekarang, ke Gorontalo kemudian.” - 

#gorontalo #gorontalohits #gorontalounite #festivalbalonudaragorontalo', '2024-10-13 06:12:00+08', 'https://www.instagram.com/reel/DBEMaX2JHtR/', 'Reel', 'Untold Story', false, 'published', 0, false, 37498, 24747, 1833, 128, 23, 60, 0),
  ('fathirmohi23', 'Cappadocia? Nope, it''s Gorontalo!

Festival Balon Udara pertama kali di Pulau Sulawesi, especially Gorontalo 🙌

Special thanks to @rachmatgobel_rg the one and only who can make this Fest Successful 🙏🙌

#balonudaragorontalo #rachmatgobel #djimini3pro #videography #gorontalohits', '2024-10-13 05:31:00+08', 'https://www.instagram.com/reel/DBEG46MSdj4/', 'Reel', 'Event', false, 'published', 0, false, 25481, 14396, 973, 31, 6, 8, 0),
  ('miracle_amin', 'GORONTALO | Air Ballon Festival. 
Serasa lagi di Cappadocia. Tinggal pinjem gurunnya udah mirip 🤭
-
#gorontalo #instanusantaragorontalo #gorontalo_inframe #gorontalounite #gorontalocity #sulawesiutara', '2024-10-13 00:01:00+08', 'https://www.instagram.com/reel/DBDhjRmAG1n/', 'Reel', 'Event', false, 'published', 0, false, 23871, 14220, 1434, 82, 7, 23, 0),
  ('emzydinata', '“Pertama kalinya di Gorontalo, sekaligus di pulau Sulawesi & Indonesia Timur; Festival Balon Udara Gorontalo.” - 

#gorontalo #festivalbalonudaragorontalo #gorontalohits', '2024-10-12 20:53:00+08', 'https://www.instagram.com/reel/DBDMEOupUl4/', 'Reel', 'Untold Story', false, 'published', 0, false, 290828, 126036, 7556, 2091, 54, 140, 0),
  ('gorontalo.unite', 'REVIEW JUJUR PUKIS JUMBO YG LAGI VIRAL @pukiskotabaru
.
📍Jl. Nani Wartabone (Patokan: Sebelah Martabak Bang Awal - Deretan Yopie Salon)
.
Pukisnya gede banget, teksturnya super fluffy dan lembut mirip bolu! Toppingnya juga barbar banget! 😱Sekarang ada 3 varian baru: Kismis, Selai Kacang, & Choco Crunch!
.
📌Harga Promo Rasa Baru (Pukis Kismis, Pukis Choco Crunchy & Pukis Selai Kacang) - Hanya 7 Ribu / Piece
📌Promo Free Pukis: 
Beli 10 Dapat 12
Beli 6 Dapat 7', '2024-10-10 03:27:00+08', 'https://www.instagram.com/reel/DA8KyEfBqRF/', 'Reel', 'Sponsored', true, 'published', 0, false, 20319, 11400, 278, 52, 2, 4, 26),
  ('rachmatgobel_rg', 'Sudah ada rencana kemana akhir pekan ini kakak-kakak? 

Daripada menghabiskan akhir pekan dirumah, mending datang saja ke Festival Balon Udara Gorontalo yang dijamin bisa menjadi hiburan seru bagi keluarga sekaligus mengangkat potensi pariwisata dan UMKM kita. 

Catat waktu & tempatnya, jangan sampai terlewat. Sampai bertemu nanti. 

Gorontalo Bisa Olo! 

#rachmatgobel #gorontalo #festivalbalonudaragorontalo', '2024-10-09 07:02:00+08', 'https://www.instagram.com/reel/DA5-cffy8wC/', 'Reel', 'Sponsored', true, 'published', 0, false, 47987, 28223, 1672, 725, 15, 80, 0),
  ('gorontalo.unite', 'Drama hari ini, mau ke Botubarani malah tembus di Botutonuo. Masa guide tersesat. Haha.

Kedua, pake mobil listrik, yang sudah di charger semalam. ini tidak khawatir kehabisan bensin. Wuling AirEv hampir seharian kita pakai, ternyata nyaman juga. Kita sempat cobain AirEv Long Range dan juga Standard Range. Sebagai city car, worth it lah dipake daily di Kota Gorontalo, bahkan sampai jarak 300KM.

inframe: @vikamakawimbaang & @vhebymakawimbang92 
yang rekam: @tripbarengisal', '2024-09-06 04:53:00+08', 'https://www.instagram.com/reel/C_kxZhwhXPe/', 'Reel', 'Sponsored', true, 'published', 0, false, 30933, 14372, 478, 20, 0, 9, 16),
  ('tripbarengisal', 'Mermaid dancing with whale shark.

inframe: @mermaid_indah 

#mermaid #whaleshark #gorontalo #mermaidlife #tripgorontalo #ocean #wonderfulindonesia #gorontalo', '2024-08-29 02:36:00+08', 'https://www.instagram.com/reel/C_P7lfkSPfN/', 'Reel', 'Tourism', false, 'published', 0, false, 41165, 4340, 1179, 11, 3, 32, 0),
  ('ezadityaeza', '📍 Karang Indah, Gorontalo - Indonesia
.
In frame : bestai @filannovagobel 
.
.
#gorontalo #djiindonesia #dji', '2024-08-24 22:46:00+08', 'https://www.instagram.com/reel/C_FOP3_hDZg/', 'Reel', 'Tourism', false, 'published', 0, false, 28035, 983, 1088, 6, 1, 46, 0),
  ('emzydinata', '“Sunset in Gorontalo never fails me. 

Salah satu hal yang paling kusuka saat berkelana di Gorontalo, adalah berburu sunsetnya. Banyak spot yang klo misalkan jeli, punya view bagus buat foto atau sekedar menunggu matahari menuju ke peraduan. 

Dimana lagi nih, spot sunset di Gorontalo yang menurutmu juga keren guys?” - 🔥

#gorontalo #traveling #gorontalohits', '2024-08-11 03:32:00+08', 'https://www.instagram.com/reel/C-hr5acyKRV/', 'Reel', 'Untold Story', false, 'published', 0, false, 22097, 1526, 963, 4, 2, 25, 0),
  ('galeryboalemo', 'Salah satu jalur terfavorit kalau di lewati sepanjang jalan penuh kenangan.

Kalau lewat sepanjang jalan mata kita akan di suguhkan dengan hijaunya perkebunan tebu dan jangung. 

Jalur ini di buat sekitar tahun 2014 untuk mempermudah akses jalur darat yang ada di Boalemo. 

#boalemo
#galeryboalemo
#gorontalo', '2024-07-21 21:49:00+08', 'https://www.instagram.com/reel/C9tkO8UB6PI/', 'Reel', 'Tourism', false, 'published', 0, false, 22615, 4859, 692, 4, 0, 20, 0),
  ('helmihongi', 'Review Spot Wisata Baru di Kabupaten Gorontalo ⤵️

Namanya Lu’as (Lumbung Uti Asmoro). Entah apa artinya.

Ini merupakan destinasi wisata terbaru di Kabupaten Gorontalo. Tepatnya di kelurahan Hepuhulawa, Kecamatan Limboto.

Akses masuknya hanya satu pintu. Agak susah ketika mobil berpapasan.

Disini ada cottage dan glamping yang disewakan.

Ada dua cottage seharga >1jt per malam dengan fasilitas Ac, mini bar dan kulkas.

Ada pula cottage seharga 640rb dengan fasilitas AC dan KM didalam.

Untuk harga glamping dipatok sebesar 320rb per malam. Lokasinya persis ditepi sungai.

Selain itu disini juga ada kolam renang. Dengan kedalaman kira kira <1m. Terdapat pula pool untuk anak anak.

Tidak dikenakan tiket masuk kesini. Namun untuk bisa menggunakan kolam renang, kalian perlu membayar 60rb per orang. Sudah termasuk es teh dan snack.

Untuk makanan, ada indonesian food dan western food dengan harga yang saya anggap “over price” karena dengan harga segitu seharusnya taste makananya tidak biasa saja.

Karena mungkin baru beroperasi, banyak karyawan yang gagap ketika menerima orderan makanan dan minuman dalam jumlah banyak.

Banyak yang komplain karena makanan tidak kunjung datang, bahkan ada makanan yang akhirnya di cancel.

Mungkin kedepannya tempat ini bisa berbenah.

Ada satu hal yang saya suka disini adalah ketersediaan musholla. Jadi tidak susah untuk solat.

Summary:
👉🏼Makanan: 🌟🌟
👉🏼Service: 🌟🌟
👉🏼Suasana: 🌟🌟🌟

#helmihongi #turguide #guidesulawesi #pilotdrone #djimini3pro #djiera #djindonesia #dronevideo  #gorontalounite #gorontalolife', '2024-07-09 02:03:00+08', 'https://www.instagram.com/reel/C9MiM2tBwvA/', 'Reel', 'Tourism', false, 'published', 0, false, 25502, 251, 559, 2, 1, 10, 0),
  ('adi.ilahude', '📍Terowongan Gorontalo Outer Ring Road (GORR)

#reels #instagram #gorontalo #gorr #viral #fyp', '2024-07-08 08:28:00+08', 'https://www.instagram.com/reel/C9Ko9yeBMhE/', 'Reel', 'Lifestyle', false, 'published', 0, false, 46514, 425, 1994, 2, 0, 0, 0),
  ('gorontalo.unite', 'Beberapa km sebelum mendarat di Bandar Udara Djalaludin Tantu, kita akan disajikan view Teluk Tomini yg juga merupakan pintu masuk ke Ibukota Provinsi Gorontalo.

Jika diperhatikan secara detail, Kota Gorontalo itu berbentuk cekungan (istilah org sini, bako). Dan bisa saja ini adalah Danau Limboto, yang telah mengendap, mengering atau apa saja istilahnya.

Dari berbagai penelitian, topografi cekungan ini jadi salah satu penyebab banjir, selain faktor lainnya. entah itu sistem drainasenya atau faktor alam.

Repost story @fahrilreva._', '2024-07-06 05:09:00+08', 'https://www.instagram.com/reel/C9FKGU2hkBN/', 'Reel', 'Lifestyle', false, 'published', 0, false, 79968, 4340, 3548, 15, 1, 30, 240)
) as v(
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
on conflict (permalink) do nothing;
