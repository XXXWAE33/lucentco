import type { Metadata } from "next";
import {
  Atmosphere,
  Hero,
  BookWithConfidence,
  ServicesOverview,
  WhyLucent,
  HowItWorks,
  QuoteJourney,
  ContentCards,
  Testimonials,
  ServiceArea,
  CtaBand,
} from "@/components/home";
import { Section, SectionHeading } from "@/components/ui";
import { QuoteTabs } from "@/components/features";

export const metadata: Metadata = {
  title: "Carpet & upholstery cleaning in Brisbane",
  description:
    "Specialist carpet, couch, mattress and curtain cleaning across Brisbane. Fixed prices you can check online, non-toxic products, and deodoriser included on every couch clean.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/*
        1 + 2 share ONE atmospheric wash.

        `<Atmosphere>` is positioned against this wrapper, not against either
        section, so the gradient crosses the section boundary and nothing paints
        at that edge — which is what removes the horizontal banding. Neither
        child may set its own background-color.

        `isolate` creates the stacking context the z-layers are declared in.
        `overflow-x-clip` (not `hidden`) contains the hero visual's right-edge
        bleed without creating a scroll container, and leaves overflow-y visible
        so the visual can still crop past the top of the viewport.
      */}
      <div className="relative isolate overflow-x-clip">
        <Atmosphere />
        <Hero />
        <BookWithConfidence />
      </div>

      {/* 3 — Services */}
      <ServicesOverview />

      {/* 3b — Why Lucent (verified-only trust cards + service pills) */}
      <WhyLucent />

      {/*
        4 — Get a price. ONE section, two tools behind an explicit choice.

        This was previously two stacked sections (Instant pricing, then Build
        your quote) with near-identical framing — which read as duplication
        rather than choice. `QuoteTabs` keeps both tools but makes the visitor
        pick one, and drives the tab off the URL hash so the old
        `#instant-quote` / `#build-your-clean` deep links still land on the
        right tool.

        The `InstantQuote` wizard is still exported and unchanged; the selector
        replaced it here because it answers the same question in three taps
        rather than four screens.
      */}
      <Section id="get-a-quote" className="bg-eco-wash">
        <SectionHeading
          eyebrow="Get your price"
          title="No forms. No waiting on a callback."
          intro="Price one service, or combine several into a single total — whichever suits the job."
          align="center"
        />
        <div className="mt-8 sm:mt-12">
          <QuoteTabs />
        </div>
      </Section>

      {/* 5 — How we work */}
      <HowItWorks />

      {/* 5b — Three routes to a price, staged-card journey */}
      <QuoteJourney />

      {/* 5c — Editorial content cards (1 wide + 2 narrow) */}
      <ContentCards />

      {/* 6 — Testimonials */}
      <Testimonials />

      {/* 7 — Service area */}
      <ServiceArea />

      {/* 8 — Final CTA (WhatsApp + call) */}
      <CtaBand />
    </>
  );
}

