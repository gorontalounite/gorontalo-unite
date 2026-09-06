export const CATEGORIES = [
  { key: "news",           label: "Regional"       },
  { key: "whats-on",       label: "What’s On"      },
  { key: "travel",         label: "Tourism"        },
  { key: "culinary",       label: "Culinary"       },
  { key: "culture",        label: "Culture"        },
  { key: "people",         label: "People"         },
  { key: "life",           label: "Lifestyle"      },
  { key: "politik",        label: "Politik"        },
  { key: "pemerintahan",   label: "Pemerintahan"   },
  { key: "wisata",         label: "Wisata"         },
  { key: "budaya",         label: "Budaya"         },
  { key: "event",          label: "Event"          },
  { key: "inspire",        label: "Inspire"        },
  { key: "insight",        label: "Insight"        },
  { key: "interest",       label: "Interest"       },
  { key: "ekonomi",        label: "Ekonomi"        },
  { key: "bisnis",         label: "Bisnis"         },
  { key: "pendidikan",     label: "Pendidikan"     },
  { key: "sosial",         label: "Sosial"         },
  { key: "kemasyarakatan", label: "Kemasyarakatan" },
  { key: "kesehatan",      label: "Kesehatan"      },
  { key: "pertanian",      label: "Pertanian"      },
  { key: "perikanan",      label: "Perikanan"      },
  { key: "teknologi",      label: "Teknologi"      },
  { key: "digital",        label: "Digital"        },
  { key: "infrastruktur",  label: "Infrastruktur"  },
  { key: "pembangunan",    label: "Pembangunan"    },
  { key: "hukum",          label: "Hukum"          },
  { key: "keamanan",       label: "Keamanan"       },
  { key: "agama",          label: "Agama"          },
  { key: "lingkungan",     label: "Lingkungan"     },
  { key: "alam",           label: "Alam"           },
  { key: "olahraga",       label: "Olahraga"       },
] as const;

export type CategoryKey = typeof CATEGORIES[number]["key"];

// Editorial channels intentionally remain separate from City Guide. Wisata
// and Event have their own tables, public routes, and admin workspaces.
export const WEB_CATEGORY_GROUPS: ReadonlyArray<{ title: string; categories: ReadonlyArray<{ key: string; label: string }> }> = [
  { title: "Rubrik Berita", categories: [
    { key: "whats-on", label: "What’s On" },
    { key: "travel", label: "Tourism" },
    { key: "culinary", label: "Culinary" },
    { key: "culture", label: "Culture" },
    { key: "people", label: "People" },
    { key: "life", label: "Lifestyle" },
    { key: "news", label: "Regional" },
  ] },
] ;

export const WEB_CATEGORIES = WEB_CATEGORY_GROUPS.flatMap((group) => group.categories);

export const WEB_CATEGORY_DESCRIPTIONS: Readonly<Record<string, string>> = {
  "whats-on": "Konser, festival, bazaar, exhibition, dan agenda pilihan di Gorontalo.",
  travel: "Destinasi, hotel, itinerary, hidden gems, dan panduan menjelajah Gorontalo.",
  culinary: "Kuliner, kafe, restoran, UMKM F&B, dan rekomendasi rasa dari Gorontalo.",
  culture: "Karawo, tradisi, sejarah, seni, bahasa, dan warisan budaya Gorontalo.",
  people: "Creator, entrepreneur, seniman, komunitas, dan sosok menarik dari Gorontalo.",
  life: "Kampus, karier, relationship, wellness, dan lifestyle anak muda Gorontalo.",
  news: "Pembangunan, kebijakan, dan kabar regional lain dari Gorontalo.",
};

export const WEB_CATEGORY_TERMS: Readonly<Record<string, readonly string[]>> = {
  news: ["regional", "pembangunan", "infrastruktur", "ruang publik", "taman", "penerbangan", "bandara", "rute baru", "destinasi baru", "kebijakan", "pariwisata", "gaya hidup", "prestasi", "anak muda", "industri kreatif", "ekonomi kreatif", "digitalisasi", "umkm", "olahraga"],
  "whats-on": ["event", "acara", "konser", "festival", "bazaar", "bazar", "pameran", "exhibition", "agenda", "weekend", "lomba", "wisuda", "perayaan", "pelantikan", "turnamen", "kompetisi"],
  travel: ["tourism", "wisata", "travel", "destinasi", "pantai", "pulau", "hotel", "resort", "itinerary", "transportasi", "diving", "laut", "alam", "liburan"],
  culinary: ["kuliner", "culinary", "food", "drink", "makan", "rumah makan", "warung", "cafe", "kafe", "kopi", "restoran", "umkm", "resep", "dapur", "chef", "ikan", "jagung", "binte", "ilabulo"],
  culture: ["budaya", "culture", "karawo", "tradisi", "sejarah", "seni", "bahasa", "heritage", "adat", "musik", "tari", "agama"],
  people: ["people", "profil", "tokoh", "creator", "kreator", "entrepreneur", "pengusaha", "seniman", "komunitas", "inspire", "sosok", "pemuda"],
  life: ["lifestyle", "life", "kampus", "pendidikan", "karier", "career", "relationship", "wellness", "kesehatan", "anak muda", "mahasiswa", "sekolah", "sosial"],
};

