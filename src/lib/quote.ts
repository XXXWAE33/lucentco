/**
 * Transparent quote estimator + option data for the AI Instant Quote tool.
 * Pure functions, no React — easy to reuse, test, or swap for a real API later.
 */
import { serviceSuburbs } from "./site";

export type ServiceId = "residential" | "end-of-lease" | "specialty" | "commercial";

export const serviceOptions: {
  id: ServiceId;
  label: string;
  desc: string;
}[] = [
  { id: "residential", label: "Residential", desc: "Homes & apartments" },
  { id: "end-of-lease", label: "End of Lease", desc: "Bond-back clean" },
  { id: "specialty", label: "Specialty", desc: "Carpet, windows & more" },
  { id: "commercial", label: "Commercial", desc: "Office, retail, Airbnb" },
];

export const bedroomOptions = [1, 2, 3, 4, 5] as const;
export const bathroomOptions = [1, 2, 3, 4] as const;

export const specialtyItemOptions: { id: string; label: string; price: number }[] =
  [
    { id: "carpet", label: "Carpet & upholstery", price: 99 },
    { id: "windows", label: "Windows", price: 120 },
    { id: "oven", label: "Oven & rangehood", price: 89 },
    { id: "mattress", label: "Mattress sanitising", price: 79 },
  ];

export const premisesOptions: {
  id: string;
  label: string;
  desc: string;
  base: number;
}[] = [
  { id: "small", label: "Small", desc: "Up to ~100m²", base: 180 },
  { id: "medium", label: "Medium", desc: "100–300m²", base: 380 },
  { id: "large", label: "Large", desc: "300m²+", base: 720 },
];

export const frequencyOptions: {
  id: string;
  label: string;
  mult: number;
  note: string;
}[] = [
  { id: "one-off", label: "One-off", mult: 1, note: "Single visit" },
  { id: "monthly", label: "Monthly", mult: 0.93, note: "Save 7%" },
  { id: "fortnightly", label: "Fortnightly", mult: 0.88, note: "Save 12%" },
  { id: "weekly", label: "Weekly", mult: 0.82, note: "Save 18%" },
];

export const conditionOptions: {
  id: string;
  label: string;
  desc: string;
  mult: number;
}[] = [
  { id: "light", label: "Light", desc: "Well maintained", mult: 1 },
  { id: "average", label: "Average", desc: "Normal wear", mult: 1.15 },
  { id: "heavy", label: "Heavy", desc: "Needs extra love", mult: 1.3 },
];

export const addonOptions: { id: string; label: string; price: number }[] = [
  { id: "carpet", label: "Carpet steam", price: 69 },
  { id: "windows", label: "Interior windows", price: 49 },
  { id: "oven", label: "Oven detail", price: 45 },
  { id: "fridge", label: "Inside fridge", price: 29 },
  { id: "balcony", label: "Balcony / patio", price: 35 },
  { id: "eco", label: "Eco deep-pack", price: 25 },
];

export const suburbOptions = [...serviceSuburbs];

export type QuoteInput = {
  service: ServiceId | null;
  bedrooms: number | null;
  bathrooms: number | null;
  specialtyItems: string[];
  premises: string | null;
  frequency: string;
  condition: string;
  addons: string[];
  suburb: string | null;
};

export const initialQuoteInput: QuoteInput = {
  service: null,
  bedrooms: null,
  bathrooms: null,
  specialtyItems: [],
  premises: null,
  frequency: "one-off",
  condition: "average",
  addons: [],
  suburb: null,
};

export type LineItem = { label: string; amount: number };

export type QuoteResult = {
  min: number;
  max: number;
  recurring: boolean;
  lineItems: LineItem[];
  note: string;
};

const round5 = (n: number) => Math.round(n / 5) * 5;

/** Whether step 3 (frequency vs condition) applies, and which one. */
export function step3Mode(service: ServiceId | null): "frequency" | "condition" {
  return service === "residential" || service === "commercial"
    ? "frequency"
    : "condition";
}

