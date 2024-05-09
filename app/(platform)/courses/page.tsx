import { getMeCourse } from "@/actions/course";
import { EmptyCourse } from "../_components/EmptyCourse";
import { CourseList } from "../_components/CourseList";

const CouresPage = async () => {
  const courses = await getMeCourse();

  return (
    <>
      <div className="">Workspaces</div>
      <div className="mt-10">
        {courses ? <CourseList courses={courses} /> : <EmptyCourse />}
      </div>
    </>
  );
};

export default CouresPage;
