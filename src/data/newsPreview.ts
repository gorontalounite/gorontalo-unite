export type PreviewArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  summary_points: string[];
  summary_paragraphs: string[];
  category: string;
  categories: string[];
  tags: string[];
  source_name: string;
  source_url: string;
  source_published_at: string;
  image_prompt: string;
  image_url: null;
  is_preview: true;
};

const imagePrompt = (subject: string) =>
  `Editorial doodle caricature illustration, black ink on white paper only, high-contrast monochrome, playful Indonesian newspaper sketch style, symbolic scene for: ${subject}. No text, no logos, no photorealistic people, no copyrighted characters, clean composition with ample negative space.`;

/**
 * Ten real source articles selected from Antaranews-scrape-1.json.
 * They are local editorial examples only: not written to Supabase and never
 * considered published content. They let the public news layout be reviewed
 * while the CMS, image workflow, and Supabase project are being prepared.
 */
export const previewArticles: PreviewArticle[] = [
  {
    id: "preview-antara-382002",
    slug: "pemkab-dan-kejari-bone-bolango-jalin-kerja-sama-hukum-perdata",
    title: "Pemkab dan Kejari Bone Bolango jalin kerja sama hukum perdata",
    excerpt: "Kolaborasi ini difokuskan pada pencegahan persoalan hukum dan penguatan tata kelola pemerintah daerah.",
    summary_points: [
      "Pemkab Bone Bolango dan Kejari Bone Bolango menandatangani kerja sama untuk penanganan perkara perdata dan tata usaha negara.",
      "Kerja sama diarahkan untuk memperkuat pencegahan masalah hukum, termasuk risiko korupsi, sebelum terjadi.",
      "Pemerintah daerah menilai pendampingan kejaksaan penting untuk menjaga stabilitas dan kualitas pelayanan publik.",
    ],
    summary_paragraphs: [
      "Pemerintah Kabupaten Bone Bolango membangun kemitraan dengan Kejaksaan Negeri Bone Bolango dalam urusan hukum perdata dan tata usaha negara. Langkah ini ditempatkan sebagai upaya memperkuat tata kelola yang bersih dan memberi ruang konsultasi hukum bagi pemerintah daerah.",
      "Bagi warga, hasil yang diharapkan bukan sekadar penanganan perkara setelah masalah muncul. Pemerintah dan kejaksaan ingin mendorong pencegahan sejak tahap perencanaan maupun pelaksanaan kebijakan, sehingga pelayanan dan program daerah berjalan lebih akuntabel.",
    ],
    category: "Hukum", categories: ["Hukum", "Pemerintahan"], tags: ["Bone Bolango", "Kejaksaan", "Tata Kelola"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382002/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("a local government office and a prosecutor office joining hands over a legal document"), image_url: null, is_preview: true,
  },
  {
    id: "preview-antara-382006",
    slug: "rsud-zus-gelar-orientasi-umum-pada-karyawan-baru",
    title: "RSUD ZUS gelar orientasi umum pada karyawan baru",
    excerpt: "RSUD dr Zainal Umar Sidiki menyiapkan pegawai baru mengenal lingkungan kerja dan standar pelayanan.",
    summary_points: [
      "RSUD dr Zainal Umar Sidiki Gorontalo Utara menggelar orientasi untuk pegawai yang direkrut pada 2025.",
      "Materi orientasi mencakup pengenalan lingkungan kerja, tugas, serta budaya pelayanan kepada pasien.",
      "Program ini diharapkan memperkuat kerja sama antarpegawai dan kesiapan pelayanan rumah sakit.",
    ],
    summary_paragraphs: [
      "RSUD dr Zainal Umar Sidiki di Gorontalo Utara memulai masa kerja pegawai baru dengan orientasi umum. Kegiatan tersebut dirancang agar para pegawai memahami lingkungan kerja, peran masing-masing, dan pola koordinasi di rumah sakit.",
      "Orientasi juga menjadi fondasi pembentukan budaya pelayanan. Dengan mengenal prosedur serta rekan kerja lebih awal, pegawai diharapkan dapat bekerja lebih kompak dan memberi layanan yang lebih baik kepada masyarakat.",
    ],
    category: "Kesehatan", categories: ["Kesehatan"], tags: ["Gorontalo Utara", "RSUD ZUS", "Pelayanan Publik"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382006/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("new hospital staff learning together in an orientation room with a caring medical atmosphere"), image_url: null, is_preview: true,
  },
  {
    id: "preview-antara-382010",
    slug: "eks-wamenaker-noel-tanggapi-dakwaan-korupsi",
    title: "Eks Wamenaker Noel tanggapi dakwaan kasus korupsi",
    excerpt: "Immanuel Ebenezer menyampaikan tanggapannya menjelang sidang perkara dugaan pemerasan pengurusan sertifikat K3.",
    summary_points: [
      "Eks Wakil Menteri Ketenagakerjaan Immanuel Ebenezer menghadapi proses hukum terkait dugaan pemerasan dalam pengurusan sertifikat K3.",
      "Ia menyatakan siap menanggung konsekuensi apabila terbukti melakukan korupsi, namun meminta proses pembuktian berjalan adil.",
      "Perkara ini masih berada dalam proses persidangan sehingga seluruh tuduhan perlu diuji di pengadilan.",
    ],
    summary_paragraphs: [
      "Immanuel Ebenezer, mantan Wakil Menteri Ketenagakerjaan, menyampaikan respons atas dakwaan dalam perkara dugaan pemerasan terkait pengurusan sertifikat K3. Ia menegaskan sikapnya terhadap pemberantasan korupsi sembari mempertanyakan bagian-bagian dakwaan yang akan dibuktikan di persidangan.",
      "Kasus ini penting dibaca sebagai proses hukum yang masih berjalan. Gorontalo Unite merangkum informasi yang tersedia tanpa menyimpulkan kesalahan pihak mana pun sebelum adanya putusan pengadilan yang berkekuatan hukum tetap.",
    ],
    category: "Hukum", categories: ["Hukum"], tags: ["Ketenagakerjaan", "KPK", "Persidangan"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382010/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("a balanced courthouse scale and a microphone, representing due process and accountability"), image_url: null, is_preview: true,
  },
  {
    id: "preview-antara-382014",
    slug: "transfer-teknologi-alat-kesehatan-dukung-program-quick-win",
    title: "Transfer teknologi alat kesehatan dukung program quick win",
    excerpt: "Kemitraan teknologi kesehatan disebut dapat membantu pemeriksaan gratis dan penguatan rumah sakit daerah.",
    summary_points: [
      "Kemenkes menilai transfer teknologi dapat meningkatkan kemandirian alat kesehatan di dalam negeri.",
      "Ultrasound dan monitor pasien menjadi dua perangkat yang disebut dalam kerja sama industri terkait.",
      "Ketersediaan alat diagnostik dibutuhkan untuk mendukung target Cek Kesehatan Gratis dan peningkatan kapasitas rumah sakit.",
    ],
    summary_paragraphs: [
      "Kementerian Kesehatan melihat transfer teknologi alat kesehatan sebagai salah satu penopang program pemeriksaan kesehatan gratis dan penguatan rumah sakit daerah. Pendekatan ini diarahkan agar fasilitas diagnosis lebih mudah tersedia saat kebutuhan layanan meningkat.",
      "Selain mendukung layanan, kerja sama industri juga dikaitkan dengan kemandirian teknologi kesehatan nasional. Dampaknya baru akan terasa jika pengadaan, pelatihan tenaga kesehatan, dan pemerataan fasilitas berjalan seiring.",
    ],
    category: "Kesehatan", categories: ["Kesehatan", "Teknologi"], tags: ["Kemenkes", "Alat Kesehatan", "CKG"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382014/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("a simple ultrasound device and health workers connected by flowing technology lines"), image_url: null, is_preview: true,
  },
  {
    id: "preview-antara-382018",
    slug: "israel-setuju-buka-perbatasan-rafah-secara-terbatas",
    title: "Israel setuju buka perbatasan Rafah secara terbatas dengan syarat",
    excerpt: "Pembukaan terbatas penyeberangan Rafah dilaporkan dikaitkan dengan sejumlah syarat dalam rencana perdamaian Gaza.",
    summary_points: [
      "Israel menyatakan persetujuan pembukaan terbatas Rafah untuk pejalan kaki dalam kerangka rencana perdamaian yang disebutkan pemerintahnya.",
      "Pernyataan tersebut memasukkan mekanisme pemeriksaan serta syarat terkait pemulangan sandera.",
      "Status penyeberangan tetap terkait situasi kemanusiaan dan keamanan yang dinamis di Gaza.",
    ],
    summary_paragraphs: [
      "Penyeberangan Rafah kembali menjadi perhatian setelah pemerintah Israel menyebut pembukaan secara terbatas dapat dilakukan dengan sejumlah syarat. Akses itu dilaporkan hanya untuk lintasan pejalan kaki dan akan berada dalam mekanisme pemeriksaan tertentu.",
      "Informasi mengenai Rafah berubah cepat mengikuti perkembangan konflik, negosiasi, dan kebutuhan kemanusiaan di Gaza. Artikel sumber dicantumkan agar pembaca dapat menelusuri konteks lengkap serta pembaruan berikutnya.",
    ],
    category: "Politik", categories: ["Politik"], tags: ["Gaza", "Rafah", "Kemanusiaan"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382018/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("a border gate with a humanitarian aid dove and a carefully balanced pathway"), image_url: null, is_preview: true,
  },
  {
    id: "preview-antara-382022",
    slug: "kemenperin-siapkan-pemulihan-ikm-pascabencana-sumatera",
    title: "Kemenperin siapkan pemulihan IKM pascabencana Sumatera",
    excerpt: "Program pemulihan disiapkan bagi ribuan industri kecil dan menengah yang terdampak bencana di Sumatera.",
    summary_points: [
      "Kemenperin menyiapkan pemulihan untuk sekitar 2.826 industri kecil dan menengah yang terdampak bencana di tiga provinsi Sumatera.",
      "Aceh tercatat sebagai wilayah dengan jumlah IKM terdampak terbesar, disusul Sumatera Barat dan Sumatera Utara.",
      "Sektor pangan, furnitur, dan bahan bangunan termasuk kelompok usaha yang paling banyak terdampak.",
    ],
    summary_paragraphs: [
      "Kementerian Perindustrian menyiapkan program pemulihan bagi pelaku industri kecil dan menengah yang usahanya terdampak bencana hidrometeorologi di Aceh, Sumatera Utara, dan Sumatera Barat. Fokusnya adalah membantu pemulihan aktivitas ekonomi setelah gangguan pada usaha dan rantai pasok.",
      "Data dampak menunjukkan sektor yang dekat dengan kebutuhan sehari-hari menjadi kelompok besar yang terdampak. Karena itu, efektivitas program akan bergantung pada dukungan yang sesuai dengan kebutuhan tiap jenis usaha, bukan hanya bantuan yang seragam.",
    ],
    category: "Ekonomi", categories: ["Ekonomi"], tags: ["IKM", "Sumatera", "Pemulihan Bencana"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382022/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("small business owners rebuilding a market stall after rain, with tools and hopeful energy"), image_url: null, is_preview: true,
  },
  {
    id: "preview-antara-382026",
    slug: "flick-gol-pertama-titik-balik-barcelona-lawan-oviedo",
    title: "Flick: Gol pertama jadi titik balik Barcelona lawan Oviedo",
    excerpt: "Barcelona menang 3-0 atas Real Oviedo setelah gol pembuka mengubah ritme pertandingan.",
    summary_points: [
      "Barcelona mengalahkan Real Oviedo 3-0 pada lanjutan Liga Spanyol.",
      "Pelatih Hansi Flick menilai gol pertama Dani Olmo menjadi titik balik setelah tim kesulitan pada awal laga.",
      "Raphinha dan Lamine Yamal menambah gol ketika Barcelona bermain lebih percaya diri.",
    ],
    summary_paragraphs: [
      "Barcelona meraih kemenangan 3-0 atas Real Oviedo setelah sempat kesulitan membongkar pertahanan lawan. Hansi Flick menilai gol pembuka Dani Olmo mengubah kepercayaan diri dan arah permainan timnya.",
      "Setelah gol pertama, Barcelona menambah dua gol melalui Raphinha dan Lamine Yamal. Laga ini juga menyoroti kontribusi Olmo yang tidak hanya mencetak gol, tetapi turut memberi assist.",
    ],
    category: "Olahraga", categories: ["Olahraga"], tags: ["Barcelona", "Liga Spanyol", "Sepak Bola"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382026/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("a football team finding momentum after the first goal, dynamic stadium energy"), image_url: null, is_preview: true,
  },
  {
    id: "preview-antara-382030",
    slug: "shopee-dorong-pemulihan-ekonomi-umkm-sumatera-bangkit",
    title: "Shopee dorong pemulihan ekonomi melalui UMKM Sumatera Bangkit",
    excerpt: "Kampanye digital ini ditujukan untuk membantu UMKM terdampak bencana memperluas jangkauan pasar.",
    summary_points: [
      "Shopee Indonesia meluncurkan kampanye UMKM Sumatera Bangkit bagi pelaku usaha yang terdampak bencana.",
      "Kampanye menawarkan ruang promosi dan akses pasar digital agar usaha tetap dapat menjangkau konsumen.",
      "Inisiatif ini dikaitkan dengan upaya pemulihan ekonomi daerah bersama dukungan pemerintah untuk UMKM.",
    ],
    summary_paragraphs: [
      "Platform e-commerce Shopee Indonesia memperkenalkan kampanye UMKM Sumatera Bangkit untuk mendukung pelaku usaha kecil yang terdampak bencana. Pendekatannya berfokus pada promosi digital agar produk lokal tetap memiliki jalur menuju konsumen.",
      "Akses pasar memang menjadi bagian penting dalam pemulihan usaha, namun keberlanjutannya tetap bergantung pada kesiapan stok, logistik, dan kemampuan pelaku usaha menggunakan kanal digital. Kolaborasi lintas pihak diperlukan agar manfaat program tidak berhenti pada kampanye.",
    ],
    category: "Ekonomi", categories: ["Ekonomi", "Digital"], tags: ["UMKM", "Sumatera", "E-commerce"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382030/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("small Indonesian business owners using a phone to sell handmade products after a storm"), image_url: null, is_preview: true,
  },
  {
    id: "preview-antara-382034",
    slug: "kkp-siapkan-pelatihan-nelayan-kampung-nelayan-merah-putih",
    title: "KKP siapkan pelatihan nelayan di Kampung Nelayan Merah Putih",
    excerpt: "Pelatihan dirancang mencakup penangkapan ikan, pengelolaan hasil, hingga pemasaran bagi masyarakat pesisir.",
    summary_points: [
      "KKP menyiapkan pelatihan untuk mendukung program Kampung Nelayan Merah Putih.",
      "Materi tidak hanya membahas keterampilan menangkap ikan, tetapi juga pengolahan hasil dan pemasaran.",
      "Balai nelayan direncanakan menjadi ruang belajar dan kolaborasi bagi nelayan, koperasi, serta penyuluh.",
    ],
    summary_paragraphs: [
      "Kementerian Kelautan dan Perikanan menyiapkan pelatihan bagi masyarakat pesisir melalui program Kampung Nelayan Merah Putih. Fokusnya dibuat lebih luas dari aktivitas melaut, yaitu mencakup cara mengelola hasil tangkapan dan menjualnya dengan nilai yang lebih baik.",
      "Balai nelayan diharapkan menjadi tempat pertemuan antara nelayan, pengelola koperasi, dan penyuluh. Dengan kebutuhan tiap kampung dipetakan lebih dahulu, pelatihan dapat disesuaikan dengan tantangan yang benar-benar dihadapi warga pesisir.",
    ],
    category: "Perikanan", categories: ["Perikanan", "Ekonomi"], tags: ["Nelayan", "KKP", "Pesisir"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382034/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("fishermen learning in a coastal community hall with nets, fish baskets, and a small cooperative board"), image_url: null, is_preview: true,
  },
  {
    id: "preview-antara-382038",
    slug: "menpora-puji-kontingen-indonesia-135-emas-apg-2025",
    title: "Menpora puji Kontingen Indonesia bawa pulang 135 emas dari APG 2025",
    excerpt: "Indonesia menutup ASEAN Para Games 2025 di posisi kedua dengan 135 emas, 143 perak, dan 114 perunggu.",
    summary_points: [
      "Kontingen Indonesia meraih 135 medali emas pada ASEAN Para Games 2025 di Thailand.",
      "Total raihan Indonesia adalah 135 emas, 143 perak, dan 114 perunggu untuk posisi kedua klasemen akhir.",
      "Para atletik menjadi penyumbang emas terbanyak bagi kontingen Merah Putih.",
    ],
    summary_paragraphs: [
      "Kontingen Indonesia mengakhiri ASEAN Para Games 2025 dengan 135 medali emas dan menempati posisi kedua klasemen akhir. Raihan tersebut melampaui salah satu ukuran keberhasilan yang ditetapkan, yaitu bertahan di tiga besar.",
      "Prestasi ini memperlihatkan kontribusi kuat atlet Indonesia di berbagai cabang, terutama para atletik. Apresiasi terhadap hasil kompetisi perlu diikuti dukungan berkelanjutan untuk pembinaan atlet disabilitas dan akses olahraga yang inklusif.",
    ],
    category: "Olahraga", categories: ["Olahraga"], tags: ["ASEAN Para Games", "Atlet Disabilitas", "Indonesia"],
    source_name: "Antara News Gorontalo", source_url: "https://gorontalo.antaranews.com/berita/382038/a", source_published_at: "2026-01-26T00:00:00+08:00",
    image_prompt: imagePrompt("para athletes celebrating on a podium with medals, inclusive sports spirit"), image_url: null, is_preview: true,
  },
];

export function getPreviewArticle(slug: string) {
  return previewArticles.find((article) => article.slug === slug);
}
