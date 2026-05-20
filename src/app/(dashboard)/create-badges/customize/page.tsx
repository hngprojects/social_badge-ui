"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

import {
  MOCK_TEMPLATE_API_RESPONSE,
  COMBINED_BACKGROUNDS,
  PALETTES,
  TABS,
  SIZES,
  TemplateConfig,
  BackgroundOption,
  UploadedFileMetadata,
} from "../../components/customize/constants";

import { BrandSection }        from "../../components/customize/BrandSection";
import { StyleSection }        from "../../components/customize/StyleSection";
import { BadgeContentSection } from "../../components/customize/BadgeContentSection";
import { ShareMessageSection } from "../../components/customize/ShareMessageSection";
import { LivePreview }         from "../../components/customize/LivePreview";

export default function CreateBadgePage() {
  const [template] = useState<TemplateConfig | null>(() => MOCK_TEMPLATE_API_RESPONSE);
  const [formData,        setFormData]        = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    MOCK_TEMPLATE_API_RESPONSE.layout.fields.forEach((f) => { initial[f.token] = ""; });
    return initial;
  });
  const [logoData,        setLogoData]        = useState<UploadedFileMetadata | null>(null);
  const [logoFile,        setLogoFile]        = useState<string | null>(null);
  const [bgMode,          setBgMode]          = useState<"gradient" | "solid">("gradient");
  const [selectedPalette, setSelectedPalette] = useState<string>(PALETTES[0].id);
  const [selectedFont,    setSelectedFont]    = useState<string>("inter");
  const [selectedSize,    setSelectedSize]    = useState<typeof SIZES[number]>("MEDIUM");
  const [allowPhoto,      setAllowPhoto]      = useState(true);
  const [eventName,       setEventName]       = useState("");
  const [activeTab,       setActiveTab]       = useState<typeof TABS[number]>("Badge");
  const [shareCaption,    setShareCaption]    = useState("");
  const [destinationLink, setDestinationLink] = useState("achieveher.com/register");

  /* Derive activeBackground from palette + bgMode — no effect needed */
  const activeBackground = useMemo<BackgroundOption>(() => {
    const palette  = PALETTES.find((p) => p.id === selectedPalette);
    if (!palette) return COMBINED_BACKGROUNDS[0];
    const original = COMBINED_BACKGROUNDS.find((bg) => bg.id === selectedPalette);

    if (bgMode === "gradient" && original?.type === "image") {
      return original;
    }
    if (bgMode === "gradient") {
      return {
        id: palette.id,
        type: "gradient",
        value: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
        thumbnailStyle: { background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` },
      };
    }
    return {
      id: palette.id,
      type: "color",
      value: palette.from,
      thumbnailStyle: { backgroundColor: palette.from },
    };
  }, [selectedPalette, bgMode]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ template, formData, logoData });
  };

  return (
    <main className="grid grid-cols-1 bg-[#F5F5F5] lg:grid-cols-12 gap-8 max-w-360 mx-auto w-full items-start">

      {/* ── Left: control panel ── */}
      <section className="order-2 lg:order-1 lg:col-span-7 p-6 space-y-6">

        {/* Breadcrumb */}
        <div className="pb-2 border-b border-gray-100">
          <p className="text-xs text-gray-400">
            <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
            &nbsp;/&nbsp;
            <Link href="/create-badges" className="hover:text-gray-600 transition-colors">Create badges</Link>
            &nbsp;/&nbsp;
            <span className="text-gray-500">Customize</span>
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#3A3A3A]">Customize your badge</h1>
          <p className="text-xs text-gray-400 mt-1">
            Make it yours — your changes appear live on the right.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-9">
          <BrandSection
            logoFile={logoFile}
            setLogoFile={setLogoFile}
            setLogoData={setLogoData}
            eventName={eventName}
            setEventName={setEventName}
            setFormData={setFormData}
          />

          <StyleSection
            bgMode={bgMode}
            setBgMode={setBgMode}
            selectedPalette={selectedPalette}
            setSelectedPalette={setSelectedPalette}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            eventName={eventName}
          />

          <BadgeContentSection
            formData={formData}
            setFormData={setFormData}
            allowPhoto={allowPhoto}
            setAllowPhoto={setAllowPhoto}
          />

          <ShareMessageSection
            shareCaption={shareCaption}
            setShareCaption={setShareCaption}
            destinationLink={destinationLink}
            setDestinationLink={setDestinationLink}
          />

          {/* Publish — mobile only */}
          <div className="pb-8 lg:hidden">
            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm py-3 transition-colors shadow-sm"
            >
              Publish Badge
            </button>
          </div>
        </form>
      </section>

      {/* ── Right: live preview ── */}
      <section className="order-1 p-3 bg-[#FFFFFF] lg:order-2 lg:col-span-5 w-full lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:pt-6 lg:pb-6">
        <LivePreview
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          template={template}
          activeBackground={activeBackground}
          eventName={eventName}
          logoData={logoData}
          formData={formData}
          shareCaption={shareCaption}
          allowPhoto={allowPhoto}
          destinationUrl={destinationLink}
        />
      </section>

    </main>
  );
}
