import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/* ─── Category config ────────────────────────────────────────────────── */
const CATEGORIES: Record<string, {
  label: string;
  description: string;
  color: string;
  bgColor: string;
}> = {
  // Main categories
  wisata:          { label: "Wisata",          description: "Destinasi dan pengalaman wisata terbaik di Gorontalo.",              color: "text-yellow-600 dark:text-yellow-400",  bgColor: "bg-yellow-100 dark:bg-yellow-900/30" },
  bisnis:          { label: "Bisnis",          description: "Peluang usaha, UMKM, investasi, dan ekonomi Gorontalo.",            color: "text-blue-600 dark:text-blue-400",        bgColor: "bg-blue-100 dark:bg-blue-900/30"       },
  daerah:          { label: "Daerah",          description: "Berita pemerintahan, infrastruktur, dan kebijakan daerah.",         color: "text-purple-600 dark:text-purple-400",    bgColor: "bg-purple-100 dark:bg-purple-900/30"   },
  event:           { label: "Event",           description: "Festival, pameran, dan acara terkini di Gorontalo.",                color: "text-orange-600 dark:text-orange-400",    bgColor: "bg-orange-100 dark:bg-orange-900/30"   },
  inspire:         { label: "Inspire",         description: "Kisah inspiratif dan tokoh-tokoh berprestasi dari Gorontalo.",      color: "text-rose-600 dark:text-rose-400",        bgColor: "bg-rose-100 dark:bg-rose-900/30"       },
  insight:         { label: "Insight",         description: "Analisis mendalam, opini, dan wawasan seputar Gorontalo.",         color: "text-indigo-600 dark:text-indigo-400",    bgColor: "bg-indigo-100 dark:bg-indigo-900/30"   },
  interest:        { label: "Interest",        description: "Topik-topik menarik dan konten pilihan dari Gorontalo.",           color: "text-amber-600 dark:text-amber-400",      bgColor: "bg-amber-100 dark:bg-amber-900/30"     },
  // Sub-categories
  lifestyle:       { label: "Lifestyle",       description: "Gaya hidup, kesehatan, kuliner, dan tren terkini.",                color: "text-pink-600 dark:text-pink-400",        bgColor: "bg-pink-100 dark:bg-pink-900/30"       },
  properti:        { label: "Properti",        description: "Properti, hunian, dan pembangunan di Gorontalo.",                  color: "text-stone-600 dark:text-stone-400",      bgColor: "bg-stone-100 dark:bg-stone-900/30"     },
  community:       { label: "Community",       description: "Komunitas, sosial kemasyarakatan, dan kehidupan warga.",           color: "text-teal-600 dark:text-teal-400",        bgColor: "bg-teal-100 dark:bg-teal-900/30"       },
  "ekonomi-bisnis":{ label: "Ekonomi & Bisnis",description: "Ekonomi, keuangan, dan bisnis Gorontalo.",                        color: "text-cyan-600 dark:text-cyan-400",        bgColor: "bg-cyan-100 dark:bg-cyan-900/30"       },
  technology:      { label: "Technology",      description: "Teknologi, digital, inovasi, dan startup lokal.",                  color: "text-violet-600 dark:text-violet-400",    bgColor: "bg-violet-100 dark:bg-violet-900/30"   },
  sport:           { label: "Sport",           description: "Olahraga, atletik, dan prestasi Gorontalo.",                      color: "text-green-600 dark:text-green-400",      bgColor: "bg-green-100 dark:bg-green-900/30"     },
  automotive:      { label: "Automotive",      description: "Kendaraan, transportasi, dan mobilitas di Gorontalo.",            color: "text-gray-600 dark:text-gray-400",        bgColor: "bg-gray-100 dark:bg-gray-900/30"       },
  food:            { label: "Food",            description: "Kuliner, makanan khas, dan restoran di Gorontalo.",               color: "text-yellow-600 dark:text-yellow-400",    bgColor: "bg-yellow-100 dark:bg-yellow-900/30"   },
  travel:          { label: "Travel",          description: "Perjalanan, destinasi, dan pengalaman wisata Gorontalo.",         color: "text-lime-600 dark:text-lime-400",        bgColor: "bg-lime-100 dark:bg-lime-900/30"       },
  affiliate:       { label: "Affiliate",       description: "Produk dan rekomendasi pilihan untuk Anda.",                      color: "text-red-600 dark:text-red-400",          bgColor: "bg-red-100 dark:bg-red-900/30"         },
};

