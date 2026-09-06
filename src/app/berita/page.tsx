import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LatestNewsGrid from "./LatestNewsGrid";
import { articleBelongsToWebCategory, resolveWebCategoryLabel, buildCategoryDeskMap, type CategoryRow } from "./categories";

type DeskMap = Readonly<Record<string, string>>;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita & Cerita Gorontalo",
  description: "Kabar terpilih, agenda, perjalanan, kuliner, budaya, dan orang-orang menarik dari Gorontalo.",
  openGraph: {
    title: "Berita & Cerita Gorontalo | Gorontalo Unite",
    description: "Yang penting, menarik, dan dekat dengan hidup di Gorontalo.",
    type: "website",
  },
};

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  categories: string[] | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
  is_trending: boolean | null;
  view_count: number | null;
};

type DeskKey = "news" | "whats-on" | "travel" | "culinary" | "culture" | "people" | "life";

const ARTICLE_FIELDS = "id, title, slug, excerpt, image_url, category, categories, tags, published_at, created_at, is_trending, view_count";

const DESKS: ReadonlyArray<{ key: DeskKey; label: string; description: string; terms: string[] }> = [
  {
    key: "news",
    label: "Regional",
    description: "Kabar yang berdampak pada cara kita hidup, berkarya, dan menikmati Gorontalo.",
    terms: ["regional", "pembangunan", "infrastruktur", "ruang publik", "taman", "penerbangan", "bandara", "rute baru", "destinasi baru", "kebijakan", "pariwisata", "gaya hidup", "prestasi", "anak muda", "industri kreatif", "ekonomi kreatif", "digitalisasi", "umkm", "olahraga"],
  },
  {
    key: "whats-on",
    label: "What’s On",
    description: "Konser, festival, bazaar, exhibition, dan agenda pilihan untuk akhir pekanmu.",
    terms: ["event", "acara", "konser", "festival", "bazaar", "bazar", "pameran", "exhibition", "agenda", "weekend", "lomba", "wisuda", "perayaan", "pelantikan", "turnamen", "kompetisi"],
  },
  {
    key: "travel",
    label: "Tourism",
    description: "Destinasi, hotel, itinerary, hidden gems, dan cara terbaik menjelajah Gorontalo.",
    terms: ["tourism", "wisata", "travel", "destinasi", "pantai", "pulau", "hotel", "resort", "itinerary", "transportasi", "diving", "laut", "alam", "liburan"],
  },
  {
    key: "culinary",
    label: "Culinary",
    description: "Tempat makan, kopi, resep, dan pelaku F&B lokal yang layak dicoba.",
    terms: ["kuliner", "food", "drink", "makan", "rumah makan", "warung", "cafe", "kafe", "kopi", "restoran", "umkm", "resep", "dapur", "chef", "ikan", "jagung", "binte", "ilabulo"],
  },
  {
    key: "culture",
    label: "Culture",
    description: "Karawo, tradisi, sejarah, seni, bahasa, dan warisan yang membentuk kita.",
    terms: ["budaya", "culture", "karawo", "tradisi", "sejarah", "seni", "bahasa", "heritage", "adat", "musik", "tari", "agama"],
  },
  {
    key: "people",
    label: "People",
    description: "Creator, entrepreneur, seniman, komunitas, dan orang menarik dari Gorontalo.",
    terms: ["people", "profil", "tokoh", "creator", "kreator", "entrepreneur", "pengusaha", "seniman", "komunitas", "inspire", "sosok", "pemuda"],
  },
  {
    key: "life",
    label: "Lifestyle",
    description: "Kampus, karier, relationship, wellness, dan keseharian anak muda.",
    terms: ["lifestyle", "life", "kampus", "pendidikan", "karier", "career", "relationship", "wellness", "kesehatan", "anak muda", "mahasiswa", "sekolah", "sosial"],
  },
] as const;

function belongsTo(article: Article, key: DeskKey, deskMap: DeskMap = {}) {
  return articleBelongsToWebCategory(article, key, deskMap);
}

function articlesFor(articles: Article[], key: DeskKey, limit: number, deskMap: DeskMap = {}) {
  return articles.filter((article) => belongsTo(article, key, deskMap)).slice(0, limit);
}

function articleDate(article: Article) {
  return article.published_at ?? article.created_at;
}

function displayDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Makassar",
  }).format(new Date(value));
}

function deskLabel(article: Article, deskMap: DeskMap = {}) {
  return resolveWebCategoryLabel(article, deskMap);
}

