"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The one editing surface for the admin grids.
 *
 * Before this the three grids each opened a record differently: News left the
 * page for /admin/news/edit/<id>, Reels pushed a form in above the table, and
 * City Guide put a box in the middle of the screen. All three now slide the
 * record in from the right with the list still behind it, so closing returns
 * you to the same scroll position and the same row.
 */
export default function SidePanel({
  open, title, subtitle, onClose, width = "640px", bodyScroll = true, children, footer,
}: {
  open: boolean;
  title: ReactNode;
  subtitle?: ReactNode;
  onClose: () => void;
  /** Max width of the panel. The block editor needs far more room than a form. */
  width?: string;
  /**
   * False hands scrolling to the child. The article editor manages its own —
   * two nested scroll containers leave the toolbar drifting away from the text
   * it acts on.
   */
  bodyScroll?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    panel.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Hold the page still behind the panel, and keep the width it had — just
    // hiding the scrollbar shifts the whole layout sideways as it opens.
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      restoreFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Tutup panel"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/30"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        style={{ maxWidth: width }}
        className="relative flex h-full w-full flex-col bg-white shadow-2xl outline-none motion-safe:animate-[panelIn_.18s_ease-out]"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="mt-0.5 truncate text-xs text-gray-400">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="-mr-1 shrink-0 rounded-lg px-2 py-1 text-lg leading-none text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </header>

        <div className={`min-h-0 flex-1 ${bodyScroll ? "overflow-y-auto" : "overflow-hidden"}`}>{children}</div>

        {footer && <div className="shrink-0 border-t border-gray-200 px-5 py-3">{footer}</div>}
      </div>

      <style>{`@keyframes panelIn { from { transform: translateX(16px); opacity: .6 } to { transform: none; opacity: 1 } }`}</style>
    </div>
  );
}
