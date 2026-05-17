import MobileHeader from "@/components/layout/dashBoard/MobileHeader";
import SideNav from "@/components/layout/dashBoard/SideBar";
import TopBar from "@/components/layout/dashBoard/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto flex h-screen max-w-[1440px] overflow-hidden">
      <div className="hidden lg:block">
        <SideNav />
      </div>

      <main className="grid h-screen flex-1 grid-rows-[83px_1fr] overflow-hidden px-6 lg:pl-6 lg:pr-8">
        <header className="flex">
          <div className="md:hidden  lg:pt-[16px]">
            <MobileHeader />
          </div>

          <div className=" hidden md:flex w-full items-end">
            <TopBar />
          </div>
        </header>
        <section className="overflow-y-auto pb-8">{children}</section>
      </main>
    </section>
  );
}
