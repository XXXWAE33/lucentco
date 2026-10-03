"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Layers } from "lucide-react";
import { cn, formatAud } from "@/lib/utils";
import {
  calculateService,
  type ServiceDef,
  type SizedPricing,
} from "@/config/pricing";
import { QuantityStepper } from "./quantity-stepper";
import { serviceIcons } from "../service-showcase/service-icons";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Interactive pricing card for a fixed-price service. The visitor adjusts
 * quantity and sees the real total immediately — every figure comes from
 * `calculateService`, so the card can never drift from the rate card.
 */
export function ServicePriceCard({ service }: { service: ServiceDef }) {
  const reduce = useReducedMotion();
  const Icon = serviceIcons[service.icon] ?? Layers;
  const hasModes = service.modes.length > 1;

  const [modeId, setModeId] = useState(service.modes[0].id);
  const mode = service.modes.find((m) => m.id === modeId) ?? service.modes[0];
  const pricing = mode.pricing;

  // Quantity-based services keep a count; mattresses keep a count per size.
  const [quantity, setQuantity] = useState(() => startingQty(service));
  const [sizes, setSizes] = useState<Record<string, number>>(() =>
    pricing.kind === "sized" ? { [pricing.sizes[2]?.id ?? "queen"]: 1 } : {},
  );

  const quote = useMemo(
    () => calculateService({ serviceId: service.id, modeId, quantity, sizes }),
    [service.id, modeId, quantity, sizes],
  );

  const bounds = quantityBounds(pricing);
  const empty = quote.total === 0;

  return (
    <div
      id={service.id}
      className="group/card flex h-full scroll-mt-[calc(var(--announce-h)+var(--header-h)+5rem)] flex-col overflow-hidden rounded-4xl border border-border bg-card shadow-card transition-all duration-300 hover:border-gold-300 hover:shadow-lifted"
    >
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Identity */}
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-600 ring-1 ring-inset ring-gold-200 transition-colors duration-300 group-hover/card:bg-gold-400 group-hover/card:text-white group-hover/card:ring-gold-400">
            <Icon className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {service.name}
            </h3>
            <p className="text-sm font-medium text-gold-600">
              {service.tagline}
            </p>
          </div>
        </div>

        <p className="mt-4 text-pretty text-sm text-muted-foreground">
          {service.blurb}
        </p>

        {/* Mode toggle — only when a service genuinely has two modes */}
        {hasModes && (
          <div className="mt-5 inline-flex rounded-full border border-border bg-sage-50 p-1">
            {service.modes.map((m) => {
              const active = m.id === modeId;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModeId(m.id)}
                  aria-pressed={active}
                  className={cn(
                    "relative z-10 inline-flex h-11 items-center rounded-full px-4 text-sm font-medium transition-colors",
                    active ? "text-white" : "text-ink-600 hover:text-sage-800",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={`mode-pill-${service.id}`}
                      className="absolute inset-0 -z-10 rounded-full bg-sage-800"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {m.label}
                </button>
              );
            })}
          </div>
        )}
        {hasModes && (
          <p className="mt-2 text-xs text-muted-foreground">{mode.desc}</p>
        )}

        {/* Tier ladder — makes the next price threshold visible */}
        <TierLadder pricing={pricing} quantity={quantity} unit={service.unit} />

        {/* Controls */}
        <div className="mt-5">
          {pricing.kind === "sized" ? (
            <SizeRows
              pricing={pricing}
              sizes={sizes}
              onChange={(id, v) => setSizes((s) => ({ ...s, [id]: v }))}
            />
          ) : (
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border p-3">
              <span className="text-sm font-medium text-foreground">
                How many {service.unit.plural}?
              </span>
              <QuantityStepper
                value={quantity}
                min={bounds.min}
                max={bounds.max}
                onChange={setQuantity}
                label={service.unit.plural}
              />
            </div>
          )}
        </div>

        {/* Inclusions — value, not fine print */}
        <ul className="mt-5 space-y-2">
          {service.inclusions.map((inc) => (
            <li
              key={inc}
              className="flex items-start gap-2.5 text-sm text-ink-700"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              {inc}
            </li>
          ))}
        </ul>
      </div>

      {/* Live price */}
      <div className="relative overflow-hidden bg-sage-900 p-6 text-white sm:p-7">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-gold-400/20 blur-3xl"
        />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">
              {empty ? "Select a size" : "Your price"}
            </p>
            <motion.div
              key={quote.total ?? 0}
              initial={reduce ? false : { opacity: 0.4, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="font-display text-4xl font-semibold tabular-nums text-white"
            >
              {empty ? "—" : formatAud(quote.total ?? 0)}
            </motion.div>
          </div>
          <Link
            href={`/contact?service=${encodeURIComponent(service.name)}`}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-white pl-5 pr-1.5 text-sm font-semibold text-sage-900 transition-colors hover:bg-gold-50"
          >
            Book this
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
        {quote.minimumApplied && (
          <p className="relative mt-3 text-xs font-medium text-mint-200/80">
            {quote.note}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- sub-parts -------------------------------- */

function TierLadder({
  pricing,
  quantity,
  unit,
}: {
  pricing: ServiceDef["modes"][number]["pricing"];
  quantity: number;
  unit: { singular: string; plural: string };
}) {
  if (pricing.kind === "sized" || pricing.kind === "inspection") return null;

  const chips: { key: string; label: string; price: string; active: boolean }[] =
    [];

  if (pricing.kind === "tiered") {
    for (const tier of pricing.tiers) {
      chips.push({
        key: String(tier.qty),
        label: `${tier.qty} ${tier.qty === 1 ? unit.singular : unit.plural}`,
        price: formatAud(tier.price),
        active: quantity === tier.qty,
      });
    }
  } else if (pricing.kind === "flat") {
    chips.push({
      key: "flat",
      label: `1–${pricing.includedUpTo} ${unit.plural}`,
      price: formatAud(pricing.flatPrice),
      active: quantity <= pricing.includedUpTo,
    });
  } else if (pricing.kind === "per-unit") {
    chips.push({
      key: "unit",
      label: `Per ${unit.singular}`,
      price: formatAud(pricing.unitPrice),
      active: quantity > 1,
    });
    chips.push({
      key: "min",
      label: "Single-curtain minimum",
      price: formatAud(pricing.jobMinimum),
      active: quantity === 1,
    });
  }

  const overflow =
    pricing.kind === "tiered"
      ? `+${formatAud(pricing.extraUnitPrice)} per extra ${unit.singular} beyond ${pricing.tiers[pricing.tiers.length - 1].qty}`
      : pricing.kind === "flat"
        ? `+${formatAud(pricing.extraUnitPrice)} per extra ${unit.singular}`
        : null;

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip.key}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors",
              chip.active
                ? "border-gold-400 bg-gold-50 text-gold-800"
                : "border-border text-muted-foreground",
            )}
          >
            {chip.label}
            <span className="font-semibold tabular-nums">{chip.price}</span>
          </span>
        ))}
      </div>
      {overflow && (
        <p className="mt-2 text-xs text-muted-foreground">{overflow}</p>
      )}
    </div>
  );
}

