import BeritaCategoryPage, { generateMetadata as generateCategoryMetadata } from "@/app/berita/[key]/page";
import { VIDEO_STORY_KEY } from "@/components/video-story/data";

// Video Story filters and pages through ?brand= and ?hal=, so unlike the other
// category archives it renders per request.
export const dynamic = "force-dynamic";

const params = Promise.resolve({ key: VIDEO_STORY_KEY });

export function generateMetadata() {
  return generateCategoryMetadata({ params });
}

export default function VideoStoryArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; hal?: string }>;
}) {
  return <BeritaCategoryPage params={params} searchParams={searchParams} />;
}
