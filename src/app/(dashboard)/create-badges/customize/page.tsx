"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";




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
  type: "image" | "color" | "gradient";
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



/* ─────────────────────────── Style constants ──────────────────────────── */

// Mirror COMBINED_BACKGROUNDS so the Style palette uses the same colours
const PALETTES = [
  { id: "bg_mesh_01",          from: "#ff007a", to: "#ffa800" },
  { id: "bg_mesh_02",          from: "#2e2a67", to: "#7b73c7" },
  { id: "bg_mesh_03",          from: "#4158d0", to: "#ffcc70" },
  { id: "bg_mesh_04",          from: "#4158d0", to: "#c850c0" },
  { id: "bg_color_dark",       from: "#0A0A0A", to: "#0A0A0A" },
  { id: "bg_color_amber",      from: "#FFD466", to: "#FFD466" },
  { id: "bg_color_teal",       from: "#7CD7C5", to: "#7CD7C5" },
  { id: "bg_color_purple",     from: "#C8B2FF", to: "#C8B2FF" },
  { id: "bg_color_darker",     from: "#0A0A0A", to: "#0A0A0A" },
  { id: "bg_color_light_grey", from: "#EAEAE6", to: "#EAEAE6" },
];

const FONTS = [
  { id: "inter",     label: "INTER",     style: { fontFamily: "Inter, sans-serif" } },
  { id: "fraunces",  label: "FRAUNCES",  style: { fontFamily: "Fraunces, serif", fontStyle: "italic" as const } },
  { id: "mono",      label: "MONO",      style: { fontFamily: "ui-monospace, monospace" } },
  { id: "display",   label: "DISPLAY",   style: { fontFamily: "Georgia, serif", fontWeight: 700 } },
];

const SIZES = ["SMALL", "MEDIUM", "LARGE"] as const;

const TABS = ["Badge", "Share post", "Click flow"] as const;

/* ─────────────────────────── Small UI helpers ─────────────────────────── */

function SectionCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-100">
        <span className="mt-0.5 text-orange-500">{icon}</span>
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {/* Body */}
      <div className="px-4 py-4 space-y-4">{children}</div>
    </div>
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
      {label}
      {required && <span className="text-[#FB3748] ml-0.5">*</span>}
    </label>
  );
}

