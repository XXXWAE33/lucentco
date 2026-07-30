import Link from "next/link";
import { ArrowRight, Check, Layers } from "lucide-react";
import { Section, SectionHeading, Badge } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/motion";
import { services, startingPrice } from "@/config/pricing";
import { formatAud } from "@/lib/utils";
import { serviceIcons } from "@/components/features/service-showcase/service-icons";

export function ServicesOverview() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we clean"
        title="Specialist cleaning, priced up front"
        intro="Carpets, couches, mattresses and curtains — fixed prices you can check before you call, using non-toxic products and the same Lucent finish every time."
        align="center"
      />

      <RevealGroup className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon] ?? Layers;
          const from = startingPrice(service.id);
          return (
            <RevealItem key={service.id} className="h-full">
              <Link
                href={`/pricing#${service.id}`}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lifted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-1 text-sm text-emerald-700">
                  {service.tagline}
                </p>

                <p className="mt-3 text-sm text-pretty text-muted-foreground">
                  {service.blurb}
                </p>

                <ul className="mt-5 space-y-2.5 text-sm">
                  {service.inclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-ink-700"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-border pt-4">
                  {from !== null ? (
                    <p className="text-sm text-muted-foreground">
                      From{" "}
                      <span className="font-semibold text-foreground">
                        {formatAud(from)}
                      </span>
                    </p>
                  ) : (
                    <Badge tone="sage">Assessed on inspection</Badge>
                  )}
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
