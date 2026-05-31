"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getPublishedStatusLabel,
  getSavedStatusLabel,
  getTopBarConfig,
} from "@/app/(dashboard)/constants/layout/topbar-utils";
import { useLoadOrganiserTemplate } from "@/app/features/templates/hooks/useLoadOrganiserTemplate";
import { useLoadPlatformTemplate } from "@/app/features/templates/hooks/useLoadPlatformTemplate";
import { usePublishedBadge } from "@/app/features/templates/hooks/usePublishedBadge";
import type { TopBarAction } from "@/app/(dashboard)/types/dashboard/topbar";

export function useDashboardTopbarState() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const config = getTopBarConfig(pathname);

  const isCreatePage = config.match === "/create-badges";
  const isCustomizePage = config.match === "/create-badges/customize";
  const isPublishedPage = config.match === "/badges/published";
  const isFlowPage = isCreatePage || isCustomizePage || isPublishedPage;
  const [now, setNow] = useState(() => Date.now());

  const platformTemplateId = searchParams.get("template");
  const organiserTemplateId = searchParams.get("id");
  const shareSlug = searchParams.get("slug");
  const platformId = platformTemplateId ?? "bold_name_pink_v1";

  const { data: organiserTemplate } = useLoadOrganiserTemplate(
    isCustomizePage ? organiserTemplateId : isPublishedPage ? organiserTemplateId : null,
  );
  const { data: platformTemplate } = useLoadPlatformTemplate(
    isCustomizePage && !organiserTemplateId ? platformId : null,
  );
  const { data: publishedBadge } = usePublishedBadge(
    isPublishedPage ? shareSlug : null,
  );

  const customizeTitle =
    organiserTemplate?.title || platformTemplate?.title || config.title || "";
  const isSaved = Boolean(organiserTemplate?.savedAt);
  const savedStatus = getSavedStatusLabel(organiserTemplate?.savedAt, now);

  const publishedTemplateId = publishedBadge?.templateId || organiserTemplateId;
  const publishedTitle =
    publishedBadge?.title || organiserTemplate?.title || config.title || "";
  const publishedStatus = getPublishedStatusLabel(
    publishedBadge?.publishedAt,
    now,
  );
  const publishedEditHref = publishedTemplateId
    ? `/create-badges/customize?id=${encodeURIComponent(publishedTemplateId)}`
    : "/dashboard";

  const flowTitle = isPublishedPage ? publishedTitle : customizeTitle;
  const menuActions: TopBarAction[] = isPublishedPage
    ? [
        { label: "Edit badge", href: publishedEditHref },
        { label: "View analytics", href: "#analytics" },
      ]
    : config.actions ?? [];

  useEffect(() => {
    if (!isCustomizePage && !isPublishedPage) return;

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, [isCustomizePage, isPublishedPage]);

  return {
    pathname,
    config,
    isCreatePage,
    isCustomizePage,
    isPublishedPage,
    isFlowPage,
    customizeTitle,
    isSaved,
    savedStatus,
    flowTitle,
    publishedTitle,
    publishedStatus,
    publishedEditHref,
    menuActions,
  };
}
