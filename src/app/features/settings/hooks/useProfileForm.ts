"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "@/stores/use-user-store";
import { getUserMail } from "@/lib/api/auth-session";
import { useUpdateProfile } from "@/app/features/settings/hooks/useUpdateProfile";

import { ALLOWED_AVATAR_TYPES, MAX_AVATAR_SIZE } from "../constants";

import { profileSchema, ProfileFormValues } from "@/schemas/profile";

export function useProfileForm() {
	const user = useUserStore((state) => state.user);
	const emailAddress = getUserMail(user);

	const { saveProfile, isLoading } = useUpdateProfile();

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty, isValid },
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		mode: "onChange",
		defaultValues: {
			firstName: user?.first_name ?? "",
			lastName: user?.last_name ?? "",
			role: user?.role ?? "",
			email: emailAddress,
		},
	});

	const formData = watch();

	useEffect(() => {
		const next = {
			firstName: user?.first_name ?? "",
			lastName: user?.last_name ?? "",
			role: user?.role ?? "",
			email: emailAddress,
		};

		reset(next);
	}, [user?.first_name, user?.last_name, user?.role, emailAddress, reset]);

	useEffect(() => {
		return () => {
			if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		};
	}, [avatarPreview]);

	const hasAvatarChange = !!avatarFile;

	const canSubmit = (isDirty || hasAvatarChange) && isValid;

	function handleUploadClick() {
		fileInputRef.current?.click();
	}

	function clearAvatar() {
		if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		setAvatarFile(null);
		setAvatarPreview("");
	}

	function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (!file) return;

		if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
			toast.error("Please upload a JPEG, PNG, or GIF image.");
			clearAvatar();
			event.target.value = "";
			return;
		}

		if (file.size > MAX_AVATAR_SIZE) {
			const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
			toast.error(`Image is ${sizeMB}MB. Max allowed is 10MB.`);
			clearAvatar();
			event.target.value = "";
			return;
		}

		clearAvatar();

		const url = URL.createObjectURL(file);
		setAvatarFile(file);
		setAvatarPreview(url);

		event.target.value = "";
	}

	const onSubmit = async (data: ProfileFormValues) => {
		const profilePayload: any = {};

		if (data.firstName !== user?.first_name) {
			profilePayload.first_name = data.firstName;
		}

		if (data.lastName !== user?.last_name) {
			profilePayload.last_name = data.lastName;
		}

		if (data.role !== user?.role) {
			profilePayload.role = data.role;
		}

		if (!Object.keys(profilePayload).length && !avatarFile) {
			toast.info("No changes to save.");
			return;
		}

		const success = await saveProfile({
			profilePayload,
			photoFile: avatarFile,
		});

		if (!success) return;

		clearAvatar();
		reset(data);
	};

	return {
		register,
		handleSubmit: handleSubmit(onSubmit),
		errors,
		formData,
		watch,
		fileInputRef,
		avatarPreview,
		canSubmit,
		isLoading,
		handleUploadClick,
		handleAvatarChange,
	};
}
