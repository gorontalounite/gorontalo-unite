import { createAdminClient } from "@/lib/supabase/admin";
import PortfolioAdminList from "./PortfolioAdminList";

export const dynamic   = "force-dynamic";
export const metadata  = { title: "Portofolio | Admin Gorontalo Unite" };

export default async function AdminPortfolioPage() {
  const admin = createAdminClient();
  const { data: items } = await admin
    .from("articles")
    .select("id, title, slug, tags, published, published_at, created_at, image_url")
    .eq("category", "Portfolio")
    .order("created_at", { ascending: false });

  return <PortfolioAdminList initialItems={items ?? []} />;
}
