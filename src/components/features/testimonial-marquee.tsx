import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  testimonialRows,
  allPlaceholders,
  type Testimonial,
} from "@/config/testimonials";
import { DevWarning } from "./dev-warning";

/**
 * Infinite testimonial marquee.
 *
 * Implementation notes:
 *  • Pure CSS keyframes translating the track by -50% over two identical sets,
 *    so the loop is seamless with no visible reset. No JS scroll listeners —
 *    the animation lives on the compositor and holds up on mid-range Android.
 *  • Pauses on hover and on keyboard focus (see `.marquee` in globals.css).
 *  • `prefers-reduced-motion` collapses it to a static wrapped grid via CSS
 *    only, so it is correct on first paint with no hydration flash.
 *  • Rows are fixed-width cards inside a fixed-height row, so nothing here
 *    contributes to CLS.
 *
 * This is a server component — no client JS ships for it at all.
 */
export function TestimonialMarquee() {
  const [rowA, rowB] = testimonialRows;

  return (
    <div className="space-y-4">
      {/*
        One row on mobile, two on tablet up. A second opposing row at 375px is
        visual noise on a small screen, and doubles the offscreen paint cost on
        exactly the devices least able to afford it.
      */}
      <MarqueeRow items={rowA} direction="forward" />
      {rowB.length > 0 && (
        <div className="hidden md:block">
          <MarqueeRow items={rowB} direction="reverse" slower />
        </div>
      )}

      {/*
        Renders NOTHING into the DOM — the page must never carry scaffolding.
        The safeguards against shipping invented social proof are the
        `placeholder: true` flags in the data file plus the fact that the
        placeholder copy plainly reads as unfinished.
      */}
      {allPlaceholders && (
        <DevWarning
          message={
            "[Lucent] Testimonials are placeholders — replace them in " +
            "src/config/testimonials.ts and set placeholder: false before launch."
          }
        />
      )}
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  slower = false,
}: {
  items: Testimonial[];
  direction: "forward" | "reverse";
  /** Offsets the second row so the two never march in lockstep. */
  slower?: boolean;
}) {
  return (
    <div className="marquee">
      <div
        className={cn(
          // No gap here — the trailing gap lives inside `.marquee__set` so each
          // set is exactly 50% of the track and the loop stays seamless.
          "marquee__track",
          // Slower on mobile: less distracting, and gives a reader time to
          // finish a card on a narrow screen.
          slower
            ? "[--marquee-duration:104s] md:[--marquee-duration:82s]"
            : "[--marquee-duration:88s] md:[--marquee-duration:68s]",
          direction === "forward" ? "animate-marquee" : "animate-marquee-reverse",
        )}
      >
        {/* Set 1 — the real, readable content. */}
        <ul className="marquee__set">
          {items.map((t) => (
            <li key={t.id}>
              <TestimonialCard testimonial={t} />
            </li>
          ))}
        </ul>

        {/* Set 2 — visual duplicate that makes the loop seamless. Hidden from
            assistive tech, and dropped entirely under reduced motion. */}
        <ul className="marquee__set" aria-hidden="true">
          {items.map((t) => (
            <li key={`${t.id}-dup`}>
              <TestimonialCard testimonial={t} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { rating, quote, name, suburb } = testimonial;

  return (
    <figure
      className={cn(
        "flex h-full w-[17rem] flex-col justify-between rounded-3xl border border-border bg-card p-5 shadow-soft sm:w-[21rem] sm:p-6",
        // Fixed min-height keeps rows aligned and CLS at zero.
        "min-h-[13rem]",
      )}
    >
      <div>
        <div
          className="flex gap-0.5"
          aria-label={`${rating} out of 5 stars`}
          role="img"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={cn(
                "h-4 w-4",
                i < rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-ink-200 text-ink-200",
              )}
            />
          ))}
        </div>

        <blockquote className="mt-3 text-pretty text-sm leading-relaxed text-ink-700">
          {quote}
        </blockquote>
      </div>

      <figcaption className="mt-5 border-t border-border pt-4">
        <div className="truncate text-sm font-semibold text-foreground">
          {name}
        </div>
        <div className="truncate text-xs text-muted-foreground">{suburb}</div>
      </figcaption>
    </figure>
  );
}
