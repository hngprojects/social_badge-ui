import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { Plus_Jakarta_Sans, League_Gothic, Bricolage_Grotesque} from "next/font/google";
import Providers from "@/components/providers/providers";
import { Toaster } from "sonner";
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});
const leagueGothic = League_Gothic({
  subsets: ["latin"],
  variable: "--font-league-gothic-font",
  weight: "400",
});
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-font",
});
export const metadata: Metadata = {
  title: {
    default: "Flare Tag — Digital Badge Builder",
    template: "%s | Flare Tag",
  },
  description:
    "Create customizable digital badge templates that participants can personalize and share on social media.",
  openGraph: {
    title: "Flare Tag",
    description:
      "Turn participants into active promoters with shareable digital badges.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${plusJakartaSans.variable} ${leagueGothic.variable} ${bricolageGrotesque.variable} bg-page text-ink antialiased`}
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
