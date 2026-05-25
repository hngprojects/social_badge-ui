"use client";

type TemplateTabsProps = {
  activeTab: string;
  tabs: readonly string[];
  onTabChange: (tab: string) => void;
};

const FilterTabs = ({ activeTab, tabs, onTabChange }: TemplateTabsProps) => {
  return (
    <div className="w-full min-w-0 max-w-[calc(100vw-3rem)] overflow-x-auto scrollbar-hide lg:max-w-[calc(100vw-241px-3.5rem)]">
      <div className="flex flex-nowrap items-center gap-3 py-3 md:py-7 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab.toLowerCase() === tab.toLowerCase();

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`shrink-0 whitespace-nowrap text-sm border px-[18px] py-[5px] rounded-full cursor-pointer uppercase transition-colors duration-200 ${
                isActive
                  ? "bg-black text-[#EEE] border-black"
                  : "bg-transparent text-[#3A3A3A] border-[#EEEEEE] hover:border-[#0A0A0A]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterTabs;
