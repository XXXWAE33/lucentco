import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/*
 * TODO(client): have this reviewed by a legal adviser before launch. It is a
 * plain-language policy that accurately describes what the site actually does
 * today (an enquiry form emailed to the business, no analytics installed) —
 * but it is not legal advice.
 */
export default function PrivacyPage() {
  return (
    <main className="pt-chrome">
      <section className="bg-eco-wash">
        <Container className="section-y">
          <div className="mx-auto max-w-prose">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-4 text-fluid-h1 font-semibold">Privacy policy</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated 29 July 2026
            </p>

            <div className="mt-8 space-y-8 text-[0.9375rem] leading-relaxed text-ink-700 sm:text-base">
              <PolicyBlock title="Who we are">
                {site.name} (ABN {site.abn}) provides specialist carpet,
                upholstery, mattress, curtain and blind cleaning across
                Brisbane. You can reach us at {site.email} or {site.phone}.
              </PolicyBlock>

              <PolicyBlock title="What we collect">
                When you send an enquiry we collect the details you give us:
                your name, email address, phone number, suburb, the service
                you&apos;re interested in, and your message. We don&apos;t ask
                for more than we need to quote and schedule your job.
              </PolicyBlock>

              <PolicyBlock title="How we use it">
                Your details are used solely to respond to your enquiry,
                prepare your quote and deliver the service you book. Enquiries
                are delivered to our business email. We do not sell, rent or
                trade your personal information.
              </PolicyBlock>

              <PolicyBlock title="Cookies & analytics">
                This site does not set marketing cookies. If we introduce
                analytics in future, this policy will be updated first.
              </PolicyBlock>

              <PolicyBlock title="Third-party services">
                Enquiry emails are delivered via our email provider. If you
                contact us on WhatsApp, that conversation is governed by
                WhatsApp&apos;s own privacy policy.
              </PolicyBlock>

              <PolicyBlock title="Access & correction">
                You can ask us at any time what information we hold about you,
                and ask us to correct or delete it. Email {site.email} and
                we&apos;ll action it promptly.
              </PolicyBlock>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function PolicyBlock({
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
