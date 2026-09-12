import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = { title: "Event | Admin Gorontalo Unite" };

/**
 * Events are one of the City Guide's six sections, so they are listed and
 * edited alongside the rest of the guide. This keeps the sidebar link working
 * by landing on that section already filtered.
 */
export default function EventAdminPage() {
  redirect("/admin/city-guide?section=Events");
}
