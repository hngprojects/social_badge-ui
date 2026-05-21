"use client";

import React from "react";
import { SectionCard, FieldLabel, TextInput, HelperText, Toggle } from "./ui";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";
import type { LayoutCapabilities } from "@/app/features/templates/constants/layout-mapping";

interface BadgeContentSectionProps {
  editor: CustomizeEditorState;
  onChange: (partial: Partial<CustomizeEditorState>) => void;
  layoutCaps: LayoutCapabilities;
}

export function BadgeContentSection({ editor, onChange, layoutCaps }: BadgeContentSectionProps) {
  const showRole = layoutCaps.participantFields.includes("role_title");
  const showPhoto = layoutCaps.participantFields.includes("participant_photo");

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
      <div>
        <FieldLabel label="Name field label" required />
        <TextInput
          placeholder="e.g. Your Name"
          value={editor.participantNameLabel}
          onChange={(v) => onChange({ participantNameLabel: v })}
        />
        <HelperText>What attendees see in the badge&apos;s name field.</HelperText>
      </div>

      <div>
        <FieldLabel label="Name placeholder" />
        <TextInput
          placeholder="e.g. Your name"
          value={editor.participantNamePlaceholder}
          onChange={(v) => onChange({ participantNamePlaceholder: v })}
        />
        <HelperText>Hint text shown before attendees type their name.</HelperText>
      </div>

      {showRole && (
        <>
          <div>
            <FieldLabel label="Role / title label" />
            <TextInput
              placeholder="e.g. ROLE / TITLE"
              value={editor.roleTitleLabel}
              onChange={(v) => onChange({ roleTitleLabel: v })}
            />
          </div>
          <div>
            <FieldLabel label="Role / title placeholder" />
            <TextInput
              placeholder="e.g. Attendee"
              value={editor.roleTitlePlaceholder}
              onChange={(v) => onChange({ roleTitlePlaceholder: v })}
            />
          </div>
          <div className="flex items-start justify-between gap-4 pt-1">
            <div>
              <p className="text-sm font-semibold text-gray-800">Require role / title</p>
              <p className="text-xs text-gray-400 mt-0.5">Attendees must fill in their role or title to claim.</p>
            </div>
            <Toggle
              checked={editor.roleTitleRequired}
              onChange={() => onChange({ roleTitleRequired: !editor.roleTitleRequired })}
            />
          </div>
        </>
      )}

      {showPhoto && (
        <div className="flex items-start justify-between gap-4 pt-1">
          <div>
            <p className="text-sm font-semibold text-gray-800">Allow attendee photo</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Let attendees add their photo to personalise the badge. Increases share rate by ~28%.
            </p>
          </div>
          <Toggle
            checked={editor.allowParticipantPhoto}
            onChange={() => onChange({ allowParticipantPhoto: !editor.allowParticipantPhoto })}
          />
        </div>
      )}
    </SectionCard>
  );
}
