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

export default function ProfileCard() {
  const user = useUserStore((state) => state.user);
  const {
    formData,
    avatarPreview,
    fileInputRef,
    canSubmit,
    isLoading,
    handleChange,
    handleSubmit,
    handleUploadClick,
    handleAvatarChange,
  } = useProfileForm();

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

          <ProfileInput values={formData} onChange={handleChange} />
        </CardContent>

        <CardAction className="py-3.5 px-6 flex justify-end w-full bg-[#FBFAF7]">
          <Button
            disabled={!canSubmit || isLoading}
            type="submit"
            variant="cta"
            className="text-[14px] py-2 px-4"
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </CardAction>
      </Card>
    </form>
  );
}
