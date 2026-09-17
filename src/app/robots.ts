import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // `/auth/` used to be listed here, and that is exactly why
        // /auth/login turned up in Search Console. Disallow stops the crawl,
        // not the indexing: Google indexed the URL it was forbidden to fetch,
        // and could never read the noindex that would have removed it.
        //
        // Account pages are kept crawlable and carry `robots: noindex`
        // instead. What stays here is what should never be fetched at all.
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host:    BASE,
  };
}
