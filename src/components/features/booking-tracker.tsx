"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  CalendarCheck,
  UserCheck,
  Truck,
  SprayCan,
  BadgeCheck,
  Star,
  MapPin,
  Check,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StageId = "confirmed" | "assigned" | "en-route" | "in-progress" | "complete";

const stages: {
  id: StageId;
  short: string;
  title: string;
  icon: LucideIcon;
  time: string;
}[] = [
  { id: "confirmed", short: "Confirmed", title: "Booking confirmed", icon: CalendarCheck, time: "8:30 am" },
  { id: "assigned", short: "Assigned", title: "Cleaner assigned", icon: UserCheck, time: "8:41 am" },
  { id: "en-route", short: "En route", title: "On the way to you", icon: Truck, time: "8:52 am" },
  { id: "in-progress", short: "Cleaning", title: "Clean in progress", icon: SprayCan, time: "9:04 am" },
  { id: "complete", short: "Done", title: "All sparkling!", icon: BadgeCheck, time: "11:49 am" },
];

const booking = {
  ref: "LCC-4827",
  service: "Fortnightly residential clean",
  suburb: "Bulimba",
  when: "Today · 9:00 am",
  cleaner: { name: "Maya R.", rating: 4.9, jobs: 320 },
  rooms: ["Kitchen", "Living", "2 Bedrooms", "Bathroom"],
};

