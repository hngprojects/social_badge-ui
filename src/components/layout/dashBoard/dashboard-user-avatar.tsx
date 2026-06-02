"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import type { User } from "@/stores/use-user-store";

type DashboardUserAvatarProps = {
  user: User | null;
  displayName: string;
  className?: string;
  fallbackClassName?: string;
};

export function DashboardUserAvatar({
  user,
  displayName,
  className,
  fallbackClassName,
}: DashboardUserAvatarProps) {
  return (
    <Avatar
      className={`border border-[#0000000D] bg-primary/10 text-primary ${className ?? ""}`}
    >
      {user?.profile_photo_url ? (
        <AvatarImage
          src={user.profile_photo_url}
          alt={displayName || "Profile picture"}
        />
      ) : null}
      <AvatarFallback
        className={`bg-primary/10 font-semibold text-primary ${fallbackClassName ?? ""}`}
      >
        {getInitials(user?.first_name, user?.last_name)}
      </AvatarFallback>
    </Avatar>
  );
}