function ArticleImage({ article, className, priority = false, sizes = "(max-width: 768px) 100vw, 50vw" }: { article: Article; className: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[4px] bg-[#e8e4dc] ${className}`}>
      {article.image_url ? (
        <Image
          src={article.image_url}
          alt=""
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          unoptimized
          sizes={sizes}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,196,0,.55),transparent_28%),linear-gradient(135deg,#eee9df,#cfc9bb)]" />
      )}
    </div>
  );
}

function Eyebrow({ article, light = false, deskMap = {} }: { article: Article; light?: boolean; deskMap?: DeskMap }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] ${light ? "text-white/70" : "text-[#77736b]"}`}>
      <span className={light ? "text-[#f5c400]" : "text-[#9b7513]"}>{deskLabel(article, deskMap)}</span>
      <span aria-hidden>•</span>
      <time dateTime={articleDate(article)}>{displayDate(articleDate(article))}</time>
    </div>
  );
}

function SectionTitle({ id, title, dark = false, showViewAll = true }: { id: string; title: string; dark?: boolean; showViewAll?: boolean }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-2 font-display text-[20px] font-extrabold tracking-[-.025em] sm:text-[24px]">
        <span className="text-[#f5c400]" aria-hidden>/</span>
        <span>{title}</span>
        <span className="text-[#f5c400]" aria-hidden>/</span>
      </h2>
      {showViewAll ? <Link href={`/category/${id}`} className={`hidden shrink-0 text-xs font-bold sm:inline ${dark ? "text-white" : "text-[#302f2c]"}`}>View all <span aria-hidden>→</span></Link> : null}
    </div>
  );
}

function StoryCard({ article, large = false, deskMap = {} }: { article: Article; large?: boolean; deskMap?: DeskMap }) {
  return (
    <article className="group">
      <Link href={`/${article.slug}`} className="block">
        <ArticleImage article={article} className={large ? "aspect-[16/10]" : "aspect-[4/3]"} sizes={large ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 768px) 82vw, 30vw"} />
        <div className="pt-4">
          <Eyebrow article={article} deskMap={deskMap} />
          <h3 className={`mt-2 font-display font-extrabold leading-[1.1] tracking-[-.025em] transition group-hover:text-[#9b7513] ${large ? "text-[22px] sm:text-[30px]" : "text-[18px] sm:text-[21px]"}`}>{article.title}</h3>
          {article.excerpt ? <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#6d6961]">{article.excerpt}</p> : null}
        </div>
      </Link>
    </article>
  );
}

function CompactStory({ article, deskMap = {} }: { article: Article; deskMap?: DeskMap }) {
  return (
    <article className="group border-b border-[#d7d1c6] pb-4 last:border-0 last:pb-0">
      <Link href={`/${article.slug}`} className="grid grid-cols-[1fr_108px] gap-4">
        <div>
          <Eyebrow article={article} deskMap={deskMap} />
          <h3 className="mt-2 line-clamp-3 font-display text-[15px] font-extrabold leading-[1.16] tracking-[-.015em] transition group-hover:text-[#9b7513] sm:text-[17px]">{article.title}</h3>
        </div>
        <div className="relative">
          <ArticleImage article={article} className="aspect-square" sizes="108px" />
        </div>
      </Link>
    </article>
  );
}

function DarkFeature({ article, deskMap = {} }: { article: Article; deskMap?: DeskMap }) {
  return (
    <article className="group relative min-h-[430px] overflow-hidden rounded-[4px] sm:min-h-[560px]">
      <ArticleImage article={article} className="absolute inset-0 h-full w-full" priority sizes="(max-width: 768px) 100vw, 70vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      <Link href={`/${article.slug}`} className="absolute inset-0 flex items-end p-6 sm:p-9">
        <div className="max-w-3xl text-white">
          <Eyebrow article={article} light deskMap={deskMap} />
          <h3 className="mt-3 font-display text-[26px] font-extrabold leading-[1.04] tracking-[-.035em] sm:text-[38px]">{article.title}</h3>
          {article.excerpt ? <p className="mt-4 hidden max-w-2xl text-sm leading-relaxed text-white/75 sm:line-clamp-2">{article.excerpt}</p> : null}
        </div>
      </Link>
    </article>
  );
}

const NAV_ORDER: DeskKey[] = ["culture", "travel", "culinary", "life", "people", "news"];

