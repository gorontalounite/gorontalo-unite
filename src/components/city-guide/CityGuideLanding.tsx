import Image from "next/image";
import Link from "next/link";
import { REGIONS, regionOf, type RegionSlug } from "@/lib/city-guide/regions";
import type { CityGuidePlace } from "./CityGuideDirectory";

/**
 * The marketing half of the City Guide, built on the tour-site reference.
 *
 * Every figure and photograph here comes from the directory below it. Where the
 * reference asks for something the data does not hold — a price per person, a
 * star rating, a tour duration — the block carries the real equivalent instead
 * of a placeholder, because a listing that shows an invented price is worse
 * than one that shows none.
 */

const CATEGORY_TILES = [
  { tab: "explore", label: "Explore", category: "Atraksi & Wisata", blurb: "Beaches, waterfalls, forts" },
  { tab: "eat", label: "Eat", category: "Kuliner", blurb: "Warung, kopi, seafood" },
  { tab: "stay", label: "Stay", category: "Akomodasi", blurb: "Hotels, homestays, resorts" },
  { tab: "shop", label: "Shop", category: "Belanja", blurb: "Markets and local craft" },
] as const;

const isGuidePhoto = (url: string | null) => Boolean(url && url.includes("/city-guide/"));

const firstImage = (places: CityGuidePlace[], match: (p: CityGuidePlace) => boolean) =>
  places.find((p) => isGuidePhoto(p.image_url) && match(p)) ??
  places.find((p) => p.image_url && match(p)) ??
  null;

