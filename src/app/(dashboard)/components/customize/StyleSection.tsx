"use client";

import React from "react";
import { SectionCard, HelperText } from "./ui";
import { PALETTES, FONTS, SIZES } from "./constants";

interface StyleSectionProps {
  bgMode: "gradient" | "solid";
  setBgMode: (m: "gradient" | "solid") => void;
  selectedPalette: string;
  setSelectedPalette: (id: string) => void;
  selectedFont: string;
  setSelectedFont: (id: string) => void;
  selectedSize: typeof SIZES[number];
  setSelectedSize: (s: typeof SIZES[number]) => void;
  eventName: string;
}

export function StyleSection({
  bgMode,
  setBgMode,
  selectedPalette,
  setSelectedPalette,
  selectedFont,
  setSelectedFont,
  selectedSize,
  setSelectedSize,
  eventName,
}: StyleSectionProps) {
  return (
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
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Coming soon"
            className="w-9 h-9 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 cursor-not-allowed opacity-50 text-lg leading-none"
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
              <span className={`font-bold text-gray-800 ${s === "SMALL" ? "text-base" : s === "MEDIUM" ? "text-xl" : "text-2xl"}`}>
                Aa
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-gray-400">{s}</span>
            </button>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
