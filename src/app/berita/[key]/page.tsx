import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { articleBelongsToWebCategory, buildCategoryDeskMap, CATEGORIES, deskKeyFromSlug, deskSlug, CAT_COLOR, DEFAULT_COLOR, WEB_CATEGORY_DESCRIPTIONS, WEB_CATEGORY_SEO, type CategoryRow } from "../categories";
import CategoryArticleList from "./CategoryArticleList";
import Breadcrumbs, { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import NewsDetailPage, { generateMetadata as generateArticleMetadata } from "@/components/news/ArticleDetailPage";
import VideoStoryPage from "@/components/video-story/VideoStoryPage";
import { VIDEO_STORY_KEY, VIDEO_STORY_TITLE } from "@/components/video-story/data";

export const dynamic = "force-dynamic";

const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

/**
 * Video Story is not a desk — it is the sponsored reels, and it draws its own
 * archive rather than the article list every other section uses. It keeps the
 * /category/<key> URL those sections use, but stays out of CATEGORIES so it
 * does not appear in the nav beside the real desks.
 */
const VIDEO_STORY = { key: VIDEO_STORY_KEY, label: VIDEO_STORY_TITLE };

/** The section a key names, or undefined when the key is an article slug. */
const sectionFor = (key: string) => (key === VIDEO_STORY.key ? VIDEO_STORY : CAT_MAP[key]);

interface Article {
  id: string; title: string; slug: string; category: string; categories: string[];
  tags: string[] | null;
  excerpt: string | null; image_url: string | null; image_thumb_url: string | null;
  published_at: string | null; created_at: string;
  is_trending: boolean; view_count: number;
}

interface Props {
  params:       Promise<{ key: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const key = deskKeyFromSlug((await params).key);
  const cat = sectionFor(key);
  if (!cat) return generateArticleMetadata({ params: Promise.resolve({ id: key }) });
  const description = key === VIDEO_STORY.key
    ? "Video kolaborasi dan konten berdurasi dari Gorontalo Unite."
    : WEB_CATEGORY_SEO[key]?.description ?? `Berita terkini seputar ${cat.label} di Gorontalo.`;
  const title = WEB_CATEGORY_SEO[key]?.title ?? cat.label;
  // An empty section is a soft 404: keep it reachable from the nav but out of
  // the index until it has stories of its own.
  const empty = key !== VIDEO_STORY.key && (await loadSectionArticles(key, cat.label)).length === 0;
  return {
    title,
    ...(empty ? { robots: { index: false, follow: true } } : {}),
    description,
    alternates: { canonical: `/category/${deskSlug(key)}` },
    openGraph: {
      title: `${title} | Gorontalo Unite`,
      description,
      url: `/category/${deskSlug(key)}`,
      type: "website",
    },
  };
}

/**
 * The archive's articles, shared by generateMetadata and the page so the
 * empty-section check behind `noindex` costs no extra query.
 */
const loadSectionArticles = cache(async (key: string, label: string): Promise<Article[]> => {
  const admin = await createClient();

  const [{ data: raw }, { data: categoryRows }] = await Promise.all([
    admin
      .from("articles")
      .select("id, title, slug, category, categories, tags, excerpt, image_url, image_thumb_url, published_at, created_at, is_trending, editor_choice, view_count")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(500),
    admin.from("categories").select("id, name, parent_id, desk_key"),
  ]);
  const deskMap = buildCategoryDeskMap((categoryRows ?? []) as CategoryRow[]);

  const matching = (raw ?? []).filter((article) => {
    if (WEB_CATEGORY_DESCRIPTIONS[key]) return articleBelongsToWebCategory({
      category: article.category as string,
      categories: article.categories as string[] | null,
      tags: article.tags as string[] | null,
      title: article.title as string,
      excerpt: article.excerpt as string | null,
    }, key, deskMap);
    return (article.categories as string[] | null)?.includes(label) || article.category === label;
  });
  const articles: Article[] = matching.map((a) => ({
    id:           a.id as string,
    title:        a.title as string,
    slug:         a.slug as string,
    category:     a.category as string,
    categories:   (a.categories as string[] | null) ?? [a.category as string],
    tags:          a.tags as string[] | null,
    excerpt:      a.excerpt as string | null,
    image_url:    a.image_url as string | null,
    image_thumb_url: a.image_thumb_url as string | null,
    published_at: a.published_at as string | null,
    created_at:   a.created_at as string,
    is_trending:  (a.is_trending as boolean) ?? false,
    view_count:   (a.view_count as number) ?? 0,
  }));

  return articles;
});

export default async function BeritaCategoryPage({ params, searchParams }: Props) {
  const key = deskKeyFromSlug((await params).key);
  const cat = sectionFor(key);
  if (!cat) return <NewsDetailPage params={Promise.resolve({ id: key })} />;

  // Video Story is a video library, not an article archive, so it takes over
  // the whole page rather than borrowing this one's banner and card list.
  if (key === VIDEO_STORY.key) {
    const { brand: merek, hal } = await searchParams as { brand?: string; hal?: string };
    return <VideoStoryPage brand={merek?.trim() || null} page={Math.max(1, parseInt(hal ?? "1"))} />;
  }

  const colors = CAT_COLOR[cat.label] ?? DEFAULT_COLOR;
  const articles = await loadSectionArticles(key, cat.label);

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: cat.label }];

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24 text-[#101018] dark:bg-zinc-950 dark:text-white md:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />
      <section className="bg-white pt-8 dark:bg-zinc-950 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <h1 className={`font-heading text-3xl font-semibold tracking-[-.025em] sm:text-4xl ${colors.text}`}>
            {cat.label}
          </h1>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between gap-4 py-7 text-xs sm:text-sm">
          <Link href="/" className="font-semibold text-brand hover:underline">← All news</Link>
          <Breadcrumbs items={breadcrumbItems} className="hidden text-stone-400 dark:text-zinc-500 sm:block" />
        </div>

        {articles.length === 0 ? (
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="font-heading text-xl font-semibold text-stone-700 dark:text-zinc-200">No articles yet</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-400 dark:text-zinc-500">
              Stories for {cat.label} will appear here.
            </p>
          </div>
        ) : (
          <CategoryArticleList articles={articles} />
        )}
      </main>
    </div>
  );
}
