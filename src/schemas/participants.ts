import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const getParticipantSchema = ({
	nameVisible,
	roleVisible,
}: {
	nameVisible: boolean;
	roleVisible: boolean;
	roleRequired: boolean;
}) =>
	z.object({
		name: nameVisible
			? z
					.string()
					.trim()
					.min(2, {
						error: (issue) =>
							issue.code === "too_small"
								? "Name must be at least 2 characters"
								: undefined,
					})
					.max(25, {
						error: (issue) =>
							issue.code === "too_big"
								? "Name cannot exceed 25 characters"
								: undefined,
					})
			: z.string().optional(),

		role: roleVisible
			? z.string().trim().min(1, "Role is required")
			: z.string().trim().optional(),

		caption: z
			.string()
			.trim()
			.min(10, {
				error: (issue) =>
					issue.code === "too_small" ? "Caption is too short" : undefined,
			})
			.max(200, {
				error: (issue) =>
					issue.code === "too_big" ? "Caption is too long" : undefined,
			}),

		avatar: z
			.instanceof(File, {
				error: () => "Upload an image",
			})
			.refine(
				(file) =>
					["image/png", "image/jpeg", "image/svg+xml"].includes(file.type),
				{ error: () => "Only PNG, JPG, or SVG allowed" },
			)
			.refine((file) => file.size <= MAX_FILE_SIZE, {
				error: () => "Image must be under 5MB",
			}),
	});

export const participantSchema = getParticipantSchema({
	nameVisible: true,
	roleVisible: true,
	roleRequired: false,
});

export type ParticipantValues = z.infer<typeof participantSchema>;
