import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { articleBelongsToWebCategory, buildCategoryDeskMap, CATEGORIES, CATEGORY_HERO, CAT_COLOR, DEFAULT_COLOR, WEB_CATEGORY_DESCRIPTIONS, type CategoryRow } from "../categories";
import BeritaPagination from "../BeritaPagination";
import NewsDetailPage, { generateMetadata as generateArticleMetadata } from "@/app/news/[id]/page";

export const dynamic = "force-dynamic";

const LIMIT = 9;

const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

interface Article {
  id: string; title: string; slug: string; category: string; categories: string[];
  tags: string[] | null;
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
  const description = WEB_CATEGORY_DESCRIPTIONS[key] ?? `Berita terkini seputar ${cat.label} di Gorontalo.`;
  return {
    title: cat.label,
    description,
    alternates: { canonical: `/category/${key}` },
    openGraph: {
      title: `${cat.label} | Gorontalo Unite`,
      description,
      url: `/category/${key}`,
      type: "website",
    },
  };
}

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Makassar",
  });
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

  const [{ data: raw }, { data: categoryRows }] = await Promise.all([
    admin
      .from("articles")
      .select("id, title, slug, category, categories, tags, excerpt, image_url, published_at, created_at, is_trending, view_count")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(500),
    admin.from("categories").select("id, name, parent_id, desk_key"),
  ]);
  const deskMap = buildCategoryDeskMap((categoryRows ?? []) as CategoryRow[]);

  const matching = (raw ?? []).filter((article) => {
    if (WEB_CATEGORY_DESCRIPTIONS[key]) return articleBelongsToWebCategory({
      category: article.category as string,
      categories: article.categories as string[] | null,
      tags: article.tags as string[] | null,
      title: article.title as string,
      excerpt: article.excerpt as string | null,
    }, key, deskMap);
    return (article.categories as string[] | null)?.includes(cat.label) || article.category === cat.label;
  });
  const totalCount = matching.length;
  const totalPages = Math.ceil(totalCount / LIMIT);

  const articles: Article[] = matching.slice(offset, offset + LIMIT).map((a) => ({
    id:           a.id as string,
    title:        a.title as string,
    slug:         a.slug as string,
    category:     a.category as string,
    categories:   (a.categories as string[] | null) ?? [a.category as string],
    tags:          a.tags as string[] | null,
    excerpt:      a.excerpt as string | null,
    image_url:    a.image_url as string | null,
    published_at: a.published_at as string | null,
    created_at:   a.created_at as string,
    is_trending:  (a.is_trending as boolean) ?? false,
    view_count:   (a.view_count as number) ?? 0,
  }));

  const hero = CATEGORY_HERO[key];

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24 text-[#101018] dark:bg-zinc-950 dark:text-white md:pb-10">
      {/* The banner carries the section; the name is the only text it needs. */}
      <section className="bg-white pt-4 dark:bg-zinc-950 sm:pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="relative flex min-h-[150px] items-end overflow-hidden rounded-2xl aspect-[851/315]">
            {hero ? (
              <>
                <Image
                  src={hero}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              </>
            ) : (
              // No artwork for this section yet — a tinted band rather than
              // somebody else's photograph.
              <div aria-hidden="true" className={`absolute inset-0 ${colors.bg}`} />
            )}
            <h1
              className={`font-heading relative px-5 pb-4 text-3xl font-semibold tracking-[-.025em] sm:px-8 sm:pb-6 sm:text-4xl ${
                hero ? "text-white [text-shadow:0_1px_12px_rgba(0,0,0,.45)]" : colors.text
              }`}
            >
              {cat.label}
            </h1>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="py-7 text-xs sm:text-sm">
          <Link href="/" className="font-semibold text-brand hover:underline">← All news</Link>
        </div>

        {articles.length === 0 ? (
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="font-heading text-xl font-semibold text-stone-700 dark:text-zinc-200">No articles yet</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-400 dark:text-zinc-500">
              Stories for {cat.label} will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
              {articles.map((article) => {
                const articleCategory = article.categories[0] || article.category;
                const articleColors = CAT_COLOR[articleCategory] ?? DEFAULT_COLOR;
                const publishedAt = article.published_at ?? article.created_at;

                return (
                  <Link
                    key={article.id}
                    href={`/${article.slug}`}
                    className="group flex min-h-36 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-[0_10px_35px_rgba(15,23,42,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(15,23,42,.1)] dark:border-zinc-800 dark:bg-zinc-900 sm:min-h-48"
                  >
                    <div className="category-article-image relative min-h-full shrink-0 overflow-hidden bg-stone-100 dark:bg-zinc-800">
                      {article.image_url ? (
                        <Image
                          src={article.image_url}
                          alt=""
                          fill
                          unoptimized
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 639px) 124px, (max-width: 1023px) 208px, 190px"
                        />
                      ) : (
                        <div className={`absolute inset-0 ${articleColors.bg}`} />
                      )}
                      {article.is_trending && (
                        <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-semibold text-white">
                          Trending
                        </span>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:px-6 sm:py-5">
                      <span className={`w-fit rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[.1em] sm:text-[10px] ${articleColors.badge}`}>
                        {articleCategory}
                      </span>
                      <h2 className="font-heading mt-3 line-clamp-3 text-sm font-semibold leading-snug tracking-[-.015em] text-[#101018] transition group-hover:text-brand dark:text-white sm:text-lg">
                        {article.title}
                      </h2>
                      <time dateTime={publishedAt} className="mt-4 text-[10px] text-stone-400 dark:text-zinc-500 sm:text-xs">
                        {formatDate(publishedAt)}
                      </time>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Suspense>
              <BeritaPagination page={page} totalPages={totalPages} basePath={`/category/${key}`} />
            </Suspense>
          </>
        )}
      </main>
    </div>
  );
}
