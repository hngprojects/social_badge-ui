import { z } from "zod";
import { contactSchema } from "../constants/contact-form";

export type ContactFormValues = z.infer<typeof contactSchema>;
