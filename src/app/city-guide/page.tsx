import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import CityGuideLanding from "@/components/city-guide/CityGuideLanding";
import CityGuideDirectory, {
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
  searchParams: Promise<{ tab?: string; region?: string; q?: string }>;
}) {
  const { tab, region, q } = await searchParams;
  const supabase = await createClient();
  // Events moved to their own page at /event, so this only loads places now.
  const placesResult = await supabase
    .from("tourism_places")
    .select("id,name,slug,description,image_url,category,location,address,opening_hours,featured")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("updated_at", { ascending: false });

  const places = (placesResult.data ?? []) as CityGuidePlace[];

  return (
    <main className="bg-white text-[#302f2c] dark:bg-zinc-950 dark:text-zinc-50">
      <CityGuideLanding places={places} />
      <CityGuideDirectory
        places={places}
        initialTab={tab}
        initialRegion={region}
        initialQuery={q}
      />
    </main>
  );
}
