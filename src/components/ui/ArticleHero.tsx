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
  imageUrl: string | null;
  categories: ArticleHeroCategory[];
  isTrending: boolean;
  isSponsored: boolean;
  sponsorName: string | null;
  sponsorLogoUrl: string | null;
  publishedDate: string | null;
  shareUrl: string;
  readMinutes: number;
}

/**
 * Article masthead. With a featured image it becomes a full-bleed photo hero on
 * a fixed ratio per breakpoint, so the crop stays the same whatever the
 * headline's length: the section labels ride the top edge and the headline and
 * byline sit at the foot. Without an image it falls back to the same running
 * order on the page ground, so imageless posts keep a complete header.
 */
export default function ArticleHero(props: Props) {
  if (!props.imageUrl) {
    return (
      <header className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        <Labels {...props} onPhoto={false} />
        <Masthead {...props} onPhoto={false} />
      </header>
    );
  }

  return (
    <header className="relative flex aspect-[4/5] w-full flex-col overflow-hidden bg-zinc-900 text-white sm:aspect-[4/3] lg:aspect-[16/9] lg:max-h-[78vh]">
      <ArticleHeroImage src={props.imageUrl} />
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-between gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <Labels {...props} onPhoto />
        <div>
          <Masthead {...props} onPhoto />
        </div>
      </div>
    </header>
  );
}

function Labels({ categories, isTrending, isSponsored, onPhoto }: Props & { onPhoto: boolean }) {
  const flagClass = onPhoto
    ? "bg-white/15 text-white ring-1 ring-inset ring-white/30"
    : "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300";

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      {categories.map((category) => (
        <Link
          key={category.label}
          href={category.href}
          className={
            onPhoto
              ? "text-[10px] font-bold uppercase tracking-[.12em] text-white underline decoration-amber-400 decoration-2 underline-offset-[5px] transition hover:decoration-white"
              : `rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-[.12em] ${category.className}`
          }
        >
          {category.label}
        </Link>
      ))}
      {isTrending && (
        <span className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-[.12em] ${flagClass}`}>
          Trending
        </span>
      )}
      {isSponsored && (
        <span className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-[.12em] ${flagClass}`}>
          Sponsored
        </span>
      )}
    </div>
  );
}

function Masthead({
  title, isSponsored, sponsorName, sponsorLogoUrl,
  publishedDate, shareUrl, readMinutes, onPhoto,
}: Props & { onPhoto: boolean }) {
  return (
    <>
      <h1
        className={`max-w-4xl font-display text-[1.75rem] font-bold leading-[1.14] tracking-[.01em] sm:text-5xl sm:leading-[1.06] lg:text-[3.4rem] ${
          onPhoto ? "text-white" : "mt-3 text-[#101018] dark:text-white sm:mt-4"
        }`}
      >
        {title}
      </h1>

      {isSponsored && sponsorName && (
        <div className={`mt-4 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs ${onPhoto ? "text-white/75" : "text-stone-500 dark:text-zinc-400"}`}>
          <span>
            in collaboration with:{" "}
            <strong className={`font-semibold ${onPhoto ? "text-white" : "text-stone-700 dark:text-zinc-200"}`}>{sponsorName}</strong>
          </span>
          {sponsorLogoUrl && (
            <Image src={sponsorLogoUrl} alt={`Logo ${sponsorName}`} width={72} height={20} className="h-4 w-auto max-w-16 object-contain sm:h-5 sm:max-w-[72px]" sizes="72px" />
          )}
        </div>
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
            {publishedDate && (
              <p className={`mt-0.5 text-[11px] sm:text-xs ${onPhoto ? "text-white/75" : "text-stone-500 dark:text-zinc-400"}`}>
                {publishedDate}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
