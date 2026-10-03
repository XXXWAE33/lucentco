import Link from "next/link";
import { ArrowRight, Check, Layers } from "lucide-react";
import { Section, SectionHeading, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { services, startingPrice, isQuoteOnly, type ServiceDef } from "@/config/pricing";
import { serviceContent } from "@/config/services-content";
import { serviceIcons } from "@/components/features/service-showcase/service-icons";
import { ServiceImage } from "@/components/features/service-showcase";
import { formatAud } from "@/lib/utils";

/**
 * Services — a continuously scrolling row of image cards.
 *
 * Reuses the site's existing `.marquee` CSS (same system as the testimonial
 * rows), so it inherits for free:
 *   • a seamless loop — the track holds two identical sets and translates
 *     exactly -50%, and the trailing gap lives INSIDE `.marquee__set` so each
 *     set is precisely half the track. A gap between sets would leave the loop
 *     half-a-gap short and visibly jump every cycle.
 *   • pause on hover AND on keyboard focus, so it can actually be read
 *   • `prefers-reduced-motion` → collapses to a static wrapped grid rather
 *     than freezing mid-scroll
 *   • soft mask fades at both edges
 *
 * The second set is `aria-hidden` and its links are `tabIndex={-1}`: without
 * that, every service would appear twice to a screen reader and take two tab
 * stops.
 *
 * Text sits ON the image behind a heavy bottom scrim. The scrim is deliberately
 * strong (90% at the base) — the photos aren't shot yet, so legibility has to
 * hold against the placeholder AND against whatever image eventually lands,
 * including a bright one.
 */
export function ServicesOverview() {
  return (
    <Section id="services" bleed>
      <Container>
        <SectionHeading
          eyebrow="What we clean"
          title="Specialist cleaning, priced up front"
          intro="Carpets, couches, mattresses and curtains — fixed prices you can check before you call, using non-toxic products and the same Velora finish every time."
          align="center"
        />
      </Container>

      <Reveal>
        <div
          className="marquee mt-8 sm:mt-12"
          /* Slower on mobile: less distracting on a small screen, and it gives
             a reader time to finish a card before it leaves. */
        >
          <div className="marquee__track animate-marquee [--marquee-duration:64s] md:[--marquee-duration:52s]">
            {[false, true].map((isDuplicate) => (
              <ul
                key={String(isDuplicate)}
                /* py-3: `.marquee` clips both axes, so without vertical room
                   the hover lift and its shadow get sheared off at the top. */
                className="marquee__set py-3"
                aria-hidden={isDuplicate || undefined}
              >
                {services.map((service) => (
                  <li key={service.id} className="shrink-0">
                    <ServiceScrollCard
                      service={service}
                      interactive={!isDuplicate}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>

      {/* The row moves on its own, so say so rather than relying on a swipe
          affordance that no longer applies. */}
      <Container>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Hover to pause ·{" "}
          <Link
            href="/pricing"
            className="font-medium text-emerald-700 underline-offset-4 hover:underline"
          >
            see every price
          </Link>
        </p>
      </Container>
    </Section>
  );
}

function ServiceScrollCard({
  service,
  interactive,
}: {
  service: ServiceDef;
  /** False for the duplicated set — keeps it out of the tab order. */
  interactive: boolean;
}) {
  const Icon = serviceIcons[service.icon] ?? Layers;
  const from = startingPrice(service.id);
  const quoteOnly = isQuoteOnly(service.id);
  const content = serviceContent[service.id];
  const image = content.image;

  return (
    <Link
      href={`/pricing#${service.id}`}
      tabIndex={interactive ? undefined : -1}
      className="group relative block w-[78vw] max-w-[19rem] overflow-hidden rounded-card shadow-elevation-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-[20rem] lg:w-[21rem]"
    >
      <ServiceImage
        image={image}
        icon={<Icon className="h-5 w-5" />}
        aspect="aspect-[4/5]"
        className="rounded-none"
        sizes="(min-width: 1024px) 336px, 78vw"
      />

      {/*
        Legibility scrim — explicit stops, not Tailwind's from/via/to.
        `via` sits at 50% by default, which left the TOP of the title in a ~55%
        band: white measured 3.12:1 there against the light placeholder, i.e. a
        contrast failure on the card headings. The text block occupies roughly
        the bottom half, so the ramp holds ≥90% opacity to the 48% mark
        (white ≈ 11.5:1) and only fades above it.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(16,37,32,0.96) 0%, rgba(16,37,32,0.92) 48%, rgba(16,37,32,0.38) 74%, transparent 100%)",
        }}
      />

      {/* Category pill, top-left */}
      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-sage-800 shadow-soft backdrop-blur">
        <Icon className="h-3.5 w-3.5 text-emerald-700" />
        {service.tagline}
      </span>

      {/* Price badge, top-right — the number people are scanning for. */}
      <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-elevation-1">
        {quoteOnly || from === null ? "On inspection" : `From ${formatAud(from)}`}
      </span>

      {/* Overlaid copy, bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-xl font-semibold text-white">
          {service.name}
        </h3>

        {/* Two real inclusions from config — more substance than one line, and
            the tick reads as a spec list rather than marketing copy. */}
        <ul className="mt-3 space-y-1.5">
          {service.inclusions.slice(0, 2).map((inc) => (
            <li key={inc} className="flex items-start gap-2 text-sm text-white/90">
              <Check
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300"
              />
              <span className="line-clamp-2 leading-snug">{inc}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/20 pt-3">
          <span className="text-sm font-medium text-white/80">
            {content.process.length}-step process
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
            View
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
