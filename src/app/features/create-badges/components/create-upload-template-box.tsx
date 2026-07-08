import Image from "next/image";

interface UploadTemplateBoxProps {
  variant?: "desktop" | "mobile";
}

export function UploadTemplateBox({ variant = "desktop" }: UploadTemplateBoxProps) {
  if (variant === "mobile") {
    return (
      <div className="border-2 border-dashed border-[#EEEEEE] hover:border-[#EEEEEE]/80 bg-white rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3 text-left cursor-pointer w-full box-border">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-[#FFF0EC] flex items-center justify-center text-[#FC5E24] text-lg font-bold select-none">
          <Image
            src="/assets/dashboard/icons/upload-icon.svg"
            alt="Upload icon"
            width={30}
            height={30}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-[#1A1A1A]">Upload your own template</span>
          <span className="text-[11px] text-[#5C5C5C] font-medium mt-0.5 break-words">
            Upload a PNG or SVG (1080 × 1440px recommended).
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-[#EEEEEE] hover:border-[#EEEEEE]/80 bg-white rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-colors w-full mt-2">
      <div className="w-10 h-10 rounded-xl bg-[#FFF0EC] flex items-center justify-center text-[#FC5E24] text-lg font-bold select-none shrink-0">
        <Image
          src="/assets/dashboard/icons/upload-icon.svg"
          alt="Upload icon"
          width={30}
          height={30}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm md:text-[16px] font-bold text-[#1A1A1A]">Upload your own template</span>
        <span className="text-xs text-[#5C5C5C] font-normal mt-0.5">
          Have a custom design? Upload a PNG or SVG (1080 × 1440px recommended).
        </span>
      </div>
    </div>
  );
}
