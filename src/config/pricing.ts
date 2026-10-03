/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SINGLE SOURCE OF TRUTH for all Velora Cleaning Brisbane pricing.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Both the marketing UI and the AI quoting engine import from this file.
 * Never hardcode a price in a component — add it here instead.
 *
 * ⚠️ CLIENT CONFIRMATION REQUIRED
 * Values marked `ASSUMPTION` were not specified in the client's rate card and
 * have been given sensible defaults. Grep for "ASSUMPTION" (or read the
 * `pricingAssumptions` array below) and confirm each one before go-live.
 *
 * All amounts are whole AUD dollars.
 */

/* ─────────────────────────────── assumptions ────────────────────────────── */

export type Assumption = {
  id: string;
  /** What was ambiguous in the supplied rate card. */
  question: string;
  /** The default applied, and why. */
  assumed: string;
};

/** Every unconfirmed pricing decision, in one auditable list. */
export const pricingAssumptions: Assumption[] = [
  {
    id: "blind-unit-rate",
    question:
      "Blinds have a $150 minimum and a 'standard per-blind rate', but the per-blind rate was never given.",
    assumed:
      "$30 per blind. Chosen because 5 × $30 = $150, exactly the stated minimum — so the minimum cleanly covers the whole 1–5 band. Low risk: blinds are quote-only, so this rate is never displayed as a customer-facing total.",
  },
  {
    id: "curtain-minimum",
    question:
      "Curtains are $79 each but a single curtain is $119 — is that a job minimum or does pricing jump at 2?",
    assumed:
      "A job minimum of $119, not a tier jump. total = max($79 × n, $119). So 1 = $119, 2 = $158, 3 = $237. This avoids a price that falls as the customer adds a curtain.",
  },
  {
    id: "eol-carpet-shape",
    question:
      "Is end-of-lease carpet cleaning a separate service or a mode of standard carpet cleaning?",
    assumed:
      "A mode of carpet cleaning — same work, same room-based unit. NOTE: with the supplied numbers, EOL saves $30 at 3 rooms, matches at 2 rooms, and costs $30 MORE at 1 room ($169 vs $139). Confirm the 1-room case is intended.",
  },
  {
    id: "eol-carpet-beyond-3",
    question:
      "End-of-lease carpet is $169 flat for 1–3 rooms. What happens beyond 3 rooms?",
    assumed:
      "$169 + $39 per additional room, mirroring the standard carpet overflow rate.",
  },
  {
    id: "couch-minimum-seats",
    question:
      "Couch pricing starts at a 3 seater. What about an armchair or 2 seater?",
    assumed:
      "3 seats is the floor — smaller lounges are charged at the 3-seater rate of $159.",
  },
  {
    id: "gst",
    question: "Are the supplied prices GST inclusive or exclusive?",
    assumed:
      "Displayed as-is with no GST line. Australian consumer pricing must show a GST-inclusive total, so confirm and add copy accordingly.",
  },
];

/* ──────────────────────────────── pricing models ─────────────────────────── */

export type UnitTier = { qty: number; price: number };

export type DiscountBand = {
  minQty: number;
  /** null = no upper bound. */
  maxQty: number | null;
  percent: number;
  label: string;
  detail: string;
};

/** Exact price per quantity up to the last tier, then a flat per-unit rate. */
export type TieredPricing = {
  kind: "tiered";
  minQty: number;
  maxQty: number;
  tiers: UnitTier[];
  extraUnitPrice: number;
};

/** One flat price covering up to N units, then a per-unit rate. */
export type FlatPricing = {
  kind: "flat";
  minQty: number;
  maxQty: number;
  includedUpTo: number;
  flatPrice: number;
  extraUnitPrice: number;
};

/** Straight per-unit rate with a job minimum. */
export type PerUnitPricing = {
  kind: "per-unit";
  minQty: number;
  maxQty: number;
  unitPrice: number;
  jobMinimum: number;
};

/** Distinct sized variants, additive across sizes (e.g. mattresses). */
export type SizedPricing = {
  kind: "sized";
  sizes: { id: string; label: string; price: number }[];
  maxPerSize: number;
};

