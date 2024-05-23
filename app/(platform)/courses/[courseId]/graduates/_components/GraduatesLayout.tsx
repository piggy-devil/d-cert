import { Sidebar } from "@/app/(platform)/_components/Sidebar";
import { Header } from "@/components/Header";
import { GraduateReady } from "./GraduateReady";
import { CourseDetailSchema } from "@/schemas";
import { z } from "zod";

type CourseTypes = z.infer<typeof CourseDetailSchema>;

type GraduatesLayoutProps = {
  children: React.ReactNode;
  params?: { courseId: string };
  course: CourseTypes;
  count: number;
};

export const GraduatesLayout = ({
  children,
  params,
  course,
  count,
}: GraduatesLayoutProps) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        <div className="md:pt-0 mx-auto">
          <div className="flex">
            <div id="sidebar" className="w-64 shrink-0 hidden md:block">
              <Sidebar courseId={params?.courseId} />
              <GraduateReady
                courseId={params?.courseId}
                course={course}
                count={count}
              />
            </div>
            <div className="flex-grow md:border-l-2">
              <div className="rounded-t-lg pb-96 pt-4 px-12 flex-row items-center justify-center w-full min-h-screen">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
