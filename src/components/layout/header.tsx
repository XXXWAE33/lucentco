"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { lockScroll } from "@/lib/scroll-lock";
import { CallLink, WhatsAppLink, WhatsAppIcon } from "./contact-link";
import { AnnouncementBar } from "./announcement-bar";
import { VeloraRing } from "./velora-wordmark";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Solidify the bar after a small scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const unlock = lockScroll();
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />

      {/* Plain white bar; a hairline appears once the page scrolls. */}
      <div>
        <div
          className={cn(
            "border-b transition-colors duration-300",
            // Goes dark with the mobile menu so bar + panel read as one surface.
            open
              ? "border-white/10 bg-sage-900 lg:border-border lg:bg-background"
              : scrolled
                ? "border-border bg-background"
                : "border-transparent bg-background",
          )}
        >
          <nav
            aria-label="Primary"
            className="mx-auto grid h-14 max-w-content grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:h-18 lg:grid-cols-[1fr_auto_1fr] lg:px-8"
          >
          <Logo tone={open ? "light" : "default"} />

          {/* Desktop nav — centred between logo and actions. */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
                    isActive(link.href)
                      ? "text-emerald-700"
                      : "text-ink-900 hover:text-emerald-700",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions — phone is the primary CTA. */}
          <div className="hidden items-center justify-end gap-2 lg:flex">
            <WhatsAppLink
              location="header-desktop"
              showIcon={false}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-sage-50 hover:text-emerald-700"
            >
              <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
            </WhatsAppLink>
            <Button href="/contact" variant="accent" className="h-10 px-4 text-sm">
              Get a quote
            </Button>
            <CallLink
              location="header-desktop"
              showIcon={false}
              className="inline-flex h-10 items-center gap-2 rounded-btn border border-sage-800 px-4 text-sm font-medium text-sage-900 transition-colors hover:bg-sage-50"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </CallLink>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center justify-self-end rounded-full transition-colors lg:hidden",
              open
                ? "bg-white/10 text-gold-300 hover:bg-white/15"
                : "text-ink-900 hover:bg-sage-50",
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu — full-height dark panel under the bar. */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[calc(var(--announce-h)+var(--header-h))] overflow-hidden bg-sage-900 text-white transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <VeloraRing
          strokeWidth={0.4}
          className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] text-gold-400/20"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"
        />

        <div
          className="relative flex h-full flex-col overflow-y-auto px-5 pb-6 pt-4"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <ul className="flex flex-col">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li
                  key={link.href}
                  className={cn(
                    "border-b border-white/10 transition-all duration-500 ease-out-soft",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-center gap-4 py-4"
                  >
                    <span className="w-6 font-display text-xs font-semibold tabular-nums text-gold-400/80">
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-2xl font-semibold tracking-tight transition-colors",
                        active ? "text-gold-300" : "text-white group-active:text-gold-300",
                      )}
                    >
                      {link.label}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 transition-transform group-active:translate-x-0.5",
                        active ? "text-gold-300" : "text-white/30",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className={cn(
              "mt-auto flex flex-col gap-3 pt-8 transition-all duration-500 ease-out-soft",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: open ? "340ms" : "0ms" }}
          >
            <Link
              href="/#instant-quote"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white p-2 pl-5 text-sage-900 shadow-card"
            >
              <span>
                <span className="block font-display text-lg font-semibold leading-tight">
                  Get an instant quote
                </span>
                <span className="block text-xs text-ink-500">Fixed price in three taps</span>
              </span>
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <CallLink
                location="header-mobile-menu"
                showIcon={false}
                className="flex flex-col gap-2 rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-inset ring-white/10 transition-colors active:bg-white/[0.12]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400/15">
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
                location="header-mobile-menu"
                showIcon={false}
                className="flex flex-col gap-2 rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-inset ring-white/10 transition-colors active:bg-white/[0.12]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400/15">
                  <WhatsAppIcon className="h-4 w-4 text-gold-300" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">WhatsApp</span>
                  <span className="block truncate text-xs tabular-nums text-mint-200/70">
                    {site.whatsapp}
                  </span>
                </span>
              </WhatsAppLink>
            </div>

            <p className="mt-1 flex items-center justify-center gap-2 text-xs text-mint-200/60">
              <Clock className="h-3.5 w-3.5 text-gold-400" />
              {site.hours}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
