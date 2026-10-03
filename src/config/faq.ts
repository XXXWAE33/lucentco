/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FAQ content — single source for /faq, the homepage FAQ and FAQPage schema.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ CLAIM PROVENANCE — READ BEFORE EDITING
 *
 * Answers here fall into two groups:
 *
 * (A) VERIFIED — restates something already true elsewhere in this codebase
 *     (pricing.ts, services-content.ts, the confirmed feature pills). Safe.
 *
 * (B) FROM THE BRIEF, UNVERIFIED — the redesign brief (2026-07-29) specified
 *     these answers, and they are published at the owner's direction. Each is
 *     tagged `verified: false` and carries a TODO. They are NEW commercial and
 *     legal commitments that appear nowhere else in the codebase, so they need
 *     an actual policy behind them before launch:
 *
 *       • money-back / satisfaction guarantee  → needs written policy + terms
 *       • "fully insured and certified"        → needs policy number + certifier
 *       • first-time customer discount         → needs an actual offer + expiry
 *       • same-day availability                → needs a real scheduling rule
 *       • free cancellation up to 24h          → needs to match /terms
 *
 * `unverifiedFaqIds` at the bottom lists them for a quick pre-launch audit.
 */

export type FaqCategory =
  | "General"
  | "Services"
  | "Pricing"
  | "Booking"
  | "Quality"
  | "Support";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  q: string;
  a: string;
  /** False = published from the brief but not yet substantiated. */
  verified: boolean;
  /** Show on the homepage FAQ block (the page shows all of them). */
  featured?: boolean;
};

export const faqCategories: FaqCategory[] = [
  "General",
  "Services",
  "Pricing",
  "Booking",
  "Quality",
  "Support",
];

