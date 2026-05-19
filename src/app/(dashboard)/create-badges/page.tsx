"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import FilterTabs from "@/app/(marketing)/components/explore/filter-tabs";


interface TemplateData {
  id: string;
  title: string;
  category: string;
  image_url: string;
}


const MOCK_TEMPLATES_DB: TemplateData[] = [
  {
    id: "tpl_achieveher",
    title: "Achieveher",
    category: "festivals",
    image_url: "/assets/dashboard/bg-1.png",
  },
  {
    id: "tpl_mens_summit_26",
    title: "Men's Summit 26",
    category: "conferences",
    image_url: "/assets/dashboard/bg-2.png",
  },
  {
    id: "tpl_web3_summit",
    title: "Web3 Summit",
    category: "hackathons",
    image_url: "/assets/dashboard/bg-3.png",
  },
  {
    id: "tpl_founders_circle",
    title: "Founder's Circle",
    category: "conferences",
    image_url: "/assets/dashboard/bg-4.png",
  },
  {
    id: "tpl_achieveher1",
    title: "Achieveher",
    category: "festivals",
    image_url: "/assets/dashboard/bg-1.png",
  },
  {
    id: "tpl_mens_summit_261",
    title: "Men's Summit 26",
    category: "conferences",
    image_url: "/assets/dashboard/bg-2.png",
  },
  {
    id: "tpl_web3_summit1",
    title: "Web3 Summit",
    category: "hackathons",
    image_url: "/assets/dashboard/bg-3.png",
  },
  {
    id: "tpl_founders_circle1",
    title: "Founder's Circle",
    category: "conferences",
    image_url: "/assets/dashboard/bg-4.png",
  }
];

