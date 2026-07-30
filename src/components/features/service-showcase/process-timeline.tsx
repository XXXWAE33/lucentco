import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/config/services-content";

/**
 * The "how we do it" sequence: numbered nodes joined by a dashed connector, so
 * it reads as one continuous process rather than a list of unrelated bullets.
 */
export function ProcessTimeline({
  steps,
  tone = "light",
  className,
}: {
  steps: ProcessStep[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <ol className={cn("relative", className)}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step.title} className={cn("relative flex gap-4", !last && "pb-5")}>
            {/* Connector — runs from under this node to the next one. */}
            {!last && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-[0.9375rem] top-8 bottom-0 w-px border-l border-dashed",
                  dark ? "border-white/25" : "border-sage-300",
                )}
              />
            )}

            {/* Numbered node */}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums",
                dark
                  ? "bg-emerald-400 text-sage-900"
                  : "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200",
              )}
            >
              {i + 1}
            </span>

            <div className="min-w-0 pt-1">
              <p
                className={cn(
                  "font-display text-sm font-semibold",
                  dark ? "text-white" : "text-foreground",
                )}
              >
                {step.title}
              </p>
              <p
                className={cn(
                  "mt-1 text-pretty text-sm leading-relaxed",
                  dark ? "text-mint-200/80" : "text-muted-foreground",
                )}
              >
                {step.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
