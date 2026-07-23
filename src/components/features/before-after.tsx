"use client";

import { useRef, useState } from "react";
import {
  CookingPot,
  Sofa,
  Bath,
  BedDouble,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Optional real photos — if provided they replace the illustrated scene. */
  beforeSrc?: string;
  afterSrc?: string;
  accent: {
    object: string; // furniture fill (after state)
    ring: string; // icon circle
  };
};

const slides: Slide[] = [
  {
    id: "kitchen",
    label: "Kitchen",
    icon: CookingPot,
    accent: { object: "bg-emerald-300", ring: "text-emerald-600" },
  },
  {
    id: "living",
    label: "Living room",
    icon: Sofa,
    accent: { object: "bg-mint-300", ring: "text-mint-600" },
  },
  {
    id: "bathroom",
    label: "Bathroom",
    icon: Bath,
    accent: { object: "bg-sage-300", ring: "text-sage-600" },
  },
  {
    id: "bedroom",
    label: "Bedroom",
    icon: BedDouble,
    accent: { object: "bg-emerald-200", ring: "text-emerald-700" },
  },
];

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const slide = slides[active];

  const updateFromX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    try {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // pointer may not be capturable (e.g. synthetic events) — safe to ignore
    }
    updateFromX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 3));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 3));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  const go = (i: number) => {
    setActive((i + slides.length) % slides.length);
    setPos(50);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Slider stage */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-4xl border border-border shadow-lifted sm:aspect-[16/10]"
      >
        {/* AFTER layer (full) */}
        <Scene slide={slide} variant="after" />

        {/* BEFORE layer (clipped to the left of the handle) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Scene slide={slide} variant="before" />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink-900/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          After
        </span>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
          style={{ left: `${pos}%` }}
        >
          <button
            type="button"
            role="slider"
            tabIndex={0}
            aria-label={`Reveal before and after — ${slide.label}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
            className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white bg-white text-sage-700 shadow-lifted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <GripVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Hint + label */}
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Drag the handle (or use ← →) to reveal the{" "}
        <span className="font-medium text-foreground">{slide.label}</span>{" "}
        transformation
      </p>

      {/* Carousel controls */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous room"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-600 transition-colors hover:border-sage-300 hover:bg-sage-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={s.label}
              aria-current={i === active}
              className={cn(
                "rounded-full transition-all",
                i === active
                  ? "h-2.5 w-6 bg-accent"
                  : "h-2.5 w-2.5 bg-sage-200 hover:bg-sage-300",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next room"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-600 transition-colors hover:border-sage-300 hover:bg-sage-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/**
 * Illustrated room scene. `before` = dull/grimy, `after` = bright + sparkling.
 * Geometry is identical across variants so the wipe reads as one scene
 * transforming. Swap for <img src={slide.beforeSrc}/> when real photos exist.
 */
function Scene({
  slide,
  variant,
}: {
  slide: Slide;
  variant: "before" | "after";
}) {
  const after = variant === "after";
  const src = after ? slide.afterSrc : slide.beforeSrc;
  const Icon = slide.icon;

  // Real photo path (kept for future drop-in).
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${slide.label} ${variant} cleaning`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        !after && "brightness-[0.92] saturate-[0.7]",
      )}
    >
      {/* Wall */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-[62%]",
          after ? "bg-mint-50" : "bg-stone-300",
        )}
      />
      {/* Floor */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-[38%]",
          after ? "bg-emerald-100" : "bg-stone-400/80",
        )}
      />

      {/* Window */}
      <div
        className={cn(
          "absolute left-[10%] top-[14%] h-[34%] w-[26%] rounded-md border-4",
          after
            ? "border-white bg-sky-100"
            : "border-stone-400 bg-stone-300",
        )}
      >
        <div
          className={cn(
            "absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2",
            after ? "bg-white" : "bg-stone-400",
          )}
        />
      </div>

      {/* Furniture object */}
      <div
        className={cn(
          "absolute bottom-[18%] right-[12%] h-[26%] w-[40%] rounded-xl",
          after ? slide.accent.object : "bg-stone-500/70",
        )}
      />

      {/* Room icon badge */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl border backdrop-blur-sm",
            after
              ? "border-white/70 bg-white/50"
              : "border-stone-400/50 bg-stone-200/40",
          )}
        >
          <Icon
            className={cn(
              "h-8 w-8",
              after ? slide.accent.ring : "text-stone-500",
            )}
          />
        </div>
      </div>

      {/* Variant-specific treatment */}
      {after ? (
        <>
          <Sparkles className="absolute right-[16%] top-[18%] h-6 w-6 text-white drop-shadow" />
          <Sparkles className="absolute left-[20%] bottom-[26%] h-5 w-5 text-emerald-400" />
          <Sparkles className="absolute right-[30%] bottom-[34%] h-4 w-4 text-white" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20" />
        </>
      ) : (
        <>
          {/* grime blobs */}
          <div className="absolute left-[24%] top-[30%] h-16 w-20 rounded-full bg-amber-900/20 blur-xl" />
          <div className="absolute right-[22%] top-[44%] h-14 w-16 rounded-full bg-stone-800/20 blur-lg" />
          <div className="absolute bottom-[24%] left-[40%] h-10 w-24 rounded-full bg-amber-800/20 blur-lg" />
          {/* dust specks */}
          {[
            ["18%", "26%"],
            ["52%", "22%"],
            ["66%", "52%"],
            ["38%", "60%"],
            ["28%", "70%"],
          ].map(([top, left], i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-stone-700/40"
              style={{ top, left }}
            />
          ))}
          <div className="absolute inset-0 bg-amber-950/5" />
        </>
      )}
    </div>
  );
}
