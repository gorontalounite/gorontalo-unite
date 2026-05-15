import { createAdminClient } from "@/lib/supabase/admin";
import AffiliateAdminClient from "./AffiliateAdminClient";

export const metadata = { title: "Affiliate | Admin Gorontalo Unite" };
export const dynamic = "force-dynamic";

export default async function AdminAffiliatePage() {
  const admin = createAdminClient();

  const [{ data: items }, { data: clickRows }] = await Promise.all([
    admin.from("affiliate_items").select("*").order("created_at", { ascending: false }),
    admin.from("affiliate_clicks").select("affiliate_item_id"),
  ]);

  // Aggregate click counts by item id
  const clickCounts: Record<string, number> = {};
  for (const row of clickRows ?? []) {
    const key = row.affiliate_item_id as string;
    clickCounts[key] = (clickCounts[key] ?? 0) + 1;
  }

  return <AffiliateAdminClient initialItems={items ?? []} clickCounts={clickCounts} />;
}
