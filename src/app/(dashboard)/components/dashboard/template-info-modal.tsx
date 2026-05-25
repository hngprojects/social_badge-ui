"use client";

import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";
import { StatusPill } from "./status-pill";
import { formatDate } from "./recent-badges-utils";
import Link from "next/link";
import { toast } from "sonner";

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
  useEffect(() => {
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] grid place-items-center overflow-y-auto bg-black/40 p-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative grid w-full max-w-[939px] gap-[24px] rounded-[16px] bg-white p-[24px] shadow-xl md:grid-cols-[0.95fr_1.1fr]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-[40px] w-[40px] place-content-center rounded-full border border-[#E8E8E8]  text-[#757575] hover:bg-gray-50 cursor-pointer"
        >
          <Image
            src="/assets/dashboard/X.svg"
            height={24}
            width={24}
            alt="cancel button"
          />
        </button>

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
              value={""}
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
              value={""}
            />
          </div>

          <div className="pt-4">
            <p className="mb-2 text-[13px] font-semibold text-[#6B6B6B]">
              Shareable link
            </p>

            <div
              onClick={async () => {
                if (!template.share_slug) return;

                await navigator.clipboard.writeText(template.share_slug);
                toast.success("Link copied to clipboard");
              }}
              className="flex gap-[8px] items-center rounded-lg border border-[#E8E8E8] px-[16px] py-[8px] text-[13px] text-[#121217] cursor-pointer"
            >
              <Image
                src="/assets/dashboard/_ui-copy-02.svg"
                height={20}
                width={20}
                alt="copy icon"
              />
              <p>{template.share_slug ?? "Not yet published"}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => onRequestDelete(template)}
              className="rounded-full border border-[#F6B6C8] px-5 py-3 text-[14px] font-semibold text-[#F43F72] cursor-pointer hover:bg-[#EF4444] hover:text-white"
            >
              Delete badge
            </button>

            <Link
              href={`/create-badges/customize?id=${encodeURIComponent(template.id)}`}
              className="flex items-center justify-center rounded-full bg-[#242424] px-5 py-3 text-[14px] font-semibold text-white cursor-pointer hover:opacity-[95%]"
            >
              Edit badge
            </Link>
          </div>
        </div>
      </div>
    </div>
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
