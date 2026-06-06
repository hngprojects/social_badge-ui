import { MoreMenu } from "./more-menu";
import { RecentBadgesListProps } from "./recent-badges-types";
import { formatLastEditedDate } from "./recent-badges-utils";
import { StatusPill } from "./status-pill";

export function RecentBadgesMobileList({
  templates,
  onSelectTemplate,
  onRequestDelete,
  onRequestUnpublish,
}: RecentBadgesListProps) {
  return (
    <div className="md:hidden">
      {/* ... header ... */}
      <div className="grid grid-cols-[1.3fr_0.9fr_1fr_0.7fr_32px] border-b border-t border-[#F0F0EE] bg-[#ECE9E4] px-3 py-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
          BADGE
        </p>
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
          STATUS
        </p>
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
          LAST EDITED
        </p>
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
          SHARES
        </p>
        <span />
      </div>

      {templates.map((template) => {
        const canUnpublish = template.is_published || template.status === "live";

        return (
          <div
            key={template.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectTemplate(template)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectTemplate(template);
              }
            }}
            className="grid grid-cols-[1.3fr_0.9fr_1fr_0.7fr_32px] items-center border-b border-[#F0F0EE] px-3 py-5"
          >
            <div className="min-w-0">
              <h3 className="text-[14px] font-semibold leading-[1.25] text-[#3A3A3A]">
                {template.title}
              </h3>
              <p className="mt-1 truncate text-[13px] text-[#B0B0B0]">
                Template instance
              </p>
            </div>

            <div>
              <StatusPill status={template.status} />
            </div>

            <p className="text-[13px] text-[#B0B0B0]">
              {formatLastEditedDate(template.updated_at, template.status)}
            </p>

            <p className="text-[13px] text-[#B0B0B0]">
              {template.total_shares ?? 0}
            </p>

            <div onClick={(event) => event.stopPropagation()}>
              <MoreMenu
                onViewInfo={() => onSelectTemplate(template)}
                onUnpublish={canUnpublish ? () => onRequestUnpublish(template) : undefined}
                onDelete={() => onRequestDelete(template)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
