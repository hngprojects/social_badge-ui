import TemplateCard from "../../templates/components/template-card";
import { templates } from "../../constants/templates";
import Link from "next/link";

export function TemplateGrid() {
  return (
    <div className="p-5 pt-0 grid w-full w-full gap-4.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {templates.map((template, index) => (
        <Link key={template.id} href="/templates" className="h-full">
          <TemplateCard template={template} isAboveFold={index < 4} />
        </Link>
      ))}
    </div>
  );
}
