"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

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
  published: boolean;
  created_at: string;
}

interface AffiliateForm {
  title: string;
  description: string;
  image_url: string;
  price: string;
  price_label: string;
  marketplace_url: string;
  marketplace_name: string;
  tags: string;
  published: boolean;
}

const emptyForm: AffiliateForm = {
  title: "", description: "", image_url: "", price: "",
  price_label: "", marketplace_url: "", marketplace_name: "Tokopedia", tags: "", published: false,
};

const MARKETPLACES = ["Tokopedia", "Shopee", "Lazada", "Bukalapak", "Blibli", "Website", "Lainnya"];

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
}

export default function AffiliateAdminClient({ initialItems }: { initialItems: AffiliateItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<AffiliateForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); setError(null); };

  const openEdit = (item: AffiliateItem) => {
    setForm({
      title: item.title, description: item.description ?? "",
      image_url: item.image_url ?? "", price: item.price ? String(item.price) : "",
      price_label: item.price_label ?? "", marketplace_url: item.marketplace_url,
      marketplace_name: item.marketplace_name ?? "Tokopedia",
      tags: (item.tags ?? []).join(", "), published: item.published,
    });
    setEditId(item.id); setShowForm(true); setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const supabase = createClient();
    const payload = {
      title: form.title,
      description: form.description || null,
      image_url: form.image_url || null,
      price: form.price ? parseInt(form.price.replace(/\D/g, "")) : null,
      price_label: form.price_label || null,
      marketplace_url: form.marketplace_url,
      marketplace_name: form.marketplace_name || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    let err;
    if (editId) {
      ({ error: err } = await supabase.from("affiliate_items").update(payload).eq("id", editId));
    } else {
      ({ error: err } = await supabase.from("affiliate_items").insert(payload));
    }
    if (err) { setError(err.message); setLoading(false); return; }

    setLoading(false); setShowForm(false);
    const { data } = await supabase.from("affiliate_items").select("*").order("created_at", { ascending: false });
    setItems((data as AffiliateItem[]) ?? []);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("affiliate_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteId(null); setLoading(false);
  };

  const togglePublished = async (id: string, cur: boolean) => {
    const supabase = createClient();
    await supabase.from("affiliate_items").update({ published: !cur }).eq("id", id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, published: !cur } : i));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Affiliate</h1>
          <p className="text-sm text-gray-500">{items.length} produk — tampil di halaman /affiliate</p>
        </div>
        <button onClick={openCreate}
          className="bg-[#2D7D46] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#236137] transition-colors flex items-center gap-2">
          <span>+</span> Produk Baru
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
            <div className="aspect-square bg-gray-50 relative overflow-hidden">
              {item.image_url ? (
                <Image src={item.image_url} alt={item.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><span className="text-3xl">🛍️</span></div>
              )}
            </div>
            <div className="p-3 flex flex-col gap-1 flex-1">
              <p className="text-xs font-semibold text-gray-800 line-clamp-2">{item.title}</p>
              {(item.price || item.price_label) && (
                <p className="text-xs font-bold text-[#2D7D46]">
                  {item.price_label ?? formatPrice(item.price!)}
                </p>
              )}
              {item.marketplace_name && (
                <span className="text-xs text-gray-400">{item.marketplace_name}</span>
              )}
              <div className="flex items-center gap-2 mt-auto pt-2">
                <button onClick={() => togglePublished(item.id, item.published)}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
                  {item.published ? "Publik" : "Draft"}
                </button>
                <button onClick={() => openEdit(item)} className="text-xs text-[#2D7D46] hover:underline">Edit</button>
                <button onClick={() => setDeleteId(item.id)} className="text-xs text-red-400 hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-4 py-16 text-center text-gray-400 text-sm">
            Belum ada produk affiliate. Tambahkan produk pertama!
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">{editId ? "Edit Produk" : "Produk Baru"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">{error}</div>}

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Nama Produk *</label>
                <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Deskripsi</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] resize-none" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">URL Gambar Produk</label>
                <input value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
                {form.image_url && (
                  <div className="mt-2 w-24 h-24 relative rounded-xl overflow-hidden border border-gray-100">
                    <Image src={form.image_url} alt="preview" fill className="object-cover" unoptimized />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Harga (angka, Rp)</label>
                  <input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="250000"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Label Harga (opsional)</label>
                  <input value={form.price_label} onChange={(e) => setForm((f) => ({ ...f, price_label: e.target.value }))}
                    placeholder="Mulai dari Rp 250.000"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">URL Marketplace *</label>
                <input required value={form.marketplace_url} onChange={(e) => setForm((f) => ({ ...f, marketplace_url: e.target.value }))}
                  placeholder="https://tokopedia.com/..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Platform</label>
                <select value={form.marketplace_name} onChange={(e) => setForm((f) => ({ ...f, marketplace_name: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]">
                  {MARKETPLACES.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Tags (pisah koma)</label>
                <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  placeholder="karawo, fashion, lokal"
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 text-[#2D7D46] rounded" />
                Publikasikan (tampil di /affiliate)
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl hover:bg-gray-50">Batal</button>
                <button type="submit" disabled={loading}
                  className="flex-1 text-sm bg-[#2D7D46] text-white py-2 rounded-xl hover:bg-[#236137] disabled:opacity-50">
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="font-semibold text-gray-900 mb-2">Hapus produk ini?</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setDeleteId(null)} className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl">Batal</button>
              <button onClick={() => handleDelete(deleteId)} disabled={loading}
                className="flex-1 text-sm bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 disabled:opacity-50">
                {loading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
