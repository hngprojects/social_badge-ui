import Image from "next/image";
import { ReactNode } from "react";
import { getEmailProviderUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Link from "next/link";

export const AuthModal = ({
  imageSrc = "/assets/auth-flow/mail-img.png",
  title,
  email,
  description,
  open,
  onOpenChange,
}: {
  title: string;
  email: string;
  description: ReactNode;
  imageSrc?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg p-5" showCloseButton>
        <div className="bg-[#DFDCDC]/71 m-3 rounded-[16px] p-5">
          <div className="relative h-52 mb-5">
            <Image
              fill
              src={imageSrc}
              className="object-contain w-full h-full"
              alt="Email verification illustration"
            />
          </div>
          <div className="text-center flex flex-col gap-3">
            <h2 className="font-semibold text-[20px]">{title}</h2>
            <div className="text-base text-[#4D4645]">{description}</div>
            <Button
              variant="cta"
              className="w-full py-4 text-base font-semibold"
              onClick={() => {
                const mailUrl = getEmailProviderUrl(email);
                if (!mailUrl) return;
                window.open(mailUrl, "_blank");
              }}
            >
              Go to mail
            </Button>
            <div className="text-center">
              <p className="text-sm">
                back to{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#FA5424] hover:text-[#e14b1c]"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
