"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutTemplate } from "../../(dashboard)/types/dashboard";
import { EXTENDED_MOCK_DB } from "../constants/dashboard";
import { FILTER_TABS } from "../constants/dashboard";

export default function TemplatesMarketplacePage() {
  const [templates, setTemplates] = useState<LayoutTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<LayoutTemplate | null>(null);
  const [activeFilter, setActiveFilter] = useState("All layouts");

  useEffect(() => {
    const fetchTemplatesData = async () => {
      const data = EXTENDED_MOCK_DB;
      setTemplates(data);
      if (data.length > 0) {
        setSelectedTemplate(data[0]);
      }
    };
    fetchTemplatesData();
  }, []);

  const filteredTemplates = useMemo(() => {
    if (activeFilter === "All layouts") return templates;
    return templates.filter(
      (tpl) => tpl.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, templates]);

  
  const activeTemplate = useMemo(() => {
    if (filteredTemplates.length === 0) return null;

    // If the manually clicked template is inside the current filter tab, keep it active
    const isStillVisible = filteredTemplates.some((tpl) => tpl.id === selectedTemplate?.id);
    if (selectedTemplate && isStillVisible) {
      return selectedTemplate;
    }

    // Otherwise fall back safely to the first layout in the filtered category array
    return filteredTemplates[0];
  }, [filteredTemplates, selectedTemplate]);

  // Shared Sub-rendering Template Card Component
  const renderTemplateCard = (tpl: LayoutTemplate, index: number) => {
    const isSelected = activeTemplate?.id === tpl.id;
    return (
      <button
        key={tpl.id}
        type="button"
        onClick={() => setSelectedTemplate(tpl)}
        className={`flex flex-col p-2.5 sm:p-4 rounded-[24px] transition-all duration-200 text-left group focus:outline-none focus:ring-0 border-2 w-full relative bg-white min-w-0 ${
          isSelected ? "border-[#FF693E] shadow-sm" : "border-transparent hover:border-gray-200"
        }`}
        aria-label={`Select layout structure for ${tpl.title}`}
      >
        {/* Absolute Checkbox Circle Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-5 h-5 rounded-full bg-[#FF693E] flex items-center justify-center text-[10px] text-white font-bold shadow-sm select-none">
            ✓
          </div>
        )}

        {/* Dynamic Card Background Container with Flex Alignment Layout Centering */}
        <div
          style={{ background: tpl.card_bg }}
          className="w-full aspect-[3/4] rounded-2xl relative overflow-hidden border border-black/[0.01] flex items-center justify-center p-3 sm:p-8 transition-colors duration-200"
        >
          {/* Centered high fidelity inner badge frame */}
          <div className="relative w-full h-full drop-shadow-md rounded-xl overflow-hidden">
            <Image
              src={tpl.image_url}
              alt={`${tpl.title} badge concept card layout`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 2}
              className="object-cover pointer-events-none"
            />
          </div>
        </div>

        {/* Content Block with space constraints wrap properties */}
        <div className="w-full mt-2 sm:mt-3 flex flex-col gap-0.5 pl-0.5 min-w-0">
          {/* Category Label Row - Stabilized layout flex to handle tight mobile viewports */}
          <div className="flex flex-row items-center justify-between w-full gap-1">
            <span className="text-[9px] sm:text-[12px] font-semibold text-[#AFAFAF] uppercase tracking-wider block truncate min-w-0">
              {tpl.category}
            </span>
            {tpl.isMostPicked && (
              <span className="px-1.5 py-0.5 rounded-full text-[7px] sm:text-[8px] font-bold tracking-wide text-[#FF693E] bg-[#FFF0EC] uppercase select-none shrink-0">
                Most Picked
              </span>
            )}
          </div>

          {/* Title Row */}
          <div className="flex items-center justify-between gap-1 mt-0.5 w-full">
            <span className="text-xs sm:text-base font-bold truncate w-full text-[#1A1A1A]">
              {tpl.title}
            </span>
          </div>

          {/* Metadata Row - Fixed with dynamic flex-wrap and inner boundary controls */}
          <div className="flex flex-row flex-wrap items-center justify-between gap-x-1.5 gap-y-1 text-[9px] sm:text-xs text-[#9CA3AF] font-[400] mt-1 select-none w-full min-w-0">
            <span className="flex items-center gap-1 min-w-0 shrink-0 truncate">
              <Image src="/assets/dashboard/icons/made.svg" alt="Usage count icon" width={11} height={11} className="object-contain shrink-0" />
              <span className="truncate block">{tpl.usageCount}</span>
            </span>
            <span className="flex items-center gap-1 min-w-0 ">
              <Image src="/assets/dashboard/icons/rate.svg" alt="Share rate icon" width={11} height={11} className="object-contain shrink-0" />
              <span className="truncate block">{tpl.shareRate}</span>
            </span>
          </div>
        </div>
      </button>
    );
  };

  // Dedicated Component for Empty Filter States
  const renderEmptyState = () => (
    <div className="w-full flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-[24px] border border-[#E5E5E5] border-dashed py-16">
      <h3 className="text-base font-bold text-[#262626]">No templates found</h3>
      <p className="text-xs text-[#737373] mt-1 max-w-sm leading-relaxed">
        We don&apos;t have any base structures under {"\""}{activeFilter}{"\""} just yet. Try selecting another filter track or upload your custom layout below.
      </p>
      <button
        type="button"
        onClick={() => setActiveFilter("All layouts")}
        className="mt-4 px-4 py-1.5 bg-[#1A1A1A] text-white text-xs font-semibold rounded-full hover:bg-black transition-colors"
      >
        View all layouts
      </button>
    </div>
  );

  const renderLivePreviewContent = () => {
    if (!activeTemplate) {
      return (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">No layout active</span>
          <p className="text-xs text-[#737373] max-w-[200px] mt-1">Select a template framework from the gallery stream to preview.</p>
        </div>
      );
    }
    return (
      <div className="w-full flex flex-col min-w-0">
        <div className="w-full text-left mb-4 flex items-center gap-2 text-xs font-bold text-[#AFAFAF] uppercase tracking-wider select-none font-sans">
          <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E]" /> Live Preview
        </div>

        {/* Dynamic Image : Height driven on mobile, aspect ratio stabilized for desktop views */}
        <div
          style={{ background: activeTemplate.card_bg }}
          className="w-full h-56 xs:h-64 sm:h-72 lg:aspect-[4/3] lg:h-auto rounded-2xl relative overflow-hidden border border-black/[0.01] flex items-center justify-center p-4 transition-colors duration-200"
        >
          <div className="relative w-full h-full drop-shadow-md rounded-xl overflow-hidden">
            <Image
              src={activeTemplate.image_url}
              alt={`${activeTemplate.title} live inspector rendering layout canvas`}
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Description Header Text Layer */}
        <div className="w-full mt-5 text-left border-b border-gray-100 pb-4 min-w-0">
          <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-0.5 font-sans">
            {activeTemplate.category}
          </span>
          <h2 className="text-xl sm:text-[24px] font-bold text-[#1A1A1A] truncate">{activeTemplate.title}</h2>
          <p className="text-xs sm:text-sm text-[#757575] mt-1.5 font-medium leading-relaxed font-sans break-words">
            {activeTemplate.description}
          </p>
        </div>

        {/* Bullet Specs Checkbox Pipeline Row */}
        <div className="w-full py-4 text-left space-y-2.5 min-w-0">
          {
            activeTemplate.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#3A3A3A] font-normal font-sans break-words">
                <span className="text-[#FF693E] font-bold select-none shrink-0">✓</span>
                <span className="min-w-0">{feature}</span>
              </div>
            ))
          }
        </div>

        {/* Structural Interface Customisation Action Row Buttons */}
        <div className="w-full space-y-2.5 pt-1">
          <Link
            href="/create-badges/customise"
            className="w-full h-11 bg-[#FF693E] hover:bg-[#FF693E]/90 cursor-pointer text-white font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center"
          >
            Continue to customise
          </Link>
          <div className="w-full flex items-center justify-center gap-2 text-[10px] text-[#9CA3AF] font-sans font-normal uppercase select-none">
            <div className="h-[1px] bg-gray-200 flex-1" />
            <span>OR</span>
            <div className="h-[1px] bg-gray-200 flex-1" />
          </div>
          <button
            type="button"
            className="w-full h-11 bg-white border border-[#E5E7EB] hover:border-[#E5E7EB]/60 hover:text-[#FF693E] text-[#161616] font-semibold rounded-xl text-sm transition-colors"
          >
            Upload my own template
          </button>
        </div>
      </div>
    );
  };

  // Layout Left Column Header/Filters Component
  const renderHeaderAndFilters = () => (
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
          You&apos;ll customise the colours, logo, and content next — this is just the starting structure. Each layout is designed for a specific event type.
        </p>
      </div>

      <nav className="w-full overflow-x-auto scrollbar-none pt-2 pb-1">
        <div className="flex items-center gap-2 min-w-max">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter.toLowerCase() === tab.toLowerCase();
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-150 border ${
                  isActive ? "bg-[#222222] text-white border-[#222222] hover:bg-[#222222]/50" : "bg-white text-[#5C5C5C] border-[#EEEEEE] hover:bg-white/50"
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

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] py-6 overflow-x-hidden">

      {/* LARGE DESKTOP MAIN WRAPPER COMPONENT (`lg:grid`)*/}
      <main className="hidden lg:grid grid-cols-12 gap-8 max-w-7xl mx-auto w-full items-start px-6 lg:px-8">

        {/* Left Child Container */}
        <section className="col-span-7 flex flex-col gap-6 w-full">
          {renderHeaderAndFilters()}

          {/* Main Gallery Container handling full width configurations or alternate Empty State */}
          {
            filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 w-full">
                {
                  filteredTemplates.map((tpl, idx) => renderTemplateCard(tpl, idx))
                }
              </div>
            ) : (
              renderEmptyState()
            )
          }

          {/* Dashed Upload Section Conduit Bottom Bridge Box */}
          <div className="border-2 border-dashed border-[#EEEEEE] hover:border-[#EEEEEE]/80 bg-white rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-colors w-full mt-2">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0EC] flex items-center justify-center text-[#FC5E24] text-lg font-bold select-none shrink-0">
              <Image src="/assets/dashboard/icons/upload-icon.svg" alt="Upload icon" width={30} height={30} className="object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-[16px] font-bold text-[#1A1A1A]">Upload your own template</span>
              <span className="text-xs text-[#5C5C5C] font-normal mt-0.5">Have a custom design? Upload a PNG or SVG (1080 × 1440px recommended).</span>
            </div>
          </div>
        </section>

        {/* Right Child Container (Sticky, grows naturally in height with no internal scrollbar layout) */}
        <aside className="col-span-5 w-full sticky top-6 bg-white rounded-[32px] p-6 border border-[#E5E5E5] flex flex-col shadow-sm">
          {renderLivePreviewContent()}
        </aside>
      </main>

      {/* MOBILE LAYOUT MONITOR STREAM SYSTEM (`block lg:hidden`) */}
      <main className="block lg:hidden w-full max-w-md mx-auto space-y-5 px-4 sm:px-6 box-border min-w-0 overflow-x-hidden">
        
        {/* Mobile Filter Headers Element Top Track */}
        {renderHeaderAndFilters()}

        {filteredTemplates.length > 0 ? (
          <>
            {/* Track Track A: Display First Row Templates (Card 1 and 2 Only) */}
            <section className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-2.5 sm:gap-4 w-full">
              {filteredTemplates.slice(0, 2).map((tpl, idx) => renderTemplateCard(tpl, idx))}
            </section>

            {/* Track Track B: Inline Middle Intercept Live Preview Panel Frame */}
            <aside className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 border border-[#E5E5E5] flex flex-col shadow-sm min-w-0 box-border">
              {renderLivePreviewContent()}
            </aside>

            {/* Track Track C: Remaining Cards Layer Mapping */}
            <section className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-2.5 sm:gap-4 w-full">
              {filteredTemplates.slice(2).map((tpl, idx) => renderTemplateCard(tpl, idx + 2))}
            </section>
          </>
        ) : (
          <>
            {renderEmptyState()}
            {/* Inline Fallback Active Preview Box when layout track is empty for clear context consistency */}
            <aside className="w-full bg-white rounded-[32px] p-5 border border-[#E5E5E5] flex flex-col shadow-sm">
              {renderLivePreviewContent()}
            </aside>
          </>
        )}

        {/* Track Track D: Bottom Upload Box Border Link */}
        <div className="border-2 border-dashed border-[#EEEEEE] hover:border-[#EEEEEE]/80 bg-white rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3 text-left cursor-pointer w-full box-border">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-[#FFF0EC] flex items-center justify-center text-[#FC5E24] text-lg font-bold select-none">
            <Image src="/assets/dashboard/icons/upload-icon.svg" alt="Upload icon" width={30} height={30} className="object-contain" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#1A1A1A]">Upload your own template</span>
            <span className="text-[11px] text-[#5C5C5C] font-medium mt-0.5 break-words">Upload a PNG or SVG (1080 × 1440px recommended).</span>
          </div>
        </div>
      </main>
    </div>
  );
}