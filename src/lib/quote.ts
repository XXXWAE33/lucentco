/**
 * Quote engine for the AI Instant Quote tool.
 *
 * This is a THIN ADAPTER over `src/config/pricing.ts` — it shapes the wizard's
 * step flow and nothing else. All rates, tiers, minimums and discounts live in
 * the config; never add a price here.
 */
import {
  calculateService,
  getService,
  inspectionServices,
  services,
  type ServiceId,
  type ServiceSelection,
  type QuoteLine,
} from "@/config/pricing";
import { serviceSuburbs } from "./site";

/** The wizard can also route to inspection-only work that isn't a priced service. */
export const FLOOD_ID = "flood-damage" as const;
export type QuoteServiceId = ServiceId | typeof FLOOD_ID;

export const serviceOptions: {
  id: QuoteServiceId;
  label: string;
  desc: string;
}[] = [
  ...services.map((s) => ({
    id: s.id as QuoteServiceId,
    label: s.name,
    desc: s.tagline,
  })),
  {
    id: FLOOD_ID,
    label: inspectionServices[0].name,
    desc: inspectionServices[0].tagline,
  },
];

export const suburbOptions = [...serviceSuburbs];

export type QuoteInput = {
  service: QuoteServiceId | null;
  modeId: string | null;
  quantity: number;
  sizes: Record<string, number>;
  suburb: string | null;
};

export const initialQuoteInput: QuoteInput = {
  service: null,
  modeId: null,
  quantity: 1,
  sizes: {},
  suburb: null,
};

export type QuoteResult = {
  serviceName: string;
  /** null whenever the job must be quoted in person. */
  total: number | null;
  lines: QuoteLine[];
  requiresInspection: boolean;
  note: string;
};

/** Sensible starting quantity when a service is first chosen. */
export function defaultQuantity(serviceId: QuoteServiceId): number {
  if (serviceId === FLOOD_ID) return 1;
  const pricing = getService(serviceId).modes[0].pricing;
  if (pricing.kind === "tiered") return pricing.tiers[0]?.qty ?? 1;
  if (pricing.kind === "flat" || pricing.kind === "per-unit")
    return pricing.minQty;
  return 1;
}

export function defaultSizes(serviceId: QuoteServiceId): Record<string, number> {
  if (serviceId === FLOOD_ID) return {};
  const pricing = getService(serviceId).modes[0].pricing;
  return pricing.kind === "sized" ? { queen: 1 } : {};
}

/** Does this service need a mode-selection step? (Carpet: standard vs EOL.) */
export function hasModeStep(serviceId: QuoteServiceId | null): boolean {
  if (!serviceId || serviceId === FLOOD_ID) return false;
  return getService(serviceId).modes.length > 1;
}

/** Does this service need a quantity/size step? */
export function hasAmountStep(serviceId: QuoteServiceId | null): boolean {
  return !!serviceId && serviceId !== FLOOD_ID;
}

/** Produce the estimate. Delegates every number to the pricing config. */
export function estimateQuote(input: QuoteInput): QuoteResult {
  if (input.service === FLOOD_ID) {
    const svc = inspectionServices[0];
    return {
      serviceName: svc.name,
      total: null,
      lines: [],
      requiresInspection: true,
      note: "Water damage needs an on-site inspection before we can price it accurately — we'll come to you.",
    };
  }

  if (!input.service) {
    return {
      serviceName: "",
      total: null,
      lines: [],
      requiresInspection: false,
      note: "",
    };
  }

  const selection: ServiceSelection = {
    serviceId: input.service,
    modeId: input.modeId ?? undefined,
    quantity: input.quantity,
    sizes: input.sizes,
  };

  const quote = calculateService(selection);
  return {
    serviceName: quote.serviceName,
    total: quote.total,
    lines: quote.lines,
    requiresInspection: quote.requiresInspection,
    note: quote.note,
  };
}
