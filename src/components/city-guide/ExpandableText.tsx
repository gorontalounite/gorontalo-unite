"use client";

import { useState } from "react";

/** Long body copy that starts clamped and expands in place. Presentation only — no content is dropped. */
export default function ExpandableText({ children, lines = 6, className, toggleClassName, clampClassName }: {
  children: React.ReactNode;
  lines?: number;
  className?: string;
  toggleClassName?: string;
  clampClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return <div className={className}>
    <div
      className={open ? undefined : clampClassName}
      style={open ? undefined : { WebkitLineClamp: lines }}
    >
      {children}
    </div>
    <button type="button" onClick={() => setOpen((value) => !value)} className={toggleClassName} aria-expanded={open}>
      {open ? "Show less" : "Read more"}
    </button>
  </div>;
}
