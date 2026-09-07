import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import styles from "./detail.module.css";

export const dynamic = "force-dynamic";

export default async function TourismDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: place } = await supabase.from("tourism_places").select("*").eq("slug", slug).eq("published", true).single();
  if (!place) notFound();

  const gallery = Array.from(new Set([place.image_url, ...(place.gallery ?? [])].filter((image): image is string => Boolean(image))));
  const remaining = gallery.length - 5;

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
    </div>
  </main>;
}
