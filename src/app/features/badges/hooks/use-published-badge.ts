"use client";

import { useQuery } from "@tanstack/react-query";
import {
  buildParticipantShareUrl,
  formatShareUrlForDisplay,
} from "../lib/badge-share-url";
import { readPublishedBadgeResult } from "../lib/published-badge-session";
import { getPublicParticipantPage } from "../services/templates";

export interface PublishedBadgeDisplay {
  templateId: string;
  title: string;
  shareSlug: string;
  fullUrl: string;
  displayUrl: string;
  logoUrl: string | null;
  publishedAt: string | null;
  defaultCaption: string | null;
  destinationLink: string | null;
  access_code: string | null;
  access_type: number;
}

export function usePublishedBadge(shareSlug: string | null) {
  const sessionResult = shareSlug ? readPublishedBadgeResult(shareSlug) : null;

  const publicQuery = useQuery({
    queryKey: ["public-participant", shareSlug],
    queryFn: async () => {
      if (!shareSlug) return null;
      const response = await getPublicParticipantPage(shareSlug);
      return response.data;
    },
    enabled: Boolean(shareSlug),
    retry: 1,
  });

  if (!shareSlug) {
    return {
      data: null,
      isLoading: false,
      isError: true,
      error: new Error("Missing share link."),
    };
  }

  const fullUrl = buildParticipantShareUrl(shareSlug);
  const displayUrl = formatShareUrlForDisplay(fullUrl);
  const publicData = publicQuery.data;
  const hasSource = Boolean(sessionResult || publicData);
  const isLoading = publicQuery.isLoading && !sessionResult;
  const isError = !isLoading && !hasSource && publicQuery.isError;

  const data: PublishedBadgeDisplay | null = hasSource
    ? {
        templateId: sessionResult?.id ?? "",
        title: publicData?.title ?? sessionResult?.title ?? "Your badge",
        shareSlug,
        fullUrl,
        displayUrl,
        logoUrl: publicData?.logo_url ?? null,
        publishedAt: sessionResult?.published_at ?? null,
        defaultCaption: publicData?.default_caption ?? null,
        destinationLink: publicData?.destination_link ?? null,
        access_code: publicData?.access_code ?? null,
        access_type: publicData?.access_type ?? 0,
      }
    : null;

  return {
    data,
    isLoading,
    isError,
    error: publicQuery.error,
  };
}
