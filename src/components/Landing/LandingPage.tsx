import Link from "next/link";
import Image from "next/image";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  published_at: string | null;
  created_at: string;
}

export interface DestinationItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  location: string | null;
  opening_hours: string | null;
}

interface LandingPageProps {
  newsItems: NewsItem[];
  featuredNewsItems: NewsItem[];
  featuredDestinations: DestinationItem[];
  eventItems: NewsItem[];
  newsTotalCount: number;
  newsUnavailable: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  Inspire: "INSPIRE",
  Insight: "INSIGHT",
  Interest: "INTEREST",
  Event: "EVENT",
};

function formatDate(date: string | null): string {
  if (!date) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function categorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#1b1b1b] text-[10px] font-bold tracking-[0.2em] text-white/40">
      {label}
    </div>
  );
}

function ArticleImage({ item, priority = false }: { item: NewsItem; priority?: boolean }) {
  if (!item.image_url) return <MediaPlaceholder label="GORONTALO UNITE" />;

  return (
    <Image
      src={item.image_url}
      alt={item.title}
      fill
      priority={priority}
      sizes={priority ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, 33vw"}
      className="object-cover transition duration-700 group-hover:scale-105"
    />
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-[10px] font-bold tracking-[0.24em] ${dark ? "text-[#f5c400]" : "text-[#8f6900]"}`}>
      {children}
    </p>
  );
}

function SectionTitle({
  eyebrow,
  title,
  href,
  action = "Lihat semua",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  href: string;
  action?: string;
  dark?: boolean;
}) {
  return (
    <div className={`mb-8 flex items-end justify-between gap-5 border-b pb-5 sm:mb-10 ${dark ? "border-white/20" : "border-black/15"}`}>
      <div>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 className={`mt-2 text-3xl font-bold tracking-[-0.055em] sm:text-4xl ${dark ? "text-white" : "text-[#141414]"}`}>
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className={`hidden shrink-0 text-sm font-semibold sm:inline-flex sm:items-center sm:gap-2 ${dark ? "text-white hover:text-[#f5c400]" : "text-[#141414] hover:text-[#8f6900]"}`}
      >
        {action}
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}

function StoryMeta({ item, light = false }: { item: NewsItem; light?: boolean }) {
  const category = CATEGORY_LABELS[item.category] ?? item.category ?? "UMUM";
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold tracking-[0.14em] ${light ? "text-white/70" : "text-[#6e6a62]"}`}>
      <Link href={`/berita/${categorySlug(item.category)}`} className={light ? "text-[#f5c400]" : "text-[#8f6900]"}>
        {category}
      </Link>
      <span aria-hidden="true">•</span>
      <span>GORONTALO UNITE</span>
      {item.published_at && <><span aria-hidden="true">•</span><span>{formatDate(item.published_at)}</span></>}
    </div>
  );
}

function LeadStory({ item }: { item: NewsItem }) {
  return (
    <article className="group relative overflow-hidden bg-[#181818] text-white">
      <Link href={`/berita/${item.slug}`} className="absolute inset-0 z-10" aria-label={item.title} />
      <div className="relative aspect-[4/5] min-h-[440px] sm:aspect-[16/10] lg:min-h-[520px]">
        <ArticleImage item={item} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          <StoryMeta item={item} light />
          <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-[0.98] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
            {item.title}
          </h2>
          {item.excerpt && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base line-clamp-2">{item.excerpt}</p>}
        </div>
      </div>
    </article>
  );
}

function CompactStory({ item }: { item: NewsItem }) {
  return (
    <article className="group relative grid grid-cols-[112px_1fr] gap-4 border-b border-black/10 py-4 last:border-b-0 sm:grid-cols-[132px_1fr]">
      <Link href={`/berita/${item.slug}`} className="absolute inset-0 z-10" aria-label={item.title} />
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e6e2d9]">
        <ArticleImage item={item} />
      </div>
      <div className="self-center">
        <StoryMeta item={item} />
        <h3 className="mt-2 text-base font-bold leading-[1.08] tracking-[-0.035em] text-[#161616] transition group-hover:text-[#8f6900] sm:text-lg">
          {item.title}
        </h3>
      </div>
    </article>
  );
}

