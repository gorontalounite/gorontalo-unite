import type { Metadata } from "next";
import GorontaloUniteAuthorPage from "@/app/berita/penulis/gorontalo-unite/page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Redaksi Gorontalo Unite",
  description: "Profil redaksi Gorontalo Unite: tim lokal yang meliput dan mengkurasi berita, wisata, kuliner, budaya, dan cerita baik dari Provinsi Gorontalo.",
  alternates: { canonical: "/author/gorontalounite" },
};

export default GorontaloUniteAuthorPage;
