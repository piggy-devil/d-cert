import { Sidebar } from "./_components/Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto bg-slate-100 h-full">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0  md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
