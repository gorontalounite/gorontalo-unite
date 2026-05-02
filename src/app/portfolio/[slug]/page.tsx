import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import MarkdownContent from "@/components/ui/MarkdownContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const admin = createAdminClient();
  const { data } = await admin
    .from("articles")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("category", "Portfolio")
    .single();
  if (!data) return { title: "Portofolio | Gorontalo Unite" };
  return {
    title: `${data.title} | Gorontalo Unite`,
    description: data.excerpt ?? undefined,
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
  const admin = createAdminClient();

  const { data: item } = await admin
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("category", "Portfolio")
    .eq("published", true)
    .single();

  if (!item) notFound();

  const stackTag = (item.tags as string[] | null)?.find((t: string) => t.startsWith("stack:"));
  const stackLabel = stackTag ? (STACK_LABELS[stackTag] ?? stackTag.replace("stack:", "")) : null;

  const publishedDate = item.published_at
    ? new Date(item.published_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const extraImages: string[] = Array.isArray(item.extra_images) ? item.extra_images : [];
  type FaqItem = { q: string; a: string };
  const faqs: FaqItem[] = Array.isArray(item.faq) ? item.faq : [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">
          Beranda
        </Link>
        <span>/</span>
        <Link href="/portfolio" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">
          Portofolio
        </Link>
        <span>/</span>
        <span className="text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
          {item.title}
        </span>
      </nav>

      <article>
        {/* Stack badge + date */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {stackLabel && (
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-2.5 py-1 rounded-full">
              {stackLabel}
            </span>
          )}
          {publishedDate && (
            <span className="text-xs text-gray-400 dark:text-gray-500">{publishedDate}</span>
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
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Main content — rendered Markdown */}
        {item.content && <MarkdownContent content={item.content} />}

        {/* Extra images gallery */}
        {extraImages.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
              Galeri Proyek
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {extraImages.map((url, i) => (
                <div
                  key={i}
                  className="aspect-video relative rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800"
                >
                  <Image
                    src={url}
                    alt={`Foto proyek ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
              FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-semibold text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                    {faq.q}
                    <svg
                      className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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

        {/* CTA */}
        {item.source_url && (
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-zinc-800">
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2D7D46] dark:bg-emerald-500 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#1f5a33] dark:hover:bg-emerald-400 transition-colors shadow-sm"
            >
              Lihat Proyek
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </article>

      {/* Back */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/portfolio"
          className="text-sm text-[#2D7D46] dark:text-emerald-400 font-medium hover:underline"
        >
          ← Semua portofolio
        </Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          Beranda →
        </Link>
      </div>
    </div>
  );
}
