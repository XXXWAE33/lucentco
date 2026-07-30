import { MapPin, ArrowRight } from "lucide-react";
import { Section, SectionHeading, Button, Badge } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { serviceSuburbs } from "@/lib/site";

/** How many suburbs orbit the hub before the graphic gets cluttered. */
const ORBIT_COUNT = 6;
const orbitSuburbs = serviceSuburbs.slice(0, ORBIT_COUNT);

/** Deterministic point on a circle — pure math, safe to compute at render time. */
function orbitPoint(index: number, total: number, radiusPct: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    left: `${50 + radiusPct * Math.cos(angle)}%`,
    top: `${50 + radiusPct * Math.sin(angle)}%`,
  };
}

export function ServiceArea() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* Centred on mobile like every other section; left from lg. */}
        <div className="text-center lg:text-left">
          <SectionHeading
            eyebrow="Where we clean"
            title="Local crews, right across Brisbane"
            intro="We focus on the inner-city and riverside suburbs so our cleaners spend less time driving and more time perfecting your home. Not listed? We're likely nearby — just ask."
            className="items-center text-center lg:items-start lg:text-left"
          />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-8 lg:justify-start">
            <Button href="/contact" variant="primary">
              Check your suburb <ArrowRight className="h-4 w-4" />
            </Button>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Cleaners available this week
            </span>
          </div>
        </div>

        <div>
          {/*
            Orbit graphic — a representative sample of suburbs (not all 18;
            past ~6 nodes the circle stops reading as a diagram and starts
            reading as clutter). The full list stays below, unabridged.
          */}
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-xs">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full text-sage-300/60"
              >
                <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
                {orbitSuburbs.map((_, i) => {
                  const p = orbitPoint(i, orbitSuburbs.length, 34);
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={parseFloat(p.left)}
                      y2={parseFloat(p.top)}
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  );
                })}
              </svg>

              {/* Hub */}
              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-sage-900 text-center shadow-lifted sm:h-20 sm:w-20">
                <MapPin className="h-4 w-4 text-emerald-400 sm:h-5 sm:w-5" />
                <span className="mt-0.5 text-[0.5625rem] font-semibold text-white sm:text-xs">
                  Brisbane
                </span>
              </div>

              {/* Orbiting suburb nodes */}
              {orbitSuburbs.map((suburb, i) => {
                const p = orbitPoint(i, orbitSuburbs.length, 34);
                return (
                  <span
                    key={suburb}
                    style={{ left: p.left, top: p.top }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-card px-2.5 py-1 text-[0.6875rem] font-medium text-ink-700 shadow-soft sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    {suburb}
                  </span>
                );
              })}
            </div>
          </Reveal>

          {/* Full list — every suburb, unabridged. */}
          <div className="mt-6 rounded-3xl border border-border bg-mint-50/70 p-5 shadow-soft sm:rounded-4xl sm:p-8">
            <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-sage-800 sm:mb-5 lg:justify-start">
              <MapPin className="h-4 w-4 text-emerald-600" />
              {serviceSuburbs.length} suburbs &amp; growing
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 lg:justify-start">
              {serviceSuburbs.map((suburb) => (
                <Badge key={suburb} tone="sage" className="text-xs sm:text-sm">
                  {suburb}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
