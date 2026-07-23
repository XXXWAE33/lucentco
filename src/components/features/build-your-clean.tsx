"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CookingPot,
  Sofa,
  UtensilsCrossed,
  BedDouble,
  Bath,
  Briefcase,
  WashingMachine,
  DoorOpen,
  Plus,
  Minus,
  Check,
  Calendar,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn, formatAud } from "@/lib/utils";
import {
  roomTypes,
  buildExtras,
  frequencyOptions,
  initialBuildState,
  estimateBuild,
  type BuildState,
  type RoomType,
} from "@/lib/configurator";

const roomIcons: Record<string, LucideIcon> = {
  kitchen: CookingPot,
  living: Sofa,
  dining: UtensilsCrossed,
  bedroom: BedDouble,
  bathroom: Bath,
  study: Briefcase,
  laundry: WashingMachine,
  hallway: DoorOpen,
};

export function BuildYourClean() {
  const [state, setState] = useState<BuildState>(initialBuildState);
  const estimate = useMemo(() => estimateBuild(state), [state]);

  const setRoom = (id: string, qty: number) =>
    setState((s) => ({ ...s, rooms: { ...s.rooms, [id]: qty } }));

  const toggleExtra = (id: string) =>
    setState((s) => ({
      ...s,
      extras: s.extras.includes(id)
        ? s.extras.filter((x) => x !== id)
        : [...s.extras, id],
    }));

  return (
    <div className="grid gap-6 overflow-hidden rounded-4xl border border-border bg-card p-5 shadow-lifted sm:p-7 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Animated house illustration */}
      <div className="rounded-3xl bg-gradient-to-br from-sage-50 to-mint-50 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-sm font-semibold text-foreground">
            Your home
          </p>
          <p className="text-sm text-muted-foreground">
            {estimate.roomCount} {estimate.roomCount === 1 ? "room" : "rooms"}{" "}
            selected
          </p>
        </div>

        {/* Roof */}
        <svg
          viewBox="0 0 100 14"
          preserveAspectRatio="none"
          className="h-8 w-full text-sage-700"
          aria-hidden="true"
        >
          <path d="M2 14 L50 1 L98 14 Z" fill="currentColor" />
        </svg>

        {/* House body — grid of room tiles */}
        <div className="grid grid-cols-2 gap-2.5 rounded-b-2xl border-x-2 border-b-2 border-sage-700/70 bg-white/40 p-2.5 sm:grid-cols-3">
          {roomTypes.map((room) => (
            <RoomTile
              key={room.id}
              room={room}
              qty={state.rooms[room.id] ?? 0}
              onChange={(q) => setRoom(room.id, q)}
            />
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Tap a room to add it · use −/+ for bedrooms &amp; bathrooms
        </p>
      </div>

      {/* Controls + live price */}
      <div className="flex flex-col">
        {/* Frequency */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">How often?</p>
          <div className="grid grid-cols-2 gap-2">
            {frequencyOptions.map((f) => {
              const active = state.frequency === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, frequency: f.id }))}
                  aria-pressed={active}
                  className={cn(
                    "rounded-2xl border px-3 py-2.5 text-left transition-all",
                    active
                      ? "border-accent bg-accent/5 shadow-soft"
                      : "border-border hover:border-sage-300 hover:bg-sage-50/50",
                  )}
                >
                  <span className="block text-sm font-medium text-foreground">
                    {f.label}
                  </span>
                  <span className="block text-xs text-emerald-700">{f.note}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Extras */}
        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-foreground">Add extras</p>
          <div className="flex flex-wrap gap-2">
            {buildExtras.map((e) => {
              const active = state.extras.includes(e.id);
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => toggleExtra(e.id)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all",
                    active
                      ? "border-accent bg-accent text-white"
                      : "border-sage-200 text-ink-700 hover:border-sage-300 hover:bg-sage-50",
                  )}
                >
                  {active && <Check className="h-3.5 w-3.5" />}
                  {e.label}
                  <span className={active ? "text-white/80" : "text-muted-foreground"}>
                    +{formatAud(e.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live price */}
        <div className="mt-auto pt-6">
          <div className="rounded-3xl bg-sage-900 p-5 text-mint-100">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-mint-200/80">
                  {estimate.recurring ? "Per visit" : "One-off total"}
                </p>
                <motion.div
                  key={estimate.total}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-4xl font-semibold text-white"
                >
                  {formatAud(estimate.total)}
                </motion.div>
              </div>
              <div className="text-right text-xs text-mint-200/70">
                <p>{estimate.frequencyLabel}</p>
                {estimate.discount > 0 && (
                  <p className="text-emerald-400">
                    saving {formatAud(estimate.discount)}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button
                href="/contact"
                variant="accent"
                className="w-full"
                aria-disabled={estimate.roomCount === 0}
              >
                <Calendar className="h-4 w-4" /> Book this clean
              </Button>
              <Button
                href="/contact"
                className="w-full border border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                Save quote <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomTile({
  room,
  qty,
  onChange,
}: {
  room: RoomType;
  qty: number;
  onChange: (qty: number) => void;
}) {
  const reduce = useReducedMotion();
  const Icon = roomIcons[room.icon] ?? Sofa;
  const active = qty > 0;

  // Non-quantity rooms: the whole tile is a toggle button.
  if (!room.perUnit) {
    return (
      <button
        type="button"
        onClick={() => onChange(active ? 0 : 1)}
        aria-pressed={active}
        aria-label={`${room.label}${active ? " (selected)" : ""}`}
        className={cn(
          "relative flex aspect-[4/3] flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border text-center transition-colors",
          active ? "border-emerald-500/40" : "border-sage-200 bg-white/60",
        )}
      >
        <FillLayer active={active} reduce={!!reduce} />
        <Icon
          className={cn(
            "relative h-5 w-5 transition-colors",
            active ? "text-white" : "text-sage-500",
          )}
        />
        <span
          className={cn(
            "relative text-xs font-medium transition-colors",
            active ? "text-white" : "text-ink-600",
          )}
        >
          {room.label}
        </span>
      </button>
    );
  }

  // Quantity rooms: tile shows an Add button, then a −/+ stepper.
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border text-center",
        active ? "border-emerald-500/40" : "border-sage-200 bg-white/60",
      )}
    >
      <FillLayer active={active} reduce={!!reduce} />
      <Icon
        className={cn(
          "relative h-5 w-5 transition-colors",
          active ? "text-white" : "text-sage-500",
        )}
      />
      <span
        className={cn(
          "relative text-xs font-medium transition-colors",
          active ? "text-white" : "text-ink-600",
        )}
      >
        {room.label}
      </span>

      {active ? (
        <div className="relative mt-0.5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChange(qty - 1)}
            aria-label={`Remove a ${room.label}`}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-white transition-colors hover:bg-white/40"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-4 text-sm font-semibold text-white tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => onChange(Math.min(qty + 1, room.max))}
            disabled={qty >= room.max}
            aria-label={`Add a ${room.label}`}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-white transition-colors hover:bg-white/40 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onChange(1)}
          aria-label={`Add ${room.label}`}
          className="relative mt-0.5 inline-flex items-center gap-1 rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-medium text-sage-700 transition-colors hover:bg-sage-200"
        >
          <Plus className="h-3 w-3" /> Add
        </button>
      )}
    </div>
  );
}

function FillLayer({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-mint-500"
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.7,
      }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "bottom center" }}
    />
  );
}