export interface WebCategoryArticle {
  category: string;
  categories: string[] | null;
  tags?: string[] | null;
  title: string;
  excerpt: string | null;
}

// Deterministic mapping for the older Indonesian category taxonomy (still
// stored on many existing articles) to the current web desks. Checked before
// fuzzy term matching so that, e.g., an article tagged "Wisata" always
// resolves to Tourism even if its text happens to also mention an unrelated
// term like "event" in passing.
const LEGACY_CATEGORY_MAP: Readonly<Record<string, string>> = {
  wisata: "travel", alam: "travel",
  budaya: "culture", agama: "culture",
  event: "whats-on",
  pendidikan: "life", kesehatan: "life", sosial: "life", interest: "life",
  inspire: "people",
  politik: "news", pemerintahan: "news", ekonomi: "news", bisnis: "news",
  pertanian: "news", perikanan: "news", teknologi: "news", digital: "news",
  infrastruktur: "news", pembangunan: "news", hukum: "news", keamanan: "news",
  lingkungan: "news", olahraga: "news", kemasyarakatan: "news", insight: "news",
};

function normalizedCategory(value: string) {
  return value
    .toLocaleLowerCase("id-ID")
    .replace(/[’‘`]/g, "'")
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesWebCategoryTerms(article: WebCategoryArticle, key: string) {
  const haystack = [article.category, ...(article.categories ?? []), ...(article.tags ?? []), article.title, article.excerpt ?? ""]
    .join(" ")
    .toLocaleLowerCase("id-ID");
  return (WEB_CATEGORY_TERMS[key] ?? []).some((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(haystack);
  });
}

export function articleBelongsToWebCategory(article: WebCategoryArticle, key: string) {
  const selected = [article.category, ...(article.categories ?? [])].map(normalizedCategory);
  const category = WEB_CATEGORIES.find((item) => item.key === key);
  if (!category) return false;

  const legacyKeys = selected.map((value) => LEGACY_CATEGORY_MAP[value]).filter((value): value is string => Boolean(value));
  if (legacyKeys.length) return legacyKeys.includes(key);

  const explicitKeys = WEB_CATEGORIES
    .filter((item) => selected.includes(normalizedCategory(item.label)) || selected.includes(normalizedCategory(item.key)))
    .map((item) => item.key);
  if (key === "culinary" && selected.some((value) => value === "food & drink" || value === "food-drink")) return true;
  if (explicitKeys.length) return explicitKeys.includes(key);

  if (key === "news") {
    // Regional is the catch-all desk: articles that don't explicitly or
    // by content match any other web category land here by default —
    // this is what replaces the old generic "Umum" category.
    const matchesOtherDesk = WEB_CATEGORIES.some((item) => item.key !== "news" && matchesWebCategoryTerms(article, item.key));
    return matchesWebCategoryTerms(article, "news") || !matchesOtherDesk;
  }

  return matchesWebCategoryTerms(article, key);
}

// Single source of truth for "which web desk does this article belong to",
// used by both the public homepage/category pages and the admin news list —
// so an article's category badge always means the same thing everywhere.
export function resolveWebCategoryLabel(article: WebCategoryArticle): string {
  const match = WEB_CATEGORIES.find((item) => articleBelongsToWebCategory(article, item.key));
  return match?.label ?? article.categories?.[0] ?? article.category ?? "Regional";
}

export const CAT_COLOR: Record<string, { badge: string; text: string; bg: string }> = {
  "Regional":       { badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200", text: "text-slate-700 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-800" },
  "What’s On":      { badge: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300", text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" },
  "Tourism":        { badge: "bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300", text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-100 dark:bg-sky-900/30" },
  "Culinary":       { badge: "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200", text: "text-amber-700 dark:text-amber-300", bg: "bg-amber-50 dark:bg-amber-900/20" },
  "Food & Drink":   { badge: "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200", text: "text-amber-700 dark:text-amber-300", bg: "bg-amber-50 dark:bg-amber-900/20" },
  "Culture":        { badge: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300", text: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
  "People":         { badge: "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/30" },
  "Lifestyle":      { badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  "Politik":        { badge: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",         text: "text-blue-600 dark:text-blue-400",         bg: "bg-blue-100 dark:bg-blue-900/30"         },
  "Pemerintahan":   { badge: "bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300",             text: "text-sky-600 dark:text-sky-400",           bg: "bg-sky-100 dark:bg-sky-900/30"           },
  "Wisata":         { badge: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300", text: "text-yellow-600 dark:text-yellow-400",     bg: "bg-yellow-100 dark:bg-yellow-900/30"     },
  "Budaya":         { badge: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300", text: "text-purple-600 dark:text-purple-400",     bg: "bg-purple-100 dark:bg-purple-900/30"     },
  "Event":          { badge: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300", text: "text-orange-600 dark:text-orange-400",     bg: "bg-orange-100 dark:bg-orange-900/30"     },
  "Inspire":        { badge: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300", text: "text-amber-600 dark:text-amber-400",     bg: "bg-amber-100 dark:bg-amber-900/30"     },
  "Insight":        { badge: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300", text: "text-indigo-600 dark:text-indigo-400",     bg: "bg-indigo-100 dark:bg-indigo-900/30"     },
  "Interest":       { badge: "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300", text: "text-rose-600 dark:text-rose-400",     bg: "bg-rose-100 dark:bg-rose-900/30"     },
  "Ekonomi":        { badge: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",     text: "text-green-600 dark:text-green-400",       bg: "bg-green-100 dark:bg-green-900/30"       },
  "Bisnis":         { badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  "Pendidikan":     { badge: "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300",         text: "text-teal-600 dark:text-teal-400",         bg: "bg-teal-100 dark:bg-teal-900/30"         },
  "Sosial":         { badge: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300", text: "text-orange-600 dark:text-orange-400",     bg: "bg-orange-100 dark:bg-orange-900/30"     },
  "Kemasyarakatan": { badge: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300",     text: "text-amber-600 dark:text-amber-400",       bg: "bg-amber-100 dark:bg-amber-900/30"       },
  "Kesehatan":      { badge: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",             text: "text-red-600 dark:text-red-400",           bg: "bg-red-100 dark:bg-red-900/30"           },
  "Pertanian":      { badge: "bg-lime-50 text-lime-700 dark:bg-lime-900/20 dark:text-lime-300",         text: "text-lime-600 dark:text-lime-400",         bg: "bg-lime-100 dark:bg-lime-900/30"         },
  "Perikanan":      { badge: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300",         text: "text-cyan-600 dark:text-cyan-400",         bg: "bg-cyan-100 dark:bg-cyan-900/30"         },
  "Teknologi":      { badge: "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300", text: "text-violet-600 dark:text-violet-400",     bg: "bg-violet-100 dark:bg-violet-900/30"     },
  "Digital":        { badge: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300", text: "text-indigo-600 dark:text-indigo-400",     bg: "bg-indigo-100 dark:bg-indigo-900/30"     },
  "Infrastruktur":  { badge: "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-300",           text: "text-gray-600 dark:text-gray-400",         bg: "bg-gray-100 dark:bg-zinc-800"            },
  "Pembangunan":    { badge: "bg-stone-50 text-stone-700 dark:bg-stone-900/20 dark:text-stone-300",     text: "text-stone-600 dark:text-stone-400",       bg: "bg-stone-100 dark:bg-stone-900/30"       },
  "Hukum":          { badge: "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300",         text: "text-rose-600 dark:text-rose-400",         bg: "bg-rose-100 dark:bg-rose-900/30"         },
  "Keamanan":       { badge: "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300",         text: "text-pink-600 dark:text-pink-400",         bg: "bg-pink-100 dark:bg-pink-900/30"         },
  "Agama":          { badge: "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200",     text: "text-amber-700 dark:text-amber-300",       bg: "bg-amber-50 dark:bg-amber-900/20"        },
  "Lingkungan":     { badge: "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200",     text: "text-green-700 dark:text-green-300",       bg: "bg-green-50 dark:bg-green-900/20"        },
  "Alam":           { badge: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200", text: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-50 dark:bg-emerald-900/20"  },
  "Olahraga":       { badge: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300", text: "text-indigo-600 dark:text-indigo-400",     bg: "bg-indigo-100 dark:bg-indigo-900/30"     },
};

export const DEFAULT_COLOR = {
  badge: "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-300",
  text:  "text-gray-600 dark:text-gray-400",
  bg:    "bg-gray-100 dark:bg-zinc-800",
};
