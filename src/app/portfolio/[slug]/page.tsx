import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const admin = createAdminClient();
  const { data } = await admin.from("articles").select("title, excerpt").eq("slug", slug).eq("category", "Portfolio").single();
  if (!data) return { title: "Portofolio | Gorontalo Unite" };
  return { title: `${data.title} | Gorontalo Unite`, description: data.excerpt ?? undefined };
}

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/portfolio" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-6">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Portofolio
      </Link>

      {item.image_url && (
        <div className="aspect-video relative rounded-2xl overflow-hidden mb-6">
          <Image src={item.image_url} alt={item.title} fill className="object-cover" />
        </div>
      )}

      <span className="inline-block text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full mb-3 font-medium">
        Portofolio
      </span>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h1>
      {item.excerpt && <p className="text-sm text-gray-500 mb-6 leading-relaxed">{item.excerpt}</p>}

      {item.content && (
        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {item.content}
        </div>
      )}

      {item.source_url && (
        <a
          href={item.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 bg-[#2D7D46] text-white text-sm px-5 py-2.5 rounded-xl hover:bg-[#236137] transition-colors"
        >
          Lihat Proyek
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
}
