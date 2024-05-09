import { getCourse } from "@/actions/course";
import { CourseForm } from "../../_components/CourseForm";

type CourseIdPageTypes = {
  params: { courseId: string };
};

const CourseIdPage = async ({ params }: CourseIdPageTypes) => {
  const course = await getCourse(params.courseId);
  console.log(course);
  return (
    <div className="flex justify-center">
      <CourseForm course={course} />
    </div>
  );
};

export default CourseIdPage;
