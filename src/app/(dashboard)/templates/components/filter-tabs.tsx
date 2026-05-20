"use client";
import { filterTabs } from "../../constants/filter-tabs";

type TemplateTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const FilterTabs = ({ activeTab, onTabChange }: TemplateTabsProps) => {
  return (
    <div className="z-9 overflow-x-auto scrollbar-hide">
      <div className="flex flex-nowrap gap-2.5 text-sm font-medium min-w-max">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`border px-[18px] py-[5px] rounded-full border-[#EEEEEE] cursor-pointer uppercase transition-colors duration-200
            ${activeTab === tab ? "bg-black text-[#EEE]" : "bg-transparent text-[#3A3A3A]"}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;
