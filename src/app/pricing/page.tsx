import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { PageHero } from "@/components/layout";
import { serviceIcons } from "@/components/features/service-showcase/service-icons";
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

/** Jump bar — anchors set by ServicePriceCard / InspectionPanel. */
const jumpLinks = [
  { id: "carpet", label: "Carpet", icon: "carpet" },
  { id: "couch", label: "Couch", icon: "couch" },
  { id: "mattress", label: "Mattress", icon: "mattress" },
  { id: "curtain", label: "Curtains", icon: "curtain" },
  { id: "blind", label: "Blinds", icon: "blind" },
  { id: "flood-damage", label: "Water damage", icon: "flood" },
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
      {/* ── Branded intro band ────────────────────────────────────── */}
      <PageHero
        eyebrow="Pricing"
        title="Work out your price"
        highlight="before you call"
        intro="Adjust the rooms, seats or curtains below and the price updates as you go. No forms, no waiting on a callback."
      >
          <ul className="mx-auto mt-8 grid max-w-3xl gap-2.5 sm:grid-cols-3">
            {promises.map((p) => (
              <li
                key={p.title}
                className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-inset ring-white/10"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                  <p.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-sm font-semibold text-white">{p.title}</h2>
                  <p className="mt-0.5 text-pretty text-xs leading-relaxed text-mint-200/70">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
      </PageHero>

      {/* ── Jump bar — overlaps the band, then sticks under the header ── */}
      <div className="sticky top-[calc(var(--announce-h)+var(--header-h))] z-30 -mt-8">
        <Container>
          <nav
            aria-label="Jump to a service"
            className="mx-auto max-w-4xl rounded-2xl border border-border bg-background/90 p-1.5 shadow-card backdrop-blur-xl"
          >
            <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {jumpLinks.map((j) => {
                const Icon = serviceIcons[j.icon];
                return (
                  <li key={j.id} className="flex-1">
                    <a
                      href={`#${j.id}`}
                      className="flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 text-sm font-medium text-ink-600 transition-colors hover:bg-gold-50 hover:text-gold-700"
                    >
                      {Icon && <Icon className="h-4 w-4 text-gold-500" />}
                      {j.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </div>

      {/* ── Interactive pricing ──────────────────────────────────────── */}
      <section className="pb-16 pt-10 sm:pb-24 sm:pt-14">
        <Container>
          <ServicePricingSection />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Need several services at once?{" "}
            <Link
              className="font-semibold text-gold-600 underline decoration-gold-300 underline-offset-4 hover:decoration-gold-600"
              href="/#build-your-clean"
            >
              Build a combined quote
            </Link>{" "}
            or{" "}
            <Link
              className="font-semibold text-gold-600 underline decoration-gold-300 underline-offset-4 hover:decoration-gold-600"
              href="/#instant-quote"
            >
              try the instant quote tool
            </Link>
            .
          </p>
        </Container>
      </section>

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
