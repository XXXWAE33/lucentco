import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { VeloraRing } from "./velora-wordmark";

/**
 * Branded intro band shared by the inner pages (about, pricing, FAQ, contact):
 * dark green, the logo's "O" as oversized gold rings, white headline with a
 * gold highlight. `children` render under the intro (chips, promise tiles…).
 *
 * Bottom padding is generous by default so the next block can overlap the
 * band with a negative margin; pass `className` to change it.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  /** Rendered after `title` in brand gold. */
  highlight?: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-sage-900 pb-28 pt-12 text-white sm:pb-32 sm:pt-16",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <VeloraRing strokeWidth={0.3} className="absolute -right-40 -top-40 h-[34rem] w-[34rem] text-gold-400/25" />
        <VeloraRing strokeWidth={0.4} className="absolute -left-24 top-16 h-72 w-72 text-gold-400/20" />
        <div className="absolute -left-20 -top-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance font-display text-[2.25rem] font-semibold leading-[1.08] sm:text-6xl">
            {title}
            {highlight && (
              <>
                {" "}
                <span className="bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 bg-clip-text text-transparent">
                  {highlight}
                </span>
              </>
            )}
          </h1>
          {intro && (
            <p className="mx-auto mt-5 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-mint-100/80 sm:text-lg">
              {intro}
            </p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
