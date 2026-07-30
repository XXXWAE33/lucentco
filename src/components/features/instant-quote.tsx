"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  RotateCcw,
  Calendar,
  Phone,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn, formatAud } from "@/lib/utils";
import { site, whatsappServiceMessage } from "@/lib/site";
import { CallLink, WhatsAppLink, WhatsAppIcon } from "@/components/layout";

/** Match the `Button` component's sizing so mixed CTA rows stay aligned. */
const lightContactPillClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-accent-foreground shadow-soft transition-all hover:shadow-glow active:scale-[0.98]";

const outlineContactPillClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-sage-300 bg-transparent px-6 py-3 text-base font-medium text-sage-800 transition-colors hover:bg-sage-50 active:scale-[0.98]";
import { getService, type ServiceId } from "@/config/pricing";
import {
  serviceOptions,
  suburbOptions,
  initialQuoteInput,
  estimateQuote,
  defaultQuantity,
  defaultSizes,
  hasModeStep,
  hasAmountStep,
  FLOOD_ID,
  type QuoteInput,
  type QuoteServiceId,
} from "@/lib/quote";
import { QuantityStepper } from "./service-pricing/quantity-stepper";

type Phase = "form" | "thinking" | "result";

const thinkingMessages = [
  "Reading your job details…",
  "Matching vetted cleaners in your suburb…",
  "Checking equipment & product costs…",
  "Finalising your instant price…",
];

export function InstantQuote() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("form");
  const [stepIndex, setStepIndex] = useState(0);
  const [thinkStep, setThinkStep] = useState(0);
  const [input, setInput] = useState<QuoteInput>(initialQuoteInput);

  const steps = useMemo(() => buildSteps(input.service), [input.service]);
  const step = steps[Math.min(stepIndex, steps.length - 1)];

  const set = <K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  /** Choosing a service resets downstream answers to that service's defaults. */
  const chooseService = (id: QuoteServiceId) =>
    setInput((prev) => ({
      ...prev,
      service: id,
      modeId: id === FLOOD_ID ? null : getService(id).modes[0].id,
      quantity: defaultQuantity(id),
      sizes: defaultSizes(id),
    }));

  const canAdvance = isStepValid(step, input);
  const isLast = stepIndex === steps.length - 1;

  function next() {
    if (!canAdvance) return;
    if (isLast) runThinking();
    else setStepIndex((i) => Math.min(i + 1, steps.length - 1));
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
      <div className="border-b border-border bg-gradient-to-br from-sage-50 to-mint-50 px-4 py-4 sm:px-8 sm:py-5">
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
                  ? "Your price is ready"
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
      <div className="min-h-[22rem] px-4 py-5 sm:px-8 sm:py-8">
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
                chooseService={chooseService}
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
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3.5 sm:px-8 sm:py-4">
          <button
            type="button"
            onClick={back}
            disabled={stepIndex === 0}
            className="inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-ink-600 transition-colors hover:bg-sage-50 disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <Button
            variant="accent"
            onClick={next}
            disabled={!canAdvance}
            aria-disabled={!canAdvance}
          >
            {isLast ? "Get my price" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- step plumbing ----------------------------- */

type StepDef = { id: string; title: string; subtitle?: string };

function buildSteps(service: QuoteServiceId | null): StepDef[] {
  const list: StepDef[] = [{ id: "service", title: "What can we clean for you?" }];
  if (!service) return list;

  if (hasModeStep(service)) {
    list.push({
      id: "mode",
      title: "Which kind of clean?",
      subtitle: "End-of-lease cleans are checked against your agent's exit list.",
    });
  }
  if (hasAmountStep(service)) {
    list.push({ id: "amount", title: "How much needs doing?" });
  }
  list.push({
    id: "suburb",
    title: "Last step",
    subtitle: "Tell us where you are and we'll confirm availability.",
  });
  return list;
}

function isStepValid(step: StepDef | undefined, input: QuoteInput): boolean {
  if (!step) return false;
  switch (step.id) {
    case "service":
      return input.service !== null;
    case "mode":
      return input.modeId !== null;
    case "amount": {
      if (!input.service || input.service === FLOOD_ID) return true;
      const pricing = getService(input.service).modes[0].pricing;
      // Mattresses need at least one mattress selected.
      if (pricing.kind === "sized")
        return Object.values(input.sizes).some((n) => n > 0);
      return true;
    }
    case "suburb":
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
  chooseService,
}: {
  step: StepDef;
  input: QuoteInput;
  set: <K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) => void;
  chooseService: (id: QuoteServiceId) => void;
}) {
  const service =
    input.service && input.service !== FLOOD_ID
      ? getService(input.service)
      : null;

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
            onChange={(v) => chooseService(v as QuoteServiceId)}
          />
        )}

        {step.id === "mode" && service && (
          <RadioGrid
            name="mode"
            cols={2}
            options={service.modes.map((m) => ({
              value: m.id,
              label: m.label,
              desc: m.desc,
            }))}
            value={input.modeId}
            onChange={(v) => set("modeId", v)}
          />
        )}

        {step.id === "amount" && service && (
          <AmountStep input={input} set={set} />
        )}

        {step.id === "suburb" && (
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
        )}
      </div>
    </div>
  );
}

