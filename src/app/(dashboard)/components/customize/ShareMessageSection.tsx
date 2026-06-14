"use client";

import { SectionCard, FieldLabel, TextArea, HelperText } from "./ui";
import type { UseFormRegister } from "react-hook-form";
import type { CustomizeBadgeFormValues } from "@/schemas/template";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";

interface ShareMessageSectionProps {
  register: UseFormRegister<CustomizeBadgeFormValues>;
  editor: CustomizeEditorState;
}

export function ShareMessageSection({ register, editor }: ShareMessageSectionProps) {

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
      <div>
        <FieldLabel label="Caption" />
        <TextArea
          placeholder="e.g. I'm at #Summit26 this weekend — who's joining?"
          {...register("defaultCaption")}
          value={editor.defaultCaption || ""}
          maxLength={200}
        />
        <HelperText>Auto-shortened for X / Twitter. WhatsApp and LinkedIn use the full text.</HelperText>
      </div>
    </SectionCard>
  );
}
