"use client";

import { useState, useRef } from "react";
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
import { getUserDisplayName } from "@/lib/api/auth-session";
import { getUserMail } from "@/lib/api/auth-session";

export default function ProfileCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUserStore((state) => state.user);
  const displayName = getUserDisplayName(user);
  const emailAddress = getUserMail(user);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const [formData, setFormData] = useState(() => ({
    fullName: displayName,
    email: emailAddress,
    role: "",
  }));
  const [savedFormData, setSavedFormData] = useState(() => ({
    fullName: displayName,
    email: emailAddress,
    role: "",
  }));

  const hasTextChanges =
    formData.fullName !== savedFormData.fullName ||
    formData.role !== savedFormData.role;

  const hasAvatarChange = avatarFile !== null;

  const isFormValid = formData.fullName.trim().length > 0;
  const canSubmit = isFormValid && (hasTextChanges || hasAvatarChange);

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      // Build form payload for text fields and avatar upload.
      const body = new FormData();
      body.append("fullName", formData.fullName);
      body.append("role", formData.role);

      if (avatarFile) {
        body.append("avatar", avatarFile);
      }

      // await updateProfile(body)
      setSavedFormData(formData);
      setAvatarFile(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    const previewUrl = URL.createObjectURL(file);
    setAvatarFile(file);
    setAvatarPreview(previewUrl);

    event.target.value = "";
  }

  function handleRemovePhoto() {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(null);
    setAvatarPreview("");
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
            disabled={!canSubmit || isSubmitting}
            type="submit"
            variant="cta"
            className="text-[14px] py-2 px-4"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </CardAction>
      </Card>
    </form>
  );
}
