import { Suspense } from "react";
import ChatContainer from "@/components/Chat/ChatContainer";
import SidebarNews from "@/components/SidebarNews";

export default function HomePage() {
  return (
    <div className="flex flex-1 min-h-0 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 gap-6">
      {/* Main chat area */}
      <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
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

      {/* Sidebar — visible on xl screens */}
      <SidebarNews />
    </div>
  );
}
