"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type DragControls,
  type PanInfo,
} from "framer-motion";
import { ArrowUpRight, Layers, LayoutGrid, Plus, X } from "lucide-react";
import { cn, formatAud } from "@/lib/utils";
import { lockScroll } from "@/lib/scroll-lock";
import { site } from "@/lib/site";
import { CallLink } from "@/components/layout";
import { isQuoteOnly, services, startingPrice, type ServiceId } from "@/config/pricing";
import { SheetPricing } from "./service-pricing";
import { BuildYourClean } from "./build-your-clean";
import { serviceIcons } from "./service-showcase/service-icons";

const EASE = [0.22, 1, 0.36, 1] as const;

type Mode = "single" | "multiple";

const MODES: { id: Mode; hash: string; icon: typeof Layers; title: string }[] = [
  { id: "single", hash: "instant-quote", icon: Layers, title: "One service" },
  { id: "multiple", hash: "build-your-clean", icon: LayoutGrid, title: "Several services" },
];

/** Per-service tint for the picker tiles. Static strings so Tailwind keeps them. */
const TILE_TONES: Record<string, { tile: string; bubble: string; glow: string }> = {
  carpet: {
    tile: "from-emerald-50 to-white",
    bubble: "bg-emerald-500 text-white",
    glow: "bg-emerald-300/40",
  },
  couch: {
    tile: "from-sage-100 to-white",
    bubble: "bg-sage-700 text-white",
    glow: "bg-sage-300/50",
  },
  mattress: {
    tile: "from-mint-100 to-white",
    bubble: "bg-mint-400 text-sage-900",
    glow: "bg-mint-200/70",
  },
  curtain: {
    // Brand gold — echoes the logo and the hero's "Brisbane."
    tile: "from-gold-100 to-white",
    bubble: "bg-gold-500 text-white",
    glow: "bg-gold-300/50",
  },
};

type SheetState = { mode: Mode; service: ServiceId } | null;

/**
 * Get-a-price entry point.
 *
 * The section shows a tappable service menu ("from $X" per service) plus a
 * "combine several" card. Choosing either opens the quote sheet — a bottom
 * sheet on mobile, a centred dialog from `sm` up — which holds the One /
 * Several toggle and the actual pricing tool.
 *
 * Legacy deep links still work: `#instant-quote` opens the sheet on one
 * service, `#build-your-clean` opens it on the basket. The hash is cleared on
 * close so the same link opens it again next time.
 */
