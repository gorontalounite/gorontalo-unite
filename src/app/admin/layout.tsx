import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard | Gorontalo Unite",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in?redirect=/admin");

  const adminClient = createAdminClient();
  const { data: profileRaw } = await adminClient
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
    <div className="force-light flex flex-1 min-h-0">
      <AdminSidebar fullName={profile.full_name} role={profile.role} />
      <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
    </div>
  );
}
