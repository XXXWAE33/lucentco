"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-first media query hook.
 *
 * Returns `false` on the server and first paint, so the mobile layout is
 * always what renders initially. Card rotation is driven through Framer (which
 * writes inline transforms and would otherwise fight a Tailwind `rotate-*`
 * class), so the breakpoint has to be readable from JS.
 */
export function useMinWidth(px: number): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${px}px)`);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [px]);

  return matches;
}