function AmountStep({
  input,
  set,
}: {
  input: QuoteInput;
  set: <K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) => void;
}) {
  const service = getService(input.service as ServiceId);
  const mode =
    service.modes.find((m) => m.id === input.modeId) ?? service.modes[0];
  const pricing = mode.pricing;

  if (pricing.kind === "sized") {
    return (
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
        {pricing.sizes.map((size) => (
          <div
            key={size.id}
            className="flex items-center justify-between gap-3 p-3"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{size.label}</p>
              <p className="text-xs text-muted-foreground tabular-nums">
                {formatAud(size.price)} each
              </p>
            </div>
            <QuantityStepper
              value={input.sizes[size.id] ?? 0}
              min={0}
              max={pricing.maxPerSize}
              onChange={(v) => set("sizes", { ...input.sizes, [size.id]: v })}
              label={`${size.label} mattresses`}
            />
          </div>
        ))}
      </div>
    );
  }

  const min = pricing.kind === "inspection" ? 1 : pricing.minQty;
  const max = pricing.maxQty;

  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-foreground">
          How many {service.unit.plural}?
        </span>
        <QuantityStepper
          value={input.quantity}
          min={min}
          max={max}
          onChange={(v) => set("quantity", v)}
          label={service.unit.plural}
        />
      </div>
    </div>
  );
}

/* ----------------------------- result view ------------------------------- */

function ResultView({ input }: { input: QuoteInput }) {
  const result = estimateQuote(input);

  // Inspection-only work: never show a number we have not committed to.
  if (result.requiresInspection) {
    return (
      <div className="text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <ClipboardCheck className="h-7 w-7" />
        </span>
        <p className="mt-4 text-sm font-medium text-emerald-700">
          {result.serviceName}
        </p>
        <div className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Assessed on inspection
        </div>
        <p className="mx-auto mt-3 max-w-md text-pretty text-sm text-muted-foreground">
          {result.note}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <CallLink
            location="instant-quote-inspection"
            context={result.serviceName}
            showIcon={false}
            className={lightContactPillClass}
          >
            <Phone className="h-4 w-4" /> Call {site.phone}
          </CallLink>
          <WhatsAppLink
            location="instant-quote-inspection"
            context={result.serviceName}
            message={whatsappServiceMessage(result.serviceName)}
            showIcon={false}
            className={outlineContactPillClass}
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
          </WhatsAppLink>
        </div>
        <Button
          href={`/contact?service=${encodeURIComponent(result.serviceName)}`}
          variant="outline"
          className="mt-3"
        >
          <Calendar className="h-4 w-4" /> Book an inspection
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Inspections are free and come with a written quote before any work
          starts.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-emerald-700">Your fixed price</p>
      <div className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-5xl">
        {formatAud(result.total ?? 0)}
      </div>
      <p className="mx-auto mt-3 max-w-md text-pretty text-sm text-muted-foreground">
        {result.note}
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-sage-50/60 p-5 text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {result.serviceName} · {input.suburb}
        </p>
        <ul className="space-y-2 text-sm">
          {result.lines.map((li, i) => (
            <li key={i} className="flex items-center justify-between gap-4">
              <span className="text-ink-700">{li.label}</span>
              <span className="font-medium tabular-nums text-foreground">
                {formatAud(li.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          href={`/contact?service=${encodeURIComponent(result.serviceName)}`}
          variant="accent"
          size="lg"
        >
          <Calendar className="h-4 w-4" /> Book this clean
        </Button>
        <WhatsAppLink
          location="instant-quote-result"
          context={result.serviceName}
          message={whatsappServiceMessage(result.serviceName)}
          showIcon={false}
          className={outlineContactPillClass}
        >
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
        </WhatsAppLink>
        <CallLink
          location="instant-quote-result"
          context={result.serviceName}
          showIcon={false}
          className={outlineContactPillClass}
        >
          <Phone className="h-4 w-4" /> Call
        </CallLink>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        This is our fixed price for the job you described — confirmed before we
        start. No call-out fees.
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
