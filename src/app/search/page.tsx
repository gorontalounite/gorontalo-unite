import type { Metadata } from "next";
import BeritaPage from "@/app/berita/page";

export const dynamic = "force-dynamic";

// Internal search results are thin, endlessly varied pages: keep them out of
// the index while still letting crawlers follow the stories they list.
export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; q?: string }>;
}) {
  return <BeritaPage searchParams={searchParams} />;
}
