import {
  services,
  inspectionServices,
  isQuoteOnly,
  getMode,
  type InspectionPricing,
} from "@/config/pricing";
import { serviceContent } from "@/config/services-content";
import { ServiceCard } from "./service-card";
import { QuoteOnlyCard } from "./quote-only-card";

/**
 * Resting tilt per card position, in degrees.
 *
 * Alternating sign with a slight vertical offset gives the grid a diagonal
 * rhythm instead of a flat uniform table. Values stay under 2° — past that it
 * stops reading as considered and starts reading as a rendering bug.
 * Suppressed entirely below 640px inside `ServiceCard`.
 */
const TILTS = [-1.5, 1.2, -1, 1.4] as const;

/** Nudge every second card down so the row reads as an ascent. */
const OFFSETS = ["", "sm:translate-y-6", "", "sm:translate-y-6"] as const;

export function ServiceShowcase() {
  const priced = services.filter((s) => !isQuoteOnly(s.id));
  const blinds = services.find((s) => isQuoteOnly(s.id));
  const flood = inspectionServices[0];

  const blindPricing = blinds
    ? (getMode(blinds.id).pricing as InspectionPricing)
    : null;

  return (
    <div>
      {/* Priced services — tilted grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
        {priced.map((service, i) => (
          <div key={service.id} className={OFFSETS[i % OFFSETS.length]}>
            <ServiceCard
              service={service}
              index={i}
              rotation={TILTS[i % TILTS.length]}
            />
          </div>
        ))}
      </div>

      {/* Quote-only — deliberately distinct, full width */}
      <div className="mt-8 space-y-8 sm:mt-16 lg:space-y-10">
        {blinds && blindPricing && (
          <QuoteOnlyCard
            name={blinds.name}
            tagline={blinds.tagline}
            blurb={blinds.blurb}
            process={serviceContent.blind.process}
            differentiators={serviceContent.blind.differentiators}
            image={serviceContent.blind.image}
            iconKey="blind"
            anchorId="blind"
            chips={[
              `Minimum $${blindPricing.minimumCharge}`,
              "Volume discounts from 6",
              "Free quote",
            ]}
          />
        )}

        <QuoteOnlyCard
          name={flood.name}
          tagline={flood.tagline}
          blurb={flood.blurb}
          process={serviceContent["flood-damage"].process}
          differentiators={serviceContent["flood-damage"].differentiators}
          image={serviceContent["flood-damage"].image}
          iconKey="flood"
          anchorId="flood-damage"
          chips={["Inspection required", "Written scope before work starts"]}
          index={1}
        />
      </div>
    </div>
  );
}
