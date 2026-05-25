"use client";
import { useState } from "react";
import { useTemplateGallery } from "../create-badges/lib/use-template-gallery";
import FilterTabs from "./components/filter-tabs";
import MockTemplates from "./components/mock-templates";
import TemplatePagination from "./components/pagination";

export default function Templates() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const {
    filteredTemplates,
    activeFilter,
    setActiveFilter,
    isLoading,
    filterTabs,
  } = useTemplateGallery();

  const handleFilterChange = (tab: string) => {
    setActiveFilter(tab);
    setCurrentPage(1);
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
      <MockTemplates
        templates={filteredTemplates}
        isLoading={isLoading}
        activeTab={activeFilter}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
      />

      {filteredTemplates.length > postsPerPage && (
        <div className="flex justify-center mt-8">
          <TemplatePagination
            totalPosts={filteredTemplates.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
