"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  full_name: string | null;
  role: string;
  email: string;
}

const ROLES = ["user", "editor", "admin"] as const;
type Role = typeof ROLES[number];

const ROLE_META: Record<Role, { label: string; color: string; bg: string; border: string; desc: string }> = {
  user:   { label: "User",   color: "text-gray-600",  bg: "bg-gray-100",   border: "border-gray-200",  desc: "Hanya akses publik" },
  editor: { label: "Editor", color: "text-blue-700",  bg: "bg-blue-50",    border: "border-blue-200",  desc: "Bisa buat & edit konten" },
  admin:  { label: "Admin",  color: "text-amber-700", bg: "bg-amber-50",   border: "border-amber-200", desc: "Akses penuh semua fitur" },
};

const PERMISSIONS: { label: string; user: boolean; editor: boolean; admin: boolean }[] = [
  { label: "Baca konten publik",        user: true,  editor: true,  admin: true  },
  { label: "Buat & edit konten",        user: false, editor: true,  admin: true  },
  { label: "Publish / unpublish",       user: false, editor: true,  admin: true  },
  { label: "Hapus konten",              user: false, editor: false, admin: true  },
  { label: "Kelola produk affiliate",   user: false, editor: false, admin: true  },
  { label: "Kelola pengguna & role",    user: false, editor: false, admin: true  },
  { label: "Akses panel admin",         user: false, editor: true,  admin: true  },
];

function Check({ ok }: { ok: boolean }) {
  return ok
    ? <span className="text-green-500 text-sm">✓</span>
    : <span className="text-gray-200 text-sm">—</span>;
}

export default function UsersClient({ initialUsers }: { initialUsers: UserProfile[] }) {
  const [users, setUsers]   = useState(initialUsers);
  const [saving, setSaving] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState<{ userId: string; newRole: Role } | null>(null);

  const handleRoleChange = async (userId: string, newRole: Role) => {
    setSaving(userId);
    setConfirm(null);
    const supabase = createClient();
    const { error } = await supabase
      .from("user_profiles")
      .update({ role: newRole })
      .eq("id", userId);
    if (!error) setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    setSaving(null);
  };

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.full_name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const roleCounts = ROLES.reduce<Record<string, number>>((acc, r) => {
    acc[r] = users.filter((u) => u.role === r).length;
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-sm text-gray-500">{users.length} pengguna terdaftar</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama / email…"
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 w-56 bg-white"
        />
      </div>

      {/* Role summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {ROLES.map((r) => {
          const m = ROLE_META[r];
          return (
            <div key={r} className={`rounded-2xl border ${m.border} ${m.bg} p-4`}>
              <p className={`text-lg font-bold ${m.color}`}>{roleCounts[r] ?? 0}</p>
              <p className={`text-xs font-semibold ${m.color}`}>{m.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            {search ? "Tidak ada pengguna yang cocok." : "Belum ada pengguna."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Pengguna</th>
                <th className="px-4 py-3 text-left">Role Saat Ini</th>
                <th className="px-4 py-3 text-right">Ubah Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u) => {
                const m = ROLE_META[(u.role as Role) ?? "user"];
                return (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {(u.full_name?.[0] ?? u.email[0]).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{u.full_name ?? "—"}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-semibold border ${m.bg} ${m.color} ${m.border}`}>
                        {m.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {ROLES.filter((r) => r !== u.role).map((r) => {
                          const rm = ROLE_META[r];
                          return (
                            <button
                              key={r}
                              onClick={() => setConfirm({ userId: u.id, newRole: r })}
                              disabled={saving === u.id}
                              className={`text-xs px-2.5 py-1 rounded-lg border transition-colors disabled:opacity-40 ${rm.bg} ${rm.color} ${rm.border} hover:opacity-80`}
                            >
                              {saving === u.id ? "…" : `→ ${rm.label}`}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Permission matrix */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="text-sm font-semibold text-gray-900">Matriks Hak Akses</h2>
          <p className="text-xs text-gray-400 mt-0.5">Apa yang boleh dilakukan setiap role</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Aksi</th>
              {ROLES.map((r) => (
                <th key={r} className={`px-4 py-3 text-center font-semibold ${ROLE_META[r].color}`}>
                  {ROLE_META[r].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PERMISSIONS.map((p) => (
              <tr key={p.label} className="hover:bg-gray-50/30">
                <td className="px-5 py-2.5 text-xs text-gray-600">{p.label}</td>
                <td className="px-4 py-2.5 text-center"><Check ok={p.user} /></td>
                <td className="px-4 py-2.5 text-center"><Check ok={p.editor} /></td>
                <td className="px-4 py-2.5 text-center"><Check ok={p.admin} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm modal */}
      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <p className="font-semibold text-gray-900 mb-1">Ubah role pengguna?</p>
            <p className="text-sm text-gray-500 mb-5">
              Role akan diubah menjadi{" "}
              <span className={`font-semibold ${ROLE_META[confirm.newRole].color}`}>
                {ROLE_META[confirm.newRole].label}
              </span>
              . Perubahan langsung berlaku.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleRoleChange(confirm.userId, confirm.newRole)}
                className="flex-1 text-sm bg-amber-400 text-black font-semibold py-2 rounded-xl hover:bg-amber-500 transition-colors"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
