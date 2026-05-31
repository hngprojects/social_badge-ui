"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { FONTS } from "./constants";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";
import {
  PREVIEW_LAYOUTS,
  getPreviewValueForField,
} from "@/app/features/templates/constants/preview-layouts";
import { CANVAS_FIELD_KEYS } from "@/app/features/templates/constants/field-keys";

interface LivePreviewProps {
  editor: CustomizeEditorState;
  shareCaption?: string;
  participantPhotoUrl?: string | null;
  badgeRef?: React.RefObject<HTMLDivElement | null>;
  hideExtras?: boolean;
  badgeClassName?: string;
}

export function LivePreview({ editor, shareCaption, participantPhotoUrl, badgeRef, hideExtras, badgeClassName }: LivePreviewProps) {
  const preview = PREVIEW_LAYOUTS[editor.layoutId];

  const backgroundStyle = useMemo(() => {
    if (editor.backgroundImageUrl) {
      return undefined;
    }
    if (editor.bgMode === "gradient") {
      return {
        background: `linear-gradient(${editor.gradientDirection}, ${editor.gradientColors[0]}, ${editor.gradientColors[1]})`,
      };
    }
    if (editor.bgMode === "solid") {
      return { backgroundColor: editor.solidColor };
    }
    if (preview.previewColor) {
      return { backgroundColor: preview.previewColor };
    }
    return undefined;
  }, [editor, preview.previewColor]);

  const visibleFields = preview.fields.filter((slot) => {
    if (slot.key === CANVAS_FIELD_KEYS.ROLE_TITLE) {
      return editor.layoutId !== "photo_gradient_v1" ||
        editor.roleTitleLabel.trim().length > 0;
    }
    return true;
  });

  const titleStyle = useMemo(() => {
    const font = FONTS.find((f) => f.id === editor.fontId) || FONTS[0];
    const sizeMap = {
      SMALL: "16px",
      MEDIUM: "22px",
      LARGE: "32px",
    };
    return {
      ...font.style,
      fontSize: sizeMap[editor.titleSize] || "22px",
    };
  }, [editor.fontId, editor.titleSize]);

  return (
    <div className="space-y-3">
      {!hideExtras && (
        <div className="flex items-center gap-1.5 px-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
            Live Preview
          </span>
        </div>
      )}

      <div className={hideExtras ? "" : "rounded-2xl bg-orange-50 p-5"}>
        <div
          ref={badgeRef}
          style={backgroundStyle}
          className={`rounded-[18px] relative overflow-hidden mx-auto ${badgeClassName ?? "w-full max-w-79.5 h-106"}`}
        >
          {editor.backgroundImageUrl && (
            <Image
              src={editor.backgroundImageUrl}
              alt="Badge background"
              fill
              priority
              className="object-cover z-0 pointer-events-none"
            />
          )}

          {preview.hasHeaderLogo && (
            <header className="absolute top-4 left-0 right-0 h-10 px-6 z-10 flex items-center justify-center gap-2">
              {editor.logoPreviewUrl && (
                <div className="relative w-8 h-8 shrink-0">
                  <Image
                    src={editor.logoPreviewUrl}
                    alt="Event logo"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <h1
                className="text-white tracking-wide select-none opacity-80 truncate"
                style={titleStyle}
              >
                {editor.eventName || "Your event"}
              </h1>
            </header>
          )}

          {editor.allowParticipantPhoto && preview.photoFrame && (
            <div
              style={preview.photoFrame.style}
              className={`z-10 overflow-hidden shadow-inner border-2 ${
                preview.photoFrame.shape === "circle"
                  ? "rounded-full border-white/30"
                  : "rounded-2xl border-white/20"
              } ${preview.previewColor === "#F5F5F0" ? "border-gray-200" : ""}`}
            >
              {participantPhotoUrl ? (
                <Image
                  src={participantPhotoUrl}
                  alt="Participant photo"
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    preview.previewColor === "#F5F5F0" ? "bg-[#D4F5DC]" : "bg-[#E5E7EB]"
                  }`}
                >
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center px-4 select-none">
                    {preview.photoFrame.placeholder}
                  </span>
                </div>
              )}
            </div>
          )}

          {visibleFields.map((slot) => {
            const display =
              getPreviewValueForField(slot.key, editor) || slot.placeholder;
            const isParticipant =
              slot.key === CANVAS_FIELD_KEYS.PARTICIPANT_NAME ||
              slot.key === CANVAS_FIELD_KEYS.ROLE_TITLE;

            const isEventName = slot.key === CANVAS_FIELD_KEYS.EVENT_NAME;
            const combinedStyle = isEventName ? { ...slot.style, ...titleStyle } : slot.style;

            return (
              <div
                key={slot.key}
                style={combinedStyle}
                className={`z-10 select-none transition-all duration-150 ${
                  isParticipant ? "opacity-70 italic" : ""
                }`}
              >
                {display}
              </div>
            );
          })}
        </div>
      </div>

      {!hideExtras && (
        <>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-4 space-y-2">
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              Caption preview
            </p>
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {shareCaption || editor.defaultCaption || (
                <>
                  I&apos;m at #{editor.hashtags[0] ?? "Summit26"} this weekend — who&apos;s joining?{" "}
                  <span className="text-blue-600">{editor.destinationLink}</span>
                </>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
