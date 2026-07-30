"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Large-target −/+ control. Sized for thumbs first (48px hit areas) so prices
 * stay adjustable on a phone without zooming.
 */
export function QuantityStepper({
  value,
  min,
  max,
  onChange,
  label,
  tone = "light",
}: {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  /** Accessible name, e.g. "rooms" or "Queen mattresses". */
  label: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const btn = cn(
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all active:scale-95",
    "disabled:pointer-events-none disabled:opacity-30",
    dark
      ? "bg-white/10 text-white hover:bg-white/20"
      : "bg-sage-100 text-sage-800 hover:bg-sage-200",
  );

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-1",
        dark ? "bg-white/5" : "bg-sage-50",
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Remove one — ${label}`}
        className={btn}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "min-w-[2.5rem] text-center font-display text-lg font-semibold tabular-nums",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Add one — ${label}`}
        className={btn}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
