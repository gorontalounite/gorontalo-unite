/**
 * Event listing types, the category strip, and the placeholder content the
 * page falls back to while the events table is still empty.
 *
 * Same arrangement as the Reels feed: real rows win, samples only ever show
 * when there is nothing published. Anything rendered from SAMPLE_EVENTS is
 * flagged in the UI so a reader cannot mistake it for a real ticket offer.
 */

export interface TicketTier {
  name: string;
  price: number | null;
  soldOut?: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  organizer: string | null;
  venue: string | null;
  address: string | null;
  city: string | null;
  startsAt: string;
  endsAt: string | null;
  imageUrl: string | null;
  description: string;
  priceFrom: number | null;
  soldOut: boolean;
  registrationUrl: string | null;
  mapsUrl: string | null;
  featured: boolean;
  tickets: TicketTier[];
  importantInfo: string[];
  terms: string[];
  /** True when this came from SAMPLE_EVENTS rather than the database. */
  isSample?: boolean;
}

export const EVENT_CATEGORIES = [
  { label: "Atraksi & Taman Hiburan", icon: "🎡" },
  { label: "Balapan & Ketahanan", icon: "🏃" },
  { label: "Festival & Pameran", icon: "🎪" },
  { label: "Komunitas & Perkumpulan", icon: "🤝" },
  { label: "Konferensi & Seminar", icon: "🎤" },
  { label: "Konser", icon: "🎸" },
  { label: "Pertunjukan & Penampilan", icon: "🎭" },
  { label: "Sesi Olahraga", icon: "🏅" },
  { label: "Tur & Perjalanan", icon: "🧭" },
  { label: "Turnamen & Kompetisi", icon: "🏆" },
  { label: "Workshop & Pelatihan", icon: "🛠️" },
] as const;

export const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export const eventDay = (value: string) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Makassar" })
    .format(new Date(value));

export const eventDayLong = (value: string) =>
  new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Makassar" })
    .format(new Date(value));

/* ------------------------------------------------------------------ *
 * Placeholder content. Every field here is invented for layout only.
 * ------------------------------------------------------------------ */

const SHARED_TERMS = [
  "Tiket dijual langsung oleh penyelenggara kepada konsumen. Tiket yang dibeli dari pihak lain di luar kanal resmi dapat dibatalkan tanpa pengembalian dana.",
  "Tiket tidak dapat dipindahtangankan untuk tujuan komersial, termasuk hadiah, kompetisi, kontes, atau undian.",
  "Setiap pemegang tiket bertanggung jawab atas keselamatan dan keamanan pribadinya selama berada di area acara.",
  "Semua penjualan bersifat final. Tiket yang sudah terjual tidak dapat ditukar dan tidak dapat diuangkan kembali.",
];

const SHARED_INFO = [
  "Pembelian dibatasi maksimal 6 (enam) tiket per transaksi untuk kategori yang sama.",
  "Satu alamat email dan satu nomor telepon hanya dapat digunakan untuk satu transaksi.",
  "Penonton wajib menukarkan tiket dengan gelang masuk di loket penukaran mulai 3 jam sebelum acara dimulai.",
  "Anak di bawah 12 tahun wajib didampingi orang dewasa yang memiliki tiket.",
];

function sample(item: Omit<EventItem, "isSample" | "terms" | "importantInfo"> & Partial<Pick<EventItem, "terms" | "importantInfo">>): EventItem {
  return { terms: SHARED_TERMS, importantInfo: SHARED_INFO, ...item, isSample: true };
}

