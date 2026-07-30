import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type TestimonialCardProps = {
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  author: string;
  suburb?: string;
  service?: string;
  /**
   * Author photo. Left undefined until real headshots are supplied — an
   * initial-letter avatar renders instead, which looks deliberate.
   * See the image manifest for dimensions (100×100 minimum).
   */
  photoSrc?: string;
  className?: string;
};

/**
 * Customer testimonial.
 *
 * Renders all five stars always, filling only `rating` of them — a row of five
 * with two greyed reads as an honest 3/5, whereas rendering three stars reads
 * as an unrated card. The numeric value is exposed to assistive tech via
 * `aria-label` so the rating never depends on colour alone.
 *
 * NOTE: no photo files are created here. Drop headshots into /public and pass
 * `photoSrc`; until then the avatar fallback is the intended appearance.
 */
export function TestimonialCard({
  rating,
  quote,
  author,
  suburb,
  service,
  photoSrc,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-card border border-border bg-card p-5 shadow-elevation-1 transition-shadow duration-300 hover:shadow-elevation-2 sm:p-6",
        className,
      )}
    >
      <div
        className="flex gap-0.5"
        role="img"
        aria-label={`${rating} out of 5 stars`}
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

      <blockquote className="mt-3 flex-1 text-pretty text-sm italic leading-relaxed text-ink-700">
        {quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        {photoSrc ? (
          /* Fixed 40px square, so width/height are explicit rather than `fill`
             — no wrapper needed and no layout shift when it loads. */
          <Image
            src={photoSrc}
            alt={`${author}, ${suburb ?? "customer"}`}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 font-display text-sm font-semibold text-sage-700"
          >
            {author.trim().charAt(0).toUpperCase() || "•"}
          </span>
        )}

        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-foreground">
            {author}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {[suburb, service].filter(Boolean).join(" · ")}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
