"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { BrandSection } from "../../../components/customize/BrandSection";
import { StyleSection } from "../../../components/customize/StyleSection";
import { BadgeContentSection } from "../../../components/customize/BadgeContentSection";
import { ShareMessageSection } from "../../../components/customize/ShareMessageSection";
import { LivePreview } from "../../../components/customize/LivePreview";

import { customizeBadgeSchema, type CustomizeBadgeSchema } from "@/schemas/template";

import { useCustomizeEditorState } from "@/app/features/templates/hooks/useCustomizeEditor";
import { useSaveOrganiserTemplate } from "@/app/features/templates/hooks/useSaveOrganiserTemplate";
import { buildOrganiserTemplatePayload } from "@/app/features/templates/lib/build-canvas-data";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";

interface CustomizeBadgeFormProps {
  initialEditor: CustomizeEditorState;
  organiserTemplateId: string | null;
}

export function CustomizeBadgeForm({
  initialEditor,
  organiserTemplateId,
}: CustomizeBadgeFormProps) {
  const { editor, patch, setPalette, setBgMode, layoutCaps } =
    useCustomizeEditorState(initialEditor);
  const { saveTemplateAsync, isSaving } = useSaveOrganiserTemplate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CustomizeBadgeSchema>({
    resolver: zodResolver(customizeBadgeSchema),
    defaultValues: {
      eventName: editor.eventName,
      title: editor.title,
      eventDate: editor.eventDate,
      eventTime: editor.eventTime,
      participantNameVisible: editor.participantNameVisible,
      roleTitleVisible: editor.roleTitleVisible,
      roleTitleRequired: editor.roleTitleRequired,
      allowParticipantPhoto: editor.allowParticipantPhoto,
      defaultCaption: editor.defaultCaption,
      hashtags: editor.hashtags,
      accessType: editor.accessType,
      fontId: editor.fontId,
      paletteId: editor.paletteId,
      bgMode: editor.bgMode,
    },
  });

  const formValues = watch();

  // Unified editor state for LivePreview derived from form + extra editor state
  const previewEditor: CustomizeEditorState = {
    ...editor,
    ...formValues,
    title: formValues.eventName || editor.title,
    eventName: formValues.eventName || editor.eventName,
  };

  const onFormSubmit = async (data: CustomizeBadgeSchema) => {
    // Make logo compulsory if required by layout
    if (layoutCaps.hasHeaderLogo && !editor.logoPreviewUrl && !editor.pendingLogoFile) {
      toast.error("Please upload a logo for this badge layout.");
      return;
    }

    const payload = buildOrganiserTemplatePayload({
      ...editor,
      ...data,
      title: data.eventName, // Use eventName as title
    });

    try {
      await saveTemplateAsync({
        payload,
        organiserTemplateId,
        pendingLogoFile: editor.pendingLogoFile,
      });
    } catch {
      /* toast handled in hook */
    }
  };

  const handleError = () => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message as string);
    }
  };

  const handlePaletteChange = (id: string) => {
    setPalette(id, formValues.bgMode);
    setValue("paletteId", id);
  };

  const handleBgModeChange = (mode: "gradient" | "solid") => {
    setBgMode(mode);
    setValue("bgMode", mode);
  };

  return (
    <main className="grid grid-cols-1 bg-[#F5F5F5] lg:grid-cols-12 gap-8 w-full items-start">
      <section className="order-2 lg:order-1 lg:col-span-7 w-full min-w-0 overflow-hidden p-6 space-y-6">
        <div className="pb-2 border-b border-gray-100">
          <p className="text-xs text-gray-400">
            <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
            &nbsp;/&nbsp;
            <Link href="/create-badges" className="hover:text-gray-600 transition-colors">Create badges</Link>
            &nbsp;/&nbsp;
            <span className="text-gray-500">Customize</span>
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#3A3A3A]">Customize your badge</h1>
          <p className="text-xs text-gray-400 mt-1">
            Make it yours — your changes appear live on the right.
          </p>
        </div>

        <form id="badge-form" onSubmit={handleSubmit(onFormSubmit, handleError)} className="w-full space-y-6 mt-9">
          <BrandSection
            register={register}
            editor={previewEditor}
            onChange={(p) => {
              patch(p);
              // Only setValue for things that aren't automatically handled by register()
              if (p.eventDate !== undefined) setValue("eventDate", p.eventDate);
            }}
            layoutCaps={layoutCaps}
          />

          <StyleSection
            register={register}
            editor={previewEditor}
            onChange={(p) => {
              patch(p);
              if (p.fontId !== undefined) setValue("fontId", p.fontId);
            }}
            onPaletteChange={handlePaletteChange}
            onBgModeChange={handleBgModeChange}
            layoutCaps={layoutCaps}
          />

          <BadgeContentSection
            control={control}
            editor={previewEditor}
            layoutCaps={layoutCaps}
          />

          <ShareMessageSection
            register={register}
            editor={previewEditor}
            onChange={patch}
          />
        </form>

        <div className="flex flex-col sm:flex-row gap-3 pb-8 w-full">
          <div className="flex-1 flex flex-col gap-1">
            <Button
              type="button"
              disabled
              variant="outline"
              title="Coming soon"
              aria-label="Save as Draft — coming soon"
              className="w-full rounded-xl font-semibold text-sm py-3 cursor-not-allowed opacity-50"
            >
              Save as Draft
            </Button>
            <p className="text-center text-xs text-gray-400">Coming soon</p>
          </div>
          <Button
            form="badge-form"
            type="submit"
            disabled={isSaving}
            variant="cta"
            className="flex-1 rounded-xl font-semibold text-sm py-3"
          >
            {isSaving ? "Publishing…" : "Publish"}
          </Button>
        </div>
      </section>

      <section className="order-1 p-3 bg-[#FFFFFF] lg:order-2 lg:col-span-5 w-full lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:pt-6 lg:pb-6">
        <LivePreview editor={previewEditor} />
      </section>
    </main>
  );
}
