import { createClient } from "@/lib/supabase/server";
import CityGuideManager from "../city-guide/CityGuideManager";
export const dynamic = "force-dynamic";
export const metadata = { title: "Event | Admin Gorontalo Unite" };
export default async function EventAdminPage() { const supabase = await createClient(); const { data } = await supabase.from("events").select("*").order("starts_at", { ascending: false }); return <CityGuideManager kind="event" initialItems={(data ?? []) as never[]} />; }
