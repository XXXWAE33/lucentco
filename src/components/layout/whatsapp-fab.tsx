"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { site, contactChannels } from "@/lib/site";
import { useMobileCtaBarVisible } from "@/lib/use-mobile-cta-bar";
import { WhatsAppLink } from "./contact-link";

/**
 * Persistent WhatsApp entry point, bottom-right on every page.
 *
 * Collision handling — what is already anchored to the bottom of the viewport:
 *   • `MobileQuoteBar`  — full-width, `bottom-0 z-40`, mobile only (`lg:hidden`),
 *     appears past 520px of scroll. The button lifts above it when it shows.
 *   • `Header`'s mobile drawer — `z-50`, so it correctly covers this button.
 * This sits at `z-30`: above page content, below both of the above.
 */
export function WhatsAppFab() {
  const reduce = useReducedMotion();
  const ctaBarVisible = useMobileCtaBarVisible();

  return (
    <motion.div
      // A single, quiet entrance. No looping or pulsing.
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: reduce ? 0.2 : 0.45,
        delay: reduce ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        // DESKTOP ONLY. On mobile a floating button inevitably lands on top of
        // page CTAs and the sticky bar, so WhatsApp lives inside
        // `MobileQuoteBar` there instead. This removes the collision entirely
        // rather than trying to dodge it with offsets.
        "hidden lg:block",
        "fixed right-5 z-30 lg:right-8",
        "transition-[bottom] duration-300 ease-out-soft",
        ctaBarVisible ? "bottom-28" : "bottom-6",
        "lg:bottom-8",
      )}
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <WhatsAppLink
        location="floating-button"
        showIcon={false}
        ariaLabel={`Message ${site.name} on WhatsApp at ${contactChannels.whatsapp.display}`}
        className={cn(
          "group flex h-14 items-center gap-0 overflow-hidden rounded-full bg-accent pl-[1.125rem] pr-[1.125rem]",
          "text-accent-foreground shadow-lifted ring-1 ring-black/5",
          "transition-[gap,padding,box-shadow] duration-300 ease-out-soft",
          "hover:shadow-glow active:scale-[0.97]",
          // Reveal the label on pointer devices; icon-only on touch.
          "lg:hover:gap-2.5 lg:hover:pr-6",
        )}
      >
        <WhatsAppIconSized />
        <span
          aria-hidden="true"
          className={cn(
            "hidden max-w-0 whitespace-nowrap text-sm font-semibold opacity-0",
            "transition-[max-width,opacity] duration-300 ease-out-soft",
            "lg:block lg:group-hover:max-w-[9rem] lg:group-hover:opacity-100",
          )}
        >
          Chat on WhatsApp
        </span>
      </WhatsAppLink>
    </motion.div>
  );
}

function WhatsAppIconSized() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="h-6 w-6 shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.02 12.02 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.893 0-3.176-1.24-6.165-3.495-8.411l.015-.042ZM12.05 21.785h-.005a9.94 9.94 0 0 1-5.06-1.38l-.363-.216-3.762.982 1.006-3.647-.236-.375a9.86 9.86 0 0 1-1.516-5.257c.002-5.45 4.456-9.884 9.938-9.884 2.654 0 5.147 1.031 7.021 2.9a9.83 9.83 0 0 1 2.909 6.994c-.003 5.45-4.457 9.883-9.932 9.883Z" />
    </svg>
  );
}
