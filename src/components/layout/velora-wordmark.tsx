import { cn } from "@/lib/utils";

/** Brand gold, sampled from the official logo. `deep` is for light backgrounds. */
export const VELORA_GOLD = "#C6A76B";
export const VELORA_GOLD_DEEP = "#A8864A";

/**
 * Official Velora wordmark, redrawn as line-art SVG from the supplied logo:
 * geometric V-E-L-O, with the R and A sharing one continuous stroke.
 *
 * Inherits colour from `currentColor`, so callers set it with a text class
 * (default: brand gold). `tagline` adds the spaced "BRISBANE CLEANING" line.
 */
export function VeloraWordmark({
  className,
  tagline = false,
  strokeWidth = 7,
  title = "Velora Brisbane Cleaning",
}: {
  className?: string;
  tagline?: boolean;
  strokeWidth?: number;
  /** Pass `null` when the wordmark is purely decorative. */
  title?: string | null;
}) {
  const decorative = title === null;
  return (
    <svg
      viewBox={tagline ? "340 780 1250 380" : "340 780 1250 255"}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      className={cn("h-auto", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
    >
      {!decorative && <title>{title}</title>}
      {/* V */}
      <path d="M354 798 L442 1016 L531 798" />
      {/* E */}
      <path d="M710 798 H576 V1021 H710 M576 910 H688" />
      {/* L */}
      <path d="M754 798 V1021 H877" />
      {/* O */}
      <circle cx="1040" cy="910" r="111" />
      {/* R + A, one stroke */}
      <path d="M1211 1021 V798 H1345 L1245 910 L1356 1021 L1467 798 L1579 1021" />
      {tagline && (
        <text
          x="966"
          y="1142"
          textAnchor="middle"
          stroke="none"
          fill="currentColor"
          fontSize="34"
          letterSpacing="22"
          fontWeight="400"
          className="font-sans"
        >
          BRISBANE CLEANING
        </text>
      )}
    </svg>
  );
}

/** The "O" ring on its own — a decorative brand motif. */
export function VeloraRing({ className, strokeWidth = 1 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}
