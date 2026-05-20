import { Template } from "../../types/template";
import TemplateCard from "./template-card";

type MockTemplatesProps = {
  templates: Template[];
  activeTab: string;
};

const MockTemplates = ({ templates, activeTab }: MockTemplatesProps) => {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <p className="text-[#0A0A0A] font-semibold text-lg">No templates yet</p>
        <p className="text-[#8A8A85] text-sm max-w-xs">
          There are no{" "}
          <span className="font-medium capitalize">{activeTab}</span> templates
          available at the moment. Check back soon or browse another category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
};

export default MockTemplates;
