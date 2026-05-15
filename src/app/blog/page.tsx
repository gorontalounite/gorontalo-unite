import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Blog & Berita — Gorontalo Unite",
  description: "Berita terkini, artikel, dan informasi seputar Gorontalo — wisata, budaya, kuliner, ekonomi, dan lebih banyak lagi.",
};

const CATEGORIES = [
  { key: "wisata",     label: "Wisata",       color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { key: "budaya",     label: "Budaya",       color: "bg-purple-50 text-purple-700 border-purple-200" },
  { key: "kuliner",    label: "Kuliner",      color: "bg-orange-50 text-orange-700 border-orange-200" },
  { key: "ekonomi",    label: "Ekonomi",      color: "bg-blue-50 text-blue-700 border-blue-200" },
  { key: "pendidikan", label: "Pendidikan",   color: "bg-teal-50 text-teal-700 border-teal-200" },
  { key: "kesehatan",  label: "Kesehatan",    color: "bg-red-50 text-red-700 border-red-200" },
  { key: "daerah",     label: "Daerah",       color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { key: "olahraga",   label: "Olahraga",     color: "bg-green-50 text-green-700 border-green-200" },
  { key: "teknologi",  label: "Teknologi",    color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
];

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default async function BlogPage() {
  const admin = createAdminClient();

  const { data: articles } = await admin
    .from("articles")
    .select("id, title, slug, excerpt, image_url, category, published_at, created_at")
    .neq("category", "Portfolio")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(30);

  const items = articles ?? [];

  // Group by category for quick nav
  const byCat: Record<string, typeof items> = {};
  for (const a of items) {
    const key = a.category?.toLowerCase() ?? "umum";
    if (!byCat[key]) byCat[key] = [];
    byCat[key].push(a);
  }

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 pb-24 md:pb-12">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-600 dark:text-yellow-400 mb-2">
          Gorontalo Unite
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Blog & Berita
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Kabar terkini dari Bumi Serambi Madinah.
        </p>
      </div>

      {/* Category quick links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.filter((c) => byCat[c.key]?.length).map((c) => (
          <Link
            key={c.key}
            href={`/${c.key}`}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-opacity hover:opacity-80 ${c.color}`}
          >
            {c.label}
            <span className="ml-1 opacity-60">({byCat[c.key]?.length ?? 0})</span>
          </Link>
        ))}
      </div>

      {/* Articles list */}
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-12">Belum ada artikel yang dipublikasikan.</p>
      ) : (
        <div className="space-y-4">
          {items.map((a) => {
            const cat = CATEGORIES.find((c) => c.key === a.category?.toLowerCase());
            return (
              <Link
                key={a.id}
                href={`/news/${a.id}`}
                className="flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-sm hover:border-gray-200 dark:hover:border-zinc-700 transition-all group"
              >
                {a.image_url && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-zinc-800">
                    <Image src={a.image_url} alt={a.title} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {cat && (
                    <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border mb-1.5 ${cat.color}`}>
                      {cat.label}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {a.title}
                  </p>
                  {a.excerpt && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{a.excerpt}</p>
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
