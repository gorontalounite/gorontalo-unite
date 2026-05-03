import type { Metadata } from "next";
import { redirect }      from "next/navigation";
import { createClient }  from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import ProfileClient     from "./ProfileClient";

export const metadata: Metadata = { title: "Profil Saya | Gorontalo Unite" };
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in?redirect=/profile");

  const admin = createAdminClient();
  const { data: profileRaw } = await admin
    .from("user_profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profile = profileRaw as any as { full_name: string | null; role: string } | null;

  return (
    <ProfileClient
      userId={user.id}
      email={user.email ?? ""}
      fullName={profile?.full_name ?? ""}
      role={profile?.role ?? "user"}
      avatarUrl={user.user_metadata?.avatar_url ?? null}
    />
  );
}