/** No fixed price — always routed to a call or enquiry. */
export type InspectionPricing = {
  kind: "inspection";
  minimumCharge: number | null;
  /** Internal estimate only. Never render this as a customer-facing price. */
  indicativeUnitPrice: number | null;
  maxQty: number;
  discountBands: DiscountBand[];
};

export type PricingModel =
  | TieredPricing
  | FlatPricing
  | PerUnitPricing
  | SizedPricing
  | InspectionPricing;

/* ──────────────────────────────── services ──────────────────────────────── */

export type ServiceId = "carpet" | "couch" | "mattress" | "curtain" | "blind";

export type ServiceMode = {
  id: string;
  label: string;
  desc: string;
  pricing: PricingModel;
};

export type ServiceDef = {
  id: ServiceId;
  name: string;
  tagline: string;
  blurb: string;
  /** Icon key resolved to a lucide icon in the UI layer. */
  icon: string;
  unit: { singular: string; plural: string };
  /** Always-included value — surfaced prominently, never as fine print. */
  inclusions: string[];
  /** UI shows a mode toggle only when there is more than one. */
  modes: ServiceMode[];
};

export const services: ServiceDef[] = [
  {
    id: "carpet",
    name: "Carpet cleaning",
    tagline: "Apartments & houses",
    blurb:
      "Hot-water extraction that lifts embedded grit, traffic lanes and pet odour out of the pile — not just off the surface.",
    icon: "carpet",
    unit: { singular: "room", plural: "rooms" },
    inclusions: ["Pre-treatment of visible stains", "Deodorising finish"],
    modes: [
      {
        id: "standard",
        label: "Standard",
        desc: "Refresh for lived-in homes",
        pricing: {
          kind: "tiered",
          minQty: 1,
          maxQty: 10,
          tiers: [
            { qty: 1, price: 139 },
            { qty: 2, price: 169 },
            { qty: 3, price: 199 },
          ],
          extraUnitPrice: 39,
        },
      },
      {
        id: "end-of-lease",
        label: "End of lease",
        desc: "Bond-ready, agent-approved",
        pricing: {
          kind: "flat",
          minQty: 1,
          maxQty: 10,
          includedUpTo: 3,
          flatPrice: 169,
          // ASSUMPTION (eol-carpet-beyond-3): overflow rate not supplied.
          extraUnitPrice: 39,
        },
      },
    ],
  },
  {
    id: "couch",
    name: "Couch cleaning",
    tagline: "Lounges & upholstery",
    blurb:
      "Deep upholstery extraction that pulls out body oils, spills and odour from the cushions and frame.",
    icon: "couch",
    unit: { singular: "seat", plural: "seats" },
    inclusions: ["Deodoriser included on every couch"],
    modes: [
      {
        id: "standard",
        label: "Standard",
        desc: "All couch cleaning",
        pricing: {
          kind: "tiered",
          // ASSUMPTION (couch-minimum-seats): 3 seats is the floor.
          minQty: 3,
          maxQty: 10,
          tiers: [
            { qty: 3, price: 159 },
            { qty: 4, price: 199 },
            { qty: 5, price: 229 },
          ],
          extraUnitPrice: 29,
        },
      },
    ],
  },
  {
    id: "mattress",
    name: "Mattress cleaning",
    tagline: "Sanitised & refreshed",
    blurb:
      "Anti-allergen sanitising treatment that targets dust mites, sweat and staining right through the top layers.",
    icon: "mattress",
    unit: { singular: "mattress", plural: "mattresses" },
    inclusions: ["Anti-allergen treatment", "Priced per mattress — mix any sizes"],
    modes: [
      {
        id: "standard",
        label: "Standard",
        desc: "Any size",
        pricing: {
          kind: "sized",
          maxPerSize: 6,
          sizes: [
            { id: "single", label: "Single", price: 119 },
            { id: "double", label: "Double", price: 149 },
            { id: "queen", label: "Queen", price: 179 },
            { id: "king", label: "King", price: 199 },
          ],
        },
      },
    ],
  },
  {
    id: "curtain",
    name: "Curtain cleaning",
    tagline: "On-rail or take-down",
    blurb:
      "Gentle deep clean that lifts dust, smoke and sun-baked grime from drapes without shrinking or marking the fabric.",
    icon: "curtain",
    unit: { singular: "curtain", plural: "curtains" },
    inclusions: ["Fabric-safe process", "Rehung and dressed on completion"],
    modes: [
      {
        id: "standard",
        label: "Standard",
        desc: "Priced per curtain",
        pricing: {
          kind: "per-unit",
          minQty: 1,
          maxQty: 20,
          unitPrice: 79,
          // ASSUMPTION (curtain-minimum): treated as a job minimum.
          jobMinimum: 119,
        },
      },
    ],
  },
  {
    id: "blind",
    name: "Blind cleaning",
    tagline: "Assessed on inspection",
    blurb:
      "Blinds vary enormously by material, size and condition — so we price them properly, in person, rather than guessing.",
    icon: "blind",
    unit: { singular: "blind", plural: "blinds" },
    inclusions: ["Ultrasonic deep clean", "Volume discounts on larger jobs"],
    modes: [
      {
        id: "standard",
        label: "Standard",
        desc: "Quoted after inspection",
        pricing: {
          kind: "inspection",
          minimumCharge: 150,
          // ASSUMPTION (blind-unit-rate): never shown to customers.
          indicativeUnitPrice: 30,
          maxQty: 30,
          discountBands: [
            {
              minQty: 1,
              maxQty: 5,
              percent: 0,
              label: "1–5 blinds",
              detail: "Standard per-blind rate, $150 minimum service charge",
            },
            {
              minQty: 6,
              maxQty: 10,
              percent: 10,
              label: "6–10 blinds",
              detail: "10% off the standard rate",
            },
            {
              minQty: 11,
              maxQty: null,
              percent: 15,
              label: "11+ blinds",
              detail: "15% off — or ask us for a tailored free quote",
            },
          ],
        },
      },
    ],
  },
];

