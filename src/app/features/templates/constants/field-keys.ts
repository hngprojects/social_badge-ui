import type { CanvasFieldKey } from "../types/canvas-data";

export const CANVAS_FIELD_KEYS = {
  EVENT_NAME: "event_name",
  EVENT_DATE: "event_date",
  PARTICIPANT_NAME: "participant_name",
  ROLE_TITLE: "role_title",
  PARTICIPANT_PHOTO: "participant_photo",
} as const satisfies Record<string, CanvasFieldKey>;

export const DEFAULT_OUTPUT = {
  width_px: 1080,
  height_px: 1350,
  format: "png" as const,
};

export const PHOTO_ACCEPTED_FORMATS = ["jpg", "png", "webp"] as const;
export const PHOTO_MAX_SIZE_MB = 5;
