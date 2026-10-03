import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { CallLink } from "@/components/layout";
import { cn } from "@/lib/utils";
import { hero, heroImage, heroTags, type HeroTag } from "@/config/homepage";
import { SERVICE_BLUR_DATA_URL } from "@/config/services-content";
import { TrustStats, RatingCluster } from "./trust-strip";
import { VeloraRing } from "@/components/layout/velora-wordmark";
import { BrandPlaceholder } from "@/components/layout/brand-placeholder";

/**
 * Hero — clean, centred, white.
 *
 *     headline → sub-line → CTA pair → photo card with floating service tags
 *     → stats + rating
 *
 * Centred on desktop, left-aligned on mobile. The tags are positioned against
 * the photo card and may bleed past the viewport on small screens; the section
 * clips horizontally so that never causes sideways scroll.
 */
export function Hero() {
  return (
    <section className="relative overflow-x-clip bg-background pt-chrome">
      <Container>
        <div className="pt-12 sm:pt-16 lg:pt-24">
          {/* ── Copy ──────────────────────────────────────────────────── */}
          <div className="max-w-3xl sm:mx-auto sm:text-center">
            <h1 className="text-fluid-hero font-bold text-foreground">
              {hero.headline.lineOne}{" "}
              {/* Brand gold, straight from the logo — a metallic sweep. */}
              <span className="bg-gradient-to-r from-gold-700 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                {hero.headline.lineTwo}
              </span>
            </h1>

            <p className="mt-3 font-display text-xl font-semibold text-gold-600 sm:mt-4 sm:text-2xl">
              {hero.slogan}
            </p>

            <p className="mt-4 max-w-2xl text-pretty text-base text-ink-700 sm:mx-auto sm:mt-5 sm:text-lg">
              {hero.subline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:justify-center">
              <Button href={hero.primaryCta.href} variant="accent" size="md">
                <span className="sm:hidden">Get a quote</span>
                <span className="hidden sm:inline">{hero.primaryCta.label}</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/25">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Button>
              <CallLink
                location="hero"
                showIcon={false}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-btn border border-sage-800 bg-background px-6 text-[0.95rem] font-medium text-sage-900 transition-colors hover:bg-sage-50 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4 shrink-0" /> {hero.secondaryCtaLabel}
              </CallLink>
            </div>
          </div>

          {/* ── Photo card + floating tags ────────────────────────────── */}
          <div className="relative mx-auto mt-10 w-[80%] max-w-[36rem] sm:mt-14">
            {/* Logo-"O" rings behind the card — the brand mark as atmosphere. */}
            <VeloraRing
              strokeWidth={0.5}
              className="pointer-events-none absolute -left-[18%] -top-[30%] w-[60%] text-gold-400/50"
            />
            <VeloraRing
              strokeWidth={0.5}
              className="pointer-events-none absolute -bottom-[25%] -right-[16%] w-[48%] text-gold-400/40"
            />
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-sage-100">
              {heroImage.available ? (
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  sizes="(min-width: 640px) 576px, 80vw"
                  placeholder="blur"
                  blurDataURL={SERVICE_BLUR_DATA_URL}
                  className="object-cover"
                />
              ) : (
                <PhotoPlaceholder label={heroImage.alt} />
              )}
            </div>

            {heroTags.map((tag) => (
              <FloatingTag key={tag.label} tag={tag} />
            ))}
          </div>

          {/* ── Proof ─────────────────────────────────────────────────── */}
          <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:mt-20 lg:grid-cols-[1fr_auto] lg:items-center">
            <TrustStats />
            <RatingCluster />
          </div>
        </div>

        <div className="h-14 lg:h-20" aria-hidden="true" />
      </Container>
    </section>
  );
}

const toneStyles: Record<HeroTag["tone"], { pill: string; dot: string }> = {
  emerald: { pill: "bg-emerald-50 text-emerald-900", dot: "bg-emerald-500" },
  sage: { pill: "bg-sage-100 text-sage-900", dot: "bg-sage-600" },
  mint: { pill: "bg-mint-100 text-mint-900", dot: "bg-mint-400" },
  teal: { pill: "bg-emerald-100/70 text-emerald-900", dot: "bg-emerald-700" },
};

function FloatingTag({ tag }: { tag: HeroTag }) {
  const tone = toneStyles[tag.tone];
  return (
    <span
      className={cn(
        "absolute inline-flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium shadow-soft sm:text-sm",
        tone.pill,
      )}
      style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
    >
      <span className={cn("h-3 w-3 rounded-[4px] sm:h-3.5 sm:w-3.5", tone.dot)} />
      {tag.label}
    </span>
  );
}

/** Stand-in until a real hero photo is supplied (see `heroImage`). */
function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <BrandPlaceholder label={label} />
  );
}
