import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient }      from "@/lib/supabase/server";
import { CATEGORIES }        from "@/app/berita/categories";
import MarkdownContent    from "@/components/ui/MarkdownContent";
import BlockRenderer      from "@/components/ui/BlockRenderer";
import ShareButtons       from "@/components/ui/ShareButtons";
import RelatedPosts, { type RelatedItem } from "@/components/ui/RelatedPosts";
import ViewTracker        from "@/components/ui/ViewTracker";
import CommentSection     from "@/components/ui/CommentSection";
import ArticleHeroImage   from "@/components/ui/ArticleHeroImage";
import type { Block }     from "@/components/editor/types";
import { getPreviewArticle, type PreviewArticle } from "@/data/newsPreview";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.id";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  const preview = getPreviewArticle(slug);
  if (preview) {
    return {
      title: `${preview.title} | Gorontalo Unite`,
      description: preview.excerpt,
      alternates: { canonical: `${BASE}/news/${preview.slug}` },
      openGraph: { title: preview.title, description: preview.excerpt, type: "article", publishedTime: preview.source_published_at },
    };
  }
  const admin = createAdminClient();
  const { data } = await admin
    .from("articles")
    .select("title, excerpt, seo_title, seo_description, image_url, published_at, category")
    .eq("slug", slug)
    .eq("published", true)
    .neq("category", "Portfolio")
    .single();
  if (!data) return { title: "Artikel | Gorontalo Unite" };

  const title = data.seo_title || data.title;
  const desc  = data.seo_description || data.excerpt;
  const url   = `${BASE}/news/${slug}`;

  return {
    title:       `${title} | Gorontalo Unite`,
    description: desc || undefined,
    alternates:  { canonical: url },
    openGraph: {
      title,
      description: desc || undefined,
      url,
      type:        "article",
      publishedTime: data.published_at ?? undefined,
      section:     data.category,
      images:      data.image_url ? [{ url: data.image_url, width: 1200, height: 630, alt: data.title }] : undefined,
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description: desc || undefined,
      images:      data.image_url ? [data.image_url] : undefined,
    },
  };
}

const CAT_LABEL_TO_KEY: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.label, c.key]),
);

const CATEGORY_COLORS: Record<string, string> = {
  Politik:        "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Pemerintahan:   "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Wisata:         "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  Budaya:         "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Ekonomi:        "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Bisnis:         "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Pendidikan:     "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  Sosial:         "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Kemasyarakatan: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Kesehatan:      "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  Pertanian:      "bg-lime-50 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300",
  Perikanan:      "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  Teknologi:      "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Digital:        "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Infrastruktur:  "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300",
  Pembangunan:    "bg-stone-50 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300",
  Hukum:          "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  Keamanan:       "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Agama:          "bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
  Lingkungan:     "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  Alam:           "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
  Olahraga:       "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
};

