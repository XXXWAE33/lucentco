import { ArrowRight, Star, ShieldCheck, Leaf, Sparkles, CalendarCheck } from "lucide-react";
import { Button, Container } from "@/components/ui";

/**
 * Hero. The right-hand visual is a pure CSS/SVG composition (no 3D / external
 * deps). Scroll + float animation is layered on in step 7.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-eco-wash pt-28 lg:pt-36">
      {/* Soft brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-mint-300/30 blur-3xl" />
      </div>

      <Container className="grid items-center gap-12 pb-section lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Copy */}
        <div className="max-w-xl">
          <span className="eyebrow">
            <Leaf className="h-4 w-4" /> Brisbane&apos;s premium eco-cleaners
          </span>

          <h1 className="mt-5 text-fluid-hero font-semibold text-foreground">
            A spotless home,{" "}
            <span className="text-gradient">without the chemicals</span>.
          </h1>

          <p className="mt-6 max-w-prose text-lg text-pretty text-muted-foreground">
            Lucent Clean Co. brings agency-grade, eco-friendly cleaning to homes
            and businesses across New Farm, Paddington, Bulimba and beyond. Vetted
            local crews, non-toxic products, and a finish you can feel.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/contact" variant="accent" size="lg">
              Get an instant quote <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore services
            </Button>
          </div>

          {/* Trust row */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
              <strong className="font-semibold text-foreground">4.9</strong> from
              600+ reviews
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Bond-back guarantee
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Leaf className="h-4 w-4 text-emerald-600" />
              100% eco products
            </span>
          </div>
        </div>

        {/* Visual — pure CSS/SVG eco composition */}
        <HeroVisual />
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative aspect-square overflow-hidden rounded-4xl border border-white/60 bg-gradient-to-br from-mint-200 via-mint-100 to-emerald-200 shadow-lifted lg:aspect-[4/5]">
        {/* Soft floating bubbles */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-[16%] top-[18%] h-28 w-28 rounded-full bg-white/40 blur-md" />
          <div className="absolute right-[18%] top-[30%] h-16 w-16 rounded-full bg-white/50 blur-sm" />
          <div className="absolute bottom-[26%] left-[26%] h-36 w-36 rounded-full bg-emerald-300/40 blur-lg" />
          <div className="absolute bottom-[20%] right-[22%] h-12 w-12 rounded-full bg-white/60" />
          <div className="absolute left-[44%] top-[12%] h-6 w-6 rounded-full bg-white/70" />
        </div>

        {/* Centerpiece sparkle mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/70 bg-white/40 backdrop-blur-md">
            <Sparkles className="h-12 w-12 text-emerald-600" />
          </div>
        </div>

        {/* Decorative concentric rings */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full text-white/30"
        >
          <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Floating glass info cards */}
      <div className="absolute -left-3 top-10 hidden rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-card backdrop-blur-md sm:block">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Leaf className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-sage-800">Eco-certified</p>
            <p className="text-xs text-sage-700/70">Non-toxic &amp; pet-safe</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-3 bottom-12 hidden rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-card backdrop-blur-md sm:block">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage-100 text-sage-700">
            <CalendarCheck className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-sage-800">Next available</p>
            <p className="text-xs text-sage-700/70">Tomorrow, 8:00am</p>
          </div>
        </div>
      </div>
    </div>
  );
}
