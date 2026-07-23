/** Central business + brand config — single source of truth for copy and SEO. */
export const site = {
  name: "Lucent Clean Co.",
  shortName: "Lucent",
  tagline: "Brisbane's premium eco-cleaning service",
  description:
    "Lucent Clean Co. delivers premium, eco-friendly residential and commercial cleaning across Brisbane — from weekly homes to end-of-lease bonds and Airbnb turnovers.",
  url: "https://lucentcleanco.com.au",
  phone: "07 3040 1188",
  phoneHref: "tel:+61730401188",
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

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
