import { createAdminClient } from "@/lib/supabase/admin";
import KnowledgeBaseClient from "./KnowledgeBaseClient";

export default async function AdminKnowledgeBasePage() {
  const adminClient = createAdminClient();
  const { data: entries } = await adminClient
    .from("knowledge_base")
    .select("id, title, category, is_active, created_at")
    .order("created_at", { ascending: false });

  return <KnowledgeBaseClient initialEntries={entries ?? []} />;
}
