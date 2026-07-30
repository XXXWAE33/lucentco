"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Layers, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingSelector } from "./service-pricing";
import { BuildYourClean } from "./build-your-clean";

const EASE = [0.22, 1, 0.36, 1] as const;

type Mode = "single" | "multiple";

const MODES: {
  id: Mode;
  /** Legacy anchor this mode owns, so old links still select the right tool. */
  hash: string;
  icon: typeof Layers;
  title: string;
  desc: string;
}[] = [
  {
    id: "single",
    hash: "instant-quote",
    icon: Layers,
    title: "One service",
    desc: "Fixed price in three taps",
  },
  {
    id: "multiple",
    hash: "build-your-clean",
    icon: LayoutGrid,
    title: "Several services",
    desc: "Combine jobs, one total",
  },
];

/**
 * Single entry point for both quoting tools.
 *
 * These used to be two full sections stacked back to back, which read as
 * duplication — two headings, two cards, two ways to answer the same question.
 * Now the visitor makes one explicit choice and sees one tool.
 *
 * The tab is driven by the URL hash, so every pre-existing deep link keeps
 * working AND lands on the right tool: `#instant-quote` opens the single-service
 * selector, `#build-your-clean` opens the basket. Both anchors still exist in
 * the DOM as scroll targets.
 */
export function QuoteTabs() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("single");
  const baseId = useId();

  // Honour the incoming hash on mount, and any later in-page hash change.
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "");
      const match = MODES.find((m) => m.hash === hash);
      if (match) setMode(match.id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div>
      {/*
        Scroll anchors for the legacy hashes. Zero-height and aria-hidden — they
        exist only so `#instant-quote` / `#build-your-clean` still resolve.
      */}
      {MODES.map((m) => (
        <span
          key={m.hash}
          id={m.hash}
          aria-hidden="true"
          className="block scroll-mt-[calc(var(--announce-h)+var(--header-h)+5rem)]"
        />
      ))}

      {/* ── Choice ──────────────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="How would you like to get your price?"
        className="mx-auto grid max-w-2xl grid-cols-2 gap-2.5 sm:gap-3"
      >
        {MODES.map((m) => {
          const active = m.id === mode;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${m.id}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel-${m.id}`}
              onClick={() => setMode(m.id)}
              className={cn(
                "group relative flex min-h-[5.5rem] flex-col items-center justify-center gap-1 rounded-3xl border px-3 py-4 text-center transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                active
                  ? "border-accent bg-card shadow-card"
                  : "border-border bg-card/50 hover:border-sage-300 hover:bg-card",
              )}
            >
              {/* Selected tick — occupies no layout space so nothing shifts. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white transition-all duration-300",
                  active ? "scale-100 opacity-100" : "scale-75 opacity-0",
                )}
              >
                <Check className="h-3 w-3" />
              </span>

              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  active ? "text-emerald-600" : "text-ink-400",
                )}
              />
              <span
                className={cn(
                  "mt-0.5 font-display text-sm font-semibold transition-colors sm:text-base",
                  active ? "text-foreground" : "text-ink-600",
                )}
              >
                {m.title}
              </span>
              <span className="text-[0.6875rem] leading-tight text-muted-foreground sm:text-xs">
                {m.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Panel ───────────────────────────────────────────────────────── */}
      <div className="mt-6 sm:mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            role="tabpanel"
            id={`${baseId}-panel-${mode}`}
            aria-labelledby={`${baseId}-tab-${mode}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {mode === "single" ? <PricingSelector /> : <BuildYourClean />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
