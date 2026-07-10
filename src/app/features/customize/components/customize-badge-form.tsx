"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { BrandSection } from "./BrandSection";
import { StyleSection } from "./StyleSection";
import { BadgeContentSection } from "./BadgeContentSection";
import { ShareMessageSection } from "./ShareMessageSection";
import { VisibilitySection } from "./VisibilitySection";
import { LivePreview } from "./LivePreview";

import { customizeBadgeSchema, type CustomizeBadgeFormValues } from "@/schemas/template";

import { useCustomizeEditorState } from "@/app/features/badges/hooks/use-customize-editor";
import { useSaveOrganiserTemplate } from "@/app/features/badges/hooks/use-save-organiser-template";
import { buildOrganiserTemplatePayload } from "@/app/features/badges/lib/build-canvas-data";
import type { CustomizeEditorState } from "@/app/features/customize/canvas-data";
import { DEMO_TEMPLATE_ID } from "@/app/(dashboard)/components/customize/demo/demo-canvas-data";

interface CustomizeBadgeFormProps {
  initialEditor: CustomizeEditorState;
  organiserTemplateId: string | null;
  hasParam?: boolean;
  
}

export function CustomizeBadgeForm({
  hasParam,
  initialEditor,
  organiserTemplateId,
}: CustomizeBadgeFormProps) {

   const { editor, patch, setPalette, setBgMode, layoutCaps } =
    useCustomizeEditorState(initialEditor);
  	
useEffect(()=>{
  const pending = sessionStorage.getItem("pendingDemoCustomization");
if (!pending) return;
const saved = JSON.parse(pending);

patch({...saved, logoPreviewUrl:null})


toast.success("We've restored your badge customization");

sessionStorage.removeItem("pendingDemoCustomization")
},[patch]);
   
  
 
  const { saveTemplateAsync } = useSaveOrganiserTemplate();
  const [savingAction, setSavingAction] = useState<"draft" | "publish" | null>(null);

  const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm<CustomizeBadgeFormValues>({
		resolver: zodResolver(customizeBadgeSchema),
		defaultValues: {
			eventName: organiserTemplateId ? editor.eventName : "",
			title: editor.title,
			eventDate: editor.eventDate,
			eventTime: editor.eventTime,
			participantNameVisible: editor.participantNameVisible,
			roleTitleVisible: editor.roleTitleVisible,
			trackVisible: editor.trackVisible ?? true,
			trackRequired: editor.trackRequired ?? false,
			roleTitleRequired: editor.roleTitleRequired,
			allowParticipantPhoto: editor.allowParticipantPhoto,
			defaultCaption: editor.defaultCaption,
			hashtags: editor.hashtags,
			accessType: editor.accessType,
			accessCode: editor.accessCode,
			fontId: editor.fontId,
			paletteId: editor.paletteId,
			badgeTitle: editor.badgeTitle || "Finalist",
			bgMode: editor.isSplit ? "split" : editor.bgMode,
			secondaryColor: editor.secSolidColor,
			textColor: editor.textColor,
		},
	});


  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();

  // Unified editor state for LivePreview derived from form + extra editor state
  const previewEditor: CustomizeEditorState = {
    ...editor,
    ...formValues,
    title: formValues.eventName || editor.title,
    eventName: formValues.eventName || editor.eventName,
    badgeTitle: formValues.badgeTitle || editor.badgeTitle,
    bgMode: formValues.bgMode ?? editor.bgMode,
    secSolidColor: formValues.secondaryColor ?? editor.secSolidColor,
  };

  const onFormSubmit = async (data: CustomizeBadgeFormValues, shouldPublish = true) => {
    setSavingAction(shouldPublish ? "publish" : "draft");
    // Make logo compulsory if required by layout
    if (layoutCaps.hasHeaderLogo && !editor.logoPreviewUrl && !editor.pendingLogoFile) {
      toast.error("Please upload a logo for this badge layout.");
      return;
    }
    
    const payload = buildOrganiserTemplatePayload({
      ...editor,
      ...data,
      title: data.eventName, // Use eventName as title
      bgMode: data.bgMode ?? editor.bgMode,
      secSolidColor: data.secondaryColor ?? editor.secSolidColor,
    });

    try {
      await saveTemplateAsync({
        payload,
        organiserTemplateId,
        pendingLogoFile: editor.pendingLogoFile,
        shouldPublish,
      });
    } catch {
      /* toast handled in hook */
    } finally {
      setSavingAction(null);
    }
  };

  const navigate = useRouter()

  const handleContinue = () =>{
    

  sessionStorage.setItem("pendingDemoCustomization", JSON.stringify(editor))
  sessionStorage.setItem(
  "pendingDemoTemplateId",
  DEMO_TEMPLATE_ID
);
  navigate.push("/signup")
  }

  const handleError = () => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message as string);
    }
  };

  const handlePaletteChange = (id: string) => {
    setPalette(id, formValues.bgMode || editor.bgMode);
    setValue("paletteId", id);
  };

  const handleBgModeChange = (mode: "gradient" | "solid" | "split" | "image") => {
    setBgMode(mode);
    setValue("bgMode", mode);
  };

  const isPublished = editor.status === "live";

  return (
    <main className={`grid grid-cols-1 bg-[#F5F5F5] lg:grid-cols-12 gap-0 md:gap-8 w-full items-start ${hasParam &&"border"}`}>
      <section className="order-2 lg:order-1 lg:col-span-7 w-full min-w-0 overflow-hidden p-3 max-[400px]:p-3 min-[400px]:p-6 space-y-6">
        {hasParam && <div className=" border-b border-gray-100">
          <p className="text-xs text-gray-400">
            <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
            &nbsp;/&nbsp;
            <Link href="/create-badges" className="hover:text-gray-600 transition-colors">Create badges</Link>
            &nbsp;/&nbsp;
            <span className="text-gray-500">Customize</span>
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#3A3A3A]">Customize your badge</h1>
          </div>
}

        <form id="badge-form" onSubmit={(e) => e.preventDefault()} className="w-full space-y-6 mt-9">
          <BrandSection
          hasParam={hasParam}
            register={register}
            control={control}
            editor={previewEditor}
            eventNameValue={formValues.eventName || ""}
            onChange={(p) => {
              patch(p);
              if (p.eventDate !== undefined) setValue("eventDate", p.eventDate);
            }}
            layoutCaps={layoutCaps}
          />

          <StyleSection
            editor={previewEditor}
            onChange={(p) => {
              patch(p);
              if (p.fontId !== undefined) setValue("fontId", p.fontId);
              if (p.textColor !== undefined) setValue("textColor", p.textColor);
              if (p.secSolidColor !== undefined) setValue("secondaryColor", p.secSolidColor);
            }}
            onPaletteChange={handlePaletteChange}
            onBgModeChange={handleBgModeChange}
            layoutCaps={layoutCaps}
          />

{hasParam && <>
<BadgeContentSection
            control={control}
            layoutCaps={layoutCaps}
          />

          <ShareMessageSection
            register={register}
            editor={previewEditor}
          />

          <VisibilitySection
            register={register}
            control={control}
            isProtected={formValues.accessType === 1}
            accessCode={formValues.accessCode}
          />
          </>

          }
        </form>

        {hasParam && <div className="flex flex-row gap-3 pb-8 w-full justify-end">
          {!isPublished && (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={handleSubmit((data) => onFormSubmit(data, false), handleError)}
              disabled={savingAction !== null}
              className="rounded-full border-[#EEEEEE] text-[#3A3A3A]"
            >
              {savingAction === "draft" ? "Saving…" : "Save as draft"}
            </Button>
          )}

          <Button
            type="button"
            variant="cta"
            size="default"
            onClick={handleSubmit((data) => onFormSubmit(data, !isPublished), handleError)}
            disabled={savingAction !== null}
            className="shadow-none border-0"
          >
            {savingAction === "publish"
              ? (isPublished ? "Saving Changes…" : "Publishing…")
              : (isPublished ? "Save Changes" : "Publish badge")}
            {savingAction !== "publish" && (
              <svg className="size-3" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.875 0C1.52982 0 1.25 0.279822 1.25 0.625C1.25 0.970178 1.52982 1.25 1.875 1.25H4.11612L0.183058 5.18306C-0.0610194 5.42714 -0.0610194 5.82287 0.183058 6.06694C0.427136 6.31102 0.822864 6.31102 1.06694 6.06694L5 2.13388V4.375C5 4.72018 5.27982 5 5.625 5C5.97018 5 6.25 4.72018 6.25 4.375V0.625C6.25 0.279822 5.97018 0 5.625 0H1.875Z" fill="white"/>
              </svg>
            )}
          </Button>
          
        </div>}
        {!hasParam && <Button onClick={handleContinue} className="w-full py-4! lg:py-6!"  variant="default">
          Create My Event  <svg className="size-3" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.875 0C1.52982 0 1.25 0.279822 1.25 0.625C1.25 0.970178 1.52982 1.25 1.875 1.25H4.11612L0.183058 5.18306C-0.0610194 5.42714 -0.0610194 5.82287 0.183058 6.06694C0.427136 6.31102 0.822864 6.31102 1.06694 6.06694L5 2.13388V4.375C5 4.72018 5.27982 5 5.625 5C5.97018 5 6.25 4.72018 6.25 4.375V0.625C6.25 0.279822 5.97018 0 5.625 0H1.875Z" fill="white"/>
              </svg>
        </Button>}
      </section>

      <section className={`order-1 p-3 bg-[#FFFFFF] lg:order-2 lg:col-span-5 w-full ${hasParam && "lg:sticky"} lg:top-18 ${hasParam?"lg:h-screen":"lg:h-full"} lg:overflow-y-auto ${hasParam?"lg:pt-6":"lg:pt-8"} lg:pb-6`}>
        <LivePreview hideExtras={!hasParam} editor={previewEditor} />
      </section>
    </main>
  );
}
