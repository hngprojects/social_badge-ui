"use client";

import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";
import { StatusPill } from "./status-pill";

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
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.781 13.7198C14.8507 13.7895 14.906 13.8722 14.9437 13.9632C14.9814 14.0543 15.0008 14.1519 15.0008 14.2504C15.0008 14.349 14.9814 14.4465 14.9437 14.5376C14.906 14.6286 14.8507 14.7114 14.781 14.781C14.7114 14.8507 14.6286 14.906 14.5376 14.9437C14.4465 14.9814 14.349 15.0008 14.2504 15.0008C14.1519 15.0008 14.0543 15.0008 13.9632 14.9437C13.8722 14.906 13.7895 14.8507 13.7198 14.781L7.50042 8.56073L1.28104 14.781C1.14031 14.9218 0.94944 15.0008 0.750417 15.0008C0.551394 15.0008 0.360523 14.9218 0.219792 14.781C0.0790615 14.6403 0 14.4494 0 14.2504C0 14.0514 0.0790615 13.8605 0.219792 13.7198L6.4401 7.50042L0.219792 1.28104C0.0790615 1.14031 0 0.94944 0 0.750417C0 0.551394 0.0790615 0.360523 0.219792 0.219792C0.360523 0.0790615 0.551394 0 0.750417 0C0.94944 0 1.14031 0.0790615 1.28104 0.219792L7.50042 6.4401L13.7198 0.219792C13.8605 0.0790615 14.0514 0 14.2504 0C14.4494 0 14.6403 0.0790615 14.781 0.219792C14.9218 0.360523 15.0008 0.551394 15.0008 0.750417C15.0008 0.94944 14.9218 1.14031 14.781 1.28104L8.56073 7.50042L14.781 13.7198Z"
              fill="#7A7A7A"
            />
          </svg>
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

          <span className="mt-2 inline-flex rounded-md border border-[#E8E8E8] px-2 py-1 text-[12px] text-[#333]">
            Creative
          </span>

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
              value="May 3rd, 2026"
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
              value="2 hours ago"
            />
            <InfoRow
              icon={
                <Image
                  src="/assets/dashboard/_ui-award-02.svg"
                  height={20}
                  width={20}
                  alt="badge icon"
                />
              }
              label="Created badges"
              value="734"
            />
            <InfoRow
              icon={
                <Image
                  src="/assets/dashboard/_ui-share-06.svg"
                  height={20}
                  width={20}
                  alt="share icon"
                />
              }
              label="Total shares"
              value="400"
            />
          </div>

          <div className="pt-4">
            <p className="mb-2 text-[13px] font-semibold text-[#6B6B6B]">
              Shareable link
            </p>

            <div className="flex gap-[8px] items-center rounded-lg border border-[#E8E8E8] px-[16px] py-[8px] text-[13px] text-[#121217]">
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
              className="rounded-full border border-[#F6B6C8] px-5 py-3 text-[14px] font-semibold text-[#F43F72] cursor-pointer hover:bg-[#F43F72] hover:text-white"
            >
              Delete badge
            </button>

            <button className="rounded-full bg-[#242424] px-5 py-3 text-[14px] font-semibold text-white cursor-pointer">
              Edit badge
            </button>
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
