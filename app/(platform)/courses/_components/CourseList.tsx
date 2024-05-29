import { z } from "zod";
import { CourseSchema } from "@/schemas";
import { Course } from "./Course";
import { NewButton } from "../../_components/New";

type CourseSchemaType = z.infer<typeof CourseSchema>;

type CourseListProps = {
  courses: CourseSchemaType[];
};

export const CourseList = ({ courses }: CourseListProps) => {
  // console.log(courses);
  // return (
  //   <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
  //     <div className="shadow-md rounded-xl px-2 py-2 mb-4 bg-slate-100 hover:rounded-lg w-full h-full">
  //       {/* <div className="shadow-md rounded-xl px-2 py-2 mb-4 bg-slate-100 hover:rounded-lg min-w-36 min-h-36 max-w-56 max-h-56"> */}
  //       <NewButton />
  //     </div>
  //     {courses.map((course: any) => (
  //       <div
  //         key={course._id}
  //         className="shadow-md rounded-xl px-2 py-2 mb-4 bg-slate-100 hover:rounded-lg w-full h-full"
  //       >
  //         <Course course={course} />
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="w-56 h-56 p-3 shadow-lg rounded-3xl flex items-center justify-center">
          <NewButton />
        </div>
        {courses.map(async (course: any) => (
          <div key={course._id} className="w-56 h-56 p-3 shadow-lg rounded-3xl">
            <Course course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};
