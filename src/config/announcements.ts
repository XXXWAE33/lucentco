/**
 * Rotating announcement strip — the thin dark bar pinned above the header.
 *
 * ⚠️ VERIFIED FACTS ONLY. The reference design runs promotional offers here
 * ("20% OFF your first challenge"). We do not have any client-approved offer,
 * and inventing one would be inventing a commercial commitment. Every line
 * below is already substantiated elsewhere in this codebase:
 *
 *   • deodoriser  — client rate card ("All couch cleaning includes deodorizer")
 *   • fixed prices — implemented in pricing.ts and shown on /pricing
 *   • non-toxic / call-out fees — owner-confirmed 2026-07-29
 *   • suburb count — derived from `serviceSuburbs`, never hardcoded
 *
 * TODO(client): if there IS a current promotion, add it as the first entry.
 */

import { serviceSuburbs } from "@/lib/site";

export const announcements: string[] = [
  "Deodoriser included on every couch clean",
  "Fixed prices you can check online",
  "Non-toxic & pet-safe products",
  "No hidden call-out fees",
  `Servicing ${serviceSuburbs.length} Brisbane suburbs`,
];
