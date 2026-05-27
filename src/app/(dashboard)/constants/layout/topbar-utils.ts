import { TopBarConfigItem } from "../../types/dashboard/topbar";
import { topBarConfig } from "./topbar-config";

export function getTopBarConfig(pathname: string): TopBarConfigItem {
  return (
    [...topBarConfig]
      .sort((a, b) => b.match.length - a.match.length)
      .find((item) => pathname.startsWith(item.match)) ?? topBarConfig[0]
  );
}

export function getPublishedStatusLabel(publishedAt?: string | null): string {
  if (!publishedAt) return "PUBLISHED";

  const publishedTime = new Date(publishedAt).getTime();
  if (Number.isNaN(publishedTime)) return "PUBLISHED";

  const elapsedMs = Date.now() - publishedTime;
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