function DeskNav() {
  const navDesks = NAV_ORDER.map((key) => DESKS.find((desk) => desk.key === key)).filter((desk): desk is (typeof DESKS)[number] => Boolean(desk));
  return (
    <nav aria-label="Rubrik berita" className="border-y border-[#d7d1c6]">
      <div className="mx-auto flex max-w-[1280px] gap-6 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
        {navDesks.map((desk) => <Link key={desk.key} href={`/category/${desk.key}`} className="shrink-0 text-[11px] font-bold uppercase tracking-[.12em] text-[#555149] transition hover:text-[#9b7513]">{desk.label}</Link>)}
        <a href="#latest" className="shrink-0 text-[11px] font-bold uppercase tracking-[.12em] text-[#555149] transition hover:text-[#9b7513]">Latest News</a>
      </div>
    </nav>
  );
}

function EmptyDesk({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`border border-dashed px-6 py-14 text-center ${dark ? "border-white/25 bg-white/[.03] text-white/65" : "border-[#bbb3a5] bg-white/20 text-[#77736b]"}`}>
      <p className="font-display text-[18px] font-bold">Cerita pilihan sedang disiapkan.</p>
      <p className="mt-2 text-xs">Rubrik ini akan diisi setelah lolos kurasi redaksi.</p>
    </div>
  );
}

