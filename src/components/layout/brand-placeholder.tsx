import { cn } from "@/lib/utils";
import { VeloraRing, VeloraWordmark } from "./velora-wordmark";

/**
 * The one stand-in for every image slot that has no photo yet: charcoal
 * panel, the logo's "O" as gold rings, and the gold Velora wordmark — so an
 * unfilled slot reads as deliberate branding rather than a missing asset.
 *
 * `icon` (optional) sits under the wordmark so each slot still signals which
 * service it belongs to. The real photo replaces this via config alone.
 */
export function BrandPlaceholder({
  label,
  icon,
  className,
}: {
  /** Describes the pending photo for assistive tech. */
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ? `Velora — ${label}` : "Velora Brisbane Cleaning"}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-br from-sage-900 via-sage-800 to-sage-900",
        className,
      )}
    >
      <VeloraRing
        strokeWidth={0.4}
        className="pointer-events-none absolute -right-[18%] -top-[30%] w-[70%] text-gold-400/30"
      />
      <VeloraRing
        strokeWidth={0.5}
        className="pointer-events-none absolute -bottom-[35%] -left-[14%] w-[55%] text-gold-400/20"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/10 blur-3xl"
      />

      <VeloraWordmark
        tagline
        title={null}
        strokeWidth={6}
        className="relative w-[58%] max-w-[17rem] text-gold-400"
      />
      {icon && (
        <span
          aria-hidden="true"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-gold-300 ring-1 ring-inset ring-gold-400/40 [&>svg]:h-4 [&>svg]:w-4"
        >
          {icon}
        </span>
      )}
    </div>
  );
}
