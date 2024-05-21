import Link from "next/link";
import { getCourse } from "@/actions/course";
import { CourseDetailForm } from "../_components/CourseDetailForm";
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
import { CourseDetailTypes } from "@/schemas";
import { CoursesLayout } from "../_components/CoursesLayout";

type CourseIdPageProps = {
  params: { courseId: string };
};

const isCourseDataComplete = (course: CourseDetailTypes | null) => {
  return (
    course &&
    course._id &&
    course.course &&
    course.dateOfStudyStart &&
    course.dateOfStudyEnd
  );
};

const CourseIdPage = async ({ params }: CourseIdPageProps) => {
  const course = await getCourse(params.courseId);

  const isComplete = isCourseDataComplete(course);

  if (!course) {
    console.error("Course data not found");
    return (
      <div>
        <p>Course data not found.</p>
        <Link href="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <CoursesLayout params={params}>
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
                {isComplete && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/courses/${params.courseId}/graduates`}>
                          Graduates
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div>
            {isComplete && (
              <Link href={`/courses/${params.courseId}/graduates`}>
                <span className="text-primary hover:bg-primary hover:text-white hover:rounded-md px-2 py-2">
                  เพิ่มผู้จบหลักสูตร
                </span>
              </Link>
            )}
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
      </CoursesLayout>
    </>
  );
};

export default CourseIdPage;
