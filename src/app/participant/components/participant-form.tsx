"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	participantSchema,
	type ParticipantValues,
} from "@/schemas/participants";
import CaptionBox from "./caption-box";
import { DEFAULT_CAPTION } from "../constants";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "../constants";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";

export default function ParticipantForm({
	onSuccess,
	onNameChange,
	onRoleChange,
	onPhotoChange,
	onCaptionChange,
	editorState,
}: {
	onSuccess?: () => void;
	onNameChange?: (name: string) => void;
	onRoleChange?: (role: string) => void;
	onPhotoChange?: (url: string | null) => void;
	onCaptionChange?: (caption: string) => void;
	editorState: CustomizeEditorState | null;
}) {
	const {
		register,
		handleSubmit,
		setValue,
		control,
		watch,
		formState: { errors, isSubmitting, isValid },
	} = useForm<ParticipantValues>({
		resolver: zodResolver(participantSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			role: "",
			caption: editorState?.defaultCaption || DEFAULT_CAPTION,
		},
	});

	// Sync initial caption when editorState loads
	useEffect(() => {
		if (editorState?.defaultCaption) {
			setValue("caption", editorState.defaultCaption, { shouldValidate: true });
			onCaptionChange?.(editorState.defaultCaption);
		}
	}, [editorState?.defaultCaption, setValue, onCaptionChange]);

	const showName = editorState?.participantNameVisible ?? true;
	const showRole = editorState?.roleTitleVisible ?? true;

	// eslint-disable-next-line react-hooks/incompatible-library
	const formValues = watch();

	const selectedFile = useWatch({
		control,
		name: "avatar",
	});

	const onSubmit = async () => {
		onSuccess?.();
	};

	const handleCaptionResize = (target: HTMLTextAreaElement) => {
		target.style.height = "auto";
		target.style.height = `${target.scrollHeight}px`;
	};

	return (
		<motion.form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-6 rounded-3xl border py-8 px-5 w-full max-w-147 bg-white"
			variants={containerVariants}
			initial="hidden"
			animate="show"
		>
			<motion.div className="space-y-2" variants={itemVariants}>
				<label className="text-[13.5px] font-bold mb-2">
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
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) {
							setValue("avatar", file, { shouldValidate: true });
							onPhotoChange?.(URL.createObjectURL(file));
						}
					}}
				/>

				<p className="text-neutral-400 text-[12.5px] font-sans">
					SVG recommended for crisp display. PNG works too (min 240 × 240px).
				</p>

				{selectedFile && (
					<p className="text-sm">Selected: {selectedFile.name}</p>
				)}

				{errors.avatar && (
					<p className="text-sm text-red-500">{errors.avatar.message}</p>
				)}
			</motion.div>

			{showName && (
				<motion.div className="space-y-4" variants={itemVariants}>
					<label className="text-[13.5px] font-bold flex justify-between items-center">
						<span>NAME <span className="text-[#ff693E]">*</span></span>
						<span className="text-[10px] text-gray-400 font-medium">
							{formValues.name.length}/25
						</span>
					</label>

					<Input
						className="h-10 rounded-sm text-[14px] placeholder:text-neutral-400 font-sans bg-none mt-2"
						placeholder={editorState?.participantNamePlaceholder || "Your name"}
						maxLength={25}
						{...register("name", { onChange: (e) => onNameChange?.(e.target.value) })}
					/>

					{errors.name && (
						<p className="text-sm text-red-500">{errors.name.message}</p>
					)}
				</motion.div>
			)}

			{showRole && (
				<motion.div className="space-y-4" variants={itemVariants}>
					<label className="text-[13.5px] font-bold flex justify-between items-center">
						<span>{editorState?.roleTitleLabel || "ROLE / TITLE"} {editorState?.roleTitleRequired && <span className="text-[#ff693E]">*</span>}</span>
						<span className="text-[10px] text-gray-400 font-medium">
							{formValues.role?.length ?? 0}/25
						</span>
					</label>

					<Input
						className="h-10 rounded-sm text-[14px] placeholder:text-neutral-400 font-sans bg-none mt-2"
						placeholder={editorState?.roleTitlePlaceholder || "e.g. Product Designer"}
						maxLength={25}
						{...register("role", { 
							onChange: (e) => onRoleChange?.(e.target.value),
						})}
					/>

					{errors.role && (
						<p className="text-sm text-red-500">{errors.role.message}</p>
					)}
				</motion.div>
			)}

			<motion.div variants={itemVariants}>
				<CaptionBox
					{...register("caption", {
						onChange: (e) => {
							const start = e.target.selectionStart;
							const end = e.target.selectionEnd;
							const val = e.target.value;

							if (val.length > 200) {
								e.target.value = val.slice(0, 200);
								e.target.setSelectionRange(start, end);
							}
							
							onCaptionChange?.(e.target.value);

							if (e.target instanceof HTMLTextAreaElement) {
								handleCaptionResize(e.target);
							}
						},
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
					Generate badge
				</Button>
			</motion.div>
		</motion.form>
	);
}
