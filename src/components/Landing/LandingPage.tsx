"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import ChatContainer, { type LiveConversation } from "@/components/Chat/ChatContainer";

/* ─── Types ─────────────────────────────────────────────────────────── */
export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  published_at: string | null;
  created_at: string;
}

interface LandingPageProps {
  portfolioItems: PortfolioItem[];
  newsItems: NewsItem[];
}

/* ─── Stack / category metadata ─────────────────────────────────────── */
type StackKey =
  | "web-design"
  | "programming"
  | "data-analytics"
  | "editing"
  | "carousel-design"
  | "videography";

const STACK_META: Record<StackKey, { label: string; group: "Programming" | "Multimedia" }> = {
  "web-design": { label: "Web Design", group: "Programming" },
  programming: { label: "Programming", group: "Programming" },
  "data-analytics": { label: "Data Analytics", group: "Programming" },
  editing: { label: "Video Editing", group: "Multimedia" },
  "carousel-design": { label: "Carousel Design", group: "Multimedia" },
  videography: { label: "Videography", group: "Multimedia" },
};

function getStack(item: PortfolioItem): StackKey | null {
  const stackTag = item.tags?.find((t) => t.startsWith("stack:"));
  if (!stackTag) return null;
  const key = stackTag.slice(6) as StackKey;
  return STACK_META[key] ? key : null;
}

