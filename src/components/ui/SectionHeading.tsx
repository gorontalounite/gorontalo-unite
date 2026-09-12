import type { ReactNode } from "react";

/**
 * The one section heading used across the site — homepage rails, the City
 * Guide, Reels and Event. Before this, the same tier of heading was written
 * four different ways: 20/24 bold with slashes on the homepage, 26/32 regular
 * without them on the City Guide landing, 18px with an emoji on Event, and
 * 20/24 with its own tracking on Reels.
 *
 * Page titles in a hero are a separate, larger tier and are not this.
 */
export default function SectionHeading({
  children,
  as: Tag = "h2",
  id,
  action,
  slashes = true,
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  /** Trailing control, e.g. "View all →". */
  action?: ReactNode;
  slashes?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-6 flex items-center justify-between gap-4 ${className}`}>
      <Tag id={id} className="font-heading flex items-center gap-2 text-[20px] font-bold tracking-[-.025em] sm:text-[24px]">
        {slashes && <span className="text-[#f5c400]" aria-hidden="true">/</span>}
        <span>{children}</span>
        {slashes && <span className="text-[#f5c400]" aria-hidden="true">/</span>}
      </Tag>
      {action}
    </div>
  );
}

/** Page title in a hero or at the top of a document — one tier above a section. */
export const PAGE_TITLE_CLASS = "font-heading text-[26px] font-bold tracking-[-.025em] sm:text-[32px]";

/** Sub-heading inside a section, e.g. a numbered clause on the legal pages. */
export const SUBHEAD_CLASS = "font-heading text-[15px] font-semibold sm:text-base";
