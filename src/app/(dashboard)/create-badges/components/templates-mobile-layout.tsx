"use client";

import type { LayoutTemplate } from "../../types/dashboard/dashboard";
import { TemplateGalleryGrid } from "./template-gallery-grid";
import { TemplateGalleryHeader } from "./template-gallery-header";
import {
  TemplateEmptyState,
  TemplateLoadingState,
} from "./template-gallery-states";
import { TemplateLivePreview } from "./template-live-preview";
//import { UploadTemplateBox } from "./upload-template-box";
 
interface TemplatesMobileLayoutProps {
  filterTabs: string[];
  activeFilter: string;
  onFilterChange: (tab: string) => void;
  isLoading: boolean;
  filteredTemplates: LayoutTemplate[];
  activeTemplate: LayoutTemplate | null;
  onSelectTemplate: (template: LayoutTemplate) => void;
}

export function TemplatesMobileLayout({
  filterTabs,
  activeFilter,
  onFilterChange,
  isLoading,
  filteredTemplates,
  activeTemplate,
  onSelectTemplate,
}: TemplatesMobileLayoutProps) {
  return (
    <main className="block lg:hidden w-full max-w-md mx-auto space-y-5 px-4 sm:px-6 box-border min-w-0 overflow-x-hidden">
      <TemplateGalleryHeader
        filterTabs={filterTabs}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />

      {isLoading ? (
        <TemplateLoadingState />
      ) : filteredTemplates.length > 0 ? (
        <>
          <TemplateGalleryGrid
            templates={filteredTemplates.slice(0, 2)}
            activeTemplateId={activeTemplate?.id ?? null}
            onSelect={onSelectTemplate}
            className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-2.5 sm:gap-4 w-full"
          />

          <aside className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 border border-[#E5E5E5] flex flex-col shadow-sm min-w-0 box-border">
            <TemplateLivePreview template={activeTemplate} />
          </aside>

          <TemplateGalleryGrid
            templates={filteredTemplates.slice(2)}
            activeTemplateId={activeTemplate?.id ?? null}
            onSelect={onSelectTemplate}
            className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-2.5 sm:gap-4 w-full"
          />
        </>
      ) : (
        <>
          <TemplateEmptyState
            activeFilter={activeFilter}
            onViewAll={() => onFilterChange("All layouts")}
          />
          <aside className="w-full bg-white rounded-[32px] p-5 border border-[#E5E5E5] flex flex-col shadow-sm">
            <TemplateLivePreview template={activeTemplate} />
          </aside>
        </>
      )}

      {/* <UploadTemplateBox variant="mobile" /> */}
    </main>
  );
}
