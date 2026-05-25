import { z } from "zod";

export const subscribeSchema = z.object({
	email: z.email("Enter a valid email address"),
});

export type SubscribeSchema = z.infer<typeof subscribeSchema>;
