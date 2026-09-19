"use client";

import { useState } from "react";

/**
 * The permalink is the only thing that has to travel from this page to the
 * article being written, and it travels by hand — so the one thing worth
 * automating is not mistyping it.
 */
export default function CopyLink({ permalink }: { permalink: string }) {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(permalink);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          // Clipboard access can be refused; the link is on screen either way.
        }
      }}
      title={permalink}
      className={`shrink-0 rounded-lg border px-2 py-1 text-[11px] transition-colors ${
        done ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"
      }`}
    >
      {done ? "Tersalin" : "Salin link"}
    </button>
  );
}
