import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

type BadgeTypes = {
  number: number;
  color?: string;
};

export const BadgeNumber = ({ number, color }: BadgeTypes) => {
  return (
    <Badge
      className={cn(
        "flex items-center justify-center h-8 w-8 rounded-full text-white text-xl",
        color ? `bg-${color}` : ""
      )}
    >
      {number ? number : 0}
    </Badge>
  );
};
