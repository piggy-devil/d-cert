import { getCourse } from "@/actions/course";

export const useCourse = async (id: string) => {
  const course = await getCourse(id);

  if (!course) {
    throw new Error("Get Coures Fail!");
  }

  return course;
};
