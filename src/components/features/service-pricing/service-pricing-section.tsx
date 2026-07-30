import { RevealGroup, RevealItem } from "@/components/motion";
import { Reveal } from "@/components/motion";
import { services, isQuoteOnly } from "@/config/pricing";
import { ServicePriceCard } from "./service-price-card";
import { InspectionPanel } from "./inspection-panel";

/**
 * The full services + pricing surface: interactive cards for everything with a
 * fixed rate, then a dedicated panel for the services we only quote in person.
 */
export function ServicePricingSection() {
  const priced = services.filter((s) => !isQuoteOnly(s.id));

  return (
    <div>
      <RevealGroup className="grid gap-6 lg:grid-cols-2">
        {priced.map((service) => (
          <RevealItem key={service.id} className="h-full">
            <ServicePriceCard service={service} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-6">
        <InspectionPanel />
      </Reveal>
    </div>
  );
}
