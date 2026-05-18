"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useRef, useEffect } from "react";
import { CATEGORIES } from "./categories";

interface Props {
  activeCategory: string;
  activeSource:   string;
  activeDate:     string;
  activeSearch:   string;
  catCounts:      Record<string, number>;
}

export default function BeritaFilters({
  activeCategory,
  activeSource,
  activeDate,
  activeSearch,
  catCounts,
}: Props) {
  const router     = useRouter();
  const sp         = useSearchParams();
  const [, startT] = useTransition();
  const searchRef  = useRef<HTMLInputElement>(null);

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(sp.toString());
      if (value) params.set(key, value); else params.delete(key);
      params.delete("page");
      startT(() => router.push("/berita?" + params.toString(), { scroll: false }));
    },
    [router, sp],
  );

  useEffect(() => {
    if (searchRef.current) searchRef.current.value = activeSearch;
  }, [activeSearch]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const t = setTimeout(() => update("q", val), 400);
      return () => clearTimeout(t);
    },
    [update],
  );

  const hasFilters = !!(activeCategory || activeSource || activeDate || activeSearch);

  return (
    <div className="space-y-3">
      {/* Search row */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={searchRef}
            type="search"
            defaultValue={activeSearch}
            onChange={handleSearch}
            placeholder="Cari artikel…"
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 dark:focus:ring-yellow-400/30 focus:border-brand dark:focus:border-yellow-400 transition-all placeholder:text-gray-400 dark:text-white"
          />
        </div>
        {hasFilters && (
          <button
            onClick={() => { startT(() => router.push("/berita", { scroll: false })); }}
            className="text-sm px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-zinc-700 rounded-xl transition-colors flex-shrink-0"
          >
            ✕ Hapus
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => update("category", "")}
          className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border font-medium transition-all ${
            !activeCategory
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
              : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500"
          }`}
        >
          Semua
        </button>
        {CATEGORIES.map((c) => {
          const count  = catCounts[c.label] ?? 0;
          const active = activeCategory === c.key;
          return (
            <button
              key={c.key}
              onClick={() => update("category", active ? "" : c.key)}
              className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border font-medium transition-all ${
                active
                  ? "bg-brand dark:bg-yellow-400 text-black border-brand dark:border-yellow-400"
                  : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500"
              }`}
            >
              {c.label}
              {count > 0 && (
                <span className="ml-1.5 opacity-50">{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
