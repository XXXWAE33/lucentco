import { describe, expect, it } from "vitest";
import {
  calculateBasket,
  calculateService,
  isQuoteOnly,
  pricingAssumptions,
  services,
  startingPrice,
} from "./pricing";

/** Convenience: price a service and assert it produced a fixed total. */
const price = (
  serviceId: Parameters<typeof calculateService>[0]["serviceId"],
  extra: Omit<Parameters<typeof calculateService>[0], "serviceId"> = {},
) => calculateService({ serviceId, ...extra }).total;

describe("carpet — standard", () => {
  it("matches the client rate card at each tier", () => {
    expect(price("carpet", { quantity: 1 })).toBe(139);
    expect(price("carpet", { quantity: 2 })).toBe(169);
    expect(price("carpet", { quantity: 3 })).toBe(199);
  });

  it("adds $39 per room beyond 3", () => {
    expect(price("carpet", { quantity: 4 })).toBe(238);
    expect(price("carpet", { quantity: 5 })).toBe(277);
    expect(price("carpet", { quantity: 8 })).toBe(394);
  });

  it("clamps below the minimum instead of returning nonsense", () => {
    expect(price("carpet", { quantity: 0 })).toBe(139);
    expect(price("carpet", { quantity: -3 })).toBe(139);
  });

  it("itemises the overflow separately from the base tier", () => {
    const quote = calculateService({ serviceId: "carpet", quantity: 5 });
    expect(quote.lines).toHaveLength(2);
    expect(quote.lines[0].amount).toBe(199);
    expect(quote.lines[1].amount).toBe(78);
  });
});

describe("carpet — end of lease", () => {
  const eol = (quantity: number) =>
    price("carpet", { modeId: "end-of-lease", quantity });

  it("is a flat $169 across 1–3 rooms", () => {
    expect(eol(1)).toBe(169);
    expect(eol(2)).toBe(169);
    expect(eol(3)).toBe(169);
  });

  // ASSUMPTION (eol-carpet-beyond-3): overflow rate was never supplied.
  it("adds $39 per room beyond 3", () => {
    expect(eol(4)).toBe(208);
    expect(eol(6)).toBe(286);
  });

  // Documents the pricing quirk flagged to the client rather than hiding it.
  it("costs more than standard at 1 room, less at 3", () => {
    expect(eol(1)).toBeGreaterThan(price("carpet", { quantity: 1 })!);
    expect(eol(2)).toBe(price("carpet", { quantity: 2 }));
    expect(eol(3)).toBeLessThan(price("carpet", { quantity: 3 })!);
  });
});

describe("couch", () => {
  it("matches the client rate card at each tier", () => {
    expect(price("couch", { quantity: 3 })).toBe(159);
    expect(price("couch", { quantity: 4 })).toBe(199);
    expect(price("couch", { quantity: 5 })).toBe(229);
  });

  it("adds $29 per seat beyond 5", () => {
    expect(price("couch", { quantity: 6 })).toBe(258);
    expect(price("couch", { quantity: 8 })).toBe(316);
  });

  // ASSUMPTION (couch-minimum-seats): smaller lounges bill at the 3-seat rate.
  it("floors smaller lounges at the 3 seater price", () => {
    expect(price("couch", { quantity: 1 })).toBe(159);
    expect(price("couch", { quantity: 2 })).toBe(159);
  });

  it("advertises the included deodoriser as an inclusion", () => {
    const couch = services.find((s) => s.id === "couch")!;
    expect(couch.inclusions.join(" ").toLowerCase()).toContain("deodoriser");
  });
});

describe("mattress", () => {
  it("prices each size from the rate card", () => {
    expect(price("mattress", { sizes: { single: 1 } })).toBe(119);
    expect(price("mattress", { sizes: { double: 1 } })).toBe(149);
    expect(price("mattress", { sizes: { queen: 1 } })).toBe(179);
    expect(price("mattress", { sizes: { king: 1 } })).toBe(199);
  });

  // The client's own worked example.
  it("is additive across sizes: single + double = $268", () => {
    expect(price("mattress", { sizes: { single: 1, double: 1 } })).toBe(268);
  });

  it("handles multiples of one size", () => {
    expect(price("mattress", { sizes: { queen: 3 } })).toBe(537);
  });

  it("is $0 with nothing selected", () => {
    expect(price("mattress", { sizes: {} })).toBe(0);
    expect(price("mattress")).toBe(0);
  });

  it("ignores unknown size ids", () => {
    expect(price("mattress", { sizes: { bunk: 4, single: 1 } })).toBe(119);
  });
});

