"use client";

import { useCallback, useMemo, useState } from "react";
import { usePlatformTemplates } from "@/app/features/templates/hooks/usePlatformTemplates";
import { EXTENDED_MOCK_DB, FILTER_TABS } from "../../constants/dashboard";
import { useBadgeAnalytics } from "../../hooks/use-badge-analytics";
import type { LayoutTemplate } from "../../types/dashboard/dashboard";

export function useLiveTemplateGallery() {
  const {
    data: apiTemplates,
    isLoading: areTemplatesLoading,
    isError,
  } = usePlatformTemplates({
    page: 1,
    limit: 50,
  });
  const { data: badgeAnalytics, isLoading: areBadgeCountsLoading } =
    useBadgeAnalytics();

  const templates = useMemo((): LayoutTemplate[] => {
    if (apiTemplates && apiTemplates.length > 0) {
      if (!badgeAnalytics) return apiTemplates;

      const liveBadgeCounts = new Map(
        badgeAnalytics.platform_template_usage.map((usage) => [
          usage.platform_template_id,
          usage.count,
        ]),
      );

      return apiTemplates.map((template) => ({
        ...template,
        usageCount: `${(
          liveBadgeCounts.get(template.id) ?? 0
        ).toLocaleString()} made`,
      }));
    }

    if (isError) return EXTENDED_MOCK_DB;
    return [];
  }, [apiTemplates, badgeAnalytics, isError]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All layouts");

  const filteredTemplates = useMemo(() => {
    if (activeFilter === "All layouts") return templates;
    return templates.filter(
      (template) =>
        template.category.toLowerCase() === activeFilter.toLowerCase(),
    );
  }, [activeFilter, templates]);

  const activeTemplate = useMemo((): LayoutTemplate | null => {
    if (filteredTemplates.length === 0) return null;
    const selected = selectedId
      ? filteredTemplates.find((template) => template.id === selectedId)
      : undefined;
    return selected ?? filteredTemplates[0];
  }, [filteredTemplates, selectedId]);

  const selectTemplate = useCallback((template: LayoutTemplate) => {
    setSelectedId(template.id);
  }, []);

  return {
    filteredTemplates,
    activeTemplate,
    activeFilter,
    setActiveFilter,
    selectTemplate,
    isLoading: areTemplatesLoading || areBadgeCountsLoading,
    filterTabs: FILTER_TABS,
  };
}
