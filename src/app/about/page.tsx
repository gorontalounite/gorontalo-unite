import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tentang Kami — Gorontalo Unite",
  description:
    "Gorontalo Unite lahir dari kecintaan terhadap Gorontalo — platform digital lokal yang menghubungkan masyarakat dengan informasi, budaya, dan peluang di Bumi Serambi Madinah.",
};

const PRINCIPLES = [
  {
    title: "Pembaca adalah prioritas",
    desc: "Setiap keputusan redaksi dimulai dari satu pertanyaan: apakah ini bermanfaat bagi pembaca? Kepercayaan publik adalah aset utama kami.",
  },
  {
    title: "Akurasi tanpa kompromi",
    desc: "Kami tidak mengejar kecepatan dengan mengorbankan kebenaran. Verifikasi adalah keharusan, bukan pilihan.",
  },
  {
    title: "Lokal dulu, selalu",
    desc: "Gorontalo adalah rumah kami. Setiap sudut daerah ini layak diceritakan — dari pesisir Paguat hingga pegunungan Bone Bolango.",
  },
  {
    title: "Teknologi untuk semua",
    desc: "AI dan inovasi digital harus bisa dirasakan manfaatnya oleh semua lapisan masyarakat, bukan hanya mereka yang melek teknologi.",
  },
  {
    title: "Tumbuh terus",
    desc: "Tidak ada platform yang sempurna sejak hari pertama. Kami terus belajar, mendengar masukan, dan memperbaiki diri setiap hari.",
  },
  {
    title: "Dampak nyata",
    desc: "Kata-kata hanya bermakna jika menggerakkan perubahan. Kami ada untuk membantu masyarakat, UMKM, dan daerah Gorontalo berkembang.",
  },
];

const CATEGORIES = [
  { label: "Wisata", href: "/wisata", desc: "Destinasi dan budaya" },
  { label: "Bisnis", href: "/bisnis", desc: "UMKM dan ekonomi lokal" },
  { label: "Daerah", href: "/daerah", desc: "Pemerintahan dan kebijakan" },
  { label: "Event", href: "/event", desc: "Festival dan agenda" },
  { label: "Inspire", href: "/inspire", desc: "Tokoh dan kisah inspiratif" },
  { label: "Insight", href: "/insight", desc: "Analisis dan opini" },
];

export default function AboutPage() {
  return (
    <div className="w-full pb-24 md:pb-0">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-4">
          Tentang Kami
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
          Kami hadir untuk{" "}
          <span className="text-[#2D7D46] dark:text-emerald-400">menceritakan Gorontalo</span>{" "}
          ke dunia.
        </h1>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Di tengah derasnya arus informasi nasional, suara Gorontalo kerap tenggelam.
          Kami ada untuk mengubah itu.
        </p>
      </section>

      {/* ── Mission ────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-5">
              Gorontalo Unite ada untuk menjadikan informasi lokal lebih mudah diakses dan lebih bermakna.
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Kami percaya setiap warga Gorontalo — dari petani jagung di lereng Pohuwato hingga pengusaha muda di jantung kota — berhak mendapatkan informasi yang relevan, akurat, dan mudah dipahami.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Dengan menghadirkan AI chatbot berbahasa Indonesia yang memahami konteks lokal, liputan berita multikategori, dan platform produk UMKM, kami menjembatani kesenjangan informasi yang selama ini ada di Gorontalo.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] p-8 text-white shadow-xl shadow-emerald-900/20">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <p className="text-lg font-semibold leading-snug mb-3">
              &ldquo;Bumi Serambi Madinah punya banyak yang bisa dibanggakan. Kami di sini untuk memastikan kebanggaan itu sampai ke semua orang.&rdquo;
            </p>
            <p className="text-white/60 text-xs">— Tim Redaksi Gorontalo Unite</p>
          </div>
        </div>
      </section>

      {/* ── Prinsip Redaksi ────────────────────────────────────── */}
      <section className="bg-gray-900 dark:bg-zinc-950 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Prinsip yang kami pegang
            </h2>
            <p className="text-gray-400 text-sm mt-2">setiap hari, tanpa pengecualian.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D7D46]" />
                  <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed pl-3.5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visi & Misi ────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-3">Visi</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
              Portal informasi terpercaya dan jembatan digital masyarakat Gorontalo menuju masa depan yang lebih maju.
            </h3>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-3">Misi</p>
            <ul className="space-y-3">
              {[
                "Menyebarkan informasi yang akurat dan berimbang tentang Gorontalo",
                "Memberdayakan UMKM dan pengrajin lokal melalui platform digital",
                "Memanfaatkan AI untuk memudahkan akses informasi masyarakat",
                "Mempromosikan pariwisata dan budaya Gorontalo ke seluruh Indonesia",
              ].map((m) => (
                <li key={m} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 text-[#2D7D46] dark:text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Platform / Kategori ────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-3">Platform</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Satu platform,{" "}
            <span className="text-[#2D7D46] dark:text-emerald-400">banyak dimensi</span>.
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 max-w-xl">
            Gorontalo Unite meliput berbagai aspek kehidupan daerah — dari berita dan budaya, hingga bisnis, teknologi, dan gaya hidup.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:border-[#2D7D46]/40 dark:hover:border-emerald-500/40 hover:shadow-md transition-all"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#2D7D46] dark:group-hover:text-emerald-400 transition-colors mb-1">{c.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legalitas / Pedoman ────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-3">Pers &amp; Legalitas</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Komitmen terhadap standar pers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Pedoman Media Siber",
                desc: "Gorontalo Unite beroperasi sesuai Pedoman Pemberitaan Media Siber yang ditetapkan Dewan Pers.",
                href: "/pedoman-media-siber",
                cta: "Baca pedoman",
              },
              {
                title: "Kebijakan Privasi",
                desc: "Kami menjaga data dan privasi pengguna sesuai regulasi yang berlaku.",
                href: "/privacy-policy",
                cta: "Baca kebijakan",
              },
              {
                title: "Syarat & Ketentuan",
                desc: "Ketentuan penggunaan platform Gorontalo Unite secara menyeluruh.",
                href: "/terms",
                cta: "Baca ketentuan",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 flex flex-col">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4">{item.desc}</p>
                <Link href={item.href} className="text-xs font-semibold text-[#2D7D46] dark:text-emerald-400 hover:underline">
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Punya cerita dari Gorontalo?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Kirimkan liputan, ide kolaborasi, atau pertanyaan ke tim redaksi kami.</p>
          </div>
          <a
            href="mailto:hello@gorontalounite.com"
            className="flex-shrink-0 px-6 py-3 bg-[#2D7D46] text-white text-sm font-semibold rounded-xl hover:bg-[#236137] transition-colors shadow-lg shadow-emerald-900/20"
          >
            hello@gorontalounite.com
          </a>
        </div>
      </section>

    </div>
  );
}
