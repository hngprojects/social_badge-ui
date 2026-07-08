"use client";
import { useLiveTemplateGallery } from "@/app/features/create-badges/hooks/use-live-template-gallery";
import { TemplatesMobileLayout } from "@/app/features/create-badges/components/create-templates-mobile-layout";
import { TemplatesDesktopLayout } from "@/app/features/create-badges/components/create-templates-desktop-layout";

export function TemplatesMarketplace() {
  const {
    filteredTemplates,
    activeTemplate,
    activeFilter,
    setActiveFilter,
    selectTemplate,
    isLoading,
    isError,
    isRetrying,
    refetch,
    filterTabs,
  } = useLiveTemplateGallery();

  const layoutProps = {
    filterTabs,
    activeFilter,
    onFilterChange: setActiveFilter,
    isLoading,
    isError,
    isRetrying,
    onRetry: refetch,
    filteredTemplates,
    activeTemplate,
    onSelectTemplate: selectTemplate,
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] py-6 overflow-x-hidden lg:h-[calc(100vh-7rem)] lg:min-h-0 lg:overflow-hidden">
      <TemplatesDesktopLayout {...layoutProps} />
      <TemplatesMobileLayout {...layoutProps} />
    </div>
  );
}