const CATEGORY_BADGE: Record<string, string> = {
  Wisata: "bg-yellow-100 text-emerald-700 dark:bg-yellow-900/40 dark:text-emerald-300",
  Budaya: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Kuliner: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Pendidikan: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Ekonomi: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

/* ─── Helpers ───────────────────────────────────────────────────────── */
function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ─── Hero with chat-first ──────────────────────────────────────────── */
function ChatHero({ onSend }: { onSend: (msg: string) => void }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="relative px-4 sm:px-6 overflow-hidden" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/50 via-transparent to-transparent dark:from-yellow-950/20 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center w-full py-12 sm:py-16">
        <span className="inline-block text-xs font-semibold text-[#F5C400] dark:text-yellow-400 uppercase tracking-widest mb-3">
          AI Lokal Gorontalo
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-3">
          Tanyakan apapun{" "}
          <span className="text-[#F5C400] dark:text-yellow-400">tentang Gorontalo</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
          Chatbot AI lokal yang memahami wisata, budaya, kuliner, dan layanan publik Gorontalo.
        </p>

        {/* Large chat box */}
        <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg shadow-yellow-900/10 dark:shadow-black/40">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Apa kabar terbaru dari Gorontalo hari ini?"
            rows={4}
            className="w-full bg-transparent text-base text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 resize-none outline-none px-5 pt-5 pb-3 leading-relaxed"
          />
          <div className="flex items-center justify-between px-4 pb-4">
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 dark:text-zinc-500 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Lampiran"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <button
              onClick={handleSend}
              disabled={!value.trim()}
              className="flex items-center gap-2 px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              Kirim
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Section Heading ───────────────────────────────────────────────── */
function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold text-[#F5C400] dark:text-yellow-400 uppercase tracking-widest">
          {eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
          {title}
        </h2>
        {description && (
          <p className="text-base text-gray-600 dark:text-gray-400 mt-3">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

/* ─── Portfolio card ────────────────────────────────────────────────── */
function PortfolioCard({ item }: { item: PortfolioItem }) {
  const stack = getStack(item);
  const stackLabel = stack ? STACK_META[stack].label : "Portfolio";
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group block bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:border-[#F5C400]/40 dark:hover:border-yellow-500/40 hover:shadow-lg dark:hover:shadow-black/40 transition-all"
    >
      <div className="aspect-[4/3] bg-gray-100 dark:bg-zinc-800 relative overflow-hidden">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/40 dark:to-yellow-900/20">
            <span className="text-4xl">🌿</span>
          </div>
        )}
        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 dark:bg-zinc-950/80 backdrop-blur text-gray-800 dark:text-gray-200 border border-white/50 dark:border-zinc-800">
          {stackLabel}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">
          {item.title}
        </p>
        {item.excerpt && (
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">
            {item.excerpt}
          </p>
        )}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          {formatDate(item.published_at ?? item.created_at)}
        </p>
      </div>
    </Link>
  );
}

type StackFilter = "all" | StackKey;

const STACK_TABS: { key: StackFilter; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "web-design", label: "Web Design" },
  { key: "programming", label: "Programming" },
  { key: "data-analytics", label: "Data Analytics" },
  { key: "editing", label: "Video Editing" },
  { key: "carousel-design", label: "Carousel" },
  { key: "videography", label: "Videography" },
];

/* ─── Portfolio Section ─────────────────────────────────────────────── */
function PortfolioSection({ items }: { items: PortfolioItem[] }) {
  const [activeTab, setActiveTab] = useState<StackFilter>("all");

  // Only show tabs that actually have items (plus "all")
  const tabsWithItems = new Set(items.map((i) => getStack(i)).filter(Boolean));
  const visibleTabs = STACK_TABS.filter((t) => t.key === "all" || tabsWithItems.has(t.key));

  const filtered = items.filter((item) => {
    if (activeTab === "all") return true;
    return getStack(item) === activeTab;
  });

  return (
    <section id="portofolio" className="px-4 sm:px-6 py-16 sm:py-24 bg-gray-50/60 dark:bg-zinc-950/60 border-y border-gray-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Portofolio"
          title="Karya digital & multimedia kami"
          description="Web design, programming, data analytics, video editing, carousel desain, dan videografi untuk klien Gorontalo dan sekitarnya."
          action={
            <Link
              href="/portfolio"
              className="text-sm font-semibold text-[#F5C400] dark:text-yellow-400 hover:underline inline-flex items-center gap-1.5"
            >
              Lihat semua
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          }
        />

        {/* Tabs — only rendered when we have items */}
        {visibleTabs.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {visibleTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-[#F5C400] dark:bg-yellow-400 text-white shadow-sm"
                    : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-800 hover:border-[#F5C400]/40 dark:hover:border-yellow-500/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.slice(0, 6).map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800">
            <span className="text-4xl">🌿</span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              {activeTab === "all"
                ? "Belum ada karya yang dipublikasikan."
                : `Belum ada karya ${STACK_META[activeTab as StackKey]?.label ?? activeTab} dipublikasikan.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Dummy news data (will be replaced by DB fetch) ────────────────── */
const DUMMY_NEWS = [
  {
    id: "1", slug: "pantai-olele-surga-bawah-laut",
    title: "Pantai Olele: Surga Bawah Laut yang Menakjubkan di Gorontalo",
    excerpt: "Keindahan terumbu karang dan biota laut Pantai Olele menjadi daya tarik wisatawan mancanegara.",
    category: "Wisata", published_at: "2026-04-28", image_seed: 10,
  },
  {
    id: "2", slug: "festival-karawo-2026",
    title: "Festival Karawo 2026 Resmi Dibuka, Ribuan Pengunjung Memadati Venue",
    excerpt: "Kerajinan sulam khas Gorontalo tampil memukau dalam festival tahunan yang semakin berkelas.",
    category: "Budaya", published_at: "2026-04-25", image_seed: 20,
  },
  {
    id: "3", slug: "binte-biluhuta-kuliner-wajib",
    title: "Binte Biluhuta: Kuliner Wajib yang Memikat Lidah Wisatawan",
    excerpt: "Sup jagung khas Gorontalo ini kini hadir di berbagai restoran modern dengan cita rasa otentik.",
    category: "Kuliner", published_at: "2026-04-22", image_seed: 30,
  },
  {
    id: "4", slug: "beasiswa-daerah-gorontalo-2026",
    title: "Pemprov Gorontalo Buka 500 Beasiswa Daerah untuk Mahasiswa Berprestasi",
    excerpt: "Program beasiswa ini menyasar pelajar kurang mampu namun berprestasi tinggi di seluruh Gorontalo.",
    category: "Pendidikan", published_at: "2026-04-20", image_seed: 40,
  },
  {
    id: "5", slug: "ekspor-jagung-gorontalo-meningkat",
    title: "Ekspor Jagung Gorontalo Meningkat 30% di Kuartal Pertama 2026",
    excerpt: "Tren positif ekspor jagung didukung oleh modernisasi pertanian dan akses pasar yang lebih luas.",
    category: "Ekonomi", published_at: "2026-04-18", image_seed: 50,
  },
  {
    id: "6", slug: "danau-limboto-revitalisasi",
    title: "Revitalisasi Danau Limboto Dimulai, Target Selesai Akhir 2026",
    excerpt: "Proyek besar revitalisasi Danau Limboto diharapkan mengembalikan kejayaan ekosistem danau ikonik ini.",
    category: "Wisata", published_at: "2026-04-15", image_seed: 60,
  },
  {
    id: "7", slug: "seni-tari-dana-dana",
    title: "Tari Dana-Dana Gorontalo Tampil di Pentas Seni Internasional Jakarta",
    excerpt: "Delegasi Gorontalo membawa kebanggaan lewat penampilan Tari Dana-Dana yang memukau penonton internasional.",
    category: "Budaya", published_at: "2026-04-12", image_seed: 70,
  },
  {
    id: "8", slug: "startup-teknologi-gorontalo",
    title: "Startup Teknologi Lokal Gorontalo Raih Pendanaan Seri A Rp 15 Miliar",
    excerpt: "Inovasi digital dari Gorontalo kini mendapat kepercayaan investor nasional untuk berkembang lebih jauh.",
    category: "Ekonomi", published_at: "2026-04-10", image_seed: 80,
  },
];

/* ─── News Section (4×2 grid) ───────────────────────────────────────── */
function NewsSection({ items: _items }: { items: NewsItem[] }) {
  return (
    <section id="berita" className="px-4 sm:px-6 py-16 sm:py-24 bg-gray-50/60 dark:bg-zinc-950/60 border-y border-gray-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Update News"
          title="Kabar terbaru dari Gorontalo"
          description="Liputan harian seputar wisata, ekonomi, pendidikan, dan budaya Gorontalo."
          action={
            <Link
              href="/good-news"
              className="text-sm font-semibold text-[#F5C400] dark:text-yellow-400 hover:underline inline-flex items-center gap-1.5"
            >
              Semua berita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {DUMMY_NEWS.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:border-[#F5C400]/40 dark:hover:border-yellow-500/40 hover:shadow-lg dark:hover:shadow-black/40 transition-all flex flex-col"
            >
              <div className="aspect-[16/10] bg-gray-100 dark:bg-zinc-800 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${item.image_seed}/400/250`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <span
                  className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    CATEGORY_BADGE[item.category] ??
                    "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
                  }`}
                >
                  {item.category}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-2.5 line-clamp-2 group-hover:text-[#F5C400] dark:group-hover:text-yellow-400 transition-colors leading-snug flex-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2.5">
                  {formatDate(item.published_at)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tech stack icons ───────────────────────────────────────────────── */
const TECH_STACK = [
  { name: "Next.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Supabase",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "PostgreSQL",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Figma",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Premiere Pro",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg" },
  { name: "After Effects",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg" },
  { name: "Photoshop",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Vercel",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
];

/* ─── About Section ─────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="tentang" className="px-4 sm:px-6 py-16 sm:py-24 bg-gray-50/60 dark:bg-zinc-950/60 border-y border-gray-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: text */}
          <div>
            <span className="text-xs font-semibold text-[#F5C400] dark:text-yellow-400 uppercase tracking-widest">
              Tentang Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-5">
              Media online lokal, didukung AI buatan Gorontalo
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Gorontalo Unite adalah platform media online lokal yang menggabungkan
                berita harian, asisten AI khusus Gorontalo, serta layanan kreatif
                end-to-end — mulai dari web design dan data analytics, hingga produksi
                multimedia seperti carousel desain dan videografi.
              </p>
              <p>
                Kami percaya potensi Gorontalo layak mendapat panggung digital yang
                modern, ramah pengguna, dan mudah diakses dari satu tempat saja.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F5C400] dark:bg-yellow-400 text-white font-semibold rounded-xl hover:bg-[#1f5a33] dark:hover:bg-yellow-400 transition-colors shadow-sm"
              >
                Selengkapnya tentang kami
              </Link>
              <Link
                href="/about#kontak"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-200 font-semibold rounded-xl hover:border-[#F5C400] dark:hover:border-yellow-500 hover:text-[#F5C400] dark:hover:text-yellow-400 transition-colors"
              >
                Hubungi kami
              </Link>
            </div>
          </div>

          {/* Right: tech stack grid */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
              Tech & Tools
            </p>
            <div className="grid grid-cols-4 gap-3">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.name}
                  title={tech.name}
                  className="flex flex-col items-center gap-2 bg-white dark:bg-zinc-900 rounded-2xl p-3 border border-gray-200 dark:border-zinc-800 hover:border-[#F5C400]/40 dark:hover:border-yellow-500/40 hover:shadow-sm transition-all group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 text-center leading-tight group-hover:text-[#F5C400] dark:group-hover:text-yellow-400 transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 mb-10">
          <div className="col-span-2">
            <p className="text-base font-bold text-gray-900 dark:text-white mb-2">
              Gorontalo Unite
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              Media online lokal Gorontalo dengan asisten AI dan layanan kreatif digital.
            </p>
          </div>
          <FooterCol
            title="Platform"
            links={[
              ["Beranda", "/"],
              ["Portofolio", "/portfolio"],
              ["Berita", "/good-news"],
              ["Affiliate", "/affiliate"],
            ]}
          />
          <FooterCol
            title="Info"
            links={[
              ["Tentang", "/about"],
              ["Kontak", "/about#kontak"],
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              ["Privacy", "/privacy-policy"],
              ["Terms", "/terms"],
            ]}
          />
        </div>
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} Gorontalo Unite. All rights reserved.</p>
          <p>Made with ♥ for Gorontalo</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-3">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#F5C400] dark:hover:text-yellow-400 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Main landing page ─────────────────────────────────────────────── */
export default function LandingPage({ portfolioItems, newsItems }: LandingPageProps) {
  const [chatActive, setChatActive] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();
  const [chatToLoad, setChatToLoad] = useState<LiveConversation | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const conv = (e as CustomEvent<LiveConversation>).detail;
      setChatToLoad(conv);
      setChatActive(true);
    };
    window.addEventListener("load-chat", handler);
    return () => window.removeEventListener("load-chat", handler);
  }, []);

  const handleSend = (msg: string) => {
    if (!msg.trim()) return;
    setInitialMessage(msg);
    setChatActive(true);
  };

  if (chatActive) {
    return (
      <div className="flex flex-1 min-h-0 w-full bg-white dark:bg-zinc-950">
        <div className="flex-1 flex flex-col min-h-0">
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-[#F5C400] dark:border-yellow-500 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <ChatContainer initialMessage={initialMessage} chatToLoad={chatToLoad} />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
      <ChatHero onSend={handleSend} />
      {false && <PortfolioSection items={portfolioItems} />}
      <NewsSection items={newsItems} />
      {false && <AboutSection />}
      <Footer />
    </div>
  );
}
