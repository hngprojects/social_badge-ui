"use client";

import { useState, useRef, useEffect } from "react";
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
import { useUserStore } from "@/stores/use-user-store";
import { getUserMail } from "@/lib/api/auth-session";
import { useUpdateProfile } from "@/app/features/settings/hooks/useUpdateProfile";

export default function ProfileCard() {
  const { saveProfile, isLoading } = useUpdateProfile();
  const user = useUserStore((state) => state.user);
  const emailAddress = getUserMail(user);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const [formData, setFormData] = useState(() => ({
    firstName: user?.first_name ?? "",
    lastName: user?.last_name ?? "",
    email: emailAddress,
    role: "",
  }));
  const [savedFormData, setSavedFormData] = useState(() => ({
    firstName: user?.first_name ?? "",
    lastName: user?.last_name ?? "",
    email: emailAddress,
    role: "",
  }));
  useEffect(() => {
    const nextFormData = {
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      email: emailAddress,
      role: "",
    };

    setFormData(nextFormData);
    setSavedFormData(nextFormData);
  }, [user?.first_name, user?.last_name, emailAddress]);

  const hasTextChanges =
    formData.firstName !== savedFormData.firstName ||
    formData.lastName !== savedFormData.lastName ||
    formData.role !== savedFormData.role;

  const [removeAvatar, setRemoveAvatar] = useState(false);
  const hasAvatarChange = avatarFile !== null || removeAvatar;

  const isFormValid =
    formData.firstName.trim().length > 0 && formData.lastName.trim().length > 0;

  const canSubmit = isFormValid && (hasTextChanges || hasAvatarChange);

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const profilePayload: {
      first_name?: string;
      last_name?: string;
      role?: string;
    } = {};

    if (formData.firstName !== savedFormData.firstName) {
      profilePayload.first_name = formData.firstName;
    }

    if (formData.lastName !== savedFormData.lastName) {
      profilePayload.last_name = formData.lastName;
    }

    if (formData.role !== savedFormData.role) {
      profilePayload.role = formData.role;
    }

    await saveProfile({
      profilePayload,
      photoFile: avatarFile,
    });

    setSavedFormData(formData);
    setAvatarFile(null);
    setRemoveAvatar(false);
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowed = new Set(["image/jpeg", "image/png", "image/gif"]);
    const maxSize = 2 * 1024 * 1024;

    if (!allowed.has(file.type) || file.size > maxSize) {
      event.target.value = "";
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    const previewUrl = URL.createObjectURL(file);
    setAvatarFile(file);
    setAvatarPreview(previewUrl);
    setRemoveAvatar(false);

    event.target.value = "";
  }

  function handleRemovePhoto() {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(null);
    setAvatarPreview("");
    setRemoveAvatar(true);
  }

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
            showIcon={true}
            isHeader={true}
          />
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="flex flex-col gap-6">
          <ProfileAvatarUpload
            previewUrl={avatarPreview}
            inputRef={fileInputRef}
            onUploadClick={handleUploadClick}
            onAvatarChange={handleAvatarChange}
            onRemove={handleRemovePhoto}
          />
          {/* FIELD INPUTS */}
          <div>
            <ProfileInput values={formData} onChange={handleChange} />
          </div>
          {/* SUBMIT BUTTON */}
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
