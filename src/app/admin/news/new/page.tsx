import PostEditor from "@/components/editor/PostEditor";

export const metadata = { title: "Berita Baru | Admin Gorontalo Unite" };

export default function NewNewsPage() {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      <PostEditor postType="news" />
    </div>
  );
}
