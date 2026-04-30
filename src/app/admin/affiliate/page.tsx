import { createAdminClient } from "@/lib/supabase/admin";
import AffiliateAdminClient from "./AffiliateAdminClient";

export const metadata = { title: "Affiliate | Admin Gorontalo Unite" };

export default async function AdminAffiliatePage() {
  const admin = createAdminClient();
  const { data: items } = await admin
    .from("affiliate_items")
    .select("*")
    .order("created_at", { ascending: false });

  return <AffiliateAdminClient initialItems={items ?? []} />;
}
