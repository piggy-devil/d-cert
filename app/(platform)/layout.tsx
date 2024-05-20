import { Header } from "@/components/Header";
import { Sidebar } from "./_components/Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        <div className="md:pt-0 mx-auto">
          <div className="flex ">
            <div className="w-64 shrink-0 hidden md:block">
              <Sidebar />
            </div>
            <div className="rounded-t-lg pb-96 pt-4 px-12 flex-row items-center justify-center w-full min-h-screen md:border-l-2">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
