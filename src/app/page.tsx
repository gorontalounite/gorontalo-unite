import LandingPage from "@/components/Landing/LandingPage";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let portfolioItems = [];

  try {
    const { data } = await createAdminClient()
      .from("articles")
      .select("id, title, slug, image_url, published_at, created_at")
      .eq("category", "Portfolio")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(4);

    portfolioItems = data ?? [];
  } catch (error) {
    console.error("Failed to fetch portfolio items:", error);
  }

  return <LandingPage portfolioItems={portfolioItems} />;
}
