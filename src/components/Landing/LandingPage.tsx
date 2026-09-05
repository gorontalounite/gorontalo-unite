import Image from "next/image";
import Link from "next/link";

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  category?: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  image_url?: string | null;
  category?: string | null;
  published_at?: string | null;
  created_at?: string | null;
}

export interface DestinationItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  category?: string | null;
  location?: string | null;
  opening_hours?: string | null;
}

interface LandingPageProps {
  newsItems: NewsItem[];
  featuredNewsItems: NewsItem[];
  featuredDestinations: DestinationItem[];
  newsTotalCount: number;
  newsUnavailable: boolean;
}

const services = [
  {
    number: "01",
    title: "AI Automation",
    description:
      "Merapikan pekerjaan berulang menjadi alur yang lebih cepat, terukur, dan tetap mudah dikendalikan oleh tim Anda.",
    deliverables: ["Workflow automation", "Content operations", "Reporting & routing"],
    accent: "#F5C400",
  },
  {
    number: "02",
    title: "Social Media Management",
    description:
      "Strategi kanal, kalender konten, publikasi, dan evaluasi yang dibangun sebagai satu sistem komunikasi yang konsisten.",
    deliverables: ["Channel strategy", "Editorial calendar", "Publishing & reporting"],
    accent: "#FF7A45",
  },
  {
    number: "03",
    title: "Full-Service Content Production",
    description:
      "Produksi konten dari pengembangan ide hingga hasil akhir untuk kebutuhan brand, organisasi, kampanye, dan platform digital.",
    deliverables: ["Creative concept", "Photo & video", "Design & post-production"],
    accent: "#B986FF",
  },
  {
    number: "04",
    title: "Brand & Creator Partnership",
    description:
      "Mempertemukan brand dengan kreator dan komunitas yang relevan, lalu mengelola kolaborasinya dari brief hingga laporan.",
    deliverables: ["Creator matching", "Campaign activation", "Partnership management"],
    accent: "#50CFA7",
  },
];

const capabilities = [
  "Strategi & kampanye digital",
  "Distribusi konten lokal",
  "Insight & performance reporting",
  "Creative direction",
];

