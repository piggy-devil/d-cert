import Link from "next/link";
import { getMeCourse } from "@/actions/course";
import { EmptyCourse } from "../_components/EmptyCourse";
import { CourseList } from "./_components/CourseList";
import { CoursesLayout } from "@/app/(platform)/courses/_components/CoursesLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CoursePage = async () => {
  const courses = await getMeCourse();

  return (
    <CoursesLayout>
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>courses</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {courses && <div className="">Workspaces</div>}
      <div className="mt-10">
        {courses ? <CourseList courses={courses} /> : <EmptyCourse />}
      </div>
    </CoursesLayout>
  );
};

export default CoursePage;
