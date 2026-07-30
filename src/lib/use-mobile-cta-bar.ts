"use client";

import { useEffect, useState } from "react";

/**
 * Whether the sticky mobile CTA bar is currently on screen.
 *
 * Shared by `MobileQuoteBar` (which renders it) and `WhatsAppFab` (which must
 * lift itself clear of it). Keeping the rule in one place means the two can
 * never disagree about what is anchored to the bottom of the viewport.
 *
 * Note: this tracks the *scroll* condition only. The bar is additionally
 * `lg:hidden`, so consumers must scope any offset to below the `lg` breakpoint.
 */
export function useMobileCtaBarVisible(): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        y + window.innerHeight > document.body.scrollHeight - 160;

      /*
       * Yield to the quote section. While it is on screen the basket may show
       * its own sticky running total pinned to the bottom of the viewport, and
       * two stacked bars is both ugly and a tap-target hazard — the running
       * total is the more useful of the two, so this one stands down.
       *
       * Targets the SECTION (`#get-a-quote`), not `#build-your-clean`: the
       * latter is now a zero-height anchor span inside `QuoteTabs`, whose rect
       * would collapse and defeat the check.
       */
      const quoteSection = document.getElementById("get-a-quote");
      let inQuoteSection = false;
      if (quoteSection) {
        const r = quoteSection.getBoundingClientRect();
        inQuoteSection = r.top < window.innerHeight && r.bottom > 0;
      }

      setVisible(y > 520 && !nearBottom && !inQuoteSection);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return visible;
}
