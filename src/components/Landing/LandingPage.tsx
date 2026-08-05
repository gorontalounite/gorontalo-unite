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

export interface DestinationItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  location: string | null;
  opening_hours: string | null;
}

interface LandingPageProps {
  newsItems: NewsItem[];
  featuredNewsItems: NewsItem[];
  featuredDestinations: DestinationItem[];
  newsTotalCount: number;
  newsUnavailable: boolean;
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
  Politik:        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Pemerintahan:   "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  Wisata:         "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  Budaya:         "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Ekonomi:        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Bisnis:         "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Pendidikan:     "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  Sosial:         "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Kemasyarakatan: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Kesehatan:      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Pertanian:      "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300",
  Perikanan:      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  Teknologi:      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Digital:        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  Infrastruktur:  "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300",
  Pembangunan:    "bg-stone-100 text-stone-700 dark:bg-stone-900/40 dark:text-stone-300",
  Hukum:          "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  Keamanan:       "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  Agama:          "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  Lingkungan:     "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
  Alam:           "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  Olahraga:       "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  Event:          "bg-[#F5C400]/20 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
};

const CAT_KEY_MAP: Record<string, string> = {
  Politik:"politik", Pemerintahan:"pemerintahan", Wisata:"wisata", Budaya:"budaya",
  Ekonomi:"ekonomi", Bisnis:"bisnis", Pendidikan:"pendidikan", Sosial:"sosial",
  Kemasyarakatan:"kemasyarakatan", Kesehatan:"kesehatan", Pertanian:"pertanian",
  Perikanan:"perikanan", Teknologi:"teknologi", Digital:"digital",
  Infrastruktur:"infrastruktur", Pembangunan:"pembangunan", Hukum:"hukum",
  Keamanan:"keamanan", Agama:"agama", Lingkungan:"lingkungan", Alam:"alam",
  Olahraga:"olahraga", Event:"event",
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

/* ─── Prompt pool ───────────────────────────────────────────────────── */
const PROMPT_POOL = [
  "Wisata terbaik di Gorontalo?",
  "Kuliner khas apa yang wajib dicoba?",
  "Apa itu Festival Karawo?",
  "Di mana lokasi Pantai Olele?",
  "Ceritakan tentang Danau Limboto",
  "Rekomendasi tempat makan enak Gorontalo",
  "Apa kerajinan khas Gorontalo?",
  "Berita terbaru Gorontalo hari ini",
  "UMKM unggulan di Gorontalo",
  "Tradisi adat istiadat Gorontalo",
  "Perkembangan ekonomi Gorontalo 2026",
  "Tempat wisata alam terbaik Gorontalo",
  "Bagaimana cara ke Gorontalo?",
  "Apa itu Binte Biluhuta?",
  "Prestasi terbaru daerah Gorontalo",
  "Budaya dan seni di Gorontalo",
  "Siapa tokoh terkenal dari Gorontalo?",
  "Sejarah Kota Gorontalo",
  "Produk pertanian unggulan Gorontalo",
  "Perikanan dan kelautan Gorontalo",
];

/* ─── Hero with chat-first ──────────────────────────────────────────── */
function ChatHero({ onSend }: { onSend: (msg: string) => void }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Keep the server and client render deterministic to avoid hydration drift.
  const prompts = PROMPT_POOL.slice(0, 4);

  const handleSend = (msg?: string) => {
    const trimmed = (msg ?? value).trim();
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
        <span className="inline-block text-xs font-semibold text-brand dark:text-yellow-400 uppercase tracking-widest mb-3">
          AI Lokal Gorontalo
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-3">
          Tanyakan apapun{" "}
          <span className="text-brand dark:text-yellow-400">tentang Gorontalo</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
          Chatbot AI lokal yang memahami wisata, budaya, kuliner, dan layanan publik Gorontalo.
        </p>

        {/* Chat box */}
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
              onClick={() => handleSend()}
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

        {/* Suggested prompt chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-full hover:border-[#F5C400]/60 dark:hover:border-yellow-500/60 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-yellow-50/50 dark:hover:bg-yellow-950/20 transition-all whitespace-nowrap"
            >
              {prompt}
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
        <span className="text-xs font-semibold text-brand dark:text-yellow-400 uppercase tracking-widest">
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

/* ─── News card — Featured (large left) ─────────────────────────────── */
function NewsCardFeatured({ item }: { item: NewsItem }) {
  const catKey = CAT_KEY_MAP[item.category ?? ""] ?? (item.category ?? "").toLowerCase();
  return (
    <div className="group relative flex flex-col">
      <Link href={`/berita/${item.slug}`} className="absolute inset-0 z-[1]" aria-label={item.title} />
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 mb-4 flex-shrink-0">
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href={`/berita/${catKey}`}
          className={`relative z-[2] self-start text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
            CATEGORY_BADGE[item.category ?? ""] ?? "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
          }`}
        >
          {item.category}
        </Link>
        <h3 className="relative z-[1] text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
            {item.excerpt}
          </p>
        )}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {formatDate(item.published_at ?? item.created_at)}
        </p>
      </div>
    </div>
  );
}

/* ─── News card — Side (small right column) ─────────────────────────── */
function NewsCardSide({ item }: { item: NewsItem }) {
  const catKey = CAT_KEY_MAP[item.category ?? ""] ?? (item.category ?? "").toLowerCase();
  return (
    <div className="relative group flex gap-4 py-3.5 border-b border-gray-100 dark:border-zinc-800 last:border-0">
      <Link href={`/berita/${item.slug}`} className="absolute inset-0 z-[1]" aria-label={item.title} />
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700">
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-1.5">
        <Link
          href={`/berita/${catKey}`}
          className={`relative z-[2] inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            CATEGORY_BADGE[item.category ?? ""] ?? "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
          }`}
        >
          {item.category}
        </Link>
        <h3 className="relative z-[1] text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {formatDate(item.published_at ?? item.created_at)}
        </p>
      </div>
    </div>
  );
}

/* ─── News card — Mobile (card style) ──────────────────────────────── */
function NewsCardMobile({ item }: { item: NewsItem }) {
  const catKey = CAT_KEY_MAP[item.category ?? ""] ?? (item.category ?? "").toLowerCase();
  return (
    <div className="relative group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:border-[#F5C400]/40 dark:hover:border-yellow-500/40 hover:shadow-lg transition-all flex flex-col">
      <Link href={`/berita/${item.slug}`} className="absolute inset-0 z-[1]" aria-label={item.title} />
      <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 overflow-hidden">
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}
      </div>
      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <Link
          href={`/berita/${catKey}`}
          className={`relative z-[2] self-start text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
            CATEGORY_BADGE[item.category ?? ""] ?? "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
          }`}
        >
          {item.category}
        </Link>
        <h3 className="relative z-[1] text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors flex-1">
          {item.title}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 pt-1">
          {formatDate(item.published_at ?? item.created_at)}
        </p>
      </div>
    </div>
  );
}

/* ─── News Section with pagination / load-more ──────────────────────── */
const NEWS_PER_PAGE = 6;

function NewsSectionPaginated({
  initialItems,
  totalCount,
  newsUnavailable,
}: {
  initialItems: NewsItem[];
  totalCount: number;
  newsUnavailable: boolean;
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / NEWS_PER_PAGE));

  // Desktop state — replace items on page change
  const [desktopPage, setDesktopPage] = useState(1);
  const [desktopItems, setDesktopItems] = useState<NewsItem[]>(initialItems);
  const [isDesktopLoading, setIsDesktopLoading] = useState(false);
  const [newsError, setNewsError] = useState(newsUnavailable);

  // Mobile state — accumulate items on load-more
  const [mobileItems, setMobileItems] = useState<NewsItem[]>(initialItems);
  const [isMobileLoading, setIsMobileLoading] = useState(false);
  const mobileHasMore = mobileItems.length < totalCount;

  const fetchPage = async (page: number): Promise<NewsItem[]> => {
    const res = await fetch(`/api/news/paginate?page=${page}`);
    if (!res.ok) throw new Error("News request failed");
    const json = await res.json();
    return (json.data ?? []) as NewsItem[];
  };

  const handleDesktopPageChange = async (page: number) => {
    if (page === desktopPage || isDesktopLoading) return;
    setIsDesktopLoading(true);
    try {
      const items = page === 1 ? initialItems : await fetchPage(page);
      setDesktopItems(items);
      setDesktopPage(page);
      setNewsError(false);
    } catch {
      setNewsError(true);
    } finally {
      setIsDesktopLoading(false);
    }
  };

  const handleMobileLoadMore = async () => {
    if (isMobileLoading) return;
    setIsMobileLoading(true);
    try {
      const res = await fetch(`/api/news/paginate?offset=${mobileItems.length}`);
      if (!res.ok) throw new Error("News request failed");
      const json = await res.json();
      setMobileItems((prev) => [...prev, ...((json.data ?? []) as NewsItem[])]);
      setNewsError(false);
    } catch {
      setNewsError(true);
    } finally {
      setIsMobileLoading(false);
    }
  };

  // Build pagination page numbers with ellipsis
  const pageNumbers = (() => {
    const delta = 2;
    const start = Math.max(1, desktopPage - delta);
    const end = Math.min(totalPages, desktopPage + delta);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  })();

  const featured = desktopItems[0];
  const sideItems = desktopItems.slice(1, 6);

  return (
    <section id="berita" className="px-4 sm:px-6 py-16 sm:py-24 bg-gray-50/60 dark:bg-zinc-950/60 border-y border-gray-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Update News"
          title="Kabar terbaru dari Gorontalo"
          description="Liputan harian seputar wisata, ekonomi, pendidikan, dan budaya Gorontalo."
          action={
            <Link
              href="/berita"
              className="text-sm font-semibold text-brand dark:text-yellow-400 hover:underline inline-flex items-center gap-1.5"
            >
              Semua berita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          }
        />

        {/* ── Desktop layout (sm and up) ── */}
        <div className={`hidden sm:block transition-opacity duration-200 ${isDesktopLoading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
          {featured ? (
            <div className="grid grid-cols-5 gap-6 lg:gap-8 items-start">
              <div className="col-span-3">
                <NewsCardFeatured item={featured} />
              </div>
              <div className="col-span-2 border-l border-gray-100 dark:border-zinc-800 pl-6 lg:pl-8 divide-y divide-gray-100 dark:divide-zinc-800">
                {sideItems.map((item) => (
                  <NewsCardSide key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {newsError ? "Berita belum dapat dimuat. Silakan coba lagi nanti." : "Belum ada berita yang dipublikasikan."}
              </p>
            </div>
          )}

          {/* Desktop pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1.5 mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
              {/* Prev */}
              <button
                onClick={() => handleDesktopPageChange(desktopPage - 1)}
                disabled={desktopPage === 1 || isDesktopLoading}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Sebelumnya"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* First page + ellipsis */}
              {pageNumbers[0] > 1 && (
                <>
                  <button
                    onClick={() => handleDesktopPageChange(1)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500 transition-all"
                  >
                    1
                  </button>
                  {pageNumbers[0] > 2 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 px-1">…</span>
                  )}
                </>
              )}

              {/* Page numbers */}
              {pageNumbers.map((p) => (
                <button
                  key={p}
                  onClick={() => handleDesktopPageChange(p)}
                  disabled={isDesktopLoading}
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                    p === desktopPage
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border border-transparent"
                      : "text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500"
                  }`}
                >
                  {p}
                </button>
              ))}

              {/* Last page + ellipsis */}
              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                  {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 px-1">…</span>
                  )}
                  <button
                    onClick={() => handleDesktopPageChange(totalPages)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500 transition-all"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                onClick={() => handleDesktopPageChange(desktopPage + 1)}
                disabled={desktopPage === totalPages || isDesktopLoading}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Berikutnya"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                Halaman {desktopPage} dari {totalPages}
              </span>
            </div>
          )}
        </div>

        {/* ── Mobile layout ── */}
        <div className="sm:hidden">
          {/* First item: featured card */}
          {mobileItems[0] && (
            <div className="mb-4">
              <NewsCardMobile item={mobileItems[0]} />
            </div>
          )}
          {/* Remaining items: compact horizontal rows */}
          {mobileItems.length > 1 && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 px-4 divide-y divide-gray-100 dark:divide-zinc-800 mb-4">
              {mobileItems.slice(1).map((item) => (
                <NewsCardSide key={item.id} item={item} />
              ))}
            </div>
          )}

          {mobileHasMore && (
            <button
              onClick={handleMobileLoadMore}
              disabled={isMobileLoading}
              className="w-full py-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-[#F5C400]/40 dark:hover:border-yellow-500/40 hover:text-brand dark:hover:text-yellow-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isMobileLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Memuat...
                </>
              ) : (
                <>
                  Muat Lebih
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Homepage editorial choices ─────────────────────────────────── */
function FeaturedNewsSection({ items }: { items: NewsItem[] }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pilihan Editor"
          title="Berita pilihan Gorontalo Unite"
          description="Liputan yang dipilih redaksi untuk memberi konteks, inspirasi, dan perspektif baru tentang Gorontalo."
          action={<Link href="/berita" className="text-sm font-semibold text-brand hover:underline dark:text-yellow-400">Lihat semua berita →</Link>}
        />
        {items.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => <NewsCardMobile key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-14 text-center text-sm text-gray-400 dark:border-zinc-800 dark:text-gray-500">
            Berita pilihan akan tampil di sini setelah dipilih dari editor konten.
          </div>
        )}
      </div>
    </section>
  );
}

