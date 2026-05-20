import React from "react";

/* ── Interfaces ─────────────────────────────────────────────────────────── */

export interface AbsoluteField {
  token: string;
  placeholder: string;
  style: React.CSSProperties;
}

export interface TemplateConfig {
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

export interface BackgroundOption {
  id: string;
  type: "image" | "color" | "gradient";
  value: string;
  thumbnailStyle: React.CSSProperties;
}

export interface UploadedFileMetadata {
  name: string;
  sizeStr: string;
  blobUrl: string;
}

/* ── Mock data ──────────────────────────────────────────────────────────── */

export const MOCK_TEMPLATE_API_RESPONSE: TemplateConfig = {
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
        style: {
          position: "absolute", bottom: "20px", left: "24px", right: "24px",
          textAlign: "center", fontSize: "16px", fontWeight: "400",
          letterSpacing: "0.05em", color: "#ffffff", whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis", borderWidth: "1px",
          borderStyle: "solid", borderImage: "linear-gradient(to left, #FC5E24, #FFFFFF) 1",
          padding: "4px",
        },
      },
      {
        token: "Role / Title",
        placeholder: "SUMMIT",
        style: {
          position: "absolute", top: "54px", right: "28px", fontSize: "16px",
          fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#ffffff",
        },
      },
      {
        token: "Date",
        placeholder: "JULY 21ST",
        style: {
          position: "absolute", top: "54px", left: "28px", fontSize: "16px",
          fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.9)",
        },
      },
    ],
  },
};

/* ── Backgrounds ────────────────────────────────────────────────────────── */

export const COMBINED_BACKGROUNDS: BackgroundOption[] = [
  { id: "bg_mesh_01",          type: "image", value: "/assets/dashboard/bg-1.png", thumbnailStyle: { backgroundImage: "linear-gradient(to right, #ff007a, #ff5c00, #ffa800)" } },
  { id: "bg_mesh_02",          type: "image", value: "/assets/dashboard/bg-2.png", thumbnailStyle: { backgroundImage: "linear-gradient(to right, #2e2a67, #7b73c7)" } },
  { id: "bg_mesh_03",          type: "image", value: "/assets/dashboard/bg-3.png", thumbnailStyle: { backgroundImage: "linear-gradient(to right, #4158d0, #c850c0, #ffcc70)" } },
  { id: "bg_mesh_04",          type: "image", value: "/assets/dashboard/bg-4.png", thumbnailStyle: { backgroundImage: "linear-gradient(to right, #4158d0, #c850c0, #ffcc70)" } },
  { id: "bg_color_dark",       type: "color", value: "#0A0A0A",  thumbnailStyle: { backgroundColor: "#0A0A0A" } },
  { id: "bg_color_amber",      type: "color", value: "#FFD466",  thumbnailStyle: { backgroundColor: "#FFD466" } },
  { id: "bg_color_teal",       type: "color", value: "#7CD7C5",  thumbnailStyle: { backgroundColor: "#7CD7C5" } },
  { id: "bg_color_purple",     type: "color", value: "#C8B2FF",  thumbnailStyle: { backgroundColor: "#C8B2FF" } },
  { id: "bg_color_darker",     type: "color", value: "#0A0A0A",  thumbnailStyle: { backgroundColor: "#0A0A0A" } },
  { id: "bg_color_light_grey", type: "color", value: "#EAEAE6",  thumbnailStyle: { backgroundColor: "#EAEAE6" } },
];

/* ── Style constants ────────────────────────────────────────────────────── */

export const PALETTES = [
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

export const FONTS = [
  { id: "inter",    label: "INTER",    style: { fontFamily: "Inter, sans-serif" } },
  { id: "fraunces", label: "FRAUNCES", style: { fontFamily: "Fraunces, serif", fontStyle: "italic" as const } },
  { id: "mono",     label: "MONO",     style: { fontFamily: "ui-monospace, monospace" } },
  { id: "display",  label: "DISPLAY",  style: { fontFamily: "Georgia, serif", fontWeight: 700 } },
];

export const SIZES = ["SMALL", "MEDIUM", "LARGE"] as const;

export const TABS = ["Badge", "Share post", "Click flow"] as const;

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ── Helpers ────────────────────────────────────────────────────────────── */

export function ordinal(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}TH`;
  switch (n % 10) {
    case 1: return `${n}ST`;
    case 2: return `${n}ND`;
    case 3: return `${n}RD`;
    default: return `${n}TH`;
  }
}
