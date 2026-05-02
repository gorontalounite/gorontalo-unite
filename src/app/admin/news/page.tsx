import { createAdminClient } from "@/lib/supabase/admin";
import NewsAdminList from "./NewsAdminList";

export const dynamic   = "force-dynamic";
export const metadata  = { title: "Berita | Admin Gorontalo Unite" };

export default async function AdminNewsPage() {
  const admin = createAdminClient();
  const { data: items } = await admin
    .from("articles")
    .select("id, title, slug, category, published, published_at, created_at")
    .neq("category", "Portfolio")
    .order("created_at", { ascending: false });

  return <NewsAdminList initialItems={items ?? []} />;
}
