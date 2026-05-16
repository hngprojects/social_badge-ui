import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./button";

export const VerifyEmailModal = () => {
  return (
    <div className="bg-white rounded-lg p-5 w-full max-w-md">
      <div className="flex justify-end"></div>

      <div className="bg-[#DFDCDC]/71 m-3 rounded-[16px] p-5 ">
        <div className="relative h-52 mb-5">
          <Image
            fill
            src={"/assets/auth-flow/emoji.png"}
            className="object-contain w-full h-full"
            alt={""}
          />
        </div>
        <div className="text-center flex flex-col gap-3">
          <h2 className="font-semibold text-[20px] ">Email verified</h2>
          <div className="text-base text-[#4D4645]  ">
            <p>Great! Your email address has been verified</p>
          </div>
          <Button type="button" disabled>
            Set up profile
          </Button>
          <Link
            href="/coming-soon"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "inline-flex w-full items-center justify-center no-underline",
            )}
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