export function QuoteTabs() {
  const reduce = useReducedMotion();
  const [sheet, setSheet] = useState<SheetState>(null);
  const priced = services.filter((s) => !isQuoteOnly(s.id));

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "");
      const match = MODES.find((m) => m.hash === hash);
      if (match) setSheet({ mode: match.id, service: "carpet" });
    };
    sync();
    window.addEventListener("hashchange", sync);

    // Next's <Link> updates the URL via pushState, which never fires
    // `hashchange` — so same-page links to these anchors are intercepted
    // here (capture phase, ahead of Link's own handler) and open the sheet.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const match = MODES.find((m) => `#${m.hash}` === url.hash);
      if (!match) return;
      e.preventDefault();
      setSheet({ mode: match.id, service: "carpet" });
    };
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  const close = useCallback(() => {
    setSheet(null);
    if (MODES.some((m) => `#${m.hash}` === window.location.hash)) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      {MODES.map((m) => (
        <span
          key={m.hash}
          id={m.hash}
          aria-hidden="true"
          className="block scroll-mt-[calc(var(--announce-h)+var(--header-h)+5rem)]"
        />
      ))}

      {/* ── Service menu ─────────────────────────────────────────────── */}
      <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
        Tap a service to see your price
      </p>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {priced.map((s, i) => {
          const Icon = serviceIcons[s.icon] ?? Layers;
          const tone = TILE_TONES[s.id] ?? TILE_TONES.carpet;
          const from = startingPrice(s.id);
          return (
            <motion.li
              key={s.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
            >
              <motion.button
                type="button"
                whileTap={reduce ? undefined : { scale: 0.97 }}
                onClick={() => setSheet({ mode: "single", service: s.id })}
                className={cn(
                  "group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-br p-4 text-left shadow-soft transition-shadow duration-300 hover:shadow-card sm:p-5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  tone.tile,
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125",
                    tone.glow,
                  )}
                />
                <span className="relative flex items-start justify-between">
                  <span
                    className={cn(
                      "inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow-soft",
                      tone.bubble,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-sage-800 shadow-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>

                <span className="relative mt-6 font-display text-base font-semibold text-foreground sm:text-lg">
                  {s.name.replace(" cleaning", "")}
                </span>
                <span className="relative text-xs text-muted-foreground sm:text-sm">
                  {s.tagline}
                </span>

                <span className="relative mt-3 flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground">from</span>
                  <span className="font-display text-2xl font-semibold tabular-nums text-foreground">
                    {from !== null ? formatAud(from) : "Quote"}
                  </span>
                </span>
              </motion.button>
            </motion.li>
          );
        })}
      </ul>

      {/* ── Combine card ─────────────────────────────────────────────── */}
      <motion.button
        type="button"
        whileTap={reduce ? undefined : { scale: 0.985 }}
        onClick={() => setSheet({ mode: "multiple", service: "carpet" })}
        className="group relative mt-3 flex w-full items-center gap-4 overflow-hidden rounded-3xl bg-sage-900 p-4 text-left text-white shadow-card sm:mt-4 sm:p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-emerald-500/30 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-gold-400/30 blur-3xl"
        />
        <span className="relative flex shrink-0 -space-x-2.5 [&>*:nth-child(3)]:hidden sm:[&>*:nth-child(3)]:inline-flex">
          {priced.slice(0, 3).map((s) => {
            const Icon = serviceIcons[s.icon] ?? Layers;
            return (
              <span
                key={s.id}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-sage-900 bg-white/15 backdrop-blur"
              >
                <Icon className="h-4 w-4 text-mint-200" />
              </span>
            );
          })}
        </span>
        <span className="relative min-w-0 flex-1">
          <span className="block font-display text-base font-semibold sm:text-lg">
            Booking a few things?
          </span>
          <span className="block text-xs text-mint-200/90 sm:text-sm">
            Combine services, one total price
          </span>
        </span>
        <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white transition-transform duration-300 group-hover:rotate-90">
          <Plus className="h-5 w-5" />
        </span>
      </motion.button>

      <p className="mt-4 text-center text-xs text-muted-foreground sm:text-sm">
        Blinds or water damage?{" "}
        <CallLink
          location="pricing-selector"
          showIcon={false}
          className="font-semibold text-sage-800 underline decoration-sage-300 underline-offset-4 hover:decoration-sage-700"
        >
          Call {site.phone}
        </CallLink>{" "}
        for an on-site quote.
      </p>

      <QuoteSheet state={sheet} onClose={close} onModeChange={(mode) => setSheet((s) => (s ? { ...s, mode } : s))} />
    </div>
  );
}

/* ─────────────────────────────── the sheet ──────────────────────────────── */

function QuoteSheet({
  state,
  onClose,
  onModeChange,
}: {
  state: SheetState;
  onClose: () => void;
  onModeChange: (mode: Mode) => void;
}) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragControls = useDragControls();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const open = state !== null;

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Scroll lock, Esc to close, focus into the dialog.
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 600) onClose();
  };

  if (!mounted) return null;

  const panelMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : isDesktop
      ? {
          initial: { opacity: 0, scale: 0.96, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.97, y: 10 },
        }
      : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return createPortal(
    <AnimatePresence>
      {state && (
        <motion.div
          key="quote-sheet"
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.38 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-sage-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            {...panelMotion}
            transition={{ duration: 0.38, ease: EASE }}
            drag={!isDesktop && !reduce ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            dragListener={false}
            dragControls={dragControls}
            onDragEnd={onDragEnd}
            className={cn(
              "relative flex max-h-[92dvh] w-full flex-col overflow-hidden bg-background shadow-lifted",
              "rounded-t-[1.75rem] sm:max-h-[88vh] sm:rounded-[1.75rem]",
              state.mode === "multiple" ? "sm:max-w-4xl" : "sm:max-w-lg",
            )}
          >
            <SheetHeader
              titleId={titleId}
              mode={state.mode}
              onModeChange={onModeChange}
              onClose={onClose}
              closeRef={closeRef}
              dragControls={dragControls}
              draggable={!isDesktop && !reduce}
            />

            {/* No bottom padding on the scroller itself, so sticky footers
                inside the tool pin flush to the sheet's bottom edge. */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 sm:px-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={state.mode}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: state.mode === "single" ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: state.mode === "single" ? 16 : -16 }}
                  transition={{ duration: 0.24, ease: EASE }}
                >
                  {state.mode === "single" ? (
                    <SheetPricing initialService={state.service} />
                  ) : (
                    <BuildYourClean embedded />
                  )}
                </motion.div>
              </AnimatePresence>
              {/* The single-service view pins its own CTA flush to the bottom;
                  the basket just needs breathing room under its last card. */}
              {state.mode === "multiple" && (
                <div
                  aria-hidden="true"
                  style={{ height: "max(1.25rem, env(safe-area-inset-bottom))" }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function SheetHeader({
  titleId,
  mode,
  onModeChange,
  onClose,
  closeRef,
  dragControls,
  draggable,
}: {
  titleId: string;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onClose: () => void;
  closeRef: React.RefObject<HTMLButtonElement>;
  dragControls: DragControls;
  draggable: boolean;
}) {
  return (
    <div className="relative shrink-0 border-b border-border bg-background px-4 pb-3 pt-1.5 sm:px-7 sm:pt-5">
      {/* Grab handle — drag down to dismiss on mobile. */}
      {draggable && (
        <div
          className="mx-auto mb-1 flex h-5 w-full cursor-grab touch-none items-center justify-center active:cursor-grabbing"
          onPointerDown={(e) => dragControls.start(e)}
          aria-hidden="true"
        >
          <span className="h-1 w-10 rounded-full bg-ink-200" />
        </div>
      )}

      <h2 id={titleId} className="sr-only">
        Your price
      </h2>
      {/* One / Several — sliding pill */}
      <div className="flex items-center gap-2">
      <div
        role="tablist"
        aria-label="How many services?"
        className="grid flex-1 grid-cols-2 rounded-full bg-sage-50 p-1"
      >
        {MODES.map((m) => {
          const active = m.id === mode;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onModeChange(m.id)}
              className={cn(
                "relative inline-flex h-10 items-center justify-center gap-1.5 rounded-full text-[0.8125rem] font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? "text-white" : "text-ink-600 hover:text-sage-800",
              )}
            >
              {active && (
                <motion.span
                  layoutId="quote-mode-pill"
                  className="absolute inset-0 rounded-full bg-sage-800 shadow-soft"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative">{m.title}</span>
            </button>
          );
        })}
      </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-50 text-sage-800 transition-colors hover:bg-sage-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

