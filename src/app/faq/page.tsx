import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import { Section, Container, Button } from "@/components/ui";
import { FaqBrowser } from "@/components/features";
import { CtaBand } from "@/components/home";
import { CallLink } from "@/components/layout";
import { faqs } from "@/config/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers on pricing, booking, products and guarantees for carpet, couch, mattress, curtain and blind cleaning across Brisbane.",
  alternates: { canonical: "/faq" },
};

/**
 * FAQPage structured data covering the FULL list.
 *
 * Google requires the markup to match the visible content. Every question here
 * is rendered on this page — the search/filter narrows what's shown but the
 * complete set is in the DOM, so the markup stays truthful.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <main className="pt-chrome">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-eco-wash section-y">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Good to know</span>
            <h1 className="mt-4 text-fluid-h1 font-semibold">
              Frequently asked <span className="text-gradient">questions</span>
            </h1>
            <p className="mt-4 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
              Straight answers on pricing, products and how a job actually runs.
              Can&apos;t find yours? Ask us — we answer within one business hour.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqBrowser />

          {/* Escape hatch for anything unanswered. */}
          <div className="mt-10 flex flex-col items-center gap-4 rounded-card border border-border bg-card p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                Still not sure?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us what you need and we&apos;ll tell you straight.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
              <CallLink
                location="faq-page"
                showIcon={false}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-btn border border-sage-300 px-5 text-sm font-semibold text-sage-800 transition-colors hover:bg-sage-50"
              >
                <Phone className="h-4 w-4" /> {site.phone}
              </CallLink>
              <Button href="/contact" variant="accent">
                Send an enquiry <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
