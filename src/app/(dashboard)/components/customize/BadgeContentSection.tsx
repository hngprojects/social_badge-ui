"use client";

import React from "react";
import { SectionCard, FieldLabel, TextInput, HelperText, Toggle } from "./ui";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";
import type { LayoutCapabilities } from "@/app/features/templates/constants/layout-mapping";

import { Control, Controller } from "react-hook-form";
import type { CustomizeBadgeSchema } from "@/schemas/template";

interface BadgeContentSectionProps {
  control: Control<CustomizeBadgeSchema>;
  editor: CustomizeEditorState;
  layoutCaps: LayoutCapabilities;
}

export function BadgeContentSection({ control, editor, layoutCaps }: BadgeContentSectionProps) {
  const showRole = layoutCaps.participantFields.includes("role_title");

  return (
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-800">Show Name field</p>
          <p className="text-xs text-gray-400 mt-0.5">Allow attendees to provide their name on the badge.</p>
        </div>
        <Controller
          name="participantNameVisible"
          control={control}
          render={({ field }) => (
            <Toggle
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {showRole && (
        <div className="flex items-start justify-between gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-800">Show Role / title field</p>
            <p className="text-xs text-gray-400 mt-0.5">Allow attendees to provide their role or title.</p>
          </div>
          <Controller
            name="roleTitleVisible"
            control={control}
            render={({ field }) => (
              <Toggle
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      )}
    </SectionCard>
  );
}
