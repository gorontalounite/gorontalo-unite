"use client";

import { useCallback, useEffect, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WEB_CATEGORIES } from "./categories";

interface Props {
  activeCategory: string;
  activeSearch: string;
  catCounts: Record<string, number>;
}

export default function BeritaFilters({ activeCategory, activeSearch, catCounts }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    startTransition(() => router.push(`/berita${params.size ? `?${params.toString()}` : ""}`, { scroll: false }));
  }, [router, searchParams]);

  useEffect(() => () => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
  }, []);

  const hasFilters = Boolean(activeCategory || activeSearch);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="sr-only" htmlFor="news-search">Cari artikel</label>
      <div className="relative flex-1">
        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.2-5.2m0 0a7.5 7.5 0 1 0-10.6-10.6 7.5 7.5 0 0 0 10.6 10.6Z" />
        </svg>
        <input
          id="news-search"
          type="search"
          defaultValue={activeSearch}
          onChange={(event) => {
            if (searchTimer.current) clearTimeout(searchTimer.current);
            searchTimer.current = setTimeout(() => update("q", event.target.value.trim()), 350);
          }}
          placeholder="Cari artikel…"
          className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-yellow-400 dark:focus:ring-yellow-400/30"
        />
      </div>

      <label className="sr-only" htmlFor="news-category">Kategori</label>
      <select
        id="news-category"
        value={activeCategory}
        onChange={(event) => update("category", event.target.value)}
        className="min-w-48 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-200 dark:focus:border-yellow-400 dark:focus:ring-yellow-400/30"
      >
        <option value="">Semua kategori</option>
        {WEB_CATEGORIES.filter((category) => catCounts[category.label]).map((category) => (
          <option key={category.key} value={category.key}>
            {category.label}{catCounts[category.label] ? ` (${catCounts[category.label]})` : ""}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={() => startTransition(() => router.push("/berita", { scroll: false }))}
          className="rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:border-zinc-700 dark:text-gray-400 dark:hover:text-white"
        >
          Hapus filter
        </button>
      )}
    </div>
  );
}
