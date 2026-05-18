import type { Metadata } from "next";
import MediaKitPage from "./MediaKitPage";

export const metadata: Metadata = {
  title: "Media Kit — @gorontalo.unite",
  description:
    "Instagram media kit resmi @gorontalo.unite. 63K+ followers, 112K monthly reach, 1,1M+ views/bulan. Rate card endorse otomatis berbasis insight akun.",
  openGraph: {
    title: "Media Kit — @gorontalo.unite",
    description: "63K+ followers · 112K monthly reach · 1,1M+ views · Rate card endorse otomatis.",
    type: "website",
  },
};

export default function Page() {
  return <MediaKitPage />;
}
