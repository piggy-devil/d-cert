import { getMeCourse } from "@/actions/course";
import { EmptyCourse } from "../_components/EmptyCourse";
import { CourseList } from "../_components/CourseList";

const CouresPage = async () => {
  const courses = await getMeCourse();

  return (
    <div className="bg-white rounded-s-lg pb-24 pt-12 px-12 flex-row items-center justify-center">
      <div className="">Workspaces</div>
      <div className="mt-10">
        {courses ? <CourseList courses={courses} /> : <EmptyCourse />}
      </div>
    </div>
  );
};

export default CouresPage;
