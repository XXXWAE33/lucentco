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
  headingLevel = 3,
}: {
  items: FaqItem[];
  className?: string;
  /**
   * Heading level for each question. Must continue the page's outline without
   * skipping a level: use 2 where the accordion sits directly under the page
   * <h1> (e.g. /faq), 3 where a section <h2> precedes it (e.g. /pricing).
   * Skipping a level fails axe's heading-order rule.
   */
  headingLevel?: 2 | 3;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<string>>(new Set());
  const Heading = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3";

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
          className="font-medium text-gold-600 underline-offset-4 hover:underline"
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
              "overflow-hidden rounded-2xl border bg-card transition-all duration-200",
              isOpen ? "border-gold-300 shadow-soft" : "border-border hover:border-gold-200",
            )}
          >
            <Heading>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-[3.5rem] w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground transition-colors hover:bg-sage-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <span className="text-[0.9375rem] sm:text-base">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                    isOpen ? "bg-sage-800 text-gold-300" : "bg-gold-50 text-gold-600 ring-1 ring-inset ring-gold-200",
                  )}
                >
                  <Plus
                    className={cn(
                      "h-4 w-4 transition-transform duration-300 ease-out-soft",
                      isOpen && "rotate-45",
                    )}
                  />
                </span>
              </button>
            </Heading>

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
