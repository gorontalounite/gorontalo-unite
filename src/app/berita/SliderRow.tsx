"use client";

import { Children, useRef } from "react";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

/**
 * Wraps already-rendered cards (from a Server Component) in an
 * arrow-controlled horizontal scroller — sliding through the desk in place
 * instead of navigating away, the way the hero carousel already does.
 */
export default function SliderRow({ children, itemClassName = "w-[78vw] sm:w-[calc((100%-2.5rem)/3)]" }: {
  children: React.ReactNode;
  itemClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: Math.min(node.clientWidth * 0.9, 640) * direction, behavior: "smooth" });
  };

  return (
    <div className="group/slider relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child, index) => (
          <div key={index} className={`shrink-0 snap-start ${itemClassName}`}>{child}</div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Sebelumnya"
        className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 rounded-full border border-stone-200 bg-white/95 p-2 text-[#302f2c] shadow-lg transition hover:bg-white sm:flex dark:border-zinc-700 dark:bg-zinc-800/95 dark:text-white dark:hover:bg-zinc-800"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Berikutnya"
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 rounded-full border border-stone-200 bg-white/95 p-2 text-[#302f2c] shadow-lg transition hover:bg-white sm:flex dark:border-zinc-700 dark:bg-zinc-800/95 dark:text-white dark:hover:bg-zinc-800"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}
