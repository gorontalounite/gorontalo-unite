"use client";

import { useEffect } from "react";

/** Silently increments view_count for `slug` once on mount. */
export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/articles/${encodeURIComponent(slug)}/view`, { method: "POST" })
      .catch(() => {});
  }, [slug]);

  return null;
}
