"use client";

import { useState } from "react";
import Verified from "./Verified";
import VideoStoryModal from "./VideoStoryModal";
import { runtime, type VideoStoryItem } from "./data";

/**
 * The grid on the archive page, plus the player it opens.
 *
 * A card is a button rather than a link: the reel plays here, and leaving for
 * Instagram is the fallback offered inside the player, not the default.
 */
export default function VideoStoryGrid({ items }: { items: VideoStoryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-6">
        {items.map((item, index) => (
          <article key={item.id} className="group">
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`Putar: ${item.title}`}
              className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400]"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-zinc-800">
                {item.thumbnail && (
                  /* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage and Instagram CDN, unoptimised here */
                  <img src={item.thumbnail} alt="" loading="lazy"
                       className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]" />
                )}
                <span aria-hidden="true"
                      className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-[10px] text-white backdrop-blur-sm">
                  ▶
                </span>
                {item.durationSec && (
                  <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
                    {runtime(item.durationSec)}
                  </span>
                )}
              </div>
              <h2 className="mt-2.5 line-clamp-2 text-[14px] font-semibold leading-snug text-white group-hover:text-[#f5c400]">
                {item.title}
              </h2>
              <p className="mt-1 flex items-center gap-1 text-[12px] text-white/50">
                {/* The sponsor is what identifies the piece; the posting
                    account is the same on almost all of them. */}
                <span className="truncate">{item.brand ?? item.username}</span>
                <Verified />
              </p>
            </button>
          </article>
        ))}
      </div>

      <VideoStoryModal items={items} index={open} onClose={() => setOpen(null)} onMove={setOpen} />
    </>
  );
}
