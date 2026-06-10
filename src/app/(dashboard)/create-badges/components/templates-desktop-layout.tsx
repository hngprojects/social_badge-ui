"use client";

import type { LayoutTemplate } from "../../types/dashboard/dashboard";
import { TemplateGalleryGrid } from "./template-gallery-grid";
import { TemplateGalleryHeader } from "./template-gallery-header";
import {
  TemplateEmptyState,
  TemplateErrorState,
  TemplateLoadingState,
} from "./template-gallery-states";
import { TemplateLivePreview } from "./template-live-preview";
//import { UploadTemplateBox } from "./upload-template-box";

interface TemplatesDesktopLayoutProps {
  filterTabs: string[];
  activeFilter: string;
  onFilterChange: (tab: string) => void;
  isLoading: boolean;
  isError: boolean;
  filteredTemplates: LayoutTemplate[];
  activeTemplate: LayoutTemplate | null;
  onSelectTemplate: (template: LayoutTemplate) => void;
}

export function TemplatesDesktopLayout({
  filterTabs,
  activeFilter,
  onFilterChange,
  isLoading,
  isError,
  filteredTemplates,
  activeTemplate,
  onSelectTemplate,
}: TemplatesDesktopLayoutProps) {
  return (
    <div className="hidden lg:grid lg:h-[calc(100dvh-10rem)] grid-cols-12 gap-8 max-w-7xl mx-auto w-full items-start px-6 lg:px-8">
      <section
        data-lenis-prevent-wheel
        className="col-span-7 flex h-full min-h-0 flex-col gap-6 w-full overflow-y-auto pr-2 overscroll-contain"
      >
        <TemplateGalleryHeader
          filterTabs={filterTabs}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />

        {isLoading ? (
          <TemplateLoadingState />
        ) : isError ? (
          <TemplateErrorState onRetry={() => window.location.reload()} />
        ) : filteredTemplates.length > 0 ? (
          <TemplateGalleryGrid
            templates={filteredTemplates}
            activeTemplateId={activeTemplate?.id ?? null}
            onSelect={onSelectTemplate}
          />
        ) : (
          <TemplateEmptyState
            activeFilter={activeFilter}
            onViewAll={() => onFilterChange("All layouts")}
          />
        )}

        {/* <UploadTemplateBox /> */}
      </section>

      <aside className="col-span-5 w-full bg-white rounded-[32px] p-6 border border-[#E5E5E5] flex flex-col shadow-sm">
        <TemplateLivePreview template={activeTemplate} />
      </aside>
    </div>
  );
}
