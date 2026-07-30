"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { SERVICE_BLUR_DATA_URL } from "@/config/services-content";
import { heroImage } from "@/config/homepage";
import { HeroGlow } from "./atmosphere";

/**
 * Hero visual — deliberately frameless.
 *
 * No border, no card, no rounded-rectangle boundary. The media is masked with a
 * radial vignette so its edges dissolve into the wash, and a colour-matched
 * glow sits behind it, so the object reads as the light source for the gradient
 * rather than as a picture pasted on top of it.
 *
 * CLS: the aspect box reserves the full footprint before any media loads, and
 * the parallax transform starts at 0, so first paint is stable.
 */
export function HeroVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Inner layer is 112% tall, so it can never expose an edge at either extreme.
  const y = useTransform(scrollYProgress, [0, 1], ["-4.5%", "4.5%"]);

  // Development-only nudge. Never rendered into the page — see the no-scaffolding
  // rule: the DOM must not carry placeholder chrome.
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !heroImage.available) {
      console.warn(
        `[Lucent] Hero photo not supplied — rendering the designed placeholder.\n` +
          `  Add ${heroImage.src} (2000×1500, 4:3, <400KB) to /public,\n` +
          `  then set heroImage.available = true in src/config/homepage.ts`,
      );
    }
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Glow — larger than the object, sits behind it in the wash. */}
      <HeroGlow className="-inset-x-[18%] -inset-y-[12%]" />

      {/* Aspect box reserves layout space up front. */}
      <div className="relative aspect-[4/3] w-full lg:aspect-[4/5]">
        <motion.div
          className="absolute inset-x-0 -top-[6%] h-[112%] w-full"
          style={reduce ? undefined : { y }}
        >
          <div
            className="h-full w-full"
            style={{
              // Soft vignette — this is what removes the "boxed" reading.
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 64% at 50% 46%, #000 40%, rgba(0,0,0,0.6) 66%, transparent 85%)",
              maskImage:
                "radial-gradient(ellipse 70% 64% at 50% 46%, #000 40%, rgba(0,0,0,0.6) 66%, transparent 85%)",
            }}
          >
            {heroImage.available ? (
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 680px, 100vw"
                placeholder="blur"
                blurDataURL={SERVICE_BLUR_DATA_URL}
                className="object-cover"
              />
            ) : (
              <HeroPlaceholder label={heroImage.alt} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Designed stand-in for the hero photograph.
 *
 * Soft-edged organic mass built from radial gradients only — no hard borders,
 * no rectangle, no visible label. It should read as an intentional part of the
 * composition while the real photo is outstanding, not as an empty slot.
 */
function HeroPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative h-full w-full overflow-hidden"
      style={{
        background: [
          // Specular highlight
          "radial-gradient(38% 30% at 38% 26%, hsl(0 0% 100% / 0.85) 0%, transparent 62%)",
          // Core mass
          "radial-gradient(58% 52% at 52% 44%, hsl(161 62% 80% / 0.95) 0%, hsl(161 50% 70% / 0.75) 48%, transparent 78%)",
          // Cool shoulder
          "radial-gradient(46% 42% at 72% 62%, hsl(164 50% 72% / 0.7) 0%, transparent 72%)",
          // Deep base, grounds the form
          "radial-gradient(52% 40% at 44% 78%, hsl(161 42% 54% / 0.55) 0%, transparent 76%)",
        ].join(", "),
      }}
    >
      {/* Soft internal structure — suggests volume without faking a 3D render. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(22% 26% at 30% 62%, hsl(0 0% 100% / 0.5) 0%, transparent 70%)",
            "radial-gradient(16% 20% at 66% 30%, hsl(0 0% 100% / 0.55) 0%, transparent 72%)",
          ].join(", "),
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}
