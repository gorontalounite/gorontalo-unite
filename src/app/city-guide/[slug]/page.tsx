import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import styles from "./detail.module.css";

export const dynamic = "force-dynamic";

type DetailItem = { label: string; value: string };

function mapEmbedUrl(lat: number, lon: number) {
  const delta = 0.006;
  const bbox = [lon - delta, lat - delta, lon + delta, lat + delta].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

export default async function TourismDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: place } = await supabase.from("tourism_places").select("*").eq("slug", slug).eq("published", true).single();
  if (!place) notFound();

  const { data: relatedRaw } = await supabase.from("tourism_places").select("id, name, slug, image_url, category").eq("published", true).eq("category", place.category).neq("id", place.id).limit(4);
  const related = relatedRaw ?? [];

  const gallery = Array.from(new Set([place.image_url, ...(place.gallery ?? [])].filter((image): image is string => Boolean(image))));
  const remaining = gallery.length - 5;
  const hasCoords = typeof place.latitude === "number" && typeof place.longitude === "number";
  const paragraphs: string[] = String(place.description ?? "").split(/\n\s*\n/).filter(Boolean);

  const faqs: DetailItem[] = [
    place.price_range ? { label: `Berapa harga masuk ${place.name}?`, value: place.price_range } : null,
    place.opening_hours ? { label: `Jam berapa ${place.name} buka?`, value: place.opening_hours } : null,
    place.address ? { label: `Di mana lokasi ${place.name}?`, value: place.address } : null,
    place.contact ? { label: `Bagaimana cara menghubungi pengelola ${place.name}?`, value: place.contact } : null,
  ].filter((item): item is DetailItem => item !== null);

  return <main className={styles.page}>
    <div className={styles.wrap}>
      <div className={styles.galleryWrap}>
        {gallery.length > 1 ? <div className={styles.gallery}>
          <div className={`${styles.tile} ${styles.main}`}><Image src={gallery[0]} alt={place.name} fill priority unoptimized style={{ objectFit: "cover" }} /></div>
          {gallery.slice(1, 5).map((image, index) => {
            const isLast = index === gallery.slice(1, 5).length - 1;
            return <div key={image} className={styles.tile}>
              <Image src={image} alt={`${place.name} ${index + 2}`} fill unoptimized style={{ objectFit: "cover" }} />
              {isLast && remaining > 0 && <div className={styles.more}>Lihat {remaining} Foto Lagi</div>}
            </div>;
          })}
        </div> : <div className={styles.heroSingle}>{place.image_url && <Image src={place.image_url} alt={place.name} fill priority unoptimized style={{ objectFit: "cover" }} />}</div>}
      </div>

      <div className={styles.titleTop}>
        <h1 className={styles.name}>{place.name}</h1>
        <p className={styles.priceInline}>{place.price_range || "Gratis"}</p>
      </div>

      {(place.address || place.location || place.opening_hours || place.contact) && <div className={styles.highlightCard}>
        <div className={styles.highlightGrid}>
          {(place.address || place.location) && <div className={styles.highlightBox}>
            <span>{place.address || place.location}</span>
            {place.maps_url && <a className={styles.link} href={place.maps_url} target="_blank" rel="noreferrer">Lihat Peta</a>}
          </div>}
          {place.opening_hours && <div className={styles.highlightBox}>
            <span><span className={styles.metaLabel}>Jam buka:</span> {place.opening_hours}</span>
          </div>}
        </div>
        {place.contact && <div className={`${styles.highlightBox} ${styles.highlightFull}`}>
          <span><span className={styles.metaLabel}>Kontak:</span> {place.contact}</span>
        </div>}
      </div>}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <div className={styles.reviewText} style={{ lineHeight: 1.7 }}>{paragraphs.map((paragraph) => <p key={paragraph} style={{ margin: "0 0 .9rem" }}>{paragraph}</p>)}</div>
      </section>

      {hasCoords && <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Location</h2>
        {(place.address || place.location) && <p className={styles.reviewText} style={{ marginBottom: ".75rem" }}>{place.address || place.location}</p>}
        <div className={styles.mapFrame}><iframe title={`Peta ${place.name}`} src={mapEmbedUrl(place.latitude as number, place.longitude as number)} loading="lazy" /></div>
      </section>}

      {faqs.length > 0 && <section className={styles.section}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        <div className={styles.faq}>{faqs.map((faq) => <details key={faq.label} className={styles.faqItem}><summary>{faq.label}</summary><div className={styles.faqAnswer}>{faq.value}</div></details>)}</div>
      </section>}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Reviews</h2>
        {place.rating && place.review_count > 0 ? <div className={styles.reviewBox}>
          <div className={styles.reviewScore}>{Number(place.rating).toFixed(1)}</div>
          <p className={styles.reviewText}>Dari {place.review_count} ulasan pengunjung.</p>
        </div> : <div className={styles.reviewBox}>
          <div className={styles.reviewScore}>–</div>
          <p className={styles.reviewText}>Belum ada ulasan untuk tempat ini.</p>
        </div>}
      </section>

      {related.length > 0 && <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Kamu Mungkin Suka Ini</h2>
        <div className={styles.relatedGrid}>{related.map((item) => <a key={item.id} href={`/city-guide/${item.slug}`} className={styles.relatedCard}>
          <div className={styles.relatedThumb}>{item.image_url && <Image src={item.image_url} alt={item.name} fill unoptimized style={{ objectFit: "cover" }} />}</div>
          <p className={styles.relatedName}>{item.name}</p>
        </a>)}</div>
      </section>}
    </div>
  </main>;
}
