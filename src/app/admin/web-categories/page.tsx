import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { WEB_CATEGORY_GROUPS } from "@/app/berita/categories";

export const dynamic = "force-dynamic";
export const metadata = { title: "Web Category | Admin Gorontalo Unite" };

export default async function WebCategoriesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("category, categories")
    .eq("published", true)
    .neq("category", "Portfolio");
  const counts: Record<string, number> = {};
  for (const article of data ?? []) {
    const labels = Array.isArray(article.categories) && article.categories.length ? article.categories : [article.category];
    for (const label of labels) if (typeof label === "string") counts[label] = (counts[label] ?? 0) + 1;
  }

  return <div className="mx-auto w-full max-w-5xl p-6 sm:p-10">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Navigasi publik</p>
    <h1 className="mt-2 text-3xl font-bold text-gray-900">Web Category</h1>
    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500">Tujuh kanal ini adalah satu-satunya kategori pada Side Right Panel. Saat menulis berita, pilih salah satu kanal ini agar artikel tampil otomatis pada halaman kanal yang sesuai.</p>
    <div className="mt-8 space-y-8">
      {WEB_CATEGORY_GROUPS.map((group) => <section key={group.title}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">{group.title}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {group.categories.map((category) => <Link key={category.key} href={`/berita/${category.key}`} target="_blank" className="rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-amber-300 hover:shadow-sm">
            <p className="font-semibold text-gray-900">{category.label}</p>
            <p className="mt-1 text-xs text-gray-500">{counts[category.label] ?? 0} artikel terbit</p>
            <p className="mt-3 text-xs font-medium text-amber-700">Buka halaman kanal →</p>
          </Link>)}
        </div>
      </section>)}
    </div>
  </div>;
}
