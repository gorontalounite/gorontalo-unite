"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./GalleryCarousel.module.css";

/**
 * One photograph at a time, full width and 16:9, swiped on a phone and
 * stepped with arrows on a desktop. Built for listings that start with a
 * single photo and grow to about five, where a fixed mosaic would leave holes.
 */
export default function GalleryCarousel({ images, name }: { images: string[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const many = images.length > 1;

  function goTo(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(images.length - 1, next));
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  }

  return (
    <div className={styles.frame}>
      <div
        ref={trackRef}
        className={styles.track}
        // The scroll position is the source of truth, so a swipe, an arrow and
        // a dot all end up reporting the same slide.
        onScroll={(event) => {
          const track = event.currentTarget;
          const current = Math.round(track.scrollLeft / track.clientWidth);
          if (current !== index) setIndex(current);
        }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`Foto ${name}`}
      >
        {images.map((image, position) => (
          <div key={image} className={styles.slide}>
            <Image
              src={image}
              alt={position === 0 ? name : `${name} — foto ${position + 1}`}
              fill
              priority={position === 0}
              unoptimized
              sizes="(min-width: 896px) 896px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {many && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Foto sebelumnya"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => goTo(index + 1)}
            disabled={index === images.length - 1}
            aria-label="Foto berikutnya"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          <div className={styles.dots}>
            {images.map((image, position) => (
              <button
                key={image}
                type="button"
                className={styles.dot}
                aria-current={position === index}
                aria-label={`Ke foto ${position + 1}`}
                onClick={() => goTo(position)}
              />
            ))}
          </div>

          <p className={styles.counter}>{index + 1} / {images.length}</p>
        </>
      )}
    </div>
  );
}
