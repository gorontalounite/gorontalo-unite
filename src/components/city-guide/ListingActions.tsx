"use client";

import { useState } from "react";

export default function ListingActions({ name }: { name: string }) {
  const [loved, setLoved] = useState(false);
  const [shared, setShared] = useState(false);

  async function share() {
    const data = { title: name, text: `Lihat ${name} di Gorontalo Unite`, url: window.location.href };
    if (navigator.share) await navigator.share(data);
    else await navigator.clipboard?.writeText(window.location.href);
    setShared(true);
  }

  return <section id="diskusi" className="mt-10 border-y border-stone-200 py-5 dark:border-zinc-800">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Interaksi</p>
    <div className="mt-3 flex flex-wrap gap-2">
      <button type="button" onClick={() => setLoved((value) => !value)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${loved ? "border-rose-200 bg-rose-50 text-rose-700" : "border-stone-200 bg-white text-slate-700 hover:border-rose-200 hover:text-rose-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"}`}>{loved ? "♥ Disukai" : "♡ Suka"}</button>
      <button type="button" onClick={() => document.getElementById("komentar")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-amber-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">◌ Komentar</button>
      <button type="button" onClick={share} className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-amber-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">↗ {shared ? "Tautan disalin" : "Bagikan"}</button>
    </div>
  </section>;
}
