"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { serviceSuburbs, site } from "@/lib/site";
import { inspectionServices, services } from "@/config/pricing";
import { CallLink } from "@/components/layout";

/** Sourced from the pricing config so the form can never drift from the rate card. */
const serviceTypes = [
  ...services.map((s) => s.name),
  ...inspectionServices.map((s) => s.name),
  "Multiple services",
  "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

/* text-base (16px) is deliberate: anything smaller makes iOS zoom the page
   when an input is focused. */
const fieldClass =
  "h-12 w-full rounded-2xl border border-border bg-background px-4 text-base text-foreground placeholder:text-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-rose-400 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-rose-300";

/** Same rules the API enforces — mirrored here so errors appear inline. */
function validateField(field: FieldName, value: string): string | null {
  const v = value.trim();
  switch (field) {
    case "name":
      return v ? null : "Please tell us your name.";
    case "email":
      if (!v) return "We need an email to reply to.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? null
        : "That email address doesn't look right.";
    case "message":
      return v ? null : "Tell us a little about the job.";
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  /** Validate one field on blur — quiet until the visitor leaves the field. */
  const onBlurValidate = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as FieldName;
    if (field !== "name" && field !== "email" && field !== "message") return;
    setFieldErrors((prev) => ({
      ...prev,
      [field]: validateField(field, e.target.value) ?? undefined,
    }));
  };

  // Deep links from the pricing cards and quote tools prefill the enquiry.
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service");
  const presetService = serviceTypes.includes(requestedService ?? "")
    ? (requestedService as string)
    : "";
  const presetDetails = searchParams.get("details");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Inline validation before anything leaves the browser.
    const errs: FieldErrors = {};
    (["name", "email", "message"] as const).forEach((f) => {
      const msg = validateField(f, data[f] ?? "");
      if (msg) errs[f] = msg;
    });
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-emerald-200 bg-emerald-50/60 p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
          Thanks — we&apos;re on it!
        </h3>
        <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
          Your enquiry has landed with our Brisbane team. We&apos;ll be in touch
          within one business hour during opening times.
        </p>

        {/*
          No invented reference numbers or fake tracking links here — the API
          doesn't issue references, so the form doesn't pretend it does. If it
          is urgent, the honest next step is the phone.
        */}
        <CallLink
          location="contact-form-success"
          showIcon={false}
          className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-emerald-300 bg-white px-6 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
        >
          <Phone className="h-4 w-4" /> Urgent? Call {site.phone}
        </CallLink>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 inline-flex min-h-[44px] items-center text-sm font-medium text-sage-700 hover:text-sage-900"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
            onBlur={onBlurValidate}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          <FieldError id="name-error" message={fieldErrors.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={fieldClass}
            onBlur={onBlurValidate}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={fieldErrors.email} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="0400 000 000" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="suburb" className="mb-1.5 block text-sm font-medium text-foreground">
            Suburb
          </label>
          <select id="suburb" name="suburb" defaultValue="" className={fieldClass}>
            <option value="">Select your suburb…</option>
            {serviceSuburbs.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="Other">Other / not listed</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-foreground">
          What do you need?
        </label>
        <select
          id="service"
          name="service"
          defaultValue={presetService}
          className={fieldClass}
        >
          <option value="">Select a service…</option>
          {serviceTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          defaultValue={presetDetails ? `${presetDetails}\n\n` : ""}
          placeholder="Tell us about your home and what you're after…"
          onBlur={onBlurValidate}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-rose-400 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-rose-300"
        />
        <FieldError id="message-error" message={fieldErrors.message} />
      </div>

      {status === "error" && error && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-rose-600">
          <AlertCircle className="h-4 w-4" /> {error}
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={status === "submitting"}
        className={cn("mt-6 w-full sm:w-auto")}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send enquiry
          </>
        )}
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        We&apos;ll only use your details to respond to your enquiry.
      </p>
    </form>
  );
}

/** Inline field error — announced politely, never shouted. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {message}
    </p>
  );
}
