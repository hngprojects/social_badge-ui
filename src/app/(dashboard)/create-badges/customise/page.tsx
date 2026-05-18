"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";

// ============================================================================
// Types & Interfaces
// ============================================================================
interface TemplateConfig {
  id: string;
  title: string;
  category: string;
  preview_url: string;
  config: {
    fields: string[]; // Flat array of text fields (e.g., ["Name", "Role / Title"])
  };
}

interface BackgroundOption {
  id: string;
  type: "image" | "color";
  value: string; // CSS Color class/Hex OR absolute public URL image asset path
  thumbnailStyle: React.CSSProperties; // Style config used to render the swatch circle nicely
}

interface UploadedFileMetadata {
  name: string;
  sizeStr: string;
  blobUrl: string;
}

// ============================================================================
// Data Config Mapping (Unified row data)
// ============================================================================
const MOCK_TEMPLATE_API_RESPONSE: TemplateConfig = {
  id: "tpl_001",
  title: "Achieveher Summit",
  category: "festivals",
  preview_url: "",
  config: {
    fields: ["Name", "Role / Title"],
  },
};

const COMBINED_BACKGROUNDS: BackgroundOption[] = [
  { 
    id: "bg_mesh_01", 
    type: "image", 
    value: "/assets/dashboard/bg-1.png", // Placeholder vibrant template mesh
    thumbnailStyle: { backgroundImage: "linear-gradient(to right, #ff007a, #ff5c00, #ffa800)" }
  },
  { 
    id: "bg_mesh_02", 
    type: "image", 
    value: "/assets/dashboard/bg-2.png",
    thumbnailStyle: { backgroundImage: "linear-gradient(to right, #2e2a67, #7b73c7)" }
  },
  { 
    id: "bg_mesh_03", 
    type: "image", 
    value: "/assets/dashboard/bg-3.png",
    thumbnailStyle: { backgroundImage: "linear-gradient(to right, #4158d0, #c850c0, #ffcc70)" }
  },
  { 
    id: "bg_mesh_04", 
    type: "image", 
    value: "/assets/dashboard/bg-4.png",
    thumbnailStyle: { backgroundImage: "linear-gradient(to right, #4158d0, #c850c0, #ffcc70)" }
  },
  { 
    id: "bg_color_dark", 
    type: "color", 
    value: "#231F32", // Matches your solid dark card design background exactly
    thumbnailStyle: { backgroundColor: "#231F32" }
  },
  { 
    id: "bg_color_amber", 
    type: "color", 
    value: "#FBC02D", 
    thumbnailStyle: { backgroundColor: "#FBC02D" }
  },
  { 
    id: "bg_color_teal", 
    type: "color", 
    value: "#4DB6AC", 
    thumbnailStyle: { backgroundColor: "#4DB6AC" }
  },
];

