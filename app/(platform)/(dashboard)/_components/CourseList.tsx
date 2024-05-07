import { CourseSchema } from "@/schemas";
import { z } from "zod";
import { Course } from "./Course";
import { NewButton } from "./New";

type CourseSchemaType = z.infer<typeof CourseSchema>;

type CourseListProps = {
  courses: CourseSchemaType[];
};

// type CourseType = {
//   _id: string;
//   course: string;
//   instituteId?: string;
//   createdBy?: string;
//   updatedBy?: string;
// };

export const CourseList = ({ courses }: CourseListProps) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      <div className="shadow-md rounded-xl px-2 py-2 mb-4 bg-slate-100 hover:rounded-lg">
        <NewButton />
      </div>
      {courses.map((course: any) => (
        <div
          key={course._id}
          className="shadow-md rounded-xl px-2 py-2 mb-4 bg-slate-100 hover:rounded-lg"
        >
          {/* {JSON.stringify(course)} */}
          <Course course={course.course} />
        </div>
      ))}
    </div>
  );
};
