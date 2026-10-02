import type { Metadata } from "next";
import BeritaPage from "@/app/berita/page";

// Served from cache and rebuilt at most every five minutes; publishing or
// editing through the admin API revalidates it immediately. Search (?q=)
// lives at /search so reading the query string cannot force this page
// back to per-request rendering.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Gorontalo Unite — Berbagi Kabar Baik dari Gorontalo",
  description: "Berita dan cerita baik dari Gorontalo: kabar daerah terkini, wisata, kuliner, budaya, event, dan sosok inspiratif dari kota dan kabupaten se-Provinsi Gorontalo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gorontalo Unite — Berbagi Kabar Baik dari Gorontalo",
    description: "Berita dan cerita baik dari Gorontalo: kabar daerah terkini, wisata, kuliner, budaya, event, dan sosok inspiratif dari kota dan kabupaten se-Provinsi Gorontalo.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return <BeritaPage />;
}
