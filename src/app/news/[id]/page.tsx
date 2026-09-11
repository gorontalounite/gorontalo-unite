import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient }      from "@/lib/supabase/server";
import { CATEGORIES }        from "@/app/berita/categories";
import MarkdownContent    from "@/components/ui/MarkdownContent";
import BlockRenderer      from "@/components/ui/BlockRenderer";
import ShareButtons       from "@/components/ui/ShareButtons";
import RelatedPosts, { type RelatedItem } from "@/components/ui/RelatedPosts";
import ViewTracker        from "@/components/ui/ViewTracker";
import CommentSection     from "@/components/ui/CommentSection";
import ArticleHero        from "@/components/ui/ArticleHero";
import ReaderRevenueManager from "@/components/google/ReaderRevenueManager";
import { blocksToText, type Block } from "@/components/editor/types";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com";

const CAT_LABEL_TO_KEY: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((category) => [category.label, category.key]),
);

function normalizedCopy(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/[#*_`>\[\]()]/g, " ").replace(/\s+/g, " ").trim().toLocaleLowerCase("id-ID");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  const admin = await createClient();
  const { data } = await admin
    .from("articles")
    .select("title, excerpt, seo_title, seo_description, image_url, published_at, category")
    .eq("slug", slug)
    .eq("published", true)
    .neq("category", "Portfolio")
    .single();
  if (!data) return { title: "Article | Gorontalo Unite" };

  const title = data.seo_title || data.title;
  const desc  = data.seo_description || data.excerpt;
  const url   = `${BASE}/${slug}`;

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

export async function NewsDetailPage({ params }: Props) {
  const { id: slug } = await params;
  const admin        = await createClient();

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
    ? `${new Intl.DateTimeFormat("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit", timeZone: "Asia/Makassar",
      }).format(new Date(article.published_at))} WITA`
    : null;

  const isTrending: boolean = (article.is_trending as boolean | null) ?? false;
  const allowComments: boolean = (article.allow_comments as boolean | null) ?? false;
  const isSponsored: boolean = (article.is_sponsored as boolean | null) ?? false;
  const sponsorName = article.sponsor_name as string | null;
  const sponsorLogoUrl = article.sponsor_logo_url as string | null;
  const articleText = blocks.length > 0 ? blocksToText(blocks) : ((article.content as string | null) ?? "");
  const readMinutes = Math.max(1, Math.ceil(articleText.trim().split(/\s+/).filter(Boolean).length / 200));
  const openingParagraph = blocks.find((block) => block.type === "paragraph" && block.content.trim())?.content
    ?? ((article.content as string | null) ?? "").split(/\n\s*\n/).find((part) => part.trim() && !part.trim().startsWith("#"))
    ?? "";
  const normalizedOpening = normalizedCopy(openingParagraph);
  const displayExcerpt = [article.excerpt, article.seo_description]
    .map((value) => typeof value === "string" ? value.trim() : "")
    .find((value) => {
      if (!value) return false;
      if (!normalizedOpening) return true;
      const normalizedValue = normalizedCopy(value);
      return normalizedValue !== normalizedOpening
        && !normalizedOpening.startsWith(normalizedValue)
        && !normalizedValue.startsWith(normalizedOpening);
    }) ?? null;
  const sourceUrl = article.source_url as string | null;
  const sourceLabel = (article.source_name as string | null)
    || (sourceUrl?.includes("gorontalokab") ? "Pemkab Gorontalo"
      : sourceUrl?.includes("gorontalokota") ? "Pemkot Gorontalo"
      : sourceUrl?.includes("gorontaloprov") ? "Pemprov Gorontalo"
      : sourceUrl ? sourceUrl.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]
      : "Gorontalo Unite");

  const canonicalUrl = `${BASE}/${slug}`;

  const heroCategories = ((article.categories as string[] | null)?.length
    ? (article.categories as string[])
    : [article.category]
  ).map((label: string) => ({
    label,
    href: `/category/${CAT_LABEL_TO_KEY[label] ?? label.toLowerCase()}`,
    className: CATEGORY_COLORS[label] ?? "bg-gray-100 text-gray-700",
  }));

  // User info for CommentSection
  const authUser = user
    ? { id: user.id, name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Reader" }
    : null;

  // ── Schema.org JSON-LD ──────────────────────────────────────
  const schemaType = (article.schema_type as string | null) ?? "NewsArticle";
  const jsonLd = {
    "@context":    "https://schema.org",
    "@type":       schemaType,
    headline:      article.title,
    description:   displayExcerpt || undefined,
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
    <>
    <ReaderRevenueManager />
    <div className="bg-white pb-20 text-[#101018] dark:bg-zinc-950 dark:text-white">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Silent view tracker */}
      <ViewTracker slug={slug} />

      <article>
        <ArticleHero
          title={article.title}
          imageUrl={(article.image_url as string | null) ?? null}
          categories={heroCategories}
          isTrending={isTrending}
          isSponsored={isSponsored}
          sponsorName={sponsorName}
          sponsorLogoUrl={sponsorLogoUrl}
          publishedDate={publishedDate}
          shareUrl={canonicalUrl}
          readMinutes={readMinutes}
        />

      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Standfirst, set as a quote at the head of the story rather than over the photo. */}
        {displayExcerpt && (
          <p className="mx-auto mb-7 max-w-3xl border-l-4 border-[#F5C400] pl-4 font-serif text-xl italic leading-[1.55] text-stone-600 dark:border-yellow-500 dark:text-zinc-300 sm:mb-9 sm:pl-5 sm:text-2xl lg:text-[1.6rem]">
            {displayExcerpt}
          </p>
        )}

        {/* Content */}
        <div className="article-body mx-auto max-w-3xl text-base leading-[1.75] sm:text-[17px] sm:leading-[1.8]">
          {blocks.length > 0
            ? <BlockRenderer blocks={blocks} />
            : article.content && <MarkdownContent content={article.content} />
          }

        {/* Extra images (legacy gallery) */}
        {Array.isArray(article.extra_images) && article.extra_images.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-widest sm:text-sm">Gallery</h2>
            <div className="grid grid-cols-2 gap-3">
              {article.extra_images.map((url: string, i: number) => (
                <div key={i} className="aspect-video relative rounded-xl overflow-hidden">
                  <Image src={url} alt={`Photo ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Source attribution */}
        {sourceUrl && (
          <div className="mt-6 text-[9px] text-gray-400 dark:text-gray-500 sm:text-xs">
            Source:{" "}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand dark:hover:text-yellow-400 transition-colors"
            >
              {sourceLabel}
            </a>
          </div>
        )}

        {/* Tags */}
        {Array.isArray(article.tags) && article.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {(article.tags as string[]).map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[9px] text-gray-600 dark:bg-zinc-800 dark:text-gray-300 sm:text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Share again after reading */}
        <div className="mt-8 border-t border-stone-200 pt-6 dark:border-zinc-800">
          <ShareButtons url={canonicalUrl} title={article.title} compact readMinutes={readMinutes} />
        </div>
        </div>
      </div>
      </article>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Author profile */}
      <section className="mx-auto mt-10 flex max-w-3xl items-center gap-3 border-y border-stone-200 py-5 dark:border-zinc-800 sm:gap-4">
        <Image src="/logo-gu.png" alt="Gorontalo Unite logo" width={52} height={52} className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-13 sm:w-13" />
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[.15em] text-stone-400 sm:text-xs">Author</p>
          <Link href="/author/gorontalounite" className="mt-1 block text-xs font-semibold text-stone-900 hover:text-brand dark:text-white sm:text-base">@gorontalounite</Link>
          <p className="mt-1 text-[10px] leading-relaxed text-stone-500 dark:text-zinc-400 sm:text-sm">Local editorial team covering important news, information, and stories from Gorontalo.</p>
        </div>
      </section>

      {/* Related posts */}
      <RelatedPosts items={related} basePath="" />

      {/* Comments */}
      <CommentSection slug={slug} allowComments={allowComments} user={authUser} />

      {/* Back navigation */}
      <div className="mt-10 flex gap-4 border-t border-stone-200 pt-6 dark:border-zinc-800">
        <Link href="/" className="text-sm text-brand dark:text-yellow-400 font-medium hover:underline">
          ← All news
        </Link>
      </div>
      </div>
    </div>
    </>
  );
}

export default NewsDetailPage;
