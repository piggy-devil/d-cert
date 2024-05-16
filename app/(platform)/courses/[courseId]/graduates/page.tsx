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

type GraduatesPageProps = {
  params: { courseId: string };
};

const GraduatesPage = ({ params }: GraduatesPageProps) => {
  const courseId = params.courseId;
  return (
    <>
      <div className="mb-8">
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
      <div className="flex flex-row space-x-4">
        <div className="flex-1 overflow-y-auto max-h-screen">
          <UserList courseId={courseId} />
        </div>
        <div className="w-1/3">
          <AddUser courseId={courseId} />
        </div>
      </div>
    </>
  );
};

export default GraduatesPage;