export const SAMPLE_EVENTS: EventItem[] = [
  sample({
    id: "sample-karawo",
    slug: "contoh-festival-karawo",
    title: "Festival Karawo",
    category: "Festival & Pameran",
    organizer: "Dinas Pariwisata Gorontalo",
    venue: "Lapangan Taruna Remaja",
    address: "Jl. Sultan Botutihe, Kota Gorontalo",
    city: "Kota Gorontalo",
    startsAt: "2026-11-14T09:00:00+08:00",
    endsAt: "2026-11-16T22:00:00+08:00",
    imageUrl: null,
    description:
      "Pekan raya kain sulam karawo: peragaan busana, pasar pengrajin, dan lokakarya menyulam bersama perajin dari enam kabupaten dan kota.",
    priceFrom: 0,
    soldOut: false,
    registrationUrl: null,
    mapsUrl: null,
    featured: true,
    tickets: [
      { name: "Umum", price: 0 },
      { name: "Workshop Menyulam", price: 75000 },
      { name: "Fashion Show (Reguler)", price: 150000 },
      { name: "Fashion Show (VIP)", price: 350000 },
    ],
  }),
  sample({
    id: "sample-tumbilotohe",
    slug: "contoh-malam-tumbilotohe",
    title: "Malam Tumbilotohe",
    category: "Atraksi & Taman Hiburan",
    organizer: "Komunitas Kampung Lampu",
    venue: "Kawasan Danau Limboto",
    address: "Limboto, Kabupaten Gorontalo",
    city: "Kabupaten Gorontalo",
    startsAt: "2026-10-02T18:30:00+08:00",
    endsAt: "2026-10-02T23:00:00+08:00",
    imageUrl: null,
    description:
      "Tiga malam terakhir Ramadan, ribuan lampu botol dinyalakan sepanjang jalan kampung. Jalur pejalan kaki, panggung tadarus, dan pasar kuliner malam.",
    priceFrom: 0,
    soldOut: false,
    registrationUrl: null,
    mapsUrl: null,
    featured: true,
    tickets: [{ name: "Gratis", price: 0 }],
  }),
  sample({
    id: "sample-pacuan",
    slug: "contoh-pacuan-kuda-tradisional",
    title: "Pacuan Kuda Tradisional",
    category: "Turnamen & Kompetisi",
    organizer: "Pordasi Gorontalo",
    venue: "Arena Pacuan Kuda Bone Bolango",
    address: "Suwawa, Bone Bolango",
    city: "Bone Bolango",
    startsAt: "2026-09-27T08:00:00+08:00",
    endsAt: "2026-09-28T17:00:00+08:00",
    imageUrl: null,
    description:
      "Dua hari balapan kelas pemula sampai terbuka, dengan pasar rakyat dan panggung musik di sisi tribun.",
    priceFrom: 25000,
    soldOut: false,
    registrationUrl: null,
    mapsUrl: null,
    featured: true,
    tickets: [
      { name: "Tribun Terbuka", price: 25000 },
      { name: "Tribun Utama", price: 75000 },
      { name: "Tribun VIP", price: 200000 },
    ],
  }),
  sample({
    id: "sample-teluk-tomini",
    slug: "contoh-teluk-tomini-run",
    title: "Teluk Tomini Run 10K",
    category: "Balapan & Ketahanan",
    organizer: "Gorontalo Runners",
    venue: "Garis start Pantai Indah",
    address: "Kota Gorontalo",
    city: "Kota Gorontalo",
    startsAt: "2026-12-06T05:30:00+08:00",
    endsAt: "2026-12-06T10:00:00+08:00",
    imageUrl: null,
    description:
      "Lari pagi menyusuri garis pantai Teluk Tomini. Kategori 5K dan 10K, kuota terbatas, termasuk jersey dan medali finisher.",
    priceFrom: 235000,
    soldOut: false,
    registrationUrl: null,
    mapsUrl: null,
    featured: true,
    tickets: [
      { name: "5K Early Bird", price: 185000, soldOut: true },
      { name: "5K Reguler", price: 235000 },
      { name: "10K Reguler", price: 285000 },
      { name: "10K Komunitas (min. 5 orang)", price: 250000 },
    ],
  }),
  sample({
    id: "sample-konser",
    slug: "contoh-panggung-musik-teluk",
    title: "Panggung Musik Teluk",
    category: "Konser",
    organizer: "Gorontalo Unite",
    venue: "Anjungan Teluk Tomini",
    address: "Kota Gorontalo",
    city: "Kota Gorontalo",
    startsAt: "2026-11-29T19:00:00+08:00",
    endsAt: "2026-11-29T23:30:00+08:00",
    imageUrl: null,
    description:
      "Malam musik dengan penampil lokal dan bintang tamu nasional di panggung terbuka menghadap teluk.",
    priceFrom: 120000,
    soldOut: false,
    registrationUrl: null,
    mapsUrl: null,
    featured: false,
    tickets: [
      { name: "Festival", price: 120000 },
      { name: "Tribun", price: 250000 },
      { name: "VIP", price: 500000 },
    ],
  }),
  sample({
    id: "sample-seminar",
    slug: "contoh-forum-ekonomi-kreatif",
    title: "Forum Ekonomi Kreatif Gorontalo",
    category: "Konferensi & Seminar",
    organizer: "Kadin Gorontalo",
    venue: "Aula Universitas Negeri Gorontalo",
    address: "Kota Gorontalo",
    city: "Kota Gorontalo",
    startsAt: "2026-10-18T08:30:00+08:00",
    endsAt: "2026-10-18T16:00:00+08:00",
    imageUrl: null,
    description:
      "Sehari penuh membahas UMKM, produk digital, dan pembiayaan usaha muda, dengan sesi mentoring tertutup di sore hari.",
    priceFrom: 0,
    soldOut: false,
    registrationUrl: null,
    mapsUrl: null,
    featured: false,
    tickets: [
      { name: "Peserta Umum", price: 0 },
      { name: "Sesi Mentoring", price: 100000 },
    ],
  }),
  sample({
    id: "sample-workshop",
    slug: "contoh-kelas-kopi-pinogu",
    title: "Kelas Cupping Kopi Pinogu",
    category: "Workshop & Pelatihan",
    organizer: "Rumah Kopi Pinogu",
    venue: "Kedai Pinogu",
    address: "Kota Gorontalo",
    city: "Kota Gorontalo",
    startsAt: "2026-09-30T14:00:00+08:00",
    endsAt: "2026-09-30T17:00:00+08:00",
    imageUrl: null,
    description:
      "Mengenali profil rasa kopi Pinogu lewat sesi cupping terpandu, dari proses pascapanen sampai penyeduhan.",
    priceFrom: 150000,
    soldOut: true,
    registrationUrl: null,
    mapsUrl: null,
    featured: false,
    tickets: [{ name: "Kelas Cupping", price: 150000, soldOut: true }],
  }),
  sample({
    id: "sample-tur",
    slug: "contoh-tur-hiu-paus-botubarani",
    title: "Tur Hiu Paus Botubarani",
    category: "Tur & Perjalanan",
    organizer: "Pokdarwis Botubarani",
    venue: "Pantai Botubarani",
    address: "Bone Bolango",
    city: "Bone Bolango",
    startsAt: "2026-10-11T06:00:00+08:00",
    endsAt: "2026-10-11T11:00:00+08:00",
    imageUrl: null,
    description:
      "Perjalanan pagi menemui hiu paus di perairan Botubarani, dipandu kelompok sadar wisata setempat.",
    priceFrom: 200000,
    soldOut: false,
    registrationUrl: null,
    mapsUrl: null,
    featured: false,
    tickets: [
      { name: "Perahu Bersama", price: 200000 },
      { name: "Perahu Privat (4 orang)", price: 700000 },
    ],
  }),
];

