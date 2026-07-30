import Link from "next/link";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * Service notice — the reference's long-form disclaimer block, adapted.
 *
 * The reference needs heavy legal text because it sells simulated financial
 * products. A cleaning business doesn't, so padding this out with borrowed
 * legalese would be theatre. What belongs here is the small print that is
 * genuinely useful and genuinely true: which prices are fixed, which are
 * quoted on inspection, and the two things we tell customers before starting.
 *
 * Every statement below already appears elsewhere on the site (/pricing,
 * /terms, the service process copy) — this restates it, it does not invent it.
 */
export function ServiceNotice() {
  return (
    <section className="border-t border-sage-800/40 bg-sage-900 text-mint-100">
      <Container className="py-section-sm">
        <div className="mx-auto max-w-prose">
          <h2 className="font-display text-base font-semibold text-white">
            Good to know
          </h2>

          <div className="mt-5 space-y-5 text-[0.8125rem] leading-relaxed text-mint-200/75 sm:text-sm">
            <div>
              <h3 className="font-semibold text-mint-100">Fixed pricing</h3>
              <p className="mt-1.5 text-pretty">
                Carpet, couch, mattress and curtain cleaning are charged at the
                rates published on our{" "}
                <Link
                  href="/pricing"
                  className="font-medium text-emerald-300 underline-offset-4 hover:underline"
                >
                  pricing page
                </Link>
                , for the quantities you select. We confirm the figure with you
                before any work begins, and nothing is added on the day. There
                is no call-out fee.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-mint-100">
                Quoted on inspection
              </h3>
              <p className="mt-1.5 text-pretty">
                Blind cleaning and flood or water-extraction work are not priced
                online. Material, size, condition and — for water damage — how
                long the water has been sitting all materially change the job.
                We inspect first and give you the scope in writing. A minimum
                service charge applies to blind work.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-mint-100">
                Before we start
              </h3>
              <p className="mt-1.5 text-pretty">
                Methods are matched to the fabric or material in front of us. We
                walk the job with you first and flag what we find — existing
                wear, sun-perished fabric, staining that may not fully release —
                before a machine is switched on. Where something can&apos;t be
                cleaned safely, we say so rather than proceed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-mint-100">Products</h3>
              <p className="mt-1.5 text-pretty">
                We use plant-based, non-toxic products as standard. Deodoriser
                is included on every couch clean at no additional cost.
              </p>
            </div>
          </div>

          <p className="mt-7 border-t border-sage-800/60 pt-5 text-xs text-mint-200/55">
            Full{" "}
            <Link
              href="/terms"
              className="font-medium text-emerald-300 underline-offset-4 hover:underline"
            >
              terms of service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-emerald-300 underline-offset-4 hover:underline"
            >
              privacy policy
            </Link>
            . Questions: {site.email} or {site.phone}.
          </p>
        </div>
      </Container>
    </section>
  );
}
