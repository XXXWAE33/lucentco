import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Responsive image wrapper.
 *
 * ─── WHY THIS EXISTS ────────────────────────────────────────────────────────
 * `next/image` already generates srcset and serves AVIF/WebP automatically, so
 * this does NOT hand-roll a `<picture>` element — doing that would actively
 * defeat the built-in optimiser. What it adds is the stuff that's easy to get
 * wrong per-call-site:
 *
 *   • an aspect-ratio box, so layout space is reserved before the file loads
 *     (this is the difference between CLS 0 and CLS 0.2)
 *   • a required `alt`, typed so it cannot be omitted
 *   • a blur placeholder by default
 *   • an `available: false` path that renders a designed placeholder instead
 *     of a broken image, so unshot photography never 404s
 *
 * ─── NO IMAGE FILES ARE CREATED BY THIS COMPONENT ───────────────────────────
 * Photography must be added manually to /public. See the IMAGE MANIFEST in
 * `src/config/homepage.ts` and `src/config/services-content.ts` for the exact
 * paths and dimensions each slot expects.
 */
export type OptimizedImageProps = {
  src: string;
  /** Required. Describe the content; use "" only for purely decorative art. */
  alt: string;
  /**
   * Flip to true once the real file exists in /public. While false a designed
   * placeholder renders in its place and nothing requests a missing asset.
   */
  available?: boolean;
  /** Tailwind aspect class. Reserves layout space — keep it explicit. */
  aspect?: string;
  /**
   * Viewport-relative rendered width. Getting this wrong is the single most
   * common cause of over-fetching: without it the browser assumes 100vw and
   * downloads a desktop-width file onto a phone.
   */
  sizes?: string;
  /** Set only on the LCP image — usually one per page, above the fold. */
  priority?: boolean;
  blurDataURL?: string;
  className?: string;
  imageClassName?: string;
  /** Optional mark shown inside the placeholder, e.g. a service icon. */
  placeholderIcon?: React.ReactNode;
};

export function OptimizedImage({
  src,
  alt,
  available = false,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  blurDataURL,
  className,
  imageClassName,
  placeholderIcon,
}: OptimizedImageProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-card bg-sage-100", className)}>
      <div className={cn("relative w-full", aspect)}>
        {available ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            /* Below-fold images stay lazy; the LCP image opts out via priority. */
            loading={priority ? undefined : "lazy"}
            {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
            className={cn("object-cover", imageClassName)}
          />
        ) : (
          <div
            role="img"
            aria-label={alt ? `Placeholder image — ${alt}` : undefined}
            aria-hidden={alt ? undefined : true}
            className="img-placeholder flex h-full w-full items-center justify-center"
          >
            {placeholderIcon && (
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 text-sage-600 shadow-soft">
                {placeholderIcon}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
