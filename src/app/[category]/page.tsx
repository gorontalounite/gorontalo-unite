import NewsDetailPage, { generateMetadata as generateArticleMetadata } from "@/components/news/ArticleDetailPage";

// Cached and rebuilt at most every five minutes; admin writes revalidate it
// at once. No params are prerendered at build: each page is generated on its
// first visit and then served from cache.
export const revalidate = 300;
export const generateStaticParams = async () => [];

interface Props {
  params: Promise<{ category: string }>;
}

export function generateMetadata({ params }: Props) {
  return generateArticleMetadata({
    params: params.then(({ category }) => ({ id: category })),
  });
}

export default function ArticlePage({ params }: Props) {
  return (
    <NewsDetailPage
      params={params.then(({ category }) => ({ id: category }))}
    />
  );
}
