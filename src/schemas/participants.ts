import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const getParticipantSchema = ({
	nameVisible,
	roleVisible,
	roleRequired,
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
					.min(2, "Name must be at least 2 characters")
					.max(25, "Name cannot exceed 25 characters")
			: z.string().optional(),

		role: roleVisible
			? roleRequired
				? z.string().trim().min(1, "Role is required")
				: z.string().trim().optional()
			: z.string().trim().optional(),

		caption: z
			.string()
			.max(200, "Caption cannot exceed 200 characters")
			.optional()
			.or(z.literal("")),

		avatar: z
			.instanceof(File, {
				message: "Upload an image",
			})
			.refine(
				(file) =>
					["image/png", "image/jpeg", "image/svg+xml"].includes(file.type),
				{
					message: "Only PNG, JPG, or SVG allowed",
				},
			)
			.refine((file) => file.size <= MAX_FILE_SIZE, {
				message: "Image must be under 5MB",
			}),
	});

export const participantSchema = getParticipantSchema({
	nameVisible: true,
	roleVisible: true,
	roleRequired: false,
});

export type ParticipantValues = z.infer<typeof participantSchema>;
