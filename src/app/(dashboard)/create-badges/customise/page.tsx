"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";




interface AbsoluteField {
  token: string;
  placeholder: string;
  style: React.CSSProperties;
}

interface TemplateConfig {
  id: string;
  title: string;
  category: string;
  preview_url: string;
  preview_color: string;
  layout: {
    hasHeaderLogo: boolean;
    fields: AbsoluteField[];
  };
}

interface BackgroundOption {
  id: string;
  type: "image" | "color";
  value: string;
  thumbnailStyle: React.CSSProperties;
}

interface UploadedFileMetadata {
  name: string;
  sizeStr: string;
  blobUrl: string;
}


// Current Mock Active Schema Profile
const MOCK_TEMPLATE_API_RESPONSE: TemplateConfig = {
  id: "tpl_achieveher",
  title: "Achiever",
  category: "festivals",
  preview_url: "",
  preview_color: "",
  layout: {
    hasHeaderLogo: true,
    fields: [

      {
        token: "Name",
        placeholder: "Your Name",
        style: { position: "absolute", bottom: "20px", left: "24px", right: "24px", textAlign: "center", fontSize: "16px", fontWeight: "400", letterSpacing: "0.05em", color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", borderWidth: "1px", borderStyle: "solid", borderImage: "linear-gradient(to left, #FC5E24, #FFFFFF) 1", padding: "4px" }
      },
      {
        token: "Role / Title",
        placeholder: "SUMMIT",
        style: { position: "absolute", top: "54px", right: "28px", fontSize: "16px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#ffffff" }
      },
      {
        token: "Date",
        placeholder: "JULY 21ST",
        style: { position: "absolute", top: "54px", left: "28px", fontSize: "16px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)" }
      },

    ]
  }
};

const COMBINED_BACKGROUNDS: BackgroundOption[] = [
  {
    id: "bg_mesh_01",
    type: "image",
    value: "/assets/dashboard/bg-1.png",
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
    value: "#0A0A0A",
    thumbnailStyle: { backgroundColor: "#0A0A0A" }
  },
  {
    id: "bg_color_amber",
    type: "color",
    value: "#FFD466",
    thumbnailStyle: { backgroundColor: "#FFD466" }
  },
  {
    id: "bg_color_teal",
    type: "color",
    value: "#7CD7C5",
    thumbnailStyle: { backgroundColor: "#7CD7C5" }
  },
  {
    id: "bg_color_purple",
    type: "color",
    value: "#C8B2FF",
    thumbnailStyle: { backgroundColor: "#C8B2FF" }
  },
  {
    id: "bg_color_darker",
    type: "color",
    value: "#0A0A0A",
    thumbnailStyle: { backgroundColor: "#0A0A0A" }
  },
  {
    id: "bg_color_light_grey",
    type: "color",
    value: "#EAEAE6",
    thumbnailStyle: { backgroundColor: "#EAEAE6" }
  },

];



export default function CreateBadgePage() {

  const [template, setTemplate] = useState<TemplateConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [logoData, setLogoData] = useState<UploadedFileMetadata | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [activeBackground, setActiveBackground] = useState<BackgroundOption>(COMBINED_BACKGROUNDS[0]);







  useEffect(() => {

    const hydrateFormBlueprint = () => {
      const data = MOCK_TEMPLATE_API_RESPONSE;
      setTemplate(data);

      const initialFields: Record<string, string> = {};
      data.layout.fields.forEach((field) => {
        initialFields[field.token] = "";
      });

      setFormData(initialFields);
    };




    hydrateFormBlueprint();
  }, []);







  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setLogoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setLogoError("Please upload a valid JPG or PNG image.");
      return;
    }

    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      setLogoError("File size is too large. Maximum limit is 2MB.");
      return;
    }

    const calculatedSize = (file.size / (1024 * 1024)).toFixed(1);

    if (logoData?.blobUrl) {
      URL.revokeObjectURL(logoData.blobUrl);
    }

    const nextBlobUrl = URL.createObjectURL(file);
    setLogoData({
      name: file.name,
      sizeStr: `${calculatedSize}MB`,
      blobUrl: nextBlobUrl
    });
  };

  useEffect(() => {
    return () => {
      if (logoData?.blobUrl) URL.revokeObjectURL(logoData.blobUrl);
    };
  }, [logoData]);





  const clearLogoSelection = () => {
    if (logoData?.blobUrl) {
      URL.revokeObjectURL(logoData.blobUrl);
    }
    setLogoData(null);
    setLogoError(null);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }



  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 max-w-360 mx-auto w-full items-start">

      {/* SECTION 1: THE CONTROL PANEL FORM */}
      <section className="order-2 lg:order-1 lg:col-span-7 bg-white rounded-2xl p-6  space-y-6 ">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* LOGO STATE COMPONENT LAYER */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3A3A3A]">
              Your Photo <span className="text-[#FB3748]">*</span>
            </label>

            <div className="space-y-2">
              {!logoData ? (
                <label className="flex flex-col items-center justify-center w-full h-[60px]  rounded-xl cursor-pointer bg-[#F6F6F6] hover:bg-[#F6F6F6]/50 transition-colors">
                  <div className="flex items-center justify-between gap-3 px-4 w-full ">
                    <div className="flex gap-2 items-center">
                      <div className="w-9 h-9 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-600 font-bold text-lg">
                        <Image
                          src="/assets/icons/create-badge-upload-icon.svg"
                          alt=""
                          width={24}
                          height={30}
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-[#121212]">Upload your logo</p>
                        <p className="text-xs text-[#7A7A7A]">JPG / PNG</p>
                      </div>
                    </div>
                    <div className=" w-7.5 h-7.5 flex items-center justify-center">
                      <Image
                        src="/assets/icons/create-badge-upload-circle.svg"
                        alt=""
                        width={30}
                        height={30}
                        priority
                        className="object-contain"
                      />
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
                <div className="w-full h-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between px-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-600 font-bold text-lg">
                      <Image
                        src="/assets/icons/create-badge-upload-icon.svg"
                        alt=""
                        width={24}
                        height={30}
                        priority
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-baseline gap-2 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate max-w-[180px] sm:max-w-[260px]">
                        {logoData.name}
                      </p>
                      <span className="text-xs text-[#FF693E] font-semibold flex-shrink-0">
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
                      className="w-6 h-6 rounded-full bg-gray-200/60 hover:bg-gray-200  hover:text-[#FF693E] flex items-center justify-center text-xs text-gray-500 font-bold transition-colors"
                      aria-label="Remove asset file selection"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {logoError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium animate-in slide-in-from-top-2 duration-150">
                  {logoError}
                </div>
              )}
            </div>
          </div>

          {/* SYSTEMATIC SCALABLE TEXT INPUT LOOP */}
          {
            template?.layout.fields.map((field, i) => (
              <div key={field.token} className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#595959]">
                  {field.token} <span className="text-[#FB3748]">{field.token.toLowerCase() === "name" ? "*" : ""}</span>
                </label>
                {
                  i === 0 ?
                    (<input
                      autoFocus
                      type="text"
                      placeholder="Placeholder text"
                      value={formData[field.token] ?? ""}
                      onChange={(e) => handleInputChange(field.token, e.target.value)}
                      className="w-full h-12 px-4 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-[#F6F6F6] text-[#595959]  text-sm lg:text-base font-medium  font-sans"
                    />)
                    :
                    (<input
                      type="text"
                      placeholder="Placeholder text"
                      value={formData[field.token] ?? ""}
                      onChange={(e) => handleInputChange(field.token, e.target.value)}
                      className="w-full h-12 px-4 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-[#F6F6F6] text-[#595959]  text-sm lg:text-base font-medium  font-sans"
                    />)
                }
              </div>
            ))}

          {/* BACKGROUND SELECTOR ROW */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
              Badge Background
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {
                COMBINED_BACKGROUNDS.map((bg) => {
                  const isSelected = activeBackground?.id === bg.id || template?.preview_url === bg.value || template?.preview_color === bg.value

                  return (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setActiveBackground(bg)}
                      style={bg.thumbnailStyle}
                      className={`w-12 h-12 rounded-xl transition-all duration-150 relative bg-cover bg-center ${isSelected
                        ? "ring-2 ring-orange-500 ring-offset-2 scale-95"
                        : "hover:scale-105 border border-black/5"
                        }`}
                      aria-label={`Select container wallpaper context: ${bg.id}`}
                    />
                  );
                })
              }
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




      {/*SECTION 2: LIVE PREVIEW CONTAINER */}
      <section className="order-1 lg:order-2 lg:col-span-5 w-full lg:sticky lg:top-6 lg:max-w-[450px] lg:h-[calc(100vh-48px)] bg-[#FFF0EC] rounded-2xl p-6 flex flex-col items-center justify-center">
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

        {/* ABSOLUTE CANVAS CONTAINER ENGINE */}
        {
          template ?
            (<div
              style={template?.preview_color ? { backgroundColor: template.preview_color } : activeBackground?.type === "color" ? { backgroundColor: activeBackground.value } : undefined}
              className="w-full aspect-[3/4] max-w-[318px] h-[424px] rounded-[32px] relative overflow-hidden  "
            >
              {
                template?.preview_url ?
                  <Image
                    src={template.preview_url}
                    alt="Dynamic canvas theme background template file"
                    fill
                    priority
                    className="object-cover z-0 pointer-events-none"
                  />
                  :
                  activeBackground?.type === "image" && (
                    <Image
                      src={activeBackground?.value}
                      alt="Dynamic canvas theme background template file"
                      fill
                      priority
                      className="object-cover z-0 pointer-events-none"
                    />
                  )
              }


              {/* CANVAS COMPONENT LAYER 1: Dynamic Branding Header Positioning */}
              {
                template?.layout.hasHeaderLogo && (
                  <header className="absolute top-4 left-0 right-0 h-10 px-6 z-10 flex items-center justify-center">
                    {
                      logoData ? (
                        <div className="relative w-full h-full animate-in fade-in duration-200">
                          <Image
                            src={logoData.blobUrl}
                            alt="Dynamic Badge Header Logo Instance"
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <h1 className="text-white text-2xl font-serif italic tracking-wide select-none opacity-80">
                          {template?.title}
                        </h1>
                      )
                    }
                  </header>
                )
              }

              {/* CANVAS COMPONENT LAYER 2: STATIC ATTENDEE AVATAR CONTAINER */}
              {/* Centered proportionally using absolute positioning metrics */}
              <div className="absolute top-[88px] left-6 right-6 aspect-square lg:max-w-[318px] lg:max-h-[424px] bg-[`#E5E7EB`] rounded-2xl border-2 border-white/20 z-10 flex items-center justify-center shadow-inner">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center px-4 select-none">
                  Attendee Photograph Frame
                </span>
              </div>

              {/* CANVAS COMPONENT LAYER 3: DYNAMIC ABSOLUTE FIELD PLACEMENT LAYER ENGINE */}
              {/* Loops over fields and paints them directly using styles computed by the API database contract */}
              {
                template?.layout.fields.map((field) => (
                  <div
                    key={field.token}
                    style={field.style}
                    className="z-10 select-none transition-all duration-150"
                  >
                    {formData[field.token] || field.placeholder}
                  </div>
                ))
              }
            </div>)
            :
            (<div className="w-full aspect-[3/4] max-w-[318px] h-[424px] flex items-center justify-center ">
              <p className="font-bold font-fraunces animate-pulse">Loading Live Template....</p>
            </div>)
        }
      </section>

    </main>
  );
}