export default async function NewsDetailPage({ params }: Props) {
  const { id: slug } = await params;
  const preview = getPreviewArticle(slug);
  if (preview) return <PreviewNewsDetail article={preview} />;
  const admin        = createAdminClient();

  const [{ data: article }, { data: { user } }] = await Promise.all([
    admin.from("articles").select("*").eq("slug", slug).eq("published", true).neq("category", "Portfolio").single(),
    (await createClient()).auth.getUser(),
  ]);

  if (!article) notFound();

  // Related posts
  const { data: relatedRaw } = await admin
    .from("articles")
    .select("id, title, slug, category, image_url, published_at, excerpt")
    .eq("published", true).eq("category", article.category)
    .neq("slug", slug).neq("category", "Portfolio")
    .order("published_at", { ascending: false }).limit(3);

  const related: RelatedItem[] = relatedRaw ?? [];

  const blocks: Block[] = Array.isArray(article.blocks) && article.blocks.length > 0
    ? (article.blocks as Block[]) : [];

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      })
    : null;

  const viewCount:  number  = (article.view_count  as number  | null) ?? 0;
  const isTrending: boolean = (article.is_trending as boolean | null) ?? false;
  const allowComments: boolean = (article.allow_comments as boolean | null) ?? false;

  const canonicalUrl = `${BASE}/news/${slug}`;

  // User info for CommentSection
  const authUser = user
    ? { id: user.id, name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Pengguna" }
    : null;

  // ── Schema.org JSON-LD ──────────────────────────────────────
  const schemaType = (article.schema_type as string | null) ?? "NewsArticle";
  const jsonLd = {
    "@context":    "https://schema.org",
    "@type":       schemaType,
    headline:      article.title,
    description:   article.seo_description || article.excerpt || undefined,
    image:         article.image_url ? [article.image_url] : undefined,
    datePublished: article.published_at ?? article.created_at,
    dateModified:  article.updated_at  ?? article.published_at ?? article.created_at,
    author:        { "@type": "Organization", name: "Gorontalo Unite", url: BASE },
    publisher:     { "@type": "Organization", name: "Gorontalo Unite", url: BASE,
                     logo: { "@type": "ImageObject", url: `${BASE}/icons/icon-192.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords:      article.focus_keyword ?? article.category,
    articleSection: article.category,
    inLanguage:    "id-ID",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Silent view tracker */}
      <ViewTracker slug={slug} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand dark:hover:text-yellow-400 transition-colors">Beranda</Link>
        <span>/</span>
        <Link href="/berita" className="hover:text-brand dark:hover:text-yellow-400 transition-colors">Berita</Link>
        <span>/</span>
        <span className="text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{article.title}</span>
      </nav>

      <article>
        {/* Category + Date + Trending */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {((article.categories as string[] | null)?.length
            ? (article.categories as string[])
            : [article.category]
          ).map((cat: string) => {
            const catKey = CAT_LABEL_TO_KEY[cat] ?? cat.toLowerCase();
            const cls = CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-700";
            return (
              <Link key={cat} href={`/berita/${catKey}`}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>
                {cat}
              </Link>
            );
          })}
          {isTrending && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300 flex items-center gap-1">
              🔥 Trending
            </span>
          )}
          {publishedDate && (
            <span className="text-xs text-gray-400 dark:text-gray-500">{publishedDate}</span>
          )}
          {viewCount > 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
              👁 {viewCount.toLocaleString("id-ID")} kali dilihat
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6 border-l-4 border-[#F5C400] dark:border-yellow-500 pl-4 italic">
            {article.excerpt}
          </p>
        )}

        {/* Hero image */}
        {article.image_url && (
          <ArticleHeroImage src={article.image_url} alt={article.title} />
        )}

        {/* Content */}
        {blocks.length > 0
          ? <BlockRenderer blocks={blocks} />
          : article.content && <MarkdownContent content={article.content} />
        }

        {/* Extra images (legacy gallery) */}
        {Array.isArray(article.extra_images) && article.extra_images.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-widest">Galeri</h2>
            <div className="grid grid-cols-2 gap-3">
              {article.extra_images.map((url: string, i: number) => (
                <div key={i} className="aspect-video relative rounded-xl overflow-hidden">
                  <Image src={url} alt={`Foto ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {Array.isArray(article.tags) && article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {(article.tags as string[]).map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Source attribution */}
        {article.source_url && (
          <div className="mt-6 text-xs text-gray-400 dark:text-gray-500">
            Sumber:{" "}
            <a
              href={article.source_url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand dark:hover:text-yellow-400 transition-colors"
            >
              {(article.source_url as string).includes("gorontalokab")
                ? "Pemkab Gorontalo"
                : (article.source_url as string).includes("gorontalokota")
                ? "Pemkot Gorontalo"
                : (article.source_url as string).includes("gorontaloprov")
                ? "Pemprov Gorontalo"
                : article.source_url as string}
            </a>
          </div>
        )}

        {/* Share buttons */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
          <ShareButtons url={canonicalUrl} title={article.title} />
        </div>
      </article>

      {/* Comments */}
      <CommentSection slug={slug} allowComments={allowComments} user={authUser} />

      {/* Related posts */}
      <RelatedPosts items={related} basePath="/news" />

      {/* Back navigation */}
      <div className="mt-10 pt-6 border-t border-gray-100 dark:border-zinc-800 flex gap-4">
        <Link href="/berita" className="text-sm text-brand dark:text-yellow-400 font-medium hover:underline">
          ← Semua berita
        </Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-medium">
          Tanya Gorontalo AI →
        </Link>
      </div>
    </div>
  );
}

function PreviewNewsDetail({ article }: { article: PreviewArticle }) {
  const publishedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Makassar",
  }).format(new Date(article.source_published_at));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <Link href="/" className="transition-colors hover:text-brand dark:hover:text-yellow-400">Beranda</Link>
        <span>/</span>
        <Link href="/berita" className="transition-colors hover:text-brand dark:hover:text-yellow-400">Berita</Link>
        <span>/</span>
        <span className="max-w-[200px] truncate text-gray-500 dark:text-gray-400">{article.title}</span>
      </nav>

      <article>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {article.categories.map((category) => (
            <Link
              key={category}
              href={`/berita?category=${CAT_LABEL_TO_KEY[category] ?? category.toLowerCase()}`}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 transition hover:bg-yellow-100 hover:text-yellow-900 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-yellow-400 dark:hover:text-black"
            >
              {category}
            </Link>
          ))}
          <span className="text-xs text-gray-400 dark:text-gray-500">{publishedDate}</span>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand dark:text-yellow-400">Ringkasan oleh Gorontalo Unite</p>
        <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-3xl">{article.title}</h1>
        <p className="mb-8 border-l-4 border-[#F5C400] pl-4 text-base italic leading-relaxed text-gray-500 dark:text-gray-400">{article.excerpt}</p>

        <div className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Poin penting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {article.summary_points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>

        <div className="space-y-5 text-[17px] leading-8 text-gray-700 dark:text-gray-300">
          {article.summary_paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-zinc-800 dark:text-gray-300">#{tag}</span>)}
        </div>

        <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-100">
          Contoh tampilan lokal. Artikel ini belum dipublikasikan melalui CMS; tanggal di atas adalah tanggal dari sumber asli.
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Sumber asli: <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="font-medium underline transition hover:text-brand dark:hover:text-yellow-400">{article.source_name}</a>
        </div>
      </article>
    </div>
  );
}
