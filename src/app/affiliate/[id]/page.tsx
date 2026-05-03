import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AffiliateCTAButton from "./AffiliateCTAButton";

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
  category: string | null;
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

  // Fetch related products: same category, exclude current, limit 3
  const { data: related } = await admin
    .from("affiliate_items")
    .select("id, title, image_url, price, price_label, marketplace_name, category")
    .eq("published", true)
    .eq("category", product.category ?? "")
    .neq("id", product.id)
    .limit(3);

  // Derive commission from tags — check if any tag matches a percentage pattern
  // We store commission in the seed via tags; here we look for a pattern like "10%" in tags
  const commissionTag = product.tags?.find((t) => /^\d+(\.\d+)?%$/.test(t));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/affiliate"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-foreground transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Affiliate
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image */}
        <div className="space-y-3">
          <div className="aspect-square w-full bg-gray-50 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-700 relative shadow-sm">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-700 dark:to-zinc-600">
                <span className="text-6xl">🛍️</span>
              </div>
            )}
            {product.marketplace_name && (
              <span className="absolute top-3 left-3 text-xs bg-white dark:bg-zinc-900 text-foreground font-semibold px-3 py-1 rounded-full shadow-md">
                {product.marketplace_name}
              </span>
            )}
            {commissionTag && (
              <span className="absolute top-3 right-3 text-xs bg-amber-400 text-amber-900 font-bold px-3 py-1 rounded-full shadow-sm">
                Komisi {commissionTag}
              </span>
            )}
          </div>

          {/* Category badge */}
          {product.category && (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#2D7D46]/10 dark:bg-[#2D7D46]/30 text-[#2D7D46] dark:text-emerald-300 border border-[#2D7D46]/20 dark:border-[#2D7D46]/40 px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
            </div>
          )}
        </div>

        {/* Right: Detail */}
        <div className="flex flex-col">
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tags
                .filter((t) => !/^\d+(\.\d+)?%$/.test(t))
                .map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 px-2.5 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">
            {product.title}
          </h1>

          {/* Price */}
          {(product.price || product.price_label) && (
            <div className="mb-6">
              <p className="text-3xl font-bold text-[#2D7D46] dark:text-emerald-400">
                {product.price_label ?? formatPrice(product.price!)}
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                Harga bisa berbeda di marketplace
              </p>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-2">
                Deskripsi Produk
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* CTA — client component for click tracking */}
          <div className="mt-auto space-y-3">
            <AffiliateCTAButton
              productId={product.id}
              marketplaceUrl={product.marketplace_url}
              marketplaceName={product.marketplace_name ?? "Marketplace"}
            />
            <p className="text-center text-xs text-text-tertiary">
              Anda akan diarahkan ke {product.marketplace_name ?? "marketplace"} eksternal
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related && related.length > 0 && (
        <div className="mt-14 pt-10 border-t border-gray-100 dark:border-zinc-700">
          <h2 className="text-lg font-bold text-foreground mb-5">
            Produk Serupa
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(related as AffiliateItem[]).map((rel) => (
              <Link
                key={rel.id}
                href={`/affiliate/${rel.id}`}
                className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-700 hover:shadow-md hover:border-[#2D7D46]/40 dark:hover:border-[#2D7D46]/50 transition-all flex flex-col"
              >
                <div className="aspect-square relative bg-gray-50 dark:bg-zinc-700 overflow-hidden">
                  {rel.image_url ? (
                    <Image
                      src={rel.image_url}
                      alt={rel.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl">🛍️</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground line-clamp-2 mb-1">
                    {rel.title}
                  </p>
                  {(rel.price || rel.price_label) && (
                    <p className="text-xs font-bold text-[#2D7D46] dark:text-emerald-400">
                      {rel.price_label ?? formatPrice(rel.price!)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
