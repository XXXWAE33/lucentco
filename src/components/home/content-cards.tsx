import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, Sofa, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { contentCards, type ContentCard } from "@/config/homepage";

/**
 * "Worth knowing" — a bento of three cards: one tall feature card, two compact.
 *
 * This used to be three photo cards, but no photos exist yet and the empty
 * gradient slots read as a broken page. Each card now carries its own visual
 * (an extraction diagram, an icon tile), so the block looks finished without
 * photography. The `image` slots in `contentCards` are left in config for
 * when real photos arrive.
 */
export function ContentCards() {
  const [feature, ...rest] = contentCards;

  return (
    <Section className="bg-sage-50/60">
      <SectionHeading
        eyebrow="Worth knowing"
        title="What actually makes the difference"
        intro="Three things that separate a proper job from a quick pass."
        align="center"
      />

      <RevealGroup className="mx-auto mt-8 grid max-w-5xl gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-5 lg:grid-rows-2">
        <RevealItem className="lg:col-span-3 lg:row-span-2">
          <FeatureCard card={feature} index={1} />
        </RevealItem>

        {rest.map((card, i) => (
          <RevealItem key={card.id} className="lg:col-span-2">
            <CompactCard card={card} index={i + 2} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ─────────────────────────────── cards ──────────────────────────────────── */

const cardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-0.5 sm:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function FeatureCard({ card, index }: { card: ContentCard; index: number }) {
  return (
    <Link
      href={card.href}
      className={cn(cardBase, "bg-sage-900 text-white shadow-card hover:shadow-lifted")}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-emerald-500/25 blur-3xl"
      />

      <div className="relative flex items-center justify-between">
        <Eyebrow index={index} tone="dark">
          {card.eyebrow}
        </Eyebrow>
        <Arrow tone="dark" />
      </div>

      <h3 className="relative mt-5 max-w-sm text-balance font-display text-2xl font-semibold leading-tight sm:text-3xl">
        {card.title}
      </h3>
      <p className="relative mt-3 max-w-md text-pretty text-sm leading-relaxed text-mint-200/85 sm:text-base">
        {card.body}
      </p>

      <ExtractionDiagram className="relative mt-6 lg:mt-auto" />
    </Link>
  );
}

const COMPACT_STYLES: Record<string, { card: string; tile: string; icon: LucideIcon; tag?: string }> = {
  "couch-deodoriser": {
    card: "bg-gradient-to-br from-mint-100 via-emerald-50 to-white",
    tile: "bg-emerald-500 text-white",
    icon: Sofa,
    tag: "$0 extra",
  },
  "inspection-first": {
    card: "bg-gradient-to-br from-gold-100 via-gold-50 to-white",
    tile: "bg-gold-500 text-white",
    icon: ClipboardCheck,
    tag: "Written quote",
  },
};

function CompactCard({ card, index }: { card: ContentCard; index: number }) {
  const style = COMPACT_STYLES[card.id] ?? COMPACT_STYLES["couch-deodoriser"];
  const Icon = style.icon;
  return (
    <Link
      href={card.href}
      className={cn(cardBase, "border border-border shadow-soft hover:shadow-card", style.card)}
    >
      <div className="flex items-center justify-between">
        <Eyebrow index={index}>{card.eyebrow}</Eyebrow>
        <Arrow />
      </div>

      <div className="mt-5 flex items-start gap-4">
        <span
          className={cn(
            "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-soft transition-transform duration-300 group-hover:rotate-[-6deg]",
            style.tile,
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
            {card.title}
          </h3>
          <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink-600">{card.body}</p>
          {style.tag && (
            <span className="mt-3 inline-flex rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-sage-800 ring-1 ring-inset ring-border">
              {style.tag}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────── bits ───────────────────────────────────── */

function Eyebrow({
  index,
  tone = "light",
  children,
}: {
  index: number;
  tone?: "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]",
        tone === "dark" ? "text-gold-300" : "text-gold-600",
      )}
    >
      <span
        className={cn(
          "font-display tabular-nums",
          tone === "dark" ? "text-white/40" : "text-ink-300",
        )}
      >
        0{index}
      </span>
      {children}
    </span>
  );
}

function Arrow({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
        tone === "dark" ? "bg-white/10 text-white" : "bg-white text-sage-800 shadow-soft",
      )}
    >
      <ArrowUpRight className="h-4 w-4" />
    </span>
  );
}

/**
 * Carpet cross-section: fibres rooted in backing, with soil particles drawn up
 * and out — the "extraction, not surface" idea at a glance. Pure SVG, so it
 * scales and needs no asset.
 */
function ExtractionDiagram({ className }: { className?: string }) {
  const fibres = Array.from({ length: 22 }, (_, i) => i);
  const particles = [
    { x: 52, y: 70, r: 3 },
    { x: 96, y: 52, r: 2.5 },
    { x: 140, y: 34, r: 3.5 },
    { x: 188, y: 60, r: 2.5 },
    { x: 232, y: 40, r: 3 },
    { x: 276, y: 22, r: 2.5 },
    { x: 318, y: 50, r: 3 },
    { x: 362, y: 30, r: 2.5 },
  ];
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm",
        className,
      )}
    >
      <svg viewBox="0 0 420 150" className="h-auto w-full" role="img" aria-label="Soil lifted out of carpet fibres by extraction">
        {/* Rising particles + trails */}
        {particles.map((p, i) => (
          <g key={i}>
            <line
              x1={p.x}
              y1={p.y + 8}
              x2={p.x}
              y2={p.y + 34}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 4"
              strokeLinecap="round"
              className="text-mint-200/40"
            />
            <circle cx={p.x} cy={p.y} r={p.r} className="fill-[#C9A27A]" />
          </g>
        ))}

        {/* Fibres */}
        {fibres.map((i) => {
          const x = 14 + i * 18.5;
          const sway = i % 2 === 0 ? 4 : -4;
          return (
            <path
              key={i}
              d={`M ${x} 132 C ${x + sway} 118, ${x - sway} 104, ${x + sway / 2} 90`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-emerald-400/80"
            />
          );
        })}

        {/* Backing */}
        <rect x="6" y="132" width="408" height="10" rx="5" className="fill-white/15" />
      </svg>
      <div className="mt-3 flex items-center justify-between text-[0.6875rem] font-medium uppercase tracking-wider text-mint-200/70">
        <span>Hot water in</span>
        <span className="h-px flex-1 mx-3 bg-white/10" />
        <span>Soil out</span>
      </div>
    </div>
  );
}
