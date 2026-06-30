"use client";


import { LayoutTemplate } from "@/app/features/dashboardLayout/types";
import { TemplateCard } from "./create-template-card";

interface TemplateGalleryGridProps {
  templates: LayoutTemplate[];
  activeTemplateId: string | null;
  onSelect: (template: LayoutTemplate) => void;
  className?: string;
}

export function TemplateGalleryGrid({
  templates,
  activeTemplateId,
  onSelect,
  className,
}: TemplateGalleryGridProps) {
  return (
    <div className={className ?? "grid grid-cols-2 gap-5 w-full"}>
      {templates.map((tpl, idx) => (
        <TemplateCard
          key={tpl.id}
          template={tpl}
          index={idx}
          isSelected={activeTemplateId === tpl.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
