import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { PAGE_TITLE_CLASS } from "@/components/ui/SectionHeading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Editor Choice",
  description: "Cerita pilihan redaksi Gorontalo Unite.",
  alternates: { canonical: "/editor-choice" },
};

/** Where the homepage rail's "View all" lands: every ticked article, newest first. */
const FIELDS = "id, title, slug, excerpt, image_url, published_at, created_at";

interface Pick {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
}

function displayDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default async function EditorChoicePage() {
  let picks: Pick[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select(FIELDS)
      .eq("published", true)
      .eq("editor_choice", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(120);
    picks = (data ?? []) as Pick[];
  } catch {
    picks = [];
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 border-b border-white/15 pb-7">
          <Link href="/" className="text-[10px] font-bold uppercase tracking-[.18em] text-[#f5c400]">
            ← Beranda
          </Link>
          <h1 className={`${PAGE_TITLE_CLASS} mt-4`}>Editor Choice</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
            Cerita yang dipilih langsung oleh redaksi — bukan yang paling banyak dibaca, tapi yang menurut kami paling layak dibaca.
          </p>
        </div>

        {picks.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5">
            {picks.map((article) => (
              <article key={article.id} className="group">
                <Link href={`/${article.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400]">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[4px] bg-zinc-800">
                    {article.image_url ? (
                      <Image
                        src={article.image_url}
                        alt=""
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 220px"
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,196,0,.4),transparent_30%),linear-gradient(135deg,#2a2a2a,#111)]" />
                    )}
                  </div>
                  <h2 className="font-heading mt-2.5 line-clamp-3 text-[14px] font-bold leading-[1.18] tracking-[-.015em] transition group-hover:text-[#f5c400] sm:text-[15px]">
                    {article.title}
                  </h2>
                  <time
                    dateTime={article.published_at ?? article.created_at}
                    className="mt-1.5 block text-[11px] text-white/45"
                  >
                    {displayDate(article.published_at ?? article.created_at)}
                  </time>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-white/25 px-6 py-24 text-center">
            <p className="text-2xl font-bold">Belum ada pilihan redaksi.</p>
            <p className="mt-2 text-sm text-white/55">Tandai artikel sebagai Editor Choice di dashboard untuk mengisinya.</p>
          </div>
        )}
      </main>
    </div>
  );
}
