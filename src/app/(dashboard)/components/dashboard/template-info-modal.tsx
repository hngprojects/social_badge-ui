"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";
import { StatusPill } from "./status-pill";
import { formatDate } from "./recent-badges-utils";
import Link from "next/link";
import { toast } from "sonner";
import {
  buildParticipantShareUrl,
  formatShareUrlForDisplay,
} from "@/app/features/templates/lib/badge-share-url";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function TemplateInfoModal({
  template,
  thumbnailUrl,
  onClose,
  onRequestDelete,
}: {
  template: OrganizerTemplateInstance;
  thumbnailUrl?: string | null;
  onClose: () => void;
  onRequestDelete: (template: OrganizerTemplateInstance) => void;
}) {
  const fullUrl = template.share_slug
    ? buildParticipantShareUrl(template.share_slug)
    : null;
  const displayUrl = fullUrl
    ? formatShareUrlForDisplay(fullUrl)
    : "Not yet published";

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        className="max-w-[939px] rounded-[16px] p-[24px] grid gap-[24px] md:grid-cols-[0.95fr_1.1fr]"
        showCloseButton
      >
        <div className="overflow-hidden rounded-[12px] bg-[#F4F4F2]">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={thumbnailUrl ?? "/assets/dashboard/badge-preview.png"}
              alt={template.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 pr-12">
            <h2 className="text-[28px] font-bold leading-tight text-[#1A1A1A] lg:max-w-[70%]">
              {template.title}
            </h2>

            <StatusPill status={template.status} />
          </div>
          <p className="mt-5 border-b border-[#E8E8E8] pb-5 text-[14px] leading-[1.7] text-[#757575]">
            The badge is live and sharable. Participants can claim this badge
            and share it on social media
          </p>

          <div className="space-y-4 border-b border-[#E8E8E8] py-5 text-[14px]">
            <InfoRow
              icon={
                <Image
                  src="/assets/dashboard/_ui-calendar-date.svg"
                  height={20}
                  width={20}
                  alt="calendar icon"
                />
              }
              label="Created"
              value={formatDate(template.created_at)}
            />
            <InfoRow
              icon={
                <Image
                  src="/assets/dashboard/_ui-clock.svg"
                  height={20}
                  width={20}
                  alt="clock icon"
                />
              }
              label="Last used"
              value={formatDate(template.updated_at)}
            />
            <InfoRow
              icon={
                <Image
                  src="/assets/dashboard/_ui-award-02.svg"
                  height={20}
                  width={20}
                  alt="clock icon"
                />
              }
              label="Created badges"
              value="&mdash;"
            />
            <InfoRow
              icon={
                <Image
                  src="/assets/dashboard/_ui-share-06.svg"
                  height={20}
                  width={20}
                  alt="clock icon"
                />
              }
              label="Total shares"
              value="&mdash;"
            />
          </div>

          <div className="pt-4">
            <p className="mb-2 text-[13px] font-semibold text-[#6B6B6B]">
              Shareable link
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                if (!fullUrl) return;
                await navigator.clipboard.writeText(fullUrl);
                toast.success("Link copied to clipboard");
              }}
              className="flex gap-[8px] w-full items-center justify-start rounded-lg border border-[#E8E8E8] px-[16px] py-[8px] h-auto text-[13px] text-[#121217]"
            >
              <Image
                src="/assets/dashboard/_ui-copy-02.svg"
                height={20}
                width={20}
                alt="copy icon"
              />
              <p>{displayUrl}</p>
            </Button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              onClick={() => onRequestDelete(template)}
              className="rounded-full border border-[#F6B6C8] px-5 py-3 h-auto text-[14px] font-semibold text-[#F43F72] hover:bg-[#EF4444] hover:text-white hover:border-[#EF4444]"
            >
              Delete badge
            </Button>

            <Button asChild className="rounded-full bg-[#242424] px-5 py-3 h-auto text-[14px] font-semibold text-white hover:bg-[#242424]/90">
              <Link href={`/create-badges/customize?id=${encodeURIComponent(template.id)}`}>
                Edit badge
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
      <div className="flex items-center gap-[10px] min-w-0">
        <span className="shrink-0 text-[#B0B0B0]">{icon}</span>

        <p className="truncate text-[14px] text-[#8B8B8B] md:text-[16px]">
          {label}
        </p>
      </div>

      <p className="text-right text-[16px] font-medium text-[#333] md:text-[18px]">
        {value}
      </p>
    </div>
  );
}
