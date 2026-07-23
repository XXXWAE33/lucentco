/** Content for the Services / About / Pricing / Contact pages. Real Brisbane copy. */

export type CatalogItem = { name: string; desc: string };
export type ServiceCategory = {
  id: string;
  name: string;
  tagline: string;
  intro: string;
  services: CatalogItem[];
  from: number; // 0 = custom quote
};

export const serviceCatalog: ServiceCategory[] = [
  {
    id: "residential",
    name: "Residential cleaning",
    tagline: "Homes that feel brand new",
    intro:
      "Whether it's a weekly refresh in New Farm or a full reset in Bardon, our residential cleans use eco products and the same 60-point standard every visit.",
    services: [
      {
        name: "Regular maintenance",
        desc: "Weekly, fortnightly or monthly cleans that keep your home consistently fresh — same trusted cleaner each time.",
      },
      {
        name: "Deep clean",
        desc: "A meticulous top-to-bottom reset of every room, including the spots a standard clean skips.",
      },
      {
        name: "Spring clean",
        desc: "A seasonal once-over — skirting boards, light fittings, inside cupboards and the forgotten corners.",
      },
      {
        name: "Move-in / move-out",
        desc: "Start fresh in a spotless new place, or hand the old one back gleaming.",
      },
    ],
    from: 120,
  },
  {
    id: "end-of-lease",
    name: "End of lease & bond cleaning",
    tagline: "Bond back, guaranteed",
    intro:
      "Moving out is stressful enough. Our real-estate-ready bond cleans follow your agent's exit checklist to the letter — and we back it with a 72-hour re-clean guarantee.",
    services: [
      {
        name: "Bond-back clean",
        desc: "A full exit clean checked against your agent's list, accepted by Brisbane property managers.",
      },
      {
        name: "Carpet steam clean",
        desc: "Professional hot-water extraction to lift stains and meet lease requirements.",
      },
      {
        name: "Walls, marks & skirting",
        desc: "Spot-cleaning of walls, switches and skirting boards throughout.",
      },
      {
        name: "Oven, windows & tracks",
        desc: "Degreased oven, sparkling interior windows and detailed door and window tracks.",
      },
    ],
    from: 290,
  },
  {
    id: "specialty",
    name: "Specialty services",
    tagline: "The detail work",
    intro:
      "Targeted services that restore the things a standard clean can't — bookable on their own or added to any clean.",
    services: [
      {
        name: "Carpet & upholstery steam",
        desc: "Deep extraction cleaning for carpets, rugs, lounges and mattresses.",
      },
      {
        name: "Interior & exterior windows",
        desc: "Streak-free glass, frames and sills inside and out (ground level).",
      },
      {
        name: "Oven & rangehood detail",
        desc: "Full degrease of oven, racks, trays, cooktop and rangehood filters.",
      },
      {
        name: "Mattress sanitising",
        desc: "Anti-allergen treatment that freshens and sanitises mattresses.",
      },
    ],
    from: 99,
  },
  {
    id: "commercial",
    name: "Commercial cleaning",
    tagline: "Spaces that mean business",
    intro:
      "Reliable, after-hours cleaning for Brisbane offices, retail and short-stays — consistent crews, easy invoicing, consistently spotless results.",
    services: [
      {
        name: "Office & co-working",
        desc: "Desks, kitchens, bathrooms and breakout spaces kept presentation-ready.",
      },
      {
        name: "Retail & showroom",
        desc: "Front-of-house shine that makes the right first impression every day.",
      },
      {
        name: "Airbnb & short-stay turnover",
        desc: "Fast, photo-perfect turnovers with linen and consumable restocking.",
      },
      {
        name: "Scheduled contracts",
        desc: "Flexible daily, weekly or custom schedules tailored to your premises.",
      },
    ],
    from: 0,
  },
];

export const addonServices: CatalogItem[] = [
  { name: "Eco-friendly products", desc: "Plant-based, non-toxic and biodegradable — included on every clean at no extra cost." },
  { name: "Pet-friendly clean", desc: "Pet-safe products and extra attention to fur, paw marks and bedding areas." },
  { name: "Inside fridge & freezer", desc: "Emptied, wiped and sanitised, ready to restock." },
  { name: "Balcony & patio", desc: "Swept, wiped and tidied for outdoor spaces." },
];

export type PricingTier = {
  name: string;
  desc: string;
  oneOff: number;
  recurring: number;
  popular?: boolean;
  features: string[];
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Apartment",
    desc: "1–2 bedrooms",
    oneOff: 140,
    recurring: 115,
    features: [
      "All living areas & kitchen",
      "Up to 2 bathrooms",
      "Eco products included",
      "Same trusted cleaner",
    ],
  },
  {
    name: "House",
    desc: "3 bedrooms",
    oneOff: 190,
    recurring: 155,
    popular: true,
    features: [
      "Everything in Apartment",
      "Up to 3 bedrooms & 2 bathrooms",
      "Interior windows included",
      "Priority booking slots",
    ],
  },
  {
    name: "Large home",
    desc: "4+ bedrooms",
    oneOff: 250,
    recurring: 205,
    features: [
      "Everything in House",
      "4+ bedrooms & multiple bathrooms",
      "Living & dining detail",
      "Dedicated 2-person crew",
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need to provide cleaning products or equipment?",
    a: "No — our crews arrive fully equipped with all eco-friendly products and professional equipment. If you'd prefer we use something specific you have, just let us know.",
  },
  {
    q: "Are your products really safe for kids and pets?",
    a: "Yes. We use plant-based, non-toxic and biodegradable products as standard on every clean — no harsh chemical residue or fumes.",
  },
  {
    q: "What is the bond-back guarantee?",
    a: "For end-of-lease cleans, if your agent isn't satisfied with anything on the exit checklist, we'll return within 72 hours and re-clean it free of charge.",
  },
  {
    q: "Which Brisbane suburbs do you service?",
    a: "We focus on the inner-city and riverside suburbs including New Farm, Teneriffe, Paddington, Bulimba, Hawthorne, Ascot, West End and many more. Not sure if we cover you? Just ask.",
  },
  {
    q: "Can I reschedule or cancel a recurring clean?",
    a: "Absolutely. You can pause, reschedule or cancel any recurring clean any time — there are no lock-in contracts for residential customers.",
  },
  {
    q: "Are you insured?",
    a: "Yes — Lucent Clean Co. carries $20M public liability insurance and every cleaner is police-checked and fully insured.",
  },
];
