import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers, MessageCircle, Phone, ShoppingBag } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/motion";
import { CallLink, WhatsAppLink, WhatsAppIcon } from "@/components/layout";
import { cn } from "@/lib/utils";
import { journeyStages, type JourneyStage } from "@/config/homepage";

const icons: Record<JourneyStage["icon"], typeof Layers> = {
  quote: Layers,
  basket: ShoppingBag,
  talk: MessageCircle,
};

/**
 * Three real routes to a price: the single-service sheet, the basket sheet,
 * or a person. The two tool cards are whole-card links into the quote sheet
 * (`#instant-quote` / `#build-your-clean`); the "talk" card is the dark one,
 * carrying its own Call / WhatsApp actions.
 */
export function QuoteJourney() {
  const tools = journeyStages.filter((s) => s.id !== "talk");
  const talk = journeyStages.find((s) => s.id === "talk");

  return (
    <Section>
      <SectionHeading
        eyebrow="However you'd rather do it"
        title="Get your price, three ways"
        align="center"
      />

      <RevealGroup className="mx-auto mt-8 grid max-w-5xl gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3">
        {tools.map((stage, i) => (
          <RevealItem key={stage.id}>
            <ToolCard stage={stage} index={i + 1} />
          </RevealItem>
        ))}
        {talk && (
          <RevealItem>
            <TalkCard stage={talk} index={3} />
          </RevealItem>
        )}
      </RevealGroup>

      <div className="mt-6 text-center sm:mt-8">
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline decoration-gold-300 underline-offset-4 transition-colors hover:text-gold-700 hover:decoration-gold-600"
        >
          Or see every price on one page
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Section>
  );
}

/* ──────────────────────────────── cards ─────────────────────────────────── */

function Badge({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "text-[0.6875rem] font-semibold uppercase tracking-[0.14em]",
        tone === "dark" ? "text-gold-300" : "text-gold-600",
      )}
    >
      {children}
    </span>
  );
}

function ToolCard({ stage, index }: { stage: JourneyStage; index: number }) {
  const Icon = icons[stage.icon];
  const href = stage.id === "quote" ? "#instant-quote" : "#build-your-clean";
  const cta = stage.id === "quote" ? "Get my price" : "Build my quote";

  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col rounded-3xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 text-gold-600 ring-1 ring-inset ring-gold-200 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-white group-hover:ring-gold-400">
          <Icon className="h-5 w-5" />
        </span>
        <span
          aria-hidden="true"
          className="font-display text-4xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_theme(colors.gold.300)]"
        >
          0{index}
        </span>
      </div>

      <div className="mt-5">
        <Badge>{stage.badge}</Badge>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground sm:text-xl">
          {stage.title}
        </h3>
        <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
          {stage.body}
        </p>
      </div>

      <span className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-sage-800 sm:mt-auto">
        {cta}
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage-800 text-white transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" />
        </span>
      </span>
    </Link>
  );
}

function TalkCard({ stage, index }: { stage: JourneyStage; index: number }) {
  const Icon = icons[stage.icon];
  const tile =
    "group flex items-center gap-2.5 rounded-2xl bg-white/[0.07] p-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.12]";

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-sage-900 p-5 text-white shadow-lifted sm:p-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold-400/20 blur-3xl"
      />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300 ring-1 ring-inset ring-gold-400/30">
          <Icon className="h-5 w-5" />
        </span>
        <span
          aria-hidden="true"
          className="font-display text-4xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_theme(colors.gold.400)]"
        >
          0{index}
        </span>
      </div>

      <div className="relative mt-5">
        <Badge tone="dark">{stage.badge}</Badge>
        <h3 className="mt-1.5 font-display text-lg font-semibold sm:text-xl">{stage.title}</h3>
        <p className="mt-1.5 text-pretty text-sm leading-relaxed text-mint-100/75">{stage.body}</p>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-2 sm:mt-auto sm:pt-5">
        <CallLink location="quote-journey" showIcon={false} className={tile}>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gold-400/15">
            <Phone className="h-4 w-4 text-gold-300" />
          </span>
          Call
          <ArrowUpRight className="ml-auto h-4 w-4 text-mint-200/50" />
        </CallLink>
        <WhatsAppLink location="quote-journey" showIcon={false} className={tile}>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gold-400/15">
            <WhatsAppIcon className="h-4 w-4 text-gold-300" />
          </span>
          WhatsApp
          <ArrowUpRight className="ml-auto h-4 w-4 text-mint-200/50" />
        </WhatsAppLink>
      </div>
    </div>
  );
}
