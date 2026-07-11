import { useLoadOrganiserTemplate } from "@/app/features/badges/hooks/use-load-organiser-template";
import { useLoadPlatformTemplate } from "@/app/features/badges/hooks/use-load-platform-template";
import { createDefaultEditorState } from "@/app/features/badges/lib/parse-canvas-data";
import { CustomizeBadgeForm } from "@/app/features/customize/components/customize-badge-form";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { DEMO_CANVAS_TEMPLATE_DATA, DEMO_TEMPLATE_ID } from "./demo/demo-canvas-data";

export function AuthenticatedCustomizePage(){
  const searchParams = useSearchParams();
      const platformTemplateId = searchParams.get("template")
      const organiserTemplateId = searchParams.get("id") ;

  
  const hasPendingDemo = typeof window !== "undefined" && sessionStorage.getItem("pendingDemoCustomization") !== null;

  console.log({
  platformTemplateId,
  organiserTemplateId,
  hasPendingDemo,
});

console.log("yess", sessionStorage.getItem("pendingDemoCustomization"))
      
      
    const {
      data: loadedState,
      isLoading: organiserLoading,
      isError: organiserError,
    } = useLoadOrganiserTemplate(organiserTemplateId, !hasPendingDemo);
  
    const {
      data: platformTemplate,
      isLoading: platformLoading,
      isError: platformError,
    } = useLoadPlatformTemplate(organiserTemplateId ? null : platformTemplateId, !hasPendingDemo );
  
  
    // Compute initialEditor. It might be null if we have a UUID but no canvasData yet.
    const initialEditor = useMemo(() => {
if (hasPendingDemo) {
  return createDefaultEditorState(DEMO_TEMPLATE_ID, DEMO_CANVAS_TEMPLATE_DATA)
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
      loadedState,
      organiserTemplateId,
      platformTemplateId,
      platformLoading,
      platformTemplate,hasPendingDemo
    ]);
  
    const editorKey = useMemo(() => {
      return `${organiserTemplateId ?? platformTemplateId ?? "new"}-${loadedState ? "loaded" : "new"}`;
    }, [organiserTemplateId, platformTemplateId, loadedState]);
  
    // We are loading if a required query is still pending AND we don't have enough data to render the form.
    const isFetching =hasPendingDemo ? false :  organiserTemplateId ? organiserLoading : platformLoading;
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
    const hasError = hasPendingDemo ? false :((organiserTemplateId && organiserError) ||
      (!organiserTemplateId && platformError) ||
      (!initialEditor && !isFetching));
  
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