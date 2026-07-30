import { Star } from "lucide-react";
import { announcements } from "@/config/announcements";
import { ratingBadges } from "@/config/homepage";
import { serviceSuburbs } from "@/lib/site";

/**
 * Thin strip pinned above the header.
 *
 * Two layouts, one component:
 *  • ≥sm — a static trust bar: "4.9★ 127 Google Reviews | Serving 18+ suburbs",
 *    per the brief. Static because a moving rating is hard to read and a rating
 *    is the one thing a visitor may want to sit and verify.
 *  • <sm — the rating alone would crowd out everything else at 375px, so the
 *    strip falls back to the scrolling fact marquee, which fits.
 *
 * The marquee reuses the site's existing `.marquee` CSS, inheriting its seamless
 * loop, hover-pause and reduced-motion collapse — no second animation system.
 *
 * Server component: no client JS ships for it.
 */
export function AnnouncementBar() {
  const google = ratingBadges.find((b) => b.id === "google");
  const hasRating = google?.rating != null && google.reviewCount != null;

  return (
    <div className="bg-sage-900 text-mint-100">
      {/* ── Trust bar (sm and up) ─────────────────────────────────────────── */}
      {hasRating && (
        <div className="hidden sm:block">
          <div className="mx-auto flex max-w-content items-center justify-center gap-3 px-6 py-2 text-xs lg:px-8">
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-white">
                {google!.rating!.toFixed(1)}
              </span>
              <span
                className="flex"
                role="img"
                aria-label={`${google!.rating!.toFixed(1)} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className="h-3 w-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
              <span className="text-mint-200/80">
                {google!.reviewCount} {google!.platform}
              </span>
            </span>

            <span aria-hidden="true" className="text-mint-200/30">
              |
            </span>

            <span className="text-mint-200/80">
              Serving {serviceSuburbs.length}+ Brisbane suburbs
            </span>
          </div>
        </div>
      )}

      {/* ── Fact marquee (below sm, or whenever no rating is published) ───── */}
      <div className={hasRating ? "marquee sm:hidden" : "marquee"}>
        <div className="marquee__track animate-marquee [--marquee-duration:44s]">
          {[false, true].map((isDuplicate) => (
            <ul
              key={String(isDuplicate)}
              className="marquee__set items-center"
              aria-hidden={isDuplicate || undefined}
            >
              {announcements.map((line) => (
                <li
                  key={line}
                  className="flex items-center gap-3 whitespace-nowrap py-2 text-[0.6875rem] font-medium tracking-wide sm:text-xs"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 rounded-full bg-emerald-400"
                  />
                  {line}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
