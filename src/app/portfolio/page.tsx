import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio | Gorontalo Unite",
  description: "Karya dan proyek digital Gorontalo Unite.",
};

export default async function PortfolioPage() {
  const admin = createAdminClient();
  const { data: items } = await admin
    .from("articles")
    .select("id, title, slug, excerpt, image_url, category, published_at, created_at")
    .eq("category", "Portfolio")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-4">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Beranda
        </Link>
        <p className="text-xs font-semibold text-[#2D7D46] uppercase tracking-widest mb-1">Portofolio</p>
        <h1 className="text-3xl font-bold text-gray-900">Karya & Proyek Kami</h1>
        <p className="text-sm text-gray-500 mt-2">Koleksi proyek digital, konten, dan karya yang telah kami hasilkan.</p>
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#2D7D46]/30 hover:shadow-md transition-all"
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
                    <span className="text-4xl">🌿</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">{item.title}</p>
                {item.excerpt && (
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <span className="text-6xl">🌿</span>
          <p className="text-gray-500 mt-4 font-medium">Portofolio sedang disiapkan</p>
          <p className="text-sm text-gray-400 mt-1">Pantau terus untuk update terbaru.</p>
          <Link href="/" className="inline-block mt-6 text-sm text-[#2D7D46] hover:underline">← Kembali ke beranda</Link>
        </div>
      )}
    </div>
  );
}
