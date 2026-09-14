/**
 * Three shelves that are not categories. Two are placements an editor ticks —
 * Featured and Choices for You — and the third is just everything by date.
 * Shared with the server page so a "View all" link survives a reload.
 */
export const FEATURED_SHELF = "Featured";
export const CHOICES_SHELF = "Choices for You";
export const RECENT_SHELF = "Recently Added";

/**
 * What a category is called on the page, where it differs from what it is
 * called in the database and the admin.
 *
 * Only Sponsored differs. "Sponsored" is a filing label, and as a shelf
 * heading it reads as a section of adverts; the rail is renamed the way any
 * recommendation rail is. The disclosure does not move with it — every card
 * still carries its category, so a paid post is still marked as one where a
 * reader is actually looking at it.
 */
const DISPLAY_NAME: Record<string, string> = { Sponsored: "Worth a Look" };
export const shelfLabel = (name: string) => DISPLAY_NAME[name] ?? name;

/** URL form of a shelf or category name: "Untold Story" -> "untold-story". */
export const reelSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

/**
 * The Reels taxonomy, in the order editors see it. Shared by the public feed
 * and the admin grid so both offer the same vocabulary.
 *
 * Tourism, Culinary and Sponsored were renamed from Wisata, Food and Brand by
 * migration 20260912140000.
 */
export const DEFAULT_REEL_CATEGORIES = [
  "Tourism",
  "Culture",
  "Untold Story",
  "Event",
  "Lifestyle",
  "News",
  "Culinary",
  "Sponsored",
] as const;

export type ReelCategory = string;

export interface ReelItem {
  id: string;
  username: string;
  category: ReelCategory;
  sponsored: boolean;
  description: string;
  publishedAt: string;
  permalink: string;
  /** Null when no cover image has been supplied for this reel. */
  thumbnail: string | null;
  /** 9:16 unless the source video is landscape. */
  orientation: "portrait" | "landscape";
  /** Pinned to the top shelf. */
  featured: boolean;
  /** Placed on the "Choices for You" shelf. Independent of featured. */
  editorChoice: boolean;
  views: number;
  reach?: number;
  likes: number;
}

