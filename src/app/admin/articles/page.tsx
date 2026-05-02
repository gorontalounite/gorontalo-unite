import { createAdminClient } from "@/lib/supabase/admin";
import ArticlesClient from "./ArticlesClient";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const admin = createAdminClient();
  const { data: articles } = await admin
    .from("articles")
    .select("id, title, slug, category, tags, published, published_at, created_at")
    .neq("category", "Portfolio")
    .neq("category", "Good News")
    .order("created_at", { ascending: false });

  return <ArticlesClient initialArticles={articles ?? []} />;
}
