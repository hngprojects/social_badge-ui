import { Template5 } from "@/app/(dashboard)/create-badges/customize/components/customizable-svgs";
import type { TemplateLayoutProps } from "../types";

export function Layout5({ editor, textColor }: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template5 className="w-full h-full" editor={editor} />
			<div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
				<h2 className="text-3xl font-black text-white uppercase italic mb-4">
					{editor.eventName || "SUMMIT"}
				</h2>
				<div className="w-20 h-1 bg-white mb-6" />
				<p style={textStyle} className="text-xl font-bold text-white/90">
					{editor.participantNameVisible
						? editor.participantNamePlaceholder || "Attendee"
						: ""}
				</p>
			</div>
		</div>
	);
}
