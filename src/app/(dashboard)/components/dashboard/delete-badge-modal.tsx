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
      onClick={onClose}
      className="fixed inset-0 z-[10000] grid place-items-center bg-black/40 p-[24px]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[560px] rounded-[20px] bg-white px-6 py-8 shadow-xl"
      >
        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FFF1F1]">
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#FFE4E4]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 3.5H17.5M3.5 7H24.5M22.1667 7L21.3485 19.2725C21.2257 21.1138 21.1644 22.0344 20.7667 22.7325C20.4166 23.3471 19.8884 23.8412 19.2519 24.1496C18.529 24.5 17.6063 24.5 15.7609 24.5H12.2391C10.3937 24.5 9.47104 24.5 8.74806 24.1496C8.11155 23.8412 7.58344 23.3471 7.23331 22.7325C6.83563 22.0344 6.77425 21.1138 6.6515 19.2725L5.83333 7M11.6667 12.25V18.0833M16.3333 12.25V18.0833"
                stroke="#D50B3E"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h2 className="mt-[24px] text-center text-[22px] font-bold text-[#3A3A3A]">
          Delete Badge
        </h2>

        <p className="mx-auto mt-[48px]  text-center text-[16px] leading-[1.7] text-[#8B8B8B]">
          Are you sure you want to delete{" "}
          <span className="font-medium text-[#555]">{title}</span> badge? This
          action is not reversible.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-full bg-[#F4F4F4] px-6 py-[14px] text-[14px] font-semibold text-[#242424] cursor-pointer hover:bg-[#e7e7e7]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-full bg-[#EF4444] px-6 py-[14px] text-[14px] font-semibold text-white cursor-pointer hover:opacity-[.95] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
