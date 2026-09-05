import type { Metadata } from "next";
import GorontaloUniteAuthorPage from "@/app/berita/penulis/gorontalo-unite/page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "gorontalounite — Author",
  description: "Articles and editorial curation by gorontalounite.",
  alternates: { canonical: "/author/gorontalounite" },
};

export default GorontaloUniteAuthorPage;
