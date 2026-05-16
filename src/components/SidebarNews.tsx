import Link from "next/link";
import { featuredNews } from "@/data/mockConversations";

const categoryColors: Record<string, string> = {
  Politik:"bg-blue-100 text-blue-700", Pemerintahan:"bg-sky-100 text-sky-700",
  Wisata:"bg-yellow-100 text-yellow-700", Budaya:"bg-purple-100 text-purple-700",
  Ekonomi:"bg-emerald-100 text-emerald-700", Bisnis:"bg-green-100 text-green-700",
  Pendidikan:"bg-teal-100 text-teal-700", Sosial:"bg-orange-100 text-orange-700",
  Kemasyarakatan:"bg-amber-100 text-amber-700", Kesehatan:"bg-red-100 text-red-700",
  Pertanian:"bg-lime-100 text-lime-700", Perikanan:"bg-cyan-100 text-cyan-700",
  Teknologi:"bg-violet-100 text-violet-700", Digital:"bg-indigo-100 text-indigo-700",
  Infrastruktur:"bg-gray-100 text-gray-700", Pembangunan:"bg-stone-100 text-stone-700",
  Hukum:"bg-rose-100 text-rose-700", Keamanan:"bg-pink-100 text-pink-700",
  Agama:"bg-amber-100 text-amber-800", Lingkungan:"bg-green-100 text-green-800",
  Alam:"bg-emerald-100 text-emerald-800", Olahraga:"bg-indigo-100 text-indigo-700",
};

const catKeyMap: Record<string, string> = {
  Politik:"politik", Pemerintahan:"pemerintahan", Wisata:"wisata", Budaya:"budaya",
  Ekonomi:"ekonomi", Bisnis:"bisnis", Pendidikan:"pendidikan", Sosial:"sosial",
  Kemasyarakatan:"kemasyarakatan", Kesehatan:"kesehatan", Pertanian:"pertanian",
  Perikanan:"perikanan", Teknologi:"teknologi", Digital:"digital",
  Infrastruktur:"infrastruktur", Pembangunan:"pembangunan", Hukum:"hukum",
  Keamanan:"keamanan", Agama:"agama", Lingkungan:"lingkungan", Alam:"alam", Olahraga:"olahraga",
};

export default function SidebarNews() {
  return (
    <aside className="w-72 flex-shrink-0 hidden xl:flex flex-col gap-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Berita Terkini</h3>
          <Link
            href="/good-news"
            className="text-xs text-brand font-medium hover:underline"
          >
            Lihat semua →
          </Link>
        </div>

        <div className="space-y-4">
          {featuredNews.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="group block"
            >
              <article className="flex gap-3 items-start">
                {/* Placeholder image */}
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden group-hover:from-yellow-50 group-hover:to-yellow-100 transition-all">
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/berita/${catKeyMap[item.category] ?? item.category.toLowerCase()}`}
                    className={`inline-block text-xs px-1.5 py-0.5 rounded-md font-medium mb-1 ${
                      categoryColors[item.category] ?? "bg-gray-100 text-gray-700"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.category}
                  </Link>
                  <h4 className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-gradient-to-br from-[#F5C400] to-[#111111] rounded-2xl p-4 text-white shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Layanan Cepat</h3>
        <div className="space-y-2">
          {[
            { label: "Good News Gorontalo", href: "/good-news", icon: "🌟" },
            { label: "Toko Produk Lokal", href: "/shop", icon: "🛒" },
            { label: "Tentang Kami", href: "/about", icon: "ℹ️" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-sm text-white/80 hover:text-white hover:bg-white/10 px-2 py-1.5 rounded-lg transition-all"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
