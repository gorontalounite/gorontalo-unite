"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link          from "next/link";
import Image         from "next/image";
import { createClient } from "@/lib/supabase/client";

interface Props {
  userId:    string;
  email:     string;
  fullName:  string;
  role:      string;
  avatarUrl: string | null;
}

const ROLE_LABELS: Record<string, string> = {
  admin:  "Admin",
  editor: "Editor",
  user:   "Pengguna",
};

export default function ProfileClient({ userId, email, fullName: initName, role, avatarUrl }: Props) {
  const router = useRouter();
  const [name,    setName]    = useState(initName);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    const { error: authErr } = await supabase.auth.updateUser({ data: { full_name: name } });
    if (authErr) { setError(authErr.message); setSaving(false); return; }

    // Update user_profiles table
    const { error: dbErr } = await supabase
      .from("user_profiles")
      .update({ full_name: name })
      .eq("id", userId);

    if (dbErr) { setError(dbErr.message); setSaving(false); return; }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  };

  const handleSignOut = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#2D7D46] dark:hover:text-emerald-400">Beranda</Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">Profil Saya</span>
      </nav>

      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Profil Saya</h1>

      {/* Avatar + role */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={name || email} width={64} height={64} className="object-cover w-full h-full" />
          ) : (
            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 uppercase">
              {(name || email).charAt(0)}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{name || email}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{email}</p>
          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1.5 ${
            role === "admin"  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
            role === "editor" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
            "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400"
          }`}>
            {ROLE_LABELS[role] ?? role}
          </span>
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-5 shadow-sm mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Edit Informasi</h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs px-3 py-2 rounded-lg border border-red-100 dark:border-red-800 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nama kamu"
              className="w-full text-sm border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:border-[#2D7D46] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#2D7D46]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full text-sm border border-gray-100 dark:border-zinc-700 rounded-xl px-3 py-2.5 bg-gray-50 dark:bg-zinc-800/50 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            />
            <p className="text-[10px] text-gray-400 mt-1">Email tidak bisa diubah.</p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#2D7D46] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#236137] disabled:opacity-50 transition-colors"
          >
            {saving ? "Menyimpan…" : saved ? "✓ Tersimpan" : "Simpan Perubahan"}
          </button>
        </form>
      </div>

      {/* Quick links for admin/editor */}
      {(role === "admin" || role === "editor") && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 px-4 py-3 mb-4">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-2">Akses Staf</p>
          <Link
            href="/admin/news"
            className="text-sm text-[#2D7D46] dark:text-emerald-400 font-medium hover:underline"
          >
            → Buka Dashboard Admin
          </Link>
        </div>
      )}

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        disabled={loggingOut}
        className="w-full text-sm border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
      >
        {loggingOut ? "Keluar…" : "Keluar (Sign Out)"}
      </button>
    </div>
  );
}
