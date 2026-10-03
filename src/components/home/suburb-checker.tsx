"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, MapPin, MessageCircle, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceSuburbs, whatsappHref } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

/**
 * Type-ahead suburb check. Filters the chip list live and resolves to one of
 * three states: nothing typed, a covered suburb, or "not listed — ask us".
 * Tapping a chip fills the field, so it doubles as the full suburb list.
 */
export function SuburbChecker() {
  const reduce = useReducedMotion();
  const inputId = useId();
  const [query, setQuery] = useState("");
  const q = normalise(query);

  const matches = useMemo(
    () => (q ? serviceSuburbs.filter((s) => normalise(s).includes(q)) : [...serviceSuburbs]),
    [q],
  );
  const exact = serviceSuburbs.find((s) => normalise(s) === q);
  const status: "idle" | "yes" | "no" = !q ? "idle" : exact ? "yes" : matches.length === 0 ? "no" : "idle";

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">
        Your suburb
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          id={inputId}
          type="text"
          inputMode="search"
          autoComplete="address-level2"
          placeholder="Type your suburb…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-11 text-base text-foreground shadow-soft outline-none transition-shadow placeholder:text-ink-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear"
            className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-400 hover:bg-sage-50 hover:text-sage-800"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Result */}
      <div aria-live="polite" className="min-h-0">
        <AnimatePresence mode="wait" initial={false}>
          {status !== "idle" && (
            <motion.div
              key={status + (exact ?? "")}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className={cn(
                "mt-3 flex items-center gap-3 rounded-2xl p-3 pr-2",
                status === "yes" ? "bg-emerald-50" : "bg-gold-50 ring-1 ring-inset ring-gold-200",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white",
                  status === "yes" ? "bg-emerald-500" : "bg-gold-500",
                )}
              >
                {status === "yes" ? <Check className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              </span>
              <p className="min-w-0 flex-1 text-sm leading-snug text-ink-700">
                {status === "yes" ? (
                  <>
                    <strong className="font-semibold text-foreground">Yes — we clean in {exact}.</strong>{" "}
                    Crews nearby this week.
                  </>
                ) : (
                  <>
                    <strong className="font-semibold text-foreground">Not listed yet.</strong> We&rsquo;re
                    likely close — just ask.
                  </>
                )}
              </p>
              {status === "yes" ? (
                <Link
                  href="#get-a-quote"
                  className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full bg-sage-800 px-3.5 text-xs font-semibold text-white hover:bg-sage-900"
                >
                  Price it <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <a
                  href={whatsappHref(`Hi Velora Cleaning, do you clean in ${query.trim()}?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full bg-sage-800 px-3.5 text-xs font-semibold text-white hover:bg-sage-900"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Ask us
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chips */}
      <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
        {matches.map((s) => {
          const active = s === exact;
          return (
            <li key={s}>
              <button
                type="button"
                onClick={() => setQuery(s)}
                className={cn(
                  "inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-medium transition-colors sm:h-9 sm:text-sm",
                  active
                    ? "bg-sage-800 text-white"
                    : "bg-sage-50 text-sage-800 ring-1 ring-inset ring-sage-200/70 hover:bg-sage-100",
                )}
              >
                {active && <Check className="h-3.5 w-3.5 text-mint-200" />}
                {s}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
