import Link from "next/link";
import Image from "next/image";
import ArticleHeroImage from "./ArticleHeroImage";
import ShareButtons from "./ShareButtons";

export interface ArticleHeroCategory {
  label: string;
  href: string;
  /** Tint used when the header sits on the page ground instead of a photo. */
  className: string;
}

interface Props {
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  categories: ArticleHeroCategory[];
  isTrending: boolean;
  isSponsored: boolean;
  publishedDate: string | null;
  viewCount: number;
  shareUrl: string;
  readMinutes: number;
}

/**
 * Article masthead. With a featured image it becomes a full-bleed photo hero
 * carrying the eyebrow, headline, standfirst and byline; without one it falls
 * back to the same order set on the page ground, so imageless posts keep a
 * complete header instead of an empty frame.
 */
export default function ArticleHero(props: Props) {
  if (!props.imageUrl) {
    return (
      <header className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        <HeroContent {...props} onPhoto={false} />
      </header>
    );
  }

  return (
    <header className="relative overflow-hidden bg-zinc-900 text-white">
      <ArticleHeroImage src={props.imageUrl} />
      <div className="relative mx-auto flex min-h-[30rem] max-w-5xl flex-col justify-end px-4 pb-6 pt-24 sm:min-h-[34rem] sm:px-6 sm:pb-8 sm:pt-32 lg:min-h-[38rem] lg:px-8">
        <HeroContent {...props} onPhoto />
      </div>
    </header>
  );
}

function HeroContent({
  title, excerpt, categories, isTrending, isSponsored,
  publishedDate, viewCount, shareUrl, readMinutes, onPhoto,
}: Props & { onPhoto: boolean }) {
  const flagClass = onPhoto
    ? "bg-white/15 text-white ring-1 ring-inset ring-white/30"
    : "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300";

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {categories.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className={
              onPhoto
                ? "text-[11px] font-bold uppercase tracking-[.14em] text-white underline decoration-amber-400 decoration-2 underline-offset-[6px] transition hover:decoration-white sm:text-xs"
                : `rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.13em] ${category.className}`
            }
          >
            {category.label}
          </Link>
        ))}
        {isTrending && (
          <span className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.13em] ${flagClass}`}>
            Trending
          </span>
        )}
        {isSponsored && (
          <span className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.13em] ${flagClass}`}>
            Sponsored
          </span>
        )}
      </div>

      <h1
        className={`mt-3 max-w-4xl font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.025em] sm:mt-4 sm:text-5xl sm:leading-[1.06] lg:text-[3.4rem] ${
          onPhoto ? "text-white" : "text-[#101018] dark:text-white"
        }`}
      >
        {title}
      </h1>

      {excerpt && (
        <p
          className={`mt-3 max-w-3xl font-serif text-[1.0625rem] leading-[1.6] sm:mt-4 sm:text-xl lg:text-[1.4rem] ${
            onPhoto ? "text-white/90" : "text-stone-600 dark:text-zinc-300"
          }`}
        >
          {excerpt}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-4 sm:mt-7 sm:flex-row-reverse sm:items-center sm:justify-between sm:gap-6">
        <ShareButtons
          url={shareUrl}
          title={title}
          compact
          readMinutes={readMinutes}
          tone={onPhoto ? "dark" : "surface"}
        />

        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo-gu.png"
            alt=""
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
          />
          <div className="min-w-0">
            <Link
              href="/author/gorontalounite"
              className={`block text-sm font-semibold hover:underline ${onPhoto ? "text-white" : "text-[#101018] dark:text-zinc-100"}`}
            >
              @gorontalounite
            </Link>
            <p className={`mt-0.5 text-[11px] sm:text-xs ${onPhoto ? "text-white/75" : "text-stone-500 dark:text-zinc-400"}`}>
              {publishedDate}
              {publishedDate && viewCount > 0 && <span aria-hidden="true"> · </span>}
              {viewCount > 0 && `${viewCount.toLocaleString("id-ID")} kali dilihat`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
