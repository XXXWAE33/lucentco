/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Homepage content — hero, trust strip, and the "Book with confidence" split.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Prices live in `pricing.ts`. Service process copy lives in
 * `services-content.ts`. This file holds homepage-specific content only.
 */

import type { ServiceImageSlot } from "./services-content";
import { serviceSuburbs } from "@/lib/site";

/* ──────────────────────────────── hero ──────────────────────────────────── */

export const hero = {
  // Kept short so it stays on ONE line at 375px. "Brisbane" is carried by the
  // sub-line instead, so no locality signal is lost.
  eyebrow: "Carpet & upholstery specialists",
  /** Rendered as two separate lines — guaranteed to break the same way at 375px. */
  headline: { lineOne: "Every fibre,", lineTwo: "properly clean." },
  subline:
    "Specialist carpet, upholstery, mattress and curtain cleaning across Brisbane — with fixed prices you can check before you call.",
  // Hash selects the tool: #instant-quote = single service, which is what
  // "instant quote" implies. #build-your-clean would open the basket instead.
  primaryCta: { label: "Get an instant quote", href: "#instant-quote" },
  /** Secondary CTA is a tel: link, wired through `CallLink` for tracking. */
  secondaryCtaLabel: "Call us",
} as const;

/**
 * Hero photograph. This is the LCP element — it is loaded with `priority`.
 * See the IMAGE MANIFEST at the bottom of this file.
 */
export const heroImage: ServiceImageSlot = {
  src: "/hero/hero-clean.jpg",
  alt: "Close detail of a carpet or upholstery surface part-way through cleaning, showing the contrast between cleaned and uncleaned fibre",
  available: false,
};

/* ───────────────────────────── trust strip ──────────────────────────────── */

export type TrustStat = {
  id: string;
  /** Icon key resolved to a lucide icon in the component. */
  icon: "jobs" | "years" | "suburbs" | "rating";
  /**
   * The real figure. `null` means the client has not supplied it yet, and the
   * UI renders a dash instead of a number. NEVER put a guess here.
   */
  value: number | null;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /**
   * Development-only sample used to preview the count-up animation.
   * Never rendered in production — see `TrustStrip`.
   */
  devPreviewValue: number;
};

/**
 * ─── PROVENANCE ──────────────────────────────────────────────────────────────
 * These figures were supplied by the site owner in the redesign brief
 * (2026-07-29), which specified the hero stats as "2,400+ | 8+ | 18+" and the
 * trust bar as "4.9★ 127 Google Reviews". They are now published.
 *
 * ⚠️ BEFORE LAUNCH, verify each against a source the business can show:
 *   • jobs completed — confirm whether this is all-time or since a given year.
 *   • years operating — confirm the trading start year.
 *   • Google rating + review count — MUST match the live Google Business
 *     Profile. A rating that disagrees with the public profile is a
 *     verifiable false claim, not a rounding difference.
 *
 * `suburbs` is the only self-verifying figure: it is derived from
 * `serviceSuburbs.length`, so it cannot drift from the list the site renders.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const trustStats: TrustStat[] = [
  {
    id: "jobs",
    icon: "jobs",
    value: 2400,
    suffix: "+",
    label: "Jobs completed",
    devPreviewValue: 2400,
  },
  {
    id: "years",
    icon: "years",
    value: 8,
    suffix: "+",
    label: "Years operating",
    devPreviewValue: 8,
  },
  {
    id: "suburbs",
    // Derived, never hardcoded — cannot disagree with the rendered list.
    icon: "suburbs",
    value: serviceSuburbs.length,
    suffix: "+",
    label: "Brisbane suburbs",
    devPreviewValue: serviceSuburbs.length,
  },
];

export type RatingBadge = {
  id: string;
  platform: string;
  /** null until confirmed against the live profile. */
  rating: number | null;
  reviewCount: number | null;
  devPreviewRating: number;
  devPreviewCount: number;
};

/**
 * Supplied in the brief as "4.9★ 127 Google Reviews".
 *
 * ⚠️ TODO(client): confirm both numbers against the live Google Business
 * Profile before launch. These are checkable by anyone in one click, so a
 * mismatch is a false claim rather than a cosmetic detail.
 */
export const ratingBadges: RatingBadge[] = [
  {
    id: "google",
    platform: "Google Reviews",
    rating: 4.9,
    reviewCount: 127,
    devPreviewRating: 4.9,
    devPreviewCount: 127,
  },
];

/** True while any trust figure is still unsupplied. Drives the dev warning. */
export const trustHasPlaceholders =
  trustStats.some((s) => s.value === null) ||
  ratingBadges.some((b) => b.rating === null);

/* ───────────────────── section 2 — book with confidence ─────────────────── */

export type ConfidencePill = {
  id: string;
  label: string;
  icon: "deodoriser" | "pricing" | "callout" | "eco";
};

