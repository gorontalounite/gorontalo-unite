/**
 * Line icons for the event categories, drawn in the same language the rest of
 * the site already uses: 24×24, stroke `currentColor`, no fill. Emoji were
 * standing in before, which rendered as a different typeface on every device
 * and could not take the brand colour.
 *
 * Original paths, so there is no licence to carry.
 */

const PATHS: Record<string, string> = {
  // Ferris wheel
  attractions: "M12 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M12 3v14 M5 10h14 M7 5l10 10 M17 5 7 15 M12 17v2 M8 21l4-2 4 2",
  // Finish flag
  racing: "M5 21V4 M5 5h9l-1.8 2.6L14 10H5",
  // Festival tent
  festival: "M3 20h18 M12 4 4 20 M12 4l8 16 M8.3 20 12 12l3.7 8",
  // Two figures
  community: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M3 20a6 6 0 0 1 12 0 M16.5 11.5a2.5 2.5 0 1 0 0-5 M17 14.5a5 5 0 0 1 4 5",
  // Microphone
  conference: "M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z M5 11a7 7 0 0 0 14 0 M12 18v3 M9 21h6",
  // Beamed notes
  concert: "M9 18V6l10-2v12 M9 9l10-2 M6.5 20.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z M16.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  // Theatre mask
  performance: "M4 5h16v6a8 8 0 0 1-16 0V5Z M9 10h.01 M15 10h.01 M9.5 14.5a3.5 3.5 0 0 0 5 0",
  // Medal
  sports: "M12 13a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z M7 3h10 M9 3l3 8 M15 3l-3 8",
  // Compass
  tours: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z",
  // Trophy
  tournament: "M8 4h8v5a4 4 0 0 1-8 0V4Z M8 6H5v1a3 3 0 0 0 3 3 M16 6h3v1a3 3 0 0 1-3 3 M12 13v3 M9 21a3 3 0 0 1 6 0 M9 21h6",
  // Easel
  workshop: "M4 4h16v11H4z M12 15v5 M9 20h6 M8 11l2.5-2.5 2 2L16 7",
};

export default function CategoryIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
