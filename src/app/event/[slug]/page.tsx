import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SectionHeading, { PAGE_TITLE_CLASS, SUBHEAD_CLASS } from "@/components/ui/SectionHeading";
import {
  EVENT_CATEGORIES, eventDayLong, fromEventRow, rupiah, SAMPLE_EVENTS, type EventItem,
} from "../data";

export const dynamic = "force-dynamic";

const SELECT =
  "id, slug, title, category, organizer, venue, address, starts_at, ends_at, image_url, description, registration_url, maps_url, featured, listing_details";

async function loadEvent(slug: string): Promise<EventItem | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("events").select(SELECT).eq("slug", slug).eq("published", true).maybeSingle();
  if (data) return fromEventRow(data as Record<string, unknown>);
  // The placeholders are only reachable while nothing real is published.
  const { count } = await supabase.from("events").select("id", { count: "exact", head: true }).eq("published", true);
  if ((count ?? 0) > 0) return null;
  return SAMPLE_EVENTS.find((event) => event.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) return { title: "Event" };
  return {
    title: event.title,
    description: event.description.slice(0, 160),
    alternates: { canonical: `/event/${event.slug}` },
  };
}

function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 opacity-70" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const PIN = "M12 21s7-5.2 7-12a7 7 0 10-14 0c0 6.8 7 12 7 12Z M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5Z";
const CAL = "M8 3v3M16 3v3M4 9h16M5 6h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z";
const TICKET = "M4 8a2 2 0 012-2h12a2 2 0 012 2v1.5a2.5 2.5 0 000 5V16a2 2 0 01-2 2H6a2 2 0 01-2-2v-1.5a2.5 2.5 0 000-5V8Z M14 6v12";

function BuyPanel({ event }: { event: EventItem }) {
  const available = !event.soldOut;
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-[13px] text-neutral-600 dark:text-neutral-300">
        {available ? "Tiket tersedia, beli sebelum kehabisan!" : "Tiket untuk acara ini sudah habis."}
      </p>
      {available && (
        event.registrationUrl ? (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block rounded-lg bg-[#1b4dd8] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#1741b8]"
          >
            Beli tiket sekarang
          </a>
        ) : (
          <p className="mt-3 rounded-lg bg-neutral-100 px-4 py-2.5 text-center text-sm font-semibold text-neutral-400 dark:bg-zinc-800">
            Tautan pembelian belum tersedia
          </p>
        )
      )}
    </div>
  );
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) notFound();

  const icon = EVENT_CATEGORIES.find((item) => item.label === event.category)?.icon ?? "🎫";
  const place = [event.venue, event.address].filter(Boolean).join(", ");

  return (
    <main className="min-h-screen bg-[#fafafa] pb-24 text-neutral-900 dark:bg-zinc-950 dark:text-white md:pb-12">
      {event.isSample && (
        <p className="bg-amber-100 px-4 py-2.5 text-center text-[13px] text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">
          Tampilan contoh. Acara, tanggal, dan harga di halaman ini bukan acara sungguhan.
        </p>
      )}

      {/* Hero */}
      <section className="bg-[#2b2b2b] text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[300px_minmax(0,1fr)] md:py-8">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#f4e2c2] to-[#e3c9a8] md:aspect-[3/4]">
            {event.imageUrl ? (
              <Image src={event.imageUrl} alt={event.title} fill priority unoptimized sizes="300px" className="object-cover" />
            ) : (
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-5xl opacity-70">{icon}</span>
            )}
          </div>

          <div className="min-w-0 self-start">
            <h1 className={`${PAGE_TITLE_CLASS} leading-tight`}>{event.title}</h1>
            <div className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-white/80">
              {place && <p className="flex gap-2"><Icon path={PIN} />{place}</p>}
              <p className="flex gap-2"><Icon path={CAL} />{eventDayLong(event.startsAt)}</p>
              {event.priceFrom !== null && (
                <p className="flex gap-2">
                  <Icon path={TICKET} />
                  {event.priceFrom === 0 ? "Gratis" : `Harga tiket mulai dari ${rupiah(event.priceFrom)}`}
                </p>
              )}
            </div>
            <div className="mt-5 max-w-sm rounded-lg bg-white/10 p-3">
              <p className="text-[13px] text-white/85">
                {event.soldOut ? "Tiket untuk acara ini sudah habis." : "Tiket tersedia, beli sebelum kehabisan!"}
              </p>
              {!event.soldOut && event.registrationUrl && (
                <a href={event.registrationUrl} target="_blank" rel="noreferrer" className="mt-2.5 inline-block rounded-lg bg-[#1b4dd8] px-4 py-2 text-sm font-semibold hover:bg-[#1741b8]">
                  Beli tiket sekarang
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detail + tickets */}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <SectionHeading>Detail Event</SectionHeading>

          {event.importantInfo.length > 0 && (
            <div className="mt-4 rounded-xl bg-[#f2f4f8] p-4 dark:bg-zinc-900">
              <h3 className={SUBHEAD_CLASS}>Info Penting</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                {event.importantInfo.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </div>
          )}

          <div className="mt-5 space-y-4 text-[14px] leading-7 text-neutral-700 dark:text-neutral-300">
            {event.description.split(/\n\s*\n/).filter(Boolean).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {event.terms.length > 0 && (
            <section className="mt-10">
              <SectionHeading>Info Lainnya</SectionHeading>
              <details className="mt-3 rounded-xl border border-neutral-200 p-4 dark:border-zinc-800" open>
                <summary className="cursor-pointer text-[15px] font-semibold">Syarat &amp; Ketentuan</summary>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {event.terms.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </details>
            </section>
          )}

          <section className="mt-8">
            <h3 className="text-[13px] font-semibold">Lokasi</h3>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-4 text-[13px] dark:border-zinc-800 dark:bg-zinc-900">
              <p className="flex min-w-0 gap-2 text-neutral-700 dark:text-neutral-300">
                <Icon path={PIN} /><span className="truncate">{place || "Gorontalo"}</span>
              </p>
              {event.mapsUrl && (
                <a href={event.mapsUrl} target="_blank" rel="noreferrer" className="shrink-0 font-semibold text-[#1b4dd8] hover:underline dark:text-sky-400">
                  Lihat peta ↗
                </a>
              )}
            </div>
          </section>

          <Link href="/event" className="mt-8 inline-block text-sm text-neutral-500 hover:underline">← Semua event</Link>
        </div>

        <aside className="space-y-4 md:sticky md:top-20 md:self-start">
          <BuyPanel event={event} />

          {event.tickets.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 text-[13px] font-semibold dark:border-zinc-800">
                <span>Kategori</span><span>Harga</span>
              </div>
              <ul>
                {event.tickets.map((ticket) => (
                  <li key={ticket.name} className="flex items-start justify-between gap-4 border-b border-neutral-50 px-4 py-3 last:border-0 dark:border-zinc-800/60">
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold uppercase leading-snug">{ticket.name}</span>
                      {ticket.soldOut && <span className="mt-0.5 block text-[11px] text-neutral-400">Terjual habis</span>}
                    </span>
                    <span className="shrink-0 text-[13px] tabular-nums text-neutral-700 dark:text-neutral-300">
                      {ticket.price === null ? "—" : ticket.price === 0 ? "Gratis" : rupiah(ticket.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
