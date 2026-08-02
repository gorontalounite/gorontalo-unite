import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, CAT_COLOR, DEFAULT_COLOR } from "../categories";
import BeritaPagination from "../BeritaPagination";
import NewsDetailPage, { generateMetadata as generateArticleMetadata } from "@/app/news/[id]/page";

export const dynamic = "force-dynamic";

const LIMIT = 9;

const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));
const LABEL_TO_KEY: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.label, c.key]));

interface Article {
  id: string; title: string; slug: string; category: string; categories: string[];
  excerpt: string | null; image_url: string | null;
  published_at: string | null; created_at: string;
  is_trending: boolean; view_count: number;
}

interface Props {
  params:       Promise<{ key: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params;
  if (!CAT_MAP[key]) return generateArticleMetadata({ params: Promise.resolve({ id: key }) });
  const cat = CAT_MAP[key];
  if (!cat) return { title: "Gorontalo Unite" };
  return {
    title:       `${cat.label} — Gorontalo Unite`,
    description: `Berita terkini seputar ${cat.label} di Gorontalo.`,
    openGraph:   { title: `${cat.label} | Gorontalo Unite`, type: "website" },
  };
}

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default async function BeritaCategoryPage({ params, searchParams }: Props) {
  const { key }  = await params;
  const { page: pageParam } = await searchParams;
  const cat = CAT_MAP[key];
  if (!cat) return <NewsDetailPage params={Promise.resolve({ id: key })} />;

  const page   = Math.max(1, parseInt(pageParam ?? "1"));
  const offset = (page - 1) * LIMIT;
  const colors = CAT_COLOR[cat.label] ?? DEFAULT_COLOR;
  const admin  = await createClient();

  const { data: raw, count } = await admin
    .from("articles")
    .select("id, title, slug, category, categories, excerpt, image_url, published_at, created_at, is_trending, view_count", { count: "exact" })
    .eq("published", true)
    .contains("categories", [cat.label])
    .order("published_at", { ascending: false, nullsFirst: false })
    .range(offset, offset + LIMIT - 1);

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / LIMIT);

  const articles: Article[] = (raw ?? []).map((a) => ({
    id:           a.id as string,
    title:        a.title as string,
    slug:         a.slug as string,
    category:     a.category as string,
    categories:   (a.categories as string[] | null) ?? [a.category as string],
    excerpt:      a.excerpt as string | null,
    image_url:    a.image_url as string | null,
    published_at: a.published_at as string | null,
    created_at:   a.created_at as string,
    is_trending:  (a.is_trending as boolean) ?? false,
    view_count:   (a.view_count as number) ?? 0,
  }));

  const grid = articles;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-brand dark:hover:text-yellow-400 transition-colors">Beranda</Link>
        <span>/</span>
        <Link href="/berita" className="hover:text-brand dark:hover:text-yellow-400 transition-colors">Berita</Link>
        <span>/</span>
        <span className={`font-medium ${colors.text}`}>{cat.label}</span>
      </nav>

      {/* Header */}
      <div className="mb-10 pb-8 border-b border-gray-100 dark:border-zinc-800">
        <h1 className={`font-display text-4xl sm:text-5xl font-bold mb-2 leading-none tracking-tight ${colors.text}`}>
          {cat.label}
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          {totalCount > 0
            ? `${totalCount} artikel · halaman ${page} dari ${totalPages}`
            : "Belum ada artikel"}
        </p>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((c) => (
          <Link
            key={c.key}
            href={`/berita/${c.key}`}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              c.key === key
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                : "border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-zinc-500"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {articles.length === 0 && (
        <div className="flex flex-col items-center py-24 text-center">
          <h2 className="font-display text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Belum ada artikel
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs mb-6">
            Konten kategori {cat.label} akan segera hadir.
          </p>
          <Link href="/berita" className="px-5 py-2 bg-[#F5C400] text-black text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">
            ← Semua berita
          </Link>
        </div>
      )}

      {articles.length > 0 && (
        <>
          {/* Grid 3×3 */}
          {grid.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {grid.map((article) => (
                  <div
                    key={article.id}
                    className="relative group flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-lg transition-all duration-300"
                  >
                    <Link href={`/berita/${article.slug}`} className="absolute inset-0 z-[1]" aria-label={article.title} />
                    <div className="relative aspect-[16/10] bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                      {article.image_url ? (
                        <Image src={article.image_url} alt={article.title} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      ) : (
                        <div className={`w-full h-full ${colors.bg} opacity-60`} />
                      )}
                      {article.is_trending && (
                        <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">
                          Trending
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-4 sm:p-5 space-y-2.5">
                      <div className="relative z-[2] flex flex-wrap gap-1">
                        {article.categories.map((c) => {
                          const k = LABEL_TO_KEY[c] ?? c.toLowerCase();
                          const bc = CAT_COLOR[c] ?? DEFAULT_COLOR;
                          return (
                            <Link key={c} href={`/berita/${k}`}
                              className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${bc.badge}`}>
                              {c}
                            </Link>
                          );
                        })}
                      </div>
                      <h3 className="relative z-[1] font-display text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
                          {article.excerpt}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500 pt-1">
                        {formatDate(article.published_at ?? article.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          <Suspense>
            <BeritaPagination
              page={page}
              totalPages={totalPages}
              basePath={`/berita/${key}`}
            />
          </Suspense>

          {/* Back link */}
          <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-4">
            <Link href="/berita" className="text-sm text-brand dark:text-yellow-400 font-medium hover:underline">
              ← Semua berita
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
