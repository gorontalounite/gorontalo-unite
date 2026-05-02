import Link  from "next/link";
import Image from "next/image";

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
  basePath: string; // "/news" or "/portfolio"
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
            <div className="aspect-video relative rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-zinc-800 shrink-0">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  📰
                </div>
              )}
            </div>

            {/* Meta */}
            <span className="text-[10px] font-semibold text-[#2D7D46] dark:text-emerald-400 uppercase tracking-wider mb-1">
              {item.category}
            </span>

            {/* Title */}
            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#2D7D46] dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
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
