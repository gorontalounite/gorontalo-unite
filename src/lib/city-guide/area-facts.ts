import type { RegionSlug } from "./regions";

/**
 * Reference data for the six area pages.
 *
 * The figures are taken from the Indonesian Wikipedia article named in
 * `source` — facts, which carry no copyright, rather than its prose, which is
 * CC BY-SA and would put that licence on the page if it were pasted in. The
 * descriptive text here is written for this site and every claim in it traces
 * back to a figure in the table.
 *
 * Two items in the sources were dropped rather than repeated. The Pohuwato
 * article lists Danau Limboto among its features; the lake is in Kabupaten
 * Gorontalo. The Gorontalo Utara article lists Pantai Botutonuo and Teluk
 * Tomini; Botutonuo is in Bone Bolango by this directory's own listing, and
 * Gorontalo Utara faces the Sulawesi Sea. Both look like navigation-template
 * bleed.
 */

export interface AreaFact {
  label: string;
  value: string;
}

export interface AreaProfile {
  slug: RegionSlug;
  /** Name as the province writes it. */
  name: string;
  seat: string;
  /** One line under the title. */
  tagline: string;
  facts: AreaFact[];
  /** Who and what the place is. */
  about: string[];
  geography: string[];
  history: string[];
  borders: { north: string; south: string; east: string; west: string };
  sourceTitle: string;
  sourceUrl: string;
}

