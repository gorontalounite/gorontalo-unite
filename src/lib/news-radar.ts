/**
 * A newsroom radar for Gorontalo: what the rest of the province published,
 * gathered in one place so a lead is not missed.
 *
 * It surfaces headlines, thumbnails and links. Nothing here copies or rewrites
 * anybody's reporting — the panel exists so an editor can decide what to go
 * and cover themselves.
 *
 * Google News does the aggregation that direct RSS cannot: of the seven
 * kabupaten/kota government sites plus their OPD subdomains, only
 * gorontalokota.go.id publishes a feed at all. Nine local outlets do, and they
 * are read directly so the radar weakens rather than dies if Google's endpoint
 * ever changes.
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

/** One query per kabupaten/kota: a Pohuwato story often never says "Gorontalo". */
const AREAS = [
  "Gorontalo", "\"Kota Gorontalo\"", "\"Kabupaten Gorontalo\"",
  "Boalemo", "Pohuwato", "\"Bone Bolango\"", "\"Gorontalo Utara\"",
];

/**
 * Read straight from the outlet. Every Pemda site except Kota Gorontalo was
 * checked — province, five kabupaten, and the Diskominfo/Dispar subdomains —
 * and none publishes a feed, so the local press carries this half.
 */
const DIRECT: Array<[string, string]> = [
  ["Pemkot Gorontalo",   "https://gorontalokota.go.id/rss.xml"],
  ["Gorontalo Post",     "https://gopos.id/feed"],
  ["Mimoza TV",          "https://mimoza.tv/feed"],
  ["Kronologi",          "https://kronologi.id/feed"],
  ["Banthayo",           "https://banthayo.id/rss"],
  ["Hargo",              "https://hargo.co.id/feed/"],
  ["Kabar Gorontalo",    "https://kabargorontalo.com/rss"],
  ["Suara Gorontalo",    "https://suaragorontalo.com/feed"],
  ["Gorontalo Terkini",  "https://gorontaloterkini.com/feed"],
];

const SOURCES: Source[] = [
  ...AREAS.map((term) => ({
    label: term.replace(/"/g, ""),
    url: `${GOOGLE}?q=${encodeURIComponent(term)}&${LOCALE}`,
    google: true,
  })),
  ...DIRECT.map(([label, url]) => ({ label, url, google: false })),
];

export const RADAR_CATEGORIES = [
  "Wisata", "Kuliner", "Budaya", "Olahraga", "Pendidikan",
  "Kesehatan", "Ekonomi", "Pemerintahan", "Hukum", "Peristiwa", "Lainnya",
] as const;

export type RadarCategory = (typeof RADAR_CATEGORIES)[number];

export interface Lead {
  fingerprint: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string | null;
  image: string | null;
  category: RadarCategory;
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
 * Where a feed happens to put its picture. Three of the nine direct feeds
 * carry one; the rest ship an excerpt with no image, and fetching each article
 * for its og:image costs one to three seconds and still comes back empty about
 * a third of the time. Those items go without.
 */
function imageOf(block: string): string | null {
  const found =
    block.match(/<media:content[^>]+url=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)/i) ??
    block.match(/<media:thumbnail[^>]+url=["']([^"']+)/i) ??
    block.match(/<enclosure[^>]+url=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)/i) ??
    block.match(/<img[^>]+src=["']([^"']+)/i);
  if (!found) return null;
  const url = decode(found[1]).trim();
  return url.startsWith("http") ? url : null;
}

function parseItems(xml: string, limit: number) {
  const items: Array<{ title: string; link: string; date: string; source: string; image: string | null }> = [];
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
      image: imageOf(block),
    });
  }
  return items;
}

/* ----------------------------- categorising ----------------------------- */

/**
 * Keyword rules, ordered most specific first. Crude by design: this sorts a
 * reading list, it does not file anything for publication, and a wrong guess
 * costs an editor one glance.
 */
const RULES: Array<[RadarCategory, RegExp]> = [
  ["Wisata",      /wisata|pariwisata|destinasi|pantai|danau|air terjun|festival|homestay|pesona|snorkel/i],
  ["Kuliner",     /kuliner|makanan|masakan|restoran|kafe|warung|resep|minuman|kopi/i],
  ["Budaya",      /budaya|adat|tradisi|karawo|kesenian|tari|sanggar|situs sejarah|pusaka/i],
  ["Olahraga",    /olahraga|sepak ?bola|atlet|turnamen|kejuaraan|liga|porprov|\bpon\b|voli|futsal/i],
  ["Pendidikan",  /sekolah|siswa|guru|kampus|universitas|mahasiswa|\bung\b|beasiswa|kuliah|pendidikan/i],
  ["Kesehatan",   /kesehatan|rumah sakit|puskesmas|stunting|dokter|vaksin|gizi|posyandu|\brsud\b|pasien/i],
  ["Peristiwa",   /kebakaran|banjir|kecelakaan|gempa|longsor|bencana|tenggelam|hanyut|karhutla|kekeringan/i],
  ["Hukum",       /polisi|polres|polda|kejaksaan|tersangka|lapas|narkoba|razia|curanmor|korupsi|ditangkap|sidang|bnn/i],
  ["Ekonomi",     /ekonomi|umkm|pasar|harga|inflasi|investasi|petani|nelayan|panen|jagung|perdagangan|bank/i],
  ["Pemerintahan",/pemkab|pemkot|pemprov|bupati|wali ?kota|gubernur|dprd|apbd|dinas|pelantikan|musrenbang|sekda|asn/i],
];

export function categorise(title: string): RadarCategory {
  for (const [name, pattern] of RULES) if (pattern.test(title)) return name;
  return "Lainnya";
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
      // Re-read on a schedule, not on every page load.
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(12_000),
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
        image: item.image,
        category: categorise(title),
        outlets: [outlet],
      };
    });
  } catch {
    // One dead or slow feed must not empty the radar.
    return [];
  }
}

