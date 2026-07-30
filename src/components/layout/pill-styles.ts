/**
 * Shared CTA pill styling for dark panels.
 *
 * Deliberately a PLAIN module — no "use client". A string exported from a
 * client module is not usable in a server component (only component references
 * cross that boundary), and importing it there silently resolves to nothing:
 * the pills render unstyled. Keeping the constant here lets both server
 * components (CtaBand) and client components (basket, inspection panel) share
 * one definition safely.
 */
export const darkContactPillClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/25 " +
  "bg-white/10 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20";
