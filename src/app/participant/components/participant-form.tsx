"use client";

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

export default function ParticipantForm({
	onSuccess,
	onNameChange,
	onPhotoChange,
}: {
	onSuccess?: () => void;
	onNameChange?: (name: string) => void;
	onPhotoChange?: (url: string | null) => void;
}) {
	const {
		register,
		handleSubmit,
		setValue,
		control,
		trigger,
		formState: { errors, isSubmitting },
	} = useForm<ParticipantValues>({
		resolver: zodResolver(participantSchema),
		mode: "onChange", // Validates on every keystroke
		defaultValues: {
			name: "",
			caption: DEFAULT_CAPTION,
		},
	});

	const selectedFile = useWatch({
		control,
		name: "avatar",
	});

	const onSubmit = async () => {
		onSuccess?.();
	};

	// Helper to auto-grow the textarea dynamically
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

			<motion.div className="space-y-4" variants={itemVariants}>
				<label className="text-[13.5px] font-bold">
					name <span className="text-[#ff693E]">*</span>
				</label>

				<Input
					className="h-10 rounded-sm text-[14px] placeholder:text-neutral-400 font-sans bg-none mt-2"
					placeholder="Placeholder text..."
					{...register("name", {
						onChange: (e) => {
							let value = e.target.value;
							// Strictly intercept and hard-truncate text over 25 characters
							if (value.length > 25) {
								value = value.slice(0, 25);
								e.target.value = value;
								setValue("name", value);
							}
							onNameChange?.(value);
							trigger("name");
						},
					})}
				/>
				<p className="text-neutral-400 text-[12.5px] font-sans">
					Appears as the main title on the badge.
				</p>

				{errors.name && (
					<p className="text-sm text-red-500">{errors.name.message}</p>
				)}
			</motion.div>

			<motion.div variants={itemVariants}>
				<CaptionBox
					{...register("caption", {
						onChange: (e) => {
							let value = e.target.value;
							// Strictly intercept and hard-truncate text over 200 characters
							if (value.length > 200) {
								value = value.slice(0, 200);
								e.target.value = value;
								setValue("caption", value);
							}
							// Trigger the auto-grow feature
							if (e.target instanceof HTMLTextAreaElement) {
								handleCaptionResize(e.target);
							}
							trigger("caption");
						},
					})}
					error={errors.caption?.message}
				/>
			</motion.div>

			<motion.div variants={itemVariants}>
				<Button type="submit" className="w-full h-11" disabled={isSubmitting}>
					Generate badge
				</Button>
			</motion.div>
		</motion.form>
	);
}
