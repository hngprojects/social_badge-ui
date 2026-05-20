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

        <main className="flex flex-1 flex-col px-6 lg:pl-6 lg:pr-8">
          <header className="sticky top-0 z-20 bg-background flex h-[83px] items-end">
            <div className="lg:hidden">
              <MobileHeader />
            </div>

            <div className="hidden lg:flex w-full items-end">
              <TopBar />
            </div>
          </header>

          <section className="pb-8">{children}</section>
        </main>
      </section>
    </LenisProvider>
  );
}
