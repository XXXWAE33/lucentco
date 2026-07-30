"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Back-to-top. Desktop only — on mobile the bottom edge belongs to the sticky
 * contact bar, and thumbs live there, not at the top of long pages.
 * Bottom-LEFT so it can never collide with the WhatsApp FAB (bottom-right).
 */
export function BackToTop() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          aria-label="Back to top"
          className="fixed bottom-8 left-8 z-30 hidden h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-sage-700 shadow-card backdrop-blur transition-colors hover:bg-sage-50 hover:text-sage-900 lg:flex"
        >
          <ArrowUp className="h-4.5 w-4.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
