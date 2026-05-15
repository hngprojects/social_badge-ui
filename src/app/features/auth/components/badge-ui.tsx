"use client";

import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BadgeUI = () => {
  const pathname = usePathname();
  const pageImg =
    pathname === "/forgot-password" || pathname === "/reset-password"
      ? "/assets/auth-flow/padlock.png"
      : "/assets/auth-flow/signup-badge.png";
  const image =
    pathname === "/login" ? "/assets/auth-flow/badge-img.png" : pageImg;

  return (
    <div className="w-full h-full relative flex-col flex-[1.4] justify-between hidden lg:flex">
      <div className="logo absolute top-6 left-6 gap-2 text-4xl text-white">
        <Link href={"/"} className="flex justify-center items-center gap-3">
          <Icons.Logo />
          <span>Social Badge</span>
        </Link>
      </div>

      <Image
        loading="eager"
        src={image}
        alt=""
        width={1000}
        height={1000}
        className={`w-full h-[85%] object-contain ${
          pathname === "/login" ? "object-top-left" : "pt-10 object-bottom"
        }`}
      />

      <div className=" p-5 w-[90%] text-white font-medium text-3xl">
        <p>
          Create unique badges that you are proud to share —quickly and without
          stress.
        </p>
      </div>
    </div>
  );
};