/* ─── Types ──────────────────────────────────────────────────────────── */
interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
  is_trending: boolean;
  view_count: number;
}

/* ─── Metadata ───────────────────────────────────────────────────────── */
interface Props { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) return { title: "Gorontalo Unite" };
  return {
    title: `${cat.label} | Gorontalo Unite`,
    description: cat.description,
    openGraph: { title: `${cat.label} — Gorontalo Unite`, description: cat.description, type: "website" },
  };
}

/* ─── Helpers ────────────────────────────────────────────────────────── */
function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) notFound();

  let articles: Article[] = [];
  try {
    const admin = createAdminClient();
    const { data: raw } = await admin
      .from("articles")
      .select("id, title, slug, category, excerpt, image_url, published_at, created_at, is_trending, view_count")
      .eq("published", true)
      .eq("category", cat.label)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(60);

    articles = (raw ?? []).map((a) => ({
      id:           a.id as string,
      title:        a.title as string,
      slug:         a.slug as string,
      category:     a.category as string,
      excerpt:      a.excerpt as string | null,
      image_url:    a.image_url as string | null,
      published_at: a.published_at as string | null,
      created_at:   a.created_at as string,
      is_trending:  (a.is_trending as boolean) ?? false,
      view_count:   (a.view_count as number) ?? 0,
    }));
  } catch {
    // Supabase unavailable in dev — show empty state
  }

  const featured = articles.find((a) => a.is_trending) ?? articles[0] ?? null;
  const rest = featured ? articles.filter((a) => a.id !== featured.id) : articles;

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand dark:hover:text-yellow-400 transition-colors">Beranda</Link>
        <span>/</span>
        <span className={`font-medium ${cat.color}`}>{cat.label}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8 pb-6 border-b border-gray-100 dark:border-zinc-800">
        <h1 className={`text-2xl sm:text-3xl font-bold mb-1 ${cat.color}`}>{cat.label}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl">{cat.description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{articles.length} artikel tersedia</p>
      </div>

      {/* Empty state */}
      {articles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Belum ada artikel</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
            Konten kategori {cat.label} akan segera hadir. Pantau terus Gorontalo Unite!
          </p>
          <Link href="/" className="mt-6 px-5 py-2 bg-[#F5C400] text-black text-sm font-medium rounded-xl hover:bg-[#c9a000] transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      )}

      {articles.length > 0 && (
        <>
          {/* Featured hero */}
          {featured && (
            <Link href={`/news/${featured.slug}`} className="group block mb-8">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/8] sm:aspect-[16/7] bg-gray-100 dark:bg-zinc-800">
                {featured.image_url ? (
                  <Image
                    src={featured.image_url}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                ) : (
                  <div className={`w-full h-full ${cat.bgColor}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {featured.is_trending && (
                      <span className="text-xs font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">Trending</span>
                    )}
                    <span className="text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {cat.label}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:underline">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-sm text-white/75 line-clamp-2 hidden sm:block">{featured.excerpt}</p>
                  )}
                  {featured.published_at && (
                    <p className="text-xs text-white/60 mt-2">{formatDate(featured.published_at)}</p>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* Section divider */}
          {rest.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Artikel Lainnya
              </h2>
              <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-800" />
            </div>
          )}

          {/* Magazine grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} cat={cat} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Article card ───────────────────────────────────────────────────── */
function ArticleCard({
  article,
  cat,
}: {
  article: Article;
  cat: (typeof CATEGORIES)[string];
}) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] bg-gray-100 dark:bg-zinc-800 flex-shrink-0 overflow-hidden">
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full ${cat.bgColor} opacity-60`} />
        )}
        {article.is_trending && (
          <span className="absolute top-2 left-2 text-xs font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">Trending</span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${cat.bgColor} ${cat.color}`}>
            {cat.label}
          </span>
          {article.published_at && (
            <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(article.published_at)}</span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 mb-2 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed flex-1">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-1 mt-3 text-xs text-brand dark:text-yellow-400 font-medium">
          Baca selengkapnya
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
