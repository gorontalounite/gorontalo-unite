import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar                 from "@/components/layout/Navbar";
import ServiceWorkerRegister  from "@/components/layout/ServiceWorkerRegister";
import { ThemeProvider, themeInitScript } from "@/components/layout/ThemeProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.id";

export const viewport: Viewport = {
  themeColor:  [
    { media: "(prefers-color-scheme: light)", color: "#2D7D46" },
    { media: "(prefers-color-scheme: dark)",  color: "#1a5c33" },
  ],
  colorScheme: "light dark",
  width:       "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  manifest:    "/manifest.json",
  metadataBase: new URL(BASE),

  title: {
    default:  "Gorontalo Unite — Portal Berita & AI Lokal Gorontalo",
    template: "%s | Gorontalo Unite",
  },
  description:
    "Platform berita lokal Gorontalo dengan AI chatbot. Temukan info wisata, budaya, kuliner, dan berita terkini dari Bumi Serambi Madinah.",
  keywords: ["Gorontalo", "berita Gorontalo", "wisata Gorontalo", "AI Gorontalo", "informasi lokal", "hulontalo"],
  authors:  [{ name: "Gorontalo Unite", url: BASE }],

  /* ── Icons ──────────────────────────────────────────────── */
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png",   sizes: "192x192", type: "image/png" },
    ],
    apple:    [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut:  "/icons/favicon-32.png",
  },

  /* ── Open Graph ─────────────────────────────────────────── */
  openGraph: {
    title:       "Gorontalo Unite — Portal Berita & AI Lokal",
    description: "Tanyakan apapun tentang Gorontalo kepada AI kami. Info wisata, budaya, kuliner, dan berita terkini.",
    url:         BASE,
    type:        "website",
    locale:      "id_ID",
    siteName:    "Gorontalo Unite",
    images:      [{ url: "/og-image.png", width: 1890, height: 1890, alt: "Gorontalo Unite" }],
  },

  /* ── Twitter Card ───────────────────────────────────────── */
  twitter: {
    card:        "summary_large_image",
    title:       "Gorontalo Unite — Portal Berita & AI Lokal",
    description: "Platform berita lokal Gorontalo dengan asisten AI.",
    images:      ["/og-image.png"],
  },

  /* ── App metadata ───────────────────────────────────────── */
  appleWebApp: {
    capable:    true,
    title:      "Gorontalo Unite",
    statusBarStyle: "default",
  },

  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        {/* PWA service worker registration */}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
