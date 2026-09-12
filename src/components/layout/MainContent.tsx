"use client";

import { usePathname } from "next/navigation";

const applicationPrefixes = ["/admin", "/sign-in", "/sign-up", "/auth"];

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApplication = applicationPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  return (
    // Application screens have no footer, so they carry the bottom-nav
    // clearance themselves. On public pages the footer carries it, otherwise
    // the padding sits between the content and the footer as an empty band.
    <main className={isApplication ? "flex min-h-0 flex-1 flex-col pb-16 md:pb-0" : "block min-h-0"}>
      {children}
    </main>
  );
}
