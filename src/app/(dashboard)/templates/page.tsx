"use client";
import { useLiveTemplateGallery } from "../create-badges/lib/use-live-template-gallery";
import FilterTabs from "./components/filter-tabs";
import AllTemplates from "./components/all-templates";

export default function Templates() {
  const {
    filteredTemplates,
    activeFilter,
    setActiveFilter,
    isLoading,
    filterTabs,
  } = useLiveTemplateGallery();

const handleFilterChange = (tab: string) => {
  setActiveFilter(tab.trim());
};

  return (
    <div className="flex min-w-0 flex-col space-y-8">
      <div className="border-t mt-4 pt-4">
        <h2 className="font-semibold text-[36px] tracking-[-2%] text-[#242424] leading-[44px]">
          Browse templates
        </h2>
        <p className="text-[14px] text-[#595959]">
          Choose stylish templates that reflects your creativity.
        </p>
      </div>

      <FilterTabs
        activeTab={activeFilter}
        tabs={filterTabs}
        onTabChange={handleFilterChange}
      />
      <AllTemplates
        templates={filteredTemplates}
        isLoading={isLoading}
        activeTab={activeFilter}
      />
    </div>
  );
}
