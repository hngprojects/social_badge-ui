import MobileHeader from "@/components/layout/dashBoard/MobileHeader";
import SideNav from "@/components/layout/dashBoard/SideBar";
import TopBar from "@/components/layout/dashBoard/TopBar";
import LenisProvider from "@/components/providers/LenisProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <section className="flex min-h-screen">
        <div className="hidden lg:block sticky top-0 self-start">
          <SideNav />
        </div>

        <main className="flex flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center py-[18px]  pl-[24px] pr-[32px] lg:border-b lg:border-black/8 bg-background">
            <div className="lg:hidden">
              <MobileHeader />
            </div>

            <div className="hidden lg:flex w-full items-end ">
              <TopBar />
            </div>
          </header>

          <section className="pt-[76px] lg:pt-0 pb-8 px-[16px] md:pl-[24px]  md:pr-[32px]">
            {children}
          </section>
        </main>
      </section>
    </LenisProvider>
  );
}
