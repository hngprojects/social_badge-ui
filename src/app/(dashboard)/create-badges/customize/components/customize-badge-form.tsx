"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { BrandSection } from "../../../components/customize/BrandSection";
import { StyleSection } from "../../../components/customize/StyleSection";
import { BadgeContentSection } from "../../../components/customize/BadgeContentSection";
import { ShareMessageSection } from "../../../components/customize/ShareMessageSection";
import { LivePreview } from "../../../components/customize/LivePreview";
import { TABS } from "../../../components/customize/constants";

import { customizeBadgeSchema } from "@/schemas/template";

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
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Badge");

  const handleChange = (partial: Partial<CustomizeEditorState>) => patch(partial);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = customizeBadgeSchema.safeParse({
      eventName: editor.eventName,
      destinationLink: editor.destinationLink,
      title: editor.title,
      defaultCaption: editor.defaultCaption,
      hashtags: editor.hashtags,
      accessType: editor.accessType,
    });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    const payload = buildOrganiserTemplatePayload({
      ...editor,
      destinationLink: validation.data.destinationLink,
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

  const isPublishing = isSaving;

  return (
    <main className="grid grid-cols-1 bg-[#F5F5F5] lg:grid-cols-12 gap-8 max-w-360 mx-auto w-full items-start">
      <section className="order-2 lg:order-1 lg:col-span-7 p-6 space-y-6">
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

        <form onSubmit={handleSubmit} className="space-y-6 mt-9">
          <BrandSection editor={editor} onChange={handleChange} layoutCaps={layoutCaps} />

          <StyleSection
            editor={editor}
            onChange={handleChange}
            onPaletteChange={(id) => setPalette(id)}
            onBgModeChange={setBgMode}
          />

          <BadgeContentSection editor={editor} onChange={handleChange} layoutCaps={layoutCaps} />

          <ShareMessageSection editor={editor} onChange={handleChange} />

          <div className="hidden lg:block pb-4">
            <Button
              type="submit"
              disabled={isPublishing}
              className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 transition-colors shadow-sm"
            >
              {isPublishing ? "Publishing…" : "Publish Badge"}
            </Button>
          </div>

          <div className="pb-8 lg:hidden">
            <Button
              type="submit"
              disabled={isPublishing}
              className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 transition-colors shadow-sm"
            >
              {isPublishing ? "Publishing…" : "Publish Badge"}
            </Button>
          </div>
        </form>
      </section>

      <section className="order-1 p-3 bg-[#FFFFFF] lg:order-2 lg:col-span-5 w-full lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:pt-6 lg:pb-6">
        <LivePreview
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          editor={editor}
          shareCaption={editor.defaultCaption}
        />
      </section>
    </main>
  );
}
