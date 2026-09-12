import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import EventBrowser from "./EventBrowser";
import { fromEventRow, SAMPLE_EVENTS, type EventItem } from "./data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Event Gorontalo",
  description: "Agenda festival, konser, turnamen, dan acara komunitas di Gorontalo.",
  alternates: { canonical: "/event" },
};

export default async function EventPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("id, slug, title, category, organizer, venue, address, starts_at, ends_at, image_url, description, registration_url, maps_url, featured, listing_details")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("starts_at");

  const published: EventItem[] = (data ?? []).map((row) => fromEventRow(row as Record<string, unknown>));
  // Nothing published yet, so the page shows its own placeholder content —
  // clearly labelled, and gone the moment a real event is published.
  const events = published.length > 0 ? published : SAMPLE_EVENTS;

  return <EventBrowser events={events} showingSamples={published.length === 0} />;
}
