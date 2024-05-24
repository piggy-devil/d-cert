import { Hint } from "@/components/util/Hint";
import { getColorBg, getColorClass, getHintLabel } from "@/lib/hint";
import { Boxes } from "lucide-react";

type CourseLogoProps = {
  status: "P" | "R" | "E" | "I";
};

export const CourseLogo = ({ status }: CourseLogoProps) => {
  return (
    <div>
      <Hint
        label={getHintLabel(status)}
        side="top"
        align="start"
        sideOffset={18}
        className={getColorBg(status)}
      >
        {/* <Boxes className={getColorClass(status)} /> */}
        <Boxes />
      </Hint>
    </div>
  );
};
