"use client";

import { useState } from "react";

interface Props {
  url:   string;
  title: string;
}

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl   = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity  = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // cancelled or unsupported — no-op
    }
  };

  const btnBase =
    "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium shrink-0">
        Bagikan:
      </span>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-black text-white hover:bg-zinc-700`}
      >
        𝕏
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-[#1877f2] text-white hover:bg-[#1466d0]`}
      >
        Facebook
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-[#25d366] text-white hover:bg-[#1ebe5a]`}
      >
        WhatsApp
      </a>

      {/* Web Share API (mobile) */}
      {typeof window !== "undefined" && "share" in navigator && (
        <button
          onClick={nativeShare}
          className={`${btnBase} border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800`}
        >
          ↗ Bagikan
        </button>
      )}

      {/* Copy link */}
      <button
        onClick={copyLink}
        className={`${btnBase} border transition-colors ${
          copied
            ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
            : "border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
        }`}
      >
        {copied ? "✓ Tersalin" : "📋 Salin"}
      </button>
    </div>
  );
}
