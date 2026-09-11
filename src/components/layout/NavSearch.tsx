"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Opens the article search that the homepage already serves through ?q=.
 * The query was live long before this control existed; it simply had no way in
 * from the header.
 */
export default function NavSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const query = term.trim();
    if (!query) return;
    setOpen(false);
    router.push(`/?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Tutup pencarian" : "Cari artikel"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-gray-100 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
          <form onSubmit={submit} className="mx-auto flex max-w-6xl gap-2">
            <input
              ref={inputRef}
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
              type="search"
              placeholder="Cari berita…"
              aria-label="Kata kunci pencarian"
              className="min-h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus-visible:border-brand dark:border-zinc-700 dark:bg-zinc-900"
            />
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-amber-300 dark:text-zinc-950 dark:hover:bg-amber-200"
            >
              Cari
            </button>
          </form>
        </div>
      )}
    </>
  );
}
