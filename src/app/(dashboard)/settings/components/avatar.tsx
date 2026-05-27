import { CameraIcon } from "lucide-react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function UserAvatar() {
  return (
    <Avatar className="bg-[#949190] w-full h-full border-[3px] border-white">
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      {/* FALLBACK INITIAL */}
      <AvatarFallback className="w-full h-full bg-red-300">PP</AvatarFallback>

      <AvatarBadge className="grid size-[32px] place-items-center rounded-full border-[3px] border-white bg-black">
        <CameraIcon className="size-[16px] text-white" />
      </AvatarBadge>
    </Avatar>
  );
}