export function BookingTracker({ reference }: { reference?: string } = {}) {
  const ref = reference ?? booking.ref;
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0); // 0–100 within current stage
  const [playing, setPlaying] = useState(true);

  const last = stages.length - 1;
  const stageDuration = reduce ? 900 : 3200;

  // Advance through stages — one reliable timeout per stage (Strict-Mode safe).
  useEffect(() => {
    if (!playing) return;
    if (stage >= last) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setStage((s) => s + 1), stageDuration);
    return () => clearTimeout(id);
  }, [stage, playing, last, stageDuration]);

  // Smoothly fill sub-progress for the active stage (timestamp-based rAF).
  useEffect(() => {
    if (stage >= last) {
      setProgress(100);
      return;
    }
    if (!playing) return;
    if (reduce) {
      setProgress(100);
      return;
    }
    setProgress(0);
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      const pct = Math.min(100, ((now - start) / stageDuration) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [stage, playing, last, stageDuration, reduce]);

  function replay() {
    setStage(0);
    setProgress(0);
    setPlaying(true);
  }

  // Overall line fill across the 5 nodes.
  const lineFill = ((stage + progress / 100) / last) * 100;
  const current = stages[stage];
  const etaMin = Math.max(1, Math.ceil(9 * (1 - progress / 100)));
  const roomsDone = Math.round((progress / 100) * booking.rooms.length);

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-4xl border border-border bg-card shadow-lifted">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-border bg-gradient-to-br from-sage-50 to-mint-50 px-6 py-5 sm:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Live tracking
            </span>
          </div>
          <p className="mt-1 font-display text-sm font-semibold text-foreground">
            {booking.service}
          </p>
          <p className="text-xs text-muted-foreground">
            Ref {ref} · {booking.suburb} · {booking.when}
          </p>
        </div>
        {!playing && stage >= last && (
          <button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-sage-700 transition-colors hover:bg-sage-50"
          >
            <RotateCcw className="h-4 w-4" /> Replay
          </button>
        )}
      </div>

      {/* Stepper */}
      <div className="px-6 pt-8 sm:px-8">
        <div className="relative">
          {/* track */}
          <div className="absolute left-0 right-0 top-5 h-0.5 bg-sage-100" />
          <motion.div
            className="absolute left-0 top-5 h-0.5 bg-accent"
            initial={false}
            animate={{ width: `${lineFill}%` }}
            transition={{ duration: reduce ? 0 : 0.2, ease: "linear" }}
          />
          <ol className="relative flex justify-between">
            {stages.map((s, i) => {
              const done = i < stage;
              const active = i === stage;
              const Icon = s.icon;
              return (
                <li key={s.id} className="flex flex-col items-center gap-2">
                  <span
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-full border-2 bg-card transition-colors duration-300",
                      done || active
                        ? "border-accent text-accent"
                        : "border-sage-200 text-sage-300",
                      active && "shadow-glow",
                    )}
                  >
                    {active && !reduce && (
                      <span className="absolute inset-0 animate-pulse-ring rounded-full" />
                    )}
                    {done ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-center text-[11px] font-medium sm:text-xs",
                      done || active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {s.short}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {i <= stage ? s.time : "—"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Active stage detail */}
      <div className="px-6 pb-7 pt-6 sm:px-8">
        <div
          aria-live="polite"
          className="mb-4 text-center font-display text-lg font-semibold text-foreground"
        >
          {current.title}
        </div>

        {/* Cleaner card (from Assigned onward) */}
        {stage >= 1 && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-3 rounded-2xl border border-border bg-sage-50/60 p-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-700 font-display font-semibold text-white">
              {booking.cleaner.name.charAt(0)}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                {booking.cleaner.name}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {booking.cleaner.rating} · {booking.cleaner.jobs}+ cleans
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
              Your cleaner
            </span>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {current.id === "confirmed" && (
              <DetailNote>
                We&apos;ve received your booking and are matching you with the best
                local cleaner for {booking.suburb}.
              </DetailNote>
            )}

            {current.id === "assigned" && (
              <DetailNote>
                {booking.cleaner.name} is prepping the eco kit for your{" "}
                {booking.service.toLowerCase()}.
              </DetailNote>
            )}

            {current.id === "en-route" && (
              <EnRoute progress={progress} etaMin={etaMin} />
            )}

            {current.id === "in-progress" && (
              <InProgress progress={progress} roomsDone={roomsDone} />
            )}

            {current.id === "complete" && <Complete />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function DetailNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto max-w-md text-center text-pretty text-sm text-muted-foreground">
      {children}
    </p>
  );
}

function EnRoute({ progress, etaMin }: { progress: number; etaMin: number }) {
  return (
    <div>
      <p className="mb-3 text-center text-sm text-muted-foreground">
        Maya is{" "}
        <strong className="font-semibold text-foreground">
          ~{etaMin} min away
        </strong>
      </p>
      {/* stylised road + moving van */}
      <div className="relative h-20 overflow-hidden rounded-2xl border border-border bg-mint-50/70">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full text-sage-200"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line
            x1="4"
            y1="55"
            x2="96"
            y2="55"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
        <MapPin className="absolute right-3 top-1/2 h-6 w-6 -translate-y-[150%] text-emerald-600" />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          initial={false}
          animate={{ left: `calc(${Math.min(progress, 92)}% )` }}
          transition={{ ease: "linear", duration: 0.1 }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-glow">
            <Truck className="h-5 w-5" />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function InProgress({
  progress,
  roomsDone,
}: {
  progress: number;
  roomsDone: number;
}) {
  return (
    <div>
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-sage-100">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
      <ul className="grid grid-cols-2 gap-2">
        {booking.rooms.map((room, i) => {
          const done = i < roomsDone;
          return (
            <li
              key={room}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
                done
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-border text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full",
                  done ? "bg-emerald-500 text-white" : "bg-sage-200",
                )}
              >
                {done && <Check className="h-2.5 w-2.5" />}
              </span>
              {room}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Complete() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <BadgeCheck className="h-7 w-7" />
      </div>
      <p className="text-pretty text-sm text-muted-foreground">
        Your home is spotless and the team has checked out. Cleaned in{" "}
        <strong className="font-semibold text-foreground">2h 45m</strong>.
      </p>
      <div className="mt-3 flex items-center justify-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Rate your clean</p>
    </div>
  );
}
