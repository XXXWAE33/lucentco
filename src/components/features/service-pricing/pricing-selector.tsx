"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Layers, Phone } from "lucide-react";
import { Button } from "@/components/ui";
import { cn, formatAud } from "@/lib/utils";
import { site } from "@/lib/site";
import { CallLink } from "@/components/layout";
import {
  calculateService,
  getService,
  isQuoteOnly,
  services,
  startingPrice,
  type ServiceDef,
  type ServiceId,
} from "@/config/pricing";
import { QuantityStepper } from "./quantity-stepper";
import { serviceIcons } from "../service-showcase/service-icons";

const EASE = [0.22, 1, 0.36, 1] as const;

type Selection = {
  serviceId: ServiceId;
  modeId: string;
  quantity: number;
  sizes: Record<string, number>;
};

/** Sensible starting state whenever the service changes. */
function initFor(serviceId: ServiceId): Selection {
  const service = getService(serviceId);
  const mode = service.modes[0];
  const p = mode.pricing;
  return {
    serviceId,
    modeId: mode.id,
    quantity:
      p.kind === "tiered"
        ? (p.tiers[0]?.qty ?? 1)
        : p.kind === "flat" || p.kind === "per-unit"
          ? p.minQty
          : 1,
    sizes: p.kind === "sized" ? { queen: 1 } : {},
  };
}

/**
 * Guided price selector: service → mode → quantity, resolving to one fixed
 * price and a spec table of exactly what that price covers.
 *
 * Every figure is produced by `calculateService`, so this can never disagree
 * with /pricing or the basket. Quote-only services (blinds, flood) are
 * deliberately excluded — they route to a call instead, below.
 */
export function PricingSelector() {
  const reduce = useReducedMotion();
  const priced = services.filter((s) => !isQuoteOnly(s.id));
  const [sel, setSel] = useState<Selection>(() => initFor("carpet"));

  const service = getService(sel.serviceId);
  const mode = service.modes.find((m) => m.id === sel.modeId) ?? service.modes[0];
  const pricing = mode.pricing;
  const quote = calculateService(sel);

  // Pluralise off the actual count in BOTH branches — the sized branch counts
  // across sizes, so it can legitimately total one.
  const count =
    pricing.kind === "sized"
      ? Object.values(sel.sizes).reduce((a, b) => a + b, 0)
      : sel.quantity;
  const unitLabel = `${count} ${count === 1 ? service.unit.singular : service.unit.plural}`;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* ── 1. Service ─────────────────────────────────────────────────── */}
      <ToggleGroup label="Service">
        {/* Full width from sm so this row matches the mode and quantity rows
            below — a compact cluster here read as misaligned against them. */}
        <div className="grid w-full grid-cols-2 gap-1 sm:flex sm:w-full">
          {priced.map((s) => (
            <SegmentButton
              key={s.id}
              active={s.id === sel.serviceId}
              onClick={() => setSel(initFor(s.id))}
            >
              {s.name.replace(" cleaning", "")}
            </SegmentButton>
          ))}
        </div>
      </ToggleGroup>

      {/* ── 2. Mode — only where a service genuinely has two ───────────── */}
      {service.modes.length > 1 && (
        <ToggleGroup label="Type" className="mt-2.5">
          {service.modes.map((m) => (
            <SegmentButton
              key={m.id}
              active={m.id === sel.modeId}
              onClick={() => setSel((p) => ({ ...p, modeId: m.id }))}
              sublabel={m.desc}
            >
              {m.label}
            </SegmentButton>
          ))}
        </ToggleGroup>
      )}

      {/* ── 3. Quantity (or size mix, for mattresses) ─────────────────── */}
      {pricing.kind === "sized" ? (
        <div className="mt-2.5 rounded-2xl border border-border bg-card p-3">
          <p className="px-1 pb-2 text-xs font-medium text-muted-foreground">
            How many of each?
          </p>
          <div className="space-y-1">
            {pricing.sizes.map((size) => (
              <div
                key={size.id}
                className="flex items-center justify-between gap-3 rounded-xl px-1 py-1"
              >
                <span className="text-sm text-ink-700">
                  {size.label}
                  <span className="ml-2 text-xs tabular-nums text-muted-foreground">
                    {formatAud(size.price)}
                  </span>
                </span>
                <QuantityStepper
                  value={sel.sizes[size.id] ?? 0}
                  min={0}
                  max={pricing.maxPerSize}
                  onChange={(v) =>
                    setSel((p) => ({ ...p, sizes: { ...p.sizes, [size.id]: v } }))
                  }
                  label={`${size.label} mattresses`}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ToggleGroup label={`How many ${service.unit.plural}?`} className="mt-2.5">
          {quantityOptions(pricing).map((q) => (
            <SegmentButton
              key={q}
              active={q === sel.quantity}
              onClick={() => setSel((p) => ({ ...p, quantity: q }))}
            >
              {q}
              {q === quantityOptions(pricing).at(-1) ? "+" : ""}
            </SegmentButton>
          ))}
        </ToggleGroup>
      )}

      {/* ── Price card ────────────────────────────────────────────────── */}
      <div className="relative mt-4 overflow-hidden rounded-3xl border border-border bg-card shadow-lifted">
        <div className="flex items-start justify-between gap-3 px-5 pt-5 sm:px-7 sm:pt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-800">
            Fixed price
          </span>
          <span className="text-xs text-muted-foreground">AUD, inc. all products</span>
        </div>

        <div className="px-5 pb-5 pt-3 text-center sm:px-7 sm:pb-7">
          <motion.p
            key={quote.total ?? 0}
            initial={reduce ? false : { opacity: 0.4, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="font-display text-4xl font-semibold tabular-nums text-foreground sm:text-5xl"
          >
            {quote.total === 0 ? "—" : formatAud(quote.total ?? 0)}
          </motion.p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            for {unitLabel}
            {service.modes.length > 1 ? ` · ${mode.label.toLowerCase()}` : ""}
          </p>

          <Button
            href={`/contact?service=${encodeURIComponent(service.name)}`}
            variant="accent"
            size="lg"
            className="mt-5 w-full"
          >
            Book this clean <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* ── Spec table ──────────────────────────────────────────────── */}
        <dl className="divide-y divide-border border-t border-border">
          {specRows(service, mode.pricing, quote.note).map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 px-5 py-3 sm:px-7"
            >
              <dt className="text-sm text-muted-foreground">{row.label}</dt>
              <dd className="shrink-0 text-right text-sm font-semibold text-foreground">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Inclusions */}
        <ul className="space-y-2 border-t border-border bg-sage-50/60 px-5 py-4 sm:px-7">
          {service.inclusions.map((inc) => (
            <li key={inc} className="flex items-start gap-2 text-sm text-ink-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {inc}
            </li>
          ))}
        </ul>
      </div>

      {/* Quote-only escape hatch */}
      <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted-foreground">
          Need blinds or water damage? Those are quoted on inspection.
        </p>
        <CallLink
          location="pricing-selector"
          showIcon={false}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-sage-300 px-5 text-sm font-semibold text-sage-800 transition-colors hover:bg-sage-50"
        >
          <Phone className="h-4 w-4" /> {site.phone}
        </CallLink>
      </div>
    </div>
  );
}

/* ------------------------------- sub-parts -------------------------------- */

function ToggleGroup({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-1.5", className)}>
      <span className="sr-only">{label}</span>
      <div
        role="group"
        aria-label={label}
        className="flex flex-wrap items-stretch justify-center gap-1"
      >
        {children}
      </div>
    </div>
  );
}

function SegmentButton({
  active,
  onClick,
  children,
  sublabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  sublabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-xl px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-sage-800 text-white shadow-soft"
          : "text-ink-600 hover:bg-sage-50 hover:text-sage-800",
      )}
    >
      <span className="whitespace-nowrap">{children}</span>
      {sublabel && (
        <span
          className={cn(
            "mt-0.5 text-[0.625rem] font-normal leading-tight",
            active ? "text-mint-200" : "text-muted-foreground",
          )}
        >
          {sublabel}
        </span>
      )}
    </button>
  );
}

