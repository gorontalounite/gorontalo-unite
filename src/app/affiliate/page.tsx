import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Affiliate | Gorontalo Unite",
  description: "Produk dan layanan lokal Gorontalo pilihan.",
};

interface AffiliateItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  price_label: string | null;
  marketplace_url: string;
  marketplace_name: string | null;
  tags: string[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
}

function AffiliateCard({ item }: { item: AffiliateItem }) {
  return (
    <a
      href={item.marketplace_url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-[#2D7D46]/20 transition-all flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square relative bg-gray-50 overflow-hidden">
        {item.image_url ? (
          <Image src={item.image_url} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
            <span className="text-4xl">🛍️</span>
          </div>
        )}
        {item.marketplace_name && (
          <span className="absolute top-2 left-2 text-xs bg-white/90 backdrop-blur-sm text-gray-600 font-medium px-2 py-0.5 rounded-full shadow-sm">
            {item.marketplace_name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-1">{item.title}</h3>
        {item.description && (
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">{item.description}</p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        )}

        <div className="mt-auto">
          {(item.price || item.price_label) && (
            <p className="text-base font-bold text-[#2D7D46] mb-2">
              {item.price_label ?? formatPrice(item.price!)}
            </p>
          )}
          <div className="w-full flex items-center justify-center gap-2 bg-[#2D7D46] text-white text-sm font-medium px-4 py-2.5 rounded-xl group-hover:bg-[#236137] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Beli Sekarang
          </div>
        </div>
      </div>
    </a>
  );
}

export default async function AffiliatePage() {
  const admin = createAdminClient();
  const { data: items } = await admin
    .from("affiliate_items")
    .select("*")
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
        <p className="text-xs font-semibold text-[#2D7D46] uppercase tracking-widest mb-1">Affiliate</p>
        <h1 className="text-3xl font-bold text-gray-900">Produk Pilihan</h1>
        <p className="text-sm text-gray-500 mt-2">Produk-produk pilihan terbaik. Beli langsung di Shopee &amp; marketplace lainnya.</p>
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <AffiliateCard key={item.id} item={item as AffiliateItem} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
          <span className="text-5xl">🛍️</span>
          <p className="text-gray-500 mt-4 font-medium">Produk affiliate segera hadir</p>
          <p className="text-sm text-gray-400 mt-1">Kami sedang menyiapkan produk-produk pilihan terbaik.</p>
        </div>
      )}
    </div>
  );
}
