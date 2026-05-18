import { z } from "zod";

export const contactSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z
		.string()
		.min(1, "Email is required")
		.refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
			message: "Enter a valid email address",
		}),
	subject: z.string().min(1, "Please select a topic"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});
