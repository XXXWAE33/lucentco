"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { useMobileCtaBarVisible } from "@/lib/use-mobile-cta-bar";
import { CallLink, WhatsAppLink, WhatsAppIcon } from "./contact-link";

/**
 * Sticky mobile conversion bar — appears after the hero, hides near the footer.
 * Visibility comes from the shared hook so `WhatsAppFab` can lift clear of it.
 */
export function MobileQuoteBar() {
  const reduce = useReducedMotion();
  const show = useMobileCtaBarVisible();

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
          {/*
            All three contact routes live here on mobile. The floating WhatsApp
            button is desktop-only precisely so it can never land on top of this
            bar or on a page CTA — see `WhatsAppFab`.
          */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/#instant-quote"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent font-medium text-accent-foreground shadow-soft active:scale-[0.98]"
            >
              Get a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppLink
              location="mobile-cta-bar"
              showIcon={false}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-emerald-700 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </WhatsAppLink>
            <CallLink
              location="mobile-cta-bar"
              showIcon={false}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sage-300 text-sage-700 active:scale-[0.98]"
            >
              <Phone className="h-5 w-5" />
            </CallLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
