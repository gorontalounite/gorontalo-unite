"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export interface AffiliateItem {
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

const CATEGORIES = [
  "Semua",
  "Lighting",
  "Gimbal",
  "Kamera",
  "Tas Kamera",
  "Microphone",
  "Soundcard",
  "Tongsis & Tripod",
  "Power Bank",
  "Aksesori",
];

type SortOption = "terbaru" | "termurah" | "termahal";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function AffiliateCard({ item }: { item: AffiliateItem }) {
  return (
    <Link
      href={`/affiliate/${item.id}`}
      className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-700 hover:shadow-lg hover:border-[#2D7D46]/40 dark:hover:border-[#2D7D46]/50 transition-all flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square relative bg-gray-50 dark:bg-zinc-700 overflow-hidden">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-700 dark:to-zinc-600">
            <span className="text-4xl">🛍️</span>
          </div>
        )}
        {item.marketplace_name && (
          <span className="absolute top-2 left-2 text-xs bg-white dark:bg-zinc-900 text-foreground font-semibold px-2 py-0.5 rounded-full shadow-sm">
            {item.marketplace_name}
          </span>
        )}
        {item.category && (
          <span className="absolute top-2 right-2 text-xs bg-[#2D7D46] text-white font-medium px-2 py-0.5 rounded-full shadow-sm">
            {item.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug mb-1.5">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 dark:bg-zinc-700 text-text-secondary px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto">
          {(item.price || item.price_label) && (
            <p className="text-base font-bold text-[#2D7D46] dark:text-emerald-400 mb-2">
              {item.price_label ?? formatPrice(item.price!)}
            </p>
          )}
          <div className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-zinc-700 dark:group-hover:bg-[#2D7D46] text-white text-sm font-medium px-4 py-2.5 rounded-xl group-hover:bg-[#2D7D46] transition-colors">
            Lihat Detail
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function AffiliateListClient({ items }: { items: AffiliateItem[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeMarketplace, setActiveMarketplace] = useState("Semua");
  const [sort, setSort] = useState<SortOption>("terbaru");

  const marketplaces = useMemo(() => {
    const names = Array.from(new Set(items.map((i) => i.marketplace_name ?? "Lainnya")));
    return names.length > 1 ? ["Semua", ...names] : [];
  }, [items]);

  const filtered = useMemo(() => {
    let result = items;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((i) => i.title.toLowerCase().includes(q));
    }

    if (activeCategory !== "Semua") {
      result = result.filter((i) => i.category === activeCategory);
    }

    if (activeMarketplace !== "Semua") {
      result = result.filter(
        (i) => (i.marketplace_name ?? "Lainnya") === activeMarketplace
      );
    }

    if (sort === "terbaru") {
      result = [...result].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sort === "termurah") {
      result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sort === "termahal") {
      result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return result;
  }, [items, search, activeCategory, activeMarketplace, sort]);

  return (
    <div>
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-zinc-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:border-[#2D7D46] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#2D7D46]/20 transition-colors"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-sm border border-gray-200 dark:border-zinc-600 rounded-xl px-3 py-2.5 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 outline-none focus:border-[#2D7D46] cursor-pointer"
        >
          <option value="terbaru">Terbaru</option>
          <option value="termurah">Harga Terendah</option>
          <option value="termahal">Harga Tertinggi</option>
        </select>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 flex-wrap mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? "bg-[#2D7D46] text-white shadow-sm"
                : "bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Marketplace chips */}
      {marketplaces.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          {marketplaces.map((mp) => (
            <button
              key={mp}
              onClick={() => setActiveMarketplace(mp)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap border ${
                activeMarketplace === mp
                  ? "border-[#2D7D46] bg-[#2D7D46]/10 dark:bg-[#2D7D46]/25 text-[#2D7D46] dark:text-emerald-400"
                  : "border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-zinc-400"
              }`}
            >
              {mp}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      {filtered.length > 0 && (
        <p className="text-xs text-text-tertiary mb-4">
          Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> produk
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <AffiliateCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white dark:bg-zinc-800 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-700">
          <span className="text-5xl">🔍</span>
          <p className="text-foreground mt-4 font-semibold">Produk tidak ditemukan</p>
          <p className="text-sm text-text-secondary mt-1">
            Coba ubah kata kunci atau filter kategori.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("Semua");
              setActiveMarketplace("Semua");
            }}
            className="mt-4 text-sm text-[#2D7D46] dark:text-emerald-400 hover:underline font-medium"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
}