export const faqs: FaqItem[] = [
  /* ─────────────────────────── General ─────────────────────────── */
  {
    id: "areas",
    category: "General",
    q: "What areas do you service?",
    a: "We focus on inner-city and riverside Brisbane suburbs — New Farm, Teneriffe, Paddington, Bulimba, Hawthorne, Ascot, West End and more. Concentrating on a tighter radius means less time driving and more time on the job. Not sure if we reach you? Ask — we're often nearby.",
    verified: true,
    featured: true,
  },
  {
    id: "eco",
    category: "General",
    q: "Do you use harsh chemicals?",
    a: "No. We use plant-based, non-toxic and biodegradable products as standard on every job — safe around children and pets, with no lingering chemical smell.",
    verified: true,
    featured: true,
  },
  {
    id: "insured",
    category: "General",
    q: "Are you insured?",
    a: "Yes — Velora Cleaning Brisbane is fully insured and our technicians are trained and certified.",
    // TODO(client): supply insurer, policy number and the certifying body. This
    // is a legal claim; publishing it unsubstantiated is a real exposure.
    verified: false,
  },

  /* ─────────────────────────── Services ─────────────────────────── */
  {
    id: "included",
    category: "Services",
    q: "What's included in a clean?",
    a: "Every job starts with an inspection and pre-treatment of visible stains, then the main clean using the method matched to your fabric. Carpet gets hot-water extraction; couches finish with a deodoriser at no extra cost. We walk the space with you first and flag anything we find before starting.",
    verified: true,
    featured: true,
  },
  {
    id: "duration",
    category: "Services",
    q: "How long does it take?",
    a: "It depends on size and condition. A single carpeted room is usually well under an hour; a three-seater couch is similar. We'll give you a realistic window when we confirm your booking rather than a number that suits us.",
    verified: true,
  },
  {
    id: "blinds-flood",
    category: "Services",
    q: "Why can't you price blinds or flood damage online?",
    a: "Both vary too much to price honestly from a web form. Blinds differ by material, size and condition, and water damage depends on volume, how long it has been sitting, and what's underneath the flooring. We inspect first, then give you the scope in writing.",
    verified: true,
    featured: true,
  },

  /* ─────────────────────────── Pricing ─────────────────────────── */
  {
    id: "cost",
    category: "Pricing",
    q: "How much does cleaning cost?",
    a: "Carpet cleaning starts at $139 for one room, couches at $159 for a three-seater, mattresses at $119 and curtains at $119. Every price for those services is published up front — pick your quantities on the pricing page and you'll see the exact figure before you contact us.",
    verified: true,
    featured: true,
  },
  {
    id: "hidden-fees",
    category: "Pricing",
    q: "Are there any hidden fees?",
    a: "No. There's no call-out fee, and the price we confirm before starting is the price you pay — nothing is added on the day.",
    verified: true,
    featured: true,
  },
  {
    id: "discounts",
    category: "Pricing",
    q: "Do you offer discounts?",
    a: "Quantity discounts are built into the pricing itself — extra carpet rooms, extra couch seats and larger blind jobs all cost less per unit as the job grows. We also run a first-time customer offer; mention it when you get in touch.",
    // TODO(client): confirm the first-time offer — amount, conditions, expiry.
    // The quantity-discount half of this answer IS verified in pricing.ts.
    verified: false,
  },

  /* ─────────────────────────── Booking ─────────────────────────── */
  {
    id: "same-day",
    category: "Booking",
    q: "Can I book same-day service?",
    a: "Sometimes, depending on availability. Call or WhatsApp us and we'll tell you honestly what's open today rather than take a booking we can't keep.",
    // TODO(client): confirm whether same-day is genuinely offered and any cut-off.
    verified: false,
  },
  {
    id: "reschedule",
    category: "Booking",
    q: "Can I reschedule or cancel?",
    a: "Yes — free cancellation or rescheduling up to 24 hours before your booking. Plans change; just let us know as early as you can.",
    // TODO(client): confirm the 24h window and make sure /terms matches it.
    verified: false,
  },
  {
    id: "preparation",
    category: "Booking",
    q: "Do I need to prepare anything?",
    a: "Just clear small items and valuables from the areas being cleaned so we have room to work. You don't need to move heavy furniture — tell us what needs shifting and we'll handle it.",
    verified: true,
  },

  /* ─────────────────────────── Quality ─────────────────────────── */
  {
    id: "not-satisfied",
    category: "Quality",
    q: "What if I'm not satisfied?",
    a: "Contact us and we'll make it right. We back our work with a satisfaction guarantee.",
    // TODO(client): define this precisely — re-clean, partial refund, or full
    // money-back? Over what window? An undefined guarantee is unenforceable and
    // invites disputes. Must also match /terms.
    verified: false,
  },
  {
    id: "stains",
    category: "Quality",
    q: "Will you get every stain out?",
    a: "We won't promise that, because it isn't always true. Some staining is permanent — dye transfer, bleaching and sun damage in particular. We'll tell you what we think will and won't lift before we start, rather than after.",
    verified: true,
  },
  {
    id: "products-safe",
    category: "Quality",
    q: "Is it safe for pets and children?",
    a: "Yes. Our products are plant-based, non-toxic and biodegradable. We'll let you know when the area is ready to use again before we leave.",
    verified: true,
  },

  /* ─────────────────────────── Support ─────────────────────────── */
  {
    id: "contact",
    category: "Support",
    q: "How do I get in touch?",
    a: "Call or WhatsApp for the fastest answer, or send an enquiry through the contact form and we'll reply within one business hour during opening times.",
    verified: true,
  },
  {
    id: "quote-accuracy",
    category: "Support",
    q: "How accurate is the online quote?",
    a: "For carpet, couch, mattress and curtain cleaning it's the actual price for the quantities you select, not an estimate. We confirm it with you before starting. Blinds and water damage are quoted after inspection.",
    verified: true,
  },
];

/** Homepage FAQ block — a curated subset, not the full list. */
export const featuredFaqs = faqs.filter((f) => f.featured);

/**
 * Pre-launch audit list. Every id here is published but unsubstantiated.
 * Resolve each TODO above, flip `verified: true`, and this empties out.
 */
export const unverifiedFaqIds = faqs.filter((f) => !f.verified).map((f) => f.id);
