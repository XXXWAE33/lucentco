import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { VeloraWordmark } from "./velora-wordmark";

/**
 * Official Velora wordmark as the home link. `tone="light"` is for dark
 * surfaces (brand gold); default uses a deeper gold that holds up on white.
 */
export function Logo({
  className,
  tone = "default",
  tagline = false,
}: {
  className?: string;
  tone?: "default" | "light";
  /** Show the spaced "BRISBANE CLEANING" line under the wordmark. */
  tagline?: boolean;
}) {
  return (
    <Link
      href="/"
      /*
       * No aria-label: the SVG's <title> ("Velora Brisbane Cleaning") is the
       * accessible name. An aria-label would replace it and break voice
       * control matching on the visible brand.
       */
      title={`${site.name} — home`}
      className={cn(
        "group inline-flex min-h-[44px] items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        tone === "light" ? "text-gold-400" : "text-gold-500",
        className,
      )}
    >
      <VeloraWordmark
        tagline={tagline}
        strokeWidth={tagline ? 7 : 11}
        className={cn(
          "transition-opacity duration-300 group-hover:opacity-80",
          tagline ? "w-44 sm:w-52" : "w-[6.5rem] sm:w-[7.5rem]",
        )}
      />
    </Link>
  );
}
