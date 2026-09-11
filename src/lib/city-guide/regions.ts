/**
 * Gorontalo's six administrative areas, in the order the province lists them.
 *
 * A listing's area is derived from the free-text `location` and `address` that
 * came with the data rather than stored, because the whole directory is a
 * couple of hundred rows and is already fetched in one query. The matching
 * order is what makes it correct — see `regionOf`.
 */
export type RegionSlug =
  | "kota-gorontalo"
  | "kabupaten-gorontalo"
  | "bone-bolango"
  | "boalemo"
  | "pohuwato"
  | "gorontalo-utara";

export interface Region {
  slug: RegionSlug;
  /** Full name, as used on the listing itself. */
  label: string;
  /** What fits on a chip. */
  short: string;
  /** Seat of government, shown as a hint under the name. */
  seat: string;
}

export const REGIONS: Region[] = [
  { slug: "kota-gorontalo", label: "Kota Gorontalo", short: "Kota Gorontalo", seat: "Gorontalo" },
  { slug: "kabupaten-gorontalo", label: "Kabupaten Gorontalo", short: "Kab. Gorontalo", seat: "Limboto" },
  { slug: "bone-bolango", label: "Kabupaten Bone Bolango", short: "Bone Bolango", seat: "Suwawa" },
  { slug: "boalemo", label: "Kabupaten Boalemo", short: "Boalemo", seat: "Tilamuta" },
  { slug: "pohuwato", label: "Kabupaten Pohuwato", short: "Pohuwato", seat: "Marisa" },
  { slug: "gorontalo-utara", label: "Kabupaten Gorontalo Utara", short: "Gorontalo Utara", seat: "Kwandang" },
];

/** The nine kecamatan that make up Kota Gorontalo. */
const CITY_DISTRICTS =
  /(kota barat|kota selatan|kota timur|kota utara|kota tengah|dungingi|dumbo raya|hulonthalangi|sipatana)/i;

/**
 * Which of the six areas a listing belongs to, or null when its address says
 * nothing useful.
 *
 * Order is load-bearing twice over. "Kabupaten Gorontalo Utara" contains the
 * string "Kabupaten Gorontalo", so the northern regency has to be tested first.
 * And Google labels a few addresses inside the city as "Gorontalo Regency", so
 * the city's own kecamatan are tested before that fallback — Dungingi is one of
 * them and would otherwise land in the wrong area.
 */
export function regionOf(place: { location?: string | null; address?: string | null }): RegionSlug | null {
  const hay = `${place.location ?? ""} ${place.address ?? ""}`.toLowerCase();
  if (!hay.trim()) return null;

  if (hay.includes("gorontalo utara")) return "gorontalo-utara";
  if (hay.includes("bone bolango")) return "bone-bolango";
  if (hay.includes("boalemo")) return "boalemo";
  if (hay.includes("pohuwato")) return "pohuwato";
  if (hay.includes("kota gorontalo")) return "kota-gorontalo";
  if (CITY_DISTRICTS.test(hay)) return "kota-gorontalo";
  if (hay.includes("kabupaten gorontalo") || hay.includes("gorontalo regency")) return "kabupaten-gorontalo";
  return null;
}

export const regionBySlug = (slug: string | null | undefined): Region | null =>
  REGIONS.find((r) => r.slug === slug) ?? null;
