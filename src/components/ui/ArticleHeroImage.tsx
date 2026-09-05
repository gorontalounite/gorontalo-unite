"use client";

import { useState } from "react";
import Image from "next/image";

export default function ArticleHeroImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <figure className="relative aspect-video overflow-hidden rounded-xl bg-stone-100 dark:bg-zinc-900">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 896px"
        priority
        onError={() => setFailed(true)}
      />
    </figure>
  );
}
