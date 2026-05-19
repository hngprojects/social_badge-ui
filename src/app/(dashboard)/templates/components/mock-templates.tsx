import TemplateCard, { type Template } from "./template-card";

type MockTemplatesProps = {
  templates: Template[];
};

const MockTemplates = ({ templates }: MockTemplatesProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-[18px] md:text-[28px] font-fraunces text-[#0A0A0A]">
          All Templates
        </h2>
        <span className="text-[11px] uppercase tracking-[1px] text-[#8A8A85]">
          {templates.length} Templates
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {templates.map((template, index) => (
          <TemplateCard key={template.id} template={template} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MockTemplates;
