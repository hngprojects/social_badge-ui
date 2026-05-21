import type { CSSProperties } from "react";
import type { CanvasFieldKey, CanvasLayoutId } from "../types/canvas-data";
import { CANVAS_FIELD_KEYS } from "./field-keys";

export interface PreviewFieldSlot {
  key: CanvasFieldKey;
  placeholder: string;
  style: CSSProperties;
}

export interface PreviewLayoutConfig {
  layoutId: CanvasLayoutId;
  hasHeaderLogo: boolean;
  previewColor: string;
  photoFrame: {
    shape: "square" | "circle";
    placeholder: string;
    style: CSSProperties;
  } | null;
  fields: PreviewFieldSlot[];
}

export const PREVIEW_LAYOUTS: Record<CanvasLayoutId, PreviewLayoutConfig> = {
  photo_gradient_v1: {
    layoutId: "photo_gradient_v1",
    hasHeaderLogo: true,
    previewColor: "",
    photoFrame: {
      shape: "square",
      placeholder: "Attendee photo",
      style: { position: "absolute", top: "88px", left: "24px", right: "24px", aspectRatio: "1" },
    },
    fields: [
      {
        key: CANVAS_FIELD_KEYS.EVENT_DATE,
        placeholder: "JULY 21ST",
        style: {
          position: "absolute", top: "54px", left: "28px", fontSize: "16px",
          fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.9)",
        },
      },
      {
        key: CANVAS_FIELD_KEYS.EVENT_NAME,
        placeholder: "SUMMIT",
        style: {
          position: "absolute", top: "54px", right: "28px", fontSize: "16px",
          fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#ffffff",
        },
      },
      {
        key: CANVAS_FIELD_KEYS.PARTICIPANT_NAME,
        placeholder: "Your Name",
        style: {
          position: "absolute", bottom: "20px", left: "24px", right: "24px",
          textAlign: "center", fontSize: "16px", color: "#ffffff",
          borderWidth: "1px", borderStyle: "solid",
          borderImage: "linear-gradient(to left, #FC5E24, #FFFFFF) 1", padding: "4px",
        },
      },
    ],
  },
  name_role_dark_v1: {
    layoutId: "name_role_dark_v1",
    hasHeaderLogo: false,
    previewColor: "#0A0A0A",
    photoFrame: {
      shape: "circle",
      placeholder: "Profile photo",
      style: {
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -55%)", width: "120px", height: "120px",
      },
    },
    fields: [
      {
        key: CANVAS_FIELD_KEYS.EVENT_NAME,
        placeholder: "DEV / SUMMIT",
        style: {
          position: "absolute", top: "32px", left: "0", right: "0", textAlign: "center",
          fontSize: "11px", fontWeight: "700", letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.7)",
        },
      },
      {
        key: CANVAS_FIELD_KEYS.PARTICIPANT_NAME,
        placeholder: "YOUR NAME",
        style: {
          position: "absolute", bottom: "28px", left: "24px", right: "24px",
          textAlign: "center", fontSize: "14px", fontWeight: "600",
          letterSpacing: "0.15em", color: "#ffffff", textTransform: "uppercase",
          backgroundColor: "rgba(255,255,255,0.08)", padding: "10px 12px", borderRadius: "4px",
        },
      },
      {
        key: CANVAS_FIELD_KEYS.ROLE_TITLE,
        placeholder: "ATTENDEE",
        style: {
          position: "absolute", top: "44px", right: "20px", fontSize: "10px",
          fontWeight: "700", letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)",
          writingMode: "vertical-rl", textOrientation: "mixed",
        },
      },
    ],
  },
  speaker_card_v1: {
    layoutId: "speaker_card_v1",
    hasHeaderLogo: false,
    previewColor: "#F5F5F0",
    photoFrame: {
      shape: "square",
      placeholder: "Photo",
      style: { position: "absolute", top: "72px", left: "28px", width: "72px", height: "72px" },
    },
    fields: [
      {
        key: CANVAS_FIELD_KEYS.EVENT_NAME,
        placeholder: "Next Gen Meetup",
        style: {
          position: "absolute", top: "28px", left: "28px", right: "28px",
          fontSize: "20px", fontWeight: "800", color: "#1A1A1A",
        },
      },
      {
        key: CANVAS_FIELD_KEYS.EVENT_DATE,
        placeholder: "June 30th",
        style: {
          position: "absolute", top: "160px", left: "28px",
          fontSize: "11px", fontWeight: "600", color: "#6B7280",
        },
      },
      {
        key: CANVAS_FIELD_KEYS.PARTICIPANT_NAME,
        placeholder: "Name",
        style: {
          position: "absolute", top: "188px", left: "28px", right: "28px",
          fontSize: "13px", fontWeight: "700", color: "#1A1A1A",
        },
      },
      {
        key: CANVAS_FIELD_KEYS.ROLE_TITLE,
        placeholder: "Job Description",
        style: {
          position: "absolute", top: "210px", left: "28px", right: "28px",
          fontSize: "11px", fontWeight: "500", color: "#9CA3AF",
        },
      },
    ],
  },
};

export function getPreviewValueForField(
  key: CanvasFieldKey,
  state: {
    eventName: string;
    eventDate: string;
    eventTime: string;
    participantNamePlaceholder: string;
    roleTitlePlaceholder: string;
  },
): string {
  switch (key) {
    case CANVAS_FIELD_KEYS.EVENT_NAME:
      return state.eventName;
    case CANVAS_FIELD_KEYS.EVENT_DATE:
      return state.eventTime
        ? `${state.eventDate} · ${state.eventTime}`.trim()
        : state.eventDate;
    case CANVAS_FIELD_KEYS.PARTICIPANT_NAME:
      return state.participantNamePlaceholder;
    case CANVAS_FIELD_KEYS.ROLE_TITLE:
      return state.roleTitlePlaceholder;
    default:
      return "";
  }
}
