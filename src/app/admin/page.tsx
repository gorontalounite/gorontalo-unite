import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard | Admin Gorontalo Unite" };

export default async function AdminDashboardPage() {
  const admin = createAdminClient();

  const [
    { count: totalArticles },
    { count: publishedArticles },
    { count: draftArticles },
    { count: totalUsers },
    { count: totalAffiliate },
    { count: totalClicks },
    { data: recentArticles },
    { data: userRoles },
  ] = await Promise.all([
    admin.from("articles").select("*", { count: "exact", head: true }).neq("category", "Portfolio"),
    admin.from("articles").select("*", { count: "exact", head: true }).neq("category", "Portfolio").eq("published", true),
    admin.from("articles").select("*", { count: "exact", head: true }).neq("category", "Portfolio").eq("published", false),
    admin.from("user_profiles").select("*", { count: "exact", head: true }),
    admin.from("affiliate_items").select("*", { count: "exact", head: true }),
    admin.from("affiliate_clicks").select("*", { count: "exact", head: true }),
    admin.from("articles").select("id, title, category, published, created_at").neq("category", "Portfolio").order("created_at", { ascending: false }).limit(5),
    admin.from("user_profiles").select("role").neq("role", "user"),
  ]);

  const adminCount  = userRoles?.filter((u) => u.role === "admin").length ?? 0;
  const editorCount = userRoles?.filter((u) => u.role === "editor").length ?? 0;

  const stats = [
    {
      label: "Total Konten",
      value: totalArticles ?? 0,
      sub: `${publishedArticles ?? 0} publik · ${draftArticles ?? 0} draft`,
      icon: "📰",
      href: "/admin/news",
      color: "border-l-yellow-400",
    },
    {
      label: "Pengguna",
      value: totalUsers ?? 0,
      sub: `${adminCount} admin · ${editorCount} editor`,
      icon: "👥",
      href: "/admin/users",
      color: "border-l-blue-400",
    },
    {
      label: "Produk Affiliate",
      value: totalAffiliate ?? 0,
      sub: `${totalClicks ?? 0} total klik`,
      icon: "🛍️",
      href: "/admin/affiliate",
      color: "border-l-purple-400",
    },
    {
      label: "Klik Affiliate",
      value: totalClicks ?? 0,
      sub: "semua waktu",
      icon: "🖱️",
      href: "/admin/affiliate",
      color: "border-l-green-400",
    },
  ];

  const quickActions = [
    { href: "/admin/news/new",  label: "Tulis Konten Baru",   icon: "✏️",  primary: true },
    { href: "/admin/users",     label: "Kelola Pengguna",      icon: "👤",  primary: false },
    { href: "/admin/affiliate", label: "Tambah Produk",        icon: "➕",  primary: false },
    { href: "/",                label: "Lihat Situs",          icon: "↗️",  primary: false },
  ];

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Selamat datang di panel admin Gorontalo Unite.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${s.color} shadow-sm p-4 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value.toLocaleString("id-ID")}</p>
            <p className="text-xs font-medium text-gray-700 mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent content */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">Konten Terbaru</h2>
            <Link href="/admin/news" className="text-xs text-gray-400 hover:text-gray-700">
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {(recentArticles ?? []).length === 0 ? (
              <p className="px-5 py-8 text-sm text-gray-400 text-center">Belum ada konten.</p>
            ) : (
              (recentArticles ?? []).map((a) => (
                <div key={a.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {a.category} · {new Date(a.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                    a.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {a.published ? "Publik" : "Draft"}
                  </span>
                  <Link href={`/admin/news/edit/${a.id}`} className="flex-shrink-0 text-xs text-amber-500 hover:underline">
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-semibold text-gray-900">Aksi Cepat</h2>
            </div>
            <div className="p-3 space-y-1.5">
              {quickActions.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    a.primary
                      ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{a.icon}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Content ratio */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Status Konten</h2>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Publik</span>
                  <span>{publishedArticles ?? 0}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-green-400 h-1.5 rounded-full"
                    style={{ width: totalArticles ? `${((publishedArticles ?? 0) / totalArticles) * 100}%` : "0%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Draft</span>
                  <span>{draftArticles ?? 0}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-gray-400 h-1.5 rounded-full"
                    style={{ width: totalArticles ? `${((draftArticles ?? 0) / totalArticles) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
