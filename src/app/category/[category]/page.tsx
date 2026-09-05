import BeritaCategoryPage, { generateMetadata as generateCategoryMetadata } from "@/app/berita/[key]/page";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export function generateMetadata({ params, searchParams }: Props) {
  return generateCategoryMetadata({
    params: params.then(({ category }) => ({ key: category })),
    searchParams,
  });
}

export default function CategoryArchivePage({ params, searchParams }: Props) {
  return (
    <BeritaCategoryPage
      params={params.then(({ category }) => ({ key: category }))}
      searchParams={searchParams}
    />
  );
}
