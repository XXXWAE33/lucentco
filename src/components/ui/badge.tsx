import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "sage" | "mint";

const tones: Record<Tone, string> = {
  neutral: "bg-ink-100 text-ink-700",
  accent: "bg-accent/12 text-emerald-800",
  sage: "bg-sage-100 text-sage-800",
  mint: "bg-mint-100 text-mint-800",
};

export function Badge({
  tone = "neutral",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
