import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami — Gorontalo Unite",
  description:
    "Gorontalo Unite adalah media informasi dan edukasi visual yang didedikasikan untuk mengangkat sisi terbaik dari Gorontalo.",
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

const COVERAGE = [
  {
    title: "Destinasi Wisata",
    desc: "Menjelajahi keindahan alam dari pesisir hingga pegunungan Gorontalo.",
    href: "/wisata",
  },
  {
    title: "Kekayaan Budaya",
    desc: "Mengenal lebih dekat adat istiadat dan kearifan lokal Bumi Serambi Madinah.",
    href: "/event",
  },
  {
    title: "Wisata Kuliner",
    desc: "Menemukan cita rasa autentik dan khas Gorontalo yang belum banyak diketahui.",
    href: "/food",
  },
  {
    title: "Kabar Baik Daerah",
    desc: "Mengabarkan prestasi, inovasi, dan kemajuan positif dari daerah Gorontalo.",
    href: "/daerah",
  },
  {
    title: "Human Interest",
    desc: "Cerita inspiratif dari sosok lokal yang membawa perubahan nyata di Gorontalo.",
    href: "/inspire",
  },
  {
    title: "Gorontalo AI",
    desc: "Chatbot AI hyperlokal berbasis Groq LLM dengan RAG knowledge base dan pencarian web real-time.",
    href: "/chat",
  },
];

const STACK = [
  {
    name: "Next.js 16.2",
    note: "App Router + React 19",
    icon: (
      <svg viewBox="0 0 180 180" className="w-6 h-6" fill="currentColor">
        <path d="M87 0C38.9 0 0 38.9 0 87s38.9 87 87 87 87-38.9 87-87S135.1 0 87 0zm42.7 156.4L66.4 73.8v61.3H50.7V52.8h16.4l63.2 82.3V52.8H146v101.5c-5.1 1.4-10.4 2.1-16.3 2.1z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    note: "PostgreSQL + Auth + Storage",
    icon: (
      <svg viewBox="0 0 109 113" className="w-6 h-6" fill="none">
        <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#a)" />
        <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#b)" fillOpacity=".2" />
        <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.265c-8.19 0-12.758-9.46-7.664-15.875L45.317 2.071z" fill="#3ECF8E" />
        <defs>
          <linearGradient id="a" x1="53.974" y1="40.063" x2="94.163" y2="71.439" gradientUnits="userSpaceOnUse">
            <stop stopColor="#249361" /><stop offset="1" stopColor="#3ECF8E" />
          </linearGradient>
          <linearGradient id="b" x1="36.156" y1="30.578" x2="54.484" y2="65.081" gradientUnits="userSpaceOnUse">
            <stop /><stop offset="1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Groq LLM",
    note: "AI chatbot & streaming",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS v4",
    note: "Styling",
    icon: (
      <svg viewBox="0 0 248 31" className="w-8 h-5" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    name: "Tavily",
    note: "Real-time web search",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    note: "Deployment & CDN",
    icon: (
      <svg viewBox="0 0 116 100" className="w-6 h-5" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/gorontalounitemediahub/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "http://instagram.com/gorontalo.unite",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "http://tiktok.com/@gorontalounite",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/gorontalounite",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="w-full pb-24 md:pb-0">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F5C400] dark:text-yellow-400 mb-4">
          Tentang Kami
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
          Media informasi dan edukasi visual{" "}
          <span className="text-[#F5C400] dark:text-yellow-400">untuk Gorontalo.</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Kami percaya bahwa setiap sudut Gorontalo memiliki cerita, setiap tradisi memiliki makna, dan setiap rasa memiliki jiwa yang layak dirayakan oleh dunia.
        </p>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-5">
              Jendela informasi bagi siapa saja yang ingin mengenal Gorontalo lebih dalam.
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Gorontalo Unite hadir untuk menjadi jendela informasi bagi siapa saja yang ingin mengenal lebih dalam tentang kehangatan masyarakat, kekayaan budaya, hingga potensi wisata tersembunyi di Bumi Serambi Madinah.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Kami mengemas kabar baik dari daerah dengan penyampaian yang ringan, visual yang segar, dan narasi yang inspiratif.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Destinasi Wisata — Menjelajahi keindahan alam dari pesisir hingga pegunungan Gorontalo.",
              "Kekayaan Budaya — Mengenal lebih dekat adat istiadat dan kearifan lokal.",
              "Wisata Kuliner — Menemukan cita rasa autentik khas Gorontalo.",
              "Kabar Baik Daerah — Mengabarkan prestasi dan kemajuan positif di daerah.",
              "Human Interest — Cerita inspiratif dari sosok lokal pembawa perubahan.",
            ].map((item) => {
              const [bold, rest] = item.split(" — ");
              return (
                <div key={bold} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5C400] dark:bg-emerald-400 flex-shrink-0 mt-2" />
                  <p><span className="font-semibold text-gray-800 dark:text-gray-200">{bold}</span> — {rest}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────────── */}
      <section className="bg-gray-900 dark:bg-zinc-950 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Prinsip yang kami pegang
            </h2>
            <p className="text-gray-400 text-sm mt-1">setiap hari, tanpa pengecualian.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5C400] flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed pl-3.5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage / Liputan ───────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F5C400] dark:text-yellow-400 mb-3">Liputan</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10">
            Apa yang kami liput
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COVERAGE.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-[#F5C400]/40 dark:hover:border-yellow-500/40 hover:shadow-md transition-all"
              >
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#F5C400] dark:group-hover:text-yellow-400 transition-colors mb-2">
                  {f.title} <span className="text-gray-300 dark:text-zinc-600">→</span>
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
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F5C400] dark:text-yellow-400 mb-3">Tech Stack</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Dibangun dengan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {STACK.map((s) => (
              <div key={s.name} className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4">
                <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{s.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{s.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
            Kode sumber tersedia di{" "}
            <a
              href="https://github.com/gorontalounite/gorontalo-unite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5C400] dark:text-yellow-400 hover:underline"
            >
              github.com/gorontalounite/gorontalo-unite
            </a>
          </p>
        </div>
      </section>

      {/* ── Social Media ─────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F5C400] dark:text-yellow-400 mb-3">Media Sosial</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Ikuti kami</h2>
          <div className="flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-[#F5C400]/40 dark:hover:border-yellow-500/40 hover:text-[#F5C400] dark:hover:text-yellow-400 transition-all"
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Ada pertanyaan atau ingin berkontribusi?</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Hubungi tim kami lewat email atau WhatsApp.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hi@gorontalounite.com"
              className="flex items-center gap-2 px-6 py-3 bg-[#F5C400] text-black text-sm font-semibold rounded-xl hover:bg-[#c9a000] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hi@gorontalounite.com
            </a>
            <a
              href="https://wa.me/628114350404"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-semibold text-gray-700 dark:text-gray-200 rounded-xl hover:border-[#F5C400]/50 dark:hover:border-yellow-500/50 hover:text-[#F5C400] dark:hover:text-yellow-400 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              0811-4350-404
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
