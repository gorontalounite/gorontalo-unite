"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type LatestArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
};

const LOAD_SIZE = 6;

function articleDate(article: LatestArticle) {
  return article.published_at ?? article.created_at;
}

function displayDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Makassar",
  }).format(new Date(value));
}

function Thumbnail({ article }: { article: LatestArticle }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#e8e4dc] dark:bg-zinc-800">
      {article.image_url ? (
        <Image
          src={article.image_url}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 639px) 112px, 150px"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,196,0,.55),transparent_28%),linear-gradient(135deg,#eee9df,#cfc9bb)]" />
      )}
    </div>
  );
}

export default function LatestNewsGrid({ articles }: { articles: LatestArticle[] }) {
  const [visibleCount, setVisibleCount] = useState(LOAD_SIZE);
  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <>
      <div className="grid gap-x-8 sm:grid-cols-2">
        {visibleArticles.map((article) => (
          <article key={article.id} className="group border-b border-[#d7d1c6] dark:border-zinc-800 py-5 first:pt-0 sm:[&:nth-child(2)]:pt-0">
            <Link href={`/${article.slug}`} className="grid grid-cols-[minmax(0,1fr)_112px] gap-4 sm:grid-cols-[minmax(0,1fr)_140px] sm:gap-5">
              <div className="min-w-0">
                <time className="text-[10px] font-bold uppercase tracking-[.15em] text-[#77736b] dark:text-zinc-400" dateTime={articleDate(article)}>{displayDate(articleDate(article))}</time>
                <h3 className="mt-2 line-clamp-3 text-[16px] font-bold leading-[1.12] tracking-[-.015em] transition group-hover:text-[#9b7513] sm:text-[18px]">{article.title}</h3>
                {article.excerpt ? <p className="mt-3 hidden line-clamp-2 text-xs leading-relaxed text-[#6d6961] dark:text-zinc-400 lg:block">{article.excerpt}</p> : null}
              </div>
              <Thumbnail article={article} />
            </Link>
          </article>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + LOAD_SIZE, articles.length))}
            className="rounded-[4px] border border-[#302f2c] dark:border-zinc-100 px-5 py-2.5 text-xs font-bold uppercase tracking-[.1em] text-[#302f2c] dark:text-zinc-50 transition hover:border-[#9b7513] hover:bg-[#f5c400] hover:text-black"
          >
            Load more news
          </button>
        </div>
      ) : null}
    </>
  );
}
