"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Backdrop for the article hero: the featured image plus the scrim that keeps
 * the overlaid headline readable. Decorative on purpose — the headline above it
 * already carries the meaning, so announcing the image would just repeat it.
 * If the source 404s this drops out and the hero falls back to its solid ground.
 */
export default function ArticleHeroImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        onError={() => setFailed(true)}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.74) 34%, rgba(0,0,0,.36) 62%, rgba(0,0,0,.10) 100%)" }}
      />
    </div>
  );
}
