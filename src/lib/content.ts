/** Home + marketing content. Real Brisbane copy — no placeholders. */

export type ServiceGroup = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  items: string[];
  from: number; // indicative "from" price (AUD)
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "residential",
    name: "Residential",
    tagline: "Homes that feel brand new",
    blurb:
      "Regular and one-off cleans for houses and apartments — from a weekly tidy in New Farm to a full spring clean in Bardon.",
    items: [
      "Weekly, fortnightly & monthly",
      "Deep cleans & spring cleans",
      "Move-in / move-out",
      "Eco & pet-friendly products",
    ],
    from: 120,
  },
  {
    id: "end-of-lease",
    name: "End of Lease",
    tagline: "Bond back, guaranteed",
    blurb:
      "Real-estate-ready exit cleans checked against your agent's exit list. If they're not happy, we return within 72 hours — free.",
    items: [
      "Agent-approved checklist",
      "Carpet steam add-on",
      "Oven, windows & walls",
      "Bond-back guarantee",
    ],
    from: 290,
  },
  {
    id: "specialty",
    name: "Specialty",
    tagline: "The detail work",
    blurb:
      "Targeted services that restore the things a standard clean can't — upholstery, glass, ovens and mattresses.",
    items: [
      "Carpet & upholstery steam",
      "Interior & exterior windows",
      "Oven & rangehood detail",
      "Mattress sanitising",
    ],
    from: 99,
  },
  {
    id: "commercial",
    name: "Commercial",
    tagline: "Spaces that mean business",
    blurb:
      "Reliable, after-hours cleaning for Brisbane offices, retail and short-stays — consistent crews, consistent results.",
    items: [
      "Offices & co-working",
      "Retail & showrooms",
      "Airbnb turnover",
      "Scheduled contracts",
    ],
    from: 0,
  },
];

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
    title: "Get your instant quote",
    body: "Tell us your suburb, home size and the clean you need. Our quote tool gives you a transparent price range in seconds.",
  },
  {
    number: "02",
    title: "Pick a time that suits",
    body: "Choose from live availability across your area — one-off or recurring, mornings or after-hours.",
  },
  {
    number: "03",
    title: "Meet your cleaner",
    body: "A vetted local crew arrives fully equipped with eco products. Track their progress from confirmed to complete.",
  },
  {
    number: "04",
    title: "Enjoy the Lucent finish",
    body: "Walk into a spotless space. Not perfect? We'll make it right — guaranteed.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  suburb: string;
  service: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Got my full bond back with zero fuss. The team followed our agent's exit list to the letter and even re-did one room same day. Genuinely impressed.",
    name: "Hannah M.",
    suburb: "Bulimba",
    service: "End of lease",
    rating: 5,
  },
  {
    quote:
      "We've had the same fortnightly cleaner for eight months now. The house always smells fresh, never chemical, and it's safe for our two dogs.",
    name: "Daniel & Priya",
    suburb: "Paddington",
    service: "Fortnightly residential",
    rating: 5,
  },
  {
    quote:
      "Manages our three Airbnb properties across New Farm and Teneriffe. Turnovers are flawless and guests constantly mention how clean the places are.",
    name: "Marcus T.",
    suburb: "New Farm",
    service: "Airbnb turnover",
    rating: 5,
  },
  {
    quote:
      "Our West End office has never looked better. Reliable after-hours crew, easy invoicing, and the difference in the kitchen and bathrooms is night and day.",
    name: "Sophie L.",
    suburb: "West End",
    service: "Commercial office",
    rating: 5,
  },
];

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
