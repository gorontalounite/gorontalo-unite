import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ReelsFeed, { type Facets, type ShelfData } from "./ReelsFeed";
import {
  ACCOUNT_NAMED_FROM, CHOICES_SHELF, DEFAULT_REEL_CATEGORIES, FEATURED_SHELF, OTHER_ACCOUNTS,
  RECENT_SHELF, reelSlug, reels as fallbackReels, type ReelItem,
} from "./data";

export const metadata: Metadata = {
  title: "Reels",
  description: "Reel pilihan Gorontalo Unite: Tourism, Culinary, Culture, Event, dan kolaborasi Sponsored.",
  alternates: { canonical: "/reels" },
};

/* ---------------------------------------------------------------------------
 * The page used to fetch every published reel and let the browser work out the
 * shelves. At 1160 rows that was a megabyte of JSON sent to a phone so it
 * could render about seventy cards — and it was also wrong, because PostgREST
 * caps a response at 1000 rows and the oldest end was being cut off silently.
 *
 * Now the server asks for exactly what the view needs: seven rows per shelf
 * while browsing, one page of a grid when a shelf is opened, and the filter
 * options from a function that can see the whole table without sending it.
 * ------------------------------------------------------------------------ */

// views/reach/likes are not selected: nothing on the page renders them, and
// the one place that ranks by views does it in SQL.
const COLUMNS =
  "id, account_username, description, publish_time, permalink, category, sponsored, thumbnail_url, orientation, featured, editor_choice";

/** Cards per shelf. One more than this is fetched, to know whether to offer "View all". */
const SHELF_SIZE = 6;
/** Cards per page once a shelf is opened. */
const GRID_SIZE = 60;
/** Covers tiled across the hero on a wide screen. */
const HERO_SIZE = 5;

type Row = Record<string, unknown>;

/**
 * A card shows one truncated line of the caption, and some of these run to a
 * couple of thousand characters — shipping them whole is most of the payload
 * for text nobody can read.
 */
const CAPTION_LIMIT = 160;

function toReel(item: Row): ReelItem {
  return {
    id: String(item.id),
    username: String(item.account_username),
    category: String(item.category),
    sponsored: Boolean(item.sponsored),
    description: String(item.description ?? "").slice(0, CAPTION_LIMIT),
    publishedAt: String(item.publish_time),
    permalink: String(item.permalink),
    thumbnail: (item.thumbnail_url as string | null) ?? null,
    orientation: (item.orientation as "portrait" | "landscape" | null) ?? "portrait",
    featured: Boolean(item.featured),
    editorChoice: Boolean(item.editor_choice),
    views: 0,
    reach: 0,
    likes: 0,
  };
}

/**
 * The Year and Account filters, as PostgREST query params.
 *
 * The year boundary is Gorontalo's, not UTC's: a reel posted at 06:00 on 1
 * January is still the previous year in UTC, and filtering on the raw
 * timestamp would file it under the wrong chip — the opposite of what the card
 * underneath it says.
 *
 * Returned as data rather than applied to a builder, because the row query and
 * the count query have different builder types and a shared helper over both
 * costs more in casts than it saves in lines.
 */
function scopeFilters(period: string, account: string, named: string[]) {
  const range = /^\d{4}$/.test(period)
    ? { from: `${period}-01-01T00:00:00+08:00`, to: `${Number(period) + 1}-01-01T00:00:00+08:00` }
    : null;
  const exclude = account === OTHER_ACCOUNTS && named.length > 0
    ? `(${named.map((name) => `"${name}"`).join(",")})`
    : null;
  const only = account !== "all" && account !== OTHER_ACCOUNTS ? account : null;
  return { range, exclude, only };
}


const CHOICES_FILTER = "editor_choice.eq.true,orientation.eq.landscape";

