"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

export default function LenisProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
