import type { Metadata } from "next";
import { Home, Key, Sparkles, Building2, Check, ArrowRight } from "lucide-react";
import {
  Section,
  SectionHeading,
  Container,
  Button,
  Badge,
} from "@/components/ui";
import { CtaBand } from "@/components/home";
import { serviceCatalog, addonServices } from "@/lib/pages-content";
import { formatAud } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cleaning services in Brisbane",
  description:
    "Residential, end-of-lease, specialty and commercial cleaning across Brisbane — eco-friendly products, vetted local crews and a bond-back guarantee.",
  alternates: { canonical: "/services" },
};

const icons = [Home, Key, Sparkles, Building2];

export default function ServicesPage() {
  return (
    <main className="pt-16 lg:pt-18">
      {/* Intro */}
      <section className="bg-eco-wash section-y">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our services</span>
            <h1 className="mt-4 text-fluid-h1 font-semibold">
              Every kind of clean, done the{" "}
              <span className="text-gradient">Lucent way</span>
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              From a weekly home refresh to a full commercial contract, every
              service uses non-toxic products, vetted local crews and our 60-point
              quality check.
            </p>
          </div>
        </Container>
      </section>

      {/* Service categories */}
      {serviceCatalog.map((cat, i) => {
        const Icon = icons[i % icons.length];
        return (
          <Section key={cat.id} id={cat.id} className={i % 2 === 1 ? "bg-sage-50/60" : ""}>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-fluid-h3 font-semibold text-foreground">
                  {cat.name}
                </h2>
                <p className="mt-1 font-medium text-emerald-700">{cat.tagline}</p>
                <p className="mt-4 text-pretty text-muted-foreground">
                  {cat.intro}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  {cat.from > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      From{" "}
                      <span className="text-lg font-semibold text-foreground">
                        {formatAud(cat.from)}
                      </span>
                    </p>
                  ) : (
                    <Badge tone="sage">Custom quote</Badge>
                  )}
                  <Button href="/contact" variant="accent" size="sm">
                    Get a quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {cat.services.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-3xl border border-border bg-card p-6 shadow-soft"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 shrink-0 text-emerald-600" />
                      <h3 className="font-display font-semibold text-foreground">
                        {s.name}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        );
      })}

      {/* Add-ons */}
      <Section className="bg-sage-900 text-mint-100">
        <SectionHeading
          eyebrow="Add-ons & extras"
          title={<span className="text-white">Make it exactly yours</span>}
          intro={
            <span className="text-mint-200/80">
              Tailor any clean with optional extras — and rest easy knowing the
              eco basics are always included.
            </span>
          }
          align="center"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {addonServices.map((a) => (
            <div
              key={a.name}
              className="rounded-3xl border border-sage-800/60 bg-sage-800/40 p-6"
            >
              <h3 className="font-display font-semibold text-white">{a.name}</h3>
              <p className="mt-2 text-sm text-pretty text-mint-200/80">{a.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
