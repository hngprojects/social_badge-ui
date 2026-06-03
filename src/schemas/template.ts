import { z } from "zod";

export const customizeBadgeSchema = z.object({
  eventName: z.string().trim().min(1, "Event name is required"),
  title: z.string().optional(),
  eventDate: z.string().optional(),
  eventTime: z.string().optional(),
  participantNameVisible: z.boolean().default(true),
  roleTitleVisible: z.boolean().default(true),
  roleTitleRequired: z.boolean().default(false),
  allowParticipantPhoto: z.boolean().default(true),
  defaultCaption: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
  accessType: z.number().optional(),
  fontId: z.string().optional(),
  paletteId: z.string().optional(),
  bgMode: z.enum(["gradient", "solid"]).optional(),
});

export type CustomizeBadgeSchema = z.infer<typeof customizeBadgeSchema>;
