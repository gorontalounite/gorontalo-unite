import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_REEL_CATEGORIES } from "@/app/reels/data";
import CopyLink from "./CopyLink";

export const dynamic = "force-dynamic";
export const metadata = { title: "Jelajah | Admin Gorontalo Unite" };

/**
 * Picking which archive posts are worth writing up as articles.
 *
 * The move from post to article is deliberately manual: browse here, copy the
 * permalink, write the piece in News, paste the link into its Sumber IG cell.
 * Nothing is created for you, and nothing is published by accident.
 *
 * A post that already has an article says so, which is what stops the same
 * one being written twice — the column behind that badge is unique in the
 * database, so a second attempt is refused there as well.
 */

const PER_PAGE = 30;
const COLUMNS = "id, description, account_username, permalink, thumbnail_url, publish_time, category, views, duration_sec, brand, orientation";

interface Row {
  id: string; description: string | null; account_username: string; permalink: string;
  thumbnail_url: string | null; publish_time: string; category: string;
  views: number | null; duration_sec: number | null; brand: string | null; orientation: string | null;
}

interface Props {
  searchParams: Promise<{ q?: string; kategori?: string; tahun?: string; akun?: string; status?: string; hal?: string }>;
}

const number = (value: number) => value.toLocaleString("id-ID");
const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Makassar" });
const runtime = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, "0")}`;

/** One line of the caption, which is all a row has space for. */
const snippet = (caption: string) => {
  const line = caption.split("\n").find((l) => l.trim()) ?? "";
  const clean = line.replace(/#\S+/g, "").replace(/\s+/g, " ").trim();
  return clean.length > 110 ? `${clean.slice(0, 110).trimEnd()}…` : clean || "Tanpa caption";
};

export default async function JelajahPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const kategori = sp.kategori ?? "";
  const tahun = /^\d{4}$/.test(sp.tahun ?? "") ? sp.tahun! : "";
  const akun = (sp.akun ?? "").trim();
  const status = sp.status ?? "";           // "" | "belum" | "sudah"
  const page = Math.max(1, parseInt(sp.hal ?? "1"));

  const supabase = await createClient();

  const scoped = () => {
    let query = supabase.from("reels").select(COLUMNS, { count: "exact" })
      .eq("status", "published").is("deleted_at", null);
    if (q) query = query.ilike("description", `%${q}%`);
    if (kategori) query = query.eq("category", kategori);
    if (akun) query = query.eq("account_username", akun);
    if (tahun) {
      query = query.gte("publish_time", `${tahun}-01-01T00:00:00+08:00`)
                   .lt("publish_time", `${Number(tahun) + 1}-01-01T00:00:00+08:00`);
    }
    return query;
  };

  const [{ data, count }, { data: written }, { data: years }] = await Promise.all([
    scoped().order("publish_time", { ascending: false })
            .range((page - 1) * PER_PAGE, page * PER_PAGE - 1),
    // Every article that names a source, so a row can say it is already done.
    supabase.from("articles").select("slug, title, source_permalink")
      .not("source_permalink", "is", null).limit(2000),
    supabase.from("reels").select("publish_time")
      .eq("status", "published").is("deleted_at", null).limit(2000),
  ]);

  const done = new Map(
    ((written ?? []) as Array<{ slug: string; title: string; source_permalink: string }>)
      .map((row) => [row.source_permalink, row]),
  );

  const yearList = [...new Set(((years ?? []) as Array<{ publish_time: string }>)
    .map((row) => row.publish_time.slice(0, 4)))].sort().reverse();

  let rows = ((data ?? []) as unknown as Row[]);
  // Filtered here rather than in the query: "already written" lives in another
  // table, and PostgREST cannot express the anti-join.
  if (status === "belum") rows = rows.filter((row) => !done.has(row.permalink));
  if (status === "sudah") rows = rows.filter((row) => done.has(row.permalink));

  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  const href = (patch: Record<string, string>) => {
    const params = new URLSearchParams({ q, kategori, tahun, akun, status, ...patch });
    for (const [key, value] of [...params.entries()]) if (!value) params.delete(key);
    return params.size ? `/admin/jelajah?${params}` : "/admin/jelajah";
  };

  const chip = (active: boolean) =>
    `shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
      active ? "bg-gray-900 text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"}`;

  return (
    <div className="mx-auto max-w-[1280px] p-4 sm:p-6">
      <header className="mb-5">
        <h1 className="text-2xl font-bold tracking-[-.02em] text-gray-900">Jelajah</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Arsip postingan yang ada di situs. Pilih yang layak ditulis ulang jadi artikel:
          salin permalinknya, tulis di News, lalu tempel link itu ke kolom <strong>Sumber IG</strong>.
        </p>
      </header>

      <form method="get" className="mb-3 flex flex-wrap items-end gap-2">
        <label className="text-xs text-gray-500">
          <span className="mb-1 block">Cari caption</span>
          <input name="q" defaultValue={q} placeholder="kata dalam caption"
                 className="w-56 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-[#F5C400]" />
        </label>
        <label className="text-xs text-gray-500">
          <span className="mb-1 block">Kategori</span>
          <select name="kategori" defaultValue={kategori}
                  className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-[#F5C400]">
            <option value="">Semua</option>
            {DEFAULT_REEL_CATEGORIES.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        <label className="text-xs text-gray-500">
          <span className="mb-1 block">Tahun</span>
          <select name="tahun" defaultValue={tahun}
                  className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-[#F5C400]">
            <option value="">Semua</option>
            {yearList.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label className="text-xs text-gray-500">
          <span className="mb-1 block">Akun</span>
          <input name="akun" defaultValue={akun} placeholder="username"
                 className="w-40 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-[#F5C400]" />
        </label>
        <button type="submit" className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white">Terapkan</button>
        {(q || kategori || tahun || akun || status) && (
          <Link href="/admin/jelajah" className="text-xs text-gray-400 underline hover:text-gray-700">Bersihkan</Link>
        )}
      </form>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link href={href({ status: "", hal: "" })} className={chip(!status)}>Semua</Link>
        <Link href={href({ status: "belum", hal: "" })} className={chip(status === "belum")}>Belum ditulis</Link>
        <Link href={href({ status: "sudah", hal: "" })} className={chip(status === "sudah")}>Sudah jadi artikel</Link>
        <span className="ml-auto text-xs text-gray-400">
          {number(total)} postingan{status ? " · disaring di halaman ini" : ""}
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center text-sm text-gray-400">
          Tidak ada postingan yang cocok.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {rows.map((row) => {
            const article = done.get(row.permalink);
            return (
              <li key={row.id} className="flex gap-3 px-4 py-3">
                <div className="h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {row.thumbnail_url && (
                    /* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage and Instagram CDN, unoptimised here */
                    <img src={row.thumbnail_url} alt="" loading="lazy" className="h-full w-full object-cover" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-400">
                    <span className="font-medium text-gray-600">{row.account_username}</span>
                    <span aria-hidden>•</span>
                    <span>{shortDate(row.publish_time)}</span>
                    <span className="rounded-full bg-gray-100 px-1.5 py-0.5 font-medium text-gray-500">{row.category}</span>
                    {row.orientation === "landscape" && <span className="text-gray-300">landscape</span>}
                    {row.duration_sec ? <span>{runtime(row.duration_sec)}</span> : null}
                    {row.views ? <span>{number(row.views)} views</span> : null}
                    {row.brand && <span className="text-gray-500">· {row.brand}</span>}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-gray-800">{snippet(row.description ?? "")}</p>

                  {article && (
                    <p className="mt-1.5 text-[11px] text-green-700">
                      Sudah jadi artikel:{" "}
                      {/* By slug, because the grid searches on slug and this
                          page knows the article's slug but not its id. */}
                      <Link href={`/admin/news?q=${encodeURIComponent(article.slug)}`} className="underline">
                        {article.title}
                      </Link>{" "}
                      <a href={`/${article.slug}`} target="_blank" rel="noopener noreferrer" className="text-green-600 underline">lihat ↗</a>
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <a href={row.permalink} target="_blank" rel="noopener noreferrer"
                     className="rounded-lg border border-gray-200 px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50">
                    Lihat ↗
                  </a>
                  {!article && <CopyLink permalink={row.permalink} />}
                  {!article && (
                    <Link href="/admin/news?baru=1"
                          className="rounded-lg bg-[#F5C400] px-2.5 py-1 text-[11px] font-semibold text-black hover:bg-[#d9ae00]">
                      Tulis artikel
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {pages > 1 && (
        <nav className="mt-6 flex items-center justify-center gap-3 text-sm">
          {page > 1 && <Link href={href({ hal: String(page - 1) })} className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50">← Sebelumnya</Link>}
          <span className="text-gray-400">Halaman {page} dari {pages}</span>
          {page < pages && <Link href={href({ hal: String(page + 1) })} className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50">Berikutnya →</Link>}
        </nav>
      )}
    </div>
  );
}
