import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

/*
 * Design system: 10px radius, 16px/600 label, 56px tall at `lg`.
 * Flat fills that deepen on hover; focus ring is the brand green.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-semibold whitespace-nowrap " +
  "transition-all duration-200 ease-out-soft active:scale-[0.97] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-sage-700 text-white hover:bg-sage-800",
  accent:
    "bg-sage-900 text-gold-200 hover:bg-sage-800 hover:text-gold-100",
  secondary: "bg-sage-100 text-sage-800 hover:bg-sage-200",
  outline:
    "border border-sage-800 bg-background text-sage-900 hover:bg-sage-50",
  ghost: "bg-transparent text-gold-700 hover:bg-sage-50",
};

const sizes: Record<Size, string> = {
  /* Every size clears the 44px minimum tap target; `lg` is the 56px spec. */
  sm: "h-11 px-5 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    const external = /^https?:|^tel:|^mailto:/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
