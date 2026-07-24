"use client";

import { useState } from "react";
import Image from "next/image";

export default function ArticleHeroImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="aspect-video relative rounded-2xl overflow-hidden mb-8">
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
