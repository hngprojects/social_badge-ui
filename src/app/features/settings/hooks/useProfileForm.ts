import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/stores/use-user-store";
import { getUserMail } from "@/lib/api/auth-session";
import { useUpdateProfile } from "@/app/features/settings/hooks/useUpdateProfile";
import { ALLOWED_AVATAR_TYPES, MAX_AVATAR_SIZE } from "../constants";

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

  const [savedFormData, setSavedFormData] = useState(formData);

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
  }, [user?.first_name, user?.last_name, user?.role, emailAddress]);

  const hasTextChanges =
    formData.firstName !== savedFormData.firstName ||
    formData.lastName !== savedFormData.lastName ||
    formData.role !== savedFormData.role;

  const hasAvatarChange = avatarFile !== null;

  const isFormValid =
    formData.firstName.trim().length > 0 && formData.lastName.trim().length > 0;

  const canSubmit = isFormValid && (hasTextChanges || hasAvatarChange);

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      toast.error(`Image is ${fileSizeMB}MB. Maximum allowed size is 2MB.`);
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

  function handleRemovePhoto() {
    clearSelectedAvatar();
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

    if (avatarFile && avatarFile.size > MAX_AVATAR_SIZE) {
      toast.error("Image size must be less than 2MB.");
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
