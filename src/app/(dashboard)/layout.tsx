import SideNav from "./components/SideBar";
import TopBar from "./components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto flex h-screen max-w-[1440px] overflow-hidden">
      <SideNav />
      <main className="grid h-screen flex-1 grid-rows-[83px_1fr] overflow-hidden px-6 lg:pl-6 lg:pr-8">
        <TopBar />
        <section className="overflow-y-auto pb-8">{children}</section>
      </main>
    </section>
  );
}
