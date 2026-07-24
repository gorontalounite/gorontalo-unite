"use client";

import Link from "next/link";

export interface RelatedItem {
  id:           string;
  title:        string;
  slug:         string;
  category:     string;
  image_url:    string | null;
  published_at: string | null;
  excerpt:      string | null;
}

interface Props {
  items:    RelatedItem[];
  basePath: string;
}

export default function RelatedPosts({ items, basePath }: Props) {
  if (!items.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
        Baca Juga
      </h2>

      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`${basePath}/${item.slug}`}
            className="group flex flex-col"
          >
            {/* Thumbnail */}
            <div className="aspect-video relative rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 shrink-0">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              )}
            </div>

            {/* Meta */}
            <span className="text-[10px] font-semibold text-brand dark:text-yellow-400 uppercase tracking-wider mb-1">
              {item.category}
            </span>

            {/* Title */}
            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors line-clamp-2 leading-snug">
              {item.title}
            </p>

            {/* Date */}
            {item.published_at && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                {new Date(item.published_at).toLocaleDateString("id-ID", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
