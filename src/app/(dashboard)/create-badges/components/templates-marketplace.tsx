"use client";

import { useLiveTemplateGallery } from "../lib/use-live-template-gallery";
import { TemplatesDesktopLayout } from "./templates-desktop-layout";
import { TemplatesMobileLayout } from "./templates-mobile-layout";

export function TemplatesMarketplace() {
  const {
    filteredTemplates,
    activeTemplate,
    activeFilter,
    setActiveFilter,
    selectTemplate,
    isLoading,
    filterTabs,
  } = useLiveTemplateGallery();

  const layoutProps = {
    filterTabs,
    activeFilter,
    onFilterChange: setActiveFilter,
    isLoading,
    filteredTemplates,
    activeTemplate,
    onSelectTemplate: selectTemplate,
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] py-6 overflow-x-hidden">
      <TemplatesDesktopLayout {...layoutProps} />
      <TemplatesMobileLayout {...layoutProps} />
    </div>
  );
}
