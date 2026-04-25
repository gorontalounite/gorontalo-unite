import { createAdminClient } from "@/lib/supabase/admin";
import UsersClient from "./UsersClient";

export const metadata = {
  title: "Pengguna | Admin Gorontalo Unite",
};

export default async function UsersPage() {
  const adminClient = createAdminClient();

  // Fetch profiles via admin client (service role) — bypasses RLS, sees all users
  const { data: profiles } = await adminClient
    .from("user_profiles")
    .select("id, full_name, role")
    .order("role", { ascending: false });

  // Fetch emails via service role admin API
  const { data: { users: authUsers } } = await adminClient.auth.admin.listUsers({ perPage: 500 });

  const emailMap = new Map(
    (authUsers ?? []).map((u) => [u.id, u.email ?? ""])
  );

  const merged = (profiles ?? []).map((p) => ({
    id: p.id,
    full_name: p.full_name as string | null,
    role: p.role as string,
    email: emailMap.get(p.id) ?? "—",
  }));

  return <UsersClient initialUsers={merged} />;
}
