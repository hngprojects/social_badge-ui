import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pen } from "lucide-react";
import { CaptionBoxProps } from "../types";

export default function CaptionBox({
	error,
	onEditClick,
	...props
}: CaptionBoxProps) {
	return (
		<div className="space-y-2 rounded-2xl border bg-[#f6f5f5] p-3 h-40 md:h-33.5">
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
				className="border-0 bg-transparent text-[14px] font-medium focus-visible:ring-0"
				rows={5}
				{...props}
			/>

			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}
