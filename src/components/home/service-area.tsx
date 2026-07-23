import { MapPin, ArrowRight } from "lucide-react";
import { Section, SectionHeading, Button, Badge } from "@/components/ui";
import { serviceSuburbs } from "@/lib/site";

export function ServiceArea() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Where we clean"
            title="Local crews, right across Brisbane"
            intro="We focus on the inner-city and riverside suburbs so our cleaners spend less time driving and more time perfecting your home. Not listed? We're likely nearby — just ask."
          />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="primary">
              Check your suburb <ArrowRight className="h-4 w-4" />
            </Button>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Cleaners available this week
            </span>
          </div>
        </div>

        <div className="rounded-4xl border border-border bg-mint-50/70 p-6 shadow-soft sm:p-8">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-sage-800">
            <MapPin className="h-4 w-4 text-emerald-600" />
            18 suburbs &amp; growing
          </div>
          <div className="flex flex-wrap gap-2.5">
            {serviceSuburbs.map((suburb) => (
              <Badge key={suburb} tone="sage" className="text-sm">
                {suburb}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
