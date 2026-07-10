"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePublishedBadge } from "@/app/features/badges/hooks/use-published-badge";
import LiveHeroBanner from "../../../features/publised-badge/components/live-hero-banner";
import ShareableLinkCard from "../../../features/publised-badge/components/shareable-link-card";
import SpreadTheWord from "../../../features/publised-badge/components/spread-the-word";
import EmbedNewsletter from "../../../features/publised-badge/components/embed-newsletter";
import WhatsNext from "../../../features/publised-badge/components/whats-next";

export function PublishedBadgePageClient() {
  const searchParams = useSearchParams();
  const shareSlug = searchParams.get("slug");
  const { data, isLoading, isError } = usePublishedBadge(shareSlug);

  if (isLoading) {
    return (
      <div className="mx-auto mt-8 flex min-h-[40vh] w-full max-w-227 items-center justify-center sm:mt-16 sm:w-[90%]">
        <p className="text-sm text-gray-500">Loading your published badge…</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto mt-8 w-full max-w-227 space-y-4 text-center sm:mt-16 sm:w-[90%]">
        <h1 className="text-xl font-semibold text-gray-900">Badge link unavailable</h1>
        <p className="text-sm text-gray-500">
          We couldn&apos;t load this published badge. Open it from your dashboard or publish
          again.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex rounded-full bg-[#e8511a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d44816]"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  const embedImageUrl = data.logoUrl ?? data.fullUrl;

  return (
    <div className="mx-auto mt-8 w-full max-w-227 min-w-0 overflow-x-hidden sm:mt-16 sm:w-[90%]">
      <LiveHeroBanner badgeName={data.title} publishedAt={data.publishedAt} />
      <ShareableLinkCard url={data.displayUrl} fullUrl={data.fullUrl} access_code={data.access_code} />
      <SpreadTheWord url={data.fullUrl} badgeName={data.title} />
      <div className="mt-6">
        <EmbedNewsletter fullUrl={data.fullUrl} imageUrl={embedImageUrl} />
      </div>
      <WhatsNext fullUrl={data.fullUrl} templateId={data.templateId || undefined} />
    </div>
  );
}
