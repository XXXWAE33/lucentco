import Link from "next/link";
import { ArrowRight, BadgeCheck, Leaf, Phone, Tag } from "lucide-react";
import { Container } from "@/components/ui";
import { CallLink, WhatsAppLink, WhatsAppIcon } from "@/components/layout";
import { site } from "@/lib/site";
import { VeloraRing } from "@/components/layout/velora-wordmark";

const PROMISES = [
  { icon: Tag, label: "Fixed prices" },
  { icon: BadgeCheck, label: "No call-out fee" },
  { icon: Leaf, label: "Non-toxic products" },
];

/**
 * Closing CTA. Copy left, actions right (stacked on mobile).
 *
 * The primary action deep-links to `#instant-quote`, which opens the quote
 * sheet directly — "instant quote" should mean instant, not a contact form.
 */
export function CtaBand() {
  return (
    <section className="section-y">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-sage-900 px-5 py-8 shadow-lifted sm:rounded-4xl sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          {/* Atmosphere */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
            {/* The logo's "O" as an oversized brand ring. */}
            <VeloraRing strokeWidth={0.4} className="absolute -right-24 -top-24 h-[28rem] w-[28rem] text-gold-400/30" />
            <VeloraRing strokeWidth={0.6} className="absolute -bottom-40 -left-20 h-80 w-80 text-gold-400/20" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <h2 className="text-balance font-display text-[2rem] font-semibold leading-[1.1] text-white sm:text-5xl">
                Ready to{" "}
                <span className="bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 bg-clip-text text-transparent">
                  revive
                </span>{" "}
                your home?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-mint-100/80 sm:text-lg lg:mx-0">
                Your exact price in under two minutes. No forms, no waiting on a callback.
              </p>
              <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                {PROMISES.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-mint-100 ring-1 ring-inset ring-white/10"
                  >
                    <Icon className="h-3.5 w-3.5 text-gold-300" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                href="#instant-quote"
                className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-2 pl-5 text-sage-900 shadow-card transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-900"
              >
                <span>
                  <span className="block font-display text-lg font-semibold leading-tight">
                    Get an instant quote
                  </span>
                  <span className="block text-xs text-ink-500">Fixed price in three taps</span>
                </span>
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <CallLink
                  location="cta-band"
                  showIcon={false}
                  className="group flex flex-col gap-2 rounded-2xl bg-white/[0.07] p-4 text-left text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.12]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <Phone className="h-4 w-4 text-gold-300" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">Call us</span>
                    <span className="block truncate text-xs tabular-nums text-mint-200/70">
                      {site.phone}
                    </span>
                  </span>
                </CallLink>
                <WhatsAppLink
                  location="cta-band"
                  showIcon={false}
                  className="group flex flex-col gap-2 rounded-2xl bg-white/[0.07] p-4 text-left text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.12]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <WhatsAppIcon className="h-4 w-4 text-gold-300" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">WhatsApp</span>
                    <span className="block text-xs text-mint-200/70">Send a photo</span>
                  </span>
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
