"use client";

import { useEffect, useRef } from "react";
import Verified from "./Verified";
import { embedSrc, prettyDate, runtime, type VideoStoryItem } from "./data";

/**
 * A reel opened in place, rather than a tab thrown at Instagram.
 *
 * The player is Instagram's own embed. It plays for signed-out visitors —
 * checked with no session cookie present, video running, no login wall — so
 * this needs no video hosting of its own to ship. The frame carries
 * Instagram's chrome and about 600KB, which is the price of not hosting
 * anything; the iframe is therefore mounted only for the reel being watched,
 * never for the ones either side of it.
 */
export default function VideoStoryModal({
  items, index, onClose, onMove,
}: {
  items: VideoStoryItem[];
  /** Null when nothing is open. */
  index: number | null;
  onClose: () => void;
  onMove: (next: number) => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && index !== null && index < items.length - 1) onMove(index + 1);
      if (event.key === "ArrowLeft" && index !== null && index > 0) onMove(index - 1);
    };
    document.addEventListener("keydown", onKey);

    // Hold the page still without letting the layout jump sideways as the
    // scrollbar goes.
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    panel.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open, index, items.length, onClose, onMove]);

  if (!item) return null;

  const src = embedSrc(item.permalink);
  const first = index === 0;
  const last = index === items.length - 1;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 pt-14 sm:p-6">
      <button type="button" aria-label="Tutup" onClick={onClose}
              className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-sm" />

      <button type="button" onClick={onClose} aria-label="Tutup"
              className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg text-white backdrop-blur-sm transition hover:bg-white/30 sm:left-auto sm:right-6 sm:top-6 sm:h-9 sm:w-9">
        ✕
      </button>

      {!first && <Nav side="left" onClick={() => onMove(index! - 1)} />}
      {!last && <Nav side="right" onClick={() => onMove(index! + 1)} />}

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        tabIndex={-1}
        className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white outline-none md:flex-row"
      >
        <div className="flex w-full shrink-0 items-center justify-center bg-black md:w-[58%]">
          {src ? (
            <iframe
              // Keyed on the reel: without it the iframe keeps the previous
              // video's player and simply swaps the source underneath.
              key={item.id}
              src={src}
              title={item.title}
              loading="lazy"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-[64vh] w-full border-0 sm:h-[70vh] md:h-[78vh]"
            />
          ) : (
            <p className="p-10 text-center text-sm text-white/60">Video tidak dapat dimuat.</p>
          )}
        </div>

        {/* Compact on a phone, where the panel and the player share one
            column and every pixel it takes is one the video loses. */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3.5 md:p-5">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
            <span className="truncate">{item.username}</span>
            <Verified />
          </div>
          <p className="mt-0.5 text-xs text-gray-400">
            {prettyDate(item.publishedAt)}
            {item.durationSec ? ` · ${runtime(item.durationSec)}` : ""}
          </p>

          <h2 className="mt-2.5 line-clamp-3 text-[15px] font-bold leading-snug tracking-[-.01em] text-gray-900 md:mt-4 md:line-clamp-none md:text-[17px]">
            {item.title}
          </h2>

          {item.brand && (
            <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-600 md:mt-3 md:text-xs">
              in collaboration with <strong className="font-semibold text-gray-800">{item.brand}</strong>
            </p>
          )}

          <div className="mt-auto pt-3 md:pt-6">
            <a href={item.permalink} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-900">
              Buka di Instagram <span aria-hidden>↗</span>
            </a>
            <p className="mt-1.5 text-[11px] text-gray-400">
              {index! + 1} dari {items.length}
              <span className="hidden sm:inline"> · gunakan ← → untuk berpindah</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Video sebelumnya" : "Video berikutnya"}
      className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/25 sm:flex ${
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
