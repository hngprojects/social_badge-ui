"use client";

import { useCallback, useMemo, useState } from "react";
import { usePlatformTemplates } from "@/app/features/badges/hooks/use-platform-templates";
import { useBadgeAnalytics } from "@/app/features/dashboard/hooks/use-badge-analytics";
import { normalizeTemplateCategory } from "@/app/features/create-badges/utilities";
import { LayoutTemplate } from "@/app/features/dashboardLayout/types";
import { FILTER_TABS } from "@/app/features/dashboard/constants";

export function useLiveTemplateGallery() {
  const {
    data: apiTemplates,
    isLoading: areTemplatesLoading,
    isError,
    isRefetching,
    refetch,
  } = usePlatformTemplates({
    page: 1,
    limit: 50,
  });
  const { data: badgeAnalytics } = useBadgeAnalytics();

  const templates = useMemo((): LayoutTemplate[] => {
    if (apiTemplates && apiTemplates.length > 0) {
      if (!badgeAnalytics) return [...apiTemplates].reverse();

      const liveBadgeCounts = new Map(
        badgeAnalytics.platform_template_usage.map((usage) => [
          usage.platform_template_id,
          usage.count,
        ]),
      );

      return [...apiTemplates].reverse().map((template) => ({
        ...template,
        usageCount: `${(
          liveBadgeCounts.get(template.id) ?? 0
        ).toLocaleString()} made`,
      }));
    }

    return [];
  }, [apiTemplates, badgeAnalytics]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All layouts");

  const filteredTemplates = useMemo(() => {
    if (activeFilter === "All layouts") return templates;
    const activeCategory = normalizeTemplateCategory(activeFilter);

    return templates.filter(
      (template) =>
        normalizeTemplateCategory(template.category) === activeCategory,
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
    isLoading: areTemplatesLoading,
    isError,
    isRetrying: isRefetching,
    refetch,
    filterTabs: FILTER_TABS,
  };
}
