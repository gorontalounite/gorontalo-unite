import { createClient } from "@/lib/supabase/server";
import KnowledgeBaseClient from "./KnowledgeBaseClient";

export default async function AdminKnowledgeBasePage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("knowledge_base")
    .select("id, title, category, is_active, created_at")
    .order("created_at", { ascending: false });

  return <KnowledgeBaseClient initialEntries={entries ?? []} />;
}
