import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "@/components/motion";

/** Vertical-rhythm section wrapper. Set `bleed` to skip the inner Container. */
export function Section({
  className,
  children,
  bleed = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & { bleed?: boolean }) {
  return (
    <section className={cn("section-y", className)} {...props}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "mx-auto max-w-2xl items-center text-center",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="text-fluid-h2 font-semibold text-foreground">{title}</h2>
      {intro ? (
        <p className="max-w-prose text-pretty text-lg text-muted-foreground">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
