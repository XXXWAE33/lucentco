import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading, Badge } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/motion";
import { serviceGroups } from "@/lib/content";
import { formatAud } from "@/lib/utils";

export function ServicesOverview() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we clean"
        title="One team for every kind of clean"
        intro="From a weekly home refresh to a full commercial contract, every service uses the same eco products and the same 60-point Lucent finish."
        align="center"
      />

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {serviceGroups.map((group) => (
          <RevealItem key={group.id} className="h-full">
          <Link
            href={`/services#${group.id}`}
            className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lifted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {group.name}
                </h3>
                <p className="mt-1 text-sm text-emerald-700">{group.tagline}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
            </div>

            <p className="mt-4 text-sm text-pretty text-muted-foreground">
              {group.blurb}
            </p>

            <ul className="mt-5 space-y-2.5 text-sm">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-ink-700">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-border pt-4">
              {group.from > 0 ? (
                <p className="text-sm text-muted-foreground">
                  From{" "}
                  <span className="font-semibold text-foreground">
                    {formatAud(group.from)}
                  </span>
                </p>
              ) : (
                <Badge tone="sage">Custom quote</Badge>
              )}
            </div>
          </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
