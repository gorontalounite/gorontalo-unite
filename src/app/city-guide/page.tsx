import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import CityGuideDirectory, {
  type CityGuideEvent,
  type CityGuidePlace,
} from "@/components/city-guide/CityGuideDirectory";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "City Guide | Gorontalo Unite",
  description: "Directory of destinations and upcoming events in Gorontalo.",
  alternates: { canonical: "/city-guide" },
};

export default async function CityGuidePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const supabase = await createClient();
  const [placesResult, eventsResult] = await Promise.all([
    supabase
      .from("tourism_places")
      .select("id,name,slug,description,image_url,category,location,address,opening_hours,featured")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("updated_at", { ascending: false }),
    supabase
      .from("events")
      .select("id,title,slug,description,image_url,category,venue,address,starts_at,ends_at,featured")
      .eq("published", true)
      .gte("starts_at", new Date().toISOString())
      .order("featured", { ascending: false })
      .order("starts_at", { ascending: true }),
  ]);

  return (
    <CityGuideDirectory
      places={(placesResult.data ?? []) as CityGuidePlace[]}
      events={(eventsResult.data ?? []) as CityGuideEvent[]}
      initialTab={tab}
    />
  );
}
