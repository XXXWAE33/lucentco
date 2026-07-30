"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/config/faq";

/**
 * FAQ accordion.
 *
 * Built on a real `<button>` per row with `aria-expanded` / `aria-controls`, so
 * screen readers announce state and keyboard users get Enter/Space for free.
 *
 * The open/close animation uses a `grid-template-rows: 0fr → 1fr` transition
 * rather than max-height. Max-height needs a magic number that clips long
 * answers; this animates to true auto height with no JS measurement.
 *
 * Multiple rows may be open at once — this is reference material, and
 * force-closing the answer someone is mid-way through reading to open another
 * is hostile.
 */
export function FaqAccordion({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  if (items.length === 0) {
    return (
      <p className={cn("py-10 text-center text-muted-foreground", className)}>
        No questions match that search. Try a different word, or{" "}
        <a
          href="/contact"
          className="font-medium text-emerald-700 underline-offset-4 hover:underline"
        >
          ask us directly
        </a>
        .
      </p>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-card border bg-card transition-colors duration-200",
              isOpen ? "border-emerald-200" : "border-border hover:border-sage-300",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-[3.5rem] w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground transition-colors hover:bg-sage-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <span className="text-[0.9375rem] sm:text-base">{item.q}</span>
                <Plus
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-emerald-600 transition-transform duration-300 ease-out-soft",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out-soft",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
