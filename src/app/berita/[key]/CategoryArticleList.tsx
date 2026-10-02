"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CAT_COLOR, DEFAULT_COLOR } from "../categories";

export interface CategoryArticle {
  id: string; title: string; slug: string; category: string; categories: string[];
  tags: string[] | null;
  excerpt: string | null; image_url: string | null; image_thumb_url: string | null;
  published_at: string | null; created_at: string;
  is_trending: boolean; view_count: number;
}

const PAGE_SIZE = 9;

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Makassar",
  });
}

export default function CategoryArticleList({ articles }: { articles: CategoryArticle[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const visible = useMemo(() => articles.slice(0, visibleCount), [articles, visibleCount]);
  const hasMore = visibleCount < articles.length;

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setVisibleCount((count) => Math.min(count + PAGE_SIZE, articles.length));
      }
    }, { rootMargin: "600px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, articles.length]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        {visible.map((article) => {
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
                {article.image_thumb_url ?? article.image_url ? (
                  <Image
                    src={(article.image_thumb_url ?? article.image_url) as string}
                    alt={article.title}
                    fill
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
                <h2 className="font-heading mt-3 line-clamp-3 text-sm font-semibold leading-snug tracking-[-.015em] text-[#101018] transition group-hover-brand dark:text-white sm:text-lg">
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

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-10">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600 dark:border-zinc-700 dark:border-t-zinc-300" aria-hidden />
        </div>
      )}
    </>
  );
}
