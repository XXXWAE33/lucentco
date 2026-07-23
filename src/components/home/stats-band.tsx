import { Container } from "@/components/ui";
import { CountUp, RevealGroup, RevealItem } from "@/components/motion";
import { stats } from "@/lib/content";

/** Proof-stats band with scroll-triggered count-up. */
export function StatsBand() {
  return (
    <section className="section-y">
      <Container>
        <div className="rounded-4xl bg-sage-900 px-6 py-12 text-mint-100 sm:px-12 sm:py-16">
          <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const num = parseFloat(stat.value);
              const decimals = stat.value.includes(".") ? 1 : 0;
              return (
                <RevealItem key={stat.label} className="text-center sm:text-left">
                  <div className="font-display text-4xl font-semibold text-white sm:text-5xl">
                    <CountUp value={num} decimals={decimals} />
                    <span className="text-emerald-400">{stat.suffix}</span>
                  </div>
                  <p className="mt-2 font-medium text-mint-100">{stat.label}</p>
                  <p className="mt-0.5 text-sm text-mint-200/70">{stat.detail}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
