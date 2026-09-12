import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AREA_PROFILES } from "@/lib/city-guide/area-facts";
import { REGIONS, regionOf, type RegionSlug } from "@/lib/city-guide/regions";

export const dynamic = "force-dynamic";

const isArea = (slug: string): slug is RegionSlug =>
  Object.prototype.hasOwnProperty.call(AREA_PROFILES, slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isArea(slug)) return {};
  const area = AREA_PROFILES[slug];
  return {
    title: `${area.name} | City Guide | Gorontalo Unite`,
    description: area.tagline,
    alternates: { canonical: `/city-guide/area/${slug}` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isArea(slug)) notFound();

  const area = AREA_PROFILES[slug];
  const region = REGIONS.find((r) => r.slug === slug)!;

  const supabase = await createClient();
  const { data } = await supabase
    .from("tourism_places")
    .select("id,name,slug,description,image_url,category,location,address")
    .eq("published", true)
    .order("updated_at", { ascending: false });

  const inArea = (data ?? []).filter((p) => regionOf(p) === slug);
  const byCategory = (category: string) => inArea.filter((p) => p.category === category).length;
  const showcase = inArea.filter((p) => p.image_url).slice(0, 6);

  const borders: [string, string][] = [
    ["North", area.borders.north],
    ["South", area.borders.south],
    ["East", area.borders.east],
    ["West", area.borders.west],
  ];

  return (
    <main className="bg-white text-[#302f2c] dark:bg-zinc-950 dark:text-zinc-50">
      {/* Masthead */}
      <section className="relative h-[46vh] min-h-[300px] overflow-hidden bg-[#1b1a17] sm:h-[52vh] sm:max-h-[460px]">
        <Image
          src={`/city-guide/areas/${slug}.webp`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-4 pb-8 text-white sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[.14em] text-white/70">
            <Link href="/city-guide" className="hover:text-white">City Guide</Link>
            <span className="px-2">/</span>
            <span>{region.short}</span>
          </nav>
          <h1 className="font-heading mt-3 text-[32px] leading-[1.08] sm:text-[46px]">{area.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">{area.tagline}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_20rem] lg:gap-12">
          <div>
            <h2 className="font-heading text-[24px] sm:text-[28px]">About {region.short}</h2>
            <span className="mt-3 block h-px w-12 bg-[#9b7513]" />
            {area.about.map((p) => (
              <p key={p} className="mt-4 text-[15px] leading-relaxed text-[#57534e] dark:text-zinc-300">{p}</p>
            ))}

            <h2 className="font-heading mt-10 text-[24px] sm:text-[28px]">Geography</h2>
            <span className="mt-3 block h-px w-12 bg-[#9b7513]" />
            {area.geography.map((p) => (
              <p key={p} className="mt-4 text-[15px] leading-relaxed text-[#57534e] dark:text-zinc-300">{p}</p>
            ))}

            <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-[#e7e2d8] bg-[#e7e2d8] sm:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
              {borders.map(([side, value]) => (
                <div key={side} className="bg-white px-4 py-3 dark:bg-zinc-900">
                  <dt className="text-[10px] font-bold uppercase tracking-[.12em] text-[#9b7513]">{side}</dt>
                  <dd className="mt-1 text-sm">{value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="font-heading mt-10 text-[24px] sm:text-[28px]">History</h2>
            <span className="mt-3 block h-px w-12 bg-[#9b7513]" />
            {area.history.map((p) => (
              <p key={p} className="mt-4 text-[15px] leading-relaxed text-[#57534e] dark:text-zinc-300">{p}</p>
            ))}

            <p className="mt-8 text-xs leading-relaxed text-[#8a8378] dark:text-zinc-500">
              Figures on this page are drawn from the Wikipedia article{" "}
              <a
                href={area.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#9b7513]"
              >
                {area.sourceTitle}
              </a>
              . The wording is our own.
            </p>
          </div>

          {/* Quick facts */}
          <aside className="mt-10 lg:mt-0">
            <div className="rounded-lg border border-[#e7e2d8] bg-[#faf8f4] p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="font-heading text-lg">Quick facts</p>
              <dl className="mt-4 space-y-3">
                {area.facts.map((fact) => (
                  <div key={fact.label} className="border-t border-[#eee9df] pt-3 first:border-0 first:pt-0 dark:border-zinc-800">
                    <dt className="text-[10px] font-bold uppercase tracking-[.12em] text-[#9b7513]">{fact.label}</dt>
                    <dd className="mt-1 text-sm">{fact.value}</dd>
                  </div>
                ))}
                <div className="border-t border-[#eee9df] pt-3 dark:border-zinc-800">
                  <dt className="text-[10px] font-bold uppercase tracking-[.12em] text-[#9b7513]">In this guide</dt>
                  <dd className="mt-1 text-sm">
                    {inArea.length} places — {byCategory("Atraksi & Wisata")} to see,{" "}
                    {byCategory("Kuliner")} to eat, {byCategory("Akomodasi")} to stay
                  </dd>
                </div>
              </dl>

              <Link
                href={`/city-guide?region=${slug}#browse`}
                className="mt-5 flex min-h-11 items-center justify-center rounded-md bg-[#302f2c] px-5 text-xs font-bold uppercase tracking-[.1em] text-white transition hover:bg-[#9b7513] dark:bg-amber-300 dark:text-zinc-950"
              >
                See all {inArea.length} places
              </Link>
            </div>
          </aside>
        </div>

        {showcase.length > 0 && (
          <section className="mt-14">
            <h2 className="font-heading text-[24px] sm:text-[28px]">In {region.short}</h2>
            <span className="mt-3 block h-px w-12 bg-[#9b7513]" />
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
              {showcase.map((place) => (
                <Link key={place.id} href={`/city-guide/${place.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#e8e4dc] dark:bg-zinc-800">
                    {place.image_url && (
                      <Image
                        src={place.image_url}
                        alt=""
                        fill
                        unoptimized
                        sizes="(max-width: 639px) 46vw, 31vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h3 className="mt-3 text-[15px] font-bold leading-snug transition group-hover:text-[#9b7513] sm:text-base">
                    {place.name}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* The other five */}
        <section className="mt-14 border-t border-[#e7e2d8] pt-10 dark:border-zinc-800">
          <h2 className="font-heading text-[24px] sm:text-[28px]">The other areas</h2>
          <span className="mt-3 block h-px w-12 bg-[#9b7513]" />
          <div className="-mx-4 mt-6 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {REGIONS.filter((r) => r.slug !== slug).map((other) => (
              <Link key={other.slug} href={`/city-guide/area/${other.slug}`} className="group w-[48vw] shrink-0 snap-start sm:w-auto">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#e8e4dc] dark:bg-zinc-800">
                  <Image
                    src={`/city-guide/areas/${other.slug}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 48vw, 200px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-sm font-semibold leading-tight text-white">{other.short}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[.1em] text-white/70">{other.seat}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
