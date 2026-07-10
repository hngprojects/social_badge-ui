"use client";

import React, { useEffect, useRef } from "react";
import {
	SectionCard,
	FieldLabel,
	TextInput,
	HelperText,
	BadgeDatePicker,
	BadgeDropdown,
} from "./ui";
import type { CustomizeEditorState } from "@/app/features/customize/canvas-data";
import type { LayoutCapabilities } from "@/app/features/badges/constants/layout-mapping";

import { Controller, type UseFormRegister, type Control } from "react-hook-form";
import type { CustomizeBadgeFormValues } from "@/schemas/template";

interface BrandSectionProps {
	register: UseFormRegister<CustomizeBadgeFormValues>;
	control: Control<CustomizeBadgeFormValues>;
	editor: CustomizeEditorState;
	onChange: (partial: Partial<CustomizeEditorState>) => void;
	layoutCaps: LayoutCapabilities;
	eventNameValue: string;
	hasParam?: boolean
}

export function BrandSection({
	register,
	control,
	editor,
	onChange,
	layoutCaps,
	eventNameValue,
	hasParam
}: BrandSectionProps) {
	const currentBlobUrl = useRef<string | null>(null);

	useEffect(() => {
		const blobUrl = currentBlobUrl.current;
		return () => {
			if (blobUrl) URL.revokeObjectURL(blobUrl);
		};
	}, []);

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
					<circle cx="10" cy="10" r="7" />
					<path d="M7 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />
				</svg>
			}
			title="Brand"
			subtitle="How your event shows up on the badge."
		>
			{layoutCaps.hasHeaderLogo && (
				<div>
					<FieldLabel label="Logo" required />
					<div className="flex items-center gap-3">

						<label className="cursor-pointer">
							<span className="inline-flex items-center rounded-md border border-orange-400 px-3 py-1.5 text-xs font-semibold text-orange-500 hover:bg-orange-50 transition">
								Choose File
							</span>
							<input
								type="file"
								accept="image/*,.svg"
								className="sr-only"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (!file) return;
									const validType =
										file.type.startsWith("image/") ||
										file.type === "image/svg+xml";
									const validSize = file.size <= 2 * 1024 * 1024;
									if (!validType || !validSize) {
										return;
									}
									if (currentBlobUrl.current)
										URL.revokeObjectURL(currentBlobUrl.current);
									const blobUrl = URL.createObjectURL(file);
									currentBlobUrl.current = blobUrl;
									onChange({
										pendingLogoFile: file,
										logoPreviewUrl: blobUrl,
										logo: null,
									});
								}}
							/>
						</label>
						<span className="text-sm text-gray-400 truncate max-w-[200px]">
							{editor.pendingLogoFile?.name ??
								(editor.logoPreviewUrl || editor.logo?.url ? "Logo uploaded" : "No file chosen")}
						</span>
					</div>
					<HelperText>
						SVG recommended for crisp display. PNG works too (min 240 × 240px).
					</HelperText>
				</div>
			)}

			{hasParam && <div>
				<FieldLabel label="Event Name" required />
				<TextInput
					placeholder={editor.eventName || "e.g. DESIGNWEEKLAGOS"}
					{...register("eventName")}
					value={eventNameValue || ""}
					maxLength={25}
				/>
				<HelperText>It may appear on participant badges depending on the selected template.</HelperText>
			</div>}

			{layoutCaps.staticFields.includes("event_date") && (
				<>
					<div>
						<FieldLabel label="Date" />
						<BadgeDatePicker onChange={(v) => onChange({ eventDate: v })} />
						<HelperText>
							Updates the date shown on the live badge preview.
						</HelperText>
					</div>
					<div>
						<FieldLabel label="Time" />
						<TextInput
							placeholder="e.g. 10am"
							{...register("eventTime")}
							value={editor.eventTime || ""}
							maxLength={15}
						/>
						<HelperText>Shown alongside the date on the badge.</HelperText>
					</div>
				</>
			)}

			{editor.layoutId.startsWith("hng_finalist_") && (
				<div className="pt-4 border-t border-gray-100">
					<FieldLabel label="Badge Title" required />
					<Controller
						name="badgeTitle"
						control={control}
						render={({ field }) => (
							<BadgeDropdown
								value={field.value || "Finalist"}
								onChange={field.onChange}
								options={[
									{ label: "Finalist", value: "Finalist" },
									{ label: "Mentor", value: "Mentor" },
								]}
							/>
						)}
					/>
					<HelperText>Select the role title to display at the top of the badge.</HelperText>
				</div>
			)}
		</SectionCard>
	);
}
