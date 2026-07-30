/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️  PLACEHOLDER TESTIMONIALS — NOT REAL REVIEWS. DO NOT SHIP AS-IS.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Every entry below is a layout placeholder. The copy is written to read
 * obviously as a slot description rather than as a real customer quote, so
 * that if this ever reaches production by accident it reads as unfinished —
 * not as invented social proof.
 *
 * TO GO LIVE:
 *   1. Replace each entry with a real, attributable review from the client
 *      (Google Business Profile, Facebook, or written permission).
 *   2. Set `placeholder: false` on each replaced entry.
 *   3. `allPlaceholders` below flips to false automatically once none remain,
 *      which removes the development-only warning banner in the UI.
 *
 * Only publish reviews you can point to a source for.
 */

import type { ServiceContentId } from "./services-content";

export type Testimonial = {
  id: string;
  /** 1–5. Render exactly this many filled stars. */
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  name: string;
  /** Brisbane suburb, shown under the name. */
  suburb: string;
  /** Which service the review relates to. */
  service: ServiceContentId;
  /** MUST be false before this entry is shown publicly. */
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "p1",
    rating: 5,
    quote:
      "Placeholder review. Replace with a real client comment about a carpet clean — roughly two to three lines reads best in this card.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "carpet",
    placeholder: true,
  },
  {
    id: "p2",
    rating: 5,
    quote:
      "Placeholder review. A shorter quote also works here — the row heights are matched so cards stay aligned either way.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "couch",
    placeholder: true,
  },
  {
    id: "p3",
    rating: 5,
    quote:
      "Placeholder review. Use this slot for feedback that mentions the included deodoriser, since that is a real differentiator worth surfacing.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "couch",
    placeholder: true,
  },
  {
    id: "p4",
    rating: 4,
    quote:
      "Placeholder review. Not every review needs to be five stars — a genuine four-star comment reads as more credible than a wall of fives.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "mattress",
    placeholder: true,
  },
  {
    id: "p5",
    rating: 5,
    quote:
      "Placeholder review. Good slot for a comment about punctuality or communication on the day of the job.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "curtain",
    placeholder: true,
  },
  {
    id: "p6",
    rating: 5,
    quote:
      "Placeholder review. Use this one for feedback on the quoting process — accurate price, no surprises on the day.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "blind",
    placeholder: true,
  },
  {
    id: "p7",
    rating: 5,
    quote:
      "Placeholder review. Emergency or flood work belongs here — response time and how the situation was handled.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "flood-damage",
    placeholder: true,
  },
  {
    id: "p8",
    rating: 5,
    quote:
      "Placeholder review. A repeat-customer comment works well in this position — mention how many times they have booked.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "carpet",
    placeholder: true,
  },
  {
    id: "p9",
    rating: 5,
    quote:
      "Placeholder review. Keep quotes under about thirty words so the marquee cards stay a readable width on mobile.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "mattress",
    placeholder: true,
  },
  {
    id: "p10",
    rating: 4,
    quote:
      "Placeholder review. This slot suits a comment about the eco-friendly, pet-safe products, which is already a claim made elsewhere on the site.",
    name: "[Client name]",
    suburb: "[Suburb]",
    service: "curtain",
    placeholder: true,
  },
];

/** True while ANY testimonial is still a placeholder. Drives the dev warning. */
export const allPlaceholders = testimonials.some((t) => t.placeholder);

/** Split into two rows for the opposing-direction marquee. */
export const testimonialRows: [Testimonial[], Testimonial[]] = [
  testimonials.filter((_, i) => i % 2 === 0),
  testimonials.filter((_, i) => i % 2 === 1),
];
