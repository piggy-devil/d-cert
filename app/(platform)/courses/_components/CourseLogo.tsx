import { Hint } from "@/components/util/Hint";
import { Boxes } from "lucide-react";

type CourseLogoProps = {
  status: "P" | "R" | "E" | "I";
};

export const CourseLogo = ({ status }: CourseLogoProps) => {
  const getHintLabel = (status: string) => {
    switch (status) {
      case "P":
        return "Prepare information";
      case "R":
        return "Ready for the blockchain";
      case "E":
        return "Edit information";
      case "I":
        return "Successfully to the blockchain";
      default:
        return "Unknown Status";
    }
  };

  const getColorClass = (status: string) => {
    switch (status) {
      case "P":
        return "text-red-500"; // default
      case "R":
        return "text-yellow-500"; // ready
      case "E":
        return "text-orange-500"; // edit
      case "I":
        return "text-green-500"; // Go
      default:
        return "text-gray-700"; // Default color
    }
  };

  const getColorBg = (status: string) => {
    switch (status) {
      case "P":
        return "bg-red-500 border-red-600";
      case "R":
        return "bg-yellow-500 border-yellow-600";
      case "E":
        return "bg-orange-500 border-orange-600";
      case "I":
        return "bg-green-500 border-green-600";
      default:
        return "bg-gray-700 border-gray-700";
    }
  };

  return (
    <div>
      <Hint
        label={getHintLabel(status)}
        side="top"
        align="start"
        sideOffset={18}
        className={getColorBg(status)}
      >
        <Boxes className={getColorClass(status)} />
      </Hint>
    </div>
  );
};
