import Link from "next/link";
import { getCourse } from "@/actions/course";
import { CourseDetailForm } from "../../_components/CourseDetailForm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type CourseIdPageTypes = {
  params: { courseId: string };
};

const CourseIdPage = async ({ params }: CourseIdPageTypes) => {
  const course = await getCourse(params.courseId);
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
              <BreadcrumbPage>details</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/courses/${params.courseId}/graduates`}>
                  Graduates
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-center gap-x-4">
        {/* <Link href={`/courses`}>
          <ArrowLeft className="mt-4" />
        </Link> */}
        <CourseDetailForm
          courseId={params.courseId}
          course={course.course}
          instituteId={course.instituteId}
          dateOfStudyStart={course.dateOfStudyStart}
          dateOfStudyEnd={course.dateOfStudyEnd}
          dateOfExpireCert={course.dateOfExpireCert}
        />
        {/* <Link href={`/courses/${params.courseId}/graduates`}>
          <ArrowRight className="mt-4" />
        </Link> */}
      </div>
    </>
  );
};

export default CourseIdPage;
