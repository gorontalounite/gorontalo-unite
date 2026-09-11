/**
 * Single source of truth for public navigation.
 *
 * The header, both drawers and the footer all read from here so a link can
 * never drift between them — the footer used to carry "Destinations" and
 * "City Guide" pointing at the same route, which also collided as React keys.
 *
 * Hrefs are final destinations, not redirects: /category/news and /services
 * both 308 elsewhere, so the targets are linked directly.
 */

export interface NavLink {
  href: string;
  label: string;
  description?: string;
}

/**
 * The header's own menu. Kept separate from PRIMARY_NAV because the footer
 * reads that one and is due to be rewritten later — changing it here would
 * drag the footer along before that work starts.
 */
export const HEADER_NAV: NavLink[] = [
  { href: "/", label: "Good News" },
  { href: "/city-guide", label: "Explore" },
  { href: "/reels", label: "Reels" },
  { href: "/about", label: "About Us" },
];

/** Main destinations of the site. */
export const PRIMARY_NAV: NavLink[] = [
  { href: "/", label: "Berita", description: "Kabar terbaru dari Gorontalo" },
  { href: "/city-guide", label: "City Guide", description: "Direktori tempat pilihan" },
  { href: "/event", label: "Event", description: "Agenda seru di Gorontalo" },
  { href: "/reels", label: "Reels", description: "Video pendek pilihan" },
];

/** Editorial desks, matching the homepage sections. Names stay as branded. */
export const CHANNELS: NavLink[] = [
  { href: "/category/whats-on", label: "What’s On" },
  { href: "/category/travel", label: "Tourism" },
  { href: "/category/culinary", label: "Culinary" },
  { href: "/category/culture", label: "Culture" },
  { href: "/category/people", label: "People" },
  { href: "/category/life", label: "Lifestyle" },
];

/** Curated reading channels surfaced in the category panel. */
export const KABAR_BAIK: NavLink[] = [
  { href: "/category/inspire", label: "Inspire", description: "Kisah inspiratif Gorontalo" },
  { href: "/category/insight", label: "Insight", description: "Wawasan & analisis" },
  { href: "/category/interest", label: "Interest", description: "Topik menarik pilihan" },
];

export const ABOUT_LINKS: NavLink[] = [
  { href: "/about", label: "About us" },
  { href: "/#layanan", label: "Services" },
  { href: "/about#kontak", label: "Contact" },
  { href: "/media-kit", label: "Media Kit" },
];

export const LEGAL_LINKS: NavLink[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/pedoman-media-siber", label: "Pedoman Media Siber" },
];
