import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import BeritaFilters from "./BeritaFilters";
import { CATEGORIES, CAT_COLOR as COLORS, DEFAULT_COLOR } from "./categories";
import BeritaPagination from "./BeritaPagination";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita Gorontalo — Gorontalo Unite",
  description: "Berita terkini seputar Gorontalo — politik, ekonomi, wisata, pendidikan, kesehatan, dan lebih banyak lagi.",
  openGraph: { title: "Berita Gorontalo | Gorontalo Unite", type: "website" },
};

// ─── Constants ──────────────────────────────────────────────────────────────

const LIMIT = 18;

const CAT_LABEL_MAP: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c.label]),
);

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function sourceLabel(url: string | null) {
  if (!url) return null;
  if (url.includes("gorontalokab"))  return "Pemkab Gorontalo";
  if (url.includes("gorontalokota")) return "Pemkot Gorontalo";
  if (url.includes("gorontaloprov")) return "Pemprov Gorontalo";
  return null;
}

function getDateBound(key: string): string | null {
  const now = new Date();
  if (key === "today") return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  if (key === "week")  { const d = new Date(now); d.setDate(d.getDate() - 7); return d.toISOString(); }
  if (key === "month") return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  if (key === "year")  return new Date(now.getFullYear(), 0, 1).toISOString();
  return null;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

type Article = {
  id: string; title: string; slug: string; excerpt: string | null;
  image_url: string | null; category: string; categories: string[];
  published_at: string | null; created_at: string; source_url: string | null; is_trending: boolean;
};

const LABEL_TO_KEY: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.label, c.key]),
);

