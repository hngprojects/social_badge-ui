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

interface TemplatesDesktopLayoutProps {
  filterTabs: string[];
  activeFilter: string;
  onFilterChange: (tab: string) => void;
  isLoading: boolean;
  filteredTemplates: LayoutTemplate[];
  activeTemplate: LayoutTemplate | null;
  onSelectTemplate: (template: LayoutTemplate) => void;
}

export function TemplatesDesktopLayout({
  filterTabs,
  activeFilter,
  onFilterChange,
  isLoading,
  filteredTemplates,
  activeTemplate,
  onSelectTemplate,
}: TemplatesDesktopLayoutProps) {
  return (
    <main className="hidden lg:grid grid-cols-12 gap-8 max-w-7xl mx-auto w-full items-start px-6 lg:px-8">
      <section className="col-span-7 flex flex-col gap-6 w-full">
        <TemplateGalleryHeader
          filterTabs={filterTabs}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />

        {isLoading ? (
          <TemplateLoadingState />
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

      <aside className="col-span-5 w-full sticky top-6 bg-white rounded-[32px] p-6 border border-[#E5E5E5] flex flex-col shadow-sm">
        <TemplateLivePreview template={activeTemplate} />
      </aside>
    </main>
  );
}
