import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { FaqBrowser } from "@/components/features";
import { CtaBand } from "@/components/home";
import { CallLink, PageHero, VeloraRing } from "@/components/layout";
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

      <PageHero
        eyebrow="Good to know"
        title="Frequently asked"
        highlight="questions"
        intro="Straight answers on pricing, products and how a job actually runs. Can't find yours? Ask us — we answer within one business hour."
      />

      {/* Search + answers, pulled up over the band. */}
      <Container className="relative -mt-20 pb-16 sm:-mt-24 sm:pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-lifted sm:p-6">
            <FaqBrowser />
          </div>

          {/* Escape hatch for anything unanswered. */}
          <div className="relative mt-6 overflow-hidden rounded-3xl bg-sage-900 p-6 text-white ring-1 ring-inset ring-gold-400/20 sm:p-8">
            <VeloraRing
              strokeWidth={0.5}
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 text-gold-400/20"
            />
            <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="font-display text-xl font-semibold">Still not sure?</p>
                <p className="mt-1 text-sm text-mint-100/75">
                  Tell us what you need and we&apos;ll tell you straight.
                </p>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
                <CallLink
                  location="faq-page"
                  showIcon={false}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/[0.07] px-5 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/[0.12]"
                >
                  <Phone className="h-4 w-4 text-gold-300" /> {site.phone}
                </CallLink>
                <Link
                  href="/contact"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white pl-5 pr-1.5 text-sm font-semibold text-sage-900 transition-colors hover:bg-gold-50"
                >
                  Send an enquiry
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <CtaBand />
    </main>
  );
}
