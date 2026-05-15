import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami — Gorontalo Unite",
  description:
    "Platform media hyperlokal berbasis AI untuk Gorontalo — menggabungkan chatbot AI, portal berita, dan marketplace lokal dalam satu ekosistem.",
};

const PRINCIPLES = [
  {
    title: "Lokal dulu",
    desc: "Konten dan konteks AI kami dirancang khusus untuk Gorontalo — bukan adaptasi dari platform nasional.",
  },
  {
    title: "Akurasi di atas kecepatan",
    desc: "Verifikasi adalah keharusan. Kami tidak mengorbankan kebenaran demi kecepatan tayang.",
  },
  {
    title: "Teknologi yang bisa dipakai",
    desc: "AI dan fitur digital harus terasa berguna, bukan sekadar ada. Sederhana, cepat, dan bekerja di semua perangkat.",
  },
  {
    title: "Komunitas adalah inti",
    desc: "Pembaca, kontributor konten, dan pelaku UMKM adalah bagian dari platform ini, bukan sekadar pengguna.",
  },
  {
    title: "Terbuka untuk berkembang",
    desc: "Kode sumber terbuka. Kami menerima kontribusi dari siapa saja — mulai dari developer hingga kamu yang punya data dialek Gorontalo.",
  },
  {
    title: "Dampak terukur",
    desc: "Setiap fitur harus punya tujuan nyata: membantu orang menemukan informasi, menjual produk, atau memahami daerahnya.",
  },
];

const FEATURES = [
  {
    title: "Gorontalo AI",
    desc: "Chatbot berbasis Groq LLM dengan konteks hyperlokal Gorontalo, RAG dari knowledge base, pencarian web real-time via Tavily, dan input suara berbahasa Indonesia.",
    href: "/chat",
  },
  {
    title: "Portal Berita",
    desc: "Liputan multikategori: wisata, bisnis, daerah, event, dan lebih banyak lagi. Filter, cari, dan urutkan berdasarkan tanggal atau popularitas.",
    href: "/wisata",
  },
  {
    title: "Produk Lokal",
    desc: "Direktori produk UMKM dan affiliate Gorontalo dengan pencarian, filter kategori, dan pelacakan klik.",
    href: "/affiliate",
  },
  {
    title: "Komunitas",
    desc: "Sistem komentar dengan moderasi, autentikasi pengguna, dan profil dengan kontrol akses berbasis peran.",
    href: "/profile",
  },
];

const STACK = [
  { name: "Next.js 16.2", note: "App Router + React 19" },
  { name: "Supabase", note: "PostgreSQL + Auth + Storage" },
  { name: "Groq LLM", note: "AI chatbot & streaming" },
  { name: "Tailwind CSS v4", note: "Styling" },
  { name: "Tavily", note: "Real-time web search" },
  { name: "Vercel", note: "Deployment & CDN" },
];

export default function AboutPage() {
  return (
    <div className="w-full pb-24 md:pb-0">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-4">
          Tentang Kami
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
          Platform media hyperlokal{" "}
          <span className="text-[#2D7D46] dark:text-emerald-400">berbasis AI</span>{" "}
          untuk Gorontalo.
        </h1>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Gorontalo Unite menggabungkan chatbot AI, portal berita multikategori, dan marketplace lokal dalam satu ekosistem digital.
        </p>
      </section>

      {/* ── What we do ───────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-5">
              Gorontalo Unite ada untuk membuat informasi lokal lebih mudah ditemukan.
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Berawal dari kebutuhan akan platform yang benar-benar memahami konteks Gorontalo — bukan sekadar mendaur ulang konten nasional — kami membangun ekosistem yang menggabungkan AI, jurnalisme lokal, dan pemberdayaan UMKM.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Chatbot kami dilatih dengan knowledge base Gorontalo. Berita kami ditulis untuk warga Gorontalo. Produk yang kami tampilkan adalah produk lokal Gorontalo.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { num: "17", label: "Kategori konten" },
              { num: "AI", label: "Chatbot hyperlokal" },
              { num: "PWA", label: "Bisa dipakai offline" },
              { num: "Open", label: "Source di GitHub" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-center">
                <p className="text-2xl font-bold text-[#2D7D46] dark:text-emerald-400 mb-1">{s.num}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────────── */}
      <section className="bg-gray-900 dark:bg-zinc-950 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Prinsip yang kami pegang
            </h2>
            <p className="text-gray-400 text-sm mt-1">setiap hari, tanpa pengecualian.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D7D46] flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed pl-3.5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-3">Fitur</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10">
            Apa yang ada di dalam platform
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-[#2D7D46]/40 dark:hover:border-emerald-500/40 hover:shadow-md transition-all"
              >
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#2D7D46] dark:group-hover:text-emerald-400 transition-colors mb-2">
                  {f.title} <span className="text-gray-400 dark:text-zinc-500">→</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-3">Tech Stack</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Dibangun dengan
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {STACK.map((s) => (
              <div key={s.name} className="rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{s.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
            Kode sumber tersedia di{" "}
            <a
              href="https://github.com/gorontalounite/gorontalo-unite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D7D46] dark:text-emerald-400 hover:underline"
            >
              github.com/gorontalounite/gorontalo-unite
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Ada pertanyaan atau ingin berkontribusi?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Hubungi tim kami atau buka issue di GitHub.</p>
          </div>
          <a
            href="mailto:hello@gorontalounite.com"
            className="flex-shrink-0 px-6 py-3 bg-[#2D7D46] text-white text-sm font-semibold rounded-xl hover:bg-[#236137] transition-colors"
          >
            hello@gorontalounite.com
          </a>
        </div>
      </section>

    </div>
  );
}
