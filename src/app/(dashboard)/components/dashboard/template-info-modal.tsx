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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
  const statusDescription = fullUrl
    ? "The badge is live and sharable. Participants can claim this badge and share it on social media."
    : "This badge is not yet published. Publish it to create a shareable link for participants.";

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        className="max-h-[calc(100vh-3rem)] max-w-[640px] overflow-y-auto rounded-[18px] p-5 sm:p-6 md:grid-cols-[160px_1fr] md:gap-6"
        showCloseButton
      >
        <DialogTitle className="sr-only">
          {template.title} badge information
        </DialogTitle>

        <div className="flex items-center justify-center overflow-hidden rounded-[14px] bg-[#F4F4F2] p-4 md:self-stretch">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[160px] md:max-w-none">
            <Image
              src={thumbnailUrl ?? "/assets/dashboard/badge-preview.png"}
              alt={template.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-start gap-3 pr-10">
            <h2 className="min-w-0 flex-1 text-[24px] font-bold leading-[1.08] text-[#1A1A1A] sm:text-[26px]">
              {template.title}
            </h2>

            <StatusPill status={template.status} />
          </div>
          <p className="mt-4 border-b border-[#E8E8E8] pb-4 text-[13px] leading-[1.6] text-[#757575]">
            {statusDescription}
          </p>

          <div className="space-y-3 border-b border-[#E8E8E8] py-4 text-[13px]">
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
          </div>

          <div className="pt-4">
            <p className="mb-2 text-[12px] font-semibold text-[#6B6B6B]">
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
              className="flex h-auto w-full justify-start gap-2 rounded-lg border border-[#E8E8E8] px-3 py-2 text-left text-[12px] text-[#121217]"
            >
              <Image
                src="/assets/dashboard/_ui-copy-02.svg"
                height={20}
                width={20}
                alt="copy icon"
              />
              <p className="min-w-0 truncate">{displayUrl}</p>
            </Button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              onClick={() => onRequestDelete(template)}
              className="h-auto rounded-full border border-[#F6B6C8] px-5 py-2.5 text-[13px] font-semibold text-[#F43F72] hover:border-[#EF4444] hover:bg-[#EF4444] hover:text-white"
            >
              Delete badge
            </Button>

            <Button asChild className="h-auto rounded-full bg-[#242424] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#242424]/90">
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

        <p className="truncate text-[13px] text-[#8B8B8B]">
          {label}
        </p>
      </div>

      <p className="text-right text-[14px] font-medium text-[#333]">
        {value}
      </p>
    </div>
  );
}
