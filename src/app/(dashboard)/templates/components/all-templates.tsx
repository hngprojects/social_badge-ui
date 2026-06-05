"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { LayoutTemplate } from "../../types/dashboard/dashboard";
import type {
  AllTemplatesProps,
  Template,
} from "../../types/templates/template";
import TemplateCard from "./template-card";

function formatBadgeCount(usageCount: string) {
  return usageCount.replace(/\s*made$/i, "");
}

function layoutTemplateToTemplate(template: LayoutTemplate): Template {
  return {
    id: template.id,
    title: template.title,
    type: template.category,
    creator: "@flaretag",
    location: "Platform",
    badgeCount: formatBadgeCount(template.usageCount),
    image: template.image_url,
    tag: template.isMostPicked ? "Trending" : null,
    hasShadow: true,
    bg: template.card_bg,
  };
}

const AllTemplates = ({
  templates: layoutTemplates,
  isLoading = false,
  activeTab,
  limit,
  gridClassName = "grid grid-cols-1 min-[350px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5",
}: AllTemplatesProps) => {
  const templates = useMemo(
    () => layoutTemplates.map(layoutTemplateToTemplate),
    [layoutTemplates],
  );

  const visibleTemplates = useMemo(() => {
    if (limit !== undefined) {
      return templates.slice(0, limit);
    }

    return templates;
  }, [limit, templates]);

  if (isLoading) {
    const placeholderCount = limit ?? 4;

    return (
      <div className={gridClassName}>
        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div
            key={index}
            className="h-[392px] rounded-[12px] border border-[#EAEAE6] bg-[#F4F4F2] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (visibleTemplates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <p className="text-[#0A0A0A] font-semibold text-lg">No templates yet</p>
        <p className="text-[#8A8A85] text-sm max-w-xs">
          There are no{" "}
          <span className="font-medium capitalize">
            {activeTab ?? "selected"}
          </span>{" "}
          templates available at the moment. Check back soon or browse another
          category.
        </p>
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {visibleTemplates.map((template, index) => (
        <Link
          key={template.id}
          href={`/create-badges/customize?template=${encodeURIComponent(String(template.id))}`}
          className="h-full"
        >
          <TemplateCard template={template} isAboveFold={index === 0} />
        </Link>
      ))}
    </div>
  );
};

export default AllTemplates;
