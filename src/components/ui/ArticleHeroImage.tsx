"use client";

import { useState } from "react";
import Image from "next/image";

export default function ArticleHeroImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-[.65rem] border border-stone-200 dark:border-zinc-800">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        onError={() => setFailed(true)}
      />
    </div>
  );
}
