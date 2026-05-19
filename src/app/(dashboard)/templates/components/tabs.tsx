"use client";
import { useState } from "react";

const TemplateTabs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const template_tabs = [
    { name: "all" },
    { name: "festivals" },
    {
      name: "hackathons",
    },
    {
      name: "conferences",
    },
    {
      name: "community",
    },
    {
      name: "bootcamp",
    },
    {
      name: "meetups",
    },
    {
      name: "speakers",
    },
    {
      name: "trending",
    },
  ];
  return (
    <div className="flex gap-2.5 text-sm pb-7 border-b font-medium">
      {template_tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`border-1 px-[18px] py-[5px] rounded-full border-[#EEEEEE] cursor-pointer uppercase transition-colors duration-200
                ${activeTab === tab.name ? "bg-black text-[#EEE]" : "bg-transparent text-[#3A3A3A]"}`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default TemplateTabs;
