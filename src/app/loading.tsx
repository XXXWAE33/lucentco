/**
 * Route-transition loading state. Deliberately quiet: a single breathing brand
 * mark, no spinners or skeleton noise — transitions here are fast, so this is
 * a flicker guard, not entertainment.
 */
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center pt-chrome">
      <span className="sr-only">Loading…</span>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="h-10 w-10 animate-pulse"
      >
        <path
          d="M16 2.5c5.2 5.4 9 9.9 9 15.1A9 9 0 1 1 7 17.6C7 12.4 10.8 7.9 16 2.5Z"
          className="fill-emerald-500/70"
        />
      </svg>
    </main>
  );
}
