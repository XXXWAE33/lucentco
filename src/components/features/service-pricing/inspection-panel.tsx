"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Blinds,
  Check,
  Droplets,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { site, whatsappServiceMessage } from "@/lib/site";
import {
  CallLink,
  WhatsAppLink,
  WhatsAppIcon,
  darkContactPillClass,
} from "@/components/layout";
import {
  findDiscountBand,
  getMode,
  inspectionServices,
  type InspectionPricing,
} from "@/config/pricing";
import { QuantityStepper } from "./quantity-stepper";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Quote-only services get a deliberately distinct, premium treatment: a dark
 * panel that leads with "assessed on inspection" rather than an empty price
 * slot. Blinds stay interactive — the visitor sees which volume discount they
 * land in without us inventing a number we have not committed to.
 */
export function InspectionPanel() {
  const blindPricing = getMode("blind").pricing as InspectionPricing;

  return (
    <div className="overflow-hidden rounded-4xl bg-sage-900 text-mint-100">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14">
        <BlindQuote pricing={blindPricing} />

        <div className="flex flex-col gap-6">
          {inspectionServices.map((svc) => (
            <FloodCard key={svc.id} service={svc} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- blinds --------------------------------- */

function BlindQuote({ pricing }: { pricing: InspectionPricing }) {
  const reduce = useReducedMotion();
  const [qty, setQty] = useState(6);
  const band = findDiscountBand(pricing.discountBands, qty);

  return (
    <div id="blind" className="scroll-mt-[calc(var(--announce-h)+var(--header-h)+1rem)]">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-emerald-300">
          <Blinds className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-display text-2xl font-semibold text-white">
            Blind cleaning
          </h3>
          <p className="text-sm font-medium text-emerald-300">
            Assessed on inspection
          </p>
        </div>
      </div>

      <p className="mt-4 text-pretty text-mint-200/80">
        Blinds vary enormously by material, size and condition — so we price
        them properly, in person, rather than guessing. The more you have, the
        better the rate.
      </p>

      {/* Value story — the discount ladder, up front */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-mint-200/60">
          Volume pricing
        </p>
        <div className="mt-3 space-y-2">
          {pricing.discountBands.map((b) => {
            const active = b.minQty === band?.minQty;
            return (
              <motion.div
                key={b.label}
                initial={false}
                animate={{ scale: active && !reduce ? 1.015 : 1 }}
                transition={{ duration: 0.25, ease: EASE }}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-colors",
                  active
                    ? "border-emerald-400/60 bg-emerald-400/10"
                    : "border-white/10 bg-white/[0.03]",
                )}
              >
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      active ? "text-white" : "text-mint-100/90",
                    )}
                  >
                    {b.label}
                  </p>
                  <p className="text-xs text-mint-200/70">{b.detail}</p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                    b.percent > 0
                      ? active
                        ? "bg-emerald-400 text-sage-900"
                        : "bg-white/10 text-emerald-300"
                      : "bg-white/10 text-mint-200/80",
                  )}
                >
                  {b.percent > 0 ? `Save ${b.percent}%` : "Standard"}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive band finder — no fabricated total */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div>
          <p className="text-sm font-medium text-white">How many blinds?</p>
          <p className="text-xs text-mint-200/70">
            {band && band.percent > 0
              ? `You'd qualify for ${band.percent}% off`
              : "Standard per-blind rate applies"}
          </p>
        </div>
        <QuantityStepper
          value={qty}
          min={1}
          max={pricing.maxQty}
          onChange={setQty}
          label="blinds"
          tone="dark"
        />
      </div>

      {pricing.minimumCharge !== null && (
        <p className="mt-3 flex items-center gap-2 text-xs text-mint-200/70">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
          Minimum service charge of ${pricing.minimumCharge} applies to any blind
          job.
        </p>
      )}

      {/* Quote-only: the call/WhatsApp path IS the conversion route. */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <CallLink
          location="blind-quote"
          context="Blind cleaning"
          showIcon={false}
          className={cn(darkContactPillClass, "bg-accent hover:bg-emerald-500")}
        >
          <Phone className="h-4 w-4" /> Call {site.phone}
        </CallLink>
        <WhatsAppLink
          location="blind-quote"
          context="Blind cleaning"
          message={whatsappServiceMessage("Blind cleaning")}
          showIcon={false}
          className={darkContactPillClass}
        >
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
        </WhatsAppLink>
      </div>
      <Button
        href="/contact?service=Blind%20cleaning"
        className="mt-3 w-full border border-white/15 bg-transparent text-mint-100/80 hover:bg-white/10"
      >
        Or send an enquiry <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

/* ------------------------------ flood damage ------------------------------ */

function FloodCard({
  service,
}: {
  service: (typeof inspectionServices)[number];
}) {
  return (
    <div
      id={service.id}
      className="flex scroll-mt-[calc(var(--announce-h)+var(--header-h)+1rem)] flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6"
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-emerald-300">
          <Droplets className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-white">
            {service.name}
          </h3>
          <p className="text-sm font-medium text-emerald-300">
            {service.tagline}
          </p>
        </div>
      </div>

      <p className="mt-4 text-pretty text-sm text-mint-200/80">
        {service.blurb}
      </p>

      <ul className="mt-5 space-y-2.5">
        {service.reasons.map((reason) => (
          <li
            key={reason}
            className="flex items-start gap-2.5 text-sm text-mint-100/90"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            {reason}
          </li>
        ))}
      </ul>

      {/* Quote-only: the call/WhatsApp path IS the conversion route. */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <CallLink
          location="flood-damage"
          context={service.name}
          showIcon={false}
          className={cn(darkContactPillClass, "bg-accent hover:bg-emerald-500")}
        >
          <Phone className="h-4 w-4" /> Call now
        </CallLink>
        <WhatsAppLink
          location="flood-damage"
          context={service.name}
          message={whatsappServiceMessage(service.name)}
          showIcon={false}
          className={darkContactPillClass}
        >
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
        </WhatsAppLink>
      </div>
      <Button
        href={`/contact?service=${encodeURIComponent(service.name)}`}
        className="mt-3 w-full border border-white/15 bg-transparent text-mint-100/80 hover:bg-white/10"
      >
        {service.cta} <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
