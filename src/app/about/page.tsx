import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Tentang Gorontalo Unite",
  description:
    "Gorontalo Unite adalah platform digital lokal yang menghubungkan masyarakat Gorontalo dengan informasi terkini, berita positif, dan produk-produk lokal unggulan.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#2D7D46]">Home</Link>
        <span>/</span>
        <span className="text-gray-600">About Us</span>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-2xl p-8 text-white text-center mb-8 shadow-sm">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">GU</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Gorontalo Unite</h1>
        <p className="text-white/80 text-sm">
          Platform Digital Lokal Bumi Serambi Madinah
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Tentang Kami</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            <strong>Gorontalo Unite</strong> adalah platform digital lokal yang didedikasikan untuk menghubungkan
            masyarakat Gorontalo dengan informasi yang akurat, relevan, dan bermanfaat.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Kami percaya bahwa teknologi harus bisa diakses oleh semua lapisan masyarakat —
            dari petani jagung di pedesaan hingga pengusaha muda di kota. Dengan menghadirkan
            AI chatbot berbahasa Indonesia yang memahami konteks lokal, kami menjembatani
            kesenjangan informasi di Gorontalo.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Visi & Misi</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[#2D7D46] text-sm">🎯</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Visi</h3>
                <p className="text-sm text-gray-600">
                  Menjadi portal informasi terpercaya dan jembatan digital masyarakat Gorontalo menuju masa depan yang lebih maju.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[#2D7D46] text-sm">🚀</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Misi</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Menyebarkan informasi yang akurat dan berimbang tentang Gorontalo</li>
                  <li>• Memberdayakan UMKM dan pengrajin lokal melalui platform digital</li>
                  <li>• Memanfaatkan AI untuk memudahkan akses informasi masyarakat</li>
                  <li>• Mempromosikan pariwisata dan budaya Gorontalo ke dunia</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Fitur Platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: "🤖", title: "AI Chatbot", desc: "Tanya apapun tentang Gorontalo" },
              { icon: "📰", title: "Good News", desc: "Berita positif dan inspiratif" },
              { icon: "🛒", title: "Shop Lokal", desc: "Produk UMKM Gorontalo" },
              { icon: "🗺️", title: "Info Wisata", desc: "Panduan destinasi terlengkap" },
            ].map((f) => (
              <div key={f.title} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-xl">{f.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Kontak</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>📧 Email: <a href="mailto:hello@gorontalounite.com" className="text-[#2D7D46] hover:underline">hello@gorontalounite.com</a></p>
            <p>🌐 Website: <a href="https://gorontalounite.com" className="text-[#2D7D46] hover:underline">gorontalounite.com</a></p>
            <p>📍 Alamat: Kota Gorontalo, Provinsi Gorontalo, Indonesia</p>
          </div>
        </section>
      </div>
    </div>
  );
}
