"use client";

import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { site, contactChannels, whatsappHref } from "@/lib/site";
import { trackContactClick, type ContactChannelId } from "@/lib/analytics";

/** WhatsApp glyph — lucide dropped brand icons, so the mark is inlined. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.02 12.02 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.893 0-3.176-1.24-6.165-3.495-8.411l.015-.042ZM12.05 21.785h-.005a9.94 9.94 0 0 1-5.06-1.38l-.363-.216-3.762.982 1.006-3.647-.236-.375a9.86 9.86 0 0 1-1.516-5.257c.002-5.45 4.456-9.884 9.938-9.884 2.654 0 5.147 1.031 7.021 2.9a9.83 9.83 0 0 1 2.909 6.994c-.003 5.45-4.457 9.883-9.932 9.883Z" />
    </svg>
  );
}

type BaseProps = {
  /** Where this link lives, for analytics, e.g. "footer" or "floating-button". */
  location: string;
  /** Optional analytics context, e.g. the service being enquired about. */
  context?: string;
  className?: string;
  children?: ReactNode;
};

type WhatsAppLinkProps = BaseProps & {
  /** Prefilled message. Falls back to the generic quote request. */
  message?: string;
  /** Overrides the default accessible name. */
  ariaLabel?: string;
  showIcon?: boolean;
};

/**
 * WhatsApp link. Always opens in a new tab with `noopener noreferrer`, always
 * carries a real accessible name, and always reports the click.
 */
export function WhatsAppLink({
  message,
  location,
  context,
  className,
  ariaLabel,
  showIcon = true,
  children,
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        ariaLabel ?? `Message ${site.name} on WhatsApp at ${contactChannels.whatsapp.display}`
      }
      onClick={() =>
        trackContactClick({ channel: "whatsapp", location, context })
      }
      className={className}
    >
      {showIcon && <WhatsAppIcon className="h-4 w-4 shrink-0" />}
      {children}
    </a>
  );
}

type CallLinkProps = BaseProps & {
  ariaLabel?: string;
  showIcon?: boolean;
};

/**
 * Phone link. Left as a native `tel:` on every breakpoint — desktop users with
 * a softphone or handoff can still use it.
 */
export function CallLink({
  location,
  context,
  className,
  ariaLabel,
  showIcon = true,
  children,
}: CallLinkProps) {
  return (
    <a
      href={contactChannels.call.href}
      aria-label={ariaLabel ?? `Call ${site.name} on ${contactChannels.call.display}`}
      onClick={() => trackContactClick({ channel: "call", location, context })}
      className={className}
    >
      {showIcon && <Phone className="h-4 w-4 shrink-0" />}
      {children}
    </a>
  );
}

export type { ContactChannelId };