/* ────────────────────────── inspection-only services ─────────────────────── */

export type InspectionService = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  icon: string;
  /** Why a fixed price genuinely cannot be given — builds trust, not doubt. */
  reasons: string[];
  cta: string;
};

export const inspectionServices: InspectionService[] = [
  {
    id: "flood-damage",
    name: "Flood damage & water extraction",
    tagline: "Emergency response",
    blurb:
      "Water damage is never two jobs the same. Volume, category of water, how long it has been sitting and what is underneath the carpet all change the work required.",
    icon: "flood",
    reasons: [
      "Extraction volume and drying time vary per property",
      "Underlay and subfloor may need lifting or replacement",
      "Insurance reports often required",
    ],
    cta: "Request an inspection",
  },
];

/* ─────────────────────────────── calculation ────────────────────────────── */

export type QuoteLine = { label: string; amount: number };

export type ServiceSelection = {
  serviceId: ServiceId;
  /** Defaults to the service's first mode. */
  modeId?: string;
  /** For tiered / flat / per-unit / inspection models. */
  quantity?: number;
  /** For sized models (mattress): size id → count. */
  sizes?: Record<string, number>;
};

export type ServiceQuote = {
  serviceId: ServiceId;
  modeId: string;
  serviceName: string;
  /** null when the service requires an inspection — never invent a number. */
  total: number | null;
  /** Internal-only estimate for inspection services. Do not render as a price. */
  indicativeTotal: number | null;
  lines: QuoteLine[];
  requiresInspection: boolean;
  /** True when a job minimum lifted the price above the raw unit maths. */
  minimumApplied: boolean;
  discountPercent: number;
  savings: number;
  note: string;
};

const clampQty = (qty: number, min: number, max: number) =>
  Math.max(min, Math.min(max, Math.round(qty)));

export function getService(serviceId: ServiceId): ServiceDef {
  const service = services.find((s) => s.id === serviceId);
  if (!service) throw new Error(`Unknown service: ${serviceId}`);
  return service;
}

export function getMode(serviceId: ServiceId, modeId?: string): ServiceMode {
  const service = getService(serviceId);
  const mode = modeId
    ? service.modes.find((m) => m.id === modeId)
    : service.modes[0];
  if (!mode) throw new Error(`Unknown mode "${modeId}" for service ${serviceId}`);
  return mode;
}

