import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_COLOR } from "@/app/berita/categories";
import CategoryArticleList, { type CategoryArticle } from "@/app/berita/[key]/CategoryArticleList";
import Breadcrumbs, { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  const description = `Berita Gorontalo bertag ${label}.`;
  return {
    title: `#${label}`,
    description,
    alternates: { canonical: `/tag/${tag}` },
    openGraph: { title: `#${label} | Gorontalo Unite`, description, url: `/tag/${tag}`, type: "website" },
  };
}

export default async function TagArchivePage({ params }: Props) {
  const { tag } = await params;
  const label = decodeURIComponent(tag).toLowerCase();
  const admin = await createClient();

  const { data: raw } = await admin
    .from("articles")
    .select("id, title, slug, category, categories, tags, excerpt, image_url, image_thumb_url, published_at, created_at, is_trending, editor_choice, view_count")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(500);

  const matching = (raw ?? []).filter((article) =>
    ((article.tags as string[] | null) ?? []).some((t) => t.toLowerCase() === label),
  );

  const articles: CategoryArticle[] = matching.map((a) => ({
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

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: `#${label}` }];

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24 text-[#101018] dark:bg-zinc-950 dark:text-white md:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />
      <section className="bg-white pt-8 dark:bg-zinc-950 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <h1 className={`font-heading text-3xl font-semibold tracking-[-.025em] sm:text-4xl ${DEFAULT_COLOR.text}`}>
            #{label}
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
              Stories tagged #{label} will appear here.
            </p>
          </div>
        ) : (
          <CategoryArticleList articles={articles} />
        )}
      </main>
    </div>
  );
}