/**
 * Feature pills. All four were confirmed by the site owner before shipping.
 *
 * Provenance, for the record:
 *   • deodoriser + pricing — taken directly from the supplied client rate card.
 *   • callout + eco        — originated as placeholder copy already in this
 *                            repo; flagged as unverified and explicitly
 *                            confirmed by the owner on 2026-07-29.
 */
export const confidencePills: ConfidencePill[] = [
  // Kept short so they flow 2–3 per row. The couch qualifier stays, because
  // the deodoriser is included on couch jobs specifically, not on everything.
  { id: "deodoriser", label: "Deodoriser included on couches", icon: "deodoriser" },
  { id: "pricing", label: "Fixed prices online", icon: "pricing" },
  { id: "callout", label: "No hidden call-out fees", icon: "callout" },
  { id: "eco", label: "Non-toxic & pet-safe", icon: "eco" },
];

export const confidence = {
  eyebrow: "Book with confidence",
  headline: { lineOne: "No surprises,", lineTwo: "start to finish." },
  body: "You see the price before you book, and the same price when we finish. Build a quote in the browser, or call and we'll walk you through it.",
} as const;

/* ───────────────────── "get your price" journey band ─────────────────────── */

export type JourneyStage = {
  id: string;
  badge: string;
  icon: "quote" | "basket" | "talk";
  title: string;
  body: string;
};

/**
 * Three real routes to a price on this site — not an invented career ladder.
 * Each stage links to a genuine destination: the pricing selector, the
 * multi-service basket, or a live person.
 */
export const journeyStages: JourneyStage[] = [
  {
    id: "quote",
    badge: "Start here",
    icon: "quote",
    title: "Get one price",
    body: "Pick a service, pick the size — a fixed price in three taps.",
  },
  {
    id: "basket",
    badge: "Multiple jobs",
    icon: "basket",
    title: "Build a combined quote",
    body: "Add carpets, couches, curtains — one running total, live.",
  },
  {
    id: "talk",
    badge: "Rather talk?",
    icon: "talk",
    title: "Call or WhatsApp",
    body: "Tell us what's involved and we'll quote it on the spot.",
  },
];

/* ─────────────────────── editorial content cards ─────────────────────────── */

export type ContentCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  image: ServiceImageSlot;
};

/**
 * Three image cards — one wide, two narrow — mirroring the reference's
 * editorial block.
 *
 * Every card links to content that ACTUALLY EXISTS on this site (the carpet
 * process, the couch inclusion, the inspection-first services). The reference
 * fills this block with video success stories; we don't have those, and
 * fabricating "watch real customers" cards that lead nowhere would be worse
 * than adapting the block.
 */
export const contentCards: ContentCard[] = [
  {
    id: "carpet-method",
    eyebrow: "The method",
    title: "Why extraction beats a surface clean",
    body: "Hot water goes in, soil and moisture come straight back out — so grit at the base of the pile leaves with it, instead of being pushed deeper.",
    // NOTE: anchors live on /pricing (ServicePriceCard sets id={service.id}).
    // /services renders the same services but WITHOUT ids, so #carpet there
    // silently lands at the top of the page.
    href: "/pricing#carpet",
    image: {
      src: "/content/carpet-method.jpg",
      alt: "Extraction wand drawing soil out of a carpet, leaving a visibly cleaner strip",
      available: false,
    },
  },
  {
    id: "couch-deodoriser",
    eyebrow: "Included",
    title: "Deodoriser on every couch",
    body: "Neutralised at the source, not masked — and never quoted as an extra.",
    href: "/pricing#couch",
    image: {
      src: "/content/couch-deodoriser.jpg",
      alt: "Upholstery tool cleaning a fabric sofa cushion",
      available: false,
    },
  },
  {
    id: "inspection-first",
    eyebrow: "Quoted properly",
    title: "Blinds & water damage",
    body: "Too variable to price from a web form. We look first, then quote in writing.",
    href: "/pricing#blind",
    image: {
      src: "/content/inspection.jpg",
      alt: "Technician inspecting venetian blinds before cleaning",
      available: false,
    },
  },
];

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * IMAGE MANIFEST — homepage
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   /public/hero/hero-clean.jpg          2000 × 1500  (4:3)   — hero
 *   /public/content/carpet-method.jpg    1800 × 1200  (3:2)   — wide card
 *   /public/content/couch-deodoriser.jpg 1200 × 1200  (1:1)   — narrow card
 *   /public/content/inspection.jpg       1200 × 1200  (1:1)   — narrow card
 *
 * Notes:
 *   • The hero is the LCP element. Keep it under ~400KB — compress hard. WebP
 *     is fine; change the extension in `heroImage.src` to match.
 *   • Best subject for all four: a close, well-lit detail shot part-way through
 *     the work, where the difference between done and not-done is visible. Wide
 *     room shots read as generic stock.
 *   • A gradient scrim sits over the lower portion of every slot, so keep
 *     critical detail out of the bottom third.
 *   • Set the matching `available: true` once each file is in place. Nothing
 *     404s in the meantime — a designed placeholder renders instead.
 */
