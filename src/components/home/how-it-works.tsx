import { BadgeCheck, Calculator, CalendarCheck, Check, Sparkles, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import { steps } from "@/lib/content";

/** Verified facts only — same claims already published on /pricing. */
const checklist = [
  "Fixed prices, confirmed before we start",
  "No call-out fees",
  "Non-toxic, pet-safe products",
];

/** One icon per step, in order. */
const STEP_ICONS: LucideIcon[] = [Calculator, CalendarCheck, Sparkles, BadgeCheck];

/**
 * How we work — a four-stop timeline.
 *
 * Mobile: vertical, gold rail down the left with an icon marker per step.
 * Desktop: four cards in a row; the rail runs behind them at marker height,
 * so it shows in the gaps as connectors. The last step — the price promise —
 * is the payoff, so it gets the dark card.
 */
export function HowItWorks() {
  return (
    <Section>
      <SectionHeading
        eyebrow="How we work"
        title="Four steps, no phone tag"
        intro="From the price you get online to the price you pay on the day — here's exactly how a Velora job runs."
        align="center"
      />

      <Reveal>
        <ol className="relative mx-auto mt-10 grid max-w-6xl gap-4 sm:mt-14 lg:grid-cols-4 lg:gap-6">
          {/* Rail — vertical on mobile, horizontal behind the cards on desktop. */}
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[1.375rem] top-10 w-px bg-gradient-to-b from-gold-300 via-gold-400 to-gold-300 lg:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute left-8 right-8 top-12 hidden h-px bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 lg:block"
          />

          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Check;
            const last = i === steps.length - 1;
            return (
              <li key={step.number} className="relative flex gap-4 lg:block">
                {/* Mobile marker (sits on the rail) */}
                <span
                  className={cn(
                    "relative z-10 mt-5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-4 ring-background lg:hidden",
                    last ? "bg-sage-900 text-gold-300" : "bg-gold-50 text-gold-600",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div
                  className={cn(
                    "relative flex-1 overflow-hidden rounded-3xl p-5 sm:p-6 lg:h-full",
                    last
                      ? "bg-sage-900 text-white shadow-lifted"
                      : "border border-border bg-card shadow-soft",
                  )}
                >
                  {last && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold-400/20 blur-3xl"
                    />
                  )}

                  <div className="relative flex items-start justify-between">
                    {/* Desktop marker (rail passes behind it) */}
                    <span
                      className={cn(
                        "hidden h-12 w-12 items-center justify-center rounded-2xl lg:inline-flex",
                        last
                          ? "bg-gold-400/15 text-gold-300 ring-1 ring-inset ring-gold-400/30"
                          : "bg-gold-50 text-gold-600 ring-1 ring-inset ring-gold-200",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    {/* Outlined numeral — the logo's thin-line style. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "ml-auto font-display text-5xl font-semibold leading-none tracking-tight text-transparent lg:text-6xl",
                        last
                          ? "[-webkit-text-stroke:1px_theme(colors.gold.300)]"
                          : "[-webkit-text-stroke:1px_theme(colors.gold.400)]",
                      )}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "relative -mt-6 pr-14 font-display text-lg font-semibold lg:mt-6 lg:pr-0",
                      last ? "text-white" : "text-foreground",
                    )}
                  >
                    <span className="sr-only">Step {step.number}: </span>
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "relative mt-2 text-pretty text-sm leading-relaxed",
                      last ? "text-mint-100/80" : "text-muted-foreground",
                    )}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>

      {/* The facts every one of those four steps rests on. */}
      <Reveal delay={0.1} className="mt-8 sm:mt-10">
        <ul className="mx-auto flex max-w-3xl flex-col items-stretch gap-2 rounded-3xl border border-gold-200/70 bg-gold-50/60 p-2 sm:flex-row sm:flex-wrap sm:justify-center sm:rounded-full">
          {checklist.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink-700"
            >
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-white">
                <Check className="h-3 w-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
