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

const ROLE_COLORS: Record<Role, string> = {
  user: "bg-gray-100 text-gray-600",
  editor: "bg-blue-100 text-blue-700",
  admin: "bg-amber-100 text-amber-700",
};

export default function UsersClient({ initialUsers }: { initialUsers: UserProfile[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [saving, setSaving] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleRoleChange = async (userId: string, newRole: Role) => {
    setSaving(userId);
    const supabase = createClient();
    const { error } = await supabase
      .from("user_profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (!error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
    setSaving(null);
  };

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.full_name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-sm text-gray-500">{users.length} pengguna terdaftar</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama / email..."
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] w-56"
        />
      </div>

      {/* Role legend */}
      <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
        <span className="font-medium">Role:</span>
        {ROLES.map((r) => (
          <span key={r} className={`px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[r]}`}>
            {r}
          </span>
        ))}
        <span className="ml-2 text-gray-400">— admin & editor bisa akses dashboard</span>
      </div>

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
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-right">Ubah Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] flex items-center justify-center flex-shrink-0">
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
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[u.role as Role] ?? ROLE_COLORS.user}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {ROLES.filter((r) => r !== u.role).map((r) => (
                        <button
                          key={r}
                          onClick={() => handleRoleChange(u.id, r)}
                          disabled={saving === u.id}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-colors disabled:opacity-40
                            ${r === "admin"
                              ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                              : r === "editor"
                              ? "border-blue-200 text-blue-600 hover:bg-blue-50"
                              : "border-gray-200 text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                          {saving === u.id ? "..." : `→ ${r}`}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
