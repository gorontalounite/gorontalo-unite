import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar                 from "@/components/layout/Navbar";
import BottomNav              from "@/components/layout/BottomNav";
import PublicFooter           from "@/components/layout/PublicFooter";
import MainContent            from "@/components/layout/MainContent";
import ServiceWorkerRegister  from "@/components/layout/ServiceWorkerRegister";
import { ThemeProvider, themeInitScript } from "@/components/layout/ThemeProvider";

/* Instrument Serif ships a single weight, so any bold utility would render as a
   smeared fake of the 400. This has to bypass the stylesheet: the Tailwind v4
   compiler drops font-synthesis from globals.css, longhand and shorthand alike,
   so it never reaches the page. Inlining it here also covers the homepage,
   which is off-limits to edit. */
const fontSynthesisReset = "html{font-synthesis:none}";

// Both families ship real italics. Golos Text and Space Grotesk shipped none,
// so every <em> and blockquote on the site was a browser-synthesised slant.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Instrument Serif ships a single weight, 400, with a real italic. Anything
// asking for bold would be synthesised, so headings switch weight synthesis off
// and render the genuine 400 — which is also the slimmer look that was wanted.
const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com";

export const viewport: Viewport = {
  themeColor:  [
    { media: "(prefers-color-scheme: light)", color: "#F5C400" },
    { media: "(prefers-color-scheme: dark)",  color: "#111111" },
  ],
  colorScheme: "light dark",
  width:       "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  manifest:    "/manifest.json",
  metadataBase: new URL(BASE),

  title: {
    default:  "Gorontalo Unite — Berbagi Kabar Baik dari Gorontalo",
    template: "%s | Gorontalo Unite",
  },
  description:
    "Gorontalo Unite Mediahub berbagi kabar baik dari Gorontalo—berita, wisata, kuliner, budaya, event, dan cerita inspiratif pilihan.",
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
    title:       "Gorontalo Unite — Berbagi Kabar Baik dari Gorontalo",
    description: "Berita, wisata, kuliner, budaya, event, dan cerita inspiratif pilihan dari Gorontalo.",
    url:         BASE,
    type:        "website",
    locale:      "id_ID",
    siteName:    "Gorontalo Unite",
    images:      [{ url: "/og-image.png", width: 1200, height: 630, alt: "Gorontalo Unite" }],
  },

  /* ── Twitter Card ───────────────────────────────────────── */
  twitter: {
    card:        "summary_large_image",
    title:       "Gorontalo Unite — Berbagi Kabar Baik dari Gorontalo",
    description: "Berita dan cerita positif pilihan dari Gorontalo.",
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
    <html lang="id" className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontSynthesisReset }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          <Navbar />
          <MainContent>{children}</MainContent>
          <PublicFooter />
          <BottomNav />
        </ThemeProvider>
        {/* PWA service worker registration */}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
