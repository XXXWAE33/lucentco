"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  Info,
  Layers,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn, formatAud } from "@/lib/utils";
import { whatsappBasketMessage } from "@/lib/site";
import {
  WhatsAppLink,
  WhatsAppIcon,
  darkContactPillClass,
} from "@/components/layout";
import {
  calculateBasket,
  services,
  type ServiceDef,
  type ServiceId,
  type ServiceSelection,
} from "@/config/pricing";
import { QuantityStepper } from "./service-pricing/quantity-stepper";
import { serviceIcons } from "./service-showcase/service-icons";

const EASE = [0.22, 1, 0.36, 1] as const;

type RowState = {
  enabled: boolean;
  modeId: string;
  quantity: number;
  sizes: Record<string, number>;
};

function initialRows(): Record<ServiceId, RowState> {
  const rows = {} as Record<ServiceId, RowState>;
  for (const service of services) {
    const pricing = service.modes[0].pricing;
    rows[service.id] = {
      enabled: false,
      modeId: service.modes[0].id,
      quantity:
        pricing.kind === "tiered"
          ? (pricing.tiers[0]?.qty ?? 1)
          : pricing.kind === "flat" || pricing.kind === "per-unit"
            ? pricing.minQty
            : 1,
      sizes: pricing.kind === "sized" ? { queen: 1 } : {},
    };
  }
  // Lead with the most common combination rather than an empty basket.
  rows.carpet.enabled = true;
  rows.carpet.quantity = 2;
  return rows;
}

/**
 * Multi-service basket. Add several services and see one combined total —
 * every figure comes from `calculateBasket`, the same engine the AI quote uses.
 */
