import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Leaf } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "@/components/ui";
import { site, serviceSuburbs, navLinks } from "@/lib/site";

const serviceLinks = [
  { label: "Residential cleaning", href: "/services#residential" },
  { label: "End of lease & bond", href: "/services#end-of-lease" },
  { label: "Carpet & upholstery", href: "/services#specialty" },
  { label: "Commercial & office", href: "/services#commercial" },
  { label: "Airbnb turnover", href: "/services#commercial" },
];

export function Footer() {
  return (
    <footer className="border-t border-sage-800/40 bg-sage-900 text-mint-100">
      <Container className="py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Logo tone="light" />
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-mint-200/80">
              Premium, eco-friendly cleaning for Brisbane homes and businesses —
              non-toxic products, vetted local cleaners, and a finish you can
              feel.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={site.socials.instagram}
                aria-label="Lucent Clean Co. on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-800 text-mint-100 transition-colors hover:bg-emerald-600 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={site.socials.facebook}
                aria-label="Lucent Clean Co. on Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-800 text-mint-100 transition-colors hover:bg-emerald-600 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mint-200/70">
              Services
            </h2>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-mint-100/85 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mint-200/70">
              Company
            </h2>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-mint-100/85 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-mint-100/85 transition-colors hover:text-white"
                >
                  Book a clean
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mint-200/70">
              Get in touch
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-3 text-mint-100/85 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 text-mint-100/85 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-mint-100/85">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.suburb} {site.address.state}{" "}
                  {site.address.postcode}
                </span>
              </li>
              <li className="text-mint-200/70">{site.hours}</li>
            </ul>
          </div>
        </div>

        {/* Suburbs */}
        <div className="mt-12 border-t border-sage-800/60 pt-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-mint-200/70">
            <Leaf className="h-4 w-4 text-emerald-400" /> Proudly cleaning across
            Brisbane
          </h2>
          <p className="text-sm leading-relaxed text-mint-200/60">
            {serviceSuburbs.join(" · ")} &amp; surrounding suburbs.
          </p>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col gap-3 border-t border-sage-800/60 pt-6 text-xs text-mint-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. ABN {site.abn}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
