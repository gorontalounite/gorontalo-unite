export interface Source {
  id: string;
  title: string;
  url: string;
  category: string;
  publishedAt: string;
}

export interface Conversation {
  id: number;
  userMessage: string;
  aiResponse: string;
  sources: Source[];
  timestamp: string;
}

export const mockConversations: Conversation[] = [
  {
    id: 1,
    userMessage: "Apa yang terkenal dari Gorontalo?",
    aiResponse:
      "Gorontalo dikenal sebagai **'Serambi Madinah'** karena mayoritas penduduknya beragama Islam dan kehidupan religiusnya yang kuat. Provinsi ini terkenal dengan:\n\n• **Danau Limboto** — salah satu danau terbesar di Sulawesi dengan panorama matahari terbenam yang memukau\n• **Taman Laut Olele** — surga bagi para penyelam dengan terumbu karang dan keanekaragaman hayati laut yang luar biasa\n• **Jagung Gorontalo** — komoditas utama yang menjadi kebanggaan daerah\n• **Kain Karawo** — kerajinan bordir tradisional khas Gorontalo yang telah mendunia\n• **Tradisi Maulidan** — perayaan Maulid Nabi yang sangat meriah dan unik",
    sources: [
      {
        id: "news-001",
        title: "Keindahan Alam Gorontalo yang Memukau Wisatawan",
        url: "/news/keindahan-alam-gorontalo",
        category: "Wisata",
        publishedAt: "2024-03-15",
      },
      {
        id: "news-002",
        title: "Karawo: Warisan Budaya Gorontalo yang Mendunia",
        url: "/news/karawo-warisan-budaya",
        category: "Budaya",
        publishedAt: "2024-03-10",
      },
    ],
    timestamp: "2024-03-20T08:00:00Z",
  },
  {
    id: 2,
    userMessage: "Bagaimana cara menuju Taman Laut Olele?",
    aiResponse:
      "Taman Laut Olele terletak di **Kabupaten Bone Bolango**, sekitar 15 km dari Kota Gorontalo. Berikut cara menuju lokasi:\n\n**Dari Kota Gorontalo:**\n1. Naik angkot jurusan Bone Bolango (±30 menit, Rp 5.000)\n2. Turun di persimpangan Olele, lanjut ojek (±10 menit, Rp 15.000)\n3. Atau sewa kendaraan pribadi langsung ke lokasi\n\n**Tips:**\n- Waktu terbaik: April–Oktober (musim kemarau, visibilitas bawah laut optimal)\n- Bawa perlengkapan snorkeling sendiri atau sewa di lokasi (Rp 50.000–75.000)\n- Tersedia pemandu selam bersertifikat PADI\n- Jam buka: 07.00–17.00 WITA",
    sources: [
      {
        id: "news-003",
        title: "Panduan Lengkap Wisata Taman Laut Olele",
        url: "/news/panduan-taman-laut-olele",
        category: "Wisata",
        publishedAt: "2024-02-28",
      },
    ],
    timestamp: "2024-03-20T08:05:00Z",
  },
  {
    id: 3,
    userMessage: "Apa kuliner khas Gorontalo yang wajib dicoba?",
    aiResponse:
      "Gorontalo memiliki kuliner khas yang kaya rempah dan cita rasa unik. Wajib coba:\n\n🍜 **Binte Biluhuta** — sup jagung dengan ikan cakalang, santan, dan kemangi. Ini adalah ikon kuliner Gorontalo!\n\n🐟 **Ikan Iloni** — ikan yang dimasak dengan bumbu rempah khas dan dibakar/kukus. Segar dan gurih.\n\n🍚 **Ilabulo** — kue tradisional dari sagu dan daging ayam/ikan yang dibungkus daun pisang\n\n🥘 **Ayam Iloni** — ayam bumbu kuning khas Gorontalo dengan santan kelapa\n\n🍡 **Kue Curuti** — jajanan tradisional dari tepung beras, manis dan kenyal\n\nSemua kuliner ini bisa ditemukan di **Pasar Sentral Gorontalo** atau **Rumah Makan Khas Gorontalo** di sepanjang Jalan Agus Salim.",
    sources: [
      {
        id: "news-004",
        title: "5 Kuliner Khas Gorontalo yang Menggugah Selera",
        url: "/news/kuliner-khas-gorontalo",
        category: "Kuliner",
        publishedAt: "2024-03-05",
      },
      {
        id: "news-005",
        title: "Binte Biluhuta: Sup Jagung Legendaris dari Gorontalo",
        url: "/news/binte-biluhuta-sup-jagung",
        category: "Kuliner",
        publishedAt: "2024-02-20",
      },
    ],
    timestamp: "2024-03-20T08:10:00Z",
  },
  {
    id: 4,
    userMessage: "Bagaimana kondisi pendidikan di Gorontalo?",
    aiResponse:
      "Pendidikan di Gorontalo terus berkembang pesat dalam beberapa tahun terakhir:\n\n**Perguruan Tinggi Unggulan:**\n- **Universitas Negeri Gorontalo (UNG)** — universitas terbesar dengan 10+ fakultas\n- **IAIN Sultan Amai Gorontalo** — pusat pendidikan Islam di kawasan timur Indonesia\n- **Universitas Muhammadiyah Gorontalo**\n\n**Capaian Terkini:**\n- Angka melek huruf mencapai **97,8%** (di atas rata-rata nasional)\n- Program beasiswa daerah untuk 500+ mahasiswa berprestasi per tahun\n- Pembangunan 15 sekolah baru di daerah terpencil melalui Dana Alokasi Khusus\n\n**Tantangan:**\n- Distribusi guru yang tidak merata antara kota dan desa\n- Infrastruktur pendidikan di wilayah kepulauan masih perlu perhatian",
    sources: [
      {
        id: "news-006",
        title: "UNG Raih Akreditasi A: Kebanggaan Gorontalo",
        url: "/news/ung-akreditasi-a",
        category: "Pendidikan",
        publishedAt: "2024-03-12",
      },
    ],
    timestamp: "2024-03-20T08:15:00Z",
  },
  {
    id: 5,
    userMessage: "Ada event budaya apa di Gorontalo bulan ini?",
    aiResponse:
      "Berikut event budaya dan pariwisata di Gorontalo yang akan berlangsung dalam waktu dekat:\n\n📅 **Festival Karawo 2024** (Maret 2024)\nPameran dan lomba motif karawo tingkat nasional di Gedung Kaca Gorontalo. Diikuti 200+ pengrajin dari seluruh Indonesia.\n\n🎪 **Pesta Adat Moodutu** (April 2024)\nUpacara adat penyambutan tamu kehormatan yang menampilkan tarian Polopalo dan Saronde.\n\n🎣 **Festival Danau Limboto** (Mei 2024)\nLomba perahu tradisional, festival kuliner, dan pertunjukan seni budaya di tepian danau.\n\n🕌 **Peringatan Hari Jadi Gorontalo** (19 Maret)\nSerangkaian kegiatan budaya, pameran UMKM, dan karnaval budaya di pusat kota.\n\nUntuk info lengkap dan pendaftaran, kunjungi Dinas Pariwisata Provinsi Gorontalo.",
    sources: [
      {
        id: "news-007",
        title: "Festival Karawo 2024: Merayakan Warisan Leluhur",
        url: "/news/festival-karawo-2024",
        category: "Budaya",
        publishedAt: "2024-03-18",
      },
      {
        id: "news-008",
        title: "Kalender Event Pariwisata Gorontalo 2024",
        url: "/news/kalender-event-2024",
        category: "Wisata",
        publishedAt: "2024-01-10",
      },
    ],
    timestamp: "2024-03-20T08:20:00Z",
  },
  {
    id: 6,
    userMessage: "Bagaimana perkembangan infrastruktur di Gorontalo?",
    aiResponse:
      "Gorontalo mengalami pembangunan infrastruktur yang signifikan dalam 5 tahun terakhir:\n\n**Transportasi:**\n- **Bandara Djalaluddin** — renovasi terminal penumpang selesai 2023, kapasitas naik 3x lipat\n- **Jalan Tol Trans-Sulawesi** segmen Gorontalo dalam tahap konstruksi\n- Pembangunan **Pelabuhan Anggrek** sebagai hub logistik kawasan timur\n\n**Energi & Utilitas:**\n- Rasio elektrifikasi mencapai **98,5%** (target 100% di 2025)\n- Pembangkit listrik tenaga surya di 50 desa terpencil\n\n**Digital:**\n- Program **Gorontalo Smart City** — WiFi publik di 30 titik strategis\n- Digitalisasi layanan pemerintahan melalui aplikasi Si-Gorontalo\n\n**Pariwisata:**\n- Revitalisasi kawasan wisata Danau Limboto senilai Rp 45 miliar\n- Pembangunan jalan akses Taman Laut Olele",
    sources: [
      {
        id: "news-009",
        title: "Tol Trans-Sulawesi di Gorontalo: Progress Terbaru",
        url: "/news/tol-trans-sulawesi-gorontalo",
        category: "Infrastruktur",
        publishedAt: "2024-03-08",
      },
    ],
    timestamp: "2024-03-20T08:25:00Z",
  },
  {
    id: 7,
    userMessage: "Apa itu Karawo dan di mana bisa membelinya?",
    aiResponse:
      "**Karawo** adalah kerajinan tangan tradisional Gorontalo berupa kain sulaman tangan yang dibuat dengan teknik mencabut serat kain, kemudian disulam kembali membentuk motif-motif indah. Proses pembuatannya sangat teliti dan bisa memakan waktu berhari-hari hingga berbulan-bulan.\n\n**Keistimewaan Karawo:**\n- Motif terinspirasi dari flora, fauna, dan ornamen Islam\n- Dikerjakan 100% dengan tangan oleh pengrajin terlatih\n- Telah mendapat **Hak Kekayaan Intelektual** dari Kemenkumham RI\n- Pernah tampil di fashion show internasional di Paris dan Milan\n\n**Tempat Membeli:**\n📍 **Toko Karawo Pesona** — Jl. Nani Wartabone No. 45, Kota Gorontalo\n📍 **Galeri Karawo Gorontalo** — Jl. 23 Januari, Kota Gorontalo\n📍 **Pasar Sentral Gorontalo** — Lantai 2, berbagai pilihan harga\n📍 **Online** — Tokopedia & Shopee dengan pencarian 'karawo gorontalo'\n\n**Harga:** Rp 150.000 (syal) hingga Rp 5.000.000 (baju lengkap custom)",
    sources: [
      {
        id: "news-002",
        title: "Karawo: Warisan Budaya Gorontalo yang Mendunia",
        url: "/news/karawo-warisan-budaya",
        category: "Budaya",
        publishedAt: "2024-03-10",
      },
      {
        id: "news-010",
        title: "Karawo Gorontalo Tampil di Paris Fashion Week",
        url: "/news/karawo-paris-fashion-week",
        category: "Budaya",
        publishedAt: "2024-02-15",
      },
    ],
    timestamp: "2024-03-20T08:30:00Z",
  },
  {
    id: 8,
    userMessage: "Bagaimana layanan kesehatan di Gorontalo?",
    aiResponse:
      "Layanan kesehatan di Gorontalo terus mengalami peningkatan melalui berbagai program:\n\n**Fasilitas Kesehatan Utama:**\n- **RSUD Aloei Saboe** — rumah sakit tipe B dengan layanan spesialis lengkap\n- **RS Toto Kabila** di Bone Bolango\n- **RS Hasri Ainun Habibie** — RS swasta terkemuka\n- 20+ Puskesmas tersebar di seluruh kota\n\n**Program Unggulan:**\n✅ **JKN-KIS** — 78% penduduk sudah terdaftar\n✅ **Gorontalo Sehat** — program jaminan kesehatan daerah untuk warga tidak mampu\n✅ **Posyandu Digital** — 150+ posyandu dengan sistem pencatatan digital\n✅ **Telemedicine** — konsultasi dokter jarak jauh untuk desa terpencil\n\n**Hotline Kesehatan:** 119 ext 9 (24 jam)\n**Info RSUD:** (0435) 831119",
    sources: [
      {
        id: "news-011",
        title: "RSUD Aloei Saboe Raih Akreditasi Paripurna",
        url: "/news/rsud-akreditasi-paripurna",
        category: "Kesehatan",
        publishedAt: "2024-03-01",
      },
    ],
    timestamp: "2024-03-20T08:35:00Z",
  },
  {
    id: 9,
    userMessage: "Ceritakan tentang sejarah Gorontalo",
    aiResponse:
      "Gorontalo memiliki sejarah panjang yang kaya dan penuh kebanggaan:\n\n**Masa Kerajaan (Abad 14–19):**\nGorontalo dahulu merupakan wilayah beberapa kerajaan besar, termasuk **Kerajaan Gorontalo**, **Kerajaan Limboto**, **Kerajaan Suwawa**, dan lainnya. Kerajaan-kerajaan ini membentuk konfederasi yang dikenal sebagai **'Lima Raja Gorontalo'**.\n\n**Masuknya Islam:**\nIslam masuk ke Gorontalo sekitar abad ke-16 dan sangat mempengaruhi budaya, adat istiadat, dan tata pemerintahan. Inilah mengapa Gorontalo disebut *Serambi Madinah*.\n\n**Era Kolonial:**\nGorontalo pernah dikuasai Belanda dan Spanyol. Pada **23 Januari 1942**, rakyat Gorontalo dipimpin **Nani Wartabone** melakukan perlawanan dan berhasil mengusir Belanda — peristiwa ini dirayakan sebagai **Hari Patriot Gorontalo**.\n\n**Provinsi Termuda:**\nGorontalo resmi menjadi provinsi ke-32 Indonesia pada **16 Februari 2001**, sebelumnya bagian dari Sulawesi Utara.",
    sources: [
      {
        id: "news-012",
        title: "Hari Patriot Gorontalo: Mengenang Perjuangan Nani Wartabone",
        url: "/news/hari-patriot-gorontalo",
        category: "Sejarah",
        publishedAt: "2024-01-23",
      },
    ],
    timestamp: "2024-03-20T08:40:00Z",
  },
  {
    id: 10,
    userMessage: "Apa potensi ekonomi Gorontalo?",
    aiResponse:
      "Gorontalo memiliki potensi ekonomi yang sangat menjanjikan di berbagai sektor:\n\n**Pertanian & Perkebunan:**\n🌽 **Jagung** — produksi 700.000+ ton/tahun, ekspor ke 12 negara\n🥥 **Kelapa** — produksi minyak kelapa murni (VCO) premium\n🎣 **Perikanan** — potensi tangkap 1,2 juta ton/tahun di Teluk Tomini\n\n**Pertambangan:**\n- Emas di Kabupaten Pohuwato\n- Nikel dan marmer di beberapa lokasi\n\n**Pariwisata:**\n- Kontribusi sektor pariwisata tumbuh 23% per tahun\n- Target 500.000 wisatawan di 2025\n\n**UMKM & Ekonomi Kreatif:**\n- 45.000+ UMKM aktif terdaftar\n- Ekspor karawo, VCO, dan produk olahan ikan terus meningkat\n\n**Investasi:**\nGorontalo masuk **Top 10 Kemudahan Berusaha** di Indonesia 2023. Pemerintah membuka peluang investasi di sektor agribisnis, pariwisata, dan energi terbarukan.",
    sources: [
      {
        id: "news-013",
        title: "Gorontalo Masuk Top 10 Kemudahan Berusaha 2023",
        url: "/news/gorontalo-kemudahan-berusaha",
        category: "Ekonomi",
        publishedAt: "2024-02-28",
      },
      {
        id: "news-014",
        title: "Ekspor Jagung Gorontalo Tembus 12 Negara",
        url: "/news/ekspor-jagung-12-negara",
        category: "Ekonomi",
        publishedAt: "2024-03-14",
      },
    ],
    timestamp: "2024-03-20T08:45:00Z",
  },
  {
    id: 11,
    userMessage: "Dimana tempat wisata terbaik di Gorontalo?",
    aiResponse:
      "Gorontalo punya banyak destinasi wisata memukau yang sayang dilewatkan!\n\n🌊 **Taman Laut Olele** — snorkeling & diving di terumbu karang terbaik Sulawesi\n\n🏔️ **Gunung Tilongkabila** — trekking dengan pemandangan kota Gorontalo dari ketinggian\n\n💧 **Air Terjun Lombongo** — oasis tersembunyi di hutan Taman Nasional Bogani Nani Wartabone\n\n🦜 **Taman Nasional Bogani Nani Wartabone** — habitat anoa, rusa, dan berbagai burung endemik\n\n🌅 **Danau Limboto** — sunset terbaik di Gorontalo dengan latar gunung-gunung hijau\n\n🏖️ **Pantai Bolihutuo** — pantai pasir putih eksotis di Boalemo\n\n🕌 **Masjid Baiturrahim** — masjid bersejarah dengan arsitektur khas Gorontalo\n\n🏛️ **Benteng Otanaha** — situs bersejarah peninggalan Portugis dengan 3 benteng ikonik\n\nRekomendasi itinerary 3 hari tersedia di platform wisata kami!",
    sources: [
      {
        id: "news-001",
        title: "Keindahan Alam Gorontalo yang Memukau Wisatawan",
        url: "/news/keindahan-alam-gorontalo",
        category: "Wisata",
        publishedAt: "2024-03-15",
      },
      {
        id: "news-003",
        title: "Panduan Lengkap Wisata Taman Laut Olele",
        url: "/news/panduan-taman-laut-olele",
        category: "Wisata",
        publishedAt: "2024-02-28",
      },
    ],
    timestamp: "2024-03-20T08:50:00Z",
  },
  {
    id: 12,
    userMessage: "Bagaimana cuaca di Gorontalo?",
    aiResponse:
      "Gorontalo memiliki iklim tropis dengan dua musim utama:\n\n☀️ **Musim Kemarau (April – Oktober)**\n- Suhu: 26–34°C\n- Curah hujan rendah\n- Waktu TERBAIK untuk wisata pantai dan menyelam\n- Visibilitas bawah laut sangat baik (15–30 meter)\n\n🌧️ **Musim Hujan (November – Maret)**\n- Suhu: 24–30°C\n- Hujan biasanya pada sore/malam hari\n- Alam lebih hijau dan segar\n- Air terjun lebih deras dan indah\n\n**Suhu rata-rata tahunan:** 27°C\n**Kelembaban:** 70–85%\n\n**Tips perjalanan:**\n- Selalu bawa payung/jas hujan meskipun di musim kemarau\n- Pakai sunscreen SPF 50+ karena sinar UV cukup kuat\n- Waktu ideal berkunjung: **Mei–September** untuk cuaca paling optimal\n\n*Data cuaca real-time tersedia di BMKG Gorontalo atau aplikasi cuaca lokal.*",
    sources: [],
    timestamp: "2024-03-20T08:55:00Z",
  },
];