/** Estimate a price range with a transparent line-item breakdown. */
export function estimateQuote(input: QuoteInput): QuoteResult {
  const lineItems: LineItem[] = [];
  let subtotal = 0;
  let recurring = false;
  let note = "";

  if (input.service === "residential") {
    const base = 70;
    const beds = (input.bedrooms ?? 0) * 32;
    const baths = (input.bathrooms ?? 0) * 28;
    lineItems.push({ label: "Base service", amount: base });
    lineItems.push({ label: `${input.bedrooms ?? 0} bedroom(s)`, amount: beds });
    lineItems.push({ label: `${input.bathrooms ?? 0} bathroom(s)`, amount: baths });
    subtotal = base + beds + baths;

    const freq = frequencyOptions.find((f) => f.id === input.frequency);
    if (freq && freq.mult < 1) {
      const discount = -Math.round(subtotal * (1 - freq.mult));
      lineItems.push({ label: `${freq.label} discount (${freq.note})`, amount: discount });
      subtotal += discount;
      recurring = true;
    }
    note = recurring
      ? "Recurring price per visit — pause or cancel any time."
      : "One-off visit, fully equipped with eco products.";
  } else if (input.service === "end-of-lease") {
    const base = 180;
    const beds = (input.bedrooms ?? 0) * 55;
    const baths = (input.bathrooms ?? 0) * 45;
    lineItems.push({ label: "Bond-clean base", amount: base });
    lineItems.push({ label: `${input.bedrooms ?? 0} bedroom(s)`, amount: beds });
    lineItems.push({ label: `${input.bathrooms ?? 0} bathroom(s)`, amount: baths });
    subtotal = base + beds + baths;

    const cond = conditionOptions.find((c) => c.id === input.condition);
    if (cond && cond.mult !== 1) {
      const extra = Math.round((base + beds + baths) * (cond.mult - 1));
      lineItems.push({ label: `${cond.label} condition`, amount: extra });
      subtotal += extra;
    }
    note = "Includes our 72-hour bond-back re-clean guarantee.";
  } else if (input.service === "specialty") {
    for (const id of input.specialtyItems) {
      const item = specialtyItemOptions.find((s) => s.id === id);
      if (item) {
        lineItems.push({ label: item.label, amount: item.price });
        subtotal += item.price;
      }
    }
    const cond = conditionOptions.find((c) => c.id === input.condition);
    if (cond && cond.mult !== 1 && subtotal > 0) {
      const extra = Math.round(subtotal * (cond.mult - 1));
      lineItems.push({ label: `${cond.label} condition`, amount: extra });
      subtotal += extra;
    }
    note = "Targeted specialty work — combine items to save on call-out.";
  } else if (input.service === "commercial") {
    const prem = premisesOptions.find((p) => p.id === input.premises);
    const base = prem?.base ?? 0;
    lineItems.push({ label: `${prem?.label ?? "Premises"} premises`, amount: base });
    subtotal = base;

    const freq = frequencyOptions.find((f) => f.id === input.frequency);
    if (freq && freq.mult < 1) {
      const discount = -Math.round(subtotal * (1 - freq.mult));
      lineItems.push({ label: `${freq.label} contract (${freq.note})`, amount: discount });
      subtotal += discount;
      recurring = true;
    }
    note = recurring
      ? "Contract rate per visit — flexible after-hours scheduling."
      : "One-off commercial clean, quoted per visit.";
  }

  // Add-ons (not used for specialty, which is itemised already).
  if (input.service !== "specialty") {
    for (const id of input.addons) {
      const addon = addonOptions.find((a) => a.id === id);
      if (addon) {
        lineItems.push({ label: addon.label, amount: addon.price });
        subtotal += addon.price;
      }
    }
  }

  const min = round5(subtotal * 0.92);
  const max = round5(subtotal * 1.1);

  return { min, max, recurring, lineItems, note };
}
