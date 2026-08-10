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
  newsTotalCount: number;
  newsUnavailable: boolean;
}

const fallbackImage = "/og-image.png";

function formatDate(value: string | null) {
  if (!value) return "Gorontalo Unite";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(value));
}

function Arrow({ light = false }: { light?: boolean }) {
  return <span className={`inline-flex size-9 items-center justify-center rounded-full border text-lg transition-transform group-hover:translate-x-1 ${light ? "border-white/30 text-white" : "border-black/20 text-black"}`} aria-hidden>↗</span>;
}

function NewsTile({ item, large = false }: { item: NewsItem; large?: boolean }) {
  return (
    <Link href={`/berita/${item.slug}`} className={`group relative isolate block overflow-hidden bg-zinc-900 ${large ? "min-h-[430px] md:min-h-[590px]" : "min-h-[330px]"}`}>
      <Image src={item.image_url || fallbackImage} alt="" fill sizes={large ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4c300]">{item.category || "Berita"} · {formatDate(item.published_at ?? item.created_at)}</p>
        <h3 className={`${large ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"} font-display font-semibold leading-[.98] uppercase`}>{item.title}</h3>
        {large && item.excerpt ? <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base line-clamp-2">{item.excerpt}</p> : null}
      </div>
    </Link>
  );
}

function EmptyTile({ label }: { label: string }) {
  return <div className="flex min-h-[330px] items-end bg-zinc-900 p-6 text-white"><p className="text-xs uppercase tracking-[0.2em] text-white/50">{label} segera hadir</p></div>;
}

export default function LandingPage({ newsItems, featuredNewsItems, featuredDestinations }: LandingPageProps) {
  const lead = newsItems[0] ?? featuredNewsItems[0];
  const otherNews = newsItems.filter((item) => item.id !== lead?.id).slice(0, 4);
  const editorial = featuredNewsItems.length ? featuredNewsItems : newsItems.slice(0, 3);

  return (
    <div className="overflow-hidden bg-black text-white">
      <section className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pb-14 lg:px-16">
        {lead ? <Image src={lead.image_url || fallbackImage} alt="" fill priority sizes="100vw" className="object-cover opacity-55" /> : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(244,195,0,.2),transparent_35%),linear-gradient(180deg,rgba(0,0,0,.3),#000_86%)]" />
        <div className="relative mx-auto w-full max-w-[1500px]">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#f4c300] md:text-xs">Berbagi Kabar Baik dari Gorontalo</p>
          <h1 className="max-w-6xl font-display text-[16vw] font-semibold uppercase leading-[.76] tracking-[-.07em] sm:text-[13vw] lg:text-[9.6vw]">
            Gorontalo<br /><span className="text-[#f4c300]">Unite</span>
          </h1>
          <div className="mt-9 flex flex-col justify-between gap-6 border-t border-white/25 pt-4 md:flex-row md:items-end">
            <p className="max-w-md text-base leading-relaxed text-white/75 md:text-lg">Media, City Guide, event, dan cerita baik dari Gorontalo.</p>
            <Link href="/berita" className="group flex items-center gap-4 self-start text-sm font-semibold uppercase tracking-[.16em] md:self-auto">Jelajahi kabar <Arrow light /></Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/15 bg-[#f4c300] px-5 py-16 text-black md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.25em]">Gorontalo Unite Mediahub</p><h2 className="mt-3 max-w-3xl font-display text-5xl font-semibold uppercase leading-[.86] tracking-[-.05em] md:text-7xl">Satu tempat untuk menemukan Gorontalo.</h2></div>
            <p className="max-w-sm text-sm leading-relaxed">Kabar yang dipilih, tempat yang layak dikunjungi, dan agenda yang perlu diketahui.</p>
          </div>
          <div className="grid border-t border-black/30 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Berita", "Kabar penting dari daerah dan warganya.", "/berita"],
              ["02", "City Guide", "Temukan tujuan dan pengalaman lokal.", "/wisata"],
              ["03", "Event", "Agenda kreatif, budaya, dan komunitas.", "/event"],
              ["04", "Untold Story", "Inspire, Insight, dan Interest.", "/berita"],
            ].map(([number, title, description, href]) => <Link key={title} href={href} className="group border-b border-r border-black/30 p-6 transition-colors hover:bg-black hover:text-white md:min-h-64">
              <p className="text-xs font-bold tracking-widest">{number}</p><div className="mt-16 flex items-end justify-between"><div><h3 className="font-display text-3xl font-semibold uppercase">{title}</h3><p className="mt-3 max-w-[16rem] text-sm leading-relaxed opacity-70">{description}</p></div><Arrow /></div>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="bg-[#efede7] px-5 py-16 text-black md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex items-end justify-between border-b border-black/20 pb-4"><div><p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#a46e00]">Berita & Informasi</p><h2 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[-.05em] md:text-7xl">Kabar Terbaru</h2></div><Link href="/berita" className="text-sm font-semibold uppercase tracking-widest">Lihat semua →</Link></div>
          <div className="grid gap-3 lg:grid-cols-[1.15fr_.85fr]">
            {lead ? <NewsTile item={lead} large /> : <EmptyTile label="Berita" />}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{otherNews.length ? otherNews.map((item) => <NewsTile key={item.id} item={item} />) : <EmptyTile label="Berita" />}</div>
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-16 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 border-b border-white/20 pb-8 md:grid-cols-2 md:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#f4c300]">City Guide</p><h2 className="mt-3 font-display text-[13vw] font-semibold uppercase leading-[.78] tracking-[-.07em] md:text-[7vw]">Jelajahi<br />Gorontalo</h2></div><p className="max-w-md pb-2 text-base leading-relaxed text-white/60">Panduan untuk tempat tinggal, makan, bertualang, dan menikmati ritme kota serta kabupaten di Gorontalo.</p></div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">{featuredDestinations.length ? featuredDestinations.map((place) => <Link href={`/wisata/${place.slug}`} key={place.id} className="group relative min-h-[360px] overflow-hidden bg-zinc-900"><Image src={place.image_url || fallbackImage} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-75 transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#f4c300]">{place.category || "Destinasi"}</p><h3 className="mt-2 font-display text-3xl font-semibold uppercase leading-none">{place.name}</h3><p className="mt-2 text-sm text-white/60">{place.location || "Gorontalo"}</p></div></Link>) : ["Wisata", "Kuliner", "Akomodasi"].map((label) => <EmptyTile key={label} label={label} />)}</div>
          <div className="mt-7 text-right"><Link href="/wisata" className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[.16em]">Buka City Guide <Arrow light /></Link></div>
        </div>
      </section>

      <section className="bg-[#e6432f] px-5 py-16 text-black md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.28em]">Kalender Gorontalo</p><h2 className="mt-4 font-display text-[16vw] font-semibold uppercase leading-[.75] tracking-[-.08em] lg:text-[8vw]">Event</h2><p className="mt-7 max-w-sm text-base leading-relaxed">Agenda kota, perayaan budaya, pasar kreatif, dan pertemuan komunitas.</p></div><div className="grid gap-px border border-black/30 bg-black/30 sm:grid-cols-2">{[["Agenda budaya", "Lihat agenda yang sedang berjalan"], ["Kirim event", "Bagikan agenda komunitas Anda"]].map(([title, description]) => <Link key={title} href="/event" className="group bg-[#e6432f] p-7 transition-colors hover:bg-black hover:text-white"><p className="font-display text-3xl font-semibold uppercase">{title}</p><div className="mt-16 flex items-end justify-between"><p className="max-w-[13rem] text-sm opacity-75">{description}</p><Arrow /></div></Link>)}</div></div>
      </section>

      <section className="bg-[#efede7] px-5 py-16 text-black md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1500px]"><div className="mb-8 flex items-end justify-between border-b border-black/20 pb-4"><div><p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#a46e00]">Pilihan Redaksi</p><h2 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[-.05em] md:text-7xl">Cerita yang dipilih</h2></div><Link href="/berita" className="text-sm font-semibold uppercase tracking-widest">Baca semua →</Link></div><div className="grid gap-3 md:grid-cols-3">{editorial.length ? editorial.slice(0, 3).map((item) => <NewsTile key={item.id} item={item} />) : <EmptyTile label="Cerita" />}</div></div>
      </section>
    </div>
  );
}
