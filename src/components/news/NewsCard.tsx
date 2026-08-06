import Image from "next/image";
import Link from "next/link";
import { CAT_COLOR, DEFAULT_COLOR } from "@/app/berita/categories";

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  categories: string[] | null;
  published_at: string | null;
  created_at: string;
  is_trending?: boolean | null;
};

type Variant = "hero" | "feature" | "card" | "compact" | "list" | "channel";

function displayDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Makassar",
  }).format(new Date(value));
}

function firstCategory(article: NewsArticle) {
  return article.categories?.[0] || article.category || "Umum";
}

export function NewsMeta({ article, withCategory = true }: { article: NewsArticle; withCategory?: boolean }) {
  const category = firstCategory(article);
  const color = CAT_COLOR[category] ?? DEFAULT_COLOR;
  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[.13em] text-stone-500 dark:text-zinc-400">
      {withCategory && <span className={`rounded-full px-2 py-1 ${color.badge}`}>{category}</span>}
      <span>Gorontalo Unite</span>
      <span className="h-1 w-1 rounded-full bg-stone-300 dark:bg-zinc-600" />
      <time dateTime={article.published_at ?? article.created_at}>{displayDate(article.published_at ?? article.created_at)}</time>
    </div>
  );
}

export function NewsImage({ article, priority = false, className = "" }: { article: NewsArticle; priority?: boolean; className?: string }) {
  const category = firstCategory(article);
  const color = CAT_COLOR[category] ?? DEFAULT_COLOR;
  return (
    <div className={`relative overflow-hidden bg-stone-100 dark:bg-zinc-800 ${className}`}>
      {article.image_url ? (
        <Image src={article.image_url} alt={article.title} fill priority={priority} unoptimized sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition duration-700 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,196,0,.25),transparent_30%),linear-gradient(135deg,#f8f5ed,#e7e1d3)] dark:bg-[linear-gradient(135deg,#27272a,#18181b)]" />
      )}
      {!article.image_url && <span className={`absolute bottom-4 left-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.16em] ${color.badge}`}>{category}</span>}
    </div>
  );
}

export default function NewsCard({ article, variant = "card" }: { article: NewsArticle; variant?: Variant }) {
  if (variant === "hero" || variant === "compact") {
    const isHero = variant === "hero";
    return (
      <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <Link href={`/berita/${article.slug}`} className="block h-full">
          <div className={isHero ? "p-5 pb-0 sm:p-7 sm:pb-0" : "p-4 pb-0"}>
            <NewsMeta article={article} />
          </div>
          <NewsImage article={article} priority={isHero} className={isHero ? "mx-5 mt-4 aspect-[16/9] sm:mx-7" : "mx-4 mt-3 aspect-[16/9]"} />
          <div className={isHero ? "p-5 sm:p-7" : "p-4"}>
            <h3 className={`font-display font-semibold leading-[1.08] text-stone-950 transition group-hover:text-brand dark:text-white dark:group-hover:text-yellow-300 ${isHero ? "text-2xl sm:text-4xl" : "text-base"}`}>{article.title}</h3>
            {isHero && article.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-500 dark:text-zinc-400">{article.excerpt}</p>}
            {isHero && <span className="mt-4 inline-flex text-sm font-semibold text-brand">Baca selengkapnya <span className="ml-1" aria-hidden>→</span></span>}
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "channel") {
    return <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"><Link href={`/berita/${article.slug}`} className="block h-full"><NewsImage article={article} className="aspect-[9/16]" /><div className="p-4 sm:p-5"><NewsMeta article={article} /><h3 className="mt-3 line-clamp-3 font-display text-base font-semibold leading-[1.14] text-stone-950 transition group-hover:text-brand dark:text-white dark:group-hover:text-yellow-300 sm:text-xl">{article.title}</h3>{article.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500 dark:text-zinc-400">{article.excerpt}</p>}</div></Link></article>;
  }

  const body = (
    <>
      <NewsImage article={article} className={variant === "list" ? "h-full min-h-52 sm:min-h-0" : "aspect-[16/10]"} />
      <div className={variant === "list" ? "p-5 sm:p-7" : "p-5"}>
        <NewsMeta article={article} />
        <h3 className={`mt-3 font-display font-semibold leading-[1.08] text-stone-950 transition group-hover:text-brand dark:text-white dark:group-hover:text-yellow-300 ${variant === "feature" ? "text-xl sm:text-2xl" : "text-xl"}`}>{article.title}</h3>
        {article.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-500 dark:text-zinc-400">{article.excerpt}</p>}
        {variant === "list" && <span className="mt-4 inline-flex text-sm font-semibold text-brand transition group-hover:gap-2">Baca selengkapnya <span aria-hidden>→</span></span>}
      </div>
    </>
  );

  const classes = variant === "list"
    ? "group overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    : "group overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900";

  return <article className={classes}><Link href={`/berita/${article.slug}`} className={variant === "list" ? "grid h-full sm:grid-cols-[.9fr_1.1fr]" : "block h-full"}>{body}</Link></article>;
}
