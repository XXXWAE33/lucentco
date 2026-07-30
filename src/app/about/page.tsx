import type { Metadata } from "next";
import { Leaf, Heart, ShieldCheck, MapPin } from "lucide-react";
import {
  Section,
  SectionHeading,
  Container,
  Button,
} from "@/components/ui";
import { CtaBand } from "@/components/home";
import { serviceSuburbs } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Lucent Clean Co. is a Brisbane-born fabric care company — carpet, upholstery, mattress and curtain cleaning built on non-toxic products, careful local technicians and fixed, honest pricing.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Leaf,
    title: "Eco from the start",
    body: "We never compromise on health. Every product is plant-based, non-toxic and biodegradable — better for your home and for the river city we love.",
  },
  {
    icon: Heart,
    title: "People first",
    body: "Our technicians are fairly paid, properly trained Brisbane locals. Careful people do careful work — and it shows in the finish.",
  },
  {
    icon: ShieldCheck,
    title: "Told before, not after",
    body: "We walk every job with you first and flag anything we find — sun-perished fabric, existing wear — before a machine is switched on. And the price you're quoted is the price you pay.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-chrome">
      {/* Intro */}
      <section className="bg-eco-wash section-y">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <MapPin className="h-4 w-4" /> Brisbane born &amp; based
            </span>
            <h1 className="mt-4 text-fluid-h1 font-semibold">
              Premium cleaning with a{" "}
              <span className="text-gradient">conscience</span>
            </h1>
            <p className="mt-4 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
              We started Lucent because Brisbane deserved fabric care that felt
              genuinely high-end — without the harsh chemicals, the no-shows, or
              the rushed once-over.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground sm:space-y-5 sm:text-lg">
            <h2 className="text-fluid-h2 font-semibold text-foreground">
              Our story
            </h2>
            <p>
              Lucent began with a simple frustration: carpet and upholstery
              cleaning was either cheap and careless or expensive and vague —
              and almost never honest about price. After one too many lounges
              ruined by the wrong method, we decided to build the service we
              wished existed.
            </p>
            <p>
              Today we care for carpets, couches, mattresses, curtains and
              blinds across New Farm, Bulimba, Paddington and beyond — with
              plant-based products, methods matched to the fabric in front of
              us, and fixed prices you can check before you ever pick up the
              phone.
            </p>
            <p>
              We&apos;re proudly Brisbane-based, and we treat every home like
              it&apos;s our own.
            </p>
            <Button href="/contact" variant="accent">
              Work with us
            </Button>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-4xl border border-white/60 bg-gradient-to-br from-mint-200 via-mint-100 to-emerald-200 shadow-lifted">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute left-[18%] top-[20%] h-28 w-28 rounded-full bg-white/40 blur-md" />
              <div className="absolute bottom-[24%] right-[22%] h-32 w-32 rounded-full bg-emerald-300/40 blur-lg" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/70 bg-white/40 backdrop-blur-md">
                <Leaf className="h-11 w-11 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-sage-50/60">
        <SectionHeading
          eyebrow="What we stand for"
          title="The principles behind every clean"
          align="center"
        />
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {v.title}
              </h3>
              <p className="mt-2 text-pretty text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/*
        StatsBand deliberately removed: it published invented figures
        (12k cleans, 600+ reviews, 98% bond-back). Real, verifiable numbers
        live in the homepage TrustStrip once the client supplies them.
      */}

      {/* Local */}
      <Section>
        <div className="rounded-4xl border border-border bg-mint-50/70 p-8 text-center shadow-soft sm:p-12">
          <span className="eyebrow justify-center">
            <MapPin className="h-4 w-4" /> Local to the core
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-fluid-h3 font-semibold text-foreground">
            Proudly cleaning across Brisbane&apos;s best suburbs
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-pretty text-muted-foreground">
            {serviceSuburbs.join(" · ")} &amp; surrounding areas.
          </p>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
