import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pen } from "lucide-react";
import { CaptionBoxProps } from "../types";

export default function CaptionBox({
	error,
	onEditClick,
	value,
	maxLength = 200,
	...props
}: CaptionBoxProps & { value?: string; maxLength?: number }) {
	const atLimit = (value ?? "").length >= maxLength;

	return (
		<div className="flex flex-col overflow-hidden rounded-2xl border bg-[#f6f5f5] p-3 transition-all duration-150">
			<div className="flex items-center justify-between">
				<h3 className="font-medium font-sans">Caption</h3>

				{onEditClick && (
					<Button
						type="button"
						className="border-2 border-gray-200"
						variant="ghost"
						size="sm"
						onClick={onEditClick}
					>
						<Pen className="mr-2 h-4 w-4" />
						Edit caption
					</Button>
				)}
			</div>

			<Textarea
				className="my-auto min-h-16 field-sizing-content resize-none overflow-hidden border-0 bg-transparent text-[14px] font-medium focus-visible:ring-0"
				value={value}
				maxLength={maxLength}
				onKeyDown={(e) => {
					const isAdding = e.key.length === 1 && !e.ctrlKey && !e.metaKey;
					if ((value ?? "").length >= maxLength && isAdding) e.preventDefault();
				}}
				{...props}
			/>

			<div className="flex justify-between items-center mt-1">
				{atLimit ? (
					<p className="text-sm text-amber-500">
						Maximum {maxLength} characters reached
					</p>
				) : error ? (
					<p className="text-sm text-red-500">{error}</p>
				) : (
					<div />
				)}
				<p
					className={`text-[10px] font-medium ${atLimit ? "text-amber-500" : "text-gray-400"}`}
				>
					{(value ?? "").length}/{maxLength}
				</p>
			</div>
		</div>
	);
}
