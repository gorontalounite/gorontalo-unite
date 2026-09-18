import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PAGE_TITLE_CLASS } from "@/components/ui/SectionHeading";
import { VIDEO_STORY_HREF, VIDEO_STORY_TITLE, headline, runtime, type VideoStoryItem } from "./data";

/**
 * Video Story's own archive, laid out as a video library rather than as the
 * article list every other section uses: a chip rail of accounts across the
 * top, then a grid of covers carrying a play mark and a runtime.
 */

const PER_PAGE = 40;
const COLUMNS = "id, description, account_username, permalink, thumbnail_url, duration_sec, publish_time, views";

interface Row {
  id: string; description: string | null; account_username: string; permalink: string;
  thumbnail_url: string | null; duration_sec: number | null; publish_time: string; views: number | null;
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
});

function Verified() {
  return (
    <svg viewBox="0 0 24 24" aria-label="terverifikasi" className="h-3 w-3 shrink-0 fill-sky-400">
      <path d="M12 1.6 14.3 4l3.3-.4 1 3.2 3 1.4-1.2 3.1 1.2 3.1-3 1.4-1 3.2-3.3-.4L12 22.4 9.7 20l-3.3.4-1-3.2-3-1.4 1.2-3.1L2.4 9.6l3-1.4 1-3.2 3.3.4L12 1.6Z" />
      <path d="m10.8 14.6-2.3-2.3 1-1 1.3 1.3 3.6-3.6 1 1-4.6 4.6Z" className="fill-black" />
    </svg>
  );
}

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
        <span className="truncate">{item.username}</span>
        <Verified />
      </p>
    </article>
  );
}

export default async function VideoStoryPage({ akun, page }: { akun: string | null; page: number }) {
  const supabase = await createClient();

  const scoped = () => {
    let query = supabase.from("reels")
      .select(COLUMNS, { count: "exact" })
      .eq("status", "published")
      .eq("category", "Sponsored")
      .not("thumbnail_url", "is", null);
    if (akun) query = query.eq("account_username", akun);
    return query;
  };

  const [{ data, count }, { data: allRows }] = await Promise.all([
    scoped().order("publish_time", { ascending: false })
            .range((page - 1) * PER_PAGE, page * PER_PAGE - 1),
    // The chips name real accounts, so they come from the same set the grid
    // draws from rather than from a list written by hand.
    supabase.from("reels").select("account_username")
      .eq("status", "published").eq("category", "Sponsored")
      .not("thumbnail_url", "is", null).limit(1000),
  ]);

  const tally = new Map<string, number>();
  for (const row of (allRows ?? []) as Array<{ account_username: string }>) {
    tally.set(row.account_username, (tally.get(row.account_username) ?? 0) + 1);
  }
  const accounts = [...tally.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 14);

  const items = ((data ?? []) as unknown as Row[]).map(toItem);
  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  const chipHref = (name: string | null) => {
    const params = new URLSearchParams();
    if (name) params.set("akun", name);
    return params.size ? `${VIDEO_STORY_HREF}?${params}` : VIDEO_STORY_HREF;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link href="/" className="text-[10px] font-bold uppercase tracking-[.18em] text-[#f5c400]">
          ← Beranda
        </Link>
        <h1 className={`${PAGE_TITLE_CLASS} mt-3`}>{VIDEO_STORY_TITLE}</h1>

        <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <Link href={chipHref(null)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  akun ? "bg-white/10 text-white/70 hover:bg-white/20" : "bg-white text-black"}`}>
            All
          </Link>
          {accounts.map(([name, n]) => (
            <Link key={name} href={chipHref(name)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    akun === name ? "bg-white text-black" : "bg-white/10 text-white/70 hover:bg-white/20"}`}>
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
                  <Link href={`${chipHref(akun)}${chipHref(akun).includes("?") ? "&" : "?"}hal=${page - 1}`}
                        className="rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white/10">
                    ← Sebelumnya
                  </Link>
                )}
                <span className="text-white/45">Halaman {page} dari {pages}</span>
                {page < pages && (
                  <Link href={`${chipHref(akun)}${chipHref(akun).includes("?") ? "&" : "?"}hal=${page + 1}`}
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