/** Which discount band a blind quantity falls into. */
export function findDiscountBand(
  bands: DiscountBand[],
  qty: number,
): DiscountBand | undefined {
  return bands.find(
    (b) => qty >= b.minQty && (b.maxQty === null || qty <= b.maxQty),
  );
}

/**
 * Price a single service selection.
 * Pure — no side effects, no I/O, no React. Safe to unit test in isolation.
 */
export function calculateService(selection: ServiceSelection): ServiceQuote {
  const service = getService(selection.serviceId);
  const mode = getMode(selection.serviceId, selection.modeId);
  const pricing = mode.pricing;
  const { singular, plural } = service.unit;

  const base: ServiceQuote = {
    serviceId: service.id,
    modeId: mode.id,
    serviceName: service.name,
    total: 0,
    indicativeTotal: null,
    lines: [],
    requiresInspection: false,
    minimumApplied: false,
    discountPercent: 0,
    savings: 0,
    note: "",
  };

  switch (pricing.kind) {
    case "tiered": {
      const qty = clampQty(
        selection.quantity ?? pricing.minQty,
        pricing.minQty,
        pricing.maxQty,
      );
      const lastTier = pricing.tiers[pricing.tiers.length - 1];
      const exact = pricing.tiers.find((t) => t.qty === qty);

      if (exact) {
        return {
          ...base,
          total: exact.price,
          lines: [
            {
              label: `${qty} ${qty === 1 ? singular : plural}`,
              amount: exact.price,
            },
          ],
          note: `Fixed price for ${qty} ${qty === 1 ? singular : plural}.`,
        };
      }

      const extraUnits = qty - lastTier.qty;
      const extra = extraUnits * pricing.extraUnitPrice;
      return {
        ...base,
        total: lastTier.price + extra,
        lines: [
          {
            label: `${lastTier.qty} ${plural}`,
            amount: lastTier.price,
          },
          {
            label: `${extraUnits} extra ${extraUnits === 1 ? singular : plural} × $${pricing.extraUnitPrice}`,
            amount: extra,
          },
        ],
        note: `Each ${singular} beyond ${lastTier.qty} is $${pricing.extraUnitPrice}.`,
      };
    }

    case "flat": {
      const qty = clampQty(
        selection.quantity ?? pricing.minQty,
        pricing.minQty,
        pricing.maxQty,
      );

      if (qty <= pricing.includedUpTo) {
        return {
          ...base,
          total: pricing.flatPrice,
          lines: [
            {
              label: `Up to ${pricing.includedUpTo} ${plural} (flat rate)`,
              amount: pricing.flatPrice,
            },
          ],
          note: `One flat price for 1–${pricing.includedUpTo} ${plural}.`,
        };
      }

      const extraUnits = qty - pricing.includedUpTo;
      const extra = extraUnits * pricing.extraUnitPrice;
      return {
        ...base,
        total: pricing.flatPrice + extra,
        lines: [
          {
            label: `Up to ${pricing.includedUpTo} ${plural} (flat rate)`,
            amount: pricing.flatPrice,
          },
          {
            label: `${extraUnits} extra ${extraUnits === 1 ? singular : plural} × $${pricing.extraUnitPrice}`,
            amount: extra,
          },
        ],
        note: `Flat to ${pricing.includedUpTo} ${plural}, then $${pricing.extraUnitPrice} each.`,
      };
    }

    case "per-unit": {
      const qty = clampQty(
        selection.quantity ?? pricing.minQty,
        pricing.minQty,
        pricing.maxQty,
      );
      const raw = qty * pricing.unitPrice;
      const total = Math.max(raw, pricing.jobMinimum);
      const minimumApplied = total > raw;

      const lines: QuoteLine[] = [
        {
          label: `${qty} ${qty === 1 ? singular : plural} × $${pricing.unitPrice}`,
          amount: raw,
        },
      ];
      if (minimumApplied) {
        lines.push({
          label: `Minimum service charge`,
          amount: total - raw,
        });
      }

      return {
        ...base,
        total,
        lines,
        minimumApplied,
        note: minimumApplied
          ? `A $${pricing.jobMinimum} minimum applies to single-curtain jobs.`
          : `$${pricing.unitPrice} per ${singular}.`,
      };
    }

    case "sized": {
      const counts = selection.sizes ?? {};
      const lines: QuoteLine[] = [];
      let total = 0;

      for (const size of pricing.sizes) {
        const count = clampQty(counts[size.id] ?? 0, 0, pricing.maxPerSize);
        if (count <= 0) continue;
        const amount = count * size.price;
        total += amount;
        lines.push({
          label:
            count === 1
              ? `${size.label} mattress`
              : `${count} × ${size.label} mattress`,
          amount,
        });
      }

      return {
        ...base,
        total,
        lines,
        note: "Each mattress is priced individually and added together.",
      };
    }

    case "inspection": {
      const qty = clampQty(selection.quantity ?? 1, 1, pricing.maxQty);
      const band = findDiscountBand(pricing.discountBands, qty);
      const percent = band?.percent ?? 0;

      let indicativeTotal: number | null = null;
      let savings = 0;
      if (pricing.indicativeUnitPrice !== null) {
        const raw = qty * pricing.indicativeUnitPrice;
        const discounted = Math.round(raw * (1 - percent / 100));
        savings = raw - discounted;
        indicativeTotal =
          pricing.minimumCharge !== null
            ? Math.max(discounted, pricing.minimumCharge)
            : discounted;
      }

      return {
        ...base,
        total: null,
        indicativeTotal,
        requiresInspection: true,
        discountPercent: percent,
        savings,
        lines: [],
        note:
          pricing.minimumCharge !== null
            ? `Quoted on inspection. A $${pricing.minimumCharge} minimum service charge applies.`
            : "Quoted on inspection.",
      };
    }
  }
}

