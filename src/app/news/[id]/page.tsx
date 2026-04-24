import type { Metadata } from "next";
import Link from "next/link";
import { featuredNews } from "@/data/mockConversations";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = featuredNews.find((n) => n.url === `/news/${id}`);
  if (!article) {
    return { title: "Artikel tidak ditemukan | Gorontalo Unite" };
  }
  return {
    title: `${article.title} | Gorontalo Unite`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const article = featuredNews.find((n) => n.url === `/news/${id}`);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#2D7D46]">Home</Link>
        <span>/</span>
        <Link href="/good-news" className="hover:text-[#2D7D46]">Good News</Link>
        <span>/</span>
        <span className="text-gray-600 truncate">{article.category}</span>
      </div>

      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Hero image placeholder */}
        <div className="h-48 sm:h-64 bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
          <svg className="w-16 h-16 text-[#2D7D46]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="p-6">
          <span className="inline-block text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium mb-3">
            {article.category}
          </span>
          <h1 className="text-xl font-bold text-gray-900 mb-3 leading-snug">{article.title}</h1>
          <p className="text-sm text-gray-400 mb-6">
            {new Date(article.publishedAt).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Gorontalo terus menunjukkan perkembangan yang menggembirakan di berbagai sektor.
              Capaian ini merupakan hasil kerja keras seluruh elemen masyarakat dan pemerintah
              yang berkomitmen untuk memajukan daerah.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Dengan dukungan semua pihak, Gorontalo optimis dapat mencapai target pembangunan
              yang telah ditetapkan dan menjadi provinsi yang semakin maju dan sejahtera.
            </p>
          </div>
        </div>
      </article>

      {/* Back */}
      <div className="mt-6 flex gap-3">
        <Link
          href="/good-news"
          className="text-sm text-[#2D7D46] font-medium hover:underline"
        >
          ← Kembali ke Good News
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-600 font-medium"
        >
          Tanya Gorontalo AI →
        </Link>
      </div>
    </div>
  );
}