export const featuredNews = [
  {
    id: "news-001",
    title: "Keindahan Alam Gorontalo yang Memukau Wisatawan Mancanegara",
    excerpt:
      "Taman Laut Olele kembali menjadi sorotan internasional setelah masuk dalam daftar 10 spot diving terbaik Asia.",
    category: "Wisata",
    imageUrl: "/images/olele.jpg",
    publishedAt: "2024-03-15",
    url: "/news/keindahan-alam-gorontalo",
  },
  {
    id: "news-007",
    title: "Festival Karawo 2024 Hadirkan 200 Pengrajin dari Seluruh Indonesia",
    excerpt:
      "Festival tahunan ini menjadi ajang promosi warisan budaya Gorontalo dan kesempatan para pengrajin lokal.",
    category: "Budaya",
    imageUrl: "/images/karawo.jpg",
    publishedAt: "2024-03-18",
    url: "/news/festival-karawo-2024",
  },
  {
    id: "news-013",
    title: "Gorontalo Raih Penghargaan Top 10 Kemudahan Berusaha 2023",
    excerpt:
      "Provinsi Gorontalo berhasil masuk dalam daftar bergengsi sebagai daerah ramah investasi terbaik nasional.",
    category: "Ekonomi",
    imageUrl: "/images/ekonomi.jpg",
    publishedAt: "2024-02-28",
    url: "/news/gorontalo-kemudahan-berusaha",
  },
  {
    id: "news-006",
    title: "UNG Raih Akreditasi Unggul: Prestasi Pendidikan Gorontalo",
    excerpt:
      "Universitas Negeri Gorontalo berhasil meraih akreditasi tertinggi, menjadi kebanggaan seluruh masyarakat.",
    category: "Pendidikan",
    imageUrl: "/images/ung.jpg",
    publishedAt: "2024-03-12",
    url: "/news/ung-akreditasi-a",
  },
  {
    id: "news-014",
    title: "Ekspor Jagung Gorontalo Tembus 12 Negara di 2024",
    excerpt:
      "Produksi jagung Gorontalo yang melimpah kini menjangkau pasar internasional, mendongkrak perekonomian daerah.",
    category: "Ekonomi",
    imageUrl: "/images/jagung.jpg",
    publishedAt: "2024-03-14",
    url: "/news/ekspor-jagung-12-negara",
  },
];

export const suggestedQuestions = [
  "Spot diving dan snorkeling terbaik di Gorontalo?",
  "Apa makanan khas Gorontalo yang wajib dicoba?",
  "Ceritakan sejarah dan asal-usul Provinsi Gorontalo",
  "Peluang investasi dan bisnis apa yang ada di Gorontalo?",
  "Apa itu kain Karawo dan bagaimana cara membelinya?",
];
