import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, MapPin, ShieldCheck, Tag } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { PageHero, VeloraRing, VeloraWordmark } from "@/components/layout";
import { CtaBand } from "@/components/home";
import { serviceSuburbs } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Velora Cleaning Brisbane is a Brisbane-born fabric care company — carpet, upholstery, mattress and curtain cleaning built on non-toxic products, careful local technicians and fixed, honest pricing.",
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

/** Facts already stated elsewhere on the site — nothing new is claimed. */
const storyFacts = [
  { icon: MapPin, label: "Brisbane-based, local technicians" },
  { icon: Leaf, label: "Plant-based, non-toxic products" },
  { icon: Tag, label: "Fixed prices, checked before you call" },
];

export default function AboutPage() {
  return (
    <main className="pt-chrome">
      <PageHero
        eyebrow="Brisbane born & based"
        title="Premium cleaning with a"
        highlight="conscience"
        intro="We started Velora because Brisbane deserved fabric care that felt genuinely high-end — without the harsh chemicals, the no-shows, or the rushed once-over."
        className="pb-16 sm:pb-20"
      />

      {/* Story */}
      <Section>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-lg">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-600">
              Our story
            </p>
            <h2 className="mt-3 text-fluid-h2 font-semibold text-foreground">
              Built on the service we wished existed
            </h2>
            <div className="mt-5 space-y-4 border-l-2 border-gold-300 pl-5 sm:space-y-5">
              <p>
                Velora began with a simple frustration: carpet and upholstery
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
              <p className="font-medium text-foreground">
                We&apos;re proudly Brisbane-based, and we treat every home like
                it&apos;s our own.
              </p>
            </div>
            <Link
              href="/contact"
              className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-sage-900 pl-6 pr-1.5 text-sm font-semibold text-white transition-colors hover:bg-sage-800"
            >
              Work with us
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-sage-900 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Brand panel — stands in until real team photography exists. */}
          <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-4xl bg-sage-900 p-7 text-white shadow-lifted ring-1 ring-inset ring-gold-400/20 sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <VeloraRing strokeWidth={0.35} className="absolute -right-24 -top-24 h-96 w-96 text-gold-400/30" />
              <VeloraRing strokeWidth={0.5} className="absolute -bottom-20 -left-16 h-64 w-64 text-gold-400/20" />
              <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
            </div>
            <p className="relative text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
              Brisbane born &amp; based
            </p>
            <VeloraWordmark
              tagline
              title={null}
              strokeWidth={6}
              className="relative mx-auto w-[82%] text-gold-400"
            />
            <ul className="relative grid gap-2.5">
              {storyFacts.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 text-sm ring-1 ring-inset ring-white/10"
                >
                  <Icon className="h-4 w-4 shrink-0 text-gold-300" />
                  {label}
                </li>
              ))}
            </ul>
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
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 text-gold-600 ring-1 ring-inset ring-gold-200 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-white group-hover:ring-gold-400">
                  <v.icon className="h-5 w-5" />
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-5xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_theme(colors.gold.300)]"
                >
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-foreground">
                {v.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {v.body}
              </p>
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
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-4xl border border-gold-200 bg-gradient-to-br from-gold-50 via-white to-sage-50 p-7 text-center shadow-soft sm:p-12">
          <VeloraRing strokeWidth={0.4} className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 text-gold-300/60" />
          <p className="relative inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-600">
            <MapPin className="h-4 w-4" /> Local to the core
          </p>
          <h2 className="relative mx-auto mt-3 max-w-2xl text-fluid-h3 font-semibold text-foreground">
            Proudly cleaning across Brisbane&apos;s best suburbs
          </h2>
          <ul className="relative mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
            {serviceSuburbs.map((s) => (
              <li
                key={s}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-sage-800 shadow-soft ring-1 ring-inset ring-gold-200 sm:text-sm"
              >
                {s}
              </li>
            ))}
            <li className="rounded-full bg-sage-900 px-3 py-1.5 text-xs font-medium text-gold-300 sm:text-sm">
              &amp; surrounding areas
            </li>
          </ul>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
