import PostEditor from "@/components/editor/PostEditor";

export const metadata = { title: "Karya Baru | Admin Gorontalo Unite" };

export default function NewPortfolioPage() {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      <PostEditor postType="portfolio" />
    </div>
  );
}
