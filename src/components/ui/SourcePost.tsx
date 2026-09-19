import { shortcodeOf } from "@/components/video-story/data";

/**
 * The Instagram post an article was written from, shown at the foot of it.
 *
 * Placed after the writing rather than above it: the article is the piece of
 * work, and the post is where it started. A reader who wants the original has
 * it; one who does not is never made to scroll past a 600KB frame to reach
 * the text.
 *
 * Instagram's own embed, which plays for signed-out visitors without a login
 * wall — the same frame Video Story uses.
 */
export default function SourcePost({ permalink }: { permalink: string }) {
  const code = shortcodeOf(permalink);
  if (!code) return null;

  return (
    <figure className="mt-10 border-t border-stone-200 pt-7 dark:border-zinc-800">
      <figcaption className="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#9b7513] dark:text-amber-400">
        Postingan aslinya
      </figcaption>
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50 dark:border-zinc-800 dark:bg-zinc-900">
        <iframe
          src={`https://www.instagram.com/reel/${code}/embed/`}
          title="Postingan Instagram sumber artikel ini"
          loading="lazy"
          scrolling="no"
          allow="clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-[620px] w-full border-0"
        />
      </div>
      <a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 inline-flex items-center gap-1 text-xs text-stone-500 transition-colors hover:text-stone-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        Buka di Instagram <span aria-hidden>↗</span>
      </a>
    </figure>
  );
}
