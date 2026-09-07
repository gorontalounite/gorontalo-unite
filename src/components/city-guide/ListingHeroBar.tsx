"use client";

import Link from "next/link";
import { useState } from "react";

/** Overlay controls on a City Guide hero image: back to the directory, share the listing. */
export default function ListingHeroBar({ name, backHref = "/city-guide", className }: { name: string; backHref?: string; className?: string }) {
  const [shared, setShared] = useState(false);

  async function share() {
    const data = { title: name, text: `Lihat ${name} di Gorontalo Unite`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard?.writeText(window.location.href);
      setShared(true);
    } catch { /* user dismissed the share sheet */ }
  }

  return <div className={className}>
    <Link href={backHref} aria-label="Kembali ke City Guide">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
    </Link>
    <button type="button" onClick={share} aria-label={shared ? "Tautan disalin" : `Bagikan ${name}`}>
      {shared
        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M12 3v13M8 7l4-4 4 4" /></svg>}
    </button>
  </div>;
}
