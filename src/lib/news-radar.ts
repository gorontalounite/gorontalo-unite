/**
 * A newsroom radar for Gorontalo: what the rest of the province published
 * today, gathered in one place so a lead is not missed.
 *
 * It surfaces headlines and links out. Nothing here copies or rewrites
 * anybody's reporting — the panel exists so an editor can decide what to go
 * and cover themselves.
 *
 * Google News does the aggregation that direct RSS cannot: of the seven
 * kabupaten/kota government sites, only gorontalokota.go.id publishes a feed
 * at all. The direct feeds that do exist are read as well, so the radar
 * weakens rather than dies if the Google endpoint ever changes.
 */

const GOOGLE = "https://news.google.com/rss/search";
const LOCALE = "hl=id&gl=ID&ceid=ID:id";

/** Per Google News query. They arrive newest-first, and 100 of one kabupaten is noise. */
const PER_QUERY = 40;

interface Source {
  label: string;
  url: string;
  /** Google News wraps the outlet name into the title as " - Outlet". */
  google: boolean;
}

const SOURCES: Source[] = [
  // One query per kabupaten/kota: a story about Pohuwato often never says
  // "Gorontalo" in its headline, so the province-wide query alone misses it.
  ...["Gorontalo", "\"Kota Gorontalo\"", "\"Kabupaten Gorontalo\"", "Boalemo",
      "Pohuwato", "\"Bone Bolango\"", "\"Gorontalo Utara\""].map((term) => ({
    label: term.replace(/"/g, ""),
    url: `${GOOGLE}?q=${encodeURIComponent(term)}&${LOCALE}`,
    google: true,
  })),
  { label: "Pemkot Gorontalo", url: "https://gorontalokota.go.id/rss.xml", google: false },
  { label: "Gorontalo Post",   url: "https://gopos.id/feed",               google: false },
  { label: "Mimoza TV",        url: "https://mimoza.tv/feed",              google: false },
  { label: "Kronologi",        url: "https://kronologi.id/feed",           google: false },
];

export interface Lead {
  fingerprint: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string | null;
  /** How many outlets carried it. A story three newsrooms ran is worth a look. */
  outlets: string[];
}

/* ------------------------------- parsing -------------------------------- */

const unwrap = (value: string) =>
  value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();

const decode = (value: string) =>
  value
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");            // last, or the others double-decode

const tag = (block: string, name: string) => {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return match ? decode(unwrap(match[1])) : "";
};

/**
 * RSS is simple and these feeds are machine-generated, so this reads them
 * directly rather than pulling in an XML parser for four tags.
 */
function parseItems(xml: string, limit: number) {
  const items: Array<{ title: string; link: string; date: string; source: string }> = [];
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  for (const block of blocks.slice(0, limit)) {
    const title = tag(block, "title");
    const link = tag(block, "link");
    if (!title || !link) continue;
    items.push({
      title,
      link,
      date: tag(block, "pubDate") || tag(block, "dc:date"),
      source: tag(block, "source"),
    });
  }
  return items;
}

/* ----------------------------- fingerprints ----------------------------- */

const STOPWORDS = new Set([
  "yang", "untuk", "dengan", "dari", "pada", "akan", "telah", "sudah", "dalam",
  "ini", "itu", "dan", "atau", "juga", "para", "hingga", "usai", "soal", "kata",
  "jadi", "bisa", "lebih", "masih", "saat", "agar", "oleh", "tak", "tidak",
]);

/**
 * Identity of a story rather than of a URL.
 *
 * The same event arrives from several outlets under different headlines and,
 * through Google News, under redirect URLs that change. Six significant words,
 * sorted, survive both.
 */
export function fingerprintOf(title: string) {
  const words = title
    .toLowerCase()
    .replace(/\s+-\s+[^-]+$/, "")          // Google News appends " - Outlet"
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !STOPWORDS.has(word));
  return [...new Set(words)].sort().slice(0, 6).join("-") || title.toLowerCase().slice(0, 60);
}

/** Google News keeps the outlet in the title; the panel shows it separately. */
const stripOutlet = (title: string) => title.replace(/\s+-\s+[^-]+$/, "").trim();

/* ------------------------------- gathering ------------------------------ */

async function read(source: Source): Promise<Lead[]> {
  try {
    const response = await fetch(source.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GorontaloUniteRadar/1.0)" },
      // The radar is re-read on a schedule, not on every dashboard load.
      next: { revalidate: 900 },
    });
    if (!response.ok) return [];
    const xml = await response.text();

    return parseItems(xml, source.google ? PER_QUERY : 100).map((item) => {
      const outlet = item.source || source.label;
      const title = source.google ? stripOutlet(item.title) : item.title;
      const when = item.date ? new Date(item.date) : null;
      return {
        fingerprint: fingerprintOf(item.title),
        title,
        url: item.link,
        source: outlet,
        publishedAt: when && !Number.isNaN(when.getTime()) ? when.toISOString() : null,
        outlets: [outlet],
      };
    });
  } catch {
    // One dead feed must not empty the radar.
    return [];
  }
}

/**
 * Every source, merged. Stories carried by more than one outlet collapse into
 * one row that names them all.
 *
 * Bounded by age rather than by count alone: the eleven feeds together carry
 * roughly 340 stories, and a third of those are over a week old. A radar
 * showing last week is not a radar.
 */
export async function gatherRegional({ maxAgeHours = 72, limit = 60 } = {}): Promise<Lead[]> {
  const batches = await Promise.all(SOURCES.map(read));
  const oldest = Date.now() - maxAgeHours * 3_600_000;

  const merged = new Map<string, Lead>();
  for (const lead of batches.flat()) {
    const seen = merged.get(lead.fingerprint);
    if (!seen) { merged.set(lead.fingerprint, lead); continue; }
    if (!seen.outlets.includes(lead.source)) seen.outlets.push(lead.source);
    // Keep the earliest sighting: that is when the story broke, not when the
    // last outlet got round to it.
    if (lead.publishedAt && (!seen.publishedAt || lead.publishedAt < seen.publishedAt)) {
      seen.publishedAt = lead.publishedAt;
    }
  }

  return [...merged.values()]
    // An item with no usable date is kept: better an undated lead than a
    // silently dropped one.
    .filter((lead) => !lead.publishedAt || new Date(lead.publishedAt).getTime() >= oldest)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, limit);
}
