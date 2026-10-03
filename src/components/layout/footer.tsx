import Link from "next/link";
import { ArrowRight, Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "@/components/ui";
import { site, serviceSuburbs, navLinks } from "@/lib/site";
import { CallLink, WhatsAppLink, WhatsAppIcon } from "./contact-link";
import { VeloraWordmark } from "./velora-wordmark";

const serviceLinks = [
  { label: "Carpet cleaning", href: "/pricing#carpet" },
  { label: "Couch cleaning", href: "/pricing#couch" },
  { label: "Mattress cleaning", href: "/pricing#mattress" },
  { label: "Curtain cleaning", href: "/pricing#curtain" },
  { label: "Blind cleaning", href: "/pricing#blind" },
  { label: "Flood & water", href: "/pricing#flood-damage" },
];

const linkClass =
  "inline-flex min-h-[36px] items-center text-sm text-mint-100/75 transition-colors hover:text-white lg:min-h-0";

const tileClass =
  "group flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.09]";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sage-900 text-mint-100">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl"
      />

      <Container className="relative pt-12 sm:pt-16">
        {/* ── Top: brand + quick CTA ──────────────────────────────────── */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Logo tone="light" tagline />
            <p className="mt-4 text-pretty text-sm leading-relaxed text-mint-200/75">
              Specialist carpet, upholstery, mattress and curtain care for
              Brisbane homes — non-toxic products, careful local technicians,
              and fixed prices you can check before you call.
            </p>
          </div>
          <Link
            href="/#instant-quote"
            className="group inline-flex items-center justify-between gap-6 self-start rounded-full bg-emerald-500 py-2 pl-6 pr-2 font-semibold text-white shadow-soft transition-colors hover:bg-emerald-600 lg:self-auto"
          >
            Get your price
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* ── Middle: links + contact ─────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 lg:grid-cols-[1fr_1fr_1.4fr]">
          <nav aria-label="Services">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-400">
              Services
            </h2>
            <ul className="mt-4 space-y-1.5 lg:space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-400">
              Company
            </h2>
            <ul className="mt-4 space-y-1.5 lg:space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className={linkClass}>
                  Book a clean
                </Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-400">
              Get in touch
            </h2>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <CallLink location="footer" showIcon={false} className={tileClass}>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-400/10">
                  <Phone className="h-4 w-4 text-gold-300" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-mint-200/60">Call</span>
                  <span className="block truncate text-sm font-semibold tabular-nums text-white">
                    {site.phone}
                  </span>
                </span>
              </CallLink>
              <WhatsAppLink location="footer" showIcon={false} className={tileClass}>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-400/10">
                  <WhatsAppIcon className="h-4 w-4 text-gold-300" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-mint-200/60">WhatsApp</span>
                  <span className="block truncate text-sm font-semibold tabular-nums text-white">
                    {site.whatsapp}
                  </span>
                </span>
              </WhatsAppLink>
              <a href={`mailto:${site.email}`} className={`${tileClass} sm:col-span-2`}>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-400/10">
                  <Mail className="h-4 w-4 text-gold-300" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-mint-200/60">Email</span>
                  <span className="block truncate text-sm font-semibold text-white">
                    {site.email}
                  </span>
                </span>
              </a>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-mint-200/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                {site.address.street}, {site.address.suburb} {site.address.state}{" "}
                {site.address.postcode}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold-300" />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* ── Suburbs ─────────────────────────────────────────────────── */}
        <div className="border-t border-gold-400/15 py-6">
          <p className="text-xs leading-relaxed text-mint-200/55">
            <span className="font-semibold text-mint-200/80">Proudly cleaning across Brisbane — </span>
            {serviceSuburbs.join(" · ")} &amp; surrounding suburbs.
          </p>
        </div>

        {/* ── Legal ───────────────────────────────────────────────────── */}
        <div className="flex flex-col-reverse gap-4 border-t border-white/10 py-6 text-xs text-mint-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · ABN {site.abn}
          </p>
          <div className="flex items-center gap-2">
            <Link href="/privacy" className="px-2 py-2 transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="px-2 py-2 transition-colors hover:text-white">
              Terms
            </Link>
            <span className="mx-1 h-4 w-px bg-white/10" aria-hidden="true" />
            <a
              href={site.socials.instagram}
              aria-label="Velora Cleaning Brisbane on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-mint-100 transition-colors hover:bg-gold-500 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.socials.facebook}
              aria-label="Velora Cleaning Brisbane on Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-mint-100 transition-colors hover:bg-gold-500 hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark — decorative sign-off. */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden px-4 sm:px-8">
        <VeloraWordmark
          title={null}
          strokeWidth={4}
          className="mx-auto -mb-[3%] w-full max-w-6xl text-gold-400/[0.14]"
        />
      </div>
    </footer>
  );
}
