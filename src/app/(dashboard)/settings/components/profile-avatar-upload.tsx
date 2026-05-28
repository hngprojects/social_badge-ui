import { Button } from "@/components/ui/button";
import { ProfileAvatarUploadProps } from "../types/profile-avatar-upload";
import { UserAvatar } from "./user-avatar";
import { UploadIcon } from "lucide-react";

export function ProfileAvatarUpload({
  previewUrl,
  onUploadClick,
  onRemove,
  inputRef,
  onAvatarChange,
}: ProfileAvatarUploadProps) {
  return (
    <>
      <div className="flex flex-col items-start md:flex-row md:items-center gap-6 border-b pb-4 md:pb-6.75">
        {/* USER AVATAR */}
        <div className="h-24 w-24">
          <UserAvatar src={previewUrl} />
        </div>

        <div className="flex-col flex gap-3">
          <div className="max-w-[60%] md:max-w-none flex flex-col gap-3 md:gap-0">
            <h2 className="text-[#3A3A3A] text-[16px] font-bold">
              Profile Photo
            </h2>
            <p>Jpg or Png. Square ratio recommended. Max 2MB.</p>
          </div>

          <div className="flex items-center gap-4">
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={onAvatarChange}
            />
            <Button
              type="button"
              onClick={onUploadClick}
              variant="outline"
              className="bg-[#FFF3F0] text-[14px]"
            >
              <UploadIcon />
              Upload new photo
            </Button>
            <Button
              type="button"
              onClick={onRemove}
              variant="ghost"
              className="text-[#3A3A3A] text-[14px]"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
