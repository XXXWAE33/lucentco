"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Info, Layers } from "lucide-react";
import { cn, formatAud } from "@/lib/utils";
import {
  calculateService,
  getService,
  isQuoteOnly,
  services,
  type ServiceId,
} from "@/config/pricing";
import { QuantityStepper } from "./quantity-stepper";
import { initFor, specRows, type Selection } from "./pricing-selector";
import { serviceIcons } from "../service-showcase/service-icons";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Compact single-service pricer for the quote sheet.
 *
 * Same engine as `PricingSelector` (`calculateService` + `specRows`), laid out
 * for a phone: one-line service chips, a −/+ stepper instead of a chip row,
 * a tight price panel, the breakdown folded away, and the CTA pinned to the
 * bottom of the sheet.
 */
export function SheetPricing({ initialService = "carpet" }: { initialService?: ServiceId }) {
  const reduce = useReducedMotion();
  const priced = services.filter((s) => !isQuoteOnly(s.id));
  const [sel, setSel] = useState<Selection>(() => initFor(initialService));
  const [showBreakdown, setShowBreakdown] = useState(false);

  const service = getService(sel.serviceId);
  const mode = service.modes.find((m) => m.id === sel.modeId) ?? service.modes[0];
  const pricing = mode.pricing;
  const quote = calculateService(sel);
  const total = quote.total ?? 0;

  const count =
    pricing.kind === "sized"
      ? Object.values(sel.sizes).reduce((a, b) => a + b, 0)
      : sel.quantity;
  const unitLabel = `${count} ${count === 1 ? service.unit.singular : service.unit.plural}`;
  const rows = specRows(service, pricing, "").filter((r) => r.label !== "Call-out fee");

  return (
    <div className="flex flex-col gap-4">
      {/* ── Service chips ─────────────────────────────────────────────── */}
      <div
        role="group"
        aria-label="Service"
        className="grid grid-cols-4 gap-1.5 rounded-2xl bg-sage-50 p-1.5"
      >
        {priced.map((s) => {
          const Icon = serviceIcons[s.icon] ?? Layers;
          const active = s.id === sel.serviceId;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setSel(initFor(s.id));
                setShowBreakdown(false);
              }}
              className={cn(
                "relative flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? "text-white" : "text-ink-600 hover:text-sage-800",
              )}
            >
              {active && (
                <motion.span
                  layoutId="sheet-service-pill"
                  className="absolute inset-0 rounded-xl bg-sage-800 shadow-soft"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon
                className={cn("relative h-4 w-4", active ? "text-mint-200" : "text-ink-400")}
              />
              <span className="relative">{s.name.replace(" cleaning", "")}</span>
            </button>
          );
        })}
      </div>

      {/* ── Options card: mode + quantity ─────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card">
        {service.modes.length > 1 && (
          <div className="border-b border-border p-1.5">
            <div role="group" aria-label="Type" className="grid grid-cols-2 gap-1">
              {service.modes.map((m) => {
                const active = m.id === sel.modeId;
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSel((p) => ({ ...p, modeId: m.id }))}
                    className={cn(
                      "rounded-xl px-2 py-2 text-center transition-colors",
                      active ? "bg-sage-50 ring-1 ring-inset ring-sage-300" : "hover:bg-sage-50/60",
                    )}
                  >
                    <span
                      className={cn(
                        "block text-sm font-semibold",
                        active ? "text-sage-900" : "text-ink-600",
                      )}
                    >
                      {m.label}
                    </span>
                    <span className="block truncate text-[0.6875rem] text-muted-foreground">
                      {m.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {pricing.kind === "sized" ? (
          <ul className="divide-y divide-border">
            {pricing.sizes.map((size) => (
              <li key={size.id} className="flex items-center justify-between gap-3 px-4 py-2">
                <span className="text-sm text-ink-700">
                  {size.label}
                  <span className="ml-1.5 text-xs tabular-nums text-muted-foreground">
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
              </li>
            ))}
          </ul>
        ) : pricing.kind !== "inspection" ? (
          <div className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="text-sm font-medium text-ink-700">
              How many {service.unit.plural}?
            </span>
            <QuantityStepper
              value={sel.quantity}
              min={pricing.minQty}
              max={pricing.maxQty}
              onChange={(v) => setSel((p) => ({ ...p, quantity: v }))}
              label={service.unit.plural}
            />
          </div>
        ) : null}
      </div>

      {/* ── Price panel ───────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-sage-900 px-5 py-4 text-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-gold-400/25 blur-3xl"
        />
        <div className="relative flex items-end justify-between gap-3">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-300">
              Fixed price
            </p>
            <motion.p
              key={total}
              initial={reduce ? false : { opacity: 0.4, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="mt-0.5 font-display text-4xl font-semibold leading-none tabular-nums"
            >
              {total === 0 ? "—" : formatAud(total)}
            </motion.p>
          </div>
          <p className="pb-0.5 text-right text-xs leading-snug text-mint-200/90">
            {unitLabel}
            {service.modes.length > 1 ? (
              <>
                <br />
                {mode.label.toLowerCase()}
              </>
            ) : null}
          </p>
        </div>
        <p className="relative mt-3 border-t border-white/10 pt-2.5 text-xs text-mint-200/80">
          No call-out fee · all products included
        </p>
      </div>

      {quote.note && (
        <p className="-mt-1 flex items-start gap-2 px-1 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-px h-3.5 w-3.5 shrink-0 text-emerald-600" />
          {quote.note}
        </p>
      )}

      {/* ── Included ──────────────────────────────────────────────────── */}
      <ul className="flex flex-wrap gap-1.5">
        {service.inclusions.map((inc) => (
          <li
            key={inc}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900"
          >
            <Check className="h-3 w-3 text-emerald-600" />
            {inc}
          </li>
        ))}
      </ul>

      {/* ── Breakdown (folded) ────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border">
        <button
          type="button"
          aria-expanded={showBreakdown}
          onClick={() => setShowBreakdown((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-ink-700"
        >
          Price breakdown
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-300",
              showBreakdown && "rotate-180",
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {showBreakdown && (
            <motion.dl
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="space-y-1.5 border-t border-border px-4 py-3">
                {rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-semibold tabular-nums text-foreground">{row.value}</dd>
                  </div>
                ))}
              </div>
            </motion.dl>
          )}
        </AnimatePresence>
      </div>

      {/* ── Pinned CTA ────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 z-10 -mx-4 mt-1 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur-xl sm:-mx-7 sm:px-7"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <Link
          href={`/contact?service=${encodeURIComponent(service.name)}`}
          className="flex h-12 w-full items-center justify-between rounded-xl bg-emerald-500 pl-5 pr-2 font-semibold text-white shadow-soft transition-colors hover:bg-emerald-600 active:scale-[0.99]"
        >
          <span>Book this clean</span>
          <span className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-white/15 px-3 tabular-nums">
            {total === 0 ? "—" : formatAud(total)}
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
