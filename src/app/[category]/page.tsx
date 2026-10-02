import NewsDetailPage, { generateMetadata as generateArticleMetadata } from "@/components/news/ArticleDetailPage";

export const dynamic = "force-dynamic";

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
