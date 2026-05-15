import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Fraunces } from "next/font/google";
import Providers from "@/components/providers/providers";
import { Toaster } from "sonner";
export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Social Badge — Digital Badge Builder",
    template: "%s | Social Badge",
  },
  description:
    "Create customisable digital badge templates that participants can personalise and share on social media.",
  openGraph: {
    title: "Social Badge",
    description:
      "Turn participants into active promoters with shareable digital badges.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${fraunces.variable} bg-page text-ink antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              background: "#FFFFFF",
              color: "#121217",
              border: "1px solid #ECECF2",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
            },

            classNames: {
              toast: "gap-3",

              title: "text-sm font-semibold",

              description: "text-sm text-[#6C6C89]",

              success: "!bg-[#F0FDF4] !border-[#22C55E]",

              error: "!bg-[#FEF2F2] !text-[#EF4444] !border-[#EF4444]",

              warning: "!bg-[#FFFBEB] !border-[#F59E0B]",

              info: "!bg-[#EFF6FF] !border-[#3B82F6]",
            },
          }}
        />
      </body>
    </html>
  );
}
