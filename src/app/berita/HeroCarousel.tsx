"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveWebCategoryLabel } from "./categories";

export interface HeroArticleData {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  categories: string[] | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

function articleDate(article: HeroArticleData) {
  return article.published_at ?? article.created_at;
}

function displayDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Makassar" }).format(new Date(value));
}

function HeroEyebrow({ article, deskMap }: { article: HeroArticleData; deskMap: Readonly<Record<string, string>> }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-white/70">
      <span className="text-[#f5c400]">{resolveWebCategoryLabel(article, deskMap)}</span>
      <span aria-hidden>•</span>
      <time dateTime={articleDate(article)}>{displayDate(articleDate(article))}</time>
    </div>
  );
}

function HeroImage({ article, className, priority = false, sizes }: { article: HeroArticleData; className: string; priority?: boolean; sizes: string }) {
  return (
    <div className={`bg-[#e8e4dc] ${className}`}>
      {article.image_url ? (
        <Image src={article.image_url} alt="" fill priority={priority} loading={priority ? "eager" : "lazy"} unoptimized sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,196,0,.55),transparent_28%),linear-gradient(135deg,#eee9df,#cfc9bb)]" />
      )}
    </div>
  );
}

const ROTATE_MS = 6000;
const FADE_MS = 350;

export default function HeroCarousel({ pool, deskMap }: { pool: HeroArticleData[]; deskMap: Readonly<Record<string, string>> }) {
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(true);
  const total = pool.length;

  useEffect(() => {
    if (total <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let fadeTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setVisible(false);
      fadeTimeout = setTimeout(() => {
        setOffset((value) => (value + 1) % total);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => { clearInterval(interval); clearTimeout(fadeTimeout); };
  }, [total]);

  if (total === 0) return null;

  const hero = pool[offset % total];
  const heroSide: HeroArticleData[] = [];
  for (let step = 1; step < total && heroSide.length < 2; step += 1) {
    const candidate = pool[(offset + step) % total];
    if (candidate.id !== hero.id) heroSide.push(candidate);
  }

  const fadeClass = `transition-[opacity,transform] duration-300 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.7fr_.8fr]">
      <article key={hero.id} className={`group relative min-h-[440px] overflow-hidden rounded-[4px] bg-black sm:min-h-[570px] ${fadeClass}`}>
        <HeroImage article={hero} className="absolute inset-0 h-full w-full" priority sizes="(max-width: 1024px) 100vw, 70vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <Link href={`/${hero.slug}`} className="absolute inset-0 flex items-end p-6 sm:p-10">
          <div className="max-w-3xl text-white">
            <HeroEyebrow article={hero} deskMap={deskMap} />
            <h1 className="mt-3 font-display text-[30px] font-extrabold leading-[1.02] tracking-[-.04em] sm:text-[46px]">{hero.title}</h1>
            {hero.excerpt ? <p className="mt-4 hidden max-w-2xl text-sm leading-relaxed text-white/75 sm:line-clamp-2">{hero.excerpt}</p> : null}
          </div>
        </Link>
      </article>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
        {heroSide.map((article) => (
          <article key={article.id} className={`group relative min-h-[240px] overflow-hidden rounded-[4px] bg-black sm:min-h-[275px] ${fadeClass}`}>
            <HeroImage article={article} className="absolute inset-0 h-full w-full" sizes="(max-width: 1024px) 50vw, 30vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <Link href={`/${article.slug}`} className="absolute inset-0 flex items-end p-4 sm:p-6">
              <div className="text-white">
                <HeroEyebrow article={article} deskMap={deskMap} />
                <h2 className="mt-2 line-clamp-3 font-display text-[16px] font-extrabold leading-[1.08] tracking-[-.02em] sm:text-[20px]">{article.title}</h2>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
