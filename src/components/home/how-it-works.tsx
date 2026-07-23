import { Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <Section>
      <SectionHeading
        eyebrow="How it works"
        title="Booked in two minutes, spotless by sunset"
        intro="No phone tag, no vague estimates. Here's how a Lucent clean comes together."
        align="center"
      />

      <Reveal>
      <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.number} className="relative">
            {/* Connector line (desktop) */}
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-12 top-6 hidden h-px w-[calc(100%-1.5rem)] bg-gradient-to-r from-emerald-300 to-transparent lg:block"
              />
            )}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-700 font-display text-lg font-semibold text-white shadow-soft">
              {step.number}
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-pretty text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
      </Reveal>
    </Section>
  );
}
