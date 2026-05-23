"use client";

import { useCallback, useMemo, useState } from "react";
import { usePlatformTemplates } from "@/app/features/templates/hooks/usePlatformTemplates";
import { FILTER_TABS } from "../../constants/dashboard";
import type { LayoutTemplate } from "../../types/dashboard";

export function useTemplateGallery() {
  const { data: apiTemplates, isLoading } = usePlatformTemplates({
    page: 1,
    limit: 50,
  });

  const templates = useMemo((): LayoutTemplate[] => {
    return apiTemplates ?? [];
  }, [apiTemplates]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All layouts");

  const filteredTemplates = useMemo(() => {
    if (activeFilter === "All layouts") return templates;
    return templates.filter(
      (tpl) => tpl.category.toLowerCase() === activeFilter.toLowerCase(),
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
