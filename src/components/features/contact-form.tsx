"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { serviceSuburbs } from "@/lib/site";

const serviceTypes = [
  "Residential clean",
  "End of lease / bond",
  "Specialty (carpet, windows…)",
  "Commercial / office",
  "Airbnb turnover",
  "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "h-12 w-full rounded-2xl border border-border bg-background px-4 text-foreground placeholder:text-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setReference(`LCC-${Math.floor(1000 + Math.random() * 9000)}`);
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

        {/* Reference + tracking link */}
        <div className="mt-5 w-full max-w-sm rounded-2xl border border-emerald-200 bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Your reference
          </p>
          <p className="font-display text-lg font-semibold text-foreground">
            {reference}
          </p>
          <Link
            href={`/track/${reference}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
          >
            <MapPin className="h-4 w-4" /> Track your booking
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-sage-700 hover:text-sage-900"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name <span className="text-rose-500">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email <span className="text-rose-500">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={fieldClass} />
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
        <select id="service" name="service" defaultValue="" className={fieldClass}>
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
          placeholder="Tell us about your home and what you're after…"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
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