function TextInput({ placeholder, value, onChange }: { placeholder?: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full h-12 px-4 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-[#F6F6F6] text-[#595959] text-sm font-medium"
    />
  );
}

function HelperText({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-400 mt-1.5">{children}</p>;
}

function TextArea({ placeholder, value, onChange }: { placeholder?: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <textarea
      rows={3}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-4 py-3 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-[#F6F6F6] text-[#595959] text-sm font-medium resize-none"
    />
  );
}

const MONTHS = [
  "January","February","March","April","May",
  "June","July","August","September","October","November","December",
];

function ordinal(n: number): string {
  if (n >= 11 && n <= 13) return `${n}TH`;
  switch (n % 10) {
    case 1: return `${n}ST`;
    case 2: return `${n}ND`;
    case 3: return `${n}RD`;
    default: return `${n}TH`;
  }
}

function BadgeDatePicker({ onChange }: { onChange: (formatted: string) => void }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const daysInMonth = month
    ? new Date(2024, MONTHS.indexOf(month) + 1, 0).getDate()
    : 31;

  const handleChange = (newMonth: string, newDay: string) => {
    if (newMonth && newDay) {
      onChange(`${newMonth.toUpperCase()} ${ordinal(parseInt(newDay))}`);
    }
  };

  const selectClass =
    "flex-1 h-12 px-3 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-[#F6F6F6] text-[#595959] text-sm font-medium appearance-none cursor-pointer";

  return (
    <div className="flex gap-2">
      <select
        value={month}
        onChange={(e) => { setMonth(e.target.value); handleChange(e.target.value, day); }}
        className={selectClass}
      >
        <option value="">Month</option>
        {MONTHS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select
        value={day}
        onChange={(e) => { setDay(e.target.value); handleChange(month, e.target.value); }}
        className={`${selectClass} max-w-22.5`}
      >
        <option value="">Day</option>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
        checked ? "bg-orange-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

export default function CreateBadgePage() {

  const [template, setTemplate] = useState<TemplateConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [logoData, setLogoData] = useState<UploadedFileMetadata | null>(null);
  const [activeBackground, setActiveBackground] = useState<BackgroundOption>(COMBINED_BACKGROUNDS[0]);
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [bgMode, setBgMode] = useState<"gradient" | "solid">("gradient");
  const [selectedPalette, setSelectedPalette] = useState<string>(PALETTES[0].id);
  const [selectedFont, setSelectedFont] = useState<string>(FONTS[0].id);
  const [selectedSize, setSelectedSize] = useState<typeof SIZES[number]>("MEDIUM");
  const [allowPhoto, setAllowPhoto] = useState(true);
  const [eventName, setEventName] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Badge");
  const [shareCaption, setShareCaption] = useState("");







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







  // Keep preview in sync whenever the Style palette or bg mode changes
  useEffect(() => {
    const palette = PALETTES.find((p) => p.id === selectedPalette);
    if (!palette) return;

    const originalBg = COMBINED_BACKGROUNDS.find((bg) => bg.id === selectedPalette);

    if (bgMode === "gradient" && originalBg?.type === "image") {
      // Re-use the actual image asset — it already looks like a gradient
      setActiveBackground(originalBg);
    } else if (bgMode === "gradient") {
      setActiveBackground({
        id: palette.id,
        type: "gradient",
        value: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
        thumbnailStyle: { background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` },
      });
    } else {
      // Solid mode — use the base colour
      setActiveBackground({
        id: palette.id,
        type: "color",
        value: palette.from,
        thumbnailStyle: { backgroundColor: palette.from },
      });
    }
  }, [selectedPalette, bgMode]);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ template, formData, logoData });
  }



  return (
    <>
    <main className="grid grid-cols-1 bg-[#F5F5F5] lg:grid-cols-12 gap-8 max-w-360 mx-auto w-full items-start">

      {/* SECTION 1: THE CONTROL PANEL FORM */}
      <section className="order-2 lg:order-1 lg:col-span-7  p-6 space-y-6">

        {/* Breadcrumb — lives inside the left column */}
        <div className="pb-2 border-b border-gray-100">
          <p className="text-xs text-gray-400">
            <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
            &nbsp;/&nbsp;
            <Link href="/create-badges" className="hover:text-gray-600 transition-colors">Create badges</Link>
            &nbsp;/&nbsp;
            <span className="text-gray-500">Customise</span>
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#3A3A3A]">Customise your badge</h1>
          <p className="text-xs text-gray-400 mt-1">
            Make it yours — your changes appear live on the right.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-9">

          {/* ── Brand ── */}
          <SectionCard
            icon={
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.6}>
                <circle cx="10" cy="10" r="7" />
                <path d="M7 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />
              </svg>
            }
            title="Brand"
            subtitle="How your event shows up on the badge."
          >
            {/* Logo */}
            <div>
              <FieldLabel label="Logo" required />
              <div className="flex items-center gap-3">
                <label className="cursor-pointer">
                  <span className="inline-flex items-center rounded-md border border-orange-400 px-3 py-1.5 text-xs font-semibold text-orange-500 hover:bg-orange-50 transition">
                    Choose File
                  </span>
                  <input
                    type="file"
                    accept="image/*,.svg"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setLogoFile(file.name);
                      setLogoData({ name: file.name, sizeStr: "", blobUrl: URL.createObjectURL(file) });
                    }}
                  />
                </label>
                <span className="text-sm text-gray-400">{logoFile ?? "No file Chosen"}</span>
              </div>
              <HelperText>SVG recommended for crisp display. PNG works too (min 240 × 240px).</HelperText>
            </div>

            {/* Event Name */}
            <div>
              <FieldLabel label="Event Name" required />
              <TextInput
                placeholder="e.g. AchieveHer Summit"
                value={eventName}
                onChange={(v) => setEventName(v)}
              />
              <HelperText>Appears as the main title on the badge.</HelperText>
            </div>

            {/* Date */}
            <div>
              <FieldLabel label="Date" />
              <BadgeDatePicker
                onChange={(v) => setFormData((prev) => ({ ...prev, Date: v }))}
              />
              <HelperText>Updates the date shown on the live badge preview.</HelperText>
            </div>
          </SectionCard>

          {/* ── Style ── */}
          <SectionCard
            icon={
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.6}>
                <circle cx="10" cy="10" r="2" />
                <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.22 5.22l1.42 1.42M13.36 13.36l1.42 1.42M5.22 14.78l1.42-1.42M13.36 6.64l1.42-1.42" />
              </svg>
            }
            title="Style"
            subtitle="Colour, typography, and visual feel."
          >
            {/* Background toggle */}
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">Background</p>
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                {(["gradient", "solid"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setBgMode(mode)}
                    className={`flex-1 flex bg-[#EEEEEE] items-center justify-center gap-2 py-2 text-sm font-medium transition ${
                      bgMode === mode
                        ? "bg-white text-gray-900 shadow-sm"
                        : "bg-gray-50 text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-sm inline-block"
                      style={
                        mode === "gradient"
                          ? { background: "linear-gradient(135deg,#FF4D4D,#FF8C42)" }
                          : { background: "#FF4D4D" }
                      }
                    />
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette swatches */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {PALETTES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPalette(p.id)}
                    className={`w-9 h-9 rounded-md flex items-center justify-center transition-transform ${
                      selectedPalette === p.id ? "ring-2 ring-offset-2 ring-black scale-110" : "hover:scale-105"
                    }`}
                    style={{
                      background:
                        bgMode === "gradient"
                          ? `linear-gradient(135deg, ${p.from}, ${p.to})`
                          : p.from,
                    }}
                  >
                    {selectedPalette === p.id && (
                      <svg className="w-4 h-4 text-white drop-shadow" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 5" />
                      </svg>
                    )}
                  </button>
                ))}
                {/* Add custom */}
                <button
                  type="button"
                  className="w-9 h-9 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition text-lg leading-none"
                >
                  +
                </button>
              </div>
              <HelperText>Pick from curated palettes designed for high-contrast share posts.</HelperText>
            </div>

            {/* Title font */}
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">Title font</p>
              <div className="grid grid-cols-2 gap-2">
                {FONTS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFont(f.id)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      selectedFont === f.id
                        ? "border-orange-400 ring-1 ring-orange-400 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <span className="block text-xl text-gray-900 truncate" style={f.style}>
                      {eventName || "Achieveher"}
                    </span>
                    <span className="block text-[10px] font-semibold tracking-widest text-gray-400 mt-1">
                      {f.label}
                    </span>
                  </button>
                ))}
              </div>
              <HelperText>Different layouts pair best with different fonts. The default is matched to your template.</HelperText>
            </div>

            {/* Title size */}
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">Title size</p>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-xl border py-3 flex flex-col items-center gap-1 transition ${
                      selectedSize === s
                        ? "border-gray-900 bg-white shadow-sm"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`font-bold text-gray-800 ${
                        s === "SMALL" ? "text-base" : s === "MEDIUM" ? "text-xl" : "text-2xl"
                      }`}
                    >
                      Aa
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest text-gray-400">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ── Badge Content ── */}
          <SectionCard
            icon={
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.6}>
                <rect x="4" y="3" width="12" height="14" rx="2" />
                <path d="M7 7h6M7 10h6M7 13h4" strokeLinecap="round" />
              </svg>
            }
            title="Badge content"
            subtitle="What attendees fill in when they claim a badge."
          >
            {/* Name field label */}
            <div>
              <FieldLabel label="Name field label" />
              <TextInput
                placeholder="e.g. Your Name"
                value={formData["Name"] ?? ""}
                onChange={(v) => setFormData((prev) => ({ ...prev, Name: v }))}
              />
              <HelperText>What attendees see in the badge&apos;s name field.</HelperText>
            </div>

            {/* Hashtag */}
            <div>
              <FieldLabel label="Hashtag (optional)" />
              <TextInput placeholder="Placeholder text..." />
              <HelperText>Displayed on the badge and added to share captions automatically.</HelperText>
            </div>

            {/* Allow attendee photo */}
            <div className="flex items-start justify-between gap-4 pt-1">
              <div>
                <p className="text-sm font-semibold text-gray-800">Allow attendee photo</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Let attendees add their photo to personalise the badge. Increases share rate by ~28%.
                </p>
              </div>
              <Toggle checked={allowPhoto} onChange={() => setAllowPhoto((v) => !v)} />
            </div>
          </SectionCard>

          {/* ── Share Message ── */}
          <SectionCard
            icon={
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.6}>
                <circle cx="15" cy="5" r="2" />
                <circle cx="5" cy="10" r="2" />
                <circle cx="15" cy="15" r="2" />
                <path d="M7 9l6-3M7 11l6 3" strokeLinecap="round" />
              </svg>
            }
            title="Share message"
            subtitle="What attendees post when they share their badge."
          >
            {/* Info banner */}
            <div className="flex items-start gap-2.5 rounded-lg bg-orange-50 border border-orange-200 px-3.5 py-3">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500 mt-0.5 shrink-0">
                <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-8-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-1 4a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0v-3z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-orange-700 leading-relaxed">
                <strong>Captions with first-person voice + a question convert best.</strong>
                <br />
                Attendees can edit the caption before posting, so write it as if you were them.
              </p>
            </div>

            {/* Default share caption */}
            <div>
              <FieldLabel label="Default share caption" />
              <TextArea
                placeholder="e.g. I'm at #Summit26 this weekend — who's joining?"
                value={shareCaption}
                onChange={(v) => setShareCaption(v)}
              />
              <HelperText>Auto-shortened for X / Twitter. WhatsApp and LinkedIn use the full text.</HelperText>
            </div>

            {/* Destination link */}
            <div>
              <FieldLabel label="Destination link" required />
              <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-transparent transition">
                <span className="px-3 py-2.5 text-sm text-gray-400 bg-gray-50 border-r border-gray-200 select-none whitespace-nowrap">
                  https://
                </span>
                <input
                  type="text"
                  defaultValue="achieveher.com/register"
                  className="flex-1 px-3 py-2.5 text-sm text-gray-800 focus:outline-none bg-white"
                />
              </div>
              <HelperText>Use a UTM-tagged URL if you want to track conversions in your analytics tool.</HelperText>
            </div>
          </SectionCard>

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




      {/* SECTION 2: LIVE PREVIEW CONTAINER */}
      <section className="order-1 p-3 bg-[#FFFFFF] lg:order-2 lg:col-span-5 w-full lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:pt-6 lg:pb-6">
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
                  template?.preview_color
                    ? { backgroundColor: template.preview_color }
                    : activeBackground?.type === "gradient"
                    ? { background: activeBackground.value }
                    : activeBackground?.type === "color"
                    ? { backgroundColor: activeBackground.value }
                    : undefined
                }
                className="w-full max-w-79.5 h-106 rounded-[32px] relative overflow-hidden mx-auto"
              >
                {/* Background image layer */}
                {template?.preview_url ? (
                  <Image
                    src={template.preview_url}
                    alt="Dynamic canvas theme background"
                    fill
                    priority
                    className="object-cover z-0 pointer-events-none"
                  />
                ) : (
                  activeBackground?.type === "image" && (
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
                {template?.layout.hasHeaderLogo && (
                  <header className="absolute top-4 left-0 right-0 h-10 px-6 z-10 flex items-center justify-center">
                    <h1 className="text-white text-2xl font-serif italic tracking-wide select-none opacity-80">
                      {eventName || template?.title}
                    </h1>
                  </header>
                )}

                {/* CANVAS LAYER 2: Attendee photo / upload preview */}
                <div className="absolute top-22 left-6 right-6 aspect-square rounded-2xl border-2 border-white/20 z-10 overflow-hidden shadow-inner">
                  {logoData?.blobUrl ? (
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
                {template?.layout.fields.map((field) => (
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
              achieveher.com/register
            </span>
          </div>

        </div>
      </section>

    </main>
    </>
  );
}