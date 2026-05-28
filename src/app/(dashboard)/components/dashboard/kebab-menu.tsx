export function KebabMenu({
  buttonRef,
  toggleMenu,
  open,
}: {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  toggleMenu: () => void;
  open: boolean;
}) {
  return (
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
  );
}
