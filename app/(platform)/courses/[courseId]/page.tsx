import { getCourse } from "@/actions/course";
import { CourseDetailForm } from "../../_components/CourseDetailForm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type CourseIdPageTypes = {
  params: { courseId: string };
};

const CourseIdPage = async ({ params }: CourseIdPageTypes) => {
  const course = await getCourse(params.courseId);
  return (
    <div className="flex justify-center gap-x-4">
      <Link href={`/courses`}>
        <ArrowLeft className="mt-4" />
      </Link>
      <CourseDetailForm
        courseId={params.courseId}
        course={course.course}
        instituteId={course.instituteId}
        dateOfStudyStart={course.dateOfStudyStart}
        dateOfStudyEnd={course.dateOfStudyEnd}
        dateOfExpireCert={course.dateOfExpireCert}
      />
      <Link href={`/courses/${params.courseId}/receiver`}>
        <ArrowRight className="mt-4" />
      </Link>
    </div>
  );
};

export default CourseIdPage;
