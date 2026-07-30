import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { steps } from "@/lib/content";

/** Verified facts only — same claims already published on /pricing. */
const checklist = [
  "Fixed prices, confirmed before we start",
  "No call-out fees",
  "Non-toxic, pet-safe products",
];

export function HowItWorks() {
  return (
    <Section>
      <SectionHeading
        eyebrow="How we work"
        title="Four steps, no phone tag"
        intro="From the price you get online to the price you pay on the day — here's exactly how a Lucent job runs."
        align="center"
      />

      <Reveal>
      <ol className="mt-8 grid gap-7 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step.number}
            className="relative flex flex-col items-center text-center md:items-start md:text-left"
          >
            {/* Connector line (desktop) */}
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-12 top-6 hidden h-px w-[calc(100%-1.5rem)] bg-gradient-to-r from-emerald-300 to-transparent lg:block"
              />
            )}
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-700 font-display text-base font-semibold text-white shadow-soft sm:h-12 sm:w-12 sm:text-lg">
              {step.number}
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-foreground sm:mt-5 sm:text-lg">
              {step.title}
            </h3>
            <p className="mt-1.5 max-w-xs text-pretty text-sm text-muted-foreground sm:mt-2 sm:text-base">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
      </Reveal>

      {/* Checklist pills — the facts every one of those four steps rests on. */}
      <Reveal delay={0.1} className="mt-8 sm:mt-10">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {checklist.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-ink-700 shadow-soft sm:text-sm"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
