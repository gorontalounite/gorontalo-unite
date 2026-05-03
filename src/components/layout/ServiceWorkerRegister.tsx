"use client";

import { useEffect } from "react";

/** Registers /sw.js when the browser supports Service Workers. */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => {
        // SW registration failure is non-critical — silently ignore
      });
  }, []);

  return null;
}