function ArrowIcon({ dark = false }: { dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 ${dark ? "bg-white text-black" : "bg-black text-white"}`}
    >
      ↗
    </span>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-5 text-xs font-semibold uppercase tracking-[0.24em] ${light ? "text-white/55" : "text-black/48"}`}>
      {children}
    </p>
  );
}

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <Link
      href={`/${item.slug}`}
      className={`group grid overflow-hidden rounded-[22px] border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-zinc-950 ${featured ? "md:grid-cols-2" : ""}`}
    >
      <div className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 ${featured ? "aspect-[16/10] md:aspect-auto md:min-h-[430px]" : "aspect-[16/10]"}`}>
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes={featured ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,196,0,0.42),transparent_38%),linear-gradient(135deg,#252525,#0b0b0b)]" />
        )}
      </div>
      <div className={`flex flex-col ${featured ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6"}`}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="rounded-full bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white dark:bg-white dark:text-black">
            {item.category || "Berita"}
          </span>
          <span className="text-xs text-black/45 dark:text-white/45">
            {formatDate(item.published_at || item.created_at)}
          </span>
        </div>
        <h3 className={`font-display font-semibold leading-[1.08] tracking-[-0.035em] text-black dark:text-white ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-black/58 dark:text-white/58">
            {item.excerpt}
          </p>
        )}
        <span className="group mt-auto flex items-center justify-between pt-8 text-xs font-semibold uppercase tracking-[0.16em] text-black dark:text-white">
          Baca artikel
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function DestinationCard({ item }: { item: DestinationItem }) {
  return (
    <Link
      href={`/wisata/${item.slug}`}
      className="group relative min-h-[390px] overflow-hidden rounded-[22px] bg-zinc-800"
    >
      {item.image_url ? (
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(245,196,0,0.42),transparent_35%),linear-gradient(145deg,#222,#050505)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
          {item.category || "City Guide"}
        </p>
        <div className="flex items-end justify-between gap-5">
          <div>
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.025em]">{item.name}</h3>
            {item.location && <p className="mt-2 text-xs text-white/60">{item.location}</p>}
          </div>
          <ArrowIcon dark />
        </div>
      </div>
    </Link>
  );
}

export default function LandingPage({
  newsItems,
  featuredNewsItems,
  featuredDestinations,
  newsTotalCount,
  newsUnavailable,
}: LandingPageProps) {
  const leadNews = featuredNewsItems[0] ?? newsItems[0];
  const remainingNews = [...featuredNewsItems.slice(1), ...newsItems]
    .filter((item, index, items) => item.id !== leadNews?.id && items.findIndex((candidate) => candidate.id === item.id) === index)
    .slice(0, 4);

  return (
    <main className="overflow-hidden bg-stone-100 text-black dark:bg-zinc-950 dark:text-white">
      <section className="relative isolate min-h-[690px] overflow-hidden bg-black text-white sm:min-h-[760px]">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_-10%,rgba(245,196,0,0.22),transparent_34%),radial-gradient(circle_at_84%_72%,rgba(255,122,69,0.15),transparent_24%)]" />
        <div className="absolute inset-0 -z-10 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.34)_0.7px,transparent_0.7px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

        <div className="mx-auto flex max-w-7xl flex-col items-center px-5 pb-20 pt-24 text-center sm:px-8 sm:pt-32 lg:px-10">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/65 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[#F5C400] shadow-[0_0_15px_#F5C400]" />
            Media · Creative · Automation
          </div>
          <h1 className="max-w-5xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Cerita lokal. Sistem digital. <span style={{ color: "#F5C400" }}>Dampak yang terasa.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/58 sm:leading-8">
            Gorontalo Unite memadukan kekuatan media lokal, produksi kreatif, kolaborasi, dan automasi praktis untuk membantu brand serta organisasi bekerja dan berkomunikasi lebih baik.
          </p>
          <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <Link href="/about#kontak" className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-full bg-[#F5C400] px-6 text-sm font-semibold text-black transition hover:bg-[#ffda3f]">
              Diskusikan kebutuhan <span aria-hidden="true">↗</span>
            </Link>
            <Link href="#layanan" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-6 text-sm font-medium text-white transition hover:bg-white/10">
              Lihat layanan
            </Link>
          </div>

          <div className="relative mt-16 w-full max-w-5xl rounded-[26px] border border-white/14 bg-white/[0.055] p-3 text-left shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-5">
            <div className="grid gap-2.5 md:grid-cols-4">
              {[
                ["01", "Brief", "Tujuan dan kebutuhan"],
                ["02", "Strategy", "Arah yang jelas"],
                ["03", "Production", "Eksekusi menyeluruh"],
                ["04", "Distribution", "Tayang dan terukur"],
              ].map(([number, title, caption], index) => (
                <div key={number} className="relative rounded-[18px] border border-white/10 bg-black/35 p-5 sm:p-6">
                  {index < 3 && <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-sm text-yellow-400 md:block">→</span>}
                  <span className="text-xs font-semibold tracking-[0.18em] text-yellow-400">{number}</span>
                  <p className="mt-8 font-display text-xl font-semibold tracking-[-0.02em]">{title}</p>
                  <p className="mt-1 text-xs text-white/42">{caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-y border-white/10 bg-white/[0.035] py-4">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            {services.map((service) => (
              <span key={service.number} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full" style={{ background: service.accent }} />
                {service.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionLabel>Tantangan yang kami pahami</SectionLabel>
            <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-5xl">
              Ide bagus sering tersendat di antara strategi dan eksekusi.
            </h2>
          </div>
          <div className="divide-y divide-black/12 border-y border-black/12 dark:divide-white/12 dark:border-white/12">
            {[
              ["01", "Konten tidak konsisten", "Tim memiliki banyak hal untuk disampaikan, tetapi ritme, format, dan kualitasnya sulit dijaga."],
              ["02", "Eksekusi tersebar", "Strategi, produksi, publikasi, dan kolaborasi berjalan sendiri-sendiri tanpa satu arah yang sama."],
              ["03", "Pekerjaan berulang menyita waktu", "Proses manual membuat tim sibuk pada tugas rutin dan kehilangan ruang untuk pekerjaan bernilai tinggi."],
            ].map(([number, title, description]) => (
              <div key={number} className="grid gap-4 py-7 sm:grid-cols-3 sm:items-start sm:gap-6">
                <span className="text-xs font-semibold text-black/32 dark:text-white/32">{number}</span>
                <h3 className="font-display text-xl font-semibold tracking-[-0.025em]">{title}</h3>
                <p className="text-sm leading-7 text-black/55 dark:text-white/55">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="layanan" className="bg-black py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-14 grid gap-7 md:grid-cols-2 md:items-end">
            <div>
              <SectionLabel light>Layanan Gorontalo Unite</SectionLabel>
              <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
                Satu partner untuk strategi, produksi, dan pertumbuhan digital.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/52 md:justify-self-end">
              Setiap kebutuhan dapat dimulai sebagai proyek terfokus atau dirangkai menjadi dukungan menyeluruh sesuai kapasitas tim Anda.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.number} className="group relative overflow-hidden rounded-[24px] border border-white/12 bg-zinc-900 p-6 transition duration-300 hover:border-white/24 sm:p-9">
                <div className="absolute -right-24 -top-24 size-56 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-15" style={{ background: service.accent }} />
                <div className="relative">
                  <div className="mb-16 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.18em]" style={{ color: service.accent }}>{service.number}</span>
                    <span className="size-2 rounded-full" style={{ background: service.accent }} />
                  </div>
                  <h3 className="max-w-lg font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">{service.title}</h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/52">{service.description}</p>
                  <div className="mt-9 flex flex-wrap gap-2">
                    {service.deliverables.map((item) => (
                      <span key={item} className="rounded-full border border-white/12 px-3.5 py-2 text-xs font-medium text-white/60">{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 grid overflow-hidden rounded-[24px] border border-white/12 md:grid-cols-2">
            <div className="border-b border-white/12 bg-[#F5C400] p-7 text-black md:border-b-0 md:border-r sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Kapabilitas pendukung</p>
              <h3 className="mt-12 font-display text-3xl font-semibold leading-tight tracking-[-0.035em]">Dibangun sesuai kebutuhan, bukan paket yang kaku.</h3>
            </div>
            <div className="grid sm:grid-cols-2">
              {capabilities.map((capability, index) => (
                <div key={capability} className="flex min-h-28 items-end justify-between border-white/10 p-6 odd:border-b even:border-b sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <span className="max-w-[210px] font-display text-lg font-medium">{capability}</span>
                  <span className="text-xs text-white/35">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mb-14 grid gap-7 md:grid-cols-2 md:items-end">
          <div>
            <SectionLabel>Cara kami bekerja</SectionLabel>
            <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">Jelas dari awal.<br />Luwes saat berjalan.</h2>
          </div>
          <p className="text-sm leading-7 text-black/55 dark:text-white/55">Kami memulai dari konteks bisnis, lalu menyusun bentuk kerja yang realistis untuk target, waktu, dan sumber daya Anda.</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[24px] border border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/10 md:grid-cols-3">
          {[
            ["01", "Discover", "Memahami tujuan, audiens, hambatan, aset, dan cara kerja yang sudah ada."],
            ["02", "Design", "Menyusun strategi, ruang lingkup, sistem kerja, serta ukuran keberhasilan yang relevan."],
            ["03", "Deliver & improve", "Menjalankan pekerjaan, membaca hasil, dan menyempurnakan proses secara berkala."],
          ].map(([number, title, description]) => (
            <article key={number} className="min-h-[310px] bg-stone-100 p-7 dark:bg-zinc-950 sm:p-9">
              <span className="text-xs font-semibold tracking-[0.2em] text-black/35 dark:text-white/35">{number}</span>
              <div className="mt-28">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/55 dark:text-white/55">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white py-24 dark:border-white/10 dark:bg-zinc-950 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>Media</SectionLabel>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Berita terbaru</h2>
              <p className="mt-4 text-sm text-black/50 dark:text-white/50">
                {newsUnavailable ? "Berita belum dapat dimuat." : `${newsTotalCount} cerita dari dan untuk Gorontalo.`}
              </p>
            </div>
            <Link href="/" className="group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em]">All news <ArrowIcon /></Link>
          </div>

          {!leadNews ? (
            <div className="rounded-[22px] border border-dashed border-black/15 px-6 py-20 text-center text-sm text-black/45 dark:border-white/15 dark:text-white/45">Belum ada berita untuk ditampilkan.</div>
          ) : (
            <div className="grid gap-4">
              <NewsCard item={leadNews} featured />
              {remainingNews.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {remainingNews.map((item) => <NewsCard key={item.id} item={item} />)}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {featuredDestinations.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>City Guide</SectionLabel>
              <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">Temukan Gorontalo lebih dekat.</h2>
            </div>
            <Link href="/wisata" className="group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em]">Jelajahi tempat <ArrowIcon /></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredDestinations.map((item) => <DestinationCard key={item.id} item={item} />)}
          </div>
        </section>
      )}

      <section className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="relative mx-auto max-w-[1480px] overflow-hidden rounded-[28px] bg-[#F5C400] px-6 py-20 text-black sm:px-10 sm:py-28 lg:px-20">
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(0,0,0,0.45)_0.7px,transparent_0.7px)] [background-size:19px_19px] [mask-image:linear-gradient(90deg,transparent,black)]" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-black/52">Mulai dari percakapan</p>
              <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Ada kebutuhan yang ingin dibuat lebih jelas dan berjalan lebih baik?</h2>
            </div>
            <Link href="/about#kontak" className="group inline-flex min-h-14 items-center justify-between gap-10 rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 lg:min-w-56">
              Hubungi kami <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
