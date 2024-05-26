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
import { GraduatesLayout } from "./_components/GraduatesLayout";
import BadgeUser from "../_components/BadgeUser";

type GraduatesPageProps = {
  params: { courseId: string };
};

const GraduatesPage = async ({ params }: GraduatesPageProps) => {
  const courseId = params.courseId;

  const course = await useCourse(params.courseId);
  const users = await getUsers(courseId);
  const userCount = users.length as number;

  return (
    <GraduatesLayout params={params} course={course} count={userCount}>
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
              {/* <div>
                <BadgeNumber
                  number={userCount}
                  courseStatus={course.issueStatus}
                />
              </div> */}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <BadgeUser users={users} status={course.issueStatus} />
      </div>
      <div className="flex flex-row space-x-4">
        <div className="flex-1 overflow-y-auto max-h-screen">
          <UserList courseId={courseId} courseStatus={course.issueStatus} />
        </div>
        {(course.issueStatus === "P" || course.issueStatus === "E") && (
          <div
            className={
              userCount > 0
                ? "w-1/3"
                : "flex items-center justify-center w-full"
            }
          >
            <AddUser
              courseId={courseId}
              courseName={course.course}
              issueStatus={course.issueStatus}
            />
          </div>
        )}
      </div>
    </GraduatesLayout>
  );
};

export default GraduatesPage;
