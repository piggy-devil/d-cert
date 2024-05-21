import { AddUser } from "@/app/(platform)/_components/AddUser";
import { UserList } from "./_components/user-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useCourse } from "@/hooks/use-course";
import { getUsers } from "@/actions/course";
import { BadgeNumber } from "@/components/util/Badge";
import { CoursesLayout } from "../../_components/CoursesLayout";

type GraduatesPageProps = {
  params: { courseId: string };
};

const GraduatesPage = async ({ params }: GraduatesPageProps) => {
  const courseId = params.courseId;

  const course = await useCourse(params.courseId);
  const users = await getUsers(courseId);
  const userCount = users.length;

  return (
    <CoursesLayout params={params}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/courses">Courses</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/courses/${courseId}`}>Details</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>graduates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <BadgeNumber number={userCount} />
        </div>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="flex-1 overflow-y-auto max-h-screen">
          <UserList courseId={courseId} courseName={course.course} />
        </div>
        <div className="w-1/3">
          <AddUser courseId={courseId} courseName={course.course} />
        </div>
      </div>
    </CoursesLayout>
  );
};

export default GraduatesPage;
