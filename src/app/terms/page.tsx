import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `The terms on which ${site.name} provides its cleaning services.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

/*
 * TODO(client): have this reviewed by a legal adviser before launch. Every
 * clause below reflects only commitments already made elsewhere on this site
 * (fixed pricing, quotes confirmed before work, inspection-first services) —
 * nothing new is promised here.
 */
export default function TermsPage() {
  return (
    <main className="pt-chrome">
      <section className="bg-eco-wash">
        <Container className="section-y">
          <div className="mx-auto max-w-prose">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-4 text-fluid-h1 font-semibold">
              Terms of service
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated 29 July 2026
            </p>

            <div className="mt-8 space-y-8 text-[0.9375rem] leading-relaxed text-ink-700 sm:text-base">
              <TermsBlock title="Quotes & pricing">
                Prices shown on this site for carpet, couch, mattress and
                curtain cleaning are fixed for the quantities you select, and
                are confirmed with you before any work begins. Blind cleaning
                and flood or water-extraction work are quoted after inspection,
                because material, condition and extent genuinely change the
                job. The price we confirm is the price you pay — nothing is
                added on the day.
              </TermsBlock>

              <TermsBlock title="Booking & access">
                Bookings are confirmed by phone, WhatsApp or email. We ask that
                the areas being cleaned are accessible on arrival; we&apos;ll
                walk the job with you before starting and flag anything we find
                — existing damage, sun-perished fabric, staining that may not
                fully release — before a machine is switched on.
              </TermsBlock>

              <TermsBlock title="Rescheduling & cancellation">
                Plans change. Contact us as early as you can and we&apos;ll
                move your booking to a time that suits — there is no fee for
                rescheduling with reasonable notice.
              </TermsBlock>

              <TermsBlock title="Care of your property">
                Methods are matched to the fabric and material in front of us.
                Where an item can&apos;t be cleaned safely, we&apos;ll tell you
                rather than proceed. If something isn&apos;t right after a job,
                contact us and we&apos;ll make it right.
              </TermsBlock>

              <TermsBlock title="Contact">
                Questions about these terms: {site.email} or {site.phone}.
              </TermsBlock>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function TermsBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h2>
      <p className="mt-2 text-pretty">{children}</p>
    </section>
  );
}
