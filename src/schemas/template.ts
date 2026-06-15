import { z } from "zod";

export const customizeBadgeSchema = z.object({
  eventName: z.string().trim().min(1, "Event name is required"),
  title: z.string().optional(),
  eventDate: z.string().optional(),
  eventTime: z.string().optional(),
  participantNameVisible: z.boolean().default(true),
  roleTitleVisible: z.boolean().default(true),
  trackVisible: z.boolean().default(true),
  trackRequired: z.boolean().default(false),
  roleTitleRequired: z.boolean().default(false),
  allowParticipantPhoto: z.boolean().default(true),
  badgeTitle: z.string().optional().default("Finalist"),
  defaultCaption: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
  fontId: z.string().optional(),
  paletteId: z.string().optional(),
  bgMode: z.enum(["gradient", "solid", "split", "image"]).optional(),
  secondaryColor: z.string().optional(),
  textColor: z.string().optional(),
  accessType: z.number().default(0),
  accessCode: z.string().optional(),
}).refine((data) => {
  if (data.accessType === 1) {
    const trimmed = data.accessCode?.trim() || "";
    return trimmed.length >= 4 && trimmed.length <= 10;
  }
  return true;
}, {
  message: "Access code must be between 4 and 10 characters",
  path: ["accessCode"],
});

export type CustomizeBadgeSchema = z.infer<typeof customizeBadgeSchema>;
export type CustomizeBadgeFormValues = z.input<typeof customizeBadgeSchema>;
