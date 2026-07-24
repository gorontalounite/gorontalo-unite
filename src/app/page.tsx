import LandingPage, {
  type PortfolioItem,
  type NewsItem,
} from "@/components/Landing/LandingPage";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let portfolioItems: PortfolioItem[] = [];
  let newsItems: NewsItem[] = [];
  let newsTotalCount = 0;
  let eventItems: NewsItem[] = [];
  let newsUnavailable = false;

  try {
    const admin = createAdminClient();

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    const [portfolio, news, newsCount, events] = await Promise.all([
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
        .neq("category", "Event")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(6),
      admin
        .from("articles")
        .select("*", { count: "exact", head: true })
        .neq("category", "Portfolio")
        .neq("category", "Event")
        .eq("published", true),
      admin
        .from("articles")
        .select("id, title, slug, excerpt, image_url, category, published_at, created_at")
        .eq("category", "Event")
        .eq("published", true)
        .gte("published_at", monthStart)
        .lte("published_at", monthEnd)
        .order("published_at", { ascending: true })
        .limit(5),
    ]);

    portfolioItems = (portfolio.data ?? []) as PortfolioItem[];
    newsItems = (news.data ?? []) as NewsItem[];
    newsTotalCount = newsCount.count ?? 0;
    eventItems = (events.data ?? []) as NewsItem[];
    newsUnavailable = Boolean(news.error || newsCount.error);
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
  }

  return (
    <LandingPage
      portfolioItems={portfolioItems}
      newsItems={newsItems}
      newsTotalCount={newsTotalCount}
      eventItems={eventItems}
      newsUnavailable={newsUnavailable}
    />
  );
}
