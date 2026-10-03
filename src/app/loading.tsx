import { VeloraWordmark } from "@/components/layout/velora-wordmark";

/**
 * Route-transition loading state. Deliberately quiet: the brand wordmark
 * breathing once — transitions here are fast, so this is a flicker guard,
 * not entertainment.
 */
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center pt-chrome">
      <span className="sr-only">Loading…</span>
      <VeloraWordmark
        title={null}
        tagline
        strokeWidth={6}
        className="w-48 animate-pulse text-gold-400"
      />
    </main>
  );
}
