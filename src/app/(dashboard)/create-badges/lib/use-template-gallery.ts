"use client";

import { useCallback, useMemo, useState } from "react";
import { usePlatformTemplates } from "@/app/features/templates/hooks/usePlatformTemplates";
import { EXTENDED_MOCK_DB, FILTER_TABS } from "../../constants/dashboard";
import type { LayoutTemplate } from "../../types/dashboard/dashboard";

function normalizeTemplateCategory(category: string) {
  const normalized = category.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  if (normalized === "conferences") return "conference";
  if (normalized === "summits") return "summit";
  if (normalized === "hackathons") return "hackathon";
  if (normalized === "vip invite" || normalized === "vip invites") {
    return "vip";
  }

  return normalized;
}

export function useTemplateGallery() {
  const {
    data: apiTemplates,
    isLoading,
    isError,
  } = usePlatformTemplates({
    page: 1,
    limit: 50,
  });

  const templates = useMemo((): LayoutTemplate[] => {
    if (apiTemplates && apiTemplates.length > 0) return apiTemplates;
    if (isError) return EXTENDED_MOCK_DB;
    return [];
  }, [apiTemplates, isError]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All layouts");

  const filteredTemplates = useMemo(() => {
    if (activeFilter === "All layouts") return templates;
    const activeCategory = normalizeTemplateCategory(activeFilter);

    return templates.filter(
      (tpl) => normalizeTemplateCategory(tpl.category) === activeCategory,
    );
  }, [activeFilter, templates]);

  const activeTemplate = useMemo((): LayoutTemplate | null => {
    if (filteredTemplates.length === 0) return null;
    const selected = selectedId
      ? filteredTemplates.find((tpl) => tpl.id === selectedId)
      : undefined;
    return selected ?? filteredTemplates[0];
  }, [filteredTemplates, selectedId]);

  const selectTemplate = useCallback((tpl: LayoutTemplate) => {
    setSelectedId(tpl.id);
  }, []);

  return {
    filteredTemplates,
    activeTemplate,
    activeFilter,
    setActiveFilter,
    selectTemplate,
    isLoading,
    filterTabs: FILTER_TABS,
  };
}
