import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tentang Kami — Gorontalo Unite",
  description:
    "Gorontalo Unite adalah platform digital lokal yang lahir dari kecintaan terhadap Gorontalo — menghubungkan masyarakat dengan informasi, budaya, dan peluang di Bumi Serambi Madinah.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-10 pb-24 md:pb-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Beranda</Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">Tentang Kami</span>
      </nav>

      {/* Logo mark */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-2xl bg-[#2D7D46] flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-900/20">
          <Image src="/logo.png" alt="Gorontalo Unite" width={40} height={40} className="w-10 h-10 object-contain brightness-0 invert" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Gorontalo Unite</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Platform Digital Lokal Bumi Serambi Madinah</p>
        </div>
      </div>

      {/* Editorial body */}
      <div className="prose prose-sm prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">

        <p>
          <strong className="text-gray-900 dark:text-white">Gorontalo Unite</strong> lahir dari satu keyakinan sederhana: bahwa setiap sudut Gorontalo menyimpan cerita yang layak untuk didengar, setiap potensi daerah layak untuk diperjuangkan, dan setiap warga berhak mendapatkan akses informasi yang relevan dengan kehidupan mereka sehari-hari.
        </p>

        <p>
          Kami adalah platform digital lokal yang menghubungkan masyarakat Gorontalo — dari petani jagung di lereng Pohuwato, nelayan di pesisir Paguat, hingga pengusaha muda di jantung Kota Gorontalo — dengan informasi yang akurat, terkini, dan bermakna. Bukan sekadar portal berita, Gorontalo Unite adalah ruang temu antara teknologi dan kearifan lokal.
        </p>

        <p>
          Di tengah derasnya arus informasi nasional, suara Gorontalo kerap tenggelam. Kami hadir untuk mengubah itu. Setiap artikel yang kami tayangkan, setiap laporan yang kami sajikan, berangkat dari semangat untuk menempatkan Gorontalo setara dengan daerah-daerah lain yang lebih dulu disorot — bukan karena kami berprasangka daerah ini tertinggal, melainkan karena kami tahu betapa besar potensi yang belum terceritakan.
        </p>

        <p>
          Gorontalo Unite menghadirkan liputan di berbagai bidang: wisata dan keindahan alam, peluang bisnis dan ekonomi daerah, perkembangan pemerintahan, event dan festival budaya, kisah-kisah inspiratif warga, serta wawasan mendalam tentang isu-isu lokal yang penting. Kami juga mengintegrasikan kecerdasan buatan berbahasa Indonesia untuk memudahkan masyarakat mendapatkan informasi seputar Gorontalo kapan saja dan di mana saja.
        </p>

        <p>
          Nama <em>Unite</em> bukan sekadar kata. Ia adalah komitmen kami untuk menyatukan berbagai lapisan masyarakat Gorontalo dalam satu ekosistem digital yang inklusif — menyatukan pembaca dengan informasi, pelaku UMKM dengan pasar, dan generasi muda dengan peluang yang selama ini kurang terekspos.
        </p>

        <p>
          Kami percaya bahwa masa depan Gorontalo akan ditulis oleh mereka yang berani bersuara, berani berinovasi, dan berani bertahan di tanah sendiri. Gorontalo Unite ada untuk mendampingi perjalanan itu — merekam setiap langkah, memperkuat setiap suara, dan memastikan bahwa cerita Gorontalo tidak hanya didengar di dalam daerah, tetapi bergema ke seluruh nusantara dan dunia.
        </p>

        <p>
          Bumi Serambi Madinah punya banyak yang bisa dibanggakan. Kami di sini untuk memastikan kebanggaan itu sampai ke semua orang.
        </p>

      </div>

      {/* Divider */}
      <div className="my-10 border-t border-gray-100 dark:border-zinc-800" />

      {/* Visi & Misi compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-2">Visi</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Menjadi portal informasi terpercaya dan jembatan digital masyarakat Gorontalo menuju masa depan yang lebih maju dan berdaya.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-2">Misi</p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5 leading-relaxed">
            <li>Menyebarkan informasi akurat dan berimbang tentang Gorontalo</li>
            <li>Memberdayakan UMKM dan pengrajin lokal melalui platform digital</li>
            <li>Memanfaatkan AI untuk memudahkan akses informasi masyarakat</li>
            <li>Mempromosikan pariwisata dan budaya Gorontalo ke dunia</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] p-6 text-center text-white">
        <p className="text-sm font-medium mb-1">Punya cerita dari Gorontalo?</p>
        <p className="text-xs text-white/70 mb-4">Kirimkan liputan, ide, atau kolaborasi ke tim kami.</p>
        <a
          href="mailto:hello@gorontalounite.com"
          className="inline-block px-5 py-2 bg-white text-[#2D7D46] text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors"
        >
          hello@gorontalounite.com
        </a>
      </div>

    </div>
  );
}
