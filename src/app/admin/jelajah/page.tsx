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
 * A post that already has an article says so, which is what stops the same one
 * being written twice — the column behind that badge is unique in the
 * database, so a second attempt is refused there as well.
 */

const PER_PAGE = 30;
const COLUMNS =
  "id, description, account_username, permalink, thumbnail_url, publish_time, category, " +
  "views, reach, likes, comments, shares, saves, duration_sec, brand, orientation";

// No Tipe filter: every reel on the site is one. The archive has four post
// types because it holds all 4,858 posts; this table holds reels only, so the
// control would offer three options that never match anything.

interface Row {
  id: string; description: string | null; account_username: string; permalink: string;
  thumbnail_url: string | null; publish_time: string; category: string;
  views: number | null; reach: number | null; likes: number | null; comments: number | null;
  shares: number | null; saves: number | null;
  duration_sec: number | null; brand: string | null; orientation: string | null;
}

interface Facets { total: number; years: string[]; accounts: Array<{ username: string; count: number }> }

interface Props {
  searchParams: Promise<{
    q?: string; kategori?: string; tahun?: string; akun?: string;
    status?: string; tampilan?: string; urut?: string; arah?: string; hal?: string;
  }>;
}

const SORTS: Record<string, string> = {
  tanggal: "publish_time", views: "views", reach: "reach", durasi: "duration_sec",
};

const compact = (value: number | null) => {
  const n = value ?? 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")} jt`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(".", ",")} rb`;
  return String(n);
};
const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Makassar" });
const secs = (s: number | null) => (s ? `${s} detik` : "–");
const reach = (row: Row) => (row.likes ?? 0) + (row.comments ?? 0) + (row.shares ?? 0) + (row.saves ?? 0);

/** One line of the caption, which is all a row has space for. */
const snippet = (caption: string, max = 110) => {
  const line = caption.split("\n").find((l) => l.trim()) ?? "";
  const clean = line.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean || "Tanpa caption";
};

const TONE: Record<string, string> = {
  Sponsored: "bg-rose-50/70", Tourism: "bg-sky-50/60", Culture: "bg-purple-50/60",
  Culinary: "bg-amber-50/60", Event: "bg-orange-50/60", News: "bg-slate-50",
  Lifestyle: "bg-emerald-50/50", "Untold Story": "bg-indigo-50/50",
};

