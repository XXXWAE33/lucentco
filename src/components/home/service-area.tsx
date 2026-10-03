import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { serviceSuburbs } from "@/lib/site";
import { SuburbChecker } from "./suburb-checker";

/**
 * Service area — copy on the left, one card on the right: a stylised
 * riverside header (abstract, not a map — no suburb is placed geographically)
 * over a live suburb checker that also lists every suburb we cover.
 */
export function ServiceArea() {
  return (
    <Section>
      <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <SectionHeading
            eyebrow="Where we clean"
            title="Local crews, right across Brisbane"
            intro="We focus on the inner-city and riverside suburbs so our cleaners spend less time driving and more time perfecting your home."
            className="items-center text-center lg:items-start lg:text-left"
          />
          <div className="mt-6 hidden flex-wrap items-center gap-4 sm:mt-8 lg:flex">
            <Button href="/contact" variant="primary">
              Book a clean <ArrowRight className="h-4 w-4" />
            </Button>
            <Availability />
          </div>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card sm:rounded-4xl">
            <RiverHeader />
            <div className="p-4 sm:p-6">
              <SuburbChecker />
            </div>
          </div>
          <div className="mt-4 flex justify-center lg:hidden">
            <Availability />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Availability() {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      Cleaners available this week
    </span>
  );
}

/** Dark header: a winding river line with glowing stops, plus the headline stat. */
function RiverHeader() {
  const stops = [
    { x: 40, y: 92 },
    { x: 92, y: 58 },
    { x: 150, y: 74 },
    { x: 205, y: 44 },
    { x: 262, y: 66 },
    { x: 318, y: 38 },
    { x: 372, y: 60 },
  ];
  return (
    <div className="relative overflow-hidden bg-sage-900 px-5 pb-4 pt-5 text-white sm:px-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-emerald-500/25 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-gold-400/20 blur-3xl"
      />

      <div className="relative flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-semibold leading-none tabular-nums text-gold-300">
            {serviceSuburbs.length}
          </p>
          <p className="mt-1 text-xs text-mint-200/80">suburbs covered &amp; growing</p>
        </div>
        <p className="text-right text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-300">
          Inner-city
          <br />
          &amp; riverside
        </p>
      </div>

      <svg viewBox="0 0 420 120" aria-hidden="true" className="relative mt-2 h-auto w-full">
        <path
          d="M -10 100 C 40 100, 60 50, 100 58 S 150 88, 190 60 S 240 30, 270 62 S 330 50, 350 40 S 400 50, 430 66"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          className="text-emerald-500/15"
        />
        <path
          d="M -10 100 C 40 100, 60 50, 100 58 S 150 88, 190 60 S 240 30, 270 62 S 330 50, 350 40 S 400 50, 430 66"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="1 7"
          strokeLinecap="round"
          className="text-mint-200/60"
        />
        {stops.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="9" className="fill-emerald-400/15" />
            <circle cx={s.x} cy={s.y} r="3.5" className="fill-emerald-400" />
          </g>
        ))}
      </svg>
    </div>
  );
}
