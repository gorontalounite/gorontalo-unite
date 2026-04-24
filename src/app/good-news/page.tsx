import type { Metadata } from "next";
import Link from "next/link";
import { featuredNews } from "@/data/mockConversations";

export const metadata: Metadata = {
  title: "Good News Gorontalo — Kabar Baik dari Bumi Serambi Madinah",
  description:
    "Kumpulan berita positif dan inspiratif dari Gorontalo. Kisah sukses, capaian pembangunan, dan prestasi masyarakat Gorontalo.",
};

const categoryColors: Record<string, string> = {
  Wisata: "bg-emerald-100 text-emerald-700",
  Budaya: "bg-purple-100 text-purple-700",
  Kuliner: "bg-orange-100 text-orange-700",
  Pendidikan: "bg-blue-100 text-blue-700",
  Ekonomi: "bg-yellow-100 text-yellow-700",
};

export default function GoodNewsPage() {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Link href="/" className="hover:text-[#2D7D46]">Home</Link>
          <span>/</span>
          <span className="text-gray-600">Good News</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Good News Gorontalo</h1>
        <p className="text-gray-500">
          Kabar baik, prestasi, dan cerita inspiratif dari Bumi Serambi Madinah.
        </p>
      </div>

      {/* Featured */}
      <div className="bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-2xl p-6 text-white mb-8 shadow-sm">
        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
          ✨ Berita Unggulan
        </span>
        <h2 className="text-xl font-bold mt-3 mb-2">
          {featuredNews[0].title}
        </h2>
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          {featuredNews[0].excerpt}
        </p>
        <Link
          href={featuredNews[0].url}
          className="inline-flex items-center gap-1 text-sm font-medium bg-white text-[#2D7D46] px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors"
        >
          Baca selengkapnya →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredNews.slice(1).map((item) => (
          <Link key={item.id} href={item.url} className="group">
            <article className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-[#2D7D46]/20 transition-all h-full flex flex-col">
              <div className="w-full h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-3 flex items-center justify-center group-hover:from-emerald-50 group-hover:to-emerald-100 transition-all">
                <svg className="w-10 h-10 text-gray-200 group-hover:text-[#2D7D46]/30 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span
                className={`self-start text-xs px-2 py-0.5 rounded-full font-medium mb-2 ${
                  categoryColors[item.category] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {item.category}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-[#2D7D46] transition-colors flex-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.excerpt}</p>
              <p className="text-xs text-gray-400">
                {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
