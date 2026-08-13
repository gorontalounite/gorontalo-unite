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
  featuredDestinations: DestinationItem[];
  eventItems: NewsItem[];
}

function formatDate(date: string | null): string {
  if (!date) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
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

function DestinationCard({ item }: { item: DestinationItem }) {
  return (
    <Link href={item.id.startsWith("demo-destination-") ? "/wisata" : `/wisata/${item.slug}`} className="group relative min-h-[340px] overflow-hidden bg-[#181818] text-white sm:min-h-[420px]">
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
      <Link href={item.id.startsWith("demo-event-") ? "/event" : `/berita/${item.slug}`} className="absolute inset-0 z-10" aria-label={item.title} />
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

const DUMMY_DESTINATIONS: DestinationItem[] = [
  ["olele", "Taman Laut Olele", "Atraksi & Wisata", "Bone Bolango"],
  ["botubarani", "Hiu Paus Botubarani", "Atraksi & Wisata", "Bone Bolango"],
  ["lake-limboto", "Danau Limboto", "Atraksi & Wisata", "Kabupaten Gorontalo"],
  ["saronde", "Pulau Saronde", "Atraksi & Wisata", "Gorontalo Utara"],
  ["tilamuta", "Pantai Tilamuta", "Atraksi & Wisata", "Boalemo"],
  ["pulo-cinta", "Pulo Cinta", "Akomodasi", "Boalemo"],
].map(([slug, name, category, location], index) => ({
  id: `demo-destination-${index}`,
  slug,
  name,
  category,
  location,
  opening_hours: "Detail kunjungan segera hadir",
  description: "Contoh tampilan City Guide Gorontalo. Informasi lengkap akan ditambahkan oleh redaksi.",
  image_url: null,
}));

const DUMMY_EVENTS: NewsItem[] = [
  "Festival Karawo Gorontalo", "Pekan Budaya Hulonthalo", "Gorontalo Creative Market",
  "Festival Teluk Tomini", "Lari 10K Gorontalo", "Panggung Musik di Kota",
].map((title, index) => ({
  id: `demo-event-${index}`,
  title,
  slug: `agenda-gorontalo-${index + 1}`,
  excerpt: "Contoh kartu agenda. Detail waktu, lokasi, dan pendaftaran akan tersedia setelah event dipublikasikan.",
  image_url: null,
  category: "Event",
  published_at: null,
  created_at: new Date().toISOString(),
}));

export default function LandingPage({
  featuredDestinations,
  eventItems,
}: LandingPageProps) {
  const destinationsToShow = [...featuredDestinations, ...DUMMY_DESTINATIONS].slice(0, 6);
  const eventsToShow = [...eventItems, ...DUMMY_EVENTS].slice(0, 6);

  return (
    <div className="bg-[#f5f2eb] text-[#171717]">
      <section className="border-b border-black/15 px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <Eyebrow>GORONTALO UNITE MEDIAHUB</Eyebrow>
              <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[0.88] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
                Spreading good news and happiness from Gorontalo! Follow for positive vibes and fun updates.
              </h1>
            </div>
            <div className="border-l-0 border-black/15 pl-0 lg:border-l lg:pl-8">
              <p className="max-w-lg text-lg leading-relaxed text-[#68635a]">
                Berita, city guide, dan event untuk mengenal Gorontalo melalui cerita-cerita yang dekat dengan keseharian.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/berita" className="bg-[#171717] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f6900]">Explore Gorontalo</Link>
                <Link href="/wisata" className="border border-black/20 px-5 py-3 text-sm font-bold transition hover:border-[#8f6900] hover:text-[#8f6900]">City Guide</Link>
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

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="CITY GUIDE" title="Jelajahi Gorontalo" href="/wisata" action="Lihat City Guide" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{destinationsToShow.map((item) => <DestinationCard key={item.id} item={item} />)}</div>
        </div>
      </section>

      <section className="bg-[#171717] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="KALENDER KOTA" title="Event yang akan datang" href="/event" action="Lihat semua event" dark />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{eventsToShow.map((item) => <EventCard key={item.id} item={item} />)}</div>
        </div>
      </section>

    </div>
  );
}
