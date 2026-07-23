import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Sparkles } from "lucide-react";
import { Container } from "@/components/ui";
import { ContactForm } from "@/components/features";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & book",
  description:
    "Get a fast quote or book a clean with Lucent Clean Co. Call our Brisbane team or send an enquiry — we reply within one business hour.",
  alternates: { canonical: "/contact" },
};

const details = [
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Office",
    value: `${site.address.street}, ${site.address.suburb} ${site.address.state} ${site.address.postcode}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: site.hours,
  },
];

export default function ContactPage() {
  return (
    <main className="bg-eco-wash pt-16 lg:pt-18">
      <Container className="section-y">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Sparkles className="h-4 w-4" /> Let&apos;s talk
          </span>
          <h1 className="mt-4 text-fluid-h1 font-semibold">
            Get a quote or{" "}
            <span className="text-gradient">book your clean</span>
          </h1>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            Tell us what you need and we&apos;ll get back to you within one
            business hour. Prefer to talk? Give the team a call.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          {/* Details */}
          <div className="space-y-4">
            {details.map((d) => {
              const content = (
                <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-card">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {d.label}
                    </p>
                    <p className="mt-0.5 font-medium text-foreground">
                      {d.value}
                    </p>
                  </div>
                </div>
              );
              return d.href ? (
                <a key={d.label} href={d.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={d.label}>{content}</div>
              );
            })}

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5">
              <p className="flex items-center gap-2 font-medium text-emerald-800">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Cleaners available this week
              </p>
              <p className="mt-1 text-sm text-emerald-700/80">
                Book by Thursday for weekend availability across most suburbs.
              </p>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
