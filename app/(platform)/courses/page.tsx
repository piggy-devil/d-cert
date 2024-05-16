import { getMeCourse } from "@/actions/course";
import { EmptyCourse } from "../_components/EmptyCourse";
import { CourseList } from "../_components/CourseList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const CouresPage = async () => {
  const courses = await getMeCourse();

  return (
    <>
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
    </>
  );
};

export default CouresPage;
