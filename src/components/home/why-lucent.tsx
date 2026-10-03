import { ArrowRight, ShieldCheck, Tag } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeading, Button } from "@/components/ui";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion";
import { services } from "@/config/pricing";
import { serviceIcons } from "@/components/features/service-showcase/service-icons";

/**
 * Two-column trust cards + a service pill row. Mirrors the reference's
 * "Trade on your terms" block — two feature cards followed by a row of
 * category pills.
 *
 * Every claim here is one already substantiated elsewhere on the site
 * (pricing.ts, the About page values, the "Book with confidence" pills) —
 * repeating a verified fact across sections is reinforcement, not invention.
 * This deliberately does NOT reuse the old `features` array in
 * `src/lib/content.ts`, which still carries an unverified "bond-back
 * guarantee" and "60-point check".
 */
const cards = [
  {
    icon: Tag,
    title: "Priced before we arrive",
    body: "Carpet, couch, mattress and curtain rates are published on /pricing — the figure you see is the figure you're charged. No call-out fee, no on-the-day surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Told before, not after",
    body: "We walk the job with you first and flag anything we find — existing wear, sun-perished fabric — before a machine is switched on.",
  },
];

export function WhyLucent() {
  return (
    <Section className="bg-sage-50/60">
      <SectionHeading
        eyebrow="Why Velora"
        title="Fixed prices. No surprises."
        intro="The two things every job is built around."
        align="center"
      />

      <RevealGroup className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2">
        {cards.map((c) => (
          <RevealItem
            key={c.title}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <c.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              {c.title}
            </h3>
            <p className="mt-2 text-pretty text-sm text-muted-foreground sm:text-base">
              {c.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Service pill row — every service, one tap to its price. */}
      <Reveal delay={0.1} className="mt-6 sm:mt-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon] ?? serviceIcons.carpet;
            return (
              <Link
                key={s.id}
                href={`/pricing#${s.id}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-ink-700 shadow-soft transition-colors hover:border-sage-300 hover:bg-sage-50 hover:text-sage-900"
              >
                <Icon className="h-4 w-4 text-emerald-600" />
                {s.name}
              </Link>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-7 flex justify-center sm:mt-8">
        <Button href="/pricing" variant="outline">
          See all prices <ArrowRight className="h-4 w-4" />
        </Button>
      </Reveal>
    </Section>
  );
}
