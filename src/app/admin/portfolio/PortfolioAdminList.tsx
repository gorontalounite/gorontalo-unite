"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PortfolioItem {
  id:           string;
  title:        string;
  slug:         string;
  tags:         string[] | null;
  published:    boolean;
  published_at: string | null;
  created_at:   string;
  image_url:    string | null;
}

const STACK_LABELS: Record<string, string> = {
  "stack:web-design":      "Web Design",
  "stack:programming":     "Programming",
  "stack:data-analytics":  "Data Analytics",
  "stack:editing":         "Video Editing",
  "stack:carousel-design": "Carousel Design",
  "stack:videography":     "Videography",
};

export default function PortfolioAdminList({ initialItems }: { initialItems: PortfolioItem[] }) {
  const router = useRouter();
  const [items, setItems]       = useState(initialItems);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const getStack = (item: PortfolioItem) => {
    const tag = item.tags?.find((t) => t.startsWith("stack:"));
    return tag ? (STACK_LABELS[tag] ?? tag.replace("stack:", "")) : null;
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    await fetch("/api/admin/articles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((a) => a.id !== id));
    setDeleteId(null);
    setDeleting(false);
    router.refresh();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Portofolio</h1>
          <p className="text-sm text-gray-500">{items.length} karya total</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="bg-[#2D7D46] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#236137] transition-colors flex items-center gap-2"
        >
          <span>+</span> Karya Baru
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 py-16 text-center text-gray-400 text-sm">
          Belum ada karya. Buat yang pertama!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const stack = getStack(item);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-100 relative">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl">🌿</div>
                  )}
                  {!item.published && (
                    <span className="absolute top-2 left-2 text-[11px] bg-gray-800/70 text-white px-2 py-0.5 rounded-full">
                      Draft
                    </span>
                  )}
                </div>

                <div className="p-3">
                  {stack && (
                    <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full mb-1.5 inline-block">
                      {stack}
                    </span>
                  )}
                  <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {new Date(item.published_at ?? item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                    <Link
                      href={`/admin/portfolio/edit/${item.id}`}
                      className="text-xs text-[#2D7D46] hover:underline font-medium"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/portfolio/${item.slug}`}
                      target="_blank"
                      className="text-xs text-gray-400 hover:underline"
                    >
                      Lihat →
                    </Link>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="ml-auto text-xs text-red-400 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="font-semibold text-gray-900 mb-2">Hapus karya ini?</p>
            <p className="text-sm text-gray-500 mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl hover:bg-gray-50">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting}
                className="flex-1 text-sm bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 disabled:opacity-50">
                {deleting ? "Menghapus…" : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
