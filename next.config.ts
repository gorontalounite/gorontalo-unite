import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/berita/news", destination: "/", permanent: true },
      { source: "/category/news", destination: "/", permanent: true },
      { source: "/berita/food-drink", destination: "/category/culinary", permanent: true },
      { source: "/category/food-drink", destination: "/category/culinary", permanent: true },
      { source: "/berita/penulis/gorontalo-unite", destination: "/author/gorontalounite", permanent: true },
      { source: "/berita/whats-on", destination: "/category/whats-on", permanent: true },
      { source: "/berita/travel", destination: "/category/travel", permanent: true },
      { source: "/berita/culture", destination: "/category/culture", permanent: true },
      { source: "/berita/people", destination: "/category/people", permanent: true },
      { source: "/berita/life", destination: "/category/life", permanent: true },
      { source: "/berita/culinary", destination: "/category/culinary", permanent: true },
      { source: "/berita/:slug", destination: "/:slug", permanent: true },
      { source: "/berita", destination: "/", permanent: true },
      { source: "/wisata", destination: "/city-guide", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
