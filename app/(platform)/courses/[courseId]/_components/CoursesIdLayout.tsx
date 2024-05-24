import { Sidebar } from "@/app/(platform)/_components/Sidebar";
import { Header } from "@/components/Header";
import { CourseDetailSchemaTypes } from "@/schemas";
import { GraduateReady } from "../graduates/_components/GraduateReady";

type CoursesIdLayoutProps = {
  children: React.ReactNode;
  params?: { courseId: string };
  course: CourseDetailSchemaTypes;
  count?: number;
};

export const CoursesIdLayout = ({
  children,
  params,
  course,
  count,
}: CoursesIdLayoutProps) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        <div className="md:pt-0 mx-auto">
          <div className="flex ">
            <div className="w-64 shrink-0 hidden md:block">
              <Sidebar courseId={params?.courseId} />
              <GraduateReady
                courseId={params?.courseId}
                course={course}
                count={count}
              />
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
