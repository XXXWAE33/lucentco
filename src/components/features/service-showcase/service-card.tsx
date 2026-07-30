"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Layers } from "lucide-react";
import { cn, formatAud } from "@/lib/utils";
import { startingPrice, type ServiceDef } from "@/config/pricing";
import { serviceContent } from "@/config/services-content";
import { ServiceImage } from "./service-image";
import { ProcessTimeline } from "./process-timeline";
import { useMinWidth } from "./use-min-width";
import { serviceIcons } from "./service-icons";

const EASE = [0.22, 1, 0.36, 1] as const;

/* NOTE: `serviceIcons` is deliberately NOT re-exported from this file.
   Re-exporting it here would route it back through a "use client" module and
   reintroduce the client-manifest prerender failure. Import it from
   `./service-icons` instead. */

/**
 * A priced service. Enters flat and settles into a slight rotation, then
 * straightens and lifts on hover while the process steps reveal beneath.
 *
 * Rotation is suppressed below 640px — at 375px a tilted card reads as broken
 * rather than considered.
 */
export function ServiceCard({
  service,
  index,
  rotation,
}: {
  service: ServiceDef;
  index: number;
  /** Resting tilt in degrees, applied at >=640px only. */
  rotation: number;
}) {
  const reduce = useReducedMotion();
  const isDesktop = useMinWidth(640);
  const content = serviceContent[service.id];
  const Icon = serviceIcons[service.icon] ?? Layers;
  const from = startingPrice(service.id);

  const rest = isDesktop && !reduce ? rotation : 0;

  return (
    <motion.article
      /* Deep-link target. /pricing already exposes these ids via
         ServicePriceCard; without them here, /services#carpet silently landed
         at the top of the page. scroll-mt clears the fixed header. */
      id={service.id}
      initial={reduce ? false : { opacity: 0, y: 32, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rest }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      whileHover={reduce ? undefined : { rotate: 0, y: -8 }}
      className={cn(
        "group relative flex h-full scroll-mt-[calc(var(--announce-h)+var(--header-h)+1rem)] flex-col overflow-hidden rounded-4xl border border-border bg-card shadow-card",
        "transition-shadow duration-500 hover:shadow-lifted focus-within:shadow-lifted",
      )}
    >
      {/* Hero visual */}
      <div className="relative">
        <ServiceImage
          image={content.image}
          icon={<Icon className="h-5 w-5" />}
          className="rounded-none"
        />

        {/* Category pill — sits over the scrim, always legible. */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-sage-800 shadow-soft backdrop-blur">
          <Icon className="h-3.5 w-3.5 text-emerald-600" />
          {service.tagline}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {service.name}
        </h3>
        <p className="mt-2 text-pretty text-sm text-muted-foreground">
          {service.blurb}
        </p>

        {/* Fact chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {from !== null && (
            <Chip tone="accent">From {formatAud(from)}</Chip>
          )}
          {service.inclusions.slice(0, 1).map((inc) => (
            <Chip key={inc}>{inc}</Chip>
          ))}
        </div>

        {/* Differentiators */}
        <ul className="mt-5 space-y-2">
          {content.differentiators.map((line) => (
            <li key={line} className="flex items-start gap-2.5 text-sm text-ink-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-pretty">{line}</span>
            </li>
          ))}
        </ul>

        {/*
          Process reveal. Mobile shows it outright (there is no hover on touch);
          from lg up it is collapsed until hover or keyboard focus. The 0fr→1fr
          grid trick animates to auto height without measuring anything in JS.
        */}
        <div
          className={cn(
            "mt-5 grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out-soft",
            "lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border pt-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                How we do it
              </p>
              <ProcessTimeline steps={content.process} />
            </div>
          </div>
        </div>

        {/*
          A bare text link was a 20px tap target. On mobile this is the card's
          primary action, so it becomes a full-width bordered button; it relaxes
          back to an inline link from sm up where pointer precision is higher.
        */}
        <a
          href={`/contact?service=${encodeURIComponent(service.name)}`}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-1.5 self-start rounded-full border border-sage-300 text-sm font-semibold text-emerald-700 transition-colors hover:bg-sage-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-auto sm:w-auto sm:justify-start sm:border-0 sm:hover:bg-transparent"
        >
          Book {service.name.toLowerCase()}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.article>
  );
}

export function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
        tone === "accent" &&
          "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200",
        tone === "neutral" && "bg-sage-50 text-sage-800 ring-1 ring-inset ring-sage-200",
        tone === "dark" && "bg-white/10 text-mint-100 ring-1 ring-inset ring-white/20",
      )}
    >
      {children}
    </span>
  );
}
