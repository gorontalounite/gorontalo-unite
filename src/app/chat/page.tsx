import type { Metadata } from "next";
import { Suspense } from "react";
import ChatContainer from "@/components/Chat/ChatContainer";

export const metadata: Metadata = {
  title: "Chat — Gorontalo AI Assistant | Gorontalo Unite",
  description:
    "Percakapan mendalam dengan Gorontalo AI. Tanya tentang wisata, budaya, sejarah, layanan publik, dan informasi lokal Gorontalo.",
};

export default function ChatPage() {
  return (
    <div className="flex flex-1 min-h-0 max-w-4xl mx-auto w-full px-4 sm:px-6 py-4">
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Memuat...
            </div>
          }
        >
          <ChatContainer />
        </Suspense>
      </div>
    </div>
  );
}
