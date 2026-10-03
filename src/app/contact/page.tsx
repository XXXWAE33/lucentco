import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, BadgeCheck, Clock, Mail, MapPin, Phone, Tag, Timer } from "lucide-react";
import { Container } from "@/components/ui";
import { ContactForm } from "@/components/features";
import { CallLink, PageHero, WhatsAppLink, WhatsAppIcon } from "@/components/layout";
import { VeloraRing, VeloraWordmark } from "@/components/layout/velora-wordmark";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & book",
  description:
    "Get a fast quote or book a clean with Velora Cleaning Brisbane. Call our Brisbane team or send an enquiry — we reply within one business hour.",
  alternates: { canonical: "/contact" },
};

/** Same claims made elsewhere on the site — nothing new is promised here. */
const PROMISES = [
  { icon: Timer, label: "Reply within one business hour" },
  { icon: BadgeCheck, label: "No call-out fee" },
  { icon: Tag, label: "Fixed prices" },
];

const tile =
  "group flex items-center gap-3 rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.12]";

export default function ContactPage() {
  return (
    <main className="pt-chrome">
      {/* ── Branded band ─────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Let's talk"
        title="Get a quote or"
        highlight="book your clean"
        intro="Tell us what you need and we'll get back to you within one business hour. Prefer to talk? Give the team a call."
        className="pb-40 sm:pb-44"
      >
            <ul className="mt-7 flex flex-wrap justify-center gap-2">
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
      </PageHero>

      {/* ── Form + details, pulled up over the band ──────────────────── */}
      <Container className="relative -mt-28 pb-16 sm:-mt-32 sm:pb-24">
        <div className="mx-auto grid max-w-6xl items-start gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          {/* Suspense required: the form reads prefill params from the URL. */}
          <Suspense
            fallback={
              <div className="min-h-[36rem] rounded-3xl border border-border bg-card shadow-lifted" />
            }
          >
            <ContactForm />
          </Suspense>

          {/* Brand contact card */}
          <aside className="relative overflow-hidden rounded-3xl bg-sage-900 p-5 ring-1 ring-inset ring-gold-400/25 text-white shadow-lifted sm:p-7 lg:sticky lg:top-[calc(var(--announce-h)+var(--header-h)+1.5rem)]">
            <VeloraRing strokeWidth={0.5} className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 text-gold-400/20" />

            <VeloraWordmark tagline title={null} strokeWidth={7} className="relative w-40 text-gold-400" />
            <p className="relative mt-4 text-sm leading-relaxed text-mint-100/75">
              Rather talk it through? Reach a real person on the team.
            </p>

            <div className="relative mt-5 grid gap-2.5">
              <CallLink location="contact-page" showIcon={false} className={tile}>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/15">
                  <Phone className="h-4 w-4 text-gold-300" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-mint-200/60">Call us</span>
                  <span className="block font-semibold tabular-nums">{site.phone}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-gold-300" />
              </CallLink>
              <WhatsAppLink location="contact-page" showIcon={false} className={tile}>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/15">
                  <WhatsAppIcon className="h-4 w-4 text-gold-300" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-mint-200/60">WhatsApp</span>
                  <span className="block font-semibold tabular-nums">{site.whatsapp}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-gold-300" />
              </WhatsAppLink>
              <a href={`mailto:${site.email}`} className={tile}>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/15">
                  <Mail className="h-4 w-4 text-gold-300" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-mint-200/60">Email</span>
                  <span className="block truncate font-semibold">{site.email}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-gold-300" />
              </a>
            </div>

            <dl className="relative mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-start gap-3">
                <dt className="sr-only">Office</dt>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                <dd className="text-mint-100/80">
                  {site.address.street}, {site.address.suburb} {site.address.state}{" "}
                  {site.address.postcode}
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="sr-only">Hours</dt>
                <Clock className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                <dd className="text-mint-100/80">{site.hours}</dd>
              </div>
            </dl>

            <div className="relative mt-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-inset ring-gold-400/20">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                Cleaners available this week
              </p>
              <p className="mt-1 text-xs text-mint-200/70">
                Book by Thursday for weekend availability across most suburbs.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
