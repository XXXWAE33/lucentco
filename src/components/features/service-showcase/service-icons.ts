import {
  BedDouble,
  Blinds,
  Droplets,
  Layers,
  Sofa,
  Waves,
  type LucideIcon,
} from "lucide-react";

/**
 * Service id → icon.
 *
 * Deliberately a PLAIN module — no "use client".
 *
 * This map used to live in `service-card.tsx`, which is a client component.
 * Importing a non-component value out of a client module into a SERVER
 * component makes React treat every entry as a client reference, and the build
 * fails at prerender with "Could not find the module …#serviceIcons#carpet in
 * the React Client Manifest". Typecheck and lint both pass — only a production
 * build catches it. Keeping the map here lets server components (WhyLucent,
 * ServicesOverview) and client components (ServiceCard, QuoteOnlyCard) share
 * one definition safely.
 */
export const serviceIcons: Record<string, LucideIcon> = {
  carpet: Layers,
  couch: Sofa,
  mattress: BedDouble,
  curtain: Waves,
  blind: Blinds,
  flood: Droplets,
};
