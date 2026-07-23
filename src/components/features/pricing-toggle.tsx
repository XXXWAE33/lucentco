"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui";
import { cn, formatAud } from "@/lib/utils";
import { pricingTiers } from "@/lib/pages-content";

type Mode = "recurring" | "one-off";

export function PricingToggle() {
  const [mode, setMode] = useState<Mode>("recurring");

  return (
    <div>
      {/* Toggle */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
          {(["recurring", "one-off"] as Mode[]).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={active}
                className={cn(
                  "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-ink-600 hover:text-sage-800",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="pricing-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-sage-700"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {m === "recurring" ? "Recurring" : "One-off"}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-emerald-700">
          {mode === "recurring"
            ? "Save up to 18% with a recurring clean — pause any time."
            : "A single visit, no commitment."}
        </p>
      </div>

      {/* Tiers */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => {
          const price = mode === "recurring" ? tier.recurring : tier.oneOff;
          const saving = tier.oneOff - tier.recurring;
          const pct = Math.round((saving / tier.oneOff) * 100);
          return (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-4xl border p-7 shadow-card",
                tier.popular
                  ? "border-accent bg-card ring-2 ring-accent/20"
                  : "border-border bg-card",
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  <Star className="h-3.5 w-3.5 fill-white" /> Most popular
                </span>
              )}

              <h3 className="font-display text-lg font-semibold text-foreground">
                {tier.name}
              </h3>
              <p className="text-sm text-muted-foreground">{tier.desc}</p>

              <div className="mt-5 flex items-end gap-1">
                <motion.span
                  key={`${tier.name}-${price}`}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-4xl font-semibold text-foreground"
                >
                  {formatAud(price)}
                </motion.span>
                <span className="pb-1 text-sm text-muted-foreground">
                  /{mode === "recurring" ? "visit" : "clean"}
                </span>
              </div>
              {mode === "recurring" ? (
                <p className="mt-1 text-sm text-emerald-700">
                  Save {formatAud(saving)} ({pct}%) vs one-off
                </p>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">&nbsp;</p>
              )}

              <ul className="mt-6 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-ink-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href="/contact"
                variant={tier.popular ? "accent" : "outline"}
                className="mt-7 w-full"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
