import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop — Produk Lokal Gorontalo | Gorontalo Unite",
  description:
    "Belanja produk-produk lokal unggulan dari Gorontalo. Kain Karawo, produk pertanian, kerajinan tangan, dan oleh-oleh khas Gorontalo.",
};

const products = [
  {
    id: "p1",
    name: "Kain Karawo Premium",
    price: "Rp 350.000",
    category: "Kerajinan",
    description: "Kain sulam tangan khas Gorontalo dengan motif bunga tradisional. Dibuat oleh pengrajin bersertifikat.",
    badge: "Best Seller",
  },
  {
    id: "p2",
    name: "VCO (Virgin Coconut Oil) Gorontalo",
    price: "Rp 85.000",
    category: "Kesehatan",
    description: "Minyak kelapa murni cold-pressed dari kelapa pilihan Gorontalo. 250ml, tanpa bahan pengawet.",
    badge: null,
  },
  {
    id: "p3",
    name: "Paket Oleh-oleh Khas Gorontalo",
    price: "Rp 125.000",
    category: "Kuliner",
    description: "Berisi Ilabulo, Kue Curuti, dan camilan khas lainnya. Dikemas higienis, tahan 7 hari.",
    badge: "Populer",
  },
  {
    id: "p4",
    name: "Benih Jagung Unggul Gorontalo",
    price: "Rp 45.000",
    category: "Pertanian",
    description: "Varietas jagung unggulan produksi Gorontalo. 1kg, cocok untuk lahan tropis.",
    badge: null,
  },
  {
    id: "p5",
    name: "Syal Karawo Handmade",
    price: "Rp 195.000",
    category: "Fashion",
    description: "Syal bordir karawo halus dengan motif geometris klasik. 60x180cm, bahan satin.",
    badge: "Baru",
  },
  {
    id: "p6",
    name: "Kopi Robusta Boliyohuto",
    price: "Rp 65.000",
    category: "Kuliner",
    description: "Kopi robusta single origin dari perkebunan Boliyohuto. 250g, biji atau bubuk pilihan.",
    badge: null,
  },
];

const categoryColors: Record<string, string> = {
  Kerajinan: "bg-purple-100 text-purple-700",
  Kesehatan: "bg-red-100 text-red-700",
  Kuliner: "bg-orange-100 text-orange-700",
  Pertanian: "bg-green-100 text-green-700",
  Fashion: "bg-pink-100 text-pink-700",
};

export default function ShopPage() {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Link href="/" className="hover:text-[#2D7D46]">Home</Link>
          <span>/</span>
          <span className="text-gray-600">Shop</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Produk Lokal Gorontalo</h1>
        <p className="text-gray-500">
          Dukung UMKM lokal dengan berbelanja produk unggulan dari Bumi Serambi Madinah.
        </p>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#2D7D46]/20 transition-all flex flex-col overflow-hidden"
          >
            {/* Image placeholder */}
            <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
              <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {product.badge && (
                <span className="absolute top-3 left-3 text-xs font-medium bg-[#2D7D46] text-white px-2 py-0.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="p-4 flex flex-col flex-1">
              <span
                className={`self-start text-xs px-2 py-0.5 rounded-full font-medium mb-2 ${
                  categoryColors[product.category] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {product.category}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#2D7D46]">{product.price}</span>
                <button className="text-xs bg-[#2D7D46] text-white px-3 py-1.5 rounded-lg hover:bg-[#236137] transition-colors active:scale-95">
                  Pesan
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-8">
        Transaksi aman · Produk lokal bersertifikat · Pengiriman ke seluruh Indonesia
      </p>
    </div>
  );
}
