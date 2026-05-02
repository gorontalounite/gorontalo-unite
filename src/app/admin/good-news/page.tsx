import { redirect } from "next/navigation";

// Merged into /admin/news
export default function OldGoodNewsPage() {
  redirect("/admin/news");
}
