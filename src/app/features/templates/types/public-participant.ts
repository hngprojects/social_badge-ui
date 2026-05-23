import type { ApiEnvelope } from "./platform-template";
import type { CanvasData } from "./canvas-data";

export interface PublicParticipantPageData {
  title: string;
  canvas_data: CanvasData;
  logo_url?: string | null;
  default_caption?: string | null;
  destination_link?: string | null;
  hashtags?: string[];
}

export type PublicParticipantPageResponse = ApiEnvelope<PublicParticipantPageData>;
