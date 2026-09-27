"use client";

import { Children, useEffect, useRef, useState } from "react";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

/**
 * Wraps already-rendered cards (from a Server Component) in a horizontal
 * scroller with prev/next controls underneath — visible at every breakpoint,
 * not just hover-revealed side arrows a touch device would never see.
 */
export default function SliderRow({ children, itemClassName = "w-[78vw] sm:w-[calc((100%-2.5rem)/3)]" }: {
  children: React.ReactNode;
  itemClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const node = trackRef.current;
    if (!node) return;
    setAtStart(node.scrollLeft <= 4);
    setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const node = trackRef.current;
    if (!node) return;
    node.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      node.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scroll = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: Math.min(node.clientWidth * 0.9, 640) * direction, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child, index) => (
          <div key={index} className={`shrink-0 snap-start ${itemClassName}`}>{child}</div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={atStart}
          aria-label="Sebelumnya"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-[#302f2c] shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={atEnd}
          aria-label="Berikutnya"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-[#302f2c] shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
