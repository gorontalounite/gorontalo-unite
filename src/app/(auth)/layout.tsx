import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  // Sign-in and sign-up are doors, not pages. Covers /auth/login too, which
  // redirects here — the redirect itself can carry no tag of its own.
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col bg-gray-50">{children}</main>
  );
}
