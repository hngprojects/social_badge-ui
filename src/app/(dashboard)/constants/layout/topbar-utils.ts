import { TopBarConfigItem } from "../../types/dashboard/topbar";
import { topBarConfig } from "./topbar-config";

export function getTopBarConfig(pathname: string): TopBarConfigItem {
  return (
    [...topBarConfig]
      .sort((a, b) => b.match.length - a.match.length)
      .find(
        (item) =>
          pathname === item.match || pathname.startsWith(`${item.match}/`),
      ) ?? topBarConfig[0]
  );
}

function getRelativeTimeLabel(dateValue?: string | null, now = Date.now()): string | null {
  if (!dateValue) return null;

  const timestamp = new Date(dateValue).getTime();
  if (Number.isNaN(timestamp)) return null;

  const elapsedMs = Math.max(0, now - timestamp);
  if (elapsedMs < 60_000) return "just now";

  const elapsedMinutes = Math.floor(elapsedMs / 60_000);
  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minute${elapsedMinutes === 1 ? "" : "s"} ago`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) {
    return `${elapsedHours} hour${elapsedHours === 1 ? "" : "s"} ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedDays < 7) {
    return `${elapsedDays} day${elapsedDays === 1 ? "" : "s"} ago`;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

export function getSavedStatusLabel(savedAt?: string | null, now = Date.now()): string {
  const relativeTime = getRelativeTimeLabel(savedAt, now);
  return relativeTime ? `Saved ${relativeTime}` : "Not saved yet";
}

export function getPublishedStatusLabel(
  publishedAt?: string | null,
  now = Date.now(),
): string {
  if (!publishedAt) return "PUBLISHED";

  const publishedTime = new Date(publishedAt).getTime();
  if (Number.isNaN(publishedTime)) return "PUBLISHED";

  const elapsedMs = Math.max(0, now - publishedTime);
  if (elapsedMs < 60_000) return "PUBLISHED JUST NOW";

  const elapsedMinutes = Math.floor(elapsedMs / 60_000);
  if (elapsedMinutes < 60) return `PUBLISHED ${elapsedMinutes}M AGO`;

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `PUBLISHED ${elapsedHours}H AGO`;

  return `PUBLISHED ${new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
    .format(new Date(publishedAt))
    .toUpperCase()}`;
}
