"use client";
import { templates } from "./lib/templatesData";
import { useState } from "react";
import MockTemplates from "./components/mock-templates";
import TemplateTabs from "./components/tabs";
import TemplatePagination from "./components/pagination";

export default function Templates() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [activeTab, setActiveTab] = useState("all");

  const filteredTemplates =
    activeTab === "all"
      ? templates
      : templates.filter(
          (t) => t.type.toLowerCase() === activeTab.toLowerCase(),
        );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredTemplates.slice(firstPostIndex, lastPostIndex);

  // Reset to page 1 when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="border-t mt-4 pt-4">
        <h2 className="font-semibold text-[36px] tracking-[-2%] text-[#242424] leading-[44px]">
          Browse templates
        </h2>
        <p className="text-[14px] text-[#595959]">
          Choose stylish templates that reflects your creativity.
        </p>
      </div>

      <TemplateTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <MockTemplates templates={currentPosts} activeTab={activeTab} />

      {filteredTemplates.length > 0 && (
        <div className="flex justify-center mt-8">
          <TemplatePagination
            totalPosts={filteredTemplates.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
