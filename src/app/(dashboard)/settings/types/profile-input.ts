import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProfileFormValues } from "@/schemas/profile";

export type ProfileInputProps = {
	register: UseFormRegister<ProfileFormValues>;
	errors: FieldErrors<ProfileFormValues>;
	// values: ProfileFormValues;
	firstNameAtMax?: boolean;
	lastNameAtMax?: boolean;
	roleAtMax?: boolean;
	email?: string;
};
