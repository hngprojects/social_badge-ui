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
    <div className="flex gap-2.5 text-sm font-medium flex-wrap">
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
  );
};

export default TemplateTabs;