export const AREA_PROFILES: Record<RegionSlug, AreaProfile> = {
  "kota-gorontalo": {
    slug: "kota-gorontalo",
    name: "Kota Gorontalo",
    seat: "Provincial capital",
    tagline: "The province's only city, and the smallest of its six areas by land.",
    facts: [
      { label: "Status", value: "Kota — provincial capital" },
      { label: "Area", value: "79.02 km²" },
      { label: "Population", value: "203,812 (30 June 2024)" },
      { label: "Districts", value: "9 kecamatan, 50 kelurahan" },
      { label: "Anniversary", value: "19 March 1728" },
      { label: "Established", value: "4 July 1959 — UU No. 29/1959" },
      { label: "Dialling code", value: "+62 435" },
    ],
    about: [
      "Kota Gorontalo covers 79.02 km² — under two per cent of the province — and holds 203,812 people, which makes it the densest of the six areas by a wide margin.",
      "It is where most of this directory sits: of the 197 published places, 156 are inside the city. Its economy runs on services and trade, with copra among its main exports.",
    ],
    geography: [
      "The city occupies the mouth of two rivers, the Bone and the Bolango, where they reach Teluk Tomini on the province's southern coast.",
      "Bone Bolango wraps around it to the north and east, and Kabupaten Gorontalo lies to the west.",
    ],
    history: [
      "The city marks 19 March 1728 as its founding, dating from the Kerajaan Hulontalo.",
      "On 23 January 1942 Nani Wartabone declared Indonesian independence here, three years before the national proclamation — remembered as the Peristiwa Patriotik.",
      "It became an autonomous region under UU No. 29/1959, was designated a kotapraja in 1960, a kotamadya in 1965, and took its present name in 1999.",
    ],
    borders: { north: "Kabupaten Bone Bolango", south: "Teluk Tomini", east: "Kabupaten Bone Bolango", west: "Kabupaten Gorontalo" },
    sourceTitle: "Kota Gorontalo",
    sourceUrl: "https://id.wikipedia.org/wiki/Kota_Gorontalo",
  },

  "kabupaten-gorontalo": {
    slug: "kabupaten-gorontalo",
    name: "Kabupaten Gorontalo",
    seat: "Limboto",
    tagline: "The oldest of the six, and the one the other regencies were carved from.",
    facts: [
      { label: "Seat", value: "Limboto" },
      { label: "Area", value: "2,124.60 km²" },
      { label: "Population", value: "415,198 (30 June 2023)" },
      { label: "Districts", value: "19 kecamatan, 14 kelurahan, 191 desa" },
      { label: "Anniversary", value: "26 November 1673" },
      { label: "Established", value: "4 July 1959 — UU No. 29/1959" },
    ],
    about: [
      "At 415,198 people this is the most populous of the six areas, spread over 2,124.60 km² and 19 kecamatan.",
      "Its seat is Limboto, which sits beside Danau Limboto — the lake that gives the regency its best-known landscape.",
    ],
    geography: [
      "Danau Limboto lies at its centre, the Paguyaman river runs through it, and Teluk Tomini forms its southern edge.",
      "It borders Gorontalo Utara to the north, Bone Bolango and Kota Gorontalo to the east, and Boalemo to the west.",
    ],
    history: [
      "The regency dates its founding to 26 November 1673, when five kingdoms signed the agreement that bound them together.",
      "It was constituted as a kabupaten under UU No. 29/1959, with its seat first at Isimu and moved to Limboto in 1978.",
      "Three later splits — in 1999, 2003 and 2007 — produced Boalemo, Bone Bolango and Gorontalo Utara out of its territory.",
    ],
    borders: { north: "Kabupaten Gorontalo Utara", south: "Teluk Tomini", east: "Kabupaten Bone Bolango dan Kota Gorontalo", west: "Kabupaten Boalemo" },
    sourceTitle: "Kabupaten Gorontalo",
    sourceUrl: "https://id.wikipedia.org/wiki/Kabupaten_Gorontalo",
  },

  "bone-bolango": {
    slug: "bone-bolango",
    name: "Kabupaten Bone Bolango",
    seat: "Suwawa",
    tagline: "Volcanic hills, hot springs, and the river that runs down into the city.",
    facts: [
      { label: "Seat", value: "Suwawa" },
      { label: "Area", value: "1,984.31 km²" },
      { label: "Population", value: "174,788 (2024)" },
      { label: "Districts", value: "18 kecamatan, 160 desa, 5 kelurahan" },
      { label: "Established", value: "25 February 2003 — UU No. 6/2003" },
    ],
    about: [
      "Bone Bolango holds 174,788 people across 1,984.31 km², wrapped around Kota Gorontalo on two sides.",
      "Farming, forestry and fisheries make up 35.19 per cent of its economy as of 2024 — the largest single share of any sector.",
    ],
    geography: [
      "The Bone river runs about 76.7 km through the regency, joined by the Bolango and Tamalate, before reaching Teluk Tomini.",
      "Its interior is hilly and volcanic, and the hot springs at Lombongo run between 42 and 48 °C. Danau Perintis lies within its borders.",
      "It is the only one of the six that touches two other provinces, meeting Sulawesi Utara to the north and east and Sulawesi Tengah to the south.",
    ],
    history: [
      "The regency was created on 25 February 2003 under UU No. 6/2003, split from Kabupaten Gorontalo.",
      "It began with four kecamatan — Bone Pantai, Kabila, Suwawa and Tapa — and now has eighteen.",
      "Its territory formed part of Limo Lopahalaa, the historic union of five Gorontalo kingdoms.",
    ],
    borders: { north: "Kabupaten Gorontalo Utara dan Provinsi Sulawesi Utara", south: "Laut Maluku dan Provinsi Sulawesi Tengah", east: "Kabupaten Bolaang Mongondow Selatan", west: "Kabupaten Gorontalo dan Kota Gorontalo" },
    sourceTitle: "Kabupaten Bone Bolango",
    sourceUrl: "https://id.wikipedia.org/wiki/Kabupaten_Bone_Bolango",
  },

  boalemo: {
    slug: "boalemo",
    name: "Kabupaten Boalemo",
    seat: "Tilamuta",
    tagline: "A seventeenth-century kingdom, and the first regency to break away.",
    facts: [
      { label: "Seat", value: "Tilamuta" },
      { label: "Area", value: "2,567.36 km²" },
      { label: "Population", value: "147,038 (2021)" },
      { label: "Districts", value: "7 kecamatan, 81 desa" },
      { label: "Established", value: "12 October 1999 — UU No. 50/1999 and UU No. 10/2000" },
    ],
    about: [
      "Boalemo spreads 147,038 people over 2,567.36 km², which makes it the least densely settled of the six after Pohuwato.",
      "It has the fewest kecamatan of any area here — seven — and its seat is Tilamuta on the southern coast.",
    ],
    geography: [
      "Teluk Tomini forms its southern shore and Kabupaten Gorontalo lies to its east, with Pohuwato to the west.",
    ],
    history: [
      "Boalemo was a kingdom in the seventeenth century before becoming part of Kabupaten Gorontalo.",
      "It separated on 12 October 1999 under UU No. 50/1999, the first of the three splits from the parent regency.",
      "Four years later part of its own territory became Kabupaten Pohuwato.",
    ],
    borders: { north: "Laut Sulawesi", south: "Teluk Tomini", east: "Kabupaten Gorontalo", west: "Kabupaten Pohuwato" },
    sourceTitle: "Kabupaten Boalemo",
    sourceUrl: "https://id.wikipedia.org/wiki/Kabupaten_Boalemo",
  },

  pohuwato: {
    slug: "pohuwato",
    name: "Kabupaten Pohuwato",
    seat: "Marisa",
    tagline: "The largest of the six by land, and the furthest west.",
    facts: [
      { label: "Seat", value: "Marisa" },
      { label: "Area", value: "4,244.31 km²" },
      { label: "Population", value: "161,727 (30 June 2024)" },
      { label: "Districts", value: "13 kecamatan, 101 desa, 3 kelurahan" },
      { label: "Established", value: "25 February 2003 — UU No. 6/2003" },
    ],
    about: [
      "Pohuwato covers 4,244.31 km², more than twice the area of Kota Gorontalo and Bone Bolango combined, with 161,727 people living in it.",
      "That makes it the emptiest of the six by some distance, and the least represented in this directory so far.",
    ],
    geography: [
      "Pantai Bumbulan lies on its Teluk Tomini coast.",
      "Its corners are marked by Gunung Tentolomatinan in the north and Gunung Sentayu in the west, with Tanjung Panjang at its southern tip.",
    ],
    history: [
      "The regency was created on 25 February 2003 under UU No. 6/2003, separated from Boalemo — which had itself only formed in 1999.",
      "Its name was chosen for its history: Pohuwato is the local Gorontalo dialect name for the area.",
      "Under Dutch rule it was known as Paguat and was known for its gold mines.",
    ],
    borders: { north: "Gunung Tentolomatinan", south: "Tanjung Panjang", east: "Desa Tabulo", west: "Gunung Sentayu" },
    sourceTitle: "Kabupaten Pohuwato",
    sourceUrl: "https://id.wikipedia.org/wiki/Kabupaten_Pohuwato",
  },

  "gorontalo-utara": {
    slug: "gorontalo-utara",
    name: "Kabupaten Gorontalo Utara",
    seat: "Kwandang",
    tagline: "The province's north coast, facing the Sulawesi Sea.",
    facts: [
      { label: "Seat", value: "Kwandang" },
      { label: "Area", value: "1,703.6 km²" },
      { label: "Population", value: "131,338 (30 June 2024)" },
      { label: "Districts", value: "11 kecamatan, 123 desa" },
      { label: "Established", value: "2 January 2007 — UU No. 11/2007" },
    ],
    about: [
      "With 131,338 people this is the smallest of the six by population, and the youngest — it was created in 2007.",
      "Farming, forestry and fisheries account for 46.74 per cent of its economy, the highest share of any area here. It produced 221,661 tonnes of maize and landed 21,894 tonnes of fish.",
    ],
    geography: [
      "It holds the whole of the province's northern coastline on the Sulawesi Sea, with Pulau Saronde offshore and beaches at Minanga and Dunu.",
      "Pelabuhan Anggrek is its port.",
      "It borders Bolaang Mongondow Utara in Sulawesi Utara to the east and Buol in Sulawesi Tengah to the west.",
    ],
    history: [
      "Gorontalo Utara was created on 2 January 2007 under UU No. 11/2007.",
      "It was the third and last regency to be split from Kabupaten Gorontalo.",
    ],
    borders: { north: "Laut Sulawesi", south: "Kabupaten Boalemo, Kabupaten Gorontalo, Kabupaten Bone Bolango", east: "Kabupaten Bolaang Mongondow Utara", west: "Kabupaten Buol" },
    sourceTitle: "Kabupaten Gorontalo Utara",
    sourceUrl: "https://id.wikipedia.org/wiki/Kabupaten_Gorontalo_Utara",
  },
};
