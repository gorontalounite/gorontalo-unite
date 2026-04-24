import { Suspense } from "react";
import ChatContainer from "@/components/Chat/ChatContainer";

export default function HomePage() {
  return (
    <div className="flex flex-1 min-h-0 w-full">
      <div className="flex-1 flex flex-col min-h-0">
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
