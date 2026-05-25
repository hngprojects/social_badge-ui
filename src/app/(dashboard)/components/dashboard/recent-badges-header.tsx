import { FILTERS, TemplateFilter } from "./recent-badges-types";

export function RecentBadgesHeader({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: TemplateFilter;
  onFilterChange: (filter: TemplateFilter) => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-[20px_24px_16px]">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="m-0 text-[17px] font-bold leading-[1.4] text-[#1A1A1A]">
            Recent badges
          </h2>

          <p className="mt-0.5 text-[12.5px] leading-[1.5] text-[#9CA3AF]">
            Your latest events and their performance.
          </p>
        </div>

        <div className="gap-[10px] flex flex-col-reverse items-end sm:flex-row sm:items-center">
          <div className="flex gap-2 rounded-[10px] border border-gray-200 bg-[#FBF9F6] p-1">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => onFilterChange(filter)}
                className={`hover:bg-white/90 cursor-pointer rounded-md px-3 py-2 text-[13px] font-semibold transition-colors ${
                  activeFilter === filter
                    ? "bg-white text-[#3A3A3A] shadow-[inset_0_0_0_1px_#E5E7EB]"
                    : "bg-transparent text-[#757575]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="cursor-pointer shrink-0 whitespace-nowrap px-[2px] py-[6px] text-[13px] font-medium text-[#FF693E]">
            View all &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
}