export const reels: ReelItem[] = [
  {
    id: "DZpL7hZBRBu",
    username: "rachmatgobel_rg",
    category: "Tourism",
    sponsored: false,
    description: "Melihat perkembangan revitalisasi Menara Pakaya, salah satu wajah dan simbol kebanggaan Gorontalo.",
    publishedAt: "2026-06-16T03:34:00+08:00",
    permalink: "https://www.instagram.com/reel/DZpL7hZBRBu/",
    thumbnail: "/reels/DZpL7hZBRBu.jpg",
    orientation: "portrait",
    featured: true,
    editorChoice: false,
    views: 436777,
    likes: 7068,
  },
  {
    id: "DZu2aNEhvkr",
    username: "rachmatgobel_rg",
    category: "Tourism",
    sponsored: false,
    description: "Taman Limboto mulai direvitalisasi sebagai ruang publik untuk kenangan, kebanggaan, dan harapan baru.",
    publishedAt: "2026-06-18T08:24:00+08:00",
    permalink: "https://www.instagram.com/reel/DZu2aNEhvkr/",
    thumbnail: "/reels/DZu2aNEhvkr.jpg",
    orientation: "portrait",
    featured: true,
    editorChoice: false,
    views: 200007,
    likes: 12631,
  },
  {
    id: "DZoyaZMhRLO",
    username: "rachmatgobel_rg",
    category: "Tourism",
    sponsored: false,
    description: "Energi baru Pentadio Resort dengan revitalisasi kawasan dan wahana yang semakin menarik untuk dikunjungi.",
    publishedAt: "2026-06-15T23:53:00+08:00",
    permalink: "https://www.instagram.com/reel/DZoyaZMhRLO/",
    thumbnail: "/reels/DZoyaZMhRLO.jpg",
    orientation: "portrait",
    featured: true,
    editorChoice: false,
    views: 142577,
    likes: 8702,
  },
  {
    id: "DWDp6ggE872",
    username: "fadelmuhammadofficial",
    category: "Culinary",
    sponsored: false,
    description: "Milu Pulo dan Ilabulo khas Gorontalo di Rumah Makan Bumela—rasa autentik yang selalu bikin rindu.",
    publishedAt: "2026-03-19T00:13:00+08:00",
    permalink: "https://www.instagram.com/reel/DWDp6ggE872/",
    thumbnail: "/reels/DWDp6ggE872.jpg",
    orientation: "portrait",
    featured: true,
    editorChoice: false,
    views: 30047,
    likes: 1007,
  },
  {
    id: "DVqa7dGD1pB",
    username: "bellasyafiraa_",
    category: "Culinary",
    sponsored: false,
    description: "Cerita Panada Tore Tinelo dan perjalanan usaha keluarga yang tumbuh dari kerja keras serta doa.",
    publishedAt: "2026-03-09T05:00:00+08:00",
    permalink: "https://www.instagram.com/reel/DVqa7dGD1pB/",
    thumbnail: "/reels/DVqa7dGD1pB.jpg",
    orientation: "portrait",
    featured: false,
    editorChoice: false,
    views: 16238,
    likes: 241,
  },
  {
    id: "DU_c97ck4bX",
    username: "gorontalo.unite",
    category: "Culinary",
    sponsored: false,
    description: "Tradisi sahur pertama keluarga Gorontalo dan makna ayam sebagai hidangan penyambutan Ramadan.",
    publishedAt: "2026-02-20T11:30:00+08:00",
    permalink: "https://www.instagram.com/reel/DU_c97ck4bX/",
    thumbnail: "/reels/DU_c97ck4bX.jpg",
    orientation: "portrait",
    featured: false,
    editorChoice: false,
    views: 12577,
    likes: 95,
  },
  {
    id: "DV-v77ega42",
    username: "disparekrafpora_gorontaloprov",
    category: "Event",
    sponsored: false,
    description: "Festival Tumbilotohe Hulonthalo Mulolo dengan ribuan lampu, pawai obor, dan tradisi Ramadan Gorontalo.",
    publishedAt: "2026-03-17T02:41:00+08:00",
    permalink: "https://www.instagram.com/reel/DV-v77ega42/",
    thumbnail: "/reels/DV-v77ega42.jpg",
    orientation: "portrait",
    featured: false,
    editorChoice: false,
    views: 14239,
    likes: 314,
  },
  {
    id: "Dauv99eBUFx",
    username: "qrisgto",
    category: "Event",
    sponsored: false,
    description: "Cara klaim tiket konser Toton Caribo dalam rangkaian Bahagia QRIS Fest 2026.",
    publishedAt: "2026-07-13T03:55:00+08:00",
    permalink: "https://www.instagram.com/reel/Dauv99eBUFx/",
    thumbnail: "/reels/Dauv99eBUFx.jpg",
    orientation: "portrait",
    featured: false,
    editorChoice: false,
    views: 13284,
    likes: 94,
  },
  {
    id: "DYJXI99uALJ",
    username: "deddy_iteneps",
    category: "Event",
    sponsored: false,
    description: "Suasana Gorontalo Mods May Day 2026, ruang silaturahmi bagi budaya Mods dan pencinta skuter klasik.",
    publishedAt: "2026-05-09T22:30:00+08:00",
    permalink: "https://www.instagram.com/reel/DYJXI99uALJ/",
    thumbnail: "/reels/DYJXI99uALJ.jpg",
    orientation: "portrait",
    featured: false,
    editorChoice: false,
    views: 11686,
    likes: 358,
  },
  {
    id: "DVyCk6dE4Mr",
    username: "gorontalo.unite",
    category: "Sponsored",
    sponsored: true,
    description: "iBox hadir lebih dekat dengan penawaran dan promo spesial untuk perangkat Apple terbaru.",
    publishedAt: "2026-03-12T04:00:00+08:00",
    permalink: "https://www.instagram.com/reel/DVyCk6dE4Mr/",
    thumbnail: "/reels/DVyCk6dE4Mr.jpg",
    orientation: "portrait",
    featured: false,
    editorChoice: false,
    views: 14081,
    likes: 300,
  },
  {
    id: "Dbav5taTC8j",
    username: "gorontalo.unite",
    category: "Sponsored",
    sponsored: true,
    description: "Grand opening Point Coffee di Indomaret Sultan Botutihe dengan promo spesial untuk pengunjung.",
    publishedAt: "2026-07-30T06:03:00+08:00",
    permalink: "https://www.instagram.com/reel/Dbav5taTC8j/",
    thumbnail: "/reels/Dbav5taTC8j.jpg",
    orientation: "portrait",
    featured: false,
    editorChoice: false,
    views: 12416,
    likes: 112,
  },
  {
    id: "DVk9FGGT2pg",
    username: "gorontalo.unite",
    category: "Sponsored",
    sponsored: true,
    description: "Ramadan Collection dari BUCCHERI dengan pilihan sepatu, sandal, dan tas berbahan kulit.",
    publishedAt: "2026-03-07T01:00:00+08:00",
    permalink: "https://www.instagram.com/reel/DVk9FGGT2pg/",
    thumbnail: "/reels/DVk9FGGT2pg.jpg",
    orientation: "portrait",
    featured: false,
    editorChoice: false,
    views: 12410,
    likes: 58,
  },
];
