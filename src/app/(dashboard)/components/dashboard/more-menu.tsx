"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function MoreMenu({
  onEdit,
  onViewInfo,
  onDelete,
}: {
  onEdit?: () => void;
  onViewInfo?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function updateMenuPosition() {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const menuWidth = 190;
    const gap = 8;

    const left = rect.left + window.scrollX - menuWidth + rect.width;
    const top = rect.bottom + window.scrollY + gap;

    setPosition({ top, left });
  }

  function toggleMenu() {
    updateMenuPosition();
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        !menuRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function handleReposition() {
      updateMenuPosition();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  function handleAction(action?: () => void) {
    action?.();
    setOpen(false);
  }

  return (
    <div className="inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggleMenu}
        className="flex cursor-pointer items-center justify-center rounded-md px-[6px] py-1 text-[#9CA3AF] transition-colors hover:bg-[#F3F4F6] hover:text-[#374151]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="3" r="1.25" />
          <circle cx="8" cy="8" r="1.25" />
          <circle cx="8" cy="13" r="1.25" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              zIndex: 9999,
            }}
            className="w-[190px] rounded-2xl border border-[#E5E7EB] bg-white p-2 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => handleAction(onEdit)}
              className="w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#242424] hover:bg-[#F8F8F8]"
            >
              Edit
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => handleAction(onViewInfo)}
              className="w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#242424] hover:bg-[#F8F8F8]"
            >
              View info
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => handleAction(onDelete)}
              className="w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#DC2626] hover:bg-[#FEF2F2]"
            >
              Delete
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
