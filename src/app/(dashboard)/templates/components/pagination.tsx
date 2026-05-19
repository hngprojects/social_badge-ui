import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TemplatePaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const TemplatePagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
}: TemplatePaginationProps) => {
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setActivePage(page);
    setCurrentPage(page);
  };

  const getPageItems = (): (number | "ellipsis")[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, 4, "ellipsis", totalPages];
  };

  return (
    <div className="flex items-center sticky bottom-5 gap-7">
      {/* Prev */}
      <button
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
        className="w-10 h-10 rounded-[4px] flex items-center justify-center bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page items */}
      {getPageItems().map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="w-10 h-10 rounded-[4px] flex items-center justify-center bg-[#F3F4F6] text-[#4B5563] text-sm tracking-widest"
          >
            ---
          </span>
        ) : (
          <button
            key={item}
            onClick={() => handlePageChange(item)}
            className={`w-10 h-10 rounded-[4px] flex items-center justify-center text-sm font-medium transition-colors
              ${
                activePage === item
                  ? "bg-black text-white"
                  : "bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200"
              }`}
          >
            {item}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
        className="w-10 h-10 rounded-[4px] flex items-center justify-center bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default TemplatePagination;
