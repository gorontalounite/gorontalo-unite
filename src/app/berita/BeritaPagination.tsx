"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface Props {
  page:       number;
  totalPages: number;
}

export default function BeritaPagination({ page, totalPages }: Props) {
  const router     = useRouter();
  const sp         = useSearchParams();
  const [, startT] = useTransition();

  if (totalPages <= 1) return null;

  const go = (p: number) => {
    const params = new URLSearchParams(sp.toString());
    if (p === 1) params.delete("page"); else params.set("page", String(p));
    startT(() => router.push("/berita?" + params.toString(), { scroll: true }));
  };

  // Build page range with ellipsis
  const range: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) range.push(i);
  } else {
    range.push(1);
    if (page > 3) range.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) range.push(i);
    if (page < totalPages - 2) range.push("…");
    range.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 py-12">
      {/* Prev */}
      <button
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 text-sm text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400 dark:hover:border-zinc-500 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {range.map((r, i) =>
        r === "…" ? (
          <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
            …
          </span>
        ) : (
          <button
            key={r}
            onClick={() => go(r)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
              r === page
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border border-gray-900 dark:border-white"
                : "border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-zinc-500"
            }`}
          >
            {r}
          </button>
        ),
      )}

      {/* Next */}
      <button
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 text-sm text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400 dark:hover:border-zinc-500 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
