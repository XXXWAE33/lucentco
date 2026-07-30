"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CallLink, WhatsAppLink, WhatsAppIcon } from "./contact-link";
import { AnnouncementBar } from "./announcement-bar";

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
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />

      {/*
        Mobile: a detached rounded card floating on the page, per the reference.
        Desktop: a conventional full-width bar — a floating card at 1400px reads
        as a widget rather than site chrome.
      */}
      <div className="px-3 pt-3 lg:px-0 lg:pt-0">
        <div
          className={cn(
            "rounded-2xl transition-all duration-300 ease-out-soft lg:rounded-none",
            scrolled
              ? "bg-background/90 shadow-card backdrop-blur-xl lg:border-b lg:border-border/70 lg:shadow-none"
              : "bg-background/80 shadow-soft backdrop-blur-xl lg:border-b lg:border-transparent lg:bg-transparent lg:shadow-none lg:backdrop-blur-none",
          )}
        >
          <nav
            aria-label="Primary"
            className="mx-auto flex h-14 max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:h-18 lg:px-8"
          >
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-sage-50 text-sage-800"
                      : "text-ink-600 hover:bg-sage-50 hover:text-sage-800",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions — phone is the primary CTA. */}
          <div className="hidden items-center gap-2 lg:flex">
            <WhatsAppLink
              location="header-desktop"
              showIcon={false}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-sage-50 hover:text-emerald-700"
            >
              <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
            </WhatsAppLink>
            <CallLink
              location="header-desktop"
              showIcon={false}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-all hover:shadow-glow active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </CallLink>
            <Button href="/contact" variant="outline" size="sm">
              Get a quote <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-sage-50 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </nav>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {/* Backdrop */}
        <button
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 top-[calc(var(--announce-h)+var(--header-h))] bg-ink-950/20 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Panel */}
        <div
          className={cn(
            "fixed inset-x-0 top-[calc(var(--announce-h)+var(--header-h))] origin-top rounded-b-2xl border-b border-border bg-background px-4 pb-7 pt-4 shadow-lifted transition-all duration-300 ease-out-soft",
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0",
          )}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-sage-50 text-sage-800"
                      : "text-ink-700 hover:bg-sage-50",
                  )}
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-ink-400" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-3">
            <Button href="/contact" variant="accent" size="lg" className="w-full">
              Get an instant quote <ArrowRight className="h-4 w-4" />
            </Button>

            {/* Both channels as large, thumb-friendly tap targets. */}
            <div className="grid gap-3 sm:grid-cols-2">
              <CallLink
                location="header-mobile-menu"
                showIcon={false}
                className="flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 rounded-2xl border border-sage-200 bg-sage-50/60 px-4 py-3 transition-colors active:bg-sage-100"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-sage-800">
                  <Phone className="h-4 w-4" /> Call
                </span>
                <span className="text-xs text-muted-foreground">
                  {site.phone}
                </span>
              </CallLink>

              <WhatsAppLink
                location="header-mobile-menu"
                showIcon={false}
                className="flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 transition-colors active:bg-emerald-100"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </span>
                <span className="text-xs text-emerald-700/70">
                  {site.whatsapp}
                </span>
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