export default async function BeritaPage({ searchParams }: { searchParams: Promise<{ section?: string; q?: string }> }) {
  const params = await searchParams;
  const activeDesk = DESKS.find((desk) => desk.key === params.section);
  const search = (params.q ?? "").trim();
  let articles: Article[] = [];
  let deskMap: DeskMap = {};

  try {
    const supabase = await createClient();
    let request = supabase
      .from("articles")
      .select(ARTICLE_FIELDS)
      .eq("published", true)
      .neq("category", "Portfolio")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(90);
    if (search) {
      const safeSearch = search.replace(/[,%_]/g, " ");
      request = request.or(`title.ilike.%${safeSearch}%,excerpt.ilike.%${safeSearch}%`);
    }
    const [{ data, error }, { data: categoryRows }] = await Promise.all([
      request,
      supabase.from("categories").select("id, name, parent_id, desk_key"),
    ]);
    if (!error) articles = (data ?? []) as Article[];
    deskMap = buildCategoryDeskMap((categoryRows ?? []) as CategoryRow[]);
  } catch {
    articles = [];
  }

  const displayedArticles = activeDesk ? articles.filter((article) => belongsTo(article, activeDesk.key, deskMap)) : articles;

  if (activeDesk || search) {
    const title = search ? `Hasil untuk “${search}”` : activeDesk?.label ?? "Berita";
    const description = search ? `${displayedArticles.length} artikel ditemukan.` : activeDesk?.description;
    return (
      <div className="min-h-screen bg-white text-[#302f2c]">
        <DeskNav />
        <main className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-10 border-b border-[#302f2c] pb-7">
            <Link href="/category" className="text-[10px] font-bold uppercase tracking-[.18em] text-[#9b7513]">← All categories</Link>
            <h1 className="mt-4 font-display text-[40px] font-extrabold tracking-[-.04em] sm:text-[56px]">{title}</h1>
            {description ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6d6961]">{description}</p> : null}
          </div>
          {displayedArticles.length ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {displayedArticles.map((article, index) => <StoryCard key={article.id} article={article} large={index === 0} deskMap={deskMap} />)}
            </div>
          ) : (
            <div className="border border-dashed border-[#bbb3a5] px-6 py-24 text-center">
              <p className="font-display text-2xl font-bold">Belum ada cerita di rubrik ini.</p>
              <p className="mt-2 text-sm text-[#77736b]">Redaksi sedang menyiapkan pilihan yang relevan untukmu.</p>
            </div>
          )}
        </main>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="min-h-[70vh] bg-white px-4 pt-36 text-center text-[#302f2c]">
        <h1 className="font-display text-4xl font-extrabold">Berita sedang disiapkan</h1>
        <p className="mt-3 text-sm text-[#77736b]">Silakan kembali beberapa saat lagi.</p>
      </div>
    );
  }

  const hero = articles[0];
  const heroSide = articles.slice(1, 3);
  const news = articlesFor(articles.slice(3), "news", 5, deskMap);
  const travel = articlesFor(articles, "travel", 5, deskMap);
  const culinary = articlesFor(articles, "culinary", 3, deskMap);
  const culture = articlesFor(articles, "culture", 4, deskMap);
  const people = articlesFor(articles, "people", 4, deskMap);
  const life = articlesFor(articles, "life", 4, deskMap);

  return (
    <div className="min-h-screen bg-white text-[#302f2c]">
      <DeskNav />
      <main>
        <section className="mx-auto max-w-[1280px] px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.7fr_.8fr]">
            <article className="group relative min-h-[440px] overflow-hidden rounded-[4px] bg-black sm:min-h-[570px]">
              <ArticleImage article={hero} className="absolute inset-0 h-full w-full" priority sizes="(max-width: 1024px) 100vw, 70vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <Link href={`/${hero.slug}`} className="absolute inset-0 flex items-end p-6 sm:p-10">
                <div className="max-w-3xl text-white">
                  <Eyebrow article={hero} light deskMap={deskMap} />
                  <h1 className="mt-3 font-display text-[30px] font-extrabold leading-[1.02] tracking-[-.04em] sm:text-[46px]">{hero.title}</h1>
                  {hero.excerpt ? <p className="mt-4 hidden max-w-2xl text-sm leading-relaxed text-white/75 sm:line-clamp-2">{hero.excerpt}</p> : null}
                </div>
              </Link>
            </article>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              {heroSide.map((article) => (
                <article key={article.id} className="group relative min-h-[240px] overflow-hidden rounded-[4px] bg-black sm:min-h-[275px]">
                  <ArticleImage article={article} className="absolute inset-0 h-full w-full" sizes="(max-width: 1024px) 50vw, 30vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <Link href={`/${article.slug}`} className="absolute inset-0 flex items-end p-4 sm:p-6">
                    <div className="text-white"><Eyebrow article={article} light deskMap={deskMap} /><h2 className="mt-2 line-clamp-3 font-display text-[16px] font-extrabold leading-[1.08] tracking-[-.02em] sm:text-[20px]">{article.title}</h2></div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="culture" className="scroll-mt-24 border-t border-[#d7d1c6] bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <SectionTitle id="culture" title="Culture" />
            {culture.length ? <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
              <DarkFeature article={culture[0]} deskMap={deskMap} />
              <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {culture.slice(1).map((article) => <article key={article.id} className="group border-b border-[#dedede] pb-5 last:border-0"><Link href={`/${article.slug}`} className="grid grid-cols-[112px_1fr] gap-4"><ArticleImage article={article} className="aspect-square" sizes="112px" /><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#9b7513]">Culture</p><h3 className="mt-2 line-clamp-3 font-display text-[16px] font-extrabold leading-[1.1]">{article.title}</h3></div></Link></article>)}
              </div>
            </div> : <EmptyDesk />}
          </div>
        </section>

        <section id="travel" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <SectionTitle id="travel" title="Tourism" />
            {travel.length ? <div className="grid gap-6 lg:grid-cols-[1.45fr_.55fr]">
              <DarkFeature article={travel[0]} deskMap={deskMap} />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{travel.slice(1).map((article) => <CompactStory key={article.id} article={article} deskMap={deskMap} />)}</div>
            </div> : <EmptyDesk />}
          </div>
        </section>

        <section id="culinary" className="scroll-mt-24 border-y border-[#dedede] bg-[#f6f6f6] py-12 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <SectionTitle id="culinary" title="Culinary" />
            {culinary.length ? <div className="grid gap-8 sm:grid-cols-3">{culinary.map((article) => <StoryCard key={article.id} article={article} deskMap={deskMap} />)}</div> : <EmptyDesk />}
          </div>
        </section>

        <section id="life" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <SectionTitle id="life" title="Lifestyle" />
            {life.length ? <div className="grid gap-6 lg:grid-cols-2">
              <StoryCard article={life[0]} large deskMap={deskMap} />
              <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">{life.slice(1).map((article) => <CompactStory key={article.id} article={article} deskMap={deskMap} />)}</div>
            </div> : <EmptyDesk />}
          </div>
        </section>

        <section id="people" className="scroll-mt-24 border-y border-[#dedede] bg-[#f7f7f7] py-12 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <SectionTitle id="people" title="People" />
            {people.length ? <div className="flex snap-x gap-5 overflow-x-auto pb-3 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
              {people.map((article) => <div key={article.id} className="min-w-[78vw] snap-start sm:min-w-0"><StoryCard article={article} deskMap={deskMap} /></div>)}
            </div> : <EmptyDesk />}
          </div>
        </section>

        <section id="news" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <SectionTitle id="news" title="Regional" showViewAll={false} />
            {news.length ? <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
              <StoryCard article={news[0]} large deskMap={deskMap} />
              <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">{news.slice(1).map((article) => <CompactStory key={article.id} article={article} deskMap={deskMap} />)}</div>
            </div> : <EmptyDesk />}
          </div>
        </section>

        <section id="latest" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <SectionTitle id="latest" title="Latest News" showViewAll={false} />
            <LatestNewsGrid articles={articles} />
          </div>
        </section>
      </main>
    </div>
  );
}
