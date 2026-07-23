import type { Metadata } from "next";
import { Leaf, Heart, ShieldCheck, MapPin } from "lucide-react";
import {
  Section,
  SectionHeading,
  Container,
  Button,
} from "@/components/ui";
import { StatsBand, CtaBand } from "@/components/home";
import { serviceSuburbs } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Lucent Clean Co. is a Brisbane-born eco-cleaning company built on non-toxic products, vetted local cleaners and a genuinely high-end finish.",
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
    body: "Our cleaners are fairly paid, properly trained Brisbane locals. Happy crews do better work — and you see the same faces each visit.",
  },
  {
    icon: ShieldCheck,
    title: "Standards that hold",
    body: "A 60-point quality check on every clean and a bond-back guarantee on every exit. 'Good enough' was never the goal.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-16 lg:pt-18">
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
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              We started Lucent because Brisbane deserved a cleaning service that
              felt genuinely high-end — without the harsh chemicals, the no-shows,
              or the rushed once-over.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            <h2 className="text-fluid-h2 font-semibold text-foreground">
              Our story
            </h2>
            <p>
              Lucent began with a simple frustration: every cleaner was either
              affordable or actually good — rarely both, and almost never
              eco-friendly. After one too many homes left smelling of bleach, we
              decided to build the service we wished existed.
            </p>
            <p>
              Today we clean hundreds of homes and businesses across New Farm,
              Bulimba, Paddington and beyond — with plant-based products, vetted
              local crews, and a finish you can genuinely feel underfoot.
            </p>
            <p>
              We&apos;re proudly Brisbane-based, and we treat every space like
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
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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

      <StatsBand />

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
