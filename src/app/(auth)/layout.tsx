import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akun | Gorontalo Unite",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col bg-gray-50">{children}</main>
  );
}
