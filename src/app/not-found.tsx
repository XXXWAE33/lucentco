import type { Metadata } from "next";
import { Button, Container } from "@/components/ui";
import { ArrowRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="bg-eco-wash pt-16 lg:pt-18">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-section text-center">
        <span className="eyebrow">Error 404</span>
        <h1 className="text-fluid-h1 font-semibold">
          This page has been <span className="text-gradient">wiped clean</span>.
        </h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          The page you&apos;re after doesn&apos;t exist or has moved. Let&apos;s
          get you back to a fresh start.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary">
            <Home className="h-4 w-4" /> Back home
          </Button>
          <Button href="/contact" variant="outline">
            Get a quote <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </main>
  );
}
