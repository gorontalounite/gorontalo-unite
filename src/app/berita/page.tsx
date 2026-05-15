import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Berita Gorontalo — Gorontalo Unite",
  description: "Berita terkini seputar Gorontalo — politik, ekonomi, pariwisata, pendidikan, kesehatan, dan lebih banyak lagi.",
};

const CATEGORIES = [
  { key: "politik",       label: "Politik & Pemerintahan",      color: "bg-blue-50   text-blue-700   border-blue-200   dark:bg-blue-900/20   dark:text-blue-300   dark:border-blue-800"   },
  { key: "pariwisata",    label: "Pariwisata & Budaya",         color: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800" },
  { key: "ekonomi",       label: "Ekonomi & Bisnis",            color: "bg-green-50  text-green-700  border-green-200  dark:bg-green-900/20  dark:text-green-300  dark:border-green-800"  },
  { key: "pendidikan",    label: "Pendidikan",                  color: "bg-teal-50   text-teal-700   border-teal-200   dark:bg-teal-900/20   dark:text-teal-300   dark:border-teal-800"   },
  { key: "sosial",        label: "Sosial & Kemasyarakatan",     color: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800" },
  { key: "kesehatan",     label: "Kesehatan",                   color: "bg-red-50    text-red-700    border-red-200    dark:bg-red-900/20    dark:text-red-300    dark:border-red-800"    },
  { key: "pertanian",     label: "Pertanian & Perikanan",       color: "bg-lime-50   text-lime-700   border-lime-200   dark:bg-lime-900/20   dark:text-lime-300   dark:border-lime-800"   },
  { key: "teknologi",     label: "Teknologi & Digital",         color: "bg-cyan-50   text-cyan-700   border-cyan-200   dark:bg-cyan-900/20   dark:text-cyan-300   dark:border-cyan-800"   },
  { key: "infrastruktur", label: "Infrastruktur & Pembangunan", color: "bg-gray-50 text-gray-700  border-gray-200   dark:bg-gray-800      dark:text-gray-300   dark:border-gray-700"   },
  { key: "hukum",         label: "Hukum & Keamanan",            color: "bg-rose-50   text-rose-700   border-rose-200   dark:bg-rose-900/20   dark:text-rose-300   dark:border-rose-800"   },
  { key: "agama",         label: "Agama & Keagamaan",           color: "bg-amber-50  text-amber-700  border-amber-200  dark:bg-amber-900/20  dark:text-amber-300  dark:border-amber-800"  },
  { key: "lingkungan",    label: "Lingkungan & Alam",           color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800" },
  { key: "olahraga",      label: "Olahraga",                    color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800" },
];

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default async function BeritaPage() {
  const admin = createAdminClient();

  const { data: articles } = await admin
    .from("articles")
    .select("id, title, slug, excerpt, image_url, category, published_at, created_at")
    .neq("category", "Portfolio")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(60);

  const items = articles ?? [];

  const catCount: Record<string, number> = {};
  for (const a of items) {
    const label = a.category ?? "";
    catCount[label] = (catCount[label] ?? 0) + 1;
  }

  const activeCats = CATEGORIES.filter((c) => (catCount[c.label] ?? 0) > 0);

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 pb-24 md:pb-12">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand dark:text-yellow-400 mb-2">
          Gorontalo Unite
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Berita Gorontalo
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Kabar terkini dari Bumi Serambi Madinah — {items.length > 0 ? `${items.length}+ artikel` : "belum ada artikel"}.
        </p>
      </div>

      {/* Category filter chips */}
      {activeCats.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {activeCats.map((c) => (
            <Link
              key={c.key}
              href={`/berita/${c.key}`}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-opacity hover:opacity-80 ${c.color}`}
            >
              {c.label}
              <span className="ml-1 opacity-60">({catCount[c.label] ?? 0})</span>
            </Link>
          ))}
        </div>
      )}

      {/* Articles list */}
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-12">Belum ada artikel yang dipublikasikan.</p>
      ) : (
        <div className="space-y-3">
          {items.map((a) => {
            const cat = CATEGORIES.find((c) => c.label === a.category);
            return (
              <Link
                key={a.id}
                href={`/news/${a.slug}`}
                className="flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-sm hover:border-gray-200 dark:hover:border-zinc-700 transition-all group"
              >
                {a.image_url && (
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-zinc-800">
                    <Image src={a.image_url} alt={a.title} fill className="object-cover" unoptimized />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {cat && (
                    <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border mb-1.5 ${cat.color}`}>
                      {cat.label}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors line-clamp-2 leading-snug">
                    {a.title}
                  </p>
                  {a.excerpt && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{a.excerpt}</p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                    {formatDate(a.published_at ?? a.created_at)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
