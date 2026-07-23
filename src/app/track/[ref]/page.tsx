import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { BookingTracker } from "@/components/features";

export const metadata: Metadata = {
  title: "Track your clean",
  description: "Follow your Lucent Clean Co. booking in real time.",
  robots: { index: false, follow: false },
};

export default function TrackPage({
  params,
}: {
  params: { ref: string };
}) {
  const reference = decodeURIComponent(params.ref).toUpperCase();

  return (
    <main className="bg-eco-wash pt-16 lg:pt-18">
      <Container className="section-y">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-700 transition-colors hover:text-sage-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-6 text-center">
            <span className="eyebrow justify-center">Live tracking</span>
            <h1 className="mt-3 text-fluid-h2 font-semibold">
              Tracking booking{" "}
              <span className="text-gradient">{reference}</span>
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground">
              Follow your clean from confirmed to complete. This page updates
              automatically.
            </p>
          </div>

          <div className="mt-10">
            <BookingTracker reference={reference} />
          </div>

          {/* Honest demo note */}
          <p className="mt-6 flex items-start justify-center gap-2 text-center text-xs text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Demo tracking page — shown with sample data. A live system would
            stream your cleaner&apos;s real status here.
          </p>

          <div className="mt-8 text-center">
            <Button href="/contact" variant="outline" size="sm">
              Questions about your booking?
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
