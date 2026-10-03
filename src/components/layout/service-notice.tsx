import Link from "next/link";
import { ClipboardCheck, Leaf, ScanSearch, Tag, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * "Good to know" — the genuinely useful small print, as four cards.
 *
 * Every statement below already appears elsewhere on the site (/pricing,
 * /terms, the service process copy) — this restates it, it does not invent it.
 * Sits on a light surface so it doesn't merge into the dark footer below.
 */
const NOTES: { icon: LucideIcon; title: string; body: React.ReactNode }[] = [
  {
    icon: Tag,
    title: "Fixed pricing",
    body: (
      <>
        Carpet, couch, mattress and curtain cleaning are charged at the rates
        published on our{" "}
        <Link
          href="/pricing"
          className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:decoration-emerald-700"
        >
          pricing page
        </Link>
        , for the quantities you select. We confirm the figure with you before
        any work begins, and nothing is added on the day. There is no call-out
        fee.
      </>
    ),
  },
  {
    icon: ClipboardCheck,
    title: "Quoted on inspection",
    body: (
      <>
        Blind cleaning and flood or water-extraction work are not priced online.
        Material, size, condition and — for water damage — how long the water
        has been sitting all materially change the job. We inspect first and
        give you the scope in writing. A minimum service charge applies to
        blind work.
      </>
    ),
  },
  {
    icon: ScanSearch,
    title: "Before we start",
    body: (
      <>
        Methods are matched to the fabric or material in front of us. We walk
        the job with you first and flag what we find — existing wear,
        sun-perished fabric, staining that may not fully release — before a
        machine is switched on. Where something can&apos;t be cleaned safely,
        we say so rather than proceed.
      </>
    ),
  },
  {
    icon: Leaf,
    title: "Products",
    body: (
      <>
        We use plant-based, non-toxic products as standard. Deodoriser is
        included on every couch clean at no additional cost.
      </>
    ),
  },
];

export function ServiceNotice() {
  return (
    <section className="bg-sage-50/70">
      <Container className="py-section-sm">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-emerald-700">
              The fine print
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Good to know
            </h2>
          </div>

          <ul className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-2">
            {NOTES.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink-600">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Full{" "}
            <Link href="/terms" className="font-medium text-sage-800 underline underline-offset-4">
              terms of service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-sage-800 underline underline-offset-4">
              privacy policy
            </Link>
            . Questions? {site.phone}
          </p>
        </div>
      </Container>
    </section>
  );
}
