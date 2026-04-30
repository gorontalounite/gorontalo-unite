import { createAdminClient } from "@/lib/supabase/admin";
import PortfolioAdminClient from "./PortfolioAdminClient";

export const metadata = { title: "Portofolio | Admin Gorontalo Unite" };

export default async function AdminPortfolioPage() {
  const admin = createAdminClient();
  const { data: items } = await admin
    .from("articles")
    .select("id, title, slug, excerpt, image_url, published, created_at")
    .eq("category", "Portfolio")
    .order("created_at", { ascending: false });

  return <PortfolioAdminClient initialItems={items ?? []} />;
}
