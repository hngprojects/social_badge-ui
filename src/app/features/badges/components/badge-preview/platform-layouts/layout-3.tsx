import { Template3 } from "@/app/features/customize/components/customizable-svgs";
import { LogoPlaceholder } from "../shared/logo-placeholder";
import type { TemplateLayoutProps } from "../types";

export function Layout3({ editor, textColor }: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px] text-black">
			<Template3 className="w-full h-full" editor={editor} />
			<div className="absolute w-full h-full top-0 py-8">
				<div className="flex border-black  justify-between items-start px-8">
					<LogoPlaceholder isHidden={true} />
					<div>Event Name</div>
				</div>

				<div className="px-8 my-6">
					<h2 style={textStyle} className="text-3xl">
						{editor.participantNameVisible
							? editor.participantNamePlaceholder || "Sandra Robinson"
							: ""}
					</h2>
					<p style={textStyle} className="text-base">
						{editor.roleTitleVisible
							? editor.roleTitlePlaceholder || "Product designer"
							: ""}
					</p>
				</div>
				<div className="bg-black w-[80%] h-45 rounded-t-sm rounded-b-2xl mx-auto"></div>
			</div>
		</div>
	);
}
