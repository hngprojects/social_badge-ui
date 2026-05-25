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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 500,
        background: s.bg,
        color: s.text,
        whiteSpace: "nowrap",
        textTransform: "capitalize",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}