function SizeRows({
  pricing,
  sizes,
  onChange,
}: {
  pricing: SizedPricing;
  sizes: Record<string, number>;
  onChange: (id: string, value: number) => void;
}) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
      {pricing.sizes.map((size) => (
        <div
          key={size.id}
          className="flex items-center justify-between gap-3 p-3"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{size.label}</p>
            <p className="text-xs text-muted-foreground tabular-nums">
              {formatAud(size.price)} each
            </p>
          </div>
          <QuantityStepper
            value={sizes[size.id] ?? 0}
            min={0}
            max={pricing.maxPerSize}
            onChange={(v) => onChange(size.id, v)}
            label={`${size.label} mattresses`}
          />
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- helpers --------------------------------- */

function startingQty(service: ServiceDef): number {
  const p = service.modes[0].pricing;
  if (p.kind === "tiered") return p.tiers[0]?.qty ?? p.minQty;
  if (p.kind === "flat" || p.kind === "per-unit") return p.minQty;
  return 1;
}

function quantityBounds(pricing: ServiceDef["modes"][number]["pricing"]) {
  if (pricing.kind === "sized") return { min: 0, max: pricing.maxPerSize };
  if (pricing.kind === "inspection") return { min: 1, max: pricing.maxQty };
  return { min: pricing.minQty, max: pricing.maxQty };
}
