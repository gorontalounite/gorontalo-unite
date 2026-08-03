import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import TourismDirectory, { type TourismPlace } from "@/components/city-guide/TourismDirectory";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Wisata Gorontalo | Gorontalo Unite", description: "Direktori tempat wisata pilihan di Gorontalo." };

export default async function WisataPage() {
  const supabase = await createClient();
  const { data: places } = await supabase.from("tourism_places").select("id,name,slug,description,image_url,category,location,address,opening_hours,featured").eq("published", true).order("featured", { ascending: false }).order("updated_at", { ascending: false });
  return <TourismDirectory places={(places ?? []) as TourismPlace[]} />;
}
