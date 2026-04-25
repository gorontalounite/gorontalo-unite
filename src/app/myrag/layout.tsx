import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "RAG Upload | Gorontalo Unite",
  robots: { index: false, follow: false },
};

export default async function MyRagLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in?redirect=/myrag");

  const { data: profileRaw } = await supabase
    .from("user_profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profile = profileRaw as any as { role: string; full_name: string | null } | null;

  if (!profile || !["admin", "editor"].includes(profile.role)) {
    redirect("/?error=unauthorized");
  }

  return (
    <div className="flex flex-1 min-h-0">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <p className="text-xs text-gray-400 font-medium">RAG Dashboard</p>
          <p className="text-sm font-semibold text-gray-900 truncate">{profile.full_name ?? user.email}</p>
          <span className="inline-block text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mt-1 capitalize">
            {profile.role}
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <Link
            href="/myrag"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <span>📄</span> Upload Dokumen
          </Link>
          <Link
            href="/admin/knowledge-base"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <span>🧠</span> Knowledge Base
          </Link>
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            ← Admin Dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            ← Kembali ke situs
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
    </div>
  );
}
