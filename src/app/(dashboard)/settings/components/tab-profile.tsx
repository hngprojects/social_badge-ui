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
import { useWatch } from "react-hook-form";

import { useProfileForm } from "@/app/features/settings/hooks/useProfileForm";
import { useUserStore } from "@/stores/use-user-store";
import { PROFILE_NAME_MAX_LENGTH } from "@/app/features/settings/constants";

export default function ProfileCard() {
	const user = useUserStore((state) => state.user);

	const {
		register,
		handleSubmit,
		errors,
		avatarPreview,
		fileInputRef,
		canSubmit,
		isLoading,
		control,
		handleUploadClick,
		handleAvatarChange,
	} = useProfileForm();

	const firstName = useWatch({ control, name: "firstName" });
	const lastName = useWatch({ control, name: "lastName" });
	const role = useWatch({ control, name: "role" });
	const email = useWatch({ control, name: "email" });

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
						firstNameAtMax={firstNameAtMax}
						lastNameAtMax={lastNameAtMax}
						roleAtMax={roleAtMax}
						email={email}
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
