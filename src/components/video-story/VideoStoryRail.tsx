"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { VIDEO_STORY_HREF, type VideoStoryItem, runtime } from "./data";
import Verified from "./Verified";

/**
 * The Video Story rail on the homepage: ten covers on black, moved by arrows
 * rather than by guessing that the strip scrolls.
 *
 * The arrows are the only reason this is a client component. They hide when
 * there is nothing further that way, so they never sit there doing nothing.
 */
export default function VideoStoryRail({ items }: { items: VideoStoryItem[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });

  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    const read = () => setEdge({
      start: node.scrollLeft <= 4,
      end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 4,
    });
    read();
    node.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => { node.removeEventListener("scroll", read); window.removeEventListener("resize", read); };
  }, [items.length]);

  const nudge = (direction: 1 | -1) => {
    const node = rail.current;
    if (!node) return;
    // Roughly one screenful, so a press always lands on a fresh set of covers.
    node.scrollBy({ left: direction * Math.max(240, node.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={rail}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-4 sm:scroll-pl-0 sm:px-0"
      >
        {items.map((item) => (
          <article key={item.id} className="group w-[42vw] shrink-0 snap-start sm:w-[190px]">
            <a href={item.permalink} target="_blank" rel="noopener noreferrer"
               className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[4px] bg-zinc-800">
                {item.thumbnail && (
                  /* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage and Instagram CDN, unoptimised here */
                  <img src={item.thumbnail} alt="" loading="lazy"
                       className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]" />
                )}
                <span aria-hidden="true"
                      className="absolute bottom-1.5 left-1.5 flex h-5 w-5 items-center justify-center rounded bg-black/60 text-[9px] text-white">
                  ▶
                </span>
                {item.durationSec && (
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1 py-0.5 text-[10px] font-medium tabular-nums text-white">
                    {runtime(item.durationSec)}
                  </span>
                )}
              </div>
              <h3 className="mt-2 line-clamp-2 text-[13px] font-semibold leading-snug text-white transition group-hover:text-[#f5c400]">
                {item.title}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/45">
                <span className="truncate">@{item.username}</span>
                <Verified className="h-2.5 w-2.5" />
              </p>
            </a>
          </article>
        ))}

        <Link href={VIDEO_STORY_HREF}
              className="flex w-[42vw] shrink-0 snap-start items-center justify-center rounded-[4px] border border-white/15 text-xs font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white sm:w-[190px]">
          View all →
        </Link>
      </div>

      {!edge.start && <Arrow side="left" onClick={() => nudge(-1)} />}
      {!edge.end && <Arrow side="right" onClick={() => nudge(1)} />}
    </div>
  );
}

function Arrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Geser ke kiri" : "Geser ke kanan"}
      className={`absolute top-[28%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sm text-black shadow-lg transition hover:bg-white sm:flex ${
        side === "left" ? "-left-4" : "-right-4"
      }`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
