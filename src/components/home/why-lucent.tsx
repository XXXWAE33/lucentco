import {
  Leaf,
  ShieldCheck,
  Sparkles,
  Users,
  Clock,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/motion";
import { features, type Feature } from "@/lib/content";

const iconMap: Record<Feature["icon"], LucideIcon> = {
  leaf: Leaf,
  shield: ShieldCheck,
  sparkles: Sparkles,
  users: Users,
  clock: Clock,
  heart: Heart,
};

export function WhyLucent() {
  return (
    <Section className="bg-sage-50/60">
      <SectionHeading
        eyebrow="Why Lucent"
        title="Premium results, with a conscience"
        intro="We built Lucent for Brisbane homeowners and businesses who want a genuinely high-end clean — without the harsh chemicals or the no-show cleaners."
      />

      <RevealGroup className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = iconMap[feature.icon];
          return (
            <RevealItem key={feature.title} className="flex flex-col">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-pretty text-muted-foreground">
                {feature.body}
              </p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