function CityGuideSection({ items }: { items: DestinationItem[] }) {
  return (
    <section className="border-y border-gray-100 bg-gray-50/60 px-4 py-16 dark:border-zinc-800 dark:bg-zinc-950/60 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="City Guide"
          title="Destinasi pilihan untuk dijelajahi"
          description="Panduan ringkas untuk menemukan tempat menarik dan merencanakan kunjungan di Gorontalo."
          action={<Link href="/wisata" className="text-sm font-semibold text-brand hover:underline dark:text-yellow-400">Jelajahi City Guide →</Link>}
        />
        {items.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {items.map((item) => (
              <Link key={item.id} href={`/wisata/${item.slug}`} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:border-[#F5C400]/60 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-50 dark:from-zinc-800 dark:to-zinc-700">
                  {item.image_url && <img src={item.image_url} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />}
                </div>
                <div className="p-5">
                  {item.category && <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-yellow-400">{item.category}</p>}
                  <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900 group-hover:text-brand dark:text-white dark:group-hover:text-yellow-400">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{item.description || "Informasi kunjungan akan segera tersedia."}</p>
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 dark:text-gray-500">
                    {item.location && <span>⌖ {item.location}</span>}
                    {item.opening_hours && <span>◷ {item.opening_hours}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center text-sm text-gray-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-500">
            Destinasi pilihan akan tampil di sini setelah ditandai dari dashboard City Guide.
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Event bento card ──────────────────────────────────────────────── */
function EventBentoCard({
  item,
  isFirst,
  isSelected,
  onClick,
}: {
  item: NewsItem;
  isFirst: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  const catBadge = CATEGORY_BADGE[item.category ?? ""] ?? "bg-white/90 text-gray-700";
  return (
    <button
      onClick={onClick}
      className={`relative group rounded-2xl overflow-hidden text-left cursor-pointer transition-all duration-200 ${
        isFirst ? "sm:col-span-2 lg:col-span-2 h-64 lg:h-80" : "h-44 lg:h-52"
      } ${
        isSelected
          ? "ring-2 ring-[#F5C400] dark:ring-yellow-400 shadow-lg shadow-yellow-900/20"
          : "ring-1 ring-gray-200 dark:ring-zinc-800 hover:ring-[#F5C400]/50 dark:hover:ring-yellow-500/50 hover:shadow-md"
      }`}
    >
      {/* Background */}
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5C400]/30 via-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:via-zinc-900 dark:to-zinc-800" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
        <span className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2 ${catBadge}`}>
          {item.category}
        </span>
        <h3 className={`text-white font-bold leading-tight line-clamp-2 ${isFirst ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`}>
          {item.title}
        </h3>
        <p className="text-white/60 text-xs mt-1.5">
          📅 {formatDate(item.published_at ?? item.created_at)}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#F5C400] dark:bg-yellow-400 flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}

/* ─── Event Section (Bento grid) ────────────────────────────────────── */
function EventSection({ items }: { items: NewsItem[] }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (items.length === 0) return null;

  const selected = items[Math.min(selectedIdx, items.length - 1)];
  const catKey = CAT_KEY_MAP[selected.category ?? ""] ?? (selected.category ?? "").toLowerCase();

  const now = new Date();
  const monthName = now.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  return (
    <section id="event" className="px-4 sm:px-6 py-16 sm:py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Agenda"
          title={`Event bulan ${monthName}`}
          description="Acara, festival, dan agenda penting di Gorontalo bulan ini."
          action={
            <Link
              href="/berita/event"
              className="text-sm font-semibold text-brand dark:text-yellow-400 hover:underline inline-flex items-center gap-1.5"
            >
              Lihat semua event
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          }
        />

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <EventBentoCard
              key={item.id}
              item={item}
              isFirst={idx === 0}
              isSelected={selectedIdx === idx}
              onClick={() => setSelectedIdx(idx)}
            />
          ))}
        </div>

        {/* Selected event detail panel */}
        <div className="mt-4 p-5 sm:p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 transition-all duration-200">
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
            {selected.image_url && (
              <div className="relative w-full sm:w-44 h-32 sm:h-36 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-zinc-800">
                <img
                  src={selected.image_url}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <Link
                href={`/berita/${catKey}`}
                className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 ${
                  CATEGORY_BADGE[selected.category ?? ""] ?? "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
                }`}
              >
                {selected.category}
              </Link>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                {selected.title}
              </h3>
              {selected.excerpt && (
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3">
                  {selected.excerpt}
                </p>
              )}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(selected.published_at ?? selected.created_at)}
                </span>
                <Link
                  href={`/berita/${selected.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand dark:text-yellow-400 hover:underline"
                >
                  Detail event
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio card (kept, not shown on landing) ───────────────────── */
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

function PortfolioSection({ items }: { items: PortfolioItem[] }) {
  const [activeTab, setActiveTab] = useState<StackFilter>("all");
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
          description="Web design, programming, data analytics, video editing, carousel desain, dan videografi."
          action={
            <Link href="/portfolio" className="text-sm font-semibold text-brand dark:text-yellow-400 hover:underline inline-flex items-center gap-1.5">
              Lihat semua
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          }
        />
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">Belum ada karya yang dipublikasikan.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Tech stack icons ───────────────────────────────────────────────── */
const TECH_STACK = [
  { name: "Next.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TailwindCSS",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Supabase",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "PostgreSQL",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Figma",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg" },
  { name: "After Effects",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg" },
  { name: "Photoshop",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Vercel",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
];

/* ─── About Section (kept, not shown on landing) ────────────────────── */
function AboutSection() {
  return (
    <section id="tentang" className="px-4 sm:px-6 py-16 sm:py-24 bg-gray-50/60 dark:bg-zinc-950/60 border-y border-gray-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="text-xs font-semibold text-brand dark:text-yellow-400 uppercase tracking-widest">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-200 font-semibold rounded-xl hover:border-[#F5C400] dark:hover:border-yellow-500 hover:text-brand dark:hover:text-yellow-400 transition-colors"
              >
                Hubungi kami
              </Link>
            </div>
          </div>
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
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 text-center leading-tight group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
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

/* ─── Main landing page ─────────────────────────────────────────────── */
export default function LandingPage({ newsItems, featuredNewsItems, featuredDestinations, newsTotalCount, newsUnavailable }: LandingPageProps) {
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
      <NewsSectionPaginated initialItems={newsItems} totalCount={newsTotalCount} newsUnavailable={newsUnavailable} />
      <FeaturedNewsSection items={featuredNewsItems} />
      <CityGuideSection items={featuredDestinations} />
      <AboutSection />
    </div>
  );
}
