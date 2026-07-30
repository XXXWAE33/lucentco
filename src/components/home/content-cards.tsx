import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/motion";
import { ServiceImage } from "@/components/features/service-showcase";
import { contentCards, type ContentCard } from "@/config/homepage";

/**
 * Editorial image cards — one wide, two narrow — matching the reference's
 * content block.
 *
 * Text sits BELOW the image rather than overlaid on it. The reference overlays
 * copy on photography it controls; our slots are unfilled, and overlaying text
 * on an unknown client photo is how you end up with unreadable headlines. The
 * gradient scrim is still there for when real images land, but legibility never
 * depends on them.
 */
export function ContentCards() {
  const [wide, ...narrow] = contentCards;

  return (
    <Section className="bg-sage-50/60">
      <SectionHeading
        eyebrow="Worth knowing"
        title="What actually makes the difference"
        intro="Three things that separate a proper job from a quick pass."
        align="center"
      />

      <RevealGroup className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2">
        {/* Wide card — full width on mobile, spans both columns from lg. */}
        <RevealItem className="lg:col-span-2">
          <Card card={wide} aspect="aspect-[3/2] sm:aspect-[16/7]" />
        </RevealItem>

        {narrow.map((card) => (
          <RevealItem key={card.id}>
            <Card card={card} aspect="aspect-[3/2] sm:aspect-square lg:aspect-[4/3]" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function Card({ card, aspect }: { card: ContentCard; aspect: string }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow duration-300 hover:shadow-lifted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <ServiceImage
        image={card.image}
        aspect={aspect}
        className="rounded-none"
        sizes="(min-width: 1024px) 620px, 100vw"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-emerald-700">
          {card.eyebrow}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
          {card.title}
        </h3>
        <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
          {card.body}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
          Read more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
