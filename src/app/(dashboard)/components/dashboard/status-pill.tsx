import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";

const STATUS_STYLES = {
  draft: {
    bg: "#F3F4F6",
    text: "#6B7280",
    dot: "#9CA3AF",
  },
  live: {
    bg: "#DCFCE7",
    text: "#16A34A",
    dot: "#16A34A",
  },
} satisfies Record<
  OrganizerTemplateInstance["status"],
  { bg: string; text: string; dot: string }
>;

export function StatusPill({
  status,
}: {
  status: OrganizerTemplateInstance["status"];
}) {
  const s = STATUS_STYLES[status];

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
