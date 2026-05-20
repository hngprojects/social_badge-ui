"use client";

import React from "react";
import Image from "next/image";
import { TABS, BackgroundOption, TemplateConfig, UploadedFileMetadata } from "./constants";

interface LivePreviewProps {
  activeTab: typeof TABS[number];
  setActiveTab: (tab: typeof TABS[number]) => void;
  template: TemplateConfig | null;
  activeBackground: BackgroundOption;
  eventName: string;
  logoData: UploadedFileMetadata | null;
  formData: Record<string, string>;
  shareCaption: string;
  allowPhoto: boolean;
  destinationUrl: string;
}

export function LivePreview({
  activeTab,
  setActiveTab,
  template,
  activeBackground,
  eventName,
  logoData,
  formData,
  shareCaption,
  allowPhoto,
  destinationUrl,
}: LivePreviewProps) {
  return (
    <div className="space-y-3">

      {/* ── Tab bar ── */}
      <div className="flex items-center bg-[#EEEEEE] rounded-xl p-1 shadow-sm border border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all ${
              activeTab === tab
                ? "bg-white shadow text-[#1A1A1A] font-semibold"
                : "text-[#1A1A1A] hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Live Preview label ── */}
      <div className="flex items-center gap-1.5 px-1">
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
          Live Preview
        </span>
      </div>

      {/* ── Badge card ── */}
      <div className="rounded-2xl bg-orange-50 p-5">
        {template ? (
          <div
            style={
              template.preview_color
                ? { backgroundColor: template.preview_color }
                : activeBackground.type === "gradient"
                ? { background: activeBackground.value }
                : activeBackground.type === "color"
                ? { backgroundColor: activeBackground.value }
                : undefined
            }
            className="w-full max-w-79.5 h-106 rounded-[32px] relative overflow-hidden mx-auto"
          >
            {/* Background image layer */}
            {template.preview_url ? (
              <Image
                src={template.preview_url}
                alt="Dynamic canvas theme background"
                fill
                priority
                className="object-cover z-0 pointer-events-none"
              />
            ) : (
              activeBackground.type === "image" && (
                <Image
                  src={activeBackground.value}
                  alt="Dynamic canvas theme background"
                  fill
                  priority
                  className="object-cover z-0 pointer-events-none"
                />
              )
            )}

            {/* CANVAS LAYER 1: Event name header */}
            {template.layout.hasHeaderLogo && (
              <header className="absolute top-4 left-0 right-0 h-10 px-6 z-10 flex items-center justify-center">
                <h1 className="text-white text-2xl font-serif italic tracking-wide select-none opacity-80">
                  {eventName || template.title}
                </h1>
              </header>
            )}

            {/* CANVAS LAYER 2: Attendee photo / upload preview */}
            <div className="absolute top-22 left-6 right-6 aspect-square rounded-2xl border-2 border-white/20 z-10 overflow-hidden shadow-inner">
              {allowPhoto && logoData?.blobUrl ? (
                <div className="relative w-full h-full animate-in fade-in duration-200">
                  <Image
                    src={logoData.blobUrl}
                    alt="Uploaded logo preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-[#E5E7EB] flex items-center justify-center">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center px-4 select-none">
                    Attendee Photograph Frame
                  </span>
                </div>
              )}
            </div>

            {/* CANVAS LAYER 3: Dynamic absolute field placement */}
            {template.layout.fields.map((field) => (
              <div
                key={field.token}
                style={field.style}
                className="z-10 select-none transition-all duration-150"
              >
                {formData[field.token] || field.placeholder}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full aspect-3/4 flex items-center justify-center">
            <p className="font-bold font-fraunces animate-pulse">Loading Live Template....</p>
          </div>
        )}
      </div>

      {/* ── Attendee preview – LinkedIn ── */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-4 space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              Attendee preview · LinkedIn
            </p>
            <p className="text-xs text-gray-400">How the post will look</p>
          </div>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
          {shareCaption || (
            <>
              I&apos;m at #{eventName ? eventName.replace(/\s+/g, "") + "26" : "AchieveherSummit26"} this weekend — building the next
              chapter with founders I admire. Who&apos;s joining?{" "}
              <span className="text-blue-600">badge.build/{eventName || "DesignLagos"}</span>
            </>
          )}
        </p>
      </div>

      {/* ── Clicks lead to ── */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-3.5 flex items-center gap-2">
        <span className="text-sm text-gray-500">Clicks lead to</span>
        <span className="flex items-center gap-1 text-orange-500">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 11H3a1 1 0 1 1 0-2h11.586l-4.293-4.293a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="text-sm font-medium text-gray-800 truncate">
          {destinationUrl || "achieveher.com/register"}
        </span>
      </div>

    </div>
  );
}
