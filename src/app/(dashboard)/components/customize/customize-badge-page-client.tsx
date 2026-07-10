"use client";

import { useSearchParams } from "next/navigation";
import { DemoCustomizePage } from "./demo/demo-customize-page";
import { AuthenticatedCustomizePage } from "./authenticated-customize-page";

export function CustomizeBadgePageClient() {
	// Get selected platform template id from param
	const searchParams = useSearchParams();
		const hasParam = searchParams.has("template");

if (!hasParam){
	return <DemoCustomizePage />
}
return <AuthenticatedCustomizePage />

	
}
