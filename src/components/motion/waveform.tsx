"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Decorative animated equalizer bars — evokes a spoken testimonial. */
export function Waveform({
  bars = 28,
  className,
}: {
  bars?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Fixed-precision pattern so SSR and client render byte-identical (no float
  // drift → no hydration mismatch).
  const PATTERN = [
    0.4, 0.7, 0.5, 0.9, 0.6, 0.35, 0.8, 0.55, 1, 0.45, 0.65, 0.3, 0.85, 0.5,
    0.75, 0.4, 0.95, 0.6, 0.35, 0.7, 0.5, 0.8,
  ];
  const heights = Array.from(
    { length: bars },
    (_, i) => PATTERN[i % PATTERN.length],
  );

  return (
    <div
      aria-hidden="true"
      className={cn("flex h-8 items-center gap-[3px]", className)}
    >
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-emerald-400/70"
          style={{ height: `${h * 100}%` }}
          initial={false}
          animate={
            reduce
              ? { scaleY: h }
              : { scaleY: [h, h * 0.45 + 0.2, h] }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 1.1 + (i % 5) * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 7) * 0.06,
                }
          }
        />
      ))}
    </div>
  );
}
