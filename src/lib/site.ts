/* ───────────────────────────── contact channels ─────────────────────────── */

/**
 * Numbers are written once, in display format. Link targets are DERIVED by
 * stripping to digits — never write a `tel:` or `wa.me` URL by hand.
 */
const stripToDigits = (value: string) => value.replace(/\D/g, "");

const CALL_NUMBER = "+61 415 577 273";
const WHATSAPP_NUMBER = "+61 404 760 018";

export type ContactChannel = {
  id: "call" | "whatsapp";
  /** Short action label for buttons. */
  label: string;
  /** Human-readable number, e.g. "+61 415 557 273". */
  display: string;
  /** Digits only, e.g. "61415557273". */
  digits: string;
  href: string;
};

export const contactChannels = {
  call: {
    id: "call",
    label: "Call us",
    display: CALL_NUMBER,
    digits: stripToDigits(CALL_NUMBER),
    href: `tel:+${stripToDigits(CALL_NUMBER)}`,
  },
  whatsapp: {
    id: "whatsapp",
    label: "WhatsApp",
    display: WHATSAPP_NUMBER,
    digits: stripToDigits(WHATSAPP_NUMBER),
    href: `https://wa.me/${stripToDigits(WHATSAPP_NUMBER)}`,
  },
} satisfies Record<string, ContactChannel>;

/** Fallback WhatsApp prefill when there is no page-specific context. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Lucent Clean, I'd like a quote for cleaning.";

/** Prefill for a specific service, e.g. "…a quote for couch cleaning." */
export function whatsappServiceMessage(serviceName: string): string {
  return `Hi Lucent Clean, I'd like a quote for ${serviceName.toLowerCase()}.`;
}

/** Prefill for the multi-service basket: what's selected plus the estimate. */
export function whatsappBasketMessage(
  items: string[],
  total: string,
): string {
  if (items.length === 0) return WHATSAPP_DEFAULT_MESSAGE;
  return `Hi Lucent Clean, I'd like a quote for: ${items.join(", ")}. Estimated total ${total}.`;
}

/** Build a wa.me link with an optional prefilled message. */
export function whatsappHref(message?: string): string {
  const text = message?.trim() || WHATSAPP_DEFAULT_MESSAGE;
  return `${contactChannels.whatsapp.href}?text=${encodeURIComponent(text)}`;
}

/* ──────────────────────────────── brand ─────────────────────────────────── */

/** Central business + brand config — single source of truth for copy and SEO. */
export const site = {
  name: "Lucent Clean Co.",
  shortName: "Lucent",
  tagline: "Brisbane carpet & upholstery specialists",
  description:
    "Specialist carpet, couch, mattress and curtain cleaning across Brisbane, plus blind cleaning and emergency water extraction. Fixed prices you can check online, non-toxic products, and deodoriser included on every couch clean.",
  url: "https://lucentcleanco.com.au",
  /** Primary voice channel — mirrors `contactChannels.call`. */
  phone: contactChannels.call.display,
  phoneHref: contactChannels.call.href,
  whatsapp: contactChannels.whatsapp.display,
  email: "hello@lucentcleanco.com.au",
  abn: "12 345 678 901",
  address: {
    street: "Level 2, 240 Wickham Street",
    suburb: "Fortitude Valley",
    state: "QLD",
    postcode: "4006",
  },
  hours: "Mon–Sat · 7am–6pm",
  socials: {
    instagram: "https://instagram.com/lucentcleanco",
    facebook: "https://facebook.com/lucentcleanco",
  },
} as const;

/** Real Brisbane suburbs we service — reused across copy, quotes, and availability. */
export const serviceSuburbs = [
  "New Farm",
  "Teneriffe",
  "Paddington",
  "Bulimba",
  "Hawthorne",
  "Ascot",
  "Hamilton",
  "West End",
  "Toowong",
  "Indooroopilly",
  "Bardon",
  "Coorparoo",
  "Camp Hill",
  "Wilston",
  "Newstead",
  "Kangaroo Point",
  "Chelmer",
  "Graceville",
] as const;

/**
 * Primary nav. Kept to five items — the desktop bar starts crowding the CTAs
 * past that, and the mobile drawer starts needing a scroll.
 */
export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
