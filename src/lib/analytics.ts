/**
 * Contact-conversion tracking seam.
 *
 * No analytics provider is installed in this project. Rather than pulling one
 * in, every contact CTA calls `trackContactClick` and this module forwards the
 * event to whichever provider is present at runtime — GA4 (`gtag`), GTM
 * (`dataLayer`) or Plausible. If none is loaded, it is a silent no-op.
 *
 * TO WIRE UP ANALYTICS: add your provider's snippet to `src/app/layout.tsx`.
 * If it is one of the three above, events start flowing with no code change
 * here. For anything else, add a branch to `forward()` below — this is the
 * only file that needs to know about the provider.
 *
 * You can also listen without any vendor at all:
 *   window.addEventListener("lucent:contact-click", (e) => console.log(e.detail));
 */

export type ContactChannelId = "whatsapp" | "call";

export type ContactClickEvent = {
  /** Which channel the visitor chose. */
  channel: ContactChannelId;
  /** Where on the site it was clicked, e.g. "floating-button", "footer". */
  location: string;
  /** Optional extra context, e.g. the service being enquired about. */
  context?: string;
};

/** Custom DOM event name, for listening without a vendor SDK. */
export const CONTACT_CLICK_EVENT = "lucent:contact-click";

type Gtag = (command: string, eventName: string, params: Record<string, unknown>) => void;
type Plausible = (event: string, options?: { props: Record<string, unknown> }) => void;

function forward(detail: ContactClickEvent) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & {
    gtag?: Gtag;
    dataLayer?: unknown[];
    plausible?: Plausible;
  };

  const params = {
    channel: detail.channel,
    location: detail.location,
    ...(detail.context ? { context: detail.context } : {}),
  };

  // GA4
  w.gtag?.("event", "contact_click", params);

  // Google Tag Manager
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: "contact_click", ...params });
  }

  // Plausible
  w.plausible?.("Contact Click", { props: params });

  // Always emit a DOM event so anything can subscribe with zero vendor lock-in.
  window.dispatchEvent(new CustomEvent(CONTACT_CLICK_EVENT, { detail }));
}

/**
 * Record a contact CTA click. Never throws — analytics must not break a
 * visitor's attempt to get in touch.
 */
export function trackContactClick(detail: ContactClickEvent): void {
  try {
    forward(detail);
  } catch {
    // Swallow: a failed metric is never worth breaking the CTA over.
  }
}
