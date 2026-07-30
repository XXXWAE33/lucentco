import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { Section, SectionHeading, Container, Button } from "@/components/ui";
import { ServicePricingSection, FaqAccordion } from "@/components/features";
import { CtaBand } from "@/components/home";
/*
 * Pricing-relevant questions only, drawn from the shared FAQ config so this
 * page and /faq can never disagree. The old local `faqs` array in
 * `lib/pages-content.ts` is no longer used here.
 */
import { faqs as allFaqs } from "@/config/faq";

const faqs = allFaqs.filter((f) => f.category === "Pricing" || f.id === "included");

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Fixed prices for carpet, couch, mattress and curtain cleaning in Brisbane. Adjust the quantities to see your exact price — no call-out fees, no surprises.",
  alternates: { canonical: "/pricing" },
};

const promises = [
  {
    icon: Tag,
    title: "Fixed, not 'from'",
    body: "The price you see is the price you pay for the job you describe.",
  },
  {
    icon: ShieldCheck,
    title: "No call-out fees",
    body: "We never charge to turn up, quote or assess a job.",
  },
  {
    icon: Sparkles,
    title: "Eco products included",
    body: "Non-toxic, pet-safe products come standard on every service.",
  },
];

/** FAQPage structured data — mirrors the visible FAQ list exactly. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <main className="pt-chrome">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Intro */}
      <section className="bg-eco-wash section-y">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Pricing</span>
            <h1 className="mt-4 text-fluid-h1 font-semibold">
              Work out your price{" "}
              <span className="text-gradient">before you call</span>
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              Adjust the rooms, seats or curtains below and the price updates as
              you go. No forms, no waiting on a callback.
            </p>
          </div>

          {/* Compact icon-left rows on mobile; centred cards from sm. */}
          <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-3">
            {promises.map((p) => (
              <div
                key={p.title}
                className="flex items-center gap-3.5 rounded-2xl border border-border bg-card/70 p-4 text-left shadow-soft sm:block sm:rounded-3xl sm:p-5 sm:text-center"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <p.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-sm font-semibold text-foreground sm:mt-3">
                    {p.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-pretty text-muted-foreground sm:mt-1">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Interactive pricing */}
      <Section>
        <ServicePricingSection />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Need several services at once?{" "}
          <Link
            className="font-medium text-emerald-700 underline-offset-4 hover:underline"
            href="/#build-your-clean"
          >
            Build a combined quote
          </Link>{" "}
          or{" "}
          <Link
            className="font-medium text-emerald-700 underline-offset-4 hover:underline"
            href="/#instant-quote"
          >
            try the instant quote tool
          </Link>
          .
        </p>
      </Section>

      {/* FAQ */}
      <Section className="bg-sage-50/60">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently asked questions"
          align="center"
        />
        {/* Shared accordion — proper button/aria-expanded semantics, replacing
            the previous <details> markup so behaviour matches /faq exactly. */}
        <div className="mx-auto mt-8 max-w-3xl sm:mt-12">
          <FaqAccordion items={faqs} />
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
          <Button href="/faq" variant="outline">
            See all questions
          </Button>
          <Button href="/contact" variant="accent">
            Talk to us <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
