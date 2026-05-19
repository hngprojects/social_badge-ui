"use client";

type TemplateTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const TemplateTabs = ({ activeTab, onTabChange }: TemplateTabsProps) => {
  const template_tabs = [
    { name: "all" },
    { name: "festivals" },
    { name: "hackathons" },
    { name: "conferences" },
    { name: "community" },
    { name: "bootcamp" },
    { name: "meetups" },
    { name: "speakers" },
    { name: "trending" },
  ];

  return (
    <div className="-mx-4 px-4 z-9 overflow-x-auto scrollbar-hide">
      <div className="flex flex-nowrap gap-2.5 text-sm font-medium min-w-max">
        {template_tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => onTabChange(tab.name)}
            className={`border px-[18px] py-[5px] rounded-full border-[#EEEEEE] cursor-pointer uppercase transition-colors duration-200
            ${activeTab === tab.name ? "bg-black text-[#EEE]" : "bg-transparent text-[#3A3A3A]"}`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateTabs;
