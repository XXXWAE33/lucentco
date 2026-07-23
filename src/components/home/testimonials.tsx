import { Star, Quote } from "lucide-react";
import { Section, SectionHeading, Badge } from "@/components/ui";
import { RevealGroup, RevealItem, Waveform } from "@/components/motion";
import { testimonials } from "@/lib/content";

/** Waveform-style animated testimonial cards. */
export function Testimonials() {
  return (
    <Section className="bg-sage-50/60">
      <SectionHeading
        eyebrow="Loved across Brisbane"
        title="The reviews do the talking"
        intro="Real words from real clients in the suburbs we serve every week."
        align="center"
      />

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <RevealItem
            key={t.name}
            className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lifted sm:p-8"
          >
            <div className="mb-3 flex items-center justify-between">
              <Quote className="h-8 w-8 text-emerald-200" aria-hidden="true" />
              <Waveform bars={22} className="opacity-70" />
            </div>
            <blockquote className="flex-1 text-pretty text-lg leading-relaxed text-ink-800">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
              <div>
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.suburb}</div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span
                  className="flex"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </span>
                <Badge tone="mint">{t.service}</Badge>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
