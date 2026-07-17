"use client";

import Loading from "@/app/loading";
import { PENDING_DEMO_CUSTOMIZATION_KEY } from "@/app/features/customize/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const route = useRouter();

  useEffect(() => {
    const demoSession = sessionStorage.getItem(PENDING_DEMO_CUSTOMIZATION_KEY);

    if (!demoSession) {
      route.replace("/dashboard");
      return;
    }
    route.replace("/create-badges/customize");
  }, [route]);

  return (
    <>
      <Loading />
    </>
  );
}
