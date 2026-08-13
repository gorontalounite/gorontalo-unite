import { createClient } from "@/lib/supabase/server";
import CityGuideManager from "../city-guide/CityGuideManager";
export const dynamic = "force-dynamic";
export const metadata = { title: "Wisata | Admin Gorontalo Unite" };
export default async function WisataAdminPage() { const supabase = await createClient(); const { data } = await supabase.from("tourism_places").select("*").order("updated_at", { ascending: false }); return <CityGuideManager kind="wisata" initialItems={(data ?? []) as never[]} />; }
