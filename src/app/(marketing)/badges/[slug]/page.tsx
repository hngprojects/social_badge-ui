
"use client";

import { useParams } from "next/navigation";
import { usePublishedBadge } from "@/app/features/templates/hooks/usePublishedBadge";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PublicBadgePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data, isLoading, isError } = usePublishedBadge(slug);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground font-medium">Loading badge details...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-destructive/10 p-4 rounded-full mb-6">
          <svg className="w-12 h-12 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Badge Not Found</h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          The badge you are looking for might have been removed or the link is invalid. Please check the URL and try again.
        </p>
        <Button asChild className="mt-8" variant="cta">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      <div className="max-w-3xl w-full">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-primary uppercase bg-primary/10 rounded-full">
          Coming Soon
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-8">
          Get Ready for <span className="text-primary">{data.title}</span>
        </h1>

        <div className="space-y-6 mb-12">
          <p className="text-xl text-muted-foreground leading-relaxed">
            This badge is specially designed for <span className="font-semibold text-foreground">{data.title}</span>.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are working hard behind the scenes to make the badge generation feature available to you. Soon, you&apos;ll be able to create, customize, and share your own unique badge for this event!
          </p>
        </div>

        <div className="relative p-10 overflow-hidden border rounded-3xl bg-linear-to-b from-muted/50 to-muted/20 border-border shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-4">What to expect?</h2>
          <ul className="text-left max-w-md mx-auto space-y-3">
            {[
              "Instant badge generation",
              "Personalized name and details",
              "Multiple template variations",
              "One-click social media sharing"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/">Explore more badges</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
