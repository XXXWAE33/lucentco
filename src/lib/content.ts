/**
 * Home + marketing content.
 *
 * Service names and prices are NOT defined here — they live in
 * `src/config/pricing.ts`, the single source of truth.
 *
 * ⚠️ DO NOT SHIP `features` OR `stats` WITHOUT REWRITING THEM FIRST.
 * Both are legacy copy from the earlier general-cleaning positioning and
 * contain claims this business has NOT verified: a "bond-back guarantee", a
 * "60-point quality check", "98% bond-back success", "600+ reviews" and
 * "12k cleans". Nothing renders them today — `WhyLucent` and `StatsBand` were
 * both pulled from the homepage and About page for exactly this reason. If you
 * reinstate either component, replace every claim below with something the
 * client can substantiate.
 *
 * `steps` (How we work) IS current and safe — it was rewritten for the
 * carpet/upholstery business.
 */

export type Feature = {
  icon:
    | "leaf"
    | "shield"
    | "sparkles"
    | "users"
    | "clock"
    | "heart";
  title: string;
  body: string;
};

export const features: Feature[] = [
  {
    icon: "leaf",
    title: "Genuinely eco-friendly",
    body: "Plant-based, non-toxic products that are safe around kids, pets and asthma — never a harsh chemical smell.",
  },
  {
    icon: "shield",
    title: "Bond-back guarantee",
    body: "Our end-of-lease cleans are backed by a 72-hour re-clean guarantee, accepted by Brisbane agents.",
  },
  {
    icon: "users",
    title: "Vetted local cleaners",
    body: "Police-checked, insured and trained crews who live in Brisbane — the same faces, clean after clean.",
  },
  {
    icon: "sparkles",
    title: "The Lucent finish",
    body: "A 60-point quality check on every visit, because 'clean enough' isn't the standard we built this on.",
  },
  {
    icon: "clock",
    title: "Easy online booking",
    body: "Instant quotes and live availability — book in under two minutes, reschedule any time.",
  },
  {
    icon: "heart",
    title: "Fully insured & guaranteed",
    body: "$20M public liability and a satisfaction guarantee on every single clean we do.",
  },
];

export type Step = {
  number: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Get your price",
    body: "Tell us what needs doing — rooms of carpet, seats on the couch, how many mattresses. You get a fixed price on the spot.",
  },
  {
    number: "02",
    title: "Pick a time",
    body: "Choose a day that suits you and we'll confirm it. Blinds and water damage are booked in for an inspection first.",
  },
  {
    number: "03",
    title: "We do the work",
    body: "We arrive with the right equipment for the job, walk the space with you first, and flag anything we find before we start.",
  },
  {
    number: "04",
    title: "Same price you were quoted",
    body: "The figure you were given is the figure you pay. Nothing gets added on the day.",
  },
];

/*
 * Testimonials moved to `src/config/testimonials.ts` — they are currently
 * PLACEHOLDERS awaiting real reviews from the client.
 */

export const stats = [
  { value: "4.9", suffix: "★", label: "Average rating", detail: "from 600+ Brisbane reviews" },
  { value: "12", suffix: "k+", label: "Cleans completed", detail: "across Greater Brisbane" },
  { value: "98", suffix: "%", label: "Bond-back success", detail: "on end-of-lease cleans" },
  { value: "100", suffix: "%", label: "Eco products", detail: "non-toxic, biodegradable" },
];

export const ecoImpact = [
  { value: 38000, label: "Litres of greywater saved", unit: "L" },
  { value: 12400, label: "Plastic bottles avoided", unit: "" },
  { value: 9600, label: "Kg of harsh chemicals never used", unit: "kg" },
];