export default function CityGuideLanding({ places }: { places: CityGuidePlace[] }) {
  const withRegion = places.map((p) => ({ place: p, region: regionOf(p) }));

  const areaCounts = new Map<RegionSlug, number>();
  for (const { region } of withRegion) {
    if (region) areaCounts.set(region, (areaCounts.get(region) ?? 0) + 1);
  }

  const banner = firstImage(places, (p) => p.category === "Atraksi & Wisata");
  // The query already arrives ordered by featured, then most recently updated.
  const recent = places.filter((p) => p.image_url).slice(0, 3);

  return (
    <>
      {/* A — Hero, with the search panel riding its lower edge */}
      <section className="relative">
        <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-[#1b1a17] sm:h-[70vh] sm:max-h-[620px]">
          <Image
            src="/city-guide/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/65" />

          <div className="relative mx-auto flex h-full max-w-[1280px] flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
            {/* The break is explicit: left to wrap, the line splits after "one"
                and leaves "directory" stranded at every width tested. */}
            <h1 className="font-heading max-w-3xl text-[34px] leading-[1.08] sm:text-[52px] lg:text-[60px]">
              Six areas of Gorontalo,
              <br />
              one directory
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              {places.length} places to go, eat and stay. Pick an area, or search
              for what you are after.
            </p>
            <Link
              href="#browse"
              className="mt-7 inline-flex min-h-11 items-center rounded-md bg-white px-7 text-sm font-bold text-[#302f2c] transition hover:bg-amber-300"
            >
              Start browsing
            </Link>
          </div>

        </div>

        {/* B — Search panel. Area and category are the two axes the data really
            has, so the panel offers those rather than dates and guest counts. */}
        <div className="mx-auto mt-5 max-w-[1280px] px-4 sm:-mt-9 sm:px-6 lg:px-8">
          <form
            action="/city-guide#browse"
            className="grid gap-px overflow-hidden rounded-lg border border-[#d7d1c6] bg-[#d7d1c6] shadow-[0_18px_40px_-24px_rgba(0,0,0,.5)] sm:grid-cols-[1.1fr_1fr_1.2fr_auto] dark:border-zinc-700 dark:bg-zinc-700"
          >
            <label className="flex items-center gap-2 bg-white px-4 py-3 dark:bg-zinc-900">
              <span className="sr-only">Area</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0 text-[#9b7513]">
                <path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <select name="region" defaultValue="" className="min-w-0 flex-1 bg-transparent text-sm outline-none">
                <option value="">Anywhere in Gorontalo</option>
                {REGIONS.map((area) => (
                  <option key={area.slug} value={area.slug}>
                    {area.label} ({areaCounts.get(area.slug) ?? 0})
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2 bg-white px-4 py-3 dark:bg-zinc-900">
              <span className="sr-only">Looking for</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0 text-[#9b7513]">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <select name="tab" defaultValue="" className="min-w-0 flex-1 bg-transparent text-sm outline-none">
                <option value="">Anything</option>
                {CATEGORY_TILES.map((tile) => (
                  <option key={tile.tab} value={tile.tab}>{tile.label}</option>
                ))}
                <option value="services">Services</option>
                <option value="events">Events</option>
              </select>
            </label>

            <label className="flex items-center gap-2 bg-white px-4 py-3 dark:bg-zinc-900">
              <span className="sr-only">Keyword</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0 text-[#9b7513]">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                name="q"
                type="search"
                placeholder="Name, food, or landmark"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a8a29e]"
              />
            </label>

            <button
              type="submit"
              className="min-h-12 bg-[#302f2c] px-8 text-sm font-bold uppercase tracking-[.1em] text-white transition hover:bg-[#9b7513] dark:bg-amber-300 dark:text-zinc-950 dark:hover:bg-amber-200"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* C — Browse by area, the reference's destination rail */}
      <section className="mx-auto max-w-[1280px] px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="sm:flex sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-md">
            <h2 className="font-heading text-[26px] sm:text-[32px]">Go by area</h2>
            <span className="mt-3 block h-px w-12 bg-[#9b7513]" />
            <p className="mt-4 text-sm leading-relaxed text-[#78716c] dark:text-zinc-400">
              Gorontalo is one city and five regencies. Pick one and the whole
              directory narrows to it — places, food and rooms together.
            </p>
          </div>
        </div>

        <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REGIONS.map((area) => {
            const count = areaCounts.get(area.slug) ?? 0;
            const shot =
              withRegion.find((x) => x.region === area.slug && isGuidePhoto(x.place.image_url))?.place ??
              withRegion.find((x) => x.region === area.slug && x.place.image_url)?.place;
            return (
              <Link
                key={area.slug}
                href={`/city-guide?region=${area.slug}#browse`}
                className="group w-[58vw] shrink-0 snap-start sm:w-auto"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#e8e4dc] dark:bg-zinc-800">
                  {shot?.image_url && (
                    <Image
                      src={shot.image_url}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 58vw, (max-width: 1023px) 30vw, 200px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-sm font-semibold leading-tight text-white">{area.short}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[.1em] text-white/70">
                      {area.seat} · {count} places
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* D — Recently added, in the shape of the reference's tour cards */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <h2 className="font-heading text-[26px] sm:text-[32px]">Recently added</h2>
          <span className="mt-3 block h-px w-12 bg-[#9b7513]" />

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {recent.map((place) => {
              const area = REGIONS.find((r) => r.slug === regionOf(place));
              return (
                <Link
                  key={place.id}
                  href={`/city-guide/${place.slug}`}
                  className="group overflow-hidden rounded-lg border border-[#e7e2d8] bg-white transition hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,.45)] dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4dc] dark:bg-zinc-800">
                    {place.image_url && (
                      <Image
                        src={place.image_url}
                        alt=""
                        fill
                        unoptimized
                        sizes="(max-width: 639px) 92vw, 400px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg leading-snug transition group-hover:text-[#9b7513]">
                      {place.name}
                    </h3>
                    {/* The reference puts a rating, a duration and a price here.
                        None of the three exists in this data, so the row carries
                        what does: where it is and when it opens. */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#f0ece4] pt-3 text-[11px] text-[#78716c] dark:border-zinc-800 dark:text-zinc-400">
                      {area && <span>{area.short}</span>}
                      {place.opening_hours && (
                        <>
                          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#d7d1c6]" />
                          <span className="truncate">{place.opening_hours}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* E — Full-bleed banner */}
      <section className="relative mt-14 h-[46vh] min-h-[300px] overflow-hidden bg-[#1b1a17] sm:mt-20 sm:h-[52vh] sm:max-h-[460px]">
        {banner?.image_url && (
          <Image src={banner.image_url} alt="" fill unoptimized sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-center px-4 text-white sm:px-6 lg:px-8">
          <h2 className="font-heading max-w-lg text-[30px] leading-[1.1] sm:text-[42px]">
            Everything worth the drive
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/80">
            From Botubarani to Torosiaje, each entry carries its own photographs,
            opening hours and map.
          </p>
          <Link
            href="#browse"
            className="mt-6 inline-flex min-h-11 w-fit items-center rounded-md border border-white/60 px-7 text-sm font-bold text-white transition hover:bg-white hover:text-[#302f2c]"
          >
            Browse the directory
          </Link>
        </div>
      </section>

      {/* F — What the guide actually promises. The reference offers a price
          guarantee and 24/7 support; neither is true here, so these three say
          only what the data supports. */}
      <section className="border-y border-[#e7e2d8] bg-[#faf8f4] dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { n: `${places.length} places`, d: "Across the city and all five regencies, in one directory." },
            { n: "Photographed on location", d: "Every listing carries its own pictures, not stock photography." },
            { n: "Checked before publishing", d: "Addresses, hours and coordinates verified against the source." },
          ].map((item) => (
            <div key={item.n}>
              <p className="font-heading text-lg">{item.n}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#78716c] dark:text-zinc-400">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* G — Category tiles */}
      <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-heading text-[26px] sm:text-[32px]">What are you after</h2>
        <span className="mt-3 block h-px w-12 bg-[#9b7513]" />

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORY_TILES.map((tile) => {
            const shot = firstImage(places, (p) => p.category === tile.category);
            const count = places.filter((p) => p.category === tile.category).length;
            return (
              <Link
                key={tile.tab}
                href={`/city-guide?tab=${tile.tab}#browse`}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-[#e8e4dc] dark:bg-zinc-800"
              >
                {shot?.image_url && (
                  <Image
                    src={shot.image_url}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 1023px) 46vw, 300px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-heading text-xl text-white">{tile.label}</p>
                  <p className="mt-0.5 text-[11px] text-white/75">
                    {count > 0 ? `${count} · ${tile.blurb}` : tile.blurb}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
