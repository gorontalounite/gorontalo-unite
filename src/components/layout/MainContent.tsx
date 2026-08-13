"use client";

import { usePathname } from "next/navigation";

const applicationPrefixes = ["/admin", "/sign-in", "/sign-up", "/auth"];

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApplication = applicationPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  return (
    <main className={isApplication ? "flex min-h-0 flex-1 flex-col pb-16 md:pb-0" : "block min-h-0 pb-16 md:pb-0"}>
      {children}
    </main>
  );
}
