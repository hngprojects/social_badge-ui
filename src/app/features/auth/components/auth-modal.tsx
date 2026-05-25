import Image from "next/image";
import { Icons } from "@/components/ui/icons";
import { ReactNode } from "react";
import { getEmailProviderUrl } from "@/lib/utils";
import { Button } from "./button";
import Link from "next/link";

export const AuthModal = ({
  imageSrc = "/assets/auth-flow/mail-img.png",
  title,
  email,
  description,
  closeModal,
}: {
  title: string;
  email: string;
  description: ReactNode;
  imageSrc?: string;
  closeModal: () => void;
}) => {
  return (
    <div className="w-full h-screen backdrop-blur-sm fixed top-0 left-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-full max-w-md">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            <Icons.XMark />
          </button>
        </div>

        <div className="bg-[#DFDCDC]/71 m-3 rounded-[16px] p-5 ">
          <div className="relative h-52 mb-5">
            <Image
              fill
              src={imageSrc}
              className="object-contain w-full h-full"
              alt={""}
            />
          </div>
          <div className="text-center flex flex-col gap-3">
            <h2 className="font-semibold text-[20px] ">{title}</h2>
            <div className="text-base text-[#4D4645]  ">{description}</div>
            <Button
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
      </div>
    </div>
  );
};
