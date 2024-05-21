"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CourseSideListTypes = {
  courses: any;
  currentCourseId: string | undefined; // Add currentCourseId prop
};

export const CourseSideList = ({
  courses,
  currentCourseId,
}: CourseSideListTypes) => {
  const router = useRouter();

  const handleCourseSelect = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div>
      <Select
        defaultValue={currentCourseId}
        onValueChange={(value) => handleCourseSelect(value)}
      >
        <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-none">
          <SelectValue placeholder="เลือก" />
        </SelectTrigger>
        <SelectContent position="popper">
          {courses.map((course: any) => (
            <SelectItem key={course._id} value={course._id}>
              {course.course}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
