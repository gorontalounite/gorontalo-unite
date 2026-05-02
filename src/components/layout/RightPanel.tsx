"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
}

interface RightPanelProps {
  open: boolean;
  onClose: () => void;
}

const categoryGradients: Record<string, string> = {
  Wisata:        "from-emerald-400 to-teal-500",
  Budaya:        "from-purple-400 to-indigo-500",
  Kuliner:       "from-orange-400 to-red-400",
  Pendidikan:    "from-blue-400 to-cyan-500",
  Ekonomi:       "from-yellow-400 to-amber-500",
  Infrastruktur: "from-gray-400 to-slate-500",
  Sejarah:       "from-amber-500 to-yellow-600",
  Kesehatan:     "from-red-400 to-pink-500",
  "Good News":   "from-emerald-400 to-green-500",
};

const navLinks = [
  {
    href: "/affiliate",
    label: "Affiliate",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    href: "/privacy-policy",
    label: "Kebijakan Privasi",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    href: "/terms",
    label: "Syarat & Ketentuan",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "Tentang Kami",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function RightPanel({ open, onClose }: RightPanelProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open || loaded) return;
    fetch("/api/news/latest")
      .then((r) => r.json())
      .then(({ data }) => {
        setNews(data ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [open, loaded]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-zinc-950 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Berita Terbaru</span>
          <Link
            href="/good-news"
            onClick={onClose}
            className="text-xs text-[#2D7D46] dark:text-emerald-400 font-medium hover:underline"
          >
            Lihat semua
          </Link>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* News list */}
          <div className="px-4 py-3 space-y-3">
            {!loaded && (
              <div className="py-8 text-center text-xs text-gray-400">Memuat berita…</div>
            )}
            {loaded && news.length === 0 && (
              <div className="py-8 text-center text-xs text-gray-400">Belum ada berita.</div>
            )}
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                onClick={onClose}
                className="flex gap-3 group hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-xl p-2 -mx-2 transition-colors"
              >
                {/* Thumbnail */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                    categoryGradients[item.category] ?? "from-gray-400 to-gray-500"
                  } flex-shrink-0 flex items-end p-1.5 overflow-hidden relative`}
                >
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image_url}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    />
                  ) : null}
                  <span className="relative text-[10px] text-white/90 font-medium leading-tight bg-black/30 px-1.5 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 py-0.5">
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 group-hover:text-[#2D7D46] dark:group-hover:text-emerald-400 leading-snug line-clamp-3 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(item.published_at ?? item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-4 border-t border-gray-100 dark:border-zinc-800 my-2" />

          {/* Nav links */}
          <div className="px-3 pb-4 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <span className="text-gray-400">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
