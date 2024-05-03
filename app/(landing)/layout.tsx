import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

type LandingPageLayoutProps = {
  children: React.ReactNode;
};

const LandingPageLayout = ({ children }: LandingPageLayoutProps) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
