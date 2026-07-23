"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

/** Sticky mobile conversion bar — appears after the hero, hides near the footer. */
export function MobileQuoteBar() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        y + window.innerHeight > document.body.scrollHeight - 160;
      setShow(y > 520 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-2.5">
            <Link
              href="/contact"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent font-medium text-accent-foreground shadow-soft active:scale-[0.98]"
            >
              Get an instant quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.name}`}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sage-300 text-sage-700 active:scale-[0.98]"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