export default async function JelajahPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const kategori = sp.kategori ?? "";
  const tahun = /^\d{4}$/.test(sp.tahun ?? "") ? sp.tahun! : "";
  const akun = (sp.akun ?? "").trim();
  const status = sp.status ?? "";                 // "" | "belum" | "sudah"
  const grid = sp.tampilan === "grid";
  const urut = SORTS[sp.urut ?? ""] ? sp.urut! : "tanggal";
  const naik = sp.arah === "naik";
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

  const [{ data, count }, { data: written }, { data: facetData }] = await Promise.all([
    scoped().order(SORTS[urut], { ascending: naik, nullsFirst: false })
            .range((page - 1) * PER_PAGE, page * PER_PAGE - 1),
    // Every article that names a source, so a row can say it is already spent.
    supabase.from("articles").select("slug, title, source_permalink")
      .not("source_permalink", "is", null).limit(1000),
    // Years and accounts come from the facet function, not from a select.
    // PostgREST silently caps a response at 1000 rows, so building these lists
    // by reading every reel returned a truncated archive — which is why the
    // year list stopped at 2022 and the account list never appeared.
    supabase.rpc("reels_facets"),
  ]);

  const facets: Facets = (facetData as Facets | null) ?? { total: 0, years: [], accounts: [] };

  const done = new Map(
    ((written ?? []) as Array<{ slug: string; title: string; source_permalink: string }>)
      .map((row) => [row.source_permalink, row]),
  );

  let rows = (data ?? []) as unknown as Row[];
  // Filtered after the query: "already written" lives in another table and
  // PostgREST cannot express the anti-join.
  if (status === "belum") rows = rows.filter((row) => !done.has(row.permalink));
  if (status === "sudah") rows = rows.filter((row) => done.has(row.permalink));

  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  const href = (patch: Record<string, string>) => {
    const params = new URLSearchParams({
      q, kategori, tahun, akun, status,
      tampilan: grid ? "grid" : "", urut, arah: naik ? "naik" : "", ...patch,
    });
    for (const [key, value] of [...params.entries()]) if (!value || (key === "urut" && value === "tanggal")) params.delete(key);
    return params.size ? `/admin/jelajah?${params}` : "/admin/jelajah";
  };

  const chip = (active: boolean) =>
    `shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
      active ? "bg-gray-900 text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"}`;

  const field = "rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-[#F5C400]";
  const label = "mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-400";

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold tracking-[-.02em] text-gray-900">Jelajah</h1>
        <p className="mt-1 max-w-3xl text-sm text-gray-500">
          Arsip postingan yang ada di situs. Pilih yang layak ditulis ulang jadi artikel:
          salin permalinknya, tulis di News, lalu tempel link itu ke kolom <strong>Sumber IG</strong>.
        </p>
      </header>

      <form method="get" className="mb-3 flex flex-wrap items-end gap-2 rounded-xl border border-gray-200 bg-white p-3">
        <label className="text-xs"><span className={label}>Cari caption</span>
          <input name="q" defaultValue={q} placeholder="kata dalam caption" className={`${field} w-52`} /></label>
        <label className="text-xs"><span className={label}>Tahun</span>
          <select name="tahun" defaultValue={tahun} className={field}>
            <option value="">Semua tahun</option>
            {facets.years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select></label>
        <label className="text-xs"><span className={label}>Akun</span>
          <select name="akun" defaultValue={akun} className={`${field} max-w-[190px]`}>
            <option value="">Semua akun ({facets.accounts.length})</option>
            {facets.accounts.map((a) => (
              <option key={a.username} value={a.username}>{a.username} ({a.count})</option>
            ))}
          </select></label>
        <label className="text-xs"><span className={label}>Kategori</span>
          <select name="kategori" defaultValue={kategori} className={field}>
            <option value="">Semua kategori</option>
            {DEFAULT_REEL_CATEGORIES.map((name) => <option key={name} value={name}>{name}</option>)}
          </select></label>
        {grid && <input type="hidden" name="tampilan" value="grid" />}
        <button type="submit" className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white">Terapkan filter</button>
        {(q || kategori || tahun || akun || status) && (
          <Link href="/admin/jelajah" className="text-xs text-gray-400 underline hover:text-gray-700">Bersihkan</Link>
        )}
      </form>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Tampilan</span>
        <Link href={href({ tampilan: "" })} className={chip(!grid)}>Tabel</Link>
        <Link href={href({ tampilan: "grid" })} className={chip(grid)}>Grid</Link>

        <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Urutkan</span>
        {Object.keys(SORTS).map((key) => (
          <Link key={key} href={href({ urut: key, hal: "" })} className={chip(urut === key)}>{key}</Link>
        ))}
        <Link href={href({ arah: naik ? "" : "naik", hal: "" })} className={chip(false)}>
          {naik ? "terkecil dulu ↑" : "terbesar dulu ↓"}
        </Link>

        <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden />
        <Link href={href({ status: "", hal: "" })} className={chip(!status)}>Semua</Link>
        <Link href={href({ status: "belum", hal: "" })} className={chip(status === "belum")}>Belum ditulis</Link>
        <Link href={href({ status: "sudah", hal: "" })} className={chip(status === "sudah")}>Sudah jadi artikel</Link>

        <span className="ml-auto text-xs text-gray-400">
          {total.toLocaleString("id-ID")} dari {facets.total.toLocaleString("id-ID")} postingan
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center text-sm text-gray-400">
          Tidak ada postingan yang cocok.
        </p>
      ) : grid ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rows.map((row) => <Card key={row.id} row={row} article={done.get(row.permalink)} />)}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[1180px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-[11px] uppercase tracking-wide text-gray-400">
                <th className="px-3 py-2.5 font-medium">Caption</th>
                <th className="px-3 py-2.5 font-medium">Tanggal</th>
                <th className="px-3 py-2.5 font-medium">Akun</th>
                <th className="px-3 py-2.5 text-right font-medium">Durasi</th>
                <th className="px-3 py-2.5 text-right font-medium">Views</th>
                <th className="px-3 py-2.5 text-right font-medium">Reach</th>
                <th className="px-3 py-2.5 text-right font-medium">Interaksi</th>
                <th className="px-3 py-2.5 font-medium">Kategori</th>
                <th className="px-3 py-2.5 font-medium">Brand</th>
                <th className="px-3 py-2.5 font-medium">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => {
                const article = done.get(row.permalink);
                return (
                  <tr key={row.id} className={TONE[row.category] ?? ""}>
                    <td className="px-3 py-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="h-14 w-10 shrink-0 overflow-hidden rounded bg-gray-100">
                          {row.thumbnail_url && (
                            /* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage and Instagram CDN */
                            <img src={row.thumbnail_url} alt="" loading="lazy" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 max-w-[280px]">
                          <p className="text-[13px] leading-snug text-gray-800">{snippet(row.description ?? "", 80)}</p>
                          {article && (
                            <p className="mt-1 text-[11px] text-green-700">
                              Sudah jadi artikel ·{" "}
                              <a href={`/${article.slug}`} target="_blank" rel="noopener noreferrer" className="underline">lihat ↗</a>
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-[13px] text-gray-600">{shortDate(row.publish_time)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-[13px] text-gray-700">{row.account_username}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-[13px] tabular-nums text-gray-600">{secs(row.duration_sec)}</td>
                    <td className="px-3 py-2.5 text-right text-[13px] tabular-nums text-gray-700">{compact(row.views)}</td>
                    <td className="px-3 py-2.5 text-right text-[13px] tabular-nums text-gray-700">{compact(row.reach)}</td>
                    <td className="px-3 py-2.5 text-right text-[13px] tabular-nums text-gray-700">{reach(row).toLocaleString("id-ID")}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-[13px] text-gray-700">{row.category}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-[13px] text-gray-500">{row.brand ?? "–"}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <a href={row.permalink} target="_blank" rel="noopener noreferrer"
                           className="rounded-lg border border-gray-200 px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50">Instagram ↗</a>
                        {!article && <CopyLink permalink={row.permalink} />}
                        {!article && (
                          <Link href="/admin/news?baru=1"
                                className="rounded-lg bg-[#F5C400] px-2 py-1 text-[11px] font-semibold text-black hover:bg-[#d9ae00]">Tulis</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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

function Card({ row, article }: { row: Row; article?: { slug: string; title: string } }) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="relative aspect-[4/5] bg-gray-100">
        {row.thumbnail_url ? (
          /* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage and Instagram CDN */
          <img src={row.thumbnail_url} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-xs text-gray-400">belum ada thumbnail</span>
        )}
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-[13px] font-medium leading-snug text-gray-900">{snippet(row.description ?? "", 90)}</p>
        <p className="mt-1 truncate text-[11px] text-gray-400">
          {shortDate(row.publish_time)} · {row.account_username}
          {row.duration_sec ? ` · ${row.duration_sec} detik` : ""}
        </p>

        <div className="mt-2.5 grid grid-cols-3 divide-x divide-gray-100 rounded-lg border border-gray-100 text-center">
          {[["Views", compact(row.views)], ["Reach", compact(row.reach)], ["Interaksi", String(reach(row))]].map(([k, v]) => (
            <div key={k} className="px-1 py-1.5">
              <p className="text-[9px] uppercase tracking-wide text-gray-400">{k}</p>
              <p className="text-[13px] font-semibold tabular-nums text-gray-800">{v}</p>
            </div>
          ))}
        </div>

        <div className={`mt-2.5 rounded-lg px-2 py-1.5 text-[11px] ${TONE[row.category] ?? "bg-gray-50"}`}>
          <span className="text-gray-500">Kategori</span>{" "}
          <strong className="font-semibold text-gray-800">{row.category}</strong>
          {row.brand && <> · <span className="text-gray-500">Brand</span> <strong className="font-semibold text-gray-800">{row.brand}</strong></>}
        </div>

        {article && (
          <p className="mt-2 text-[11px] text-green-700">
            Sudah jadi artikel · <a href={`/${article.slug}`} target="_blank" rel="noopener noreferrer" className="underline">lihat ↗</a>
          </p>
        )}

        <div className="mt-2.5 flex items-center gap-1">
          <a href={row.permalink} target="_blank" rel="noopener noreferrer"
             className="rounded-lg border border-gray-200 px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50">Instagram ↗</a>
          {!article && <CopyLink permalink={row.permalink} />}
          {!article && (
            <Link href="/admin/news?baru=1"
                  className="rounded-lg bg-[#F5C400] px-2 py-1 text-[11px] font-semibold text-black hover:bg-[#d9ae00]">Tulis</Link>
          )}
        </div>
      </div>
    </article>
  );
}
