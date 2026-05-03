import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient }      from "@/lib/supabase/server";
import MarkdownContent from "@/components/ui/MarkdownContent";
import BlockRenderer   from "@/components/ui/BlockRenderer";
import ShareButtons    from "@/components/ui/ShareButtons";
import RelatedPosts, { type RelatedItem } from "@/components/ui/RelatedPosts";
import ViewTracker    from "@/components/ui/ViewTracker";
import CommentSection from "@/components/ui/CommentSection";
import type { Block } from "@/components/editor/types";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.id";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const admin    = createAdminClient();
  const { data } = await admin
    .from("articles")
    .select("title, excerpt, seo_title, seo_description, image_url")
    .eq("slug", slug)
    .eq("category", "Portfolio")
    .single();
  if (!data) return { title: "Portofolio | Gorontalo Unite" };
  return {
    title:       `${data.seo_title || data.title} | Gorontalo Unite`,
    description: data.seo_description || data.excerpt || undefined,
    openGraph: data.image_url
      ? { images: [{ url: data.image_url }] }
      : undefined,
  };
}

const STACK_LABELS: Record<string, string> = {
  "stack:web-design":      "Web Design",
  "stack:programming":     "Programming",
  "stack:data-analytics":  "Data Analytics",
  "stack:editing":         "Video Editing",
  "stack:carousel-design": "Carousel Design",
  "stack:videography":     "Videography",
};

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const admin    = createAdminClient();

  const [{ data: item }, { data: { user } }] = await Promise.all([
    admin.from("articles").select("*").eq("slug", slug).eq("category", "Portfolio").eq("published", true).single(),
    (await createClient()).auth.getUser(),
  ]);

  if (!item) notFound();

  // Related portfolio items — by stack tag, exclude self, limit 3
  const itemTags: string[] = Array.isArray(item.tags) ? (item.tags as string[]) : [];
  const stackTag = itemTags.find((t: string) => t.startsWith("stack:"));

  let relatedQuery = admin
    .from("articles")
    .select("id, title, slug, category, image_url, published_at, excerpt")
    .eq("published", true)
    .eq("category", "Portfolio")
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(3);

  // Filter by same stack tag if one exists
  if (stackTag) {
    relatedQuery = relatedQuery.contains("tags", [stackTag]);
  }

  const { data: relatedRaw } = await relatedQuery;
  const related: RelatedItem[] = relatedRaw ?? [];

  const blocks: Block[] = Array.isArray(item.blocks) && item.blocks.length > 0
    ? (item.blocks as Block[])
    : [];

  const stackLabel = stackTag ? (STACK_LABELS[stackTag] ?? stackTag.replace("stack:", "")) : null;

  const publishedDate = item.published_at
    ? new Date(item.published_at).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;

  const extraImages: string[] = Array.isArray(item.extra_images) ? item.extra_images : [];
  type FaqItem = { q: string; a: string };
  const faqs: FaqItem[] = Array.isArray(item.faq) ? item.faq : [];

  const techStack:  string[] = Array.isArray(item.tech_stack)  ? item.tech_stack  : [];
  const viewCount:  number   = (item.view_count  as number  | null) ?? 0;
  const isTrending: boolean  = (item.is_trending as boolean | null) ?? false;

  const canonicalUrl    = `${BASE}/portfolio/${slug}`;
  const allowComments:  boolean = (item.allow_comments as boolean | null) ?? false;
  const authUser = user
    ? { id: user.id, name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Pengguna" }
    : null;

  // Schema.org JSON-LD
  const jsonLd = {
    "@context":    "https://schema.org",
    "@type":       "CreativeWork",
    name:          item.title,
    description:   item.seo_description || item.excerpt || undefined,
    image:         item.image_url ? [item.image_url] : undefined,
    datePublished: item.published_at ?? item.created_at,
    author:        { "@type": "Organization", name: "Gorontalo Unite", url: BASE },
    url:           canonicalUrl,
    inLanguage:    "id-ID",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Schema.org */}
      <script type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Silent view tracker */}
      <ViewTracker slug={slug} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Beranda</Link>
        <span>/</span>
        <Link href="/portfolio" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Portofolio</Link>
        <span>/</span>
        <span className="text-gray-500 dark:text-gray-400 truncate max-w-[180px]">{item.title}</span>
      </nav>

      <article>
        {/* Stack badge + trending + date + views */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {stackLabel && (
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-2.5 py-1 rounded-full">
              {stackLabel}
            </span>
          )}
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
              👁 {viewCount.toLocaleString("id-ID")}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
          {item.title}
        </h1>

        {/* Excerpt */}
        {item.excerpt && (
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6 border-l-4 border-[#2D7D46] dark:border-emerald-500 pl-4 italic">
            {item.excerpt}
          </p>
        )}

        {/* Hero image */}
        {item.image_url && (
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-8 border border-gray-100 dark:border-zinc-800">
            <Image src={item.image_url} alt={item.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Project meta bar */}
        {(item.client_name || item.role || item.duration || item.project_date || techStack.length > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 text-sm">
            {item.client_name && (
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Klien</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium mt-0.5">{item.client_name}</p>
              </div>
            )}
            {item.role && (
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Peran</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium mt-0.5">{item.role}</p>
              </div>
            )}
            {item.duration && (
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Durasi</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium mt-0.5">{item.duration}</p>
              </div>
            )}
            {item.project_date && (
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Tanggal</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium mt-0.5">
                  {new Date(item.project_date).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                </p>
              </div>
            )}
            {techStack.length > 0 && (
              <div className="col-span-2 sm:col-span-3">
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-1.5">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span key={tech} className="text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 px-2.5 py-0.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content: blocks (new) OR markdown (legacy) */}
        {blocks.length > 0
          ? <BlockRenderer blocks={blocks} />
          : item.content && <MarkdownContent content={item.content} />
        }

        {/* Extra images gallery (legacy) */}
        {extraImages.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
              Galeri Proyek
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {extraImages.map((url, i) => (
                <div key={i} className="aspect-video relative rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
                  <Image src={url} alt={`Foto proyek ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">FAQ</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-semibold text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                    {faq.q}
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-zinc-800 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA buttons */}
        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-zinc-800 flex flex-wrap gap-3">
          {item.project_url && (
            <a href={item.project_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2D7D46] dark:bg-emerald-500 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#1f5a33] dark:hover:bg-emerald-400 transition-colors shadow-sm">
              Lihat Live Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {item.repo_url && (
            <a href={item.repo_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-5 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
              Repository
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </a>
          )}
          {/* Legacy source_url fallback */}
          {!item.project_url && item.source_url && (
            <a href={item.source_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2D7D46] dark:bg-emerald-500 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#1f5a33] dark:hover:bg-emerald-400 transition-colors shadow-sm">
              Lihat Proyek →
            </a>
          )}
        </div>

        {/* Share buttons */}
        <div className="mt-6">
          <ShareButtons url={canonicalUrl} title={item.title} />
        </div>
      </article>

      {/* Comments */}
      <CommentSection slug={slug} allowComments={allowComments} user={authUser} />

      {/* Related posts */}
      <RelatedPosts items={related} basePath="/portfolio" />

      {/* Back */}
      <div className="mt-8 flex gap-4">
        <Link href="/portfolio" className="text-sm text-[#2D7D46] dark:text-emerald-400 font-medium hover:underline">
          ← Semua portofolio
        </Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          Beranda →
        </Link>
      </div>
    </div>
  );
}
