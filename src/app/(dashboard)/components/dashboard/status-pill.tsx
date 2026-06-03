import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";
import { STATUS_STYLES_LOWERCASE } from "../../constants/dashboard";

export function StatusPill({
  status,
}: {
  status: OrganizerTemplateInstance["status"];
}) {
  const s = STATUS_STYLES_LOWERCASE[status];

  return (
    <span
      className="inline-flex items-center gap-[6px] capitalize rounded-[20px] px-[10px] py-[4px] text-[12px] font-medium whitespace-nowrap"
      style={{
        background: s.bg,
        color: s.text,
      }}
    >
      <span
        className="w-[6px] h-[6px] rounded-full shrink-0"
        style={{
          background: s.dot,
        }}
      />
      {status}
    </span>
  );
}
