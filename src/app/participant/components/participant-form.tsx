"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	getParticipantSchema,
	type ParticipantValues,
} from "@/schemas/participants";
import CaptionBox from "./caption-box";
import { DEFAULT_CAPTION } from "../constants";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "../constants";
import type { CustomizeEditorState } from "@/app/features/customize/canvas-data";
import { useMemo, useState } from "react";
import { ImageCropper } from "@/components/image-cropper";

export default function ParticipantForm({
	onSuccess,
	onGenerating,
	onNameChange,
	onRoleChange,
	onPhotoChange,
	onCaptionChange,
	editorState,
}: {
	onSuccess?: () => void;
	onGenerating?: (generating: boolean) => void;
	onNameChange?: (name: string) => void;
	onRoleChange?: (role: string) => void;
	onPhotoChange?: (url: string | null) => void;
	onCancel?: () => void;
	onCaptionChange?: (caption: string) => void;
	editorState: CustomizeEditorState | null;
}) {
	const [tempImage, setTempImage] = useState<string | null>(null);
	const [isCropperOpen, setIsCropperOpen] = useState(false);

	const isHng = editorState?.layoutId.startsWith("hng_finalist_");
	const showName = editorState?.participantNameVisible ?? true;
	const showRole = isHng
		? (editorState?.trackVisible ?? true)
		: (editorState?.roleTitleVisible ?? true);
	const roleRequired = isHng
		? (editorState?.trackRequired ?? false)
		: (editorState?.roleTitleRequired ?? false);
	const roleLabel = isHng
		? (editorState?.trackLabel ?? "TRACK")
		: (editorState?.roleTitleLabel ?? "ROLE / TITLE");
	const rolePlaceholder = isHng
		? (editorState?.trackPlaceholder ?? "e.g. Design")
		: (editorState?.roleTitlePlaceholder ?? "e.g. Product Designer");

	const schema = useMemo(
		() =>
			getParticipantSchema({
				nameVisible: showName,
				roleVisible: showRole,
				roleRequired,
			}),
		[showName, showRole, roleRequired],
	);

	const {
		register,
		handleSubmit,
		setValue,
		control,
		watch,
		formState: { errors, isSubmitting, isValid },
	} = useForm<ParticipantValues>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			name: "",
			role: editorState?.layoutId === "hng_finalist_pm_v1" 
				? "Product Management" 
				: editorState?.layoutId === "hng_finalist_design_v1" 
				? "Product Design" 
				: "",
			caption: editorState?.defaultCaption || DEFAULT_CAPTION,
		},
	});

	// Sync initial caption when editorState loads
	useEffect(() => {
		if (editorState?.layoutId === "hng_finalist_pm_v1") {
			setValue("role", "Product Management");
			onRoleChange?.("Product Management");
		} else if (editorState?.layoutId === "hng_finalist_design_v1") {
			setValue("role", "Product Design");
			onRoleChange?.("Product Design");
		} else {
			setValue("role", "");
			onRoleChange?.("");
		}
	}, [editorState?.layoutId, setValue, onRoleChange]);

	useEffect(() => {
		if (editorState?.defaultCaption) {
			setValue("caption", editorState.defaultCaption);
			onCaptionChange?.(editorState.defaultCaption);
		}
	}, [editorState?.defaultCaption, setValue, onCaptionChange]);

	// eslint-disable-next-line react-hooks/incompatible-library
	const formValues = watch();

	const selectedFile = useWatch({
		control,
		name: "avatar",
	});

	const onSubmit = async () => {
		onGenerating?.(true);
		onSuccess?.(); // badge mounts immediately
		await new Promise((resolve) => setTimeout(resolve, 3000)); // browser paints images
		onGenerating?.(false); // overlay lifts, download button appears
	};

	return (
		<motion.form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-6 rounded-3xl border py-8 px-5 w-full max-w-147 min-w-0 bg-white"
			variants={containerVariants}
			initial="hidden"
			animate="show"
		>
			<motion.div
				className="min-w-0 space-y-2 overflow-hidden"
				variants={itemVariants}
			>
				<label className="mb-2 block h-5 overflow-hidden truncate text-[13.5px] font-bold leading-5">
					Upload photo or avatar <span className="text-[#ff693E]">*</span>
				</label>

				<Input
					type="file"
					className="
                    cursor-pointer
                    h-11.5
                    rounded-sm
                    text-sm
                    text-[#b5b7bc]
                    py-2
                    px-3

                    file:mr-4
                    file:rounded-md
                    file:border
                    file:border-[#ff693E]
                    file:bg-white
                    file:px-4
                    file:text-sm
                    file:font-medium
                    file:text-[#ff693E]
                    file:cursor-pointer
                    "
					accept=".png,.jpg,.jpeg,.svg"
					onChange={async (e) => {
						const file = e.target.files?.[0];
						if (!file) return;

						const toBase64 = (f: File): Promise<string> =>
							new Promise((res, rej) => {
								const reader = new FileReader();
								reader.onload = () => res(reader.result as string);
								reader.onerror = rej;
								reader.readAsDataURL(f);
							});

						try {
							const base64 = await toBase64(file);
							setTempImage(base64);
							setIsCropperOpen(true);
						} catch (err) {
							console.error("Failed to convert image to base64:", err);
						}
					}}
				/>

				{tempImage && (
					<ImageCropper
						open={isCropperOpen}
						image={tempImage}
						onCropComplete={async (croppedImage) => {
							setIsCropperOpen(false);
							setTempImage(null);
							onPhotoChange?.(croppedImage);

							// Convert base64 to File for form validation
							try {
								const res = await fetch(croppedImage);
								const blob = await res.blob();
								const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
								
								setValue("avatar", file, {
									shouldValidate: true,
									shouldDirty: true,
								});
							} catch (err) {
								console.error("Failed to convert cropped image to file:", err);
							}
						}}
						onCancel={() => {
							setIsCropperOpen(false);
							setTempImage(null);
						}}
						aspectRatio={1}
					/>
				)}

				<p className="text-neutral-400 text-[12.5px] font-sans break-words">
					SVG recommended for crisp display. PNG works too (min 240 × 240px).
				</p>

				{selectedFile && (
					<p className="text-sm break-all">Selected: {selectedFile.name}</p>
				)}

				{errors.avatar && (
					<p className="text-sm text-red-500 break-words">
						{errors.avatar.message}
					</p>
				)}
			</motion.div>

			{showName && (
				<motion.div
					className="min-w-0 space-y-4 overflow-hidden"
					variants={itemVariants}
				>
					<label className="flex h-5 min-w-0 items-center justify-between gap-3 overflow-hidden text-[13.5px] font-bold leading-5">
						<span className="block min-w-0 flex-1 overflow-hidden truncate whitespace-nowrap">
							{editorState?.participantNameLabel || "NAME"} <span className="text-[#ff693E]">*</span>
						</span>
						<span
							className={`shrink-0 text-[10px]  font-medium ${formValues.name?.length === 25 ? "text-amber-500" : "text-gray-400"}`}
						>
							{formValues.name?.length ?? 0}/25
						</span>
					</label>

					<Input
						className="h-10 rounded-sm text-[14px] placeholder:text-neutral-400 font-sans bg-none mt-2"
						placeholder={editorState?.participantNamePlaceholder || "Your name"}
						maxLength={25}
						onKeyDown={(e) => {
							const val = formValues.name ?? "";
							const isAdding = e.key.length === 1 && !e.ctrlKey && !e.metaKey;
							if (val.length >= 25 && isAdding) e.preventDefault();
						}}
						{...register("name", {
							onChange: (e) => onNameChange?.(e.target.value),
						})}
					/>

					{(formValues.name?.length ?? 0) >= 25 && (
						<p className="text-sm text-amber-500 break-words">
							Maximum 25 characters reached
						</p>
					)}

					{errors.name && (
						<p className="text-sm text-red-500 break-words">
							{errors.name.message}
						</p>
					)}
				</motion.div>
			)}

			{showRole && (
				<motion.div
					className="min-w-0 space-y-4 overflow-hidden"
					variants={itemVariants}
				>
					<label className="flex h-5 min-w-0 items-center justify-between gap-3 overflow-hidden text-[13.5px] font-bold leading-5">
						<span className="block min-w-0 flex-1 overflow-hidden truncate whitespace-nowrap">
							{roleLabel}{" "}
							{roleRequired && (
								<span className="text-[#ff693E]">*</span>
							)}
						</span>
						<span
							className={`shrink-0 text-[10px]  font-medium ${formValues.role?.length === 25 ? "text-amber-500" : "text-gray-400"}`}
						>
							{formValues.role?.length ?? 0}/25
						</span>
					</label>

					<Input
						className="h-10 rounded-sm text-[14px] placeholder:text-neutral-400 font-sans bg-none mt-2"
						placeholder={rolePlaceholder}
						maxLength={25}
						readOnly={
							editorState?.layoutId === "hng_finalist_pm_v1" ||
							editorState?.layoutId === "hng_finalist_design_v1"
						}
						onKeyDown={() => {}}
						{...register("role", {
							onChange: (e) => onRoleChange?.(e.target.value),
						})}
					/>

					{(formValues.role?.length ?? 0) >= 25 && (
						<p className="text-sm text-amber-500 break-words">
							Maximum 25 characters reached
						</p>
					)}

					{errors.role && (
						<p className="text-sm text-red-500 break-words">
							{errors.role.message}
						</p>
					)}
				</motion.div>
			)}

			<motion.div variants={itemVariants}>
				<CaptionBox
					{...register("caption", {
						onChange: (e) => onCaptionChange?.(e.target.value),
					})}
					value={formValues.caption}
					error={errors.caption?.message}
				/>
			</motion.div>

			<motion.div variants={itemVariants}>
				<Button
					type="submit"
					className="w-full h-11"
					disabled={isSubmitting || !isValid}
				>
					{isSubmitting ? "Generating..." : "Generate badge"}
				</Button>
			</motion.div>
		</motion.form>
	);
}
