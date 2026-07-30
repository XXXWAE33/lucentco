import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { CallLink } from "@/components/layout";
import { cn } from "@/lib/utils";
import { hero, heroImage } from "@/config/homepage";
import { HeroVisual } from "./hero-visual";
import { TrustStats, RatingCluster } from "./trust-strip";

/**
 * Hero.
 *
 * MOBILE (<lg) — recomposed, not shrunk. One centred column, reordered so the
 * proof lands before the ask:
 *     eyebrow → headline → sub-line → stats → CTA pair → rating
 * The visual is cut from the fold entirely (see `HeroVisual`), because a
 * 251px-tall empty placeholder pushed the stats off-screen.
 *
 * DESKTOP (lg+) — two columns via explicit grid placement:
 *     row 1: copy    | visual (spans rows 1–2)
 *     row 2: CTAs    |
 *     row 3: stats   | rating
 * Placement is explicit so the same DOM serves both layouts — nothing is
 * duplicated for mobile, so the two can't drift apart.
 *
 * This section paints NO background. Colour comes from `<Atmosphere>` on the
 * shared wrapper in `app/page.tsx`.
 */
export function Hero() {
  return (
    <section className="relative pt-chrome">
      <Container>
        <div
          className={cn(
            "flex flex-col items-center pt-6 text-center sm:pt-8",
            "lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:pt-10 lg:text-left",
          )}
        >
          {/* ── Copy ──────────────────────────────────────────────────── */}
          <div className="order-2 max-w-xl lg:order-none lg:col-start-1 lg:row-start-1">
            <span className="eyebrow justify-center lg:justify-start">
              <Sparkles className="h-4 w-4 shrink-0" /> {hero.eyebrow}
            </span>

            <h1 className="mt-4 text-fluid-hero font-semibold text-foreground lg:mt-5">
              {/* Two explicit lines — breaks identically at every width. */}
              <span className="block">{hero.headline.lineOne}</span>
              <span className="block text-gradient">{hero.headline.lineTwo}</span>
            </h1>

            <p className="mx-auto mt-4 max-w-prose text-pretty text-base text-muted-foreground sm:text-lg lg:mx-0 lg:mt-5">
              {hero.subline}
            </p>
          </div>

          {/* ── Stats — above the CTAs on mobile: proof before action ──── */}
          <div className="order-3 mt-8 w-full lg:order-none lg:col-start-1 lg:row-start-3 lg:mt-16">
            <TrustStats />
          </div>

          {/* ── CTA pair — equal-width side by side on mobile ──────────── */}
          <div className="order-4 mt-7 grid w-full grid-cols-2 gap-3 sm:mx-auto sm:max-w-md lg:order-none lg:col-start-1 lg:row-start-2 lg:mx-0 lg:mt-7 lg:flex lg:max-w-none lg:justify-start">
            <Button
              href={hero.primaryCta.href}
              variant="accent"
              size="lg"
              className="w-full lg:w-auto"
            >
              {/* Short label on mobile so it fits a half-width button. */}
              <span className="sm:hidden">Get a quote</span>
              <span className="hidden sm:inline">{hero.primaryCta.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Button>
            <CallLink
              location="hero"
              showIcon={false}
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full border border-sage-300 bg-transparent px-5 text-base font-medium text-sage-800 transition-colors hover:bg-sage-50 active:scale-[0.98] lg:w-auto lg:px-6"
            >
              <Phone className="h-4 w-4 shrink-0" /> {hero.secondaryCtaLabel}
            </CallLink>
          </div>

          {/* ── Rating — own centred row beneath the CTAs on mobile ────── */}
          <div className="order-5 mt-7 w-full lg:order-none lg:col-start-2 lg:row-start-3 lg:mt-16 lg:self-center">
            <RatingCluster />
          </div>

          {/*
            ── Visual ──────────────────────────────────────────────────
            Hidden on mobile while the photo is outstanding. Once supplied it
            returns as a full-bleed rounded card below the fold, never as a
            shrunken box beside the text.
          */}
          {/*
            Per the reference, the visual leads on mobile — it sits ABOVE the
            headline (order-1) as a rounded card, not beside the text.
            Still hidden until a real photo exists: an empty placeholder at the
            very top of the fold would push the headline and proof off-screen.
          */}
          <div
            className={cn(
              "order-1 w-full",
              heroImage.available ? "mb-7 block" : "hidden",
              "lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mb-0 lg:block lg:w-full lg:-mr-[12vw] lg:-mt-56 xl:-mr-[9vw] xl:-mt-64",
            )}
          >
            <HeroVisual className="mx-auto w-full max-w-md lg:max-w-none" />
          </div>
        </div>

        <div className="h-14 lg:h-20" aria-hidden="true" />
      </Container>
    </section>
  );
}
