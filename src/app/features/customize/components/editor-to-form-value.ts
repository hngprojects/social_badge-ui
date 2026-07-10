import { CustomizeBadgeFormValues } from "@/schemas/template";
import { CustomizeEditorState } from "../canvas-data";

export function getDefaultFormValues(
  editor: CustomizeEditorState,
  organiserTemplateId: string | null
): CustomizeBadgeFormValues {
  return {
    eventName: organiserTemplateId ? editor.eventName : "",
    title: editor.title,
    eventDate: editor.eventDate,
    eventTime: editor.eventTime,
    participantNameVisible: editor.participantNameVisible,
    roleTitleVisible: editor.roleTitleVisible,
    trackVisible: editor.trackVisible ?? true,
    trackRequired: editor.trackRequired ?? false,
    roleTitleRequired: editor.roleTitleRequired,
    allowParticipantPhoto: editor.allowParticipantPhoto,
    defaultCaption: editor.defaultCaption,
    hashtags: editor.hashtags,
    accessType: editor.accessType,
    accessCode: editor.accessCode,
    fontId: editor.fontId,
    paletteId: editor.paletteId,
    badgeTitle: editor.badgeTitle || "Finalist",
    bgMode: editor.isSplit ? "split" : editor.bgMode,
    secondaryColor: editor.secSolidColor,
    textColor: editor.textColor,
  };
}