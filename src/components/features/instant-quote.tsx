"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  RotateCcw,
  Calendar,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn, formatAud } from "@/lib/utils";
import {
  serviceOptions,
  bedroomOptions,
  bathroomOptions,
  specialtyItemOptions,
  premisesOptions,
  frequencyOptions,
  conditionOptions,
  addonOptions,
  suburbOptions,
  initialQuoteInput,
  estimateQuote,
  type QuoteInput,
  type ServiceId,
} from "@/lib/quote";

type Phase = "form" | "thinking" | "result";

const thinkingMessages = [
  "Reading your home details…",
  "Matching vetted cleaners in your suburb…",
  "Pricing eco products & supplies…",
  "Finalising your instant estimate…",
];

export function InstantQuote() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("form");
  const [stepIndex, setStepIndex] = useState(0);
  const [thinkStep, setThinkStep] = useState(0);
  const [input, setInput] = useState<QuoteInput>(initialQuoteInput);

  // Which steps apply depends on the chosen service.
  const steps = useMemo(() => buildSteps(input.service), [input.service]);
  const step = steps[stepIndex];

  const set = <K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const toggleInArray = (key: "specialtyItems" | "addons", id: string) =>
    setInput((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id],
      };
    });

  const canAdvance = isStepValid(step, input);
  const isLast = stepIndex === steps.length - 1;

  function next() {
    if (!canAdvance) return;
    if (isLast) {
      runThinking();
    } else {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    }
  }

  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function runThinking() {
    setPhase("thinking");
    setThinkStep(0);
    const total = thinkingMessages.length;
    const per = reduce ? 250 : 700;
    let i = 0;
    const tick = () => {
      i += 1;
      if (i < total) {
        setThinkStep(i);
        setTimeout(tick, per);
      } else {
        setPhase("result");
      }
    };
    setTimeout(tick, per);
  }

  function reset() {
    setInput(initialQuoteInput);
    setStepIndex(0);
    setThinkStep(0);
    setPhase("form");
  }

  const progress =
    phase === "result"
      ? 100
      : phase === "thinking"
        ? 95
        : ((stepIndex + 1) / steps.length) * 90;

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-4xl border border-border bg-card shadow-lifted">
      {/* Header / progress */}
      <div className="border-b border-border bg-gradient-to-br from-sage-50 to-mint-50 px-6 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-foreground">
                AI Instant Quote
              </p>
              <p className="text-xs text-muted-foreground">
                {phase === "result"
                  ? "Your estimate is ready"
                  : phase === "thinking"
                    ? "Crunching the numbers…"
                    : `Step ${stepIndex + 1} of ${steps.length}`}
              </p>
            </div>
          </div>
          {phase === "result" && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-sage-700 transition-colors hover:bg-sage-50"
            >
              <RotateCcw className="h-4 w-4" /> Start over
            </button>
          )}
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-sage-100">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="min-h-[22rem] px-6 py-6 sm:px-8 sm:py-8">
        <AnimatePresence mode="wait">
          {phase === "form" && (
            <motion.div
              key={step.id}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepContent
                step={step}
                input={input}
                set={set}
                toggleInArray={toggleInArray}
              />
            </motion.div>
          )}

          {phase === "thinking" && (
            <motion.div
              key="thinking"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[18rem] flex-col items-center justify-center text-center"
            >
              <div className="relative inline-flex h-20 w-20 items-center justify-center">
                <span className="absolute inset-0 animate-pulse-ring rounded-full" />
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Sparkles className="h-8 w-8" />
                </span>
              </div>
              <div aria-live="polite" className="mt-6 h-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={thinkStep}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="font-medium text-foreground"
                  >
                    {thinkingMessages[thinkStep]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="mt-3 flex gap-1.5">
                {thinkingMessages.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      i <= thinkStep ? "bg-accent" : "bg-sage-200",
                    )}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResultView input={input} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer nav (form only) */}
      {phase === "form" && (
        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4 sm:px-8">
          <button
            type="button"
            onClick={back}
            disabled={stepIndex === 0}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-sage-50 disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <Button
            variant="accent"
            onClick={next}
            disabled={!canAdvance}
            aria-disabled={!canAdvance}
          >
            {isLast ? "Get my estimate" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- step plumbing ----------------------------- */

type StepDef = {
  id: string;
  title: string;
  subtitle?: string;
};

function buildSteps(service: ServiceId | null): StepDef[] {
  const list: StepDef[] = [
    { id: "service", title: "What can we clean for you?" },
  ];
  if (!service) return list;

  if (service === "specialty") {
    list.push({
      id: "specialty-items",
      title: "Which specialty services?",
      subtitle: "Pick one or more — combine to save on call-out.",
    });
    list.push({
      id: "condition",
      title: "How's the condition?",
      subtitle: "Helps us estimate time on site.",
    });
  } else if (service === "commercial") {
    list.push({ id: "premises", title: "How large is the space?" });
    list.push({ id: "frequency", title: "How often do you need us?" });
  } else {
    // residential & end-of-lease
    list.push({ id: "size", title: "Tell us about the property" });
    list.push(
      service === "end-of-lease"
        ? { id: "condition", title: "How's the condition?" }
        : { id: "frequency", title: "How often do you need us?" },
    );
  }

  list.push({
    id: "extras",
    title: "Almost there",
    subtitle: "Add extras and tell us your suburb.",
  });
  return list;
}

function isStepValid(step: StepDef | undefined, input: QuoteInput): boolean {
  if (!step) return false;
  switch (step.id) {
    case "service":
      return input.service !== null;
    case "size":
      return input.bedrooms !== null && input.bathrooms !== null;
    case "specialty-items":
      return input.specialtyItems.length > 0;
    case "premises":
      return input.premises !== null;
    case "frequency":
    case "condition":
      return true; // sensible defaults
    case "extras":
      return input.suburb !== null;
    default:
      return false;
  }
}

/* ----------------------------- step content ------------------------------ */

function StepContent({
  step,
  input,
  set,
  toggleInArray,
}: {
  step: StepDef;
  input: QuoteInput;
  set: <K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) => void;
  toggleInArray: (key: "specialtyItems" | "addons", id: string) => void;
}) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-foreground">
        {step.title}
      </h3>
      {step.subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">{step.subtitle}</p>
      )}

      <div className="mt-6">
        {step.id === "service" && (
          <RadioGrid
            name="service"
            cols={2}
            options={serviceOptions.map((o) => ({
              value: o.id,
              label: o.label,
              desc: o.desc,
            }))}
            value={input.service}
            onChange={(v) => set("service", v as ServiceId)}
          />
        )}

        {step.id === "size" && (
          <div className="space-y-6">
            <Stepper
              label="Bedrooms"
              options={bedroomOptions.map((n) => ({
                value: String(n),
                label: n === 5 ? "5+" : String(n),
              }))}
              value={input.bedrooms !== null ? String(input.bedrooms) : null}
              onChange={(v) => set("bedrooms", Number(v))}
            />
            <Stepper
              label="Bathrooms"
              options={bathroomOptions.map((n) => ({
                value: String(n),
                label: n === 4 ? "4+" : String(n),
              }))}
              value={input.bathrooms !== null ? String(input.bathrooms) : null}
              onChange={(v) => set("bathrooms", Number(v))}
            />
          </div>
        )}

        {step.id === "specialty-items" && (
          <CheckGrid
            options={specialtyItemOptions.map((o) => ({
              value: o.id,
              label: o.label,
              meta: formatAud(o.price),
            }))}
            values={input.specialtyItems}
            onToggle={(id) => toggleInArray("specialtyItems", id)}
          />
        )}

        {step.id === "premises" && (
          <RadioGrid
            name="premises"
            cols={3}
            options={premisesOptions.map((o) => ({
              value: o.id,
              label: o.label,
              desc: o.desc,
            }))}
            value={input.premises}
            onChange={(v) => set("premises", v)}
          />
        )}

        {step.id === "frequency" && (
          <RadioGrid
            name="frequency"
            cols={2}
            options={frequencyOptions.map((o) => ({
              value: o.id,
              label: o.label,
              desc: o.note,
            }))}
            value={input.frequency}
            onChange={(v) => set("frequency", v)}
          />
        )}

        {step.id === "condition" && (
          <RadioGrid
            name="condition"
            cols={3}
            options={conditionOptions.map((o) => ({
              value: o.id,
              label: o.label,
              desc: o.desc,
            }))}
            value={input.condition}
            onChange={(v) => set("condition", v)}
          />
        )}

        {step.id === "extras" && (
          <div className="space-y-6">
            {input.service !== "specialty" && (
              <div>
                <p className="mb-3 text-sm font-medium text-foreground">
                  Optional add-ons
                </p>
                <CheckGrid
                  cols={2}
                  options={addonOptions.map((o) => ({
                    value: o.id,
                    label: o.label,
                    meta: `+${formatAud(o.price)}`,
                  }))}
                  values={input.addons}
                  onToggle={(id) => toggleInArray("addons", id)}
                />
              </div>
            )}
            <div>
              <label
                htmlFor="suburb"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Your suburb
              </label>
              <select
                id="suburb"
                value={input.suburb ?? ""}
                onChange={(e) => set("suburb", e.target.value || null)}
                className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Select your suburb…
                </option>
                {suburbOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- result view ------------------------------- */

function ResultView({ input }: { input: QuoteInput }) {
  const result = estimateQuote(input);
  const service = serviceOptions.find((s) => s.id === input.service);

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-emerald-700">
        Estimated {result.recurring ? "price per visit" : "total"}
      </p>
      <div className="mt-1 font-display text-4xl font-semibold text-foreground sm:text-5xl">
        {formatAud(result.min)}
        <span className="mx-1 text-muted-foreground">–</span>
        {formatAud(result.max)}
      </div>
      <p className="mx-auto mt-3 max-w-md text-sm text-pretty text-muted-foreground">
        {result.note}
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-sage-50/60 p-5 text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {service?.label} · {input.suburb}
        </p>
        <ul className="space-y-2 text-sm">
          {result.lineItems.map((li, i) => (
            <li key={i} className="flex items-center justify-between gap-4">
              <span className="text-ink-700">{li.label}</span>
              <span
                className={cn(
                  "font-medium tabular-nums",
                  li.amount < 0 ? "text-emerald-700" : "text-foreground",
                )}
              >
                {li.amount < 0 ? "−" : ""}
                {formatAud(Math.abs(li.amount))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href="/contact" variant="accent" size="lg">
          <Calendar className="h-4 w-4" /> Book this clean
        </Button>
        <Button href="tel:+61730401188" variant="outline" size="lg">
          <Phone className="h-4 w-4" /> Talk to us
        </Button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Indicative only — your final quote is confirmed before any clean. No
        call-out fees.
      </p>
    </div>
  );
}

/* --------------------------- reusable controls --------------------------- */

function RadioGrid({
  name,
  options,
  value,
  onChange,
  cols = 2,
}: {
  name: string;
  options: { value: string; label: string; desc?: string }[];
  value: string | null;
  onChange: (value: string) => void;
  cols?: 2 | 3;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={cn(
        "grid gap-3",
        cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2",
      )}
    >
      {options.map((o) => {
        const checked = value === o.value;
        return (
          <label
            key={o.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all",
              checked
                ? "border-accent bg-accent/5 shadow-soft"
                : "border-border hover:border-sage-300 hover:bg-sage-50/50",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={checked}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span
              className={cn(
                "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                checked ? "border-accent bg-accent text-white" : "border-sage-300",
              )}
              aria-hidden="true"
            >
              {checked && <Check className="h-3 w-3" />}
            </span>
            <span>
              <span className="block font-medium text-foreground">{o.label}</span>
              {o.desc && (
                <span className="block text-sm text-muted-foreground">
                  {o.desc}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function CheckGrid({
  options,
  values,
  onToggle,
  cols = 1,
}: {
  options: { value: string; label: string; meta?: string }[];
  values: string[];
  onToggle: (id: string) => void;
  cols?: 1 | 2;
}) {
  return (
    <div className={cn("grid gap-3", cols === 2 ? "sm:grid-cols-2" : "")}>
      {options.map((o) => {
        const checked = values.includes(o.value);
        return (
          <label
            key={o.value}
            className={cn(
              "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-4 transition-all",
              checked
                ? "border-accent bg-accent/5 shadow-soft"
                : "border-border hover:border-sage-300 hover:bg-sage-50/50",
            )}
          >
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(o.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                  checked
                    ? "border-accent bg-accent text-white"
                    : "border-sage-300",
                )}
                aria-hidden="true"
              >
                {checked && <Check className="h-3 w-3" />}
              </span>
              <span className="font-medium text-foreground">{o.label}</span>
            </span>
            {o.meta && (
              <span className="text-sm font-medium text-muted-foreground">
                {o.meta}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}

function Stepper({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-foreground">{label}</p>
      <div
        role="radiogroup"
        aria-label={label}
        className="flex flex-wrap gap-2"
      >
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                "flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border text-base font-medium transition-all",
                checked
                  ? "border-accent bg-accent text-white shadow-soft"
                  : "border-border text-ink-700 hover:border-sage-300 hover:bg-sage-50",
              )}
            >
              <input
                type="radio"
                name={label}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

