import type { Metadata } from "next";
import BeritaPage from "@/app/berita/page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gorontalo Unite — Berbagi Kabar Baik dari Gorontalo",
  description: "Cerita baik, budaya, wisata, kuliner, dan sosok inspiratif dari Gorontalo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gorontalo Unite — Berbagi Kabar Baik dari Gorontalo",
    description: "Cerita baik, budaya, wisata, kuliner, dan sosok inspiratif dari Gorontalo.",
    url: "/",
    type: "website",
  },
};

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; q?: string }>;
}) {
  return <BeritaPage searchParams={searchParams} />;
}
