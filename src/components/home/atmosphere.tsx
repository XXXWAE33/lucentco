import { cn } from "@/lib/utils";

/**
 * The single continuous colour wash behind the hero AND section two.
 *
 * ─── WHY THIS LIVES ON A SHARED PARENT ───────────────────────────────────────
 * Painting a gradient inside a section-sized box guarantees a seam, because the
 * seam *is* the box edge. This element is positioned against a wrapper that
 * spans both sections, so its coordinate space crosses the section boundary and
 * nothing paints at that boundary at all.
 *
 * Rules for anything rendered inside `<Atmosphere>`'s wrapper:
 *   • No section in the range may set its own background-color.
 *   • All three layers are radial/elliptical. A linear gradient reintroduces
 *     the banding this component exists to remove.
 *   • Every ellipse reaches full transparency *inside* the wrapper, so the wash
 *     self-terminates and the wrapper's own edges can never show.
 *
 * Percentages are relative to the wrapper, so the bloom automatically peaks
 * around the stat strip (~50% down) regardless of content height.
 */
export function Atmosphere({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      {/*
        Colour is calibrated per breakpoint, not scaled.

        The bloom is positioned as a percentage of the wrapper, and the wrapper
        is a very different shape on each: on desktop the stat strip sits near
        50% of its height, but on mobile the hero is far shorter relative to
        section two, putting the stats at roughly 19%. Reusing the desktop
        stops on mobile peaks the colour well below the stats, down inside
        section two. Hence two explicit variants.
      */}

      {/* Mobile — bloom peaks high, on the stat strip. */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: [
            // Core bloom — centred on the stats at ~20% of the wrapper.
            "radial-gradient(150% 26% at 50% 20%, hsl(161 60% 72% / 0.55) 0%, hsl(161 60% 72% / 0.30) 40%, transparent 74%)",
            // Gentle carry so section two still rests on colour rather than
            // dropping to flat white.
            "radial-gradient(170% 30% at 50% 44%, hsl(161 50% 76% / 0.24) 0%, transparent 78%)",
          ].join(", "),
        }}
      />

      {/* Desktop — three ellipses, layered front-to-back in source order. */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: [
            // Light source — sits behind the hero object so the glow reads as
            // emanating from it rather than being painted over it.
            "radial-gradient(68% 48% at 80% 26%, hsl(161 66% 76% / 0.42) 0%, hsl(161 66% 76% / 0.20) 42%, transparent 72%)",
            // Left lift — keeps the composition from feeling one-sided.
            "radial-gradient(58% 38% at 12% 40%, hsl(163 52% 80% / 0.30) 0%, transparent 70%)",
            // Core bloom — peak saturation lands on the stat strip, then
            // dissolves upward and downward.
            "radial-gradient(120% 42% at 50% 50%, hsl(161 60% 72% / 0.55) 0%, hsl(161 60% 72% / 0.30) 38%, transparent 72%)",
          ].join(", "),
        }}
      />

      {/*
        Dither. A gradient this wide posterizes into visible steps on 8-bit
        panels — common on mid-range Android. The noise texture breaks up the
        ramp. Kept very low so it never reads as texture.
      */}
      <div className="absolute inset-0 bg-grain opacity-[0.025] mix-blend-multiply" />
    </div>
  );
}

/**
 * Soft radial glow placed directly behind the hero visual, colour-matched to
 * the wash so the object sits *in* the gradient rather than on top of it.
 */
export function HeroGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10", className)}
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, hsl(161 72% 78% / 0.55) 0%, hsl(161 62% 74% / 0.28) 45%, transparent 72%)",
      }}
    />
  );
}
