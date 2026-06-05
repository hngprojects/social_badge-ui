import MobileHeader from "@/components/layout/dashBoard/MobileHeader";
import SideNav from "@/components/layout/dashBoard/SideBar";
import TopBar from "@/components/layout/dashBoard/TopBar";
import AuthGuard from "@/components/providers/AuthGuard";
import LenisProvider from "@/components/providers/LenisProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <AuthGuard>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#1a1a1a] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <section className="flex min-h-screen w-full min-w-0 overflow-x-hidden">
        <div className="sticky top-0 z-30 hidden self-start lg:block">
          <SideNav />
        </div>

        <main id="main-content" className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
          <header className="lg:sticky lg:top-0 lg:z-20 lg:flex lg:items-center lg:py-[18px] lg:pl-[30px] lg:pr-[32px] lg:border-b lg:border-black/8 lg:bg-background">
            <div className="lg:hidden">
              <MobileHeader />
            </div>

            <div className="hidden lg:flex w-full items-end ">
              <TopBar />
            </div>
          </header>

          <section className="min-w-0 overflow-x-hidden px-[16px] pt-[64px] pb-8 md:pl-[24px] md:pr-[32px] lg:pt-0">
            {children}
          </section>
        </main>
        </section>
      </AuthGuard>
    </LenisProvider>
  );
}
