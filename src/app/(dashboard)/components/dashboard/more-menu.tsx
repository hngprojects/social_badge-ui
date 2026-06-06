"use client";
import { KebabMenu } from "./kebab-menu";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export function MoreMenu({
  onEdit,
  onViewInfo,
  onUnpublish,
  onDelete,
  editHref,
}: {
  onEdit?: () => void;
  onViewInfo?: () => void;
  onUnpublish?: () => void;
  onDelete?: () => void;
  editHref?: string;
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
    if (!action) return;
    action();
    setOpen(false);
  }

  return (
		<div className="inline-block">
			<KebabMenu buttonRef={buttonRef} toggleMenu={toggleMenu} open={open} />

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
						{editHref && (
							<Link
								href={editHref}
								role="menuitem"
								onClick={() => handleAction(onEdit)}
								className="inline-flex w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#242424] hover:bg-[#F8F8F8]"
							>
								Edit
							</Link>
						)}

						<button
							type="button"
							role="menuitem"
							onClick={() => handleAction(onViewInfo)}
							className="w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#242424] hover:bg-[#F8F8F8]"
						>
							View info
						</button>

						{onUnpublish && (
							<button
								type="button"
								role="menuitem"
								onClick={() => handleAction(onUnpublish)}
								className="w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#242424] hover:bg-[#F8F8F8]"
							>
								Unpublish
							</button>
						)}

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
