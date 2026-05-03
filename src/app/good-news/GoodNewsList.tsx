"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export interface NewsItem {
  id:           string;
  title:        string;
  slug:         string;
  category:     string;
  excerpt:      string | null;
  image_url:    string | null;
  published_at: string | null;
  created_at:   string;
  view_count:   number;
  is_trending:  boolean;
}

interface Props {
  items:    NewsItem[];
  featured: NewsItem | null;
}

const CAT_COLORS: Record<string, string> = {
  Wisata:        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Budaya:        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Kuliner:       "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Pendidikan:    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Ekonomi:       "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Kesehatan:     "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  Infrastruktur: "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300",
  "Good News":   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Umum:          "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400",
};

const PAGE_SIZE = 12;

export default function GoodNewsList({ items, featured }: Props) {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("all");
  const [sort,     setSort]     = useState<"terbaru" | "terpopuler">("terbaru");
  const [page,     setPage]     = useState(1);

  // Unique categories from data
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(items.map((a) => a.category))).sort()],
    [items],
  );

  const filtered = useMemo(() => {
    let r = [...items];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter((a) => a.title.toLowerCase().includes(q) || (a.excerpt ?? "").toLowerCase().includes(q));
    }
    if (category !== "all") r = r.filter((a) => a.category === category);
    r.sort((a, b) => {
      if (sort === "terpopuler") return (b.view_count ?? 0) - (a.view_count ?? 0);
      return new Date(b.published_at ?? b.created_at).getTime() -
             new Date(a.published_at ?? a.created_at).getTime();
    });
    return r;
  }, [items, search, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <>
      {/* Featured hero */}
      {featured && (
        <Link href={`/news/${featured.slug}`} className="group block mb-8">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/7] bg-gray-100 dark:bg-zinc-800">
            {featured.image_url ? (
              <Image
                src={featured.image_url}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#2D7D46] to-[#1a5c33]" />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-2">
                {featured.is_trending && (
                  <span className="text-xs font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                    🔥 Trending
                  </span>
                )}
                <span className="text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                  ✨ Berita Unggulan
                </span>
                <span className="text-xs text-white/70">
                  {featured.category}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:underline">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="text-sm text-white/80 line-clamp-2 hidden sm:block">{featured.excerpt}</p>
              )}
              {featured.published_at && (
                <p className="text-xs text-white/60 mt-2">
                  {new Date(featured.published_at).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </Link>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-52">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); resetPage(); }}
            placeholder="Cari berita…"
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 outline-none focus:border-[#2D7D46] dark:focus:border-emerald-500 text-gray-900 dark:text-white"
          />
          {search && (
            <button onClick={() => { setSearch(""); resetPage(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
          )}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value as "terbaru" | "terpopuler"); resetPage(); }}
          className="text-sm border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 outline-none focus:border-[#2D7D46]"
        >
          <option value="terbaru">Terbaru</option>
          <option value="terpopuler">Terpopuler</option>
        </select>
      </div>

      {/* Category chip filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); resetPage(); }}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              category === cat
                ? "bg-[#2D7D46] text-white"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
          >
            {cat === "all" ? "Semua" : cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
        {filtered.length === 0
          ? "Tidak ada hasil"
          : `${filtered.length} artikel${search || category !== "all" ? " ditemukan" : ""}`
        }
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-400 dark:text-gray-500 text-sm">
          Tidak ada berita yang sesuai filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((item) => (
            <Link key={item.id} href={`/news/${item.slug}`} className="group">
              <article className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-md hover:border-[#2D7D46]/30 dark:hover:border-emerald-700/40 transition-all h-full flex flex-col">
                {/* Thumbnail */}
                <div className="aspect-video relative bg-gray-100 dark:bg-zinc-800 shrink-0">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">📰</div>
                  )}
                  {item.is_trending && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded-full">
                      🔥
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  {/* Category + Date */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      CAT_COLORS[item.category] ?? "bg-gray-100 text-gray-600"
                    }`}>
                      {item.category}
                    </span>
                    {item.published_at && (
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {new Date(item.published_at).toLocaleDateString("id-ID", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[#2D7D46] dark:group-hover:text-emerald-400 transition-colors leading-snug flex-1">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  {item.excerpt && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  )}

                  {/* Footer */}
                  {item.view_count > 0 && (
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-auto">
                      👁 {item.view_count.toLocaleString("id-ID")} dilihat
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-40 flex items-center justify-center text-sm transition-colors"
          >‹</button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce<(number | "…")[]>((acc, p, i, arr) => {
              if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
              acc.push(p); return acc;
            }, [])
            .map((p, i) =>
              p === "…" ? (
                <span key={`e-${i}`} className="w-9 text-center text-xs text-gray-400">…</span>
              ) : (
                <button key={p} onClick={() => setPage(p as number)}
                  className={`w-9 h-9 text-xs rounded-xl border transition-colors ${
                    page === p
                      ? "bg-[#2D7D46] text-white border-[#2D7D46]"
                      : "border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >{p}</button>
              )
            )
          }

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-9 h-9 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-40 flex items-center justify-center text-sm transition-colors"
          >›</button>
        </div>
      )}
    </>
  );
}
