import { redirect } from "next/navigation";

// Merged into /admin/news
export default function OldArticlesPage() {
  redirect("/admin/news");
}
