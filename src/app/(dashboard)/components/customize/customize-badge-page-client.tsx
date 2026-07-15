"use client";

import { useLoadOrganiserTemplate } from "@/app/features/badges/hooks/use-load-organiser-template";
import { useLoadPlatformTemplate } from "@/app/features/badges/hooks/use-load-platform-template";
import { createDefaultEditorState } from "@/app/features/badges/lib/parse-canvas-data";
import { CustomizeBadgeForm } from "@/app/features/customize/components/customize-badge-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  DEMO_CANVAS_TEMPLATE_DATA,
  DEMO_TEMPLATE_ID,
} from "./demo/demo-canvas-data";
import { PENDING_DEMO_CUSTOMIZATION_KEY } from "@/app/features/customize/constant";

export function CustomizeBadgePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platformTemplateId = searchParams.get("template");
  const organiserTemplateId = searchParams.get("id");

  const [hasPendingDemo] = useState(
    () => sessionStorage.getItem(PENDING_DEMO_CUSTOMIZATION_KEY) !== null,
  );

  const hasValidSource =
    hasPendingDemo || !!platformTemplateId || !!organiserTemplateId;

  const shouldLoadPlatform =
    !hasPendingDemo && !organiserTemplateId && !!platformTemplateId;
  const shouldLoadOrganiser = !hasPendingDemo && !!organiserTemplateId;

  const {
    data: loadedState,
    isLoading: organiserLoading,
    isError: organiserError,
  } = useLoadOrganiserTemplate(organiserTemplateId, shouldLoadOrganiser);

  const {
    data: platformTemplate,
    isLoading: platformLoading,
    isError: platformError,
  } = useLoadPlatformTemplate(
    organiserTemplateId ? null : platformTemplateId,
    shouldLoadPlatform,
  );

  // Compute initialEditor. It might be null if we have a UUID but no canvasData yet.
  const initialEditor = useMemo(() => {
    if (hasPendingDemo) {
      return createDefaultEditorState(
        DEMO_TEMPLATE_ID,
        DEMO_CANVAS_TEMPLATE_DATA,
      );
    }

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
    hasPendingDemo,
    platformTemplateId,
    organiserTemplateId,
    loadedState,
    platformTemplate?.canvasData,
    platformLoading,
  ]);

  const editorKey = useMemo(() => {
    return `${organiserTemplateId ?? platformTemplateId ?? "new"}-${loadedState ? "loaded" : "new"}`;
  }, [organiserTemplateId, platformTemplateId, loadedState]);

  useEffect(() => {
    if (hasValidSource) return;

    toast.info(
      "Your demo session has expired. Please choose a template to continue.",
    );
    router.replace("/create-badges");
    return;
  }, [hasValidSource, router]);

  if (!hasValidSource) {
    return null;
  }

  // We are loading if a required query is still pending AND we don't have enough data to render the form.
  const isFetching = shouldLoadOrganiser
    ? organiserLoading
    : shouldLoadPlatform
      ? platformLoading
      : false;
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
    (shouldLoadOrganiser && organiserError) ||
    (shouldLoadPlatform && platformError) ||
    (!initialEditor && !isFetching);

  if (hasError) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-[#F5F5F5]">
        <div className="text-center">
          <p className="text-sm text-red-500 mb-2">
            Could not load this badge.
          </p>
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
      isDemo={false}
      key={editorKey}
      initialEditor={initialEditor!}
      organiserTemplateId={organiserTemplateId}
    />
  );
}
