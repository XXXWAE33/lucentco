import { Section, SectionHeading } from "@/components/ui";
import { TestimonialMarquee } from "@/components/features";

/** Continuously scrolling review marquee. */
export function Testimonials() {
  return (
    // Full-bleed: the marquee runs edge to edge, so it sits outside the
    // normal container padding.
    <Section className="overflow-hidden bg-sage-50/60">
      <SectionHeading
        eyebrow="Loved across Brisbane"
        title="The reviews do the talking"
        intro="Real words from real clients in the suburbs we serve every week."
        align="center"
      />

      <div className="mt-8 sm:mt-12">
        <TestimonialMarquee />
      </div>
    </Section>
  );
}