/* ─────────────────────────────── basket ─────────────────────────────────── */

export type BasketResult = {
  items: ServiceQuote[];
  /** Sum of everything with a fixed price. */
  subtotal: number;
  /** True when any selected service must be quoted in person. */
  requiresInspection: boolean;
  /** Services in the basket that need an inspection before pricing. */
  inspectionItems: ServiceQuote[];
  lines: QuoteLine[];
};

/**
 * Price several services together.
 * Inspection-only services are carried through but never folded into the
 * subtotal — an estimate must never imply a price we have not committed to.
 */
export function calculateBasket(
  selections: ServiceSelection[],
): BasketResult {
  const items = selections.map(calculateService);
  const priced = items.filter((i) => !i.requiresInspection && i.total !== null);
  const inspectionItems = items.filter((i) => i.requiresInspection);

  return {
    items,
    subtotal: priced.reduce((sum, i) => sum + (i.total ?? 0), 0),
    requiresInspection: inspectionItems.length > 0,
    inspectionItems,
    lines: priced.flatMap((i) =>
      i.lines.map((l) => ({ ...l, label: `${i.serviceName} — ${l.label}` })),
    ),
  };
}

/* ─────────────────────────── display helpers ────────────────────────────── */

/** Lowest fixed price a service can start at — for "from $X" copy. */
export function startingPrice(serviceId: ServiceId): number | null {
  const service = getService(serviceId);
  let lowest: number | null = null;

  for (const mode of service.modes) {
    const p = mode.pricing;
    let candidate: number | null = null;

    if (p.kind === "tiered") candidate = p.tiers[0]?.price ?? null;
    else if (p.kind === "flat") candidate = p.flatPrice;
    else if (p.kind === "per-unit") candidate = Math.max(p.unitPrice, p.jobMinimum);
    else if (p.kind === "sized")
      candidate = p.sizes.reduce(
        (min, s) => (min === null || s.price < min ? s.price : min),
        null as number | null,
      );
    else if (p.kind === "inspection") candidate = null;

    if (candidate !== null && (lowest === null || candidate < lowest)) {
      lowest = candidate;
    }
  }
  return lowest;
}

/** True when a service can never show a fixed price up front. */
export function isQuoteOnly(serviceId: ServiceId): boolean {
  return getService(serviceId).modes.every(
    (m) => m.pricing.kind === "inspection",
  );
}
