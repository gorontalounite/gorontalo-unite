"use client";

import { useState } from "react";

export default function SaveArticleButton({ url }: { url: string }) {
  const [saved, setSaved] = useState(false);

  const toggleSaved = () => {
    const next = !saved;
    setSaved(next);
    try { localStorage.setItem(`saved-article:${url}`, next ? "1" : "0"); } catch { /* optional preference */ }
  };

  return (
    <button
      type="button"
      onClick={toggleSaved}
      className="inline-flex items-center gap-1 font-medium text-[#101018] hover:text-brand dark:text-zinc-100"
      aria-pressed={saved}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-3.5 w-3.5 stroke-current ${saved ? "fill-current" : "fill-none"}`} strokeWidth="1.8">
        <path d="M6.5 4.5h11v16L12 17l-5.5 3.5z" strokeLinejoin="round" />
      </svg>
      <span>{saved ? "Tersimpan" : "Simpan"}</span>
    </button>
  );
}
