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

  const {
    data: loadedState,
    isLoading: organiserLoading,
    isError: organiserError,
  } =
    useLoadOrganiserTemplate(organiserTemplateId);
  const { data: platformTemplate, isLoading: platformLoading } = useLoadPlatformTemplate(
    organiserTemplateId ? null : platformTemplateId,
  );

  const initialEditor =
    loadedState ??
    createDefaultEditorState(platformTemplateId, platformTemplate?.canvasData);

  const isLoading = (organiserTemplateId ? organiserLoading : platformLoading) || (!initialEditor && !organiserError);

  if (isLoading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-[#F5F5F5]">
        <p className="text-sm text-gray-500">Loading template…</p>
      </main>
    );
  }

  if (organiserTemplateId && (organiserError || !initialEditor)) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-[#F5F5F5]">
        <p className="text-sm text-red-500">Could not load this badge.</p>
      </main>
    );
  }

  // At this point, initialEditor is guaranteed to be non-null
  const editorKey = `${organiserTemplateId ?? platformTemplateId ?? "new"}-${loadedState ? "loaded" : "new"}`;

  return (
    <CustomizeBadgeForm
      key={editorKey}
      initialEditor={initialEditor!}
      organiserTemplateId={organiserTemplateId}
    />
  );
}
