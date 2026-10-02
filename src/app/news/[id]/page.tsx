import { permanentRedirect } from "next/navigation";

/** Articles live at /<slug>; this legacy path only forwards there. */
export default async function LegacyNewsArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  permanentRedirect(`/${encodeURIComponent(id)}`);
}
