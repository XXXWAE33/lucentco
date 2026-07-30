import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Lucent wordmark + droplet-leaf mark. `tone` adapts to dark backgrounds. */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-9 w-9 transition-transform duration-300 ease-out-soft group-hover:scale-105"
          aria-hidden="true"
        >
          <path
            d="M16 2.5c5.2 5.4 9 9.9 9 15.1A9 9 0 1 1 7 17.6C7 12.4 10.8 7.9 16 2.5Z"
            className="fill-emerald-500"
          />
          <path
            d="M16 2.5c5.2 5.4 9 9.9 9 15.1a9 9 0 0 1-9 9V2.5Z"
            className="fill-sage-700"
          />
          <circle cx="12.5" cy="20" r="2.2" className="fill-white/85" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-lg font-semibold tracking-tight",
          tone === "light" ? "text-white" : "text-foreground",
        )}
      >
        Lucent
        <span
          className={cn(
            "font-normal",
            tone === "light" ? "text-mint-200" : "text-muted-foreground",
          )}
        >
          {" "}
          Clean Co.
        </span>
      </span>
    </Link>
  );
}
