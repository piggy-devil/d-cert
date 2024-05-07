import { getCourse } from "@/actions/course";

type CourseIdPageTypes = {
  params: { courseId: string };
};

const CourseIdPage = async ({ params }: CourseIdPageTypes) => {
  const course = await getCourse(params.courseId);
  console.log(course);
  return (
    <div>
      CourseIdPage {params.courseId}
      <span>{course.course}</span>
      <span>{course.instituteId}</span>
    </div>
  );
};

export default CourseIdPage;
