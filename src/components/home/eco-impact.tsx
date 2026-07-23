import { Leaf, Droplets, Recycle, FlaskConical } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { CountUp, RevealGroup, RevealItem } from "@/components/motion";
import { ecoImpact } from "@/lib/content";

const icons = [Droplets, Recycle, FlaskConical];

export function EcoImpact() {
  return (
    <Section className="bg-eco-wash">
      <SectionHeading
        eyebrow={
          <>
            <Leaf className="h-4 w-4" /> Cleaner for the planet
          </>
        }
        title="The impact of choosing eco"
        intro="Every Lucent clean swaps harsh chemicals for plant-based products and water-wise methods. Here's what our crews have saved Brisbane so far this year."
        align="center"
      />

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {ecoImpact.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <RevealItem
              key={item.label}
              className="rounded-3xl border border-emerald-100 bg-card p-8 text-center shadow-soft"
            >
              <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Icon className="h-6 w-6" />
              </span>
              <div className="mt-4 font-display text-4xl font-semibold text-foreground sm:text-5xl">
                <CountUp
                  value={item.value}
                  duration={2}
                  suffix={item.unit ? ` ${item.unit}` : ""}
                />
              </div>
              <p className="mt-2 text-pretty text-muted-foreground">
                {item.label}
              </p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
