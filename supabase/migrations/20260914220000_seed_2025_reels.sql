-- The 2025 archive: 225 reels from two spreadsheets.
--
-- "choices for you-2025.csv" holds the 27 landscape posts and
-- "vertikal-2025.csv" the other 198. Together the two files carry 275 rows;
-- 50 were already in the table and are skipped, and there are no duplicates
-- within the files themselves. Every row carries a category this time, so
-- nothing is left behind for want of one.
--
-- The 2025 export lays its columns out differently from the 2026 one: the
-- category sits under the "Data comment" header and the format under an
-- unnamed column after it. Read positionally, not by header name.
--
-- Endorse becomes Sponsored and flags the row sponsored, as in every earlier
-- import. The landscape rows are ticked editor_choice, which is cosmetic —
-- a wide reel is on the Choices for You shelf either way — but it records that
-- this is where they were filed.
--
-- Covers came from instagram.com/p/<shortcode>/media/?size=l. All 225 were
-- fetched: the vertical ones at 640px wide in their own shape, the wide ones
-- cropped to 16:9, with a baked-in letterbox bar removed first on 5 of them.
--
-- permalink is unique, so this is safe to run twice.

insert into public.reels (
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, editor_choice, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
select * from (values
  ('gorontalo.unite', 'Ayam Perintis — Signature Menu dari @onatobyswiss18 

Bayangkan, duduk santai di tepi Danau Perintis, angin sepoi-sepoi, lalu di depanmu hadir satu piring istimewa: Ayam Perintis. 🍽️

Awalnya kita pikir rasanya bakal aneh. Ternyata? Justru bikin nagih. Apalagi kalau sambalnya dibanyakin “gacor” banget! 

Pantesan menu ini jadi best seller. Kalau mampir ke Onato by Swiss18, wajib banget cobain Ayam Perintis ini. Karena di sini, rasa bukan cuma disantap, tapi diceritakan.', '2025-08-13 06:28:00+08'::timestamptz, 'https://www.instagram.com/reel/DNS_jdMy5qF/', 'Reel', 'Culinary', false, 'landscape', true, 'published', 0, false, 11239, 5360, 155, 12, 0, 5, 4),
  ('onatobyswiss18', 'Paket Merdeka, menu spesial dari Onato yang cuma bisa kamu nikmati selama bulan Aguatus!

Ada Flying Noodle yang super enak, dan jangan lupa juga Ice Cream merah putih yang seger banget!

Dan yang lebih keren lagi, harganya cuma 45 ribu aja, guys!

#onato #swiss18 #danauperintis #cafegorontalo #menuspesialagustus', '2025-08-17 07:56:00+08'::timestamptz, 'https://www.instagram.com/reel/DNddDArvKwD/', 'Reel', 'Culinary', false, 'landscape', true, 'published', 0, false, 18649, 8474, 306, 38, 6, 1, 0),
  ('deddy_iteneps', 'VIDEO CLIP "KITA SELAMANYA" @iteneps_punkrock 
#kitaselamanya #iteneps #itenepspunkrock #punkrock #musikpunk #bandpunkrock #bandpunkindonesia #musikindonesia #gorontalounite #bandgorontalo #karyahitam #undergroundthallo', '2025-01-18 22:08:00+08'::timestamptz, 'https://www.instagram.com/reel/DE_vxRET_my/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 9741, 5481, 230, 2, 1, 9, 0),
  ('disparekrafpora_gorontaloprov', '8 Kebudayaan Gorontalo.

Edisi 4.
Langga merupakan salah satu teknik bela diri yang sejak dahulu diciptakan oleh leluhur Gorontalo. Berasal dari kata bahasa Gorontalo Helangga Langgawa yang berarti gerak-gerik. Bela diri ini diajarkan secara turun-temurun dengan tujuan bukan untuk melumpuhkan musuh tetapi untuk melindungi diri dari serangan.', '2025-01-24 20:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DFPC1qQz0Mm/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 5165, 2772, 113, 2, 2, 3, 0),
  ('disparekrafpora_gorontaloprov', '8 Kebudayaan Gorontalo.

Edisi 6. 
Gorontalo sampai saat ini senantiasa terus melestarikan budaya termasuk adat yang berkaitan dengan pernikahan. Beberapa tahapan adat dilaksanakan oleh calon mempelai maupun keluarga besar mulai dari musyawarah, tolobalango, modutu, hui mopotilandahu, hingga akad nikah.', '2025-01-30 17:55:00+08'::timestamptz, 'https://www.instagram.com/reel/DFeN0VBTZKl/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 2447, 1264, 80, 8, 0, 0, 0),
  ('disparekrafpora_gorontaloprov', '*Saatnya ke GORONTALO!*
*_Ada kabar baik nih! Wings Air sekarang buka rute Manado (MDC) dan Palu (PLW) ke Gorontalo (GTO). Jadi, makin mudah buat kamu yang mau eksplor keindahan Gorontalo!_*

✨ Daya Tarik Gorontalo:
•	_Pesona alamnya bikin jatuh cinta, dari Danau Limboto yang memesona sampai pantai-pantai eksotisnya._
•	_Kuliner khasnya juara, jangan lewatkan Milu Siram dan Binte Biluhuta!_
•	_Budayanya kaya dan unik, cocok buat kamu yang suka belajar hal baru._

Jadwal Terbang mulai 21 Maret 2025
✈️ *Manado (MDC) – Gorontalo (GTO)*: Setiap Jumat & Minggu, 08.10 WITA – 09.00 WITA.
✈️ *Palu (PLW) – Gorontalo (GTO)*: Setiap Jumat & Minggu, 10.50 WITA – 11.50 WITA.

🎟️ Yuk, *pesan tiket dan check-in online lewat aplikasi BookCabin!*
•	Praktis, cepat, dan nggak perlu antre di bandara.
•	Jangan lupa jadi anggota CabinClub biar bisa nikmati diskon dan promo eksklusif!

Ayo, buruan rencanakan liburanmu ke Gorontalo! 🌴✈️
#DiIndonesiaAja 

Video by @seafans__', '2025-03-22 04:20:00+08'::timestamptz, 'https://www.instagram.com/reel/DHfW-HszDYL/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 9905, 5311, 223, 11, 3, 6, 0),
  ('disparekrafpora_gorontaloprov', '8 Kebudayaan Gorontalo.

Edisi 2.
Upacara Walima atau perayaan Maulid Nabi Muhammad SAW  merupakan sebuah tradisi turun temurun yang terus dilestarikan hingga saat ini. Tradisi ini diperkirakan sudah ada sejak islam pertama kali masuk ke bumi Gorontalo.', '2025-01-21 17:49:00+08'::timestamptz, 'https://www.instagram.com/reel/DFHBxy5TOsw/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 8894, 4523, 232, 5, 6, 5, 0),
  ('gorontalo.unite', 'Ramadan yang kita jalani perlahan berpamitan.

Seperti tamu yang telah selesai berkunjung, meninggalkan jejak di hati, meninggalkan tanya: sudahkah kita menjalaninya dengan sungguh-sungguh?

Atau justru kita sibuk dengan dunia, membiarkan hari-hari berlalu tanpa benar-benar mengisinya?

Mungkin kita pernah berkata, ‘Besok saja, masih ada waktu.’ 
Tapi kini, besok itu sudah tak ada lagi.

ah, jadi baper. malas lanjutin caption 🥹', '2025-03-26 04:57:00+08'::timestamptz, 'https://www.instagram.com/reel/DHqWDeHSsfM/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 13096, 6906, 457, 19, 1, 0, 12),
  ('gorontalo.unite', '“Terkadang kita perlu menoleh ke belakang sejenak,
bukan untuk berhenti, tetapi untuk menyadari seberapa jauh kita melangkah.”

Sepanjang 2025, Loka Monitor SFR Gorontalo melalui berbagai proses dan pengalaman yang membentuk kami untuk terus bertumbuh.

Terdapat pencapaian yang patut disyukuri, ada tantangan yang mengajarkan arti kebersamaan, koordinasi, dan kolaborasi yang semakin erat.

Terima kasih kepada seluruh stakeholder, mitra kerja dan juga sahabat frekuensi yang telah berjalan bersama kami sepanjang tahun ini.

Setiap dukungan, sinergi, dan kepercayaan truly means a lot.

Kini kita menyambut 2026 dengan semangat baru,
langkah yang lebih mantap, kolaborasi yang lebih kuat, dan tekad untuk terus memberikan yang terbaik.

Karena setiap perjalanan yang besar selalu dibangun bersama-sama, and the best is yet to come.

Selamat datang 2026.
Let’s move forward, together✨

#TeamLG
#InfrastrukturDigital
#Komdigi', '2025-12-30 07:20:00+08'::timestamptz, 'https://www.instagram.com/reel/DS5GdsPkkMm/', 'Reel', 'Sponsored', true, 'landscape', true, 'published', 0, false, 9539, 4913, 167, 8, 1, 0, 7),
  ('deal_konser', 'Menolak lupa keseruan Holimoon 2024 kemaren! Terima kasih kami ucapkan untuk sponsorship dan tenant-tenant serta official Media kami yang turut serta meramaikan event Holimoon 2024 ❤️

Dan untuk kalian yang kemaren udah hadir, gimana? Udah siap seru-seruan bareng lagi gak tahun ini? 😉', '2025-01-08 02:55:00+08'::timestamptz, 'https://www.instagram.com/reel/DEj9stxznvz/', 'Reel', 'Event', false, 'landscape', true, 'published', 0, false, 23898, 11756, 295, 12, 0, 4, 0),
  ('fira_djou', 'Seperti yoga yang mengajarkan kita untuk merdeka dari rasa gelisah, rayakan kemerdekaan Indonesia dengan tubuh yang kuat, pikiran yang tenang, dan jiwa yang penuh syukur 🙏

#yoga #gorontalo #kemerdekaanindonesia #indonesia', '2025-08-16 04:13:00+08'::timestamptz, 'https://www.instagram.com/reel/DNaeT-JJ8EW/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 9210, 4251, 218, 4, 4, 4, 0),
  ('gorontalo.unite', 'Onato by Swiss18 adalah salah satu cafe yang tepat berada di tepian Danau Perintis, Suwawa, Bone Bolango. Udah cobain dan pernah kesini?', '2025-08-09 23:28:00+08'::timestamptz, 'https://www.instagram.com/reel/DNKhCojSHLg/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 14233, 6987, 200, 27, 2, 3, 5),
  ('gorontalo.unite', 'Long weekend nih, tidak ada rencana mengeksplor tempat-tempat segar? Misalnya lari ke arah pantai, bersepeda terus ke arah gunung, atau mampir di pasar belanja keperluan dapur lanjut masak-memasak? 

Masih dengan view yang segar, kali ini di Bone Bolango. pemandangan yang masih segar seperti ini masih banyak ditemukan di Gorontalo. 

@ayou_widya', '2025-05-09 17:36:00+08'::timestamptz, 'https://www.instagram.com/reel/DJc7EMzzWR_/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 9376, 4417, 281, 41, 1, 9, 5),
  ('gorontalo.unite', 'Biasanya nih yaa, orang-orang kan gak mau cari ribet, termasuk cari tempat buat belanjaan beragam kebutuhan Lebaran nanti. Nah, di Indogrosir Gorontalo salah satu solusinya. 

Tempatnya yang luas, banyak pilihannya, bisa juga melakukan pembayaran secara mandiri di kasir layanan mandiri.

Di Indogrosir juga terdapat paket parcel lebaran yang sudah siap kita kemas sendiri dan bisa langsung dibawa pulang! Paket parcelnya beragam, mulai dari harga 100rb sampai dengan 350rb.

Buruan deh, ke INDOGROSIR sekarang juga. 

#IndoGrosir #IndogrosirGorontalo #EidMubarak #ParcelLebaran #Gorontalo', '2025-03-25 23:54:00+08'::timestamptz, 'https://www.instagram.com/reel/DHpzZLBSdNw/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 13105, 6382, 117, 6, 0, 1, 7),
  ('loka_gorontalo', 'Ramadhan Bulan Berbagi Kebaikan

—Saad & Friends—

Seperti Saad yang peduli pada teman-temannya, kami juga peduli pada kelancaran komunikasi selama liburan mudik teman-teman. Kami siaga memastikan layanan frekuensi tetap bersih, komunikasi lancar, agar perjalanan makin nyaman, silaturahmi makin berkesan, dan kebersamaan penuh cinta.

Nah..
Teman-teman, sahabat frekuensi juga bisa ikutan berbagi kebaikan!
Caranya? 
Ikut QUIZ BERHADIAH THR dengan langkah mudah:

1️⃣ Tonton video ini sampai habis
2️⃣ Jawab pertanyaan di kolom komentar
3️⃣ Berikan komentar menarik tentang cerita dan informasi di video

✨PERTANYAAN QUIZ✨
✅ Siapa nama anak kecil yang peduli kepada teman-temannya?
✅ Sebutkan dua layanan Loka Monitor SFR Gorontalo dan tujuannya yang disampaikan pada menit ke 03.36 - 03.46!
✅ Sebutkan dua landmark terkenal Gorontalo yang ada dalam video?

🗓️ Periode quiz: 29 Ramadhan 1446H
🏆 Lima pemenang beruntung akan dihubungi sebelum Lebaran untuk pengiriman hadiah!

Jangan sampai ketinggalan ya!

Yuk, sebarkan semangat Ramadhan dengan berbagi dan ikut serunya quiz ini! ✨

#Saad&Friends
#TimLG
#DJID
#Komdigi', '2025-03-27 05:08:00+08'::timestamptz, 'https://www.instagram.com/reel/DHs3d0azSCl/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 17536, 9107, 140, 15, 7, 25, 0),
  ('maykel_', 'senja jadi meriah, ketika laut berubah jadi arena, bukan sekadar lomba perahu, tapi warisan budaya lokal yang terus hidup di setiap bunyi mesin yang dipacu..🙌

🚀 iflight nazgul evoque f5 dc v2
🎥 dji o4 pro air unit

#gorontalo #indonesia #dji #djio4pro #djiindonesia #iflight #iflight #fpvmagazine', '2025-05-17 04:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DJwHpAfTwvK/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 15332, 7154, 314, 6, 3, 9, 0),
  ('oluhuta.paradise', '🏕️OLUHUTA CAMPING FESTIVAL #2🏝️
Setelah Mencatat Sejarah Sebagai Event Oluhuta Camping Festival #1 16-17 November 2024 Yang Dihadiri 200 Campers Sekaligus Menjasi Festival Camping Pertama Dan Terbesar Di Sulawesi. Desa Oluhuta Kembali Mengukir Sejarah Dengan OLUHUTA CAMPING FESTIVAL #2 Yang Telah Di Hadiri Lebih Dari 350 CAMPERS Yang Dilaksanakan Selama 2 Hari 31 Desember - 01 Januari 2025
Sampai Bertemu Di Oluhuta Camp Fest #2 "FESTIVAL TUMBILOTOHE OLUHUTA"
•
Banyak Tawa Dan Sedih Yang Akan Abadi Bersama Indahnya Desa Oluhuta Malam Itu🌅 Rasanya Hati Ini Tenang Mengetahui Gorontalo Masih Menyimpan Permata Tak Tersentuh Yang keindahannya Bak Surga Dunia.
•
Konsep Camping Di Ruang Terbuka Di Desa Oluhuta Keindahan Alam Oluhuta Yang Kaya Akan Flora Dan Fauna Dan Menyimpan Nilai Sejarag Peradaban Manusia Dengan Adanya 12 Makam Manusia Purba Yang Di Kolaborasikan Dengan Potensi Lokal UMKM @kopi.adigunajaya @29drink_  Dan Lokal Band @estaderass_official dan Kampus Pelopor Inovasi @unbita.official yang telah menjadi bagian dari pelopor
• 
Terimakasih atas dedikasi masyarakat OLUHUTA moga semangat membangun desa hingga di menjadi DESA ADWIsata nanti terwujud.
•
Surga tersembunyi Di Gorontalo, Oluhuta.
Thanks To
@el_sahrain  Kepala Desa Oluhuta
@yud_yudiawan Kepala Bidang Disparpora Bonebol
@ellysarach  Rektor Unbita
@e_xel_oz  Inisiator Dan EO Camping Festival
@tengkuumaulana 
@alviannaufar 

Terimakasih Atas Dedikasinya,', '2025-01-12 04:37:00+08'::timestamptz, 'https://www.instagram.com/reel/DEuY9BhSUsz/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 52244, 26411, 323, 18, 7, 9, 0),
  ('bank_indonesia_gorontalo', '["Belanja Cerdas, Lebaran Berkualitas!"]

Hai #sobatrupiah #nouutigorontalo
Lebaran sebentar lagi! 🕌✨ Euforia belanja mulai terasa, tapi jangan sampai dompet jebol sebelum hari raya! Yuk, belanja bijak dengan cara berikut:

✅ Buat daftar belanja – Prioritaskan kebutuhan, bukan keinginan.
✅ Tentukan budget – Jangan sampai THR habis dalam sehari!
✅ Bandingkan harga – Belanja online atau offline, mana yang lebih hemat?
✅ Manfaatkan promo – Diskon boleh dicari, tapi jangan sampai kalap!
✅ Utamakan kebutuhan keluarga – Kue, baju, atau THR untuk keponakan, atur dengan bijak.

Dengan belanja bijak, semoga kita mendapatkan Idul Fitri yang penuh berkah,
suka cita, dan kesejahteraan

#disetiapmaknaindonesia
#BelanjaBijakGorontalo
#LebaranHemat', '2025-03-25 22:53:00+08'::timestamptz, 'https://www.instagram.com/reel/DHpsOCGTAe-/', 'Reel', 'News', false, 'landscape', true, 'published', 0, false, 11262, 5361, 196, 3, 0, 11, 0),
  ('kedokteranumgo', 'Selamat datang di Fakultas Kedokteran Universitas Muhammadiyah Gorontalo!

Menjadi dokter bukan hanya soal ilmu, tapi juga hati dan dedikasi.
Fakultas Kedokteran Universitas Muhammadiyah Gorontalo hadir untuk membentuk dokter yang kompeten, berakhlak mulia, dan siap berkontribusi nyata

#fkumgo #kedokteranumgo', '2025-06-19 06:29:00+08'::timestamptz, 'https://www.instagram.com/reel/DLFXkB6J1p_/', 'Reel', 'News', false, 'landscape', true, 'published', 0, false, 42475, 18719, 1035, 60, 17, 31, 0),
  ('sea_ntuary', '📍Lito Bogisa, Moluo, Kec. Kwandang, Kabupaten Gorontalo Utara, Gorontalo
.
.
.
.
.
#gorontalo #gorontalohits #fypreelsシ゚', '2025-10-27 09:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DQUbstNgXWV/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 25773, 12945, 585, 38, 1, 4, 0),
  ('deddy_iteneps', 'Perdana Camping Alisya ketemu Cogan (CowokGanteng) anaknya teman papa 😍😆 @willygobel96 @lhngbel .. bo alisya Am 😆 | Family Camp Eps 1. Selengkapnya di Youtube 
https://youtu.be/pmP-eTlg5Do?feature=shared

📍Desa Longalo Kec. Bulango Utara Kab. BoneBolango Gorontalo.. 
#family #sunrise #familycamping #camping #gorontalounite', '2025-12-27 23:19:00+08'::timestamptz, 'https://www.instagram.com/reel/DSzGOxzk46E/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 11052, 5719, 181, 5, 0, 5, 0),
  ('lecka_smenkqiuw', 'Santai saja 🚁😀
.
.
#aryanbykadena #gorontalo #biluhu #exploregorontalo #wonderfulindonesia #pesonaindonesia #tripgorontalo #hiupaus #hiupausgorontalo #dji #fpv #whaleshark #video #instagram #fyp #pilotfpv', '2025-10-08 21:46:00+08'::timestamptz, 'https://www.instagram.com/reel/DPk1X0Ij9Rk/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 6748, 3624, 72, 8, 0, 0, 0),
  ('galeryboalemo', 'Terima kasih 2024 , Selamat Datang 2025 
Mari bertemu hal hal baik di tahun ini . 

Pesta kembang api Malam Tahun Baru di alun alun Tilamuta. 

Video drone @yowan_ahmad 

#tahunbaru #boalemo #galeryboalemo', '2024-12-31 09:17:00+08'::timestamptz, 'https://www.instagram.com/reel/DEQDM4BTk_N/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 24249, 10892, 591, 13, 5, 1, 0),
  ('gorontalo.unite', 'Malam penuh berkah di Baiturrahman, dengan ribuan cahaya dan jutaan cinta untuk Rasulullah ﷺ.

Menara Keagungan jadi saksi Limboto bershalawat!', '2025-09-05 05:57:00+08'::timestamptz, 'https://www.instagram.com/reel/DOOKr37EtL_/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 15907, 8926, 729, 40, 6, 7, 16),
  ('gorontalo.unite', 'Air terjun tidak melawan gravitasi. Ia mengalir, menjatuhkan diri, lalu tetap indah. Begitu juga hidup—kadang kita harus tunduk, agar bisa tumbuh.

Semoga tetap abadi dalam ingatan kita, bahwa alam sekitar bukan untuk ditaklukan. tapi untuk di pelajari dan di kaji sesuai kodrat kita sebagai manusia.', '2025-04-23 02:01:00+08'::timestamptz, 'https://www.instagram.com/reel/DIyII7yyQV3/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 25553, 12276, 707, 22, 2, 19, 10),
  ('maykel_', 'just 5 minutes walk u can get a beautiful waterfalls.

every drops here, tells a story..

#gorontalo #indonesia #nature #waterfall #dji #djiera #fpv #fpvlife', '2025-06-23 18:17:00+08'::timestamptz, 'https://www.instagram.com/reel/DLQ6ff5TJyY/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 10408, 4991, 242, 8, 2, 4, 0),
  ('udangmerah40', 'INFINITY FROM A FINITE LENS 📹
.
GORONTALO
.
#exploregorontalo #exploresulawesi #gopro #goprohero #freedive #freediver #freedivephotography #gorontalo #gorontalohits #gorontalounite', '2025-02-14 04:23:00+08'::timestamptz, 'https://www.instagram.com/reel/DGDZaBFo1kF/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 11486, 5748, 352, 4, 2, 36, 0),
  ('berry.dengo', '#karimunkotak #karimun #karimunkotakindonesia #happywekend #gorontalo #gorontalounite #latenightpost', '2025-06-07 20:04:00+08'::timestamptz, 'https://www.instagram.com/reel/DKn7-iQz5f7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 15351, 8179, 553, 71, 2, 16, 0),
  ('bindawood__', 'Bindawood Villa bisa banget jadi pilihan Teman teman buat ngadain acara intimate event atau company gathering dengan konsep Outdor ❤️
.
.
. 
For more information, bisa DM atau WA admin ya 🫶🏻🫶🏻
#pesonagorontalo #intimatewedding #bindawoodvilla', '2025-06-05 05:36:00+08'::timestamptz, 'https://www.instagram.com/reel/DKhNm4PySid/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11875, 6651, 125, 43, 10, 5, 0),
  ('bindawood__', 'A private villa with views like in Ubud ❣️🌾
-
-
Contact Us :
Bindawood Villa
Jl. kasmat Lahay, Desa Tamboo, Kab. Bone Bolango
082225314703 (WA/tlp)

#bindawoodvilla #privatevilla #villasawah #pesonagorontalo', '2025-01-19 03:20:00+08'::timestamptz, 'https://www.instagram.com/reel/DFATmPgyVV4/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11608, 6284, 220, 367, 76, 0, 0),
  ('blue.gto', 'Within the blue abyss, life sways in silence—marine creatures compose an unwritten verse.

#oceanwhispers 
#silentdepths 
#marinepoetry 
#blueeternity 
#unwrittenverses 
#danceofthedeep 
#soulofthesea 
#beneaththeblue 
#natureinsilence 
 #MysticWaters', '2025-08-13 01:53:00+08'::timestamptz, 'https://www.instagram.com/reel/DNSgZr5OQL0/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4631, 2450, 128, 9, 0, 6, 0),
  ('blue.gto', 'seeing it in a unique way will make it feel more precious

#freedive #gorontalo', '2025-08-09 06:20:00+08'::timestamptz, 'https://www.instagram.com/reel/DNIrv_1Nrrn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6439, 2871, 102, 3, 1, 4, 0),
  ('dki.coffee', 'Weekenders yukkkk

#DkiCoffee #BukitRanjau #Gorontalo', '2025-10-24 22:08:00+08'::timestamptz, 'https://www.instagram.com/reel/DQOEXWKkRHt/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 5472, 2875, 139, 14, 4, 2, 0),
  ('berliannhiola', 'Sudah pada tau belum kalau @hakoroastery itu colabs bareng @sujiexperiencebar @sujipremiumhandcrafted ?
Jadi kalau mau cobain berbagai macam experience rasa kopi ga perlu jauh-jauh ke bandung .
Selain ada gelas Trimaya (gelas sensori cup) dari suji di hakko , ada berbagai macam bean untuk kopi filter .
Di setiap seduhan bean rasanya akan berbeda ketika di minum pakai trimaya (Gelas sensori cup), Fyi mereka juga menjual alat-alat seduhan di Hakko .
Info more @lapasau.a', '2025-10-08 08:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DPjXoGTCc-o/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 9160, 4913, 81, 13, 1, 2, 0),
  ('arabmaklum88', 'LAOBAN KOPITIAM GORONTALO✨
Jl. D.I Panjaitan, Kel. Limba U 1
Kec. Kota selatan, Kota Gorontalo
Seblahnya Es Teh Indonesia
📱 @laoban.gorontalo 
.
#fyp #gorontalo #kulinergorontalo #gorontalohits #gorontalocity #gorontalounite #likegorontalo #laoban #laobankopitiam #kopitiam #rekomendasimakanan #reviewmakanan #enak #foodies #foodvlogger #sulawesi #instagood #instafood #instagram #reels #reelsi̇nstagram #arabmaklum', '2025-10-14 03:14:00+08'::timestamptz, 'https://www.instagram.com/reel/DPySxqrken-/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 10913, 6284, 118, 44, 7, 3, 0),
  ('arabmaklum88', 'Nasi kuning Itha khas Manado, Nasi kuning abon favorite dari awal ngonten. Cocok di lidah & dompet hihi🥰 #fyp #gorontalo #gorontalocity #gorontalohits #gorontalounite #likegorontalo #kulinergorontalo #nasikuning #nasikuningmanado #reels #reviewmakanan #rekomendasimakanan #foodvlogger #arabmaklum #sulawesi #manado #instagood', '2025-02-06 23:46:00+08'::timestamptz, 'https://www.instagram.com/reel/DFw3qQ3zMlt/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 36422, 22860, 742, 215, 35, 13, 0),
  ('arabmaklum88', 'Sarapan 2 piring Lontong Sayur khas Betawi di Gorontalo🥰 
📍 Jl. Prof. Dr. HB Jassin, Kel. Tomulabutao Selatan, Kec. Dungingi, Kota Gorontalo (Samping Dealer Astra Daihatsu Gorontalo) 
⏰ Buka Setiap Hari (07.00 WITA s/d Habis) #fyp #gorontalo #lontongsayur #kupattahu #kulinerjakarta #reels #kulinergorontalo #gorontalocity #gorontalounite #likegorontalo #gorontalohits #instagood #instagram #rekomendasimakanan #reviewmakanan #foodvlogger #sulawesi #arabmaklum', '2025-02-11 01:28:00+08'::timestamptz, 'https://www.instagram.com/reel/DF7UuI9TwSe/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 15839, 8603, 248, 126, 7, 0, 0),
  ('arabmaklum88', '🍽️ AYAM PENYET BANG YUS 
📍 Jl. Madura, Kel. Liluwo, Kec. Kota Tengah, Kota Gorontalo
Kompleks Taman Kuliner Kalimadu (Depan Indomaret Madura 3)
⏰ Setiap Hari (16.00 s/d 23.00 WITA)
👅 9/10
Dari semua menu yang di spill mana coba yang bekeng ngoni penasaran??? Tulis kolom komentar yaaa👇🏻 
#fyp #gorontalo #kulinergorontalo #gorontalohits #likegorontalo #gorontalounite #gorontalocity #rekomendasimakanan #reviewmakanan #ayampenyet #ayamgeprek #sambalijo #cabeijo #pedas #sambalmerah #instagood #instagram #foodvlogger #sulawesi #manado #arabmaklum #reels', '2025-02-16 01:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DGIO1Y-zd61/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 21400, 12938, 447, 161, 10, 14, 0),
  ('arabmaklum88', 'PENTOL BANG YUS🤤 
📍 Jl. Jendral Sudirman, Depan Kampus UNG
⏰ Buka Setiap Hari (17.00 s/d 23.00 WITA)
👅 9/10
Ngoni tim pentol kuah atau saus kacang? Komen dibawah neh😍👇🏻 #fyp #gorontalo #kulinergorontalo #pentol #pentolkuah #pentolpedas #pentolmercon #pedas #mercon #gorontalocity #gorontalohits #gorontalounite #likegorontalo #instagram #reels #rekomendasimakanan #reviewmakanan #jajanan #jajananenak #foodvlogger #sulawesi #manado #arabmaklum #reelsinstagram', '2025-02-18 00:28:00+08'::timestamptz, 'https://www.instagram.com/reel/DGNRrT6T83n/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 12190, 7230, 180, 86, 5, 8, 0),
  ('arabmaklum88', 'RM. SWADAYA
📍 Jl. HOS Cokroaminoto, Kel. Heledulaa Selatan, Kec. Kota Timur, Kota Gorontalo
(Kompleks Toko Plastik Gajah)
⏰ Buka Setiap Hari (09.00-23.00 WITA)
📲 0851 6273 1557
✨ @rmswadaya.gto 

Ayam mentega paling sadap di Gorontalo. Lagi ada Promo Special Ramadhan. Cuss😍🔥 #fyp #gorontalo #gorontalocity #reels #ayamgoreng #ayamgorengmentega #ayamkremes #ayammentega #kulinergorontalo #gorontalohits #gorontalounite #likegorontalo #rekomendasimakanan #enak #reviewmakanan #foodvlogger #foodies #arabmaklum #instagood #instagram #reelsinstagram', '2025-03-21 01:24:00+08'::timestamptz, 'https://www.instagram.com/reel/DHdFZB1T5E_/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 21288, 12542, 336, 191, 9, 10, 0),
  ('deadegobel_', 'Udah ngomongin branding, tpi kadang fotonya blur doang, terus mau gimana ya? 😫💅🏽

#personalgrowth #brandidentity #personalbrand #brandyourself #brandyourstyle #contentideasforyou #brandyourself', '2025-02-02 02:44:00+08'::timestamptz, 'https://www.instagram.com/reel/DFkUV2DzP0m/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 11074, 5158, 172, 2, 2, 14, 0),
  ('dki.coffee', 'Yang berantakan selain baju apa ya?

📍Bukit Ranjau
📹 @mrarvy 

#Gorontalo #BukitRanjau #DkiCoffee', '2025-06-23 03:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DLPZPDmTPmU/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 10385, 5490, 370, 20, 3, 7, 0),
  ('dki.coffee', '#BukitRanjau #DkiCoffee #Gorontalo', '2025-01-09 02:16:00+08'::timestamptz, 'https://www.instagram.com/reel/DEmeLkpTYSG/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 11941, 7065, 368, 20, 2, 2, 0),
  ('gorontalo.unite', 'Nah, lanjutan caption di video. 

Program bukber ini akan berlangsung mulai tanggal 3 sampe 28 Maret 2025. Menu yang disiapkan lebih dari 80 pilihan makanan loh

Setiap harinya nanti baku-baku ganti. Hari ini misal nusantara, besok danantara. yas gitu, antara seperti itu.', '2025-02-25 21:58:00+08'::timestamptz, 'https://www.instagram.com/reel/DGhmtB9SjNJ/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 4496, 2645, 50, 19, 1, 0, 5),
  ('gorontalo.unite', 'BERBURU TAKJIL @pukiskotabaru 🔥🔥🔥
.
📍Citra maja raya ruko, Jl. Tevana No.82 blok e70, Kec. Maja, Banten 42381
.
Konsisten dengan tekstur yang fluffy dan legit + topping yang BARBAR! Pukis jumbo viral ini sekarang punya varian PUKIS KLASIK dengan ukuran lebih kecil yang bikin auto nagih! 😆
.
Siap-siap serbu PROMO MENARIK BERKAH BULAN RAMADHAN - Paket Takjil Berkah, Paket Takjil Spesial, Paket Bukber Asik & Paket Bundling lainnya‼️
.
Masih berlaku juga promo:
📌BELI 6 GRATIS 1
Beli 6 Gratis 1 - Coklat 2, Keju 2, Coklat Keju 2
‼️FREE 1 PUKIS JUMBO ORI
.
📌BELI 10 GRATIS 2
Coklat 4, Keju 4, Coklat Keju 2
‼️FREE 2 PUKIS JUMBO ORI
.
PROMO PUKIS KLASIK (Ukuran lebih mini!)
.
📌Grabfood, Gofood, Shopeefood:
Pukis & Martabak Kota Baru', '2025-03-12 01:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DHF7eCYSGXy/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 7788, 4626, 105, 6, 0, 2, 3),
  ('gorontalo.unite', 'Pantesan jadi jajanan viral se-Indonesia! @pukiskotabaru
.
📍Jl. Nani Wartabone (Patokan: Sebelah Martabak Bang Awal - Deretan Yopie Salon)
.
Pukis TERJUMBO yang toppingnya BARBAR! Teksturnya super fluffy & LEGIT. Manisnya pas & gurih banget dengan banyak pilihan varian dijamin PUAS! Mau ukuran biasa yang lebih kecil? Sebentar lagi juga ada PUKIS KLASIK dengan ukuran reguler yang auto nagih! 😆
.
Pembelian via Grabfood, Gofood, Shopeefood:
✅Beli 10 Gratis 2‼️
✅Beli 6 Gratis 1‼️
✅Paket Arisan (DISKON 60.500)‼️
✅Paket Meeting (DISKON 138.500)‼️
.
Info selengkapnya check:
📌IG: @pukiskotabaru
📌Tiktok: @pukiskotabaru_asli
📌GoFood / GrabFood / ShopeeFood:
Pukis & Martabak Kota Baru', '2025-01-21 20:05:00+08'::timestamptz, 'https://www.instagram.com/reel/DFHSQeByc_9/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 14446, 8387, 179, 12, 1, 0, 10),
  ('rully3_', '💭💭💭', '2025-06-03 03:47:00+08'::timestamptz, 'https://www.instagram.com/reel/DKb5HNQTW98/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 11138, 6043, 270, 11, 0, 3, 0),
  ('sampingkampus', '', '2025-07-21 04:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DMXlJ3NvBhd/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 4412, 2347, 32, 3, 1, 0, 0),
  ('tanateman', 'BUKBER KALI INI BEDA ✨
Lebih seru dengan Bukber Di Tanateman, nikmati paket bukber dan variant menu lainnya. Kumpul bareng keluarga & bestie di Tanateman, nikmati suasana dan sajian special yang buat momen bukber makin berkesan. Yuk, reservasi sekarang juga!

Jangan lupa, reservasi maksimal H-1 ya! Cukup isi link di Bio. See you at bukber!

#semuabisajaditeman #bukberattanateman #temanbukber', '2025-03-13 22:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DHKvLapSlT9/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 19667, 13677, 78, 11, 7, 7, 0),
  ('meylan_phutry', 'Akad nikah adat GORONTALO.
Puput & Nirwan 💍👰🏻‍♀️

 #Akadnikah  #adatgorontalo  #hulondalo', '2025-10-25 21:40:00+08'::timestamptz, 'https://www.instagram.com/reel/DQQmMjTEhoo/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 14506, 7457, 127, 7, 1, 2, 0),
  ('disparekrafpora_gorontaloprov', 'Setelah untuk pertama kalinya dilaksanakan pada tahun lalu, Pada tahun ini Pemprov Gorontalo melalui Dispar Provinsi Gorontalo kembali menggelar festival Green Tumbilotohe 2025 dengan bertajuk kreativitas berbalut tradisi🤩💫

Masih bingung cara pembuatan lampu bebas emisi karbon? nih kita kasih tutorialnya!🪔🪫

Sampai berjumpa di Festival Green Tumbilotohe 2025!', '2025-03-20 02:05:00+08'::timestamptz, 'https://www.instagram.com/reel/DHalBiWTbpP/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 5384, 3099, 141, 21, 3, 0, 0),
  ('gorontalo.unite', 'The biggest open house ala warga Jawa Tondano di Gorontalo. 

Seminggu setelah Idulfitri, warga Jaton seperti di Kaliyoso, Mulyonegoro, Reksonegoro, Yosonegoro, dll. punya tradisi menyajikan ketupat lebaran, dodol, nasi jaha, opor ayam, untuk siapa saja yang berkunjung, bahkan bagi mereka yang tidak memiliki hubungan kekerabatan atau beda agama sekalipun.

Seiring berjalan waktu, perayaan ini telah menyebar di hampir semua tempat di Gorontalo. 

So, besok cari ketupat dimana? Biar memudahkan, tidak merepotkan, silahkan bawa rantang. 😆', '2025-04-05 20:35:00+08'::timestamptz, 'https://www.instagram.com/reel/DIFxnwoyt1v/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 11227, 6688, 227, 22, 2, 0, 5),
  ('gorontalo.unite', 'Lagu yang menceritakan tentang dua orang yang lagi merencanakan niat baik di masa depan. Laki-lakinya akan merantau (mo bite), cari nafkah di negeri orang, demi itu, demi niat baik di masa depan. 

Torabua Milango Hulondalo
Hihuloa ito dulota
Mo ela mayi sama sama
Hi wengahe hi sanangiya

Yio nou matola’u
Mo bite to lipu lo tawu
Mololohe ilimu umopiyo
Upotomulo lando dulota

Poluliya mayi batanga’u
Poduayi mayi salamati
Wa’u yio debo mo dunggaya to masa tuwawu.

Lagu ini diciptakan dr. Rusli Katili, yang kemudian dipopulerkan oleh Halim Rasyid, yang juga bertujuan baik, untuk melestarikan lagu daerah Gorontalo.', '2025-02-10 05:58:00+08'::timestamptz, 'https://www.instagram.com/reel/DF5QsfkSSjX/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 12319, 7498, 504, 52, 0, 8, 58),
  ('gorontalo.unite', 'Pulang bukan selalu tentang fisik, tapi tentang hati yang tetap merasa dekat, meski terpisah jarak yang jauh. ramadan tetap sama, meski tempat kita berada tidak lagi sama. 

Al-Fatihah untuk yang telah mendahului kita. 

Doakan yang terbaik juga buat yang tidak lagi bersama kita. Kuatkan hati dalam menerima dan meminta maaf. 

Marhaban Yaa Ramadan. ❤️', '2025-02-28 01:36:00+08'::timestamptz, 'https://www.instagram.com/reel/DGnJbXRSjp0/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 13477, 8519, 488, 43, 0, 6, 16),
  ('gorontalo.unite', 'The next level of Ketuk Sahur ala warga Kuala Tungkal, Kabupaten Tanjung Jabung Barat, Provinsi Jambi. Kreatifitas seperti ini biasanya lahir dari rasa kebersamaan dan juga adanya dukungan. Rema mudanya jadi makin bersemangat. 

Hal seperti ini bisa ditemukan di Gorontalo juga, tapi dengan level kreatifitas yang berbeda juga. Misalnya itu Koko’o, yang ramai awal Ramadan ataupun pada hari-hari menjelang Idulfitri. 

🎬 sumber di video.', '2025-03-05 06:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DG0frVzynZR/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 8891, 5324, 223, 1, 3, 1, 1),
  ('gorontalo.unite', 'Warga sekitar dan netizen lebih familiar menyebut nama masjid ini sebagai “Masjid Terapung”, tapi penamaan masjid ini sendiri berdasarkan dari posisinya langsung, tepi lautan yang selalu bercahaya karena tak ada penghalang.', '2025-03-06 01:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DG2ixoHSPMf/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 13610, 7257, 354, 16, 0, 1, 6),
  ('gorontalo.unite', 'Semua orang menunggu momen ini. Kalo misalnya terlewatkan, rasanya kayak nyesal banget. 

Padahal, debo odelo tabia to taawunu yila-yilaluumai. (sama kayak solat-solat sebelumnya)', '2025-03-29 20:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DHzvfzIy53b/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 9774, 5800, 606, 8, 3, 0, 19),
  ('gorontalo.unite', 'Selamat berbuka puasa, teruntuk seluruh warga Gorontalo yang menunaikannya dimanapun berada.', '2025-03-30 02:33:00+08'::timestamptz, 'https://www.instagram.com/reel/DH0Y0SLSx_O/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 4943, 2757, 96, 0, 0, 0, 1),
  ('yuliahotelgorontalo', 'Perayaan Cap Go Meh 2025 di Kota Gorontalo berlangsung meriah, menarik ribuan warga yang memenuhi jalanan untuk menyaksikan atraksi rangkaian acara umat Vihara Buddha Dharma Gorontalo. Berbagai atraksi budaya turut memeriahkan perayaan Cap Go Meh di Gorontalo, beragam kesenian turun ke jalan, mulai dari marching band, ondel-ondel, barongsai, tarian naga, musik bambu hingga kio joli dan berbagai arak-arakan lainnya. 🎊🏮🐍

Cap Go Meh, penutup Imlek yang penuh berkah! Semoga kebahagiaan dan keberuntungan selalu menyertai kita.✨

#GongXiFaCai #Imlek2025 #chinesnewyear #yuliahotelgorontalo #hotelindonesiagroup #highotels #room #staycation #visitgorontalo #gorontalounite', '2025-02-13 00:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DGAXBU4S-G9/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 7192, 4090, 196, 11, 4, 1, 0),
  ('gorontalo.unite', 'Bagi kak @aguslah_, lari adalah pilihan terbaik saat ini untuk menjaga tetap aktif & sehat. 

Sedangkan Pilihan terbaik untuk keperluan rumah tangga, memilih produk produk dari Modena Home Center.

Apalagi sekarang lagi ada Modena Clearance Sale di Modena Home Center (@mhc_gorontalo) - Jalan HB Jassin Kota Gorontalo dari tanggal 14 s/d 18 Oktober 2025.

Dapatkan produk Modena berkualitas dengan harga super terjangkau selama event berlangsung.

#ModenaClearanceSale
#ModenaGorontalo
#ModenaDeals
#Modenalndonesia', '2025-10-15 02:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DP0yCsckkRz/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 3828, 2138, 66, 16, 0, 2, 2),
  ('gorontalo.unite', 'Sebenarnya sih cuma mo liat-liat saja oto di Dealer Hasjrat Toyota Gorontalo....

Coba satu-satu, rasa langsung, eh ternyata Toyota ada kejutan juga bulan October ini. Uang muka mulai dari 15jt so boleh bawa pulang 1 unit. Manalagi depe servis, asuransi, sampe perawatan body so ta maso disitu dang. 

Ini kalo beli oto di Hasjrat Toyota, bisa dapa langsung hadiah dari program Drive & Win yang sadiki leh so mo abis. 

So, bagimana dang? yang seru-seru kadang datang kamari, pas torang lagi ndak ba cari to?

#HasjratToyota #ToyotaGorontalo #GorontaloHits #PromoMobilGorontalo', '2025-10-22 03:23:00+08'::timestamptz, 'https://www.instagram.com/reel/DQG6QcqEmfv/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 8163, 6126, 83, 13, 0, 3, 3),
  ('gorontalo.unite', 'Beginilah keseruan suasana Hajatan Cabang FIFGROUP Gorontalo, spesial pelanggan istimewa pada 24-25 Oktober kemarin. 

Bukan sekedar hajatan saja, tapi juga FIFGROUP dengan sejumlah layanan pembiayaannya seperti FIFASTRA, SPEKTRA, DANASTRA dan AMITRA yang dapat diakses melalui aplikasi FIFGO menawarkan beragam kemudahan pilihan. 

#HAJATANFIFGROUPdiGORONTALO
#HAJATANFIFGROUP2025', '2025-10-25 18:33:00+08'::timestamptz, 'https://www.instagram.com/reel/DQQQrKOk9yn/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 7988, 4324, 59, 13, 1, 6, 8),
  ('gorontalo.unite', 'Torang baru dapa rahasia dimana tampa cari mebel gaga-gaga di Gorontalo. Salah satunya disini, di Setia Furniture, di Jalan Trans Sulawesi, Bolihuangga, Limboto, yang pas-pas lagi bekeng event Olymplast Wonder10.

Yang bikin heboh, ada promo Beli 1 Gratis 1 sepanjang November. Beli Rak Buku BO ingsung dapat OSB storage gratis. Beli Lemari Pakaian, bonus container OBC. Meja & kursi teras cuma 270 ribuan.

Mulai tanggal 10 sampai 16 November 2025, puncak diskon buat 10 pembeli pertama, dimana harganya mulai 70 ribuan.

#olymplast #olymplastwonder1o #promoolymplast', '2025-11-13 23:21:00+08'::timestamptz, 'https://www.instagram.com/reel/DRBzRnFkuAC/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 4977, 2884, 35, 5, 1, 1, 10),
  ('gorontalo.unite', 'Kalau tinggal di Gorontalo dan sedang cari furniture berkualitas tanpa bikin dompet terkuras, ini saat yang pas.

Toko Rido Mebel di Jl. Limboto Raya No. 22, Hulawa, Gorontalo, Kabupaten Gorontalo, sedang jalanin promo Beli 1 Gratis 1 lewat event Olymplast Wonder10 sepanjang November.

• Beli Rak Buku ECO, dapat USB storage gratis
• Beli Lemari Pakaian, dapat container OBC
• Paket meja & kursi teras mulai 270 ribuan

Puncak promo berlangsung pada 10–16 November 2025, dan untuk 10 pembeli pertama tersedia hadiah menarik.

#olymplast #olymplastwonder10 #promoOlymplast', '2025-11-14 00:43:00+08'::timestamptz, 'https://www.instagram.com/reel/DRB9EkxktcW/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 3373, 2115, 19, 6, 1, 1, 2),
  ('gorontalo.unite', 'Dapur kinclong itu sebenarnya resep gampang. mood + alat yang bener. 

Nah, MODENA Home Center ngasih solusi simple, elegan, dan vibe jadi naik kelas. Misalnya dengan menggunakan MODENA BH-8725 HABK. 

Desainnya cakep, performanya ngacir. Cashback cuan gede, MCare+ ikut nge-backup. Estetik dapet, fungsi gas pol.

Bagimana? Kapan jalan-jalan ke Modena Home Center Gorontalo?', '2025-12-10 21:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DSHJlxsEox5/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 6193, 4349, 51, 4, 5, 0, 3),
  ('gorontalo.unite', 'Watch Club di Citimall Gorontalo re-opening lagi nih dengan konsep yang lebih kece dan koleksi yang bikin jatuh cinta pada pandangan pertama. 

Momen re-opening ini juga barengan dengan promo Natal & Tahun Baru. Diskon sampai 50% untuk brand favorit, mulai dari Guess, Seiko, Christ Verra, Hush Puppies, Reebok, Caterpillar.Ditambah lagi dengan free gift selama persediaan masih ada.

Semuanya original bergaransi resmi, jadi belanja tenang, pakai pun pede. 

Ada juga layanan service, ganti baterai, sampai spare part.

Catat deh, promonya ini hanya berlaku sampai dengan tanggal 29 Desember 2025. So, jangan sampe kelewatan lagi.', '2025-12-11 03:15:00+08'::timestamptz, 'https://www.instagram.com/reel/DSHv4HLErPK/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 14376, 10515, 202, 6, 10, 4, 7),
  ('gorontalo.unite', 'Everbest, effortless, timeless. 

Ada yang tau, @bellasyafiraa_ kaget kenapa? Jawabannya ada di Everbest Citimall Gorontalo.', '2025-12-14 01:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DSPSKXWEkuf/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 7154, 3815, 46, 5, 1, 3, 5),
  ('gorontalo.unite', 'Ini dia festival kuliner yang terbesar yang pernah ada di Gorontalo. Gebyar Kuliner mengusung tema Jakarta Pecinan Halal Viral, hadir di Parkir Utara Citimall Gorontalo dari tanggal 17 sampai dengan 25 Desember 2025. 

Ujang-ujang deng lapar-lapar begini, jadi bekeng tambah suasana, suasana tambah makan. Kamari jo, cuma 5 hari ini. Abis itu abis.', '2025-12-19 01:07:00+08'::timestamptz, 'https://www.instagram.com/reel/DScH04AklrD/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 10471, 5959, 103, 12, 0, 5, 6),
  ('gorontalo.unite', 'Toko Bintang Gorontalo yang dikenal sebagai pusat aksesoris & spare part handphone terlengkap, termurah, dan bergaransi untuk semua kebutuhan gadget kamu, resmi dibuka di Gorontalo. 

Rayakan kehadiran Toko Bintang di Gorontalo dengan kesempatan menang undian TRIP TO BALI, untuk setiap pembelian Rp100.000 dapat 1 kupon (berlaku kelipatan), plus spinwheel berhadiah mulai dari emas 1 gram.

Datang lebih awal, 20 pengunjung pertama dapat harga VIP dan ada photobooth 360 tanpa minimum pembelian. 

Gimana, udah tau kan lokasi Toko Bintang? Yess. Jl. Prof HB Jassin, Kel. Limba U2, Kota Gorontalo', '2025-12-19 21:49:00+08'::timestamptz, 'https://www.instagram.com/reel/DSeV9aykov3/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 8020, 4924, 66, 9, 3, 1, 7),
  ('gorontalo.unite', 'Gadget Care Indonesia di Toko Bintang siap menangani service dengan teknisi profesional, alat berstandar internasional, dan garansi servis hingga 12 bulan. 

Menariknya lagi, proses pengerjaan bisa ditunggu dan dipantau langsung karena direkam kamera. 

Servisnya transparan dan terpercaya: spare part asli tersedia (LCD, baterai, dll), pengerjaan rapi, dan hasil kerja juga sudah berkualitas.

Toko Bintang - Jl. Prof HB Jassin, Kel. Limba U2, Kota Gorontalo', '2025-12-19 22:02:00+08'::timestamptz, 'https://www.instagram.com/reel/DSeXhMXElS1/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 6873, 3847, 88, 4, 1, 0, 3),
  ('gorontalo.unite', 'Buccheri hadir lagi dengan koleksi sepatu dan tas berkualitas premium yang super eksklusif! 

Ada promo spesial khusus bazaar nih, diskon sampai dengan 50%, sama yang paling mantap, bisa cicilan 0% pakai Indodana, Kredivo, atau Kartu Kredit Mandiri

Yuk, kunjungi langsung store Buccheri di Gorontalo, Jl. HOS Cokroaminoto, tepat di depan Citimall Gorontalo. Jangan sampai ketinggalan promonya lagi.', '2025-12-24 00:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DSo8fs9ksvW/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 7943, 4487, 78, 5, 0, 3, 2),
  ('gorontalo.unite', 'Tracce Citimall Gorontalo sekarang lagi ngadain special holiday deals dengan diskon up to 50% yang bikin hati bergetar. 

Ada juga item-item yang diskonnya sampai 70%, spesial banget buat menyambut liburan akhir tahun.

Di Tracce, lengkap banget loh, sepatu pria, wanita, sampai anak-anak semua ada. Modelnya up to date, trendy, cocok buat daily, casual, bahkan ke kantor. 

Jangan kelamaan ya, promo ini cuma sampai 11 Januari 2026!#', '2025-12-28 03:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DSzhMSFko_k/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 4549, 3131, 27, 2, 0, 1, 1),
  ('bank_indonesia_gorontalo', '[STOP Judi Oline🚫]

Siapa nih yang ingin cepat kaya secara instan dengan melakukan judi online? Jangan ya dek ya ❌

Judi online bukan hanya merugikan, tapi juga bisa menghancurkan masa depan. Jangan biarkan diri kita terjebak dalam godaan yang merusak. Pilihlah jalan yang lebih baik untuk masa depan yang cerah! Ayo, lebih bijak lagi menggunakan platform media sosial kita

#disetiapmaknaindonesia
#GeberPK
#KonsumenCerdasPeKABertransaksi', '2025-03-26 01:52:00+08'::timestamptz, 'https://www.instagram.com/reel/DHp_5P9yl8d/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 4363, 2366, 36, 0, 0, 1, 0),
  ('gorontalo.unite', 'Grab Gorontalo Buka Pendaftaran untuk Driver Online Manapun!

Kalau kamu udah punya aplikasi lain, sekarang saatnya gabung jadi bagian keluarga Grab!

Grab buka pendaftaran dengan tangan terbuka, GRATIS, dan tanpa ribet!

Syaratnya gampang, cuma butuh dokumen yg kamu punya saja✅

Proses cepat, cuma 20 menit langsung aktif dan siap narik.
Mau? Langsung download di aplikasi GRAB DRIVER yang ada di playstore atau hubungi admin kita ya!🫵🏻

#GrabGorontalo #DriverGrab #GrabTanpaRibet #GabungGrab #Gorontalo', '2025-09-23 00:45:00+08'::timestamptz, 'https://www.instagram.com/reel/DO79VhQjjv9/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 35493, 15958, 393, 69, 0, 14, 13),
  ('gorontalo.unite', 'Ada momen seru yang gak bisa dibeli:
ketawa di perjalanan, teriak waktu smash, cerita pulang bareng tim.

Step WGN bukan cuma mobil, tapi bagian dari “Padel All Day” experience.

Kalau kamu punya 1 hari full bareng Step WGN, kamu bakal pakai buat apa?

#Hondaisme #HondaOutsideJava #HondaStepWGN', '2025-09-20 02:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DO0a7XBEiCQ/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 15200, 7377, 147, 1, 0, 8, 7),
  ('gorontalo.unite', 'September, S-nya apa dong kaka? SEMANGAT !!

September makin untung bersama Toyota.
• New Rush DP 15jutaan
• Innova Zenix DP 60jutaan
• New Fortuner DP 69jutaan

Dapat subsidi trade-in sebesar 3jt
Gratis jasa & suku cadang, asuransi all risk 2 tahun, dll. 

Selengkapnya cek di @hasjrattoyota 
https://hasjrat-toyota.co.id/', '2025-09-17 17:37:00+08'::timestamptz, 'https://www.instagram.com/reel/DOuUOD0Eudy/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 5386, 3365, 67, 5, 0, 6, 4),
  ('gorontalo.unite', 'Hadirkan kenyamanan dan kemudahan di rumah Anda.

MODENA (@mhc_gorontalo) siap lengkapi setiap sudut rumah dengan teknologi dan desain modern.
🛒 Yuk, lengkapi kebutuhan rumah tangga anda!✨

Segera Kunjungi Modena Home Center Gorontalo, Jalan HB Jassin Kota Gorontalo. 

Promo Double Cashback dan gift ekslusif untuk pembelanjaan minimal 2 Juta.

#ModenaHomeCenter
#MHCGorontalo
#MODENAmakelifeeasier
#modena
#modenaindonesia', '2025-05-20 06:35:00+08'::timestamptz, 'https://www.instagram.com/reel/DJ4ErV9z-tO/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 5573, 2823, 40, 3, 0, 2, 3),
  ('gorontalo.unite', 'Belanja kebutuhan rumah tangga gak harus mahal, apalagi kalau di AZKO! 

Dari A sampai Z, semua lengkap dan lagi Boom Sale besar-besaran. Diskon sampai 70%, cashback sampai Rp1 juta rupiah — siapa yang tahan?

koper, kipas, rak besi, sampai kabinet bisa kamu dapatin dengan harga jauh lebih hemat. Bahkan ada yang beli 1 gratis 1! semuanya bisa anda temukan langsung di AZKO. 

Promo ini cuma dari 28 Mei - 24 Juni 2025 ya. Jadi, jangan sampai ketinggalan. Weekend juga makin seru karena ada Boom Deals, tebus hemat, dan promo spesial buat member.

Buruan ke AZKO terdekat dan rasain sensasi belanja hemat yang gak setengah-setengah! 

#AZKO
#AZKOBaruGakMestiMahal
#BaruGakMestiMahal', '2025-06-10 23:45:00+08'::timestamptz, 'https://www.instagram.com/reel/DKwDnOjThHq/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 3325, 2099, 27, 5, 0, 1, 2),
  ('gorontalo.unite', 'Pet Lovers Gorontalo 4th Anniversary x INDOGROSIR  Gorontalo mempersembahkan rangkaian kontes GRATIS!

🗓️ 16-22 Juni 2025
📍 Indogrosir Gorontalo

Jadwal Kontes:
 * Reptile Contest: Jumat, 20 Juni (19.00 WITA)
 * Cat Fashion Show: Sabtu, 21 Juni (19.00 WITA)
 * Ayam Ketawa Contest: Minggu, 22 Juni (15.00 WITA)

Dan masih banyak lagi pokoknya.', '2025-06-18 19:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DLEM-qsTIbG/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 12700, 7282, 139, 71, 2, 0, 9),
  ('gorontalo.unite', 'Internetan di Gorontalo kini makin seru bareng smartfren!

Jaringan makin luas, sinyal makin kuat, dan pastinya bikin pengalaman internetan jadi makin menyenangkan 🤩

Cukup pakai kartu perdana Unlimited Suka-suka dari smartfren – mulai dari Rp20 ribuan untuk masa aktif 10 hari, dengan kuota harian 2GB! Gak perlu khawatir soal kuota, tinggal pakai sepuasnya!

Yuk, dapatkan di outlet terdekat atau cek info lengkapnya di smartfren.com ~

#smartfren #UnlimitedSukaSuka #100PersenUntukIndonesia', '2025-06-19 01:35:00+08'::timestamptz, 'https://www.instagram.com/reel/DLE37RXO6MZ/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 5722, 3211, 31, 2, 0, 0, 2),
  ('gorontalo.unite', 'Platinum Cellular & Samsung Experience Store lagi ada promo besar-besaran tuh di Citimall Gorontalo. Beli Samsung S24 Edge, Samsung Galaxy S24 Ultra, S25 Ultra, Zflip 6, Zfold 6, langsung dapat mesin cuci dan kulkas tanpa di undi.', '2025-06-24 07:07:00+08'::timestamptz, 'https://www.instagram.com/reel/DLSUgCYSkFE/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 16271, 8527, 130, 17, 1, 1, 2),
  ('gorontalo.unite', 'Awalnya cuma niat liat-liat di toko AZKO, eh… malah nemu solusi buat hidup yang lebih teratur: STORA.

Cuma gara-gara satu Organizer Drawer kecil, rumah rasanya jadi lebih nyaman. Rapi, estetik, dan nggak sumpek lagi. Yang tadinya barang numpuk di pojokan, sekarang semua punya tempatnya sendiri.

Dari box multifungsi, rak kekinian, sampai storage serbaguna, STORA by AZKO cocok banget buat segala fase hidup: anak kos, new parents, yang lagi pindahan, atau yang pengen upgrade interior biar makin betah di rumah.

Bahannya kokoh, bentuknya kece, dan gampang dipindah-pindah. Harga? Mulai dari Rp 99 ribuan aja!

Coba deh #StoraYourWay sekarang juga —
langsung ke toko AZKO terdekat atau via aplikasi ruparupa.

Follow juga @azko.id & @storastorage buat inspirasi storage harian kamu.

#AZKO #StoraBaruUntukStoryBaru #STORA', '2025-04-20 22:03:00+08'::timestamptz, 'https://www.instagram.com/reel/DIsi-Muycks/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 4840, 3126, 15, 7, 0, 1, 2),
  ('gorontalo.unite', 'Bulan Ramadan begini, makin banyak dong tentunya kebutuhan, nahhh di AZKO kamu bakalan dapat 1001 alasan yang menginspirasi untuk menemukan alasan untuk berbuat lebih banyak untuk perbaikan rumah dan hal lain di bulan Ramadan ini.

Mulai dari perlengkapan rumah, alat masak memasak, bahkan hingga hampers, bisa ditemukan di AZKO, yang membuatnya lebih mudah dan lebih menyenangkan untuk meningkatkan momen sehari-hari.

#AZKO  #1001AlasanBisaLebih', '2025-03-06 22:56:00+08'::timestamptz, 'https://www.instagram.com/reel/DG44PVoyJa6/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 3057, 1946, 26, 1, 0, 3, 5),
  ('gorontalo.unite', 'Memasuki 10 hari kedua di bulan suci Ramadan, nampak pola dan perilaku ekonomo warga mulai berubah. 

Dari yang awalnya mempersiapkan untuk Ramadan, menjaga stok tetap tersedia, yang sewaktu-waktu dapat digunakan saat buka puasa atau sahur, dan juga warga yang nampak mulai siap menyambut Idulfitri dengan beragam kebutuhan juga tentuya.

Belanja kebutuhan buka & sahur selama bulan suci Ramadan? Paling enak di MURAA SUPERMARKET! 

Lokasi strategis & harga dijamin MURAH! Yuk, belanja hemat & nyaman hanya di MURAA!', '2025-03-12 00:48:00+08'::timestamptz, 'https://www.instagram.com/reel/DHF2VNyScIY/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 8892, 4869, 127, 2, 1, 4, 6),
  ('gorontalo.unite', 'Sering ngira Buccheri itu brand luar? Padahal ini asli Indonesia dan kualitasnya premium! 🤩

Dari desain elegan, nyaman dipakai, sampai tahan lama—Buccheri selalu jadi pilihan tepat buat tampilan stylish di Hari Raya.

Sekarang lagi ada Ramadan Sale 20% (sampai 6 April 2025) dan promo reguler up to 50%! Plus, kalau jadi member Buccheri Privilege Club, kamu bisa dapetin cashback poin & cicilan 0% pakai Kredivo atau Indodana.

Gimana? Udah nggak ada alasan buat nggak tampil maksimal di Lebaran ini! Yuk, langsung ke BUCCHERI Gorontalo atau cek promo spesialnya di Live TikTok! 🛍️

#Buccheri #RamadanSale', '2025-03-16 01:47:00+08'::timestamptz, 'https://www.instagram.com/reel/DHQQWrbSEMs/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 6354, 4196, 30, 7, 0, 12, 4),
  ('gorontalo.unite', 'Awal cerita evolusi, AZKO yang awalnya ACE Hardware Indonesia kini menawarkan pengalaman berbelanja dengan konsep yang lebih modern dan tentunya pelayanan yang juga ruaaamaaaahh banget. 

Di AZKO, kita banyak menemukan segala perlengkapan rumah, perlengkapan sehari-hari dan juga beberapa hal-hal kebutuhan untuk Ramadan dan Idulfitri.

@azko.id Adalah #AwalCeritaEvolusi #DariSiniBisaLebih
#1001AlasanBisaLebih', '2025-03-25 02:02:00+08'::timestamptz, 'https://www.instagram.com/reel/DHndKiEyTG9/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 2979, 1828, 21, 4, 0, 1, 4),
  ('gorontalo.unite', 'Momen lebaran tampil beda, dengan Eid Collection ala @celcius_idn bikin suasana tambah cerah ceria. 

Selain eid collection, temukan juga beragam koleksi lainnya, seperti Outdoor Collection dan juga edisi Celcius collab dengan Squid Game. Beberapa item koleksi berlaku promo lebaran loh, ada yang 30% dan juga diskon 50%. 

CELCIUS di Gorontalo tepatnya di Lantai 2 Citimall Gorontalo. 
#Celcius #PromoLebaran #FashionDeal', '2025-03-29 19:56:00+08'::timestamptz, 'https://www.instagram.com/reel/DHzqzyRSgkS/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 3352, 2001, 20, 4, 1, 1, 3),
  ('narwastugorontalo', '', '2025-08-04 19:35:00+08'::timestamptz, 'https://www.instagram.com/reel/DM9OwTkyhiD/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 9415, 5993, 79, 58, 24, 2, 0),
  ('platinumcell.id', 'Feel seen with an iconic look.

Dapatkan inspirasi dan ekspresikan diri Anda dengan Galaxy Tab S10 FE dan Tab S10 FE+ yang ramping dan bertenaga AI dengan S Pen. 

Aksen warna terang pada detail desain menambahkan sentuhan keren untuk tampilan yang menarik perhatian. 

Dapatkan warna Gray, Silver atau Blue hanya di Samsung Experience Store di Platinum Cellular. Jl. HB Jassin, No. 19, Kota Gorontalo.', '2025-09-02 05:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DOGZSf-E6sO/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 3043, 1953, 22, 2, 0, 0, 0),
  ('platinumcell.id', 'Jadi, tertarik iPhone mana nih? Tersedia di Platinum Cellular loh. 

iPhone 13 128GB - Rp8.249.000
iPhone 15 128GB - Rp10.999.000
iPhone 16 128GB - Rp13.999.000', '2025-08-29 04:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DN2yLqGZnHF/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 4258, 2319, 24, 2, 3, 0, 0),
  ('platinumcell.id', 'Galaxy Z Fold7 dengan Galaxy AI sudah hadir di Platinum Cellular!

✨ Special Launch Promo:
💰 Benefit hingga Rp 3,5 Juta
🛡 Gratis Proteksi Layar hingga 2 Tahun
🤖 Gratis Google AI Pro selama 6 bulan

Periode promo: 15 Agustus – 15 September 2025

Kunjungi sekarang juga Platinum Cellular – Jl. HB Jassin No. 19, Limba U1, Kota Gorontalo', '2025-08-20 00:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DNkVMmbzmaK/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 3346, 2199, 38, 3, 0, 0, 0),
  ('platinumcell.id', 'Kamu suka fotografi tapi tetap pengen hemat? 

Ini dia OPPO Reno 14 5G hadir dengan kamera utama 50 Megapiksel plus lensa telefoto 50 MP dan ultra-wide 8 MP! dan OPPO Reno 14 F 5G dibekali lensa makro dan ultra-wide standar.

Kedua HP ini punya desain belakang berubah warna dan layar AMOLED kece.

Tertarik? Langsung datang ke Platinum Cellular, Jl. HB Jassin No. 19, Limba U1, Kota Gorontalo.', '2025-08-04 02:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DM7WobLzSGl/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 4590, 2892, 35, 16, 1, 0, 0),
  ('platinumcell.id', 'Ini dia Samsung Galaxy Z Fold6. 

Kesempurnaan yang terbuka. Layar super tipis dan produktif, dengan Galaxy AI hadir di perangkat lipat ini. 

Abadikan setiap momen dengan ProVisual Engine dan Super HDR yang mencerahkan setiap gambar.

Samsung Galaxy Z Fold6 lagi promo nih sekarang, diskon sampai 1jt serta ada tambahan bonus lainnya. Cek sekarang juga di Platinum Cellular, Jl. HB Jassin, No. 19, Kel. Limba U1, Kota Gorontalo, yang juga melayani pembayaran dengan cara cash dan credit, silahkan inbox untuk tanya-tanya atau chat WA di nomor 085231067888', '2025-07-10 23:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DL9Y2puzsIJ/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 4073, 2450, 28, 7, 0, 0, 0),
  ('gorontalo.unite', 'Amankan Ko Pu Tiket! 

Suara Tana Timur Gorontalo dikuasai mereka yang bikin Pestanya Anak Timur, full goyang dari awal sampai selesai! Jangan sampai lolos! 🥳

🗓️ 25 Oktober 2025
📍 Stadion Merdeka 

Pembeli tiket harus berumur 21 tahun ke atas

📢Tiket tersedia di loket.com/suaratanatimur, Cafe & Komunitas pilihan ‼️

Pesta segera dimulai di tanah kita sendiri.
#BergemaBerirama di #SuaraTanaTimur

@suaratanatimur
@antara.suara
@ourpositivibe', '2025-10-17 03:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DP6C8neEnWo/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 18571, 9106, 217, 97, 2, 7, 10),
  ('gorontalo.unite', 'Momen keseruan Jayapura yang luar biasa! 🔥

Terima kasih sudah jadi bagian dari momen penuh energi di Suara Tana Timur Jayapura 🎶

Sekarang saatnya kita Gemakan Suara Anak Timur ke Gorontalo —
Sampai jumpa di Stadion Merdeka, 25 Oktober 2025!

@suaratanatimur
@antara.suara
@ourpositivibe', '2025-10-17 04:10:00+08'::timestamptz, 'https://www.instagram.com/reel/DP6H6csEgX-/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 6425, 3063, 50, 4, 0, 0, 3),
  ('pyurforyou_gto', 'Pyur diserbu makhluk aneh — dari vampir sampe penyihir, semua datang ba party!💀🎃

so siap ngo ba halloween di Pyur?😈
Sampai jumpa di malam sabtu penuh misteri nanti....🦇

#PyurForYou #PyurGorontalo #AlwaysForYou #Halloween', '2025-10-30 07:18:00+08'::timestamptz, 'https://www.instagram.com/reel/DQb7nwZkvHQ/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 24386, 11989, 413, 80, 5, 20, 0),
  ('gorontalo.unite', 'Tak terasa, pertemuan kita, tinggal 4 Hari Lagi❗️🥹👻

Rumah hantu & Mobil hantu Terseram di Gorontalo

“Gerbang Gaib Gorontalo”
09 Oktober - 09 November 2025

BUKA SETIAP HARI
Senin - Minggu : 13.00 - 22.00 WITA
ISTIRAHAT
Senin - Minggu : 18.00 - 19.00 WITA

HARGA TIKET
Senin - Minggu : 25.000 / Orang

📍LOKASI
Mega Zanur Mall ( Gelael ) - Lt 2

Follow dan tag
@rumahhantuindonesia

Tag orang terdekat yang mau kamu ajak masuk wahana ini 👻✨

#rumahhantugerbanggaib
#mobilhantugorontalo
#gerbanggaibgorontalo
#rumahhantugorontalo
#rumahhantuindonesia', '2025-11-05 03:01:00+08'::timestamptz, 'https://www.instagram.com/reel/DQrB89iEtLJ/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 16597, 8327, 124, 40, 2, 3, 6),
  ('pyurforyou_gto', 'Bukan party biasa, tapi ini Halloween Party di Pyur🎃 

Depe vibes yang penuh misteri, dan banyak makhluk-makhluk dari dimensi lain ikut meramaikan party kali ini🕺 

Buat yang ketinggalan torang baku dapa ulang di tahun depan🌟 

#PyurForYou #PyurGorontalo #AlwaysForYou #HalloweenForYou', '2025-11-11 21:14:00+08'::timestamptz, 'https://www.instagram.com/reel/DQ8bwyoEnnq/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 12612, 6921, 120, 22, 2, 3, 0),
  ('connextion.25', 'Looking for entertainment that’s both fun and relatable? 🤔Here’s the answer! ✨

​Ever SLKR, Sedjiwa, Aldi Itam, and Fikri Gondrong are bringing their latest comedy sets from Stand Up Lo Hulonthalo! 🎤🔥
​Get ready to laugh out loud and enjoy an amazing performance at "CONNEXTION". 🤩

​Stay tuned for more updates by following @himakomung & @belelokomunikasi. Your support, suggestions, and feedback are greatly appreciated!', '2025-12-17 05:41:00+08'::timestamptz, 'https://www.instagram.com/reel/DSXdazPkuaI/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 5541, 2855, 64, 8, 0, 4, 0),
  ('connextion.25', 'Looking for entertainment that’s both fun and relatable? 🤔Here’s the answer! ✨

​Ever SLKR, Sedjiwa, Aldi Itam, and Fikri Gondrong are bringing their latest comedy sets from Stand Up Lo Hulonthalo! 🎤🔥
​Get ready to laugh out loud and enjoy an amazing performance at "CONNEXTION". 🤩

​Stay tuned for more updates by following @himakomung & @belelokomunikasi. Your support, suggestions, and feedback are greatly appreciated!', '2025-12-17 05:48:00+08'::timestamptz, 'https://www.instagram.com/reel/DSXeXAZktIe/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 9717, 4704, 103, 21, 0, 5, 0),
  ('ayhuismail', 'Gorontalo Karnaval akarawo 2025 ✨
Lovely yellow ✨
Thankyou @bank_indonesia_gorontalo 🖤 as always make me feeling like an angel ✨

#fyp #karnaval #carnival #festivalkarawo #karnavalkarawo #gorontalo #gorontalokarnaval #gorontalokarnavalkarawo #gkk2025 #gkk', '2025-10-09 00:23:00+08'::timestamptz, 'https://www.instagram.com/reel/DPlHKliEbDk/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 19361, 9939, 292, 5, 0, 8, 0),
  ('airfunrun', 'Segera Daftar 🔥🔥
Link Daftar ada di BIO, ada Diskon Khusus Hari ini

#airfunrun #gorontalo #wulanguritno', '2025-06-27 01:51:00+08'::timestamptz, 'https://www.instagram.com/reel/DLZe9DzznWK/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 18741, 7339, 166, 74, 7, 0, 0),
  ('elproduction_id', 'Final Line Up GORONTALO!

Mana suaranya nih para X-friends Gorontalo yang udah setia Nungguin?!

Di event #troyproject kali ini, bakal di meriahkan juga sama @officialjabreak @djdesaofficial @pacenenong199x dann @totoncaribo lhooo!!

Segera amankan tiketmu dengan cara melalui link yang tertera di bio ig @elproduction_id , melalui situs yesplis atau langsung scan barcode di akhir video!

Buletin tanggal di kalendermu biar ga kelewatan dan amankan tiketnya!

#TroyProject
#TipeXdiGorontalo #TipeXorcheska #Orcheska #TipeX #3DekadeTipeX #TipeXday #Ska #Xelebration #IndoneSka', '2025-09-12 20:32:00+08'::timestamptz, 'https://www.instagram.com/reel/DOhwNilkxq9/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 58286, 36127, 658, 114, 7, 18, 0),
  ('fadelmuhammadofficial', 'Jangan lewatkan Halal Bi Halal Lamahu & Silaturahmi Nasional pada Sabtu, 24 Mei 2025 pukul 09.00 WIB di Nusantara IV, Kompleks MPR/DPR/DPD RI, Senayan Jakarta. Saatnya bersua, bersilaturahmi, dan memperkuat persaudaraan.', '2025-05-20 07:41:00+08'::timestamptz, 'https://www.instagram.com/reel/DJ4QKJ5zZ1Q/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 14387, 9205, 339, 86, 14, 23, 0),
  ('gorontalo.unite', 'Langkah kecil, semangat besar! 
smartfren Run Gorontalo sukses ngajak warga buat hidup lebih sehat & aktif.

Dalam kesempatan ini, smartfren juga memperkenalkan produk unggulan UNLIMITED SUKA-SUKA, Paket internet yang fleksibel bahkan setelah FUP harian sudah habis. 

selain itu layanan 4G LTE dan VoLTE smartfren yang sudah diperluas sampai Provinsi Gorontalo melalui PT XLSMART Telecom Sejahtera Tbk (XLSMART)! auto ngebutt!
Siap ikutan lari bareng lagi di kota selanjutnya? 🏃‍♀️✨

@smartfrenrun @smartfren.sulawesi_official 
#smartfren #smartfrenRunGorontalo #100PersenUntukIndonesia', '2025-08-07 01:11:00+08'::timestamptz, 'https://www.instagram.com/reel/DNC-gEFSwSh/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 7106, 3423, 87, 3, 0, 0, 3),
  ('gorontalo.unite', 'Panggilan bagi para tenant F&B di Gorontalo! 📢

Ingin memperluas jangkauan bisnis/kulinermu?

Yuk, para pelaku bisnis kuliner/ UMKM bergabunglah dengan Event Dino & Friends Gorontalo🙌🏻

More Info? WhatsApp 0819 0532 6528

Yuk buruan daftar sebelum kuota abiss!!🤧

#dinoandfriends #gorontalo #dinosaurus #dino #funderlandindonesia #tenant #umkm #event', '2025-01-18 01:10:00+08'::timestamptz, 'https://www.instagram.com/reel/DE9hhCqSZm-/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 19763, 10929, 290, 207, 13, 36, 19),
  ('medleycoffee_', '“We’re thrilled to announce that our doors are officially open! Step into a cozy space filled with great vibes, delicious flavors, and unforgettable experiences. Whether you’re here for a cup of coffee, a tasty treat, Medley Coffee is the perfect spot to make your day brighter.

We look forward to serving you. Cheers to new beginnings!” 🥂', '2025-01-20 18:24:00+08'::timestamptz, 'https://www.instagram.com/reel/DFEhs5pT--d/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 10790, 6780, 132, 6, 6, 20, 0),
  ('syabab.ofcl', 'Coming soon Gorontalo ✨

Sharing time syabab official to gorontalo
@basyasman 
@shofwan.elmarusy
@syabab.ofcl

Kamu pernah berfikir kok hidup saya selalunya bermasalah, apakah allah marah kepadaku

Buat kamu yang masih bingung! Tenang sharing time with LORA KADAM SIDIK akan hadir di kotamu 

Sharing time gorontalo
“MENGAPA AKU MENJADI SASARAN UJIANMU?”
🗓️ ahad, 24 agustus 2025
⏰ pukul 09.00-12.00 WITA 
📍 ballroom hotel fox gorontalo,

Pembelian tiket melalui
Cp. 087777297652 (minsyab)

Jangan sampai kehabisan tiket !

#syababofficial #kadamsidik #gorontalo', '2025-08-20 04:20:00+08'::timestamptz, 'https://www.instagram.com/reel/DNkyv9nvBlb/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 61209, 32864, 2033, 243, 17, 43, 0),
  ('galeryboalemo', 'Spot Sunset Terbaru yang paling banyak di kunjungi Saat ini di tilamuta, bukit Pentadu barat menawarkan keindahan alam sekitar perkebunan yang berhadapan langsung dengan laut teluk Tomini. 

Video @hiyango_wirsan97 

#boalemo #galeryboalemo', '2025-10-18 00:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DP8THg4EeAu/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 9555, 4913, 195, 12, 2, 2, 0),
  ('cleopattrabeach', 'Selasa Snya apa?
Sunset di Cleopattra Selalu indah😍😍😍
#cleopattrabeachresort 
#sunset 
#gorontalo', '2025-10-20 21:16:00+08'::timestamptz, 'https://www.instagram.com/reel/DQDrjB2Egh7/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 2966, 1867, 27, 7, 0, 0, 0),
  ('nuzuuuul____', 'Desa Bajo Kec Tilamuta
#sukubajo #sukubajoindonesia', '2025-11-02 05:56:00+08'::timestamptz, 'https://www.instagram.com/reel/DQjnLbVkw2x/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 6887, 4324, 35, 4, 0, 0, 0),
  ('gorontalo.unite', 'Hal yang kita anggap biasa saja ini, sebuah kemewahan bagi mereka yang jarang menikmatinya. yes, suasana sore-sore di jalanan, sambil sepedaan, kiri kanan ada pohon-pohon yang teduh. 

Inframe: 
@bikebaikajawell 
@takinoristya 
@herryyanto.hs', '2025-11-15 01:58:00+08'::timestamptz, 'https://www.instagram.com/reel/DREqfFykmph/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 5318, 2772, 124, 8, 3, 1, 1),
  ('gorontalo.unite', 'Jl. Usman Isa, satu-satunya jalan yang jadi penghubung antara Kota Barat dan Batudaa/Bongomeme. 

Sebagai alternatif dari jalan ini yang makin lama makin sempit, Pemprov Gorontalo berencana membelah gunung sebagai alternatif rute dari Piloloda’a, Kota Barat hingga tembus ke Iluta, Batudaa dalam 2 segmen dengan menggunakan Dana PEN. 

Perencanaan sudah dimulai dari tahun 2016, pekerjaan segmen kedua dengan jarak 6km di tahun 2022, dan tahun 2023 mulai bisa digunakan. 

Sekarang sudah tahun 2025 akhir. 😃
yang mau videonya, download saja. Direkam saat pulang ujan-ujanan pake ZX25R & iPhone 13.', '2025-11-20 00:52:00+08'::timestamptz, 'https://www.instagram.com/reel/DRRaP9VklN6/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 11050, 6117, 339, 8, 1, 2, 20),
  ('gorontalo.unite', 'Lagu dan momentnya mengingatkan pada sesuatu, hari dimana mereka yang di tongkrongan masih sering sama-sama, pagi ke malam, repeat. sekarang semua fokus di kehidupannya masing-masing.', '2025-11-26 01:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DRg9Q0MEszq/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 9545, 4523, 201, 2, 0, 3, 6),
  ('bikebaikajawell', 'Two Wheels, Full Power.. 
Sehat itu dibangun, bukan ditunggu.. 

#bikebaikaja #sepedaindonesia #gorontalo', '2025-12-02 17:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DRyDdSwAa5Q/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 6305, 2997, 108, 4, 1, 9, 0),
  ('rezkymattara', '11 of 100 #WonderfullGorontalo
Here, time moves at a more relaxed pace. No honking horns, just friendly greetings from neighbors and the sound of the wind rustling through the trees. 🌿

Finding peace isn''t about going far, it''s about returning to your roots. A simple life, a cup of warm tea, and fresh air. The true definition of wealth.

📍 Lakeya, Tolanghula Village, Gorontalo

#SlowLiving #fyp #wonderfullindonesia #drone', '2025-12-27 06:37:00+08'::timestamptz, 'https://www.instagram.com/reel/DSxS8IjE4I7/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 11438, 6258, 327, 26, 4, 15, 0),
  ('1000_guru_gorontalo', 'Halo hai! Akhirnya release juga yang ditunggu-tunggu!

Siapa nih yang udah penasaran sama serunya kegiatan 1000 Guru Gorontalo? Kegiatan 1000 Guru Gorontalo semakin seru dengan adanya kolaborasi bersama @beranda_wire. Kegiatan yang dilakukan selama 3 hari ini, berlokasi di Desa Pangahu dan Desa Bihe. Sejumlah kegiatan semakin memeriahkan kegiatan TnT yang ke 26 ini. Mulai dari teaching di luar kelas, sosialisasi UMKM untuk masyarakat Desa Pangahu, fun games bersama warga, pentas seni sampai traveling di Botu Kapali River Tubing Desa Bihe.

Kegiatan ini tidak akan terlaksana tanpa bantuan dan kerja sama dari pihak WIRE-G, pemerintah desa, warga desa, sekolah kampung, tim, volunteer, pihak sponsor, dan semua yang ikut serta memeriahkan kegiatan ini. Mewakili tim, mimin ucapan terima kasih kepada semua pihak yang telah mendukung terlaksananya kegiatan TnT#26 ini.

Yuk spill di komentar kegiatan yang menurut kakak-kakak paling berkesan ya🙌🏻

🎥: @rolis_asi 
@1000_guru @muhammad_azhariharahap @rayhanisrati @vetty.pulukadang 
#TnT #traveling #teaching #1000gurugorontalo #gorontalo #desabihe #desapangahu', '2025-02-17 23:16:00+08'::timestamptz, 'https://www.instagram.com/reel/DGNJA7cxCt-/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 12570, 7337, 295, 41, 6, 39, 0),
  ('annjuliana', 'P……
Cari lawan!!!!! 🥹🙏
.
.
Because of this climbing content, my body has been sore for two days. So this content must be uploaded.', '2025-02-26 05:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DGiWgYCzk4M/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 14307, 7452, 177, 4, 2, 1, 0),
  ('briantiarno', 'Fun Mini Soccer 🚁⚽️', '2025-05-28 04:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DKMgTVDzUfl/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 10865, 5672, 75, 1, 0, 0, 0),
  ('deadegobel_', 'Escape for a while from a crowded mind. 🤍

#hometownchachacha #escapetheordinary', '2025-09-15 03:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DOno80-E5Jg/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 6025, 3365, 78, 1, 0, 6, 0),
  ('fhirmanohihiya', 'like oxygen to me🍃🌥️👣

📍Gorontalo Outer Ringroad

🚁 @undafaundra 

#gorontalo #dkirunners #gorontalounite #gorontalorunners #runners #run', '2025-06-11 17:32:00+08'::timestamptz, 'https://www.instagram.com/reel/DKx9LduSzF7/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 8216, 4425, 168, 3, 0, 3, 0),
  ('gorontalo.unite', 'Isimu di pagi hari. indah bukan karena matahari yang berwarna, tapi karena keindahan pada apa yang disentuh cahayanya.', '2025-09-04 15:56:00+08'::timestamptz, 'https://www.instagram.com/reel/DOMqbj9k0tW/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 12077, 6347, 421, 21, 5, 13, 13),
  ('gorontalo.unite', 'Kalian pernah ndah sih bingung nyari outfit? 

Itu yang dialamin @cacasalsabbila, yang pengen harganya ramah di saldo, nyaman dipake, pas ngampus, nongkrong, ngopi, ngematchaaaaaaaaaah, tapi tetap bikin pede. 

sampe akhirnya nemu juga yang pas banget di @iconmama.gorontalo. Alasan lain kenapa ini favorit, the soul behind Iconmama, who makes comfort a priority, bunda @neevanodra 😍', '2025-09-02 03:42:00+08'::timestamptz, 'https://www.instagram.com/reel/DOGMrU5km1g/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 13781, 9628, 70, 5, 14, 1, 3),
  ('gorontalo.unite', 'ketika SORE dan sore hari menceritakan banyak hal. 

sore yang penuh akan kenangan,
yang dibangun dari hal-hal kecil yang sederhana,
dan bagaimana waktu perlahan mengubah semuanya.', '2025-08-07 02:41:00+08'::timestamptz, 'https://www.instagram.com/reel/DNDJNFKSxYZ/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 4881, 2749, 124, 2, 0, 1, 5),
  ('gorontalo.unite', 'Kenalin, ini bukan SORE yang bercerita tentang iPhone 17 di masa depan. Eh, tapi ini ada sedikit berbagi cerita saja kalo di Platinum Cellular lagi banyak promo handphone. Cek saja langsung kapan-kapan. 

Dan teruntuk yang lain, diluar sana. Teruslah mencoba, jangan takut salah. Hari ini terbentur, terbentur, terbentur, pasti akan terbentuk juga. 

Hi, nama aku Sore. 🥹', '2025-07-19 04:36:00+08'::timestamptz, 'https://www.instagram.com/reel/DMSasugSxvE/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 10335, 4203, 157, 1, 0, 0, 1),
  ('gorontalo.unite', 'Hari ini ramai meriah dimana-mana. 

Ada yg ngantar anak ke sekolah pertama kalinya, ada juga yang menyekolahkan BPKB kesekian kalinya. 

Karena pada akhirnya, berusaha selalu ada buat orang-orang terdekat itu sesuatu yang nggak ternilai harganya, men. 

Sore hari cerah ceria di seputaran Bukit Ranjau, Gorontalo Outer Ring Road by @mrarvy', '2025-07-14 02:34:00+08'::timestamptz, 'https://www.instagram.com/reel/DMFVUlAyId0/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 17959, 11039, 621, 32, 3, 5, 29),
  ('gorontalo.unite', 'Kalo paling ideal sih, apalagi ke arah Pantai Selatan (Teluk Tomini Gorontalo) saat golden hours (sekitar satu jam setelah matahari terbit dan satu jam sebelum matahari terbenam, ketika cahaya matahari berwarna keemasan, lembut, dan hangat)

Cuaca di Gorontalo ini panas, panasnya lumayan. Jadi memilih waktu terbaik buat menikmatinya yaa saat-saat seperti ini.', '2025-05-29 02:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DKO03x_uGtp/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 19197, 11153, 881, 81, 11, 16, 34),
  ('gorontalo.unite', 'Ngopi disini sekalian mode pesawat saja, kan tidak ada colokan. Ngopi sambil ngobrol tanpa terdistraksi oleh notifikasi itu satu kemewahan juga sebenarnya. Apalagi dengan view perkebunan dari atas jalan Gorontalo Outer Ring Road begini.', '2025-05-29 03:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DKO_QhoOqZQ/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 19335, 9574, 375, 80, 4, 9, 15),
  ('gorontalo.unite', 'Mereka yang pergi meninggalkan rumah bukan untuk pergi, tapi untuk membangun rumah yang baru—untuk masa depan, untuk harapan, untuk yang kita cintai.

Intinya adalah:

Pergi dari rumah (kampung halaman atau tempat asal) bukan berarti melupakan atau meninggalkan segalanya. Justru, kepergian itu adalah langkah menuju sesuatu yang lebih besar—sebuah upaya untuk membangun kehidupan yang lebih baik.', '2025-04-10 00:24:00+08'::timestamptz, 'https://www.instagram.com/reel/DIQexmWSQCx/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 8771, 5414, 288, 4, 3, 0, 7),
  ('gorontalo.unite', 'setiap orang yang kita temui, sedang menghadapi pertempuran hidup yang tidak kita ketahui. so, mari berbaik hati dan selalu tersenyum. 

karena kita tidak tahu masalah apa yg sedang mereka hadapi. 

Selamat Hari Patriotik, 23 Januari.', '2025-01-22 16:38:00+08'::timestamptz, 'https://www.instagram.com/reel/DFJfGlFT5H8/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 11124, 7599, 564, 53, 5, 5, 11),
  ('gorontalo.unite', 'bergeraklah, walaupun lambat.

Kamu tidak gagal dalam kehidupanmu, kamu hanya merasa gagal karena keinginamu tidak terpenuhi. Kamu di kecewakan dengan ekpektasimu sedangkan kamu tidak benar-benar melihat kesalahan yang ada di dalam dirimu.

Good Nite.', '2025-02-09 09:48:00+08'::timestamptz, 'https://www.instagram.com/reel/DF3GlSKzcq_/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 9671, 5754, 417, 13, 3, 5, 17),
  ('gorontalo.unite', 'Berburu takjil itu ibarat berburu kenikmatan dunia, yang ketika kita nikmati dalam 1 menit, nikmatnya sudah hilang. Padahal dalam 13 jam 34 menit menahan lapar dan haus. 

🎬 @dani_malasai', '2025-03-05 01:37:00+08'::timestamptz, 'https://www.instagram.com/reel/DG0BcQlSJr1/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 8203, 4924, 190, 2, 2, 0, 1),
  ('gorontalo.unite', 'Allah memberikan keringanan (rukhshah) dalam puasa bagi mereka yang memiliki uzur. 

Namun, jika seseorang tidak mengganti puasanya tanpa alasan yang sah hingga Ramadan berikutnya, maka ia harus mengqadha dan membayar fidyah. 

Jika ada uzur syar’i yang membuatnya tidak bisa mengganti, cukup dengan membayar fidyah.', '2025-03-18 03:54:00+08'::timestamptz, 'https://www.instagram.com/reel/DHVoadLyscz/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 7120, 3961, 137, 2, 1, 0, 3),
  ('gorontalo.unite', 'Karena kopi dapat memengaruhi suasana hati dan energi seseorang. Apalagi ngopinya di tepian karang di Oluhuta, Bone Pantai sana.', '2025-01-19 21:59:00+08'::timestamptz, 'https://www.instagram.com/reel/DFCU-0rSsDt/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 7098, 4478, 183, 15, 0, 3, 0),
  ('gorontalo.unite', 'Kalo YOLO (You Only Live Once) sering dianggap self-reward dari pelarian kesibukan dan juga rutinitas (khususnya bagi mereka yang belum married), tapi memang melelahkan, cobain deh konsep YONO (You Only Need Once), yang memang menekankan pada hal-hal yang dibutuhin. 

Gorontalo memang masih merupakan daerah miskin, tapi jumlah pengeluaran warganya, bahkan untuk sekali nongkrong itu paling minimum 100K, paling maksimal diatas 1000K.

So, kamu menganut gaya hidup mana? YOLO or YONO?', '2025-01-17 02:56:00+08'::timestamptz, 'https://www.instagram.com/reel/DE7JL2PSKkq/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 11215, 6243, 294, 7, 1, 3, 8),
  ('gorontalo.unite', '13 Tahun terus bertahan di industri musik di Kota sekecil Gorontalo memang tidak mudah. Dalam merayakan 13 tahun bernada dan berirama, The Soul menghadirkan Memoir, sebuah album yang bercerita tentang memori kisah orang-orang yang pernah ada di hidup dan punya kenangan yang diceritakan lagi lewat lagu.

Memoir berisi 8 lagu dengan genre Pop Alterntatif dan Pop Soul. Proses produksi memoir dilakukan sejak dari tahun 2022-2024.

The Soul Band adalah group band yang terbentuk tanggal 17 juli 2012, didirikan atas dasar kecintaan setiap personilnya terhadap musik. 

Lagu-lagunya sudah bisa dinikmati di platform music.', '2025-01-17 01:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DE6_YrTyUcd/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 3751, 2196, 106, 0, 0, 1, 1),
  ('gorontalo.unite', 'Senja yang jingga, waktu yang tepat untuk kembali ke rumah, setelah seharian beraktifitas dengan kesibukannya masing-masing.', '2025-01-13 02:18:00+08'::timestamptz, 'https://www.instagram.com/reel/DEwxoely2gl/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 7636, 4902, 403, 9, 8, 5, 22),
  ('gorontalo.unite', 'Masa-masa tanpa beban.

Permainan selesai ketika adzan magrib, atau yang punya bola so mo pulang duluan. 😁 @fitrayusuf_', '2025-01-07 02:33:00+08'::timestamptz, 'https://www.instagram.com/reel/DEhVnFQSqFy/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 10048, 5826, 442, 11, 12, 6, 10),
  ('gorontalo.unite', 'Kotaraja, Dulupi. Nah, tidak jauh dari sini ada Pantai Ratu, tepatnya di Tenilo. Kotaraja dan Pantai Ratunya sama-sama berada di Boalemo, tapi sekarang jarang terdengar lagi gaungnya. 

Kalo di Kotaraja, bagusnya musim-musim lembab seperti sekarang ini, kalo musim kemarau, bukit-bukit yang menghijau itu pasti akan terlihat tandus.

So ba praweding disini min? @galeryboalemo', '2025-01-07 01:31:00+08'::timestamptz, 'https://www.instagram.com/reel/DEhO7rpSF-A/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 7140, 3720, 79, 1, 0, 0, 2),
  ('platinumcell.id', 'Dirgahayu RI ke-80 🇮🇩

80 tahun lalu, para pahlawan mengorbankan segalanya demi satu kata: MERDEKA!

Hari ini, kita berdiri di atas darah dan doa mereka
Semoga api perjuangan itu tak pernah padam dalam hati kita 🇮🇩', '2025-08-16 23:46:00+08'::timestamptz, 'https://www.instagram.com/reel/DNclAdoT9sd/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 8606, 4764, 108, 9, 0, 1, 0),
  ('pyurforyou_gto', 'Bersama Pyurforyou kita rayakan kemerdekaan dengan kreatifitas dan semangat tanpa batas‼️🇮🇩

It''s the right time to show up yourself and make it happen with Pyur. Coz we''re always for you!🫵🏻

#PyurGorontalo #OnlyForYou #alwaysforyou', '2025-08-21 06:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DNnlhAgyX6b/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 14630, 8717, 110, 13, 1, 1, 0),
  ('gorontalo.unite', 'Ini dia uang rampasan Kejaksaan Agung dari kasus tindak pidana korupsi pemberian fasilitas ekspor minyak mentah kelapa sawit atau CPO dan turunannya pada industri kelapa sawit untuk renovasi sekolah dan kampung nelayan.

Penyerahan uang pengganti kerugian negara dalam perkara tindak pidana korupsi pemberian fasilitas ekspor Crude Palm Oil (CPO) dan turunannya itu sejumlah Rp 13,25 triliun. Penyerahan secara simbolis dilakukan oleh Jaksa Agung ST Burhanuddin kepada Menteri Keuangan Purbaya Yudhi Sadewa, dan disaksikan langsung oleh Prabowo.', '2025-10-20 02:27:00+08'::timestamptz, 'https://www.instagram.com/reel/DQBqSmyDvsX/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 255399, 169961, 6685, 282, 96, 150, 87),
  ('imigrasi.gorontalo', 'Siapa sangka, perjalanan diplomasi bisa membawa kita sampai ke hutan tempat burung maleo bertelur. Bersama @labovitzjeff , Chiefs of Mission @iomindonesia , tim Imigrasi Gorontalo ikut menyusuri jejak alam di Bone Bolango, belajar langsung tentang harmoni antara manusia dan kehidupan liar. Karena menjaga bumi tetap lestari juga bagian dari misi kemanusiaan.', '2025-10-26 23:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DQTUP_XkjQM/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 8383, 4880, 247, 20, 2, 7, 0),
  ('gorontalo.unite', 'Khairadeen Y. Pasha, salah satu anak yang berasal dari Gorontalo yang akan jadi pendamping Timnas Garuda pada laga yang menentukan, World Cup Qualification 3rd round ke-9 antara Indonesia vs China di GBK tanggal 5 Juni 2025 nanti.', '2025-05-31 05:42:00+08'::timestamptz, 'https://www.instagram.com/reel/DKUXa7KT40R/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 53948, 27740, 1709, 122, 3, 55, 23),
  ('gorontalo.unite', 'Selamat ulang tahun yang ke-61, Ibu Wakil Gubernur Gorontalo, Ibu @idahsyahidahruslihabibie. Panjang umur, sehat terus, sukses memajukan Gorontalo selangkah lebih baik lagi.', '2025-03-10 17:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DHCiEi8zFpx/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 72361, 36520, 1311, 32, 5, 29, 19),
  ('imigrasi.gorontalo', '🚨 KETAHUAN BOHONG! 🚨
Awalnya bilang mau liburan, tapi jawaban demi jawaban malah bikin curiga 🤔 Ternyata pemohon ini terindikasi calon pekerja migran non prosedural. Jangan memberikan keterangan yang tidak benar yaa #sahabatmido', '2025-08-04 21:42:00+08'::timestamptz, 'https://www.instagram.com/reel/DM9dGZmzNV4/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 329824, 202351, 4269, 150, 225, 181, 0),
  ('imigrasi.gorontalo', '🚨 OPERASI WIRA WASPADA 2025
Imigrasi Gorontalo bergerak bersama seluruh Indonesia. Tegas menindak, terukur dalam bertindak, dan humanis dalam pendekatan. Kami hadir untuk menjaga Indonesia tetap aman dari pelanggaran keimigrasian. 🇮🇩

#WiraWaspada2025 #Imigrasi #ImigrasiHumanis #ImigrasiTegas #ditjenimigrasi', '2025-07-17 17:59:00+08'::timestamptz, 'https://www.instagram.com/reel/DMOr3IxSEUT/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 20393, 10368, 279, 23, 1, 13, 0),
  ('zaskiaxx_', 'JUST STARTE🇮🇩🥇
•
•
•
•
•
#fyp #karatê #timnasindonesia #platnas #indonesia #gorontalo #sangjuara #inkanas #bruneidarussalam #gorontalohits', '2025-06-18 03:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DLCg_AIBaN5/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 31196, 15475, 1014, 8, 7, 8, 0),
  ('syakbanarief', 'The Way of Water

📽️ @blue.gto 

#diving #freediving #gorontalo', '2025-10-25 05:32:00+08'::timestamptz, 'https://www.instagram.com/reel/DQO3iBTj2CO/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4924, 2491, 145, 3, 1, 11, 0),
  ('syakbanarief', 'Diving with the largest fish species on earth.

📽️ @leoomist @weekend.divers 

#diving #freediving #whaleshark #indonesia #gorontalo', '2025-11-03 05:42:00+08'::timestamptz, 'https://www.instagram.com/reel/DQmJ39cj4-X/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 9480, 5666, 168, 9, 0, 13, 0),
  ('annjuliana', 'Segalanya ada padamu. Di dalam dirimu. Termasuk aku. ~ Diva, Supernova', '2025-11-06 01:35:00+08'::timestamptz, 'https://www.instagram.com/reel/DQtcr46kyng/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6016, 2984, 83, 2, 1, 3, 0),
  ('rully3_', 'As always like a art. 🏝️

📌 Lito Bogisa , Gorut

Part of @dkijalanjalan_', '2025-11-15 03:58:00+08'::timestamptz, 'https://www.instagram.com/reel/DRE4OJOj-Zf/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7626, 3941, 182, 26, 0, 4, 0),
  ('aisyahhennaluwuk', 'Manusia kawan, partner kerja sudah di baik akan tapi tatap juga ada yang ba benci, iri, dengki dan hati tidak bagus🥹 tapi Binatang hiu paus yang tidak kenal torang bisa saja jinak, akrab dan hatinya bagus asal torang baik sama hiu paus, Masa kamu tidak??? berarti kamu 🥹 lebe dari binatang 🤭🙏🏻 candaaa kawan !!😃

Logat 🗣️ Gorontalo amper sama dengan luwuk : “jan talalo banyak ba goyanggggg, mo tamudung😎”

#hiling #liburan #gorontalo', '2025-11-18 20:13:00+08'::timestamptz, 'https://www.instagram.com/reel/DROVcu9ibFH/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 20913, 11859, 202, 9, 0, 5, 0),
  ('lecka_smenkqiuw', 'Island Hopping Bareng Teman anda Yukkk,,
.
📍 Pulau Mohinggito - Gorontalo Utara
.
.
@calliewijaya @angelinesusanto @sylvialimm 
.
#pulaumohinggito #gorontalo #tripgorontalo #exploregorontalo #pesonaindonesia #wonderfulindonesia #instagram #dji #exploreindonesia #hiupausgorontalo #hiupaus #viralvideos #fyp', '2025-11-21 05:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DRUedtUD7Pw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 5118, 3159, 72, 8, 0, 1, 0),
  ('anstasiamaria', 'road trip 8h paid off🐳🐋💦

*kalo nda post skrg will be post 2 years later🤣🙏
#alwayslatepost #sherlygorontalo #whaleshark #hiusherly #hiugorontalo', '2025-11-22 22:13:00+08'::timestamptz, 'https://www.instagram.com/reel/DRY2ftsktrH/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10886, 6694, 202, 18, 2, 2, 0),
  ('gorontalo.unite', 'Kalo dihitung secara keseluruhan, berapa sih jumlah Hiu Paus yang pernah ke Botubarani, Gorontalo. Tidak ada angka pasti 

Tapi, penelitian dan data menunjukkan kemunculan mereka rutin, dengan catatan 287 kemunculan hanya dalam Januari-Mei 2024 kemarin di Botubarani dan 60 individu yang berhasil diidentifikasi, yang sebagian besar jantan.

Oke, menariknya, semua namanya juga sama, Sherly.', '2025-12-05 20:20:00+08'::timestamptz, 'https://www.instagram.com/reel/DR6IXAuEnc1/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 19216, 9407, 412, 7, 0, 7, 11),
  ('gorontalo.unite', 'Alam yang semewah dan seindah ini, tetap terjaga dengan baik. Dijelajahi dengan seru, tapi tetap mewariskan keindahannya ke generasi berikutnya. 

Begitu torang pe cara ba jaga. Karena alam lingkungan sekitar, butuh keseimbangan dalam menjaganya. 

Bukan dapa lia yang gaga sadiki, langsung kase rusak. Gorontalo Mentality. @novitannr_', '2025-12-05 22:56:00+08'::timestamptz, 'https://www.instagram.com/reel/DR6ZqfdkmVW/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7830, 3934, 142, 4, 1, 3, 3),
  ('gorontalo.unite', 'Letak pantai Tanjung Tihu ini cukup tersembunyi. Kalo kesini, harus menelusuri permukiman warga dulu baru bisa sampe ke kawasan yang dikelola Bumdes setempat. Tepatnya di Desa Tihu, Bone Pantai, Bone Bolango (arah Pantai Selatan)

Lumayan jauh kalo dari arah Kota Gorontalo, yaa sekitar 40km atau 1 jam perjalanan kalo tidak macet.', '2025-12-07 03:25:00+08'::timestamptz, 'https://www.instagram.com/reel/DR9d5XBkqTV/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7272, 4806, 236, 41, 5, 1, 21),
  ('gorontalo.unite', 'Jika ditanya dimana Kecamatan di Gorontalo yang paling luas, mungkin jawabannya adalah Pinogu. Berada jauh di kawasan Taman Nasional Bogani Nani Wartabone, Pinogu ini dulunya merupakan kawasan Kerajaan Suwawa.

Terjauh, terpencil, tapi Pinogu tidak terbelakang. Pinogu bisa merawat alam yang masih perawan. 

Nanti kapan-kapan berkesempatan jalan-jalan kesini, sekali-kali saja, jangan pernah melibatkan perasaan.', '2025-12-10 17:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DSGsvrbklHt/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 16688, 10259, 761, 18, 5, 17, 25),
  ('gorontalo.unite', 'Gorontalo (especially Botubarani and nearby Tomini Bay/Olele) is one of Indonesia’s main whale shark spots, individuals regularly appear near shore and at wall dives, making the area a reliable place to see them. 

Credits:
Cover: @venscaveronica 
Footage: @tripbarengisal 
Voice Over: @densee.denis 
Script & Edit: Gorontalo Unite

Click the link to explore Gorontalo: find boat operators, dive sites, and up-to-date seasonal info so you can book a respectful whale-shark experience.', '2025-12-10 20:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DSHAWrvEpTx/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6653, 4039, 113, 12, 3, 5, 6),
  ('blue.gto', 'One of the best moment
Diver in frame @mpryann 
#whalesharks #hiupausbotubarani', '2025-12-23 05:03:00+08'::timestamptz, 'https://www.instagram.com/reel/DSm16yRgbEg/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 8352, 5155, 189, 9, 0, 3, 0),
  ('blue.gto', 'dive with 5500 lumens. 
on action : @novawarow @reskazs_ @dedew42 @dinaa.pakaya 

#gorontalo #freedive', '2025-12-28 00:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DSzNxxnj3Qd/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 9993, 6038, 146, 17, 2, 13, 0),
  ('canyoneering_manado', 'GORONTALO VOL II - DAY 1🔥

#gorontalo 
#canyoneering 
#canyoning 
#rappeling 
#fyppppppp 
#manado', '2025-09-28 20:03:00+08'::timestamptz, 'https://www.instagram.com/reel/DPK4cCwkROx/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 14605, 8364, 306, 63, 11, 6, 0),
  ('nasi_kuning_li_waty', 'Beneath the sky, among the trees. I find my peace! 
.
.
@bohulocampandeatery', '2025-10-02 05:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DPTo2OPgdYI/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 18252, 9483, 321, 29, 1, 10, 0),
  ('oceanala.id', 'Kalau ada 9 nyawa, gpp 1 nyawa ditinggal di Togean 🥹👉🏼👈🏼, 1 nyawa tinggal di Paisupok.. ahh mauu divee terussss! 
-
#KelanaKemana lagi kita berikutnya? 👀🌴
Tag geng kamu di kolom komentar dan siapin jadwal buat explore bareng #Oceanala dan jadi #GengNala berikutnya! 💙💖

 #WanderDiveProtect', '2025-10-11 19:23:00+08'::timestamptz, 'https://www.instagram.com/reel/DPsTh0okuW-/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 5338, 2670, 71, 4, 0, 16, 0),
  ('gorontalo.unite', 'A masterpiece of the Almighty God.', '2025-07-11 19:01:00+08'::timestamptz, 'https://www.instagram.com/reel/DL_XyMETll0/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4296, 2477, 75, 7, 1, 0, 3),
  ('amalbdjo', 'look happier?', '2025-07-21 01:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DMXRkp4zwyn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6922, 3867, 113, 1, 0, 16, 0),
  ('annjuliana', 'Lost in the blue, but find my self 🤍

📷 : @akbarhiola', '2025-09-05 23:13:00+08'::timestamptz, 'https://www.instagram.com/reel/DOQBHtOE4xT/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7854, 4235, 170, 1, 1, 4, 0),
  ('ayziffy', 'Another dream checked off the list ✅
Welcome to Botubarani, Gorontalo 🇮🇩, meet The Gentle Giants—whale sharks. 🐋✨
Unreal experience! Swimming alongside whale sharks feels surreal, definitely a highlight of my travels 🤙🏿

Moments like this remind me: the world is too big to stay in one place, and life is too short not to chase experiences. 🌍💙
Would you dare to dive into your bucketlist adventure or is this one already on yours? 😉

#whalesharks #botubarani #gorontalo #indonesia #terancamkaya', '2025-09-19 02:33:00+08'::timestamptz, 'https://www.instagram.com/reel/DOx2aLaksZW/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10678, 6854, 170, 5, 0, 7, 0),
  ('blue.gto', 'let''s take a closer look.
sea fans are one of the most beautiful in the ocean
ada yang mau main dengan dia?

#gorontalo #freedive #yangpentingbiru #bluegto #ygpentingbiru', '2025-07-23 23:32:00+08'::timestamptz, 'https://www.instagram.com/reel/DMewXqlPpE6/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10246, 5571, 195, 28, 5, 46, 0),
  ('blue.gto', 'gorontalo punya keindahan laut. 
pesona laut gorontalo tersebar rata di seluruh pesisir gorontalo. akses bukanlah keluhan untuk menikmati laut gorontalo. ckup parkir kenderaan anda. dan keindahan sudah ada di depan anda. sampai ketemu di bawa sini.

@gorontalo.unite 
@likein_gorontalo 
@deepbluecoast 
@dispar_gorontaloprov 
@centralflfreedivers 
@gopro 
@goproid 
@gopro_sealife 

#gorontalo #freedive', '2025-06-18 22:38:00+08'::timestamptz, 'https://www.instagram.com/reel/DLEid8pvtTv/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11564, 6095, 254, 18, 8, 21, 0),
  ('blue.gto', 'GORONTALO
this place gave us a surprise. which was originally just a place of last resort. now suddenly it has become a very special place. Our dive was full of enthusiasm

Sound : @cinemoto999 

@goproid 
@gopro 
@gorontalo.unite 
@likein_gorontalo 
@dispar_gorontaloprov 

#gopro #gorontalo #freedive', '2025-07-02 22:22:00+08'::timestamptz, 'https://www.instagram.com/reel/DLojqN1tILU/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 18522, 9521, 280, 76, 7, 107, 0),
  ('disparekrafpora_gorontaloprov', 'Sobat Dispar, Yuk tengok keseruan kadis pariwisata saat visit Destinasi Wisata Oluhuta Paradise yang baru-baru ini lagi viral banget!', '2025-01-17 22:32:00+08'::timestamptz, 'https://www.instagram.com/reel/DE9Ppw9TKAZ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7368, 4315, 132, 7, 8, 5, 0),
  ('donikadir', 'Semoga dengan mu bukan hanya lama, tapi selamanya 💞🫶🏻

📹 @dionpramanareal 

#freediving #gorontalo #visitgorontalo #surgadalamlaut #bonebolango', '2025-06-23 16:31:00+08'::timestamptz, 'https://www.instagram.com/reel/DLQv_wiTkRK/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6450, 3672, 76, 2, 0, 3, 0),
  ('exchelsie', 'the sea was calm, the sun was kind, and sherly… sherly was everything i hoped for 🐋🩷

📍Wisata Hiu Paus Botubarani, Gorontalo, Indonesia

🎥: @just.itoooo 🪄: @udangmerah40 🫶🏼

#gentlegiants #sherlymoment #gorontalogems #gorontalo #hiupausgorontalo #sherlyhiupaus #sherlygorontalo #freediving #freedivinggirls #freedivinglife #underwaterworld #underwatervideo #gopro #gopro12blackhero', '2025-04-09 04:44:00+08'::timestamptz, 'https://www.instagram.com/reel/DIOXnO0SJgI/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 15772, 8605, 504, 24, 2, 73, 0),
  ('fabjos21', '𝗞𝗲𝗶𝗻𝗱𝗮𝗵𝗮𝗻 𝗱𝗶 𝘂𝗷𝘂𝗻𝗴 𝗵𝘂𝘁𝗮𝗻 𝗚𝗼𝗿𝗼𝗻𝘁𝗮𝗹𝗼.', '2025-07-23 05:16:00+08'::timestamptz, 'https://www.instagram.com/reel/DMcy6drSg4R/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4418, 2580, 51, 1, 3, 0, 0),
  ('fhirmanohihiya', 'Sejalan gak sejalan itu terserah, intinya kalo arahnya berlawanan hati hati dijalan.

📍Lito Lampu🏝️

.

.

.

#gorontlao #gorontaloutara #gorontalounite #pulaulampu #litolampu #pesonagorontalo #pesonaindonesia', '2025-09-16 07:51:00+08'::timestamptz, 'https://www.instagram.com/reel/DOqrig2ExBe/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6352, 3672, 196, 17, 1, 5, 0),
  ('fnurwahid', 'Akhirnya ketemu Sherly 🐳', '2025-04-07 04:58:00+08'::timestamptz, 'https://www.instagram.com/reel/DIJM_XSpZqO/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11402, 6266, 380, 14, 8, 37, 0),
  ('galeryboalemo', 'Menikmati senja dari puncak Desa tenilo 
Samping kanan dari puncak ini terdapat air terjun tenilo, pemandangan di depan merupakan desa tenilo. 

Video : @gilbertho_makeup 

#senja #tenilo
#boalemo #galeryboalemo', '2025-07-25 03:04:00+08'::timestamptz, 'https://www.instagram.com/reel/DMhtSptyIOw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10268, 5722, 181, 16, 2, 0, 0),
  ('galeryboalemo', '5 tahun lalu tempat ini sempat viral di kalangan anak muda yang hobi berswa ala ala instagramable. 

bukit batu ini berada di desa tanjung harapan, Kec Wonosari.. 

Ada yang masih sering kesini? 

Video @fenypou 

#boalemo #wonosari 
#galeryboalemo', '2025-02-06 02:29:00+08'::timestamptz, 'https://www.instagram.com/reel/DFultWqym5z/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 5344, 3255, 106, 3, 0, 3, 0),
  ('galeryboalemo', 'Salah satu hal yang paling di rindukan kalau jauh dari rumah adalah liburan bersama keluarga, mumpung weekend jangan lupa liburan. 

Oh iya gengs lokasinya ini 500 M dari embung piloliyanga dan 500 M juga dari cekdam 1 piloliyanga( Tempat pemandian) ,cekdam yang ini tepat berada di kebun milik keluarga li kakak @arviamulyapunuh . 

#cekdampiloliyanga #boalemo 
#galeryboalemo', '2025-02-08 20:39:00+08'::timestamptz, 'https://www.instagram.com/reel/DF1r-IYS_Wd/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10220, 6169, 247, 12, 4, 4, 0),
  ('gorontalo.unite', 'Bapak-bapak dengan keseruannya tersendiri. Kalo masih ingat dengan ungkapan Losta Masta, live a vibrant and fulfilling life (bikin hidup yang lebih hidup), fix, kalian sudah bapak-bapak juga.', '2025-09-20 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DO0TA_LEhn2/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 8623, 4188, 181, 3, 2, 4, 6),
  ('gorontalo.unite', 'embun pagi selalu jernih, tak seperti perampok uang negara yang pandai bersembunyi dalam kemunafikan.

mundur jo uti @wahyumoridu, karena laki-laki itu yg dipegang omongannya dan birdnya. 😆', '2025-09-19 16:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DOzTe1yk95s/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4014, 2158, 75, 1, 0, 0, 0),
  ('gorontalo.unite', 'Teduh euy. orang-orang bisa saling bersama, duduk bercerita setelah seharian menghadapi hari. Bercerita apa saja. 

Gorontalo butuh lebih banyak ruang publik seperti ini, sekedar jadi tempat rehat ataupun sebagai penghangat suasana, yang menghadirkan rasa nyaman maupun keamanan. Semoga terus berkembang. 

video: @rifqisadewa', '2025-07-23 08:15:00+08'::timestamptz, 'https://www.instagram.com/reel/DMdHSA5y_HF/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7826, 4869, 136, 20, 1, 4, 6),
  ('gorontalo.unite', 'Bahkan saat menjalani hari terberat sekalipun, senyum bisa mencairkan suasana. seperti nasihat sekilas yg melekat, silence is the best answer. for all questions, and smiling is the best reaction. in every situation.. 

@bindawood_villa cocok nih buat staycation, in every situation, for all question. lokasinya lumayan mudah dijangkau juga, Tilongkabila, Bone Bolango.', '2025-06-18 15:55:00+08'::timestamptz, 'https://www.instagram.com/reel/DLD0ShkTtFa/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 9311, 5560, 198, 43, 2, 0, 13),
  ('gorontalo.unite', 'Setiap jengkalnya adalah petualangan. Menjelajahi alam Bone Bolango yang masih perawan, dengan pemandangan yang membayar lunas setiap tetes keringat. Surga tersembunyi di Gorontalo!', '2025-06-19 02:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DLE5o8bum1f/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4012, 2270, 108, 2, 0, 1, 1),
  ('gorontalo.unite', 'Kalo liatnya cuma sekilas, yaa paling terlihat biasa saja. 

Yup, kita lagi bicarakan Danau Perintis ini. Tak ada yang istimewa, hanya hamparan air di telaga, udara yang sedikit gerah, dan suara-suara yang tak seberapa tenang.

Tapi kalo kita menikmatinya lebih dalam, kayak ada sesuatu yang berubah. Bukan tempatnya, tapi cara kita melihat. Ini juga sih bukan soal seberapa nyamannya sebuah tempat.

Kadang yang kita butuhkan bukan cuma pemandangan luar biasa, tapi rasa untuk merasakan sebuah rasa. 

Selamat hari rabu, jaga perasaan.', '2025-07-01 18:20:00+08'::timestamptz, 'https://www.instagram.com/reel/DLljVYPztHw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10320, 5907, 202, 13, 4, 1, 9),
  ('gorontalo.unite', 'Liburan Lebaran kali ini pengen merasakan sesuatu yang baru di Gorontalo? Cobalah sesekali ke arah barat Gorontalo (Boalemo - Pohuwato)

Berikut rangkuman biaya perjalanan yg dicatatkan @helmihongi saat ke Torosiaje dan beberapa destinasi menarik lainnya. 

- BBM: 300rb
- Cabana Inn Torosiaje: 500rb per orang
- Vila Kencana Boalemo: 750rb (weekday)
- Makan malam di Kencana: 55rb
- Snack: 200rb
- Makan durian: 35rb
- Makan siang di Boalemo: 300rb

Total: 2.640.000 (2 dewasa, 2 anak)

Daftar kontak yang bisa dihubungi:
— Cabana Inn:
0822 9161 5143

— Vila Kencana:
0822 4598 7342', '2025-04-05 18:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DIFf5-_TuIi/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 14536, 7503, 232, 14, 2, 0, 10),
  ('gorontalo.unite', 'Kurenai dengan view sunset ini bisa dikatakan komplit, bisa bikin betah juga suasananya. Dinamakan Pantai Kurenai karena dulunya kawasan ini dikelola oleh PT. Kurenai Jaya yang beraktivitas pengolahan dan pengiriman ikan tuna ke Jepang.', '2025-01-17 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/DE68APmzf3b/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 3790, 2175, 99, 0, 0, 0, 1),
  ('gorontalo.unite', 'Kenapa harus mencoba hal baru? Karena hidup terlalu singkat untuk terus berada di zona nyaman. 

Life begins at the end of your comfort zone.', '2025-01-11 00:05:00+08'::timestamptz, 'https://www.instagram.com/reel/DErEYrPzoyy/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4842, 2780, 60, 1, 1, 2, 1),
  ('gorontalo.unite', 'Kencangkan sabuk pengaman Anda, kita akan terbang dengan kecepatan 200km/jam diketinggian 6 sampai 10 feet aja selama 20 detik bersama @rmdhan_yusuf16.', '2025-01-03 00:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DEW1btWyAtV/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6052, 3418, 106, 15, 0, 4, 2),
  ('helmihongi', 'Selain pulau lampu, salah satu pulau yang patut disambangi pas libur lebaran nanti itu Pulau Bogisa

Pulau ini tidak jauh dari pulau saronde. Kira kira sekitar 10 menit dari pulau saronde.

Hamparan pasir putihnya jadi daya tarik pulau ini. Tapi ada waktu waktu tertentu aja untuk bisa dapat hamparannya.

Pulau Bogisa sering dijadikan lokasi kemping anak anak muda dikala akhir pekan. Namun karena kurangnya fasilitas seperti air bersih dan toilet bikin pulau ini kurang menarik.

Tidak ada tiket masuk ke Pulau Bogisa. Kalian cuma perlu menyewa perahu saja dari pelabuhan Kwandang.

Biasanya paketan perahunya sudah sekalian ketiga pulau. Pulau lampu, pulau Bogisa dan pulau mohinggito.

Helmi Hongi, Kawan Bahagiamu

#helmihongi #turguide #guidesulawesi #guidebercerita #liburanjo #djiera #wonderfulindonesia #pilotdrone #djimini3 #gorontalounite', '2025-03-24 21:30:00+08'::timestamptz, 'https://www.instagram.com/reel/DHm-S08vydt/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4603, 2605, 91, 9, 0, 0, 0),
  ('irna.manggala', 'Seru seruan dulu sama anak anak di olele 😋🥰

#travel #travelling #gorontalo #visitgorontalo #moments', '2025-05-10 23:09:00+08'::timestamptz, 'https://www.instagram.com/reel/DJgJDlfzSWc/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11337, 6207, 132, 5, 1, 8, 0),
  ('irna.manggala', 'Awal belajar freedive cuma buat satu alasan:
Ngejar gebetan... tapi bentuknya whale shark 🐋
Akhirnya ketemu juga nih si doi 🫶

Next goal? Siapa tau bisa dancing sama penyu di Gili 😆

📹 : @imamducks 

#BucketListDone #WhaleSharkBestie #FreediveMood #Gorontalo #Gorontalofreedive #Freedive #Freediving #Visitgorontalo #travel #travelling #travelgram', '2025-05-12 21:07:00+08'::timestamptz, 'https://www.instagram.com/reel/DJlGUQOzzLr/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7806, 4704, 139, 13, 0, 15, 0),
  ('kokodimanamana', 'look at his cute eyes 😍', '2025-05-18 00:14:00+08'::timestamptz, 'https://www.instagram.com/reel/DJyT6R1z8Ot/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10038, 6369, 196, 16, 4, 0, 0),
  ('kokodimanamana', 'sunset dive emang sekeren itu 
. 
. 
. 
📍 Oma Cave, Gorontalo', '2025-02-12 02:29:00+08'::timestamptz, 'https://www.instagram.com/reel/DF-CgGczVoO/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7013, 4307, 104, 2, 1, 4, 0),
  ('kokodimanamana', 'school gank', '2025-01-05 21:51:00+08'::timestamptz, 'https://www.instagram.com/reel/DEeRUy-z4lP/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4773, 2855, 94, 1, 0, 0, 0),
  ('kokodimanamana', 'Oluhuta, Gorontalo 🇲🇨', '2025-01-05 03:08:00+08'::timestamptz, 'https://www.instagram.com/reel/DEcQ6pPTBGV/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6919, 4340, 187, 11, 0, 0, 0),
  ('laila_kaluku', 'Matched skin with the prettiest Sherly. 
Takut banget di tempelin remora. 

📹 : @12ano_ 
Rashguard by @bottomhead_ 

@freedivegorontalo @freedivebelike 
#Freedive #Freediving #Freediver #Whaleshark', '2025-02-27 03:14:00+08'::timestamptz, 'https://www.instagram.com/reel/DGkvS8NTV8d/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 12723, 8664, 262, 8, 1, 15, 0),
  ('lecka_smenkqiuw', 'Di Darat Lagi tidak baik-baik saja,,Yukk Main di laut aja 😂
.
.
📍 Pulau Lampu - Gorontalo Utara
.
#gorontalo #pulaulampu #gorontaloutara #pesonaindonesia #instagram #exploreindonesia #dji #exploregorontalo #hiupausgorontalo #tripgorontalo #wonderful_places #fyp #dji', '2025-08-31 06:29:00+08'::timestamptz, 'https://www.instagram.com/reel/DOBVucoj8rK/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7926, 4496, 200, 25, 3, 13, 0),
  ('lecka_smenkqiuw', 'Liburan yuk di Satu Pulau Terindah di Gorontalo
.
.
Booking Trip 085255625323
.
📍Pulau Mohinggito - Gorontalo
.
#gorontalo #pulaumohinggito #pulaubogisa #gorontaloutara #pesonaindonesia #wonderfulindonesia #instagram #exploreindonesia #dji #hiupausgorontalo #hiupaus #fyp #travelgram #exploregorontalo #indotravel #ayodolan #dji #djimini4pro #pesonaindonesia_id #whaleshark #tripgorontalo #tripindonesia #video #dronevideography', '2025-07-23 18:52:00+08'::timestamptz, 'https://www.instagram.com/reel/DMeQWH_PMuz/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7404, 4032, 201, 15, 1, 4, 0),
  ('lecka_smenkqiuw', 'Salah Satu Pulau Terindah di Gorontalo
.
.
Booking Trip 085255625323
.
📍 Bogisa Island - Gorontalo
.
#gorontalo #pulaubogisa #gorontaloutara #pesonaindonesia #wonderfulindonesia #instagram #exploreindonesia #dji #hiupausgorontalo #hiupaus #fyp #travelgram #exploregorontalo', '2025-07-16 19:06:00+08'::timestamptz, 'https://www.instagram.com/reel/DMMQHIdPEVx/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10822, 6014, 175, 23, 3, 10, 0),
  ('maykel_', 'weekend..
sudah prepare gear buat travelling?

loved the pace line, give a sense of the beach is..
🏝️🚀

#iflight #iflightgo #iflightfpv #nazgulevoque #fpvdrone #fpvcinematic #fpvlife #nature #dji #gorontalo #dionumoisland #fpv #beach', '2025-01-09 21:44:00+08'::timestamptz, 'https://www.instagram.com/reel/DEoiWqlTAMT/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6352, 3821, 184, 18, 2, 1, 0),
  ('maykel_', 'banyak pulau daerah gorontalo utara, salah satunya pulau ini, panjangnya pasir putih dan sunrisenya… 
sering kesini tapi tetap kangen tempat ini..

#gorontalo #dji #djiglobal #fpv #sunrise #beach #whitesand #indonesia', '2025-01-05 05:09:00+08'::timestamptz, 'https://www.instagram.com/reel/DEcdYQpTFOg/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10605, 6026, 310, 27, 10, 8, 0),
  ('nduiwoops', '💙🤍 

🎥 by @ezadityaeza 😘🚁', '2025-04-13 04:44:00+08'::timestamptz, 'https://www.instagram.com/reel/DIYqrM6h-YZ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 21564, 10642, 450, 25, 6, 25, 0),
  ('nuzuuuul____', 'Singgah sejenak ..', '2025-05-01 03:26:00+08'::timestamptz, 'https://www.instagram.com/reel/DJG4aKATplG/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 5965, 2880, 91, 9, 1, 5, 0),
  ('opentrip_doradeexplorer', 'And U Can Go Anywhere With Dora🤩🏝️
📍Lito Lampu, Gorontalo Utara.', '2025-09-08 16:49:00+08'::timestamptz, 'https://www.instagram.com/reel/DOXDqKekrs2/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11062, 6540, 121, 29, 5, 3, 0),
  ('opentrip_doradeexplorer', 'Welcome To Paradise, The Most Beautiful Island In Gorontalo With The White Soft Sands And Super Clear Blur Water🏝️🌊
📍Lito, Lampu', '2025-09-06 18:19:00+08'::timestamptz, 'https://www.instagram.com/reel/DOSD5aeEi__/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 8644, 4349, 226, 36, 3, 5, 0),
  ('opentrip_doradeexplorer', 'Makin Kesini Makin Penasaran Kenapa Dinamai “LITO LAMPU / PULAU LAMPU” ? keindahannya disini gak ada lampu lampunya😅', '2025-08-19 23:51:00+08'::timestamptz, 'https://www.instagram.com/reel/DNkUDkypllr/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 8117, 4275, 135, 8, 5, 0, 0),
  ('opentrip_doradeexplorer', 'Dirgahayu Ke-80 Tanah Air Ku Indonesia 🇮🇩 
Here Far From Bogisa Iland, Gorontalo ! We Celebrate Our Biggest Day And Explore More Ur Eternity Wonderland', '2025-08-16 20:50:00+08'::timestamptz, 'https://www.instagram.com/reel/DNcQ6ZGph3M/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 3861, 2261, 80, 3, 1, 0, 0),
  ('orin.yi.san', '🎥 @falsafisme 
#gorontalo #whaleshark #hiupaus #hiupausgorontalo #explore #underwater #see #ocean #ocean #freedive #freediving #freedivegirl #underwaterphotography #fyp #indonesia', '2025-02-06 04:40:00+08'::timestamptz, 'https://www.instagram.com/reel/DFu0eJ9vhRt/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11372, 7872, 118, 18, 3, 2, 0),
  ('paulinepoline', 'Kantor pusat hiu paus Indonesia di Gorontalo 
#freediver #underwatervideo #underwater #whaleshark #hiupaus #hiupausgorontalo #gorontalo #exploreindonesia #indonesiaku', '2025-09-15 19:28:00+08'::timestamptz, 'https://www.instagram.com/reel/DOpXdKkEmpk/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 14903, 7888, 458, 71, 6, 33, 0),
  ('pongilatan_andre', 'An unforgettable encounter with the gentle giants of the sea 🐋💙 Swimming alongside a whale shark is a reminder of how majestic and peaceful the ocean truly is

📍Botubarani, Gorontalo
🧜‍♀️ @annabellebridal 
📹 @billy_kohler 
🎬 @pongilatan_andre 

#WhaleShark #OceanAdventure #SwimWithGiants #UnderwaterMagic #WildlifeWonder #gorontalo #whalesharkgorontalo #pesonaindonesia #wonderfulindonesia #gopro #underwaterlife #underwater #underwaterworld', '2025-02-15 00:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DGFhfOTPFb7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10061, 5609, 266, 18, 2, 26, 0),
  ('rin.dumpies', 'Gorontalo bagian ✨PREMIUM✨', '2025-08-21 22:01:00+08'::timestamptz, 'https://www.instagram.com/reel/DNpQfcqv6Mk/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 931, 527, 30, 0, 0, 0, 0),
  ('rully3_', 'Like a art.

📌 Lito Lampu 

#Gorontalo', '2025-05-23 22:15:00+08'::timestamptz, 'https://www.instagram.com/reel/DKBjBS3zOE2/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 9176, 4340, 269, 161, 1, 11, 0),
  ('santi_nls23', 'My therapy🌊🦈…', '2025-05-13 02:40:00+08'::timestamptz, 'https://www.instagram.com/reel/DJlsehsPUsn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 4570, 700, 319, 3, 0, 12, 0),
  ('suciyani__', 'Capture life’s candid charm…', '2025-07-23 19:58:00+08'::timestamptz, 'https://www.instagram.com/reel/DMeXtuBTmg2/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 6962, 4478, 93, 0, 1, 1, 0),
  ('tripbarengisal', 'be in between
.
.
.
.
by @goproid 
gopro blackhero 11

#gorontalo #pesonaindonesia #whaleshark #privatetrip #gorpohero11 #wonderful_places #freediving #exploregorontalo #ocean #girls #underwater', '2025-07-24 03:19:00+08'::timestamptz, 'https://www.instagram.com/reel/DMfKCSRJjaU/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 13077, 7257, 242, 22, 1, 6, 0),
  ('tripbarengisal', 'Best place ever 
.
.
.
.
 #gorontalo #wonderfulindonesia #pesonaindonesia_id #dji #drone #opentrip #privatetrip #exploregorontalo #ocean #islandlife🌴', '2025-05-23 19:55:00+08'::timestamptz, 'https://www.instagram.com/reel/DKBSj-wpdEr/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 8576, 5914, 73, 3, 2, 1, 0),
  ('tripbarengisal', 'floating with the big whale shark
.
.
.
.
.
.
#gorontalo #wonderfulindonesia #pesonaindonesia #whaleshark #privatetrip #exploregorontalo #freediving', '2025-05-25 04:45:00+08'::timestamptz, 'https://www.instagram.com/reel/DKE0T2CpH5w/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 11704, 8421, 165, 27, 2, 4, 0),
  ('tripbarengisal', 'dive into the depths and explore the wonders of the ocean.

.
.
.
.
#gorontalo #wonderfulindonesia #whaleshark #privatetrip #freedive #freedivinglife #tripgorontalo', '2025-04-28 22:41:00+08'::timestamptz, 'https://www.instagram.com/reel/DJBOFYXTbuK/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 7442, 5373, 133, 11, 0, 3, 0),
  ('tripbarengisal', 'float with whale shark.

#gorontalo #pesonaindonesia #wonderful #whaleshark #trip #privatetrip #exploregorontalo #ocean #freediving #opentrip', '2025-01-20 02:15:00+08'::timestamptz, 'https://www.instagram.com/reel/DFCybTjpFkt/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 17769, 12084, 312, 14, 4, 6, 0),
  ('tripbarengisal', 'the beauty beneath the surface.

#gorontalo #whaleshark #pesonaindonesia #freedive #divetrip #freedivetrip #explore #underwater #wonderfulindonesia', '2025-01-12 18:12:00+08'::timestamptz, 'https://www.instagram.com/reel/DEv5xymTRUN/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10100, 6369, 186, 26, 1, 13, 0),
  ('udangmerah40', 'Another world down there 🐠🪸
.
📹 @billy_kohler 
📍TAMANG LAUT OLELE, GORONTALO
.
#underwater #underwaterphotography #underwaterlife #underwaterworld #underwaterphoto #exploregorontalo #exploreolele #olele', '2025-02-02 01:27:00+08'::timestamptz, 'https://www.instagram.com/reel/DFkLVXRzoPn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 10100, 5584, 325, 10, 2, 52, 0),
  ('yourkyutgel', 'Nice to meet you Sherly ikan friendly🐋✨🥰🤍 
#sherlyhiupaus', '2025-03-17 07:33:00+08'::timestamptz, 'https://www.instagram.com/reel/DHTcKo3yPuS/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 12748, 8549, 339, 71, 2, 14, 0)
) as v(
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, editor_choice, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
on conflict (permalink) do nothing;

-- Point the newly imported rows at their covers.
update public.reels
   set thumbnail_url = '/reels/' || substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') || '.webp'
 where thumbnail_url is null
   and substring(permalink from '/(?:reel|p)/([A-Za-z0-9_-]+)') in (
     'DE68APmzf3b',
     'DE6_YrTyUcd',
     'DE7JL2PSKkq',
     'DE9Ppw9TKAZ',
     'DE9hhCqSZm-',
     'DEQDM4BTk_N',
     'DEW1btWyAtV',
     'DE_vxRET_my',
     'DEcQ6pPTBGV',
     'DEcdYQpTFOg',
     'DEeRUy-z4lP',
     'DEhO7rpSF-A',
     'DEhVnFQSqFy',
     'DEj9stxznvz',
     'DEmeLkpTYSG',
     'DEoiWqlTAMT',
     'DErEYrPzoyy',
     'DEuY9BhSUsz',
     'DEv5xymTRUN',
     'DEwxoely2gl',
     'DF-CgGczVoO',
     'DF1r-IYS_Wd',
     'DF3GlSKzcq_',
     'DF5QsfkSSjX',
     'DF7UuI9TwSe',
     'DFATmPgyVV4',
     'DFCU-0rSsDt',
     'DFCybTjpFkt',
     'DFEhs5pT--d',
     'DFHBxy5TOsw',
     'DFHSQeByc_9',
     'DFJfGlFT5H8',
     'DFPC1qQz0Mm',
     'DFeN0VBTZKl',
     'DFkLVXRzoPn',
     'DFkUV2DzP0m',
     'DFu0eJ9vhRt',
     'DFultWqym5z',
     'DFw3qQ3zMlt',
     'DG0BcQlSJr1',
     'DG0frVzynZR',
     'DG2ixoHSPMf',
     'DG44PVoyJa6',
     'DGAXBU4S-G9',
     'DGDZaBFo1kF',
     'DGFhfOTPFb7',
     'DGIO1Y-zd61',
     'DGNJA7cxCt-',
     'DGNRrT6T83n',
     'DGhmtB9SjNJ',
     'DGiWgYCzk4M',
     'DGkvS8NTV8d',
     'DGnJbXRSjp0',
     'DH0Y0SLSx_O',
     'DHCiEi8zFpx',
     'DHF2VNyScIY',
     'DHF7eCYSGXy',
     'DHKvLapSlT9',
     'DHQQWrbSEMs',
     'DHTcKo3yPuS',
     'DHVoadLyscz',
     'DHalBiWTbpP',
     'DHdFZB1T5E_',
     'DHfW-HszDYL',
     'DHm-S08vydt',
     'DHndKiEyTG9',
     'DHp_5P9yl8d',
     'DHpsOCGTAe-',
     'DHpzZLBSdNw',
     'DHqWDeHSsfM',
     'DHs3d0azSCl',
     'DHzqzyRSgkS',
     'DHzvfzIy53b',
     'DIFf5-_TuIi',
     'DIFxnwoyt1v',
     'DIJM_XSpZqO',
     'DIOXnO0SJgI',
     'DIQexmWSQCx',
     'DIYqrM6h-YZ',
     'DIsi-Muycks',
     'DIyII7yyQV3',
     'DJ4ErV9z-tO',
     'DJ4QKJ5zZ1Q',
     'DJBOFYXTbuK',
     'DJG4aKATplG',
     'DJc7EMzzWR_',
     'DJgJDlfzSWc',
     'DJlGUQOzzLr',
     'DJlsehsPUsn',
     'DJwHpAfTwvK',
     'DJyT6R1z8Ot',
     'DKBSj-wpdEr',
     'DKBjBS3zOE2',
     'DKE0T2CpH5w',
     'DKMgTVDzUfl',
     'DKO03x_uGtp',
     'DKO_QhoOqZQ',
     'DKUXa7KT40R',
     'DKb5HNQTW98',
     'DKhNm4PySid',
     'DKn7-iQz5f7',
     'DKwDnOjThHq',
     'DKx9LduSzF7',
     'DL9Y2puzsIJ',
     'DLCg_AIBaN5',
     'DLD0ShkTtFa',
     'DLE37RXO6MZ',
     'DLE5o8bum1f',
     'DLEM-qsTIbG',
     'DLEid8pvtTv',
     'DLFXkB6J1p_',
     'DLPZPDmTPmU',
     'DLQ6ff5TJyY',
     'DLQv_wiTkRK',
     'DLSUgCYSkFE',
     'DLZe9DzznWK',
     'DL_XyMETll0',
     'DLljVYPztHw',
     'DLojqN1tILU',
     'DM7WobLzSGl',
     'DM9OwTkyhiD',
     'DM9dGZmzNV4',
     'DMFVUlAyId0',
     'DMMQHIdPEVx',
     'DMOr3IxSEUT',
     'DMSasugSxvE',
     'DMXRkp4zwyn',
     'DMXlJ3NvBhd',
     'DMcy6drSg4R',
     'DMdHSA5y_HF',
     'DMeQWH_PMuz',
     'DMeXtuBTmg2',
     'DMewXqlPpE6',
     'DMfKCSRJjaU',
     'DMhtSptyIOw',
     'DN2yLqGZnHF',
     'DNC-gEFSwSh',
     'DNDJNFKSxYZ',
     'DNIrv_1Nrrn',
     'DNKhCojSHLg',
     'DNS_jdMy5qF',
     'DNSgZr5OQL0',
     'DNaeT-JJ8EW',
     'DNcQ6ZGph3M',
     'DNclAdoT9sd',
     'DNddDArvKwD',
     'DNkUDkypllr',
     'DNkVMmbzmaK',
     'DNkyv9nvBlb',
     'DNnlhAgyX6b',
     'DNpQfcqv6Mk',
     'DO0TA_LEhn2',
     'DO0a7XBEiCQ',
     'DO79VhQjjv9',
     'DOBVucoj8rK',
     'DOGMrU5km1g',
     'DOGZSf-E6sO',
     'DOMqbj9k0tW',
     'DOOKr37EtL_',
     'DOQBHtOE4xT',
     'DOSD5aeEi__',
     'DOXDqKekrs2',
     'DOhwNilkxq9',
     'DOno80-E5Jg',
     'DOpXdKkEmpk',
     'DOqrig2ExBe',
     'DOuUOD0Eudy',
     'DOx2aLaksZW',
     'DOzTe1yk95s',
     'DP0yCsckkRz',
     'DP6C8neEnWo',
     'DP6H6csEgX-',
     'DP8THg4EeAu',
     'DPK4cCwkROx',
     'DPTo2OPgdYI',
     'DPjXoGTCc-o',
     'DPk1X0Ij9Rk',
     'DPlHKliEbDk',
     'DPsTh0okuW-',
     'DPySxqrken-',
     'DQ8bwyoEnnq',
     'DQBqSmyDvsX',
     'DQDrjB2Egh7',
     'DQG6QcqEmfv',
     'DQO3iBTj2CO',
     'DQOEXWKkRHt',
     'DQQQrKOk9yn',
     'DQQmMjTEhoo',
     'DQTUP_XkjQM',
     'DQUbstNgXWV',
     'DQb7nwZkvHQ',
     'DQjnLbVkw2x',
     'DQmJ39cj4-X',
     'DQrB89iEtLJ',
     'DQtcr46kyng',
     'DR6IXAuEnc1',
     'DR6ZqfdkmVW',
     'DR9d5XBkqTV',
     'DRB9EkxktcW',
     'DRBzRnFkuAC',
     'DRE4OJOj-Zf',
     'DREqfFykmph',
     'DROVcu9ibFH',
     'DRRaP9VklN6',
     'DRUedtUD7Pw',
     'DRY2ftsktrH',
     'DRg9Q0MEszq',
     'DRyDdSwAa5Q',
     'DS5GdsPkkMm',
     'DSGsvrbklHt',
     'DSHAWrvEpTx',
     'DSHJlxsEox5',
     'DSHv4HLErPK',
     'DSPSKXWEkuf',
     'DSXdazPkuaI',
     'DSXeXAZktIe',
     'DScH04AklrD',
     'DSeV9aykov3',
     'DSeXhMXElS1',
     'DSm16yRgbEg',
     'DSo8fs9ksvW',
     'DSxS8IjE4I7',
     'DSzGOxzk46E',
     'DSzNxxnj3Qd',
     'DSzhMSFko_k'
   );
