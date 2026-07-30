"use client";

import { useEffect } from "react";
import { CalendarClock, MapPin, Sparkles, Star, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/motion";
import { cn } from "@/lib/utils";
import {
  trustStats,
  ratingBadges,
  trustHasPlaceholders,
  type TrustStat,
  type RatingBadge,
} from "@/config/homepage";

const icons: Record<TrustStat["icon"], LucideIcon> = {
  jobs: Sparkles,
  years: CalendarClock,
  suburbs: MapPin,
  rating: Star,
};

const IS_DEV = process.env.NODE_ENV !== "production";

/**
 * Development-only report of outstanding figures. Renders nothing — the page
 * must never carry scaffolding.
 */
function usePlaceholderWarning() {
  useEffect(() => {
    if (!IS_DEV || !trustHasPlaceholders) return;
    const missing = [
      ...trustStats.filter((s) => s.value === null).map((s) => s.label),
      ...ratingBadges.filter((b) => b.rating === null).map((b) => b.platform),
    ];
    console.warn(
      `[Lucent] Trust figures outstanding — showing dev sample values.\n` +
        `  Missing: ${missing.join(", ")}\n` +
        `  Set the real numbers in src/config/homepage.ts (production renders "—").`,
    );
  }, []);
}

/**
 * The three stat blocks.
 *
 * MOBILE: one tight row of three — centred, icons dropped, number shrunk and
 * label tiny, so three fit across 375px without wrapping or going ragged.
 * DESKTOP: icon sits inline beside the number, left-aligned.
 *
 * Split out from `RatingCluster` so the hero can place the two independently:
 * on mobile the stats sit above the CTAs (proof before action) while the rating
 * sits below them.
 */
export function TrustStats({ className }: { className?: string }) {
  usePlaceholderWarning();

  return (
    <dl className={cn("grid grid-cols-3 gap-x-2 sm:gap-x-6 lg:gap-x-12", className)}>
      {trustStats.map((stat) => (
        <StatBlock key={stat.id} stat={stat} />
      ))}
    </dl>
  );
}

/** Review rating badges. Centred on mobile, right-aligned from lg. */
export function RatingCluster({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-6 lg:justify-end",
        className,
      )}
    >
      {ratingBadges.map((badge) => (
        <RatingBadgeBlock key={badge.id} badge={badge} />
      ))}
    </div>
  );
}

/**
 * Desktop composition — stats left, rating right on one baseline.
 * Floats directly on the gradient: no divider, no card, no background.
 */
export function TrustStrip() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <TrustStats />
      <RatingCluster />
    </div>
  );
}

function StatBlock({ stat }: { stat: TrustStat }) {
  const Icon = icons[stat.icon];
  const shown = stat.value ?? (IS_DEV ? stat.devPreviewValue : null);

  return (
    <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:gap-2.5 lg:text-left">
      {/* Icon costs horizontal room three-across at 375px — desktop only. */}
      <Icon
        className="hidden h-5 w-5 shrink-0 text-emerald-600/80 lg:block"
        aria-hidden="true"
        strokeWidth={1.75}
      />
      <div className="min-w-0">
        <dd className="font-display text-lg font-semibold leading-none text-foreground sm:text-xl lg:text-2xl">
          {shown === null ? (
            <span aria-label="Figure to be confirmed" className="text-ink-300">
              —
            </span>
          ) : (
            <CountUp
              value={shown}
              decimals={stat.decimals ?? 0}
              prefix={stat.prefix ?? ""}
              suffix={stat.suffix ?? ""}
            />
          )}
        </dd>
        <dt className="mt-1 text-[0.6875rem] leading-tight text-muted-foreground sm:text-xs lg:text-sm">
          {stat.label}
        </dt>
      </div>
    </div>
  );
}

function RatingBadgeBlock({ badge }: { badge: RatingBadge }) {
  const rating = badge.rating ?? (IS_DEV ? badge.devPreviewRating : null);
  const count = badge.reviewCount ?? (IS_DEV ? badge.devPreviewCount : null);

  return (
    <div className="text-center lg:text-left">
      <p className="font-display text-base font-semibold leading-none text-foreground lg:text-lg">
        Excellent
      </p>
      <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 lg:justify-start">
        <span className="text-xs text-muted-foreground">
          {rating === null ? "—" : rating.toFixed(1)} rated
        </span>
        <span
          className="flex"
          role="img"
          aria-label={
            rating === null
              ? "Rating to be confirmed"
              : `${rating.toFixed(1)} out of 5`
          }
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5",
                rating !== null && i < Math.round(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-ink-200 text-ink-200",
              )}
            />
          ))}
        </span>
        <span className="text-xs text-muted-foreground">
          {badge.platform}
          {count !== null && ` · ${count}`}
        </span>
      </div>
    </div>
  );
}
