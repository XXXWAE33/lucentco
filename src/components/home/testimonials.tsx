import { Star } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { TestimonialMarquee } from "@/components/features";
import { VeloraRing } from "@/components/layout/velora-wordmark";
import { cn } from "@/lib/utils";
import { ratingBadges } from "@/config/homepage";

const IS_DEV = process.env.NODE_ENV !== "production";

/**
 * Reviews: heading + rating summary, then the full-bleed marquee.
 *
 * The rating card reads the SAME `ratingBadges` source as the header trust
 * bar, with the same dev-only preview fallback — so it can never disagree
 * with the figure shown at the top of the page, and shows nothing in
 * production until the real rating is confirmed.
 */
export function Testimonials() {
  const badge = ratingBadges[0];
  const rating = badge ? (badge.rating ?? (IS_DEV ? badge.devPreviewRating : null)) : null;
  const count = badge ? (badge.reviewCount ?? (IS_DEV ? badge.devPreviewCount : null)) : null;

  return (
    <section className="section-y overflow-hidden bg-sage-50/60">
      <Container>
        <div className="mx-auto grid max-w-6xl items-end gap-6 lg:grid-cols-[1fr_auto] lg:gap-12">
          <SectionHeading
            eyebrow="Loved across Brisbane"
            title="The reviews do the talking"
            intro="Real words from real clients in the suburbs we serve every week."
            className="items-center text-center lg:items-start lg:text-left"
          />

          {rating !== null && (
            <div className="relative mx-auto flex w-full max-w-sm items-center gap-5 overflow-hidden rounded-3xl bg-sage-900 p-5 text-white shadow-lifted lg:mx-0 lg:w-auto">
              <VeloraRing
                strokeWidth={0.8}
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 text-gold-400/25"
              />
              <p className="font-display text-5xl font-semibold leading-none tabular-nums text-gold-300">
                {rating.toFixed(1)}
              </p>
              <div className="relative">
                <div
                  className="flex gap-0.5"
                  role="img"
                  aria-label={`${rating.toFixed(1)} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className={cn(
                        "h-4 w-4",
                        i < Math.round(rating)
                          ? "fill-gold-400 text-gold-400"
                          : "fill-white/15 text-white/15",
                      )}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-sm font-semibold">
                  {count !== null ? `${count} ${badge.platform}` : badge.platform}
                </p>
                <p className="text-xs text-mint-200/70">Average rating</p>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Full-bleed marquee — runs edge to edge, outside the container. */}
      <div className="mt-8 sm:mt-12">
        <TestimonialMarquee />
      </div>
    </section>
  );
}
