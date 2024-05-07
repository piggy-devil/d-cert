import { Navbar } from "@/components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { Footer } from "@/components/Footer";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    // <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto bg-slate-100 h-full">
    //   <div className="flex gap-x-7">
    //     <div className="w-64 shrink-0 hidden md:block">
    //       <Sidebar />
    //     </div>
    //     {children}
    //   </div>
    // </main>
    <div className="bg-slate-50 h-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