export default function CreateBadgePage() {
  // ============================================================================
  // State System
  // ============================================================================
  const [template, setTemplate] = useState<TemplateConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // Dynamic Logo Upload States
  const [logoData, setLogoData] = useState<UploadedFileMetadata | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  // Background pipeline initialization
  const [activeBackground, setActiveBackground] = useState<BackgroundOption>(COMBINED_BACKGROUNDS[0]);

  // ============================================================================
  // Form Hydration Hook
  // ============================================================================
  useEffect(() => {
    const hydrateFormBlueprint = () => {
      const data = MOCK_TEMPLATE_API_RESPONSE;
      setTemplate(data);

      const initialFields: Record<string, string> = {};
      data.config.fields.forEach((fieldToken) => {
        initialFields[fieldToken] = "";
      });
      setFormData(initialFields);
    };

    hydrateFormBlueprint();
  }, []);

  // ============================================================================
  // Input and Asset Actions
  // ============================================================================
  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setLogoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Gate 1: Extension Type enforcement
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setLogoError("Please upload a valid JPG or PNG image.");
      return;
    }

    // Gate 2: File size boundary calculation (Max 2MB)
    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      setLogoError("File size is too large. Maximum limit is 2MB.");
      return;
    }

    // Compute presentation size string dynamically (e.g. "1.4 MB")
    const calculatedSize = (file.size / (1024 * 1024)).toFixed(1);

    setLogoData({
      name: file.name,
      sizeStr: `${calculatedSize}MB`,
      blobUrl: URL.createObjectURL(file),
    });
  };

  const clearLogoSelection = () => {
    if (logoData?.blobUrl) {
      URL.revokeObjectURL(logoData.blobUrl); // Memory optimization clean-up
    }
    setLogoData(null);
    setLogoError(null);
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 max-w-7xl mx-auto w-full items-start border-2 border-black">
      
      {/* =========================================================================
          SECTION 1: THE CONTROL PANEL FORM
          ========================================================================= */}
      <section className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-100 space-y-6 border-2 border-red-500">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          
          {/* LOGO STATE COMPONENT LAYER */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
              Your Photo <span className="text-red-500">*</span>
            </label>
            
            <div className="space-y-2">
              {!logoData ? (
                /* STATE A: EMPTY / DASHED TARGET VIEW */
                <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                  <div className="flex items-center gap-3 px-4 w-full">
                    <div className="w-9 h-9 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-600 font-bold text-lg">
                      📄
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-semibold text-gray-700">Upload your logo</p>
                      <p className="text-xs text-gray-400">JPG / PNG</p>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png" 
                    className="hidden" 
                    onChange={handleLogoUpload} 
                  />
                </label>
              ) : (
                /* STATE B: IMMUTABLE METADATA LOADED VIEW */
                <div className="w-full h-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between px-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl flex-shrink-0">📄</span>
                    <div className="flex items-baseline gap-2 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate max-w-[180px] sm:max-w-[260px]">
                        {logoData.name}
                      </p>
                      <span className="text-xs text-orange-500 font-semibold flex-shrink-0">
                        • Preview
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-xs text-gray-400 font-medium">
                      {logoData.sizeStr}
                    </span>
                    <button
                      type="button"
                      onClick={clearLogoSelection}
                      className="w-6 h-6 rounded-full bg-gray-200/60 hover:bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold transition-colors"
                      aria-label="Remove asset file selection"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Validation Alert Overlay slot */}
              {logoError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium animate-in slide-in-from-top-2 duration-150">
                  {logoError}
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC TEXT INPUTS LAYER */}
          {template?.config.fields.map((fieldToken) => (
            <div key={fieldToken} className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                {fieldToken} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Placeholder text"
                value={formData[fieldToken] ?? ""}
                onChange={(e) => handleInputChange(fieldToken, e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50/50 text-gray-800"
              />
            </div>
          ))}

          {/* COMBINED BACKGROUND SELECTOR ROW (100% Shared UI Loop) */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
              Badge Background
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {COMBINED_BACKGROUNDS.map((bg) => {
                const isSelected = activeBackground.id === bg.id;
                
                return (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => setActiveBackground(bg)}
                    style={bg.thumbnailStyle}
                    className={`w-12 h-12 rounded-xl transition-all duration-150 relative bg-cover bg-center ${
                      isSelected 
                        ? "ring-2 ring-orange-500 ring-offset-2 scale-95" 
                        : "hover:scale-105 border border-black/5"
                    }`}
                    aria-label={`Select container wallpaper context: ${bg.id}`}
                  />
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-colors"
          >
            Publish Badge
          </button>
        </form>
      </section>

      {/* =========================================================================
          SECTION 2: LIVE PREVIEW CONTAINER
          ========================================================================= */}
      <section className="lg:col-span-5 w-full lg:sticky lg:top-6 lg:max-w-[450px] lg:h-[calc(100vh-48px)] bg-[#FFF0EC] rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-100 border-2 border-red-500">
        <div className="w-full text-left mb-4 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <span>💻</span> Live Preview
        </div>

        {/* RE-ENGINEERED CANVAS DECOUPLED PIPELINE */}
        <div 
          style={
            activeBackground.type === "color" 
              ? { backgroundColor: activeBackground.value } 
              : undefined
          }
          className="w-full aspect-[3/4] max-w-[318px] h-[424px] rounded-3xl p-6 shadow-xl relative flex flex-col justify-between overflow-hidden transition-all duration-300 border border-black/[0.03]"
        >
          {/* Real-time Dynamic Image/Gradient Painting System Layer */}
          {activeBackground.type === "image" && (
            <Image
              src={activeBackground.value}
              alt="Dynamic canvas theme background template file"
              fill
              priority
              className="object-cover z-0 pointer-events-none"
            />
          )}

          {/* CANVAS LAYER 1: Header / Branding Logo Node Wrapper */}
          <header className="w-full text-center relative z-10 flex items-center justify-center min-h-[40px]">
            {logoData ? (
              /* If a business branding logo asset file exists, render it cleanly inside the preview canvas box */
              <div className="relative w-full h-10 animate-in fade-in duration-200">
                <Image 
                  src={logoData.blobUrl} 
                  alt="Dynamic Badge Header Logo Instance" 
                  fill 
                  className="object-contain"
                />
              </div>
            ) : (
              /* Fallback default state text rendering engine if logo field is unpopulated */
              <h1 className="text-white text-2xl font-serif italic tracking-wide select-none opacity-80">
                {template?.title || "Achieveher"}
              </h1>
            )}
          </header>

          {/* CANVAS LAYER 2: IMMUTABLE ATTENDEE PHOTOGRAPH FRAME PLACEHOLDER */}
          <div className="w-full aspect-square bg-[#E5E7EB] rounded-2xl border-2 border-white/20 relative z-10 flex items-center justify-center shadow-inner">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center px-4 select-none">
              Attendee Photograph Frame
            </span>
          </div>

          {/* CANVAS LAYER 3: Dynamic controlled typography field values */}
          <footer className="w-full py-2.5 px-3 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 text-center relative z-10">
            <p className="text-white font-bold tracking-wide truncate text-sm">
              {formData["Name"] || "Your Name"}
            </p>
            {formData["Role / Title"] && (
              <p className="text-white/80 text-[11px] font-medium truncate mt-0.5 tracking-wider uppercase">
                {formData["Role / Title"]}
              </p>
            )}
          </footer>
        </div>
      </section>

    </main>
  );
}