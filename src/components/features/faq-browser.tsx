"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs, faqCategories, type FaqCategory } from "@/config/faq";
import { FaqAccordion } from "./faq-accordion";

type Filter = FaqCategory | "All";

/**
 * Searchable, filterable FAQ.
 *
 * Search matches question AND answer text, because people search for the term
 * in the answer ("pets", "insured") as often as the phrasing of the question.
 *
 * The result count is announced via `aria-live="polite"` — without it, a
 * screen-reader user filtering the list gets no feedback that anything changed.
 */
export function FaqBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((item) => {
      const matchesCategory = filter === "All" || item.category === filter;
      const matchesQuery =
        q === "" ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, filter]);

  const filters: Filter[] = ["All", ...faqCategories];

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
        />
        <label htmlFor="faq-search" className="sr-only">
          Search frequently asked questions
        </label>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions…"
          /* text-base prevents iOS zooming the page on focus. */
          className="h-12 w-full rounded-input border border-border bg-background pl-11 pr-11 text-base text-foreground placeholder:text-ink-400 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-sage-50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filters — horizontally scrollable on mobile so seven chips
          don't wrap into a three-line block at 375px. */}
      <div
        role="group"
        aria-label="Filter by category"
        className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={cn(
                "inline-flex h-11 shrink-0 items-center rounded-btn border px-4 text-sm font-medium transition-colors",
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-ink-600 hover:border-sage-300 hover:bg-sage-50",
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-5 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "question" : "questions"}
        {filter !== "All" && ` in ${filter}`}
        {query && ` matching “${query}”`}
      </p>

      <FaqAccordion items={results} className="mt-4" />
    </div>
  );
}
