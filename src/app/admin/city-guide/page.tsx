import { createClient } from "@/lib/supabase/server";
import CityGuideManager from "./CityGuideManager";
export const dynamic = "force-dynamic";
export const metadata = { title: "City Guide | Admin Gorontalo Unite" };
export default async function CityGuideAdminPage() { const supabase = await createClient(); const { data } = await supabase.from("tourism_places").select("*").order("updated_at", { ascending: false }); return <CityGuideManager kind="place" initialItems={(data ?? []) as never[]} />; }
