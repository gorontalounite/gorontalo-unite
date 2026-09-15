-- The 2022 and 2023 archive: 375 reels from four spreadsheets.
--
-- 2022 brings 84 rows (12 landscape) and 2023 brings 291 (19 landscape). None
-- of the 375 was already in the table, none is duplicated inside the files,
-- none predates 2022, and every row carries a category.
--
-- Three things about this export shape, all of which would corrupt the import
-- if read the way the 2024/2025 ones were:
--
--   * There are TWO unnamed columns in a row. The category sits in the first
--     of them (index 9) and the format in the second (index 10), while the
--     column actually headed "Data comment" is empty. Reading by header name
--     collapses the two unnamed keys and files 375 rows under the wrong value.
--     Read positionally.
--
--   * There is no Views column at all — not blank, absent. Every row goes in
--     with views 0, so none of this can surface where the page ranks by view
--     count. That matches the rule for pre-2025 material.
--
--   * The column headed "Reach" is not reach. Likes exceed it on 96% of the
--     2022 rows and 92% of the 2023 rows, with a median reach of 19-40 against
--     a median of ~500 likes. Copying that into a column named reach would be
--     storing something known to be false, so reach goes in as 0 — unknown.
--     Likes, shares, follows, comments and saves look sane and are kept.
--
-- Permalinks here are not all /reel/: 6 are /tv/ and 2 are /p/, from the era
-- when IGTV was separate. The cover lookup below matches all four forms.
--
-- Endorse becomes Sponsored and flags the row. Landscape rows are ticked
-- editor_choice, which is cosmetic — a wide reel is on the Choices for You
-- shelf either way.
--
-- Covers: 374 of 375. Cw9TKOWBtpQ answers 404 on Instagram, so that reel
-- keeps a null cover and falls back to its category colour.
--
-- permalink is unique, so this is safe to run twice.

