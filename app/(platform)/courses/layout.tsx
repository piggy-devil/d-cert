import { Sidebar } from "../_components/Sidebar";

type CourseLayoutProps = {
  children: React.ReactNode;
};

const CourseLayout = ({ children }: CourseLayoutProps) => {
  return (
    // <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
    <main className="pt-14 md:pt-16 mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 px-4 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        <div className="bg-white rounded-s-lg pb-96 pt-12 px-12 flex-row items-center justify-center w-full h-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default CourseLayout;