/* ------------------------------------------------------------------ *
 * Database rows. Tickets, "Info Penting" and the terms are editorial
 * extras, so they ride in listing_details rather than new columns.
 * ------------------------------------------------------------------ */

const strings = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim() !== "") : [];

function ticketsFrom(value: unknown): TicketTier[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) return [];
    const row = entry as Record<string, unknown>;
    const name = typeof row.name === "string" ? row.name.trim() : "";
    if (!name) return [];
    const price = typeof row.price === "number" ? row.price : null;
    return [{ name, price, soldOut: Boolean(row.soldOut) }];
  });
}

export function fromEventRow(row: Record<string, unknown>): EventItem {
  const details = (row.listing_details ?? {}) as Record<string, unknown>;
  const tickets = ticketsFrom(details.tickets);
  const prices = tickets.filter((ticket) => !ticket.soldOut && typeof ticket.price === "number").map((ticket) => ticket.price as number);

  return {
    id: String(row.id),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    category: String(row.category ?? "") || "Event",
    organizer: (row.organizer as string | null) ?? null,
    venue: (row.venue as string | null) ?? null,
    address: (row.address as string | null) ?? null,
    city: (row.venue as string | null) ?? (row.address as string | null) ?? null,
    startsAt: String(row.starts_at ?? ""),
    endsAt: (row.ends_at as string | null) ?? null,
    imageUrl: (row.image_url as string | null) ?? null,
    description: String(row.description ?? ""),
    // price_label is free text, so a real number only comes from the tiers.
    priceFrom: prices.length > 0 ? Math.min(...prices) : null,
    soldOut: tickets.length > 0 && tickets.every((ticket) => ticket.soldOut),
    registrationUrl: (row.registration_url as string | null) ?? null,
    mapsUrl: (row.maps_url as string | null) ?? null,
    featured: Boolean(row.featured),
    tickets,
    importantInfo: strings(details.important_info),
    terms: strings(details.terms),
  };
}
