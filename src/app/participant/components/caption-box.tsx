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
	return (
		/* Removed fixed 'h-40 md:h-33.5' so the container can expand dynamically */
		<div className="space-y-2 rounded-2xl border bg-[#f6f5f5] p-3 min-h-33.5 h-auto transition-all duration-150">
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
				className="border-0 bg-transparent text-[14px] font-medium focus-visible:ring-0 resize-none overflow-hidden min-h-[40px]"
				rows={1} // Starts at 1 row and auto-expands cleanly via the form's onChange handle
				value={value}
				maxLength={maxLength}
				{...props}
			/>

			<div className="flex justify-between items-center mt-1">
				{error ? <p className="text-sm text-red-500">{error}</p> : <div />}
				<p className="text-[10px] text-gray-400 font-medium">
					{(value ?? "").length}/{maxLength}
				</p>
			</div>
		</div>
	);
}
