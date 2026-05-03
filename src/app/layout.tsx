import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider, themeInitScript } from "@/components/layout/ThemeProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.id";

export const viewport: Viewport = {
  themeColor:  "#2D7D46",
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  metadataBase: new URL(BASE),
  title: "Gorontalo Unite — Portal Berita & AI Lokal Gorontalo",
  description:
    "Platform berita lokal Gorontalo dengan AI chatbot yang membantu Anda menemukan informasi tentang wisata, budaya, kuliner, dan layanan publik di Gorontalo.",
  keywords: ["Gorontalo", "berita Gorontalo", "wisata Gorontalo", "AI Gorontalo", "informasi lokal"],
  authors: [{ name: "Gorontalo Unite" }],
  openGraph: {
    title: "Gorontalo Unite — Portal Berita & AI Lokal Gorontalo",
    description:
      "Tanyakan apapun tentang Gorontalo kepada AI kami. Informasi wisata, budaya, kuliner, dan berita terkini.",
    type: "website",
    locale: "id_ID",
    siteName: "Gorontalo Unite",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gorontalo Unite — Portal Berita & AI Lokal",
    description: "Platform berita lokal Gorontalo dengan asisten AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 flex flex-col min-h-0">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
