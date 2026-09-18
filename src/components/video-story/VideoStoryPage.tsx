import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PAGE_TITLE_CLASS } from "@/components/ui/SectionHeading";
import { VIDEO_STORY_HREF, VIDEO_STORY_TITLE, headline, runtime, type VideoStoryItem } from "./data";
import Verified from "./Verified";

/**
 * Video Story's own archive, laid out as a video library rather than as the
 * article list every other section uses: a chip rail of accounts across the
 * top, then a grid of covers carrying a play mark and a runtime.
 */

const PER_PAGE = 40;
const COLUMNS = "id, description, account_username, permalink, thumbnail_url, duration_sec, publish_time, views, brand";

interface Row {
  id: string; description: string | null; account_username: string; permalink: string;
  thumbnail_url: string | null; duration_sec: number | null; publish_time: string; views: number | null;
  brand: string | null;
}

const toItem = (row: Row): VideoStoryItem => ({
  id: row.id,
  title: headline(row.description ?? ""),
  username: row.account_username,
  permalink: row.permalink,
  thumbnail: row.thumbnail_url,
  durationSec: row.duration_sec,
  publishedAt: row.publish_time,
  views: row.views ?? 0,
  brand: row.brand,
});

function Card({ item }: { item: VideoStoryItem }) {
  return (
    <article className="group">
      <a href={item.permalink} target="_blank" rel="noopener noreferrer"
         className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-zinc-800">
          {item.thumbnail && (
            /* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage and Instagram CDN, unoptimised here */
            <img src={item.thumbnail} alt="" loading="lazy"
                 className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]" />
          )}
          <span aria-hidden="true"
                className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-[10px] text-white backdrop-blur-sm">
            ▶
          </span>
          {item.durationSec && (
            <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
              {runtime(item.durationSec)}
            </span>
          )}
        </div>
      </a>
      <h2 className="mt-2.5 line-clamp-2 text-[14px] font-semibold leading-snug text-white">
        <a href={item.permalink} target="_blank" rel="noopener noreferrer" className="hover:text-[#f5c400]">
          {item.title}
        </a>
      </h2>
      <p className="mt-1 flex items-center gap-1 text-[12px] text-white/50">
        {/* The sponsor is what identifies the piece; the posting account is
            the same on almost all of them. */}
        <span className="truncate">{item.brand ?? item.username}</span>
        <Verified />
      </p>
    </article>
  );
}

export default async function VideoStoryPage({ brand, page }: { brand: string | null; page: number }) {
  const supabase = await createClient();

  const scoped = () => {
    let query = supabase.from("reels")
      .select(COLUMNS, { count: "exact" })
      .eq("status", "published")
      .eq("category", "Sponsored")
      // Portrait only: a landscape reel in a 9:16 frame is letterboxed or
      // cropped through its subject, and this page is nothing but covers.
      .neq("orientation", "landscape")
      .not("thumbnail_url", "is", null);
    if (brand) query = query.eq("brand", brand);
    return query;
  };

  const [{ data, count }, { data: allRows }] = await Promise.all([
    scoped().order("publish_time", { ascending: false })
            .range((page - 1) * PER_PAGE, page * PER_PAGE - 1),
    // The chips name sponsors, not the account that posted — a reader looking
    // for the Honda work does not know it went out from gorontalo.unite. They
    // come from the same set the grid draws from, never a hand-written list.
    supabase.from("reels").select("brand")
      .eq("status", "published").eq("category", "Sponsored")
      .neq("orientation", "landscape")
      .not("thumbnail_url", "is", null).not("brand", "is", null).limit(1000),
  ]);

  const tally = new Map<string, number>();
  for (const row of (allRows ?? []) as Array<{ brand: string | null }>) {
    if (row.brand) tally.set(row.brand, (tally.get(row.brand) ?? 0) + 1);
  }
  const brands = [...tally.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 14);

  const items = ((data ?? []) as unknown as Row[]).map(toItem);
  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  const chipHref = (name: string | null) => {
    const params = new URLSearchParams();
    if (name) params.set("brand", name);
    return params.size ? `${VIDEO_STORY_HREF}?${params}` : VIDEO_STORY_HREF;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link href="/" className="text-[10px] font-bold uppercase tracking-[.18em] text-[#f5c400]">
          ← Back to Home
        </Link>
        <h1 className={`${PAGE_TITLE_CLASS} mt-3`}>{VIDEO_STORY_TITLE}</h1>

        <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <Link href={chipHref(null)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  brand ? "bg-white/10 text-white/70 hover:bg-white/20" : "bg-white text-black"}`}>
            All
          </Link>
          {brands.map(([name, n]) => (
            <Link key={name} href={chipHref(name)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    brand === name ? "bg-white text-black" : "bg-white/10 text-white/70 hover:bg-white/20"}`}>
              {name} <span className="opacity-50">{n}</span>
            </Link>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 border border-dashed border-white/20 px-6 py-20 text-center text-sm text-white/50">
            Belum ada Video Story di sini.
          </p>
        ) : (
          <>
            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-6">
              {items.map((item) => <Card key={item.id} item={item} />)}
            </div>

            {pages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-3 text-sm">
                {page > 1 && (
                  <Link href={`${chipHref(brand)}${chipHref(brand).includes("?") ? "&" : "?"}hal=${page - 1}`}
                        className="rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white/10">
                    ← Sebelumnya
                  </Link>
                )}
                <span className="text-white/45">Halaman {page} dari {pages}</span>
                {page < pages && (
                  <Link href={`${chipHref(brand)}${chipHref(brand).includes("?") ? "&" : "?"}hal=${page + 1}`}
                        className="rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white/10">
                    Berikutnya →
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}