describe("curtain", () => {
  // ASSUMPTION (curtain-minimum): job minimum, not a tier jump at 2.
  it("applies the $119 minimum to a single curtain", () => {
    expect(price("curtain", { quantity: 1 })).toBe(119);
    expect(calculateService({ serviceId: "curtain", quantity: 1 }).minimumApplied)
      .toBe(true);
  });

  it("charges $79 each once the minimum is cleared", () => {
    expect(price("curtain", { quantity: 2 })).toBe(158);
    expect(price("curtain", { quantity: 3 })).toBe(237);
    expect(price("curtain", { quantity: 6 })).toBe(474);
  });

  it("never lets the price fall as curtains are added", () => {
    const totals = [1, 2, 3, 4, 5].map((q) => price("curtain", { quantity: q })!);
    const ascending = [...totals].sort((a, b) => a - b);
    expect(totals).toEqual(ascending);
  });

  it("stops flagging the minimum past a single curtain", () => {
    expect(calculateService({ serviceId: "curtain", quantity: 2 }).minimumApplied)
      .toBe(false);
  });
});

describe("blind — quote only", () => {
  it("never returns a fixed total", () => {
    for (const quantity of [1, 5, 6, 11, 30]) {
      const quote = calculateService({ serviceId: "blind", quantity });
      expect(quote.total).toBeNull();
      expect(quote.requiresInspection).toBe(true);
    }
  });

  it("resolves the discount band at each boundary", () => {
    const pct = (quantity: number) =>
      calculateService({ serviceId: "blind", quantity }).discountPercent;
    expect(pct(1)).toBe(0);
    expect(pct(5)).toBe(0);
    expect(pct(6)).toBe(10);
    expect(pct(10)).toBe(10);
    expect(pct(11)).toBe(15);
    expect(pct(25)).toBe(15);
  });

  it("keeps the indicative estimate above the $150 minimum", () => {
    const quote = calculateService({ serviceId: "blind", quantity: 2 });
    expect(quote.indicativeTotal).toBe(150);
  });

  it("is reported as quote-only", () => {
    expect(isQuoteOnly("blind")).toBe(true);
    expect(isQuoteOnly("carpet")).toBe(false);
  });
});

describe("basket", () => {
  it("sums fixed-price services", () => {
    const basket = calculateBasket([
      { serviceId: "carpet", quantity: 2 },
      { serviceId: "couch", quantity: 3 },
      { serviceId: "mattress", sizes: { queen: 1 } },
    ]);
    expect(basket.subtotal).toBe(169 + 159 + 179);
    expect(basket.requiresInspection).toBe(false);
  });

  it("excludes inspection services from the subtotal", () => {
    const basket = calculateBasket([
      { serviceId: "carpet", quantity: 2 },
      { serviceId: "blind", quantity: 8 },
    ]);
    expect(basket.subtotal).toBe(169);
    expect(basket.requiresInspection).toBe(true);
    expect(basket.inspectionItems).toHaveLength(1);
  });

  it("is $0 and inspection-free when empty", () => {
    const basket = calculateBasket([]);
    expect(basket.subtotal).toBe(0);
    expect(basket.requiresInspection).toBe(false);
  });

  it("prefixes line items with the service name", () => {
    const basket = calculateBasket([{ serviceId: "carpet", quantity: 2 }]);
    expect(basket.lines[0].label).toContain("Carpet cleaning");
  });
});

describe("display helpers", () => {
  it("reports the lowest fixed entry price per service", () => {
    expect(startingPrice("carpet")).toBe(139);
    expect(startingPrice("couch")).toBe(159);
    expect(startingPrice("mattress")).toBe(119);
    expect(startingPrice("curtain")).toBe(119);
    expect(startingPrice("blind")).toBeNull();
  });
});

describe("config integrity", () => {
  it("gives every service at least one mode and a unit label", () => {
    for (const service of services) {
      expect(service.modes.length).toBeGreaterThan(0);
      expect(service.unit.singular).toBeTruthy();
      expect(service.unit.plural).toBeTruthy();
    }
  });

  it("keeps tiers sorted with no duplicate quantities", () => {
    for (const service of services) {
      for (const mode of service.modes) {
        if (mode.pricing.kind !== "tiered") continue;
        const qtys = mode.pricing.tiers.map((t) => t.qty);
        expect(qtys).toEqual([...qtys].sort((a, b) => a - b));
        expect(new Set(qtys).size).toBe(qtys.length);
      }
    }
  });

  it("documents every unconfirmed assumption", () => {
    expect(pricingAssumptions.length).toBeGreaterThan(0);
    for (const a of pricingAssumptions) {
      expect(a.id).toBeTruthy();
      expect(a.question).toBeTruthy();
      expect(a.assumed).toBeTruthy();
    }
  });
});
