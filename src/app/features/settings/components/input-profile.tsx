import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Asterisk } from "lucide-react";
import { PROFILE_NAME_MAX_LENGTH } from "@/app/features/settings/constants";
import { ProfileInputProps } from "../types";

export function ProfileInput({
	register,
	errors,
	firstNameAtMax,
	lastNameAtMax,
	email,
	roleAtMax,
}: ProfileInputProps) {
	return (
		<FieldSet className="w-full text-[14px] font-normal text-[#B5B7BC]">
			<FieldGroup className="gap-4">
				<Field className="w-full gap-2">
					<FieldLabel
						htmlFor="firstName"
						className="text-sm flex gap-0 font-medium text-[#121217]"
					>
						First name <Asterisk className="w-2 h-auto text-[#F53D6B]" />
					</FieldLabel>

					<Input
						id="firstName"
						maxLength={PROFILE_NAME_MAX_LENGTH}
						aria-invalid={!!errors.firstName}
						className="h-12.5 p-4 mt-1 rounded-md text-black placeholder:text-[#6C6C89] border border-[#D1D1DB] bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#1212170D] focus-visible:border-[#7d7777] focus-visible:ring-0 text-sm"
						{...register("firstName")}
					/>

					{firstNameAtMax && (
						<FieldDescription className="text-xs -mt-1 text-[#F59E0B]">
							You have reached the maximum character limit.
						</FieldDescription>
					)}

					{errors.firstName && (
						<FieldDescription className="text-xs -mt-1 text-[#EF4444]">
							{errors.firstName.message}
						</FieldDescription>
					)}
				</Field>

				<Field className="w-full gap-2">
					<FieldLabel
						htmlFor="lastName"
						className="text-sm flex gap-0 font-medium text-[#121217]"
					>
						Last name <Asterisk className="w-2 h-auto text-[#F53D6B]" />
					</FieldLabel>

					<Input
						id="lastName"
						maxLength={PROFILE_NAME_MAX_LENGTH}
						aria-invalid={!!errors.lastName}
						className="h-12.5 p-4 mt-1 rounded-md text-black placeholder:text-[#6C6C89] border border-[#D1D1DB] bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#1212170D] focus-visible:border-[#7d7777] focus-visible:ring-0 text-sm"
						{...register("lastName")}
					/>

					{lastNameAtMax && (
						<FieldDescription className="text-xs -mt-1 text-[#F59E0B]">
							You have reached the maximum character limit.
						</FieldDescription>
					)}

					{errors.lastName && (
						<FieldDescription className="text-xs -mt-1 text-[#EF4444]">
							{errors.lastName.message}
						</FieldDescription>
					)}
				</Field>

				<Field className="w-full gap-2">
					<FieldLabel
						htmlFor="email"
						className="text-sm font-medium text-[#121217]"
					>
						Email address
					</FieldLabel>

					<Input
					disabled
						id="email"
						readOnly
						value={email || ""}
						className="h-12.5 p-4 mt-1 rounded-md text-sm  bg-[#F9FAFB] border border-[#D1D1DB]"
					/>

					<FieldDescription>
						Your email address cannot be changed
					</FieldDescription>
				</Field>

				<Field className="w-full gap-2">
					<FieldLabel
						htmlFor="role"
						className="text-sm font-medium text-[#121217]"
					>
						Role / Title
					</FieldLabel>

					<Input
						id="role"
						placeholder="e.g. Community Manager"
						aria-invalid={!!errors.role}
						maxLength={PROFILE_NAME_MAX_LENGTH}
						className="h-12.5 p-4 mt-1 rounded-md text-black placeholder:text-[#6C6C89] border border-[#D1D1DB] bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#1212170D] focus-visible:border-[#7d7777] focus-visible:ring-0 text-sm"
						{...register("role")}
					/>
					{roleAtMax && (
						<FieldDescription className="text-xs -mt-1 text-[#F59E0B]">
							You have reached the maximum character limit.
						</FieldDescription>
					)}

					<FieldDescription
						className={errors.role ? "text-xs -mt-1 text-[#EF4444]" : ""}
					>
						{errors.role?.message ?? "Optional."}
					</FieldDescription>
				</Field>
			</FieldGroup>
		</FieldSet>
	);
}
