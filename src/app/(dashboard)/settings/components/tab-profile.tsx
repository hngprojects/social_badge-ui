"use client";

import { useState } from "react";
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
import { useUserStore } from "@/stores/use-user-store";
import { getUserDisplayName } from "@/lib/api/auth-session";
import { getUserMail } from "@/lib/api/auth-session";

export default function ProfileCard() {
  const user = useUserStore((state) => state.user);
  const displayName = getUserDisplayName(user);
  const emailAddress = getUserMail(user);
  const [formData, setFormData] = useState({
    fullName: displayName,
    email: emailAddress,
    role: "",
  });

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="text-[14px] text-[#9CA3AF] font-normal py-0">
        <CardHeader className="border-b pt-1">
          <SettingsSubCard
            src="/assets/dashboard/settings/_ui-user-01.svg"
            alt="Profile icon"
            head="Profile"
            detail="Your personal info and how you appear"
            bg="#FFF0EC"
            showIcon={true}
            isHeader={true}
          />
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col items-start md:flex-row md:items-center gap-6 border-b pb-4 md:pb-6.75">
            {/* USER AVATAR */}
            <div className="h-24 w-24">
              <UserAvatar />
            </div>

            <div className="flex-col flex gap-3">
              <div className="max-w-[60%] md:max-w-none flex flex-col gap-3 md:gap-0">
                <h2 className="text-[#3A3A3A] text-[16px] font-bold">
                  Profile Photo
                </h2>
                <p>Jpg or Png. Square ratio recommended. Max 2MB.</p>
              </div>

              <div className="flex items-center gap-4">
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
            <ProfileInput values={formData} onChange={handleChange} />
          </div>
          {/* SUBMIT BUTTON */}
        </CardContent>
        <CardAction className="py-3.5 px-6 flex justify-end w-full bg-[#FBFAF7]">
          <Button type="submit" variant="cta" className="text-[14px] py-2 px-4">
            Save changes
          </Button>
        </CardAction>
      </Card>
    </form>
  );
}