export interface GatherOptions {
  /** Ignored when `on` is given. */
  maxAgeHours?: number;
  /** A single day, `YYYY-MM-DD`, in Gorontalo time. */
  on?: string | null;
  /** A single month, `YYYY-MM`. */
  month?: string | null;
  category?: RadarCategory | null;
  limit?: number;
}

/** Gorontalo is UTC+8, so a "day" here is not the server's day. */
const localDay = (iso: string) =>
  new Date(new Date(iso).getTime() + 8 * 3_600_000).toISOString().slice(0, 10);

/**
 * Every source, merged. Stories carried by more than one outlet collapse into
 * one row that names them all.
 */
export async function gatherRegional(options: GatherOptions = {}): Promise<Lead[]> {
  const { maxAgeHours = 72, on = null, month = null, category = null, limit = 120 } = options;

  const batches = await Promise.all(SOURCES.map(read));

  const merged = new Map<string, Lead>();
  for (const lead of batches.flat()) {
    const seen = merged.get(lead.fingerprint);
    if (!seen) { merged.set(lead.fingerprint, lead); continue; }
    if (!seen.outlets.includes(lead.source)) seen.outlets.push(lead.source);
    // Whichever copy has a picture wins — the feed that carried the image is
    // rarely the one that happened to be read first.
    if (!seen.image && lead.image) seen.image = lead.image;
    // Keep the earliest sighting: that is when the story broke, not when the
    // last outlet got round to it.
    if (lead.publishedAt && (!seen.publishedAt || lead.publishedAt < seen.publishedAt)) {
      seen.publishedAt = lead.publishedAt;
    }
  }

  const oldest = Date.now() - maxAgeHours * 3_600_000;

  return [...merged.values()]
    .filter((lead) => {
      if (category && lead.category !== category) return false;
      if (!lead.publishedAt) return !on && !month;   // undated only in the open view
      const day = localDay(lead.publishedAt);
      if (on) return day === on;
      if (month) return day.startsWith(month);
      return new Date(lead.publishedAt).getTime() >= oldest;
    })
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, limit);
}
