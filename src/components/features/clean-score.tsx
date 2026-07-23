"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Upload,
  ImageIcon,
  ScanLine,
  Sparkles,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  analyzeCleanliness,
  type CleanScoreResult,
  type Rating,
} from "@/lib/clean-score";

type Phase = "idle" | "preview" | "analyzing" | "result";

const ratingStyles: Record<Rating, { ring: string; text: string; label: string }> =
  {
    sparkling: { ring: "stroke-emerald-500", text: "text-emerald-600", label: "Sparkling" },
    good: { ring: "stroke-emerald-500", text: "text-emerald-600", label: "Good" },
    fair: { ring: "stroke-amber-500", text: "text-amber-600", label: "Fair" },
    "needs-attention": { ring: "stroke-rose-500", text: "text-rose-600", label: "Needs attention" },
  };

export function CleanScore() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CleanScoreResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Revoke the object URL when it changes / on unmount.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(file: File | undefined) {
    setError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG or HEIC).");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("That image is over 12MB — please pick a smaller one.");
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    fileRef.current = file;
    setPreview(URL.createObjectURL(file));
    setPhase("preview");
  }

  async function analyze() {
    if (!fileRef.current) return;
    setPhase("analyzing");
    const res = await analyzeCleanliness(fileRef.current, {
      delayMs: reduce ? 900 : 2400,
    });
    setResult(res);
    setPhase("result");
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setResult(null);
    setError(null);
    fileRef.current = null;
    setPhase("idle");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6 overflow-hidden rounded-4xl border border-border bg-card p-5 shadow-lifted sm:p-7 md:grid-cols-2">
      {/* Image / upload side */}
      <div className="flex flex-col">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {phase === "idle" ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={cn(
              "flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed p-6 text-center transition-colors",
              dragOver
                ? "border-accent bg-accent/5"
                : "border-sage-300 bg-sage-50/50 hover:border-sage-400 hover:bg-sage-50",
            )}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Upload className="h-6 w-6" />
            </span>
            <span className="font-display font-semibold text-foreground">
              Drop a room photo
            </span>
            <span className="text-sm text-muted-foreground">
              or click to browse · JPG, PNG, HEIC
            </span>
          </button>
        ) : (
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-ink-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview ?? ""}
              alt="Room to assess"
              className="h-full w-full object-cover"
            />

            {/* Scanning overlay */}
            <AnimatePresence>
              {phase === "analyzing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-sage-950/40 backdrop-blur-[1px]"
                >
                  {!reduce && (
                    <motion.div
                      className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent"
                      initial={{ top: "-20%" }}
                      animate={{ top: ["-20%", "100%"] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="absolute bottom-0 h-0.5 w-full bg-emerald-300 shadow-glow" />
                    </motion.div>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
                    <ScanLine className="h-7 w-7 animate-pulse" />
                    <p className="text-sm font-medium">Analysing cleanliness…</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {error && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-rose-600">
            <AlertCircle className="h-4 w-4" /> {error}
          </p>
        )}

        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          Analysed in your browser — your photo is never uploaded or stored.
        </p>
      </div>

      {/* Result / action side */}
      <div className="flex min-h-[20rem] flex-col">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="intro"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 flex-col justify-center"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/12 px-3 py-1 text-xs font-medium text-emerald-800">
                <Sparkles className="h-3.5 w-3.5" /> AI Clean Score
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                How clean is your space?
              </h3>
              <p className="mt-2 text-pretty text-muted-foreground">
                Upload a photo of any room and our AI estimates a cleanliness
                score, breaks it down by area, and recommends the right service
                tier — in seconds.
              </p>
            </motion.div>
          )}

          {(phase === "preview" || phase === "analyzing") && (
            <motion.div
              key="ready"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 flex-col justify-center gap-4"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-sage-50/60 p-4">
                <ImageIcon className="h-5 w-5 text-sage-600" />
                <p className="text-sm text-ink-700">
                  Photo ready. Run the assessment when you are.
                </p>
              </div>
              <Button
                variant="accent"
                onClick={analyze}
                disabled={phase === "analyzing"}
              >
                {phase === "analyzing" ? (
                  "Analysing…"
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Analyse my room
                  </>
                )}
              </Button>
              <button
                type="button"
                onClick={reset}
                className="text-sm font-medium text-sage-700 transition-colors hover:text-sage-900"
              >
                Choose a different photo
              </button>
            </motion.div>
          )}

          {phase === "result" && result && (
            <motion.div
              key="result"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              aria-live="polite"
            >
              <ScoreResult result={result} reduce={!!reduce} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScoreResult({
  result,
  reduce,
  onReset,
}: {
  result: CleanScoreResult;
  reduce: boolean;
  onReset: () => void;
}) {
  const style = ratingStyles[result.rating];
  const R = 52;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - result.overall / 100);

  return (
    <div>
      {/* Ring + headline */}
      <div className="flex items-center gap-4">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              strokeWidth="10"
              className="stroke-sage-100"
            />
            <motion.circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className={style.ring}
              strokeDasharray={C}
              initial={{ strokeDashoffset: reduce ? offset : C }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: reduce ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("font-display text-3xl font-semibold", style.text)}>
              {result.overall}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              / 100
            </span>
          </div>
        </div>
        <div>
          <span
            className={cn(
              "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
              result.rating === "needs-attention"
                ? "bg-rose-100 text-rose-700"
                : result.rating === "fair"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700",
            )}
          >
            {style.label}
          </span>
          <p className="mt-2 text-pretty text-sm text-muted-foreground">
            {result.summary}
          </p>
        </div>
      </div>

      {/* Category breakdown */}
      <ul className="mt-5 space-y-2.5">
        {result.categories.map((c, i) => (
          <li key={c.id}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-ink-700">{c.label}</span>
              <span className="font-medium tabular-nums text-foreground">
                {c.score}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-sage-100">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  c.score >= 70
                    ? "bg-emerald-500"
                    : c.score >= 55
                      ? "bg-amber-500"
                      : "bg-rose-500",
                )}
                initial={{ width: reduce ? `${c.score}%` : 0 }}
                animate={{ width: `${c.score}%` }}
                transition={{
                  duration: reduce ? 0 : 0.6,
                  delay: reduce ? 0 : 0.1 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Recommended tier */}
      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
          Recommended
        </p>
        <p className="mt-0.5 font-display text-lg font-semibold text-foreground">
          {result.tier.name}
        </p>
        <p className="mt-1 text-sm text-pretty text-muted-foreground">
          {result.tier.blurb}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button href="/contact" variant="accent" className="w-full">
          Get a tailored quote <ArrowRight className="h-4 w-4" />
        </Button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-sage-200 px-4 py-2.5 text-sm font-medium text-sage-700 transition-colors hover:bg-sage-50"
        >
          <RotateCcw className="h-4 w-4" /> New photo
        </button>
      </div>
    </div>
  );
}
