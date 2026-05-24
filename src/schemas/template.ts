import { z } from "zod";

export const customizeBadgeSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  destinationLink: z
    .string()
    .min(1, "Destination link is required")
    .trim()
    .refine((val) => !/\s/.test(val), {
      message: "URL cannot contain spaces",
    })
    .transform((val) => {
      if (!val.startsWith("http")) {
        return `https://${val.replace(/^\/+/, "")}`;
      }
      return val;
    })
    .pipe(z.string().url("Please enter a valid URL")),
  title: z.string().optional(),
  defaultCaption: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
  accessType: z.number().optional(),
});

export type CustomizeBadgeSchema = z.infer<typeof customizeBadgeSchema>;
