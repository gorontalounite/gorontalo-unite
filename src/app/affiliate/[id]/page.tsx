import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

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
  created_at: string;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const admin = createAdminClient();
  const { data } = await admin
    .from("affiliate_items")
    .select("title, description")
    .eq("id", id)
    .single();

  return {
    title: data ? `${data.title} | Affiliate Gorontalo Unite` : "Produk | Affiliate",
    description: data?.description ?? "Lihat detail produk pilihan kami.",
  };
}

export default async function AffiliateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const admin = createAdminClient();
  const { data: item } = await admin
    .from("affiliate_items")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (!item) notFound();

  const product = item as AffiliateItem;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Back link */}
      <Link
        href="/affiliate"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Affiliate
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

        {/* ── Left: Image ── */}
        <div className="space-y-3">
          <div className="aspect-square w-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
                <span className="text-6xl">🛍️</span>
              </div>
            )}
            {product.marketplace_name && (
              <span className="absolute top-3 left-3 text-xs bg-white/90 backdrop-blur-sm text-gray-600 font-medium px-3 py-1 rounded-full shadow-sm">
                {product.marketplace_name}
              </span>
            )}
          </div>
        </div>

        {/* ── Right: Detail ── */}
        <div className="flex flex-col">

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
            {product.title}
          </h1>

          {/* Price */}
          {(product.price || product.price_label) && (
            <div className="mb-6">
              <p className="text-3xl font-bold text-[#2D7D46]">
                {product.price_label ?? formatPrice(product.price!)}
              </p>
              <p className="text-xs text-gray-400 mt-1">Harga bisa berbeda di marketplace</p>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Deskripsi Produk
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto space-y-3">
            <a
              href={product.marketplace_url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full flex items-center justify-center gap-2 bg-[#2D7D46] text-white font-semibold px-6 py-4 rounded-2xl hover:bg-[#236137] active:scale-[0.98] transition-all text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Beli Sekarang di {product.marketplace_name ?? "Marketplace"}
            </a>
            <p className="text-center text-xs text-gray-400">
              Anda akan diarahkan ke {product.marketplace_name ?? "marketplace"} eksternal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