function EditorialStory({ item }: { item: NewsItem }) {
  return (
    <article className="group relative grid overflow-hidden border border-black/10 bg-white sm:grid-cols-[0.9fr_1.1fr]">
      <Link href={`/berita/${item.slug}`} className="absolute inset-0 z-10" aria-label={item.title} />
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e6e2d9] sm:aspect-auto sm:min-h-[245px]">
        <ArticleImage item={item} />
      </div>
      <div className="flex flex-col justify-center p-5 sm:p-7">
        <StoryMeta item={item} />
        <h3 className="mt-3 text-2xl font-bold leading-[1.02] tracking-[-0.05em] text-[#161616] transition group-hover:text-[#8f6900] sm:text-3xl">
          {item.title}
        </h3>
        {item.excerpt && <p className="mt-4 text-sm leading-relaxed text-[#666159] line-clamp-3">{item.excerpt}</p>}
        <span className="mt-5 text-xs font-bold text-[#8f6900]">Baca selengkapnya →</span>
      </div>
    </article>
  );
}

function DestinationCard({ item }: { item: DestinationItem }) {
  return (
    <Link href={`/wisata/${item.slug}`} className="group relative min-h-[340px] overflow-hidden bg-[#181818] text-white sm:min-h-[420px]">
      {item.image_url ? (
        <Image src={item.image_url} alt={item.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
      ) : <MediaPlaceholder label="CITY GUIDE" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <Eyebrow dark>{item.category ?? "DESTINASI"}</Eyebrow>
        <h3 className="mt-2 text-3xl font-bold leading-none tracking-[-0.055em]">{item.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/75 line-clamp-2">{item.description ?? "Panduan kunjungan dan cerita lokal Gorontalo."}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/70">
          {item.location && <span>⌖ {item.location}</span>}
          {item.opening_hours && <span>◷ {item.opening_hours}</span>}
        </div>
      </div>
    </Link>
  );
}

function EventCard({ item }: { item: NewsItem }) {
  return (
    <article className="group relative overflow-hidden border border-white/15 bg-white/[0.06] text-white">
      <Link href={`/berita/${item.slug}`} className="absolute inset-0 z-10" aria-label={item.title} />
      <div className="relative aspect-[16/10] overflow-hidden bg-white/10">
        <ArticleImage item={item} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute left-4 top-4 bg-[#f5c400] px-2 py-1 text-[10px] font-bold tracking-[0.14em] text-black">EVENT</span>
      </div>
      <div className="p-5">
        <p className="text-xs text-white/60">{formatDate(item.published_at ?? item.created_at)}</p>
        <h3 className="mt-2 text-xl font-bold leading-tight tracking-[-0.04em]">{item.title}</h3>
        {item.excerpt && <p className="mt-3 text-sm leading-relaxed text-white/65 line-clamp-2">{item.excerpt}</p>}
      </div>
    </article>
  );
}

function EmptyState({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`border border-dashed px-6 py-12 text-center text-sm ${dark ? "border-white/20 text-white/60" : "border-black/20 text-[#6e6a62]"}`}>{children}</div>;
}

export default function LandingPage({
  newsItems,
  featuredNewsItems,
  featuredDestinations,
  eventItems,
  newsTotalCount,
  newsUnavailable,
}: LandingPageProps) {
  const [lead, ...supportingNews] = newsItems;

  return (
    <div className="bg-[#f5f2eb] text-[#171717]">
      <section className="border-b border-black/15 px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <Eyebrow>MEDIA LOKAL GORONTALO</Eyebrow>
              <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[0.88] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
                Cerita baik, kabar penting, dan tempat yang layak ditemukan.
              </h1>
            </div>
            <div className="border-l-0 border-black/15 pl-0 lg:border-l lg:pl-8">
              <p className="max-w-lg text-lg leading-relaxed text-[#68635a]">
                Gorontalo Unite merangkum denyut kota, orang-orangnya, dan pengalaman yang membuat Gorontalo terasa lebih dekat.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/berita" className="bg-[#171717] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f6900]">Baca berita terbaru</Link>
                <Link href="/wisata" className="border border-black/20 px-5 py-3 text-sm font-bold transition hover:border-[#8f6900] hover:text-[#8f6900]">Jelajahi City Guide</Link>
                <Link href="/chat" className="px-3 py-3 text-sm font-bold text-[#8f6900] hover:text-black">Tanya AI ↗</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 border-y border-black/15 sm:mt-16 sm:grid-cols-4">
            {["BERITA TERKURASI", "CITY GUIDE", "EVENT LOKAL", "UNTOLD STORY"].map((label, index) => (
              <div key={label} className={`py-4 text-center text-[10px] font-bold tracking-[0.18em] ${index < 3 ? "border-r border-black/15" : ""}`}>{label}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="SOROTAN HARI INI" title="Kabar utama" href="/berita" />
          {lead ? (
            <div className="grid gap-0 border border-black/15 lg:grid-cols-[1.5fr_0.9fr]">
              <LeadStory item={lead} />
              <div className="bg-white px-5 py-2 sm:px-7">
                {supportingNews.length ? supportingNews.slice(0, 4).map((item) => <CompactStory key={item.id} item={item} />) : <EmptyState>Berita lain sedang disiapkan.</EmptyState>}
              </div>
            </div>
          ) : <EmptyState>{newsUnavailable ? "Berita belum dapat dimuat. Silakan coba lagi nanti." : "Belum ada berita yang dipublikasikan."}</EmptyState>}
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#171717] px-4 py-10 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-[-0.04em] sm:text-2xl">Terbaca minggu ini</h2>
            <Link href="/berita" className="text-xs font-semibold text-[#f5c400] hover:text-white">Pilihan pembaca ↗</Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {(newsItems.length ? newsItems : featuredNewsItems).slice(0, 4).map((item, index) => (
              <Link key={item.id} href={`/berita/${item.slug}`} className="group border border-white/15 bg-white/[0.06] p-4 transition hover:bg-[#f5c400] hover:text-black">
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#f5c400] group-hover:text-black/70">0{index + 1}</span>
                <h3 className="mt-4 text-sm font-bold leading-snug">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="PILIHAN REDAKSI" title="Direkomendasikan untuk Anda" href="/berita" />
          {featuredNewsItems.length ? (
            <div className="space-y-4">
              {featuredNewsItems.map((item) => <EditorialStory key={item.id} item={item} />)}
            </div>
          ) : <EmptyState>Artikel pilihan akan tampil setelah ditandai oleh redaksi.</EmptyState>}
          <div className="mt-8 text-center sm:hidden"><Link href="/berita" className="text-sm font-bold text-[#8f6900]">Lihat semua berita →</Link></div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="CITY GUIDE" title="Jelajahi Gorontalo" href="/wisata" action="Lihat City Guide" />
          {featuredDestinations.length ? (
            <div className="grid gap-4 md:grid-cols-3">{featuredDestinations.map((item) => <DestinationCard key={item.id} item={item} />)}</div>
          ) : <EmptyState>Destinasi pilihan akan segera hadir.</EmptyState>}
        </div>
      </section>

      <section className="bg-[#171717] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="KALENDER KOTA" title="Event yang akan datang" href="/event" action="Lihat semua event" dark />
          {eventItems.length ? (
            <div className="grid gap-4 md:grid-cols-3">{eventItems.map((item) => <EventCard key={item.id} item={item} />)}</div>
          ) : <EmptyState dark>Agenda event akan hadir setelah dipublikasikan.</EmptyState>}
        </div>
      </section>

      <section className="border-t border-black/15 px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-[#68635a]">{newsTotalCount} artikel telah dipilih dan disajikan oleh Gorontalo Unite.</p>
          <Link href="/chat" className="inline-flex w-fit items-center gap-2 bg-[#f5c400] px-5 py-3 text-sm font-bold text-black transition hover:bg-black hover:text-white">Tanya AI Gorontalo <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
