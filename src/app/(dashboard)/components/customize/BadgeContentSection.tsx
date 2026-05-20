"use client";

import React from "react";
import { SectionCard, FieldLabel, TextInput, HelperText, Toggle } from "./ui";

interface BadgeContentSectionProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  allowPhoto: boolean;
  setAllowPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BadgeContentSection({
  formData,
  setFormData,
  allowPhoto,
  setAllowPhoto,
}: BadgeContentSectionProps) {
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
        <TextInput
          placeholder="e.g. #AchieveHer2026"
          value={formData["Hashtag"] ?? ""}
          onChange={(v) => setFormData((prev) => ({ ...prev, Hashtag: v }))}
        />
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
  );
}
