import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getUserDisplayName } from "@/lib/api/auth-session";
import { useUserStore } from "@/stores/use-user-store";
import { getInitials } from "@/lib/utils";
import { UserAvatarProps } from "../../dashboard/types";

export function UserAvatar({ src }: UserAvatarProps) {
  const user = useUserStore((state) => state.user);
  const displayName = getUserDisplayName(user);
  const initials = getInitials(user?.first_name, user?.last_name);
  const avatarSrc = src || user?.profile_photo_url || "";

  return (
    <Avatar className="bg-[#949190] w-full h-full border-[3px] border-white grid place-content-center">
      {avatarSrc ? (
        <AvatarImage
          src={avatarSrc}
          width={48}
          height={48}
          alt={displayName || "Profile picture"}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-[36px] text-white font-extrabold">
          {initials}
        </span>
      )}

      {/* <AvatarBadge className="grid size-8 place-items-center rounded-full border-[3px] border-white bg-black">
        <CameraIcon className="size-4 text-white" />
      </AvatarBadge> */}
    </Avatar>
  );
}
