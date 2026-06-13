"use client";

import React from "react";
import {
	SectionCard,
	FieldLabel,
	TextInput,
	HelperText,
	Toggle,
} from "./ui";
import { UseFormRegister, Control, Controller } from "react-hook-form";
import type { CustomizeBadgeFormValues } from "@/schemas/template";

interface VisibilitySectionProps {
	register: UseFormRegister<CustomizeBadgeFormValues>;
	control: Control<CustomizeBadgeFormValues>;
	isProtected: boolean;
	accessCode?: string;
}

export function VisibilitySection({
	register,
	control,
	isProtected,
	accessCode,
}: VisibilitySectionProps) {
	return (
		<SectionCard
			icon={
				<svg
					viewBox="0 0 20 20"
					fill="none"
					className="w-4 h-4"
					stroke="currentColor"
					strokeWidth={1.6}
				>
					<path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
					<path d="M2.1 10c1.5-4 4.5-7 7.9-7s6.4 3 7.9 7-4.5 7-7.9 7-6.4-3-7.9-7Z" />
				</svg>
			}
			title="Visibility & Access Control"
			subtitle="Control who can view and generate your badge."
		>
			<div className="flex items-center justify-between py-2">
				<div>
					<p className="text-sm font-medium text-gray-700">Password Protection</p>
					<p className="text-xs text-gray-400">Require a passcode for participants to access the badge.</p>
				</div>
				<Controller
					name="accessType"
					control={control}
					render={({ field }) => (
						<Toggle
							checked={field.value === 1}
							onChange={(checked) => field.onChange(checked ? 1 : 0)}
						/>
					)}
				/>
			</div>

			{isProtected && (
				<div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
					<FieldLabel label="Access Code" required />
					<TextInput
						placeholder="Enter 4-10 character passcode"
						{...register("accessCode")}
						value={accessCode || ""}
						maxLength={10}
					/>
					<HelperText>Participants must enter this to generate their badge. Alphanumeric allowed.</HelperText>
				</div>
			)}
		</SectionCard>
	);
}
