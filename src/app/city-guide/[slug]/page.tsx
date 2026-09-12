import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ListingHeroBar from "@/components/city-guide/ListingHeroBar";
import ExpandableText from "@/components/city-guide/ExpandableText";
import GalleryCarousel from "@/components/city-guide/GalleryCarousel";
import InstagramEmbedGrid from "@/components/city-guide/InstagramEmbedGrid";
import BlockRenderer from "@/components/ui/BlockRenderer";
import type { Block } from "@/components/editor/types";
import styles from "./detail.module.css";

export const dynamic = "force-dynamic";

type DetailItem = { label: string; value: string };

/** Eat and Stay — the categories whose hero is a slider rather than a mosaic. */
const SLIDER_CATEGORIES = new Set(["Kuliner", "Akomodasi"]);

function mapEmbedUrl(lat: number, lon: number) {
  const delta = 0.006;
  const bbox = [lon - delta, lat - delta, lon + delta, lat + delta].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

function Icon({ path }: { path: string }) {
  return <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

const ICON = {
  pin: "M12 21s7-5.2 7-12a7 7 0 10-14 0c0 6.8 7 12 7 12Z M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5Z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18Z M12 7v5l3 2",
  phone: "M6 3h3l2 5-2.5 1.5a12 12 0 006 6L16 13l5 2v3a2 2 0 01-2.2 2A17 17 0 014 6.2 2 2 0 016 4V3Z",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18Z M3 12h18 M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z",
  ticket: "M4 8a2 2 0 012-2h12a2 2 0 012 2v1.5a2.5 2.5 0 000 5V16a2 2 0 01-2 2H6a2 2 0 01-2-2v-1.5a2.5 2.5 0 000-5V8Z M14 6v12",
  share: "M18 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5Z M6 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5Z M18 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5Z M8.2 11.2l7.6-3.9 M8.2 12.8l7.6 3.9",
  photo: "M4 6h16v12H4z M4 15l4.5-4.5 4 4L16 11l4 4",
  star: "M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4L4.2 9.7l5.4-.8L12 4Z",
} as const;

export default async function TourismDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: place } = await supabase.from("tourism_places").select("*").eq("slug", slug).eq("published", true).single();
  if (!place) notFound();

  const { data: relatedRaw } = await supabase.from("tourism_places").select("id, name, slug, image_url, category, location").eq("published", true).eq("category", place.category).neq("id", place.id).limit(6);
  const related = relatedRaw ?? [];

  const gallery = Array.from(new Set([place.image_url, ...(place.gallery ?? [])].filter((image): image is string => Boolean(image))));
  // Eat and Stay listings carry one photograph today and grow to a handful.
  // A fixed five-box mosaic leaves holes at that size, so they slide instead.
  const usesSlider = SLIDER_CATEGORIES.has(String(place.category ?? ""));
  const hasCoords = typeof place.latitude === "number" && typeof place.longitude === "number";
  const paragraphs: string[] = String(place.description ?? "").split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean);
  const tags: string[] = Array.isArray(place.tags) ? (place.tags as unknown[]).filter((tag): tag is string => typeof tag === "string" && tag.length > 0) : [];
  const address = place.address || place.location;
  const hasRating = typeof place.rating === "number" && place.review_count > 0;
  // Only worth clamping when the copy actually runs past the fold on a phone.
  const isLongDescription = paragraphs.join(" ").length > 420;

  // listing_details is what the City Guide admin form writes: rich content blocks,
  // social profile links, and specific Instagram posts for this listing.
  const details = (place.listing_details ?? {}) as Record<string, unknown>;
  const blocks: Block[] = Array.isArray(details.content_blocks) ? (details.content_blocks as Block[]) : [];
  const instagramPosts: string[] = Array.isArray(details.instagram_posts)
    ? (details.instagram_posts as unknown[]).filter((post): post is string => typeof post === "string" && post.length > 0)
    : [];
  const socials: { label: string; url: string }[] = [
    { label: "Instagram", value: details.instagram_url },
    { label: "Facebook", value: details.facebook_url },
    { label: "TikTok", value: details.tiktok_url },
  ].flatMap(({ label, value }) => (typeof value === "string" && value.length > 0 ? [{ label, url: value }] : []));

  // Falls back to the same coordinates the embedded map already uses — no invented location data.
  const mapLink = place.maps_url || (hasCoords ? `https://www.google.com/maps/search/?api=1&query=${place.latitude}%2C${place.longitude}` : null);

  const faqs: DetailItem[] = [
    place.price_range ? { label: `How much is admission to ${place.name}?`, value: place.price_range } : null,
    place.opening_hours ? { label: `What are ${place.name} opening hours?`, value: place.opening_hours } : null,
    address ? { label: `Where is ${place.name} located?`, value: address } : null,
    place.contact ? { label: `How do I contact ${place.name}?`, value: place.contact } : null,
  ].filter((item): item is DetailItem => item !== null);

  return <main className={styles.page}>
    <div className={styles.wrap}>

      {/* A — Hero gallery. Eat and Stay run a full-width 16:9 slider; Explore
          keeps the mosaic, which it has the photographs to fill. */}
      {gallery.length > 0 && <div className={styles.heroWrap}>
        {usesSlider ? (
          <GalleryCarousel images={gallery} name={place.name} />
        ) : (
          <>
            <div className={styles.gallery}>
              {gallery.map((image, index) => <div key={image} className={styles.slide}>
                <Image src={image} alt={index === 0 ? place.name : `${place.name} — photo ${index + 1}`} fill priority={index === 0} unoptimized sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: "cover" }} />
              </div>)}
            </div>
            {gallery.length > 1 && <p className={`${styles.galleryCount}${gallery.length > 5 ? "" : ` ${styles.mobileOnly}`}`}><Icon path={ICON.photo} />{gallery.length} Photos</p>}
          </>
        )}
        <ListingHeroBar name={place.name} className={styles.heroBar} />
      </div>}

      {/* B — Primary information */}
      <section className={styles.block}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/city-guide">City Guide</Link>
          {place.category && <><span aria-hidden="true">›</span><span>{place.category}</span></>}
          {place.subcategory && <><span aria-hidden="true">›</span><span>{place.subcategory}</span></>}
        </nav>

        <h1 className={styles.name}>{place.name}</h1>

        {/* C — Rating summary, only when a real review source has filled it in */}
        {hasRating && <p className={styles.ratingChip}>
          <Icon path={ICON.star} />
          <strong>{Number(place.rating).toFixed(1)}</strong><span>/5</span>
          <span className={styles.ratingCount}>{place.review_count} ulasan</span>
        </p>}

        {tags.length > 0 && <ul className={styles.tags}>
          {tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>}

        <dl className={styles.infoList}>
          {place.price_range && <div className={styles.infoRow}>
            <Icon path={ICON.ticket} />
            <div className={styles.infoBody}>
              <dt>Admission</dt>
              <dd className={styles.price}>{place.price_range}</dd>
            </div>
          </div>}

          {address && <div className={styles.infoRow}>
            <Icon path={ICON.pin} />
            <div className={styles.infoBody}>
              <dt>Location</dt>
              <dd>{address}</dd>
            </div>
            {mapLink && <a className={styles.rowLink} href={mapLink} target="_blank" rel="noreferrer">View map</a>}
          </div>}

          {place.opening_hours && <div className={styles.infoRow}>
            <Icon path={ICON.clock} />
            <div className={styles.infoBody}>
              <dt>Opening hours</dt>
              <dd>{place.opening_hours}</dd>
            </div>
          </div>}

          {place.contact && <div className={styles.infoRow}>
            <Icon path={ICON.phone} />
            <div className={styles.infoBody}>
              <dt>Contact</dt>
              <dd>{place.contact}</dd>
            </div>
          </div>}

          {place.website_url && <div className={styles.infoRow}>
            <Icon path={ICON.globe} />
            <div className={styles.infoBody}>
              <dt>Website</dt>
              <dd className={styles.truncate}><a className={styles.inlineLink} href={place.website_url} target="_blank" rel="noreferrer">{place.website_url}</a></dd>
            </div>
          </div>}

          {socials.length > 0 && <div className={styles.infoRow}>
            <Icon path={ICON.share} />
            <div className={styles.infoBody}>
              <dt>Social media</dt>
              <dd className={styles.socialLinks}>{socials.map(({ label, url }) => <a key={label} className={styles.inlineLink} href={url} target="_blank" rel="noreferrer">{label}</a>)}</dd>
            </div>
          </div>}
        </dl>
      </section>

      {/* E — Description */}
      {(blocks.length > 0 || paragraphs.length > 0) && <section className={styles.block}>
        <h2 className={styles.blockTitle}>About {place.name}</h2>
        {blocks.length > 0
          ? <BlockRenderer blocks={blocks} className={styles.prose} />
          : isLongDescription
            ? <ExpandableText className={styles.prose} clampClassName={styles.clamp} toggleClassName={styles.moreButton} lines={7}>
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </ExpandableText>
            : <div className={styles.prose}>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
      </section>}

      {/* G — Location */}
      {(hasCoords || address) && <section className={styles.block}>
        <h2 className={styles.blockTitle}>Location</h2>
        {hasCoords && <div className={styles.mapFrame}>
          <iframe title={`Map of ${place.name}`} src={mapEmbedUrl(place.latitude as number, place.longitude as number)} loading="lazy" />
        </div>}
        {address && <p className={styles.mapAddress}><Icon path={ICON.pin} />{address}</p>}
        {mapLink && <a className={styles.mapCta} href={mapLink} target="_blank" rel="noreferrer">View map</a>}
      </section>}

      {/* H — FAQ */}
      {faqs.length > 0 && <section className={styles.block}>
        <h2 className={styles.blockTitle}>Frequently Asked Questions</h2>
        <div className={styles.faq}>
          {faqs.map((faq) => <details key={faq.label} className={styles.faqItem}>
            <summary>{faq.label}<span className={styles.chevron} aria-hidden="true" /></summary>
            <div className={styles.faqAnswer}>{faq.value}</div>
          </details>)}
        </div>
      </section>}

      {/* I — Reviews */}
      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Reviews</h2>
        {hasRating ? <div className={styles.reviewSummary}>
          <p className={styles.reviewScore}>{Number(place.rating).toFixed(1)}<span>/5</span></p>
          <p className={styles.reviewMeta}>Dari {place.review_count} ulasan pengunjung.</p>
        </div> : <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No reviews yet</p>
          <p className={styles.emptyBody}>This place has no visitor reviews on Gorontalo Unite yet.</p>
        </div>}
      </section>

      {instagramPosts.length > 0 && <section className={styles.block}>
        <h2 className={styles.blockTitle}>From Instagram</h2>
        <InstagramEmbedGrid posts={instagramPosts} />
      </section>}

      {/* J — Related, from the same category */}
      {related.length > 0 && <section className={styles.block}>
        <h2 className={styles.blockTitle}>You Might Also Like</h2>
        <div className={styles.relatedRow}>
          {related.map((item) => <Link key={item.id} href={`/city-guide/${item.slug}`} className={styles.relatedCard}>
            <div className={styles.relatedThumb}>
              {item.image_url && <Image src={item.image_url} alt={item.name} fill unoptimized sizes="(min-width: 640px) 18rem, 60vw" style={{ objectFit: "cover" }} />}
            </div>
            <div className={styles.relatedBody}>
              <p className={styles.relatedName}>{item.name}</p>
              {(item.location || item.category) && <p className={styles.relatedMeta}>{item.location || item.category}</p>}
            </div>
          </Link>)}
        </div>
      </section>}

    </div>
  </main>;
}
