import LandingPage, {
  type PortfolioItem,
  type NewsItem,
} from "@/components/Landing/LandingPage";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let portfolioItems: PortfolioItem[] = [];
  let newsItems: NewsItem[] = [];

  try {
    const admin = createAdminClient();
    const [portfolio, news] = await Promise.all([
      admin
        .from("articles")
        .select("id, title, slug, excerpt, image_url, tags, published_at, created_at")
        .eq("category", "Portfolio")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(9),
      admin
        .from("articles")
        .select("id, title, slug, excerpt, image_url, category, published_at, created_at")
        .neq("category", "Portfolio")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(6),
    ]);

    portfolioItems = (portfolio.data ?? []) as PortfolioItem[];
    newsItems = (news.data ?? []) as NewsItem[];
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
  }

  return <LandingPage portfolioItems={portfolioItems} newsItems={newsItems} />;
}
