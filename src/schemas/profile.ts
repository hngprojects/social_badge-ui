import { z } from "zod";
import {
	PROFILE_NAME_MAX_LENGTH,
	PROFILE_NAME_PATTERN,
	PROFILE_ROLE_PATTERN,
	RISKY_SQL_PATTERN,
	SQL_COMMENT_PATTERN,
} from "../app/features/settings/constants";

export const profileSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(1, "First name is required")
		.min(3, "Must be at least 3 characters")
		.max(
			PROFILE_NAME_MAX_LENGTH,
			`First name must be ${PROFILE_NAME_MAX_LENGTH} characters or less.`,
		)
		.refine((v) => !SQL_COMMENT_PATTERN.test(v), {
			message: "First name contains unsupported characters.",
		})
		.refine((v) => PROFILE_NAME_PATTERN.test(v), {
			message: "First name contains unsupported characters.",
		}),

	lastName: z
		.string()
		.trim()
		.min(1, "Last name is required")
		.min(3, "Must be at least 3 characters")
		.max(
			PROFILE_NAME_MAX_LENGTH,
			`Last name must be ${PROFILE_NAME_MAX_LENGTH} characters or less.`,
		)
		.refine((v) => !SQL_COMMENT_PATTERN.test(v), {
			message: "Last name contains unsupported characters.",
		})
		.refine((v) => PROFILE_NAME_PATTERN.test(v), {
			message: "Last name contains unsupported characters.",
		}),

	role: z
		.string()
		.trim()
		.optional()
		.refine(
			(v) => !v || (!RISKY_SQL_PATTERN.test(v) && PROFILE_ROLE_PATTERN.test(v)),
			{
				message: "Role contains unsupported characters.",
			},
		),

	email: z.string().email().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
