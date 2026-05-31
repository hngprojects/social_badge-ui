"use client";

import { useSearchParams } from "next/navigation";
import { useLoadOrganiserTemplate } from "@/app/features/templates/hooks/useLoadOrganiserTemplate";
import { useLoadPlatformTemplate } from "@/app/features/templates/hooks/useLoadPlatformTemplate";
import { createDefaultEditorState } from "@/app/features/templates/lib/parse-canvas-data";
import { CustomizeBadgeForm } from "./customize-badge-form";

export function CustomizeBadgePageClient() {
  const searchParams = useSearchParams();
  const platformTemplateId = searchParams.get("template");
  const organiserTemplateId = searchParams.get("id");

  const platformId = platformTemplateId ?? "bold_name_pink_v1";
  const {
    data: loadedState,
    isLoading: organiserLoading,
    isError: organiserError,
  } =
    useLoadOrganiserTemplate(organiserTemplateId);
  const { data: platformTemplate, isLoading: platformLoading } = useLoadPlatformTemplate(
    organiserTemplateId ? null : platformTemplateId,
  );

  const isLoading = organiserTemplateId ? organiserLoading : platformLoading;

  if (isLoading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-[#F5F5F5]">
        <p className="text-sm text-gray-500">Loading template…</p>
      </main>
    );
  }

  if (organiserTemplateId && organiserError) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-[#F5F5F5]">
        <p className="text-sm text-red-500">Could not load this badge.</p>
      </main>
    );
  }

  const initialEditor =
    loadedState ??
    createDefaultEditorState(platformId, platformTemplate?.canvasData);
  const editorKey = `${organiserTemplateId ?? platformId}-${loadedState ? "loaded" : "new"}`;

  return (
    <CustomizeBadgeForm
      key={editorKey}
      initialEditor={initialEditor}
      organiserTemplateId={organiserTemplateId}
    />
  );
}