export function BuildYourClean({
  embedded = false,
}: {
  /** Inside the quote sheet: the sheet owns its own chrome, so no pinned bar. */
  embedded?: boolean;
} = {}) {
  const reduce = useReducedMotion();
  const [rows, setRows] = useState<Record<ServiceId, RowState>>(initialRows);

  /*
   * Mobile sticky total. The running number follows the user while they add
   * items, then retires once the real summary card scrolls into view — so it
   * is never showing the same figure twice. `MobileQuoteBar` stands down while
   * this section is on screen (see `useMobileCtaBarVisible`), so only one bar
   * is ever pinned to the bottom.
   */
  const rootRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [inSection, setInSection] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);

  useEffect(() => {
    const observe = (
      el: Element | null,
      set: (v: boolean) => void,
      margin: string,
    ) => {
      if (!el) return () => {};
      const io = new IntersectionObserver(
        ([entry]) => set(entry.isIntersecting),
        { rootMargin: margin },
      );
      io.observe(el);
      return () => io.disconnect();
    };
    const a = observe(rootRef.current, setInSection, "0px 0px -20% 0px");
    const b = observe(summaryRef.current, setSummaryVisible, "0px 0px -30% 0px");
    return () => {
      a();
      b();
    };
  }, []);

  const update = (id: ServiceId, patch: Partial<RowState>) =>
    setRows((r) => ({ ...r, [id]: { ...r[id], ...patch } }));

  const selections: ServiceSelection[] = useMemo(
    () =>
      services
        .filter((s) => rows[s.id].enabled)
        .map((s) => ({
          serviceId: s.id,
          modeId: rows[s.id].modeId,
          quantity: rows[s.id].quantity,
          sizes: rows[s.id].sizes,
        })),
    [rows],
  );

  const basket = useMemo(() => calculateBasket(selections), [selections]);
  const activeCount = selections.length;

  const summary = basket.lines.map((l) => `${l.label}`).join(", ");
  const contactHref = `/contact?service=${encodeURIComponent(
    activeCount === 1 ? basket.items[0].serviceName : "Multiple services",
  )}${summary ? `&details=${encodeURIComponent(summary)}` : ""}`;

  return (
    <>
    <div
      ref={rootRef}
      className={cn(
        "grid gap-5 lg:grid-cols-[1.15fr_0.85fr]",
        embedded
          ? "sm:gap-6"
          : "rounded-3xl border border-border bg-card p-4 shadow-lifted sm:gap-6 sm:rounded-4xl sm:p-7",
      )}
    >
      {/* Service picker */}
      <div className="space-y-3">
        {services.map((service) => (
          <BasketRow
            key={service.id}
            service={service}
            row={rows[service.id]}
            onChange={(patch) => update(service.id, patch)}
          />
        ))}
      </div>

      {/* Live total */}
      <div className="flex flex-col">
        <div className="rounded-3xl border border-border bg-sage-50/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your quote
          </p>

          {basket.lines.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {basket.lines.map((line, i) => (
                <li key={i} className="flex items-start justify-between gap-3">
                  <span className="text-ink-700">{line.label}</span>
                  <span className="shrink-0 font-medium tabular-nums text-foreground">
                    {formatAud(line.amount)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Add a service to build your quote.
            </p>
          )}

          {basket.requiresInspection && (
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-sage-200 bg-white/70 p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <p className="text-xs text-ink-700">
                {basket.inspectionItems
                  .map((i) => i.serviceName)
                  .join(" and ")}{" "}
                {basket.inspectionItems.length === 1 ? "is" : "are"} quoted after
                inspection, so {basket.inspectionItems.length === 1 ? "it is" : "they are"}{" "}
                not included in this total.
              </p>
            </div>
          )}
        </div>

        <div ref={summaryRef} className="mt-auto pt-4">
          <div className="rounded-3xl bg-sage-900 p-5 text-mint-100">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-mint-200/80">
                  {activeCount === 0
                    ? "Nothing selected"
                    : `Total · ${activeCount} ${activeCount === 1 ? "service" : "services"}`}
                </p>
                <motion.div
                  key={basket.subtotal}
                  initial={reduce ? false : { opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="font-display text-3xl font-semibold text-white sm:text-4xl"
                >
                  {formatAud(basket.subtotal)}
                </motion.div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Button href={contactHref} variant="accent" className="w-full">
                <Calendar className="h-4 w-4" /> Book this clean
              </Button>
              <WhatsAppLink
                location="build-your-clean"
                context={
                  activeCount > 0 ? `${activeCount} services` : undefined
                }
                message={whatsappBasketMessage(
                  basket.lines.map((l) => l.label),
                  formatAud(basket.subtotal),
                )}
                showIcon={false}
                className={cn(darkContactPillClass, "w-full")}
              >
                <WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp
              </WhatsAppLink>
            </div>
            <p className="mt-3 text-xs text-mint-200/85">
              Fixed prices — confirmed before we start. No call-out fees.
            </p>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile sticky running total */}
      <AnimatePresence>
        {(embedded || inSection) && !summaryVisible && activeCount > 0 && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { y: 72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 72, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className={cn(
              "border-border bg-background/95 py-3 backdrop-blur-xl lg:hidden",
              // In the quote sheet the bar pins to the sheet's own scroll
              // area rather than the viewport.
              embedded
                ? "sticky bottom-0 z-10 -mx-4 mt-4 border-t px-4"
                : "fixed inset-x-0 bottom-0 z-40 border-t px-4",
            )}
            style={embedded ? undefined : { paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">
                  {activeCount} {activeCount === 1 ? "service" : "services"}
                </p>
                <motion.p
                  key={basket.subtotal}
                  initial={reduce ? false : { opacity: 0.5, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="font-display text-2xl font-semibold leading-none tabular-nums text-foreground"
                >
                  {formatAud(basket.subtotal)}
                </motion.p>
              </div>
              <Button href={contactHref} variant="accent" className="h-12 shrink-0">
                <Calendar className="h-4 w-4" /> Book
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------- basket row ------------------------------ */

function BasketRow({
  service,
  row,
  onChange,
}: {
  service: ServiceDef;
  row: RowState;
  onChange: (patch: Partial<RowState>) => void;
}) {
  const reduce = useReducedMotion();
  const Icon = serviceIcons[service.icon] ?? Layers;
  const mode = service.modes.find((m) => m.id === row.modeId) ?? service.modes[0];
  const pricing = mode.pricing;
  const quoteOnly = pricing.kind === "inspection";

  return (
    <div
      className={cn(
        "rounded-3xl border p-4 transition-colors",
        row.enabled
          ? "border-accent bg-accent/[0.04]"
          : "border-border hover:border-sage-300 hover:bg-sage-50/50",
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange({ enabled: !row.enabled })}
          aria-pressed={row.enabled}
          className="flex min-h-[44px] flex-1 items-center gap-3 text-left"
        >
          <span
            className={cn(
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
              row.enabled
                ? "bg-accent text-white"
                : "bg-sage-100 text-sage-600",
            )}
          >
            {row.enabled ? (
              <Check className="h-5 w-5" />
            ) : (
              <Icon className="h-5 w-5" />
            )}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-foreground">
              {service.name}
            </span>
            <span className="block text-xs text-muted-foreground">
              {quoteOnly ? "Quoted on inspection" : service.tagline}
            </span>
          </span>
        </button>

        {!row.enabled && (
          <button
            type="button"
            onClick={() => onChange({ enabled: true })}
            className="inline-flex h-11 shrink-0 items-center gap-1 rounded-full bg-sage-100 px-4 text-sm font-medium text-sage-700 transition-colors hover:bg-sage-200"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        )}
      </div>

      {row.enabled && (
        <motion.div
          initial={reduce ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
            {/* Mode toggle (carpet) */}
            {service.modes.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {service.modes.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onChange({ modeId: m.id })}
                    aria-pressed={m.id === row.modeId}
                    className={cn(
                      "inline-flex h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                      m.id === row.modeId
                        ? "border-accent bg-accent text-white"
                        : "border-sage-200 text-ink-700 hover:bg-sage-50",
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            )}

            {pricing.kind === "sized" ? (
              <div className="space-y-2">
                {pricing.sizes.map((size) => (
                  <div
                    key={size.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm text-ink-700">
                      {size.label}
                      <span className="ml-2 text-xs text-muted-foreground tabular-nums">
                        {formatAud(size.price)}
                      </span>
                    </span>
                    <QuantityStepper
                      value={row.sizes[size.id] ?? 0}
                      min={0}
                      max={pricing.maxPerSize}
                      onChange={(v) =>
                        onChange({ sizes: { ...row.sizes, [size.id]: v } })
                      }
                      label={`${size.label} mattresses`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-ink-700">
                  How many {service.unit.plural}?
                </span>
                <QuantityStepper
                  value={row.quantity}
                  min={quoteOnly ? 1 : (pricing as { minQty: number }).minQty}
                  max={(pricing as { maxQty: number }).maxQty}
                  onChange={(v) => onChange({ quantity: v })}
                  label={service.unit.plural}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
