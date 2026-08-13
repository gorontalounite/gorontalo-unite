import LandingPage, {
  type DestinationItem,
  type NewsItem,
} from "@/components/Landing/LandingPage";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let featuredDestinations: DestinationItem[] = [];
  let eventItems: NewsItem[] = [];

  try {
    const admin = await createClient();

    const [destinations, events] = await Promise.all([
      admin
        .from("tourism_places")
        .select("id, name, slug, description, image_url, category, location, opening_hours")
        .eq("published", true)
        .eq("featured", true)
        .order("updated_at", { ascending: false })
        .limit(3),
      admin
        .from("articles")
        .select("id, title, slug, excerpt, image_url, category, published_at, created_at")
        .eq("published", true)
        .eq("category", "Event")
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(3),
    ]);

    featuredDestinations = (destinations.data ?? []) as DestinationItem[];
    eventItems = (events.data ?? []) as NewsItem[];
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
  }

  return (
    <LandingPage
      featuredDestinations={featuredDestinations}
      eventItems={eventItems}
    />
  );
}
