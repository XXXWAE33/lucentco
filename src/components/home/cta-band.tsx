import { ArrowRight, Phone } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="section-y">
      <Container>
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-sage-800 via-sage-700 to-emerald-700 px-6 py-14 text-center shadow-lifted sm:px-12 sm:py-20">
          {/* Decorative bubbles */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-fluid-h2 font-semibold text-white text-balance">
              Ready for a home that feels lucent?
            </h2>
            <p className="mt-4 text-pretty text-lg text-mint-100/90">
              Get a transparent instant quote in under two minutes — no call-out
              fees, no surprises, just a beautifully clean space.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="accent" size="lg">
                Get an instant quote <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={site.phoneHref}
                size="lg"
                className="border border-white/40 bg-white/10 text-white hover:bg-white/20"
              >
                <Phone className="h-4 w-4" /> {site.phone}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