export default function TemplatesMarketplacePage() {

  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<TemplateData | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);



  useEffect(() => {
    const fetchTemplatesData = async () => {
      const data = MOCK_TEMPLATES_DB;
      setTemplates(data);


      if (data.length > 0) {
        setActiveTemplate(data[0]);
      }
    };

    fetchTemplatesData();
  }, []);


  const handleTemplateSelection = (selectedTpl: TemplateData) => {
    setActiveTemplate(selectedTpl);
    if (window.innerWidth < 1024) {
      setIsMobileModalOpen(true);
    }
  };

  return (
    <>
      <FilterTabs />

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full items-start">

        {/* LEFT SECTION: DYNAMIC TEMPLATE GALLERY CONTAINER */}
        <section className="lg:col-span-7 w-full space-y-6">

          {/* GALLERY MULTI-COLUMN CARD ENGINE */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 w-full">
            {templates.map((tpl) => {
              const isSelected = activeTemplate?.id === tpl.id;

              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleTemplateSelection(tpl)}
                  className={`flex flex-col p-3 rounded-2xl transition-all duration-200 text-left group focus:outline-none focus:ring-0 border-2 ${isSelected
                    ? "bg-[#FFF4F0]/70 border-[#FC5E24] shadow-sm"
                    : "bg-transparent border-transparent hover:bg-gray-50/50"
                    }`}
                  aria-label={`Select template view options for ${tpl.title}`}
                >
                  {/* Image Wrapper Outer Frame - Forces exact aspect-[3/4] shape */}
                  <div className="w-full aspect-[3/4] rounded-xl relative overflow-hidden bg-gray-50 border border-black/[0.03]">
                    <Image
                      src={tpl.image_url}
                      alt={`${tpl.title} badge marketplace thumbnail visual`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      priority={tpl.id === "tpl_achieveher"}
                      className="object-cover pointer-events-none"
                    />
                  </div>

                  {/* Title text directly aligned within the container system padding boundary */}
                  <span className={`mt-3 text-sm font-medium tracking-wide truncate pl-1 transition-colors ${isSelected ? "text-[#FC5E24] font-semibold" : "text-gray-800 group-hover:text-[#FC5E24]"
                    }`}>
                    {tpl.title}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/*  RIGHT SECTION: DESKTOP STICKY LIVE PREVIEW*/}
        <section className="hidden lg:flex lg:col-span-5 w-full lg:sticky lg:top-6 bg-[#FFF0EC] rounded-3xl p-6 border border-orange-100/50 min-h-[620px] flex-col items-center justify-between">

          {/* Upper Label Ribbon Context info */}
          <div className="w-full text-left mb-6 flex items-center gap-2 text-xs font-bold text-[#595959] uppercase tracking-wider">
            <Image
              src="/assets/icons/create-badge-live-icon.svg"
              alt=""
              width={24}
              height={30}
              priority
              className="object-contain"
            />Live Preview
          </div>

          {/* Crisp High-Res Display Frame */}
          <div className="w-full aspect-[3/4] max-w-[318px] rounded-3xl shadow-xl relative overflow-hidden bg-white border border-black/[0.03] my-auto">
            {
              activeTemplate && (
                <Image
                  src={activeTemplate.image_url}
                  alt={`${activeTemplate.title} desktop layout frame display`}
                  fill
                  priority
                  className="object-cover animate-in fade-in duration-200"
                />
              )
            }
          </div>

          {/* Primary Functional Control Stack */}
          <div className="w-full space-y-3 mt-4">
            <button
              type="button"
              className="w-full h-12 bg-[#FC5E24] hover:bg-[#e04f1a] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
            >
              Continue to Customize
            </button>

            <div className="w-full flex items-center justify-center gap-3 text-xs text-gray-400 font-medium uppercase select-none">
              <div className="h-[1px] bg-gray-200 flex-1" />
              <span>or</span>
              <div className="h-[1px] bg-gray-200 flex-1" />
            </div>

            <button
              type="button"
              className="w-full h-12 bg-transparent border-2 border-orange-200 hover:border-orange-300 text-[#FC5E24] font-semibold rounded-xl text-sm transition-colors"
            >
              Upload your template
            </button>
          </div>

        </section>

        {/* MOBILE MODAL SHEET OVERLAY CONTAINER (Figma Frame 53.jpg Realization)*/}
        {
          isMobileModalOpen && activeTemplate && (
            <dialog
              open
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm w-full h-full flex items-end sm:items-center justify-center p-4 transition-all duration-300"
              onClick={() => setIsMobileModalOpen(false)}
            >
              {/* Modal content body card layout wrapper */}
              <div
                className="w-full max-w-[358px] bg-[#FFF0EC] rounded-[32px] p-6 shadow-2xl flex flex-col items-center gap-5 animate-in slide-in-from-bottom duration-200 border border-orange-100/50 relative"
                onClick={(e) => e.stopPropagation()}
              >

                {/* Top Close Control Utility Anchor */}
                <button
                  type="button"
                  onClick={() => setIsMobileModalOpen(false)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xs font-bold"
                  aria-label="Dismiss view overlay popover sheet window"
                >
                  ✕
                </button>

                {/* Header Modal Label Ribbon Block */}
                <div className="w-full text-left flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider select-none">
                  <span>💻</span> Live Preview
                </div>

                {/* Dynamic Modal Badge Graphic Aspect Proportion Window container */}
                <div className="w-full aspect-[3/4] rounded-3xl shadow-xl relative overflow-hidden bg-white border border-black/[0.03]">
                  <Image
                    src={activeTemplate.image_url}
                    alt={`${activeTemplate.title} mobile frame layer rendering visual template view`}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Mobile Actions Modal Interactive Control Stack Matrix */}
                <div className="w-full space-y-3">
                  <button
                    type="button"
                    className="w-full h-12 bg-[#FC5E24] text-white font-semibold rounded-xl text-sm shadow-sm"
                  >
                    Continue to Customize
                  </button>

                  <div className="w-full flex items-center justify-center gap-3 text-xs text-gray-400 font-medium uppercase select-none">
                    <div className="h-[1px] bg-gray-200/60 flex-1" />
                    <span>or</span>
                    <div className="h-[1px] bg-gray-200/60 flex-1" />
                  </div>

                  <button
                    type="button"
                    className="w-full h-12 bg-transparent border-2 border-orange-200 text-[#FC5E24] font-semibold rounded-xl text-sm"
                  >
                    Upload your template
                  </button>
                </div>

              </div>
            </dialog>
          )
        }

      </main>
    </>

  );
}