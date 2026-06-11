"use client";

import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ProfileInput } from "./input-profile";
import { ProfileAvatarUpload } from "./profile-avatar-upload";
import { SettingsSubCard } from "./settings-subcard";

import { useProfileForm } from "@/app/features/settings/hooks/useProfileForm";
import { useUserStore } from "@/stores/use-user-store";
import { PROFILE_NAME_MAX_LENGTH } from "@/app/features/settings/constants";

export default function ProfileCard() {
	const user = useUserStore((state) => state.user);

	const {
		register,
		handleSubmit,
		errors,
		formData,
		avatarPreview,
		fileInputRef,
		canSubmit,
		isLoading,
		handleUploadClick,
		handleAvatarChange,
		watch,
	} = useProfileForm();

	const firstName = watch("firstName");
	const lastName = watch("lastName");
	const role = watch("role");

	const firstNameAtMax = (firstName?.length ?? 0) >= PROFILE_NAME_MAX_LENGTH;

	const lastNameAtMax = (lastName?.length ?? 0) >= PROFILE_NAME_MAX_LENGTH;
	const roleAtMax = (role?.length ?? 0) >= PROFILE_NAME_MAX_LENGTH;

	return (
		<form onSubmit={handleSubmit}>
			<Card className="text-[14px] text-[#9CA3AF] font-normal py-0">
				<CardHeader className="border-b pt-1">
					<SettingsSubCard
						src="/assets/dashboard/settings/_ui-user-01.svg"
						alt="Profile icon"
						head="Profile"
						detail="Your personal info and how you appear"
						bg="#FFF0EC"
						showIcon
						isHeader
					/>
				</CardHeader>

				<CardContent className="flex flex-col gap-6">
					<ProfileAvatarUpload
						previewUrl={avatarPreview || user?.profile_photo_url || ""}
						inputRef={fileInputRef}
						onUploadClick={handleUploadClick}
						onAvatarChange={handleAvatarChange}
					/>

					<ProfileInput
						register={register}
						errors={errors}
						values={formData}
						firstNameAtMax={firstNameAtMax}
						lastNameAtMax={lastNameAtMax}
						roleAtMax={roleAtMax}
					/>
				</CardContent>

				<CardAction className="py-3.5 px-6 flex justify-end bg-[#FBFAF7]">
					<Button
						disabled={!canSubmit || isLoading}
						type="submit"
						variant="cta"
					>
						{isLoading ? "Saving..." : "Save changes"}
					</Button>
				</CardAction>
			</Card>
		</form>
	);
}
