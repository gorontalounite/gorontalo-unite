import LandingPage, {
  type DestinationItem,
  type NewsItem,
} from "@/components/Landing/LandingPage";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let newsItems: NewsItem[] = [];
  let featuredNewsItems: NewsItem[] = [];
  let featuredDestinations: DestinationItem[] = [];
  let newsTotalCount = 0;
  let newsUnavailable = false;

  try {
    const admin = await createClient();

    const [news, featuredNews, newsCount, destinations] = await Promise.all([
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
        .select("id, title, slug, excerpt, image_url, category, published_at, created_at")
        .eq("published", true)
        .eq("is_trending", true)
        .neq("category", "Portfolio")
        .neq("category", "Event")
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(3),
      admin
        .from("articles")
        .select("*", { count: "exact", head: true })
        .neq("category", "Portfolio")
        .neq("category", "Event")
        .eq("published", true),
      admin
        .from("tourism_places")
        .select("id, name, slug, description, image_url, category, location, opening_hours")
        .eq("published", true)
        .eq("featured", true)
        .order("updated_at", { ascending: false })
        .limit(3),
    ]);

    newsItems = (news.data ?? []) as NewsItem[];
    featuredNewsItems = (featuredNews.data ?? []) as NewsItem[];
    featuredDestinations = (destinations.data ?? []) as DestinationItem[];
    newsTotalCount = newsCount.count ?? 0;
    newsUnavailable = Boolean(news.error || newsCount.error);
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    newsUnavailable = true;
  }

  return (
    <LandingPage
      newsItems={newsItems}
      featuredNewsItems={featuredNewsItems}
      featuredDestinations={featuredDestinations}
      newsTotalCount={newsTotalCount}
      newsUnavailable={newsUnavailable}
    />
  );
}
