import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NotificationsPaginationProps } from "../types";

function getPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ];
}

export function NotificationsPagination({
  currentPage,
  onPageChange,
  pageSize,
  totalItems,
}: NotificationsPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav
      aria-label="Notifications pagination"
      className="mt-auto flex w-full items-center justify-center gap-2 pt-5"
    >
      <button
        type="button"
        aria-label="Go to previous page"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="grid size-9 place-content-center rounded-[6px] bg-[#F3F4F6] text-[#4B5563] transition-colors hover:bg-[#E5E7EB] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>

      {getPageItems(currentPage, totalPages).map((item, index) =>
        typeof item === "string" ? (
          <span
            key={`${item}-${index}`}
            className="grid size-9 place-content-center rounded-[6px] bg-[#F3F4F6] text-[12px] text-[#4B5563]"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => handlePageChange(item)}
            aria-current={currentPage === item ? "page" : undefined}
            className={`grid size-9 place-content-center rounded-[6px] text-[13px] font-medium transition-colors ${
              currentPage === item
                ? "bg-primary text-white"
                : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Go to next page"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="grid size-9 place-content-center rounded-[6px] bg-[#F3F4F6] text-[#4B5563] transition-colors hover:bg-[#E5E7EB] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
