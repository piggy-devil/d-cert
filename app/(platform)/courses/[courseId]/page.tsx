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
import { Button } from "@/components/ui/button";

type CourseIdPageTypes = {
  params: { courseId: string };
};

const CourseIdPage = async ({ params }: CourseIdPageTypes) => {
  const course = await getCourse(params.courseId);
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
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
        <div>
          <Link href={`/courses/${params.courseId}/graduates`}>
            <Button
              variant="outline"
              className="text-primary hover:bg-primary hover:text-white"
            >
              เพิ่มผู้จบหลักสูตร
            </Button>
          </Link>
        </div>
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
          signature={course.signature}
        />
        {/* <Link href={`/courses/${params.courseId}/graduates`}>
          <ArrowRight className="mt-4" />
        </Link> */}
      </div>
    </>
  );
};

export default CourseIdPage;
