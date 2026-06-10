"use client";

import { useState, useMemo } from "react";
import { LivePreview } from "@/app/(dashboard)/components/customize/LivePreview";
import { StyleSection } from "@/app/(dashboard)/components/customize/StyleSection";
import { createDefaultEditorState } from "@/app/features/templates/lib/parse-canvas-data";
import { useCustomizeEditorState } from "@/app/features/templates/hooks/useCustomizeEditor";
import { CustomTemplatePreview } from "@/app/features/templates/components/badge-preview/CustomTemplatePreview";
import type { LayoutId } from "@/app/features/templates/components/badge-preview/layout-registry";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";

const TEST_TEMPLATES = [
	{ id: "tpl_1", label: "Template 1" },
	{ id: "tpl_3", label: "Template 3" },
	{ id: "tpl_4", label: "Template 4" },
	{ id: "tpl_5", label: "Template 5" },
	{ id: "tpl_7", label: "Template 7" },
	{ id: "tpl_9", label: "Template 9" },
	{ id: "card_1", label: "Card 1" },
	{ id: "card_2", label: "Card 2" },
	{ id: "card_3", label: "Card 3" },
	{ id: "card_4", label: "Card 4" },
	{ id: "dev_summit_dark_v1", label: "Live: Dev Summit" },
	{ id: "name_role_dark_v1", label: "Live: Name Role" },
	{ id: "next_gen_mint_v1", label: "Live: Next Gen" },
	{ id: "photo_gradient_v1", label: "Live: Photo Gradient" },
];

const TEST_TEMPLATE_LAYOUT_MAP: Record<string, string> = {
	card_1: "hng_finalist_dev_v1",
	card_2: "hng_finalist_pm_v1",
	card_3: "hng_finalist_v1",
	card_4: "hng_finalist_design_v1",
};

export default function TestBadgePage() {
	const [selectedTemplate, setSelectedTemplate] = useState(TEST_TEMPLATES[0].id);
	const [previewMode, setPreviewMode] = useState<"live" | "custom">("custom");

	const initialEditor = useMemo(
		() =>
			createDefaultEditorState(
				TEST_TEMPLATE_LAYOUT_MAP[selectedTemplate] ?? selectedTemplate,
			),
		[selectedTemplate],
	);

	const handleTemplateChange = (templateId: string) => {
		setSelectedTemplate(templateId);
	};

	if (!initialEditor) {
		return <div className="p-8 text-center text-red-500 font-bold">Error: Template not found</div>;
	}

	return (
		<TestBadgePageContent 
			initialEditor={initialEditor} 
			selectedTemplate={selectedTemplate} 
			handleTemplateChange={handleTemplateChange} 
			previewMode={previewMode} 
			setPreviewMode={setPreviewMode} 
		/>
	);
}

function TestBadgePageContent({ 
	initialEditor, 
	selectedTemplate, 
	handleTemplateChange,
	previewMode,
	setPreviewMode
}: { 
	initialEditor: CustomizeEditorState, 
	selectedTemplate: string,
	handleTemplateChange: (id: string) => void,
	previewMode: "live" | "custom",
	setPreviewMode: (mode: "live" | "custom") => void
}) {
	const { editor, patch, setPalette, setBgMode, layoutCaps } =
		useCustomizeEditorState(initialEditor);

	return (
		<div className="min-h-screen bg-[#F5F5F5] p-8">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
				<div className="lg:col-span-7 space-y-6">
					<div className="bg-white p-6 rounded-2xl shadow-sm">
						<h1 className="text-2xl font-bold text-[#3A3A3A]">Layout Tester</h1>
						<p className="text-sm text-gray-500 mt-1">
							Test new badge layouts and live preview rendering.
						</p>

						<div className="mt-6 space-y-6">
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Select Template
								</label>
								<div className="flex flex-wrap gap-2">
									{TEST_TEMPLATES.map((tpl) => (
										<button
											key={tpl.id}
											onClick={() => handleTemplateChange(tpl.id)}
											className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
												selectedTemplate === tpl.id
													? "bg-orange-500 text-white shadow-md"
													: "bg-gray-100 text-gray-600 hover:bg-gray-200"
											}`}
										>
											{tpl.label}
										</button>
									))}
								</div>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Preview Mode
								</label>
								<div className="flex gap-2">
									<button
										onClick={() => setPreviewMode("custom")}
										className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
											previewMode === "custom"
												? "bg-blue-500 text-white shadow-md"
												: "bg-gray-100 text-gray-600 hover:bg-gray-200"
										}`}
									>
										Custom Layout Component
									</button>
									<button
										onClick={() => setPreviewMode("live")}
										className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
											previewMode === "live"
												? "bg-green-500 text-white shadow-md"
												: "bg-gray-100 text-gray-600 hover:bg-gray-200"
										}`}
									>
										Production LivePreview
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white p-6 rounded-2xl shadow-sm">
						<StyleSection
							editor={editor}
							onChange={patch}
							onPaletteChange={setPalette}
							onBgModeChange={setBgMode}
							layoutCaps={layoutCaps}
						/>
					</div>

					<div className="bg-white p-6 rounded-2xl shadow-sm">
						<h3 className="text-sm font-semibold text-gray-700 mb-4">
							Content Overrides
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
									Event Name
								</label>
								<input
									type="text"
									value={editor.eventName}
									onChange={(e) => patch({ eventName: e.target.value })}
									className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
								/>
							</div>
							<div className="space-y-1.5">
								<label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
									Participant Name
								</label>
								<input
									type="text"
									value={editor.participantNamePlaceholder}
									onChange={(e) =>
										patch({ participantNamePlaceholder: e.target.value })
									}
									className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:col-span-5 space-y-6">
					<div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-8">
						{previewMode === "custom" ? (
							<div className="space-y-6">
								<div className="flex items-center gap-1.5 px-1">
									<span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
									<span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
										Custom Layout Tester
									</span>
								</div>
								<div className="rounded-2xl bg-orange-50 p-5">
									<CustomTemplatePreview
										templateId={selectedTemplate as LayoutId}
										editor={editor}
									/>
								</div>
								<div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
									<p className="text-xs text-blue-800">
										<strong>Development Note:</strong> Use{" "}
										<code>
											src/app/features/templates/components/badge-preview/
										</code>{" "}
										to edit the layout for <strong>{selectedTemplate}</strong>.
									</p>
								</div>
							</div>
						) : (
							<LivePreview editor={editor} />
						)}
					</div>

					<div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 shadow-sm">
						<h4 className="text-orange-800 font-bold text-xs uppercase tracking-wider mb-3">
							Layout Debugger
						</h4>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-[10px] text-orange-600 font-bold uppercase">
									Layout ID
								</p>
								<p className="text-sm font-mono text-orange-900">
									{editor.layoutId}
								</p>
							</div>
							<div>
								<p className="text-[10px] text-orange-600 font-bold uppercase">
									Palette
								</p>
								<p className="text-sm font-mono text-orange-900">
									{editor.paletteId}
								</p>
							</div>
						</div>
						<details className="mt-4">
							<summary className="text-[10px] text-orange-700 cursor-pointer font-bold uppercase hover:text-orange-900 transition-colors">
								Raw State
							</summary>
							<pre className="mt-2 text-[10px] text-orange-700 bg-orange-100/50 p-3 rounded-lg overflow-auto max-h-64 border border-orange-200">
								{JSON.stringify(editor, null, 2)}
							</pre>
						</details>
					</div>
				</div>
			</div>
		</div>
	);
}
