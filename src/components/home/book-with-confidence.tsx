import {
  ArrowRight,
  BadgeCheck,
  Leaf,
  Phone,
  SprayCan,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { calculateBasket } from "@/config/pricing";
import { confidence, confidencePills, type ConfidencePill } from "@/config/homepage";
import { formatAud } from "@/lib/utils";

const pillIcons: Record<ConfidencePill["icon"], LucideIcon> = {
  deodoriser: SprayCan,
  pricing: Tag,
  callout: BadgeCheck,
  eco: Leaf,
};

/**
 * Section two — sits inside its own rounded container card resting ON the
 * shared gradient wash.
 *
 * NO background-color on the <section>. The colour behind this card comes from
 * `<Atmosphere>` on the wrapper in `app/page.tsx`.
 *
 * Depth comes from deliberate layer breaks, not from shadows alone:
 *   z-0  card + rings  →  z-10 content  →  z-20 mock (breaks the card's right
 *   edge)  →  z-30 floating total (overlaps the mock, angled)
 *
 * The mocked figures come from the real `calculateBasket`, so this preview can
 * never drift from what the live tool would quote.
 */
export function BookWithConfidence() {
  const basket = calculateBasket([
    { serviceId: "carpet", quantity: 2 },
    { serviceId: "couch", quantity: 3 },
  ]);

  return (
    <section className="relative pb-section pt-8 lg:pt-12">
      <Container>
        {/*
          NOTE: this card must NOT be `overflow-hidden`. The browser mock is
          meant to break out past its right edge, and clipping the card clips
          the mock's price column with it. The rings get their own clipped
          layer below instead.
        */}
        <div className="relative z-0 rounded-3xl bg-white/70 px-5 py-8 shadow-[0_2px_8px_rgba(38,56,41,0.04),0_32px_64px_-32px_rgba(38,56,41,0.18)] ring-1 ring-inset ring-white/70 backdrop-blur-sm sm:rounded-4xl sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* Decorative arcs, clipped to the card's shape on their own layer. */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-4xl">
            <ConcentricRings />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
            {/* ── Left: copy + pills ─────────────────────────────────────── */}
            <div className="relative z-10 text-center lg:text-left">
              <Reveal>
                <span className="eyebrow justify-center lg:justify-start">
                  {confidence.eyebrow}
                </span>
                <h2 className="mt-4 text-fluid-h2 font-semibold text-foreground">
                  <span className="block">{confidence.headline.lineOne}</span>
                  <span className="block text-gradient">
                    {confidence.headline.lineTwo}
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-prose text-pretty text-muted-foreground lg:mx-0 lg:mt-5">
                  {confidence.body}
                </p>
              </Reveal>

              {/*
                Pills: centred cluster on mobile that flows 2-per-row where the
                labels fit, left-aligned from lg. The CTA drops out of the
                cluster and goes full-width on mobile — a small inline button
                is a poor tap target at 375px.
              */}
              {/*
                Two-up grid on mobile so the cluster reads as a deliberate
                block rather than a ragged stack. The labels are claims and
                stay verbatim — they wrap to two lines inside the chip instead
                of being truncated. Reverts to inline pills from sm.
              */}
              <RevealGroup className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-2.5 lg:justify-start">
                {confidencePills.map((pill) => {
                  const Icon = pillIcons[pill.icon];
                  return (
                    <RevealItem key={pill.id} className="h-full">
                      <span className="flex h-full items-center gap-2 rounded-2xl border border-border/80 bg-white/80 p-2 text-left text-[0.8125rem] font-medium leading-snug text-ink-800 shadow-soft sm:w-auto sm:rounded-full sm:py-2 sm:pl-2 sm:pr-3.5 sm:text-sm">
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 sm:h-6 sm:w-6">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        {pill.label}
                      </span>
                    </RevealItem>
                  );
                })}
              </RevealGroup>

              <Reveal delay={0.15}>
                <a
                  href="/pricing"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full border border-sage-300 bg-transparent px-5 text-sm font-semibold text-sage-800 transition-colors hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto sm:px-6"
                >
                  See pricing <ArrowRight className="h-4 w-4" />
                </a>
              </Reveal>
            </div>

            {/* ── Right: browser mock, breaking the card's right edge ─────── */}
            <Reveal delay={0.1} className="relative z-20 lg:-mr-20 xl:-mr-28">
              <div className="relative">
                <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-lifted">
                  {/* Chrome */}
                  <div className="flex items-center gap-3 border-b border-border bg-sage-50/80 px-4 py-3">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
                    </div>
                    <div className="mx-auto rounded-full bg-white px-4 py-1 text-[0.6875rem] text-muted-foreground">
                      lucentcleanco.com.au/pricing
                    </div>
                  </div>

                  {/* Basket body */}
                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Your quote
                    </p>

                    <ul className="mt-4 divide-y divide-border">
                      {basket.lines.map((line, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between gap-4 py-3"
                        >
                          <span className="text-sm text-ink-700">
                            {line.label}
                          </span>
                          <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                            {formatAud(line.amount)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-sage-50 px-4 py-3">
                      <span className="text-sm font-medium text-ink-700">
                        Total today
                      </span>
                      <span className="font-display text-lg font-semibold tabular-nums text-foreground">
                        {formatAud(basket.subtotal)}
                      </span>
                    </div>

                    {/*
                      Reserves room for the overlapping card — only needed from
                      sm up, where that card is absolutely positioned.
                    */}
                    <div className="h-0 sm:h-16" aria-hidden="true" />
                  </div>
                </div>

                {/*
                  Running total. From sm up it floats over the mock at an angle
                  — that overlap is what creates the depth.

                  On mobile the overlap is collapsed deliberately: a rotated
                  card tucked under another card reads as a rendering fault at
                  375px, and the offsets risk horizontal scroll. It becomes a
                  clean, square stacked pair instead.
                */}
                <div className="relative z-30 mt-4 rounded-3xl bg-sage-900 p-5 text-mint-100 shadow-[0_8px_16px_rgba(38,56,41,0.12),0_28px_56px_-20px_rgba(38,56,41,0.45)] ring-1 ring-inset ring-white/10 sm:absolute sm:-bottom-10 sm:-left-10 sm:mt-0 sm:w-64 sm:-rotate-[3.5deg] lg:-left-16">
                  <p className="text-xs text-mint-200/70">Running total</p>
                  <p className="mt-1 font-display text-3xl font-semibold tabular-nums text-white">
                    {formatAud(basket.subtotal)}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-mint-200/80">
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    Confirmed before we start
                  </p>
                  <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-mint-200/70">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    Or call and we&apos;ll quote it
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Faint concentric arcs radiating behind the left-hand text. */
function ConcentricRings() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className="pointer-events-none absolute -left-40 top-1/2 z-0 h-[42rem] w-[42rem] -translate-y-1/2 text-emerald-300/40"
    >
      {[110, 170, 230, 290].map((r) => (
        <circle
          key={r}
          cx="300"
          cy="300"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
