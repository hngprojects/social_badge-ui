import type { PublishedTemplateData } from "../../dashboard/templates-types/organiser-template";

const STORAGE_PREFIX = "published-badge:";

function storageKey(shareSlug: string): string {
  return `${STORAGE_PREFIX}${shareSlug}`;
}

export function storePublishedBadgeResult(data: PublishedTemplateData): void {
  if (!data.share_slug || typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(storageKey(data.share_slug), JSON.stringify(data));
}

export function readPublishedBadgeResult(
  shareSlug: string,
): PublishedTemplateData | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(storageKey(shareSlug));
    if (!raw) return null;
    return JSON.parse(raw) as PublishedTemplateData;
  } catch {
    return null;
  }
}
