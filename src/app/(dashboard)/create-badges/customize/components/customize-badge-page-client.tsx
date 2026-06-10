"use client";

import { useMemo } from "react";
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
  } = useLoadOrganiserTemplate(organiserTemplateId);

  const {
    data: platformTemplate,
    isLoading: platformLoading,
    isError: platformError,
  } = useLoadPlatformTemplate(organiserTemplateId ? null : platformTemplateId);

  // Compute initialEditor. It might be null if we have a UUID but no canvasData yet.
  const initialEditor = useMemo(() => {
    if (loadedState) return loadedState;
    
    const canvasData = platformTemplate?.canvasData;

    if (
      !organiserTemplateId &&
      platformTemplateId &&
      platformLoading &&
      !canvasData
    ) {
      return null;
    }
    return createDefaultEditorState(platformTemplateId, canvasData);
  }, [
    loadedState,
    organiserTemplateId,
    platformTemplateId,
    platformLoading,
    platformTemplate,
  ]);

  const editorKey = useMemo(() => {
    return `${organiserTemplateId ?? platformTemplateId ?? "new"}-${loadedState ? "loaded" : "new"}`;
  }, [organiserTemplateId, platformTemplateId, loadedState]);

  // We are loading if a required query is still pending AND we don't have enough data to render the form.
  const isFetching = organiserTemplateId ? organiserLoading : platformLoading;
  const isLoading = isFetching && !initialEditor;

  if (isLoading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-[#F5F5F5]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm text-gray-500">Loading template…</p>
        </div>
      </main>
    );
  }

  // Error state: we finished fetching but couldn't get an editor state.
  const hasError = 
    (organiserTemplateId && organiserError) || 
    (!organiserTemplateId && platformError) || 
    (!initialEditor && !isFetching);

  if (hasError) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-[#F5F5F5]">
        <div className="text-center">
          <p className="text-sm text-red-500 mb-2">Could not load this badge.</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-xs text-gray-500 underline"
          >
            Try refreshing the page
          </button>
        </div>
      </main>
    );
  }

  // At this point, initialEditor is guaranteed to be non-null
  return (
    <CustomizeBadgeForm
      key={editorKey}
      initialEditor={initialEditor!}
      organiserTemplateId={organiserTemplateId}
    />
  );
}
