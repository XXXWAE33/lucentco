import type { Metadata } from "next";
import { ArrowRight, Leaf, ShieldCheck, Tag } from "lucide-react";
import { Section, Container, Button } from "@/components/ui";
import { ServiceShowcase } from "@/components/features";
import { CtaBand } from "@/components/home";

export const metadata: Metadata = {
  title: "Cleaning services in Brisbane",
  description:
    "Carpet, couch, mattress, curtain and blind cleaning across Brisbane, plus emergency flood and water extraction. Fixed prices, eco-friendly products, and a clear process on every job.",
  alternates: { canonical: "/services" },
};

const promises = [
  {
    icon: Tag,
    title: "Fixed prices",
    body: "Carpet, couch, mattress and curtain work is priced up front — no call-out fees.",
  },
  {
    icon: Leaf,
    title: "Non-toxic products",
    body: "Plant-based and pet-safe as standard, so there's no chemical smell left behind.",
  },
  {
    icon: ShieldCheck,
    title: "Told before, not after",
    body: "Anything we find — sun-perished fabric, existing damage — you hear about before we start.",
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-chrome">
      {/* Intro */}
      <section className="bg-eco-wash section-y">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our services</span>
            <h1 className="mt-4 text-fluid-h1 font-semibold">
              Specialist cleaning, done the{" "}
              <span className="text-gradient">Lucent way</span>
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              Carpets, couches, mattresses, curtains and blinds — plus emergency
              water extraction. Here&apos;s exactly what happens on site.
            </p>
          </div>

          {/* Compact icon-left rows on mobile; cards from sm. */}
          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-3">
            {promises.map((p) => (
              <div
                key={p.title}
                className="flex items-center gap-3.5 rounded-2xl border border-border bg-card/70 p-4 shadow-soft sm:block sm:rounded-3xl sm:p-5"
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

      {/* Showcase */}
      <Section>
        <ServiceShowcase />

        <div className="mt-14 text-center">
          <Button href="/pricing" variant="accent" size="lg">
            See full pricing <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Work out your exact price before you call.
          </p>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
