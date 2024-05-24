import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { getColorHeaderCourse } from "@/lib/hint";

type BadgeTypes = {
  number: number;
  courseStatus: string;
};

export const BadgeNumber = ({ number, courseStatus }: BadgeTypes) => {
  return (
    <Badge
      className={cn(
        "flex items-center justify-center h-8 w-8 rounded-full text-white text-xl",
        `${getColorHeaderCourse(courseStatus)}`,
        `hover:${getColorHeaderCourse(courseStatus)}`
      )}
    >
      {number ? number : 0}
    </Badge>
  );
};
