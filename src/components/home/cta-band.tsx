import { ArrowRight, Phone } from "lucide-react";
import { Container, Button } from "@/components/ui";
import {
  CallLink,
  WhatsAppLink,
  WhatsAppIcon,
  darkContactPillClass,
} from "@/components/layout";
import { cn } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="section-y">
      <Container>
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-sage-800 via-sage-700 to-emerald-700 px-5 py-10 text-center shadow-lifted sm:px-12 sm:py-20">
          {/* Decorative bubbles */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-fluid-h2 font-semibold text-white text-balance">
              Ready for a home that feels lucent?
            </h2>
            <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-mint-100/90 sm:mt-4 sm:text-lg">
              Get a transparent instant quote in under two minutes — no call-out
              fees, no surprises, just a beautifully clean space.
            </p>
            {/*
              Mobile: primary CTA full-width, then call/WhatsApp as an equal
              pair — a deliberate stack instead of three ragged wrapped pills.
            */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <Button href="/contact" variant="accent" size="lg" className="w-full sm:w-auto">
                Get an instant quote <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-2 gap-3 sm:contents">
                <CallLink
                  location="cta-band"
                  showIcon={false}
                  className={cn(darkContactPillClass, "w-full sm:w-auto")}
                >
                  <Phone className="h-4 w-4" /> Call
                </CallLink>
                <WhatsAppLink
                  location="cta-band"
                  showIcon={false}
                  className={cn(darkContactPillClass, "w-full sm:w-auto")}
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
