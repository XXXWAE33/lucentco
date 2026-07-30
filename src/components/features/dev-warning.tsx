"use client";

import { useEffect } from "react";

/**
 * Logs a development warning and renders nothing.
 *
 * Used wherever content is still placeholder. The page must never render
 * scaffolding — banners and badges belong in the console, not the layout.
 */
export function DevWarning({ message }: { message: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    console.warn(message);
  }, [message]);

  return null;
}
