import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import {
  Section,
  SectionHeading,
  Container,
  Button,
} from "@/components/ui";
import { PricingToggle } from "@/components/features";
import { CtaBand } from "@/components/home";
import { specialtyItemOptions } from "@/lib/quote";
import { faqs } from "@/lib/pages-content";
import { formatAud } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent cleaning prices for Brisbane homes — one-off or recurring, with up to 18% off recurring cleans. No call-out fees, no surprises.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="pt-16 lg:pt-18">
      {/* Intro + toggle */}
      <section className="bg-eco-wash section-y">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow">Pricing</span>
            <h1 className="mt-4 text-fluid-h1 font-semibold">
              Honest pricing,{" "}
              <span className="text-gradient">no surprises</span>
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              Transparent rates with no call-out fees. Choose a one-off clean or
              save up to 18% with a recurring schedule.
            </p>
          </div>
          <PricingToggle />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Prices are indicative for typical homes. Want an exact figure?{" "}
            <Link className="font-medium text-emerald-700 underline-offset-4 hover:underline" href="/#instant-quote">
              Try the instant quote tool
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* Specialty pricing */}
      <Section>
        <SectionHeading
          eyebrow="Specialty services"
          title="Add-on & specialty pricing"
          intro="Book these on their own or add them to any clean."
          align="center"
        />
        <div className="mx-auto mt-12 max-w-2xl divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          {specialtyItemOptions.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <span className="flex items-center gap-3 text-ink-800">
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                {item.label}
              </span>
              <span className="font-semibold text-foreground">
                from {formatAud(item.price)}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-sage-50/60">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently asked questions"
          align="center"
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-foreground">
                {f.q}
                <span className="ml-2 shrink-0 text-emerald-600 transition-transform group-open:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-pretty text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/contact" variant="accent">
            Still have questions? Talk to us <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
