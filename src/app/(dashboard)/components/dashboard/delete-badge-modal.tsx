import Image from "next/image";
export function DeleteBadgeModal({
  title,
  onClose,
  onDelete,
  isDeleting = false,
}: {
  title: string;
  onClose: () => void;
  onDelete: () => void | Promise<void>;
  isDeleting?: boolean;
}) {
  return (
    <div
      onClick={() => {
        if (!isDeleting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-badge-title"
      className="fixed inset-0 z-10000 grid place-items-center bg-black/40 p-6"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-140 rounded-[20px] bg-white px-6 py-8 shadow-xl"
      >
        <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-[#FFF1F1]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFE4E4]">
            <Image
              src="/assets/dashboard/_ui-trash-03.svg"
              height={28}
              width={28}
              alt="trash icon"
            />
          </div>
        </div>

        <h2
          id="delete-badge-title"
          className="mt-6 text-center text-[22px] font-bold text-[#3A3A3A]"
        >
          Delete Badge
        </h2>

        <p className="mx-auto mt-12  text-center text-[16px] leading-[1.7] text-[#8B8B8B]">
          Are you sure you want to delete{" "}
          <span className="font-medium text-[#555]">{title}</span> badge? This
          action is not reversible.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-full bg-[#F4F4F4] px-6 py-3.5 text-[14px] font-semibold text-[#242424] cursor-pointer hover:bg-[#e7e7e7]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-full bg-[#EF4444] px-6 py-3.5 text-[14px] font-semibold text-white cursor-pointer hover:opacity-[.95] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
