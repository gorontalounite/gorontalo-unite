import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import MarkdownContent from "@/components/ui/MarkdownContent";
import BlockRenderer from "@/components/ui/BlockRenderer";
import type { Block } from "@/components/editor/types";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  const admin = createAdminClient();
  const { data } = await admin
    .from("articles")
    .select("title, excerpt, seo_title, seo_description")
    .eq("slug", slug)
    .eq("published", true)
    .neq("category", "Portfolio")
    .single();
  if (!data) return { title: "Artikel | Gorontalo Unite" };
  return {
    title:       `${data.seo_title || data.title} | Gorontalo Unite`,
    description: data.seo_description || data.excerpt || undefined,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Wisata:        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Budaya:        "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Kuliner:       "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Pendidikan:    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Ekonomi:       "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Kesehatan:     "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Infrastruktur: "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300",
  "Good News":   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

export default async function NewsDetailPage({ params }: Props) {
  const { id: slug } = await params;
  const admin        = createAdminClient();

  const { data: article } = await admin
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .neq("category", "Portfolio")
    .single();

  if (!article) notFound();

  const colorClass  = CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-700";
  const blocks: Block[] = Array.isArray(article.blocks) && article.blocks.length > 0
    ? (article.blocks as Block[])
    : [];

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      })
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Beranda</Link>
        <span>/</span>
        <Link href="/good-news" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Berita</Link>
        <span>/</span>
        <span className="text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{article.title}</span>
      </nav>

      <article>
        {/* Category + Date */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
            {article.category}
          </span>
          {publishedDate && (
            <span className="text-xs text-gray-400 dark:text-gray-500">{publishedDate}</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6 border-l-4 border-[#2D7D46] dark:border-emerald-500 pl-4 italic">
            {article.excerpt}
          </p>
        )}

        {/* Hero image */}
        {article.image_url && (
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-8">
            <Image src={article.image_url} alt={article.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Content: blocks (new) OR markdown (legacy) */}
        {blocks.length > 0
          ? <BlockRenderer blocks={blocks} />
          : article.content && <MarkdownContent content={article.content} />
        }

        {/* Extra images (legacy gallery) */}
        {Array.isArray(article.extra_images) && article.extra_images.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-widest">
              Galeri
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {article.extra_images.map((url: string, i: number) => (
                <div key={i} className="aspect-video relative rounded-xl overflow-hidden">
                  <Image src={url} alt={`Foto ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Back */}
      <div className="mt-10 pt-6 border-t border-gray-100 dark:border-zinc-800 flex gap-4">
        <Link href="/good-news" className="text-sm text-[#2D7D46] dark:text-emerald-400 font-medium hover:underline">
          ← Semua berita
        </Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-medium">
          Tanya Gorontalo AI →
        </Link>
      </div>
    </div>
  );
}
