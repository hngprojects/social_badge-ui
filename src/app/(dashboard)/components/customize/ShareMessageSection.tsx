"use client";

import { SectionCard, FieldLabel, TextArea, HelperText } from "./ui";
import { Input } from "@/components/ui/input";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";

interface ShareMessageSectionProps {
  editor: CustomizeEditorState;
  onChange: (partial: Partial<CustomizeEditorState>) => void;
}

export function ShareMessageSection({ editor, onChange }: ShareMessageSectionProps) {
  const hashtagsInput = editor.hashtags.join(", ");

  return (
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
      <div className="flex items-start gap-2.5 rounded-lg bg-orange-50 border border-orange-200 px-3.5 py-3">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500 mt-0.5 shrink-0">
          <path
            fillRule="evenodd"
            d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-8-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-1 4a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0v-3z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-xs text-orange-700 leading-relaxed">
          <strong>Captions with first-person voice + a question convert best.</strong>
          <br />
          Attendees can edit the caption before posting, so write it as if you were them.
        </p>
      </div>

      <div>
        <FieldLabel label="Default share caption" />
        <TextArea
          placeholder="e.g. I'm at #Summit26 this weekend — who's joining?"
          value={editor.defaultCaption}
          onChange={(v) => onChange({ defaultCaption: v })}
        />
        <HelperText>Auto-shortened for X / Twitter. WhatsApp and LinkedIn use the full text.</HelperText>
      </div>

      <div>
        <FieldLabel label="Hashtag (optional)" />
        <TextArea
          placeholder="e.g. AchieveHer2026, WomenInTech (comma-separated)"
          value={hashtagsInput}
          onChange={(v) =>
            onChange({
              hashtags: v
                .split(",")
                .map((tag) => tag.trim().replace(/^#/, ""))
                .filter(Boolean),
            })
          }
        />
        <HelperText>Displayed on the badge and added to share captions automatically.</HelperText>
      </div>

      <div>
        <FieldLabel label="Destination link" required />
        <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-transparent transition">
          <span className="px-3 py-2.5 text-sm text-gray-400 bg-gray-50 border-r border-gray-200 select-none whitespace-nowrap">
            https://
          </span>
          <Input
            type="text"
            value={editor.destinationLink}
            onChange={(e) => onChange({ destinationLink: e.target.value })}
            className="flex-1 h-auto px-3 py-2.5 text-sm text-gray-800 bg-white border-0 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-transparent"
          />
        </div>
        <HelperText>Use a UTM-tagged URL if you want to track conversions in your analytics tool.</HelperText>
      </div>
    </SectionCard>
  );
}
