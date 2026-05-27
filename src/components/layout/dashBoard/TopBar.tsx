"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getTopBarConfig, getPublishedStatusLabel } from "@/app/(dashboard)/constants/layout/topbar-utils";
import { useLoadOrganiserTemplate } from "@/app/features/templates/hooks/useLoadOrganiserTemplate";
import { useLoadPlatformTemplate } from "@/app/features/templates/hooks/useLoadPlatformTemplate";
import { usePublishedBadge } from "@/app/features/templates/hooks/usePublishedBadge";
import { DashboardBar } from "@/app/(dashboard)/components/topbar/DashboardBar";
import { CreateBadgeBar } from "@/app/(dashboard)/components/topbar/CreateBadgeBar";
import { CustomizeBar } from "@/app/(dashboard)/components/topbar/CustomizeBar";
import { PublishedBar } from "@/app/(dashboard)/components/topbar/PublishedBar";

export default function TopBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const config = getTopBarConfig(pathname);

  const isCustomizePage = config.match === "/create-badges/customize";
  const isPublishedPage = config.match === "/badges/published";

  const platformTemplateId = searchParams.get("template");
  const organiserTemplateId = searchParams.get("id");
  const shareSlug = searchParams.get("slug");

  const platformId = platformTemplateId ?? "tpl_achieveher";

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

  const publishedTemplateId = publishedBadge?.templateId || organiserTemplateId;
  const publishedTitle =
    publishedBadge?.title || organiserTemplate?.title || config.title || "";
  const publishedStatus = getPublishedStatusLabel(publishedBadge?.publishedAt);
  const publishedEditHref = publishedTemplateId
    ? `/create-badges/customize?id=${encodeURIComponent(publishedTemplateId)}`
    : "/dashboard";

  return (
    <section className="flex items-center w-full justify-between gap-6">
      {(config.match === "/dashboard" || config.match === "/settings") && (
        <DashboardBar config={config} />
      )}
      {config.match === "/create-badges" && <CreateBadgeBar config={config} />}
      {config.match === "/create-badges/customize" && (
        <CustomizeBar config={config} title={customizeTitle} />
      )}
      {config.match === "/badges/published" && (
        <PublishedBar
          title={publishedTitle}
          status={publishedStatus}
          editHref={publishedEditHref}
        />
      )}
    </section>
  );
}