export default async function ReelsPage({ searchParams }: PageProps<"/reels">) {
  const query = await searchParams;
  const client = await createClient();

  const { data: facetData } = await client.rpc("reels_facets");
  const facets: Facets = (facetData as Facets | null) ?? { total: 0, years: [], accounts: [] };
  const named = facets.accounts.filter((row) => row.count >= ACCOUNT_NAMED_FROM).map((row) => row.username);

  const period = pickPeriod(query.periode, facets.years);
  const account = pickAccount(query.akun, facets.accounts);
  const view = pickView(query.kategori);
  const page = Math.max(1, Number(first(query.hal)) || 1);
  const scope = scopeFilters(period, account, named);

  /** A query for rows, already scoped and ordered. */
  function rows() {
    let q = client.from("reels").select(COLUMNS).eq("status", "published");
    if (scope.range) q = q.gte("publish_time", scope.range.from).lt("publish_time", scope.range.to);
    if (scope.exclude) q = q.not("account_username", "in", scope.exclude);
    if (scope.only) q = q.eq("account_username", scope.only);
    // Featured first, then newest. `id` last so the order is total — paging
    // over a sort with ties can otherwise repeat one row and drop another.
    return q.order("featured", { ascending: false }).order("publish_time", { ascending: false }).order("id");
  }

  /** The same scope, counted rather than fetched. */
  function counted() {
    let q = client.from("reels").select("id", { count: "exact", head: true }).eq("status", "published");
    if (scope.range) q = q.gte("publish_time", scope.range.from).lt("publish_time", scope.range.to);
    if (scope.exclude) q = q.not("account_username", "in", scope.exclude);
    if (scope.only) q = q.eq("account_username", scope.only);
    return q;
  }

  if (view) {
    const list = view === FEATURED_SHELF ? rows().eq("featured", true)
      : view === CHOICES_SHELF ? rows().or(CHOICES_FILTER)
      : view === RECENT_SHELF ? rows()
      : rows().eq("category", view).eq("editor_choice", false).neq("orientation", "landscape");
    const total = view === FEATURED_SHELF ? counted().eq("featured", true)
      : view === CHOICES_SHELF ? counted().or(CHOICES_FILTER)
      : view === RECENT_SHELF ? counted()
      : counted().eq("category", view).eq("editor_choice", false).neq("orientation", "landscape");

    const [{ data }, { count }] = await Promise.all([
      list.range((page - 1) * GRID_SIZE, page * GRID_SIZE - 1),
      total,
    ]);
    return (
      <ReelsFeed
        shelves={[]}
        hero={[]}
        facets={facets}
        view={view}
        viewReels={(data ?? []).map(toReel)}
        viewCount={count ?? 0}
        page={page}
        pageSize={GRID_SIZE}
        period={period}
        account={account}
      />
    );
  }

  // Browsing: seven per shelf — six shown, the seventh only to learn there is
  // more — and five portrait covers for the hero.
  const categories = [...DEFAULT_REEL_CATEGORIES];
  const [featured, choices, recent, hero, ...byCategory] = await Promise.all([
    rows().eq("featured", true).limit(SHELF_SIZE * 8),
    rows().or(CHOICES_FILTER).limit(SHELF_SIZE + 1),
    rows().limit(SHELF_SIZE + 1),
    rows().neq("orientation", "landscape").not("thumbnail_url", "is", null)
      .order("views", { ascending: false }).limit(HERO_SIZE),
    ...categories.map((name) =>
      rows().eq("category", name).eq("editor_choice", false).neq("orientation", "landscape").limit(SHELF_SIZE + 1)),
  ]);

  const shelf = (key: string, result: { data: Row[] | null }, shape?: ShelfData["shape"]): ShelfData => {
    const list = (result.data ?? []).map(toReel);
    return { key, reels: list.slice(0, SHELF_SIZE), more: list.length > SHELF_SIZE, shape };
  };

  const shelves: ShelfData[] = [
    { key: FEATURED_SHELF, reels: (featured.data ?? []).map(toReel), more: false },
    shelf(CHOICES_SHELF, choices, "wide"),
    ...categories.map((name, index) => shelf(name, byCategory[index])),
    shelf(RECENT_SHELF, recent, "mixed"),
  ].filter((entry) => entry.reels.length > 0);

  // The sample archive is the fallback for an empty table, not for an empty
  // filter: "no reels in 2019" is an answer, not a failure.
  const empty = facets.total === 0;

  return (
    <ReelsFeed
      shelves={empty ? [{ key: RECENT_SHELF, reels: fallbackReels.slice(0, SHELF_SIZE), more: false, shape: "mixed" }] : shelves}
      hero={empty ? fallbackReels.slice(0, HERO_SIZE) : (hero.data ?? []).map(toReel)}
      facets={facets}
      view={null}
      viewReels={[]}
      viewCount={0}
      page={1}
      pageSize={GRID_SIZE}
      period={period}
      account={account}
    />
  );
}

/* ------------------------------ query params ----------------------------- */

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

function pickPeriod(value: string | string[] | undefined, years: string[]) {
  const wanted = first(value);
  return wanted && years.includes(wanted) ? wanted : "all";
}

function pickAccount(value: string | string[] | undefined, accounts: Facets["accounts"]) {
  const wanted = first(value);
  if (!wanted) return "all";
  if (wanted === OTHER_ACCOUNTS) return OTHER_ACCOUNTS;
  return accounts.some((row) => row.username === wanted) ? wanted : "all";
}

/** The shelf a `?kategori=` names, or null while browsing them all. */
function pickView(value: string | string[] | undefined) {
  const wanted = first(value)?.toLowerCase();
  if (!wanted) return null;
  const known: string[] = [FEATURED_SHELF, CHOICES_SHELF, RECENT_SHELF, ...DEFAULT_REEL_CATEGORIES];
  // Links written before the names were slugified used a space; both match.
  return known.find((name) => reelSlug(name) === wanted || name.toLowerCase() === wanted) ?? null;
}
