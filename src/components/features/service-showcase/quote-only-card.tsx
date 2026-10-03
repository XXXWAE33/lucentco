"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, whatsappServiceMessage } from "@/lib/site";
import {
  CallLink,
  WhatsAppLink,
  WhatsAppIcon,
  darkContactPillClass,
} from "@/components/layout";
import type { ProcessStep, ServiceImageSlot } from "@/config/services-content";
import { ServiceImage } from "./service-image";
import { ProcessTimeline } from "./process-timeline";
import { Chip } from "./service-card";
import { serviceIcons } from "./service-icons";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Services we will not price online (blinds, flood damage).
 *
 * Deliberately the most visually substantial block in the section — a dark,
 * wide panel rather than a card with an empty price slot. "Quoted on
 * inspection" should read as the premium option, not as missing information.
 */
export function QuoteOnlyCard({
  name,
  tagline,
  blurb,
  process,
  differentiators,
  image,
  iconKey,
  chips,
  index = 0,
  anchorId,
}: {
  name: string;
  tagline: string;
  blurb: string;
  process: ProcessStep[];
  differentiators: string[];
  image: ServiceImageSlot;
  /** Deep-link id, e.g. "blind" or "flood-damage". */
  anchorId: string;
  /**
   * Icon *key*, not the component. This card renders on the client, and a
   * React component cannot be serialized across the server/client boundary.
   */
  iconKey: keyof typeof serviceIcons;
  chips: string[];
  index?: number;
}) {
  const reduce = useReducedMotion();
  const Icon = serviceIcons[iconKey] ?? Layers;

  return (
    <motion.article
      /* Deep-link target, matching ServiceCard — see note there. */
      id={anchorId}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className={cn(
        "group relative overflow-hidden rounded-4xl bg-sage-900 text-mint-100 shadow-lifted",
        "scroll-mt-[calc(var(--announce-h)+var(--header-h)+1rem)] ring-1 ring-inset ring-white/10",
      )}
    >
      {/* Brand wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(70% 60% at 85% 0%, rgba(16,185,91,0.20), transparent 65%)",
        }}
      />

      <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* Visual */}
        <div className="lg:order-2">
          <ServiceImage
            image={image}
            icon={<Icon className="h-5 w-5" />}
            className="ring-1 ring-inset ring-white/10"
          />
        </div>

        {/* Content */}
        <div className="lg:order-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            Quoted on inspection
          </span>

          <h3 className="mt-4 font-display text-2xl font-semibold text-white">
            {name}
          </h3>
          <p className="mt-1 text-sm font-medium text-emerald-300">{tagline}</p>
          <p className="mt-4 text-pretty text-mint-200/80">{blurb}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Chip key={chip} tone="dark">
                {chip}
              </Chip>
            ))}
          </div>

          <ul className="mt-6 space-y-2.5">
            {differentiators.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 text-sm text-mint-100/90"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                />
                <span className="text-pretty">{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-mint-200/80">
              How we do it
            </p>
            <ProcessTimeline steps={process} tone="dark" />
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <CallLink
              location="service-showcase"
              context={name}
              showIcon={false}
              className={cn(darkContactPillClass, "bg-accent hover:bg-emerald-500")}
            >
              <Phone className="h-4 w-4" /> Call {site.phone}
            </CallLink>
            <WhatsAppLink
              location="service-showcase"
              context={name}
              message={whatsappServiceMessage(name)}
              showIcon={false}
              className={darkContactPillClass}
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
