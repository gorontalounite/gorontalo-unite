import { createAdminClient } from "@/lib/supabase/admin";
import LandingPage from "@/components/Landing/LandingPage";

export default async function HomePage() {
  const admin = createAdminClient();
  const { data: portfolioItems } = await admin
    .from("articles")
    .select("id, title, slug, excerpt, image_url, category")
    .eq("category", "Portfolio")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(8);

  return <LandingPage portfolioItems={portfolioItems ?? []} />;
}
