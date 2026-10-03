"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrandPlaceholder } from "@/components/layout/brand-placeholder";
import {
  SERVICE_BLUR_DATA_URL,
  type ServiceImageSlot,
} from "@/config/services-content";

/**
 * Service hero visual.
 *
 * Renders `next/image` when the real photo exists (`available: true`), and a
 * designed placeholder until then — so nothing 404s before photography lands
 * and the swap is a one-line config change.
 *
 * CLS: the aspect box reserves the exact space in the layout, so neither the
 * placeholder→photo swap nor the parallax can shift anything around it.
 */
export function ServiceImage({
  image,
  icon,
  className,
  parallax = false,
  priority = false,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw",
}: {
  image: ServiceImageSlot;
  /** Shown inside the placeholder so each slot still reads as its service. */
  icon?: React.ReactNode;
  className?: string;
  parallax?: boolean;
  priority?: boolean;
  /** Tailwind aspect-ratio class. Reserves layout space, so keep it explicit. */
  aspect?: string;
  sizes?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle drift only. The inner layer is 112% tall, so it can never expose
  // an edge at either end of the range.
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const enabled = parallax && !reduce;

  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden rounded-3xl bg-sage-900",
        className,
      )}
    >
      {/* Aspect box — reserves layout space up front. */}
      <div className={cn("relative w-full", aspect)}>
        <motion.div
          className="absolute inset-x-0 -top-[6%] h-[112%] w-full"
          style={enabled ? { y } : undefined}
        >
          {image.available ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              priority={priority}
              placeholder="blur"
              blurDataURL={SERVICE_BLUR_DATA_URL}
              className="object-cover"
            />
          ) : (
            <BrandPlaceholder icon={icon} label={image.alt} />
          )}
        </motion.div>

        {/* Gradient scrim — keeps overlaid text legible on a real photo.
            The branded placeholder is already dark, so it skips the scrim. */}
        {image.available && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-sage-950/70 via-sage-950/10 to-transparent"
          />
        )}
      </div>
    </div>
  );
}
