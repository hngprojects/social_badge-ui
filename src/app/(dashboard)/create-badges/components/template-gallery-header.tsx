"use client";

interface TemplateGalleryHeaderProps {
  filterTabs: string[];
  activeFilter: string;
  onFilterChange: (tab: string) => void;
}

export function TemplateGalleryHeader({
  filterTabs,
  activeFilter,
  onFilterChange,
}: TemplateGalleryHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-3 min-w-0">
      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#737373] tracking-normal select-none font-sans">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-600">Create badges</span>
      </div>
      <div className="space-y-1 min-w-0">
        <h1 className="text-[22px] min-[360px]:text-[26px] sm:text-3xl font-bold text-[#1A1A1A] font-sans tracking-tight break-words">
          Pick a layout to start
        </h1>
        <p className="text-xs sm:text-sm md:text-[14.5px] text-[#5C5C5C] leading-relaxed max-w-2xl break-words">
          You&apos;ll customize the colours, logo, and content next — this is just the starting structure. Each layout is designed for a specific event type.
        </p>
      </div>

      <nav className="w-full overflow-x-auto scrollbar-none pt-2 pb-1">
        <div className="flex items-center gap-2 min-w-max">
          {filterTabs.map((tab) => {
            const isActive = activeFilter.toLowerCase() === tab.toLowerCase();
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onFilterChange(tab)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-150 border ${
                  isActive
                    ? "bg-[#222222] text-white border-[#222222] hover:bg-[#222222]/50"
                    : "bg-white text-[#5C5C5C] border-[#EEEEEE] hover:bg-white/50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
