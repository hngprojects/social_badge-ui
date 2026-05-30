import { z } from "zod";

export const customizeBadgeSchema = z.object({
  eventName: z.string().trim().min(1, "Event name is required"),
  destinationLink: z
    .string()
    .trim()
    .optional()
    .transform((val) => {
      if (!val) return "";
      return val.startsWith("http") ? val : `https://${val.replace(/^\/+/, "")}`;
    })
    .pipe(
      z.string().refine(
        (val) => {
          if (val === "") return true;
          try { new URL(val); return true; } catch { return false; }
        },
        { message: "Please enter a valid URL" },
      ),
    ),
  title: z.string().optional(),
  defaultCaption: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
  accessType: z.number().optional(),
});

export type CustomizeBadgeSchema = z.infer<typeof customizeBadgeSchema>;
