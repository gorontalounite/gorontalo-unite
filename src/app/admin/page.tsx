import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard | Admin Gorontalo Unite" };

/* ---------------------------------------------------------------------------
 * Icons are drawn rather than typed. The cards used emoji, which each platform
 * renders in its own style and weight — 📰 and 👥 arrive as flat grey glyphs on
 * macOS, next to a ▶ that is plain text, so the row never looked like one set.
 * ------------------------------------------------------------------------ */

const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function NewsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...ICON} aria-hidden="true">
      <path d="M4 5h11a1 1 0 0 1 1 1v12H5a1 1 0 0 1-1-1V5Z" />
      <path d="M16 9h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-3" />
      <path d="M7 8.5h5M7 11.5h5M7 14.5h3" />
    </svg>
  );
}

function ReelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...ICON} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9h17M9 4.5 7 9M15 4.5l-2 4.5" />
      <path d="m11 12.5 3.5 2-3.5 2v-4Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...ICON} aria-hidden="true">
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6a3 3 0 0 1 0 5.5M17 14.5a5.5 5.5 0 0 1 3.5 4.5" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...ICON} aria-hidden="true">
      <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="M14.5 6.5 17.5 9.5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...ICON} aria-hidden="true">
      <path d="M14 5h5v5M19 5l-7.5 7.5" />
      <path d="M18 14v4a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 18V8a1.5 1.5 0 0 1 1.5-1.5H10" />
    </svg>
  );
}

const shortDate = (value: string) =>
  new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

export default async function AdminDashboardPage() {
  const admin = await createClient();

  const article = () => admin.from("articles").select("*", { count: "exact", head: true }).neq("category", "Portfolio").is("deleted_at", null);

  const [
    { count: totalArticles },
    { count: publishedArticles },
    { count: totalUsers },
    { count: totalReels },
    { count: publishedReels },
    { data: recentArticles },
    { data: userRoles },
  ] = await Promise.all([
    article(),
    article().eq("published", true),
    admin.from("user_profiles").select("*", { count: "exact", head: true }),
    admin.from("reels").select("*", { count: "exact", head: true }).is("deleted_at", null),
    admin.from("reels").select("*", { count: "exact", head: true }).is("deleted_at", null).eq("status", "published"),
    admin.from("articles").select("id, title, category, published, created_at").neq("category", "Portfolio").is("deleted_at", null).order("created_at", { ascending: false }).limit(6),
    admin.from("user_profiles").select("role").neq("role", "user"),
  ]);

  const articles = totalArticles ?? 0;
  const live = publishedArticles ?? 0;
  const drafts = Math.max(0, articles - live);
  const reels = totalReels ?? 0;
  const reelsLive = publishedReels ?? 0;

  const adminCount  = userRoles?.filter((u) => u.role === "admin").length ?? 0;
  const editorCount = userRoles?.filter((u) => u.role === "editor").length ?? 0;

  const stats = [
    { label: "Konten",   value: articles, sub: `${live} publik · ${drafts} draft`, icon: <NewsIcon />,  href: "/admin/news",  accent: "bg-amber-400" },
    { label: "Reels",    value: reels,    sub: `${reelsLive} publik · ${Math.max(0, reels - reelsLive)} draft`, icon: <ReelIcon />, href: "/admin/reels", accent: "bg-violet-400" },
    { label: "Pengguna", value: totalUsers ?? 0, sub: `${adminCount} admin · ${editorCount} editor`, icon: <UsersIcon />, href: "/admin/users", accent: "bg-sky-400" },
  ];

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-[-.02em] text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Selamat datang di panel admin Gorontalo Unite.</p>
      </header>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300"
          >
            <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${card.accent}`} />
            <div className="flex items-center justify-between text-gray-400">
              <span className="transition-colors group-hover:text-gray-600">{card.icon}</span>
              <span aria-hidden="true" className="text-xs opacity-0 transition-opacity group-hover:opacity-100">→</span>
            </div>
            <p className="mt-3 text-[26px] font-bold leading-none tracking-[-.02em] text-gray-900">
              {card.value.toLocaleString("id-ID")}
            </p>
            <p className="mt-1.5 text-[13px] font-medium text-gray-700">{card.label}</p>
            <p className="mt-0.5 text-xs text-gray-400">{card.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
            <h2 className="text-sm font-semibold text-gray-900">Konten Terbaru</h2>
            <Link href="/admin/news" className="text-xs text-gray-400 transition-colors hover:text-gray-700">
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {(recentArticles ?? []).length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-gray-400">Belum ada konten.</p>
            ) : (
              (recentArticles ?? []).map((row) => (
                // Straight into the editing panel on the grid, the same surface
                // a row opens — the standalone edit page is no longer the way in.
                <Link
                  key={row.id}
                  href={`/admin/news?buka=${row.id}`}
                  className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">{row.title}</p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {row.category ? `${row.category} · ` : ""}{shortDate(row.created_at)}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    row.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {row.published ? "Publik" : "Draft"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </section>

        <div className="space-y-4">
          <section className="rounded-2xl border border-gray-200 bg-white p-3">
            <h2 className="px-2 pb-2 pt-1 text-sm font-semibold text-gray-900">Aksi Cepat</h2>
            <div className="space-y-1">
              <Link
                href="/admin/news?baru=1"
                className="flex items-center gap-2.5 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-100"
              >
                <PencilIcon /> Tulis Konten Baru
              </Link>
              <Link href="/admin/reels" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50">
                <ReelIcon /> Kelola Reels
              </Link>
              <Link href="/admin/users" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50">
                <UsersIcon /> Kelola Pengguna
              </Link>
              <Link href="/" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50">
                <ExternalIcon /> Lihat Situs
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-900">Status Konten</h2>
            {/* One bar, not two. Publik and Draft are two halves of the same
                total, and drawing each against the full width made an empty
                Draft bar look like a chart that had failed to load. */}
            <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-gray-100">
              {articles > 0 && <div className="bg-green-400" style={{ width: `${(live / articles) * 100}%` }} />}
              {articles > 0 && <div className="bg-gray-300" style={{ width: `${(drafts / articles) * 100}%` }} />}
            </div>
            <dl className="mt-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-gray-500">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green-400" /> Publik
                </dt>
                <dd className="font-medium text-gray-700">{live.toLocaleString("id-ID")}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-gray-500">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gray-300" /> Draft
                </dt>
                <dd className="font-medium text-gray-700">{drafts.toLocaleString("id-ID")}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