function CategoryBadges({ article }: { article: Article }) {
  const cats = article.categories?.length ? article.categories : [article.category];
  return (
    <div className="relative z-10 flex flex-wrap gap-1">
      {cats.map((cat) => {
        const cls = (COLORS[cat] ?? DEFAULT_COLOR).badge;
        const key = LABEL_TO_KEY[cat] ?? cat.toLowerCase();
        return (
          <Link key={cat} href={`/berita/${key}`}
            className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${cls}`}>
            {cat}
          </Link>
        );
      })}
    </div>
  );
}

function FeaturedCard({ article }: { article: Article }) {
  return (
    <div className="group relative h-full">
      <Link href={`/news/${article.slug}`} className="absolute inset-0 z-[1]" aria-label={article.title} />
      <div className="relative aspect-[4/3] sm:aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 mb-5">
        {article.image_url ? (
          <Image
            src={article.image_url} alt={article.title} fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700" />
        )}
        {article.is_trending && (
          <span className="absolute top-3 left-3 text-xs font-semibold bg-orange-500 text-white px-2.5 py-1 rounded-full">
            Trending
          </span>
        )}
      </div>
      <div className="space-y-2.5">
        <CategoryBadges article={article} />
        <h2 className="relative z-[1] font-display text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors line-clamp-3">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          <span>{formatDate(article.published_at ?? article.created_at)}</span>
          {sourceLabel(article.source_url) && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-600" />
              <span>{sourceLabel(article.source_url)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SideCard({ article }: { article: Article }) {
  return (
    <div className="relative group flex gap-4 py-4 border-b border-gray-100 dark:border-zinc-800 last:border-0">
      <Link href={`/news/${article.slug}`} className="absolute inset-0 z-[1]" aria-label={article.title} />
      {article.image_url && (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-zinc-800">
          <Image src={article.image_url} alt={article.title} fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="flex-1 min-w-0 space-y-1.5">
        <CategoryBadges article={article} />
        <h3 className="relative z-[1] text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {formatDate(article.published_at ?? article.created_at)}
        </p>
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="relative group flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-300">
      <Link href={`/news/${article.slug}`} className="absolute inset-0 z-[1]" aria-label={article.title} />
      <div className="relative aspect-[16/10] bg-gray-100 dark:bg-zinc-800 overflow-hidden">
        {article.image_url ? (
          <Image
            src={article.image_url} alt={article.title} fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-700" />
        )}
        {article.is_trending && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">
            Trending
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4 sm:p-5 space-y-3">
        <CategoryBadges article={article} />
        <h3 className="relative z-[1] font-display text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(article.published_at ?? article.created_at)}
          </span>
          {sourceLabel(article.source_url) && (
            <span className="text-[10px] text-gray-400 dark:text-gray-500 truncate ml-2">
              {sourceLabel(article.source_url)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ListArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <div className="relative group flex gap-4 py-5 border-b border-gray-100 dark:border-zinc-800 last:border-0">
      <Link href={`/news/${article.slug}`} className="absolute inset-0 z-[1]" aria-label={article.title} />
      <span className="font-display text-3xl font-bold text-gray-100 dark:text-zinc-800 w-10 flex-shrink-0 leading-none mt-1 select-none tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0 space-y-1.5">
        <CategoryBadges article={article} />
        <h3 className="relative z-[1] text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {formatDate(article.published_at ?? article.created_at)}
        </p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{
    category?: string;
    source?:   string;
    date?:     string;
    page?:     string;
    q?:        string;
  }>;
}

export default async function BeritaPage({ searchParams }: PageProps) {
  const sp     = await searchParams;
  const catKey = sp.category ?? "";
  const source = sp.source   ?? "";
  const date   = sp.date     ?? "";
  const search = sp.q        ?? "";
  const page   = Math.max(1, parseInt(sp.page ?? "1"));

  const hasFilters = !!(catKey || source || date || search);
  const admin      = createAdminClient();

  // ── Category counts (always, for filter pills) ──
  const { data: allCats } = await admin
    .from("articles")
    .select("category, categories")
    .eq("published", true)
    .neq("category", "Portfolio");

  const catCounts: Record<string, number> = {};
  for (const row of allCats ?? []) {
    const cats: string[] = (row.categories as string[] | null)?.length
      ? (row.categories as string[])
      : [row.category as string];
    for (const lbl of cats) {
      if (lbl && lbl !== "Portfolio") catCounts[lbl] = (catCounts[lbl] ?? 0) + 1;
    }
  }

  // ── Hero articles (latest 4, only on page 1 with no filters) ──
  let heroArticles: Article[] = [];
  if (!hasFilters && page === 1) {
    const { data } = await admin
      .from("articles")
      .select("id, title, slug, excerpt, image_url, category, categories, published_at, created_at, source_url, is_trending")
      .eq("published", true)
      .neq("category", "Portfolio")
      .order("published_at", { ascending: false })
      .limit(4);
    heroArticles = (data ?? []).map((a) => ({ ...a, categories: (a.categories as string[] | null) ?? [] })) as Article[];
  }

  // ── Build filtered grid query ──
  const offset = (page - 1) * LIMIT;
  const heroIds = heroArticles.map((a) => a.id);

  // We fetch with a count to support pagination
  // eslint-disable-next-line prefer-const
  let q = admin
    .from("articles")
    .select("id, title, slug, excerpt, image_url, category, categories, published_at, created_at, source_url, is_trending", { count: "exact" })
    .eq("published", true)
    .neq("category", "Portfolio")
    .order("published_at", { ascending: false });

  if (catKey && CAT_LABEL_MAP[catKey])    q = q.contains("categories", [CAT_LABEL_MAP[catKey]]);
  if (source === "pemprov")               q = q.ilike("source_url", "%gorontaloprov%");
  else if (source === "pemkab")           q = q.ilike("source_url", "%gorontalokab%");
  else if (source === "pemkot")           q = q.ilike("source_url", "%gorontalokota%");
  const dateBound = getDateBound(date);
  if (dateBound)                          q = q.gte("published_at", dateBound);
  if (search)                             q = q.ilike("title", `%${search}%`);
  // On page 1 with no filters, grid starts after hero (offset by hero count)
  const gridOffset = (!hasFilters && page === 1) ? heroArticles.length : 0;

  q = q.range(offset + gridOffset, offset + gridOffset + LIMIT - 1);
  const { data: gridData, count } = await q;
  const gridArticles = (gridData ?? []).map((a) => ({ ...a, categories: (a.categories as string[] | null) ?? [] })) as Article[];
  const totalCount   = count ?? 0;
  const totalPages   = Math.ceil(totalCount / LIMIT);

  // ── Trending sidebar (only no-filter page 1) ──
  let trendingArticles: Article[] = [];
  if (!hasFilters && page === 1) {
    const { data } = await admin
      .from("articles")
      .select("id, title, slug, excerpt, image_url, category, categories, published_at, created_at, source_url, is_trending")
      .eq("published", true)
      .neq("category", "Portfolio")
      .eq("is_trending", true)
      .order("published_at", { ascending: false })
      .limit(5);
    trendingArticles = (data ?? []).map((a) => ({ ...a, categories: (a.categories as string[] | null) ?? [] })) as Article[];
    if (trendingArticles.length < 3) {
      const { data: fallback } = await admin
        .from("articles")
        .select("id, title, slug, excerpt, image_url, category, categories, published_at, created_at, source_url, is_trending")
        .eq("published", true)
        .neq("category", "Portfolio")
        .order("view_count", { ascending: false })
        .limit(5);
      trendingArticles = [...trendingArticles, ...(fallback ?? []).map((a) => ({ ...a, categories: (a.categories as string[] | null) ?? [] })) as Article[]].slice(0, 5);
    }
  }

  const totalDisplay = hasFilters
    ? `${totalCount} hasil ditemukan`
    : `${totalCount + heroArticles.length}+ artikel`;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── PAGE HEADER ─────────────────────────────── */}
        <div className="pt-10 pb-8 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand dark:text-yellow-400">
                Gorontalo Unite
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-1 leading-none tracking-tight">
                Berita
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Kabar terkini dari Bumi Serambi Madinah — {totalDisplay}
              </p>
            </div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <Link href="/" className="hover:text-brand dark:hover:text-yellow-400 transition-colors">Beranda</Link>
              <span>/</span>
              <span>Berita</span>
            </nav>
          </div>
        </div>

        {/* ── HERO SECTION (only page 1, no filters) ── */}
        {!hasFilters && page === 1 && heroArticles.length > 0 && (
          <section className="py-10 border-b border-gray-100 dark:border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
              {/* Featured large card */}
              <div className="lg:col-span-3">
                <FeaturedCard article={heroArticles[0]} />
              </div>
              {/* Stacked side cards */}
              <div className="lg:col-span-2 flex flex-col divide-y divide-gray-100 dark:divide-zinc-800">
                {heroArticles.slice(1).map((a) => (
                  <SideCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FILTER SECTION ──────────────────────────── */}
        <div className="py-6 border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm z-20">
          <Suspense fallback={<div className="h-16 animate-pulse bg-gray-100 dark:bg-zinc-800 rounded-xl" />}>
            <BeritaFilters
              activeCategory={catKey}
              activeSource={source}
              activeDate={date}
              activeSearch={search}
              catCounts={catCounts}
            />
          </Suspense>
        </div>

        {/* ── ACTIVE FILTER LABEL ─────────────────────── */}
        {hasFilters && (
          <div className="py-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-800" />
            <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
              {catKey ? `Kategori: ${CAT_LABEL_MAP[catKey] ?? catKey}` : ""}
              {source ? ` · Sumber: ${source === "pemprov" ? "Pemprov" : source === "pemkab" ? "Pemkab" : "Pemkot"}` : ""}
              {date ? ` · ${date === "today" ? "Hari ini" : date === "week" ? "7 hari" : date === "month" ? "Bulan ini" : "Tahun ini"}` : ""}
              {search ? ` · "${search}"` : ""}
              {` — ${totalCount} artikel`}
            </span>
            <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-800" />
          </div>
        )}

        {/* ── MAIN ARTICLE GRID ───────────────────────── */}
        <section className="py-10">
          {gridArticles.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="font-display text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tidak ada artikel ditemukan
              </h2>
              <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
                Coba ubah filter atau kata kunci pencarian.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {gridArticles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Suspense>
            <BeritaPagination page={page} totalPages={totalPages} />
          </Suspense>
        </section>

        {/* ── TRENDING / EDITORIAL SECTION (only no-filter page 1) ── */}
        {!hasFilters && page === 1 && trendingArticles.length > 0 && (
          <section className="py-14 border-t border-gray-100 dark:border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left: numbered list */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                    Artikel Terpilih
                  </h2>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-800" />
                </div>
                <div>
                  {trendingArticles.map((a, i) => (
                    <ListArticleCard key={a.id} article={a} index={i} />
                  ))}
                </div>
              </div>

              {/* Right: 2 visual cards */}
              <div className="space-y-5">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                    Sorotan
                  </h2>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-800" />
                </div>
                {trendingArticles.slice(0, 2).map((a) => (
                  <Link
                    key={a.id}
                    href={`/news/${a.slug}`}
                    className="group flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 hover:border-gray-200 dark:hover:border-zinc-700 hover:shadow-md transition-all"
                  >
                    {a.image_url && (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-zinc-700">
                        <Image src={a.image_url} alt={a.title} fill className="object-cover" unoptimized />
                      </div>
                    )}
                    <div className="relative flex-1 min-w-0 space-y-1.5">
                      <Link href={`/news/${a.slug}`} className="absolute inset-0 z-[1]" aria-label={a.title} />
                      <CategoryBadges article={a} />
                      <h3 className="relative z-[1] text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-3 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {formatDate(a.published_at ?? a.created_at)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── NEWSLETTER CTA (only no-filter page 1) ── */}
        {!hasFilters && page === 1 && (
          <section className="py-16 border-t border-gray-100 dark:border-zinc-800 mb-8">
            <div className="max-w-xl mx-auto text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand dark:text-yellow-400">
                Newsletter
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-3 leading-tight">
                Jangan lewatkan<br />berita terbaru
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Dapatkan rangkuman berita Gorontalo langsung di inbox Anda setiap minggu.
              </p>
              <form
                action="#"
                className="flex gap-2 max-w-sm mx-auto"
              >
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 dark:focus:ring-yellow-400/30 placeholder:text-gray-400 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"
                >
                  Daftar
                </button>
              </form>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                Gratis. Bisa berhenti kapan saja.
              </p>
            </div>
          </section>
        )}

        {/* ── FOOTER SECTION ─────────────────────────── */}
        <footer className="py-10 border-t border-gray-100 dark:border-zinc-800">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="font-display font-bold text-gray-900 dark:text-white mb-3 text-lg">
                Gorontalo<br />Unite
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                Portal informasi hyperlokal Gorontalo — kabar terkini dari Bumi Serambi Madinah.
              </p>
            </div>

            {/* Kategori */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                Kategori
              </h4>
              <ul className="space-y-2.5">
                {CATEGORIES.slice(0, 5).map((c) => (
                  <li key={c.key}>
                    <Link
                      href={`/berita/${c.key}`}
                      className="text-xs text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-yellow-400 transition-colors"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Kategori */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                &nbsp;
              </h4>
              <ul className="space-y-2.5">
                {CATEGORIES.slice(5, 10).map((c) => (
                  <li key={c.key}>
                    <Link
                      href={`/berita/${c.key}`}
                      className="text-xs text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-yellow-400 transition-colors"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                Sumber
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Pemprov Gorontalo", href: "/berita?source=pemprov" },
                  { label: "Pemkab Gorontalo",  href: "/berita?source=pemkab"  },
                  { label: "Pemkot Gorontalo",  href: "/berita?source=pemkot"  },
                  { label: "Tentang Kami",      href: "/about"                 },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-xs text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-yellow-400 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-100 dark:border-zinc-800">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} Gorontalo Unite. Hak cipta dilindungi.
            </p>
            <div className="flex gap-4">
              {[
                { label: "Kebijakan Privasi", href: "/privacy-policy" },
                { label: "Syarat & Ketentuan", href: "/terms" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-gray-400 dark:text-gray-500 hover:text-brand dark:hover:text-yellow-400 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
