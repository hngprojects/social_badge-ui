import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { UserAvatar } from "./avatar";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { ProfileInput } from "./input-profile";
import { SettingsSubCard } from "./settings-subcard";

export default function ProfileCard() {
  return (
    <Card className="text-[14px] text-[#9CA3AF] font-normal py-0">
      <CardHeader className="border-b pt-[4px]">
        <SettingsSubCard
          src="/assets/dashboard/settings/_ui-user-01.svg"
          alt="Profile icon"
          head="Profile"
          detail="Your personal info and how you appear"
          bg="#FFF0EC"
          showIcon={true}
        />
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex flex-col gap-[24px]">
        <div className="flex items-center gap-[24px] border-b pb-[27px]">
          {/* USER AVATAR */}
          <div className="h-[96px] w-[96px]">
            <UserAvatar />
          </div>

          <div className="flex-col flex gap-[8px]">
            <div>
              <h2 className="text-[#3A3A3A] text-[16px] font-bold">
                Profile Photo
              </h2>
              <p>Jpg or Png. Square ratio recommended. Max 2MB.</p>
            </div>

            <div className="flex items-center gap-[16px]">
              <Button variant="outline" className="bg-[#FFF3F0] text-[14px]">
                <UploadIcon />
                Upload new photo
              </Button>
              <Button variant="ghost" className="text-[#3A3A3A] text-[14px]">
                Remove
              </Button>
            </div>
          </div>
        </div>
        {/* FIELD INPUTS */}
        <div>
          <ProfileInput />
        </div>
        {/* SUBMIT BUTTON */}
      </CardContent>
      <CardAction className="py-[14px] px-[24px] flex justify-end w-full bg-[#FBFAF7]">
        <Button variant="cta" className="text-[14px] py-[8px] px-[16px]">
          Save changes
        </Button>
      </CardAction>
    </Card>
  );
}
