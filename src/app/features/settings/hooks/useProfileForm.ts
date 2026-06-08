import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/stores/use-user-store";
import { getUserMail } from "@/lib/api/auth-session";
import { useUpdateProfile } from "@/app/features/settings/hooks/useUpdateProfile";
import {
  ALLOWED_AVATAR_TYPES,
  MAX_AVATAR_SIZE,
  PROFILE_NAME_MAX_LENGTH,
  PROFILE_NAME_PATTERN,
  PROFILE_ROLE_PATTERN,
  RISKY_SQL_PATTERN,
  SQL_COMMENT_PATTERN,
} from "../constants";
import type { ProfileFieldErrors } from "../types";

export function useProfileForm() {
  const { saveProfile, isLoading } = useUpdateProfile();
  const user = useUserStore((state) => state.user);
  const emailAddress = getUserMail(user);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [formData, setFormData] = useState(() => ({
    firstName: user?.first_name ?? "",
    lastName: user?.last_name ?? "",
    email: emailAddress,
    role: user?.role ?? "",
  }));

  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [savedFormData, setSavedFormData] = useState(formData);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  useEffect(() => {
    const nextFormData = {
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      email: emailAddress,
      role: user?.role ?? "",
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(nextFormData);
    setSavedFormData(nextFormData);
    setFieldErrors({});
  }, [user?.first_name, user?.last_name, user?.role, emailAddress]);

  const hasTextChanges =
    formData.firstName !== savedFormData.firstName ||
    formData.lastName !== savedFormData.lastName ||
    formData.role !== savedFormData.role;

  const hasAvatarChange = avatarFile !== null;

  const isFormValid =
    formData.firstName.trim().length > 0 &&
    formData.firstName.trim().length <= PROFILE_NAME_MAX_LENGTH &&
    formData.lastName.trim().length > 0 &&
    formData.lastName.trim().length <= PROFILE_NAME_MAX_LENGTH;

  const canSubmit = isFormValid && (hasTextChanges || hasAvatarChange);

  function handleChange(field: keyof typeof formData, value: string) {
    const nextValue =
      field === "firstName" || field === "lastName"
        ? value.slice(0, PROFILE_NAME_MAX_LENGTH)
        : value;

    setFieldErrors((prev) => {
      if (!prev[field as keyof ProfileFieldErrors]) return prev;
      return {
        ...prev,
        [field]: undefined,
      };
    });
    setFormData((prev) => ({ ...prev, [field]: nextValue }));
  }

  function validateProfileFields() {
    const nextErrors: ProfileFieldErrors = {};
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const role = formData.role.trim();

    if (!firstName) {
      nextErrors.firstName = "First name is required.";
    } else if (firstName.length > PROFILE_NAME_MAX_LENGTH) {
      nextErrors.firstName = `First name must be ${PROFILE_NAME_MAX_LENGTH} characters or less.`;
    } else if (SQL_COMMENT_PATTERN.test(firstName)) {
      nextErrors.firstName = "First name contains unsupported characters.";
    } else if (!PROFILE_NAME_PATTERN.test(firstName)) {
      nextErrors.firstName = "First name contains unsupported characters.";
    }

    if (!lastName) {
      nextErrors.lastName = "Last name is required.";
    } else if (lastName.length > PROFILE_NAME_MAX_LENGTH) {
      nextErrors.lastName = `Last name must be ${PROFILE_NAME_MAX_LENGTH} characters or less.`;
    } else if (SQL_COMMENT_PATTERN.test(lastName)) {
      nextErrors.lastName = "Last name contains unsupported characters.";
    } else if (!PROFILE_NAME_PATTERN.test(lastName)) {
      nextErrors.lastName = "Last name contains unsupported characters.";
    }

    if (
      role &&
      (RISKY_SQL_PATTERN.test(role) || !PROFILE_ROLE_PATTERN.test(role))
    ) {
      nextErrors.role = "Role contains unsupported characters.";
    }

    setFieldErrors(nextErrors);

    const firstError = Object.values(nextErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return false;
    }

    return true;
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function clearSelectedAvatar() {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(null);
    setAvatarPreview("");
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
      toast.error("Please upload a JPEG, PNG, or GIF image.");
      clearSelectedAvatar();
      event.target.value = "";
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast.error(`Image is ${fileSizeMB}MB. Maximum allowed size is 10MB.`);
      clearSelectedAvatar();
      event.target.value = "";
      return;
    }

    clearSelectedAvatar();

    const previewUrl = URL.createObjectURL(file);
    setAvatarFile(file);
    setAvatarPreview(previewUrl);

    event.target.value = "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateProfileFields()) return;

    const profilePayload: {
      first_name?: string;
      last_name?: string;
      role?: string;
    } = {};

    if (formData.firstName !== savedFormData.firstName) {
      profilePayload.first_name = formData.firstName.trim();
    }

    if (formData.lastName !== savedFormData.lastName) {
      profilePayload.last_name = formData.lastName.trim();
    }

    if (formData.role !== savedFormData.role) {
      profilePayload.role = formData.role.trim();
    }

    if (avatarFile && avatarFile.size > MAX_AVATAR_SIZE) {
      toast.error("Image size must be less than 10MB.");
      return;
    }

    const success = await saveProfile({
      profilePayload,
      photoFile: avatarFile,
    });

    if (!success) return;

    setSavedFormData(formData);
    clearSelectedAvatar();
  }

  return {
    formData,
    fieldErrors,
    avatarPreview,
    fileInputRef,
    canSubmit,
    isLoading,
    handleChange,
    handleSubmit,
    handleUploadClick,
    handleAvatarChange,
  };
}
