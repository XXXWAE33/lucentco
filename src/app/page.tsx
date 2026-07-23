import type { Metadata } from "next";
import {
  Hero,
  ServicesOverview,
  WhyLucent,
  HowItWorks,
  StatsBand,
  EcoImpact,
  Testimonials,
  ServiceArea,
  CtaBand,
} from "@/components/home";
import { Section, SectionHeading } from "@/components/ui";
import {
  InstantQuote,
  BuildYourClean,
  BookingTracker,
  BeforeAfter,
  CleanScore,
} from "@/components/features";

export const metadata: Metadata = {
  title: "Premium eco-cleaning in Brisbane",
  description:
    "Lucent Clean Co. delivers premium, eco-friendly residential and commercial cleaning across Brisbane — instant quotes, vetted local crews, and a bond-back guarantee.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyLucent />
      <HowItWorks />
      <Section id="instant-quote" className="bg-eco-wash">
        <SectionHeading
          eyebrow="Instant pricing"
          title="Get a price in under two minutes"
          intro="Answer a few quick questions and our AI gives you a transparent estimate on the spot — no waiting on a callback."
          align="center"
        />
        <div className="mt-12">
          <InstantQuote />
        </div>
      </Section>
      <Section id="build-your-clean">
        <SectionHeading
          eyebrow="Build your clean"
          title="Design your perfect clean, room by room"
          intro="Toggle the rooms you want done and watch your price update live. Mix and match until it's exactly right."
          align="center"
        />
        <div className="mt-12">
          <BuildYourClean />
        </div>
      </Section>
      <Section id="booking-tracker" className="bg-sage-50/60">
        <SectionHeading
          eyebrow="Always in the loop"
          title="Track your clean in real time"
          intro="From the moment you book to the final sparkle, follow every step live — know exactly when your cleaner is on the way."
          align="center"
        />
        <div className="mt-12">
          <BookingTracker />
        </div>
      </Section>
      <Section id="before-after">
        <SectionHeading
          eyebrow="See the difference"
          title="The Lucent transformation"
          intro="Drag to reveal the before and after across real Brisbane homes — every clean finished to our 60-point standard."
          align="center"
        />
        <div className="mt-12">
          <BeforeAfter />
        </div>
      </Section>
      <Section id="clean-score" className="bg-eco-wash">
        <SectionHeading
          eyebrow="AI Clean Score"
          title="Snap it. Score it. Sort it."
          intro="Upload a photo of any room and our AI rates its cleanliness, breaks it down by area, and recommends the right service — instantly."
          align="center"
        />
        <div className="mt-12">
          <CleanScore />
        </div>
      </Section>
      <StatsBand />
      <Testimonials />
      <EcoImpact />
      <ServiceArea />
      <CtaBand />
    </>
  );
}
