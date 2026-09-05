import type { Metadata } from "next";
import BeritaPage from "@/app/berita/page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gorontalo Unite — News, Stories, and Culture",
  description: "News, events, travel, culinary, culture, people, and life in Gorontalo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gorontalo Unite — News, Stories, and Culture",
    description: "What matters, inspires, and connects Gorontalo.",
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
