import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="bg-slate-50 h-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