insert into public.reels (
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, editor_choice, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
select * from (values
  ('gorontalo.unite', 'Ramadhani ma mo paluto.
Dahayi bolo me huluto.
Amali mayi moluluto.
Hetombota bo''odelo puputo.

Dulahu buka bolo ngope''e mola.
Ramadhani ma mohindu molola.
Amali waw zikiri po''odeto''a mola.
Potala talumayi donggo odunggando mola.

video by @raflypiaggio', '2022-04-30 22:45:00+08'::timestamptz, 'https://www.instagram.com/reel/CdAQtUGgjbq/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 0, 0, 402, 0, 0, 2, 15),
  ('gorontalo.unite', 'Tumbilotohe merupakan salah satu kekayaan budaya di Gorontalo yang pantas dikembangkan. Oleh karena itu, tradisi tumbilotohe terus dilestarikan oleh warga gorontalo hingga saat ini. Banyak potensi yang dimiliki Tumbilotohe, salah satunya bisa menyedot kunjungan wisata ke daerah Gorontalo, karena tradisi Tumbilotohe tidak dijumpai di daerah manapun di wilayah NKRI. 

Seiring dengan perkembangan zaman, maka bahan lampu buat penerangan di ganti minyak tanah hingga sekarang ini. Bahkan untuk lebih menyemarakkan tradisi ini sering ditambahkan dengan ribuan lampu listrik. makna dari tradisi Tumbilotohe adalah semangat dan memberikan tanda bulan suci Ramadhan akan segera pergi dan menyambut hari kemenangan pada Idul fitri.

Dengan ini kami anak muda gorontalo mempersembahkan "KOLABORASI EPIC"
Tumbilotohe Tribrata ipilo Ft KOKO''O GORONTALO. 

Di malam terakhir Tumbilotohe dan sahur terakhir Koko''o gorontalo akan start di bawah lampu RAINBOW TRIBRATA yang akan dilaksanakan malam nanti jam 01:00 sampai dgn selesai.

SEE YOU ON IPILO', '2022-04-30 00:48:00+08'::timestamptz, 'https://www.instagram.com/reel/Cc96Wu2A2Kc/', 'Reel', 'Culture', false, 'landscape', true, 'published', 0, false, 0, 0, 1932, 4, 2, 61, 77),
  ('gorontalo.unite', 'Merupakan pompa air kapasitas terbesar di kelasnya menghasilkan 65 liter/ menit dengan kualitas dari Jepang dan standard SNI.

Panasonic Submersible Pump dapat menghasilkan air yang besar dengan daya listrik yang rendah dan tarikan air yang kuat.

Dengan bahan stainless steel yang tebal pompa ini anti karat dan tahan lama. Selain itu aman, telah teruji tahan api pada kontrol box, dilengkapi pemutus aliran listrik otomatis jika terjadi arus berlebih dan tahan suhu hingga 130°C.

Informasi lebih lanjut cek IG nya @pompahematlistrikpanasonic dan @idpanasonic atau cek melalui website www.panasonic.com/id

#ahlinyapompaair
#bringingwatertolife
#panasonic
#panasonicpompaair
#panasonicsubmersiblepump
#LiveYourBest', '2022-12-01 01:17:00+08'::timestamptz, 'https://www.instagram.com/tv/ClnrdrLP-vg/', 'Reel', 'Sponsored', true, 'landscape', true, 'published', 0, false, 0, 0, 182, 0, 0, 1, 2),
  ('gorontalo.unite', 'Official Trailer Film Wanalathi.

Sekelompok anak muda yang penasaran akan perbedaan bunga Teratai dan Lotus,  membuat mereka bertualang mencari kebenarannya hingga masuk ke hutan Wanalathi, hal-hal aneh mulai di rasakan di akibatkan Rasa ingin tau yg mengarahkan pada malapetaka yg tak bisa di bendung. 

Penasaran bagaimana akan Jalan ceritanya ! 
Mari mencari jawaban dari setiap pertanyaan akan Fenomena Hutan Wanalathi, melalui Pertualangan Akbar , Rara, Jesica, Hana, Nina, Ical dan Gery Di Film #WanalathiMovie Mulai tanggal 11 Agustus 2022 di Bioskop.

Karya Rumah produksi Gorontalo, PT Dwisetyo Gorontalo, di Produseri oleh @bennydsph, di sutradarai oleh @tobraniramanemarsa dan di bintangi oleh @jho_rizki @rifa_ivonya @irailvasari @hansdekraker @rowienaumboh @geryalvaroo @putriels18 @putriekaahmad_ @peter_flk74 @setyorumambie_  @rizalramadan16 @evelyn_nasiboe @rahmanimran @bayuglauker @isal_ali @isten_laiya @wanalathimovie', '2022-07-23 04:00:00+08'::timestamptz, 'https://www.instagram.com/tv/CgWjKQfB5Rb/', 'Reel', 'Sponsored', true, 'landscape', true, 'published', 0, false, 0, 0, 786, 0, 0, 21, 47),
  ('gorontalo.unite', 'Frekuensi Radio & Keseharian Kita

Kami senang sehari-hari bisa menemani anda, menjelajah dunia, terhubung satu sama lain, termasuk dengan yang tersayang. Bangga bisa membantu sahabat melakukan banyak hal dengan mudah, dari urusan bisnis, bepergian, berbagi dan mencari informasi hingga hampir semua ruang dan dimensi aktivitas. Tak tampak tapi sesungguhnya terus ada bersama anda, setiap waktu.

Frekuensi, sumber daya strategis terbatas, pilar utama konektivitas. Torang jaga sama-sama.

Eh, hari ini sudah video call dengan yang tersayang kan?', '2022-07-15 04:06:00+08'::timestamptz, 'https://www.instagram.com/tv/CgB9VHGBEX9/', 'Reel', 'Sponsored', true, 'landscape', true, 'published', 0, false, 0, 0, 112, 0, 0, 0, 2),
  ('gorontalo.unite', 'Panasonic Air Purifier mengeluarkan udara bersih ditambah teknologi nanoe™️ X yang mampu melawan varian virus Corona hingga 99,99% selama 24 jam hingga ke serat pakaian yang pakai, menghilangkan bau dan dapat melembabkan kulit serta rambut.

HEPA Filter H13 yang beda dari yang lain karena dilengkapi super alleru-buster untuk menghambat alergen, green tea "catechin" yang dapat menghambat virus dan anti-bacteria enzyme untuk mencegah pertumbuhan bakteri. 

Ga kalah canggih Panasonic Air Purifier dapat menghisap udara kotor dari segala arah, dapat menyerap polutan besar dan mampu menyerap polutan pada 30cm diatas lantai, dan dapat melihat kualitas udara didalam ruangan dengan CADR yang tinggi plus sudah mendapat sertifikat British Allergen Foundation.

Punya sensor canggih seperti sensor bau, debu, kelembapan, lampu dan human activity sensor yang dapat mendeteksi aktivitas di dalam ruangan sehingga lebih hemat energi.

Cocok untuk semua ruangan, di ruang tamu ataupun kamar tidur. Mau udara bersih dan sehat setiap hari? Ingat Panasonic Air Purifier!! 

#IAQsolutions
#indoorairqualitysolutions
#qualityairforlife
#panasonic 
#panasonicairpurifier
#nanoex
#LiveYourBest', '2022-11-18 00:01:00+08'::timestamptz, 'https://www.instagram.com/p/ClGEYuRvw_K/', 'Reel', 'Sponsored', true, 'landscape', true, 'published', 0, false, 0, 0, 72, 0, 0, 7, 3),
  ('gorontalo.unite', 'terima kasih @festivalikantuna sudah mendatangkan @padiband ke Gorontalo. 

Seiring padi tumbuh terus, teman-teman banyak yang memanen masa lalunya yang begitu indah, beberapa juga tak hanya diam, sampai ikutan menyanyikan sesuatu yang tertunda.

Mungkin ada yang tak bahagia, karena tempat terakhirnya bukan dia. 😉

Dari Gorontalo, Untuk Indonesia.

#GorontaloUnite #FortunaSiTuna #KulinerGorontalo #FestivalIkanTuna #DariGorontaloUntukIndonesia #FKITG22', '2022-09-03 08:02:00+08'::timestamptz, 'https://www.instagram.com/reel/CiDHJAKpoek/', 'Reel', 'Event', false, 'landscape', true, 'published', 0, false, 0, 0, 1322, 0, 0, 15, 22),
  ('gorontalo.unite', 'Gorontalo Karnaval Karawo merupakan event unggulan Provinsi Gorontalo. Event yang masuk dalam Kharisma Event Nusantara (KEN) tahun ini menggangkat tema Karawo Inspiring Sulawesi.

Gorontalo Karnaval Karawo diselenggarakan selama 3 hari, mulai tanggal 6 sampai dengan 8 juni 2022 di Grand Palace Convention Center, Kota Gorontalo dan akan dihadiri langsung oleh Menteri Pariwisata dan Ekonomi Kreatif RI @sandiuno 

Mari datang dan meriahkan Gorontalo Karnaval Karawo tahun 2022. 

#GorontaloKarnavalKarawo2022 #GorontaloUnite #BerbagiPositifUntukGorontalo #WonderfulIndonesia', '2022-06-05 18:31:00+08'::timestamptz, 'https://www.instagram.com/tv/CecglUCrgns/', 'Reel', 'News', false, 'landscape', true, 'published', 0, false, 0, 0, 508, 0, 0, 1, 11),
  ('gorontalo.unite', 'GOR David Tony di Sport Center Limboto ini vibesnya udah seperti Istora. Sering digelar berbagai event olahraga, multifungsi. 

Ini final volleyball tadi malam, antara Satyatama 713 vs J12 Community yg dimenangkan Satyatama 713. Suporternya itu loh.', '2022-09-17 23:16:00+08'::timestamptz, 'https://www.instagram.com/reel/CiozWqVgd9t/', 'Reel', 'News', false, 'landscape', true, 'published', 0, false, 0, 0, 689, 0, 0, 3, 8),
  ('gorontalo.unite', 'kalo kata teman ini, namanya @rully3_  salah satu solusi dalam memecahkan masalah adalah dengan jalan-jalan. yaa betul juga sih, tapi masalah satu akan tergantikan dengan masalah berikutnya. rasa capek.

eh tapi tunggu dulu, kalo disajikan dengan view seperti ini, rasa-rasanya rasa capek itu cepat hilang loh. 

so, jika masalah tidak ada jalan keluarnya, maka kita yang keluar jalan-jalan. 

video by: @rully3_ 
#GorontaloUnite #BerbagiPositifUntukGorontalo', '2022-06-16 01:30:00+08'::timestamptz, 'https://www.instagram.com/tv/Ce3AlipBd07/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 158, 0, 0, 1, 5),
  ('gorontalo.unite', 'Lahe Island, di Marisa Kota Cinta. Karena lokasi pulau ini juga dekat dari Pantai Pohon Cinta. Pulau yang terawat, terjaga, semoga seterusnya, karena kan disini banyak burung maleo bertelur. 

menyelam, berenang, bersenang-senang. #enjoylife 

suka mo baku iko kapan2 @rully3_, tapi yang dekat-dekat saja. 150 meter dari Jl. Satria misalnya, ditemani kopi, so boleh itu. 😀', '2022-11-25 17:38:00+08'::timestamptz, 'https://www.instagram.com/p/ClZ-6eKBWee/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 1359, 3, 1, 47, 67),
  ('gorontalo.unite', 'Banyak peninggalan bersejarah di daerah ini yang terus dijaga dan dilestarikan. Misalnya Benteng Otanaha yang dibangun dari material pasir, batu kapur yang direkatkan dengan putih telur burung Maleo ini. 

Selain jadi sebagai tempat wisata, bisa dijadikan sebagai warisan ilmu pengetahuna untuk generasi berikutnya. 

video by: Febri Febrianti @nifeby #GorontaloUnite', '2022-10-01 20:17:00+08'::timestamptz, 'https://www.instagram.com/reel/CjMiCYZAHRN/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 527, 0, 0, 1, 13),
  ('gorontalo.unite', 'Siang-siang saat suasana lagi teduh-teduhnya begini, cobain ayam geprek ala chrispy borneo kalimantan Indonesia khas @ayamcrispyborneo yang bisa dipesan lewat @grabfoodid dgn titik maps: AYAMCHRISPYBORNEO, Jl. Piola Isa, Wongkaditi Barat, kayaknya pas deh. 

Lebih pas lagi saat dimakan lagi panas-panas, pedas-pedas, sampe pecah-pecah keringat (pica-pica suar dang).', '2022-11-14 21:29:00+08'::timestamptz, 'https://www.instagram.com/reel/Ck-ESFZAWZ6/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 439, 0, 0, 6, 35),
  ('gorontalo.unite', 'suasana hujan dan menjelang weekend setelah kerjaan beres, segelas Capucino ala @barampa.coffee kayaknya pas buat menemani. agak hot, bisa. kalo iced cocoknya siang.

Barampa Coffee lokasinya di Jl. Achmad Nadjamudin, Kota Gorontalo.

by: @barampa.coffee #GorontaloUnite', '2022-08-18 03:24:00+08'::timestamptz, 'https://www.instagram.com/reel/ChZbcnOAmim/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 164, 0, 0, 0, 8),
  ('gorontalo.unite', 'siyang-siyang sayang-sayang begini enaknya ba apa ee? rebahan jo? malas kamana-mana? kalo mimin lagi senang-senangnya masak memasak. 

cuma kebetulan hari ini lagi mager, jadi kepengen order Korean Toast by @bicara.toast dan Ice Red Velvet by @inginroti, dinikmati sendirian boleh, rame-rame lebih keren.

Nanti kalo nongki-nongki cantik, bisa langsung ke Foodcourt Menara Limboto atau di pertigaan Jl. Palma & Jl. HB Jassin, tepatnya depan Indomaret.', '2022-07-21 23:28:00+08'::timestamptz, 'https://www.instagram.com/reel/CgTebDnATXk/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 76, 0, 0, 0, 2),
  ('gorontalo.unite', 'Paling enak itu, hari minggu begini, makan siang dengan suasana berbeda, ada pemandangan koala-nya, alamnya. Vibesnya bikin jadi adem.

Video: @sintiamci6 
📍Dulamayo, Bohulo Camp & Eat
GorontaloUnite BerbagiPositifUntukGorontalo', '2022-07-16 23:48:00+08'::timestamptz, 'https://www.instagram.com/reel/CgGpVkKgBml/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 447, 0, 0, 6, 21),
  ('gorontalo.unite', 'Roti Embong ala @inginroti bikin ketagihan ee. Banyak variannya, mau coklat ada, susu keju ada, vanila, cappucino, tiramisu. Uh, ada zeyenggg. 

Makan sendiri bisa kalo lagi ndak ba diet, rame-rame lebih seru. Cusss, merapat ke @inginroti. Bisa takeaway, bisa delivery, bisa makang di tampa, bisa pesan di Gofood or Grabfood. Kalo ada yang mudah, cussss.

Booth #InginRoti udah pada tau kan di mana? Catat nih. 
1. Pas dipertigaan Indomaret Jl. Palma - HB Jassin
2. Foodcourt Menara Limboto @menara_81 

Buat menu buka puasa juga cocok nih. 🥹', '2022-07-07 02:46:00+08'::timestamptz, 'https://www.instagram.com/reel/CftN46PAEvc/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 191, 0, 0, 1, 5),
  ('gorontalo.unite', 'Ada yang pernah cobain ndak, Kue Balok Parikesit yang terletak pas di halaman Es Teh Indonesia Kebun Panjaitan, samping Dealer Kawasaki Gorontalo. 

Kayaknya pas juga nih, menyantap Kue Balok ditemani es teh dengan beragam rasa dan varian. Tapi lebih enak dan pas lagi, si pemilik senyum manis ikutan menemani. Karena tidak semua yang manis bikin bosan, tapi bikin betah. 

Oh iyaa, ini waktu mampir di Kue Balok Parikesit. Varian menunya beragam, harganya pun terjangkau. Mulai dari 16ribuaan untuk beberapa rasa. Coba deh kapan-kapan. 

#GorontaloUnite #BerbagiPositifUntukGorontalo', '2022-07-06 22:21:00+08'::timestamptz, 'https://www.instagram.com/reel/Cfsu_rzAopJ/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 676, 2, 0, 53, 76),
  ('gorontalo.unite', 'Akhir pekan, jalan-jalan santai ke pantai sore-sore pasti menyenangkan. namanya saja perjalanan, ada banyak yg bisa dinikmati. 

Kalo jalan-jalan sore ala @sintiamci6 enaknya bareng ayang yaa, apalagi sambil nungguin sunset ditemani pisang goreng panas pake dabu-dabu pidis. pica-pica suar itu. romantisnya dapat. 

Setelah magrib, baru itu singgah martabak. romantisnya berlipat-lipat 😄

📍Leato, Tamendao Beach', '2022-06-25 00:42:00+08'::timestamptz, 'https://www.instagram.com/reel/CfOF-00gH42/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 863, 0, 0, 47, 54),
  ('gorontalo.unite', 'Ada tempat nongkrong yang authentic dan keren nih di Gorontalo, kenalin, Dum Dum Thai Drinks. Lokasinya? catat nih, di Jl. Kalimantan, No. 30. Pokoknya kawasan Kalimadu-nya Gorontalo. 

Dum Dum Thai Drinks yang kita kenal dengan konsep The First Authentic Thai Tea ini merupakan pelopor minuman thai tea pertama di Indonesia loh. 

Mau merasakan langsung produk Dum Dum Thai yang mengusung langsung high-quality thai tea? Coba deh jalan-jalan ke Dum Dum Thai Drinks. Kebetulan juga lagi ada promo dalam rangka Grand Opening dari tanggal 9 sampai 13 Juni. Buy 2 Get 1 All Variant

#DumDumThaiDrinks #AuthenticThaiTea #ThaiTea #DumDum #BaruSeru', '2022-06-11 16:29:00+08'::timestamptz, 'https://www.instagram.com/reel/CervO8sAvDH/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 113, 0, 0, 6, 4),
  ('gorontalo.unite', 'Cabe Merah dan juga Bakso Lapangan Tembak Senayan yg terletak di Citimall Gorontalo tetap masih menjadi primadona buka puasa bersama keluarga yaa. Apalagi liburan lebaran nanti. 

Nah, di Cabe Merah maupun Bakso Laptem ini ada promo juga. Jadi, setiap pemesanan senilai Rp. 200.000 atau lebih, akan dapat cashback berupa pashmina yang keren juga. 

Selama bulan Ramadhan buka mulai setengah 6 sore, setelah Lebaran Idulfitri nanti buka seperti biasa. 10am to 10pm.', '2022-04-29 22:07:00+08'::timestamptz, 'https://www.instagram.com/reel/Cc9nWwAAmFL/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 228, 0, 2, 0, 2),
  ('gorontalo.unite', 'yang lagi cari tempat bukber seru-seruan, bisa bareng-bareng ke @the____vibes', '2022-04-19 01:28:00+08'::timestamptz, 'https://www.instagram.com/reel/CchqAJcAWkt/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 215, 0, 0, 8, 9),
  ('gorontalo.unite', 'Jadi gimana? siang ini sudah ngopi atau belum? biasanya kopi juga bisa menambah nuansa tersendiri yaa, apalagi ngopi disuasana alam sekitar yang adem. 

@rully3_ 
#GorontaloUnite', '2022-03-01 19:48:00+08'::timestamptz, 'https://www.instagram.com/reel/Calj3vjgjAT/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 714, 0, 0, 24, 40),
  ('gorontalo.unite', 'Siapa yang pernah buka puasa di Masjid @darularqamgorontalo (yang setiap harinya ada menu berbeda-beda). Buat yang belum tau, Masjid Darul Arqam ini berada di pusat kota. Selama Ramadhan bukan hanya agenda buka puasa saja, tapi ada banyak kegiatan-kegiatan lainnya juga.

"siapa memberi makan orang yang berpuasa, maka
baginya pahala seperti orang yang berpuasa tersebut, tanpa
mengurangi pahala orang yang berpuasa itu sedikit pun juga." (HR. Tirmidzi)

dikirimin @therifki96', '2022-04-17 01:11:00+08'::timestamptz, 'https://www.instagram.com/reel/Cccd-wIAp7F/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 0, 621, 0, 0, 3, 14),
  ('gorontalo.unite', 'tilangguliyo koko''o (mentoki), hanya ada di bulan Ramadhan. sebuah tradisi unik dari yang awalnya sedikit lama-lama jadi ramai-ramai untuk membangunkan warga sekitar untuk sahur. 

konvoi star dari depan Kantor Walikota Gorontalo dan berakhir disekitaran Pelabuhan Gorontalo. (it''s correct, star dari depan Rumah Dinas Gubernur Gorontalo dan berakhir di Pabean)

dulunya alat yang dipake sih sederhana saja. ada panci, dandang, dll. seiring berkembangnya zaman, alat yang dipakai untuk ''mentoki'' atau koko''o itu berubah. 

seru ah. hirameya mopobongu ta mo suhuru. 

dikirim @wamby.stenly', '2022-04-02 11:33:00+08'::timestamptz, 'https://www.instagram.com/reel/Cb290nZg8bW/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 0, 2286, 1, 0, 27, 47),
  ('gorontalo.unite', 'Sekarang ini banyak banget pilihan skin care routine yang malah buat kita jadi bingung, harus pilih yang mana? Banyak review bagus tapi ternyata gak cocok di kulit sendiri atau mau coba tapi gak siap dengan resiko-nya.

Nah, kali ini mimin mau review lagi salah satu tempat perawatan kulit yang ditangani oleh ahlinya di Gorontalo. Namanya ERHA . FYI aja yaa teman-teman. @erha.dermatology ini punya cabang diseluruh Indonesia dan berdiri lebih dari 22 tahun yang didukung oleh expert dermatologist, so terpercaya.

Di ERHA, sebelum kita memulai treatment, bisa konsultasi dulu dengan dokternya mengenai perawatan kulit apa yang bagus dan direkomendasikan untuk kulit kita. Misalnya dengan Acne Peeling Face ini, yang bermanfaat membersihkan jerawat, mengontrol minyak, mengangkat sebum, dan bagus untuk bruntusan.

Kalo mau datang di ERHA, pake saja aplikasi ERHA Buddy. So tersedia juga di iOS dan Playstore. Di aplikasi, kita bisa pesan produk ERHA, konsultasi dokter, atau mau booking jadwal konsultasi online. 

Untuk info lebih lanjut, bisa cek instagram @erha.dermatology / atau chat di WhatsApp 𝟬𝟴𝟭𝟭-𝟮𝟭𝟮𝟭-𝟮𝟭𝟮𝟭 
  @erha.dermatology @erha_ultimateantiaging  @erha_ultimatehaircare
@erha_ultimateacnecure
@erha_ultimatemakeover
@erha_ultimatebrightening
@erha_ultimateskinhealth
@erha_ultimateatopycure

#ERHAUltimate
#DermaBeautyExpert
#5ClearConcept', '2022-12-29 03:34:00+08'::timestamptz, 'https://www.instagram.com/reel/Cmv--5KhZ3L/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 232, 0, 0, 3, 8),
  ('gorontalo.unite', 'Erafone Store kini telah hadir di Limboto. 

Jangan sampai lewatkan kesempatan terbaik untuk nikmati penawaran spesial gadget idaman mulai dari DISKON hingga Rp 3,8 Juta, Flash Sale mulai dari Rp 7 ribuan, hingga bawa pulang hadiah langsung disetiap pembelian hanya di Grand Opening Erafone Store di 37 kota pilihan!

Nikmati juga Tambahan DISKON hingga Rp 750 Ribu dengan Cicilan 0% hingga 18 bulan* menggunakan kartu kredit dari bank-bank pilihan.', '2022-10-01 21:48:00+08'::timestamptz, 'https://www.instagram.com/reel/CjMsjFKAWSZ/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 234, 0, 0, 0, 5),
  ('gorontalo.unite', 'Erafone Store kini telah hadir di Limboto. 

Jangan sampai lewatkan kesempatan terbaik untuk nikmati penawaran spesial gadget idaman mulai dari DISKON hingga Rp 3,8 Juta, Flash Sale mulai dari Rp 7 ribuan, hingga bawa pulang hadiah langsung disetiap pembelian hanya di Grand Opening Erafone Store di 37 kota pilihan!

Nikmati juga Tambahan DISKON hingga Rp 750 Ribu dengan Cicilan 0% hingga 18 bulan* menggunakan kartu kredit dari bank-bank pilihan.', '2022-10-01 21:42:00+08'::timestamptz, 'https://www.instagram.com/reel/CjMrwphAEBY/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 102, 0, 0, 3, 3),
  ('gorontalo.unite', 'Sore-sore begini enaknya ngapain yaa? Ada yang sudah punya planing kemana? yang belum punya planing kemana-mana, cobain deh Es Teh Indonesia Kebun Panjaitan. lokasinya sekitar 200 meter dari Gerbang Kampus UNG. 

Suasana disini juga mayan cozy, buat nongkrong deng tamang-tamang apalagi. Banyak pilihan minuman juga. 

#EsTehIndonesia #EsTehAdalahKita #GorontaloUnite', '2022-07-01 00:44:00+08'::timestamptz, 'https://www.instagram.com/reel/CfdhsWbACx-/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 124, 0, 0, 4, 6),
  ('gorontalo.unite', 'Mimin mo kase info nih sama teman-teman. Sudah tau kan kalo di Gorontalo ada tempat perawatan yang bikin wajah kamu sehat dan cerah? Depe nama ERHA Skin Gorontalo. Lokasinya di Jl. Nani Wartabone, pokoknya sekitar 100 meter dari Masjid Agung Baiturrahim, Kota Gorontalo.

Fyi yaa. ERHA ini punya cabang disemua daerah di Indonesia dan berdiri lebih dari 22 tahun yang didukung oleh expert dermatologist, so terpercaya

Kalo mau datang di ERHA, pake saja aplikasi ERHA Buddy. So tersedia juga di iOS. Di aplikasi, kita bisa pesan produk ERHA, konsultasi dokter, atau mau booking jadwal konsultasi online. 

Nanti pas sampe di ERHA, kase liat saja aplikasinya. Nanti dapa diskon 25K untuk semua layanan tanpa minimum transaksi juga.

Untuk info lebih lanjut, bisa cek instagram @erha.dermatology / atau chat di WhatsApp 𝟬𝟴𝟭𝟭-𝟮𝟭𝟮𝟭-𝟮𝟭𝟮𝟭 

@erha.dermatology
@erha_ultimateantiaging
@erha_ultimatehaircare
@erha_ultimateacnecure
@erha_ultimatemakeover
@erha_ultimatebrightening
@erha_ultimateskinhealth
@erha_ultimateatopycure

#ERHAUltimate
#DermaBeautyExpert
#5ClearConcept', '2022-06-30 03:28:00+08'::timestamptz, 'https://www.instagram.com/reel/CfbQoZNgzO-/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 212, 0, 0, 8, 11),
  ('gorontalo.unite', 'dari Gorontalo untuk Indonesia, sebuah persembahan menarik dari @festivalikantuna. 

Ikan tuna di Gorontalo, bisa dikatakan salah satu potensi pemasukan tersendiri bagi masyarakat. Tinggal bagaimana cara pengelolaannya, penyajiannya, ataupun dikemas sebagus mungkin. Begitu juga dengan UMKM-nya, perlahan naik kelas.

Semua disajikan dalam #FestivalIkanTuna. Begitu indah lagi sebentar malam ditemanin @padiband. 

#DariGorontaloUntukIndonesia 
#FestivalikanTuna
#FortunaSiTuna
#FKITG22', '2022-09-02 23:29:00+08'::timestamptz, 'https://www.instagram.com/reel/CiCMw69gqdA/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 766, 0, 0, 17, 9),
  ('gorontalo.unite', 'suasana segar seperti ini, bisa mempengaruhi mood dalam beraktifitas (apapun aktifitas yang dilakukan). selamat menjalani rutinitas. 

creator aesthetic, @lutviyac #GorontaloUnite', '2022-11-27 15:22:00+08'::timestamptz, 'https://www.instagram.com/reel/Cle4OXKgyFx/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 215, 0, 0, 0, 3),
  ('gorontalo.unite', 'semangat menjalani hari-hari yang (semoga) menyenangkan buat teman-teman semua. yang di jalan, hati-hati di jalan. 

oh iya, mulai hari ini akan ada operasi kepolisian kewilayahan ''zebra otanaha 2022. lengkapi surat-surat kenderaan, patuhi peraturan lalu lintas. 

video: @yunusmuller25 #GorontaloUnite', '2022-10-02 16:59:00+08'::timestamptz, 'https://www.instagram.com/reel/CjOwWzjgJ3S/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 478, 0, 0, 2, 25),
  ('gorontalo.unite', 'Berangkat beraktifitas langsung disambut kabut pagi begini rasanya enak yaa. apalagi naik bentor, rambut masih basah2, angin berhembus sepoi-sepoi. 

Selain kemerdekaan dan lebaran, pagi juga harus dirayakan, memulai mencari nafkah. 

video: @isco_motret #GorontaloUnite', '2022-08-18 17:15:00+08'::timestamptz, 'https://www.instagram.com/reel/Cha6Xb-Axud/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 841, 0, 0, 4, 20),
  ('gorontalo.unite', 'Satu hal yang selalu di syukuri setiap hari setiap pulang kerja, disajikan pemandangan senja yang jingga seperti ini. Kadang rasa lelah terbayarkan, hanya dengan rasa syukur itu sendiri. 

Mari berakhir pekan lagi.

video: @isal_gomic 
#GorontaloUnite', '2022-08-12 02:08:00+08'::timestamptz, 'https://www.instagram.com/reel/ChJ1ycyAx1C/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 1209, 0, 0, 12, 74),
  ('gorontalo.unite', 'cerita ketika senja perlahan mulai tenggelam. kemanapun, dimanapun, enjoy teman-teman. 

📀 @isal_gomic 
#gorontalounite', '2022-08-10 01:20:00+08'::timestamptz, 'https://www.instagram.com/reel/ChEm8-AAyY3/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 243, 0, 0, 0, 2),
  ('gorontalo.unite', 'Jalan-jalan saja dulu itu sama ndak dengan jalani dulu? Sama yaa, namanya saja perjalanan. Disetiap perjalanan, ada tanjakan, tikungan, jalan lurus, dan macam-macam. 

Kalo jalan-jalannya sekedar healing, itu namanya cari ketenangan. Apalagi vibesnya seperti di Biluhu ke Batudaa Pantai ini. Kan itu jalannya masih baru, terus view lautnya bikin adem. 

video: @reginamagdalena_ 
#GorontaloUnite', '2022-07-22 00:37:00+08'::timestamptz, 'https://www.instagram.com/reel/CgTmnUIA8-B/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 482, 0, 0, 0, 22),
  ('gorontalo.unite', 'kalo istilah kerennya, ngabuburit. kalo di Gorontalo ada istilahnya sendiri juga. mohundude dulahu (mendorong matahari), biar apa coba? biar mataharinya cepat terbenam dan waktu berbuka puasa cepat tiba. keren kan? 😅

nah, ada macam-macam aktifitas dalam mohundude dulahu, misalnya mondalengo, motubu, moposiapu mopobuka, dll. banyak deh yang bisa dilakukan, selama itu positif. sekalian hitung-hitung ibadah di bulan Ramadhan.

Misalnya jalan-jalan ke Luhu, Telaga. Ada spot menarik buat dinikmati disini, apalagi kan sore-sore.

dikirim @y_lihawa', '2022-04-06 01:22:00+08'::timestamptz, 'https://www.instagram.com/reel/CcAKhVQAEiI/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 1234, 0, 0, 22, 74),
  ('gorontalo.unite', 'Ampas Kopi, tempat ngopi dengan view Taman Budaya dan Paka Tower. yaa meskipun agak tersembunyi (sadiki). apalagi kalo malam minggu, lampu menara manyala. 

Buka dari sore sampe tengah malam, kayaknya pas disini buat ngobrol banyak hal. Nanti kapan-kapan kalo ke Limboto, coba mampir.', '2022-02-26 01:48:00+08'::timestamptz, 'https://www.instagram.com/reel/Cab5sucA4aX/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 822, 0, 0, 6, 33),
  ('gorontalo.unite', 'Salah satu aktifitas warga Desa Torosiaje, Popayato yang tinggal diatas permukaan air, membudidayakan ikan teripang.

Masyarakat melihat teripang laut ini salah satu jenis biota laut dengan nilai jual ekspor tinggi jadi masyarakat tertarik dengan harga dari teripang laut. 

by: @kanaldesacom Teruslah menjelajah. #GorontaloUnite', '2022-11-12 21:11:00+08'::timestamptz, 'https://www.instagram.com/reel/Ck40oXTAO3y/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 491, 0, 0, 9, 23),
  ('gorontalo.unite', 'Agustus dengan segala semangatnya segera berakhir. Tetap ceria seperti bulan-sebelumnya. 

Ini kawasan Jembatan Merdeka GORR, Isimu Utara. Penamaan Jembatan Merdeka mungkin karena aksi upacara 17 Agustus kemarin. Tidak jauh dari sini, masih di Isimu juga, ada namanya Lapangan Karya Isimu. 

Seperti kata @endanksoekamti, Isimu itu:
Mandiri dalam bekerja,
Merdeka dalam berkarya.

video: @isal_gomic #GorontaloUnite', '2022-08-29 17:56:00+08'::timestamptz, 'https://www.instagram.com/reel/Ch3Qb27B8x1/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 186, 0, 0, 4, 0),
  ('gorontalo.unite', 'Sebuah kolaborasi yang keren, Pemerintah Kecamatan Tibawa dan Karang Taruna se-Kecamatan Tibawa bersama-sama memperingati Upacara Peringatan HUT Kemerdekaan RI dengan cara berbeda. 

Ramai-ramai membentangkan bendera di kawasan Gorontalo Outer Ring Road, kompleks Mako Brimob Isimu. 

🇮🇩 @isal_gomic #GorontaloUnite', '2022-08-16 20:20:00+08'::timestamptz, 'https://www.instagram.com/reel/ChWFAbAADWV/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 2492, 0, 0, 32, 32),
  ('gorontalo.unite', 'Pelayanan kesehatan dan vaksinasi di dusun terjauh di wilayah kerja Puskesmas Kabila Bone yang dikirim @egasuleman_ ini keren loh. Bertugas sambil menikmati suasana alamnya yang segar dan makanannya yang segar juga. 

Jadi bisa menyenangkan dan menenangkan, karena kerja gak harus didalam ruangan ber-AC buatan, tapi AC alami yang dipersembahkan alam dan lingkungan sekitar. 

#GorontaloUnite #BerbagiPositifUntukGorontalo', '2022-06-06 19:30:00+08'::timestamptz, 'https://www.instagram.com/tv/CefMKe9h5ml/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 345, 0, 0, 7, 11),
  ('rbenawan', 'Xmas Everyone 🎄
. 
. 
. 
#fiersabesari 
#gorontalounite
#fyp 
#likesforlike 
#diskusisenja 

📍Pulau diyonumo 25 Desember 2022', '2022-12-25 00:36:00+08'::timestamptz, 'https://www.instagram.com/reel/CmlZB-Pqj0o/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 113, 0, 0, 8, 0),
  ('gorontalo.unite', 'Danau-Danau yang terbuat secara alami pasti beda dengan danau buatan, yang pada akhirnya bagus jadi tempat wisata. Misalnya di Danau Perintis, Suwawa ini. Apalagi sore-sore pinggir danau to. 

Kenapa Danau Limboto tidak ‘sebersih’ ini meskipun ada event festival setiap tahunnya? Mungkin karena faktor sedimentasi ataupun faktor lainnya. Danau Limboto itu sudah masuk dalam 15 danau kritis di Indonesia. jika kritis, berarti penangannya bukan lagi di opname. Kan begitu. 

video: @arief.pptgn #GorontaloUnite', '2022-12-20 00:03:00+08'::timestamptz, 'https://www.instagram.com/reel/CmYdm7Ig4NU/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 627, 0, 0, 3, 16),
  ('gorontalo.unite', 'Enjoy weekend everybody and everyone, termasuk pendukung tim yang lolos 4 besar dan main di final, juga pendukung tim yang sudah berangkat pulang kampung duluan. 

Kalo ada waktu luang, sekali-kali liburan, kasian kalo lemburan terus. begitu kata @lecka_smenkqiuw saat menikmati hari-hari menyenangkan di Pulau Bohu, Monano, North Gorontalo.

video by: @lecka_smenkqiuw @fath_zm #GorontaloUnite', '2022-12-15 22:49:00+08'::timestamptz, 'https://www.instagram.com/reel/CmOCCuVo9ou/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 506, 0, 0, 9, 10),
  ('gorontalo.unite', 'salah satu tempat yang direferensikan buat menghabiskan waktu akhir tahun bersama keluarga, kerabat dan orang-orang terdekat, Villa Kencana di Bolihutuo. 

video: @viqiyusuf #GorontaloUnite', '2022-12-14 21:58:00+08'::timestamptz, 'https://www.instagram.com/reel/CmLXrDDAkRl/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 827, 3, 1, 16, 43),
  ('gorontalo.unite', 'Masa kecil dulu, senja adalah hal yang biasa. Dirayakan dengan main bola di tempat gilingan padi sampai adzan magrib berkumandang (atau yang punya bola so mo pulang duluan).

Saat beranjak besar, ingin sekali menikmati momen-momen dikala senja seperti ini, seperti @adhyy.s menikmati senja di Pulau Popaya, Gorontalo Utara yang keren ini. 

Pesan moralnya, nikmati momen dalam keadaan apapun, dengan siapapun, sekecil apapun itu, karena suatu saat akan dirindukan.', '2022-12-10 01:14:00+08'::timestamptz, 'https://www.instagram.com/reel/Cl-1nhJA553/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 448, 0, 0, 3, 12),
  ('gorontalo.unite', 'Dulu di kawasan Bulango Ulu ini terkenal dengan produksi gula merah. Tapi menyimpan keindahannya tersendiri, sejak akses mulai terbuka perlahan. Misal nih di Longalo, Bulango Utara ini. 

Semoga tetap terjaga, kenyamanannya. Apalagi sebentar lagi dam di Bulango Ulu itu selesai.

Enjoy ur adventure, @rifaldius', '2022-11-28 17:26:00+08'::timestamptz, 'https://www.instagram.com/reel/ClhrXivgL2s/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1020, 4, 0, 46, 44),
  ('gorontalo.unite', 'G20 telah selesai, semoga dunia akan selalu terpesona dengan alam budaya negeri kita yang terus kita jaga ini. Andaikata G20 dipusatkan di Gorontalo, diajak jalan-jalan ke Hulia Ilohuuwa Waterfall dekat Taludaa ini kayaknya seru. Medannya itu loh. 😂

Intinya, semoga selalu terjaga (hatimu & alam sekitar)
Iya kan, @raymoniagaa ?? 😀 #GorontaloUnite', '2022-11-16 22:58:00+08'::timestamptz, 'https://www.instagram.com/reel/ClDX-0yA8tn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 326, 0, 0, 2, 6),
  ('gorontalo.unite', 'Makin banyak tempat keren di Gorontalo, makin tidak ada waktu untuk mendatanginya setiap saat. Kalopun bisa, yaa paling skali-skali. Misal ke Cabana Resto & Resort disekitaran Pantai Bolihutuo, Boalemo ini. #GorontaloUnite', '2022-11-10 21:34:00+08'::timestamptz, 'https://www.instagram.com/reel/CkzxyqoAm42/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 780, 1, 1, 12, 69),
  ('gorontalo.unite', 'Siang-siang bisa seteduh dan sedamai ini bisa menyenangkan yaa. Cobalah kesini skali-skali saja, memang butuh perjuangan, tapi bisa terbayarkan langsung dengan suasana senyaman ini. 

Zuriati Mini Waterfall, tepatnya di perbatasan Kecamatan Anggrek & Kecamatan Monano, Gorontalo Utara. Terus masuk lagi ke arah dalam, yaaa sekitar 2500-3000 meter begitulah. Perkiraan saja, pokoknya begitu. 

video: @adhyy.s #GorontaloUnite', '2022-11-07 20:30:00+08'::timestamptz, 'https://www.instagram.com/reel/Ckr72sbAXwU/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 732, 0, 0, 35, 34),
  ('gorontalo.unite', 'selamat menikmati pagi, menjalani keseharian seperti biasa, dan melanjutkan semangat lagi. sepertj semangat pagi suasana Danau Perintis di Suwawa. 

video: @nthnplt #GorontaloUnite', '2022-11-03 16:40:00+08'::timestamptz, 'https://www.instagram.com/reel/CkhHlKXgcJY/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 178, 0, 0, 2, 6),
  ('gorontalo.unite', 'nikmat kopi akhir pekan di tepi danau perintis, suwawa, yang bisa ikut dirasakan sensasinya. 

enjoyyyy, jalani hari-harinya. 
2023 tinggal 70 hari lagi,
Ramadhan 150 hari lagi. 

video: @rully3_ #GorontaloUnite', '2022-10-23 01:53:00+08'::timestamptz, 'https://www.instagram.com/reel/CkDNeUjALZq/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 499, 0, 0, 11, 7),
  ('gorontalo.unite', 'setiap orang sedang dalam peperangan yang sulit. nikmati perjalanan dimanapun dengan hati senang. kalo hujan, berteduh. kalo kepanasan, sini mampir ngopi bareng. 

video: Om Bob • @rully.ahaya #GorontaloUnite', '2022-10-17 21:49:00+08'::timestamptz, 'https://www.instagram.com/reel/Cj142cJgDwZ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 256, 0, 0, 2, 4),
  ('gorontalo.unite', 'cuaca lagi cerah-cerahnya, jalan-jalan ke bucer (bumi ceria) di bulotalangi seru ini. bawa tenda sendiri, buat camping, buat berteduh saat hujan turun. 

@_tyhrs22 #GorontaloUnite', '2022-10-14 18:24:00+08'::timestamptz, 'https://www.instagram.com/reel/CjtzOLFgtay/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 923, 2, 1, 24, 56),
  ('gorontalo.unite', 'kalo pantai utara Gorontalo biasanya pantainya banyak pasir putih halus, beda lagi kalo ke arah selatan Gorontalo. pesisir laut berbatu dan banyak batu karangnya. Misalnya di pesisir Teluk Tomini, tepatnya di Oluhuta, Kabila Bone ini. 

Bagus juga yaa view sunsetnya disini. 

video: @dani_malasai | @li_fhiaa @tulusanugraha_ 
#gorontalounite', '2022-10-02 21:48:00+08'::timestamptz, 'https://www.instagram.com/reel/CjPRH2mAd1_/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1042, 0, 0, 29, 62),
  ('gorontalo.unite', 'Danau Perintis di Suwawa, Bone Bolango makin kesini makin keren yaa, buat santai-santai sore bisa, camping bisa, buka kelas masak-memasak juga bolehlah. Padahal ini danau buatan, yang tidak terbentuk oleh faktor alam. 

Danau Limboto, ayo, kamu bisa, sekeren ini. 

➖ @nurlailaishak #GorontaloUnite', '2022-09-19 04:14:00+08'::timestamptz, 'https://www.instagram.com/reel/Cir6jswA0G-/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 462, 0, 0, 4, 3),
  ('gorontalo.unite', 'Dari bagian utara Gorontalo, satu pulau kecil menawarkan keindahannya tersendiri. Lito Huha, tidak jauh dari Kwandang (yaa, meskipun lumayan juga jaraknya). Pokoknya berdekatan dengan Pulau Saronde & Pulau Bugisa.

Kapan mantai lagi? Lito Huha bisa jadi pilihan destinasi berikutnya lagi. 

video: @gisellamukuan #GorontaloUnite', '2022-09-13 23:06:00+08'::timestamptz, 'https://www.instagram.com/reel/CieegikgBzs/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 866, 8, 3, 26, 37),
  ('gorontalo.unite', 'suasana yang mewah, yang disajikan alam sekitar. apalagi pagi yang teduh, embun masih ada, ditemani kopi yang masih panas. 

Boleh dicoba. kapan-kapan kalo mau. 

video: @rifaldius #GorontaloUnite', '2022-09-12 23:30:00+08'::timestamptz, 'https://www.instagram.com/reel/Cib9QCqg37d/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 639, 0, 0, 7, 25),
  ('gorontalo.unite', 'pagi yang adem, siangnya panas, berikutnya hujan, kemudian cerah lagi. tetap sehat, adem dan semangat teman-teman. semoga hari-hari yang kita lalui selalu ada berkahnya. 

dari Potanga, West City, Gorontalo, @aanniode_ memantau dengan dronenya.', '2022-09-01 16:29:00+08'::timestamptz, 'https://www.instagram.com/reel/Ch-4cERADzN/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 367, 0, 0, 6, 13),
  ('gorontalo.unite', 'Orang-orang paling suka kalo setelah hujan itu, ada pelangi. Tapi tidak sedikit juga orang yang suka bau tanah kering yang tersiram air hujan.

scent of ''the'' rain-nya (aroma hujan) nuansanya beda. apalagi semacam disekitaran Benteng Ulantha, Suwawa. suasana alam lingkungan sekitar banyak tanah kosong.

Ada yang menyukai keduanya, pelangi & aroma hujannya. ada yang seakan terjebak dengan hujannya. 

selamat berakhir pekan, semuanya. prepare jo malam mingguan (dimuka hape) 😉

📀 @iqriyahladiku_ #GorontaloUnite', '2022-08-27 02:25:00+08'::timestamptz, 'https://www.instagram.com/reel/ChwfJyMgGLP/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 216, 0, 0, 1, 4),
  ('gorontalo.unite', 'Biarlah siangnya panas bagimana, yang penting bisa menikmati paginya yang terlalu teduh. 

Makin kesini, Danau Perintis di Suwawa, Bone Bolango ini terus berbenah, mempercantik suasananya. Biar kita selalu bisa menikmati kemewahan pagi disini. 

📀 @petty_hamz #GorontaloUnite', '2022-08-26 16:24:00+08'::timestamptz, 'https://www.instagram.com/reel/ChvaqA_A1aD/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 291, 0, 0, 1, 5),
  ('gorontalo.unite', 'Awan-awam yang menyatu dengan langit yang biru bagaikan hamparan lautan. Ah, tempat ini selalu menghadirkan ketenangan tersendiri. Jauh dari hiruk pikuk.

📍Puncak Hutan Pinus, Dulamayo.
📺 @petty_hamz #GorontaloUnite', '2022-08-17 20:05:00+08'::timestamptz, 'https://www.instagram.com/reel/ChYpOc5AC0Y/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 566, 1, 0, 15, 17),
  ('gorontalo.unite', 'Berindonesia untuk Indonesia. 🇮🇩

Lakukan dengan apa yang kita bisa, support dengan apa yang kita suka. Dirgahayu Republik Indonesia. 

Salam kemerdekaan dari @nandaelba di Puncak Pulau Diyonumo, Deme II, Sumalata Timur, Gorontalo Utara. 

#dirgahayuindonesia #gorontalounite', '2022-08-16 17:38:00+08'::timestamptz, 'https://www.instagram.com/reel/ChVzZazgham/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 556, 0, 1, 7, 13),
  ('gorontalo.unite', 'Pagi-pagi dari Puncak Bumi Ceria (Bucer) di Bulotalangi, pilihan bersantai bersama keluarga di hari libur. tapi kalo mau lebih ekslusif, kesini bagusnya pas lagi sepi saja. terserah mau mandi bisa, sekedar santai-santai juga bolehlah. atau kalo malam hari, bisa sambil camping juga. 

📺 @y_lihawa #GorontaloUnite', '2022-08-13 19:05:00+08'::timestamptz, 'https://www.instagram.com/reel/ChOPHR9AYjv/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1342, 0, 0, 97, 129),
  ('gorontalo.unite', 'selalu ada rasa dan ingin kembali, setelah mendatangi tempat-tempat yang berkesan, meskipun tanpamu. 

Puncak Lestari, Tapaluluo, Telaga Biru, paginya seperti lagi berada di negeri atas awan (Katon Bagaskara pernah menggambarkan suasana ini dalam lagunya).

video: @yahyaakib 
#GorontaloUnite', '2022-08-13 16:22:00+08'::timestamptz, 'https://www.instagram.com/reel/ChN8Gr2A6iT/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 237, 0, 0, 0, 4),
  ('gorontalo.unite', 'Berhadapan dengan laut, suasananya yang adem, pilihan bagus buat bersantai. La Casa Diari, Bongo, Batudaa Pantai (jadi ingat La Casa De Papel 😆). 

Akses menuju ke villa ini mudah. Berada di kawasan Desa Wisata Religi terbaik di nomor 2 Indonesia, Bongo, Batudaa Pantai. Dekat juga dengan Masjid Walima Emas. Fasilitasnya juga bagus. Haruslah, secara kan tempat terbaik di Indonesia. 

Tertarik mencobanya? Biaya permalamnya US$100-an. atau Rp. 1.500.000/malam.', '2022-07-31 00:36:00+08'::timestamptz, 'https://www.instagram.com/reel/Cgqw0V-AoV-/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1314, 1, 0, 95, 145),
  ('gorontalo.unite', 'Untuk sampai disini, di air terjun mini serasa private place, memang butuh perjuangan ekstra. Butuh waktu kurang lebih 2 jam dengan medan yang menantang. tapi rasa lelah terbayarkan pas sampe. apalagi kan sunyi sepi begitu.

Tertarik menjelajahi Air Terjun Zuriati ini? tidak jauh, tepatnya di Desa Zuriati, Monano, Gorontalo Utara.

video by announcer, @nissamoh (Riyani Djangkaru juga petualang dan penyiar juga) 😀

#GorontaloUnite #BerbagiPositifUntukGorontalo', '2022-07-26 01:03:00+08'::timestamptz, 'https://www.instagram.com/reel/Cgd8R1ugVd1/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 713, 0, 0, 29, 40),
  ('gorontalo.unite', 'Orang-orang kalo healing, pasti ke tempat-tempat keren. Disaat-saat seperti itu, suasana tempat bisa memberikan ''rasa sembuh'' itu sendiri. 

video: @erozadam 
📍Villa Kencana, Bolihutuo

#GorontaloUnite', '2022-07-22 23:28:00+08'::timestamptz, 'https://www.instagram.com/reel/CgWCtYAAekD/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 821, 0, 0, 22, 59),
  ('gorontalo.unite', 'Meskipun pagi ini tidak secerah nama tempat ini, Puncak Bucer (Bumi Cerah) di Bulotalangi, Bulango Timur, tapi harus tetap cerah ceria. 

Dinikmati dengan segelas kopi dan pisang goreng panas pake dabu-dabu pidis disini, uh sadap yaa.

video: @yunusmuller25 
#GorontaloUnite #BerbagiPositifUntukGorontalo', '2022-07-17 19:43:00+08'::timestamptz, 'https://www.instagram.com/reel/CgIxxsmgYrc/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1657, 12, 0, 167, 184),
  ('gorontalo.unite', 'Healing disuasana yang hening, beda rasanya dengan healing di keramaian. 

Tapi ada yang lebih murah lagi. Namanya hening, itu cara healing paling mudah tapi kurang yang berminat. 😃

Video: @rifaldius 
#GorontaloUnite #berbagipositifuntukgorontalo', '2022-07-12 23:47:00+08'::timestamptz, 'https://www.instagram.com/reel/Cf8VwJ9gMY8/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 534, 0, 0, 8, 11),
  ('gorontalo.unite', 'Pagi yang teduh dan sejuk di Danau Perintis, Suwawa, Bone Bolango. by: @andikaaaaaaaaaaaaaaa 

#GorontaloUnite #BerbagiPositifUntukGorontalo', '2022-07-12 17:00:00+08'::timestamptz, 'https://www.instagram.com/reel/Cf7mixGAaiU/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 107, 0, 0, 0, 3),
  ('gorontalo.unite', 'Memulai petualangan dari pagi, menyusuri sungai yang masih bersih dan semoga terus dijaga. Kita juga dong, bukan cuma masyarakat sekitar. Jangan datang, malah bikin sampah banyak-banyak.

Supaya besok-besok, anak cucu kita, masih punya tempat buat menikmati keheningan alam yang jauh dari kebisingan kota.

Video: @rully.ahaya | Kawasan Meranti, Tapa, Bone Bolango
#GorontaloUnite #BerbagiPositifUntukGorontalo', '2022-07-06 17:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CfsNlKwgfV5/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 284, 0, 0, 1, 5),
  ('gorontalo.unite', 'Cerita pertama kali datang ke Puncak Hutan Pinus Dulamayo ini yilapalo (tersesat) dan bocor akan ban motor jam 7 malam di tengah hutan. Cuma lupa, waktu itu jalan dengan siapa. 

memang harus well prepared juga sih. sampai akhirnya terbiasa, kalo ada waktu luang menyempatkan datang kesini, sendiri juga tidak apa-apa (asal bukan malam, belum berani).

tempat terbaik buat mengakrabi alam semesta juga. 
video: @raymoniagaa 

#GorontaloUnite #BerbagiPositifUntukGorontalo', '2022-07-04 20:16:00+08'::timestamptz, 'https://www.instagram.com/reel/CfnWx5LAsc0/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 519, 0, 0, 11, 10),
  ('gorontalo.unite', 'Kenapa banyak tempat-tempat keren di Gorontalo, tapi agak jauh-jauh yaa? 

Ini pertanyaan atau pertanyaan? tanggap seorang teman. Jadi begini, ini hemat sederhana saja. Kenapa banyak yang jauh-jauh tapi keren-keren? Karena, sesuatu yang indah, untuk menikmatinya kita butuh proses, bukan protes. Jadi saat tiba, rasa lelah perjalanan bisa terbayarkan dalam sekejap.

Mungkin begitu, mungkin juga bukan begitu. Nikmati saja, sama halnya dengan LDR-an yang tidak mendapatkan apa-apa saat jauhan. 😅😅

video: @vinaluciabanua 

#GorontaloUnite #BerbagiPositifUntukGorontalo', '2022-06-23 01:55:00+08'::timestamptz, 'https://www.instagram.com/reel/CfJEzy7AM5S/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 719, 0, 0, 3, 19),
  ('gorontalo.unite', 'selagi ada kesempatan, selagi ada waktu, enjoyyyy. 

seperti kata Sheila On 7, bersenang-senanglah, karena hari ini yang kan kita rindukan, di hari nanti, sebuah kisah klasik untuk masa depan. 

video oleh @rully3_ , anak OASIS.', '2022-06-15 18:12:00+08'::timestamptz, 'https://www.instagram.com/reel/Ce2OK4OAH5g/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 486, 0, 0, 7, 19),
  ('yudhaabdullah_', '🏝
#creativemultiplepost #madewithstories #gorontalo #gorontalolife #vsco', '2022-06-07 10:34:00+08'::timestamptz, 'https://www.instagram.com/reel/CegzPvHhDYq/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 48, 0, 0, 0, 0),
  ('gorontalo.unite', '... aku menjaga persahabatan dengan alam dengan cara tidak buang sampah sembarangan, menebang pohon, menjaganya tetap cantik. 

kemudian alam memberikan sesuatu yang indah, adem, nyaman pula. 

__
kalo torang sayang saka alam lingkungan sekitar, tidak menebang pohon, dll, lingkungan akan menjaga kita. dijauhkan dari banjir, dan lain-lain. 

bukan begitu bukan? 

📍 Ilomata Rivercamp, sekitaran Taman Nasional Bogani Nani Wartabone, Gorontalo
📀 @ria.lstr #gorontalounite', '2022-02-15 21:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CaBrh8GgiOV/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 566, 0, 0, 27, 32),
  ('gorontalo.unite', 'weekend, hujan, adem, trus staycation di @villa.kencana yang dekat pantai, ditemani segelas cadburry dairy milk yang masih panas-panas, trus pisang goreng juga panas-panas. 

kayaknya seru yaa. ada rencana? 

@nurlailaishak', '2022-02-10 22:38:00+08'::timestamptz, 'https://www.instagram.com/reel/CZ08Ivph-I0/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 805, 0, 0, 14, 47),
  ('gorontalo.unite', 'berada di sekitaran pohon, bisa mengurangi karbondioksida. karena pada saat bersamaan, pohon melakukan fotosintesis.

berada ditempat-tempat banyak pohon juga bisa menyenangkan hati, karena suasana sekitarnya meneduhkan. 

📍Puncak Hutan Pinus Dulamayo
@melikapanigoro_', '2022-02-06 22:35:00+08'::timestamptz, 'https://www.instagram.com/reel/CZqowTshQgf/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 514, 0, 0, 4, 17),
  ('gorontalo.unite', 'rencana jalan-jalan berikutnya yang harus dimasukan dalam list, rivertubing ala @ilomata_rivercamp (yang sekali mendayung, 3-4 batu dilewati, maksudnya, selain tubing di sungai yang seru, juga bisa camping asyik, ngopi, dll)

@briantiarno @mohamadtaufik25', '2022-02-05 19:08:00+08'::timestamptz, 'https://www.instagram.com/reel/CZnsEjxhqbw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1314, 0, 0, 116, 74),
  ('gorontalo.unite', 'sudah mo weekend, mari dirayakan dengan hati gembira, mensyukuri semua karuniaNya, bersama orang-orang tersayang. 

🎈 Wisata Sawah Indah di Desa Sejahtera, Bulango Selatan.

video: @rahmatya_tangguda 

#gorontalounite #berbagipositifuntukgorontalo', '2022-02-03 21:42:00+08'::timestamptz, 'https://www.instagram.com/reel/CZi0HReBn0x/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 584, 3, 0, 8, 42),
  ('gorontalo.unite', 'bangun jo, mari kita menjalani hidup dengan menyenangkan kemana saja kita mau. ke koala, ke gunung, ke pantai. sendiri tidak apa, berdua bisa juga. 

murah meriah asal seru yaa. 
principle @oeloe_mile', '2022-01-15 16:06:00+08'::timestamptz, 'https://www.instagram.com/reel/CYxSkQIhQe5/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 184, 0, 0, 1, 2),
  ('syn.er.gyfest', 'Perjalanan Kilas Balik✨keseruan yang tak terlupakan dari Synergyfest, 10 Desember 2023!🎵

Bagikan cerita dan momen terbaik kalian dari festival kami!😎

Synergy 2023
''The Most Celebrated Festival in Town''', '2023-12-28 07:10:00+08'::timestamptz, 'https://www.instagram.com/reel/C1ZhE8rBjH2/', 'Reel', 'Event', false, 'landscape', true, 'published', 0, false, 0, 0, 863, 2, 3, 23, 0),
  ('wafiqarsyad_', 'Cukup diam dan rasakan.

📍Puncak Dumbo Raya', '2023-11-16 20:42:00+08'::timestamptz, 'https://www.instagram.com/reel/Czu-w7_hYlP/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 0, 0, 1038, 0, 0, 17, 0),
  ('gorontalo.unite', 'Satu lagi persembahan Rachmat Gobel untuk Gorontalo; Festival Ikan Tuna 2023! 

Yuk, dateng dan ramaikan acaranya yang berlokasi di kawasan kuliner Pantai Tamendao. Dari tanggal 28 September-1 Oktober 2023. 

Akan ada banyak suguhan menarik, mulai dari pameran UMKM, edukasi & diskusi, lomba-lomba, sampai live music performance yang pastinya bikin meriah acaranya!

Sst, jangan lupa buat follow juga akun @rachmatgobel_rg buat dapetin info-info seputar Festival Ikan Tuna 2023, plus giveaway & doorprize menarik!', '2023-09-27 05:19:00+08'::timestamptz, 'https://www.instagram.com/reel/CxsehRcyr47/', 'Reel', 'Event', false, 'landscape', true, 'published', 0, false, 0, 0, 596, 0, 0, 11, 17),
  ('bank_indonesia_gorontalo', '[Gerakan Nasional Bangga Buatan Indonesia & Bangga Berwisata di Indonesia]

Hai Hai Hai #SobatRupiah, #Nouutigorontalo

Kabar gembira nih buat masyarakat Gorontalo karena akan ada event besar di Gorontalo loh 🥳

Yup, Gerakan Nasional Bangga Buatan Indonesia dan Bangga Berwisata di Indonesia yang dikemas dalam Hulonthalo Art & Craft Festival akan diselenggarakan pada tanggal 15, 16 dan 17 September 2023 🤩

Pastinya, banyak hal yang bisa kamu nikmati selama event berlangsung yah
Mulai dari pameran produk UMKM dan Seni, Kuliner, Lomba dan Games seru, Live Performance, Live Shopping, Hadiah & Doorprize dan masih banyak lagi

Penasaran seperti apa keseruannya??
Yuk, bergabung dalam event Gerakan Nasional Bangga Buatan Indonesia dan Bangga Berwisata di Indonesia di Grand Palace Convention Center (GPCC), Kota Gorontalo

Jangan lupa ajak teman, rekan  keluarga dan orang terkasih kalian yah

#gbbigbbwigorontalo
#hacfgorontalo
#bankindonesia
#bankindonesiagorontalo
#bigorontalo
#gorontaloselaluterdepan
#disetiapmaknaindonesia
#gorontalo
#gorontalohits
#gorontalounite
#gorontaloinframe
#exploregorontalo
#gto', '2023-09-08 21:43:00+08'::timestamptz, 'https://www.instagram.com/reel/Cw9TKOWBtpQ/', 'Reel', 'Event', false, 'landscape', true, 'published', 0, false, 0, 0, 260, 0, 0, 7, 0),
  ('0435id', 'Bismillah...
Comingsoon di September!

Event Sportainment pertama di Gorontalo persembahan dari @0435id untuk masyarakat Gorontalo...

Siap gaes? 😁😁

#gorontalo #sportaiment #pakapakabulu #vindes #tepokbulu', '2023-08-28 22:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CwhEB5sMxa_/', 'Reel', 'Event', false, 'landscape', true, 'published', 0, false, 0, 0, 191, 0, 0, 2, 0),
  ('gorontalo.unite', 'Pagi-pagi di Hutadaa, Talaga Jaya, pinggir Danau Limboto. Salah satu spot menarik kalo foto-foto atau nongkrong sore-sore juga. 

FYI, itu tanah dekat Danau Limboto sebenarnya dulu masih bagian dari danau, karena setiap tahunnya air di danau surut. Apalagi musim kemarau begini, sungai yang bermuara di Danau Limboto ini rata-rata mengering, kecuali sungai besar yaa. 

Ada tapinya juga. Jika musim hujan, pasti ada saja rumah warga yang terendam air danau. Rendamannya pun lama surutnya, bisa berminggu-minggu. 

📍Hutadaa, Talaga Jaya
📸 @delapayuhi #GorontaloUnite', '2023-08-24 15:45:00+08'::timestamptz, 'https://www.instagram.com/reel/CwWDcs_BKBa/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 557, 0, 0, 13, 21),
  ('gorontalo.unite', 'Intip disini deh perjalanan ke Lito HuHa, di Gorontalo Utara dengan jumlah rombongan sampai 12 orang. Kalo sewa perahu 50rb/orang pulang-pergi dari Pelabuhan ke Pulaunya, terus jangan lupa juga tenda buat camping (kalo sewa), makanan (masak dari rumah saja), dan bensin. Yaa, paling sejutaan. 

Lebih hemat juga kan, apalagi per orang-nya patungan 150rb.

Jalan beramai-ramai seperti ini yang menyenangkan. Berbagi keceriaannya bersama-sama. 

📸 @davazees15 @jihaanmuhraini', '2023-08-01 20:07:00+08'::timestamptz, 'https://www.instagram.com/reel/CvbR2TAhJou/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 385, 0, 1, 11, 5),
  ('gorontalo.unite', 'Healing di Gorontalo, selain murah dia meriah. Ini kesempatan untuk siapa saja menyenangkan dirinya sendiri. Suasana koala yang hening, yang ada cuma suara burung deng aer koala. Sadap loh suasananya, syahdu. 

📍Pasambaya Riverside, Modelidu
📸 @te_kepu #GorontaloUnite', '2023-07-29 16:45:00+08'::timestamptz, 'https://www.instagram.com/reel/CvTNZvUB1-Q/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 477, 0, 0, 4, 5),
  ('gorontalo.unite', 'Kawasan Geopark Hiu Paus Botubarani. 

Berhubung air di pantai Botubarani yang jernih juga, hiu paus bisa terlihat dari atas. Solusi yang pas buat mereka yang belum berani snorking atau diving, bermain bersama hiu paus-nya. 

📸 @edfpotrait #GorontaloUnite', '2023-07-28 17:05:00+08'::timestamptz, 'https://www.instagram.com/reel/CvQqkGRBihx/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 191, 0, 0, 0, 3),
  ('gorontalo.unite', 'Kadang kita perlu datang ke tempat baru agar lebih bersyukur. Nikmatilah momen liburan bersama keluarga tercinta sebelum kembali ke realitas.

Liburan kali ini ajak si Dara 🥰. Nnti kita jadwalkan kembali full tim anak cucu Opa George Maxwiliam Bokings & Oma Oki Mozin

Makanannya bakso siomay kuah by @bosascakegorontalo

Lokasi: ABIGI HOUSE @abigihasan
Video: @densee.denis #GorontaloUnite', '2023-07-02 23:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CuOahucyARB/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 479, 0, 0, 11, 23),
  ('gorontalo.unite', 'Diberi kesempatan untuk menghirup pagi sesejuk ini, adalah karunia yang tak terhingga dariNya. Mari merayakan pagi dengan mandi. Selamat merayakan hari rabu yang tidak pernah diragukan. 

📌 Puncak Dunu Ceria 
🎥 @fathirmohi23 #GorontaloUnite', '2023-06-13 15:51:00+08'::timestamptz, 'https://www.instagram.com/reel/CtcqgaKB96I/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 438, 0, 0, 12, 15),
  ('deddy_iteneps', '“ANAK DESA” | New single.. 
#anakdesa #desa #desaku #pemudadesa #desaindah #indahitudidesa #alamdesa #pedesaan #indonesia #indonesiakaya #kekayaanindonesia #gorontalo #bonebolango #gorontalomusikgram', '2023-06-13 01:20:00+08'::timestamptz, 'https://www.instagram.com/reel/CtbGnkSBBjj/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 0, 0, 180, 0, 0, 3, 0),
  ('gorontalo.unite', 'Frekuensi Radio, Pilar Utama Konektivitas

Menghubungkan miliaran manusia di dunia  setiap harinya, setiap saat.

Sebagai catatan, menurut Newzoo via katadata.co.id pengguna smartphone secara global mencapai 4,3 miliar by 2023; terbanyak di China, Amerika, India lalu Indonesia di urutan keempat dan Brazil kelima. Di Indonesia sendiri menurut laporan We Are Social & Meltwater disadur dari Kompas, mencapai 207 jutaan populasi. 

Sumber daya frekuensi selain menghubungkan jutaan hingga miliaran pengguna smartphone juga berperan vital dalam komunikasi penerbangan, setiap harinya terestimasi terdapat seratus ribuan flight di seluruh dunia (trip.com by May 2023). Semuanya pasti berkomunikasi dengan otoritas Air Traffic Control, tidak mungkin pakai kabel, pakainya frekuensi (radio), wireless. 

FREKUENSI
TORANG JAGA SAMA-SAMA !!!

#Frekuensi
#Gorontalo
#TeamLG
#LokaGorontalo
#SDPPI
#MCI
#FrekuensiSatukanNegeri', '2023-06-12 00:38:00+08'::timestamptz, 'https://www.instagram.com/reel/CtYde8OgnBW/', 'Reel', 'News', false, 'landscape', true, 'published', 0, false, 0, 0, 243, 0, 0, 2, 7),
  ('gorontalo.unite', 'Ahadi, pagi atau sore, coba kesini. area perintisarcheryzone bisa sambil 🐴🏹 (panahan dan berkuda) bersama @wadala_stable. tidak jauh dari Danau Perintis, Suwawa. #GorontaloUnite', '2023-06-03 23:13:00+08'::timestamptz, 'https://www.instagram.com/reel/CtDtTzAADY3/', 'Reel', 'Lifestyle', false, 'landscape', true, 'published', 0, false, 0, 0, 975, 3, 1, 50, 69),
  ('gorontalo.unite', 'Teman-teman yang mau nonton film yang ada dan kaya unsur budayanya? Nanti agendakan deh nonton film Onde Mande! Film ini genrenya komedi tapi hadir sebagai genre yang segar, seru, ringan, lucu dan bisa dinikmati semua orang.

Kalo keseringan nonton horor, nanti tegang terus. Cairkan suasana skali-skali kalo setiap kali ke bioskop. Kapan dang depe tanggal main? Catat nih, 22 Juni 2023 di bioskop terdekat di Kota Anda (di Gorontalo kamu tidak akan salah, karena bioskopnya cuma 1) 😅

#OndeMande', '2023-05-31 07:23:00+08'::timestamptz, 'https://www.instagram.com/reel/Cs6Qul5A9uc/', 'Reel', 'Sponsored', true, 'landscape', true, 'published', 0, false, 0, 0, 81, 0, 0, 0, 5),
  ('gorontalo.unite', 'Sambut Ramadan dengan Belanja Bijak ala anjuran @bank_indonesia_gorontalo 

Kan biasanya nih, kalo bulan Ramadan ada yang dapa THR, bonus, omzet penjualan meningkat, dll. Nah, Bank Indonesia Kantor Perwakilan Provinsi Gorontalo mengajak kita semua, mongowutato waw mongodula''a, mongodulahu waw semua-semuanya, untuk belanja bijak.

Seperti apa dan bagaimana, tonton video ini.

#bankindonesiagorontalo
#bigorontalo
#gorontaloselaluterdepan
#disetiapmaknaindonesia', '2023-03-21 04:50:00+08'::timestamptz, 'https://www.instagram.com/reel/CqDLNywgmbw/', 'Reel', 'Sponsored', true, 'landscape', true, 'published', 0, false, 0, 0, 235, 0, 0, 0, 4),
  ('gorontalo.unite', 'Laut yang biru di Lito (Pulau) HuHa saat matahari lagi panas-panasnya, trus berteduh dibawah pohon minum kelapa muda (kalo ada), panas matahari tetap ada, tapi nuansa molingangato tetap ada. 

Meskipun Molingangato, menuju HuHa kalo dari arah Isimu, akan melewati Molingkapoto terus cari perahu disekitaran Port of Kwandang. Tapi bisa juga lewat Pantai Bengel, Desa Mutiara Laut yang berada tidak jauh dari Oile Dive Resort untuk sampai ke Lito HuHa ini, seperti perjalanan Monthalengo Squad ini.

by: @andi.ishal_ #GorontaloUnite', '2023-03-10 23:00:00+08'::timestamptz, 'https://www.instagram.com/reel/Cpo34GKO4IK/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 846, 0, 0, 16, 29),
  ('gorontalo.unite', 'Aer koalanya sangat deras dan segar juga yaa. Tapi kalo dibekenkan tempat berteduh atau bersantai, lumayan juga terjaga safety-nya. Ini hal yang harus diperhatikan juga.

Akses koalanya juga bermuara di Pantai Minanga, Atinggola ini, banyak tempat-tempat menarik juga yang belum terjamah secara ramai. Misal disini, Tombulilato, yang dijadikan jadi wisata river camp, kalo ditambah river tubing kayaknya menantang juga. Iya kan om @diodetuage.entertainment ?? 😄
#GorontaloUnite', '2023-03-10 21:30:00+08'::timestamptz, 'https://www.instagram.com/reel/Cpo37bpyMkv/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 871, 0, 0, 27, 44),
  ('gorontalo.unite', 'DKI ~ Daerah Khusus Isimu. Itu yang kasih nama mungkin personil OASIS ~ Orang Asli Isimu Selatan. Tapi Isimu ~ Isi Hatimu itu nama lama, sekarang lebih dikenal Tibawa (banyak yang memulai LDR disini), padahal bisa dikatakan sentralnya Gorontalo, mungkin karena dulunya Isimu ini wilayahnya Danau Limboto ya, jadi agak dibawah datarannya. 

Cocoklogi saja itu, belum tentu benar. Enjoy weekend semuanya. 😁 video: @rolis_asi #GorontaloUnite', '2023-03-10 20:11:00+08'::timestamptz, 'https://www.instagram.com/reel/CponPibgqf9/', 'Reel', 'Tourism', false, 'landscape', true, 'published', 0, false, 0, 0, 692, 0, 0, 6, 16),
  ('emzydinata', '“Selain wisata, tiap daerah pasti punya kuliner khasnya. Kalau ke Gorontalo, wajib cobain menu yang satu ini ya. 

Namanya adalah Binte Biluhuta atau Milu Siram. Sup jagung dengan bumbu khas yang gak cuma enak, tapi juga menyehatkan.” - 

📍Milu Siram Sakinah
(Dulamayo Barat, Kec.Telaga, Kab.Gorontalo)

#gorontalo #gorontalohits #milusiram #kulinergorontalo #kulinerkhas #gorontalounite', '2023-12-30 01:05:00+08'::timestamptz, 'https://www.instagram.com/reel/C1eKdhux51f/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 986, 8, 0, 24, 0),
  ('rdcwalenta', 'Recap 2023 ✨🏝️🌊

#exploregorontalo #ayokegorontalo', '2023-12-26 03:02:00+08'::timestamptz, 'https://www.instagram.com/reel/C1UE2-HL9Pv/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 276, 0, 0, 0, 0),
  ('fhirmanohihiya', 'Villa kencana 06:04 wita🌅🏖️🌊

.

.

.
#gorontalo #villakenca #villakencanaboalemo #gorontalounite #miminpesgo #likegorontalo #gorontalolife #garagarasenja #sunset #senja #sunrise', '2023-12-26 02:12:00+08'::timestamptz, 'https://www.instagram.com/reel/C1T_JwHB6Wi/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 309, 0, 0, 2, 0),
  ('emzydinata', '“Banyak banget pulau-pulau indah di Gorontalo. Salah satu yang wajib jadi rekomendasi buat liburan nanti, ada pulau Dionumo di Kab.Gorontalo Utara yang punya suasana dan view juara. Ada yang udah pernah kesini juga?” -

📍Pulau Dionumo
(Kec.Sumalata Timur, Kab.Gorontalo Utara)

#gorontalo #gorontalohits #dionumoisland #gorontaloutara #wisatagorontalo', '2023-12-22 02:25:00+08'::timestamptz, 'https://www.instagram.com/reel/C1Jti-KxmOd/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 955, 10, 0, 21, 0),
  ('gorontalo.unite', '', '2023-12-16 22:04:00+08'::timestamptz, 'https://www.instagram.com/reel/C08X_zyye0-/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1068, 0, 0, 14, 51),
  ('isal_gorontalo', 'Float with whale shark

.
.
.
.
#whaleshark #gorontalo #wonderful_places #wonderfulindonesia #travelling #pesonaindonesia #trip #dji #djimavic #djiindonesia #wonderful_location #explore #underwater #freedivetrip #freedive #scubadive #scubadiving', '2023-12-15 17:41:00+08'::timestamptz, 'https://www.instagram.com/reel/C05VTp2BHhs/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 823, 4, 0, 21, 0),
  ('gorontalo.unite', 'Ada rasa tersendiri kalo lewat jalan sini. Tidak banyak yang berubah, tetap saja begitu dengan pesonanya. menjadi apapun kamu nanti, jangan pernah lupa bagaimana jalan-jalan itu pernah kamu lalui. 

ah, cantiknya sore setelah hujan yaa. 
@dadang7553 #GorontaloUnite', '2023-12-15 02:27:00+08'::timestamptz, 'https://www.instagram.com/reel/C03srhSyhQs/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 7027, 22, 3, 121, 688),
  ('emzydinata', '“After traveled for many times, here’s 10 beautiful places I’ve ever visited in Gorontalo.” -

1. Dionumo Island, North Gorontalo Regency
2. Lito Huha, North Gorontalo Regency
3. Whale Shark Botubarani, Bone Bolango Regency
4. Pulo Cinta, Boalemo Regency
5. Torosiaje Village, Pohuwato Regency
6. Perintis Lake, Bone Bolango Regency
7. Bolihutuo Beach, Boalemo Regency
8. Tamendao Beach, Gorontalo City
9. Pakaya Tower, Gorontalo Regency
10. Limboto Lake, Gorontalo Regency

📌Save and share for your future travel to Gorontalo! 

#gorontalo #indonesia #indonesiatravel #indonesiatravel', '2023-12-13 21:20:00+08'::timestamptz, 'https://www.instagram.com/reel/C00jjRGRSrP/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 11537, 30, 1, 143, 0),
  ('gorontalo.unite', 'Hola Gorontalo. Raisa menyapa nih. sampe ketemu di Stadion Utama Merdeka Gorontalo, 16 Desember 2023. 

Amankan tiketmu sekarang, tersedia tiket harga 150rb/orang.', '2023-12-12 17:45:00+08'::timestamptz, 'https://www.instagram.com/reel/C0xnLmiSmNY/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 569, 0, 0, 9, 11),
  ('wafiqarsyad_', 'Pagi hari setelah hujan ☕', '2023-12-12 01:14:00+08'::timestamptz, 'https://www.instagram.com/reel/C0v1Hzwhthq/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 323, 0, 0, 4, 0),
  ('biellysindua', 'Little Escapes to Gorontalo
.
.
.
______________________________
📷 @adhyy.s @andy_the_13 
.
.
#gorontalo #underwatergorontalo', '2023-12-12 00:10:00+08'::timestamptz, 'https://www.instagram.com/reel/C0vulc-hLDz/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 137, 0, 0, 8, 0),
  ('emzydinata', '“Boleh dibilang, ini kebanggaan Indonesia. Menara yang sekarang berumur 20 tahun ini gak cuma jadi ikon, tapi juga simbol keagungan. 

Lampu-lampu LED yang menghiasi di malam hari, bikin menara ini makin indah.” - 

📍Menara Pakaya
(Kec.Limboto, Kab.Gorontalo, Gorontalo)

#menarapakaya #gorontalo #menaralimboto #gorontalohits #gorontalounite', '2023-12-07 03:50:00+08'::timestamptz, 'https://www.instagram.com/reel/C0jONLkxZ4H/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 1400, 2, 0, 22, 0),
  ('gorontalo.unite', 'Kalo seperti kata @rully3_, warna kulit bolehlah mendung. isi dompet jangan. 

adoh, jadi pemicu kesemangatan ini. yuk, semangka kakak. Desember full ceria. Biar tahun 2024 nanti sudah siap menikah. 

Oh iya nih, Pulau Bitila di Mananggu, Boalemo ini kaya akan biota lautnya. Cocoklah buat destinasi akhir tahun. Jaraknya lumayan juga kalo dari arah Kota Gorontalo. Belum lagi nyebrang ke pulau sekitar 59 menitan ada deh. 500rb jalan rombongan untuk biaya masuk dan sewa perahu, lumayan itu. 

#GorontaloUnite #BitilaIsland', '2023-12-06 18:25:00+08'::timestamptz, 'https://www.instagram.com/reel/C0iPTgByGp9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 326, 1, 0, 12, 8),
  ('vickraien_d', 'Warga Gorontalo 
Pasiar kamari dulu di @ichibansushi_id 
Rekomendasi sadap for makan sushi
Asli Motabo Da’a alias Enak Sokali wanu depe harga terjangkau, Apalagi Vick Tadi Berkesempatan Ba MC depe Grand Opening yg merupakan Outlet Ke 101 Di Indonesia, Soal Rasa ndak Perlu di ragukan Pas dengan selera lidah Gorontalo. apalagi Baru buka Bagini Capat Ba dekat banyak Promo menarik dpe Lokasi Di Ground Floor Citimall 
ja Lipata…..☺️', '2023-12-01 06:11:00+08'::timestamptz, 'https://www.instagram.com/reel/C0UC_DwB9Qz/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 787, 0, 0, 24, 0),
  ('fathirmohi23', 'Tiba" Foto sambil sedih dikit gpp kan :) Selagi kalian masi anak" bermainlah sesuka hati tanpa beban pikiran, dan Tumbuhlah menjadi laki" yang kuat dan bertanggung jawab, you guys remind me how grateful we are when we were childhood. Nikmatilah sebelum kalian merindukannya. 

They said : Ka trng tda ad hp jdi boleh trng m tulis ti kak p nama spya klo trng s ad hp trng bisa lia 

How powerful that sentence was, it gave me goosebumps...

Smoga kalian msih bisa melihat foto ini kelak nanti....

#sonyphotography #sonyalpha #photography #masakecil #tumbuhdengancerita #flashback #childhood #gorontalopunya #gorontalotiktok #gorontalo #gorontalofyp #indonesia', '2023-11-30 03:49:00+08'::timestamptz, 'https://www.instagram.com/reel/C0RNYppP-RS/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 31369, 0, 0, 492, 0),
  ('isal_gorontalo', 'Magical underwater 

#gorontalo #wonderfulword #travelers #hiupaus #hiupausgorontalo #freedive #freediver #freedivegirls #ocean #pesonaindonesia #wonderfulindonesia #privatetrip #whaleshark #whalesharkgorontalo #trip', '2023-11-30 01:12:00+08'::timestamptz, 'https://www.instagram.com/reel/C0Q708SB1ch/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 275, 1, 0, 6, 0),
  ('syn.er.gyfest', '•DERE UDAH SIAP NIH NYANYI BARENG SYNERGIANS•

siapa nih yang udah ga sabar nyanyi bareng @__dere ?
yuk amanin tiket kalian di melalui @kiostix 

#synergy23', '2023-11-27 21:07:00+08'::timestamptz, 'https://www.instagram.com/reel/C0LVmynh9jY/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 618, 0, 0, 9, 0),
  ('gorontalo.unite', 'Kenalin nih, namanya Hungayono, berada dalam kawasan TNBNW (Taman Nasional Bogani Nani Wartabone), tempat yang sejuk aduhai, salah satu suaka burung maleo yang dikenal dengan nama Sanctuary Maleo Hungayono. 

Untuk sampai ke Hungayono, bisa naik mobil atau motor, mar cuma sampe di Tulabolo, Suwawa. Trus lanjut jalan kaki sekitaran setengah jam lebih sedikittttt.

Di Hungayono, beragam hal bisa dinikmati keindahannya, seperti liat-liat goa kapur, puncak batu alang-alang, mandi di koala bone, dll. Bagimana? Tertarik? Manjo dang. 

📸 @lutviyac #GorontaloUnite', '2023-11-24 21:37:00+08'::timestamptz, 'https://www.instagram.com/reel/C0DrAPFuDuS/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 248, 0, 0, 4, 10),
  ('gorontalo.unite', 'Terlukis panorama indah jauh disana, ternyata hanyalah fatamorgana. Efek khayal yang bisa terjadi di tanah yang luas, tapi tidak dipinggir danau, karena di danau ada pantulan air. 

Untuk menikmati suasana senja, tepi danau limboto ini masih terbaik sih. aksesnya yang mudah itu. #GorontaloUnite', '2023-11-22 23:12:00+08'::timestamptz, 'https://www.instagram.com/reel/Cz-sattSMZU/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 118, 0, 0, 0, 7),
  ('gorontalo.unite', 'Mau kemana saja di Gorontalo ini, banyak tempat-tempat menariknya. selain mudah, juga murah. Beda lagi jika labelnya kota metropolitan. So, begini adanya saja sudah lebih dari cukup. #GorontaloUnite', '2023-11-22 20:43:00+08'::timestamptz, 'https://www.instagram.com/reel/Cz-brFJyGyV/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 5009, 2, 1, 17, 227),
  ('emzydinata', '“Sesekali nyobain kulinerannya pas traveling di disini. Terutama ikan tunanya yang terkenal.

Karena Gorontalo adalah tuna, dan tuna adalah Gorontalo.” - 🍣

#gorontalo #tuna #tunafishing #kulinergorontalo #gorontalohits #gorontalounite', '2023-11-21 20:08:00+08'::timestamptz, 'https://www.instagram.com/reel/Cz7yaRPx9I8/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 1428, 4, 0, 33, 0),
  ('fhirmanohihiya', 'Cinta yang kita berikan adalah satu-satunya cinta yang kita simpan, Smngt pagi :)✨🌊🏝️🌥️

.

.

.

.
#pantai #beach #gorontalo #gorontalohits #gorontalounite #likegorontalo #gorontalolife #miminpesgo #pesonagorontalo #litohuha #gorontaloutara #lagutimur #sulawesiutara', '2023-11-20 17:24:00+08'::timestamptz, 'https://www.instagram.com/reel/Cz46mE2B5ZC/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 801, 1, 0, 23, 0),
  ('gorontalo.unite', 'Salah satu kemewahan pantai-pantai di Gorontalo itu, suasananya masih menyenangkan, masuknya juga mudah dan murah, jarak juga dekat. 

Beberapa bangun resort, mulai dari yang minimalis hingga elegan tapi tetap terjangkau dengan kondisi ekonomi orang Gorontalo. 

Nah, ini masih dekat dengan area Kota Gorontalo. tepatnya di Pantai Tilalohe, Biluhu Timur. #GorontaloUnite', '2023-11-20 03:20:00+08'::timestamptz, 'https://www.instagram.com/reel/Cz3auJoyRu2/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 795, 4, 1, 9, 83),
  ('gorontalo.unite', 'POV akhir pekanku dengan banyak pertimbangan mau kemana saja, jalan sama siapa, mau makan apa, nuansa bagaimana. 

- Kurenai Beach
- Huidu, Limboto Barat
- Danau Limboto
- Pasambaya Riverside
- Bukit Dunu Ceria

So, rencana akhir pekan kalian ngapain saja nih? 
#GorontaloUnite', '2023-11-18 01:27:00+08'::timestamptz, 'https://www.instagram.com/reel/CzyEL6gSA_r/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 392, 0, 0, 0, 16),
  ('gorontalo.unite', 'Persiapan konser @gigibandofficial di area Stadion Bone Bolango. Selain itu juga bakalan ada Dewi Gita.

Pokoknya bakalan seru dan meriah nih. Gratis. yaa karena ini silaturahmi Arif Gobel bersama milenial dan juga ada rangkaian pernikahan Arif & Naomi. 

Berhubung cuaca juga kadang2 hujan, jangan lupa sedia payung buat berteduh. Nanti kalo basah-basah, pulang2 demam dong. 

📸 @ilamyunus #GorontaloUnite', '2023-11-18 00:13:00+08'::timestamptz, 'https://www.instagram.com/reel/Czx7qilOSvt/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 1283, 0, 0, 25, 31),
  ('emzydinata', '“Eiffel from Gorontalo.” - 

📍Menara Keagungan/Pakaya Tower 
(Kec.Limboto, Kab.Gorontalo)

#gorontalo #pakaya #pakayatower #menaralimboto', '2023-11-17 04:49:00+08'::timestamptz, 'https://www.instagram.com/reel/Czv1l6FxX4P/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 4914, 0, 0, 36, 0),
  ('laila_kaluku', 'Kuta? No, it’s kurenai.

#Gorontalo #Sunset #Beach', '2023-11-14 21:36:00+08'::timestamptz, 'https://www.instagram.com/reel/Czp7IYAhE7k/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 244, 0, 0, 0, 0),
  ('fhirmanohihiya', 'Huidu Palakala 07:45🍃⛰️

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
 #morning #beautiful #gorontalo #sulawesiutara #likegorontalo #miminpesgo #pesonagorontalo #gorontalolife #gorontalounite #pendakiindonesia #pendakicantik #puncak #pendakisulawesi #gunung #polahiadventure #pendaki #gorontalo_inframe #suaraalam_indonesia', '2023-11-13 22:48:00+08'::timestamptz, 'https://www.instagram.com/reel/Czne3Aehz2Y/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 462, 1, 0, 16, 0),
  ('gorontalo.unite', 'salah satu cara menikmati liburan menyenangkan itu hiking. melelahkan memang, tapi yaa itu, menyenangkan. selain murah, dia mudah. yang penting sih persiapan juga. 

alam jadi sahabat terbaik buat di explore, dijaga, dilestarikan. main-mainlah kesini, Puncak Lestari di Tapaluluo, Telaga Biru, Kab. Gorontalo, salah satu destinasi yang dikenal dengan sebutan negeri diatas awan.

810 meter diatas permukaan laut; negeri diatas awannya terasa kalo masih pagi, sesaat matahari baru terbit. 

📸 @mas_tiko09 #GorontaloUnite', '2023-11-11 00:36:00+08'::timestamptz, 'https://www.instagram.com/reel/Czf8Wn0vvJj/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 173, 0, 1, 5, 2),
  ('fhirmanohihiya', 'Sebagai generasi penerus, semangat Para Pahlawan akan terus menyertai setiap langkah perjuangan. Selamat Hari Pahlawan 10 November.🇮🇩🫡♥️🤍

🏝️Pulau Bogisa📌

.

#gorontalo #gorontaloutara #gorontalounite #gorontalolife #miminpesgo #likegorontalo #sunrise #sunset #senja #garagarasenja #haripahlawan', '2023-11-09 18:15:00+08'::timestamptz, 'https://www.instagram.com/reel/Czcrma0B0hw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 259, 0, 0, 0, 0),
  ('raflypiaggio', '"Dan Semua Akan Sampai Pada Tujuannya Masing Masing"', '2023-11-07 05:49:00+08'::timestamptz, 'https://www.instagram.com/reel/CzWLtveBuiX/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 347, 0, 0, 2, 0),
  ('fhirmanohihiya', 'Alam dan ketenangan🍃💦
satu lagi, kopi☕️😉

Arter Zuriati📌

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
#gorontalo #gorontalohits #gorontalo_inframe #gorontalo_stylish #gorontalolife #pesonagorontalo #miminpesgo #likegorontalo #polahiadventure #arter #airterjun #airterjunindonesia #sulawesiutara #gorontalounite', '2023-11-07 02:45:00+08'::timestamptz, 'https://www.instagram.com/reel/CzV4YBLBzbA/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 436, 0, 0, 23, 0),
  ('emzydinata', '“Klo ngomongin soal pantai-pantai di Gorontalo, emang sekeren itu sih. Apalagi pas lagi sunset. 

Pantai ini, wajib jadi bucketlist klo liburan ke Gorontalo. Suasananya yang syahdu, ombaknya yang tenang, dan pemandangannya yang indah, jadi kombinasi kesan yang bakal susah dilupakan.” - 

📍Pantai Bolihutuo (Boalemo Indah)
Ds.Bolihutuo, Kec.Botumoito, Kab.Boalemo, Gorontalo)

#gorontalo #gorontalohits #gorontalounite #bolihutuobeach #boalemo', '2023-11-06 22:01:00+08'::timestamptz, 'https://www.instagram.com/reel/CzVX8ieRkiS/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 436, 0, 0, 7, 0),
  ('bersorak.soraifest', 'Mana suaranya yang dari kemarin nannyain tiket Online.? Siapa aja nih yang udah siap-siap buat beli tiket online? Jangan sampai ketinggalan, ya!”

Simak penjelasan cara pembelian tiket Online berikut. 

Cek Link di Bio IG yah atau kunjungi Link berikut : https://bersoraksorai.kartjis.id/', '2023-11-06 03:24:00+08'::timestamptz, 'https://www.instagram.com/reel/CzTYB5ehkpG/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 157, 2, 0, 0, 0),
  ('gorontalo.unite', 'Jika kamu mencari nuansa Hotel yang keren dan kamar hotel modern untuk dapat di jadikan spot foto yang menarik dan instagramable nah @yuliahotelgorontalo hadir di tengah pusat kota Gorontalo. 
Hotel ini didesain modern minimalis dan dilengkapi dengan fasilitas dan layanan berstandar tinggi. Fasilitas hotel meliputi Restoran, Mocca Cafe, Lobby Lounge, Ruang Pertemuan, Keamanan 24 Jam dan Area Parkir yang cukup Luas.

Dapatkan spesial promo Breakfast di Mocca Resto, dan Room Promo untuk hari Sabtu & minggu

Booking kamar bisa melalui website https://hig.id/hotels/yulia-hotel-gorontalo
atau  dengan memperlihatkan postingan dari @gorontalounited yang collabs dengan Yulia Hotel dan follow akun @yuliahotelgorontalo dan @hig , kamu bisa hemat 35% untuk booking kamar dan 35% untuk menikmati makanan dan minuman di Mocca Caffe 💃🏻
*syaratdanketentuanberlaku

For more information
+62 821-9682-8881

Yulia Hotel Gorontalo
Jl. Nani Wartabone No. 26, Ipilo, Kec. Kota Timur. Gorontalo, Sulawesi 96133
Tlp. +62 821-9682-8881
W. yuliahotelgorontalo.com

#yuliahotelgorontalo
#hotelindonesiagroup #highotels #staycation #visitgorontalo #gorontalounite', '2023-11-05 23:52:00+08'::timestamptz, 'https://www.instagram.com/reel/CzS_4phvRik/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 116, 0, 0, 0, 3),
  ('syn.er.gyfest', '[𝑜𝓊𝓇 𝓃𝑒𝓍𝓉 𝑔𝓊𝑒𝓈𝓉 𝓈𝓉𝒶𝓇]
Oh~ Manusia Berisik, Punya Hati tapi tak Hati-Hati.

 @__dere akan ada di #synergy.
sampai berjumpa🥳🫶🏻', '2023-11-05 21:13:00+08'::timestamptz, 'https://www.instagram.com/reel/CzSsMl4hbKl/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 1290, 0, 0, 99, 0),
  ('gorontalo.unite', 'orang yang menjalani hari-hari penuh tantangan dan tetap semangat, mengawali harinya dengan bersyukur. 

bersyukur masih bisa bangun. 

lebih bersyukur lagi kalo disambut pemandangan yang indah. di pantai misalnya. ditemani kopi masih panas lebih syedaaapp. 

📍Dionumo Island, Sumalata Timur, Gorontalo Utara.
#GorontaloUnite', '2023-11-01 17:11:00+08'::timestamptz, 'https://www.instagram.com/reel/CzH3vD-vWpw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 627, 3, 0, 13, 27),
  ('emzydinata', '“Well, akhirnya gak penasaran lagi.. 😅

Walaupun mungkin bagi sebagian orang merupakan hal yang biasa, tapi selalu ada kesan buat mereka yang pertama kali mencoba. 

Yang udah pernah, gimana nih rasanya naik bentor?” - 😄

#gorontalo #gorontalohits #gorontalounite #bentor', '2023-10-31 22:54:00+08'::timestamptz, 'https://www.instagram.com/reel/CzF6IPAxGLH/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 1287, 0, 0, 29, 0),
  ('fhirmanohihiya', 'Sahabat☕️ #tytg 

Arter Tamaila📍

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
#gorontalo #gorontalohits #gorontalo_inframe #gorontalo_stylish #gorontalolife #pesonagorontalo #miminpesgo #likegorontalo #polahiadventure #arter #airterjun #airterjunindonesia #sulawesiutara #gorontalounite', '2023-10-26 02:36:00+08'::timestamptz, 'https://www.instagram.com/reel/Cy22wlZheR4/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 293, 0, 0, 0, 0),
  ('fhirmanohihiya', 'Tugu Ketupat Yosonegoro 17:14🌇✨

.

#gorontalo #gorontaloutara #gorontalounite #gorontalolife #miminpesgo #likegorontalo #sunrise #sunset #senja #garagarasenja', '2023-10-25 02:37:00+08'::timestamptz, 'https://www.instagram.com/reel/Cy0SWxvB6ow/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 3524, 3, 0, 38, 0),
  ('gorontalo.unite', 'Masih menjadi tempat yang pas banget buat sekedar bersantai, camping kecil-kecilan dan ngopi. Iyaa, disini, di Tanjung Perintis. 

Sebagian orang bahkan banyak orang sekalipun, cari inspirasi terbaik itu saat lagi datang ke tempat-tempat seperti ini. Pulang-pulang dapat energi baru buat melakukan sesuatu lagi. Misal nih musisi, cari inspirasi bikin lagu termasuk. 

📸 @jefry_mailite #GorontaloUnite', '2023-10-25 00:19:00+08'::timestamptz, 'https://www.instagram.com/reel/Cy0CjkOPZj4/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 136, 0, 0, 1, 2),
  ('fhirmanohihiya', 'Puncak dunu 05:40🌅✨

.

#gorontalo #gorontaloutara #gorontalounite #gorontalolife #miminpesgo #likegorontalo #sunrise #sunset #senja #garagarasenja', '2023-10-24 01:43:00+08'::timestamptz, 'https://www.instagram.com/reel/Cyxm5_ZhRgC/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 480, 0, 0, 21, 0),
  ('gorontalo.unite', 'Kan lagi musim kemarau nih yaa, kemaraunya terasa panjang. Hal yg harus diperhatikan sedetail mungkin itu misal kalo lagi bakar-bakar sampah atau sekedar bikin api unggun di lokasi camping. 

Jangan lupa untuk dipadamkan. Kebersihannya juga.

Ini berada di ketinggian, damkar tidak bisa nanjak sampe kesini.
pesan ini disampaikan dan dicontohkan oleh @officialpedusta (Pemuda Dusun Tiga) Luwoo, Talaga Jaya.

#GorontaloUnite', '2023-10-20 05:27:00+08'::timestamptz, 'https://www.instagram.com/reel/CyntzzQPV6s/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 320, 0, 0, 1, 15),
  ('_khadafix', 'Pagi bersama sunrise 
.
.
📍dulamayo | Gorontalo | indonesia
.
.
#sunrise #alam #wonderful #wonderfulindonesia #pesonaindonesia #indonesia_photography #lyrics #music #puncak #pinus #hutanpinus #geografi #gorontalo_stylish #gorontalohits #gorontalocity #gorontalounite #like_gorontalo #pesonagorontalo #pesgo #dulamayo #reels #instagram #instagood #instagramreels #viral #fyp #branda', '2023-10-18 18:38:00+08'::timestamptz, 'https://www.instagram.com/reel/Cyj-pg-h-dh/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 291, 0, 0, 9, 0),
  ('gorontalo.unite', 'Proyeksi tambang emas di Pohuwato ini diprediksi bakal meningkat pesat beberapa tahun ke depan dan juga berpotensi akan perekonomian warganya. 

Kita berharap, keterlibatan semua pihak dalam menjaga potensi sumber daya alamnya, dengan memperhatikan dan meredakan konflik juga. Biar tidak terjadi lagi hal-hal yang tidak diinginlan. 

by @_suryarahman07 saat lagi jalan-jalan di freeportnya Gorontalo dan dalam rangka kantibmas juga pasca kejadian tempo kemarin di Pohuwato. #GorontaloUnite', '2023-10-18 03:47:00+08'::timestamptz, 'https://www.instagram.com/reel/CyiYjnQvl5y/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 586, 0, 1, 7, 21),
  ('gorontalo.unite', 'Lito Popaya ini masuk salah satu lokasi konservasi tersendiri, termasuk Lito disekitarnya seperti Lito Raja dan Mas. 

Kenapa kawasan CA (Cagat Alam) Pulau Mas Popaya Raja menjadi salah satu tempat yang dilindungi di Gorontalo? Karena ada banyak faktor, misalnya di Lito Popaya ini menjadi tempat bertelurnya penyu. 

Untuk tujuan berwisata sambil melakukan penelitian di CA Popaya Raja Mas, harus mengantongi izin dari Dinas Pariwisata Kab. Gorontalo Utara dan atau Kanwil BKSDA II (Balai Konservasi Sumber Daya Alam) Gorontalo. 

Kalo untuk menikmati liburan, bolehlah di Lito sekitarnya. Misal Lito Bohu, Mohinggito, Bogisa, HuHa. 

📸 @aldi_teung #GorontaloUnite', '2023-10-18 01:01:00+08'::timestamptz, 'https://www.instagram.com/reel/CyiF5EVOcM9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 127, 0, 1, 0, 0),
  ('gorontalo.unite', 'Salah satu bentuk pelayanan kesehatan dengan cara “jemput bola”.

Kegiatan ini sudah jadi rutinitas pengurus Pimpinan Daerah Muhammadiyah Kota Gorontalo, tentang bagaimana memberikan kebermanfaatan untuk umat terkhusus untuk masyarakat disekitar pulau.

Nah, ini sih bagus yaa. Sekali mendayung, 4 pulau terlampaui. So, selain memberikan pelayanan kesehatan, juga menikmati keindahan panorama Pulau Dionumo di Sumalata Timur, Gorontalo Utara. 

📸 @dokrifki #GorontaloUnite', '2023-10-17 01:15:00+08'::timestamptz, 'https://www.instagram.com/reel/CyfioZ6Oc7A/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 205, 0, 0, 1, 1),
  ('emzydinata', '“Gorontalo punya alam yang indah, ya walaupun jauh-jauh dan penuh effort buat ngedatenginnya, tapi worth it sama hasilnya. Suasana calming dan syahdu kayak gini yang bikin pikiran jadi tenang dan re-charge energi banget.” -

📍Lito Huha
(Kec.Tomilito, Kab.Gorontalo Utara, Gorontalo)

#litohuha #pulaulitohuha #gorontalo #gorontalohits #gorontalounite #wisatagorontalo', '2023-10-16 04:01:00+08'::timestamptz, 'https://www.instagram.com/reel/CydQOmUxaNt/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 812, 16, 1, 18, 0),
  ('gorontalo.unite', 'Danau Limboto ini masih menjadi salah satu tempat terbaik buat menikmati matahari terbenam. 

Untuk view sunset dari Danau Limboto, bagusnya disekitaran Pentadio, Telaga Biru atau dari Hutadaa, Talaga Jaya. Kalo dari seberangnya, di Kecamatan Batudaa, bisa juga. tapi agak masuk ke dalam. Kecuali jika sudah masuk area Kota Gorontalo, seperti dari Dembe 1, Kota Barat. 

📸 @fera.umar #GorontaloUnite', '2023-10-14 02:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CyX9A5JvrAP/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 704, 1, 1, 20, 25),
  ('gorontalo.unite', 'Kalo ada yang tanya dimana Tanjung Perintis, nanti jawab saja pas di Danau Perintis. Kok tempat sama nama beda? Jawabannya karena berbeda pengelolaannya. Tapi sama saja sih, sama-sama bisa menikmati view danau buatan yang sudah ada sejak era Kemerdekaan Gorontalo dulu. 

Istilah kerennya, di danau ini tempat nongkrong para pejuang dulu, sebelum merumuskan dan merencanakan strategi kemerdekaan yg hari ini kita kenal dengan nama Hari Patriotik 23 Januari. 

📸 @dianmohsafii #GorontaloUnite', '2023-10-14 00:53:00+08'::timestamptz, 'https://www.instagram.com/reel/CyXxyQyvpVO/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 166, 1, 0, 0, 1),
  ('gorontalo.unite', 'Kompilasi tempat-tempat bersantai terbaik dari sore ke sore, menjelang Magrib di Gorontalo ala @fera.umar 

- Danau Limboto
- Perumahan DPRD, Huidu
- Lap. Golf Yosonegoro

Kalo sehari sekali jalan, tidak keriki sih semua tempat ini kalo ngejar sunsetnya. Ngatur waktu seharian bisalah. Di Huidu jam 2 siang suasana masih adem, jam 3 ke Yosonegoro, setelah itu ke Danau Limboto. Bahkan untuk mampir maghrib sekalian pun masih keburu. 

📸 @fera.umar #GorontaloUnite', '2023-10-12 03:05:00+08'::timestamptz, 'https://www.instagram.com/reel/CyS2kKzuvrt/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 276, 0, 0, 0, 5),
  ('gorontalo.unite', 'Momen-momen krusial dalam penerbangan itu saat take off dan saat landing. Saat si burung besi nanjak ke ketinggian tertentu, coba liat sekitar keluar. View yang indah itu bisa jadi penenang tersendiri. 

Nah, di Gorontalo sendiri, sebagian pesawat take off ke arah timur itu, biasanya akan belok 135 derajat ke barat daya kalo sudah berada di atas wilayah Kota Gorontalo pada ketinggian 30.000-36.000 kaki. Jadi kalo misal duduk di sebelah kiri maupun sebelah kanan, tetap bisa melihat keindahan pantai di pesisir Teluk Tomini. 

Koreksi kalo salah, ini cuma pengamatan pribadi mimin saja. 

📸  @fahrikhadafix_ #GorontaloUnite', '2023-10-10 02:17:00+08'::timestamptz, 'https://www.instagram.com/reel/CyNoJDWrw6O/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 15500, 3, 2, 51, 888),
  ('fhirmanohihiya', 'Kayubulan Batudaa pantai 06:00🌅🌊✨🏝️

.

.

.

.

.
#gorontalo #gorontalounite #sunset #sunrise #sunrise_sunset_photogroup #gorontalolife #pesonagorontalo #gorontalohits', '2023-10-10 01:19:00+08'::timestamptz, 'https://www.instagram.com/reel/CyNhP_QBSKt/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 229, 0, 0, 1, 0),
  ('gorontalo.unite', 'Definisi quality time sederhana, saat menghabiskan waktu demi waktu bersama keluarga. Meskipun biaya terjangkau tapi kesannya akan selalu mewah. 

Pemilihan tempat dan suasana juga menentukan. Misal nih di kawasan Bukit Dunu Ceria, view pantai, laut dan pulau menyatu dgn suasana sunrise maupun sunset sekaligus. Tidak jauh juga dari Jalan Trans Sulawesi. 

📸 @iteneps_punkrock #ItenepsFamily #GorontaloUnite 
@onaldhell @deddy_iteneps @fahry.unonongo @rizalsja', '2023-10-09 15:31:00+08'::timestamptz, 'https://www.instagram.com/reel/CyMd-5JBbno/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 269, 0, 0, 3, 4),
  ('deddy_iteneps', 'Iteneps Family 📍Puncak Dunu ❤️
Mau jalan jalan nggak usah jauh jauh, di gorontalo banyak tempat wisata terbaik.. 
#puncakdunu #gorontalounite #iteneps #itenepspunkrock #gorontalo', '2023-10-08 18:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CyKJ8MZhPR7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 165, 0, 0, 23, 0),
  ('deddy_iteneps', 'Nikmati pagi dari puncak dunu dengan kopi pilihan dari KAPE KOPI. Warkop Kape adalah warunk kopi legend di gorontalo (warkop kape terletak di Kompleks murni tempat ngopi terbaik) 📍Puncak Dunu  #warkopkape #gorontalounite #gorontalo #puncakdunu #umkm
@fahry.unonongo @unonongohasan', '2023-10-08 05:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CyI0Gfahk5v/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 235, 0, 0, 8, 0),
  ('gorontalo.unite', 'Gorontalo dengan warna2nya yang benar2 colorful. Warna dan suasana mana yang jadi favorit bagi setiap orang? Senja yang jingga? Laut yang biru? 

📸 @seafans__ #colorful #GorontaloUnite', '2023-10-08 01:48:00+08'::timestamptz, 'https://www.instagram.com/reel/CyIa7V2Oowp/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 8711, 0, 0, 37, 655),
  ('isal_gorontalo', 'Junior freediver

inframe: @darrylrayner_ 

#whaleshark #whalesharkswimming #freedive #dive #trip #gorontalo #gorontalohits #wonderful #wonderlust #wonderful_places #freedive #freedivejunior #pesonaindonesia #indonesia #sulawesi #opentrip #privatetrip #sea #oceana #traveling #travelers #instagood #goodvibes #gopro #goprohero #world #paketliburan #scuba #scubadiving', '2023-10-07 05:24:00+08'::timestamptz, 'https://www.instagram.com/reel/CyGO3K2Byry/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1429, 3, 0, 26, 0),
  ('gorontalo.unite', 'kemewahan sore di Gorontalo itu, tidak perlu macet-macet kalo pulang karja. Masih dapa riki ba Isya di rumah. Beda halnya kalo so maso-maso bulan Ramadan. arus lalu lintas mulai rame dan padat dimana-mana. 

Enjoy, weekend semuanya. Aman lancar sampe di rumah. 

direkam @nndalsma pas lagi di bentor, Jl. Prof. Ario Katili (Andalas) Kota Gorontalo. #GorontaloUnite', '2023-10-06 03:11:00+08'::timestamptz, 'https://www.instagram.com/reel/CyDbGlcv-7x/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 5056, 1, 2, 70, 313),
  ('gorontalo.unite', 'Teman-teman yang sering nongkrong di @barampa.coffee, napa ada kabar baru nih. Barampa Coffee pindah tampa ba staf.

yang kemarin awalnya di Jl. Siswa, sekarang pindah ke Huangobotu, Jl. Apel, No. 1. Zona nyaman masih tetap dipertahankan, rasa juga semoga begitu, tapi harga belum tau. Mungkin masih sama seperti kemarin. 

Lagian olo nongkrong di Gorontalo juga masih tergolong hemat. Ya kan begitu? Cocoklah buat weekend diawal bulan Oktober.', '2023-10-06 02:27:00+08'::timestamptz, 'https://www.instagram.com/reel/CyDVe47rqOv/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 101, 0, 0, 1, 7),
  ('fhirmanohihiya', '17:25 Danau Limboto🌅✨🫶

.

.

.
#sunset #senja #sunrise #gorontalo #pesonadanaulimboto #gorontalounite #gorontalolife #sulawesiutara #garagarasenja', '2023-10-06 02:26:00+08'::timestamptz, 'https://www.instagram.com/reel/CyDVuPwBGv0/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 423, 0, 0, 4, 0),
  ('gorontalo.unite', 'Mau ngulas sedikit tentang pergeseran dan perubahan. 

Awal tahun 2000-an, masyarakat di Kota Gorontalo protes saat polisi memberlakukan ganti helm ke helm SNI Fullface. Trafic light dirusak. Alasannya, helm SNI dgn harga 200ribuan diawal tahun 2000 itu mahal. 

Saat bentor hadir, masih diawal 2000-an juga, orang-orang protes. Kenderaan roda tiga ini dianggap tidak safety, kusir-kusir bendi pun mulai kehilangan langganannya, orang2 beralih ke bentor. Disatu sisi, kotoran kuda merusak pemandangan kota saat itu. 

Nah, terbaru, TikTok Shop resmi dilarang pemerintah, karena tujuan dan peruntukannya berbeda dengan izin yang berlaku di NKRI. 

Hal-hal yang baru, biasanya akan ditentang. Awal-awal Grab dan Gojek masuk juga kan begitu. Mungkin kedepannya, besoknya, kita harus membiasakan. Mungkin. 

Bendi dilestarikan di Gorontalo itu salah satu upaya untuk mendisplay kembali nostalgia di masa-masa dulu. Atau bisa juga untuk tujuan wisata. Keliling Kota Tua, tapi pake bendi. Cuman, banyaknya jalan berlobang di Kota Gorontalo ini bahaya bagi kuda. 

📸 by: @helmihongi tour guide yang bisa menceritakan kembali setiap langkah yang dilalui. #GorontaloUnite', '2023-10-06 00:52:00+08'::timestamptz, 'https://www.instagram.com/reel/CyDLMtau7Za/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 494, 0, 0, 15, 13),
  ('isal_gorontalo', 'setalah laut menyentuh jiwamu,kehidupan di darat tidak akan pernah sama 

#whaleshark #whalesharkswimming #gorontalo #trip #tripgorontalo #divetrip #freedive #mermaidlife #mermaidlove #wonderful_places #wonderful #wonderfulindonesia #privatetrip #enjoy #enjoylife #sea #oceana', '2023-10-04 19:22:00+08'::timestamptz, 'https://www.instagram.com/reel/CyAAWcnBZ2T/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1103, 0, 0, 19, 0),
  ('gorontalo.unite', 'Yakin nih ndak mo jalan2 ke Gorontalo, main bareng Sherly, hiu paus yang ramah di Botubarani, Bone Bolango. 

Lokasinya tidak jauh dari pusat kota, tidak jauh juga dari bibir pantai, plus bisa sambil berenang bareng. Tapi juga tidak berenang sampe naik di punggung hiu pausnya. 😅

Ajak @seafans__ (Vian Adam) nanti dibuatin video dan foto-foto seperti ini, biaya belum termasuk sewa tiket masuk, perlengkapan menyelam, sewa perahu nelayan kalo mau pake perahu, dan pakan udang buat makan si Hiu Paus.

📸 @seafans__ #GorontaloUnite #WhaleShark #Gorontalo', '2023-10-04 00:52:00+08'::timestamptz, 'https://www.instagram.com/reel/Cx-A8GcOHDr/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 601, 2, 0, 9, 18),
  ('fhirmanohihiya', 'Salah satu tampa lia sunset terbaik di gorontalo dimana lagi kalo bukan di Danau Limboto😍 Tinggal mo tunggu dpe proyek pengerukan selesai dng jalan so ta aspal kong pentolan,cilok,cimol dll so ta parkir wkwk :)

.

.

#danau #danaulimboto #gorontalo #kabgorontalo #gorontalounite #likegorontalo #pesonagorontalo #gorontalolife #sulawesiutara #sunset #sunrise #senja #garagarasenja', '2023-10-03 02:13:00+08'::timestamptz, 'https://www.instagram.com/reel/Cx7k-IuhvL7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 452, 1, 0, 10, 0),
  ('gorontalo.unite', 'Apresiasi untuk Pak @rachmatgobel_rg yang telah sukses melangsungkan Festival Ikan Tuna Gorontalo 2023. Semoga festival ini berlanjut di tahun-tahun mendatang. 

Semoga festival ini bisa merangsang tumbuhnya UMKM, pekerja seni & kreatif, dan juga meningkatkan roda perekonomian masyarakat Gorontalo khususnya. 

Sampai jumpa di festival-festival lainnya!

#rachmatgobel #festivalikantunagorontalo #gorontalo #GorontaloUnite', '2023-10-02 18:38:00+08'::timestamptz, 'https://www.instagram.com/reel/Cx6yAtkypx1/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 276, 0, 0, 4, 1),
  ('syn.er.gyfest', 'Buat kalian yang masih Ragu.
Ini beneran gasih ?

Naah udah diPastiin Fix yaaa. Jadi buat temen-temen yang berada di Gorontalo dan Sekitarnya yukkkk kita ramaikan @syn.er.gyfest untuk penjualan tiket di mulai tgl 2 Oktober 2023 Besok yaaa

Jangan sampai kehabisan tiket, untuk info lebih lanjut bisa hubungi Admin IG atau Admin ticketing ya.', '2023-10-01 02:12:00+08'::timestamptz, 'https://www.instagram.com/reel/Cx2ZwhLBIj2/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 773, 1, 0, 37, 0),
  ('emzydinata', '“Ketika keinginan jadi kenyataan, disitulah ada kebanggaan. 
Banyak tempat indah di Gorontalo yang satu persatu akhirnya bisa dijelajahi. Next trip?” - 

📍Lito Huha
(Kec.Tomilito, Kab.Gorontalo Utara)

#litohuha #gorontalo #gorontalounite #exploregorontalo #gorontalohits', '2023-09-29 22:31:00+08'::timestamptz, 'https://www.instagram.com/reel/CxzdFJnRv76/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 656, 1, 0, 23, 0),
  ('adhyy.s', 'Be bright, be bold, be sunset Gold ✨✨✨💨

📍Blue Marlin Beach - Gorontalo
🎥 @billy_kohler 

#sunsetphotography #goldenhour #beach #beachlife #gorontalo 
#sky #ocean #wonderful_places #viewpoint #nature', '2023-09-29 01:36:00+08'::timestamptz, 'https://www.instagram.com/reel/CxxOfBEBXS7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 241, 0, 0, 8, 0),
  ('fhirmanohihiya', 'Matahari terbenam yg indah di Danau limboto🌅🫶

.

.

.

#sunset #sunrise #gorontalo #gorontalounite #pesonagorontalo #gorontalolife #senja #garagarasenja', '2023-09-28 19:02:00+08'::timestamptz, 'https://www.instagram.com/reel/CxwhobHhWwB/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 561, 0, 0, 6, 0),
  ('rachmatgobel_rg', 'Alhamdulillah, hari ini saya bisa membuka Festival Ikan Tuna Gorontalo 2023 yang berlangsung di kawasan Pantai Tamendao, kota Gorontalo. 
Semoga dengan adanya festival ini yang berlangsung selama 4 hari, bisa menggerakan roda perekonomian masyarakat dan mendatangkan wisatawan, serta membangkitkan kebanggaan terhadap ikan tuna yang menjadi salah satu ikon Gorontalo di bidang perikanan. Karena Gorontalo adalah tuna. Dan tuna adalah Gorontalo. 

Jangan lupa datang dan ramaikan ya! 

#rachmatgobel #festivalikantuna #festivalikantunagorontalo #tamendao #tamendaobeach', '2023-09-28 09:20:00+08'::timestamptz, 'https://www.instagram.com/reel/CxveiDiJTCj/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 799, 0, 0, 17, 0),
  ('gorontalo.unite', 'Libur hari ini, tapi terjepit. hupe-hupeto. Rebahan saja dulu, cuaca diluar lagi panas-panasnya juga kalo lagi tidak ada aktivitas. 

Nah, sore baru pas mo kaluar kalo ada rencana kamana-mana. 

Yang mau mandi di pantai sekitaran Leato sekitarnya, trus dimuara sungai Bone, atau pokoknya dekat-dekat situ, BPBD Kota Gorontalo meminta warga untuk waspada terkait kemunculan buaya di wilayah tersebut. 

Kalo di Danau Perintis sana semoga aman-aman saja, semoga buayanya tidak terlalu jauh mainnya. 

📍Danau Perintis, Suwawa
📸 @dedenjusuf01 #GorontaloUnite', '2023-09-27 21:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CxuNVsZSBdC/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 317, 0, 0, 5, 10),
  ('gorontalo.unite', 'Negerinya terus melestarikan adat tapi sesuai syariat. Nah, syariatnya mengacu pada Kitabullah. familiarnya, aadati hula-hula''a to sara''a, sara''a hula-hula''a to Kitabullah. falsafah adat Gorontalo, sama halnya dengan di negeri Minang. 

Dikili di Gorontalo biasanya saat Maulud Nabi Muhammad SAW, to hulalo Rabi''ul Awal. Dikili atau biasa kita kenal dengan Dzikir merupakan perpaduan sastra Arab dan sastra/budaya Melayu.

Hal ini seperti yg ditulis oleh Prof. Moh. Karmin Baruadi dalam tulisan Tradisi Sastra Dikili dalam Pelaksanaan Upacara Adat Maulidan di Gorontalo terbitan El Harakah.

📍 Desa Kayubulan, Batudaa Pantai
📸 @arifux03 #GorontaloUnite', '2023-09-27 18:23:00+08'::timestamptz, 'https://www.instagram.com/reel/Cxt4JXtO-Rv/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 0, 891, 0, 0, 12, 27),
  ('gorontalo.unite', 'Salah satu cara mengeluarkan hormon adrenalin biar lebih bersemangat dan sensitif akan hal-hal sekitar, maka salah satu cara yg bisa dilakukan adalah memacu adrenalin itu sendiri. 

Nah, di Bukit Dunu Ceria di Gorut ada sarana wisata bagus. Dulu dikenal dengan nama "Terjun Gunung" yang saat ini biasa disebut ''Paralayang''. Dan ini bisa menambah semangat adrenalin tersendiri. 

Apalagi pemandangan yang diliat dari atas, keren guys. 😍

Tertarik mo ba coba? 

📸 @rvldmassa #GorontaloUnite', '2023-09-27 00:31:00+08'::timestamptz, 'https://www.instagram.com/reel/Cxr9yjfJumM/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 249, 0, 0, 5, 3),
  ('gorontalo.unite', 'Tetap waspada teman-teman, akhir-akhir ini lagi ada kabar munculnya sepasang buaya diperairan Teluk Tomini dan atau di muara/hilir Sungai Bone. Hal ini sebagaimana anjuran BKSDA - Seksi Konservasi Wilayah II Gorontalo. 

Teluk Tomini ini termasuk Botubarani, tempat dimana Hiu Paus sering muncul juga. Tapi tetap waspada dan jangan khawatir. 

📸 @sucirmdhnmb #GorontaloUnite', '2023-09-26 21:31:00+08'::timestamptz, 'https://www.instagram.com/reel/CxrpMXCJ_Jl/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 350, 0, 0, 2, 3),
  ('gorontalo.unite', 'Sebelum semuanya beraktivitas lagi hari ini, kami mo bagi info dulu tentang event menarik di Gorontalo. 

Festival Kuliner Ikan Tuna, Tamendao 2023. Seperti biasa, "Dari Gorontalo untuk Indonesia" — Mulai Kamis besok, 28-29-30 September 2023.

Eh, lupa. dan berakhir tgl 1 Oktober 2023 olo.

Festival Tuna ini kali kedua diadain di Gorontalo. Tahun lalu di Tapa, tahun ini di Tamendao. Ada apa saja pada Festival Kuliner Tuna besok nanti? Datang saja langsung ke lokasinya. 

Detail info ada di video. Termasuk HTM, fasilitas yang didapatkan dan sajian atraksi apa saya. See u tomorow (sampe bakudapa neh).

Penyelenggara @festuna.gorontalo', '2023-09-26 16:59:00+08'::timestamptz, 'https://www.instagram.com/reel/CxrJwEySSsh/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 319, 0, 0, 7, 10),
  ('emzydinata', '“Tiap daerah biasanya selalu punya tempat bersejarah. Nah, klo lagi liburan ke Gorontalo, tempat yang satu ini cocok banget jadi bucketlist buat didatengi. Selain bisa napak tilas, juga punya view senja yang luar biasa.” - 

📍Museum Pendaratan Pesawat Amfibi Bung Karno
(Ds.Iluta, Kec.Batudaa, Kab.Gorontalo)

#gorontalo #gorontalohits #wisatagorontalo #gorontalounite #limboto #danaulimboto', '2023-09-24 04:54:00+08'::timestamptz, 'https://www.instagram.com/reel/Cxksmu8xmP0/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 1172, 2, 1, 29, 0),
  ('deddy_iteneps', '📍 @tanjungperintis_prasogo LANGITNYA CERAH MALAM INI @aldinaku.syms @raflypiaggio 
#gorontalounite #danauperintisgorontalo #danauperintis', '2023-09-23 07:46:00+08'::timestamptz, 'https://www.instagram.com/reel/CxicZXvhvlD/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 140, 0, 0, 2, 0),
  ('deddy_iteneps', 'Menunggu hari minggu datang
📍 @tanjungperintis_prasogo 
#gorontalounite #tanjungperintis #selamatkanaku #endanksoekamti', '2023-09-23 07:16:00+08'::timestamptz, 'https://www.instagram.com/reel/CxiY2b3hE3h/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 213, 0, 0, 17, 0),
  ('gorontalo.unite', 'Salah satu tempat terbaik buat menikmati senja murah meriah, bersenja gurau dengan yang diajak pun terasa menyenangkan. 

Memang ada di tempat lain, tapi disini juga asyik kalo jalan-jalan sore. Kurenai Everyday.

📸 @yunkbu | @gerbang_adventure.id #GorontaloUnite', '2023-09-23 02:45:00+08'::timestamptz, 'https://www.instagram.com/reel/Cxh6CmMB8-t/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 1315, 0, 0, 14, 52),
  ('gorontalo.unite', 'Makin banyak pohon buat berteduh, makin adem suasana buat bersantai. Kalo ke Danau Perintis di Suwawa, jam-jam terbaik itu pagi dan sore. Sore apalagi weekend, ahay, ramai-ramai banyak orang. 

Dikawasan Danau Perintis juga ada namanya Tanjung Perintis, bisa dong sekalian camping malam hari. 

So, weekend kali ini rencana kemana? 

📸 @ucupuwato_ #GorontaloUnite', '2023-09-22 21:55:00+08'::timestamptz, 'https://www.instagram.com/reel/CxhV9JLhkp0/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 342, 0, 0, 1, 5),
  ('gorontalo.unite', 'Masih banyak tempat-tempat yang bagus dikunjungi di Gorontalo, apalagi dengan cara mengabadikan momen-momen buat dikenang suatu hari lagi, dan nanti. 

pinggir koala boleh, pinggir danau juga bagus, apalagi di pantai. yuk ah, jalan-jalan, bergerak. ajak @evoocative x @dani_malasai juga misalnya, coba tengok feed instagramnya. 

Oh iyaa, weekend begini juga banyak event menarik di Gorontalo. live music di cafe-cafe misalnya. 

📸 @evoocative #GorontaloUnite', '2023-09-22 17:42:00+08'::timestamptz, 'https://www.instagram.com/reel/Cxg7Go7N6ml/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 747, 1, 0, 6, 11),
  ('fhirmanohihiya', '17:45 Kurunai Beach🌅✨🌊

.

.

.

#sunset #sunrise #gorontalo #gorontalounite #pesonagorontalo #gorontalolife #senja #garagarasenja #beach #pantai #love', '2023-09-22 07:05:00+08'::timestamptz, 'https://www.instagram.com/reel/Cxfy4cPB33V/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 5578, 2, 0, 12, 0),
  ('emzydinata', '“Banyak benteng di Indonesia yang kini gak cuma jadi saksi sejarah, tapi juga jadi tempat wisata ikonik nan instagramable. Salah satunya ini dia klo liburan ke Gorontalo.
Pemandangan Danau Limboto dan perbukitan hijau bikin suasananya makin syahdu.” -

📍Benteng Otanaha
(Kec.Kota Barat, Kota Gorontalo)

#bentengotanaha #gorontalo #gorontalounite #gorontalohits #wisatagorontalo #exploregorontalo', '2023-09-21 03:35:00+08'::timestamptz, 'https://www.instagram.com/reel/Cxc097BRE91/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 1125, 13, 0, 15, 0),
  ('laila_kaluku', 'Gorontalo itu punya banyaaak wisata alam, apalagi kalo soal Laut. Weekend kemarin ikutan trip buat explore Pulau Mohinggito dan Bogisa di Kabupaten Gorontalo Utara. Dari Kota Gorontalo jarak tempuh sekitar 2-3 jam, dari Bandara 1-2 jam, lalu naik perahu motor kurang lebih 30 menit buat sampe ke Pulaunya. Indah banget gaksih!!!

Trip by @adhyy.s 
🎥🐳Underwater vidiographer @adhyy.s @akbarhiola 
🛸📹 Drone @fathirmohi23 

#ExploreGorontalo #GorontaloUtara #Gorontalo #Indonesia #likegorontalo #gorontalounite #Freedive #laut #freediver #Ocean', '2023-09-20 09:09:00+08'::timestamptz, 'https://www.instagram.com/reel/Cxa2ZJHBpAt/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 418, 1, 0, 5, 0),
  ('gorontalo.unite', 'Gorontalo, sekarang giliran kalian!
Kini kami hadir dengan rumah hantu jalan kaki TERSERAM DI GORONTALO👻
Dengan judul ‘PONGGO’

Mulai 23 September - 22 Oktober 2023
Di Citimall Gorontalo - Lantai 2
Jam Show 14:00 - 22:00 WITA

Harga Tiket:
Senin - Jumat 25.000/orang
Sabtu - Minggu/Hari Libur 30.000/orang
Tiket bisa langsung dibeli di tempat!

TAG teman kamu yang mau diajak masuk  Wahana!
#gorontalo #rumahhantugorontalo #ponggo', '2023-09-18 04:22:00+08'::timestamptz, 'https://www.instagram.com/reel/CxVM3bOhbOs/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 855, 0, 0, 270, 41),
  ('laila_kaluku', 'Paradise.. 

📍Pulau Bogisa, Kabupaten Gorontalo Utara

Trip by @adhyy.s 
🎥 @fathirmohi23 @12ano_ 

#exploreGorontalo #Indonesia', '2023-09-17 23:42:00+08'::timestamptz, 'https://www.instagram.com/reel/CxUsSlAhJhD/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 684, 1, 0, 5, 0),
  ('gorontalo.unite', 'Tempat yang pas buat ngabuburit, dari Malioboro sampe Danau Perintis, lewat sini juga. sore-sore waktu yang pas. karena kalo siang hari, panasnya lumayan. 

Kedepannya bakal jadi tempat rame nih, jadi buat yang mau cari tanah, disini cocok buat investasi kok. terhubung ke RingRoad, Kampus UNG, kawasan perkantoran, dll. Atau buka tempat usaha bagus ee. 

📍 Center Point, Bone Bolango, Gorontalo
📸 @delvina05 #GorontaloUnite', '2023-09-14 23:11:00+08'::timestamptz, 'https://www.instagram.com/reel/CxM6tsMBt9E/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 436, 0, 0, 1, 7),
  ('isal_gorontalo', 'The dream come true,if you never stop to try and never give up.

#whaleshark #whalesharkswimming #freedive #dive #trip #gorontalo #gorontalohits #wonderful #wonderlust #wonderful_places #freediving #freedivegirls #pesonaindonesia #indonesia #sulawesi #opentrip #privatetrip #sea #oceana #traveling #travelers #instagood #goodvibes #gopro #goprohero #world #paketliburan #scuba #scubadiving', '2023-09-14 22:11:00+08'::timestamptz, 'https://www.instagram.com/reel/CxMz7YrBXRI/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 471, 3, 0, 19, 0),
  ('gorontalo.unite', 'Ini menurut mimin saja, trend belanja warga kita ini makin kesini makin canggih. hadirnya beragam marketplace, ecommerce bahkan social commerce yang tengah diprotes Kementerian Perdagangan pun sudah ramai ditengah-tengah kita. 

Pasar yang bentuknya fisik, mungkin harus ada terobosan tersendiri agak tetap ada pengunjungnya. Meskipun begitu, renov Pasar Sentral Gorontalo memang sudah harus dilakukan. Tinggal bagaimana ada pengunjungnya selalu ada. 

Kami insert video dari tiktok @edhozell tentang bagaimana cara orang jualan kedepannya nanti. Mungkin harus dicontoh. Atau mungkin juga Pemerintah Kota menyediakan space seperti itu. 

Bagaimana menurut teman-teman #GorontaloUnite ?', '2023-09-13 00:06:00+08'::timestamptz, 'https://www.instagram.com/reel/CxH3lbWhKls/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 565, 0, 0, 21, 22),
  ('ditelvin', 'Hallo guys. Sunday kalian ngapain nihh?
Seru seruan di Gorontalo emang ga pernah ada habisnya 

#exploregorontalo #gorontalounite #pesonagorontalo #gorontalolife #wisatagorontalo #reels', '2023-09-10 02:55:00+08'::timestamptz, 'https://www.instagram.com/reel/CxAcJeurwVB/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 172, 0, 0, 9, 0),
  ('gorontalo.unite', 'Liburan di Gorontalo sederhana saja, tapi nuansa dan suasananya yang bikin mewah. Jadi gak perlu capek-capek jauh-jauh, karena yang terdekat pun sudah ada. 

Kalo McDonald jualan properti, Starbuck jualan kartu member, XXI jualan restoran, maka Bohulo Eat Camp jualannya suasana alamnya. Restonya hanya pelengkap, kayak yg disebutin diatas. 

📍 Bohulo Eat Camp, Dulamayo Selatan, Telaga
📸 @anissnurannisa #GorontaloUnite', '2023-09-10 01:58:00+08'::timestamptz, 'https://www.instagram.com/reel/CxAWEoThTqA/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 2364, 1, 1, 92, 241),
  ('gorontalo.unite', 'Kemarin banyak yang pada tanya, itu ring road sudah tembuskah dari Tapa sampe Isimu? 

Oh ternyata belum sodara-sodara. Kalo ini dari arah Balahu, Isimu. Kalo sudah tersambung lancar, perjalanan dari kota sampe isimu bisa lebih cepat yaa. Ringroad ini dulunya kawasan perkebunan warga, makanya dia terlihat bagus saat ada akses terbuka. 

📸 @orangsusah17 #GorontaloUnite', '2023-09-09 18:28:00+08'::timestamptz, 'https://www.instagram.com/reel/Cw_iurLBu3j/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 718, 0, 0, 9, 31),
  ('gorontalo.unite', 'Cafe yang sederhana dengan konsep alam yang disajikan d''Gazebos Cafe di Talumelito, kompleks BMKG, Kec. Telaga Biru ini bikin betah. Jarang-jarang bisa menemui café dengan konsep seperti ini di Gorontalo. 

Besok-besok di Gorontalo, bakalan makin banyak pilihan buat hangout yang nyaman tentunya yaa, pulang-pulang juga aman mau jam berapapun. Bersyukur di Gorontalo tidak mengkhawatirkan, kota yang ramah. 

#GorontaloUnite', '2023-09-07 22:10:00+08'::timestamptz, 'https://www.instagram.com/reel/Cw6yggCho9J/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 245, 0, 0, 7, 13),
  ('adhyy.s', 'Sometimes, nature is all you need ☀️☀️🍃

📍Mohinggito island, Gorontalo Utara, Gorontalo
🤳 @cliffbenigno 

#sunrise #island #islandlife #gorontalo #indonesia #journey #trip #wonderfullindonesia #wonderlust #vacation #sea', '2023-09-07 01:51:00+08'::timestamptz, 'https://www.instagram.com/reel/Cw4kd0zBwaB/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 295, 0, 0, 30, 0),
  ('emzydinata', '“Gak nyangka, ada tempat hangout secakep ini yang lokasinya gak jauh dari pusat kota Gorontalo. Udah gitu view sunset-nya bener-bener juara banget!” - 

📍 Tamendao Beach
(Kec.Dumbo Raya, Kota Gorontalo)

#tamendao #tamendaobeach #gorontalohits #gorontalo #gorontalounite #exploregorontalo #pesonaindonesia #travel', '2023-09-06 07:32:00+08'::timestamptz, 'https://www.instagram.com/reel/Cw2oxNhRRBV/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 1167, 4, 0, 25, 0),
  ('deddy_iteneps', 'E V A L U A S I ‼️
#videoasmr #gorontalounite', '2023-09-06 06:07:00+08'::timestamptz, 'https://www.instagram.com/reel/Cw2e7qPBlef/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 580, 0, 0, 49, 0),
  ('jojiardilo', 'Heaven is not just above the sky, when you look down you can find the Blue Heaven 🌊🐟🐋 

📍 : Whale Shark, Botubarani, Kab. Bone Bolango, Gorontalo.
📽 : @billy_kohler @adhyy.s @just.itoooo <3', '2023-09-05 23:38:00+08'::timestamptz, 'https://www.instagram.com/reel/Cw1yKuPRTqj/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 121, 0, 0, 19, 0),
  ('adhyy.s', 'Life is better on an island 🌴🍃🍃

📍Bogisa Island, Gorontalo Utara - Gorontalo
🤳 @billy_kohler 

#naturephotography #island #bogisa #gorontalo #sea #ocean #wonderful_places #indonesia #vacation #takemeback', '2023-09-05 22:25:00+08'::timestamptz, 'https://www.instagram.com/reel/Cw1p1h9htV2/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 226, 0, 0, 24, 0),
  ('emzydinata', '“Lanjut di bagian kedua explore Desa Torosiaje; Perkampungan Suku Bajo Terbesar di Indonesia, yang jadi inspirasi film Avatar 2: The Way of Water. 
Semoga bisa jadi inspirasi dan referensi buat yang mau traveling kesini!” - 

📍 @torosiaje_island 
(Kec.Popayato, Kab.Pohuwato, Gorontalo)

#torosiaje #torosiaje_gorontalo #gorontalo #exploregorontalo #pesonaindonesia #gorontalohits #gorontalounite #travel #ayokedesa', '2023-09-02 18:10:00+08'::timestamptz, 'https://www.instagram.com/reel/CwteWqsS86B/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 1021, 19, 2, 34, 0),
  ('emzydinata', '“Siapa yang udah pernah nonton film Avatar 2: The Way of Water? Klo udah, pasti tau banget salah satu latar lokasinya ada desa-desa di atas laut gitu. Nah, ini dia versi nyatanya. Tempat yang jadi inspirasi sang sutradara; James Cameroon. 
Yang merupakan perkampungan Suku Bajo terbesar di Indonesia.
Klo ditanya seberapa spesial tempat ini? Jawabannya: AJAIB!” - 

📍: @torosiaje_island 
(Kec.Popayato, Kab.Pohuwato, Gorontalo) 🇮🇩

#torosiaje #torosiaje_gorontalo #gorontalo #exploregorontalo #pesonaindonesia #travel #gorontalounite #ayokedesa', '2023-09-01 20:46:00+08'::timestamptz, 'https://www.instagram.com/reel/CwrLdoiRsPG/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 1403, 5, 2, 46, 0),
  ('fhirmanohihiya', 'Beautiful sunset on the outer ringroad of Gorontalo🌄

.

.

.
#gorontalo #gorontalounite #pesonagorontalo #sunset #sunrise #sunrise_sunset_photogroup #senja', '2023-09-01 08:08:00+08'::timestamptz, 'https://www.instagram.com/reel/Cwp1Qo4hhcu/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 327, 0, 0, 3, 0),
  ('gorontalo.unite', 'Vibes di Villa Kencana ini terasa mewah karena nuansa alam sekitarnya. Berada dekat pantai, pohon-pohon yang masih banyak bikin suasana tambah teduh (yaa, meskipun panas juga cuaca sekarang). 

Kalo sekitar 10 tahun lalu, orang-orang cari tempat beginian diluar daerah. Sekarang ada di Gorontalo, bukan cuma satu tapi banyak. Biaya akomodasi & transportasi keluar daerah bisa dipake buat berame-rame di Gorontalo. 

Sempat kepikiran buat tempat beginian? Disekitaran Danau Limboto banyak lahan nganggur loh. View sunsetnya tak kalah bagusnya juga. 😀😜

📸 @villa.kencana #GorontaloUnite #Boalemo #Bolihutuo', '2023-09-01 01:36:00+08'::timestamptz, 'https://www.instagram.com/reel/CwpIHUwBrrA/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 574, 1, 4, 3, 23),
  ('gorontalo.unite', 'Melihat aksesnya yang tidak mudah, ongkos mahal menuju ke Pinogu (kampung paling timur di Gorontalo di kawasan Taman Nasional Bogani Nani Wartabone) ini masih terasa mewah.

Biarlah dia tetap mewah, dengan kondisi terpencilnya. 
📸 @andi.ishal_ #GorontaloUnite #Pinogu', '2023-08-31 22:54:00+08'::timestamptz, 'https://www.instagram.com/reel/Cwo19NEh4V_/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 301, 2, 0, 3, 4),
  ('adhyy.s', 'Today is #internationalwhalesharkday 🐳🐋

We love u Sherly!

#ocean #whaleshark #botubarani #gorontalo', '2023-08-30 02:09:00+08'::timestamptz, 'https://www.instagram.com/reel/CwkCBOdBcvg/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 627, 4, 0, 41, 0),
  ('gorontalo.unite', 'Perjalanan beramai-ramai bersama teman-teman terdekat itu menyenangkan. Perjalanan memang melelahkan, tapi selalu saja ada yang mengobati kelelahan itu. Suasana pantai yang adem, meskipun matahari sore lagi panas-panasnya. 

Welcome to Oluhuta Journey, Desa Oluhuta, Kabila Bone, Bone Bolango. salah satu pantai batu karang di Gorontalo yang punya pemetaan tersendiri buat penelitian, camping juga, atau sekedar menikmati suasana sunset.

📸 @whyurezhaldy dkk #OluhutaJourney #GorontaloUnite', '2023-08-30 00:52:00+08'::timestamptz, 'https://www.instagram.com/reel/Cwj5gfXh8Xq/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1018, 1, 0, 64, 71),
  ('gorontalo.unite', '"Penunggu Kurenai"

Konon katanya penyelam yang beritikad baik di dalam air akan berjumpa dengan makhluk cantik yang satu ini. Itikad baik bagimanaaa? Yaa, contohnya sih menjaga lingkungan sekitar, tidak buang sampah sembarangan, dll. Menjaga biar sama-sama betah. Kan begitu?

📸 @vian_adam #GorontaloUnite', '2023-08-29 20:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CwjbekQB1dG/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 369, 0, 0, 2, 4),
  ('torangpefest', 'Haii @bagindas_ !

Torang so siap for nostalgia 🤪

Ada yang blum se aman tiket ? Klik link di bio capat..', '2023-08-27 23:41:00+08'::timestamptz, 'https://www.instagram.com/reel/CweoE0lhilL/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 607, 0, 0, 44, 0),
  ('emzydinata', '“Akhirnya gak penasaran lagi! 3x kesini ketemu juga sama si hiu paus. 
So, ini emang jadi salah satu wisata paling sohor di Gorontalo. Selain unik dan tiada duanya, lokasinya juga gak begitu jauh dari pusat kota. Cocok jadi bucketlist klo liburan ke Gorontalo.” - 

📍Wisata Hiu Paus 
(Botubarani, Kec.Kabila Bone, Kab.Bone Bolango)

#hiupaus #hiupausgorontalo #botubarani #gorontalo #wisatagorontalo #exploregorontalo', '2023-08-26 18:20:00+08'::timestamptz, 'https://www.instagram.com/reel/CwbdWG_pYzY/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 4188, 14, 2, 72, 0),
  ('gorontalo.unite', 'Salah satu cara terbaik buat nikmatin sunset gak harus di pantai. Di danau pun jadi. 

Meski gak terlalu luas, meskipun cuma danau buatan, tapi suasana di Danau Perintis ini bolehlah. 

📍 Danau Perintis, Suwawa
📸 @emzydinata #GorontaloUnite', '2023-08-24 01:05:00+08'::timestamptz, 'https://www.instagram.com/reel/CwUeqKsBd4S/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 902, 0, 0, 0, 34),
  ('torangpefest', 'HULONTHALO🙌

SO SIAP NGONI? 

DARI KEMARIN MATI PENASARAN DENGAN SAPA SEBENARNYA INI ARTIS? 

Siapa yang gatau lagu-lagu mereka ini 😅 Memorable banget jaman SMP dulu hahaha 🤪

So ini @bagindas_ 

Ayok brou/sist, segera!! Jangan terlewatkan,pantengin terus instagram kita ✨', '2023-08-21 00:49:00+08'::timestamptz, 'https://www.instagram.com/reel/CwMuKQRB4Kl/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 546, 0, 0, 77, 0),
  ('gorontalo.unite', 'Masih jadi tempat terbaik buat healing, berada disekitaran Hutan Pohon Pinus yang teduh. yups, Puncak Dulamayo ini masih adem suasananya, semoga selamanya. 

📍Hutan Pinus Dulamayo 
📸 @whyurezhaldy #GorontaloUnite', '2023-08-19 16:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CwJVKYehgzI/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 162, 0, 0, 1, 0),
  ('gorontalo.unite', 'Terlepas dari sebagai orang Gorontalo, jujur nih lagu semangatnya bikin menggebu-gebu. Pada peringatan HUT ke-77 RI tahun lalu, Gita Bahana Nusantara menampilkan medley lagu-lagu daerah, termasuk lagu ini. Binde Biluhuta.

Tahun ini tidak ada. Mungkin berikut-berikutnya lagi. karena pada dasarnya, peringatan Kemerdekaan RI selalu menampilkan khasanah budaya Indonesia, salah satunya dari Gorontalo. Baik itu lagu, pakaian adat, tarian, dan lain sebagainya. 

17 Agustus selalu menyisakan kenangan tersendiri, bagi setiap orang.', '2023-08-17 04:06:00+08'::timestamptz, 'https://www.instagram.com/reel/CwCv54MBI2N/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 10000, 0, 1, 105, 514),
  ('gorontalo.unite', 'Puncak Peringatan HUT ke-78 RI tingkat Kabupaten Bone Bolango yang berlangsung di Stadion Bone Bolango ada atraksi paralayang dan juga terjun payung. Untuk paralayang sendiri berangkatnya dari Bukit Arang dan mendarat di stadion yang terletak di Desa Bulotalangi Timur.

📸 @ilamyunus #GorontaloUnite 
#TerusMelajuUntukIndonesiaMaju', '2023-08-17 01:52:00+08'::timestamptz, 'https://www.instagram.com/reel/CwCiXOKhqIQ/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 1412, 0, 0, 4, 9),
  ('emzydinata', '“Magical morning from floating village in Indonesia.” - 🇮🇩

📍Torosiaje Village
(Popayato, Pohuwato Regency, Gorontalo)

#torosiaje #torosiajevillage #gorontalo', '2023-08-14 19:58:00+08'::timestamptz, 'https://www.instagram.com/reel/Cv8vW21NedN/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 275, 2, 0, 8, 0),
  ('gorontalo.unite', 'untuk perjalanan-perjalanan menyenangkan yang selalu terabadikan, suatu hari pasti dirindukan. maka abadikanlah setiap momen yang di lewati, dgn menyenangkan.

📌 Bogisa Island, samping Saronde 
📸 @ditelvin #GorontaloUnite', '2023-08-14 19:01:00+08'::timestamptz, 'https://www.instagram.com/reel/Cv8pyzYvG51/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 421, 0, 0, 2, 10),
  ('gorontalo.unite', 'Ada hal menarik untuk dipelajari di Taludaa sana, selain Air Terjun-nya yang lumayan untuk ditempuh, namanya PLTMH (dibagian awal video). 

Pembangkit Listrik Tenaga Mikrohidro ini memanfaatkan tingginya air sungai maupun air terjun yg bisa menghasilkan energi listrik. 

Sumber energi terbarukan, disediakan oleh alam, dimanfaatkan secara terus menerus. Semoga tetap terlestarikan. 

📸 @rhmtahmd__ #GorontaloUnite', '2023-08-13 17:50:00+08'::timestamptz, 'https://www.instagram.com/reel/Cv573VFh5rS/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 127, 0, 0, 0, 1),
  ('fhirmanohihiya', 'Ngopi☕️ lia sunset sambil b tunggu lampu kota manyala memang top !!!
Apa lagi kalo ada dng do’i di samping :)

📌puncak Dumbo Raya🌃🌅

.

.
#gorontalo #gorontalounite #gorontalolife #pesonagorontalo', '2023-08-13 05:16:00+08'::timestamptz, 'https://www.instagram.com/reel/Cv4lkA0hQGM/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 564, 0, 0, 3, 0),
  ('ditelvin', 'Perfectly imperfect 

📍 Lito Bogisa

#gorontaloindah #gorontalo #pesonaindonesia #pesonagorontalo #gorontaloutara #litobogisa #bogisaisland #explore #exploregorontalo #explorepage #reels #capture', '2023-08-12 04:18:00+08'::timestamptz, 'https://www.instagram.com/reel/Cv15GGSsEGs/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 195, 0, 0, 8, 0),
  ('gorontalo.unite', 'Aktivitas warga menjelang akhir pekan, ramai-ramai ke tempat-tempat yang ramai, misalnya di Danau Perintis, Suwawa. 

Bikin Perjusami bisalah sekali-sekali disini. Weekend camping begitulah. Lebih menyenangkan lagi kalo bareng2 orang terdekat. 

📸 @bonebol_tourism #GorontaloUnite', '2023-08-11 02:01:00+08'::timestamptz, 'https://www.instagram.com/reel/CvzGa_xBbbZ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 592, 0, 0, 4, 8),
  ('gorontalo.unite', 'Salah satu kesenangan yang terasa mewah, bisa meluangkan waktu mendatangi tempat-tempat yang pengen didatangi. Bermain bersama suasana alam sekitar. 

Besok-besok tempat2 seperti ini harus dipercantik lagi, kita-kita ini butuh healing murah meriah tapi harus mewah. Dan seperti halnya @kurenaibeach ini, terus berbenah, memperbaiki fasilitas yg ada, biar pengunjung tetap nyaman, betah dan bahagiaaaaa. 

📍 Kurenai Beach
📸 Navillera @deadegobel_ #GorontaloUnite', '2023-08-10 02:36:00+08'::timestamptz, 'https://www.instagram.com/reel/CvwlVWbBdAl/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 196, 0, 0, 2, 2),
  ('gorontalo.unite', 'Masa-masa kemewahan anak-anak. Keterbatasan lahan tidak jadi masalah, jemuran gilingan padi bisalah. Rasa sakit jatong di mesel itu dorang nikmati, biar pas so basar, so terbiasa deng masalah-masalah lain yang menanti. 

Hanya 2 yang bisa menghentikan permainan ini. Adzan magrib dan atau yang punya bola so mo pulang duluan. 📸 @anis_mustapa #GorontaloUnite', '2023-08-09 02:35:00+08'::timestamptz, 'https://www.instagram.com/reel/CvuA5mghMEB/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 428, 0, 0, 10, 15),
  ('emzydinata', '“Welcome to ‘Avatar Village’. Lega banget rasanya setelah menempuh perjalanan panjang dari pusat kota Gorontalo, akhirnya bisa sampe juga kesini. Satu lagi bucketlist travel yang tercapai.” - ✅

#torosiaje #torosiajevillage #gorontalo #gorontalounite #ayokedesa', '2023-08-08 07:09:00+08'::timestamptz, 'https://www.instagram.com/reel/Cvr6sKCNz01/', 'Reel', 'Untold Story', false, 'portrait', false, 'published', 0, false, 0, 0, 644, 0, 0, 9, 0),
  ('ditelvin', 'Jangan pergi agar dicari, jangan sengaja lari agar dikejar. Berjuang tak sebercanda itu kawan

📍 Bogisa Island, North Gorontalo 

Inframe : @nay7pm @rahmatm377 
#pesonaindonesia #pesonagorontalo #gorontalo #pesgo #gorut #pesonagorontaloutara #pulau #bogisaisland #beach #beachlife #beachvibes #explorepage #explore #exploregorontalo #pantaiindonesia', '2023-08-08 00:24:00+08'::timestamptz, 'https://www.instagram.com/reel/CvrMcykJqr1/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 144, 1, 0, 6, 0),
  ('gorontalo.unite', 'Bertualang ramai-ramai, patungan terasa murah. Bawa makanan sendiri, sampe dilokasi tinggal bakar-bakar menu tambahannya. 

1.5jt per malam/hari, urusan tempat tidur gak usah dipusingin, ada yg double bed ada juga yg single. kalo bersepuluh, huhupeta itu. karena kamarnya cuma 2, atas dan bawah. tapi muat kok kalo cuma utk sekedar tidur. 

Yang mewah disini suasana alamnya, pas banget buat weekend penuh keceriaan. 

📍 Roemah Kebun Dulamayo
📸 @gledysputi #GorontaloUnite', '2023-08-04 01:58:00+08'::timestamptz, 'https://www.instagram.com/reel/CvhEcijBpfw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1032, 0, 2, 38, 77),
  ('gorontalo.unite', 'Udah punva tujuan untuk weekend nanti? 

Cobain kesini deh kayaknya, cafe baru yang tempatnya cozy dan tentunya aesthetic dengan design interior yg bergaya industrial. 

Cafe ini pas banget untuk chilling out ataupun menuhin kebutuhan instagram story kalian ygy.

📍@ngopiah_ (Jl. Jambu, Wumialo, Kota Gorontalo)
📸 Ririn Hadjarati (@ririinggo) #GorontaloUnite', '2023-08-03 22:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CvgtD0-Bjg0/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 1019, 1, 0, 39, 74),
  ('deddy_iteneps', 'Dua hal yang menyenangkan itu kerja sambil menikmati alam di wilker.. pas lewat jalur dalam eh ketemu tempat healing guys ❤️😍.. 
📍 HiddenPlace (Suwawa)
MUSIC : ZONA PEKERJA (Deddy Bakir)
#motoran #motorcycle #pedesaan #pedesaanindonesia #gorontalo #suwawa #gorontalounite #instalike #instamood #instamoment #japstlyeindonesia #japs #motorcamping #motorcamp #motorhealing #healing #countryboy #anakdesa #desaku #agustus #indonesia', '2023-08-02 05:08:00+08'::timestamptz, 'https://www.instagram.com/reel/CvcOAbBB_zZ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 190, 0, 0, 7, 0),
  ('biellysindua', 'Some moments at Katedral Hole Gorontalo
.
.
.
________________________________________
📷 @adhyy.s perspective 
.
.
#gorontalounderwater #gorontalo #katedralholegorontalo', '2023-07-30 01:39:00+08'::timestamptz, 'https://www.instagram.com/reel/CvUJN5yBGKr/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 223, 0, 0, 11, 0),
  ('gorontalo.unite', 'Sini, gelar tikarmu. Kita duduk-duduk santai, bercerita banyak hal, dengan view danau yang tenang. Setidaknya ada beban berkurang sedikit, karena terbantukan oleh suasana sekitar yang memang mendukung dan juga orang-orang yang mau mendengarkan. 

📍 Danau Perintis, Suwawa, Bone Bolango
📸 @melikapanigoro_ #GorontaloUnite', '2023-07-29 01:24:00+08'::timestamptz, 'https://www.instagram.com/reel/CvRkJS0BIIZ/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 589, 0, 0, 36, 18),
  ('gorontalo.unite', 'Serasa lagi diajak jalan bersama, menikmati sekitar. Nah ini no depe nama Air Terjun Taludaa di Taludaa, Bone Pante sana. Dari jalan Trans Sulawesi, masih harus nanjak lagi, jalan kaki. 

Nanti kalo capek-capek, akan disajikan air terjun, mandi sekalian. Capek belum tentu hilang, tapi enjoy kan? Rame-rame apalagi. 

📸 @riiscry #GorontaloUnite', '2023-07-28 21:35:00+08'::timestamptz, 'https://www.instagram.com/reel/CvRJoq5B3x0/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 189, 0, 0, 0, 3),
  ('gorontalo.unite', 'Pilihan tempat hangout, dengan konsep perkebunan dipinggiran Danau Limboto. siang menjelang sore bagus, siang kan panas. tapi karena sekitaran sini banyak pohon-pohon, jadinya terasa adem. kalo sore, view sunsetnya benar-benar hangat terasa. 

📍MooiLake, Desa Huntu, Batudaa. #GorontaloUnite', '2023-07-28 18:37:00+08'::timestamptz, 'https://www.instagram.com/reel/CvQ1CqOhDpk/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 557, 0, 0, 15, 42),
  ('gorontalo.unite', 'Kota Tua di Gorontalo, lebih dikenal dengan nama Pasar Jajan. Sebelum ada pertokoan, ada pasar, namanya Satya Pradja yang dibangun sejak tahun 60-an. Sedangkan pasar tua yang tidak jauh dari sini, sudah ada sejak abad ke-14. 

Jadi kenapa kawasan ini dinamakan Kota Tua-nya Gorontalo. 

📸 @anis_mustapa #GorontaloUnite', '2023-07-28 03:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CvPNOcMhtrX/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 842, 0, 0, 12, 66),
  ('fhirmanohihiya', 'Tiba-tiba, july hampir selesai🍃

📍Bukit Arang

#gorontalo #gorontalounite #pesonagorontalo #gorontalolife', '2023-07-28 03:04:00+08'::timestamptz, 'https://www.instagram.com/reel/CvPKUyxhqN9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 203, 1, 0, 1, 0),
  ('gorontalo.unite', 'Hari yang cerah, akhir pekan juga. Sebagian orang memilih rebahan, sebagian lainnya menikmati perjalanannya. Tidak ada yang beda, semua sibuk dengan aktivitasnya masing-masing. 

Jalan-jalan ke Cabana Resto di Bolihutuo, worthed sih buat dijadiin lokasi liburan bersama keluarga. Gak perlu jauh-jauh keluar Gorontalo. Harga dan fasilitas yang ditawarkan pun sama. 

Makin kesini, makin banyak pilihan liburan asyik saja yaa di Gorontalo. Mau tepi laut ada, tepi danau ada, kaki gunung ada, dalam hutan pun ada. 

📍Cabana Resto & Resort, Boalemo
📸 @krisdianamona #GorontaloUnite', '2023-07-28 01:45:00+08'::timestamptz, 'https://www.instagram.com/reel/CvPBw2chQ2P/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 329, 0, 0, 3, 11),
  ('gorontalo.unite', 'Salah satu pantai yang menawarkan konsep alami menjadi ala-ala private beach di Gorontalo. Kurenai. 

Pantai yang mengusung konsep pantai wisata bareng keluarga. Jadi, gak perlu jauh jauh lho. Ciptakan kehangatan keluarga dan kebersamaan di sini! Serunya lagi, sunset di Kurenai ini pas mantul. Trus bisa camping lagi.

Hubungi pengelola @kurenaibeach kalo teman-teman mau liburan seru disini. #GorontaloUnite', '2023-07-28 00:40:00+08'::timestamptz, 'https://www.instagram.com/reel/CvO3hMZB4Tr/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 523, 1, 0, 12, 17),
  ('gorontalo.unite', 'saat melawan pikiran-pikiran secara sendirian, itu melelahkan. coba healing. murah meriah saja. 

📍 Pasambaya Riverside, Modelidu
📸 @matris__giu #GorontaloUnite', '2023-07-27 23:34:00+08'::timestamptz, 'https://www.instagram.com/reel/CvOyV2ah0Te/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 322, 0, 0, 6, 6),
  ('gorontalo.unite', 'kita hanya perlu cari tempat yang memang pengen dikunjungi, bercerita berbagi keluh kesah, semoga bisa saling meringankan. lebih seru lagi kalo berbagi kopi. 

Teman-teman kalo mau camping disini, kalo gak bawa tenda, bisa sewa di @pasambaya_river_side. Begitu juga dengan kopi & wifi. lengkaplah sudah yaa. Kalo akhir pekan ramai, coba datang lebih awal. 

📍Koala Pasambaya, Modelidu
📸 @lutviyac #GorontaloUnite', '2023-07-26 21:27:00+08'::timestamptz, 'https://www.instagram.com/reel/CvL-k9lhdmo/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 405, 0, 0, 11, 10),
  ('gorontalo.unite', 'One fine day in villa. semua hal yang harus kalian cobain nih ☘️

Private Villa dengan fasilitas lengkap dan juga banyak hiburan buat keluarga. Cocok banget nih buat kalian yg mau buat acara atau yang mau menikmati akhir pekan. Yang pastinya dengan harga terjangkau👌🏻

Fasilitas :
- Free Wifi
- 2 kamar tidur. 1 kamar mandi dalam, 2 kamar mandi luar.
- Kolam Renang
- Karaoke
- Mini Golf
- Billiard
- Tenis Meja
- Skatepark
- Sepeda
- Basket Mini
- Tempat Api Unggun.

Buat akhir pekan kalian lebih hangat dan nyaman ✨

📍Loc : Villa DSP, Desa Langge, Kec. Tapa, Kab. Bone Bolango
Contact Person: +682193555558', '2023-07-26 01:10:00+08'::timestamptz, 'https://www.instagram.com/reel/CvJ0C7ZhKHW/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 3692, 3, 1, 236, 539),
  ('gorontalo.unite', 'Sejauh ini, ini lumayan jauh juga untuk dijelajahi dalam hal sekedar menikmati senja terbaik, di Gorontalo. Sebelum Olele Marine National Park, masih dikawasan Oluhuta, Kabila Bone. 

📸 @suciyani__ & @amalbdjo 
#GorontaloUnite', '2023-07-25 00:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CvHJrlDB0js/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 466, 0, 0, 8, 20),
  ('gorontalo.unite', 'Perjalanan-perjalanan menyenangkan itu yang dilakukan ramai-ramai dengan orang-orang terdekat, karena selalu ada cerita-cerita yang terangkum dari perjalanan itu. 

Bagian selatan Gorontalo, selalu saja ada spot-spot menarik untuk dinikmati 

📸 @double_s.d #GorontaloUnite', '2023-07-24 22:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CvG8WYUhA5s/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 410, 0, 0, 8, 11),
  ('gorontalo.unite', 'Teman-teman yang baru pulang beraktivitas dimana saja, selamat menikmati senja yang selalu hangat. Senja itu tentang rasa syukur, ada keluarga dan rumah yang selalu menanti. 

Ada waktu luang, jalan-jalanlah kesini. Nikmati sunset di Pantai Milango, di Desa Hutakalo, Gentuma Raya. Kalian harus tetap bahagia. 

📸 @mel.ahmad_ #GorontaloUnite', '2023-07-24 02:34:00+08'::timestamptz, 'https://www.instagram.com/reel/CvE0GyfhKdk/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 199, 0, 0, 0, 4),
  ('gorontalo.unite', 'Mengintip dari dekat bagaimana keseruan teman-teman peserta KKN-PPM UGM di Pesisir Gorontalo. Selain mengeksplor potensi keindahan di Batudaa Pantai, peserta KKN-PPM juga punya program tersendiri. 

Menarik diikuti. Itu di akhir video, ada tradisi orang Gorontalo loh. Mohundingo dan Molonthalo (raba-raba puru), acara adat selamatan untuk kehamilan 7 bulanan gitu. 

📸 @pesisirgorontalo #PesisirGorontalo #KKNPPMUGM2023 #GorontaloUnite', '2023-07-23 22:40:00+08'::timestamptz, 'https://www.instagram.com/reel/CvEYq8OBR5N/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 174, 0, 0, 1, 1),
  ('yahyaakib', 'Cukup tau aja, selebihnya yaudah gapapa.🍃🙂

#naturehike #indonesiaultralightbackpacking #gorontalo', '2023-07-23 18:11:00+08'::timestamptz, 'https://www.instagram.com/reel/CvD6L67tw7J/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 108, 0, 0, 2, 0),
  ('gorontalo.unite', 'Kawasan sekitaran Center Point, Bone Bolango ini ibarat kota baru. Sejumlah lahan baru terbuka sejak Gorontalo menjadi Provinsi dan Bone Bolango menjadi Kabupaten tersendiri. Tapi masih gersang karena sedikit pohon buat berteduh. 

20 tahun ke depan, saat kamu mulai bermain bersama cucu, mungkin kawasan sini akan teduh, adem, karena banyak pohon-pohonnya. atau sebaliknya, banyak gedung-gedung besar? 

Nanti mo liat di RPJDP Bonebol. 😅

📸 @lutviyac. #GorontaloUnite', '2023-07-23 01:58:00+08'::timestamptz, 'https://www.instagram.com/reel/CvCJYl6htx4/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 251, 0, 0, 41, 9),
  ('gorontalo.unite', 'Hari yang cerah nih, secerah bunga Celosia di Taman Bunga RA yg di Wonosari, Boalemo. Kalo siang terlalu panas, bisa kesini sore-sore biar lebih adem. 

Biaya masuk 10rb rupiah, untuk anak-anak lebih murah lagi. Sekedar foto-foto dan atau menikmati santapan kuliner di warung-warung dekat situ. Lumayan kan, buat bahagia.

📌 Taman Bunga RA, Wonosari
📸 @delvina05 #GorontaloUnite', '2023-07-21 21:34:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu_IR_fPCk7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 537, 0, 0, 12, 25),
  ('gorontalo.unite', 'Merayakan weekend dengan cara bisa kemana saja, ketemu siapa saja, itu sudah lebih dari cukup untuk hal-hal menyenangkan. 

Atau ada juga pilihan lain, introvert paling suka. Menyendiri di pulau, menikmati suasana sekitar, jauh dari hingar bingar seperti di Lito-Lito di Gorontalo Utara sana. Apapun itu, enjoy weekend, everyone. 😍

📍 HuHa Island. Gorontalo Utara
📸 @matris__giu #GorontaloUnitr', '2023-07-21 19:38:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu-68xFhcdG/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 354, 0, 0, 7, 3),
  ('gorontalo.unite', 'Seru-seruan tubing di Desa Bihe, Asparaga. 

Kelar mandi, pas mau ba spull (ba bilas dang), biasanya di kaki itu merah-merah karena benturan di batu. Jadi musti tetap safety. Serunya lagi, memang benar-benar seru. 

Kalo koala untuk rafting atau arung jeram di Gorontalo belum ada, adanya cuma pake tube/ban. Misalnya disini, Asparaga. Ada juga di Tolangohula, Gorontalo Utara dan Ilomata, Bonebol. 

@kkntematik_desabihe #GorontaloUnite', '2023-07-21 00:02:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu87KMiB_rM/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 501, 0, 0, 19, 26),
  ('gorontalo.unite', 'Menyusuri kampung terapung warga suku Bajo di Torosiaje, Popayato, daerah paling barat di Gorontalo. Perjalanan panjang jika dari arah Kota Gorontalo untuk sampai kesini. 

Nginap? Bisa. Ada homestay dan juga kamar dari rumah warga setempat yang disewakan. Mulai dari 100ribuan. Cobalah. Bertualang bersama warga Bajo.

📸 @afdiii40 #GorontaloUnite', '2023-07-20 19:17:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu8SvuRhMtH/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 309, 1, 0, 2, 16),
  ('ditelvin', 'Kalo bicara tempat wisata di gorontalo itu gada habis-habisnya, hampir di setiap wilayah ada tempat buat wisata. 

Salah satu pulau kecil tak berpenghuni dengan menyimpan keindahan yang tak kalah cantik dengan wisata lain di Gorontalo. 
Pulau ini menyajikan berbagai keindahan alam di pantai, daratan, dan bawah air. Salah satu yang paling mudah dinikmati adalah keindahan alam puncak bukit ilalang dan pantai putih yang begitu menawan.

📍Pulau Dionumo, Gorontalo Utara

#pesonagorontalo #pesonagorontaloutara #pesonaindonesia #gorontalo #gorontalounite #gorontalo_inframe #travel #explore #exploregorontalo #gorontaloutara #beach #beachlife #beachvibes #dionumoisland #pantai #pulau #reels', '2023-07-20 17:13:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu8Ear4tnYe/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 227, 0, 0, 11, 0),
  ('gorontalo.unite', 'Dan Puncak Dunu Ceria di Monano, selalu menyajikan senja terbaiknya. 

📸 @ylndadm_ #GorontaloUnite', '2023-07-19 02:55:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu3-piWhWJ7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 337, 0, 0, 1, 13),
  ('gorontalo.unite', 'relaksasi di koala. selain mudah, tentunya murah. syukur2 kalo dekat rumah masih begini suasananya. 

📍Modelidu, Telaga Biru
📸 @anis_mustapa #GorontaloUnite', '2023-07-18 18:10:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu3CeQphC3M/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 220, 0, 0, 1, 6),
  ('fhirmanohihiya', 'Desa bajo boalemo 📌

#gorontalo #gorontalounite 
 #boalemo #pesonagorontalo', '2023-07-18 03:38:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu1eDgch2Hi/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 933, 0, 0, 13, 0),
  ('gorontalo.unite', 'Lito Bogisa yang masih tetangga dekat Saronde Island punya dataran yg merupakan pasir timbul membelah laut. Tidak ada dermaga, setiap katintin yang kesini, turunnya dibibir pantai. 

Ini kalo diliat dari atas, warna tepian pantainya berwarni-warna. 

📍Lito Bogisa, Moluo, Kwandang
📸 @andi_talbani #GorontaloUnite', '2023-07-18 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu1MqtgB2Tf/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 178, 0, 0, 0, 1),
  ('gorontalo.unite', 'Untuk pengiriman barang, pemesanan makanan maupun miniman dan perjalanan, bisalah pakai MAXIM. Memperlancar segala aktivitas dimana saja. Ada Maxim Bike, Maxim Car, Maxim Bentor. 

#Maxim #MaximGorontalo #MaximBentor #MaximBike', '2023-07-17 22:30:00+08'::timestamptz, 'https://www.instagram.com/reel/Cu07kCIhF-R/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 174, 0, 0, 0, 3),
  ('gorontalo.unite', 'Tempat-tempat yang kita kunjungi itu bisa menstimulus akan apa yang kita pikirkan. Nikmati hari-hari menyenangkan dengan pikiran-pikiran menyenangkan ditempat-tempat yang menenangkan. 

Begitu cara orang-orang yang berdamai dengan pikirannya. 

📍 Embung Dumati, Telaga Biru
📸 @ririinggo #GorontaloUnite', '2023-07-17 02:11:00+08'::timestamptz, 'https://www.instagram.com/reel/Cuyv9nKBha_/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 608, 0, 0, 2, 19),
  ('gorontalo.unite', 'Yang awalnya hanya sungai, tapi jadi tempat favorit orang-orang dalam menikmati hari liburnya. semoga besok-besok, bakalan banyak tempat-tempat seperti ini. 

Bisa meningkatkan ekonomi warga masyarakat sekitar, bertambahnya tempat healing gen Z, dan alam lingkungan sekitar yg terus dilestarikan. 

📍 Pasambaya Riverside, Modelidu
📸 @rivaldikanal_ #GorontaloUnite', '2023-07-15 23:20:00+08'::timestamptz, 'https://www.instagram.com/reel/Cuv3p0nBbMM/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 562, 0, 0, 8, 22),
  ('gorontalo.unite', 'Gorontalo pagi ini lagi adem. ada yang masih ditampa tidor, ada juga yg barusan selesai sarapan nasi kuning. Pagi memang begitu, selalu ada cara untuk merayakannya.

Selamat merayakan pagi. Embung di Dumati ini dibangun untuk menampung aliran air hujan. Berhubung suasana sekitarnya masih lestari, jadilah sebagai destinasi wisata tersendiri. 

📌 Embung Dumati, tidak jauh dari RingRoad. 
Kalo weekend banyak yg lari-lari pagi disitu. kalo Ramadan, sorenya rame deng aktivitas ngabuburit. 

📸 @journey_of_five_humans #GorontaloUnite', '2023-07-14 17:10:00+08'::timestamptz, 'https://www.instagram.com/reel/Cusnl-HByDB/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 581, 1, 0, 12, 16),
  ('rdcwalenta', 'Save this post for you next trip, Diyonumo island 🏝️🌊

#ayokegorontalo #indonesian #pesonaindonesia #earth #sea #island #paradise', '2023-07-12 04:58:00+08'::timestamptz, 'https://www.instagram.com/reel/CumKuijgpwM/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 388, 4, 0, 0, 0),
  ('gorontalo.unite', 'sore-sore cari tempat ngopi, meskipun untuk sekedar melepas penat setelah hampir seharian mengejar banyak hal. atau, bisa juga sambil ngopi dan melanjutkan rutinitas yg tertunda. 

jadi pengen ajak teman ngopi nih, disini. Tropical Space, di Limboto. 1 dari sekian yg bisa disebut juga co-working space istilah kini. 

📸 @tropicalspce #GorontaloUnite', '2023-07-12 01:15:00+08'::timestamptz, 'https://www.instagram.com/reel/CulxtwShfKf/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 179, 0, 0, 1, 6),
  ('gorontalo.unite', 'Jika Sungai di kawasan Pasambaya yang terletak di Modelidu, Telaga Biru jadi tempat yang mempertemukan 2 sungai sekaligus, kenapa tidak kita mencoba untuk bertemu sekaligus disitu? 

Bisa sambil bakar-bakar milu, ngopi-ngopi, cari inspirasi yg segar-segar. Kan suasana sekitar juga segar-segar. 

📌 Pasambaya Riverside, Modelidu Village
📸 @whyurezhaldy #GoronaloUnite', '2023-07-11 22:05:00+08'::timestamptz, 'https://www.instagram.com/reel/Culb4bHhD0e/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 646, 0, 0, 18, 32),
  ('gorontalo.unite', 'Apa ada orang Gorontalo, tinggal di Gorontalo, tapi belum pernah bermain bersama whaleshark di Botubarani? adaaaa, banyakkk. 

Teman-teman kalo mau ke Whaleshark, bisalah ajak beberapa teman-teman videografer/fotografer. Buat mengabadikan jika suatu saat tuh ikan-ikan migrasi lagi ke tempat lain. 

Yuk ah, semoga whaleshark-nya betah di Gorontalo, kita juga jadi punya teman bermain dibawah air. 

📌 Botubarani, Bone Bolango
📸 @isal_gorontalo #GorontaloUnite', '2023-07-11 20:00:00+08'::timestamptz, 'https://www.instagram.com/reel/CulNmalhsN3/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1733, 0, 0, 31, 36),
  ('gorontalo.unite', 'Pulau Diyonumo yang terletak di Deme II, Sumalata Timur ini sering digambarkan sebagai lukisan alam indah nan elok. Sebuah perumpamaan yang gak salah juga, karena memang keren.

Banyak hal yang bisa dilakukan sekitar sini, berkemah misalnya. Pantainya yang dikenal dengan pasir halusnya juga, cocok buat sambil mandi. 

📍 Dionumo Island, Gorontalo Utara
📸 @jejakviqi #GorontaloUnite', '2023-07-11 18:31:00+08'::timestamptz, 'https://www.instagram.com/reel/CulDYTRJ68N/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 426, 7, 0, 1, 10),
  ('gorontalo.unite', 'Jatuh dalam Bahasa Gorontalo berbeda istilah tergantung jatuh ke arah mana. Semua yang namanya jatuh, pasti menyakitkan. termasuk jatuh cinta?', '2023-07-11 04:54:00+08'::timestamptz, 'https://www.instagram.com/reel/CujlDq3hH8H/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 5811, 14, 2, 269, 843),
  ('gorontalo.unite', 'Senja & Pantai, dua diantara kombinasi sore terbaik untuk dinikmati. Saat rutinitas berangsur selesai, untuk kemudian kembali bercengkerama bersama saat malam tiba. 

Vibes, mood, suasana, aura, atau apapun itu, sore memang saat terbaik untuk menikmatinya. 

📌 Lito HuHa, Gorontalo Utara 
📸 @kipakaya__ #GorontaloUnite', '2023-07-09 02:45:00+08'::timestamptz, 'https://www.instagram.com/reel/CueNicUBaXG/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 367, 0, 0, 0, 12),
  ('gorontalo.unite', 'Air terjun di Bonthula, Kec. Asparaga ini tingginya cuma 2 meter, sering juga dinamai air terjun mini. Tapi view sekitarnya yang bikin tempat ini jadi gaga. Kalo dari Kota Gorontalo, perjalanan butuh waktu sekitaran 3 jam.

Tidak jauh dari sini juga sudah masuk kawasan Suaka Margasatwa Nantu, salah satu hutan yang paling dijaga di Gorontalo. 

📌 Air Terjun Bonthula, Asparaga
📸 @fahrikhadafix_ #GorontaloUnite', '2023-07-09 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/CueBlTgBkeo/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 553, 0, 0, 14, 29),
  ('gorontalo.unite', 'Hiburan dan Liburan. 

2 hal ini banyak ditemukan di Gorontalo, banyak tempat-tempat bagus juga, apalagi yang baru buka dan juga yg sudah lama tapi terus berkembang. Mulai yang dikelola secara profesional hingga tempat-tempat yg belum ada yg mengelolanya. 

Enjoy, berhari libur, semuanya. 

📌📸 @shava.beachresort #GorontaloUnite', '2023-07-08 23:57:00+08'::timestamptz, 'https://www.instagram.com/reel/Cud6M4_BC-f/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 238, 0, 0, 0, 3),
  ('gorontalo.unite', 'laut, pulau dan pantai yang tenang itu menenangkan. makanya tidaklah mengherankan, jika orang mencari ketenangan, salah satunya berpelesiran ke pantai atau pulau. 

segitu mewahnya di Gorontalo, banyak pulau-pulau yg bisa dikunjungi dengan ongkos murah meriah. 

📌 Dionumo, Sumalata
📸 @fahrikhadafix_ #GorontaloUnite', '2023-07-08 22:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CudbzVKBLu5/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 247, 0, 0, 2, 5),
  ('gorontalo.unite', 'salah satu tempat, yang nawarin paket lengkap sunset dan sunrise. malam hari kalo lagi terang bulan, benar-benar terang di pantainya. 

📌 Dionumo Island
📸 @fahrikhadafix_
#GorontaloUnite', '2023-07-07 02:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CuZCTgihhpe/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 194, 0, 0, 1, 1),
  ('gorontalo.unite', 'Jika selama ini terbiasa dengan vibes resto atau villa dekat laut, pantai atau pulau. Nah ini beda lagi. di sekitaran Danau Limboto. 

Konsep dan penataannya pun berbeda, mirip-miriplah dengan di Bali. Tapi dengan suasana pedesaan ala Gorontalo. 

📌 Mooi Lake Cafee, Desa Huntu, Batudaa. 
📸 @CindyEmeralda #GorontaloUnite', '2023-07-07 01:10:00+08'::timestamptz, 'https://www.instagram.com/reel/CuY5JsehFSN/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1229, 4, 4, 54, 119),
  ('gorontalo.unite', '"pagi adalah bagian terbaik dari hari" tulis Ibu Dewi Lestari.

mari memulai pagi dengan hal-hal baik, Insya Allah sepanjang hari juga akan ada hal-hal baik. 

📌 Dunu Hills, Monano, Gorut
📸 @imampou.88 #GorontaloUnite', '2023-07-06 16:10:00+08'::timestamptz, 'https://www.instagram.com/reel/CuX7X5-BYQD/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 319, 0, 0, 0, 5),
  ('gorontalo.unite', 'Lu punya kesempatan, lu punya kebahagiaan. 

Kesempatan bisa datang ke tempat-tempat yang diinginkan. murah meriah saja, apalagi cuacanya mendukung banget seperti ini, tinggal siapin kopi, nikmatin deh. 

📌 @pasambaya_river_side, Modelidu
📸 @orangsusah17 (tapi gak susah-susah amat kan?) 😂
#GorontaloUnite', '2023-07-06 00:59:00+08'::timestamptz, 'https://www.instagram.com/reel/CuWS-YqBZD3/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 154, 0, 0, 0, 4),
  ('gorontalo.unite', 'Tidak terasa, sebentar lagi Gorontalo Unite berusia 13 tahun. Ulang tahun tidak pernah dirayakan, karena sering dilupakan. 

Untuk merayakannya, kami bikin beberapa merchandise, terbuka buat teman-teman vendor lain yang ingin berkolaborasi. 

Toduwolo. #GorontaloUnite', '2023-07-05 06:29:00+08'::timestamptz, 'https://www.instagram.com/reel/CuUTSQ_g4F9/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 48, 0, 0, 1, 0),
  ('gorontalo.unite', 'Malamnya teduh, yang ada cuma suara air yang ditiup angin. Sekarang 14 Zulhijah, bulan lagi terang-terangnya juga, cuaca juga lagi bagus. 

Ini di kawasan Villa Kencana, Bolihutuo. beberapa teman sering membagikan cerita tentang suasana yang teduh saat malam hari disini. Jadi pengen cobain yaa. 

📸 @sitylalu_ #GorontaloUnite', '2023-07-03 07:20:00+08'::timestamptz, 'https://www.instagram.com/reel/CuPSoCYyHWB/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 853, 0, 0, 10, 19),
  ('gorontalo.unite', 'Apa hal yang menenangkan saat mau pulang ke rumah setelah hampir seharian beraktivitas? 

Kemewahan langit sore yang jingga, yang menemani perjalanan pulang sampai di rumah. Semua orang bisa merasakan dan menikmatinya.

📸 @nayahaddar #GorontaloUnite', '2023-07-03 03:00:00+08'::timestamptz, 'https://www.instagram.com/reel/CuOyfdFyshP/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 222, 0, 0, 0, 5),
  ('gorontalo.unite', 'Mirip kastil masa lalu, Benteng Ulantha bisa menyajikan pemandangan yang sejuk dan sorenya menyajikan sunset yang hangat. Namanya saja yaa benteng buatan untuk menarik minat pengunjung. 

Di Gorontalo ada beberapa benteng juga, yang memiliki nilai-nilai sejarahnya tersendiri. Kalo ada kesempatan, bisalah jelajahi semuanya. Tapi benteng-benteng itu berjauhan. 😅

📸 @ditelvin #GorontaloUnite', '2023-07-03 00:00:00+08'::timestamptz, 'https://www.instagram.com/reel/CuOd4JtSf7U/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 524, 0, 0, 5, 20),
  ('donikadir', 'Pantang Menyerah Latihannya sampai masuk Kelas Intermediate 🎾🔥

Buat yang mau Join bisa langsung Kunjungi Lapangan Taruna di Hari Jum’at jam 7 pagi Atau Senin-Rabu-Sabtu di Lapangan tenis UNG jam 8 Malam 👌

#kelasbeginner #tenislapangan', '2023-06-29 22:38:00+08'::timestamptz, 'https://www.instagram.com/reel/CuGjq7gBJLF/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 143, 0, 0, 6, 0),
  ('gorontalo.unite', 'Cagar Alam Pulau Popaya di Gorontalo Utara ini masih dalam tahap apa ya, dilindungi. Karena dikategorikan sebagai pulau konservasi. 

Agak berbeda dengan lito lain disekitarnya yang bisa buat kita nginap malam hari, Dionumo, Saronde atau Mohinggito misalnya.

Nah, sekedar dieksplore keindahannya, suasananya, airnya yang jernih, bisalah. 

📸 @akbarrreal #GorontaloUnite', '2023-06-27 02:50:00+08'::timestamptz, 'https://www.instagram.com/reel/Ct_S2ylOzBw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 312, 0, 0, 0, 9),
  ('gorontalo.unite', 'Salah satu cara menyenangkan diri sendiri adalah mendatangi tempat-tempat yang ingin didatangi. Menikmati yang ingin dinikmati, misalnya yaa, menikmati matahari terbenam di Lito HuHa, Gorontalo Utara sana. 

Dekat, murah, seru apalagi. 

📸 @naldyjoe #GorontaloUnite', '2023-06-27 02:00:00+08'::timestamptz, 'https://www.instagram.com/reel/Ct_O24wOFHc/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 643, 0, 0, 37, 35),
  ('gorontalo.unite', 'Lagu Tinilo Bantha Tiluwa yang juga sering dibawakan dengan tarian Tidi Lo Ayabu. Sebuah syair yang menceritakan tentang curhatan seorang anak dan nasehat orang-orang tua zaman dulu. 

Deliana Apuadji & Oeloe Mile mencoba menyajikan lagu yg diciptakan temei Suruni Uno ini dengan caranya masing-masing, tapi berada ditempat yang sama. Benteng Otanaha. 

Selengkapnya cek di youtube mereka, Tinilo Bantha Tiluwa. 
@drapuadji @oeloe_mile 

Maaf, lagu dimulai dari bait ke-3. 🙏
#GorontaloUnite', '2023-06-26 07:09:00+08'::timestamptz, 'https://www.instagram.com/reel/Ct9NGjkgi2q/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 0, 536, 0, 0, 18, 39),
  ('ebyfebrianti', 'Ada tempat yg nyaman nih guys, recomended buat yg mau liburan bareng keluarga atau bestiwww 😍🫶🏻
.
.
.
@nateyahouse 
@nateyahouse', '2023-06-26 03:06:00+08'::timestamptz, 'https://www.instagram.com/reel/Ct8xRBjhnlw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 439, 1, 1, 21, 0),
  ('srydunggio__', 'Bikin candu 🏔️🌊⛅️🌴🌳
.
.
.
.
.
@bigadventureindo @gorontalo.unite @like_gorontalo @dkijalanjalan_
#jalanjalan #dkijalanjalan #hijabtraveller #gorongalo_inframe #gorontalounite #pesonaindonesia #sulawesiutara #moment #senja', '2023-06-24 19:50:00+08'::timestamptz, 'https://www.instagram.com/reel/Ct5ajRZuQCD/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 650, 0, 0, 6, 0),
  ('gorontalo.unite', 'Tips buatt kalian yang mau Jajan Hematt Habis Gajiann!!!!

GrabFood Lagi ada DISKON KILAT GAJIANN lohhhhh!!!! 🙌🎉🎉

Diskon s.d 90% di jam 14.00 - 16.00

Diskon s.d 40% di jam 10.00 | 12.00 | 14.00 | 17.00 | 19.00 

Dan diskon s.d 50% khusus yang langganan GrabUnlimited lohhh🎉

Serbuu Promonya sekarang jugaaaa!! 
Periode 24 - 25 Juni 23 jangan sampai kelewatan yahh!!!🤗

#GrabFood #PromoGrabFood #DiskonKilat #DiskonGrabFood', '2023-06-24 00:03:00+08'::timestamptz, 'https://www.instagram.com/reel/Ct3SCUWgn8X/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 58, 0, 0, 0, 1),
  ('gorontalo.unite', 'akhir pekan, pengen kemana-mana. pengen lari ke hutan, belok ke pantai? serahlah. mari senang-senangkan hati. 

minggu depan mau barbekyu disini bisa ndak ya? bawa daging kurban. sekilo saja. 😀😍

📌 Pasambaya River Side, Modelidu.
📸 @srydunggio__ #GorontaloUnite', '2023-06-23 21:03:00+08'::timestamptz, 'https://www.instagram.com/reel/Ct2-Faxgfpz/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 341, 0, 0, 8, 20),
  ('gorontalo.unite', 'Selain menenangkan dengan suara ombak, damai aja dengan hembusan anginnya. ya, begitulah suasana malam dekat pantai. 

Berada ditempat-tempat seperti ini, cobalah mengingat-ingat tentang hal-hal yang berjalan tidak seperti inginnya kita. Setelahnya, syukuri apa yang ada. 

Enjoy weekend teman-teman. Good nite and have a nice dream.

📌 Villa Kencana, Boalemo
📸 @nuunahmad #GorontaloUnite', '2023-06-23 07:12:00+08'::timestamptz, 'https://www.instagram.com/reel/Ct1e5ZjAm1m/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 1047, 0, 0, 8, 35),
  ('gorontalo.unite', 'Teman-teman yang cari tempat refreshing berbeda, bisa coba kesini. Apalagi lagi ada beban wuiiiihh, lampiaskan disini. Dan mimin juga baru tau, ternyata ada di Gorontalo emotional house loh. Salah satu sarana terapi buat teman-teman yg ingin pelampiasan saja. 

Nah, @emotional.house_ ada prasyarat khusus kalo mau cobain kesini. Harus dalam keadaan sadar, tidak bawa benda tajam, alkohol, atau apapun. Biaya, alamat, jam operasional dan kontak person, bisa langsung ke instagram @emotional.house_ 

Jang bunuh diri sup. Kalo ada apa-apa, curhat disini. Kalo mau healing, Gorontalo Unite bagi-bagikan rekomendasi tempat healing, murah, meriah. Teman-teman psikolog juga ada. 🖤💙

repost @meylan_phutry #GorontaloUnite #EmotionalHouse', '2023-06-22 01:39:00+08'::timestamptz, 'https://www.instagram.com/reel/CtyTxSagrPv/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 834, 0, 1, 81, 31),
  ('gorontalo.unite', 'Tempat-tempat terbaik buat dijelajahi, menyerap energi kita secara berlebihan. Makanya tidak heran, saat pulang ada rasa capek. Tapi itulah seni dari sebuah perjalanan. Apalagi perjalanannya melibatkan rasa. 

Pekan depan bakalan long weekend lagi nih. Setelah berkurban, jika masih ada kelebihan sedikit, cocoknya buat apa ya? Barbeque di Pulau? ah, kayaknya menarik. 

📍Lito Bohu, Gorontalo Utara
Inframe : @kalvaryyruntukahu
video: @udangmerah40
#GorontaloUnite', '2023-06-21 01:55:00+08'::timestamptz, 'https://www.instagram.com/reel/CtvxjxpSi4m/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 269, 0, 0, 1, 6),
  ('fhirmanohihiya', 'Morning coffee☕️🍃

📌puncak Lestari🏞️

.

.

.
#gorontalo #gorontalounite #pesonagorontalo #gorontalolife', '2023-06-20 04:08:00+08'::timestamptz, 'https://www.instagram.com/reel/CttbjTEhLzC/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 396, 2, 1, 5, 0),
  ('gorontalo.unite', 'suasana sore-nya itu loh. bisa sehangat ini. so, disini memang salah satu tempat terbaik buat menikmati sunset dan sunrise sekaligus.

Desa Dunu, Monano, North Gorontalo. 
vid: @whyurezhaldy #GorontaloUnite', '2023-06-20 01:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CttJ4RGJdjd/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 470, 0, 0, 6, 11),
  ('biellysindua', 'Hiu Paus - Botubarani Gorontalo
.
.
.
📷 : @adhyy.s 
.
#hiupausgorontalo #botubaranigorontalo #sherlythewhaleshark', '2023-06-19 23:11:00+08'::timestamptz, 'https://www.instagram.com/reel/Cts5gQxBEpf/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 878, 0, 0, 12, 0),
  ('gorontalo.unite', 'selamat menjalankan rutinitas seperti biasa, nikmati setiap perjalanan yang menyenangkan. 

vid: @putrissaff #GorontaloUnite', '2023-06-19 17:31:00+08'::timestamptz, 'https://www.instagram.com/reel/CtsTEV4P00B/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 359, 0, 0, 0, 14),
  ('gorontalo.unite', 'lautan yang tenang, tidak melahirkan pelaut yang handal. Bagaimanapun suasana harimu hari ini, jalani dan nikmati. Hari-hari yang mudah, tidak melahirkan pemikir yang handal. 

📌 Dionumo Island, North Gorontalo
vid: @fahrikhadafix_ #GorontaloUnite', '2023-06-18 23:39:00+08'::timestamptz, 'https://www.instagram.com/reel/CtqYQx3Acn_/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 260, 0, 0, 0, 6),
  ('gorontalo.unite', 'Sekitar 1 jam perjalanan dari Kota Gorontalo untuk sampai kesini,  Oboss Resorts di Biluhu, Kab. Gorontalo. Soal harga tergolong lumayan, namun apa yang ditawarkan juga sebanding gimana gitu loh. ada harga ada kualitas. so, kapan kita mencobanya? ke @obossresort? 

vid: @srydunggio__ #GorontaloUnite', '2023-06-18 19:10:00+08'::timestamptz, 'https://www.instagram.com/reel/Ctp5m0QPbSn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1109, 0, 0, 44, 123),
  ('gorontalo.unite', 'salah satu terapi murah meriah, datang ke tempat-tempat yang ingin didatangi untuk sekedar santai-santai saja.

by: @ruslimowuu #GorontaloUnite', '2023-06-17 03:00:00+08'::timestamptz, 'https://www.instagram.com/reel/CtllzruJX-I/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 228, 0, 0, 0, 3),
  ('gorontalo.unite', 'ngebolang adalah definisi lain dari mondalengo. "mali (mowali) mondalengo" : (kuat ba jalan). 

jadi, rencana mondalengo kamana pooli nih? tidak mo coba kesini, ke air jatuh di Bondula, Asparaga? healing murah meriah tapi seruuu.

@_tyhrs22 #GorontaloUnite', '2023-06-16 00:32:00+08'::timestamptz, 'https://www.instagram.com/reel/CtitNOyAThT/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 276, 0, 0, 7, 10),
  ('gorontalo.unite', 'When the sun goes down 🌅
@ruslimowuu #GorontaloUnite', '2023-06-15 02:55:00+08'::timestamptz, 'https://www.instagram.com/reel/CtgbnjjOZtc/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 258, 0, 0, 1, 5),
  ('gorontalo.unite', 'Tempat main basket di Limboto, letaknya agak tersembunyi. Ada yang bisa tebak, ini dimana? 

Cari suar sambil bikin video ala-ala film B13 😅', '2023-06-15 02:07:00+08'::timestamptz, 'https://www.instagram.com/reel/CtgWCTkA9Vg/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 117, 0, 0, 6, 0),
  ('gorontalo.unite', 'Tentang RINDU, oleh @densee.denis 

rindu bukanlah hal yang tabu dan dilarang, karena rindu datang di
setiap insan manusia.

karena kita hidup dalam kenangan, maka rindu harus dituntaskan, jalan-jalan ke tempat yang pernah dilalui bersama, singgah makan di tampa langganan dulu, atau sekedar menengok kembali sisa-sisa kenangan. misalnya, mandi di koala waktu masih anak-anak. 😂

repost @densee.denis | vo: Ibu Dewi | Koala di Tapa.', '2023-06-14 23:13:00+08'::timestamptz, 'https://www.instagram.com/reel/CtgB6eHAzfw/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 205, 0, 0, 3, 6),
  ('gorontalo.unite', 'Tidak ada yang lebih indah daripada melihat kegigihan laut yang menolak berhenti mencumbui bibir pantai, meski berkali-kali harus menjauh terbawa arus

by: @ditelvin #GorontaloUnite', '2023-06-14 20:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CtfvkWeJeBp/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 108, 0, 0, 1, 2),
  ('gorontalo.unite', 'Jika lelah, capek dari rasa senang-senang di Kota, coba jalan-jalan ke tempat yang tenang. Jika capek dengan keramaian, cobalah nikmati kedamaian.

bosan dengan penat, dan mengenyahkan pekat? pecahkan saja gelasnya biar ramai, biar mengaduh sampai gaduh. Kata si Cinta dalam AADC di tahun 2002.

Kenapa tak goyangkan saja loncengnya, biar terdera.  Atau aku harus lari ke hutan belok ke pantai?
⛰️🌳🌲🍃

Enjoyyyy. @yahyaakib #GorontaloUnite', '2023-06-14 19:15:00+08'::timestamptz, 'https://www.instagram.com/reel/Ctfm_MipWds/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 339, 0, 0, 3, 10),
  ('gorontalo.unite', 'Guys, jadi setiap harinya itu, di GrabFood ada promo loh. Diskon sampai dengan 15% yang berlaku di semua resto, cafe, rumah makan ataupun lainnya. 

Caranya mudah, masukin promo GRABFOOD15C setiap kali melakukan pemesanan makanan. Promo ini juga bisa digabungin dengan diskon ongkir pakai GRABUNLIMITED. 

Oh iyaa, promo berlaku setiap hari ini hanya berlaku di Gorontalo, Manado dan Palu. 

Jangan lupa juga follow instagram @grabsulawesiid biar gak ketinggalan info-info promo lainnya. 

#GRAB #GrabFood #PromoGrabFood #DiskonGrab #GrabUnlimited', '2023-06-14 18:30:00+08'::timestamptz, 'https://www.instagram.com/reel/Ctfh1g5pwOR/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 21, 0, 0, 0, 3),
  ('gorontalo.unite', 'Hidup seteduh pagi, kadang sekencang ombak. sedangkan malam, kurinai bagaikan lagi perjusami. 

🎥 @ruslimowuu #GorontaloUnite', '2023-06-14 17:24:00+08'::timestamptz, 'https://www.instagram.com/reel/CtfZ0XbA-Cs/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 298, 0, 0, 1, 6),
  ('biellysindua', 'Magnificent creatures 
.
.
.
Location : Gorontalo #whalesharkgorontalo
Moment Capt by Travel buddy @adhyy.s', '2023-06-13 23:20:00+08'::timestamptz, 'https://www.instagram.com/reel/CtdeHdxhmHl/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1259, 1, 0, 42, 0),
  ('gorontalo.unite', 'Sore-sore, suasana lagi ujan-ujan, minum hangat-hangat di @shava.beachresort, sambil menunggu sunset. Suasananya mendukung buat cari inspirasi. kalo lapar pun, ada makanan tersedia.', '2023-06-12 23:40:00+08'::timestamptz, 'https://www.instagram.com/reel/CtbE4yevzOe/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 148, 0, 0, 0, 4),
  ('gorontalo.unite', 'Dilihat dari sudut pandang berbeda, perjalanan ke arah Pantai Olele. Atau biasanya dilihat dari atas pesawat saat mau mendarat di Djalaludin Tantu Airport.

video: @cannalillye #GorontaloUnite', '2023-06-12 23:22:00+08'::timestamptz, 'https://www.instagram.com/reel/Cta5PAfgeLU/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 598, 1, 0, 7, 27),
  ('gorontalo.unite', 'kalo dari Bukit Dunu view-nya kepulauan, coba dari Pulau Popaya, pemandangannya beda lagi. 

vid: @rickyharyonodai_ #GorontaloUnite', '2023-06-12 18:57:00+08'::timestamptz, 'https://www.instagram.com/reel/CtaamnlA5Xc/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 641, 1, 0, 11, 34),
  ('gorontalo.unite', 'Kalo ke Boalemo, mampirlah ke @villa.kencana. Kemarin @ichamaknopagaralam cerita, kalo sekalinya nyobain jetski, sepertinya akan ketagihan 😎

Boleh juga nih, tag warga masyarakat lainnya. wkwkwk
tag @steven.sumardi yg videoin, tag @alhamprasogo juga 

#GorontaloUnite', '2023-06-12 01:00:00+08'::timestamptz, 'https://www.instagram.com/reel/CtYgIF6PCP2/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 397, 0, 0, 8, 5),
  ('gorontalo.unite', 'Air Terjun Taludaa ini benar-benar tersembunyi tempatnya, jauh dari keramaian kota apalagi. 

Bicara keheningan suatu tempat, ada satu olahraga yg banyak cabangnya, diminati banyak orang dan cocoklah dilakukan disini. Yoga. 

Tapi tidak disarankan untuk ibu hamil kesini, untuk apa juga. Sekedar menikmati alam sekitar sini, termasuk olahraga juga. Perjalanan ada yg melelahkan dan menguras energi. 

🎥 @de_jenglen #GorontaloUnite', '2023-06-11 22:11:00+08'::timestamptz, 'https://www.instagram.com/reel/CtX6WnPPuRj/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 486, 1, 0, 12, 24),
  ('srydunggio__', 'Ada vila adem ayem nih gays.. recomended buat yg mau liburan bareng Keluarga atau bersama bestieww kalian 🌤️🏔️
.
.
.
.
@roemahkeboendulamayo_ 
@roemahkeboendulamayo_', '2023-06-11 19:10:00+08'::timestamptz, 'https://www.instagram.com/reel/CtX31G0rnL9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 895, 0, 0, 68, 0),
  ('deddy_iteneps', 'NEW SINGLE “STUGGLE” Deddy Bakir.
Available now : IG, FB, SPOTY, JOOX, TIKTOK, dll.. 
#struggle #berjuang #tetapsemangat #motivasi #semangatkerja #semangatcarirejekihalal #pantangmenyerah #berdiridikakisendiri #bismillah #janganmenyerah', '2023-06-11 03:38:00+08'::timestamptz, 'https://www.instagram.com/reel/CtWKxf_hNwm/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 341, 1, 0, 9, 0),
  ('gorontalo.unite', 'Jajan Hemat Di GrabFood???!!!😱😱🥺

GrabFood lagi ada promo Raja Hemat Grabfood🎉 dannn kalian bisa dapetin banyak promo dan diskon lohhh🙌🙌

Plusss kalian juga bisa dapet GratisOngkir dengan aktifkan paket GrabUnlimited lohhh😁!!
Caranya gampang lohhh dan kalian bayar nya cuma 0 rupiah alias gratis untuk pembelian pertama !!🎉🙌

Ayooo langsung ajaa jajan hemat di GrabFood dan dapetin promoo dan diskon yang menarik di kotamu yaaa!! 🤗🤗

#GrabFoood #Grab #PromoGrabFood #DiskonGrab', '2023-06-09 19:00:00+08'::timestamptz, 'https://www.instagram.com/reel/CtStXTvBt-x/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 27, 0, 0, 0, 1),
  ('biellysindua', 'Sea Flower Salvador Deli at Olele Marine National Park Gorontalo  its Huge
.
.
.
Tahx Buddy @adhyy.s @andy_the_13 
.
.
#olelemarineparkgorontalo #gorontalo #gorontaloadventure  #gorontalounite', '2023-06-08 18:48:00+08'::timestamptz, 'https://www.instagram.com/reel/CtQG7UiBmOI/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 2050, 0, 0, 18, 0),
  ('gorontalo.unite', 'Memang yang terbaik itu bersahabat dengan alam. Alam yang dimaksud disini alam lingkungan sekitar. Menariknya, dikunjungi saja, bukan ditinggali. Air Terjun Bondula atau Bonthula (d = th), Asparaga. 

🎥 @fahrikhadafix_ #GorontaloUnite', '2023-06-08 01:10:00+08'::timestamptz, 'https://www.instagram.com/reel/CtOOFt7PJ7b/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 864, 0, 0, 14, 26),
  ('gorontalo.unite', 'Pantai Biluhu Timur kalo dilihat dari sudut pandang berbeda. 
Didepan bisa menyelam, dibelakangnya bisa panjat tebing. kalo lapar tinggal pesan ikan kong bakar. 

🎥 @ditelvin #GorontaloUnite', '2023-06-08 00:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CtOI52hvBh1/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 837, 0, 0, 12, 25),
  ('deddy_iteneps', 'MAKAN SIANG PIDIS GAGA PICA SUAR PAR DENG COFFE DINGIN NANAWAU SKALI.. NIKMAT SKALI ❤️❤️❤️ #tinyhouse #makanan #makanmakan #makansiang #makanminum #food #fooddrink #nabo #askmecoffee #kerja #nikmatihidup #nikmati #gorontalo #gorontalohits #instamoment', '2023-06-06 23:23:00+08'::timestamptz, 'https://www.instagram.com/reel/CtLbTC1Bu6J/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 454, 0, 0, 72, 0),
  ('gorontalo.unite', 'Bagaimana dengan libur akhir pekannya yang panjang? tidak kemana-mana atau sudah kemana-mana?

video: @bobyny #GorontaloUnite', '2023-06-04 01:15:00+08'::timestamptz, 'https://www.instagram.com/reel/CtD7ZzOPyKx/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 417, 0, 0, 7, 9),
  ('gorontalo.unite', 'Dari 0 kilometer Gorontalo sampai ke Tangga 2000, cukup 10 menitan perjalanan. siang dan sore yang tidak terlalu panas, karena ada bukit yang menghalangi, bisa nambah asyik menikmati milu bakar sambil liat pemandangan laut.

video: @rizkymadjegu #GorontaloUnite', '2023-06-03 23:40:00+08'::timestamptz, 'https://www.instagram.com/reel/CtDwjWornmn/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 379, 0, 0, 4, 9),
  ('taufiq_hippy', 'Lagi ramai main ke puncak ceria Dunu, siapa yang udah kesini? #gorontalo #dunu #gorontaloviral #gorontalohits', '2023-06-02 19:46:00+08'::timestamptz, 'https://www.instagram.com/reel/CtAwXFohEmh/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1073, 1, 0, 73, 0),
  ('aldi.inaku', '🐴🐴

#berkuda #digorontaloaja #gorontalo', '2023-06-02 07:44:00+08'::timestamptz, 'https://www.instagram.com/reel/Cs_eQwtBDLf/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 218, 0, 0, 4, 0),
  ('gorontalo.unite', 'Sederhana saja, dimanapun harus ceria, seperti nama bukitnya. Bukit Dunu Ceria, Monano, Gorontalo Utara. Long weekend begini, cobain kesana. Sendiri atau ramai-ramai. 

video: @tulusanugraha_ #GorontaloUnite', '2023-06-02 02:54:00+08'::timestamptz, 'https://www.instagram.com/reel/Cs-8rseAf0E/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 2131, 6, 2, 172, 152),
  ('gorontalo.unite', 'Guys guyss...
Udah pada tau belum, kalo di "GrabFood" itu lagi ada promo loh. Promo-nya diskon sampai dengan 150rb. 

So, libur panjang begini, mager kemana-mana, pesan makanan di "GrabFood" ajah. Serbuin promo sepuasnya. Apalagi nih kalo pake GrabUnlimited, dapat gratis ongkir.

Jangan lupa juga nih, buat teman-teman follow Instagram @grabsulawesiid. Biar gak ketinggalan info-info promonya. 

#GrabFood #GrabUnlimited #PromoGrabFood #Grab', '2023-06-02 02:00:00+08'::timestamptz, 'https://www.instagram.com/reel/Cs-27UFg4Lx/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 49, 0, 0, 0, 1),
  ('gorontalo.unite', 'ada bahasa yang tak perlu diucapkan. alam lingkungan sekitar kita mengekspresikannya, dimengerti oleh setiap lapisan dimensi. 

mari merayakan hari libur, lebih dekat dengan alam sekitar. kalo belum sempat ke tempat yang jauh, bisa di halaman rumah. 

video: @lecka_smenkqiuw #GorontaloUnite', '2023-05-31 16:54:00+08'::timestamptz, 'https://www.instagram.com/reel/Cs7QTCEh0d8/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 832, 1, 0, 22, 23),
  ('gorontalo.unite', 'Suatu hari di Bukit Dunu Ceria (begitu pemerintah setempat menamakannya). Tempat terbaik buat menikmati sunset, sunrise and sunday. Jika sudah terwujud, jangan lupa bersujud. Maknanya, bersyukur. 

video: @whyurezhaldy #GorontaloUnite', '2023-05-31 03:01:00+08'::timestamptz, 'https://www.instagram.com/reel/Cs50Dfxgas1/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 77, 0, 0, 7, 3),
  ('gorontalo.unite', 'A day in my life, pengalaman treatment di ERHA Skin Gorontalo. 

Oh iyaa, sekedar cerita juga, sekarang ini banyak banget pilihan skin care routine yang malah buat kita jadi bingung, harus pilih yang mana? Banyak review bagus tapi ternyata gak cocok di kulit sendiri atau mau coba tapi gak siap dengan resiko-nya.

Nah, kali ini mimin review lagi salah satu tempat perawatan kulit yang ditangani oleh ahlinya di Gorontalo. Namanya ERHA . 

FYI aja yaa teman-teman. @erha.dermatology ini punya cabang diseluruh Indonesia dan berdiri lebih dari 23 tahun yang didukung oleh expert dermatologist, so terpercaya.

Di ERHA, sebelum kita memulai treatment, bisa konsultasi dulu dengan dokternya mengenai perawatan kulit apa yang bagus dan direkomendasikan untuk kulit kita. Misalnya dengan Active Acne Therapy ini, yang bermanfaat mengeluarkan sumbatan sel kulit mati dan mengekstraksi komedo.

Btw, Kalo mo datang di ERHA, pake saja aplikasi ERHA Buddy. So tersedia juga di iOS dan Playstore. Di aplikasi, kita bisa pesan produk ERHA, konsultasi dokter, atau mau konsultasi online dengan dokter

Dapatkan discount 10% dengan menggunakan kode #ERHAxGorontaloUnite

Untuk info lebih lanjut, bisa kunjungi
ERHA Skin Gorontalo
Jl. H. Nani Wartabone, No. 71 Kota Gorontalo
Whatsapp: 081241307749

#ERHAUltimate
#ERHASkinGorontalo', '2023-05-30 18:45:00+08'::timestamptz, 'https://www.instagram.com/reel/Cs47o2QvLYH/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 54, 1, 3, 0, 3),
  ('fhirmanohihiya', 'Semangat pagi para jiwa rebahan jangan lupa ngopi☕️🚬

📌puncak Dunu🌅
Desa Dunu kec.Monano

.

.
#gorontalo #gorontalounite #gorontaloutara #pesonagorontalo', '2023-05-28 18:53:00+08'::timestamptz, 'https://www.instagram.com/reel/CszybVHB0gO/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 481, 5, 0, 66, 0),
  ('gorontalo.unite', 'Di Tolinggula, Gorontalo Utara, banyak ditemukan Sub DAS (daerah aliran sungai) yang seperti ini. Ada yang soft sampai yang terjal dan bagus buat arung jeram, seperti di Papualangi, yang lokasinya tidak jauh dari Limbato sini.

Berada dekat dengan perbatasan Sulawesi Tengah, pegunungan dan hutan, bisa saja menjadikan kawasan sini, seperti halnya dengan sungainya yang suasana alamnya terasa. Bagus buat healing, tapi jaraknya lumayan jika ditempuh dari Marisa. 

📸 @wwantrianto_ #GorontaloUnite', '2023-05-25 23:28:00+08'::timestamptz, 'https://www.instagram.com/reel/CssjyE0A7AI/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 684, 0, 1, 34, 12),
  ('gorontalo.unite', 'Halo Sobat Honda Gorontalo!

New Honda Brio kini hadir di Kota Gorontalo lho! Siapa nih yang udah penasaran sama Si Kecil- kecil Cabe Rawit yang satu ini? Yuk saksikan langsung New Honda Brio di Citimall Gorontalo pada tanggal 25- 28 Mei 2023. Selain bisa lihat New Honda Brio dari dekat, banyak banget penawaran menarik seperti:

- DP mulai 5%
- Angsuran 2jt an
- Tenor hingga 8 tahun
- Free Biaya Perawatan Berkala
- Free Insurance All Risk up to 2 tahun
- Special Leasing Program 0%
- Sporty DNA Package

Selain itu banyak merchandise lucu yang bisa kamu bawa pulang juga!

Jangan sampai terlewat ya Sobat Honda! MinHo tunggu lho!

Honda 
The Power of Dreams!

#honda #hondaindonesia #hondaoutsidejava #HOJevent #hondabrio #hondabrioGorontalo #briocommunity #brionesia', '2023-05-25 23:24:00+08'::timestamptz, 'https://www.instagram.com/reel/CssiUaoAS7W/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 124, 0, 1, 0, 1),
  ('gorontalo.unite', 'Warna tidak pernah menghilang dari kota ini. Hitam dan putih masa lalu, tidak akan berlalu. Semua dimulai dari sini. Iya. Gorontalo berawal dari sini kok. 

📸 @anis_mustapa #GorontaloUnite', '2023-05-23 01:42:00+08'::timestamptz, 'https://www.instagram.com/reel/CslEr68gEVV/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 483, 0, 0, 1, 13),
  ('rdcwalenta', 'The Bitila is the perfect place to relax 🏝️🌊⚡️

#indonesia #wonderfulindonesia', '2023-05-20 05:03:00+08'::timestamptz, 'https://www.instagram.com/reel/Csdta5ngBAc/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 248, 1, 0, 2, 0),
  ('gorontalo.unite', 'Enjoy weekend. cuaca juga lagi bagus-bagusnya kalo sore. besok-besok, harus pantau update dari BMKG kalo kemana-mana, biar pas pulang malam-malam tidak kehujanan. 

📸 @whyurezhaldy ngajakin jalan, nanti bakalan dijadikan pemeran utamanya disetiap videonya.

📍Dionumo Island, di bagian Timur Sumalata. #GorontaloUnite', '2023-05-20 01:02:00+08'::timestamptz, 'https://www.instagram.com/reel/CsdRPj5Aqw_/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 197, 0, 0, 0, 5),
  ('gorontalo.unite', 'Cuaca hari ini rasanya adem, semalam hujan sampe subuh. Jadi ada rencana kemana, mumpung libur terjepit begini?

📸 @de_jenglen #GorontaloUnite', '2023-05-17 19:39:00+08'::timestamptz, 'https://www.instagram.com/reel/CsXjNqhA0Ft/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 269, 0, 0, 3, 2),
  ('gorontalo.unite', 'The real pindah rumah, bawa satu kali deng depe rumah, di Haya-Haya, Limboto Barat. 😀

📸 @rostin_baruadi #GorontaloUnite', '2023-05-16 23:56:00+08'::timestamptz, 'https://www.instagram.com/reel/CsVb23BgU8-/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 0, 1015, 0, 0, 18, 24),
  ('rully3_', 'Kepalaku tidak seberisik kemarin 🏡 

#Dkijalanjalan', '2023-05-16 01:40:00+08'::timestamptz, 'https://www.instagram.com/reel/CsTDDhyh6jn/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1019, 1, 0, 25, 0),
  ('gorontalo.unite', 'Hidden beachnya Biluhu Timur. Buat pecinta laut, pantai, gunung, perjalanan-perjalanan yang melelahkan. 

📸 @de_jenglen #GorontaloUnite', '2023-05-15 18:10:00+08'::timestamptz, 'https://www.instagram.com/reel/CsQZ3gUvHqa/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 777, 1, 0, 20, 25),
  ('gorontalo.unite', 'Enjoy weekend. 

Vibes di rumah kebun di Dulamayo, seperti berada di villa-villa mewah. Mewahnya karena suasana alamnya, segar-segar. Berhubung agak jauh dari laut, tapi dekat koala sudah bolehlah. 

📸 @rully3_ @dkijalanjalan_ #GorontaloUnite', '2023-05-14 02:21:00+08'::timestamptz, 'https://www.instagram.com/reel/CsN9rJnAScu/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 227, 0, 0, 3, 7),
  ('gorontalo.unite', 'Bukan gak banyak orang yang tau, tapi akses untuk sampai ke sini, Desa Owata di kawasan Bulango Ulu. Kawasan yang masih jarang tersentuh keramaian dan pembangunan (meskipun sekarang, ada bendungan besaaaaar sementara di bangun dekat sini). 

Rasanya seperti menanjak di bukit teletubies ya, tapi ini bukan tentang teletubies. Ada hal lain, pokoknya. 

📸 @anis_mustapa #GorontaloUnite', '2023-05-12 21:37:00+08'::timestamptz, 'https://www.instagram.com/reel/CsK486yAg7g/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 542, 0, 0, 9, 29),
  ('gorontalo.unite', 'Gorontalo Archery Squad bikin latihan rutin setiap Ahad pagi dari pukul 07:00 wita s.d selesai di bagian selatan GOR Nani Wartabone (belakang gawang bagian selatan atau dekat dinding pagar SMP negeri 1 Kota Gorontalo)

Yang berminat latihan bersama, matoduwolo. Pake kamari sapatu waa.. Infaq untuk latihan bersama sebesar 20K (bagi yang punya busur/unit sendiri) dan bagi yg belum punya busur/unit, infaq sebesar 30k

*jika busur (tersedia) utk pemula kami ready dilapangan*

📸 by @adi.ilahude // @gorontaloarcherysquad', '2023-05-12 19:13:00+08'::timestamptz, 'https://www.instagram.com/reel/CsKoFokAmf0/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 610, 0, 1, 35, 27),
  ('gorontalo.unite', 'Bawa pancing, pisang goreng panas, pake dabu-dabu pidis, dipinggir Danau Perintis, bikin hal-hal puitis. Danau ini terlanjur estetis, suasana pagi atau sorenya romantis. videonya oleh @anis_mustapa 

#GorontaloUnite', '2023-05-11 01:33:00+08'::timestamptz, 'https://www.instagram.com/reel/CsGJgOdoRhP/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 481, 0, 0, 8, 6),
  ('gorontalo.unite', 'Meskipun jauh yaa, mengunjungi tempat ini bisa memberikan pengalaman menyenangkan tersendiri. Terletak di Desa Bondula, Kecamatan Asparaga, Air Terjun Bondula ini menarik dijelajahi. 

Asparaga sebelah utaranya sudah masuk wilayah Sumalata, Gorontalo Utara. Tapi untuk sampai kesini disarankan lewat Boliyohuto saja. 

📸 @de_jenglen #GorontaloUnite', '2023-05-10 21:54:00+08'::timestamptz, 'https://www.instagram.com/reel/CsFxPnEomwj/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 840, 14, 0, 30, 44),
  ('fhirmanohihiya', 'Nyatanya matahari pagi,kopi,pantai dan pasir putih nikmatnya gak ada obat☕️🌅

.

.

#gorontalo #pesonaindonesia #pesonagorontalo #sulawesiutara', '2023-05-09 20:15:00+08'::timestamptz, 'https://www.instagram.com/reel/CsDAWJMBpR9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 408, 0, 0, 6, 0),
  ('gorontalo.unite', 'Di Gorontalo, bukan soal liburan mahal dan mewah, tapj tentang bagaimana meromantisasi hal-hal kecil, bersama-sama. Pagi-pagi siram kopi panas di Danau Perintis misalnya. 

re-edit yaa @fahrikhadafix_, teruslah bercerita dengan perjalanan menyenangkan. #GorontaloUnite', '2023-05-07 18:25:00+08'::timestamptz, 'https://www.instagram.com/reel/Cr9qic_gdWG/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 249, 0, 0, 3, 11),
  ('gorontalo.unite', 'ditemani @ditelvin kita jalan-jalan ke Tamendao Beach dulu, meskipun dari video ini. tempat-tempat yang jarang kita datangi, atau sebenarnya tidak pernah sama sekali. 

ada? ada dong. #GorontaloUnite', '2023-05-05 19:23:00+08'::timestamptz, 'https://www.instagram.com/reel/Cr4nf0HglAX/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 848, 0, 0, 10, 25),
  ('gorontalo.unite', 'Selamat pagi, selamat beraktifitas, cuaca pagi ini cerah, siangnya panas, malamnya adem. Gorontalo memang begitu, nano-nano suasananya. 

📸 @rostin_baruadi #GorontaloUnite', '2023-05-04 17:16:00+08'::timestamptz, 'https://www.instagram.com/reel/Cr1z9KfAyuF/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 480, 0, 0, 2, 12),
  ('gorontalo.unite', 'Ibu Rene Hiola, anak dari dr. Mansyoer Mohammad Dunda (di Gorontalo lebih familiar nama beliau dgn nama RSUD MM Dunda Limboto), puluhan tahun tinggal dan menetap di Jerman, masih tetap menguasai Bahasa Gorontalo. 

Dan ketemu sesama orang Gorontalo di negeri orang, apalagi luar negeri itu, nuansa dan suasananya gaga ee. Madelo hari raya. Asyik saja rasanya.

Sekedar info juga, dr. MM Dunda yang merupakan dokter pertama dari etnis Gorontalo, semua anak-anaknya juga dokter dan hampir semua tinggal di Jerman. dr. MM Dunda meninggal dunia di Jerman, tapi dimakamkan di Surabaya, Jawa Timur. 

video dari dari tiktok seorang dokter juga, dokter @dokrifki || info ttg Ibu Rene dari om @keysdunda_ #GorontaloUnite', '2023-05-03 23:06:00+08'::timestamptz, 'https://www.instagram.com/reel/Crz3Je-guYt/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 0, 1250, 0, 0, 29, 77),
  ('gorontalo.unite', 'Jika kita mundur 10 tahun ke belakang, akses transportasi di Batudaa Pantai setelah Desa Bongo hingga ke Biluhu itu sangat-sangat tidak nyaman untuk dilalui.

Sekarang, dari Kayubulan, Biluhu sampe Tantuyuo, akses jalannya bagus. jika ingin menjelajahi lagi, terus sampai Olimo''o di Biluhu sebelah Barat, kemudian masuk di Ambara, Dungaliyo. 

Btw, banyak tempat-tempat keren di pesisir Teluk Tomini ini. Kapan-kapan nanti kita cerita tentang perjalanan rasa kesini. 

📸 @abi_habibie (btw ini yang di video nama jalannya Jl. Rusli Habibie loh) 😀 #GorontaloUnite', '2023-05-03 21:28:00+08'::timestamptz, 'https://www.instagram.com/reel/Crzr-RqAI3s/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 1006, 0, 0, 21, 45),
  ('gorontalo.unite', 'Fyi guys, ini menarik. Jadi konsepnya Tumbilotohe mulolo era 80''an. Benar-benar old school banget pokoknya. Karena mulolo ~ masa lampau, kita diajak nostalgia tentang bagaimana suasana tumbilotohe di era itu. 

Teman-teman yang mau menikmati konsep tumbilotohe berbeda hasil kreasi karang taruna setempat, bisa kesini. Di Desa Talango, Kecamatan Kabila. 

Rutenya: trus ke arah Jl. Tinaloga, kemudian belok kanan Malioboro arah Kabila & Suwawa. pas ketemu simpang empat yang belok kiri ke arah Meranti, kalian belok kanan saja. So mo maso-maso Talango itu. 

Cusss, tumbilotohe to hulonthalo 80''an. Itung2 nostalgia. #GorontaloUnite', '2023-04-17 23:57:00+08'::timestamptz, 'https://www.instagram.com/reel/CrKw1tuAbO7/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 0, 666, 8, 0, 10, 23),
  ('gorontalo.unite', 'Desa Tambo''o, Tilongkabila mulai bersolek menyambut tumbilotohe, night a million light, yang diinisiasi warga muda yang tergabung dalam Karang Taruna Desa Tambo''o @ktm_tamboo. 

Teman-teman kalo ada waktu luang, co nanti pasiar kasana. Soalnya tiap tahun dorang pe gebrakan keren-keren. #GorontaloUnite', '2023-04-15 06:31:00+08'::timestamptz, 'https://www.instagram.com/reel/CrDv2q3A-UL/', 'Reel', 'Culture', false, 'portrait', false, 'published', 0, false, 0, 0, 1310, 2, 0, 54, 46),
  ('gorontalo.unite', 'salah satu hal yang menyenangkan bagi para perantau saat pulkam adalah healing di kampung sendiri, dgn suasananya, lingkungannya, keunikannya, semuanya. 

syukur-syukur kalo di dekat rumah di kampung ada view beginian. kalo cuaca adem, bisa betah berlama-lama. asal ada colokan & wifi. 

📀 @ilyas_mohamad23 #GorontaloUnite', '2023-04-15 00:05:00+08'::timestamptz, 'https://www.instagram.com/reel/CrDDuJ5SqfQ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 772, 0, 0, 23, 40),
  ('gorontalo.unite', 'perjalanan-perjalanan menyenangkan saat balik ke rumah, entah setelah ngabuburit, pulang kantor atau dari rantau. menyenangkan karena capek itu ilang pas sampe rumah. 

Btw ini Jembatan Uabanga di Bone Pante terus dikebut pengerjaannya yaa. kan arus lalu lintas Jl. Trans Sulawesi mulai rame deng arus mudik lebaran. Meskipun jalur Selatan Gorontalo ini tidak seramai jalur Pantai Utara (Pantura) Gorut dalam hal arus mudik. 

vids: @hidayatullah_daud #GorontaloUnite', '2023-04-12 01:38:00+08'::timestamptz, 'https://www.instagram.com/reel/Cq7ftEkoSLu/', 'Reel', 'News', false, 'portrait', false, 'published', 0, false, 0, 0, 927, 0, 0, 34, 21),
  ('gorontalo.unite', 'Awal Bulan Waktunya Belanja Baju Lebaran

Warga Gorontalo, bingung libur panjang mau kemana?
Ada kabar baik nih karena Erigotour masih berlangsung di kota kamu! Kamu bisa Beli baju banyak tapi tetap hemat dengan Promo PAY 1 GET 3.

📍City Mall Gorontalo

Yuk langsung datang dan jangan lupa ajak keluarga dan teman-temanmu. Sampai bertemu ya!

info selengkapnya cek @erigostore dan @erigotour.', '2023-04-06 01:41:00+08'::timestamptz, 'https://www.instagram.com/reel/CqsDcqZAF9E/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 58, 0, 0, 0, 2),
  ('gorontalo.unite', 'Salah satu perjalanan menyenangkan biasanya menyusuri jalan-jalan yang penuh kenangan. Dia punya memori tersendiri. Misalnya kan dengan suasana ngabuburit dari kawasan Puncak, Pulubala sampe Tibawa. singgah takjil sebentar, trus lanjut ke Limboto.

Oh iya. di kawasan Bundaran Taman Patung BJ Habibie dekat Bandara Djalaludin Tantu, kadang ba abu banyak skali. Harus ada pohon-pohon banyak, baru bagus suasananya. 

video by: @orangsusah17 #GorontaloUnite', '2023-04-04 00:36:00+08'::timestamptz, 'https://www.instagram.com/reel/CqmxbRZgTCs/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 443, 0, 1, 1, 15),
  ('gorontalo.unite', 'Suasana pagi di tepian Danau Perintis Suwawa tidak kalah dengan suasana hangatnya sore di sekitaran danau. Setiap tempat punya waktu terbaiknya masing-masing. 

video by @fathirmohi23 #GorontaloUnite', '2023-03-29 16:25:00+08'::timestamptz, 'https://www.instagram.com/reel/CqZCTwjShxq/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 759, 1, 0, 19, 35),
  ('gorontalo.unite', 'Coffee shop sekitaran sini bagus. Apalagi dengan konsep working space begini yaa. Bagus karena dekat dengan Alfamart/Indomaret, ATM BNI, BCA, BRI, Mandiri, Bank Sulut, dan ATM LinkAja, trus dekat dengan Masjid Agung Baiturrahman Limboto. Jalan kaki saja.

Tropical Space menyambut ramadan yang penuh berkah dengan berbagi suasana tempat yang nyaman saat buka puasa, setelah taraweh sambil menikmati buku bacaan di mini library-nya asyik juga. Tambah segelas coffee latte misalnya. 

Masukin dalam referensi ah, sebagai tempat bukber nanti. 
@adi.ilahude #GorontaloUnite', '2023-03-21 22:16:00+08'::timestamptz, 'https://www.instagram.com/reel/CqFEBImgAnz/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 292, 0, 0, 5, 19),
  ('gorontalo.unite', 'Enjoy the trip yaaa, anak-anak Daerah Khusus Isimu. HuHa, di Moluo, Kwandang ini bisa jadi salah satu kepingan surga tersembunyi di Gorontalo. Surga bagi investor suatu saat jika ingin mengembangkan lebih baik lagi, sapa tauuu. 😅

Ramadan 1 malam lagi, nanti giliran mimin yang akan trip lagi ke Warkop DKI setelah taraweh. Kalo ngabuburit ke pulau-pulau begini seru juga, selain melelahkan, tiba pas waktu buka puasa pasti tambah seru. 

by: @rully3_ @dkijalanjalan_ supported by @dki.coffee', '2023-03-21 01:45:00+08'::timestamptz, 'https://www.instagram.com/reel/CqC2ZxkgF_1/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 397, 0, 0, 13, 15),
  ('gorontalo.unite', 'Malam ini, pukul 8pm, @hulonthalo.string.orchestra menggelar sebuah pertunjukan musik yang bertajuk LIRIH di El Hajj Convention Center (kawasan Mess Hajii Kota Gorontalo).

Teman-teman yang belum dapat tiket, tiketnya tersedia di lokasi, mulai pukul 1 siang ini. HTM Regular 35K, Premium 100K. 

See u tonight.', '2023-03-19 19:57:00+08'::timestamptz, 'https://www.instagram.com/reel/Cp_qKQyohiW/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 41, 0, 0, 0, 1),
  ('rifaldius', 'Ditelantarkannya mimpi dan rencana ke sepanjang jalan yang tak dilalui lagi berdua
Dengan sesal yang masih menghias pusara
Pemakaman jiwa yang pernah kau hidupkan
Sekumpulan kecewa dari hal-hal yang kita janjikan
Musnah
Terukir dalam batin yang mengais hadir
Terkunci dalam darah yang mengalir getir
•
📍 Desa owata, Bulango ulu , Bonebolango
•
#gorontalounite #gorontalo', '2023-03-18 00:27:00+08'::timestamptz, 'https://www.instagram.com/reel/Cp69YMSJwVY/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 322, 0, 0, 0, 0),
  ('gorontalo.unite', 'Desa Torosiaje atau dikenal juga perkampungan warga Suku Bajo di ujung barat Gorontalo. Perjalanan sekitar 618 meter dari daratan untuk sampai ke desa ini. Meskipun berada di atas air, kehidupan disini sama halnya dengan yang di daratan. ada rumah-rumah, sekolah, masjid, dll. 

Mau nginap semalam, dua malam atau berapa malam? Boleh. Warga sekitar ada yang menyediakan homestay. Mulai dari Rp. 100.000/malam ada. Enjoy yaa. 

by @aldi.inaku dan rombongan studi tour. #GorontaloUnite', '2023-03-17 22:10:00+08'::timestamptz, 'https://www.instagram.com/reel/Cp6wUzTOCM7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 446, 0, 1, 2, 7),
  ('gorontalo.unite', 'Desa Malambe di Ponelo Kepulauan ini tidak berada di pulau, karena tempatnya masih terhubung dengan daratan dari arah Pelabuhan Kwandang. Biasanya, kalo ke Pulau Saronde, kita akan menikmati pinggiran Kepulauan Ponelo disepanjang perjalanan. Menjelajahi Desa Malambe menyenangkan karena kiri kanan ada banyak mangrove sebelum sampai ke lautan lepas. video @fhirmanohihiya #GorontaloUnite', '2023-03-17 20:50:00+08'::timestamptz, 'https://www.instagram.com/reel/Cp6mEeFgIT9/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 367, 0, 0, 0, 10),
  ('gorontalo.unite', 'Hulonthalo String Orchestra bakalan ada hajatan menarik yang bertajuk "Lirih", sebuah pertunjukan musik yang dipersembahkan HSO untuk kita semua. 

Catat tanggal mainnya, Senin, 20 Maret 2023 di El Hajj Convention Center, Kota Gorontalo. Jangan sampe kehabisan tiketnya, he''o. 

Dukung terus karya anak lokal, @hulonthalo.string.orchestra #GorontaloUnite', '2023-03-11 03:00:00+08'::timestamptz, 'https://www.instagram.com/reel/CppWwLjOGTn/', 'Reel', 'Event', false, 'portrait', false, 'published', 0, false, 0, 0, 55, 0, 0, 0, 1),
  ('gorontalo.unite', 'Bagi @nayahaddar, salah satu kebahagiaan yang murni itu seperti berada di tepi pantai, saat senja perlahan terbenam. 

10-11 hari lagi, kebahagiaan orang-orang menjelang senja akan tiba. senja menjelang waktu berbuka puasa. Insya Allah, seperti ketemu @imamducks setelah taraweh di masa pandemi.', '2023-03-11 01:55:00+08'::timestamptz, 'https://www.instagram.com/reel/CppPSSlOAC7/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 162, 0, 0, 0, 2),
  ('rifaldius', 'Sore - sore duduk di danau perintis sambil ngopi, liat orang beraktivitas bercanda, bergurau dan bercinta, hidup ga melulu soal uang kan ?

“Saya rasa, manusia yang beruntung itu bukan yang punya segalanya, tapi yang bisa mensyukuri ke-apa-adaannya.”

#gorontalo #gorontalounite', '2023-03-07 01:42:00+08'::timestamptz, 'https://www.instagram.com/reel/Cpe6D7ROaaJ/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 291, 0, 0, 0, 0),
  ('gorontalo.unite', 'Bendi, moda transportasi tradisional yang sempat berjaya di Gorontalo ini dianggap mencemari lingkungan, sampai akhirnya sekitar awal tahun 2000-an, populasi Bendi yang banyak mulai tergantikan oleh becak motor alias Bentor. 

Kehadiran Bentor pun sempat mendapat penolakan, apalagi dari para kusir bendi dan juga para penumpang yang merasa bentor tidak safety. Waktu terus berjalan, bentor memulai inovasi dan memperhatikan keamanannya, dan bendi dianggap tidak bisa untuk perjalanan jarak jauh, pilihan transportasi warga pun berubah.

Meskipun bentor menjamur di Gorontalo 5 tahun berikutnya, tetap saja masih banyak yang menggunakan bendi dengan sistem carteran, antar jemput ke sekolah, dll. Sekarang bendi boleh dikatakan hampir punah, karena kesesuaian zaman yang menuntut semua serba cepat.

Punya kenangan dengan bendi? Kenangan masa lalu saja itu.
video by: @maman_jabel #GorontaloUnite', '2023-03-06 21:30:00+08'::timestamptz, 'https://www.instagram.com/reel/Cped2YkScqi/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 780, 0, 0, 12, 18),
  ('gorontalo.unite', 'Salah satu tempat ngopi jauh sambil menikmati pemandangan matahari sore terbenam, Pantai Oluhuta, Bone Bolango. Dibalik keindahanya, ada batu karang yang bisa melukai kalo tidak berhati-hati. Enjoy pokoknya deh. 

By: @daeng_manji #GorontaloUnite', '2023-03-05 23:50:00+08'::timestamptz, 'https://www.instagram.com/reel/CpcJDlZujZZ/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 648, 0, 0, 1, 25),
  ('gorontalo.unite', 'Sore-sore di Danau Perintis Suwawa makin kesini makin terasa nyaman di nikmati yaa. Masukin dalam list ah, nanti bulan Ramadhan ngabuburitnya disini. 

video: @rbenawan #GorontaloUnite', '2023-03-04 00:30:00+08'::timestamptz, 'https://www.instagram.com/reel/CpXECGlSkgi/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 553, 0, 0, 2, 10),
  ('gorontalo.unite', 'Kalo ditarik mundur beberapa tahun ke belakang, untuk sampai di Benteng Otanaha ini harus menaiki 348 anak tangga dengan 4 pos persinggahan. Kalo bulan puasa, biasanya orang rame-rame abis subuh jalan-jalan kesini. Naik tangga sampe di benteng. Cuman kalo melihat situasi, bagusnya sore. Nanti kan disajikan view sunset diatas Danau Limboto yang berkilauan juga.

Sekarang sudah dibuatkan akses jalan untuk kenderaan bisa sampai ke atas. Parkiran rapi, akses masuk jadi menarik, bayar Rp. 10.000 saja. 

video: @tarinaminusta #GorontaloUnite', '2023-03-03 21:15:00+08'::timestamptz, 'https://www.instagram.com/reel/CpWtwDfyfGg/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 451, 1, 0, 0, 11),
  ('gorontalo.unite', 'Akhirnya yaa, bisa bermain bercanda berenang bersama dengan whaleshark yang banyak ditemui di kawasan Indonesia Timur, salah satunya di Botubarani, Gorontalo. 

Kalo ada yang belum pernah berenang bersama spesies ikan besar pemakan plankton ini, cobalah sesekali. Ajak yang sudah pernah. Biar bisa seseru perjalanan @kesinijo_palu saat di Gorontalo. #GorontaloUnite', '2023-03-03 19:15:00+08'::timestamptz, 'https://www.instagram.com/reel/CpWgABPy0Z4/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 819, 0, 0, 10, 22),
  ('gorontalo.unite', 'Pagi-pagi ke Pantai Tihu, Bonepantai, Bone Bolango, suasananya adem, kalo sore lebih hangat lagi ditambah dengan sajian sunsetnya. 

Sekitar 59 menit perjalanan dari arah Kota Gorontalo, begitu sampe jangan lupa bayar tiket masuk 3000 dan juga bisa sekalian berkemah di lokasi. (pake di gazebo bayar 35.000)

Kalo siang-siang begini di sekitaran Pantai Tihu makan ubi rubus panas-panas colo dabu-dabu pidis. Ah, pe sadap pica-pica suar.

by: @tarinaminusta #gorontalounite', '2023-02-18 19:25:00+08'::timestamptz, 'https://www.instagram.com/reel/Co1CYI2AGKh/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 1505, 3, 1, 29, 175),
  ('deddy_iteneps', 'Danau perintis pada waktu itu. Skarang lebe gaga 😍😍#danauperintisgorontalo #danauperintis #bonebolango #suwawabonebolango #gorontalohits #gorontalo #liburan #liburangorontalo #jalanjalan #healingvibes #healing', '2023-02-18 04:33:00+08'::timestamptz, 'https://www.instagram.com/reel/Cozb8wwhT2g/', 'Reel', 'Culinary', false, 'portrait', false, 'published', 0, false, 0, 0, 1291, 0, 0, 46, 0),
  ('gorontalo.unite', 'Halo teman-teman, kali ini kita review lagi pengalaman treatment di ERHA Skin Gorontalo. 

Oh iyaa, sekedar cerita juga, sekarang ini banyak banget pilihan skin care routine yang malah buat kita jadi bingung, harus pilih yang mana? Banyak review bagus tapi ternyata gak cocok di kulit sendiri atau mau coba tapi gak siap dengan resiko-nya.

Nah, kali ini mimin review lagi salah satu tempat perawatan kulit yang ditangani oleh ahlinya di Gorontalo. Namanya ERHA . 

FYI aja yaa teman-teman. @erha.dermatology ini punya cabang diseluruh Indonesia dan berdiri lebih dari 23 tahun yang didukung oleh expert dermatologist, so terpercaya.

Di ERHA, sebelum kita memulai treatment, bisa konsultasi dulu dengan dokternya mengenai perawatan kulit apa yang bagus dan direkomendasikan untuk kulit kita. Misalnya dengan Active Acne Therapy ini, yang bermanfaat mengeluarkan sumbatan sel kulit mati dan mengekstraksi komedo.

Btw, Kalo mo datang di ERHA, pake saja aplikasi ERHA Buddy. So tersedia juga di iOS dan Playstore. Di aplikasi, kita bisa pesan produk ERHA, konsultasi dokter, atau mau booking jadwal konsultasi online. 

Untuk info lebih lanjut, bisa cek instagram @erha.dermatology / atau chat di WhatsApp 𝟬𝟴𝟭𝟭-𝟮𝟭𝟮𝟭-𝟮𝟭𝟮𝟭 

#ERHAUltimate', '2023-02-06 03:00:00+08'::timestamptz, 'https://www.instagram.com/reel/CoUYg-3uJoV/', 'Reel', 'Sponsored', true, 'portrait', false, 'published', 0, false, 0, 0, 142, 0, 0, 1, 5),
  ('gorontalo.unite', 'Jalan-jalan sekitar pantai itu menyenangkan, ada nostalgia bagi yang terlibat perasaab, tapi seringkali memotivasi seseorang untuk berpikir dan berkreativitas juga. 

Caption buat @nayahaddar yg menuangkan lewat lagu-lagu dan @vian_adam melalui kreativitas sudut pengambilan gambarnya. 😄

kalo suasana pantai begini di Gorontalo paling bagus dibagian utara, karena tepi pantainya didominasi pasir halus. Kalo bagian selatan banyak terumbu karangnya. 

Lokasi: Pantai Minanga, Ds. Kotajin, Atinggola, Gorontalo Utara #GorontaloUnite', '2023-02-06 01:13:00+08'::timestamptz, 'https://www.instagram.com/reel/CoUMF8Ag4F5/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 248, 0, 0, 2, 7),
  ('gorontalo.unite', 'Yang suka bertualang jauh, mungkin Air Terjun Bondula di Desa Bondula, Kecamatan Asparaga ini cocok didatangi. Sekitar 3-4 jam perjalanan dari Kota Gorontalo. Tidak jauh dari kawasan air terjun ini juga terdapat lokasi camping botu kapali bihe. Masih satu kecamatan tapi beda desa. 

Masih banyak tempat menarik lainnya harus dijelajahi. Enioy weekend. 

video: @hariyantomanihiya #GorontaloUnite', '2023-02-03 18:45:00+08'::timestamptz, 'https://www.instagram.com/reel/CoOWSH9Syw4/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 896, 0, 0, 23, 49),
  ('gorontalo.unite', 'info menarik nih buat teman-teman dari announcer keren kita, @nissamoh. kalo lagi mau cari tempat buat stay & vacation sekaligus, bisa ke kawasan puncak Dulamayo, Telaga Biru. fasilitasnya lumayan lengkap, jadi tinggal datang saja. #GorontaloUnite', '2023-01-21 21:56:00+08'::timestamptz, 'https://www.instagram.com/reel/CntJ1UQhTu8/', 'Reel', 'Tourism', false, 'portrait', false, 'published', 0, false, 0, 0, 966, 0, 0, 27, 91),
  ('gorontalo.unite', 'Perjalanan-perjalanan yang menyenangkan, bisa kemana saja yang penting senang. ke Mini Waterfall Zuriati di Monano, Gorontalo Utara misalnya.

video @refvisual_ #GorontaloUnite', '2023-01-07 19:15:00+08'::timestamptz, 'https://www.instagram.com/reel/CnI36EjBYw3/', 'Reel', 'Lifestyle', false, 'portrait', false, 'published', 0, false, 0, 0, 551, 0, 0, 14, 19)
) as v(
  account_username, description, publish_time, permalink, post_type, category,
  sponsored, orientation, editor_choice, status, display_order, featured,
  views, reach, likes, shares, follows, comments, saves
)
on conflict (permalink) do nothing;

update public.reels
   set thumbnail_url = '/reels/' || substring(permalink from '/(?:reels|reel|tv|p)/([A-Za-z0-9_-]+)') || '.webp'
 where thumbnail_url is null
   and substring(permalink from '/(?:reels|reel|tv|p)/([A-Za-z0-9_-]+)') in (
     'C00jjRGRSrP',
     'C03srhSyhQs',
     'C05VTp2BHhs',
     'C08X_zyye0-',
     'C0DrAPFuDuS',
     'C0LVmynh9jY',
     'C0Q708SB1ch',
     'C0RNYppP-RS',
     'C0UC_DwB9Qz',
     'C0iPTgByGp9',
     'C0jONLkxZ4H',
     'C0v1Hzwhthq',
     'C0vulc-hLDz',
     'C0xnLmiSmNY',
     'C1Jti-KxmOd',
     'C1T_JwHB6Wi',
     'C1UE2-HL9Pv',
     'C1ZhE8rBjH2',
     'C1eKdhux51f',
     'CYxSkQIhQe5',
     'CZ08Ivph-I0',
     'CZi0HReBn0x',
     'CZnsEjxhqbw',
     'CZqowTshQgf',
     'CaBrh8GgiOV',
     'Cab5sucA4aX',
     'Calj3vjgjAT',
     'Cb290nZg8bW',
     'Cc96Wu2A2Kc',
     'Cc9nWwAAmFL',
     'CcAKhVQAEiI',
     'Cccd-wIAp7F',
     'CchqAJcAWkt',
     'CdAQtUGgjbq',
     'Ce2OK4OAH5g',
     'Ce3AlipBd07',
     'CecglUCrgns',
     'CefMKe9h5ml',
     'CegzPvHhDYq',
     'CervO8sAvDH',
     'Cf7mixGAaiU',
     'Cf8VwJ9gMY8',
     'CfJEzy7AM5S',
     'CfOF-00gH42',
     'CfbQoZNgzO-',
     'CfdhsWbACx-',
     'CfnWx5LAsc0',
     'CfsNlKwgfV5',
     'Cfsu_rzAopJ',
     'CftN46PAEvc',
     'CgB9VHGBEX9',
     'CgGpVkKgBml',
     'CgIxxsmgYrc',
     'CgTebDnATXk',
     'CgTmnUIA8-B',
     'CgWCtYAAekD',
     'CgWjKQfB5Rb',
     'Cgd8R1ugVd1',
     'Cgqw0V-AoV-',
     'Ch-4cERADzN',
     'Ch3Qb27B8x1',
     'ChEm8-AAyY3',
     'ChJ1ycyAx1C',
     'ChN8Gr2A6iT',
     'ChOPHR9AYjv',
     'ChVzZazgham',
     'ChWFAbAADWV',
     'ChYpOc5AC0Y',
     'ChZbcnOAmim',
     'Cha6Xb-Axud',
     'ChvaqA_A1aD',
     'ChwfJyMgGLP',
     'CiCMw69gqdA',
     'CiDHJAKpoek',
     'Cib9QCqg37d',
     'CieegikgBzs',
     'CiozWqVgd9t',
     'Cir6jswA0G-',
     'Cj142cJgDwZ',
     'CjMiCYZAHRN',
     'CjMrwphAEBY',
     'CjMsjFKAWSZ',
     'CjOwWzjgJ3S',
     'CjPRH2mAd1_',
     'CjtzOLFgtay',
     'Ck-ESFZAWZ6',
     'Ck40oXTAO3y',
     'CkDNeUjALZq',
     'CkhHlKXgcJY',
     'Ckr72sbAXwU',
     'CkzxyqoAm42',
     'Cl-1nhJA553',
     'ClDX-0yA8tn',
     'ClGEYuRvw_K',
     'ClZ-6eKBWee',
     'Cle4OXKgyFx',
     'ClhrXivgL2s',
     'ClnrdrLP-vg',
     'CmLXrDDAkRl',
     'CmOCCuVo9ou',
     'CmYdm7Ig4NU',
     'CmlZB-Pqj0o',
     'Cmv--5KhZ3L',
     'CnI36EjBYw3',
     'CntJ1UQhTu8',
     'Co1CYI2AGKh',
     'CoOWSH9Syw4',
     'CoUMF8Ag4F5',
     'CoUYg-3uJoV',
     'Cozb8wwhT2g',
     'Cp69YMSJwVY',
     'Cp6mEeFgIT9',
     'Cp6wUzTOCM7',
     'CpWgABPy0Z4',
     'CpWtwDfyfGg',
     'CpXECGlSkgi',
     'Cp_qKQyohiW',
     'CpcJDlZujZZ',
     'Cpe6D7ROaaJ',
     'Cped2YkScqi',
     'Cpo34GKO4IK',
     'Cpo37bpyMkv',
     'CponPibgqf9',
     'CppPSSlOAC7',
     'CppWwLjOGTn',
     'Cq7ftEkoSLu',
     'CqC2ZxkgF_1',
     'CqDLNywgmbw',
     'CqFEBImgAnz',
     'CqZCTwjShxq',
     'CqmxbRZgTCs',
     'CqsDcqZAF9E',
     'Cr1z9KfAyuF',
     'Cr4nf0HglAX',
     'Cr9qic_gdWG',
     'CrDDuJ5SqfQ',
     'CrDv2q3A-UL',
     'CrKw1tuAbO7',
     'Crz3Je-guYt',
     'Crzr-RqAI3s',
     'Cs-27UFg4Lx',
     'Cs-8rseAf0E',
     'Cs47o2QvLYH',
     'Cs50Dfxgas1',
     'Cs6Qul5A9uc',
     'Cs7QTCEh0d8',
     'CsDAWJMBpR9',
     'CsFxPnEomwj',
     'CsGJgOdoRhP',
     'CsK486yAg7g',
     'CsKoFokAmf0',
     'CsN9rJnAScu',
     'CsQZ3gUvHqa',
     'CsTDDhyh6jn',
     'CsVb23BgU8-',
     'CsXjNqhA0Ft',
     'Cs_eQwtBDLf',
     'CsdRPj5Aqw_',
     'Csdta5ngBAc',
     'CslEr68gEVV',
     'CssiUaoAS7W',
     'CssjyE0A7AI',
     'CszybVHB0gO',
     'Ct1e5ZjAm1m',
     'Ct2-Faxgfpz',
     'Ct3SCUWgn8X',
     'Ct5ajRZuQCD',
     'Ct8xRBjhnlw',
     'Ct9NGjkgi2q',
     'CtAwXFohEmh',
     'CtD7ZzOPyKx',
     'CtDtTzAADY3',
     'CtDwjWornmn',
     'CtLbTC1Bu6J',
     'CtOI52hvBh1',
     'CtOOFt7PJ7b',
     'CtQG7UiBmOI',
     'CtStXTvBt-x',
     'CtWKxf_hNwm',
     'CtX31G0rnL9',
     'CtX6WnPPuRj',
     'CtYde8OgnBW',
     'CtYgIF6PCP2',
     'Ct_O24wOFHc',
     'Ct_S2ylOzBw',
     'Cta5PAfgeLU',
     'CtaamnlA5Xc',
     'CtbE4yevzOe',
     'CtbGnkSBBjj',
     'CtcqgaKB96I',
     'CtdeHdxhmHl',
     'CtfZ0XbA-Cs',
     'Ctfh1g5pwOR',
     'Ctfm_MipWds',
     'CtfvkWeJeBp',
     'CtgB6eHAzfw',
     'CtgWCTkA9Vg',
     'CtgbnjjOZtc',
     'CtitNOyAThT',
     'CtllzruJX-I',
     'Ctp5m0QPbSn',
     'CtqYQx3Acn_',
     'Cts5gQxBEpf',
     'CtsTEV4P00B',
     'CttJ4RGJdjd',
     'CttbjTEhLzC',
     'CtvxjxpSi4m',
     'CtyTxSagrPv',
     'Cu-68xFhcdG',
     'Cu07kCIhF-R',
     'Cu1MqtgB2Tf',
     'Cu1eDgch2Hi',
     'Cu3-piWhWJ7',
     'Cu3CeQphC3M',
     'Cu87KMiB_rM',
     'Cu8Ear4tnYe',
     'Cu8SvuRhMtH',
     'CuGjq7gBJLF',
     'CuOahucyARB',
     'CuOd4JtSf7U',
     'CuOyfdFyshP',
     'CuPSoCYyHWB',
     'CuUTSQ_g4F9',
     'CuWS-YqBZD3',
     'CuX7X5-BYQD',
     'CuY5JsehFSN',
     'CuZCTgihhpe',
     'Cu_IR_fPCk7',
     'Cud6M4_BC-f',
     'CudbzVKBLu5',
     'CueBlTgBkeo',
     'CueNicUBaXG',
     'CujlDq3hH8H',
     'CulDYTRJ68N',
     'CulNmalhsN3',
     'Culb4bHhD0e',
     'CulxtwShfKf',
     'CumKuijgpwM',
     'Cusnl-HByDB',
     'Cuv3p0nBbMM',
     'Cuyv9nKBha_',
     'Cv15GGSsEGs',
     'Cv4lkA0hQGM',
     'Cv573VFh5rS',
     'Cv8pyzYvG51',
     'Cv8vW21NedN',
     'CvCJYl6htx4',
     'CvD6L67tw7J',
     'CvE0GyfhKdk',
     'CvEYq8OBR5N',
     'CvG8WYUhA5s',
     'CvHJrlDB0js',
     'CvJ0C7ZhKHW',
     'CvL-k9lhdmo',
     'CvO3hMZB4Tr',
     'CvOyV2ah0Te',
     'CvPBw2chQ2P',
     'CvPKUyxhqN9',
     'CvPNOcMhtrX',
     'CvQ1CqOhDpk',
     'CvQqkGRBihx',
     'CvRJoq5B3x0',
     'CvRkJS0BIIZ',
     'CvTNZvUB1-Q',
     'CvUJN5yBGKr',
     'CvbR2TAhJou',
     'CvcOAbBB_zZ',
     'CvgtD0-Bjg0',
     'CvhEcijBpfw',
     'Cvr6sKCNz01',
     'CvrMcykJqr1',
     'CvuA5mghMEB',
     'CvwlVWbBdAl',
     'CvzGa_xBbbZ',
     'Cw1p1h9htV2',
     'Cw1yKuPRTqj',
     'Cw2e7qPBlef',
     'Cw2oxNhRRBV',
     'Cw4kd0zBwaB',
     'Cw6yggCho9J',
     'CwCiXOKhqIQ',
     'CwCv54MBI2N',
     'CwJVKYehgzI',
     'CwMuKQRB4Kl',
     'CwUeqKsBd4S',
     'CwWDcs_BKBa',
     'Cw_iurLBu3j',
     'CwbdWG_pYzY',
     'CweoE0lhilL',
     'CwhEB5sMxa_',
     'Cwj5gfXh8Xq',
     'CwjbekQB1dG',
     'CwkCBOdBcvg',
     'Cwo19NEh4V_',
     'Cwp1Qo4hhcu',
     'CwpIHUwBrrA',
     'CwrLdoiRsPG',
     'CwteWqsS86B',
     'Cx-A8GcOHDr',
     'Cx2ZwhLBIj2',
     'Cx6yAtkypx1',
     'Cx7k-IuhvL7',
     'CxAWEoThTqA',
     'CxAcJeurwVB',
     'CxH3lbWhKls',
     'CxM6tsMBt9E',
     'CxMz7YrBXRI',
     'CxUsSlAhJhD',
     'CxVM3bOhbOs',
     'Cxa2ZJHBpAt',
     'Cxc097BRE91',
     'Cxfy4cPB33V',
     'Cxg7Go7N6ml',
     'Cxh6CmMB8-t',
     'CxhV9JLhkp0',
     'CxiY2b3hE3h',
     'CxicZXvhvlD',
     'Cxksmu8xmP0',
     'Cxr9yjfJumM',
     'CxrJwEySSsh',
     'CxrpMXCJ_Jl',
     'CxsehRcyr47',
     'Cxt4JXtO-Rv',
     'CxuNVsZSBdC',
     'CxveiDiJTCj',
     'CxwhobHhWwB',
     'CxxOfBEBXS7',
     'CxzdFJnRv76',
     'Cy0CjkOPZj4',
     'Cy0SWxvB6ow',
     'Cy22wlZheR4',
     'CyAAWcnBZ2T',
     'CyDLMtau7Za',
     'CyDVe47rqOv',
     'CyDVuPwBGv0',
     'CyDbGlcv-7x',
     'CyGO3K2Byry',
     'CyI0Gfahk5v',
     'CyIa7V2Oowp',
     'CyKJ8MZhPR7',
     'CyMd-5JBbno',
     'CyNhP_QBSKt',
     'CyNoJDWrw6O',
     'CyS2kKzuvrt',
     'CyX9A5JvrAP',
     'CyXxyQyvpVO',
     'CydQOmUxaNt',
     'CyfioZ6Oc7A',
     'CyiF5EVOcM9',
     'CyiYjnQvl5y',
     'Cyj-pg-h-dh',
     'CyntzzQPV6s',
     'Cyxm5_ZhRgC',
     'Cz-brFJyGyV',
     'Cz-sattSMZU',
     'Cz3auJoyRu2',
     'Cz46mE2B5ZC',
     'Cz7yaRPx9I8',
     'CzF6IPAxGLH',
     'CzH3vD-vWpw',
     'CzS_4phvRik',
     'CzSsMl4hbKl',
     'CzTYB5ehkpG',
     'CzV4YBLBzbA',
     'CzVX8ieRkiS',
     'CzWLtveBuiX',
     'Czcrma0B0hw',
     'Czf8Wn0vvJj',
     'Czne3Aehz2Y',
     'Czp7IYAhE7k',
     'Czu-w7_hYlP',
     'Czv1l6FxX4P',
     'Czx7qilOSvt',
     'CzyEL6gSA_r'
   );
