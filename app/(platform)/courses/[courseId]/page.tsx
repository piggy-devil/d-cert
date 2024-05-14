import { getCourse } from "@/actions/course";
import { CourseDetailForm } from "../../_components/CourseDetailForm";

type CourseIdPageTypes = {
  params: { courseId: string };
};

const CourseIdPage = async ({ params }: CourseIdPageTypes) => {
  const course = await getCourse(params.courseId);
  return (
    <div className="flex justify-center">
      <CourseDetailForm
        courseId={params.courseId}
        course={course.course}
        instituteId={course.instituteId}
        dateOfStudyStart={course.dateOfStudyStart}
        dateOfStudyEnd={course.dateOfStudyEnd}
        dateOfExpireCert={course.dateOfExpireCert}
      />
    </div>
  );
};

export default CourseIdPage;
