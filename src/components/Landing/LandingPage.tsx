"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import ChatContainer, { type LiveConversation } from "@/components/Chat/ChatContainer";
import InputBar from "@/components/Chat/InputBar";

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
  Wisata: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
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

const SUGGESTED_PROMPTS = [
  "Kuliner khas yang wajib dicoba di Gorontalo?",
  "Spot wisata bahari terbaik di Gorontalo?",
  "Cara membuat kain Karawo?",
  "Bagaimana cara mengurus KTP di Gorontalo?",
];

/* ─── Hero with chat-first ──────────────────────────────────────────── */
function ChatHero({ onSend }: { onSend: (msg: string) => void }) {
  return (
    <section className="relative px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-transparent to-transparent dark:from-emerald-950/20 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold text-[#2D7D46] dark:text-emerald-400 uppercase tracking-widest mb-4">
          AI Lokal Gorontalo
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-5">
          Tanyakan apapun{" "}
          <span className="text-[#2D7D46] dark:text-emerald-400">tentang Gorontalo</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10">
          Chatbot AI lokal yang memahami wisata, budaya, kuliner, dan layanan publik Gorontalo.
        </p>

        {/* Live chat box */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-xl shadow-emerald-900/5 dark:shadow-black/30 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 dark:border-zinc-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Gorontalo AI · online
            </span>
          </div>
          <InputBar onSend={onSend} />
        </div>

        {/* Suggested chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {SUGGESTED_PROMPTS.map((q) => (
            <button
              key={q}
              onClick={() => onSend(q)}
              className="text-xs sm:text-sm px-3.5 py-2 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 hover:border-[#2D7D46] dark:hover:border-emerald-500 hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors"
            >
              {q}
            </button>
          ))}
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
        <span className="text-xs font-semibold text-[#2D7D46] dark:text-emerald-400 uppercase tracking-widest">
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
      className="group block bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:border-[#2D7D46]/40 dark:hover:border-emerald-500/40 hover:shadow-lg dark:hover:shadow-black/40 transition-all"
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20">
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

/* ─── Portfolio Section ─────────────────────────────────────────────── */
function PortfolioSection({ items }: { items: PortfolioItem[] }) {
  const [activeTab, setActiveTab] = useState<"All" | "Programming" | "Multimedia">("All");

  const filtered = items.filter((item) => {
    if (activeTab === "All") return true;
    const stack = getStack(item);
    if (!stack) return false;
    return STACK_META[stack].group === activeTab;
  });

  return (
    <section id="portofolio" className="px-4 sm:px-6 py-16 sm:py-24 bg-gray-50/60 dark:bg-zinc-950/60 border-y border-gray-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Portofolio"
          title="Karya digital & multimedia kami"
          description="Stack programming (web, mobile, data) dan multimedia (editing, carousel, videografi) untuk klien Gorontalo dan sekitarnya."
          action={
            <Link
              href="/portfolio"
              className="text-sm font-semibold text-[#2D7D46] dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5"
            >
              Lihat semua
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          }
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["All", "Programming", "Multimedia"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#2D7D46] dark:bg-emerald-500 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-800 hover:border-[#2D7D46]/40 dark:hover:border-emerald-500/40"
              }`}
            >
              {tab === "All" ? "Semua" : tab}
            </button>
          ))}
        </div>

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
              Belum ada karya {activeTab.toLowerCase()} dipublikasikan.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── News Section ──────────────────────────────────────────────────── */
function NewsSection({ items }: { items: NewsItem[] }) {
  return (
    <section id="berita" className="px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Berita"
          title="Kabar terbaru dari Gorontalo"
          description="Liputan harian seputar wisata, ekonomi, pendidikan, dan budaya Gorontalo."
          action={
            <Link
              href="/good-news"
              className="text-sm font-semibold text-[#2D7D46] dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5"
            >
              Semua berita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          }
        />

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {items.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:border-[#2D7D46]/40 dark:hover:border-emerald-500/40 hover:shadow-lg dark:hover:shadow-black/40 transition-all flex flex-col"
              >
                <div className="aspect-[16/10] bg-gray-100 dark:bg-zinc-800 relative overflow-hidden">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">📰</div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span
                    className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      CATEGORY_BADGE[item.category] ??
                      "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
                    }`}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mt-3 line-clamp-2 group-hover:text-[#2D7D46] dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 flex-1">
                      {item.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                    {formatDate(item.published_at ?? item.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800">
            <span className="text-4xl">📰</span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              Berita akan segera tersedia.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── About Section ─────────────────────────────────────────────────── */
function AboutSection() {
  const stats = [
    { label: "Konten media lokal", value: "100+" },
    { label: "Stack & multimedia", value: "6" },
    { label: "Pertanyaan dijawab AI", value: "24/7" },
  ];
  return (
    <section id="tentang" className="px-4 sm:px-6 py-16 sm:py-24 bg-gray-50/60 dark:bg-zinc-950/60 border-y border-gray-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="text-xs font-semibold text-[#2D7D46] dark:text-emerald-400 uppercase tracking-widest">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2D7D46] dark:bg-emerald-500 text-white font-semibold rounded-xl hover:bg-[#1f5a33] dark:hover:bg-emerald-400 transition-colors shadow-sm"
              >
                Selengkapnya tentang kami
              </Link>
              <Link
                href="/about#kontak"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-200 font-semibold rounded-xl hover:border-[#2D7D46] dark:hover:border-emerald-500 hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors"
              >
                Hubungi kami
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800"
              >
                <p className="text-3xl sm:text-4xl font-bold text-[#2D7D46] dark:text-emerald-400">
                  {s.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
            <div className="sm:col-span-3 bg-gradient-to-br from-[#2D7D46] to-[#1f5a33] dark:from-emerald-600 dark:to-emerald-800 rounded-2xl p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                Stack kami
              </p>
              <p className="text-base mt-2 leading-relaxed">
                Web Design · Programming · Data Analytics · Video Editing · Carousel Design ·
                Videography
              </p>
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
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors"
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
                <div className="w-5 h-5 border-2 border-[#2D7D46] dark:border-emerald-500 border-t-transparent rounded-full animate-spin" />
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
      <PortfolioSection items={portfolioItems} />
      <NewsSection items={newsItems} />
      <AboutSection />
      <Footer />
    </div>
  );
}