/* -------------------------------- helpers --------------------------------- */

/** Quantity chips to offer, derived from the pricing model's own bounds. */
function quantityOptions(pricing: ServiceDef["modes"][number]["pricing"]): number[] {
  if (pricing.kind === "sized" || pricing.kind === "inspection") return [];
  const min = pricing.minQty;
  const max = Math.min(pricing.maxQty, min + 4);
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

/** Spec rows built from the pricing model — never hardcoded. */
function specRows(
  service: ServiceDef,
  pricing: ServiceDef["modes"][number]["pricing"],
  note: string,
): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];

  if (pricing.kind === "tiered") {
    pricing.tiers.forEach((t) =>
      rows.push({
        label: `${t.qty} ${t.qty === 1 ? service.unit.singular : service.unit.plural}`,
        value: formatAud(t.price),
      }),
    );
    rows.push({
      label: `Each extra ${service.unit.singular}`,
      value: `+${formatAud(pricing.extraUnitPrice)}`,
    });
  } else if (pricing.kind === "flat") {
    rows.push({
      label: `1–${pricing.includedUpTo} ${service.unit.plural}`,
      value: formatAud(pricing.flatPrice),
    });
    rows.push({
      label: `Each extra ${service.unit.singular}`,
      value: `+${formatAud(pricing.extraUnitPrice)}`,
    });
  } else if (pricing.kind === "per-unit") {
    rows.push({
      label: `Per ${service.unit.singular}`,
      value: formatAud(pricing.unitPrice),
    });
    rows.push({
      label: "Minimum charge",
      value: formatAud(pricing.jobMinimum),
    });
  } else if (pricing.kind === "sized") {
    pricing.sizes.forEach((s) =>
      rows.push({ label: s.label, value: formatAud(s.price) }),
    );
  }

  rows.push({ label: "Call-out fee", value: "None" });
  if (note) rows.push({ label: "Good to know", value: note });
  return rows;
}
