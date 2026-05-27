import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const participantSchema = z.object({
	name: z.string().trim().min(2, "Name must be at least 2 characters"),

	caption: z
		.string()
		.trim()
		.min(10, "Caption is too short")
		.max(200, "Caption is too long"),

	avatar: z
		.instanceof(File, {
			message: "Upload an image",
		})
		.refine(
			(file) =>
				["image/png", "image/jpeg", "image/svg+xml"].includes(file.type),
			"Only PNG, JPG, or SVG allowed",
		)
		.refine((file) => file.size <= MAX_FILE_SIZE, "Image must be under 5MB"),
});

export type ParticipantValues = z.infer<typeof participantSchema>;
