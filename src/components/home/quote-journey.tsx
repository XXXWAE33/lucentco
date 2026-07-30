import { ArrowRight, MessageCircle, Phone, ShoppingBag, Sparkles } from "lucide-react";
import { Section, SectionHeading, Button } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { CallLink, WhatsAppLink, WhatsAppIcon } from "@/components/layout";
import { journeyStages, type JourneyStage } from "@/config/homepage";

const icons: Record<JourneyStage["icon"], typeof Sparkles> = {
  quote: Sparkles,
  basket: ShoppingBag,
  talk: MessageCircle,
};

/**
 * Three real routes to a price on this site, presented as staged cards with a
 * badge above the title and a dashed connector between them — the reference's
 * "staged journey" visual grammar, applied to genuine destinations (the
 * pricing selector, the basket, a live person) rather than an invented career
 * ladder. No content here is new; it orients visitors to tools already on the
 * page.
 */
export function QuoteJourney() {
  return (
    <Section>
      <SectionHeading
        eyebrow="However you'd rather do it"
        title="Get your price, three ways"
        align="center"
      />

      <RevealGroup className="relative mt-8 grid gap-5 sm:mt-12 md:grid-cols-3 md:gap-4">
        {journeyStages.map((stage, i) => (
          <RevealItem key={stage.id} className="relative">
            {/* Connector to the next stage — vertical on mobile, horizontal on desktop. */}
            {i < journeyStages.length - 1 && (
              <>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 left-1/2 h-3 w-px -translate-x-1/2 border-l border-dashed border-sage-300 md:hidden"
                />
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-3.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-sage-300 md:block"
                />
              </>
            )}

            <StageCard stage={stage} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
        <Button href="#instant-quote" variant="accent" size="lg">
          Get an instant quote <ArrowRight className="h-4 w-4" />
        </Button>
        <Button href="/pricing" variant="outline" size="lg">
          See pricing
        </Button>
      </Reveal>
    </Section>
  );
}

function StageCard({ stage }: { stage: JourneyStage }) {
  const Icon = icons[stage.icon];

  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sage-50 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-sage-700">
        <Icon className="h-3 w-3" />
        {stage.badge}
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        {stage.title}
      </h3>
      <p className="mt-1.5 text-pretty text-sm text-muted-foreground">
        {stage.body}
      </p>

      {stage.id === "talk" ? (
        <div className="mt-5 grid grid-cols-2 gap-2">
          <CallLink
            location="quote-journey"
            showIcon={false}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-sage-300 text-xs font-semibold text-sage-800 transition-colors hover:bg-sage-50 sm:text-sm"
          >
            <Phone className="h-4 w-4" /> Call
          </CallLink>
          <WhatsAppLink
            location="quote-journey"
            showIcon={false}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 sm:text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </WhatsAppLink>
        </div>
      ) : (
        // Full-width button on mobile — a 20px bare text link is not a tap
        // target. Relaxes to an inline link from sm, where pointers are precise.
        <a
          href={`#${stage.id === "quote" ? "instant-quote" : "build-your-clean"}`}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-1.5 self-start rounded-full border border-sage-300 text-sm font-semibold text-emerald-700 transition-colors hover:bg-sage-50 hover:text-emerald-800 sm:h-auto sm:w-auto sm:justify-start sm:border-0 sm:hover:bg-transparent"
        >
          {stage.id === "quote" ? "Get my price" : "Build my quote"}
          <ArrowRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}
