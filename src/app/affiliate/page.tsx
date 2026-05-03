import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import type { Metadata } from "next";
import AffiliateListClient from "./AffiliateListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Affiliate | Gorontalo Unite",
  description: "Produk dan layanan lokal Gorontalo pilihan.",
};

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
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 mb-4"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Beranda
        </Link>
        <p className="text-xs font-semibold text-[#2D7D46] uppercase tracking-widest mb-1">Affiliate</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Produk Pilihan</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Produk-produk pilihan terbaik. Beli langsung di Shopee &amp; marketplace lainnya.
        </p>
      </div>

      <AffiliateListClient items={(items ?? []) as Parameters<typeof AffiliateListClient>[0]["items"]} />
    </div>
  );
}
